import modal

custom_image = (
    modal.Image.debian_slim(python_version="3.13.1")
    .pip_install("psycopg2-binary==2.9.10", "requests==2.32.3")
)

app = modal.App("nonnas-recipes")

@app.function(schedule=modal.Period(minutes=15), concurrency_limit=1, timeout=1200, image=custom_image, secrets=[modal.Secret.from_name("azure-translation-key"), modal.Secret.from_name("database-url")])
def translate():
    import os
    import psycopg2
    import requests
    import time
    import sys
    from datetime import datetime
    try:
        conn = psycopg2.connect(os.environ["DATABASE_URL"])
        cur = conn.cursor()
        
        query = """
        SELECT r1.id, r1.category, r1.title, r1.ingredients, r1.instructions, r1.language, r1."translateTo"
        FROM recipe r1
        WHERE (r1."lastTranslatedAt" IS NULL OR r1."lastTranslatedAt" < r1."modifiedAt")
        AND r1."translateTo" IS NOT NULL
        AND r1."translatedFromId" IS NULL
        LIMIT 100
        """
        cur.execute(query)
        recipes = cur.fetchall()
        
        subscription_key = os.environ["AZURE_TRANSLATION_KEY"]
        endpoint = "https://api.cognitive.microsofttranslator.com"
        location = "germanywestcentral"
        
        headers = {
            'Ocp-Apim-Subscription-Key': subscription_key,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json'
        }
        
        for recipe in recipes:
            id, category, title, ingredients, instructions, source_lang, target_langs = recipe
            target_langs = target_langs.split(',')

            delete_query = """
            DELETE FROM recipe
            WHERE "translatedFromId" = %s
            """
            cur.execute(delete_query, (id))
            
            for target_lang in target_langs:
                texts = [
                    {'text': category},
                    {'text': title},
                    {'text': ingredients},
                    {'text': instructions}
                ]
                
                params = {
                    'api-version': '3.0',
                    'from': source_lang,
                    'to': target_lang
                }
                
                time.sleep(2)
                response = requests.post(
                    f'{endpoint}/translate',
                    params=params,
                    headers=headers,
                    json=texts
                )
                response.raise_for_status()
                translations = response.json()
                
                insert_query = """
                INSERT INTO recipe 
                (category, title, ingredients, instructions, language, "translatedFromId")
                VALUES (%s, %s, %s, %s, %s, %s)
                """
                
                cur.execute(insert_query, (
                    translations[0]['translations'][0]['text'],
                    translations[1]['translations'][0]['text'],
                    translations[2]['translations'][0]['text'],
                    translations[3]['translations'][0]['text'],
                    target_lang,
                    id
                ))
                print(f"Translated recipe {id} from {source_lang} to {target_lang}")
                
            update_query = """
            UPDATE recipe 
            SET "lastTranslatedAt" = %s
            WHERE id = %s
            """
            cur.execute(update_query, (datetime.now(), id))
            conn.commit()

        cur.close()
        conn.close()
    except Exception as e:
        sys.exit(f"Error translating recipes: {str(e)}")


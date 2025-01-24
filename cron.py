import modal
import os
import psycopg2
import requests
from datetime import datetime

app = modal.App("nonnas-recipes")

@app.function(schedule=modal.Period(hours=1), secrets=[modal.Secret.from_name("azure-translation-key"), modal.Secret.from_name("database-url")])
def translate():
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    
    query = """
    SELECT r1.id, r1.category, r1.title, r1.ingredients, r1.instructions, r1.language, r1."translateTo"
    FROM recipe r1
    WHERE (r1."lastTranslatedAt" IS NULL OR r1."lastTranslatedAt" < r1."modifiedAt")
    AND array_length(r1."translateTo", 1) > 0
    AND r1."translatedFrom" IS NULL
    LIMIT 10
    """
    cur.execute(query)
    recipes = cur.fetchall()
    
    subscription_key = os.environ["AZURE_TRANSLATION_KEY"]
    endpoint = "https://api.cognitive.microsofttranslator.com"
    location = "Germany West Central"
    
    headers = {
        'Ocp-Apim-Subscription-Key': subscription_key,
        'Ocp-Apim-Subscription-Region': location,
        'Content-type': 'application/json'
    }
    
    for recipe in recipes:
        id, category, title, ingredients, instructions, source_lang, target_langs = recipe
        target_langs = target_langs.split(',')
        
        for target_lang in target_langs:
            # Prepare texts to translate
            texts = [
                {'text': category},
                {'text': title},
                {'text': ingredients},
                {'text': instructions}
            ]
            
            # Call Azure Translate API
            params = {
                'api-version': '3.0',
                'from': source_lang,
                'to': target_lang
            }
            
            try:
                response = requests.post(
                    f'{endpoint}/translate',
                    params=params,
                    headers=headers,
                    json=texts
                )
                response.raise_for_status()
                translations = response.json()
                
                # Insert translated recipe
                insert_query = """
                INSERT INTO recipe 
                (category, title, ingredients, instructions, language, "translatedFrom", "translateTo")
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                """
                
                cur.execute(insert_query, (
                    translations[0]['translations'][0]['text'],
                    translations[1]['translations'][0]['text'],
                    translations[2]['translations'][0]['text'],
                    translations[3]['translations'][0]['text'],
                    target_lang,
                    id,
                    ''
                ))
                
                update_query = """
                UPDATE recipe 
                SET "lastTranslatedAt" = %s
                WHERE id = %s
                """
                cur.execute(update_query, (datetime.now(), id))
                
                conn.commit()
                print(f"Translated recipe {id} from {source_lang} to {target_lang}")
                
            except Exception as e:
                print(f"Error translating recipe {id}: {str(e)}")
                conn.rollback()
                break
    
    cur.close()
    conn.close()

import requests
import re
import time
import sys

print('"ID","Category","Title","Ingredients","Method","Date"')
for i in range(1,7223):
    id = str(i)
    url = 'http://www.virtualconsultants.it/ricette/gestione/recipe_edit.asp?id=' + id
    response = requests.get(url, headers={'Cookie': "<token>"})
    text = response.text
    if text.find('Requested operation requires a current record') != -1:
        print("Skipped " + id, file=sys.stderr)
        time.sleep(2)
        continue
    categoryFind = re.search('selected>(.*)\n', text, re.M)
    if categoryFind is None:
        print(f'Error (category): {url}')
        time.sleep(2)
        continue
    category = categoryFind.group(1).replace('"', '""').strip()
    titleFind = re.search('NAME="title".*?VALUE="(.*?)"', text)
    if titleFind is None:
        print(f'Error (title): {url}')
        time.sleep(2)
        continue
    title = titleFind.group(1).replace('"', '""').strip()
    ingedientsFind = re.search('NAME="ingr".*?>((?:.|\n)*?)</textarea>', text, re.M)
    if ingedientsFind is None:
        print(f'Error (ingredients): {url}')
        time.sleep(2)
        continue
    ingedients = ingedientsFind.group(1).replace('"', '""').strip()
    methodFind = re.search('NAME="method".*?>((?:.|\n)*?)</textarea>', text, re.M)
    if methodFind is None:
        print(f'Error (method): {url}')
        time.sleep(2)
        continue
    method = methodFind.group(1).replace('"', '""').strip()
    dateFind = re.search('([0-9]+/[0-9]+/[0-9]+)', text)
    if dateFind is None:
        print(f'Error (date): {url}')
        time.sleep(2)
        continue
    date = dateFind.group(1).replace('"', '""').strip()
    print('"' + id + '","' + category + '","' + title + '","' + ingedients + '","' + method + '","' + date + '"')
    time.sleep(2)
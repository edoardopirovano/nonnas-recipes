import requests
import re
import time
import os

coloursSeen = set()
iterationsSinceSawNew = 0
print('bgColour,textColour')
for i in range(0,99999):
    iterationsSinceSawNew += 1
    if iterationsSinceSawNew > 500:
        break
    url = 'http://www.virtualconsultants.it/ricette/recipe_view.asp?id=4517'
    response = requests.get(url)
    text = response.text
    jpegs = re.findall('/[0-9]+.jpg', text)
    for jpeg in jpegs:
        target = 'images/Random' + jpeg
        if os.path.isfile(target):
            time.sleep(0.1)
            continue
        iterationsSinceSawNew = 0
        jpegUrl = 'http://www.virtualconsultants.it/ricette/images/Random' + jpeg
        jpegResponse = requests.get(jpegUrl)
        with open(target, 'wb') as f:
            f.write(jpegResponse.content)
        time.sleep(0.1)
    bgColour = re.search('bgcolor="([A-Z]+)"', text)
    if bgColour is None:
        print(f'Error (bgColour)')
        time.sleep(0.1)
        break
    bgColour = bgColour.group(1).strip()
    textColour = re.search(' color="([A-Z]+)"', text)
    if textColour is None:
        print(f'Error (textColour)')
        time.sleep(0.1)
        break
    textColour = textColour.group(1).strip()
    entry = bgColour + "," + textColour
    if entry in coloursSeen:
        time.sleep(0.1)
        continue
    iterationsSinceSawNew = 0
    coloursSeen.add(entry)
    print(entry)
    time.sleep(0.1)

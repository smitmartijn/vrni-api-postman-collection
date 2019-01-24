# Postman Collection for the vRNI API
This repository contains Postman (getpostman.com) Collection and Environment files to work with the vRealize Network Insight APIs. 

# Installation
Download both the JSON files for the vRNI API version you want to use (currently only 4.0). Inside Postman, at the top left there's an 'Import' button. Use that to import both JSON files and that's it! You'll have the entire vRNI API Collection inside Postman.

There are environment variables in Postman that you need to configure. Go to the environment select box (top right) and select 'vRealize Network Insight Environment'. Then click the eye next to it on the right and update the **host** variable to point to your vRNI Platform VM.

With the vRNI API, you'll need to authenticate first. Use the auth/POST API call for that. After this you can go back to the environment and fill out the **AuthenticationToken** variable and move on to other API calls.

# Generator
**src/vrni-swagger2postman.js** is the generator which I use to generate the Postman Collections. You can look at that for reference, but I'll be adding new Postman Collection files for every vRNI API version that gets released. So if you're just here for the Postman Collection, you can stick to the JSON files. :-)

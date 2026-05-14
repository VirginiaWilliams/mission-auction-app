# mission-auction-app

## Project setup
### Install Dependencies
```
npm install
```

### Compiles and hot-reloads for development
```
npm run electron:serve
```

### Build for production
Create the exe:
```
npm run electron:build -- --win
```
The folder will be created in the dist_electron directory

### Package exe for handoff
1. Copy the win-unpackad file from within the dist_electron somewhere and rename to something nice
2. Zip it up
3. Upload to Google Drive
4. Share link via email

### Unzip package for use
Once you download the zip file follow these steps to run the project:
1. Move the zip file to the location of your choosing, just not downloads or OneDrive (O Drive)
2. Right click the zip file and "Extract All"
3. Open the extracted folder
4. You should see a bunch of files, but there should be one executable file named something like "mission-auction-app.exe" (when you double click it Windows may alert you since it's not an official application, it's okay to choose the option to continue)
5. The app should run after step 4, but as a bonus if you want to make a shortcut for the executable file you can right click it and select "Show more options" then "Create shortcut" which will allow you to search it from the windows menu bar

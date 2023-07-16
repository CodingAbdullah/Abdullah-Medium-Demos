# Make sure you have Node and Git installed on your machine
# This script is for POWERSHELL (windows only), you will need to run this on a Windows machine
# To run this script, run the command in the Windows command prompt below with the name of your laptop as part of the command parameter
# ---> .\PROJECT_SETUP.ps1 <laptop name>

# Making use of the built-in args array to access laptop name value and pass it dynamically to set the path for project setup
NAME=$args[0]
cd "/Users/$NAME/Desktop/"

# Build as you like, change the name of the folder to that which you desire.
echo 'Setting up local development directory on Desktop...'
mkdir LOCAL_PROJECT_ENV

cd LOCAL_PROJECT_ENV

# Initialize git on the empty repo
git init

# Build two folders separating work related to front-end and back-end 
mkdir front-end back-end

echo 'Front-end/Back-end folders created'
cd front-end

# Make sure you have node installed and the npm registry within your device!
echo 'Installing react app using create-react-app'
npx create-react-app .

echo 'Successfully installed, installing dependencies...'

# Install npm packages for frontend apps
npm install axios react-router react-redux redux react-router-dom validator

# Up one level on the directory tree
cd ../ 

# Add relevant information and directories to back-end
cd back-end
echo 'Adding folders for back-end development'
mkdir Controller Route Model

copy nul .gitignore

echo '# Files and directories to be added that will not be committed to Git'
echo 'node_modules' >> .gitignore
echo '.env' >> .gitignore

# Add empty server file
copy nul server.js 

echo 'Initializing node back-end answer the incoming questions, yes at the end to complete process'
npm init

# Barebone modules installed by default, feel free to add your custom dependencies as you build your local implementation
echo 'Installing npm packages for back-end development'
npm install axios bcryptjs cors dotenv express jsonwebtoken 

echo 'LOCAL_PROJECT_ENV project setup is complete!'
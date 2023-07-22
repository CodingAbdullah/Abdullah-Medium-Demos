#!/bin/sh
# Make sure you have Node and Git installed on your machine
# This script is Linux compatible only, you will need to run this on a Linux machine, make sure it is made executable with chmod command
# To run this script, run the command below with the name of your laptop as part of the command parameter
# ---> sh project_setup.sh <laptop name>

NAME="$1"
cd "/Users/${NAME}/Desktop/"

# Build as you like, change the name of the folder to that which you desire.
echo 'Setting up local development directory on Desktop...'
mkdir LOCAL_PROJECT_DEV

cd LOCAL_PROJECT_DEV

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
npm install axios react-router react-router-dom validator

# Up one level on the directory tree
cd ../ 

# Add relevant information and directories to back-end
cd back-end
echo 'Adding folders for back-end development'
mkdir Controller Route Model

touch .gitignore

echo '# Files and directories to be added that will not be committed to Git'
echo 'node_modules' >> .gitignore
echo '.env' >> .gitignore

# Add empty server file
touch server.js 

echo 'Initializing node back-end answer the incoming questions, yes at the end to complete process'
npm init

# Barebone modules installed by default, feel free to add your custom dependencies as you build your local implementation
echo 'Installing npm packages for back-end development'
npm install axios bcryptjs cors dotenv express uuid

echo 'LOCAL_PROJECT_ENV project setup is complete!'
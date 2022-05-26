
## HOW TO CONFIGURATE THE APLICATION 

I need to install nvm, because I was getting error in firebase commands <br>
https://tecadmin.net/install-nvm-macos-with-homebrew/ 

1) Install Firebase Cli
    https://firebase.google.com/docs/cli#install_the_firebase_cli

    npm install -g firebase-tools 

2) Connecting to firebase
-> firebase login

3) Create the file firebase.json to deploy in firebase production 
{
  "functions": {
    "predeploy": [
      "npm run build"
    ],
    "source": "../functions-dashboard"
  }
}

Enable pubsub
https://cloud.google.com/pubsub/docs/publish-receive-messages-client-library

4) Verified if the projetc is pointing to the correct project in firebase 
firebase projects:list (show the list of projects in firebase)
firebase use --add project (appoint correctly the project that are in use)

5) If you are trying to deploy in a new environment you need to enable the Billing account to deploy
https://console.firebase.google.com/project/botaprarodartest/usage/details

6) Deploying 
-> npm run deploy or firebase deploy --only functions

## REFEERENCE
https://firebase.google.com/docs/hosting/quickstart

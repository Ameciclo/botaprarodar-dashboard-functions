[![Unit Test - Jest](https://github.com/Ameciclo/botaprarodar-dashboard-functions/actions/workflows/Unittest.yml/badge.svg?branch=main)](https://github.com/Ameciclo/botaprarodar-dashboard-functions/actions/workflows/Unittest.yml)

[![Deploy to Firebase - Dev](https://github.com/Ameciclo/botaprarodar-dashboard-functions/actions/workflows/DeployFunctioinsDev.yml/badge.svg?branch=main)](https://github.com/Ameciclo/botaprarodar-dashboard-functions/actions/workflows/DeployFunctioinsDev.yml)

[![Deploy to Firebase - PROD](https://github.com/Ameciclo/botaprarodar-dashboard-functions/actions/workflows/DeployFunctioinsProduction.yml/badge.svg?branch=production)](https://github.com/Ameciclo/botaprarodar-dashboard-functions/actions/workflows/DeployFunctioinsProduction.yml)

## HOW TO CONFIGURATE THE APLICATION 


> ⚠️ You may need to install nvm, because you might get an error in firebase commands. ⚠️ <br>
> https://tecadmin.net/install-nvm-macos-with-homebrew/ 

1) Install Firebase Cli
    https://firebase.google.com/docs/cli#install_the_firebase_cli

    `npm install -g firebase-tools` or `curl -sL https://firebase.tools | bash`

2) Connecting to firebase: `firebase login`

3) Create the file `firebase.json` to deploy in firebase production
```
{
  "functions": {
    "predeploy": [
      "npm run build"
    ],
    "source": "../functions-dashboard"
  }
}
```

Enable the pubsub: https://cloud.google.com/pubsub/docs/publish-receive-messages-client-library

4. Verified if the projetc is pointing to the correct project in firebase.
> `firebase projects:list` (show the list of projects in firebase)

> `firebase use --add [project_id]` (point correctly the project that are in use)

5) If you are trying to deploy in a new environment you need to enable the Billing account to deploy
https://console.firebase.google.com/project/botaprarodartest/usage/details


6) Deploying 
-> `npm run deploy` or `firebase deploy --only functions`

## REFEERENCE
https://firebase.google.com/docs/hosting/quickstart



# CONFIGURE TEST

### Rodar
  `npm install jest --save-dev`
### Configurar
  `package.json` with "test":"jest" inside scripts
### Creating test
  Create a folder name `__test__` this is the default and one folder unit
  Create a `file name.test.js` this is the default and put inside for test
  ```
  describe('First', () => {
    it('should', () => {
      expect(2 + 2).toBe(4);
    });
  });
  ```
### Run 
  `npm test`
  <br>
You can config `eslintrc.js` to work with jest
To run in vscode install the extension jest

Install Babel to compile import as typescript 
https://jestjs.io/docs/getting-started#using-typescript


# ionic2-firebase
Projeto usando ionic2 e firebase


# Login com facebook

### Criar uma conta para desenvolvedor no facebook
    https://developers.facebook.com/apps

### Criar um aplicativo um pegar o ID do aplicativo

### Adicionar o plugin
    cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="971571446308653" --variable APP_NAME="myApplication"


### Instalar dependencias npm
    npm install firebase angularfire2 --save

### 1. Configurar o modulo do Firebase (app.module.ts)
### 2. Criar um serviço de autenticação, e serviço para acesso aos dados
    AuthService, DataService
### 3. Declarar os serviços no app.module para que fiquem acessiveis em toda aplicacao


# Pra rodar:

## Criar um projeto no firebase, e em configurações adicionar um 'App da Web' </> , isso te dará as chaves indicadas no .env abaixo

# crie um arquivo .env e inclua suas chaves nesse formato:

```cmd

VITE_URL="http://localhost:5173/login"
VITE_FB_ApiKEY=***
VITE_FB_AuthDomain=***
VITE_FB_ProjectId=***
VITE_FB_StorageBucket=***
VITE_FB_MessagingSenderId=***
VITE_FB_AppId=***

```

## Configurare o Authentication no firebase para aceitar login no formato email/senha:
![image](https://github.com/Eddi3MS/sopha/assets/75024157/68d0e367-5049-4942-a221-4c7b4b9e16f7)

## src/firebase-config.ts consumindo as variaveis do .env
```js

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
 apiKey: import.meta.env.VITE_FB_ApiKEY,
  authDomain: import.meta.env.VITE_FB_AuthDomain,
  projectId: import.meta.env.VITE_FB_ProjectId,
  storageBucket: import.meta.env.VITE_FB_StorageBucket,
  messagingSenderId: import.meta.env.VITE_FB_MessagingSenderId,
  appId: import.meta.env.VITE_FB_AppId,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

```






só rodar.. ```npm run dev```


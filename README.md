# src/firebase-config.ts

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

# .env

```cmd

VITE_URL="http://localhost:5173/login"
VITE_FB_ApiKEY=***
VITE_FB_AuthDomain=***
VITE_FB_ProjectId=***
VITE_FB_StorageBucket=***
VITE_FB_MessagingSenderId=***
VITE_FB_AppId=***

```


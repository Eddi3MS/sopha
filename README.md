# src/firebase-config.ts

```js

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: ********,
  authDomain: ********,
  projectId: ********,
  storageBucket: ********,
  messagingSenderId: ********,
  appId: ********,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

```

# .env

```cmd

VITE_URL="http://localhost:5173/login"


```


import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

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

export const db = getFirestore(app)

import { configureStore } from '@reduxjs/toolkit'
import userReducer, { setUser } from './user/userSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase-config'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

/* atualizar usuário no reload */
onAuthStateChanged(auth, (user) => {
  const validUserData = !!user?.displayName && !!user?.email

  if (user && validUserData) {
    store.dispatch(
      setUser({ name: user.displayName, email: user.email, id: user.uid })
    )
  } else {
    store.dispatch(setUser(null))
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

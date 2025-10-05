import { createAuthClient } from 'better-auth/client'

const authClient = createAuthClient()

// old way to use pinia store
// export const useAuthStore = defineStore('useAuthStore', {
//   state: () => ({ loading: false }),

//   actions: {
//     async signIn() {
//       this.loading = true
//       await authClient.signIn.social({
//         provider: 'github',
//         callbackURL: '/dashboard'
//       })
//       this.loading = false
//     }
//   }
// })

// new way to use pinia store with setup
export const useAuthStore = defineStore('useAuthStore', () => {
  const loading = ref(false)

  async function signIn() {
    loading.value = true
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/dashboard',
      errorCallbackURL: '/error'
    })
    loading.value = false
  }

  return {
    loading,
    signIn
  }
})

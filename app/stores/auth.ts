import { createAuthClient } from 'better-auth/vue'

const authClient = createAuthClient()

// new way to use pinia store with setup
export const useAuthStore = defineStore('useAuthStore', () => {
  const session = authClient.useSession()
  // need a computed value to export the user from session
  const user = computed(() => session.value.data?.user)
  // session also offer a loading and error state
  const loading = computed(() => session.value.isPending || session.value.isRefetching) // becasue it is computed is always up to date with the session state

  async function signIn() {
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/dashboard',
      errorCallbackURL: '/error'
    })
  }
  async function signOut() {
    await authClient.signOut()
    navigateTo('/')
  }

  return {
    loading,
    signIn,
    signOut,
    user
  }
})

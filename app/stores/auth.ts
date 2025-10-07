import { createAuthClient } from 'better-auth/vue'

const authClient = createAuthClient()

// new way to use pinia store with setup
export const useAuthStore = defineStore('useAuthStore', () => {
  const session = ref<Awaited<ReturnType<typeof authClient.useSession> | null>>(null)

  async function init() {
    const data = await authClient.useSession(useFetch)
    session.value = data
  }

  // need a computed value to export the user from session
  const user = computed(() => session.value?.data?.user)
  // session also offer a loading and error state
  const loading = computed(() => session.value?.isPending) // becasue it is computed is always up to date with the session state

  async function signIn() {
    const { csrf } = useCsrf()
    const headers = new Headers()
    headers.append('csrf-token', csrf)
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/dashboard',
      errorCallbackURL: '/error',
      fetchOptions: {
        headers
      }
    })
  }
  async function signOut() {
    const { csrf } = useCsrf()
    const headers = new Headers()
    headers.append('csrf-token', csrf)
    await authClient.signOut({
      fetchOptions: {
        headers
      }
    })
    navigateTo('/')
  }

  return {
    init,
    loading,
    signIn,
    signOut,
    user
  }
})

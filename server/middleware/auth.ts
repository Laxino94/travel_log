import { auth } from '~/lib/auth'

export default defineEventHandler(async (event) => {
  if (event.path.startsWith('/dashboard')) {
    const session = await auth.api.getSession({
      headers: event.headers // the cookies are in the headers
    })
    if (!session?.user) {
      await sendRedirect(event, '/', 302)
    }
  }
})

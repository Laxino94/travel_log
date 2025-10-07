import type { User } from 'better-auth'

// overwtrite the H3EventContext interface to add user property
declare module 'h3' {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface H3EventContext {
    user?: Omit<User, 'id'> & { // this gives a user without id
      id: number
    }
  }
}

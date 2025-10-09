import type { UserWithId } from './auth'

// overwtrite the H3EventContext interface to add user property
declare module 'h3' {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface H3EventContext {
    user?: UserWithId
  }
}

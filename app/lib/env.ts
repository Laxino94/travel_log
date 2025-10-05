import { z } from 'zod'

import tryParseEnv from './try-parse-evt'

// this is a validation schema for environment variables
const EnvSchema = z.object({
  // to see if in development or production mode from node
  NODE_ENV: z.string(),
  TURSO_DATABASE_URL: z.string(),
  TURSO_AUTH_TOKEN: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string()
})

tryParseEnv(EnvSchema)

// this is the type of the environment variables
export type EnvSchema = z.infer<typeof EnvSchema>

// eslint-disable-next-line node/no-process-env, node/prefer-global/process
export default EnvSchema.parse(process.env) // this automatically validates the env variables at runtime

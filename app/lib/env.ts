import { z } from 'zod'

import tryParseEnv from './try-parse-evt'

// this is a validation schema for environment variables
const EnvSchema = z.object({
  // to see if in development or production mode from node
  NODE_ENV: z.string()
//   ,BANANA: z.string() // if this variable is missing, the app wont start
})

tryParseEnv(EnvSchema)

// this is the type of the environment variables
export type EnvSchema = z.infer<typeof EnvSchema>

// eslint-disable-next-line node/no-process-env, node/prefer-global/process
export default EnvSchema.parse(process.env) // this automatically validates the env variables at runtime

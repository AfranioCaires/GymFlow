import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default('0.0.0.0'),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('Invalid environment variables', z.treeifyError(parsed.error))
  throw new Error('Invalid environment variables')
}

export const env = parsed.data

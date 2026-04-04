import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default('0.0.0.0'),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('Invalid environment variables', parsed.error.flatten())
  process.exit(1)
}

export const env = parsed.data

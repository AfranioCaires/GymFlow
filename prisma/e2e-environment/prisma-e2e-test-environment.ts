import { execSync } from 'child_process'

import type { Environment } from 'vitest/environments'

import { prisma } from '@/lib/prisma'

function generateE2EDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL env is required.')
  }

  const url = new URL(process.env.DATABASE_URL)

  console.log('oi')

  url.searchParams.set('schema', schema)
  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  viteEnvironment: 'ssr',
  async setup() {
    const pgSchema = crypto.randomUUID()

    process.env.DATABASE_URL = generateE2EDatabaseURL(pgSchema)

    execSync('bun db:migrate:deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS ${pgSchema} CASCADE`)
        await prisma.$disconnect()
        console.log('asksk')
      },
    }
  },
}

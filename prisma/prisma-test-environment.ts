import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

import { parse } from 'dotenv'
import { Client } from 'pg'
import type { Environment } from 'vitest/environments'

function generateDatabaseURL(databaseName: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.pathname = `/${databaseName}`

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  viteEnvironment: 'ssr',
  async setup() {
    const envFile = path.resolve(process.cwd(), '.env.test')

    if (fs.existsSync(envFile)) {
      const env = parse(fs.readFileSync(envFile))

      for (const key in env) {
        process.env[key] = env[key]
      }
    }

    const databaseName = `gym_test_${randomUUID().replace(/-/g, '_')}`
    const databaseURL = generateDatabaseURL(databaseName)

    process.env.DATABASE_URL = databaseURL

    const adminUrl = new URL(databaseURL)
    adminUrl.pathname = '/postgres'
    adminUrl.search = ''

    const client = new Client({
      connectionString: adminUrl.toString(),
    })

    await client.connect()
    await client.query(`CREATE DATABASE "${databaseName}" TEMPLATE gym_template`)
    await client.end()

    return {
      async teardown() {
        const adminUrl = new URL(databaseURL)
        adminUrl.pathname = '/postgres'
        adminUrl.search = ''

        const client = new Client({
          connectionString: adminUrl.toString(),
        })

        await client.connect()
        await client.query(`DROP DATABASE IF EXISTS "${databaseName}" WITH (FORCE)`)
        await client.end()
      },
    }
  },
}

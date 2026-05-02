import { execSync } from 'node:child_process'

import { Client } from 'pg'
import type { Environment } from 'vitest/environments'

export default <Environment>{
  name: 'prisma',
  viteEnvironment: 'ssr',
  async setup() {
    const url = new URL(process.env.DATABASE_URL!)
    const databaseName = url.pathname.slice(1)

    const adminUrl = new URL(process.env.DATABASE_URL!)
    adminUrl.pathname = '/postgres'
    const client = new Client({ connectionString: adminUrl.toString() })

    await client.connect()
    await client.query(`DROP DATABASE IF EXISTS "${databaseName}"`)
    await client.query(`CREATE DATABASE "${databaseName}"`)
    await client.end()

    execSync('bun db:migrate:deploy', { stdio: 'inherit' })

    return {
      async teardown() {},
    }
  },
}

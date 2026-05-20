import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

import { parse } from 'dotenv'
import { Client } from 'pg'

export async function setup() {
  const envFile = path.resolve(process.cwd(), '.env.test')

  if (fs.existsSync(envFile)) {
    const env = parse(fs.readFileSync(envFile))

    for (const key in env) {
      process.env[key] = env[key]
    }
  }

  const databaseURL = process.env.DATABASE_URL
  if (!databaseURL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const templateDbName = 'gym_template'

  const adminUrl = new URL(databaseURL)
  adminUrl.pathname = '/postgres'
  adminUrl.search = ''

  const client = new Client({ connectionString: adminUrl.toString() })
  await client.connect()

  await client.query(`DROP DATABASE IF EXISTS "${templateDbName}" WITH (FORCE)`)
  await client.query(`CREATE DATABASE "${templateDbName}"`)
  await client.end()

  const templateDbUrl = new URL(databaseURL)
  templateDbUrl.pathname = `/${templateDbName}`

  execSync(`DATABASE_URL=${templateDbUrl.toString()} bun db:migrate:deploy`, { stdio: 'inherit' })
}

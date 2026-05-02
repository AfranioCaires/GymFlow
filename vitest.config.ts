import fs from 'node:fs'
import path from 'node:path'

import { parse } from 'dotenv'
import { defineConfig } from 'vitest/config'

const envFile = path.resolve(process.cwd(), '.env.test')
const env = fs.existsSync(envFile) ? parse(fs.readFileSync(envFile)) : {}

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    dir: 'src',
    projects: [
      { extends: true, test: { name: 'unit' } },
      {
        extends: true,
        test: {
          name: 'e2e',
          dir: 'test/',
          environment: './prisma/prisma-test-environment.ts',
          env,
        },
      },
    ],
  },
})

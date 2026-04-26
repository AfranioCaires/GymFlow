import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'
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
          environment: './prisma/e2e-environment/prisma-e2e-test-environment',
          env: loadEnv('', process.cwd(), ''),
        },
      },
    ],
  },
})

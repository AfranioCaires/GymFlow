import './infra/instrumentation/instrumentation'
import { env } from '@/config/env'

import { app } from './app'
import { registerPrismaLogs } from './lib/prisma'

registerPrismaLogs(app.log)

app.listen({
  port: env.PORT,
  host: env.HOST,
})

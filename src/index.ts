import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

import router from './routes'
import config from '../config/server'

const app = new Koa()

app.use(bodyParser())
app.use(router.routes())

const port = config.port

app.listen(port)
  .on('listening', () => console.log(`Listening on port ${port}`))

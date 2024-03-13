import app from './app'
import config from './utils/config'

app.listen(config.PORT, () => {
  console.log(`Server is listening on port ${config.PORT}`)
})
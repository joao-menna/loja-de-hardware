import { config } from "dotenv"
import getServer from "./functions/getServer"
import loadRoutes from "./functions/loadRoutes"

config()

const server = getServer()

loadRoutes(server)

server.listen(8080)


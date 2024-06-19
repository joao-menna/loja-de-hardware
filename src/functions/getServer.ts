import jwtMiddleware from "../middlewares/jwtMiddleware"
import express from "express"
import cors from "cors"

export default function getServer() {
  const server = express()

  server.use(express.json())

  server.use(jwtMiddleware)

  server.use(cors({
    origin: "*"
  }))

  return server
}


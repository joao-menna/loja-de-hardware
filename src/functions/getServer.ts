import express from "express"
import cors from "cors"

export default function getServer() {
  const server = express()

  server.use(express.json())

  server.use(cors({
    origin: "*"
  }))

  return server
}


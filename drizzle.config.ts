import { config } from "dotenv"
import { defineConfig } from "drizzle-kit"

config()

export default defineConfig({
  schema: "./src/schemas/*",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.MYSQL_HOST ?? "localhost",
    user: process.env.MYSQL_USER ?? "root",
    database: process.env.MYSQL_DATABASE ?? "lojahardware",
  },
  verbose: true
})

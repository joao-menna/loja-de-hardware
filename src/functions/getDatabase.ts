import { drizzle } from "drizzle-orm/mysql2"
import mysql from "mysql2/promise"

export default async function getDatabase() {
  const host = process.env.MYSQL_HOST
  const user = process.env.MYSQL_USER
  const database = process.env.MYSQL_DATABASE

  const connection = await mysql.createConnection({
    host,
    user,
    database
  })

  const db = drizzle(connection)

  return {
    connection,
    db
  }
}


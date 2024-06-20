import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core"

export const categoria = mysqlTable("categoria", {
  id: int("id_categoria").primaryKey().autoincrement(),
  nome: varchar("nome_categoria", { length: 50 })
})


import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core"

export const categoria = mysqlTable("categoria", {
  id: serial("id_categoria").primaryKey().autoincrement(),
  nome: varchar("nome_categoria", { length: 50 })
})


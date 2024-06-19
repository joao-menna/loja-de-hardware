import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core"

export const equipamento = mysqlTable("equipamento", {
  id: int("id_equipamento").primaryKey().autoincrement(),
  nome: varchar("nome_equipamento", { length: 100 })
})

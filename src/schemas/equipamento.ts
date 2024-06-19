import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core"

export const equipamento = mysqlTable("equipamento", {
  id: serial("id_equipamento").primaryKey().autoincrement(),
  nome: varchar("nome_equipamento", { length: 100 })
})


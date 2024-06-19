import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core"

export const componente = mysqlTable("componente", {
  id: serial("codigo_componente").primaryKey().autoincrement(),
  nome: varchar("nome_componente", { length: 100 }),
  descricao: varchar("desc_componente", { length: 256 })
})


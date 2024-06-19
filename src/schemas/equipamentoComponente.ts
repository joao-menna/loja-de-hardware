import { int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core"

export const equipamentoComponente = mysqlTable("equipamento", {
  id: serial("id").primaryKey().autoincrement(),
  equipamentoId: int("equipamento_id").notNull(),
  componenteId: int("componente_id").notNull()
})

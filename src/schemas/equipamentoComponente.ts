import { int, mysqlTable } from "drizzle-orm/mysql-core"
import { equipamento } from "./equipamento"
import { componente } from "./componente"

export const equipamentoComponente = mysqlTable("equipamento_componente", {
  id: int("id").primaryKey().autoincrement(),
  equipamentoId: int("equipamento_id").notNull().references(() => equipamento.id),
  componenteId: int("componente_id").notNull().references(() => componente.id)
})

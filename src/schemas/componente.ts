import { int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core"
import { categoria } from "./categoria"

export const componente = mysqlTable("componente", {
  id: serial("codigo_componente").primaryKey().autoincrement(),
  nome: varchar("nome_componente", { length: 100 }),
  descricao: varchar("desc_componente", { length: 256 }),
  categoriaId: int("categoria_id").references(() => categoria.id)
})


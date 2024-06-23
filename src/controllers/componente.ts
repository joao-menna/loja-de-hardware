import { Request, Response } from "express"
import getDatabase from "../functions/getDatabase"
import { componente } from "../schemas/componente"
import { eq } from "drizzle-orm"
import { equipamentoComponente } from "../schemas/equipamentoComponente"

export class ComponenteController {
  async getAll(req: Request, res: Response) {
    const { connection, db } = await getDatabase()

    let componentes

    try {
      componentes = await db.select().from(componente).execute()
    } catch (err) {
      res.status(500).json({
        message: "Erro interno do servidor"
      })

      connection.end()
    
      return
    }

    connection.end()

    res.json(componentes)
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params

    const idInt = parseInt(id)
    if (isNaN(idInt)) {
      res.status(400).json({
        message: "ID inválido na rota"
      })
      return
    }

    const { connection, db } = await getDatabase()

    let componentes

    try {
      componentes = await db.select().from(componente).where(eq(componente.id, idInt)).execute()
    } catch (err) {
      res.status(500).json({
        message: "Erro interno do servidor"
      })

      connection.end()
    
      return
    }

    connection.end()

    res.json(componentes)
  }

  async insertOne(req: Request, res: Response) {
    const {
      categoriaId,
      nome,
      descricao
    } = req.body as { categoriaId: number, nome: string, descricao: string }

    if (
      !nome ||
      typeof nome !== "string" ||
      !descricao ||
      typeof descricao !== "string" ||
      !categoriaId ||
      typeof categoriaId !== "number"
    ) {
      res.status(422).json({
        message: "Body inválido"
      })
      return
    }

    const { connection, db } = await getDatabase()

    let componenteId

    try {
      const componenteInserido = await db
        .insert(componente)
        .values({ categoriaId, descricao, nome })
        .execute()

      componenteId = componenteInserido[0].insertId
    } catch (err) {
      res.status(500).json({
        message: "Erro interno do servidor"
      })

      connection.end()
    
      return
    }

    connection.end()

    res.json({
      id: componenteId,
      nome,
      descricao,
      categoriaId
    })
  }

  async updateOne(req: Request, res: Response) {
    const { id } = req.params

    const idInt = parseInt(id)
    if (isNaN(idInt)) {
      res.status(400).json({
        message: "ID inválido na rota"
      })
      return
    }

    const { categoriaId, nome, descricao } = req.body

    if (!nome || !descricao || categoriaId <= 0) {
      res.status(422).json({
        message: "Body inválido"
      })
      return
    }

    const { connection, db } = await getDatabase()

    try {
      await db.update(componente).set({ nome, descricao, categoriaId }).where(eq(componente.id, idInt)).execute()
    } catch (err) {
      res.status(500).json({
        message: "Erro interno do servidor"
      })

      connection.end()
    
      return
    }

    connection.end()

    res.json({
      id: idInt,
      nome
    })
  }

  async deleteOne(req: Request, res: Response) {
    const { id } = req.params

    const idInt = parseInt(id)
    if (isNaN(idInt)) {   
      res.status(400).json({
        message: "ID inválido na rota"
      })
      return
    }

    const { connection, db } = await getDatabase()

    try {
      await db
        .delete(equipamentoComponente)
        .where(eq(equipamentoComponente.componenteId, idInt))
        .execute()
      await db.delete(componente).where(eq(componente.id, idInt)).execute()
    } catch (err) {
      res.status(500).json({
        message: "Erro interno do servidor"
      })

      connection.end()
    
      return
    }

    connection.end()

    res.json({
      id: idInt
    })
  }
}


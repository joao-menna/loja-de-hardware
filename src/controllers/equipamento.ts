import { Request, Response } from "express"
import getDatabase from "../functions/getDatabase"
import { equipamento } from "../schemas/equipamento"
import { eq } from "drizzle-orm"
import { componente } from "../schemas/componente"
import { equipamentoComponente } from "../schemas/equipamentoComponente"

export class EquipamentoController {
  async getAll(req: Request, res: Response) {
    const { connection, db } = await getDatabase()

    let equipamentos

    try {
      equipamentos = await db.select().from(equipamento).execute()
    } catch (err) {
      res.status(500).json({
        message: "Erro interno do servidor"
      })

      connection.end()
    
      return
    }

    connection.end()

    res.json(equipamentos)
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

    let equipamentos

    try {
      equipamentos = await db.select().from(equipamento).where(eq(equipamento.id, idInt)).execute()
    } catch (err) {
      res.status(500).json({
        message: "Erro interno do servidor"
      })

      connection.end()
    
      return
    }

    connection.end()

    res.json(equipamentos)
  }

  async insertOne(req: Request, res: Response) {
    const { nome } = req.body

    if (!nome) {
      res.status(422).json({
        message: "Body inválido"
      })
      return
    }

    const { connection, db } = await getDatabase()

    let equipamentoId

    try {
      const equipamentoInserido = await db.insert(equipamento).values({ nome }).execute()
      equipamentoId = equipamentoInserido[0].insertId
    } catch (err) {
      res.status(500).json({
        message: "Erro interno do servidor"
      })

      connection.end()
    
      return
    }

    connection.end()

    res.json({
      id: equipamentoId,
      nome
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

    const { nome, componentes } = req.body

    if (!nome || !Array.isArray(componentes)) {
      res.status(422).json({
        message: "Body inválido"
      })
      return
    }

    const { connection, db } = await getDatabase()

    try {
      await db.delete(equipamentoComponente).where(eq(equipamentoComponente.equipamentoId, idInt)).execute()
      await db.update(equipamento).set({ nome }).where(eq(equipamento.id, idInt)).execute()
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
      await db.delete(equipamento).where(eq(equipamento.id, idInt)).execute()
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

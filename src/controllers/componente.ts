import { Request, Response } from "express"
import getDatabase from "../functions/getDatabase"
import { componente } from "../schemas/componente"
import { eq } from "drizzle-orm"

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
    const { nome } = req.body

    if (!nome) {
      res.status(422).json({
        message: "Body inválido"
      })
      return
    }

    const { connection, db } = await getDatabase()

    let componenteId

    try {
      const componenteInserido = await db.insert(componente).values({ nome }).execute()
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

    const { nome } = req.body

    if (!nome) {
      res.status(422).json({
        message: "Body inválido"
      })
      return
    }

    const { connection, db } = await getDatabase()

    try {
      await db.update(componente).set({ nome }).where(eq(componente.id, idInt)).execute()
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


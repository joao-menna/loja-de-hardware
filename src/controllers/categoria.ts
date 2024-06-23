import getDatabase from "../functions/getDatabase"
import { categoria } from "../schemas/categoria"
import { Request, Response } from "express"
import { eq } from "drizzle-orm"
import { componente } from "../schemas/componente"

export class CategoriaController {
  async getAll(req: Request, res: Response) {
    const { connection, db } = await getDatabase()

    let categorias

    try {
      categorias = await db.select().from(categoria).execute()
    } catch (err) {
      res.status(500).json({
        message: "Erro interno do servidor"
      })

      connection.end()
    
      return
    }

    connection.end()

    res.json(categorias)
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

    let categorias

    try {
      categorias = await db.select().from(categoria).where(eq(categoria.id, idInt)).execute()
    } catch (err) {
      res.status(500).json({
        message: "Erro interno do servidor"
      })

      connection.end()
    
      return
    }

    connection.end()

    res.json(categorias)
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

    let categoriaId

    try {
      const categoriaInserida = await db.insert(categoria).values({ nome }).execute()
      categoriaId = categoriaInserida[0].insertId
    } catch (err) {
      res.status(500).json({
        message: "Erro interno do servidor"
      })

      connection.end()
    
      return
    }

    connection.end()

    res.json({
      id: categoriaId,
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
      await db.update(categoria).set({ nome }).where(eq(categoria.id, idInt)).execute()
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
      await db.delete(categoria).where(eq(categoria.id, idInt)).execute()
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

  async getOneWithComponente(req: Request, res: Response) {
    const { id } = req.params

    const idInt = parseInt(id)
    if (isNaN(idInt)) {
      res.status(400).json({
        message: "ID inválido na rota"
      })
      return
    }

    const { connection, db } = await getDatabase()

    let categorias
    let componentes

    try {
      categorias = await db
        .select()
        .from(categoria)
        .where(eq(categoria.id, idInt))
        .execute()

      componentes = await db
        .select({
          id: componente.id,
          nome: componente.nome,
          descricao: componente.descricao
        })
        .from(componente)
        .where(eq(componente.categoriaId, idInt))
        .execute()
    } catch (err) {
      res.status(500).json({
        message: "Erro interno do servidor"
      })

      connection.end()
    
      return
    }

    connection.end()

    const retorno = {
      id: categorias[0].id,
      nome: categorias[0].nome,
      componentes
    }

    res.json(retorno)
  }
}

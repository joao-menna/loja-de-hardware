import { Request, Response } from "express"
import getDatabase from "../functions/getDatabase"
import { equipamento } from "../schemas/equipamento"
import { eq } from "drizzle-orm"
import { componente } from "../schemas/componente"
import { equipamentoComponente } from "../schemas/equipamentoComponente"
import { categoria } from "../schemas/categoria"

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
    const { nome, componentes } = req.body

    if (!nome || !Array.isArray(componentes)) {
      res.status(422).json({
        message: "Body inválido"
      })
      return
    }

    if (componentes.length < 2) {
      res.status(400).json({
        message: "Deve haver pelo menos 2 componentes num equipamento"
      })
      return
    }

    const { connection, db } = await getDatabase()

    let equipamentoId

    try {
      let temProcessamento = false
      let temArmazenamento = false

      for (const componenteId of componentes) {
        const meusComponentes = await db
          .select()
          .from(componente)
          .innerJoin(categoria, eq(categoria.id, componente.categoriaId))
          .where(eq(componente.id, componenteId))

        if (meusComponentes.length === 0) {
          res.status(400).json({
            message: `Nao existe componente para o id ${componenteId}`
          })
          return
        }

        const meuComponente = meusComponentes[0]

        if (meuComponente.categoria.nome?.toLowerCase() === "processamento") {
          temProcessamento = true
        }

        if (meuComponente.categoria.nome?.toLowerCase() === "armazenamento") {
          temArmazenamento = true
        }
      }

      if (!temProcessamento || !temArmazenamento) {
        res.status(400).json({
          message: "O equipamento deve conter pelo menos um componente de armazenamento e um de processamento"
        })
        return
      }

      const equipamentoInserido = await db.insert(equipamento).values({ nome }).execute()
      equipamentoId = equipamentoInserido[0].insertId

      const componentesInserir = componentes.map((val) => ({
        componenteId: val,
        equipamentoId: equipamentoInserido[0].insertId
      }))

      await db.insert(equipamentoComponente).values(componentesInserir).execute()
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

    if (componentes.length < 2) {
      res.status(400).json({
        message: "Deve haver pelo menos 2 componentes num equipamento"
      })
      return
    }

    const { connection, db } = await getDatabase()

    const componentesInserir = componentes.map((val) => ({
      componenteId: val,
      equipamentoId: idInt
    }))

    try {
      let temProcessamento = false
      let temArmazenamento = false

      for (const componenteId of componentes) {
        const meusComponentes = await db
          .select()
          .from(componente)
          .innerJoin(categoria, eq(categoria.id, componente.categoriaId))
          .where(eq(componente.id, componenteId))

        if (meusComponentes.length === 0) {
          res.status(400).json({
            message: `Nao existe componente para o id ${componenteId}`
          })
          return
        }

        const meuComponente = meusComponentes[0]

        if (meuComponente.categoria.nome?.toLowerCase() === "processamento") {
          temProcessamento = true
        }

        if (meuComponente.categoria.nome?.toLowerCase() === "armazenamento") {
          temArmazenamento = true
        }
      }

      if (!temProcessamento || !temArmazenamento) {
        res.status(400).json({
          message: "O equipamento deve conter pelo menos um componente de armazenamento e um de processamento"
        })
        return
      }

      await db.delete(equipamentoComponente)
        .where(eq(equipamentoComponente.equipamentoId, idInt))
        .execute()
      await db.update(equipamento).set({ nome }).where(eq(equipamento.id, idInt)).execute()
      await db.insert(equipamentoComponente).values(componentesInserir).execute()
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
      nome,
      componentes
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
        .where(eq(equipamentoComponente.equipamentoId, idInt))
        .execute()
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

    let equipamentos

    try {
      equipamentos = await db
        .select()
        .from(equipamento)
        .innerJoin(equipamentoComponente, eq(equipamentoComponente.equipamentoId, equipamento.id))
        .innerJoin(componente, eq(componente.id, equipamentoComponente.componenteId))
        .where(eq(equipamento.id, idInt))
    } catch (err) {
      res.status(500).json({
        message: "Erro interno do servidor"
      })

      connection.end()
    
      return
    }

    connection.end()

    if (equipamentos.length === 0) {
      res.status(404).json({
        message: "Entidade não encontrada"
      })
      return
    }

    const retorno: { id: number, nome: string | null, componentes: any[] } = {
      id: equipamentos[0].equipamento.id,
      nome: equipamentos[0].equipamento.nome,
      componentes: []
    }

    for (const component of equipamentos) {
      retorno.componentes.push({
        id: component.componente.id,
        nome: component.componente.nome,
        descricao: component.componente.descricao,
        categoriaId: component.componente.categoriaId
      })
    }

    res.json(retorno)
  }
}

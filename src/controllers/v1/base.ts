import { Relation } from "../../prisma/relations"
import { Prisma, PrismaClient } from "@prisma/client"

const getDocument = (model: any, modelName: String, relations: Relation | Partial<Relation>) => async (req, res) => {
  try {
    const { id } = req.params

    const document = await model.findUnique({
      ...relations,
      where: { id: Number(id) },
    })

    if (!document) {
      return res
        .status(200)
        .json({ msg: `No ${modelName} with the id: ${id} found` })
    }

    return res.json({ data: document })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    })
  }
}

const getDocuments = (model: any, modelName: String, relations: Relation | Partial<Relation>) => async (req, res) => {
  try {
    /**
     * The findMany function returns all records
     */
    const documents = await model.findMany({
      ...relations,
    })

    if (documents.length === 0) {
      return res.status(200).json({ msg: `No ${modelName} found` })
    }

    return res.json({ data: documents })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    })
  }
}

const createDocument = (model: any, modelName: String, relations: Relation | Partial<Relation>, modelType: Prisma.InstitutionUncheckedCreateInput | Prisma.DepartmentUncheckedCreateInput) => async (req, res) => {
  try {
    if (properties === {})
      throw Error("Received empty body")
    
    // Extract the required keys for the type
    const properties = extractProperties(req.body, modelType)

    const data = { ...properties }

    await model.create({
      data
    })

    const newDocuments = await model.findMany()

    return res.status(201).json({
      msg: `${modelName} successfully created`,
      data: newDocuments,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    })
  }
}

function extractProperties(body: any, modelType: Prisma.InstitutionUncheckedCreateInput | Prisma.DepartmentUncheckedCreateInput) {
  const properties = {}
  for (const [key, value] of Object.entries(body)) {
    if (key in modelType) {
      properties[key] = value
    }
  }
  return properties
}

export { getDocument, getDocuments, createDocument }

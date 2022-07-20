import { Relation } from "../../prisma/relations"
import { Prisma, PrismaClient } from "@prisma/client"

const getDocument = (model: any, modelName: String, relations: Relation) => async (req, res) => {
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

const getDocuments = (model: any, modelName: String, relations: Relation) => async (req, res) => {
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

const createDocument = (model: any, modelName: String, relations: Relation, modelType: Prisma.InstitutionCreateInput | Prisma.DepartmentCreateInput) => async (req, res) => {
  try {
    // Extract the required keys for the type
    const properties = {}

    for (const [key, value] of Object.entries(res.body)) {
      if (key in modelType) {
        properties[key] = value
      }
    }
    // This should be replaced with an include
    //     const newInstitutions = await prisma.institution.findMany({
    //       include: {
    //         departments: true,
    //       },
    //     })

    if (properties === {})
      throw Error("Received empty body")

    const data = {...properties}

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



export { getDocument, getDocuments, createDocument }

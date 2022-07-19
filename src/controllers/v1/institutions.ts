import prisma from '../../utils/prisma'
import { getDocument, getDocuments } from './base'
import { institutionRelations } from '../../prisma/relations'

const Institution = prisma.institution

const getInstitution = getDocument(
  Institution,
  institutionRelations,
  'institution'
)
const getInstitutions = getDocuments(
  Institution,
  institutionRelations,
  'institution'
)

const createInstitution = async (req, res) => {
  try {
    const { name, region, country } = req.body

    /**
     * The create function creates a new record using the required fields,
     * i.e., name, region and country
     */
    await Institution.create({
      data: { name, region, country },
    })

    const newInstitutions = await prisma.institution.findMany({
      include: {
        departments: true,
      },
    })

    return res.status(201).json({
      msg: 'Institution successfully created',
      data: newInstitutions,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg: err.message,
    })
  }
}

const updateInstitution = async (req, res) => {
  try {
    const { id } = req.params
    const { name, region, country } = req.body

    let institution = await prisma.institution.findUnique({
      where: { id: Number(id) },
    })

    if (!institution) {
      return res
        .status(200)
        .json({ msg: `No institution with the id: ${id} found` })
    }

    /**
     * The update function updates a single record using an
     * id or unique identifier
     */
    institution = await prisma.institution.update({
      where: { id: Number(id) },
      data: { name, region, country },
    })

    return res.json({
      msg: `Institution with the id: ${id} successfully updated`,
      data: institution,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    })
  }
}

const deleteInstitution = async (req, res) => {
  try {
    const { id } = req.params

    const institution = await prisma.institution.findUnique({
      where: { id: Number(id) },
    })

    if (!institution) {
      return res
        .status(200)
        .json({ msg: `No institution with the id: ${id} found` })
    }

    /**
     * The delete function deletes a single record using an
     * id or unique identifier
     */
    await prisma.institution.delete({
      where: { id: Number(id) },
    })

    return res.json({
      msg: `Institution with the id: ${id} successfully deleted`,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    })
  }
}

export {
  getInstitution,
  getInstitutions,
  createInstitution,
  updateInstitution,
  deleteInstitution,
}

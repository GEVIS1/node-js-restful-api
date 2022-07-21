import prisma from '../../utils/prisma'
import { createDocument, getDocument, getDocuments } from './base'
import { institutionRelations } from '../../prisma/relations'
import { institutionType } from '../../prisma/modelTypes'

const Institution = prisma.institution

const getInstitution = getDocument(
  Institution,
  'institution',
  institutionRelations,
)
const getInstitutions = getDocuments(
  Institution,
  'institution',
  institutionRelations,
)

const createInstitution = createDocument(
  Institution,
  'institution',
  institutionRelations,
  institutionType
)

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

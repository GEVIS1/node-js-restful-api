import prisma from '../../utils/prisma'
import { getDocument, getDocuments, createDocument, updateDocument } from './base'
import { departmentRelations } from '../../prisma/relations'
import { departmentType } from '../../prisma/modelTypes'

const Department = prisma.department

const getDepartment = getDocument(
  Department,
  'department',
  departmentRelations,
  )
const getDepartments = getDocuments(
  Department,
  'department',
  departmentRelations,
)

const createDepartment = createDocument(
  prisma.department,
  'department',
  departmentRelations,
  departmentType,
)

const updateDepartment = updateDocument(
  Department,
  'department',
  departmentType,
)

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params

    const department = await prisma.department.findUnique({
      where: { id: Number(id) },
    })

    if (!department) {
      return res
        .status(200)
        .json({ msg: `No department with the id: ${id} found` })
    }

    await prisma.department.delete({
      where: { id: Number(id) },
    })

    return res.json({
      msg: `Department with the id: ${id} successfully deleted`,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    })
  }
}

export {
  getDepartment,
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
}

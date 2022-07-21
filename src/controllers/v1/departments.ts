import prisma from '../../utils/prisma'
import { getDocument, getDocuments, createDocument } from './base'
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

// const createDepartment = async (req, res) => {
//   try {
//     const { name, institutionId } = req.body

//     await prisma.department.create({
//       data: { name, institutionId },
//     })

//     const newDepartments = await prisma.department.findMany()

//     return res.status(201).json({
//       msg: 'Department successfully created',
//       data: newDepartments,
//     })
//   } catch (err) {
//     return res.status(500).json({
//       msg: err.message,
//     })
//   }
// }

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params
    const { name, institutionId } = req.body

    let department = await prisma.department.findUnique({
      where: { id: Number(id) },
    })

    if (!department) {
      return res
        .status(200)
        .json({ msg: `No department with the id: ${id} found` })
    }

    department = await prisma.department.update({
      where: { id: Number(id) },
      data: { name, institutionId },
    })

    return res.json({
      msg: `Department with the id: ${id} successfully updated`,
      data: department,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    })
  }
}

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

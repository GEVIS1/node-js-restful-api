import prisma from '../../utils/prisma.js'
import { getDocument } from './base'
const department = prisma.department

const getDepartment = getDocument(department)

const getDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany()

    if (departments.length === 0) {
      return res.status(200).json({ msg: 'No departments found' })
    }

    return res.json({ data: departments })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    })
  }
}

const createDepartment = async (req, res) => {
  try {
    const { name, institutionId } = req.body

    await prisma.department.create({
      data: { name, institutionId },
    })

    const newDepartments = await prisma.department.findMany()

    return res.status(201).json({
      msg: 'Department successfully created',
      data: newDepartments,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    })
  }
}

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

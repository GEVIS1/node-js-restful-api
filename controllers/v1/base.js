const getDocument = (model) => async (req, res) => {
  try {
    const { id } = req.params

    const model = await prisma.model.findUnique({
      where: { id: Number(id) },
    })

    if (!model) {
      return res
        .status(200)
        .json({ msg: `No ${model} with the id: ${id} found` })
    }

    return res.json({ data: model })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    })
  }
}

export { getDocument }

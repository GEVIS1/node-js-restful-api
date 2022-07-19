const getDocument = (model, relations, modelName) => async (req, res) => {
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

const getDocuments = (model, relations, modelName) => async (req, res) => {
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

export { getDocument, getDocuments }

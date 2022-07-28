import { Prisma } from '@prisma/client';
import { Relation } from '../../prisma/relations';
import { Request, Response } from 'express';
import Axios from 'axios';

/**
 * Uses body and modelType to return an object with all the properties of that modelType found in the body.
 * @param body The data sent in a request.
 * @param modelType An instance of the UncheckedCreateInput type for the model.
 * @returns
 */
function extractProperties(
  body:
    | Prisma.InstitutionUncheckedCreateInput
    | Prisma.DepartmentUncheckedCreateInput,
  modelType:
    | Prisma.InstitutionUncheckedCreateInput
    | Prisma.DepartmentUncheckedCreateInput
) {
  const properties = {};
  for (const [key, value] of Object.entries(body)) {
    if (key in modelType) {
      properties[key] = value;
    }
  }
  return properties;
}

/**
 * Capitalize an input string so the first letter is capitalized
 * @param word input word to be capitalized
 * @returns the capitalized word
 */
const capitalize = (word: string): string =>
  word[0].toUpperCase() + word.substring(1);

/**
 * Function taking in information about a model, returning a function able to fetch a document from the given model
 * @param model Prisma Model Delegate
 * @param modelName The name of the model
 * @param relations An instance of the Relation type. Used for populating the relations in the returned data.
 * @returns Function with the correct model set for use in the routes
 */
const getDocument =
  (
    /* eslint-disable */
    model: any,
    /* eslint-enable */
    modelName: string,
    relations: Relation | Partial<Relation>
  ) =>
    async (req, res) => {
      try {
        const { id } = req.params;

        const document: Prisma.DepartmentSelect | Prisma.InstitutionSelect =
        await model.findUnique({
          ...relations,
          where: { id: Number(id) },
        });

        if (!document) {
          return res
            .status(200)
            .json({ msg: `No ${modelName} with the id: ${id} found` });
        }

        return res.json({ data: document });
      } catch (err) {
        return res.status(500).json({
          msg: err.message,
        });
      }
    };

/**
 * Function taking in information about a model, returning a function able to fetch all documents from the given model
 * @param model Prisma Model Delegate
 * @param modelName The name of the model
 * @param relations An instance of the Relation type. Used for populating the relations in the returned data.
 * @returns Function with the correct model set for use in the routes
 */
const getDocuments =
  (
    /* eslint-disable */
    model: any,
    /* eslint-enable */
    modelName: string,
    relations: Relation | Partial<Relation>
  ) =>
    async (req, res) => {
      try {
      /**
       * The findMany function returns all records
       */
        const documents: Prisma.DepartmentSelect[] | Prisma.InstitutionSelect[] =
        await model.findMany({
          orderBy: { id: 'asc' },
          ...relations,
        });

        if (documents.length === 0) {
          return res.status(200).json({ msg: `No ${modelName} found` });
        }

        return res.json({ data: documents });
      } catch (err) {
        return res.status(500).json({
          msg: err.message,
        });
      }
    };

/**
 * Function taking in information about a model, returning a function able to insert a document into the given model
 * @param model Prisma Model Delegate
 * @param modelName The name of the model
 * @param relations An instance of the Relation type. Used for populating the relations in the returned data.
 * @param modelType An instance of the UncheckedCreateInput type for the model. Used to verify input data before insertion.
 * @returns Function with the correct model set for use in the routes
 */
const createDocument =
  (
    /* eslint-disable */
    model: any,
    /* eslint-enable */
    modelName: string,
    relations: Relation | Partial<Relation>,
    modelType:
      | Prisma.InstitutionUncheckedCreateInput
      | Prisma.DepartmentUncheckedCreateInput
  ) =>
    async (req, res) => {
      try {
      // Extract the required keys for the type
        const properties = extractProperties(req.body, modelType);

        const data = { ...properties };

        await model.create({
          data,
        });

        const newDocuments:
        | Prisma.DepartmentSelect[]
        | Prisma.InstitutionSelect[] = await model.findMany({
          orderBy: { id: 'asc' },
          ...relations,
        });

        return res.status(201).json({
          msg: `${capitalize(modelName)} successfully created`,
          data: newDocuments,
        });
      } catch (err) {
        return res.status(500).json({
          msg: err.message,
        });
      }
    };

const updateDocument =
  (
    /* eslint-disable */
    model: any,
    /* eslint-enable */
    modelName: string,
    modelType:
      | Prisma.InstitutionUncheckedCreateInput
      | Prisma.DepartmentUncheckedCreateInput
  ) =>
    async (req, res) => {
      try {
        const { id } = req.params;
        const properties = extractProperties(req.body, modelType);

        let document = await model.findUnique({
          where: { id: Number(id) },
        });

        if (!document) {
          return res
            .status(200)
            .json({ msg: `No ${modelName} with the id: ${id} found` });
        }

        /**
       * The update function updates a single record using an
       * id or unique identifier
       */
        document = await model.update({
          where: { id: Number(id) },
          data: properties,
        });

        return res.json({
          msg: `${capitalize(modelName)} with the id: ${id} successfully updated`,
          data: document,
        });
      } catch (err) {
        return res.status(500).json({
          msg: err.message,
        });
      }
    };

const deleteDocument =
  (
    /* eslint-disable */
    model: any,
    /* eslint-enable */
    modelName: string
  ) =>
    async (req, res) => {
      try {
        const { id } = req.params;

        const document = await model.findUnique({
          where: { id: Number(id) },
        });

        if (!document) {
          return res
            .status(200)
            .json({ msg: `No ${modelName} with the id: ${id} found` });
        }

        /**
       * The delete function deletes a single record using an
       * id or unique identifier
       */
        await model.delete({
          where: { id: Number(id) },
        });

        return res.json({
          msg: `${capitalize(modelName)} with the id: ${id} successfully deleted`,
        });
      } catch (err) {
        return res.status(500).json({
          msg: err.message,
        });
      }
    };

const seedData =
  (
    /* eslint-disable */
    model: any,
    /* eslint-enable */
    modelName: string,
    relations: Relation | Partial<Relation>,
    inputData: string
  ) =>
    async (req: Request, res: Response) => {
      try {
        const response = await Axios.get(inputData);
        const { data } = response;

        // Fail gracefully if the server doesn't reply 200 or the data is undefined
        if (response.status !== 200 || !data) {
          return res
            .status(500)
            .json({ msg: `Unable to get seeding data from '${inputData}'` });
        }

        // Clear the old data
        await model.deleteMany({});

        // Test for mangled json data by typechecking with a string
        if (typeof data === typeof String)
          throw Error(
            'Could not read JSON data. Possibly malformed JSON formatting.'
          );

        // Check if it's an array or a single object to use the correct create method
        if (Array.isArray(data))
          await model.createMany({ data: data, skipDuplicates: true });
        //if (Array.isArray(data)) await model.createMany({ data, skipDuplicates: true });
        else await model.create({ data });

        // Fetch the newly created documents
        const documents: Prisma.DepartmentSelect[] | Prisma.InstitutionSelect[] =
        await model.findMany({
          orderBy: { id: 'asc' },
          ...relations,
        });

        return res.status(201).json({
          msg: `Successfully seeded ${modelName} with data from ${inputData}.`,
          data: documents,
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          msg: err.message,
        });
      }
    };

export {
  getDocument,
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  seedData,
};

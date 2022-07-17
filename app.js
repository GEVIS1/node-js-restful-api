/**
 * The entry point for our express app
 */

import dotenv from 'dotenv'
import express, { urlencoded, json } from 'express'

/**
 * Routes to be added here later
 */

/**
 * You will create the routes for institutions and departments later
 */
 import institutions from "./routes/v1/institutions.js";
 import departments from "./routes/v1/departments.js";

dotenv.config()

const app = express()

const BASE_URL = "api"

/**
 * Current version of the API
 */
const CURRENT_VERSION = "v1"

/**
 * The port the app will listen to
 */
const PORT = process.env.PORT

app.use(urlencoded({ extended: false }))
app.use(json())

//app.use(`/${BASE_URL}/${CURRENT_VERSION}/TODO`, TODO)
app.use(`/${BASE_URL}/${CURRENT_VERSION}/institutions`, institutions)
app.use(`/${BASE_URL}/${CURRENT_VERSION}/departments`, departments)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
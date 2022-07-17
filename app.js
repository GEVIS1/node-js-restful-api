/**
 * The entry point for our express app
 */

import dotenv from 'dotenv'
import express, { urlencoded, json } from 'express'

import { institutions, departments } from "./routes/v1/"

/**
 * An object holding all the routes available in the API
 */
const routes = { institutions, departments }

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

for (const [routeName, route] of Object.entries(routes)) {
    app.use(`/${BASE_URL}/${CURRENT_VERSION}/${routeName}`, route)
}

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))

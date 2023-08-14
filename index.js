import initApp from './src/utils/initApp.js'
import express from 'express'
const app = express()
import {config}from 'dotenv'
config({path:'./Config/.env'})
import  cors from 'cors'
app.use(cors({}))


initApp(app,express)
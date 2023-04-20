import express from "express";
import cors from 'cors'
import taskRouter from './routes/task.routes.js'
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from 'swagger-ui-express'
import { options } from "./swaggerOptions.js";
const specs = swaggerJSDoc(options)

const app = express()
app.use(cors())
app.use(express.json())
app.use('/tasks',taskRouter)
app.use('/docs',swaggerUiExpress.serve,swaggerUiExpress.setup(specs))

app.get('/',(req,res)=>{
    res.json({
        message:'Server is running'
    })
})

export default app
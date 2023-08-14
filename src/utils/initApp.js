import ConnectionDB from "../../DB/ConnectionDB.js"
import { globalHandling } from "./errorHandling.js"
import * as allRoutes from '../modules/appRoutes.js'




const initApp  = (app,express) =>{
    app.use(express.json())
    const port = process.env.PORT || 5000
    ConnectionDB()

    // =================================================================
    app.get('/', (req, res) => res.send('Hello World!'))
    app.use('/product',allRoutes.productRouter)
// ================================================================================
    app.use(globalHandling)
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}



export default initApp
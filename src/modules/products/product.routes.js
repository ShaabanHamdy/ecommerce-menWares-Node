import { Router } from "express";
import * as controllers from './product.controller.js'
import { asyncHandler } from "../../utils/errorHandling.js";
import { myMulter } from "../../utils/multer.js";


const router = Router()




//================================================================  add product  

router.post("/addProduct",myMulter({}).fields([{ name: "mainImage", maxCount: 1 },{ name: "mainImage2", maxCount: 1 },{ name: "subImages", maxCount: 5 }]),
        // validationMiddle(validators.createProduct),
        asyncHandler(controllers.createProduct))

router.get("/getAllProducts",asyncHandler(controllers.getAllProducts))

router.delete("/deleteProduct/:_id" , asyncHandler(controllers.deleteProduct))


router.get("/getOneProduct/:_id" , asyncHandler(controllers.getOneProduct))


export default router
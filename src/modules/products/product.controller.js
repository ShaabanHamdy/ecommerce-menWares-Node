
import productModel from "../../../DB/models/products.js";
import cloudinary from "../../utils/cloudinary.js";
import { nanoid } from "nanoid"




export const createProduct = async (req, res, next) => {
    if (await productModel.findOne({ title: req.body.title })) return next(new Error("duplicate product name ", { cause: 409 }))
    // req.body.createdBy = req.user._id
    // req.body.slug = slugify(req.body.name, '-')
    req.body.priceAfterDiscount = Number.parseFloat(req.body.price - (req.body.discount / 100 * req.body.price)).toFixed(2)
    req.body.customId = nanoid(4)
    //    =============================================================================
    const mainImage = await cloudinary.uploader.upload(req.files.mainImage[0].path,
        { folder: `/products/mainImage/${req.body.customId}` })
    req.body.mainImage =  mainImage.secure_url, mainImage.public_id 
    // ===============================================================================
    const img2 =
        await cloudinary.uploader.upload(req.files.mainImage2[0].path,
            { folder: `/products/mainImage2/${req.body.customId}` })
    req.body.mainImage2 = img2.secure_url, img2.public_id

    // /===================================================
    if (req.body?.subImages) {
        req.body.subImages = []
        for (const file of req.files.subImages) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, { folder: `${process.env.FILE_NAME}/product/mainImage/${req.body.customId}/subImages` })
            req.body.subImages.push({ secure_url, public_id })
        }
    }

    const product = await productModel.create(req.body)
    if (!product) return next(new Error("fail to create this product ", { cause: 409 }))
    res.status(201).json({ message: "success", product })
}
//=================================================== get Products
export const getAllProducts = async (req, res, next) => {
    // let apiFeature = new ApiFeatures(productModel.find(), req.query)
    // .pagination()
    // .filtration()
    // .search()
    // .fields()
    // .sort()

    // let page = apiFeature.page
    const products = await productModel.find()
    //===========================================================
    // for (let i = 0; i < products.length; i++) {
    //     let calcRating = 0
    //     for (let j = 0; j < products[i].reviews.length; j++) {
    //         calcRating += products[i].reviews[j].rating
    //     }
    //     let avgRating = calcRating / products[i].reviews.length
    //     const product = products[i].toObject()
    //     product.avgRating = avgRating
    //     products[i] = product

    // }
    // const category = await categoryModel.find()
    // if (!products.length) return next(new Error("not products available"))

    res.status(201).json({ message: "success", products })

}


//==============================================================
export const deleteProduct = async (req, res, next) => {

    const product = await productModel.findByIdAndDelete(req.params._id)

    if (product) {

        return res.json({ message: "delete Done" })
    }
    next(new Error("fail in delete"))


}

export const getOneProduct = async (req, res, next) => {

    const product = await productModel.findById(req.params._id)

    if (!product) {

        return next(new Error ("there is not product with ") )
    }
    res.json({message:"success" , product})
}






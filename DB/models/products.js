import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, },
    description: { type: String, required: true, },
    price: { type: Number, required: true, },
    discount: { type: Number , default: 0},
    priceAfterDiscount: { type: Number },
    stock: { type: Number},
    quantity: { type: Number, default: 1,mon:0,required:[true,"Product quantity required"] },
    sold: { type: Number , default: 0 , min:0},
    size: { type: [String], enum: ['s', 'm', 'lg', 'xl'] },
    mainImage: { type: Object, required: true },
    mainImage2: { type: Object, required: true },
    subImages: { type: [Object] },
    customId: String,

});


const productModel = mongoose.models.Product || mongoose.model('Product', productSchema);

export default productModel
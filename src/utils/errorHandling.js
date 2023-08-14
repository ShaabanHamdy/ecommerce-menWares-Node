



export const asyncHandler = (API) => {
    return (req, res, next) => {
        API(req, res, next).catch(err => {
            next(new Error(err, { cause: 500 }))
        })
    }
}


export const globalHandling = (err, req, res, next) => {

    if (process.env.MOOD == "DEV") {

        return res.status(err.cause || 500).json({ message: err.message, stack: err.stack })
    }
    return res.status(err.cause || 500).json({ message: err.message })
}



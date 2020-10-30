module.exports = async (req, res, next) => {
    try {
        const keys = Object.keys(req.body)
        const body = {}

        for (const key of keys) {
            body[key] = configHolder.secureUtility.decryptData(req.body[key])
        }

        req.body = body
        next()
    } catch (err) {
        err.statusCode = 500;
        if (err.message.includes('wrong final block length')) {
            err.message = 'Payload not allowed in the format!'
            err.statusCode = 406
        }
        next(err)
    }
}
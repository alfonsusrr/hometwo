
const withMethodCheck = async (req, res, methods) => {
    if (!methods.includes(req.method)) {
        return res.status(405).json({
            success: false,
            message: `${req.method} method is not allowed`
        })
    }
}

module.exports =  withMethodCheck
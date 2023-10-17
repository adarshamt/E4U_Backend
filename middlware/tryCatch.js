const tryCatch = (controller) => {
    return async (req, res, next) => {
        try {
            await controller(req, res, next);
        } catch (error) {
            // console.error(error.message)
            res.status(500).json({
                status: "failure",
                message: "something went wrong++++++++++++++++---------------------",
                error_message: error.message
            })
        }
    }
}

module.exports = tryCatch
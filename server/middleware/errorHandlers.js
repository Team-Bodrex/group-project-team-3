function errorHandler(err, req, res, next) {
    if (err.name === 'SequelizeValidationError') {
        res.status(400).json({message: err.errors.map((err) => err.message)})
    } else if (err.name === 'SequelizeUniqueConstraintError') { 
        res.status(400).json({message: err.errors.map((err) => err.message)})
    } else if (err.name === 'EmailBadRequest') {
        res.status(400).json({message: `Email is required`})
    } else if (err.name === 'PasswordBadRequest') {
        res.status(400).json({message: `Password is required`})
    } else if (err.name === 'InvalidUserInput') {
        res.status(401).json({message: `Invalid email/password`})
    } else if (err.name === 'InvalidToken') {
        res.status(401).json({message: `Invalid token`})
    } else if (err.name === 'Unauthorized') {
        res.status(403).json({message: `You are not authorized`})
    } else {
        res.status(500).json({message: `Internal Server Error`})
        // res.status(500).json(err.message)
        // console.log(err)
    }
}

module.exports = errorHandler;
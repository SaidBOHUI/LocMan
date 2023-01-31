const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if (!token) {
            return res.status(400).json({msg : "Authentificaton invalide"})
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

            if (err){
                return res.status(400).json({msg : "Erreur Authentitificaton"})
            }
            req.user = user

            next()
        }) 
    } catch (error) {
        console.log('in the catch');
        return res.status(500).json({msg : error.message})
    }
}

module.exports = auth
const router = require('express').Router();
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const cloudinary = require('cloudinary');
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// Upload une image sur Cloudinary
router.post('/upload', auth, authAdmin, (req, res) => {
    try {
        // console.log(req, 'REQUEST UPLOAD');
        console.log(req.files, 'files');
        if (!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({msg : "Aucun fichier n'a été uploadé"})
        }
        
        const file = req.files.file;
        // const file = req.files.undefined;
        // console.log(file, 'file');

        if (file.size > 1024*1024){//if file.size > 1mb
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg : "Le fichier déposé est trop volumineux"})
        }

        if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg : "Le format du fichier est incorrect."})
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder : "Locman"}, async(err, result) => {
            if (err) {console.log(err); throw err;}
            removeTmp(file.tempFilePath)
            res.json({public_id: result.public_id, url: result.secure_url})
        })
    } catch (error) {
        console.log(error, 'ERROR');
        return res.status(500).json({msg : error})
    }
})

// Supprimer une image sur cloudinary
router.post('/destroy', auth, authAdmin, (req, res) => {
    try {
        const {public_id} = req.body;
        if (!public_id) return res.status(400).json({msg : 'Aucune image selectionnée '})

        cloudinary.v2.uploader.destroy(public_id, async(err, result) =>{
            if (err) throw err

            res.json({msg : "image supprimée"})
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg : error})
    }
})

const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if(err) throw err; 
    })
}

module.exports = router
const router = require('express').Router();
const cloudinary = require('cloudinary')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

// Pour stocker les images sur cloudinary

router.route('/')
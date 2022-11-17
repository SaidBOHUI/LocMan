require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')



const app = express()
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

//Routes
app.use("/user", require('./routes/userRouter'))
// app.use("/api", require('./routes/bookRouter'))
// app.use("/citation", require('./routes/citationRouter'))

// connect to MongoDB
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    // useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err){
        throw err
    }
    console.log(mongoose.connection.readyState)
    console.log('connected to mongoDB');
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})

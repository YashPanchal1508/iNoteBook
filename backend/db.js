const mongoose = require('mongoose')

const mongoURI = "mongodb+srv://yashpanchal1508:yash@cluster0.fmvg9gu.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = () =>{

    mongoose.connect(mongoURI, (err)=> {
        if(!err){
            console.log("Connected to MongoDB")
        }
        else{
            console.log(err)
        }
    })


}

module.exports = connectToMongo;
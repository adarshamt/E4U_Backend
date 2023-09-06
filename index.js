const express =require ('express')

const app = express()

const mongoose = require('mongoose')

const cors = require('cors')
const morgan = require('morgan')

const fileUpload = require('express-fileupload')

const product = require ('./model/productSchema')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(morgan('dev')) 


// app.use(fileUpload({
//   useTempFiles : true

  
//   }))


mongoose
  .connect("mongodb://127.0.0.1:27017/E4U_DataBase", {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

  

  // app.get("/products",async(req,res)=>{
  //   const productData = await product.find()
  //   res.json(productData)
     
  // })

  const userRouter= require('./routes/userRoutes')
  app.use(userRouter)


  const storeRouter = require('./routes/storeRoutes')
  app.use(storeRouter)

  const productRouter = require('./routes/productRouter')
  app.use(productRouter)





 

app.listen(4743,()=>{


    console.log('server is running at port 4743')
}
)
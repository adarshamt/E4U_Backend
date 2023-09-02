const express =require ('express')

const app = express()

const mongoose = require('mongoose')

const cors = require('cors')
const morgan = require('morgan')




app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
mongoose
  .connect("mongodb://127.0.0.1:27017/E4U_DataBase", {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

  app.set("vie engine","ejs")

  app.get("/upload",(req,res)=>{
    res.render("image upload")
  })

  const userRouter= require('./routes/userRoutes')
  app.use(userRouter)


  const storeRouter = require('./routes/storeRoutes')
  app.use(storeRouter)

  const productRouter = require('./model/productSchema')
  app.use(productRouter)





 

app.listen(4743,()=>{


    console.log('server is running at port 4743')
}
)
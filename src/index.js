import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import contactRoutes from "./routes/contact";
import userRoutes from "./routes/user";
import loginRoutes from "./routes/login";
import blogRoutes  from "./routes/blog"
const docs = require('./documentation/');
const swaggerUI = require("swagger-ui-express");
const {userSpec, loginSpec, contactSpec, blogSpec} = require('./documentation/swagger');


// const documentation = require('./helper/documentations');
// const components = require('./helper/definitions');
// const swaggerUi = require('swagger-ui-express');
// const options = Object.assign({}, documentation, components);
// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerSpec = swaggerJsdoc(options);


dotenv.config();
mongoose.set('strictQuery', true);
    const app  = express();

mongoose.connect(`mongodb+srv://${process.env.ADMIN_NAME}:${process.env.ADMIN_PASSWORD}@my-brand-fabrice.7myztk9.mongodb.net/?retryWrites=true&w=majority`,{ useNewUrlParser: true })
.then(()=>{
    // const app  = express();
    const PORT = process.env.PORT;
    app.use(express.json())
    // app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


    app.use("/api", contactRoutes)
    app.use("/api", userRoutes)
    app.use("/api", loginRoutes)
    app.use("/api", blogRoutes)
    app.use('/api-doc',swaggerUI.serve,swaggerUI.setup(docs));



  /*------------------------ by default*--------------------*/
   app.use((req, res) => {
    res.status(404).send({ error: 'Endpoint not found' });
  });
  /*------------------------ by default*--------------------*/


    app.listen(PORT, ()=>{
        console.log(`server started port ${PORT}...`);
    })
})


module.exports = { app };

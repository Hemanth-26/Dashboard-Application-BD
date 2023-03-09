const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const dotenv = require("dotenv");
const {v4: uuid4} = require('uuid');
const cors = require('cors');

const app = express();
const upload = multer();
dotenv.config();

/**Custom Modules */
const databaseConnection = require('./database/conn');
const RegisterRouter = require('./routers/register');
const LoginRouter = require('./routers/login');

/**Local Variables */
const PORT = process.env.PORT || 4000;

/**Middleware */
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(upload.array());

/**Routers */
app.use('/register', RegisterRouter);
app.use('/login', LoginRouter);

/**Requests */
app.get("/", (req, res) => {
   res.status(200).send("Server Running Successfully"); 
});


databaseConnection().then(() => {
    try {
        app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
    }catch(err) {
        console.error("Error : Could not connect to server");
    };
}).catch((err) => {
    console.error("Error : Invalid database connection");
});
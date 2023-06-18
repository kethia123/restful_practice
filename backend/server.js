const express = require('express');
const cookieParser = require('cookie-parser');
const swaggerUi = require("swagger-ui-express");
require('dotenv').config();
const cors = require('cors');

const connectToMongoDB = require('./database'); // Assuming you have a separate file for connecting to MongoDB

// Create Express app
const app = express();

// Connect to MongoDB
connectToMongoDB(process.env.MONGO_URI);

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
    express.urlencoded({ extended: true })
);

// Routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Vehicle Tracking Management System." });
});

require("./app/routes/user.routes")(app);
require("./app/routes/vehicle.routes")(app);
require("./app/routes/carOwner.routes")(app);
require("./app/routes/vehicleCarOwner.routes")(app);

//documentation
const swaggerDocs = require('./swagger.json');
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs, false, {
  docExpansion: "none"
}))



// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
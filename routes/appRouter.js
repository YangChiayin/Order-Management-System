const express = require("express");
const router = express.Router();

// Import validators, controllers
const { orderValidators } = require("../middleware/orderValidator");
const { getAddOrder, postAddOrder, getAllOrders, getOneOrder,getDeleteOneOrder } = require("../controllers/orderController");

// Define routes
router
    .get("/", getAddOrder)
    .post("/", orderValidators, postAddOrder)
    .get("/orders", getAllOrders)
    .get("/orders/:id", getOneOrder)
    .get("/orders/:id/delete", getDeleteOneOrder)
    ;

// Export the router
module.exports = router;

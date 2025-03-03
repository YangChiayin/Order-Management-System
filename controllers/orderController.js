const { validationResult } = require("express-validator");
const { Order } = require("../models/orderModel")

const productOnePrice = 10;
const productTwoPrice = 20;
const productThreePrice = 30;

const getAddOrder = (req, res) => {
    res.render("pages/addorder", { productOnePrice, productTwoPrice, productThreePrice });
};

const postAddOrder = (req, res) => {
    let errors = validationResult(req);

    // If there are errors
    if (!errors.isEmpty()) {
        res.render("pages/addorder", {
            errors: errors.array(),
            customerName: req.body.customerName,
            customerEmail: req.body.customerEmail,
            customerPhone: req.body.customerPhone,
            customerAddress: req.body.customerAddress,
            customerCity: req.body.customerCity,
            customerPostCode: req.body.customerPostCode,
            productOneQuantity: req.body.productOneQuantity,
            productTwoQuantity: req.body.productTwoQuantity,
            productThreeQuantity: req.body.productThreeQuantity,
            productOnePrice,
            productTwoPrice,
            productThreePrice
        })
    } else {
        let subtotal = 0;
        let taxRate = 0;
        let tax = 0;
        let total = 0;
        let shippingCharge = 0;

        let customerName = req.body.customerName;
        let customerEmail = req.body.customerEmail;
        let customerPhone = req.body.customerPhone;
        let customerAddress = req.body.customerAddress;
        let customerCity = req.body.customerCity;
        let customerPostCode = req.body.customerPostCode;
        let province = req.body.province;

        let productOneQuantity = parseInt(req.body.productOneQuantity) || 0;
        let productTwoQuantity = parseInt(req.body.productTwoQuantity) || 0;
        let productThreeQuantity = parseInt(req.body.productThreeQuantity) || 0;

        let productOneLineTotal = productOneQuantity * productOnePrice;
        let productTwoLineTotal = productTwoQuantity * productTwoPrice;
        let productThreeLineTotal = productThreeQuantity * productThreePrice;

        let deliveryTime = req.body.deliveryTime;

        switch (province) {
            case "ON":
                taxRate = 0.13;
                break;
            case "AB":
                taxRate = 0.05;
                break;
            case "BC":
                taxRate = 0.12;
                break;
            case "MB":
                taxRate = 0.12;
                break;
            case "NB":
                taxRate = 0.15;
                break;
            case "NL":
                taxRate = 0.15;
                break;
            case "NS":
                taxRate = 0.15;
                break;
            case "PE":
                taxRate = 0.15;
                break;
            case "QC":
                taxRate = 0.14975;
                break;
            case "SK":
                taxRate = 0.11;
                break;
            case "NT":
            case "NU":
            case "YT":
                taxRate = 0.05;
                break;
            default:
                taxRate = 0.13;
                break;
        }

        switch (deliveryTime) {
            case "twoDays":
                shippingCharge = 40;
                break;
            case "threeDays":
                shippingCharge = 30;
                break;
            case "fourDays":
                shippingCharge = 20;
                break;
            case "fiveDays":
                shippingCharge = 10;
                break;
            default:
                shippingCharge = 10;
                break;
        }

        subtotal = productOneLineTotal + productTwoLineTotal + productThreeLineTotal + shippingCharge;
        tax = subtotal * taxRate;
        total = subtotal + tax;

        let data = {
            customerName,
            customerEmail,
            customerPhone,
            address: `${customerAddress}, ${customerCity}, ${province}, ${customerPostCode}`,
            products: [
                { name: "Product 1", price: productOnePrice, quantity: productOneQuantity, lineTotal: productOneLineTotal },
                { name: "Product 2", price: productTwoPrice, quantity: productTwoQuantity, lineTotal: productTwoLineTotal },
                { name: "Product 3", price: productThreePrice, quantity: productThreeQuantity, lineTotal: productThreeLineTotal },
            ],
            shippingCharge,
            subtotal,
            taxRate,
            tax,
            total

        }

        let newOrder = new Order(data);

        newOrder.save()
            .then(() => { console.log(`${customerName}'s Order Saved!`) })
            .catch((error) => { console.log(error.message); });

        res.render("pages/receipt", data);
    };
}

const getAllOrders = async (req, res) => {
    let orders = await Order.find({}).exec();
    res.render("pages/orders", { orders });
};

const getOneOrder = async (req, res) => {
    let myOrder = await Order.findById(req.params.id).exec();
    res.render("pages/receipt", myOrder);
};

const getDeleteOneOrder = async (req, res) => {
    await Order.findByIdAndDelete(req.params.id).exec();
    res.redirect("/orders");
};


module.exports = {
    getAddOrder,
    postAddOrder,
    getAllOrders,
    getOneOrder,
    getDeleteOneOrder
};

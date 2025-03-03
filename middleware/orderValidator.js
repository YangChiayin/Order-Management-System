const { check, oneOf } = require("express-validator");

const orderValidators = [
    check("customerName").notEmpty().withMessage("Please enter your name"),
    check("customerEmail").matches(/^\w+@\w+\.\w+$/).withMessage("Please enter a valid email address"),
    check("customerPhone").matches(/^\d{3}-\d{3}-\d{4}$/).withMessage("Please enter a valid phone number"),
    check("customerAddress").notEmpty().withMessage("Please enter your address"),
    check("customerCity").notEmpty().withMessage("Please enter your city"),
    check("customerPostCode").matches(/^[A-Z]\d[A-Z] \d[A-Z]\d$/).withMessage("Please enter a valid post code"),

    check("productOneQuantity")
        .optional({ values: "falsy" })
        .matches(/^[1-9]\d*$/)
        .withMessage("Product 1 quantity should be a positive number"),
    check("productTwoQuantity")
        .optional({ values: "falsy" })
        .matches(/^[1-9]\d*$/)
        .withMessage("Product 2 quantity should be a positive number"),
    check("productThreeQuantity")
        .optional({ values: "falsy" })
        .matches(/^[1-9]\d*$/)
        .withMessage("Product 3 quantity should be a positive number"),
    oneOf([
        check("productOneQuantity").notEmpty(),
        check("productTwoQuantity").notEmpty(),
        check("productThreeQuantity").notEmpty()
    ], { message: "Please purchase at lease one product" })
];

module.exports = {
    orderValidators
};

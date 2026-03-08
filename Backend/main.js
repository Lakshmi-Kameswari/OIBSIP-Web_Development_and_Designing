npm init - y
npm install express mongoose cors bcryptjs jsonwebtoken nodemailer razorpay dotenv
const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/pizzaApp");
        console.log("MongoDB Connected");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "user"
    },
    verified: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("User", UserSchema);
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: String,
    base: String,
    sauce: String,
    cheese: String,
    veggies: [String],
    status: {
        type: String,
        default: "Order Received"
    },
    paymentId: String
});

module.exports = mongoose.model("Order", OrderSchema);
const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
    base: String,
    sauce: String,
    cheese: String,
    veggie: String,
    stock: Number
});

module.exports = mongoose.model("Inventory", InventorySchema);
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async(req, res) => {

    const { name, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hash
    });

    await user.save();

    res.json({ message: "User Registered" });

});

router.post("/login", async(req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).send("User not found");

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(400).send("Invalid password");

    const token = jwt.sign({ id: user._id }, "secret");

    res.json({ token });

});

module.exports = router;
const express = require("express");

const router = express.Router();

router.get("/options", (req, res) => {

    res.json({
        bases: ["Thin Crust", "Cheese Burst", "Pan", "Hand Tossed", "Wheat"],
        sauces: ["Tomato", "Pesto", "Barbeque", "Garlic", "White"],
        cheese: ["Mozzarella", "Cheddar", "Parmesan"],
        veggies: ["Onion", "Capsicum", "Mushroom", "Corn", "Olives"]
    });

});

module.exports = router;
const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

router.post("/create", async(req, res) => {

    const order = new Order(req.body);

    await order.save();

    res.json({ message: "Order placed" });

});

router.get("/all", async(req, res) => {

    const orders = await Order.find();

    res.json(orders);

});

module.exports = router;
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const pizzaRoutes = require("./routes/pizzaRoutes");
const orderRoutes = require("./routes/orderRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/pizza", pizzaRoutes);
app.use("/api/order", orderRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CustomPizza from "./pages/CustomPizza";

function App() {
    return ( <
        BrowserRouter >
        <
        Routes >

        <
        Route path = "/"
        element = { < Login / > }
        /> <
        Route path = "/register"
        element = { < Register / > }
        /> <
        Route path = "/dashboard"
        element = { < Dashboard / > }
        /> <
        Route path = "/pizza"
        element = { < CustomPizza / > }
        />

        <
        /Routes> < /
        BrowserRouter >
    );
}

export default App;
import React, { useState } from "react";

function PizzaBuilder({ options }) {

    const [pizza, setPizza] = useState({});

    const select = (type, value) => {
        setPizza({...pizza, [type]: value });
    };

    return ( <
        div >

        <
        h2 > Choose Base < /h2>

        {
            options.bases.map(b => ( <
                button onClick = {
                    () => select("base", b)
                } > { b } < /button>
            ))
        }

        <
        h2 > Choose Sauce < /h2>

        {
            options.sauces.map(s => ( <
                button onClick = {
                    () => select("sauce", s)
                } > { s } < /button>
            ))
        }

        <
        h2 > Cheese < /h2>

        {
            options.cheese.map(c => ( <
                button onClick = {
                    () => select("cheese", c)
                } > { c } < /button>
            ))
        }

        <
        h2 > Veggies < /h2>

        {
            options.veggies.map(v => ( <
                button onClick = {
                    () => select("veggies", v)
                } > { v } < /button>
            ))
        }

        <
        /div>
    );
}

export default PizzaBuilder; <
script src = "https://checkout.razorpay.com/v1/checkout.js" > < /script>
const options = {
    key: "RAZORPAY_TEST_KEY",
    amount: 50000,
    currency: "INR",
    name: "Pizza App",
    handler: function(response) {
        alert("Payment Successful");
    }
};

const rzp = new window.Razorpay(options);
rzp.open();
if (stock < 20) {

    transporter.sendMail({
        to: "admin@email.com",
        subject: "Low Stock Alert",
        text: "Pizza base stock below threshold"
    });

}

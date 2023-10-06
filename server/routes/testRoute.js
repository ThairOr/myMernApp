import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
    console.log("Hi!!");
    res.json({
        message:" hi back"
    })
})

export default router
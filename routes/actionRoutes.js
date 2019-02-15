const express = require("express");
const router = express.Router();

const actionModel = require("../data/helpers/actionModel");
const projectModel = require("../data/helpers/projectModel");

router.get("/", async (req, res) => {
  try {
    let act = actionModel.get();
    res.status(200).json({ act });
  } catch (err) {
    res.status(500).json({
      message: "Could not get actions."
    });
  }
});

module.exports = router;

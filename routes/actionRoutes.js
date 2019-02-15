const express = require("express");
const router = express.Router();

const actionModel = require("../data/helpers/actionModel");
const projectModel = require("../data/helpers/projectModel");

router.get("/", async (req, res) => {
  try {
    let action = actionModel.get();
    res.status(200).json({ action });
  } catch (err) {
    res.status(500).json({
      message: "Could not get actions."
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let action = await actionModel.get(req.params.id);
    if (!action) {
      res.status(404).json({
        message: "Action with that id does not exist."
      });
    } else {
      res.status(200).json({ action });
    }
  } catch (err) {
    res.status(404).json({
      message: "Could not find action."
    });
  }
});

module.exports = router;

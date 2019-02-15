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

router.post("/", async (req, res) => {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json({
      message: "Please provide project id, description and notes."
    });
  }
  try {
    let projectId = await projectModel.get(req.body.project_id);
    let newActReq = {
      project_id: req.body.project_id,
      description: req.body.description,
      notes: req.body.notes
    };
    if (req.body.completed) {
      newActReq.completed = req.body.completed;
    }
    let newAct = await actionModel.insert(newActReq);
    res.status(201).json({ newAct });
  } catch (err) {
    res.status(500).json({
      message: "Could not add new action."
    });
  }
});

module.exports = router;

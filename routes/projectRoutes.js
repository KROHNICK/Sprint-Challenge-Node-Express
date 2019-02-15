const express = require("express");
const router = express.Router();

const projectModel = require("../data/helpers/projectModel");

router.get("/", async (req, res) => {
  try {
    let projects = await projectModel.get();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({
      message: "Could not get projects."
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let project = await projectModel.get(req.params.id);
    if (!project) {
      res.status(404).json({
        message: "Project with that id does not exist."
      });
    } else {
      res.status(200).json({
        project
      });
    }
  } catch (err) {
    res.status(404).json({
      message: "Could not find project."
    });
  }
});

router.post("/", async (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({
      message: "Please provide name and description."
    });
  }
  try {
    let newProjReq = {
      name: req.body.name,
      description: req.body.description
    };
    let newProj = await projectModel.insert(newProjReq);
    res.status(201).json({ newProj });
  } catch (err) {
    res.status(500).json({
      message: "Could not add new project."
    });
  }
});

router.put("/:id", async (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({
      message: "Please provide name and description."
    });
  }
  try {
    let newProjReq = {
      name: req.body.name,
      description: req.body.description
    };
    let projId = await projectModel.get(req.params.id);
    let newProj = await projectModel.update(req.params.id, newProjReq);
    res.status(200).json({ newProj });
  } catch (err) {
    res.status(500).json({
      message: "Could not update project."
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let newProj = await projectModel.remove(req.params.id);
    res.status(200).json({
      message: "Project deleted."
    });
  } catch (err) {
    res.status(500).json({
      message: "Could not delete project."
    });
  }
});

module.exports = router;

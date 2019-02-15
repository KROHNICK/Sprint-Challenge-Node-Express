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

module.exports = router;

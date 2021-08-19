const router = require("express").Router();
const db = require("../models/Workout.js");

router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch (err => {
        res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch (err => {
        res.status(400).json(err);
    });
  });

router.put("/api/workouts/:id", (req, res)=> {
    db.Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body }}, function (err, dbWorkout) {
        res.send(dbWorkout);
      });
});

router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

module.exports = router;
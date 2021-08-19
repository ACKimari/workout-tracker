const router = require("express").Router();
const Workout = require("../models/Workout.js");

router.get("/api/workouts", (req, res) => {
    Workout.find({})
    .then(workouts => {
        res.json(workouts);
    })
    .catch (err => {
        res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res)=> {
    Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body }}, function (err, workout) {
        res.send(workout);
      });
});

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
      .then(workouts => {
        res.json(workouts);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });
  
  router.post("/api/workouts/range", ({ body }, res) => {
    Workout.insertMany(body)
      .then(workouts => {
        res.json(workouts);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });


module.exports = router;
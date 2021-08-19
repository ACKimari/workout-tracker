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
})
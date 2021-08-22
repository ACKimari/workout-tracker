const router = require("express").Router();
const db = require("../models/Workout.js");

router.get("/api/workouts", (req, res) => {
    db.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    db.aggregate([{
        $addFields: {
            totalDuration: { $sum: "$exercises.duration"}
        }
    }])
        .sort({ date: -1 })
        .limit(7)
        .then(dbWorkout => {
            console.log(dbWorkout);
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.put("/api/workouts/:id", (req, res) => {
    db.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } }, function (err, dbWorkout) {
        res.send(dbWorkout);
    });
});

router.post("/api/workouts", ({ body }, res) => {
    db.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;
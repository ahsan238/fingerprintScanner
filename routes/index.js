var express = require('express');
const fingerprint = require('../models/fingerprint');
var Task = require('../models/task');
var Fingerprint = require('../models/fingerprint');

var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   Task.find()
//     .then((tasks) => {      
//       const currentTasks = tasks.filter(task => !task.completed);
//       const completedTasks = tasks.filter(task => task.completed === true);

//       console.log(`Total tasks: ${tasks.length}   Current tasks: ${currentTasks.length}    Completed tasks:  ${completedTasks.length}`)
//       res.render('index', { currentTasks: currentTasks, completedTasks: completedTasks });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send('Sorry! Something went wrong.');
//     });
// });


/* GET home page. */
router.get('/', function(req, res, next) {
  Fingerprint.find()
    .then((fp) => {      
      res.render('index', { currentFingerprints: fp});
    })
    .catch((err) => {
      console.log(err);
      res.send('Sorry! Something went wrong.');
    });
});

router.get('/fingerprint', function(req, res, next) {
  res.render('fpScan');
});


router.post('/addFingerprint', function(req, res, next) {
  const fingerPrint = req.body.fingerPrint
  const description = req.body.description
  const email = req.body.email
  const fpHash = req.body.fpHash
  const createDate = Date.now()

  var fp = new Fingerprint({
    fingerPrint: fingerPrint,
    createDate: createDate,
    email: email,
    hashvalue: fpHash,
    description: description
  })

  fp.save()
      .then(() => { 
        console.log(`Added a new fingerprint ${fpHash} - createDate ${createDate}`)        
        res.redirect('/'); })
      .catch((err) => {
          console.log(err);
          res.send('Sorry! Something went wrong.');
      });
})

router.post('/deleteFingerprint', function(req, res, next) {
  const fingerprintId = req.body._id;
  const completedDate = Date.now();
  Fingerprint.findByIdAndDelete(fingerprintId)
    .then(() => { 
      console.log(`Deleted fingerprint $(fingerprintId)`)      
      res.redirect('/'); }  )
    .catch((err) => {
      console.log(err);
      res.send('Sorry! Something went wrong.');
    });
});



router.post('/addTask', function(req, res, next) {
  const taskName = req.body.taskName;
  const createDate = Date.now();
  
  var task = new Task({
    taskName: taskName,
    createDate: createDate
  });
  console.log(`Adding a new task ${taskName} - createDate ${createDate}`)

  task.save()
      .then(() => { 
        console.log(`Added new task ${taskName} - createDate ${createDate}`)        
        res.redirect('/'); })
      .catch((err) => {
          console.log(err);
          res.send('Sorry! Something went wrong.');
      });
});

router.post('/completeTask', function(req, res, next) {
  console.log("I am in the PUT method")
  const taskId = req.body._id;
  const completedDate = Date.now();

  Task.findByIdAndUpdate(taskId, { completed: true, completedDate: Date.now()})
    .then(() => { 
      console.log(`Completed task ${taskId}`)
      res.redirect('/'); }  )
    .catch((err) => {
      console.log(err);
      res.send('Sorry! Something went wrong.');
    });
});


router.post('/deleteTask', function(req, res, next) {
  const taskId = req.body._id;
  const completedDate = Date.now();
  Task.findByIdAndDelete(taskId)
    .then(() => { 
      console.log(`Deleted task $(taskId)`)      
      res.redirect('/'); }  )
    .catch((err) => {
      console.log(err);
      res.send('Sorry! Something went wrong.');
    });
});


module.exports = router;

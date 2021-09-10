var express = require('express');
var router = express.Router();
const User = require('../models/user');

router.get('/todo', (req, res) => {
  User.findOne({ username: req.user.username }, (e, data) => {
    if (e) {
      res.status(403).send('You are not authorized to view this page.');
    }
    res.json(data.todos);
  });
});

router.post('/todo', async (req, res) => {
  User.findOne({ username: req.user.username }).then((user) => {
    id_num = user.todos.length;
    user.todos.push({ task: req.body.task, refID: id_num });
    user.save().then(res.send('Task Updated'));
  });
});

router.delete('/todo/delete/:id', async (req, res) => {
  User.findOneAndUpdate(
    { username: req.user.username },
    { $pull: { todos: { _id: req.params.id } } },
    { new: true },
    function (error, doc) {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(204).send('Task Deleted');
      }
    }
  );
});

module.exports = router;

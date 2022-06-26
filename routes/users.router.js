const express = require('express');
const router = express.Router();
const faker = require('faker');

// Query params.
router.get('/', (req, res) => {
  const users = [];
  const usersLimit = 5;

  for (let index = 0; index < usersLimit; index++) {
    users.push({
      user: faker.name.findName(),
      email: faker.internet.email()
    });
  }

  res.json(users);

});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  res.json({
    userId,
    user: faker.name.findName(),
    email: faker.internet.email()
  });

});

module.exports = router;
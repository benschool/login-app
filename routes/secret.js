const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  if(req.isAuthenticated()) return res.send('<img src="https://static01.nyt.com/images/2016/09/28/us/28xp-pepefrog/28xp-pepefrog-articleInline.jpg?quality=75&auto=webp&disable=upscale">');
  res.send('You\'re not authenticated! Go away')
});

module.exports = router;

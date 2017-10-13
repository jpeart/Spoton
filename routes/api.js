const router = require('express').Router();
const tokenCheck = require('../middleware/tokenCheck')

// This is the critical part of the middleware! Here we are
// telling express to use our tokenCheck for every route defined
// on this router, which gives us a lot of flexibility
router.use(tokenCheck);


// router
//   .get('/users', (req, res)=>{res.json([1, 2, 3, 4, 5, 6]);
// });

router
  .get('/users/:id', (req, res)=>{console.log(req.params.id)});

// router.get('/fanta', (req, res)=>{
//     res.json([,9,8,7]);
// });


module.exports = router;

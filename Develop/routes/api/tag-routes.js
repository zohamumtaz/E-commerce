const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll()
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne( {
    where: {
      id: req.params.id
    },
    include: [{ model: Product }]
  })
    
   .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with this id!' });
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  const result = Tag.create(req.body).then(tagdata=>{
    res.status(200).json(tagdata);
  });
 
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value

  const result = Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {returning: true, where: {id: req.params.id,},}).then(result=>{
      if(result)
      {
         Number=0;
      }
      if (!result) {
        res
          .status(404)
          .json({ message: "No id found in tag ." });
        return;
      }
      res.status(200).json(result);
    });
 

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'id of this tag not found!' });
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;

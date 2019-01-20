const express = require('express');
const router = express.Router();
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

let data; 

router.use(readDataFromFile);

router.get('/:id', function(req, res) {
  let newsFound;
  try {
    data.forEach((item) => {
      if(item['id'] === req.params.id){
        newsFound = item;
      }
    });
  
    if (newsFound) {
      res.send(newsFound);
    } else {
      res.send('No news found with the id');
    }
  } catch (err) {
    console.error(err);
  }
});

router.get('/', function(req, res) {
  try {
    res.send(data);
  } catch (err) {
    console.error(err);
  }
});

router.post('/', function(req, res) {
  const news = req.body;
  data.push(news);
  res.status(201).send();
});

router.put('/:id',function(req, res) {
  const news = req.body;
  let indexOfElement = -1;
  data.forEach((item, index) => {
    if(item['id'] === req.params.id){
      indexOfElement = index;
    }
  });

  if (indexOfElement !== -1) {
    data[indexOfElement] = news;
  }
  res.status(201).send();
});

router.delete('/:id', function(req, res) {
  let indexOfElement = -1;
  data.forEach((item, index) => {
    if(item['id'] === req.params.id){
      indexOfElement = index;
    }
  });

  if (indexOfElement !== -1) {
    data.splice(indexOfElement, 1);
  }
  res.status(201).send();
});

async function readDataFromFile(req, res, next) {
  const file = './source.json';
 
  if (!data) {
    const source = await  readFileAsync(file, 'utf-8');
    data = JSON.parse(source);
  }
  next();
}
module.exports = router;

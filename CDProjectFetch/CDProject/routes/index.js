let x = 2;
var express = require('express');
var router = express.Router();
var fs = require("fs");

let ServerOrderArray = [];


// my file management code, embedded in an object
fileManager  = {

  read: function() {
    // has extra code to add 4 CDs if and only if the file is empty
    const stat = fs.statSync('OrdersFile.json');
    if (stat.size !== 0) {                           
    var rawdata = fs.readFileSync('OrdersFile.json'); // read disk file
    ServerOrderArray = JSON.parse(rawdata);  // turn the file data into JSON format and overwrite our array
    }
    else {
    console.log("empty file");
    }
  },
  
  write: function() {
    let data = JSON.stringify(ServerOrderArray);    // take our object data and make it writeable
    fs.writeFileSync('OrdersFile.json', data);  // write it
  },
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

/* log new Order */
router.post('/AddOneOrder', function(req, res) {
  const newOrder = req.body;  // get the object from the req object sent from browser
  console.log(newOrder);

  var response = {
    status  : 200,
    success : 'Received Order Successfully'
  }
  res.end(JSON.stringify(response)); // send reply
});

/* Add one new Order to file */
router.post('/StoreOneOrder', function(req, res) {
  const newOrder = req.body;  // get the object from the req object sent from browser
  ServerOrderArray.push(newOrder);  // add it to our "DB"  (array)
  fileManager.write();
  // prepare a reply to the browser
  var response = {
    status  : 200,
    success : 'Added Order Successfully'
  }
  res.end(JSON.stringify(response)); // send reply
});




// code below is no longer used.

/* GET all CD data */
router.get('/getAllCDs', function(req, res) {
  fileManager.read();
  res.status(200).json(ServerOrderArray);
});


/* Add one new CD */
router.post('/AddCD', function(req, res) {
  const newCD = req.body;  // get the object from the req object sent from browser
  console.log(newCD);
  ServerOrderArray.push(newCD);  // add it to our "DB"  (array)
  fileManager.write();
  // prepare a reply to the browser
  var response = {
    status  : 200,
    success : 'Added Successfully'
  }
  res.end(JSON.stringify(response)); // send reply
});

// delete CD
router.delete('/DeleteCD/:CdID', (req, res) => {
  const CdID = req.params.CdID;
  let found = false;
  console.log(CdID);    

  for(var i = 0; i < ServerOrderArray.length; i++) // find the match
  {
      if(ServerOrderArray[i].CdID === CdID){
        ServerOrderArray.splice(i,1);  // remove object from array
          found = true;
          fileManager.write();
          break;
      }
  }

  if (!found) {
    console.log("not found");
    return res.status(500).json({
      status: "error"
    });
  } else {
    var response = {
      status  : 200,
      success : 'CD ' + CdID + ' deleted!'
    }
    res.end(JSON.stringify(response)); // send reply
  }
});


module.exports = router;

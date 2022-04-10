let x = 2;
var express = require('express');
var router = express.Router();
var fs = require("fs");

// start by creating data so we don't have to type it in each time
let ServerCDArray = [];

// define a constructor to create CD objects
// let CDObject = function (pTitle, pYear, pGenre) {
//     this.ID = Math.random().toString(16).slice(5)  // tiny chance could get duplicates!
//     this.Title = pTitle;
//     this.Year = pYear;
//     this.Genre = pGenre;  // action  comedy  drama  horrow scifi  musical  western
// }
let CDObject = function (pStoreID, pSalesPersonID, pCdID, pPricePaid, pDate) {
  // this.ID = Math.random().toString(16).slice(5)  // tiny chance could get duplicates!
  this.StoreID = pStoreID
  this.SalesPersonID = pSalesPersonID;
  this.CdID = pCdID;
  this.PricePaid = pPricePaid;  // action  comedy  drama  horrow scifi  musical  western
  this.Date = pDate;
}

// my file management code, embedded in an object
fileManager  = {

  // this will read a file and put the data in our CD array
  // NOTE: both read and write files are synchonous, we really can't do anything
  // useful until they are done.  If they were async, we would have to use call backs.
  // functions really should take in the name of a file to be more generally useful
  read: function() {
    // has extra code to add 4 CDs if and only if the file is empty
    const stat = fs.statSync('CDsData.json');
    if (stat.size !== 0) {                           
    var rawdata = fs.readFileSync('CDsData.json'); // read disk file
    ServerCDArray = JSON.parse(rawdata);  // turn the file data into JSON format and overwrite our array
    }
    else {
      // make up 3 for testing
      let date = Date.now();
      ServerCDArray.push(new CDObject("98053", 1, "615342", 5, date));
      fileManager.write();
    }
  },
  
  write: function() {
    let data = JSON.stringify(ServerCDArray);    // take our object data and make it writeable
    fs.writeFileSync('CDsData.json', data);  // write it
  },
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

/* GET all CD data */
router.get('/getAllCDs', function(req, res) {
  fileManager.read();
  res.status(200).json(ServerCDArray);
});


/* Add one new CD */
router.post('/AddCD', function(req, res) {
  const newCD = req.body;  // get the object from the req object sent from browser
  console.log(newCD);
  ServerCDArray.push(newCD);  // add it to our "DB"  (array)
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

  for(var i = 0; i < ServerCDArray.length; i++) // find the match
  {
      if(ServerCDArray[i].CdID === CdID){
        ServerCDArray.splice(i,1);  // remove object from array
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

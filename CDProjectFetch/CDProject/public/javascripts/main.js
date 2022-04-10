let CDArray = [];
// Used to generate random data from these lists
const storeIDArray = Array('98053', '98007', '98077', '98055', '98011', '98046');
const salesPersonIDArray = Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24');
const cdIdArray = Array('123456', '123654', '321456', '321654', '654123', '654321', '543216', '354126', '621453', '623451');
const pricePaidArray = Array('5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15');
const randomTimeValueList = []
for (let i = 5000; i < 30000; i++) {
    randomTimeValueList.push(i)
}


// define a constructor to create CD objects
let orderObject = function (pStoreID, pSalesPersonID, pCdID, pPricePaid, pDate) {
    // this.ID = Math.random().toString(16).slice(5)  // tiny chance could get duplicates!
    this.StoreID = pStoreID
    this.SalesPersonID = pSalesPersonID;
    this.CdID = pCdID;
    this.PricePaid = pPricePaid;  // action  comedy  drama  horrow scifi  musical  western
    this.Date = pDate;
}

document.addEventListener("DOMContentLoaded", function () {

    createList();

// add button events ************************************************************************
    
    document.getElementById("buttonAdd").addEventListener("click", function () {
        let newCD = new orderObject(
        document.getElementById("storeID").value, 
        document.getElementById("salesPersonID").value, 
        document.getElementById("cdID").value, 
        document.getElementById("pricePaid").value,
        document.getElementById("date").value);

        fetch('/AddCD', {
            method: "POST",
            body: JSON.stringify(newCD),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(json => console.log(json),
            createList()
            )
            .catch(err => console.log(err));
    
        // $.ajax({
        //     url : "/AddCD",
        //     type: "POST",
        //     data: JSON.stringify(newCD),
        //     contentType: "application/json; charset=utf-8",
        //      success: function (result) {
        //         console.log(result);
        //         createList();
        //     }
        // });
       
    });

    document.getElementById("buttonGet").addEventListener("click", function () {
        createList();      
    });

    document.getElementById("buttonDelete").addEventListener("click", function () {
        deleteCD(document.getElementById("deleteCdID").value);      
    });
    
    document.getElementById("buttonClear").addEventListener("click", function () {
        document.getElementById("storeID").value = "";
        document.getElementById("salesPersonID").value = "";
        document.getElementById("cdID").value = "";
        document.getElementById("pricePaid").value = "";
        document.getElementById("date").value = "";
    });

    document.getElementById("buttonCreate").addEventListener("click", function () {
        let randomStoreID = storeIDArray[Math.floor(Math.random() * storeIDArray.length)];
        let salesPersonID = salesPersonIDArray[Math.floor(Math.random() * salesPersonIDArray.length)];
        let cdId = cdIdArray[Math.floor(Math.random() * cdIdArray.length)];
        let pricePaid = pricePaidArray[Math.floor(Math.random() * pricePaidArray.length)];
        let randomTimeValue = randomTimeValueList[Math.floor(Math.random() * randomTimeValueList.length)];

        document.getElementById("storeID").value = randomStoreID;
        document.getElementById("salesPersonID").value = salesPersonID;
        document.getElementById("cdID").value = cdId;
        document.getElementById("pricePaid").value = pricePaid;
        document.getElementById("date").value = Date.now() + randomTimeValue;

    });

    document.getElementById("buttonSubmitOne").addEventListener("click", function () {
        // button2 clicks button1 to help generating data.
        document.getElementById("buttonCreate").click();
        // Then newOrder collects the data then create an order object.
        let newOrder = new orderObject(
            document.getElementById("storeID").value, 
            document.getElementById("salesPersonID").value, 
            document.getElementById("cdID").value, 
            document.getElementById("pricePaid").value,
            document.getElementById("date").value);
        // Finally fetch /AddCD to submit the order
            fetch('/AddCD', {
                method: "POST",
                body: JSON.stringify(newOrder),
                headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                .then(response => response.json()) 
                .then(json => console.log(json),
                createList()
                )
                .catch(err => console.log(err));
    });

    document.getElementById("buttonSubmit500").addEventListener("click", function () {
        for (let i = 0; i < 5; i++) {
            document.getElementById("buttonSubmitOne").click();
        }

    });
    
});  
// end of wait until document has loaded event  *************************************************************************


function createList() {
// update local array from server

    fetch('/getAllCDs')
    // Handle success
    .then(response => response.json())  // get the data out of the response object
    .then( responseData => fillUL(responseData))    //update our array and li's
    .catch(err => console.log('Request Failed', err)); // Catch errors

    // $.get("/getAllCDs", function(data, status){  // AJAX get
    //     CDArray = data;  // put the returned server json data into our local array
        
    //       // clear prior data
    //     var divCDList = document.getElementById("divCDList");
    //     while (divCDList.firstChild) {    // remove any old data so don't get duplicates
    //         divCDList.removeChild(divCDList.firstChild);
    //     };

    //     var ul = document.createElement('ul');

    //     CDArray.forEach(function (element,) {   // use handy array forEach method
    //         var li = document.createElement('li');
    //         li.innerHTML = element.ID + ":  &nbsp &nbsp  &nbsp &nbsp " + 
    //         element.Title + "  &nbsp &nbsp  &nbsp &nbsp "  
    //         + element.Year + " &nbsp &nbsp  &nbsp &nbsp  " + element.Genre;
    //         ul.appendChild(li);
    //     });
    //     divCDList.appendChild(ul)

    // });
};

function fillUL(data) {
        // clear prior data
    var divCDList = document.getElementById("divCDList");
    while (divCDList.firstChild) {    // remove any old data so don't get duplicates
        divCDList.removeChild(divCDList.firstChild);
    };

    var ul = document.createElement('ul');
    CDArray = data;
    CDArray.forEach(function (element,) {   // use handy array forEach method
        var li = document.createElement('li');
        li.innerHTML = element.StoreID + ":  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp " + 
        element.SalesPersonID + "  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp "  + 
        element.CdID + " &nbsp &nbsp &nbsp &nbsp &nbsp  " + 
        element.PricePaid + "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  " + 
        element.Date;
        ul.appendChild(li);
    });
    divCDList.appendChild(ul)
}

function deleteCD(CdID) {

    fetch('/DeleteCD/' + CdID, {
        method: "DELETE",
       // body: JSON.stringify(_data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      .then(json => console.log(json),
      createList())
      .catch(err => console.log(err));



    // $.ajax({
    //     type: "DELETE",
    //     url: "/DeleteCD/" +ID,
    //     success: function(result){
    //         alert(result);
    //         createList();
    //     },
    //     error: function (xhr, textStatus, errorThrown) {  
    //         alert("Server could not delete CD with ID " + ID)
    //     }  
    // });
   
}


  

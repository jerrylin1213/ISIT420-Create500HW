let CDArray = [];
// Used to generate random data from these lists
const storeIDArray = Array('98053', '98007', '98077', '98055', '98011', '98046');
const cdIdArray = Array('123456', '123654', '321456', '321654', '654123', '654321', '543216', '354126', '621453', '623451');
const pricePaidArray = Array('5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15');



// define a constructor to create CD objects
let orderObject = function (pStoreID, pSalesPersonID, pCdID, pPricePaid, pDate) {
    this.StoreID = pStoreID
    this.SalesPersonID = pSalesPersonID;
    this.CdID = pCdID;
    this.PricePaid = pPricePaid;  // action  comedy  drama  horrow scifi  musical  western
    this.Date = pDate;
}

document.addEventListener("DOMContentLoaded", function () {
    createList();
    let timeElapsed = Date.now();

    function GetTimeString(){
        // add at least 5 miuntes and up to 50 minutes
        timeElapsed = timeElapsed + ( ( Math.floor(Math.random() * 25000) + 5000) * 60 );
        let rightNow = new Date(timeElapsed);
        return rightNow.toISOString();
    }
   // createList();

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
           
    });

    document.getElementById("buttonGet").addEventListener("click", function () {
        createList();      
    });


    
    document.getElementById("buttonClear").addEventListener("click", function () {
        document.getElementById("storeID").value = "";
        document.getElementById("salesPersonID").value = "";
        document.getElementById("cdID").value = "";
        document.getElementById("pricePaid").value = "";
        document.getElementById("date").value = "";
    });

    document.getElementById("buttonCreate").addEventListener("click", function () {
        let storeNumberPointer =  Math.floor(Math.random() * storeIDArray.length);
        console.log(storeNumberPointer);
        let randomStoreID = storeIDArray[storeNumberPointer];
        let salesPersonPointer =  (Math.floor(Math.random() * 4)) + 1;


        let salesPersonID = (storeNumberPointer * 4) + salesPersonPointer
        let cdId = cdIdArray[Math.floor(Math.random() * cdIdArray.length)];
        let pricePaid = pricePaidArray[Math.floor(Math.random() * pricePaidArray.length)];
        let randomTimeValue = GetTimeString();

        document.getElementById("storeID").value = randomStoreID;
        document.getElementById("salesPersonID").value = salesPersonID;
        document.getElementById("cdID").value = cdId;
        document.getElementById("pricePaid").value = pricePaid;
        document.getElementById("date").value =  randomTimeValue;

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
        for (let i = 0; i < 500; i++) {
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
};

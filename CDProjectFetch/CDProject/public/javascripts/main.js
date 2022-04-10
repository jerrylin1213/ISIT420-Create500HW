
let CDArray = [];

// define a constructor to create CD objects
let CDObject = function (pStoreID, pSalesPersonID, pCdID, pPricePaid, pDate) {
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
        let newCD = new CDObject(
        document.getElementById("storeID").value, 
        document.getElementById("salesPersonID").value, 
        document.getElementById("cdID").value, 
        document.getElementById("pricePaid").value,
        document.getElementById("Date").value);

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
        document.getElementById("Date").value = "";
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
        li.innerHTML = element.StoreID + ":  &nbsp &nbsp  &nbsp &nbsp " + 
        element.SalesPersonID + "  &nbsp &nbsp  &nbsp &nbsp "  
        + element.CdID + " &nbsp &nbsp  &nbsp &nbsp  " + element.PricePaid + " &nbsp &nbsp  &nbsp &nbsp  " + element.Date;
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


  

snbApp.servernamesutility = (function () {
     
    
    var newServerArray = [];
    
    function buildGeneralArray(results){
        var myCOEArray = [];
        var myString = "";
        myString = results.replace(/\s\s+/g, ',');
        var myGeneralArray = myString.split(',');
        var pattern = /\bCOE-/;
        var i;
        for(i=0;i<myGeneralArray.length;i++){
            if(pattern.test(myGeneralArray[i])){
                myCOEArray.push(myGeneralArray[i].substring(0,15));
            }
        }
        newServerArray = myCOEArray;
    }


    return {
        getNewServerNames: function(){
            var space = ' ';
            $.ajax({
            crossDomain: true,
            headers:{'Access-Control-Allow-Origin':'*'},
            url:"https://coe-wpcb7s01dcp.eis.ds.usace.army.mil/servers.txt",
            dataType: "text",
            type: 'GET'
            }).done(function(results){
              buildGeneralArray(results);
            }).fail(function(xhr,status,errorThrown){
              //console.log("Error:" + errorThrown);
              //console.log("Status:" + status);
              //console.dir(xhr);
            }); 
            //return theList;
        },
        getNewServerNamesArray:function(){
            return  newServerArray; 
        },
        validateName: function (nameRequested) {
            //this.getNewServerNames();
            if(nameRequested.length === 15){
               var myVal = $.inArray(nameRequested, serverNames.sort());
               var testVal = $.inArray(nameRequested, newServerArray.sort());
               if (testVal === -1) {
                   console.log("Returned 1 - good");
                    return 1;
                    //$("#validation_response")
                    //  .removeClass("invalid_servername")
                    //  .addClass("valid_servername");
                    //could call method to push server name object to list here.
                    /* snbApp.requestobj.buildRequestObject();
                    var mySNObj = snbApp.requestobj.getRequestObject();
                    snbApp.utilities.log(JSON.stringify(mySNObj));
                    snbApp.requestobj.putToList(mySNObj); */
                    //return nameRequested + " is available for use.";
                } else {
                    //$("#validation_response")
                    //  .removeClass("valid_servername")
                    //  .addClass("invalid_servername");
                    //return serverNames[myVal] + " is NOT available.";
                    console.log("The item is already in the list, returned 2");
                    return 2;
                } 
            }else{
                console.log("The list item is incorrectly formatted, returned 3");
               return 3;
            }
        }
    };

}());
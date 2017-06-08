snbApp.requestobj = (function(){
    var userID = "";
    var userName = "";
    var siteLocation = "";
    var unitAssigned = "";
    var serverType = "";
    var serverName = "";
    var primaryFunction = "";
    var secondaryFunction = "null";
    var requestTimeDate = "";
    var hostOptions = "";
    var dcOffPremise = "";
    
    /* function getListItemType(name){
        return "SP.Data." + name[0].toUpperCase() + name.substring(1) + "ListItem";
    } */
    
    return{
        getListItemType:function(name){
            //return "SP.Data." + name[0].toUpperCase() + name.substring(1) + "ListItem";
            return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
        },
        updateUserInfo:function(sentUserID, sentUserName){
            userID = sentUserID;
            userName = sentUserName;
        },
        updateStatus:function(newStatus){
            status = newStatus;
        },
        getStatus:function(){
            return status;
        },
        buildRequestObject:function(){
            var siteLocElem = document.getElementById("snb_site_locations");
            var siteLocTxt = siteLocElem.options[siteLocElem.selectedIndex].text;
            var primeFuncElem = document.getElementById("snb_primary_function_codes");
            var primeFuncTxt = primeFuncElem.options[primeFuncElem.selectedIndex].text;
            var unitAssignedElem = document.getElementById("snb_secondary_activity_codes");
            var unitAssignedTxt = unitAssignedElem.options[unitAssignedElem.selectedIndex].text;
            var secondFuncElem = document.getElementById("snb_secondary_function_codes");
            var secondFuncTxt = secondFuncElem.options[secondFuncElem.selectedIndex].text;
            var hostOptsElem = document.getElementById("snb_host_options");
            var hostOptsTxt = hostOptsElem.options[hostOptsElem.selectedIndex].text;
            var dcOffPremElem = document.getElementById("snb_dc_offpremise_codes");
            var dcOffPremTxt = dcOffPremElem.options[dcOffPremElem.selectedIndex].text;
            var osTypeTxt = document.querySelector('input[name="os_platform"]:checked').value;
            
            siteLocation = siteLocTxt;
            unitAssigned = unitAssignedTxt;
            serverType = osTypeTxt;
            primaryFunction = primeFuncTxt;
            secondaryFunction = secondFuncTxt;
            hostOptions = hostOptsTxt;
            dcOffPremise = dcOffPremTxt;
            requestTimeDate = snbApp.utilities.getToday();
            
            serverName = snbApp.servernamebuilder.getServerName();
        },
        getRequestObject:function(){
            var serverNameRequestObj = {
                "userID":userID,
                "userName":userName,
                "siteLocation":siteLocation,
                "unitAssigned":unitAssigned,
                "serverType":serverType,
                "serverName":serverName,
                "primaryFunction":primaryFunction,
                "secondaryFunction":secondaryFunction,
                "hostOptions":hostOptions,
                "dcOffPremise":dcOffPremise,
                "requestTimeDate":requestTimeDate
            };
            return serverNameRequestObj;
        },
        clearRequestObject:function(){
            var userID = "";
            var userName = "";
            var siteLocation = "";
            var unitAssigned = "";
            var serverType = "";
            var serverName = "";
            var primaryFunction = "";
            var secondaryFunction = "null";
            var requestTimeDate = "";
            var hostOptions = "";
            var dcOffPremise = "";
            var status = "invalid";
        },
        putToList:function(servObj){
            //debugger;
            var userID = snbApp.utilities.makeString(servObj.userID);
            var listType = this.getListItemType("SNBRequestCapture");
            var item = {
              __metadata:{'type': "SP.Data.SNBRequestCaptureListItem"}, 
              Title:servObj.serverName,
              ServerName:servObj.serverName,
              UserName:servObj.userName,
              UserID:userID,
              OSType:servObj.serverType,
              PrimeRole:servObj.primaryFunction,
              SecondaryRole:servObj.secondaryFunction,
              SiteLocation:servObj.siteLocation,
              UnitAssigned:servObj.unitAssigned,
              HostOptions:servObj.hostOptions,
              DCOffPremise:servObj.dcOffPremise,
              DateRequested: new Date().toISOString(),
              AlreadyInUse:"false"
            };
            var webURL = _spPageContextInfo.webAbsoluteUrl;
            var siteURL = _spPageContextInfo.siteAbsoluteUrl;
            
            $.ajax({
               //url: "https://staging-team.usace.army.mil/sites/ACEIT/PMO/O/O/I/E/_api/web/lists/getbytitle('SNBTest')/items",
               url: webURL + "/_api/web/lists/getbytitle('SNBRequestCapture')/items",
               type: "POST",
               data: JSON.stringify(item),
               headers:{
                'accept':'application/json;odata=verbose',
                'content-type':'application/json;odata=verbose',
                'content-length':'<length of post body>',
                'X-RequestDigest':$('#__REQUESTDIGEST').val()
               },
               success:function(data){
                   //success(data);
                   //console.log("Success: " + JSON.stringify(data.d));
                   return true;
                   //snbApp.formmanager.lockValidateButton();
               },
               error:function(error){
                   //failure(data);
                   //console.log("Error: " + JSON.stringify(error));
               }
            });
        }
    };
})();
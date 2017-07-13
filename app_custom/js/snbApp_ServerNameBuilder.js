var snbApp = window.snbApp || {};

//items in this file handles the name component at the bottom of the form
snbApp.servernamebuilder = (function () {
    
    //private variables
    var serverNameObj = {
        primary_activity:"COE-",
        secondary_activity:"",
        primary_function:"",
        secondary_function:"",
        site_location:"",
        serverNameLength:0,
        serverNameLengthIsValid:false,
        serverNameIsAvailable:false,
    };
    
    var isValid = false;
    var os_type = "Windows";

    return {
        getServerNameObj:function(){
            return serverNameObj;
        },
        author: "Michael Randall",
        //public methods and properties
        getOSType:function(){
            return os_type;
        },
        getServerName:function(){
            full_server_name = serverNameObj.primary_activity + serverNameObj.secondary_activity + serverNameObj.primary_function + serverNameObj.secondary_function + serverNameObj.site_location;
            return full_server_name;
        },
        //updates-appends server name field with user selected value
        updateServerSection:function(section, value){
            switch (section) {
                case "snb_secondary_activity_codes":
                    serverNameObj.secondary_activity = value;
                    break;
                case "snb_primary_function_codes":
                    serverNameObj.primary_function = value;
                    break;
                case "snb_secondary_function_numbers":
                    serverNameObj.secondary_function = value;
                    break;
                case "snb_site_locations":
                    serverNameObj.site_location = value;
                    break;
                case "snb_dc_offpremise_codes":
                    serverNameObj.site_location = value;
                    break;
            }
            var sname = this.getServerName();
            this.updateServerNameLength();
            $("#server_name").empty();
            $("#server_name").append(sname);
            //snbApp.validatorutility.refreshValidator();
        },
        resetServerNameObj:function(){
            //serverNameObj.primary_activity = "";
            serverNameObj.primary_function = "";
            serverNameObj.secondary_activity = "";
            serverNameObj.secondary_function = "";
            serverNameObj.site_location = "";
            serverNameObj.serverNameLengthIsValid=false;
            serverNameObj.serverNameLength=0;
            serverNameObj.serverNameIsAvailable=false;
        },
        updateServerNameAvailability:function(value){
            serverNameObj.serverNameIsAvailable = value;
        },
        updateServerNameLength:function(){
            var sn = this.getServerName();
            var snLength = sn.length;
            if (snLength === 15){
                serverNameObj.serverNameLengthIsValid = true;
                document.getElementById("btnvalidator").removeAttribute('disabled');
            }else{
                serverNameObj.serverNameLengthIsValid = false;
            }
        }
    };

})();



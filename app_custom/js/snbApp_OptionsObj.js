var snbApp = window.snbApp || {};

snbApp.optionsobj = (function () {
    //private variables
	var dynamicOptionsSelect = {
		windows:{
			secondary_activity:"", //secondary activity codes, what op unit assigned to, NOT SP list 
			primary_function:"", //primary function codes, what role is the server assigned, AD, mail, etc..., SP list 
			secondary_function:"", //secondary function codes, if there is an additional role, what is it, SP list
			dc_offpremise:"" //select options for data center or off premise, SP list
		},
		unix:{
			secondary_activity:"", //secondary activity codes, what op unit assigned to, NOT SP list
			primary_function:"", //primary function codes, what role is the server assigned, AD, mail, etc..., SP list
			secondary_function:"", //secondary function codes, if there is an additional role, what is it, SP list
			dc_offpremise:"" //select options for data center or off premise, SP list
		}	
	};
    var primary_activity_w = "";
    var primary_activity_u = "";
    var secondary_activity_w = "";
	var secondary_activity_u = "";
    var primary_function_w = "";
	var primary_function_u = "";
    var secondary_function_w = "0";
	var secondary_function_u = "0";
    var site_location_w = "";
	var site_location_u = "";
    var dc_offpremise_w = "";
	var dc_offpremise_u = "";
    var checker = 0;
    
    return{
        updateFunctionOrActivity:function(listName, value){
            switch(listName){
				case "snb_secondaryactivitycodes":
					dynamicOptionsSelect.windows.secondary_activity = value;
					dynamicOptionsSelect.unix.secondary_activity = value;
					secondary_activity_w = value;
					secondary_activity_u = value;
                    checker+=1;
                    break;
                case "snb_primaryfunctioncodes_w":
                    dynamicOptionsSelect.windows.primary_function = value;
					primary_function_w = value;
                    checker+=1;
                    break;
                case "snb_secondaryfunctioncodes_w":
                    dynamicOptionsSelect.windows.secondary_function = value;
					secondary_function_w = value;
                    checker+=1;
                    break;
                case "snb_sitelocations_w":
                    dynamicOptionsSelect.windows.site_location = value;
					site_location_w = value;
                    checker+=1;
                    break;
                case "snb_dc_offpremisecodes_w":
                    dynamicOptionsSelect.windows.dc_offpremise = value;
					dc_offpremise_w = value;
                    checker+=1;
                    break;
				case "snb_primaryfunctioncodes_u":
				    dynamicOptionsSelect.unix.primary_function = value;
					primary_function_u = value;
				    checker+=1;
				    break;
				case "snb_secondaryfunctioncodes_u":
				    dynamicOptionsSelect.unix.secondary_function = value;
					secondary_function_u = value;
				    checker+=1;
				    break;
				case "snb_sitelocations_u":
				    dynamicOptionsSelect.unix.site_location = value;
					site_location_u = value;
				    checker+=1;
				    break;
				case "snb_dc_offpremisecodes_u":
				    dynamicOptionsSelect.unix.dc_offpremise = value;
					dc_offpremise_u = value;
				    checker+=1;
				    break;
                }
            
        },
        getOSObject:function(){
            //console.log("getOSObject has been called");
            var OSObject = {
                "secondary_activity":secondary_activity,
                "primary_function":primary_function,
                "secondary_function":secondary_function,
                "site_location":site_location,
                "dc_offpremise":dc_offpremise
            };
            return OSObject;
        },
		getAllOptions:function(){
			return dynamicOptionsSelect;
		}
    };  
})();

var snbApp = window.snbApp || {};

//Direct interface to the form on the page
snbApp.formmanager = (function(){
	var form = {};
	form.content_holder = document.getElementById("content_holder"); //content_holder
	form.load_error = document.getElementById("load_error"); //load_error
	form.ui = document.getElementById("ui"); //ui
	form.os_platform = document.getElementById("os_platform"); //os_platform
	form.sec_act_codes = document.getElementById("snb_secondary_activity_codes"); //snb_secondary_activity_codes
	form.prim_func_codes = document.getElementById("snb_primary_function_codes"); //snb_primary_function_codes
	form.sec_func_codes = document.getElementById("snb_secondary_function_codes"); //snb_secondary_function_codes
	form.sec_func_nums = document.getElementById("snb_secondary_function_numbers"); //snb_secondary_function_numbers
	form.host_options = document.getElementById("snb_host_options"); //snb_host_options
	form.site_locs_div = document.getElementById("site_locations_div"); //site_locations_div
	form.site_locs = document.getElementById("snb_site_locations"); //snb_site_locations
	form.dc_or_off_prem_div = document.getElementById("dc_or_off_premise_div"); //dc_or_off_premise_div
	form.dc_off_prem_codes = document.getElementById("snb_dc_offpremise_codes"); //snb_dc_offpremise_codes
	form.validation_notice = document.getElementById("validation_notice"); //validation_notice //displays notice if servername is valid
	form.validation_holder = document.getElementById("validation_holder"); //validation_holder //holds the server_name field
	form.server_name = document.getElementById("server_name"); //server_name //servername input field that is dynamically updated with users selections
	
	
    var snb_secondary_activity_codes = "";
    var snb_primary_function_codes = "";
    var snb_secondary_function_codes = "";
    var snb_secondary_function_numbers = "";
    var snb_host_options = "";
    var snb_site_locations = "";
    var snb_dc_op = "";
    var locationOptions = [
      { "hostLocale": "Site", "code": "site", "value": "site" },
      { "hostLocale": "Data Capability", "code": "DC", "value": "DC" },
      { "hostLocale": "Off Premises", "code": "OP", "value": "OP" }
    ];
	
	//builds the sequence number field
    function buildSecondaryFunctionNumberSelector() {
        var countOptionString = "<option value='0' disabled selected>Select Option</option>";
        for (var i = 1; i < 100; i++) {
            var code = i;
            if (i < 10) {
                code = "0" + i;
            }
            countOptionString += "<option value=" + code + " data-code=" + code + ">" + code + "</option>";
        }
        $("#snb_secondary_function_numbers").append(countOptionString);
    }

	//builds the server location hosting options selection
    function buildLocationTypeSelector() {
        var locationOptionsString = "<option value='0' disabled selected>Select Option</option>";
        for (var i = 0; i < locationOptions.length; i++) {
            var location = locationOptions[i];
            locationOptionsString += "<option value=" + location.hostLocale + " data-code=" + location.code + ">" + location.hostLocale + "</option>";
        }
        $("#snb_host_options").append(locationOptionsString);
    }
    
	function buildFormOnOSChange(osType){
		var optObject = snbApp.optionsobj.getAllOptions();
      if(osType === "Windows" || osType === "windows"){
        var theObj = optObject.windows;
        snbApp.formmanager.buildForm(theObj);
      }else{
        var theObj = optObject.unix;
        snbApp.formmanager.buildForm(theObj);
      }
    }
	
	function buildSiteLocations(bigString){
		if(bigString === undefined){
			var siteLocs = document.getElementById("snb_site_locations");
			var newOption = document.createElement("option");
			
			newOption.setAttribute("value", 0);
			newOption.setAttribute("disabled","disabled");
			newOption.setAttribute("checked","checked");
			
			var newText = document.createTextNode("Select Option");
			newOption.appendChild(newText);
			siteLocs.appendChild(newOption);
		} else{
			var siteLocs = document.getElementById("snb_site_locations");
			siteLocs.innerHTML = bigString;
		}	
	}

    function lockValidateButton() {
        var isDisabled = document.getElementById("btnvalidator").hasAttribute('disabled');
        if (isDisabled) {
            document.getElementById("btnvalidator").removeAttribute('disabled');
        } else {
            document.getElementById("btnvalidator").setAttribute('disabled', 'disabled');
        }
    }

    //sets each drop-down to its default state - does not clear the drop-down fields like clearAllFormFields
    //used when user clicks refresh button
	function resetSelectFields() {
	    $('select').each(function(i){
	        $(this).find('option:first').attr('selected','selected');
	    })
	}

	function resetServerNameField(){
	    $("#server_name").empty("Server name");
	    //snbApp.servernamebuilder.updateServerSection();
	}

	function resetSiteLocDCOffOptionsSelector() {
	    var site_locs_div = document.getElementById("site_locations_div");
	    var dc_or_off_prem_div = document.getElementById("dc_or_off_premise_div");
	    site_locs_div.classList.remove("show");
	    dc_or_off_prem_div.classList.remove("show");
	    site_locs_div.classList.add("hide");
	    dc_or_off_prem_div.classList.add("hide");
	    //$("#site_locations_div").classList.remove("show");
	    //$("#dc_or_off_premise_div").classList.remove("show");
	    //$("#site_locations_div").classList.add("hide");
	    //$("#dc_or_off_premise_div").classList.add("hide");
	}
    
	function clearSelectFields(){
      $("#snb_secondary_activity_codes").empty();
      $("#snb_primary_function_codes").empty();
      $("#snb_secondary_function_codes").empty();
      $("#snb_site_locations").empty();
      $("#snb_dc_offpremise_codes").empty();
      $("#snb_secondary_function_numbers").empty();
      $("#snb_host_options").empty();
	  //$("#server_name").empty();
	}

    function timeBuilder() {
        var timeString = "";
        var newDate = new Date();
        timeString = newDate.getHours() + ", " + newDate.getMinutes() + ", " + newDate.getSeconds();
        return newDate + ", " + newDate.getMilliseconds();
    }
    //fixed first and second
    return {
		form:form,
        buildSelectSiteLocations: function(bigString){
			buildSiteLocations(bigString);
		},
        buildForm: function (osType, optObj) {
		  clearSelectFields();
		  buildLocationTypeSelector();
		  buildSecondaryFunctionNumberSelector();
		  buildSiteLocations();
		  
		  if(osType === 'windows'){
			$("#snb_secondary_activity_codes").append(optObj.windows.secondary_activity);
		    $("#snb_primary_function_codes").append(optObj.windows.primary_function);
		    $("#snb_secondary_function_codes").append(optObj.windows.secondary_function);
		    $("#snb_site_locations").append(optObj.windows.site_location);
		    $("#snb_dc_offpremise_codes").append(optObj.windows.dc_offpremise);
		  }else{
			$("#snb_secondary_activity_codes").append(optObj.unix.secondary_activity);
		    $("#snb_primary_function_codes").append(optObj.unix.primary_function);
		    $("#snb_secondary_function_codes").append(optObj.unix.secondary_function);
		    $("#snb_site_locations").append(optObj.unix.site_location);
		    $("#snb_dc_offpremise_codes").append(optObj.unix.dc_offpremise);
		  }
		  snbApp.main.loadCount++;
		  var loader = document.getElementById('loader');
		  //loader.innerHTML = ".";
		  loader.style.backgroundColor = "green";
        },
        checkSelectedOS: function(){
          var locChecked = $("input[name=os_platform]:checked").val();
          if(locChecked === "windows"){
            var osW = locChecked.replace(/w/, "W");
            return osW;
          }else{
            var osU = locChecked.replace(/unix/, "UNIX");
            return osU;
          }
        },

        hideValidatorNotice: function(){
	        var valNotice = document.getElementById("validation_notice");
            valNotice.classList.remove("show");
            valNotice.classList.add("hidden");
        },
        
		//called when the user changes the OS radio button
        radioValueChanged:function(){
          clearSelectFields();
          var radioValue = $(this).val();
          snbApp.formmanager.buildForm(radioValue,snbApp.optionsobj.getAllOptions());
          resetSiteLocDCOffOptionsSelector();
          lockValidateButton();
          snbApp.formmanager.hideValidatorNotice();
          snbApp.servernamebuilder.resetServerNameObj();
          resetServerNameField();
        },
        refreshClicked: function () {
          resetSelectFields();
          resetSiteLocDCOffOptionsSelector();
          lockValidateButton();
          snbApp.formmanager.hideValidatorNotice();
          snbApp.servernamebuilder.resetServerNameObj();
          resetServerNameField();
        }
    };
})();

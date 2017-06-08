 snbApp.events = (function(){      
            //EVENT LISTENER SECTION --------------------------
            //Listens for selection change to the Windows / UNIX radio buttons
	$("input[name='os_platform']").change(snbApp.formmanager.radioValueChanged);



	$("#snb_secondary_activity_codes").on('change',function(event){
		var myElement = event.currentTarget.id;
		var myCode = $('#snb_secondary_activity_codes option:selected').val();
		
		var sel = document.getElementById("snb_secondary_activity_codes");
		var selected = sel.options[sel.selectedIndex];
		var mySelVal = selected.getAttribute('value');
		var mySelCode = selected.getAttribute('data-code');
		var mySelDivSite = selected.getAttribute('data-isDivSite');
		var mySelDistSite = selected.getAttribute('data-isDistSite');
		var mySelDivID = selected.getAttribute('data-divID');
		var mySelDistID = selected.getAttribute('data-distID');
		//console.log("value: " + mySelVal + ", code: " + mySelCode);

		var filter = {};
		
		if(mySelDivSite === "true" && mySelDistSite === "true"){
			filter.eventType = event.type;
			filter.listName = "SNB_SecondaryActivityCodes";
			filter.field = "DivisionSiteId";
			filter.ID = mySelDivID;
			filter.url = "https://itsm.usace.army.mil/requests/odata/v1/Sites?$filter=DivisionSiteId%20eq%20"+mySelDivID+"%20&%20IsPending%20eq%20false%20&%20IsActive%20eq%20true";
			snbApp.dataretriever.letsBuild(filter);		
		} else {
			filter.eventType = event.type;
			filter.listName = "SNB_SecondaryActivityCodes";
			filter.field = "DistrictSiteId";
			filter.ID = mySelDistID;
			filter.url = "https://itsm.usace.army.mil/requests/odata/v1/Sites?$filter=DistrictSiteId%20eq%20"+mySelDistID+"%20&%20IsPending%20eq%20false%20&%20IsActive%20eq%20true";
			snbApp.dataretriever.letsBuild(filter);
		}
		
		snbApp.servernamebuilder.updateServerSection(myElement,mySelCode);
		snbApp.validatorutility.hideValidatorNotice();
		document.getElementById("btncommit").setAttribute('disabled','disabled');
	});

	$("#snb_primary_function_codes").on('change',function(event){
		var myElement = event.currentTarget.id;
		var myCode = $('#snb_primary_function_codes option:selected').val();
		
		snbApp.servernamebuilder.updateServerSection(myElement,myCode);
		snbApp.validatorutility.hideValidatorNotice();
		document.getElementById("btncommit").setAttribute('disabled','disabled');
	});

	$("#snb_secondary_function_codes").on('change',function(event){
		snbApp.validatorutility.hideValidatorNotice();
		document.getElementById("btncommit").setAttribute('disabled','disabled');
	});

	$("#snb_secondary_function_numbers").on('change',function(event){
		var myElement = event.currentTarget.id;
		var myCode = $('#snb_secondary_function_codes option:selected').val();
		var myNumber = $('#snb_secondary_function_numbers option:selected').val();
		var myNumberVal = $('#snb_secondary_function_numbers option:selected').val();
		
		var myCodeNumber = myCode + myNumberVal;
		snbApp.servernamebuilder.updateServerSection(myElement,myCodeNumber);
		snbApp.validatorutility.hideValidatorNotice();
		document.getElementById("btncommit").setAttribute('disabled','disabled');
	})

	$("#snb_host_options").on('change',function(){
		$("#server_name").empty();
		snbApp.servernamebuilder.updateServerSection("snb_site_locations","");
		var sel = document.getElementById("snb_host_options");
		var selected = sel.options[sel.selectedIndex];
		var mySelVal = selected.getAttribute('value');
		var mySelData = selected.getAttribute('data-code');
		
		var mySelectedCode = $("#snb_host_options option:selected").val();
		
		if(mySelVal === "Site"){
			$("#site_locations_div").removeClass("hide").addClass("show");
			$("#dc_or_off_premise_div").addClass("hide");
		}else{
			$("#site_locations_div").removeClass("show").addClass("hide");
			$("#dc_or_off_premise_div").removeClass("hide").addClass("show");
			$("#snb_dc_offpremise_codes").find('option:first').attr('selected','selected');
		}
		snbApp.validatorutility.hideValidatorNotice();
		document.getElementById("btncommit").setAttribute('disabled','disabled');
	});

	 
	$("#snb_site_locations").on('change',function(event){
		var myElement = event.currentTarget.id;
		var myCode = $('#snb_site_locations option:selected').val();
		
		var sel = document.getElementById("snb_site_locations");
		var selected = sel.options[sel.selectedIndex];
		var mySelVal = selected.getAttribute('value');
		var mySelCode = selected.getAttribute('data-code');
		
		snbApp.servernamebuilder.updateServerSection(myElement,mySelCode);
		snbApp.validatorutility.hideValidatorNotice();
		document.getElementById("btncommit").setAttribute('disabled','disabled');
	});

	$("#snb_dc_offpremise_codes").on('change',function(event){
		var myElement = event.currentTarget.id;
		
		var myChildSelected = $('#snb_dc_offpremise_codes option:selected').data("code");
		var myParentSelected = $("#snb_host_options option:selected").data("code");
		
		var myCode = myParentSelected + myChildSelected;
		snbApp.servernamebuilder.updateServerSection(myElement,myCode);
		snbApp.validatorutility.hideValidatorNotice();
		document.getElementById("btncommit").setAttribute('disabled','disabled');
	});

	$("#btnvalidator").on('click',function(event){
		//var test = snbApp.servernamesutility.getNewServerNamesArray();
		var requestedServerNames = snbApp.servernamebuilder.getServerName();
		var validationResults = snbApp.servernamesutility.validateName(requestedServerNames);
		if(validationResults === 1){
			//snbApp.servernamebuilder.updateServerNameLengthStatus(true);
			snbApp.servernamebuilder.updateServerNameAvailability(true);
			snbApp.formmanager.lockValidateButton();
			document.getElementById("btncommit").removeAttribute('disabled');
			//snbApp.formmanager.lockCommitButton();
		}else if(validationResults === 2){
			snbApp.formmanager.lockCommitButton();
			document.getElementById("btncommit").setAttribute('disabled','disabled');
		}
		snbApp.validatorutility.updateValidationNotice(validationResults,requestedServerNames);
		return false;
		event.preventDefault();
	});

	$("#btnrefresh").on('click',function(event){
		var sn = snbApp.servernamebuilder.getServerNameObj();
		
		snbApp.validatorutility.hideValidatorNotice();
		snbApp.formmanager.resetDropdowns();
		snbApp.validatorutility.resetServerNameField();
		snbApp.servernamebuilder.resetServerNameObj();
		document.getElementById("btncommit").setAttribute('disabled','disabled');
		document.getElementById("btnvalidator").setAttribute('disabled','disabled');
		return false;
		event.preventDefault();
	});

	$("#btncommit").on('click',function(event){
		snbApp.formmanager.lockCommitButton();
		snbApp.requestobj.buildRequestObject();
		
		var mySNObj = snbApp.requestobj.getRequestObject();
		var results = snbApp.requestobj.putToList(mySNObj);
		
		snbApp.validatorutility.resetServerNameField();
		snbApp.servernamebuilder.resetServerNameObj();
		snbApp.formmanager.resetDropdowns();
		snbApp.validatorutility.hideValidatorNotice();
		//return false;
		event.preventDefault();
	});

})();
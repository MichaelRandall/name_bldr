var snbApp = window.snbApp || {};

snbApp.events = (function () {
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
		

		var filter = {};
		filter.eventType = event.type;
		filter.listName = "SNB_SecondaryActivityCodes";
		filter.field = "DivisionSiteId";
		filter.ID = mySelDivID;
		filter.Code = mySelCode;
		filter.url = "https://itsm.usace.army.mil/requests/odata/v1/Sites?$filter=startswith(SiteCodePc, '" + mySelCode + "') and IsPending eq false and IsActive eq true and SiteCodePc ne null and IsSpecialPurpose eq false&$orderby=SiteCodePc";
		snbApp.dataretriever.letsBuild(filter);

		//if (mySelDivSite === "true" && mySelDistSite === "true") {
		//	filter.eventType = event.type;
		//	filter.listName = "SNB_SecondaryActivityCodes";
		//	filter.field = "DivisionSiteId";
		//	filter.ID = mySelDivID;
		//	filter.Code = mySelCode;
		//	filter.url = "https://itsm.usace.army.mil/requests/odata/v1/Sites?$filter=startswith(SiteCodePc, '"+mySelCode+"') and IsPending eq false and IsActive eq true and SiteCodePc ne null";
		//	snbApp.dataretriever.letsBuild(filter);
		//} else {
		//	filter.eventType = event.type;
		//	filter.listName = "SNB_SecondaryActivityCodes";
		//	filter.field = "DistrictSiteId";
		//	filter.ID = mySelDistID;
		//	filter.Code = mySelCode;
		//	filter.url = "https://itsm.usace.army.mil/requests/odata/v1/Sites?$filter=startswith(SiteCodePc, '" + mySelCode + "') and IsPending eq false and IsActive eq true and SiteCodePc ne null";
		//	snbApp.dataretriever.letsBuild(filter);
		//}
		
		snbApp.servernamebuilder.updateServerSection(myElement,mySelCode);
		snbApp.validatorutility.hideValidatorNotice();
	});
    $("#secondary_activity_codes_hlpr_id").mouseenter(function (event) {
	    event.preventDefault();
	    $(this).css("border-color", "red");
	    $(this).addClass("pointer_cursor");
        snbApp.modal.displayModal("info", event);
	}).mouseleave(function (event) {
	    $(this).css("border-color", "blue");
	    $(this).removeClass("pointer_cursor");
	    var removable = document.getElementById(event.currentTarget.id + "_mod");
	    document.getElementById("ui").removeChild(removable);
	});

	$("#snb_primary_function_codes").on('change',function(event){
		var myElement = event.currentTarget.id;
		var myCode = $('#snb_primary_function_codes option:selected').val();
		
		snbApp.servernamebuilder.updateServerSection(myElement,myCode);
		snbApp.validatorutility.hideValidatorNotice();
	});
	$("#primary_function_codes_hlpr_id").mouseenter(function (event) {
	    event.preventDefault();
	    $(this).css("border-color", "red");
	    $(this).addClass("pointer_cursor");
	    snbApp.modal.displayModal("info", event);
	}).mouseleave(function (event) {
	    $(this).css("border-color", "blue");
	    $(this).removeClass("pointer_cursor");
	    var removable = document.getElementById(event.currentTarget.id + "_mod");
	    document.getElementById("ui").removeChild(removable);
	});

	$("#snb_secondary_function_codes").on('change',function(event){
		snbApp.validatorutility.hideValidatorNotice();
	});
	$("#secondary_function_codes_hlpr_id").mouseenter(function (event) {
	    event.preventDefault();
	    $(this).css("border-color", "red");
	    $(this).addClass("pointer_cursor");
	    snbApp.modal.displayModal("info", event);
	}).mouseleave(function (event) {
	    $(this).css("border-color", "blue");
	    $(this).removeClass("pointer_cursor");
	    var removable = document.getElementById(event.currentTarget.id + "_mod");
	    document.getElementById("ui").removeChild(removable);
	});

	$("#snb_secondary_function_numbers").on('change', function (event) {
	    var myElement = event.currentTarget.id;
	    var myCode = $('#snb_secondary_function_codes option:selected').val();
	    var myNumber = $('#snb_secondary_function_numbers option:selected').val();
	    var myNumberVal = $('#snb_secondary_function_numbers option:selected').val();

	    var myCodeNumber = myCode + myNumberVal;
	    snbApp.servernamebuilder.updateServerSection(myElement, myCodeNumber);
	    snbApp.validatorutility.hideValidatorNotice();
	});
	$("#secondary_function_numbers_hlpr_id").mouseenter(function (event) {
	    event.preventDefault();
	    $(this).css("border-color", "red");
	    $(this).addClass("pointer_cursor");
	    snbApp.modal.displayModal("info", event);
	}).mouseleave(function (event) {
	    $(this).css("border-color", "blue");
	    $(this).removeClass("pointer_cursor");
	    var removable = document.getElementById(event.currentTarget.id + "_mod");
	    document.getElementById("ui").removeChild(removable);
	});

	$("#snb_host_options").on('change',function(event){
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
	});
	$("#host_options_hlpr_id").mouseenter(function (event) {
	    event.preventDefault();
	    $(this).css("border-color", "red");
	    $(this).addClass("pointer_cursor");
	    snbApp.modal.displayModal("info", event);
	}).mouseleave(function (event) {
	    $(this).css("border-color", "blue");
	    $(this).removeClass("pointer_cursor");
	    var removable = document.getElementById(event.currentTarget.id + "_mod");
	    document.getElementById("ui").removeChild(removable);
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
	});
	$("#site_locations_hlpr_id").mouseenter(function (event) {
	    event.preventDefault();
	    $(this).css("border-color", "red");
	    $(this).addClass("pointer_cursor");
	    snbApp.modal.displayModal("info", event);
	}).mouseleave(function (event) {
	    $(this).css("border-color", "blue");
	    $(this).removeClass("pointer_cursor");
	    var removable = document.getElementById(event.currentTarget.id + "_mod");
	    document.getElementById("ui").removeChild(removable);
	});

	$("#snb_dc_offpremise_codes").on('change',function(event){
		var myElement = event.currentTarget.id;
		
		var myChildSelected = $('#snb_dc_offpremise_codes option:selected').data("code");
		var myParentSelected = $("#snb_host_options option:selected").data("code");
		
		var myCode = myParentSelected + myChildSelected;
		snbApp.servernamebuilder.updateServerSection(myElement,myCode);
		snbApp.validatorutility.hideValidatorNotice();
	});
    $("#dc_offpremise_hlpr_id").mouseenter(function (event) {
        event.preventDefault();
        $(this).css("border-color", "red");
        $(this).addClass("pointer_cursor");
        snbApp.modal.displayModal("info",event);
	}).mouseleave(function (event) {
	    $(this).css("border-color", "blue");
	    $(this).removeClass("pointer_cursor");
	    var removable = document.getElementById(event.currentTarget.id + "_mod");
	    document.getElementById("ui").removeChild(removable);
	});

	$("#btnvalidator").on('click', function (event) {
	    event.preventDefault();
	    //get an array of current server names
	    var CurrentServerNames = snbApp.servernamesutility.getNewServerNamesArray();
	    
        //get the full server name from the server name builder
	    var requestedServerName = snbApp.servernamebuilder.getServerName();

	    var validationResults = snbApp.servernamesutility.validateName(requestedServerName);
	    if (validationResults === 1) {
	        snbApp.servernamebuilder.updateServerNameAvailability(true);
	        snbApp.formmanager.lockValidateButton();
	    }
	    snbApp.validatorutility.updateValidationNotice(validationResults, requestedServerName);
	});

	$("#btnrefresh").on('click', function (event) {
	    event.preventDefault();
	    var sn = snbApp.servernamebuilder.getServerNameObj();
		
		snbApp.validatorutility.hideValidatorNotice();
		snbApp.formmanager.resetDropdowns();
		snbApp.validatorutility.resetServerNameField();
		snbApp.servernamebuilder.resetServerNameObj();
		document.getElementById("btnvalidator").setAttribute('disabled', 'disabled');
		$("#site_locs_div").classList.remove("show");
		$("#dc_or_off_prem_div").classList.remove("show");
		$("#site_locs_div").classList.add("hide");
		$("#dc_or_off_prem_div").classList.add("hide");
	});

	$("#btnhelp").on('click', function (event) {
	    event.preventDefault();
	    if (!$("#modal").length) {
	        snbApp.modal.displayModal("help");
	        $("#btnhelp").text("Hide Help");
	    } else {
	        var removable = document.getElementById("modal");
	        document.getElementById("ui").removeChild(removable);
	        $("#btnhelp").text("Show Help");    
	    }
	});
	
})();
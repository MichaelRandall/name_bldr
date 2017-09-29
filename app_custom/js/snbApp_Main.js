var snbApp = window.snbApp || {};

snbApp.main = (function () {
    var main = {};
    main.loadCount = 0;

    main.init = function () {
        snbApp.loadingscreen.startLoader();
        var valBtn = document.getElementById("btnvalidator");
        valBtn.setAttribute('disabled', 'disabled');
        
		//Retrieve current list of server names to validate against
        snbApp.servernamesutility.getNewServerNames();
        
        //***
        //
        //***
		function buildQryStringForSelectOptions(){
		
		    //***
		    //Build select options from multiple SharePoint lists
            //***
			var listsArray = snbApp.splistarray.getArrayOfListsForObjects();
			
			for(var i = 0; i < listsArray.length; i++){
				var listItem = listsArray[i];
				var qryStrng =  listItem.list +
        "?$select=" + listItem.codeDigits + "," + listItem.codeDescription + "," + listItem.ItemStatus + "&$orderby=" + listItem.codeDescription + "&$filter="+listItem.ItemStatus+" eq true" + "&$inlinecount=allpages"
				
				var listAndQryStringObj = {
					listName: listItem.list,
					listObj: listItem,
					//url:snbApp.urlbuilder.getSPURL(qryStrng)
					url: "https://staging-team.usace.army.mil/sites/sandbox/WW/MR/_vti_bin/listdata.svc/" + listItem.list +
        "?$select=" + listItem.codeDigits + "," + listItem.codeDescription + "," + listItem.ItemStatus + "&$orderby=" + listItem.codeDescription + "&$filter="+listItem.ItemStatus+" eq true" + "&$inlinecount=allpages"
				};
				var clientContext = new SP.ClientContext.get_current();
				clientContext.executeQueryAsync(snbApp.dataretriever.letsBuild(listAndQryStringObj), _onQueryFailed);
				
			}
			
		    //***
		    //Build select option from (UMSL) ITSM API
            //***
			var listAndQryStringObj = {
				listName:"SNB_SecondaryActivityCodes",
				url: "https://itsm.usace.army.mil/requests/odata/v1/Sites?$filter=IsActive eq true and IsPending eq false and SiteCodePc ne null and IsSpecialPurpose eq false&$orderby=SiteCodePc"
			};
			snbApp.dataretriever.letsBuild(listAndQryStringObj);
		}
		
		buildQryStringForSelectOptions();
		//buildShPointQryStringForSelectOptions();
		//buildITSMQryStringForSelectOptions();
		
        //***
        //Add delay to populate fields to ensure all data retrieved from AJAX calls
        //***
        var myObj = setTimeout(delayFieldPopulate,5000);
        
        function delayFieldPopulate(){
			var optObj = snbApp.optionsobj.getAllOptions();
			var osType = $("input[name=os_platform]:checked").val();
			snbApp.formmanager.buildForm(osType, optObj);

        }
    };

    function _onQueryFailed(sender, args) {
        alert('Request failed.\nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace());
    }

    return main
})();
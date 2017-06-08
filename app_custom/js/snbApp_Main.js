snbApp.main = (function(){
    var pub = {};
    pub.init = function(){
        snbApp.formmanager.lockValidateButton();
        snbApp.formmanager.lockCommitButton();
        
		//Retrieve current list of server names to validate against
        snbApp.servernamesutility.getNewServerNames();
        
        //***
        //
        //***
		function buildSelectOptions(){
		
		    //***
		    //Build select options from multiple SharePoint lists
            //***
			var listsArray = snbApp.splistarray.getArrayOfListsForObjects();
			
			for(var i = 0; i < listsArray.length; i++){
				var listItem = listsArray[i];
				var qryStrng =  listItem.list +
        "?$select=" + listItem.codeDigits + "," + listItem.codeDescription + "," + listItem.ItemStatus + "&$orderby=" + listItem.codeDescription + "&$filter="+listItem.ItemStatus+" eq true" + "&$inlinecount=allpages"
				
				var listDetails = {
					listName: listItem.list,
					listObj: listItem,
					//url:snbApp.urlbuilder.getSPURL(qryStrng)
					url: "https://staging-team.usace.army.mil/sites/ACEIT/PMO/O/O/I/E/_vti_bin/listdata.svc/" + listItem.list +
        "?$select=" + listItem.codeDigits + "," + listItem.codeDescription + "," + listItem.ItemStatus + "&$orderby=" + listItem.codeDescription + "&$filter="+listItem.ItemStatus+" eq true" + "&$inlinecount=allpages"
				};
				var clientContext = new SP.ClientContext.get_current();
				clientContext.executeQueryAsync(snbApp.dataretriever.letsBuild(listDetails), _onQueryFailed);
			}
			
		    //***
		    //Build select option from UMSL API
            //***
			var listDetails = {
				listName:"SNB_SecondaryActivityCodes",
				// url: snbApp.urlbuilder.getUMSLURL("$filter=IsDistrictSite eq true or IsDivisionSite eq true and IsActive eq true and IsPending eq false")
				url: "https://itsm.usace.army.mil/requests/odata/v1/Sites?$filter=IsDistrictSite eq true or IsDivisionSite eq true and IsActive eq true and IsPending eq false"
			};
			snbApp.dataretriever.letsBuild(listDetails);
		}
		
		buildSelectOptions();
		
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

    return pub
})();
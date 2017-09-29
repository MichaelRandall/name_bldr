var snbApp = window.snbApp || {};
snbApp.objectbuilderutility = (function () {
    
	return{
        buildObjectFields: function(resultsObj, listItem){ //results:resultsObj, prevItem:listItem
            //***
            //For SharePoint list data
            //***
            if (listItem.listName !== "SNB_SecondaryActivityCodes") {
				var theList = listItem.listName;
				var firstQueryParam = listItem.listObj.codeDigits;
				var secondQueryParam = listItem.listObj.codeDescription;
				var returnedItems = resultsObj.d.results;
				var bigStringOptions = "";
				
				//regex to search for SecondaryFunctionCodes in list names
				var pattern = /SecondaryFunctionCodes/;
				var isSecFunction = pattern.test(theList);
				if(isSecFunction){
					bigStringOptions = "<option value='0' selected>Not Applicable</option>";
				}else{
					bigStringOptions = "<option value='0' disabled selected>Select Option</option>";
				}

				$.each(returnedItems, function (index, item) {
					var first = "";
					var second = "";
					for (var key in item) {
						if (item.hasOwnProperty(key)) {
							if (key != "__metadata") {
								if (key == firstQueryParam) {
									first = item[key];
									//console.log(key + ", " + item[key]);
								}
								if (key == secondQueryParam) {
									second = item[key];
									//console.log(key + ", " + item[key]);
								}
							}
						}
					}
					bigStringOptions += "<option value=" + first + " data-code=" + first + ">" + second + "</option>";
				});
				
				var str = theList.toLowerCase();
				snbApp.optionsobj.updateFunctionOrActivity(theList.toLowerCase(), bigStringOptions);
				
                //***
                //For ITSM API
                //***
			} else {
				var theList = listItem.listName;
				var bigStringOptions = "<option value='0' disabled selected>Select Option</option>";
				var returnedItems = resultsObj.value;
				
				for(var i = 0; i < returnedItems.length; i++){
				    
					//need to identify unique values using only the first 3 digits of SiteCodePc and use those only to build the operational unit list
					//after we have identified the unique items, we need to populate the list
					var item = returnedItems[i];
					
					    //***
					    //change event type means the user selected a field, indicated by 'siteCodeChange' - refers to siteCode for change event
                        //***
						if(listItem.eventType === "change"){
						    var siteCodeChange = item.SiteCodePc;
						    if (typeof siteCodeChange === "string" & siteCodeChange != "null") {
						        siteCodeChange = siteCodeChange < 6 ? siteCodeChange : siteCodeChange.slice(3);
						    }
							
							bigStringOptions += "<option value='" + item.Id + "' data-code='" + siteCodeChange + "' data-isDivSite='" + item.IsDivisionSite + "' data-isDistSite='" + item.IsDistrictSite + "' data-divID='" + item.DivisionSiteId + "' data-distID='" + item.DistrictSiteId + "'>(" + siteCodeChange + ") " + item.Name + "</option>";
							
							snbApp.formmanager.buildSelectSiteLocations(bigStringOptions);
							
						//***
						//load event which means this happens when the page is loaded, indicated by 'siteCodeLoad' - refers to siteCode for load event
                        //***
						}else{
						    
						    var siteCodeLoad = item.SiteCodePc;
						    if (typeof siteCodeLoad === "string" & siteCodeLoad != "null") {
								//checks if siteCodePC is less than 4 characters then uses it otherwise it is 6 characters and we want only first 3
								var firstThreeSiteCode = siteCodeLoad.slice(0, 3);
								var lastThreeSiteCode = siteCodeLoad.slice(3,siteCodeLoad.length);
								if(firstThreeSiteCode === lastThreeSiteCode){
									var siteCodeLoad = firstThreeSiteCode;
									bigStringOptions += "<option value='" + item.Id + "' data-code='" + siteCodeLoad + "' data-isDivSite='" + item.IsDivisionSite + "' data-isDistSite='" + item.IsDistrictSite + "' data-divID='" + item.DivisionSiteId + "' data-distID='" + item.DistrictSiteId + "'>(" + siteCodeLoad + ") " + item.Name + "</option>";
								}
						    }
						 
							snbApp.optionsobj.updateFunctionOrActivity(theList.toLowerCase(), bigStringOptions);	
						}
					
				}
					
			}              
        }
    };
})();
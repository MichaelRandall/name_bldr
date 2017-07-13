var snbApp = window.snbApp || {};
snbApp.objectbuilderutility = (function () {
    function formatItemCode(itemCode, eventType){
		if(eventType !== 'change'){ //for load event
			var pattern = /^CE/;
			var result = pattern.test(itemCode);
			if(result){
				return itemCode.slice(2);
			}else{
				return itemCode.slice(0,3);
			}
		}else{ //for change event
			var pattern = /^CE/;
			var result = pattern.test(itemCode);
			if(result){
				return itemCode.slice(2);
			}else{
				return itemCode.slice(3);
			}
		}	
	}
    
	return{
        buildObjectFields: function(returnedObj, listItem){ //results:returnedObj, prevItem:listItem
            //***
            //For SharePoint list data
            //***
            if (listItem.listName !== "SNB_SecondaryActivityCodes") {
				var theList = listItem.listName;
				var firstQueryParam = listItem.listObj.codeDigits;
				var secondQueryParam = listItem.listObj.codeDescription;
				var returnedItems = returnedObj.d.results;
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
				var returnedItems = returnedObj.value;
				var blkLstCodes = snbApp.sitecodeblacklist.getArrayOfBlacklistedCodes();
				
				for(var i = 0; i < returnedItems.length; i++){
				    
					var item = returnedItems[i];
					//replace Code with SiteCodePc
					if (blkLstCodes.indexOf(item.SiteCodePc) === -1) {
					    //***
					    //change event type means the user selected a field
                        //***
						if(listItem.eventType === "change"){
						    var siteCodeChange = item.SiteCodePc;
						    if (typeof siteCodeChange === "string" & siteCodeChange != "null") {
						        siteCodeChange = siteCodeChange < 6 ? siteCodeChange : siteCodeChange.slice(3);
						    }
							
							bigStringOptions += "<option value='" + item.Id + "' data-code='" + siteCodeChange + "' data-isDivSite='" + item.IsDivisionSite + "' data-isDistSite='" + item.IsDistrictSite + "' data-divID='" + item.DivisionSiteId + "' data-distID='" + item.DistrictSiteId + "'>(" + siteCodeChange + ") " + item.Name + "</option>";
							
							snbApp.formmanager.buildSelectSiteLocations(bigStringOptions);
							
						//***
						//load event which means this happens when the page is loaded
                        //***
						}else{
						    
						    var siteCodeLoad = item.SiteCodePc;
						    if (typeof siteCodeLoad === "string" & siteCodeLoad != "null") {
						        var siteCodeLoad = siteCodeLoad.length < 4 ? siteCodeLoad : siteCodeLoad.slice(0, 3);
						    }
						 
							bigStringOptions += "<option value='" + item.Id + "' data-code='" + siteCodeLoad + "' data-isDivSite='" + item.IsDivisionSite + "' data-isDistSite='" + item.IsDistrictSite + "' data-divID='" + item.DivisionSiteId + "' data-distID='" + item.DistrictSiteId + "'>(" + siteCodeLoad + ") " + item.Name + "</option>";
							
							snbApp.optionsobj.updateFunctionOrActivity(theList.toLowerCase(), bigStringOptions);	
						}
					}
				}
					
			}              
        }
    };
})();
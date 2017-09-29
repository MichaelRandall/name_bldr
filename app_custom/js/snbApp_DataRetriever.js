var snbApp = window.snbApp || {};


snbApp.dataretriever = (function () {
    var listsArray = snbApp.splistarray.getArrayOfListsForObjects();
    var newResults;
	var newResultsValue;
	var combinedResultsValue;
    function getListData(listItem) {
		
		var eventType = event.type;
		var baseURL = listItem.url;
		
        $.ajax({
            url: baseURL,
            type: "GET",
            headers: {
                "accept": "application/json;odata=verbose",
            }
        })
        .done(function(results){
			//results.value indicates that the results are from ITSM
			if(results.value){
				if(eventType === 'load'){
					if(newResults === undefined){
						newResults = results;
						newResultsValue = results.value;
					}else{
						combinedResultsValue = newResultsValue.concat(results.value);
					}
					
					if(results['@odata.nextLink']){
						listItem.url = results['@odata.nextLink'];
						snbApp.dataretriever.letsBuild(listItem);
					}else{
						results.value = combinedResultsValue;
						snbApp.objectbuilderutility.buildObjectFields(results, listItem);
					}
				}else{
					snbApp.objectbuilderutility.buildObjectFields(results, listItem);
				}	
			}else{
				snbApp.objectbuilderutility.buildObjectFields(results, listItem);
			}
        })
        .fail(function(xhr, status, errorThrown){
            //console.log("Error:" + errorThrown + ": " + myListName);
            //console.log("Status:" + status);
            //console.dir(xhr);
        });
    }

    function _onQueryFailed(sender, args) {
        alert('Request failed.\nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace());
    }

    return{
        letsBuild:function(item) {
			getListData(item);
		}
    };
    
})();
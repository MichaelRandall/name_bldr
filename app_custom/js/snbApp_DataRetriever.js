snbApp.dataretriever = (function(){
    var listsArray = snbApp.splistarray.getArrayOfListsForObjects();
    
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
			snbApp.objectbuilderutility.buildObjectFields(results, listItem);			
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
snbApp.uiloggerutility = (function(){
	var uiElem = document.getElementById("log");
	
	function displayMessage(message){
		var pElem = document.createElement("p");
		var textElem = document.createTextNode(message);
		pElem.appendChild(textElem);
		uiElem.appendChild(pElem);
	}
	
	return{
		logMessage:function(message){
			displayMessage(message);
		}
	};
})();
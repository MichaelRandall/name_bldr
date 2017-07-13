var snbApp = window.snbApp || {};

snbApp.urlbuilder = (function () {
	var SPListBase = "https://staging-team.usace.army.mil/sites/ACEIT/PMO/O/O/I/E/_vti_bin/listdata.svc/";
	var UMSLBase = "https://itsm.usace.army.mil/requests/odata/v1/Sites?";
	
	return{
		getUMSLURL:function(umslAddition){
			return UMSLBase += umslAddition;
		},
		getSPURL:function(spAddition){
			return SPListBase += spAddition;
		}
	};
})();
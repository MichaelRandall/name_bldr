var snbApp = window.snbApp || {};

snbApp.sitecodeblacklist = (function () {
    var blacklist = [
        "HQUSACE",
		"CEFC",
		"CELA",
		"CEIT",
		"ERDC-IL",
		"ERDC-VA",
		"ERDC-NH",
		"ERDC-MS",
		"Labs & Centers",
		"MEDCOM",
		"CECS",
		"CECW",
		"CRREL",
		"CERL",
		"CECI",
		"DSRC",
		"CEHR",
		"CELD",
		"CEMP",
		"CEHO",
		"CERD",
		"CERM",
		"[Unknown]",
		"CECC",
		"CEPA",
		"ERDC",
		"HQUSACE-RAC",
		"TST",
		"CECO",
		"CREO"
    ];
    
    return{
        getArrayOfBlacklistedCodes:function()
            { 
                return blacklist; 
            }
    };
})();
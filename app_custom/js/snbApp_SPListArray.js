snbApp.splistarray = (function(){
    var ListArray = [
        { "list": "SNB_PrimaryFunctionCodes_w", "codeDigits": "Code", "codeDescription": "Description","ItemStatus":"Active" },
        { "list": "SNB_SecondaryFunctionCodes_w", "codeDigits": "Code", "codeDescription": "Description","ItemStatus":"Active" },
        { "list": "SNB_DC_OffPremiseCodes_w", "codeDigits": "Code", "codeDescription": "Description","ItemStatus":"Active" },
        { "list": "SNB_PrimaryFunctionCodes_u", "codeDigits": "Code", "codeDescription": "Description","ItemStatus":"Active" },
        { "list": "SNB_SecondaryFunctionCodes_u", "codeDigits": "Code", "codeDescription": "Description","ItemStatus":"Active" },
        { "list": "SNB_DC_OffPremiseCodes_u", "codeDigits": "Code", "codeDescription": "Description","ItemStatus":"Active" }
    ];
    
    return{
        getArrayOfListsForObjects:function()
            { 
                //return wListArray;
                return ListArray; 
            }
    };
}());
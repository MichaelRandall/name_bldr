snbApp.validatorutility = (function(){
    var validator = {
        //validatorResponse:"",
        validatorServerName:"",
        validatorNotice:""
    };
    
    //var validatorResponse="";
    //var validatorServerName="";
    //var validatorNotice="";
    
    return{
        setValidatorFields:function(){
            $("#server_name")
              .removeClass("valid_servername")
              .html(validator.validatorServerName);
        },
        resetServerNameField:function(){
            $("#server_name").empty("Server name");
        },
        updateValidationNotice:function(response,requestedservername){
            var valNotice = document.getElementById("validation_notice");
            valNotice.classList.remove("hidden");
            valNotice.classList.add("show");
            switch(response){
                case 1:
                    validator.validatorNotice = "The server name " +  requestedservername + " is valid. Click <b>Refresh</b> to choose a different name, or copy the server name for use in the server request process. <b>Note:</b> the <b>Commit</b> button is only for reporting purposes. You are not required to use it as part of the server request process.";
                    valNotice.innerHTML=validator.validatorNotice;
                    valNotice.classList.remove("invalid_servername");
                    valNotice.classList.add("valid_servername");
                    break;
                case 2:
                    validator.validatorNotice = "The server name " + requestedservername + " is NOT valid. Please try again."
                    valNotice.innerHTML=validator.validatorNotice;
                    valNotice.classList.remove("valid_servername");
                    valNotice.classList.add("invalid_servername");
                    break;
                case 3:
                    validator.validatorNotice = "The server name requested is improperly formatted. Check that all fields have been selected and try again.";
                    valNotice.innerHTML=validator.validatorNotice;
                    valNotice.classList.remove("valid_servername");
                    valNotice.classList.add("invalid_servername");
                    break;
            }   
        },
        hideValidatorNotice:function(){
            var valNotice = document.getElementById("validation_notice");
            valNotice.classList.remove("show");
            valNotice.classList.add("hidden");
            //this.setValidatorFields();
        }
    };
})();
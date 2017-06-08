snbApp.utilities = (function(){
    return {
        getToday:function(){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1;
            var yyyy = today.getFullYear();
            
            if(dd<10){
                dd='0'+dd;
            }
            if(mm<10){
                mm='0'+mm;
            }
            
            today = mm+'/'+dd+'/'+yyyy;
            return today;
        },
        log: function(f,args){
            /* var myString = "Log Function: " + f;
            var i;
            if(args.length === 0){
                console.log(myString + " has no arguments.");
            }else{
                myString += ": " + args.length
                for (i=0;i<args.length;i++){
                    myString += "> " + args[i];
                }
            } */
            console.log(f,args);
        },
        makeString: function(obj){
            var stringValue = String(obj);
            return stringValue;
        }
    };
}());
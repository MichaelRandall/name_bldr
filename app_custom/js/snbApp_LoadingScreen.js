var snbApp = window.snbApp || {};

snbApp.loadingscreen = (function () {
    function move() {
        var progress = document.getElementById("progress");
        var loader = document.getElementById("loader");
        var loaderWidth = loader.offsetWidth;
        var progressPos = progress.offsetLeft;
        
        if (progressPos < loaderWidth) {
            progressPos += 5;
            progress.style.left = progressPos + "px";
        } else {
            progress.style.left = "-20px";
        }
        if (document.getElementById("loader").style.backgroundColor === "green") {
            document.getElementById("loader_hldr").style.display = "none";
            return cancelAnimationFrame(move);
        }
        requestAnimationFrame(move);  
    }
    return {
        startLoader: function () {
            requestAnimationFrame(move);
        }
    };

})();
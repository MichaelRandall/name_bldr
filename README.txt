Files are compiled to source. Here is the process

Command line: "gulp move_collats". This will move all files to a safe working directory

From command line type, "gulp transpile". This will transpile the code from ES6 to the older version that is acceptable to more browsers

From command line type, "gulp concat". This will concatenate all JavaScript files into a single minified file and update the link in snbApp.html to refer to that one file.

From the command line type, "gulp prefixurl". This will prefix the address of the SharePoint directory so you don't have to.

Command line: "gulp remove_xtra". This will remove additional JS files not needed for production.

All usable required files will be located in the dist directory. All you have to do is upload the app_custom folder to SharePoint.


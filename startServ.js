var exec = require('child_process').execFile;

var execute = function(){
    console.log("starting server");
    exec('start-server.bat', function(err, data) {
        console.log(err)
        console.log(data.toString());
    })
}

execute();
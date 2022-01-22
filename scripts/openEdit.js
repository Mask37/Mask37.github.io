var spawn = require('child_process').exec;
hexo.on('new', function(data){
  spawn('start  "C:\Users\Mask\AppData\Local\Programs\Typora\Typora.exe" ' + data.path);
});
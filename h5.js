const child_process = require("child_process");
const fs = require("fs");
const compressing = require('compressing');
const address = "E:\\芜湖\\sc-whmc-h5";
const desk = "C:\\Users\\yiduo\\OneDrive\\桌面"
// 递归删除文件
function deleteFolder(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

async function commandHandle (command){
    return new Promise((resolve, reject) => {
        child_process.exec(
            command,
            { cwd: address },
            function (error, stdout, stderr) {
                if (error !== null) {
                    console.log("exec error: " + error);
                    reject()
                } else {
                    console.log(stdout);
                    resolve()
                }
            }
        );
    });
};

async function start() {
    deleteFolder(address + '\\dist')
    await commandHandle('git pull')
    await commandHandle('npm run h5')

    compressing.zip.compressDir(`${address}\\dist`, `${desk}\\dist.zip`).then((res=>{
        console.log(res,'-res')
    })).catch((err=>{
        console.log(err)
    }));
}
start()

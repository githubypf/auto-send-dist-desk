const robot = require("robotjs");   //控制鼠标键盘等操作
const opn = require('opn');     //执行语句
const exec = require('child_process').exec;
const fs = require("fs");

const timeout = ((time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time);
    })
})

const fileUrl = "C:\\Users\\yiduo\\OneDrive\\桌面\\dist.zip"

async function start() {
    exec(`explorer.exe /select,${fileUrl}`)
    await timeout(4000)
    robot.keyTap("x", "control");
    await timeout(1000)
    opn('C:/Program Files (x86)/DingDing/DingtalkLauncher.exe');
    await timeout(2000)
    robot.keyTap("N", "alt");
    await timeout(2000)
    robot.typeString("fasong");
    robot.keyTap("enter");
    await timeout(2000)
    robot.keyTap("enter");
    await timeout(1000)
    robot.keyTap("v", "control");
    fs.unlinkSync(fileUrl);
}
start()
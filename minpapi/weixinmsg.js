const formatMsg = require('./fmtwxmsg');

function help() {
    return `这是一个消息回复测试程序，会把消息原样返回，但是目前不支持视频类型的消息`;
}
function student() {
    return `姓名：侯德森`+`\n`
            +`学号：2017011782`+`\n`
            +`年级：2017级`+`\n`
            +`班级：3班`+`\n`
            +`学校：河北师范大学`+`\n`
            +`学院：软件学院`+`\n`;
}

//处理用户发过来的消息
//第一个参数是解析后的用户消息
//第二个参数是要返回的消息对象
//基本处理过程：根据用户发过来的消息判断消息类型并做处理
function userMsg(wxmsg, retmsg) {
    /*
        检测是否为文本消息，如果是文本消息则先要检测是不是支持的关键词回复。
    */
    if (wxmsg.MsgType == 'text') {
        if (wxmsg.Content == 'help' || wxmsg.Content == '?' || wxmsg.Content == '？') {
            retmsg.msg = help();
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);
        } else if (wxmsg.Content == 'hello' || wxmsg.Content == '你好'){

            retmsg.msg = '你好，你可以输入一些关键字测试消息回复，输入help/?获取帮助';
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);

        }else if(wxmsg.Content == 'who'){
            retmsg.msg = student();
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);
        } else {
            retmsg.msg = wxmsg.Content;
            retmsg.msgtype = wxmsg.MsgType;
            return formatMsg(retmsg);
        }
    } else {
        switch(wxmsg.MsgType) {
            case 'image':
            case 'voice':
                retmsg.msg = wxmsg.MediaId;
                retmsg.msgtype = wxmsg.MsgType;
                break;
            default:
                retmsg.msg = '不支持的类型';
        }

        return formatMsg(retmsg);
    }
}

exports.userMsg = userMsg;
exports.help = help;
function eventMsg(wxmsg,retmsg){
    //默认返回消息类型为文本
    retmsg.msgtype = 'text';
    
    switch (wxmsg.Event) {
        case 'subscribe':
            retmsg.msg = '您好，这是一个测试号！';
            return formatMsg(retmsg);
    
        case 'unsubscribe':
            console.log(wxmsg.FromUserName,'取消关注');
            break;
        case 'VIEW':
            console.log(wxmsg.EventKey);
            break;
        case 'CLICK':
                retmsg.msg=wxmsg.EventKey;
                return formatMsg(retmsg);
        default:
            break;
        
    }
}

exports.msgDispatch = function msgDispatch(wxmsg, retmsg) {
    if(wxmsg.MsgType == 'event'){
        return eventMsg(wxmsg,retmsg)
    }
    return userMsg(wxmsg, retmsg);
};

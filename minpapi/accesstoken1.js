const gohttp = require('gohttp');
const wxkey = require('./wxkey1');

var token_api=`https://api.weixin.qq.com/cgi-bin/token`+`?grant_type=client_credential`+`&appid=${wxkey.appid}&secret=${wxkey.secret}`;

var menu_data = {
    button: [
        {
            name: "Linux",
            type: "view",
            url: "https://www.Linux.org"
        },
        {
            name: "send",
            "sub_button" : [
                {
                    "name" : "test1",
                    "type" : "click",
                    "key" : "test1"
                }, {
                    "name" : "test2",
                    "type" : "click",
                    "key" : "test2"
                }
            ]
        },
        {
            name: "发图",
            type: "pic_weixin",
            key: "my-image"
        }
    ]
};

(async ()=>{
    let ret = await gohttp.get(token_api);
    let t = JSON.parse(ret);
    if(t.access_token === undefined){
        console.log(ret);
        process.exit(-1);
    }



    let create_menu_api = `https://api.weixin.qq.com/cgi-bin/menu/create`+`?access_token=${t.access_token}`;

    ret = await gohttp.post(create_menu_api,{
        body: menu_data,
        headers: {
            'content-type': 'text/plain'
        }
    });
    console.log(ret);
})();

// gohttp.get(token_api).then(d=>{
//     console.log(d);
// })
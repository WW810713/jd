/*
更新使用了ziye的脚本进行优化（https://m.q.qq.com/a/s/d3eacc70120b9a37e46bad408c0c4c2a)//date-11/26
11/28
使用方法：
1.点击 
https://m.q.qq.com/a/s/f9726d0a930319a7dd35bbcc8e42dc60  进入读书程序

2.重写引用
https://raw.githubusercontent.com/xingliuchao/jd/main/QQreadCookie.conf

---点读书程序〉我的 ---获取cookie
---进一本书看 5秒左右然后返回，获取阅读时长cookie，一定不能超过10秒

获取cookie然后禁用本重写就行了！

3.在[task_local]下粘贴

 2 */4 * * * ? https://raw.githubusercontent.com/xingliuchao/jd/main/QQread.js, tag=QQ读书3, enabled=true


*/


const jsname='QQ读书小程序3'
const $ = Env(jsname)


const logs = 0;   //0为关闭日志，1为开启
const notifyInterval=2
//0为关闭通知，1为所有通知，2为宝箱领取成功通知，3为宝箱每15次通知一次


const jbid=3//换号则修改这个值,默认账号1

const dd=1//单次任务延迟,默认1秒

const TIME=30//单次时长上传限制，默认5分钟

const maxtime=20//每日上传时长限制，默认20小时

const wktimess=1200//周奖励领取标准，默认1200分钟


const qqread3urlKey = 'qqread3url'+jbid
const qqread3urlVal = $.getdata(qqread3urlKey)


const qqread3headerKey = 'qqread3hd'+jbid
const qqread3headerVal= $.getdata(qqread3headerKey)

const qqread3bodyKey = 'qqread3body'+jbid
const qqread3bodyVal = $.getdata(qqread3bodyKey)




const qqread3timeurlKey = 'qqread3timeurl'+jbid
const qqread3timeurlVal = $.getdata(qqread3timeurlKey)


const qqread3timeheaderKey = 'qqread3timehd'+jbid
const qqread3timeheaderVal= $.getdata(qqread3timeheaderKey)




var tz=''




//CK运行

let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
   GetCookie()
} else {
   all()
}






function GetCookie() {

   if($request &&$request.url.indexOf("init")>=0) {

  const qqread3urlVal = $request.url
if (qqread3urlVal)        $.setdata(qqread3urlVal,qqread3urlKey)
    $.log(`[${jsname}] 获取url请求: 成功,qqread3urlVal: ${qqread3urlVal}`)

    
  const qqread3bodyVal = $request.body
    if (qqread3bodyVal)        $.setdata(qqread3bodyVal,qqread3bodyKey)
    $.log(`[${jsname}] 获取阅读: 成功,qqread3bodyVal: ${qqread3bodyVal}`)

    
const qqread3headerVal = JSON.stringify($request.headers)
    if (qqread3headerVal)        $.setdata(qqread3headerVal,qqread3headerKey)
    $.log(`[${jsname}] 获取Cookie: 成功,qqread3headerVal: ${qqread3headerVal}`)
    $.msg(qqread3headerKey, `获取cookie: 成功🎉`, ``)
  

}





else if($request &&$request.url.indexOf("addReadTimeWithBid?")>=0) {

  const qqread3timeurlVal = $request.url
if (qqread3timeurlVal)        $.setdata(qqread3timeurlVal,qqread3timeurlKey)
    $.log(`[${jsname}] 获取阅读时长url: 成功,qqread3timeurlVal: ${qqread3timeurlVal}`)


const qqread3timeheaderVal = JSON.stringify($request.headers)
    if (qqread3timeheaderVal)        $.setdata(qqread3timeheaderVal,qqread3timeheaderKey)
    $.log(`[${jsname}] 获取时长header: 成功,qqread3timeheaderVal: ${qqread3timeheaderVal}`)
    $.msg(qqread3timeheaderKey, `获取阅读时长cookie: 成功🎉`, ``)


   
  

}


}




function all()

 {

   for(var i=0;i<18;i++)
 { (function(i) {
            setTimeout(function() {

     if (i==0)
qqread3info();//用户名

else if (i==1)
qqread3config();//时长查询

else if (i==2)
qqread3task();//任务列表

else if (i==3)
qqread3sign();//金币签到

else if (i==4&&task.data.treasureBox.doneFlag==0)
qqread3box();//宝箱

else if (i==5&&task.data.taskList[2].doneFlag==0)
qqread3ssr1();//阅读金币1

else if (i==6)
qqread3time();//上传时长

else if (i==7&&task.data.taskList[0].doneFlag==0)
qqread3take();//阅豆签到

else if (i==8&&task.data.taskList[1].doneFlag==0)
qqread3dayread();//阅读任务

else if (i==9&&task.data.taskList[2].doneFlag==0)
qqread3ssr2();//阅读金币2

else if (i==10&&task.data.taskList[3].doneFlag==0)
qqread3video();//视频任务

else if(i==11&&sign.data.videoDoneFlag==0)
qqread3sign2();//签到翻倍

else if (i==12&&task.data.treasureBox.videoDoneFlag==0)
qqread3box2();//宝箱翻倍

else if (i==13&&task.data.taskList[2].doneFlag==0)
qqread3ssr3();//阅读金币3

else if (i==14)
qqread3wktime();//周时长查询


else if (i==15)
qqread3pick();//领周时长奖励

else if (i==16)
showmsg();//通知

else if (i==17)
$.done();//结束

 }


, (i + 1) *dd*1000);
                })(i)



}


}








//任务列表
function qqread3task() {
return new Promise((resolve, reject) => {

  const toqqread3taskurl ={url: 'https://mqqapi.reader.qq.com/mqq/red_packet/user/page?fromGuid=',
   headers: JSON.parse(qqread3headerVal),
    
 timeout:60000};
   $.get(toqqread3taskurl,(error, response, data) =>{
     if(logs) $.log(`${jsname}, 任务列表: ${data}`)
     task =JSON.parse(data)
tz+=
'【任务列表】:余额'+task.data.user.amount+'金币\n'+
'【第'+task.data.invite.issue+'期】:时间'+task.data.invite.dayRange+'\n'
+'已邀请'+task.data.invite.inviteCount+'人，再邀请'+task.data.invite.nextInviteConfig.count+'人获得'+task.data.invite.nextInviteConfig.amount+'金币\n'+
'【'+task.data.taskList[0].title+'】:'+task.data.taskList[0].amount+'金币,'+task.data.taskList[0].actionText+'\n'+
'【'+task.data.taskList[1].title+'】:'+task.data.taskList[1].amount+'金币,'+task.data.taskList[1].actionText+'\n'+
'【'+task.data.taskList[2].title+'】:'+task.data.taskList[2].amount+'金币,'+task.data.taskList[2].actionText+'\n'+
'【'+task.data.taskList[3].title+'】:'+task.data.taskList[3].amount+'金币,'+task.data.taskList[3].actionText+'\n'+
'【宝箱任务'+(task.data.treasureBox.count+1)+'】:'+task.data.treasureBox.tipText+'\n'+
'【'+task.data.fans.title+'】:'+task.data.fans.fansCount+'个好友,'+task.data.fans.todayAmount+'金币\n'



resolve()

    })

   })
  }  








//用户名
function qqread3info() {
return new Promise((resolve, reject) => {

  const toqqread3infourl = {

    url: qqread3urlVal,

    headers: JSON.parse(qqread3headerVal),
    
 timeout:60000};
   $.get(toqqread3infourl,(error, response, data) =>{
     if(logs) $.log(`${jsname}, 用户名: ${data}`)
     info =JSON.parse(data)
tz+=
'【用户信息】:'+info.data.user.nickName+'\n'



    


resolve()
    })
   })
  }  









//阅豆签到
function qqread3take() {
return new Promise((resolve, reject) => {

  const toqqread3takeurl ={url: 'https://mqqapi.reader.qq.com/mqq/sign_in/user',

    headers: JSON.parse(qqread3headerVal),
   timeout:60000};
   $.post(toqqread3takeurl,(error, response, data) =>{
     if(logs) $.log(`${jsname}, 阅豆签到: ${data}`)
     take =JSON.parse(data)

if (take.data.takeTicket>0)
 {
tz+=
'【阅豆签到】:获得'+take.data.takeTicket+'豆\n'
}


    


resolve()
    })
   })
  }  



//阅读时长任务
function qqread3config() {
return new Promise((resolve, reject) => {

  const toqqread3configurl = {

    url: 'https://mqqapi.reader.qq.com/mqq/page/config?router=%2Fpages%2Fbook-read%2Findex&options=',
    headers: JSON.parse(qqread3headerVal),
    };

   $.get(toqqread3configurl,(error, response, data) =>{

     if(logs) $.log(`${jsname}, 阅读时长查询: ${data}`)
     config =JSON.parse(data)
   if (config.code==0)
tz+='【时长查询】:今日阅读'+(config.data.pageParams.todayReadSeconds/60).toFixed(0)+'分钟\n'


resolve()
    })
   })
  } 









//阅读时长
function qqread3time() {
return new Promise((resolve, reject) => {

  const toqqread3timeurl = {

    url: qqread3timeurlVal.replace(/readTime=/g, `readTime=${TIME}`),

    headers: JSON.parse(qqread3timeheaderVal),
     
    };

if (config.data.pageParams.todayReadSeconds/3600<=maxtime){

   $.get(toqqread3timeurl,(error, response, data) =>{
     if(logs) $.log(`${jsname}, 阅读时长: ${data}`)
     time =JSON.parse(data)
     if (time.code==0)
tz+='【阅读时长】:上传'+TIME/6+'分钟\n'



resolve()
    })

}
   })
  }  











//阅读金币1
function qqread3ssr1() {
return new Promise((resolve, reject) => {

  const toqqread3ssr1url = {url: `https://mqqapi.reader.qq.com/mqq/red_packet/user/read_time?seconds=30`,

    headers: JSON.parse(qqread3headerVal),
   timeout:60000};

if (config.data.pageParams.todayReadSeconds/60>=1){

   $.get(toqqread3ssr1url,(error, response, data) =>{
     if(logs) $.log(`${jsname}, 金币奖励1: ${data}`)
     ssr1 =JSON.parse(data)
	if (ssr1.data.amount>0)   
tz+='【阅读金币1】获得'+ssr1.data.amount+'金币\n'


resolve()
    })
}
   })
  }  




//阅读金币2
function qqread3ssr2() {
return new Promise((resolve, reject) => {

  const toqqread3ssr2url = {url: `https://mqqapi.reader.qq.com/mqq/red_packet/user/read_time?seconds=300`,

    headers: JSON.parse(qqread3headerVal),
   timeout:60000};

if (config.data.pageParams.todayReadSeconds/60>=5){

   $.get(toqqread3ssr2url,(error, response, data) =>{
     if(logs) $.log(`${jsname}, 金币奖励2: ${data}`)
     ssr2 =JSON.parse(data)
	if (ssr2.data.amount>0)   
tz+='【阅读金币2】获得'+ssr2.data.amount+'金币\n'


resolve()
    })
}
   })
  }  






//阅读金币3
function qqread3ssr3() {
return new Promise((resolve, reject) => {

  const toqqread3ssr3url = {url: `https://mqqapi.reader.qq.com/mqq/red_packet/user/read_time?seconds=1800`,

    headers: JSON.parse(qqread3headerVal),
   timeout:60000};

if (config.data.pageParams.todayReadSeconds/60>=30){

   $.get(toqqread3ssr3url,(error, response, data) =>{
     if(logs) $.log(`${jsname}, 金币奖励3: ${data}`)
     ssr3 =JSON.parse(data)
	if (ssr3.data.amount>0)   
tz+='【阅读金币3】获得'+ssr3.data.amount+'金币\n'


resolve()
    })
}
   })
  }  











//金币签到
function qqread3sign() {
return new Promise((resolve, reject) => {

  const toqqread3signurl ={url: 'https://mqqapi.reader.qq.com/mqq/red_packet/user/clock_in/page',

    headers: JSON.parse(qqread3headerVal),
   timeout:60000};
   $.get(toqqread3signurl,(error, response, data) =>{
     if(logs) $.log(`${jsname}, 金币签到: ${data}`)
     sign =JSON.parse(data)

if (sign.data.videoDoneFlag)
 {
tz+=
'【金币签到】:获得'+sign.data.todayAmount+'金币\n'
    }


resolve()
    })
   })
  }  




//金币签到翻倍
function qqread3sign2() {
return new Promise((resolve, reject) => {

  const toqqread3sign2url ={url: 'https://mqqapi.reader.qq.com/mqq/red_packet/user/clock_in_video',

    headers: JSON.parse(qqread3headerVal),
   timeout:60000};
   $.get(toqqread3sign2url,(error, response, data) =>{
     if(logs) $.log(`${jsname}, 金币签到翻倍: ${data}`)
     sign2 =JSON.parse(data)

if (sign2.code==0)
 {
tz+=
'【签到翻倍】:获得'+sign2.data.amount+'金币\n'
}




resolve()
    })
   })
  }  






//每日阅读
function qqread3dayread() {
return new Promise((resolve, reject) => {

  const toqqread3dayreadurl ={url: 'https://mqqapi.reader.qq.com/mqq/red_packet/user/read_book',

    headers: JSON.parse(qqread3headerVal),
   timeout:60000};
   $.get(toqqread3dayreadurl,(error, response, data) =>{
     if(logs) $.log(`${jsname}, 每日阅读: ${data}`)
     dayread =JSON.parse(data)

if (dayread.code==0)
 {
tz+=
'【每日阅读】:获得'+dayread.data.amount+'金币\n'

}


resolve()
    })
   })
  }  







//视频奖励
function qqread3video() {
return new Promise((resolve, reject) => {

  const toqqread3videourl ={url: 'https://mqqapi.reader.qq.com/mqq/red_packet/user/watch_video',

    headers: JSON.parse(qqread3headerVal),
   timeout:60000};
   $.get(toqqread3videourl,(error, response, data) =>{
     if(logs) $.log(`${jsname}, 视频奖励: ${data}`)
     video =JSON.parse(data)

if (video.code==0)
 {
tz+=
'【视频奖励】:获得'+video.data.amount+'金币\n'

}


resolve()
    })
   })
  }  







//宝箱奖励
function qqread3box() {
return new Promise((resolve, reject) => {

  const toqqread3boxurl ={url: 'https://mqqapi.reader.qq.com/mqq/red_packet/user/treasure_box',

    headers: JSON.parse(qqread3headerVal),
   timeout:60000};
   $.get(toqqread3boxurl,(error, response, data) =>{
     if(logs) $.log(`${jsname}, 宝箱奖励: ${data}`)
     box =JSON.parse(data)

if (box.data.count>=0)
 {
tz+=
'【宝箱奖励'+box.data.count+'】:获得'+box.data.amount+'金币\n'

 } 
    


resolve()
    })
   })
  }  




//宝箱奖励翻倍
function qqread3box2() {
return new Promise((resolve, reject) => {

  const toqqread3box2url ={url: 'https://mqqapi.reader.qq.com/mqq/red_packet/user/treasure_box_video',

    headers: JSON.parse(qqread3headerVal),
   timeout:60000};
   $.get(toqqread3box2url,(error, response, data) =>{
     if(logs) $.log(`${jsname}, 宝箱奖励翻倍: ${data}`)
     box2 =JSON.parse(data)

if (box2.code==0)
 {
tz+=
'【宝箱翻倍】:获得'+box2.data.amount+'金币\n'
}




resolve()
    })
   })
  }  






//本周阅读时长
function qqread3wktime() {
return new Promise((resolve, reject) => {

  const toqqread3wktimeurl = {

    url: `https://mqqapi.reader.qq.com/mqq/v1/bookShelfInit`,

    headers: JSON.parse(qqread3headerVal),
     
    };

   $.get(toqqread3wktimeurl,(error, response, data) =>{
     if(logs) $.log(`${jsname}, 阅读时长: ${data}`)
     wktime =JSON.parse(data)
     if (wktime.code==0)
tz+='【本周阅读时长】:'+wktime.data.readTime+'分钟\n'



resolve()
    })


   })
  }  








//本周阅读时长奖励任务
function qqread3pick() {
return new Promise((resolve, reject) => {

  const toqqread3pickurl = {

    url:`https://mqqapi.reader.qq.com/mqq/pickPackageInit`,

    headers: JSON.parse(qqread3headerVal),
     
    };

if (wktime.data.readTime>=wktimess){

    $.get(toqqread3pickurl,(error, response, data) =>{
     if(logs) $.log(`${jsname},周阅读时长奖励任务: ${data}`)
     pick =JSON.parse(data)
     if (pick.data[7].isPick==true)
tz+='【周时长奖励】:已全部领取\n'


for(let i=0;i<pick.data.length;i++)
 {
	setTimeout(()=>{	 


var pickid=pick.data[i].readTime

var Packageid=['10','10','20','30','50','80','100','120']

 
const toqqread3Packageurl = {

    url:`https://mqqapi.reader.qq.com/mqq/pickPackage?readTime=${pickid}`,

    headers: JSON.parse(qqread3headerVal),
    
 timeout:60000};
    $.get(toqqread3Packageurl,(error, response, data) =>{
     if(logs) $.log(`${jsname}, 领周阅读时长: ${data}`)
     Package =JSON.parse(data)
     if (Package.code==0)
tz+='【周时长奖励'+(i+1)+'】:领取'+Packageid[i]+'阅豆\n'

     
})			
    


 },i*100)}



})

    resolve()

 }

})
 }






    

function showmsg() {

	
console.log(tz)
	
if (notifyInterval==1)
$.msg(jsname,'',tz)//显示所有通知

else if (notifyInterval==2&&task.data.treasureBox.doneFlag==0)
$.msg(jsname,'',tz)//宝箱领取成功通知


else if (notifyInterval==3&&task.data.treasureBox.count==0||task.data.treasureBox.count==15||task.data.treasureBox.count==30||task.data.treasureBox.count==45||task.data.treasureBox.count==60)
$.msg(jsname,'',tz)//宝箱每15次通知一次



}


// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

/* 获取he

⚠️一共6个位置 9个ck  11条 Secrets 
多账号换行

第一步 添加  hostname=mobile.app.autohome.com.cn,pay.autohome.com.cn,openapi.autohome.com.cn,

第二步 添加header重写 

点击 我 获取用户名url header
GetUserInfourlVal    👉  QCZJ_GetUserInfoURL  
GetUserInfoheaderVal 👉QCZJ_GetUserInfoHEADER

点击 我>>钱包 获取钱包余额 header
accountManageheaderVal👉 accountManageHEADER


第三步 注释header重写，添加body重写 添加时段body重写  获取完后注释

点击 活动 获取账户信息 签到任务 活动body
coinbodyVal          👉  QCZJ_coinBODY
taskbodyVal          👉  QCZJ_taskBODY
activitybodyVal      👉  QCZJ_activityBODY

点击 首页>>右上角 获取时段 时段翻倍 body
addCoinbodyVal       👉  addCoinBODY
addCoin2bodyVal      👉  addCoin2BODY

点击 活动>>分享赚现金 自己助力自己 获取助力任务header  body 
reportAssheaderVal   👉  reportAssHEADER
reportAssbodyVal   👉  reportAssBODY

点击 活动>>现金收入>>提现>>立即提现 获取提现body
cointowalletbodyVal  👉  cointowalletBODY


⚠️主机名以及重写👇

hostname=mobile.app.autohome.com.cn,pay.autohome.com.cn,openapi.autohome.com.cn,
############## 圈x
#汽车之家极速版获取header
https:\/\/(mobile\.app\.autohome\.com\.cn\/*||pay\.autohome\.com\.cn\/*||openapi\.autohome\.com\.cn\/*) url script-request-header https://raw.githubusercontent.com/ziye12/QCZJSPEED/master/Task/qczjspeed.js

#汽车之家极速版获取body
https:\/\/(mobile\.app\.autohome\.com\.cn\/*||openapi\.autohome\.com\.cn\/*) url script-request-body https://raw.githubusercontent.com/ziye12/QCZJSPEED/master/Task/qczjspeed.js

#汽车之家极速版获取时段body
http:\/\/mobile\.app\.autohome\.com\.cn\/fasthome\/mainpagecoin\/addCoin url script-request-body https://raw.githubusercontent.com/ziye12/QCZJSPEED/master/Task/qczjspeed.js



############## loon

#汽车之家极速版获取header
http-request (mobile\.app\.autohome\.com\.cn\/*||pay\.autohome\.com\.cn\/*||openapi\.autohome\.com\.cn\/*) script-path=https://raw.githubusercontent.com/ziye12/QCZJSPEED/master/Task/qczjspeed.js, requires-header=true, tag=汽车之家极速版获取header

#汽车之家极速版获取body
http-request (mobile\.app\.autohome\.com\.cn\/*||openapi\.autohome\.com\.cn\/*) script-path=https://raw.githubusercontent.com/ziye12/QCZJSPEED/master/Task/qczjspeed.js,requires-body=true, tag=汽车之家极速版获取body

#汽车之家极速版获取时段body
http:\/\/mobile\.app\.autohome\.com\.cn\/fasthome\/mainpagecoin\/addCoin script-path=https://raw.githubusercontent.com/ziye12/QCZJSPEED/master/Task/qczjspeed.js,requires-body=true, tag=汽车之家极速版获取时段body


############## surge

#汽车之家极速版获取body
汽车之家极速版获取body = type=http-request,pattern=(mobile\.app\.autohome\.com\.cn\/*||openapi\.autohome\.com\.cn\/*),requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/ziye12/QCZJSPEED/master/Task/qczjspeed.js, script-update-interval=0

#汽车之家极速版获取header
汽车之家极速版获取header = type=http-request,pattern=(mobile\.app\.autohome\.com\.cn\/*||pay\.autohome\.com\.cn\/*||openapi\.autohome\.com\.cn\/*),script-path=https://raw.githubusercontent.com/ziye12/QCZJSPEED/master/Task/qczjspeed.js, 

#汽车之家极速版获取时段body
汽车之家极速版获取时段body = type=http-request,pattern=http:\/\/mobile\.app\.autohome\.com\.cn\/fasthome\/mainpagecoin\/addCoin,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/ziye12/QCZJSPEED/master/Task/qczjspeed.js, script-update-interval=0



*/


const $ = Env("汽车之家极速版");
$.idx = ($.idx = ($.getval('qczjSuffix') || '1') - 1) > 0 ? ($.idx + 1 + '') : ''; // 账号扩展字符
const notify = $.isNode() ? require("./sendNotify") : "";

let COOKIES_SPLIT = "\n"; // 自定义多cookie之间连接的分隔符，默认为\n换行分割，不熟悉的不要改动和配置，为了兼容本地node执行

const logs = 0; // 0为关闭日志，1为开启
const notifyInterval = 1;// 0为关闭通知，1为所有通知，
const cointowalletid = 0.5;//提现金额

$.message = '';

const GetUserInfourlArr = [];
let GetUserInfourlVal = "";
const GetUserInfoheaderArr = [];
let GetUserInfoheaderVal = "";
let middleGetUserInfoURL = [];
let middleGetUserInfoHEADER = [];
const coinbodyArr = [];
let coinbodyVal = "";
let middlecoinBODY = [];
const accountManageheaderArr = [];
let accountManageheaderVal = "";
let middleaccountManageHEADER = [];
const taskbodyArr = [];
let taskbodyVal = "";
let middletaskBODY = [];
const activitybodyArr = [];
let activitybodyVal = "";
let middleactivityBODY = [];
const addCoinbodyArr = [];
let addCoinbodyVal = "";
let middleaddCoinBODY = [];
const addCoin2bodyArr = [];
let addCoin2bodyVal = "";
let middleaddCoin2BODY = [];
const reportAssbodyArr = [];
let reportAssbodyVal = "";
const reportAssheaderArr = [];
let reportAssheaderVal = "";
let middlereportAssBODY = [];
let middlereportAssHEADER = [];
const cointowalletbodyArr = [];
let cointowalletbodyVal = "";
let middlecointowalletBODY = [];

if ($.isNode()) {
  if (process.env.COOKIES_SPLIT) {
    COOKIES_SPLIT = process.env.COOKIES_SPLIT;
  }
  console.log(
    `============ cookies分隔符为：${JSON.stringify(
      COOKIES_SPLIT
    )} =============\n`
  );
 if (
    process.env.QCZJ_GetUserInfoURL &&
    process.env.QCZJ_GetUserInfoURL.indexOf(COOKIES_SPLIT) > -1
  ) {
    middleGetUserInfoURL = process.env.QCZJ_GetUserInfoURL.split(COOKIES_SPLIT);
  } else {
    middleGetUserInfoURL = process.env.QCZJ_GetUserInfoURL.split();
  }
  if (
    process.env.QCZJ_GetUserInfoHEADER &&
    process.env.QCZJ_GetUserInfoHEADER.indexOf(COOKIES_SPLIT) > -1
  ) {
    middleGetUserInfoHEADER = process.env.QCZJ_GetUserInfoHEADER.split(COOKIES_SPLIT);
  } else {
    middleGetUserInfoHEADER = process.env.QCZJ_GetUserInfoHEADER.split();
  } 
    if (
    process.env.QCZJ_coinBODY &&
    process.env.QCZJ_coinBODY.indexOf(COOKIES_SPLIT) > -1
  ) {
    middlecoinBODY = process.env.QCZJ_coinBODY.split(COOKIES_SPLIT);
  } else {
    middlecoinBODY = process.env.QCZJ_coinBODY.split();
  } 
  if (
    process.env.QCZJ_accountManageHEADER &&
    process.env.QCZJ_accountManageHEADER.indexOf(COOKIES_SPLIT) > -1
  ) {
    middleaccountManageHEADER = process.env.QCZJ_accountManageHEADER.split(COOKIES_SPLIT);
  } else {
    middleaccountManageHEADER = process.env.QCZJ_accountManageHEADER.split();
  }  
    if (
    process.env.QCZJ_taskBODY &&
    process.env.QCZJ_taskBODY.indexOf(COOKIES_SPLIT) > -1
  ) {
    middletaskBODY = process.env.QCZJ_taskBODY.split(COOKIES_SPLIT);
  } else {
    middletaskBODY = process.env.QCZJ_taskBODY.split();
  }  
    if (
    process.env.QCZJ_activityBODY &&
    process.env.QCZJ_activityBODY.indexOf(COOKIES_SPLIT) > -1
  ) {
    middleactivityBODY = process.env.QCZJ_activityBODY.split(COOKIES_SPLIT);
  } else {
    middleactivityBODY = process.env.QCZJ_activityBODY.split();
  }    
    if (
    process.env.QCZJ_addCoinBODY &&
    process.env.QCZJ_addCoinBODY.indexOf(COOKIES_SPLIT) > -1
  ) {
    middleaddCoinBODY = process.env.QCZJ_addCoinBODY.split(COOKIES_SPLIT);
  } else {
    middleaddCoinBODY = process.env.QCZJ_addCoinBODY.split();
  } 
    if (
    process.env.QCZJ_addCoin2BODY &&
    process.env.QCZJ_addCoin2BODY.indexOf(COOKIES_SPLIT) > -1
  ) {
    middleaddCoin2BODY = process.env.QCZJ_addCoin2BODY.split(COOKIES_SPLIT);
  } else {
    middleaddCoin2BODY = process.env.QCZJ_addCoin2BODY.split();
  } 
  if (
    process.env.QCZJ_reportAssHEADER &&
    process.env.QCZJ_reportAssHEADER.indexOf(COOKIES_SPLIT) > -1
  ) {
    middlereportAssHEADER = process.env.QCZJ_reportAssHEADER.split(COOKIES_SPLIT);
  } else {
    middlereportAssHEADER = process.env.QCZJ_reportAssHEADER.split();
  } 
    if (
    process.env.QCZJ_reportAssBODY &&
    process.env.QCZJ_reportAssBODY.indexOf(COOKIES_SPLIT) > -1
  ) {
    middlereportAssBODY = process.env.QCZJ_reportAssBODY.split(COOKIES_SPLIT);
  } else {
    middlereportAssBODY = process.env.QCZJ_reportAssBODY.split();
  }   
    if (
    process.env.QCZJ_cointowalletBODY &&
    process.env.QCZJ_cointowalletBODY.indexOf(COOKIES_SPLIT) > -1
  ) {
    middlecointowalletBODY = process.env.QCZJ_cointowalletBODY.split(COOKIES_SPLIT);
  } else {
    middlecointowalletBODY = process.env.QCZJ_cointowalletBODY.split();
  } 
}
if ($.isNode()) {
  Object.keys(middleGetUserInfoURL).forEach((item) => {
    if (middleGetUserInfoURL[item]) {
      GetUserInfourlArr.push(middleGetUserInfoURL[item]);
    }
  });
  Object.keys(middleGetUserInfoHEADER).forEach((item) => {
    if (middleGetUserInfoHEADER[item]) {
      GetUserInfoheaderArr.push(middleGetUserInfoHEADER[item]);
    }
  });  
  Object.keys(middlecoinBODY).forEach((item) => {
    if (middlecoinBODY[item]) {
      coinbodyArr.push(middlecoinBODY[item]);
    }
  });
  Object.keys(middleaccountManageEADER).forEach((item) => {
    if (middleaccountManageHEADER[item]) {
      accountManageheaderArr.push(middleaccountManageHEADER[item]);
    }
  });    
  Object.keys(middletaskBODY).forEach((item) => {
    if (middletaskBODY[item]) {
      taskbodyArr.push(middletaskBODY[item]);
    }
  });
  Object.keys(middleactivityBODY).forEach((item) => {
    if (middleactivityBODY[item]) {
      activitybodyArr.push(middleactivityBODY[item]);
    }
  });
  Object.keys(middleaddCoinBODY).forEach((item) => {
    if (middleaddCoinBODY[item]) {
      addCoinbodyArr.push(middleaddCoinBODY[item]);
    }
  });
  Object.keys(middleaddCoin2BODY).forEach((item) => {
    if (middleaddCoin2BODY[item]) {
      addCoin2bodyArr.push(middleaddCoin2BODY[item]);
    }
  });
  Object.keys(middlereportAssBODY).forEach((item) => {
    if (middlereportAssBODY[item]) {
      reportAssbodyArr.push(middlereportAssBODY[item]);
    }
  });
  Object.keys(middlereportAssHEADER).forEach((item) => {
    if (middlereportAssHEADER[item]) {
      reportAssheaderArr.push(middlereportAssHEADER[item]);
    }
  });
  Object.keys(middlecointowalletBODY).forEach((item) => {
    if (middlecointowalletBODY[item]) {
      cointowalletbodyArr.push(middlecointowalletBODY[item]);
    }
  });
} else {	
  GetUserInfourlArr.push($.getdata("GetUserInfourl"));	
  GetUserInfoheaderArr.push($.getdata("GetUserInfoheader"));  
  coinbodyArr.push($.getdata("coinbody"));
  accountManageheaderArr.push($.getdata("accountManageheader"));  
  taskbodyArr.push($.getdata("taskbody"));
  activitybodyArr.push($.getdata("activitybody"));
  addCoinbodyArr.push($.getdata("addCoinbody"));
  addCoin2bodyArr.push($.getdata("addCoin2body"));    
  reportAssbodyArr.push($.getdata("reportAssbody")); 
  reportAssheaderArr.push($.getdata("reportAssheader"));  
  cointowalletbodyArr.push($.getdata("cointowalletbody"));
  // 根据boxjs中设置的额外账号数，添加存在的账号数据进行任务处理
  let qczjCount = ($.getval('qczjCount') || '1') - 0;
  for (let i = 2; i <= qczjCount; i++) {
    if ($.getdata(`GetUserInfourl${i}`)) {	
  GetUserInfourlArr.push($.getdata("GetUserInfourl${i}"));	
  GetUserInfoheaderArr.push($.getdata("GetUserInfoheader${i}"));  
  coinbodyArr.push($.getdata("coinbody${i}"));
  accountManageheaderArr.push($.getdata("accountManageheader${i}")); 
  taskbodyArr.push($.getdata("taskbody${i}"));
  activitybodyArr.push($.getdata("activitybody${i}"));
  addCoinbodyArr.push($.getdata("addCoinbody${i}"));
  addCoin2bodyArr.push($.getdata("addCoin2body${i}"));    
  reportAssbodyArr.push($.getdata("reportAssbody${i}")); 
  reportAssheaderArr.push($.getdata("reportAssheader${i}"));  
  cointowalletbodyArr.push($.getdata("cointowalletbody${i}"));
    }
  }
}
//CK
if (isGetCookie = typeof $request !== 'undefined') {
   GetCookie();
   $.done()
} 

function GetCookie() {
//用户名
if ($request && $request.url.indexOf("GetUserInfo.ashx") >= 0) {
    const GetUserInfourlVal = $request.url;
    if (GetUserInfourlVal) $.setdata(GetUserInfourlVal, "GetUserInfourl" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取用户名url✅: 成功,GetUserInfourlVal: ${GetUserInfourlVal}`
    );
    $.msg($.name + $.idx, `获取用户名url: 成功🎉`, ``);		
    const GetUserInfoheaderVal = JSON.stringify($request.headers);
    if (GetUserInfoheaderVal) $.setdata(GetUserInfoheaderVal, "GetUserInfoheader" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取用户名header✅: 成功,GetUserInfoheaderVal: ${GetUserInfoheaderVal}`
    );
    $.msg($.name + $.idx, `获取用户名header: 成功🎉`, ``);
    } 
//账户信息
if ($request && $request.url.indexOf("init") >= 0&& $request.url.indexOf("coin") >= 0&&$request.body.indexOf("pm=1")>=0) {
    const coinbodyVal = $request.body;
    if (coinbodyVal) $.setdata(coinbodyVal, "coinbody" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取账户信息body✅: 成功,coinbodyVal: ${coinbodyVal}`
    );
    $.msg($.name + $.idx, `获取账户信息body: 成功🎉`, ``);
    } 
//钱包余额
if ($request && $request.url.indexOf("accountManage") >= 0) {
    const accountManageheaderVal = JSON.stringify($request.headers);
    if (accountManageheaderVal) $.setdata(accountManageheaderVal, "accountManageheader" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取钱包余额header✅: 成功,accountManageheaderVal: ${accountManageheaderVal}`
    );
    $.msg($.name + $.idx, `获取钱包余额header: 成功🎉`, ``);
    } 
//签到任务
if ($request && $request.url.indexOf("init") >= 0&& $request.url.indexOf("task") >= 0&&$request.body.indexOf("model=1")>=0) {
    const taskbodyVal = $request.body;
    if (taskbodyVal) $.setdata(taskbodyVal, "taskbody" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取签到任务body✅: 成功,taskbodyVal: ${taskbodyVal}`
    );
    $.msg($.name + $.idx, `获取签到任务body: 成功🎉`, ``);
    } 
//活动
if ($request && $request.url.indexOf("activity") >= 0&&$request.body.indexOf("pm=1")>=0)  {
    const activitybodyVal = $request.body;
    if (activitybodyVal) $.setdata(activitybodyVal, "activitybody" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取活动body✅: 成功,activitybodyVal: ${activitybodyVal}`
    );
    $.msg($.name + $.idx, `获取活动body: 成功🎉`, ``);
    } 
//时段任务
 if ($request &&$request.body.indexOf("moreflag=0")>=0 ){
    const addCoinbodyVal = $request.body;
    if (addCoinbodyVal) $.setdata(addCoinbodyVal, "addCoinbody" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取时段任务body✅: 成功,addCoinbodyVal: ${addCoinbodyVal}`
    );
    $.msg($.name + $.idx, `获取时段任务body: 成功🎉`, ``);
    } 
//时段翻倍
 if ($request &&$request.body.indexOf("moreflag=1")>=0 ){
    const addCoin2bodyVal = $request.body;
    if (addCoin2bodyVal) $.setdata(addCoin2bodyVal, "addCoin2body" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取时段翻倍body✅: 成功,addCoin2bodyVal: ${addCoin2bodyVal}`
    );
    $.msg($.name + $.idx, `获取时段翻倍body: 成功🎉`, ``);
    } 
//助力任务
if ($request && $request.url.indexOf("reportAss") >= 0) {
    const reportAssheaderVal = JSON.stringify($request.headers);
    if (reportAssheaderVal) $.setdata(reportAssheaderVal, "reportAssheader" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取助力任务header✅: 成功,reportAssheaderVal: ${reportAssheaderVal}`
    );
    $.msg($.name + $.idx, `获取助力任务header: 成功🎉`, ``);
	
if ($request &&$request.body.indexOf("_appid=car")>=0 ){	
    const reportAssbodyVal = $request.body;
    if (reportAssbodyVal) $.setdata(reportAssbodyVal, "reportAssbody" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取助力任务body✅: 成功,reportAssbodyVal: ${reportAssbodyVal}`
    );
    $.msg($.name + $.idx, `获取助力任务body: 成功🎉`, ``);
	}
    } 
//提现
if ($request && $request.url.indexOf("cointowallet") >= 0&&$request.body.indexOf("pm=1")>=0) {
    const cointowalletbodyVal = $request.body;
    if (cointowalletbodyVal) $.setdata(cointowalletbodyVal, "cointowalletbody" + $.idx);
    $.log(
      `[${$.name + $.idx}] 获取提现body✅: 成功,cointowalletbodyVal: ${cointowalletbodyVal}`
    );
    $.msg($.name + $.idx, `获取提现body: 成功🎉`, ``);
    } 
}

!(async () => {	
  if (!GetUserInfourlArr[0]) {
    $.msg($.name, '提示：⚠️请点击前往获取cookie\n', 'http://athm.cn/rUcSMrc', {"open-url": "http://athm.cn/rUcSMrc"});
    return;
  }
  console.log(
    `============ 共${GetUserInfourlArr.length}个${$.name}账号  =============\n`
  );
  console.log(`==================脚本执行- 北京时间(UTC+8)：${new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000).toLocaleString()}=====================\n`)
  
  for (let i = 0; i < GetUserInfourlArr.length; i++) {
    if (GetUserInfoheaderArr[i]) {
      GetUserInfourlVal = GetUserInfourlArr[i];		
      GetUserInfoheaderVal = GetUserInfoheaderArr[i];  
      coinbodyVal = coinbodyArr[i];
      accountManageheaderVal = accountManageheaderArr[i];
      taskbodyVal = taskbodyArr[i];	  
      activitybodyVal = activitybodyArr[i];	  
      addCoinbodyVal = addCoinbodyArr[i];	  	  
      addCoin2bodyVal = addCoin2bodyArr[i];	  	  
      reportAssheaderVal = reportAssheaderArr[i];
      reportAssbodyVal = reportAssbodyArr[i];	  
      cointowalletbodyVal = cointowalletbodyArr[i];	  
      $.index = i + 1;
      console.log(`-------------------------\n\n开始【${$.name+$.index}】`) 
      await GetUserInfo();     
      await coin();
      await accountManage();
      await task();
      await activity();
      await addCoin();
      await addCoin2();
      await reportAss();
      //await cointowallet();
      await msgShow();
    }	  
  }
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })


//用户名
function GetUserInfo(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
      let url = {
        url: GetUserInfourlVal,
        headers: JSON.parse(GetUserInfoheaderVal),		
      }
      $.get(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${$.name}, 用户名🚩: ${data}`);
          $.GetUserInfo = JSON.parse(data);
$.message += `\n========== 【${$.GetUserInfo.result.name}】 ==========\n`;
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}
//账户信息  
function coin(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
      let url = {
        url:`https://mobile.app.autohome.com.cn/speedgrow_v1.0.0/taskcenter/init/coin`,
        headers: JSON.parse(GetUserInfoheaderVal),
		body: coinbodyVal,
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${$.name}, 账户信息🚩: ${data}`);
          $.coin = JSON.parse(data);
 $.message +='【账户信息】：今日金币'+$.coin.result.nowcoin+',账户余额'+$.coin.result.nowmoney+'元'+'\n';
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}
//钱包余额
function accountManage(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
      let url = {
        url: `https://pay.autohome.com.cn/site-wap/pay/my/accountManage.htm`,
        headers: JSON.parse(accountManageheaderVal),
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${$.name}, 钱包余额🚩: ${data}`);
          $.accountManage = JSON.parse(data);
if($.accountManage.success==true)
$.message +='【钱包余额】：'+$.accountManage.obj.availableBalance+'\n'; 
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}
//签到任务
function task(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
      let url = {
        url: `https://mobile.app.autohome.com.cn/speedgrow_v1.0.0/taskcenter/init/task`,
        headers: JSON.parse(GetUserInfoheaderVal),
        body: taskbodyVal,
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${$.name}, 签到任务🚩: ${data}`);
          $.task = JSON.parse(data);
let taskinfo=$.task.result.list[1].tasklist
  $.message += '【'+taskinfo[taskinfo.length-1].title+'】：奖励'+taskinfo[taskinfo.length-1].tiptxt+'，进度'+taskinfo[taskinfo.length-1].step+'\n';

        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}
//活动
function activity(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
      let url = {
        url:`https://mobile.app.autohome.com.cn/speedgrow_v1.0.0/taskcenter/init/activity`,
        headers: JSON.parse(GetUserInfoheaderVal),
		body: activitybodyVal,
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${$.name}, 活动🚩: ${data}`);
          $.activity = JSON.parse(data);
let activitydex=$.activity.result.list
  let activityxyz=activitydex[1].data.activitycard.headdata
  let activityabc=activitydex[1].data.activitycard.currenttask
  let activitydef=activitydex[1].data.activitycard.activityinfo
  $.message +='【'+$.activity.result.title+'】：已连续签到'+activitydex[0].data.signdaycount+'天，今日签到奖励'+activitydex[0].data.signlist[activitydex[0].data.signdaycount-1].prize+'金币'+'\n'+'【现金福利】：'+activityxyz.title+','+activityxyz.detaillist[0].rewardname+activityxyz.detaillist[0].rewardamount+','+activityxyz.detaillist[0].rewarddate+'\n'+'【'+activityabc.title+'】：'+activityabc.tasktarget+'\n'+'【任务进度】：'+activitydef.now+'/'+activitydef.total+'\n'+'【任务奖池】：'+activityxyz.incomedesc+'元\n'
  
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}
//时段任务
function addCoin(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{	 		
      let url = {
        url: `http://mobile.app.autohome.com.cn/fasthome/mainpagecoin/addCoin`,
        headers: JSON.parse(GetUserInfoheaderVal),
		body: addCoinbodyVal,
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${$.name}, 时段任务🚩: ${data}`);
          $.addCoin = JSON.parse(data);
if($.addCoin.returncode==0)
      $.message +='【时段奖励】：'+$.addCoin.result.getcoinnum+'金币\n';
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}
//时段翻倍
function addCoin2(timeout = 1000) {
  return new Promise((resolve) => {
    setTimeout( ()=>{	 	  
      let url = {
        url: `http://mobile.app.autohome.com.cn/fasthome/mainpagecoin/addCoin`,
        headers: JSON.parse(GetUserInfoheaderVal),
		body: addCoin2bodyVal,
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${$.name}, 时段翻倍🚩: ${data}`);
          $.addCoin2 = JSON.parse(data);
if($.addCoin.returncode==0)
       $.message +='【时段翻倍】：'+$.addCoin2.result.getcoinnum+'金币\n';
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}
//助力任务
function reportAss(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
		do out = Math.floor(Math.random()*10000000);
        while( out < 100 )		
	   for(var i=0;i<1;i++){
		 setTimeout( ()=>{	  
	  let body = reportAssbodyVal.replace(/userAssistanceId=[0-9]{0,10}/, `userAssistanceId=${out}`)
      let url = {
        url:`https://openapi.autohome.com.cn/autohome/uc-news-quickappservice/msapi/dealers/reportAss`,
        headers: JSON.parse(reportAssheaderVal),
		body: body,
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${$.name}, 助力任务🚩: ${data}`);
          $.reportAss = JSON.parse(data);
if($.reportAss.data==0)
  $.message +='【助力任务】：助力成功\n';  
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
	  },1000)
	 }
    },timeout)
  })
}
//提现
function cointowallet(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
	  let body = cointowalletbodyVal.replace(/coin_amount=[0-9]{0,6}/, `coin_amount=${cointowalletid*10000}`)
      let url = {
        url: `https://mobile.app.autohome.com.cn/fasthome/coin/cointowallet`,
        headers: JSON.parse(GetUserInfoheaderVal),
		body: body,
      }
      $.post(url, async(err, resp, data) => {
        try {
          if (logs) $.log(`${$.name}, 提现🚩: ${data}`);
          $.cointowallet = JSON.parse(data);
if($.cointowallet.returncode==0)
  $.message +='【提现'+cointowalletid+'元】：成功\n';  
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}

//通知
function msgShow() {
 
if (notifyInterval == 1) 
  $.msg($.name, '', $.message);
}

// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

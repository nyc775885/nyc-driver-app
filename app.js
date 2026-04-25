var _jsxFileName = "";
var _jsxFileName = "";var useState = React.useState; var useEffect = React.useEffect;
var CATS_ZH={fuel:{label:"燃油费",icon:"⛽",g:"车辆"},charging:{label:"充电费",icon:"⚡",g:"车辆"},toll:{label:"过桥费(月结)",icon:"🌉",g:"车辆",mo:true},congestion:{label:"拥堵费(月结)",icon:"🏙",g:"车辆",mo:true},parking:{label:"停车费",icon:"🅿",g:"车辆"},ticket:{label:"停车罚款",icon:"🎫",g:"车辆"},carwash:{label:"洗车费",icon:"🚿",g:"车辆"},oil:{label:"换机油",icon:"🛢",g:"车辆"},tires:{label:"轮胎",icon:"🔄",g:"车辆"},brakes:{label:"刹车",icon:"🔩",g:"车辆"},battery:{label:"电池",icon:"🔋",g:"车辆"},ac:{label:"冷暖气",icon:"❄",g:"车辆"},wipers:{label:"雨刮片",icon:"🌂",g:"车辆"},washer:{label:"玻璃水",icon:"💧",g:"车辆"},maint:{label:"定期保养",icon:"🔧",g:"车辆"},repair:{label:"意外维修",icon:"🛠",g:"车辆"},insurance:{label:"TLC商业保险",icon:"🛡",g:"车辆"},carloan:{label:"车贷月付",icon:"🏷",g:"车辆"},rentalcar:{label:"周租车费",icon:"🔑",g:"车辆"},tlc:{label:"TLC驾照费",icon:"📋",g:"牌照"},fhv:{label:"FHV车辆执照费",icon:"🚗",g:"牌照"},dmv:{label:"DMV驾照",icon:"📝",g:"牌照"},drug:{label:"验毒检查($32)",icon:"🧪",g:"牌照"},finger:{label:"指纹背景调查($90)",icon:"👆",g:"牌照"},ddcourse:{label:"TLC 24小时培训",icon:"📚",g:"牌照"},defensive:{label:"DDC防御驾驶课程",icon:"🎓",g:"牌照"},wav:{label:"WAV轮椅车辆培训",icon:"♿",g:"牌照"},medical:{label:"体检费用",icon:"🩺",g:"牌照"},background:{label:"其他背景调查费",icon:"🔎",g:"牌照"},platform:{label:"平台费(月结)",icon:"📱",g:"平台",mo:true},blackcar:{label:"Black Car Fund(月结)",icon:"🖤",g:"平台",mo:true},uberpro:{label:"Uber Pro",icon:"⭐",g:"平台"},phonebill:{label:"手机费",icon:"📶",g:"平台"},coffee:{label:"咖啡",icon:"☕",g:"其他"},tax:{label:"季度预缴税",icon:"🧾",g:"其他"},accountant:{label:"会计费用",icon:"🧮",g:"其他"},health:{label:"健康保险",icon:"🏥",g:"其他"},meals:{label:"工作餐饮",icon:"🍱",g:"其他"},other:{label:"其他支出",icon:"💼",g:"其他"}};
var CATS_EN={fuel:{label:"Gas",icon:"⛽",g:"车辆"},charging:{label:"Charging",icon:"⚡",g:"车辆"},toll:{label:"Toll(mo)",icon:"🌉",g:"车辆",mo:true},congestion:{label:"Congestion(mo)",icon:"🏙",g:"车辆",mo:true},parking:{label:"Parking",icon:"🅿",g:"车辆"},ticket:{label:"Parking Fine",icon:"🎫",g:"车辆"},carwash:{label:"Car Wash",icon:"🚿",g:"车辆"},oil:{label:"Oil Change",icon:"🛢",g:"车辆"},tires:{label:"Tires",icon:"🔄",g:"车辆"},brakes:{label:"Brakes",icon:"🔩",g:"车辆"},battery:{label:"Battery",icon:"🔋",g:"车辆"},ac:{label:"A/C",icon:"❄",g:"车辆"},wipers:{label:"Wipers",icon:"🌂",g:"车辆"},washer:{label:"Washer Fluid",icon:"💧",g:"车辆"},maint:{label:"Maintenance",icon:"🔧",g:"车辆"},repair:{label:"Repair",icon:"🛠",g:"车辆"},insurance:{label:"TLC Insurance",icon:"🛡",g:"车辆"},carloan:{label:"Car Loan",icon:"🏷",g:"车辆"},rentalcar:{label:"Weekly Rental",icon:"🔑",g:"车辆"},tlc:{label:"TLC License",icon:"📋",g:"牌照"},fhv:{label:"FHV License",icon:"🚗",g:"牌照"},dmv:{label:"DMV License",icon:"📝",g:"牌照"},drug:{label:"Drug Test($32)",icon:"🧪",g:"牌照"},finger:{label:"Fingerprint($90)",icon:"👆",g:"牌照"},ddcourse:{label:"TLC Training",icon:"📚",g:"牌照"},defensive:{label:"DDC Course",icon:"🎓",g:"牌照"},wav:{label:"WAV Training",icon:"♿",g:"牌照"},medical:{label:"Medical Exam",icon:"🩺",g:"牌照"},background:{label:"Background Check",icon:"🔎",g:"牌照"},platform:{label:"Platform Fee(mo)",icon:"📱",g:"平台",mo:true},blackcar:{label:"Black Car Fund(mo)",icon:"🖤",g:"平台",mo:true},uberpro:{label:"Uber Pro",icon:"⭐",g:"平台"},phonebill:{label:"Phone Bill",icon:"📶",g:"平台"},coffee:{label:"Coffee",icon:"☕",g:"其他"},tax:{label:"Quarterly Tax",icon:"🧾",g:"其他"},accountant:{label:"Accountant",icon:"🧮",g:"其他"},health:{label:"Health Insurance",icon:"🏥",g:"其他"},meals:{label:"Meals",icon:"🍱",g:"其他"},other:{label:"Other",icon:"💼",g:"其他"}};
var PLATS=["Uber","Lyft","Via","Uber Black","Lyft Lux","其他"];
var GROUPS=["车辆","牌照","平台","其他","自定义"];
var TABS=["仪表盘","收入","支出","报告"];
var LICTYPES=["TLC 驾驶执照(2年·$252)","TLC 车辆执照FHV(1年)","DMV 驾驶执照","商业保险单","车辆注册","车辆年检(每4个月)","验毒证明($32)","指纹背景调查($90)","TLC 24小时培训课程","DDC防御驾驶课程(每3年)","WAV轮椅车辆培训","体检证明","FS-6T保险申报表","其他证件"];
var CARBRANDS=["Acura","Audi","BMW","Buick","Cadillac","Chevrolet","Chrysler","Dodge","Ford","Genesis","GMC","Honda","Hyundai","Infiniti","Jaguar","Jeep","Kia","Land Rover","Lexus","Lincoln","Mazda","Mercedes-Benz","Mitsubishi","Nissan","Polestar","Porsche","Ram","Rivian","Subaru","Tesla","Toyota","Volkswagen","Volvo","Other"];
var ICONS=["💼","🚗","⛽","💰","🔧","📱","🏠","🍔","☕","💊","🔑","💡","🎓","🏥","🛒","⚙","🔄","🛠","🛡","🏷","📶","⭐","🧾","🧮"];
var FIXSUGG_ZH=[{label:"车贷月付",icon:"🏷",cat:"carloan",day:1},{label:"TLC保险",icon:"🛡",cat:"insurance",day:1},{label:"手机费",icon:"📶",cat:"phonebill",day:15},{label:"健康保险",icon:"🏥",cat:"health",day:1},{label:"Uber Pro",icon:"⭐",cat:"uberpro",day:1}];
var FIXSUGG_EN=[{label:"Car Loan",icon:"🏷",cat:"carloan",day:1},{label:"TLC Insurance",icon:"🛡",cat:"insurance",day:1},{label:"Phone Bill",icon:"📶",cat:"phonebill",day:15},{label:"Health Insurance",icon:"🏥",cat:"health",day:1},{label:"Uber Pro",icon:"⭐",cat:"uberpro",day:1}];
var IS={background:"#080E1C",border:"1px solid #243550",color:"#E8EAF0",borderRadius:10,padding:"12px 14px",fontSize:15,outline:"none",width:"100%",boxSizing:"border-box",transition:"border-color 0.2s"};
var LINKS=[
  {title:"TLC 官方",color:"#00D4FF",links:[{label:"TLC 官网",desc:"执照申请、更新、罚单",url:"https://www.nyc.gov/site/tlc"},{label:"LARS 系统",desc:"在线缴费、更新执照",url:"https://apps.nyc.gov/lars"},{label:"TLC UP 文件上传",desc:"上传证件文件",url:"https://tlcup.nyc.gov"}]},
  {title:"背景调查 & 指纹",color:"#FFD700",links:[{label:"指纹预约 IdentoGO",desc:"背景调查指纹预约（代码 15425Y）",url:"https://uenroll.identogo.com"},{label:"OCA 法院记录查询",desc:"纽约法院案件记录",url:"https://iapps.courts.state.ny.us/webcivil/ecourtsMain"}]},
  {title:"DDC 防御驾驶课程",color:"#00E676",links:[{label:"NSC 全国安全委员会",desc:"NSC DDC 认证课程",url:"https://www.nsc.org/road-safety"},{label:"I Drive Safely",desc:"在线DDC课程（TLC认证）",url:"https://www.idrivesafely.com"},{label:"DriversEd.com",desc:"在线防御驾驶课程",url:"https://www.driversed.com/defensive-driving/"}]},
  {title:"纽约 311",color:"#00E676",links:[{label:"311 网页版",desc:"投诉、举报、城市服务请求",url:"https://portal.311.nyc.gov"},{label:"311 地图查询",desc:"查看附近的服务请求",url:"https://maps.nyc.gov/311"}]},
  {title:"平台司机中心",color:"#AB47BC",links:[{label:"Uber 司机中心",desc:"Uber 账单、文件、支持",url:"https://drivers.uber.com"},{label:"Lyft 司机中心",desc:"Lyft 账单、文件、支持",url:"https://www.lyft.com/driver"},{label:"Via 司机",desc:"Via 司机登录",url:"https://drivers.ridewithvia.com"}]},
  {title:"TLC 公开数据",color:"#FF9A65",links:[{label:"TLC 行程记录数据",desc:"每月更新的历史行程数据",url:"https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page"},{label:"TLC 统计报告",desc:"行业报告、年度数据",url:"https://www.nyc.gov/site/tlc/about/data.page"},{label:"NYC Open Data",desc:"纽约市全部公开数据集",url:"https://opendata.cityofnewyork.us"}]},
  {title:"其他实用网站",color:"#B0D4E8",links:[{label:"DMV 纽约州驾照",desc:"驾照更新、地址变更",url:"https://dmv.ny.gov"},{label:"IRS 自雇税指南",desc:"自雇人员税务信息",url:"https://www.irs.gov/businesses/small-businesses-self-employed/self-employed-individuals-tax-center"}]},
];
function p2(n){return n<10?"0"+n:""+n;}
function today(){var d=new Date();return d.getFullYear()+"-"+p2(d.getMonth()+1)+"-"+p2(d.getDate());}function fmtDate(s){if(!s)return "";var a=s.split("-");if(a.length===3&&a[0].length===4)return a[1]+"-"+a[2]+"-"+a[0];return s;}
function nowTime(){var d=new Date();return p2(d.getHours())+":"+p2(d.getMinutes());}
function curMo(){var d=new Date();return d.getFullYear()+"-"+p2(d.getMonth()+1);}
function curYr(){return ""+new Date().getFullYear();}
function fmt(n){return "$"+Number(n||0).toFixed(2);}
function prevMo(mo){var a=mo.split("-"),y=+a[0],m=+a[1]-1;if(m<1){m=12;y--;}return y+"-"+p2(m);}
function nextMo(mo){var a=mo.split("-"),y=+a[0],m=+a[1]+1;if(m>12){m=1;y++;}return y+"-"+p2(m);}
function getIcon(k,aC){var c=aC[k];return c?c.icon||"💼":"💼";}
function catGrp(k,aC){var c=aC[k];return c?(c.g||c.group||"其他"):"其他";}
function wkMon(dt){var a=dt.split("-"),d=new Date(+a[0],+a[1]-1,+a[2]),dy=d.getDay();d.setDate(d.getDate()+(dy===0?-6:1-dy));return d.getFullYear()+"-"+p2(d.getMonth()+1)+"-"+p2(d.getDate());}
function wkEnd(s){var a=s.split("-"),d=new Date(+a[0],+a[1]-1,+a[2]);d.setDate(d.getDate()+6);return d.getFullYear()+"-"+p2(d.getMonth()+1)+"-"+p2(d.getDate());}
function wkLabel(s){var e=wkEnd(s);return s.slice(5).replace("-","/")+"-"+e.slice(5).replace("-","/")}
function moOverlap(ws,mo){var wp=ws.split("-"),ep=wkEnd(ws).split("-"),mp=mo.split("-");var w0=new Date(+wp[0],+wp[1]-1,+wp[2]),w1=new Date(+ep[0],+ep[1]-1,+ep[2]),m0=new Date(+mp[0],+mp[1]-1,1),m1=new Date(+mp[0],+mp[1],0);return w1>=m0&&w0<=m1;}
function genFixed(fl,month){var now=new Date(),curMonth=now.getFullYear()+"-"+p2(now.getMonth()+1),today=now.getDate();return fl.filter(function(f){if(!f.active||!f.amount)return false;if(month>curMonth)return false;if(f.startDate&&month<f.startDate.slice(0,7))return false;if(f.endDate&&month>f.endDate.slice(0,7))return false;if(month===curMonth&&today<(+f.day||1))return false;return true;}).map(function(f){var amt=f.cycle==="annual"?Math.round(+f.amount/12*100)/100:+f.amount;return {id:"fx_"+f.id+"_"+month,date:month+"-"+p2(+f.day||1),category:f.cat||"other",amount:amt,notes:f.notes||"",isFixed:true,fixedLabel:f.label,fixedIcon:f.icon};});}
function Btn(p){return React.createElement('button', { onClick: p.onClick, style: Object.assign({background:"linear-gradient(135deg,#00D4FF,#0055FF)",border:"none",borderRadius:10,padding:"10px 18px",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"},p.style||{})}, p.children);}
function Card(p){return React.createElement('div', { className: "nyc-card", style: Object.assign({background:"#0F1829",borderRadius:12,padding:"14px 16px",marginBottom:10,border:"1px solid #243550"},p.style||{})}, p.children);}
function Empty(p){return React.createElement('div', { style: {textAlign:"center",padding:"36px 20px",color:"#90B4D0"}}, React.createElement('div', { style: {fontSize:36,marginBottom:10}}, "📊"), React.createElement('div', { style: {fontSize:14,lineHeight:2}}, p.text));}
function Row(p){var fw=p.bold?800:600;var cl=p.color||"#E8EAF0";return React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #0F1C30"}}, React.createElement('span', { style: {fontSize:14,color:"#C8E8F8"}}, p.label), React.createElement('span', { style: Object.assign({fontSize:15},{fontWeight:fw,color:cl})}, p.value));}
function Stat(p){var pad=p.sm?"8px 6px":"12px 10px";var fs1=p.sm?11:12;var fs2=p.sm?13:16;var cl=p.color||"#E8EAF0";return React.createElement('div', { style: {background:"#0F1829",borderRadius:10,padding:pad,border:"1px solid #243550",textAlign:"center"}}, React.createElement('div', { style: Object.assign({color:"#90B8D0",marginBottom:3},{fontSize:fs1})}, p.label), React.createElement('div', { style: Object.assign({fontWeight:700},{fontSize:fs2,color:cl})}, p.value));}
function ABox(p){return React.createElement('div', { style: {margin:"8px 14px 0",background:p.bg,border:"1px solid "+p.color,borderRadius:10,padding:"10px 14px",fontSize:14,color:p.color,display:"flex",gap:8,alignItems:"center"}}, React.createElement('span', { style: {fontSize:18}}, p.icon), React.createElement('span', {__source: {fileName: _jsxFileName, lineNumber: 42}}, p.text));}
function Field(p){var el=p.options?React.createElement('select', { value: p.value, onChange: function(e){p.onChange(e.target.value);}, style: IS}, p.options.map(function(o){return React.createElement('option', { key: o[0], value: o[0]}, o[1]);})):React.createElement('input', { type: p.type||"text", value: p.value, onChange: function(e){p.onChange(e.target.value);}, placeholder: p.placeholder||"", style: IS} );return React.createElement('label', { style: {display:"flex",flexDirection:"column",gap:6,fontSize:14,color:"#C8E8F8",fontWeight:500}}, p.label, el);}
function Modal(p){return React.createElement('div', { style: {position:"fixed",inset:0,background:"rgba(4,8,20,0.95)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:200}}, React.createElement('div', { style: {background:"#0D1828",borderRadius:"20px 20px 0 0",padding:"0 0 52px",width:"100%",maxWidth:600,border:"1px solid #243550",borderBottom:"none",maxHeight:"90vh",overflowY:"auto",boxShadow:"0 -8px 40px rgba(0,0,0,0.5)"}}, React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 18px",borderBottom:"1px solid #1A2A44",position:"sticky",top:0,background:"#0D1828",zIndex:10}}, React.createElement('button', { onClick: p.onClose, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}, "✕"), React.createElement('div', { style: {fontSize:16,fontWeight:800}}, p.title), React.createElement('button', { onClick: p.onSave, style: {background:"linear-gradient(135deg,#00CFFF,#0044EE)",border:"none",color:"#fff",fontSize:20,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 10px rgba(0,207,255,0.3)"}}, "✓")), React.createElement('div', { style: {padding:"18px 18px 0",display:"flex",flexDirection:"column",gap:14}}, p.children)));}
var MONTHS=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function MoNav(p){var isEn=p.lang==="en";var moDisp=isEn?MONTHS[+p.val.slice(5)-1]+" "+p.val.slice(0,4):p.val.slice(0,4)+"年 "+p.val.slice(5)+"月";return React.createElement('div', { style: {display:"flex",alignItems:"center",gap:8,marginBottom:p.mb||12}}, React.createElement('button', { onClick: function(){p.set(prevMo(p.val));}, style: {background:"#0F1829",border:"1px solid #243550",borderRadius:8,padding:"9px 14px",color:"#D8EEFF",fontSize:17,cursor:"pointer"}}, "<"), React.createElement('div', { style: {flex:1,textAlign:"center",fontSize:17,fontWeight:800}}, moDisp), React.createElement('button', { onClick: function(){p.set(nextMo(p.val));}, style: {background:"#0F1829",border:"1px solid #243550",borderRadius:8,padding:"9px 14px",color:"#D8EEFF",fontSize:17,cursor:"pointer"}}, ">"), p.children);}
function YrNav(p){var yrDisp=p.lang==="en"?p.val:p.val+" 年";return React.createElement('div', { style: {display:"flex",alignItems:"center",gap:10,marginBottom:14}}, React.createElement('button', { onClick: function(){p.set(String(+p.val-1));}, style: {background:"#0F1829",border:"1px solid #243550",borderRadius:8,padding:"9px 14px",color:"#D8EEFF",fontSize:17,cursor:"pointer"}}, "<"), React.createElement('div', { style: {flex:1,textAlign:"center",fontSize:19,fontWeight:800}}, yrDisp), React.createElement('button', { onClick: function(){p.set(String(+p.val+1));}, style: {background:"#0F1829",border:"1px solid #243550",borderRadius:8,padding:"9px 14px",color:"#D8EEFF",fontSize:17,cursor:"pointer"}}, ">"));}
function SegBtn(p){return React.createElement('div', { style: {display:"flex",background:"#080C18",borderRadius:12,padding:3,gap:2,marginBottom:p.mb||14,border:"1px solid #151F35"}}, p.opts.map(function(o,i){var active=p.val===o[0];var bg=active?"#1A3060":"transparent";var cl=active?"#00D4FF":"#C8E8F8";var fw=active?700:400;return React.createElement('button', { key: i, onClick: function(){p.set(o[0]);}, style: {flex:1,padding:10,borderRadius:9,border:"none",background:bg,color:cl,fontSize:13,fontWeight:fw,cursor:"pointer"}}, o[1]);}));}
function ExpItem(p){var item=p.item,aC=p.allC,cat=aC[item.category]||{label:"其他"},icon=item.isFixed?item.fixedIcon:getIcon(item.category,aC),label=item.isFixed?item.fixedLabel:cat.label,isMo=cat.mo,dateStr=isMo?"月结 "+(item.statementMonth||item.date.slice(0,7)):(item.time?fmtDate(item.date)+" "+item.time:fmtDate(item.date));return React.createElement(Card, {__source: {fileName: _jsxFileName, lineNumber: 48}}, React.createElement('div', { style: {display:"flex",gap:10,alignItems:"flex-start"}}, React.createElement('span', { style: {fontSize:22,marginTop:2}}, icon), React.createElement('div', { style: {flex:1,minWidth:0}}, React.createElement('div', { style: {fontSize:15,fontWeight:600,marginBottom:2}}, label), React.createElement('div', { style: {fontSize:13,color:"#B8D8EC"}}, dateStr), item.notes?React.createElement('div', { style: {fontSize:13,color:"#B0D4E4"}}, item.notes):null, item.isFixed?React.createElement('span', { style: {fontSize:12,background:"#0D2010",borderRadius:6,padding:"2px 8px",color:"#5ADA7A",display:"inline-block",marginTop:4}}, "固定"):null), React.createElement('div', { style: {textAlign:"right"}}, React.createElement('div', { style: {fontSize:15,fontWeight:700,color:"#FF6B35"}}, "-", fmt(item.amount)), !item.isFixed?React.createElement('div', { style: {display:"flex",gap:6,marginTop:3}}, React.createElement('button', { onClick: p.onEdit, style: {background:"none",border:"none",color:"#6AACEE",cursor:"pointer",fontSize:13}}, "编辑"), React.createElement('button', { onClick: p.onDel, style: {background:"none",border:"none",color:"#FF3D00",cursor:"pointer",fontSize:13}}, "删除")):React.createElement('div', { style: {display:"flex",gap:6,marginTop:3}}, React.createElement('button', { onClick: p.onEdit, style: {background:"none",border:"none",color:"#6AACEE",cursor:"pointer",fontSize:13}}, "编辑"), React.createElement('button', { onClick: p.onDel, style: {background:"none",border:"none",color:"#FF3D00",cursor:"pointer",fontSize:13}}, "删除")))));}
function BucketList(p){var items=p.items,aC=p.allC;if(!items.length)return React.createElement(Empty, { text: p.emptyText||"暂无记录"} );var B={"车辆":{label:"🚗 车辆",color:"#00D4FF",items:[]},"牌照":{label:"📋 牌照",color:"#FFD700",items:[]},"平台":{label:"📱 平台",color:"#AB47BC",items:[]},"其他":{label:"💼 其他",color:"#C8E8F8",items:[]}};items.forEach(function(x){var g=catGrp(x.category,aC);B[g]?B[g].items.push(x):B["其他"].items.push(x);});return React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 49}}, ["车辆","牌照","平台","其他"].map(function(bk){var bkt=B[bk];if(!bkt.items.length)return null;var bT=bkt.items.reduce(function(s,e){return s+(+e.amount||0);},0);var bcl=bkt.color;return React.createElement('div', { key: bk, style: {marginBottom:18}}, React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,paddingBottom:6,borderBottom:"2px solid #182540"}}, React.createElement('span', { style: Object.assign({fontSize:15,fontWeight:700},{color:bcl})}, bkt.label), React.createElement('span', { style: {fontSize:14,fontWeight:700,color:"#FF9A65"}}, fmt(bT))), bkt.items.map(function(item){return React.createElement(ExpItem, { key: item.id, item: item, allC: aC, onDel: function(){p.setEl(p.el.filter(function(x){return x.id!==item.id;}));}, onEdit: function(){if(item.isFixed){p.onEditFixed&&p.onEditFixed(item);}else{p.onEditExp&&p.onEditExp(item);}}} );}));}));}
function CatBreakdown(p){if(!p.items.length)return null;var cm={};p.items.forEach(function(e){var k=e.isFixed?"fx_"+e.fixedLabel:e.category,cat=p.allC[e.category],lbl=e.isFixed?e.fixedLabel:(cat?cat.label:"其他"),ico=e.isFixed?e.fixedIcon:getIcon(e.category,p.allC);if(!cm[k]){cm[k]={label:lbl,icon:ico,total:0};}cm[k].total+=(+e.amount||0);});var sorted=Object.values(cm).sort(function(a,b){return b.total-a.total;}),mx=sorted[0]?sorted[0].total:1;return React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 50}}, sorted.map(function(c){var pct=Math.round(c.total/p.total*100),bw=Math.max(3,Math.round(c.total/mx*100))+"%";return React.createElement('div', { key: c.label, style: {marginBottom:12}}, React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}, React.createElement('span', { style: {fontSize:14,color:"#E8EAF0"}}, c.icon, " " , c.label), React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 50}}, React.createElement('span', { style: {fontSize:14,fontWeight:700,color:"#FF9A65"}}, fmt(c.total)), React.createElement('span', { style: {fontSize:12,color:"#B8D8EC",marginLeft:5}}, pct, "%"))), React.createElement('div', { style: {height:5,borderRadius:3,background:"#1A2A44"}}, React.createElement('div', { style: {height:5,borderRadius:3,width:bw,background:"linear-gradient(90deg,#FF6B35,#FF9A65)"}})));}));}
function CatDetail(p){var aC=p.allC,items=p.items,total=p.total;var cm={};items.forEach(function(e){var k=e.isFixed?"fx_"+e.fixedLabel:e.category,cat=aC[e.category],lbl=e.isFixed?e.fixedLabel:(cat?cat.label:"其他"),ico=e.isFixed?e.fixedIcon:getIcon(e.category,aC),grp=catGrp(e.category,aC);if(!cm[k]){cm[k]={label:lbl,icon:ico,total:0,grp:grp};}cm[k].total+=(+e.amount||0);});var sorted=Object.values(cm).sort(function(a,b){return b.total-a.total;});return React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 51}}, sorted.map(function(c){var pct=Math.round(c.total/total*100),gcl=c.grp==="车辆"?"#00D4FF":c.grp==="牌照"?"#FFD700":c.grp==="平台"?"#AB47BC":"#B0D4E8";return React.createElement('div', { key: c.label, style: {padding:"8px 0",borderBottom:"1px solid #111D30"}}, React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}, React.createElement('span', { style: {fontSize:14,color:"#D8EEFF"}}, c.icon, " " , c.label), React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 51}}, React.createElement('span', { style: {fontSize:14,fontWeight:700,color:"#FF9A65"}}, fmt(c.total)), React.createElement('span', { style: {fontSize:12,color:"#90B8D0",marginLeft:6}}, pct, "%"))), React.createElement('div', { style: {height:4,borderRadius:2,background:"#1A2A44"}}, React.createElement('div', { style: {height:4,borderRadius:2,width:pct+"%",background:gcl}})));}));}
function AnimNum(p){var r=useState(0),disp=r[0],setDisp=r[1];var target=+(p.value||0);useState(function(){var start=0,steps=20,inc=target/steps,timer=setInterval(function(){start+=inc;if(start>=target){setDisp(target);clearInterval(timer);}else{setDisp(start);}},30);return function(){clearInterval(timer);};});return React.createElement('span', {__source: {fileName: _jsxFileName, lineNumber: 52}}, p.prefix||"", p.isMoney?"$"+disp.toFixed(2):Math.round(disp)+"", p.suffix||"");}
function Badge(p){return React.createElement('div', { style: {display:"inline-flex",alignItems:"center",gap:6,background:p.bg||"#1A2A10",border:"1px solid "+(p.color||"#00E676"),borderRadius:20,padding:"6px 12px",fontSize:13,fontWeight:700,color:p.color||"#00E676"}}, React.createElement('span', { style: {fontSize:16}}, p.icon), p.text);}
function App() {
  var r0=useState(0),tab=r0[0],setTab=r0[1]; var r1=useState("month"),dashV=r1[0],setDashV=r1[1];
  var r2=useState("month"),repP=r2[0],setRepP=r2[1]; var r3=useState(curMo()),mo=r3[0],setMo=r3[1];
  var r4=useState(curYr()),yr=r4[0],setYr=r4[1]; var r5=useState("ops"),incT=r5[0],setIncT=r5[1];
  var r6=useState(null),sf=r6[0],setSf=r6[1]; var r7=useState("month"),expV=r7[0],setExpV=r7[1];
  var r8=useState(false),mExpDet=r8[0],setMExpDet=r8[1]; var r9=useState(false),yExpDet=r9[0],setYExpDet=r9[1];
  var r10=useState("车辆"),selGrp=r10[0],setSelGrp=r10[1];
  var r11=useState({type:"",brand:"",plate:"",tlcPlate:"",insComp:"",insPolicy:"",insExpiry:"",loanType:"loan",loanAmt:"",lastInsp:""});
  var veh=r11[0],setVeh=r11[1];
  var r12=useState([]),wl=r12[0],setWl=r12[1]; var r13=useState([]),sl=r13[0],setSl=r13[1];
  var r14=useState([]),el=r14[0],setEl=r14[1]; var r15=useState([]),fl=r15[0],setFl=r15[1];
  var r16=useState([]),ll=r16[0],setLl=r16[1]; var r17=useState({}),cc=r17[0],setCc=r17[1];
  var r18=useState({weekStart:wkMon(today()),platform:"Uber",trips:"",hours:"",onlineHours:"",miles:"",notes:""});
  var wf=r18[0],setWf=r18[1];
  var r19=useState({month:curMo(),platform:"Uber",grossFare:"",tips:"",bonus:"",tollReimbursed:"",otherIncome:"",trips:"",onlineHours:"",miles:"",acceptRate:"",completionRate:"",notes:""});
  var stf=r19[0],setStf=r19[1];
  var r20=useState({date:today(),time:nowTime(),category:"fuel",amount:"",notes:"",qty:"",statementMonth:curMo(),isRecurring:false});
  var ef=r20[0],setEf=r20[1];
  var r21=useState({label:"",icon:"💼",cat:"other",cycle:"monthly",amount:"",day:"1",notes:"",active:true,startDate:"",endDate:"",maxCount:""});
  var ff=r21[0],setFf=r21[1];
  var r22=useState({type:"",number:"",issueDate:"",expiryDate:"",renewalFee:"",reminderDays:"60",notes:""});
  var lf=r22[0],setLf=r22[1];
  var r23=useState({label:"",icon:"🔧",group:"车辆"});
  var cf=r23[0],setCf=r23[1];
  var r24=useState(null),reportData=r24[0],setReportData=r24[1];
  var r25=useState([]),custPlat=r25[0],setCustPlat=r25[1]; var r26=useState(""),newPlat=r26[0],setNewPlat=r26[1];
  var r27=useState(false),showBackup=r27[0],setShowBackup=r27[1]; var r28=useState(null),gUser=r28[0],setGUser=r28[1];
  var r29=useState(""),gStatus=r29[0],setGStatus=r29[1]; var r30=useState(null),openSec=r30[0],setOpenSec=r30[1];
  var r32=useState(false),showPlatMgr=r32[0],setShowPlatMgr=r32[1];
  var r34=useState([]),reminders=r34[0],setReminders=r34[1]; var r35=useState({title:"",date:"",note:"",reminderDays:"7"}),rf=r35[0],setRf=r35[1];
  var r36=useState(false),showRemMgr=r36[0],setShowRemMgr=r36[1]; var r37=useState(false),showDrawer=r37[0],setShowDrawer=r37[1];
  var r39=useState("zh"),lang=r39[0],setLang=r39[1];
  var r33=useState(PLATS.slice()),defPlat=r33[0],setDefPlat=r33[1];
  var r31=useState(null),editFx=r31[0],setEditFx=r31[1];
  var allC=Object.assign({},lang==="en"?CATS_EN:CATS_ZH,cc),allPlat=defPlat.concat(custPlat);
  var isDark=true; var C={bg:isDark?"#080C18":"#F0F4F8",bg2:isDark?"#0D1828":"#FFFFFF",bg3:isDark?"#0F1829":"#F8FAFC",border:isDark?"#243550":"#D0DCE8",text:isDark?"#F0F4FF":"#0A1628",text2:isDark?"#C8E4F8":"#2A4A6A",text3:isDark?"#90B4D0":"#5A7A9A"};
  var T=lang==="en"?{dashboard:"Dashboard",income:"Income",expense:"Expense",report:"Report",thisMonth:"This Month",thisYear:"This Year",netIncome:"Net Income",totalIncome:lang==="en"?"Total Income":"总收入",totalExpense:"Total Expense",netProfit:"Net Profit",weekly:"Weekly Ops",monthly:"Monthly Stmt",addExpense:"Add Expense",vehicle:lang==="en"?"Vehicle":"车辆",license:lang==="en"?"License":"牌照",fixedFees:"Fixed Fees",reminder:"Reminders",platform:"Platforms",backup:"Backup",menu:"Menu",edit:"Edit",del:"Delete",save:"Save",cancel:"Cancel",add:"Add"}:{dashboard:"仪表盘",income:"收入",expense:"支出",report:"报告",thisMonth:"本月",thisYear:"全年",netIncome:"本月净收入",totalIncome:"总收入",totalExpense:"总支出",netProfit:"净利润",weekly:"每周运营",monthly:"月度账单",addExpense:"记账",vehicle:"车辆信息",license:"执照 & 证件",fixedFees:"固定月费管理",reminder:"自定义提醒",platform:"平台管理",backup:"备份 & 同步",menu:"菜单",edit:"编辑",del:"删除",save:"确认保存",cancel:"取消",add:"添加"};
  var getAppData=function(){return JSON.stringify({v:1,wl:wl,sl:sl,el:el,fl:fl,ll:ll,veh:veh,cc:cc,custPlat:custPlat});};
  var loadData=function(j){try{var d=JSON.parse(j);if(d.wl)setWl(d.wl);if(d.sl)setSl(d.sl);if(d.el)setEl(d.el);if(d.fl)setFl(d.fl);if(d.ll)setLl(d.ll);if(d.veh)setVeh(d.veh);if(d.cc)setCc(d.cc);if(d.custPlat)setCustPlat(d.custPlat);return true;}catch(e){return false;}};
  var doExport=function(){var j=getAppData(),b=new Blob([j],{type:"application/json"}),u=URL.createObjectURL(b),a=document.createElement("a");a.href=u;a.download="nyc-"+today()+".json";a.click();setTimeout(function(){URL.revokeObjectURL(u);},1000);};
  var doImport=function(file){var r=new FileReader();r.onload=function(e){if(loadData(e.target.result)){setShowBackup(false);alert("恢复成功！");}else{alert("文件错误");}};r.readAsText(file);};
  var mStmts=sl.filter(function(x){return x.month===mo;});
  var mWeeks=wl.filter(function(w){return moOverlap(w.weekStart,mo);});
  var fixMo=genFixed(fl,mo);
  var feAll=el.filter(function(e){var c=allC[e.category];if(c&&c.mo)return (e.statementMonth||e.date.slice(0,7))===mo;return e.date.slice(0,7)===mo;}).concat(fixMo);
  var tInc=mStmts.reduce(function(s,x){return s+(+x.grossFare||0)+(+x.tips||0)+(+x.bonus||0)+(+x.tollReimbursed||0)+(+x.otherIncome||0);},0);
  var tGross=mStmts.reduce(function(s,x){return s+(+x.grossFare||0);},0),tTips=mStmts.reduce(function(s,x){return s+(+x.tips||0);},0);
  var tBonus=mStmts.reduce(function(s,x){return s+(+x.bonus||0);},0),tToll=mStmts.reduce(function(s,x){return s+(+x.tollReimbursed||0);},0);
  var tExp=feAll.reduce(function(s,e){return s+(+e.amount||0);},0),tFix=fixMo.reduce(function(s,e){return s+(+e.amount||0);},0),net=tInc-tExp;
  var tTrips=mWeeks.reduce(function(s,w){return s+(+w.trips||0);},0),tHours=mWeeks.reduce(function(s,w){return s+(+w.hours||0);},0);
  var tOnl=mWeeks.reduce(function(s,w){return s+(+w.onlineHours||0);},0),tMiles=mWeeks.reduce(function(s,w){return s+(+w.miles||0);},0);
  var yMons=[];for(var yi=1;yi<=12;yi++){yMons.push(yr+"-"+p2(yi));}
  var yStmts=sl.filter(function(x){return x.month.slice(0,4)===yr;});
  var yExps=el.filter(function(e){return e.date.slice(0,4)===yr;});
  var yFixT=yMons.reduce(function(s,m){return s+genFixed(fl,m).reduce(function(a,e){return a+(+e.amount||0);},0);},0);
  var yInc=yStmts.reduce(function(s,x){return s+(+x.grossFare||0)+(+x.tips||0)+(+x.bonus||0)+(+x.tollReimbursed||0)+(+x.otherIncome||0);},0);
  var yExp=yExps.reduce(function(s,e){return s+(+e.amount||0);},0)+yFixT,yNet=yInc-yExp;
  var yTrips=wl.filter(function(w){return w.weekStart.slice(0,4)===yr;}).reduce(function(s,w){return s+(+w.trips||0);},0);
  var yHours=wl.filter(function(w){return w.weekStart.slice(0,4)===yr;}).reduce(function(s,w){return s+(+w.hours||0);},0);
  var yMiles=wl.filter(function(w){return w.weekStart.slice(0,4)===yr;}).reduce(function(s,w){return s+(+w.miles||0);},0);  var yStmtTrips=yStmts.reduce(function(s,x){return s+(+x.trips||0);},0),yStmtHours=yStmts.reduce(function(s,x){return s+(+x.onlineHours||0);},0),yStmtMiles=yStmts.reduce(function(s,x){return s+(+x.miles||0);},0);
  var mData=yMons.map(function(m){var ms=sl.filter(function(x){return x.month===m;}),me=el.filter(function(e){return e.date.slice(0,7)===m;}),mf=genFixed(fl,m).reduce(function(s,e){return s+(+e.amount||0);},0),inc=ms.reduce(function(s,x){return s+(+x.grossFare||0)+(+x.tips||0)+(+x.bonus||0)+(+x.tollReimbursed||0)+(+x.otherIncome||0);},0),exp=me.reduce(function(s,e){return s+(+e.amount||0);},0)+mf;return {m:m,inc:inc,exp:exp,net:inc-exp,label:m.slice(5)+"月"};});
  var insW=null;if(veh.lastInsp){var ip=veh.lastInsp.split("-"),id2=new Date(+ip[0],+ip[1]-1,+ip[2]);id2.setMonth(id2.getMonth()+4);insW={next:id2.getFullYear()+"-"+p2(id2.getMonth()+1)+"-"+p2(id2.getDate()),diff:Math.round((id2-new Date())*0.000011574)};}
  var insExpDiff=veh.insExpiry?Math.round((new Date(veh.insExpiry)-new Date())*0.000011574):null; var expiring=ll.filter(function(l){if(!l.expiryDate)return false;var d=(new Date(l.expiryDate)-new Date())*0.000011574;var rd=+(l.reminderDays||60);return d>=0&&d<=rd;});
  var expired=ll.filter(function(l){if(!l.expiryDate)return false;return(new Date(l.expiryDate)-new Date())*0.000011574<0;}); var totalFix=fl.filter(function(f){return f.active&&f.amount;}).reduce(function(s,f){return s+(f.cycle==="annual"?Math.round(+f.amount/12*100)/100:+f.amount);},0); var bldRep=function(p){var isM=p==="month",ri=isM?tInc:yInc,rg=isM?tGross:yStmts.reduce(function(s,x){return s+(+x.grossFare||0);},0),rt=isM?tTips:yStmts.reduce(function(s,x){return s+(+x.tips||0);},0),rb=isM?tBonus:yStmts.reduce(function(s,x){return s+(+x.bonus||0);},0),rtr=isM?tToll:yStmts.reduce(function(s,x){return s+(+x.tollReimbursed||0);},0),rTot=isM?tExp:yExp,rn=ri-rTot,rT=isM?tTrips:yTrips,rH=isM?tHours:yHours,rM=isM?tMiles:yMiles;return {ri:ri,rg:rg,rt:rt,rb:rb,rtr:rtr,rTot:rTot,rn:rn,rTrips:rT,rHours:rH,rMiles:rM};};
  var yAllExps=function(){return yExps.concat(yMons.reduce(function(acc,m){return acc.concat(genFixed(fl,m));},[]));}; var hourlyRate=tHours>0?Math.round(tInc/tHours*100)/100:0,lastMo=prevMo(mo),lmStmts=sl.filter(function(x){return x.month===lastMo;}),lmWeeks=wl.filter(function(w){return moOverlap(w.weekStart,lastMo);}),lmFixMo=genFixed(fl,lastMo),lmFeAll=el.filter(function(e){var c=allC[e.category];if(c&&c.mo)return (e.statementMonth||e.date.slice(0,7))===lastMo;return e.date.slice(0,7)===lastMo;}).concat(lmFixMo),lmInc=lmStmts.reduce(function(s,x){return s+(+x.grossFare||0)+(+x.tips||0)+(+x.bonus||0)+(+x.tollReimbursed||0)+(+x.otherIncome||0);},0),lmExp=lmFeAll.reduce(function(s,e){return s+(+e.amount||0);},0),lmNet=lmInc-lmExp,lmHours=lmWeeks.reduce(function(s,w){return s+(+w.hours||0);},0),lmHourly=lmHours>0?Math.round(lmInc/lmHours*100)/100:0,nextExpiry=ll.filter(function(l){return l.expiryDate;}).sort(function(a,b){return a.expiryDate.localeCompare(b.expiryDate);})[0]; var achievements=[];if(tInc>=5000)achievements.push({icon:"🏆",text:"本月收入破$5000",color:"#FFD700",bg:"#1A1400"});else if(tInc>=3000)achievements.push({icon:"⭐",text:"本月收入破$3000",color:"#FFD700",bg:"#1A1400"});if(net>0&&tInc>0&&net>=tInc*0.5)achievements.push({icon:"💰",text:"净利润超50%",color:"#00E676",bg:"#0A1A0A"});if(tTrips>=200)achievements.push({icon:"🚗",text:"本月200趟达成",color:"#00D4FF",bg:"#0A1428"});else if(tTrips>=100)achievements.push({icon:"🎯",text:"本月100趟达成",color:"#00D4FF",bg:"#0A1428"});if(expiring.length===0&&expired.length===0&&ll.length>0)achievements.push({icon:"✅",text:"证件全部有效",color:"#00E676",bg:"#0A1A0A"});if(yInc>=50000)achievements.push({icon:"👑",text:"年收入破$50000",color:"#FFD700",bg:"#1A1400"}); var r40=useState([]),custGroups=r40[0],setCustGroups=r40[1]; var r41=useState(""),newGrpName=r41[0],setNewGrpName=r41[1]; var r42=useState("📁"),newGrpIcon=r42[0],setNewGrpIcon=r42[1]; var r43=useState("#A8D0E8"),newGrpColor=r43[0],setNewGrpColor=r43[1]; var r44=useState(new Date().getFullYear()+""),taxYr=r44[0],setTaxYr=r44[1]; var r45=useState(15.3),seRate=r45[0],setSeRate=r45[1]; var r46=useState(false),taxLoading=r46[0],setTaxLoading=r46[1]; var r47=useState(""),taxRateNote=r47[0],setTaxRateNote=r47[1]; var r48=useState([]),notes=r48[0],setNotes=r48[1]; var r49=useState({title:"",body:"",id:null}),noteF=r49[0],setNoteF=r49[1]; var r50=useState(false),noteEdit=r50[0],setNoteEdit=r50[1]; var r51=useState(""),incGoal=r51[0],setIncGoal=r51[1]; var r52=useState(false),showGoal=r52[0],setShowGoal=r52[1]; useEffect(function(){var s=document.createElement("script");s.src="https://accounts.google.com/gsi/client";s.async=true;s.defer=true;document.body.appendChild(s);},[]); var r55=useState(""),syncStatus=r55[0],setSyncStatus=r55[1]; var r56=useState(false),syncing=r56[0],setSyncing=r56[1]; var r57=useState(null),driveFileId=r57[0],setDriveFileId=r57[1]; var r58=useState(null),accessToken=r58[0],setAccessToken=r58[1];

  // Google Drive sync functions
  function getDriveData(tok,cb){
    fetch("https://www.googleapis.com/drive/v3/files?q=name%3D%27nyc-driver-data.json%27+and+trashed%3Dfalse&spaces=drive&fields=files(id,name,modifiedTime)",{headers:{Authorization:"Bearer "+tok}})
    .then(function(r){return r.json();})
    .then(function(d){
      if(d.files&&d.files.length>0){cb(d.files[0].id);}else{cb(null);}
    }).catch(function(){cb(null);});
  }
  function loadFromDrive(tok){
    setSyncStatus(lang==="en"?"Loading data...":"正在加载数据...");
    getDriveData(tok,function(fileId){
      if(!fileId){setSyncStatus(lang==="en"?"No saved data found":"未找到保存的数据");return;}
      setDriveFileId(fileId);
      fetch("https://www.googleapis.com/drive/v3/files/"+fileId+"?alt=media",{headers:{Authorization:"Bearer "+tok}})
      .then(function(r){return r.json();})
      .then(function(data){
        if(data.sl)setSl(data.sl);
        if(data.el)setEl(data.el);
        if(data.fl)setFl(data.fl);
        if(data.ll)setLl(data.ll);
        if(data.veh)setVeh(data.veh);
        if(data.cc)setCc(data.cc);
        if(data.reminders)setReminders(data.reminders);
        if(data.custPlat)setCustPlat(data.custPlat);
        if(data.notes)setNotes(data.notes);
        if(data.incGoal)setIncGoal(data.incGoal);
        setSyncStatus(lang==="en"?"✓ Data loaded":"✓ 数据已加载");
        setTimeout(function(){setSyncStatus("");},3000);
      }).catch(function(){setSyncStatus(lang==="en"?"Load failed":"加载失败");});
    });
  }
  function saveToDrive(tok,fid,dataObj){
    setSyncing(true);
    var body=JSON.stringify(dataObj);
    var meta=JSON.stringify({name:"nyc-driver-data.json",mimeType:"application/json"});
    var bound="-------nycdriverfoo";
    var reqBody="--"+bound+"\r\nContent-Type: application/json\r\n\r\n"+meta+"\r\n--"+bound+"\r\nContent-Type: application/json\r\n\r\n"+body+"\r\n--"+bound+"--";
    var url=fid?"https://www.googleapis.com/upload/drive/v3/files/"+fid+"?uploadType=multipart":"https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";
    var method=fid?"PATCH":"POST";
    fetch(url,{method:method,headers:{Authorization:"Bearer "+tok,"Content-Type":"multipart/related; boundary="+bound},body:reqBody})
    .then(function(r){return r.json();})
    .then(function(d){
      if(d.id)setDriveFileId(d.id);
      setSyncing(false);
      setSyncStatus(lang==="en"?"✓ Saved":"✓ 已保存");
      setTimeout(function(){setSyncStatus("");},2000);
    }).catch(function(){setSyncing(false);setSyncStatus(lang==="en"?"Save failed":"保存失败");});
  }
  function autoSave(newData){
    if(!accessToken)return;
    var data=Object.assign({sl:sl,el:el,fl:fl,ll:ll,veh:veh,cc:cc,reminders:reminders,custPlat:custPlat,notes:notes,incGoal:incGoal},newData);
    saveToDrive(accessToken,driveFileId,data);
  }

  if(!gUser) return (
React.createElement('div', { style: {minHeight:"100vh",background:"#0D1426",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}
          , React.createElement('div', { style: {fontSize:64,marginBottom:16}}, "🚖")
          , React.createElement('div', { style: {fontSize:22,fontWeight:900,color:"#E8EAF0",marginBottom:6}}, "NYC Driver Tracker"  )
          , React.createElement('div', { style: {fontSize:14,color:"#90B4D0",marginBottom:40,textAlign:"center"}}, "纽约网约车司机财务管理")
          , React.createElement('div', { id: "g_id_signin", style: {marginBottom:20}})
          , React.createElement('button', { onClick: function(){
            if(window.google){
              // Use OAuth2 for Drive access
              var client=window.google.accounts.oauth2.initTokenClient({
                client_id:"191679830947-efrr8o2em07oo9q88co37rd57qnnb0ai.apps.googleusercontent.com",
                scope:"https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
                callback:function(tokenResp){
                  if(tokenResp.error)return;
                  var tok=tokenResp.access_token;
                  setAccessToken(tok);
                  // Get user info
                  fetch("https://www.googleapis.com/oauth2/v2/userinfo",{headers:{Authorization:"Bearer "+tok}})
                  .then(function(r){return r.json();})
                  .then(function(u){
                    setGUser({name:u.name,email:u.email,picture:u.picture});
                    // Load saved data from Drive
                    loadFromDrive(tok);
                  });
                }
              });
              client.requestAccessToken();
            }else{
              alert(lang==="en"?"Google not loaded, please refresh":"Google未加载，请刷新页面");
            }
          }, style: {background:"#fff",border:"none",borderRadius:24,padding:"12px 28px",fontSize:15,fontWeight:700,color:"#1A1A1A",cursor:"pointer",display:"flex",alignItems:"center",gap:10,boxShadow:"0 2px 12px rgba(0,0,0,0.3)"}}
            , React.createElement('svg', { width: "20", height: "20", viewBox: "0 0 48 48"   }, React.createElement('path', { fill: "#EA4335", d: "M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"                       }), React.createElement('path', { fill: "#4285F4", d: "M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"       }), React.createElement('path', { fill: "#FBBC05", d: "M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"          }), React.createElement('path', { fill: "#34A853", d: "M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"              }))
            , lang==="en"?"Sign in with Google":"用 Google 账号登录"
          )
          , React.createElement('button', { onClick: function(){setLang(lang==="zh"?"en":"zh");}, style: {marginTop:20,background:"none",border:"1px solid #2A4A6A",borderRadius:8,padding:"6px 16px",color:"#90B4D0",fontSize:13,cursor:"pointer"}}, lang==="zh"?"English":"中文")
        )
  );
  return (
      React.createElement('div', { style: {minHeight:"100vh",background:C.bg,fontFamily:"PingFang SC,Noto Sans SC,sans-serif",color:C.text}, className: "app-wrapper"}
      , React.createElement('div', { style: {background:C.bg,padding:"10px 14px 8px",borderBottom:"1px solid "+C.border}}
        , React.createElement('div', { style: {display:"flex",alignItems:"center",gap:10}}
          , React.createElement('button', { onClick: function(){setShowDrawer(true);}, style: {background:"none",border:"none",color:C.text2,fontSize:22,cursor:"pointer",padding:"2px 6px",lineHeight:1,flexShrink:0}}, "☰")
          , React.createElement('div', { style: {flex:1,textAlign:"center"}}
            , veh.brand||veh.plate ? React.createElement('div', { style: {fontSize:13,fontWeight:800,color:C.text}}, veh.brand?veh.brand+" ":"", veh.plate?"["+veh.plate+"]":"") : React.createElement('div', { style: {fontSize:13,fontWeight:700,color:C.text3}}, "NYC RIDESHARE TRACKER"  )
            , React.createElement('div', { style: {fontSize:11,color:C.text3,letterSpacing:1}}, "NYC RIDESHARE DRIVER TRACKER"   )
          )
          , React.createElement('button', { onClick: function(){setLang(lang==="zh"?"en":"zh");}, style: {background:"#1A2A44",border:"none",borderRadius:6,color:"#A8D0E8",fontSize:11,cursor:"pointer",padding:"3px 7px",fontWeight:700,flexShrink:0}}, lang==="zh"?"EN":"中")
          , React.createElement('button', { onClick: function(){setShowRemMgr(true);}, style: {background:"none",border:"none",color:"#CC88FF",fontSize:18,cursor:"pointer",padding:"2px 6px",flexShrink:0}}, "🔔")
        )
      )
      , expired.length > 0 ? React.createElement(ABox, { color: "#FF1744", bg: "#2A0505", icon: "!", text: expired.length+(lang==="en"?" licenses expired":" 项执照已过期")} ) : null
      , expiring.length > 0 ? React.createElement(ABox, { color: "#FF6D00", bg: "#2A1500", icon: "!", text: expiring.length+(lang==="en"?" licenses expiring soon":" 项执照60天内到期")} ) : null
      , insW && insW.diff < 0 ? React.createElement(ABox, { color: "#FF5252", bg: "#200808", icon: "!", text: (lang==="en"?"Inspection overdue ":"车辆检验已逾期 ")+Math.abs(insW.diff)+(lang==="en"?" days":" 天")} ) : null
      , insW && insW.diff >= 0 && insW.diff <= 30 ? React.createElement(ABox, { color: "#FFB300", bg: "#1A1400", icon: "!", text: (lang==="en"?"Inspection in ":"车辆检验还剩 ")+insW.diff+(lang==="en"?" days":" 天")} ) : null
      , nextExpiry && (new Date(nextExpiry.expiryDate)-new Date())*0.000011574<=(+(nextExpiry.reminderDays||60)) && (new Date(nextExpiry.expiryDate)-new Date())*0.000011574>0 ? React.createElement(ABox, { color: "#FF9A00", bg: "#1A1000", icon: "📋", text: nextExpiry.type+" "+(lang==="en"?"expires in ":"还剩 ")+Math.round((new Date(nextExpiry.expiryDate)-new Date())*0.000011574)+(lang==="en"?" days":" 天到期")} ) : null
      , reminders.filter(function(r){if(!r.date)return false;var d=(new Date(r.date)-new Date())*0.000011574;return d>=0&&d<=(+(r.reminderDays||7));}).map(function(r,i){var d=Math.round((new Date(r.date)-new Date())*0.000011574);return React.createElement(ABox, { key: i, color: "#CC88FF", bg: "#150A20", icon: "🔔", text: r.title+(d===0?(lang==="en"?" · Today":" · 今天"):d===1?(lang==="en"?" · Tomorrow":" · 明天"):(lang==="en"?" · "+d+" days left":" · 还剩"+d+"天"))} );}) 
      , React.createElement('div', { style: {padding:"16px 14px",paddingBottom:120,maxWidth:800,margin:"0 auto"}}

        , tab===0 ? (
          React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 233}}
            , React.createElement(SegBtn, { val: dashV, set: setDashV, opts: [["month",T.thisMonth],["year",T.thisYear]]} )
            , dashV==="month" ? (
              React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 236}}
                , React.createElement(MoNav, { val: mo, set: setMo, lang: lang} )
                , incGoal&&+incGoal>0 ? React.createElement(Card, { style: {marginBottom:10,padding:"12px 14px"}}, React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}, React.createElement('div', { style: {fontSize:13,fontWeight:700,color:"#FFD700"}}, "🎯 " , lang==="en"?"Monthly Goal":"本月目标"), React.createElement('div', { style: {display:"flex",alignItems:"center",gap:8}}, React.createElement('span', { style: {fontSize:13,color:C.text2}}, fmt(tInc), " / "  , fmt(+incGoal)), React.createElement('button', { onClick: function(){setShowGoal(true);}, style: {background:"none",border:"none",color:C.text3,fontSize:12,cursor:"pointer"}}, "✏️"))), React.createElement('div', { style: {height:8,borderRadius:4,background:"#1A2A40",overflow:"hidden",marginBottom:4}}, React.createElement('div', { style: {height:8,borderRadius:4,width:Math.min(100,Math.round(tInc/+incGoal*100))+"%",background:tInc>=+incGoal?"linear-gradient(90deg,#00E676,#FFD700)":"linear-gradient(90deg,#00D4FF,#0055FF)"}} )), React.createElement('div', { style: {fontSize:12,color:tInc>=+incGoal?"#00E676":"#7A9AB8"}}, tInc>=+incGoal?(lang==="en"?"🎉 Goal reached!":"🎉 目标达成！"):(lang==="en"?"Still need: ":"还差: ")+fmt(+incGoal-tInc)+" ("+Math.round(tInc/+incGoal*100)+"%)")) : React.createElement('button', { onClick: function(){setShowGoal(true);}, style: {width:"100%",background:"#0A1828",border:"1px dashed #2A4A6A",borderRadius:10,padding:"8px 14px",color:"#7A9AB8",fontSize:12,cursor:"pointer",marginBottom:10,textAlign:"left"}}, "🎯 " , lang==="en"?"Set monthly goal...":"设定本月收入目标...")
                , (function(){var hm=mData.filter(function(m){return m.inc>0;});if(hm.length<2)return null;var mx=Math.max.apply(null,hm.map(function(m){return m.inc;}));return React.createElement(Card, { style: {marginBottom:8,padding:"12px 14px"}}, React.createElement('div', { style: {fontSize:13,fontWeight:700,color:"#00D4FF",marginBottom:8}}, "📊 " , lang==="en"?"Income Trend":"收入趋势"), React.createElement('div', { style: {display:"flex",alignItems:"flex-end",gap:3,height:60}}, mData.map(function(m,i){if(!m.inc)return React.createElement('div', { key: i, style: {flex:1}} );var h=Math.round(8+m.inc/mx*48);var isCur=m.m===mo;return React.createElement('div', { key: i, onClick: function(){setMo(m.m);setDashV("month");}, style: {flex:1,cursor:"pointer"}}, React.createElement('div', { style: {width:"100%",height:h,borderRadius:"3px 3px 0 0",background:isCur?"#00D4FF":m.net>=0?"#00E676":"#FF5252",opacity:isCur?1:0.7}} ));}), " " ), React.createElement('div', { style: {display:"flex",fontSize:10,color:"#7A9AB8",marginTop:3}}, mData.map(function(m,i){return React.createElement('div', { key: i, style: {flex:1,textAlign:"center",color:m.m===mo?"#00D4FF":"#7A9AB8"}}, m.label.slice(0,3));})));}())
                , React.createElement(Card, { style: {marginBottom:10}}
                  , React.createElement('div', { style: {fontSize:13,color:"#8ACCA8",marginBottom:6}}, T.netIncome)
                  , (function(){var nc=net>=0?"#00E676":"#FF5252";return React.createElement('div', { style: {fontSize:32,fontWeight:900,color:nc,letterSpacing:-1}}, fmt(net));}())
                  , React.createElement('div', { style: {fontSize:12,color:"#8ACCA8",marginTop:4}}, lang==="en"?"Income":"收", " " , fmt(tInc), " · "  , lang==="en"?"Expense":"支", " " , fmt(tExp))
                  , tInc>0&&tExp>0 ? React.createElement('div', { style: {marginTop:10}}, React.createElement('div', { style: {height:6,borderRadius:3,background:"#0F1C30",overflow:"hidden"}}, React.createElement('div', { style: {height:6,borderRadius:3,background:"linear-gradient(90deg,#00E676,#00D4FF)",width:Math.min(100,Math.round(net/tInc*100))+"%"}})), React.createElement('div', { style: {fontSize:11,color:"#5A8A6A",marginTop:4}}, lang==="en"?"Profit Rate":"利润率", " " , Math.round(net/tInc*100), "%")) : null
                )
                , achievements.length>0 ? React.createElement('div', { style: {display:"flex",flexWrap:"wrap",gap:8,marginBottom:12}}, achievements.map(function(a,i){return React.createElement(Badge, { key: i, icon: a.icon, text: a.text, color: a.color, bg: a.bg} );})) : null
                , tInc > 0 ? React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 247}}
                  , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6,marginBottom:8}}, React.createElement(Stat, { sm: true, label: "Gross", value: fmt(tGross), color: "#00D4FF"} ), React.createElement(Stat, { sm: true, label: T.tips, value: fmt(tTips), color: "#00E676"} ), React.createElement(Stat, { sm: true, label: T.bonus, value: fmt(tBonus), color: "#FFD700"} ), React.createElement(Stat, { sm: true, label: "Toll", value: fmt(tToll), color: "#45B7D1"} ))
                  , hourlyRate>0 ? React.createElement(Card, { style: {marginBottom:8,padding:"10px 14px",background:"#0A1828",border:"1px solid #1A3048"}}, React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center"}}, React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 249}}, React.createElement('div', { style: {fontSize:12,color:"#90B4D0"}}, T.hourlyRate), React.createElement('div', { style: {fontSize:22,fontWeight:900,color:"#FFD700"}}, fmt(hourlyRate), React.createElement('span', { style: {fontSize:12,color:"#90B4D0"}}, T.perHour))), lmHourly>0?React.createElement('div', { style: {textAlign:"right"}}, React.createElement('div', { style: {fontSize:12,color:"#90B4D0"}}, T.lastMonth+" "+fmt(lmHourly)+T.perHour), React.createElement('div', { style: Object.assign({fontSize:12,fontWeight:700},{color:hourlyRate>=lmHourly?"#00E676":"#FF5252"})}, hourlyRate>=lmHourly?"▲":"▼", " " , fmt(Math.abs(hourlyRate-lmHourly)))):null)) : null
                  , lmInc>0 ? React.createElement(Card, { style: {marginBottom:8,padding:"10px 14px",background:"#0A1020",border:"1px solid #151F30"}}, React.createElement('div', { style: {fontSize:12,color:"#7A9AB8",marginBottom:6}}, T.vsLastMonth), React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}, React.createElement('div', { style: {textAlign:"center"}}, React.createElement('div', { style: {fontSize:11,color:"#90B4D0"}}, T.income), React.createElement('div', { style: Object.assign({fontSize:13,fontWeight:700},{color:tInc>=lmInc?"#00E676":"#FF5252"})}, tInc>=lmInc?"▲":"▼", Math.round(Math.abs(tInc-lmInc)/lmInc*100), "%")), React.createElement('div', { style: {textAlign:"center"}}, React.createElement('div', { style: {fontSize:11,color:"#90B4D0"}}, T.expense), React.createElement('div', { style: Object.assign({fontSize:13,fontWeight:700},{color:tExp<=lmExp?"#00E676":"#FF5252"})}, tExp<=lmExp?"▼":"▲", lmExp>0?Math.round(Math.abs(tExp-lmExp)/lmExp*100):0, "%")), React.createElement('div', { style: {textAlign:"center"}}, React.createElement('div', { style: {fontSize:11,color:"#90B4D0"}}, T.netProfit), React.createElement('div', { style: Object.assign({fontSize:13,fontWeight:700},{color:net>=lmNet?"#00E676":"#FF5252"})}, net>=lmNet?"▲":"▼", lmNet!==0?Math.round(Math.abs(net-lmNet)/Math.abs(lmNet)*100):0, "%")))) : null
                ) : null
                , (function(){var fi=el.filter(function(e){return e.category==="fuel"&&e.qty&&+e.qty>0&&e.date&&e.date.slice(0,7)===mo;}).sort(function(a,b){return a.date.localeCompare(b.date);});if(fi.length<2)return null;var pr=fi.map(function(e){return Math.round(+e.amount/+e.qty*100)/100;});var minP=Math.min.apply(null,pr),maxP=Math.max.apply(null,pr);return React.createElement(Card, { style: {marginBottom:8,padding:"12px 14px"}}, React.createElement('div', { style: {fontSize:13,fontWeight:700,color:"#FFD700",marginBottom:8}}, "⛽ " , lang==="en"?"Gas Price Trend":"油价趋势"), React.createElement('div', { style: {display:"flex",alignItems:"flex-end",gap:4,height:50,marginBottom:4}}, pr.map(function(p,i){var h=maxP===minP?30:Math.round(10+(p-minP)/(maxP-minP)*35);return React.createElement('div', { key: i, style: {flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:1}}, React.createElement('div', { style: {fontSize:8,color:i===pr.length-1?"#FFD700":"#7A9AB8"}}, p), React.createElement('div', { style: {width:"100%",height:h,borderRadius:"3px 3px 0 0",background:i===pr.length-1?"#FFD700":"#2A3A54"}} ));}), " " ), React.createElement('div', { style: {display:"flex",justifyContent:"space-between",fontSize:11,color:"#7A9AB8"}}, React.createElement('span', {__source: {fileName: _jsxFileName, lineNumber: 252}}, lang==="en"?"Low $":"低 $", minP), React.createElement('span', {__source: {fileName: _jsxFileName, lineNumber: 252}}, lang==="en"?"High $":"高 $", maxP), React.createElement('span', {__source: {fileName: _jsxFileName, lineNumber: 252}}, lang==="en"?"Latest $":"最新 $", pr[pr.length-1])));}())
                , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:8}}
                  , (function(){var vt=tTrips?String(tTrips):"—",vh=tHours?String(tHours):"—",vo=tOnl?String(tOnl):"—",vm=tMiles?String(tMiles):"—";return React.createElement('div', { style: {display:"contents"}}, React.createElement(Stat, { sm: true, label: T.trips, value: vt} ), React.createElement(Stat, { sm: true, label: lang==="en"?"Drive h":"行驶h", value: vh} ), React.createElement(Stat, { sm: true, label: lang==="en"?"Online h":"在线h", value: vo} ), React.createElement(Stat, { sm: true, label: T.miles, value: vm} ));}())
                )
                , tExp > 0 ? (
                  React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 257}}
                    , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}
                      , React.createElement('div', { style: {fontSize:14,fontWeight:700,color:C.text2}}, T.expense)
                      , React.createElement('button', { onClick: function(){setMExpDet(!mExpDet);}, style: {background:"none",border:"1px solid #2A4A6A",borderRadius:8,padding:"4px 10px",color:"#90B8D0",fontSize:12,cursor:"pointer"}}, mExpDet?(lang==="en"?"By Group":"按大类"):(lang==="en"?"By Item":"按小类"))
                    )
                    , mExpDet ? React.createElement(Card, {__source: {fileName: _jsxFileName, lineNumber: 262}}, React.createElement(CatDetail, { items: feAll, total: tExp, allC: allC} )) : React.createElement(CatBreakdown, { items: feAll, total: tExp, allC: allC} )
                  , tInc>0&&tExp>0 ? (function(){var grps={"车辆":0,"牌照":0,"平台":0,"其他":0};feAll.forEach(function(e){var cat=allC[e.category];var g=cat?(cat.g||"其他"):"其他";if(grps[g]!==undefined)grps[g]+=(+e.amount||0);else grps["其他"]+=(+e.amount||0);});var gcols={"车辆":"#00D4FF","牌照":"#FFD700","平台":"#CC88FF","其他":"#A8D0E8"};var glbls=lang==="en"?{"车辆":"Vehicle","牌照":"License","平台":"Platform","其他":"Other"}:{"车辆":"车辆","牌照":"牌照","平台":"平台","其他":"其他"};if(!Object.values(grps).some(function(v){return v>0;}))return null;return React.createElement(Card, { style: {marginTop:8,padding:"12px 14px"}}, React.createElement('div', { style: {fontSize:13,fontWeight:700,marginBottom:8}}, lang==="en"?"Expense Breakdown":"支出分布"), React.createElement('div', { style: {display:"flex",height:10,borderRadius:5,overflow:"hidden",marginBottom:8}}, Object.entries(grps).map(function(kv){if(!kv[1])return null;return React.createElement('div', { key: kv[0], style: {width:Math.round(kv[1]/tExp*100)+"%",background:gcols[kv[0]],minWidth:2}} );})), React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}, Object.entries(grps).map(function(kv){if(!kv[1])return null;return React.createElement('div', { key: kv[0], style: {display:"flex",alignItems:"center",gap:5}}, React.createElement('div', { style: {width:10,height:10,borderRadius:2,background:gcols[kv[0]],flexShrink:0}} ), React.createElement('span', { style: {fontSize:12,color:C.text2}}, glbls[kv[0]]), React.createElement('span', { style: {fontSize:12,fontWeight:700,color:gcols[kv[0]],marginLeft:"auto"}}, Math.round(kv[1]/tExp*100), "%"));}), " " ), React.createElement('div', { style: {borderTop:"1px solid #1E3050",marginTop:8,paddingTop:6,display:"flex",justifyContent:"space-between"}}, React.createElement('span', { style: {fontSize:12,color:C.text2}}, lang==="en"?"Net Rate":"净利润率"), React.createElement('span', { style: {fontSize:13,fontWeight:800,color:net>=0?"#00E676":"#FF5252"}}, tInc>0?Math.round(net/tInc*100):0, "%")));}()) : null
                    , tInc>0&&tExp>0 ? React.createElement('div', { style: {marginTop:8,background:"#0A1020",borderRadius:10,padding:"10px 14px",border:"1px solid #151F30"}}, React.createElement('div', { style: {display:"flex",justifyContent:"space-between",marginBottom:6}}, React.createElement('span', { style: {fontSize:12,color:"#7AB8A8"}}, lang==="en"?"Expense Ratio":"支出占比"), React.createElement('span', { style: Object.assign({fontSize:13,fontWeight:700},{color:tExp/tInc>0.8?"#FF5252":tExp/tInc>0.5?"#FFB300":"#00E676"})}, Math.round(tExp/tInc*100), "%")), React.createElement('div', { style: {height:8,borderRadius:4,background:"#1A2A40",overflow:"hidden"}}, React.createElement('div', { style: {height:8,borderRadius:4,width:Math.min(100,Math.round(tExp/tInc*100))+"%",background:tExp/tInc>0.8?"linear-gradient(90deg,#FF5252,#FF8855)":tExp/tInc>0.5?"linear-gradient(90deg,#FFB300,#FFD700)":"linear-gradient(90deg,#00E676,#00D4FF)"}}))) : null
                  )
                ) : null
              )
            ) : null
            , dashV==="year" ? (
              React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 270}}
                , React.createElement(YrNav, { val: yr, set: setYr, lang: lang} )
                , (function(){var hm=mData.filter(function(m){return m.inc>0;});if(hm.length<2)return null;var mx=Math.max.apply(null,hm.map(function(m){return m.inc;}));return React.createElement(Card, { style: {marginBottom:8,padding:"12px 14px"}}, React.createElement('div', { style: {fontSize:13,fontWeight:700,color:"#00D4FF",marginBottom:8}}, "📊 " , lang==="en"?"Income Trend":"收入趋势"), React.createElement('div', { style: {display:"flex",alignItems:"flex-end",gap:3,height:60}}, mData.map(function(m,i){if(!m.inc)return React.createElement('div', { key: i, style: {flex:1}} );var h=Math.round(8+m.inc/mx*48);var isCur=m.m===mo;return React.createElement('div', { key: i, onClick: function(){setMo(m.m);setDashV("month");}, style: {flex:1,cursor:"pointer"}}, React.createElement('div', { style: {width:"100%",height:h,borderRadius:"3px 3px 0 0",background:isCur?"#00D4FF":m.net>=0?"#00E676":"#FF5252",opacity:isCur?1:0.7}} ));}), " " ), React.createElement('div', { style: {display:"flex",fontSize:10,color:"#7A9AB8",marginTop:3}}, mData.map(function(m,i){return React.createElement('div', { key: i, style: {flex:1,textAlign:"center",color:m.m===mo?"#00D4FF":"#7A9AB8"}}, m.label.slice(0,3));})));}())
                , React.createElement(Card, { style: {marginBottom:10}}
                  , React.createElement('div', { style: {fontSize:13,color:"#8ACCA8",marginBottom:6}}, yr+" "+(lang==="en"?"Annual":"全年"))
                  , (function(){var nc=yNet>=0?"#00E676":"#FF5252";return React.createElement('div', { style: {fontSize:28,fontWeight:900,color:nc,letterSpacing:-1}}, fmt(yNet));}())
                  , React.createElement('div', { style: {fontSize:12,color:"#8ACCA8",marginTop:4}}, lang==="en"?"Income":"收", " " , fmt(yInc), " · "  , lang==="en"?"Expense":"支", " " , fmt(yExp))
                )
                , (yStmtTrips>0||yStmtHours>0||yStmtMiles>0) ? React.createElement('div', { style: {display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}, (function(){var vt=yStmtTrips?String(yStmtTrips):"—",vh=yStmtHours?yStmtHours+"h":"—",vm=yStmtMiles?yStmtMiles+"mi":"—";return React.createElement('div', { style: {display:"contents"}}, React.createElement(Stat, { label: T.trips, value: vt, color: "#00D4FF"} ), React.createElement(Stat, { label: lang==="en"?"Online h":"在线h", value: vh, color: "#00D4FF"} ), React.createElement(Stat, { label: T.miles, value: vm, color: "#00D4FF"} ));}())) : null
                , React.createElement(Card, { style: {marginBottom:12}}
                  , React.createElement('div', { style: {fontSize:14,fontWeight:700,color:C.text,marginBottom:10}}, lang==="en"?"Monthly Breakdown":"逐月明细")
                  , mData.map(function(m){if(m.inc===0&&m.exp===0)return null;var ncl=m.net>=0?"#00E676":"#FF5252",mcl=m.m===mo?"#00D4FF":C.text;return React.createElement('div', { key: m.m, onClick: function(){setMo(m.m);setDashV("month");}, style: {display:"grid",gridTemplateColumns:"2fr 2fr 2fr 2fr",padding:"7px 0",borderBottom:"1px solid #182030",cursor:"pointer"}}, React.createElement('span', { style: Object.assign({fontSize:12,fontWeight:700},{color:mcl})}, m.label), React.createElement('span', { style: {fontSize:12,color:"#00D4FF"}}, m.inc>0?fmt(m.inc):"—"), React.createElement('span', { style: {fontSize:12,color:"#FF6B35"}}, m.exp>0?fmt(m.exp):"—"), React.createElement('span', { style: Object.assign({fontSize:12,fontWeight:700},{color:ncl})}, fmt(m.net)));})
                )
                , yExp > 0 ? React.createElement(Card, {__source: {fileName: _jsxFileName, lineNumber: 283}}, React.createElement('div', { style: {fontSize:14,fontWeight:700,color:C.text,marginBottom:12}}, lang==="en"?"Annual Expenses":"全年支出明细"), React.createElement(CatDetail, { items: yAllExps(), total: yExp, allC: allC} )) : null
              )
            ) : null
          )
        ) : null

        , tab===1 ? (
          React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 290}}
            , React.createElement(MoNav, { val: mo, set: setMo, lang: lang} )
            , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}
              , React.createElement('button', { onClick: function(){setStf({month:mo,platform:"Uber",grossFare:"",tips:"",bonus:"",tollReimbursed:"",otherIncome:"",trips:"",onlineHours:"",miles:"",notes:""});setSf("stmt");}, style: {background:"#0A1828",border:"1px solid #1A3048",borderRadius:14,padding:"16px 12px",cursor:"pointer",textAlign:"center"}}
                , React.createElement('div', { style: {fontSize:28,marginBottom:6}}, "💵")
                , React.createElement('div', { style: {fontSize:14,fontWeight:800,color:"#00D4FF",marginBottom:4}}, T.monthly)
                , React.createElement('div', { style: {fontSize:12,color:"#90B4D0"}}, "Uber/Lyft " , T.monthly)
              )
              , React.createElement('button', { onClick: function(){setSf("week");}, style: {background:"#0A1828",border:"1px solid #1A3048",borderRadius:14,padding:"16px 12px",cursor:"pointer",textAlign:"center"}}
                , React.createElement('div', { style: {fontSize:28,marginBottom:6}}, "📅")
                , React.createElement('div', { style: {fontSize:14,fontWeight:800,color:"#00E676",marginBottom:4}}, T.weekly)
                , React.createElement('div', { style: {fontSize:12,color:"#90B4D0"}}, T.trips, " · "  , T.miles)
              )
            )
            , tInc > 0 ? React.createElement(Card, { style: {marginBottom:12}}, React.createElement('div', { style: {fontSize:13,color:"#7A9AB8",marginBottom:4}}, T.totalIncome), React.createElement('div', { style: {fontSize:24,fontWeight:900,color:"#00D4FF",marginBottom:6}}, fmt(tInc)), React.createElement('div', { style: {display:"flex",gap:12,fontSize:13}}, React.createElement('span', { style: {color:C.text2}}, "Gross " , fmt(tGross)), React.createElement('span', { style: {color:"#00E676"}}, T.tips, " " , fmt(tTips)), React.createElement('span', { style: {color:"#FFD700"}}, T.bonus, " " , fmt(tBonus)))) : null
            , mStmts.length > 0 ? React.createElement('div', { style: {marginBottom:16}}, React.createElement('div', { style: {fontSize:12,color:"#7A9AB8",letterSpacing:1,marginBottom:8}}, "💵 " , T.monthly), mStmts.map(function(s){var total=(+s.grossFare||0)+(+s.tips||0)+(+s.bonus||0)+(+s.tollReimbursed||0)+(+s.otherIncome||0);return React.createElement(Card, { key: s.id}, React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center"}}, React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 305}}, React.createElement('div', { style: {fontSize:14,fontWeight:700,marginBottom:3}}, s.platform, " · "  , s.month), React.createElement('div', { style: {fontSize:13,color:"#00E676",fontWeight:700}}, fmt(total)), React.createElement('div', { style: {display:"flex",gap:8,flexWrap:"wrap",marginTop:4}}, s.trips?React.createElement('span', { style: {fontSize:12,background:"#1A2A44",borderRadius:6,padding:"2px 7px",color:C.text2}}, s.trips, " " , T.trips):null, s.onlineHours?React.createElement('span', { style: {fontSize:12,background:"#1A2A44",borderRadius:6,padding:"2px 7px",color:C.text2}}, s.onlineHours, "h"):null, s.miles?React.createElement('span', { style: {fontSize:12,background:"#1A2A44",borderRadius:6,padding:"2px 7px",color:C.text2}}, s.miles, "mi"):null)), React.createElement('div', { style: {display:"flex",gap:6}}, React.createElement('button', { onClick: function(){setStf(Object.assign({trips:"",onlineHours:"",miles:"",notes:""},s));setSf("stmt");}, style: {background:"none",border:"1px solid #2A4A6A",borderRadius:6,padding:"3px 8px",color:"#6AACEE",cursor:"pointer",fontSize:12}}, T.edit), React.createElement('button', { onClick: function(){setSl(sl.filter(function(x){return x.id!==s.id;}));}, style: {background:"none",border:"1px solid #3A1A1A",borderRadius:6,padding:"3px 8px",color:"#FF3D00",cursor:"pointer",fontSize:12}}, T.del))));}), " " ) : null
            , mWeeks.length > 0 ? React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 306}}, (function(){var tw=mWeeks.reduce(function(s,w){return {trips:s.trips+(+w.trips||0),hours:s.hours+(+w.hours||0),miles:s.miles+(+w.miles||0)};},{trips:0,hours:0,miles:0});if(!tw.trips&&!tw.hours)return null;return React.createElement(Card, { style: {background:"#0A1828",border:"1px solid #1A3048",marginBottom:8}}, React.createElement('div', { style: {display:"flex",justifyContent:"space-around"}}, tw.trips?React.createElement('div', { style: {textAlign:"center"}}, React.createElement('div', { style: {fontSize:11,color:"#7A9AB8"}}, T.trips), React.createElement('div', { style: {fontSize:18,fontWeight:800,color:"#00E676"}}, tw.trips)):null, tw.hours?React.createElement('div', { style: {textAlign:"center"}}, React.createElement('div', { style: {fontSize:11,color:"#7A9AB8"}}, lang==="en"?"Hours":"时长"), React.createElement('div', { style: {fontSize:18,fontWeight:800,color:"#00D4FF"}}, tw.hours, "h")):null, tw.miles?React.createElement('div', { style: {textAlign:"center"}}, React.createElement('div', { style: {fontSize:11,color:"#7A9AB8"}}, T.miles), React.createElement('div', { style: {fontSize:18,fontWeight:800,color:"#FFD700"}}, tw.miles)):null, tw.hours>0&&tInc>0?React.createElement('div', { style: {textAlign:"center"}}, React.createElement('div', { style: {fontSize:11,color:"#7A9AB8"}}, T.hourlyRate), React.createElement('div', { style: {fontSize:18,fontWeight:800,color:"#FF9A65"}}, fmt(Math.round(tInc/tw.hours*100)/100))):null));}()), " " , React.createElement('div', { style: {fontSize:12,color:"#7A9AB8",letterSpacing:1,marginBottom:8}}, "📅 " , T.weekly), mWeeks.slice().sort(function(a,b){return b.weekStart.localeCompare(a.weekStart);}).map(function(w){return React.createElement(Card, { key: w.id}, React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}, React.createElement('div', { style: {flex:1}}, React.createElement('div', { style: {fontSize:14,fontWeight:700,color:"#00E676",marginBottom:4}}, wkLabel(w.weekStart)), React.createElement('div', { style: {fontSize:13,color:C.text2,marginBottom:4}}, w.platform), React.createElement('div', { style: {display:"flex",gap:6,flexWrap:"wrap"}}, w.trips?React.createElement('span', { style: {fontSize:13,background:"#1A2A44",borderRadius:6,padding:"2px 8px"}}, w.trips, " " , T.trips):null, w.hours?React.createElement('span', { style: {fontSize:13,background:"#1A2A44",borderRadius:6,padding:"2px 8px"}}, w.hours, "h"):null, w.miles?React.createElement('span', { style: {fontSize:13,background:"#1A2A44",borderRadius:6,padding:"2px 8px"}}, w.miles, "mi"):null)), React.createElement('div', { style: {display:"flex",gap:6}}, React.createElement('button', { onClick: function(){setWf(Object.assign({},w));setSf("week");}, style: {background:"none",border:"1px solid #2A4A6A",borderRadius:6,padding:"3px 8px",color:"#6AACEE",cursor:"pointer",fontSize:12}}, T.edit), React.createElement('button', { onClick: function(){setWl(wl.filter(function(x){return x.id!==w.id;}));}, style: {background:"none",border:"1px solid #3A1A1A",borderRadius:6,padding:"3px 8px",color:"#FF3D00",cursor:"pointer",fontSize:12}}, T.del))));}), " " ) : null
            , mStmts.length===0&&mWeeks.length===0 ? React.createElement(Empty, { text: T.noData} ) : null
            , (function(){var dd={};mWeeks.forEach(function(w){var d=new Date(w.weekStart);for(var i=0;i<7;i++){var dy=new Date(d);dy.setDate(d.getDate()+i);var dn=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][dy.getDay()];if(!dd[dn])dd[dn]={trips:0,cnt:0};dd[dn].trips+=(+w.trips||0)*0.142857;dd[dn].cnt++;}});var days=Object.entries(dd).filter(function(kv){return kv[1].cnt>0;});if(days.length<3)return null;days.sort(function(a,b){return b[1].trips-a[1].trips;});return React.createElement(Card, { style: {marginTop:10,padding:"12px 14px",background:"#0A1020",border:"1px solid #1A2A44"}}, React.createElement('div', { style: {fontSize:13,fontWeight:700,color:"#FFD700",marginBottom:8}}, "⭐ " , lang==="en"?"Best Working Days":"最佳工作日"), React.createElement('div', { style: {display:"flex",gap:6}}, days.slice(0,5).map(function(kv,i){var cls=["#FFD700","#00D4FF","#00E676","#CC88FF","#A8D0E8"];return React.createElement('div', { key: kv[0], style: {background:"#152135",borderRadius:8,padding:"6px 8px",textAlign:"center",flex:1}}, React.createElement('div', { style: {fontSize:11,color:cls[i],fontWeight:700}}, ["#1","#2","#3","",""][i], " " , kv[0]), React.createElement('div', { style: {fontSize:11,color:C.text2,marginTop:2}}, Math.round(kv[1].trips*10)/10, lang==="en"?" t/d":"趟/天"));}), " " ));}())
          )
        ) : null

        , tab===2 ? (
          React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 313}}
            , React.createElement(SegBtn, { val: expV, set: setExpV, opts: [["month",T.thisMonth],["year",T.thisYear]]} )
            , expV==="month" ? (
              React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 316}}
                , React.createElement(MoNav, { val: mo, set: setMo, lang: lang} )
                , fixMo.length > 0 ? React.createElement(Card, { style: {background:"#0D1E10",border:"1px solid #1A3A20",display:"flex",justifyContent:"space-between",alignItems:"center"}}, React.createElement('span', { style: {fontSize:14,color:"#5ADA7A",fontWeight:700}}, T.fixedFees+" "+fixMo.length), React.createElement('span', { style: {fontSize:14,fontWeight:700,color:"#FF9A65"}}, "-", fmt(tFix))) : null
                , React.createElement(Card, { style: {display:"flex",justifyContent:"space-between"}}, React.createElement('span', { style: {fontSize:14,color:C.text2}}, T.totalExpense), React.createElement('span', { style: {fontSize:18,fontWeight:800,color:"#FF6B35"}}, fmt(tExp)))
                , React.createElement(BucketList, { items: feAll, allC: allC, el: el, setEl: setEl, emptyText: T.noData, onEditFixed: function(item){setEditFx({id:item.id,amount:item.amount,notes:item.notes||"",fixedLabel:item.fixedLabel});}, onEditExp: function(item){setEf(Object.assign({},item,{qty:item.qty||"",isRecurring:false}));setSf("exp_edit_"+item.id);}} )
              )
            ) : null
            , expV==="year" ? (
              React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 324}}
                , React.createElement(YrNav, { val: yr, set: setYr, lang: lang} )
                , React.createElement(Card, { style: {display:"flex",justifyContent:"space-between",marginBottom:10}}, React.createElement('span', { style: {fontSize:14,color:C.text2}}, T.totalExpense), React.createElement('span', { style: {fontSize:18,fontWeight:800,color:"#FF6B35"}}, fmt(yExp)))
                , (function(){var allYE=yAllExps();if(!allYE.length)return React.createElement(Empty, { text: T.noData} );return React.createElement(BucketList, { items: allYE, allC: allC, el: el, setEl: setEl, emptyText: "", onEditFixed: function(item){setEditFx({id:item.id,amount:item.amount,notes:item.notes||"",fixedLabel:item.fixedLabel});}, onEditExp: function(item){setEf(Object.assign({},item,{qty:item.qty||"",isRecurring:false}));setSf("exp_edit_"+item.id);}} );}())
                , Object.keys(cc).length > 0 ? React.createElement('div', { style: {marginTop:16}}, React.createElement('div', { style: {fontSize:14,fontWeight:700,color:C.text,marginBottom:10}}, lang==="en"?"Custom Categories":"我的自定义类别"), Object.entries(cc).map(function(entry){var key=entry[0],cat=entry[1];return React.createElement(Card, { key: key, style: {display:"flex",alignItems:"center",gap:12}}, React.createElement('span', { style: {fontSize:22}}, cat.icon), React.createElement('div', { style: {flex:1}}, React.createElement('div', { style: {fontSize:14,fontWeight:600}}, cat.label), React.createElement('div', { style: {fontSize:12,color:C.text3}}, cat.group)), React.createElement('button', { onClick: function(){setCf({label:cat.label,icon:cat.icon,group:cat.group,_editKey:key});setSf("cc");}, style: {background:"none",border:"1px solid #2A4A6A",borderRadius:8,padding:"4px 10px",color:"#6AACEE",cursor:"pointer",fontSize:13}}, T.edit), React.createElement('button', { onClick: function(){var u=Object.assign({},cc);delete u[key];setCc(u);}, style: {background:"none",border:"1px solid #3A1A1A",borderRadius:8,padding:"4px 10px",color:"#FF5252",cursor:"pointer",fontSize:13}}, T.del));})) : null
                , React.createElement('div', { style: {marginTop:14,textAlign:"center"}}, React.createElement('button', { onClick: function(){setCf({label:"",icon:"&#128296;",group:"车辆"});setSf("cc");}, style: {background:"#1A2A44",border:"1px dashed #2A3A54",borderRadius:10,padding:"10px 18px",color:C.text2,fontSize:14,cursor:"pointer"}}, "+ " , lang==="en"?"Custom Category":"新增自定义类别"))
              )
            ) : null
          )
        ) : null

        , tab===3 ? (
          React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 336}}
            , React.createElement(SegBtn, { val: repP, set: setRepP, opts: [["month",T.thisMonth],["year",T.thisYear]]} )
            , repP==="month" ? React.createElement(MoNav, { val: mo, set: setMo, lang: lang} ) : React.createElement(YrNav, { val: yr, set: setYr, lang: lang} )
            , React.createElement('div', { style: {display:"flex",gap:8,marginBottom:14}}
              , React.createElement('button', { onClick: function(){var period=repP,label=period==="month"?mo:yr,srcExps=period==="month"?feAll:yAllExps(),r=bldRep(period),catMap={};srcExps.forEach(function(item){var cat=allC[item.category],key=item.isFixed?"fx_"+item.fixedLabel:item.category,lbl=item.isFixed?item.fixedLabel:(cat?cat.label:"Other"),grp=cat?(cat.g||cat.group||"Other"):"Other";if(!catMap[key]){catMap[key]={label:lbl,group:grp,total:0,count:0};}catMap[key].total+=(+item.amount||0);catMap[key].count+=1;});var byGroup={"车辆":[],"牌照":[],"平台":[],"其他":[]};Object.values(catMap).forEach(function(c){var g=byGroup[c.group]?c.group:"其他";byGroup[g].push(c);});["车辆","牌照","平台","其他"].forEach(function(g){byGroup[g].sort(function(a,b){return b.total-a.total;});});var isYear=period==="year";setReportData({type:"summary",r:r,label:label,byGroup:byGroup,stmts:isYear?yStmts:mStmts,isYear:isYear,mData:isYear?mData:null});}, style: {flex:1,background:"linear-gradient(135deg,#0A2040,#1A3060)",border:"1px solid #2A5080",borderRadius:10,padding:11,color:"#5AACFF",fontSize:13,fontWeight:700,cursor:"pointer"}}, "📊 " , T.report)
              , React.createElement('button', { onClick: function(){var period=repP,label=period==="month"?mo:yr,srcExps=period==="month"?feAll:yAllExps();var catMap={};srcExps.forEach(function(item){var cat=allC[item.category],key=item.isFixed?"fx_"+item.fixedLabel:item.category,lbl=item.isFixed?item.fixedLabel:(cat?cat.label:"Other"),grp=cat?(cat.g||cat.group||"Other"):"Other",ico=item.isFixed?item.fixedIcon:getIcon(item.category,allC);if(!catMap[key]){catMap[key]={label:lbl,group:grp,icon:ico,total:0,items:[]};}catMap[key].total+=(+item.amount||0);catMap[key].items.push(item);});var byGroup={"车辆":[],"牌照":[],"平台":[],"其他":[]};Object.values(catMap).forEach(function(c){var g=byGroup[c.group]?c.group:"其他";byGroup[g].push(c);});["车辆","牌照","平台","其他"].forEach(function(g){byGroup[g].sort(function(a,b){return b.total-a.total;});});var total=srcExps.reduce(function(s,e){return s+(+e.amount||0);},0);setReportData({type:"exp",label:label,byGroup:byGroup,total:total});}, style: {flex:1,background:"linear-gradient(135deg,#1A0820,#2A1040)",border:"1px solid #3A1560",borderRadius:10,padding:11,color:"#CC88FF",fontSize:13,fontWeight:700,cursor:"pointer"}}, "💸 " , T.expense)
            )
            , (function(){var r=bldRep(repP),rn=r.rn;var rnCl=rn>=0?"#00E676":"#FF5252";return (
              React.createElement(Card, {__source: {fileName: _jsxFileName, lineNumber: 344}}
                , React.createElement('div', { style: {fontSize:14,fontWeight:700,color:C.text,marginBottom:10}}, T.totalIncome)
                , React.createElement(Row, { label: "Gross Fare" , value: fmt(r.rg)} ), React.createElement(Row, { label: T.tips, value: fmt(r.rt), color: "#00E676"} ), React.createElement(Row, { label: T.bonus, value: fmt(r.rb), color: "#FFD700"} )
                , React.createElement(Row, { label: T.totalIncome, value: fmt(r.ri), color: "#00D4FF", bold: true} )
                , React.createElement('div', { style: {borderTop:"1px solid #0F1C30",margin:"8px 0"}} )
                , React.createElement(Row, { label: T.totalExpense, value: fmt(r.rTot), color: "#FF6B35", bold: true} )
                , React.createElement('div', { style: {borderTop:"1px solid #0F1C30",margin:"8px 0"}} )
                , React.createElement(Row, { label: T.netProfit, value: fmt(rn), color: rnCl, bold: true} )
              )
            );}())
          )
        ) : null

      )

      , sf==="drawer_veh" ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:C.bg,zIndex:300,overflowY:"auto"}}
          , React.createElement('div', { style: {maxWidth:600,margin:"0 auto",padding:"0 0 80px"}}
            , React.createElement('div', { style: {background:C.bg2,padding:"16px 18px",borderBottom:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10}}
              , React.createElement('div', { style: {fontSize:16,fontWeight:800}}, "🚗 " , T.vehicle)
              , React.createElement('button', { onClick: function(){setSf(null);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:32,height:32,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}, "✕")
            )
            , React.createElement('div', { style: {padding:"16px 14px"}}
              , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:"#90EAF8",marginBottom:10}}, lang==="en"?"Vehicle Info":"车辆基本信息")
              , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:8}}
                , React.createElement(Field, { label: T.carType, value: veh.type, onChange: function(v){setVeh(Object.assign({},veh,{type:v}));}, options: [["",T.pleaseSelect],["petrol",T.petrol],["electric",T.electric],["hybrid",T.hybrid]]} )
                , React.createElement(Field, { label: T.plate, value: veh.plate, onChange: function(v){setVeh(Object.assign({},veh,{plate:v.toUpperCase()}));}, placeholder: "ABC1234"} )
                , React.createElement(Field, { label: "TLC Plate" , value: veh.tlcPlate||"", onChange: function(v){setVeh(Object.assign({},veh,{tlcPlate:v.toUpperCase()}));}, placeholder: "TLC"} )
                , React.createElement(Field, { label: T.brand, value: veh.brand||"", onChange: function(v){setVeh(Object.assign({},veh,{brand:v}));}, options: [["",T.selectBrand]].concat(CARBRANDS.slice(0,-1).map(function(b){return [b,b];}).concat([[lang==="en"?"Other":"其他",lang==="en"?"Other":"其他"]]))} )
              )
              , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:"#90EAF8",marginBottom:10,marginTop:14}}, lang==="en"?"Inspection (every 4 months)":"车辆检验（每4个月）")
              , React.createElement(Field, { label: T.lastInsp, type: "date", value: veh.lastInsp, onChange: function(v){setVeh(Object.assign({},veh,{lastInsp:v}));}} )
              , insW ? React.createElement('div', { style: {background:"#1A1400",border:"1px solid #FFB300",borderRadius:10,padding:"10px 14px",marginTop:8,fontSize:14,color:"#FFB300",fontWeight:700}}, insW.diff < 0 ? (lang==="en"?"Overdue ":"已逾期 ")+Math.abs(insW.diff)+(lang==="en"?" days":" 天") : (lang==="en"?"Next: ":"下次检验：")+fmtDate(insW.next)+(lang==="en"?" ("+insW.diff+" days left)":"（还剩 "+insW.diff+" 天）")) : null
              , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:"#90EAF8",marginBottom:10,marginTop:14}}, lang==="en"?"TLC Insurance":"TLC 商业保险")
              , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:8}}
                , React.createElement(Field, { label: T.insComp, value: veh.insComp||"", onChange: function(v){setVeh(Object.assign({},veh,{insComp:v}));}, placeholder: "Progressive"} )
                , React.createElement(Field, { label: T.insExpiry, type: "date", value: veh.insExpiry||"", onChange: function(v){setVeh(Object.assign({},veh,{insExpiry:v}));}} )
              )
              , React.createElement(Field, { label: "Policy Number" , value: veh.insPolicy||"", onChange: function(v){setVeh(Object.assign({},veh,{insPolicy:v}));}, placeholder: "PA-12345678"} )
              , insExpDiff !== null ? React.createElement('div', { style: {background:"#1A1400",border:"1px solid #00E676",borderRadius:8,padding:"8px 12px",fontSize:14,color:"#00E676",marginTop:8}}, insExpDiff < 0 ? (lang==="en"?"Insurance expired":"保险已过期") : (lang==="en"?"Insurance: "+Math.round(insExpDiff)+" days left":"保险还剩 "+Math.round(insExpDiff)+" 天")) : null
              , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:"#90EAF8",marginBottom:10,marginTop:14}}, lang==="en"?"Financing":"车辆融资")
              , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}
                , React.createElement(Field, { label: T.loanType, value: veh.loanType||"loan", onChange: function(v){setVeh(Object.assign({},veh,{loanType:v}));}, options: [["loan",T.loan],["lease",T.lease],["own",T.own],["rental",T.rental]]} )
                , React.createElement(Field, { label: T.loanAmt, type: "number", value: veh.loanAmt||"", onChange: function(v){setVeh(Object.assign({},veh,{loanAmt:v}));}, placeholder: "0.00"} )
              )
            )
          )
        )
      ) : null

      , sf==="drawer_lic" ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:C.bg,zIndex:300,overflowY:"auto"}}
          , React.createElement('div', { style: {maxWidth:600,margin:"0 auto",padding:"0 0 80px"}}
            , React.createElement('div', { style: {background:C.bg2,padding:"16px 18px",borderBottom:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10}}
              , React.createElement('div', { style: {fontSize:16,fontWeight:800}}, "📋 " , T.license)
              , React.createElement('div', { style: {display:"flex",gap:8,alignItems:"center"}}
                , React.createElement(Btn, { onClick: function(){setLf({type:"",number:"",issueDate:"",expiryDate:"",renewalFee:"",reminderDays:"60",notes:""});setSf("lic");}}, "+ " , T.add)
                , React.createElement('button', { onClick: function(){setSf(null);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:32,height:32,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}, "✕")
              )
            )
            , React.createElement('div', { style: {padding:"16px 14px"}}
              , React.createElement(Card, { style: {background:"#0A1828",border:"1px solid #1A3048",marginBottom:14}}
                , React.createElement('div', { style: {fontSize:14,color:"#90EAF8",fontWeight:700,marginBottom:8}}, lang==="en"?"NYC TLC Renewal":"纽约 TLC 到期提醒")
                , React.createElement('div', { style: {fontSize:13,color:"#CCE8F8",lineHeight:2}}, lang==="en"?"TLC Driver License: every 2 yrs ($252)":"TLC 驾驶执照：每 2年 更新（$252）", React.createElement('br', {__source: {fileName: _jsxFileName, lineNumber: 407}} ), lang==="en"?"FHV Vehicle License: every 1 yr":"TLC 车辆执照 FHV：每 1年 更新", React.createElement('br', {__source: {fileName: _jsxFileName, lineNumber: 407}} ), lang==="en"?"Vehicle Inspection: every 4 months":"车辆检验：每 4个月 一次", React.createElement('br', {__source: {fileName: _jsxFileName, lineNumber: 407}} ), lang==="en"?"DDC Course: every 3 yrs":"DDC 防御驾驶课程：每 3年 一次")
              )
              , ll.length===0 ? React.createElement(Empty, { text: T.noData} ) : ll.map(function(lic){
                var diff=lic.expiryDate?(new Date(lic.expiryDate)-new Date())*0.000011574:null;
                var sc,st;
                if(diff===null){sc="#B0D4E8";st="";}
                else if(diff<0){sc="#FF1744";st=(lang==="en"?"Expired ":"已过期 ")+Math.abs(Math.round(diff))+(lang==="en"?" days ago":" 天");}
                else if(diff<30){sc="#FF5252";st=Math.round(diff)+(lang==="en"?" days left":" 天");}
                else if(diff<60){sc="#FFB300";st=Math.round(diff)+(lang==="en"?" days left":" 天");}
                else{sc="#00E676";st=Math.round(diff)+(lang==="en"?" days left":" 天");}
                return React.createElement(Card, { key: lic.id}, React.createElement('div', { style: {display:"flex",justifyContent:"space-between"}}, React.createElement('div', { style: {flex:1}}, React.createElement('div', { style: {fontSize:14,fontWeight:700,marginBottom:5}}, lic.type), lic.number?React.createElement('div', { style: {fontSize:13,color:C.text}}, lang==="en"?"No: ":"编号: ", lic.number):null, React.createElement('div', { style: {display:"flex",gap:14,marginTop:6,flexWrap:"wrap"}}, lic.issueDate?React.createElement('span', { style: {fontSize:13,color:C.text}}, lang==="en"?"Issued: ":"发出: ", fmtDate(lic.issueDate)):null, lic.expiryDate?React.createElement('span', { style: Object.assign({fontSize:13,fontWeight:600},{color:sc})}, lang==="en"?"Exp: ":"到期: ", fmtDate(lic.expiryDate), " " , st):null), lic.renewalFee?React.createElement('div', { style: {fontSize:13,color:"#FFB300",marginTop:5}}, lang==="en"?"Fee: ":"更新费: ", "$", lic.renewalFee):null), React.createElement('div', { style: {display:"flex",flexDirection:"column",gap:6}}, React.createElement('button', { onClick: function(){setLf(Object.assign({},lic));setSf("lic_edit_"+lic.id);}, style: {background:"none",border:"1px solid #2A4A6A",borderRadius:6,padding:"3px 8px",color:"#6AACEE",cursor:"pointer",fontSize:12}}, T.edit), React.createElement('button', { onClick: function(){setLl(ll.filter(function(x){return x.id!==lic.id;}));}, style: {background:"none",border:"1px solid #3A1A1A",borderRadius:6,padding:"3px 8px",color:"#FF5252",cursor:"pointer",fontSize:12}}, T.del))));
              })
              , React.createElement('div', { style: {marginTop:20}}
                , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:"#90EAF8",marginBottom:10}}, lang==="en"?"Useful Links":"常用网站")
                , LINKS.map(function(sec,si){var isOpen=openSec===si;return React.createElement('div', { key: si, style: {marginBottom:8}}
                  , React.createElement('button', { onClick: function(){setOpenSec(isOpen?null:si);}, style: {width:"100%",background:"#0F1829",border:"1px solid #1A2A44",borderRadius:isOpen?"10px 10px 0 0":10,padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}
                    , React.createElement('div', { style: {display:"flex",alignItems:"center",gap:8}}, React.createElement('span', { style: Object.assign({fontSize:14,fontWeight:700},{color:sec.color})}, sec.title), React.createElement('span', { style: {fontSize:12,color:"#90B4D0"}}, sec.links.length))
                    , React.createElement('span', { style: {color:"#7A9AB8",fontSize:14}}, isOpen?"▼":"▶")
                  )
                  , isOpen ? React.createElement('div', { style: {background:"#0A1020",border:"1px solid #1A2A44",borderRadius:"0 0 10px 10px",borderTop:"none"}}, sec.links.map(function(link,li){return React.createElement('a', { key: li, href: link.url, target: "_blank", rel: "noopener noreferrer" , style: {display:"flex",alignItems:"center",gap:12,padding:"11px 14px",borderBottom:"1px solid #1A2A44",textDecoration:"none"}}, React.createElement('div', { style: {flex:1}}, React.createElement('div', { style: {fontSize:14,fontWeight:600,color:C.text}}, link.label), React.createElement('div', { style: {fontSize:12,color:"#90B4D0",marginTop:2}}, link.desc)), React.createElement('span', { style: {color:"#7A9AB8"}}, ">"));})) : null
                );})
              )
            )
          )
        )
      ) : null

      , sf==="drawer_fixed" ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:C.bg,zIndex:300,overflowY:"auto"}}
          , React.createElement('div', { style: {maxWidth:600,margin:"0 auto",padding:"0 0 80px"}}
            , React.createElement('div', { style: {background:C.bg2,padding:"16px 18px",borderBottom:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10}}
              , React.createElement('div', { style: {fontSize:16,fontWeight:800}}, "📅 " , T.fixedFees)
              , React.createElement('div', { style: {display:"flex",gap:8,alignItems:"center"}}
                , React.createElement(Btn, { onClick: function(){setFf({label:"",icon:"💼",cat:"other",cycle:"monthly",amount:"",day:"1",notes:"",active:true,startDate:"",endDate:"",maxCount:""});setSf("fixed");}}, "+ " , T.add)
                , React.createElement('button', { onClick: function(){setSf(null);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:32,height:32,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}, "✕")
              )
            )
            , React.createElement('div', { style: {padding:"16px 14px"}}
              , fl.length > 0 ? React.createElement(Card, { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}, React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 445}}, React.createElement('div', { style: {fontSize:13,color:C.text,marginBottom:2}}, lang==="en"?"Monthly Fixed Total":"每月固定总支出"), React.createElement('div', { style: {fontSize:12,color:C.text2}}, fl.filter(function(f){return f.active;}).length, " " , lang==="en"?"active":"项启用")), React.createElement('div', { style: {fontSize:22,fontWeight:900,color:"#FF9A65"}}, fmt(totalFix))) : null
              , fl.length===0 ? React.createElement('div', { style: {marginBottom:14}}, React.createElement('div', { style: {fontSize:14,fontWeight:700,color:C.text2,marginBottom:10}}, T.quickAdd), (lang==="en"?FIXSUGG_EN:FIXSUGG_ZH).map(function(sg,i){return React.createElement('button', { key: i, onClick: function(){setFf({label:sg.label,icon:sg.icon,cat:sg.cat,cycle:"monthly",amount:"",day:""+sg.day,notes:"",active:true,startDate:"",endDate:"",maxCount:""});setSf("fixed");}, style: {display:"flex",alignItems:"center",gap:12,width:"100%",background:"#0F1829",border:"1px dashed #2A3A54",borderRadius:10,padding:"10px 14px",cursor:"pointer",textAlign:"left",marginBottom:8}}, React.createElement('span', { style: {fontSize:20}}, sg.icon), React.createElement('span', { style: {fontSize:14,color:C.text}}, sg.label), React.createElement('span', { style: {marginLeft:"auto",color:"#2A5A8A",fontSize:18}}, "+"));}), " " ) : null
              , fl.map(function(f){var monthly=f.cycle==="annual"?Math.round(+f.amount/12*100)/100:+f.amount,activeVal=f.active,cardBorder=activeVal?"#1A3A20":"#2A2A2A";return React.createElement(Card, { key: f.id, style: {border:"1px solid "+cardBorder,opacity:activeVal?1:0.5}}, React.createElement('div', { style: {display:"flex",alignItems:"center",gap:10}}, React.createElement('span', { style: {fontSize:22,flexShrink:0}}, f.icon), React.createElement('div', { style: {flex:1,minWidth:0}}, React.createElement('div', { style: {fontSize:14,fontWeight:700}}, f.label, activeVal?"":" ("+(lang==="en"?"paused":"暂停")+")"), React.createElement('div', { style: {fontSize:12,color:C.text2,marginTop:2}}, lang==="en"?"Day ":"每月 ", f.day, lang==="en"?" ":"日", f.startDate?(lang==="en"?" · from ":" · 从")+f.startDate.slice(0,7):"", f.endDate?(lang==="en"?" · to ":" · 至")+f.endDate.slice(0,7):""), f.cycle==="annual"?React.createElement('div', { style: {fontSize:12,color:"#BAA850"}}, lang==="en"?"Annual":"年费", " " , fmt(+f.amount), " ÷12" ):null), React.createElement('div', { style: {textAlign:"right"}}, React.createElement('div', { style: {fontSize:16,fontWeight:800,color:"#FF9A65",marginBottom:6}}, fmt(monthly), lang==="en"?"/mo":"/月"), React.createElement('div', { style: {display:"flex",gap:6}}, React.createElement('button', { onClick: function(){setFf(Object.assign({},f));setSf("fixed_edit_"+f.id);}, style: {background:"none",border:"1px solid #2A4A6A",borderRadius:6,padding:"3px 8px",color:"#6AACEE",cursor:"pointer",fontSize:12}}, T.edit), React.createElement('button', { onClick: function(){setFl(fl.map(function(x){return x.id===f.id?Object.assign({},x,{active:!x.active}):x;}));}, style: {background:"none",border:"1px solid #2A4A6A",borderRadius:6,padding:"3px 8px",color:"#5ADA7A",cursor:"pointer",fontSize:12}}, activeVal?T.pause:T.resume), React.createElement('button', { onClick: function(){setFl(fl.filter(function(x){return x.id!==f.id;}));}, style: {background:"none",border:"1px solid #3A1A1A",borderRadius:6,padding:"3px 8px",color:"#FF3D00",cursor:"pointer",fontSize:12}}, T.del)))));})
            )
          )
        )
      ) : null

      , sf==="week" ? (
        React.createElement(Modal, { title: T.weekly, onClose: function(){setSf(null);setWf({weekStart:wkMon(today()),platform:"Uber",trips:"",hours:"",onlineHours:"",miles:"",notes:""});}, onSave: function(){if(!wf.trips&&!wf.hours&&!wf.miles)return;var ws=wkMon(wf.weekStart);if(wf.id){setWl(wl.map(function(x){return x.id===wf.id?Object.assign({},wf,{weekStart:ws}):x;}));}else{var ex=wl.find(function(w){return w.weekStart===ws&&w.platform===wf.platform;});if(ex){setWl(wl.map(function(w){return w.id===ex.id?Object.assign({},wf,{weekStart:ws,id:ex.id}):w;}));}else{var nwl=[Object.assign({},wf,{weekStart:ws,id:Date.now()})].concat(wl);setWl(nwl);autoSave({sl:sl,el:el,fl:fl});}}setSf(null);}}
          , React.createElement(Field, { label: T.weekStart, type: "date", value: wf.weekStart, onChange: function(v){setWf(Object.assign({},wf,{weekStart:wkMon(v)}));}} )
          , React.createElement('div', { style: {background:"#0A1020",borderRadius:8,padding:"8px 12px",fontSize:14,color:C.text}}, lang==="en"?"Week: ":"本周：", wkLabel(wf.weekStart))
          , React.createElement(Field, { label: T.platform_lbl, value: wf.platform, onChange: function(v){setWf(Object.assign({},wf,{platform:v}));}, options: allPlat.map(function(p){return [p,p];})} )
          , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}
            , React.createElement(Field, { label: T.trips, type: "number", value: wf.trips, onChange: function(v){setWf(Object.assign({},wf,{trips:v}));}, placeholder: "0"} )
            , React.createElement(Field, { label: lang==="en"?"Drive (h)":"行驶时长(h)", type: "number", value: wf.hours, onChange: function(v){setWf(Object.assign({},wf,{hours:v}));}, placeholder: "0"} )
            , React.createElement(Field, { label: T.onlineHours+" (h)", type: "number", value: wf.onlineHours, onChange: function(v){setWf(Object.assign({},wf,{onlineHours:v}));}, placeholder: "0"} )
            , React.createElement(Field, { label: T.miles+" (mi)", type: "number", value: wf.miles, onChange: function(v){setWf(Object.assign({},wf,{miles:v}));}, placeholder: "0"} )
          )
        )
      ) : null

      , sf==="stmt" ? (
        React.createElement(Modal, { title: stf.id?T.edit+" "+T.monthly:T.monthly, onClose: function(){setSf(null);}, onSave: function(){if(!stf.grossFare)return;if(stf.id){var nsl2=sl.map(function(x){return x.id===stf.id?Object.assign({},stf):x;});setSl(nsl2);autoSave({sl:nsl2});}else{var ex=sl.find(function(x){return x.month===stf.month&&x.platform===stf.platform;});if(ex){setSl(sl.map(function(x){return x.id===ex.id?Object.assign({},stf,{id:ex.id}):x;}));}else{setSl([Object.assign({},stf,{id:Date.now()})].concat(sl));}}setSf(null);}}
          , React.createElement(Field, { label: T.month_lbl, type: "month", value: stf.month, onChange: function(v){setStf(Object.assign({},stf,{month:v}));}} )
          , React.createElement(Field, { label: T.platform_lbl, value: stf.platform, onChange: function(v){setStf(Object.assign({},stf,{platform:v}));}, options: allPlat.map(function(p){return [p,p];})} )
          , React.createElement(Field, { label: T.grossFare+" ($)", type: "number", value: stf.grossFare, onChange: function(v){setStf(Object.assign({},stf,{grossFare:v}));}, placeholder: "0.00"} )
          , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}
            , React.createElement(Field, { label: T.tips+" ($)", type: "number", value: stf.tips, onChange: function(v){setStf(Object.assign({},stf,{tips:v}));}, placeholder: "0.00"} )
            , React.createElement(Field, { label: T.bonus+" ($)", type: "number", value: stf.bonus, onChange: function(v){setStf(Object.assign({},stf,{bonus:v}));}, placeholder: "0.00"} )
          )
          , React.createElement(Field, { label: T.toll+" ($)", type: "number", value: stf.tollReimbursed, onChange: function(v){setStf(Object.assign({},stf,{tollReimbursed:v}));}, placeholder: "0.00"} )
          , React.createElement(Field, { label: T.otherIncome+" ($)", type: "number", value: stf.otherIncome, onChange: function(v){setStf(Object.assign({},stf,{otherIncome:v}));}, placeholder: "0.00"} )
          , React.createElement('div', { style: {borderTop:"1px solid #1A2A40",paddingTop:14}}
            , React.createElement('div', { style: {fontSize:13,color:"#90B4D0",marginBottom:12}}, lang==="en"?"Operations (optional)":"运营数据（可选）")
            , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}
              , React.createElement(Field, { label: T.trips, type: "number", value: stf.trips||"", onChange: function(v){setStf(Object.assign({},stf,{trips:v}));}, placeholder: "0"} )
              , React.createElement(Field, { label: T.onlineHours+" (h)", type: "number", value: stf.onlineHours||"", onChange: function(v){setStf(Object.assign({},stf,{onlineHours:v}));}, placeholder: "0"} )
              , React.createElement(Field, { label: T.miles+" (mi)", type: "number", value: stf.miles||"", onChange: function(v){setStf(Object.assign({},stf,{miles:v}));}, placeholder: "0"} )
            )
          )
          , React.createElement(Field, { label: T.notes, value: stf.notes||"", onChange: function(v){setStf(Object.assign({},stf,{notes:v}));}, placeholder: T.optional} )
        )
      ) : null

      , sf && (sf==="exp" || sf.startsWith("exp_edit_")) ? (
        React.createElement(Modal, { title: sf.startsWith("exp_edit_")?(T.edit+" "+(lang==="en"?"Expense":"支出")):(lang==="en"?"Add Expense":"添加支出"), onClose: function(){setSf(null);}, onSave: function(){if(!ef.amount)return;if(sf.startsWith("exp_edit_")){var eid=+sf.replace("exp_edit_","");setEl(el.map(function(x){return x.id===eid?Object.assign({},ef,{id:eid}):x;}));}else if(ef.isRecurring){setFl(fl.concat([{id:Date.now(),label:allC[ef.category]?allC[ef.category].label:ef.notes||"Fixed",icon:allC[ef.category]?allC[ef.category].icon:"💼",cat:ef.category,cycle:"monthly",amount:ef.amount,day:new Date().getDate()+"",notes:ef.notes,active:true,startDate:"",endDate:"",maxCount:""}]));}else{var nel=[Object.assign({},ef,{id:Date.now()})].concat(el);setEl(nel);autoSave({el:nel});}setSf(null);}}
          , React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 492}}
            , React.createElement('div', { style: {fontSize:14,color:C.text2,marginBottom:8,fontWeight:500}}, lang==="en"?"Category Group":"支出大类")
            , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,marginBottom:14}}
              , [["车辆","&#128663;","#00D4FF","Vehicle"],["牌照","&#128203;","#FFD700","License"],["平台","&#128241;","#AB47BC","Platform"],["其他","&#128188;","#B0D4E8","Other"]].map(function(gb){
                var isA=selGrp===gb[0],bdCol=isA?gb[2]:"#243550",bgCol=isA?"#0A2040":"#0F1829",textCol=isA?gb[2]:C.text2,fw=isA?700:400;
                var lbl=lang==="en"?gb[3]:gb[0];
                return React.createElement('button', { key: gb[0], onClick: function(){setSelGrp(gb[0]);var first=Object.entries(allC).find(function(e){return e[1].g===gb[0];});if(first)setEf(Object.assign({},ef,{category:first[0]}));}, style: {padding:"8px 4px",borderRadius:10,border:"2px solid "+bdCol,background:bgCol,color:textCol,fontSize:12,fontWeight:fw,cursor:"pointer",textAlign:"center"}}
                  , React.createElement('div', { style: {fontSize:18,marginBottom:2}, dangerouslySetInnerHTML: {__html:gb[1]}} ), React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 499}}, lbl)
                );
              })
            )
            , React.createElement('div', { style: {display:"flex",gap:8,alignItems:"center"}}
              , React.createElement('select', { value: ef.category, onChange: function(e){setEf(Object.assign({},ef,{category:e.target.value}));}, style: Object.assign({},IS,{flex:1})}
                , Object.entries(allC).filter(function(e){if(veh.type==="electric"&&e[0]==="fuel")return false;if(veh.type==="petrol"&&e[0]==="charging")return false;return e[1].g===selGrp;}).map(function(e){return React.createElement('option', { key: e[0], value: e[0]}, e[1].icon, " " , e[1].label);})
              )
              , React.createElement('button', { onClick: function(){setCf({label:"",icon:"&#128296;",group:selGrp,_returnTo:"exp"});setSf("cc");}, style: {flexShrink:0,width:44,height:44,borderRadius:10,border:"2px dashed #2A4A6A",background:"#0A1828",color:"#6AACEE",fontSize:22,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}, "+")
            )
          )
          , (function(){var c=allC[ef.category],isMo=c&&c.mo;if(isMo){return React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 510}}, React.createElement('div', { style: {background:"#0A1428",border:"1px solid #1A3060",borderRadius:10,padding:"10px 13px",fontSize:14,color:"#5AACFF",marginBottom:8}}, lang==="en"?"Monthly billing item":"月结项目"), React.createElement(Field, { label: lang==="en"?"Billing Month":"账单月份", type: "month", value: ef.statementMonth, onChange: function(v){setEf(Object.assign({},ef,{statementMonth:v}));}} ));}return React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 510}}, React.createElement('div', { style: {fontSize:14,color:C.text2,marginBottom:8,fontWeight:500}}, T.date+" & "+T.time), React.createElement('input', { type: "date", value: ef.date, onChange: function(e){setEf(Object.assign({},ef,{date:e.target.value}));}, style: Object.assign({},IS,{marginBottom:8})} ), React.createElement('input', { type: "time", value: ef.time, onChange: function(e){setEf(Object.assign({},ef,{time:e.target.value}));}, style: IS} ));}())
          , React.createElement(Field, { label: T.amount, type: "number", value: ef.amount, onChange: function(v){setEf(Object.assign({},ef,{amount:v}));}, placeholder: "0.00"} )
          , ef.category==="fuel" ? React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 512}}, React.createElement(Field, { label: lang==="en"?"Gallons (Gal)":"加油加仑 (Gal)", type: "number", value: ef.qty, onChange: function(v){setEf(Object.assign({},ef,{qty:v}));}, placeholder: "0.0"} ), ef.amount&&ef.qty&&+ef.qty>0?React.createElement('div', { style: {background:"#0A1828",border:"1px solid #1A3048",borderRadius:10,padding:"10px 14px",display:"flex",justifyContent:"space-between"}}, React.createElement('span', { style: {fontSize:14,color:C.text2}}, lang==="en"?"Per Gallon":"每加仑"), React.createElement('span', { style: {fontSize:17,fontWeight:800,color:"#FFD700"}}, fmt(+ef.amount/+ef.qty), "/Gal")):null) : null
          , ef.category==="charging" ? React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 513}}, React.createElement(Field, { label: lang==="en"?"Energy (kWh)":"充电度数 (kWh)", type: "number", value: ef.qty, onChange: function(v){setEf(Object.assign({},ef,{qty:v}));}, placeholder: "0"} ), ef.amount&&ef.qty&&+ef.qty>0?React.createElement('div', { style: {background:"#0A1828",border:"1px solid #1A3048",borderRadius:10,padding:"10px 14px",display:"flex",justifyContent:"space-between"}}, React.createElement('span', { style: {fontSize:14,color:C.text2}}, lang==="en"?"Per kWh":"每度电"), React.createElement('span', { style: {fontSize:17,fontWeight:800,color:"#FFD700"}}, fmt(+ef.amount/+ef.qty), "/kWh")):null) : null
          , React.createElement(Field, { label: T.notes, value: ef.notes, onChange: function(v){setEf(Object.assign({},ef,{notes:v}));}, placeholder: T.optional} )
          , React.createElement('div', { onClick: function(){setEf(Object.assign({},ef,{isRecurring:!ef.isRecurring}));}, style: {display:"flex",alignItems:"center",gap:12,background:"#0F1829",border:"1px solid #243550",borderRadius:10,padding:"12px 14px",cursor:"pointer"}}
            , React.createElement('div', { style: {width:24,height:24,borderRadius:6,background:"#1A2A44",border:"2px solid #2A4A6A",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}, ef.isRecurring?"✓":"")
            , React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 517}}, React.createElement('div', { style: {fontSize:14,fontWeight:600,color:C.text}}, T.fixedMonthly), React.createElement('div', { style: {fontSize:12,color:"#90B4D0",marginTop:2}}, T.fixedMonthlyDesc))
          )
        )
      ) : null

      , sf && (sf==="fixed" || sf.startsWith("fixed_edit_")) ? (
        React.createElement(Modal, { title: sf.startsWith("fixed_edit_")?(T.edit+" "+(lang==="en"?"Fixed":"固定")):(lang==="en"?"Add Fixed":"添加固定支出"), onClose: function(){setSf(null);}, onSave: function(){if(!ff.label||!ff.amount)return;if(sf.startsWith("fixed_edit_")){var eid=+sf.replace("fixed_edit_","");setFl(fl.map(function(x){return x.id===eid?Object.assign({},ff,{id:eid}):x;}));}else{var nfl=fl.concat([Object.assign({},ff,{id:Date.now(),active:true})]);setFl(nfl);autoSave({fl:nfl});}setSf(null);}}
          , React.createElement(Field, { label: lang==="en"?"Name":"项目名称", value: ff.label, onChange: function(v){setFf(Object.assign({},ff,{label:v}));}, placeholder: lang==="en"?"e.g. Car Loan":"例：车贷、手机费"} )
          , React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 525}}, React.createElement('div', { style: {fontSize:14,color:C.text2,marginBottom:8}}, lang==="en"?"Icon":"图标"), React.createElement('div', { style: {display:"flex",flexWrap:"wrap",gap:5}}, ICONS.map(function(ic){var bdCol=ff.icon===ic?"#00D4FF":"#1A2A44",bgCol=ff.icon===ic?"#0A2040":"#111D30";return React.createElement('button', { key: ic, onClick: function(){setFf(Object.assign({},ff,{icon:ic}));}, style: {width:38,height:38,borderRadius:8,border:"2px solid "+bdCol,background:bgCol,fontSize:16,cursor:"pointer"}}, ic);}), " " ))
          , React.createElement('div', { style: {display:"flex",background:"#0A1020",borderRadius:10,padding:3,gap:3}}, [["monthly",T.cycleMonthly],["annual",T.cycleAnnual]].map(function(v){var isA=ff.cycle===v[0],bg=isA?"#1A3060":"transparent",cl=isA?"#00D4FF":C.text2,fw=isA?700:400;return React.createElement('button', { key: v[0], onClick: function(){setFf(Object.assign({},ff,{cycle:v[0]}));}, style: {flex:1,padding:8,borderRadius:8,border:"none",background:bg,color:cl,fontSize:13,cursor:"pointer",fontWeight:fw}}, v[1]);}), " " )
          , React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 527}}, React.createElement(Field, { label: ff.cycle==="annual"?(lang==="en"?"Annual Total ($)":"全年总金额 ($)"):(lang==="en"?"Monthly ($)":"每月金额 ($)"), type: "number", value: ff.amount, onChange: function(v){setFf(Object.assign({},ff,{amount:v}));}, placeholder: "0.00"} ), ff.cycle==="annual"&&+ff.amount>0?React.createElement('div', { style: {marginTop:6,background:"#1A2A10",border:"1px solid #2A4A20",borderRadius:8,padding:"8px 12px",display:"flex",justifyContent:"space-between"}}, React.createElement('span', { style: {fontSize:13,color:"#8AAA70"}}, lang==="en"?"Per Month":"每月计入"), React.createElement('span', { style: {fontSize:15,fontWeight:800,color:"#FFD700"}}, fmt(Math.round(+ff.amount/12*100)/100), lang==="en"?"/mo":"/月")):null)
          , React.createElement(Field, { label: T.dayOfMonth, value: ff.day, onChange: function(v){setFf(Object.assign({},ff,{day:v}));}, options: (function(){var o=[];for(var i=1;i<=28;i++){o.push([""+i,(lang==="en"?"Day ":"每月 ")+i+(lang==="en"?"":"日")]);}return o;})()} )
          , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}
            , React.createElement(Field, { label: T.startMonth, type: "month", value: ff.startDate||"", onChange: function(v){setFf(Object.assign({},ff,{startDate:v}));}} )
            , React.createElement(Field, { label: T.endMonth, type: "month", value: ff.endDate||"", onChange: function(v){setFf(Object.assign({},ff,{endDate:v}));}} )
          )
          , React.createElement(Field, { label: T.category, value: ff.cat, onChange: function(v){setFf(Object.assign({},ff,{cat:v}));}, options: Object.entries(allC).map(function(e){return [e[0],e[1].label];})} )
        )
      ) : null

      , sf && (sf==="lic" || sf.startsWith("lic_edit_")) ? (
        React.createElement(Modal, { title: sf.startsWith("lic_edit_")?(T.edit+" "+(lang==="en"?"License":"执照")):(lang==="en"?"Add License":"添加执照/证件"), onClose: function(){setSf(null);}, onSave: function(){if(!lf.type)return;if(sf.startsWith("lic_edit_")){var lid=+sf.replace("lic_edit_","");setLl(ll.map(function(x){return x.id===lid?Object.assign({},lf,{id:lid}):x;}));}else{setLl([Object.assign({},lf,{id:Date.now()})].concat(ll));}setSf(null);}}
          , React.createElement(Field, { label: T.licType, value: lf.type, onChange: function(v){setLf(Object.assign({},lf,{type:v}));}, options: [["",T.pleaseSelect]].concat(LICTYPES.map(function(l){return [l,l];}))} )
          , React.createElement(Field, { label: T.licNum, value: lf.number, onChange: function(v){setLf(Object.assign({},lf,{number:v}));}, placeholder: lang==="en"?"Optional":"编号（可选）"} )
          , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}
            , React.createElement(Field, { label: T.issueDate, type: "date", value: lf.issueDate, onChange: function(v){setLf(Object.assign({},lf,{issueDate:v}));}} )
            , React.createElement(Field, { label: T.expiryDate, type: "date", value: lf.expiryDate, onChange: function(v){setLf(Object.assign({},lf,{expiryDate:v}));}} )
          )
          , React.createElement(Field, { label: T.renewalFee, type: "number", value: lf.renewalFee, onChange: function(v){setLf(Object.assign({},lf,{renewalFee:v}));}, placeholder: "0.00"} )
          , React.createElement(Field, { label: T.reminderDays, value: lf.reminderDays||"60", onChange: function(v){setLf(Object.assign({},lf,{reminderDays:v}));}, options: [["30",T.days30],["60",T.days60],["90",T.days90],["180",T.days180]]} )
        )
      ) : null

      , sf==="cc" ? (
        React.createElement(Modal, { title: cf._editKey?(lang==="en"?"Edit Category":"编辑类别"):(lang==="en"?"Add Category":"添加类别"), onClose: function(){setSf(cf._returnTo||null);}, onSave: function(){if(!cf.label.trim())return;var key=cf._editKey||"cc_"+Date.now(),newCat={label:cf.label.trim(),icon:cf.icon,group:cf.group,g:cf.group},newCc=Object.assign({},cc);newCc[key]=newCat;setCc(newCc);if(cf._returnTo==="exp"){setEf(Object.assign({},ef,{category:key}));setSelGrp(cf.group);setSf("exp");}else{setSf(null);}}}
          , React.createElement(Field, { label: lang==="en"?"Name":"类别名称", value: cf.label, onChange: function(v){setCf(Object.assign({},cf,{label:v}));}, placeholder: lang==="en"?"e.g. Wheel Repair":"例：轮毂修复"} )
          , React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 553}}, React.createElement('div', { style: {fontSize:14,color:C.text2,marginBottom:8}}, lang==="en"?"Icon":"图标"), React.createElement('div', { style: {display:"flex",flexWrap:"wrap",gap:5}}, ICONS.map(function(ic){var bdCol=cf.icon===ic?"#00D4FF":"#1A2A44",bgCol=cf.icon===ic?"#0A2040":"#111D30";return React.createElement('button', { key: ic, onClick: function(){setCf(Object.assign({},cf,{icon:ic}));}, style: {width:38,height:38,borderRadius:8,border:"2px solid "+bdCol,background:bgCol,fontSize:16,cursor:"pointer"}}, ic);}), " " ))
          , React.createElement(Field, { label: lang==="en"?"Group":"归属大类", value: cf.group, onChange: function(v){setCf(Object.assign({},cf,{group:v}));}, options: GROUPS.map(function(g){return [g,g];})} )
        )
      ) : null

      , editFx ? (
        React.createElement(Modal, { title: (lang==="en"?"Edit: ":"编辑：")+editFx.fixedLabel, onClose: function(){setEditFx(null);}, onSave: function(){setEl(el.map(function(x){return x.id===editFx.id?Object.assign({},x,{amount:editFx.amount,notes:editFx.notes}):x;}));setEditFx(null);}}
          , React.createElement(Field, { label: T.amount, type: "number", value: editFx.amount, onChange: function(v){setEditFx(Object.assign({},editFx,{amount:v}));}, placeholder: "0.00"} )
          , React.createElement(Field, { label: T.notes, value: editFx.notes, onChange: function(v){setEditFx(Object.assign({},editFx,{notes:v}));}, placeholder: T.optional} )
          , React.createElement('div', { style: {fontSize:13,color:"#90B4D0",background:"#0A1428",borderRadius:8,padding:"10px 12px"}}, lang==="en"?"Only edits this month, does not affect other months":"只修改本月这一笔，不影响其他月份")
        )
      ) : null

      , showDrawer ? (
        React.createElement('div', { style: {position:"fixed",inset:0,zIndex:400,display:"flex"}}
          , React.createElement('div', { style: {width:"60%",maxWidth:220,background:C.bg2,height:"100%",overflowY:"auto",borderRight:"1px solid "+C.border,display:"flex",flexDirection:"column"}}
            , React.createElement('div', { style: {padding:"20px 18px 16px",borderBottom:"1px solid "+C.border}}
              , React.createElement('div', { style: {fontSize:15,fontWeight:800,color:C.text}}, T.menu)
              , React.createElement('div', { style: {fontSize:11,color:C.text3,marginTop:2}}, "NYC RIDESHARE TRACKER · v1.0.0"    )
            )
            , React.createElement('div', { style: {padding:"10px 0",flex:1}}
              , [{icon:"&#128663;",label:T.vehicle,action:function(){setShowDrawer(false);setSf("drawer_veh");}},{icon:"&#128203;",label:T.license,action:function(){setShowDrawer(false);setSf("drawer_lic");}},{icon:"&#128197;",label:T.fixedFees,action:function(){setShowDrawer(false);setSf("drawer_fixed");}},{icon:"&#128276;",label:T.reminder,action:function(){setShowDrawer(false);setShowRemMgr(true);}},{icon:"&#128241;",label:T.platform,action:function(){setShowDrawer(false);setShowPlatMgr(true);}},{icon:"&#128190;",label:T.backup,action:function(){setShowDrawer(false);setShowBackup(true);}},].map(function(item,i){return React.createElement('button', { key: i, onClick: item.action, style: {display:"flex",alignItems:"center",gap:14,width:"100%",background:"none",border:"none",padding:"14px 18px",cursor:"pointer",textAlign:"left",borderBottom:"1px solid "+C.border}}, React.createElement('span', { style: {fontSize:20}, dangerouslySetInnerHTML: {__html:item.icon}} ), React.createElement('span', { style: {fontSize:14,color:C.text,fontWeight:600}}, item.label), React.createElement('span', { style: {marginLeft:"auto",color:C.text3,fontSize:16}}, ">"));})
            )
          )
          , React.createElement('div', { style: {flex:1,background:"rgba(0,0,0,0.6)"}, onClick: function(){setShowDrawer(false);}} )
        )
      ) : null

      , showGoal ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300,padding:20}}
          , React.createElement('div', { style: {background:C.bg2,borderRadius:16,padding:24,width:"100%",maxWidth:320,border:"1px solid "+C.border}}
            , React.createElement('div', { style: {fontSize:16,fontWeight:800,marginBottom:16}}, "🎯 " , lang==="en"?"Monthly Income Goal":"本月收入目标")
            , React.createElement('input', { type: "number", value: incGoal, onChange: function(e){setIncGoal(e.target.value);}, placeholder: lang==="en"?"e.g. 5000":"例：5000", style: Object.assign({},IS,{fontSize:20,fontWeight:700,marginBottom:16})} )
            , React.createElement('div', { style: {display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}, ["3000","4000","5000","6000","7000","8000"].map(function(v){return React.createElement('button', { key: v, onClick: function(){setIncGoal(v);}, style: {background:incGoal===v?"#1A3060":"#0A1828",border:"1px solid "+(incGoal===v?"#00D4FF":"#2A3A54"),borderRadius:8,padding:"6px 12px",color:incGoal===v?"#00D4FF":C.text2,fontSize:13,cursor:"pointer"}}, "$", v);}))
            , React.createElement('div', { style: {display:"flex",gap:10}}, React.createElement('button', { onClick: function(){setIncGoal("");setShowGoal(false);}, style: {flex:1,background:"#1E3050",border:"none",borderRadius:10,padding:12,color:C.text2,fontSize:14,cursor:"pointer"}}, lang==="en"?"Clear":"清除"), React.createElement('button', { onClick: function(){setShowGoal(false);}, style: {flex:2,background:"linear-gradient(135deg,#00D4FF,#0055FF)",border:"none",borderRadius:10,padding:12,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}}, "✓ " , lang==="en"?"Save":"保存"))
          )
        )
      ) : null

      , sf==="notes" ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:C.bg,zIndex:300,overflowY:"auto"}}
          , React.createElement('div', { style: {maxWidth:600,margin:"0 auto",padding:"0 0 80px"}}
            , React.createElement('div', { style: {background:C.bg2,padding:"16px 18px",borderBottom:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10}}
              , React.createElement('button', { onClick: function(){setSf(null);setNoteEdit(false);setNoteF({title:"",body:"",id:null});}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}, "✕")
              , React.createElement('div', { style: {fontSize:16,fontWeight:800}}, "📝 " , lang==="en"?"Notes":"记事本")
              , React.createElement('button', { onClick: function(){setNoteF({title:"",body:"",id:null});setNoteEdit(true);}, style: {background:"linear-gradient(135deg,#00D4FF,#0055FF)",border:"none",color:"#fff",fontSize:18,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}, "+")
            )
            , React.createElement('div', { style: {padding:"16px 14px"}}
              , noteEdit ? React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 601}}
                , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}
                  , React.createElement('div', { style: {fontSize:14,fontWeight:700}}, noteF.id?(lang==="en"?"Edit":"编辑"):(lang==="en"?"New Note":"新建"))
                  , React.createElement('div', { style: {display:"flex",gap:8}}
                    , React.createElement('button', { onClick: function(){setNoteEdit(false);setNoteF({title:"",body:"",id:null});}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:13,cursor:"pointer",padding:"6px 12px",borderRadius:8}}, lang==="en"?"Cancel":"取消")
                    , React.createElement('button', { onClick: function(){if(!noteF.body.trim())return;var now=new Date().toLocaleDateString();if(noteF.id){setNotes(notes.map(function(n){return n.id===noteF.id?Object.assign({},n,{title:noteF.title,body:noteF.body,updated:now}):n;}));}else{setNotes([{id:Date.now(),title:noteF.title,body:noteF.body,date:now,updated:now}].concat(notes));}setNoteEdit(false);setNoteF({title:"",body:"",id:null});}, style: {background:"linear-gradient(135deg,#00D4FF,#0055FF)",border:"none",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",padding:"6px 12px",borderRadius:8}}, "✓ " , lang==="en"?"Save":"保存")
                  )
                )
                , React.createElement('input', { value: noteF.title, onChange: function(e){setNoteF(Object.assign({},noteF,{title:e.target.value}));}, placeholder: lang==="en"?"Title (optional)":"标题（可选）", style: Object.assign({},IS,{marginBottom:10,fontSize:15,fontWeight:600})} )
                , React.createElement('textarea', { value: noteF.body, onChange: function(e){setNoteF(Object.assign({},noteF,{body:e.target.value}));}, placeholder: lang==="en"?"Write your note...":"写下你的记事...", rows: 10, style: Object.assign({},IS,{resize:"vertical",lineHeight:1.7,fontSize:14})} )
              ) : React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 611}}
                , notes.length===0 ? React.createElement('div', { style: {textAlign:"center",padding:40,color:C.text3}}, React.createElement('div', { style: {fontSize:40,marginBottom:12}}, "📝"), React.createElement('div', { style: {fontSize:14}}, lang==="en"?"No notes yet":"还没有记事")) : notes.map(function(n){return React.createElement(Card, { key: n.id, style: {marginBottom:10,cursor:"pointer"}, onClick: function(){setNoteF({title:n.title,body:n.body,id:n.id});setNoteEdit(true);}}, React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}, React.createElement('div', { style: {flex:1,minWidth:0}}, n.title?React.createElement('div', { style: {fontSize:14,fontWeight:700,marginBottom:4}}, n.title):null, React.createElement('div', { style: {fontSize:13,color:C.text2,lineHeight:1.5}}, n.body.slice(0,120), n.body.length>120?"...":""), React.createElement('div', { style: {fontSize:11,color:C.text3,marginTop:6}}, n.updated||n.date)), React.createElement('button', { onClick: function(e){e.stopPropagation();setNotes(notes.filter(function(x){return x.id!==n.id;}));}, style: {background:"none",border:"none",color:"#FF5252",fontSize:16,cursor:"pointer",padding:"0 0 0 10px"}}, "✕")));})
              )
            )
          )
        )
      ) : null

      , sf==="manage_cats" ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:C.bg,zIndex:300,overflowY:"auto"}}
          , React.createElement('div', { style: {maxWidth:600,margin:"0 auto",padding:"0 0 80px"}}
            , React.createElement('div', { style: {background:C.bg2,padding:"16px 18px",borderBottom:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10}}
              , React.createElement('button', { onClick: function(){setSf(null);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}, "✕")
              , React.createElement('div', { style: {fontSize:16,fontWeight:800}}, "🗂 " , lang==="en"?"Categories":"支出类别")
              , React.createElement('button', { onClick: function(){if(!newGrpName)return;setCustGroups(custGroups.concat([{name:newGrpName,icon:newGrpIcon||"📁",color:newGrpColor||"#A8D0E8"}]));setNewGrpName("");setNewGrpIcon("📁");setNewGrpColor("#A8D0E8");}, style: {background:"linear-gradient(135deg,#00D4FF,#0055FF)",border:"none",color:"#fff",fontSize:20,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}, "✓")
            )
            , React.createElement('div', { style: {padding:"16px 14px"}}
              , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:"#90EAF8",marginBottom:10}}, lang==="en"?"Default Groups":"默认大类")
              , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}, [["🚗",lang==="en"?"Vehicle":"车辆","#00D4FF"],["📋",lang==="en"?"License":"牌照","#FFD700"],["📱",lang==="en"?"Platform":"平台","#CC88FF"],["💼",lang==="en"?"Other":"其他","#B0D4E8"]].map(function(g,i){return React.createElement('div', { key: i, style: {background:"#0F1829",border:"1px solid #2A3A54",borderRadius:10,padding:"10px 12px",display:"flex",alignItems:"center",gap:8}}, React.createElement('span', { style: {fontSize:20}}, g[0]), React.createElement('span', { style: Object.assign({fontSize:13,fontWeight:700},{color:g[2]})}, g[1]), React.createElement('span', { style: {marginLeft:"auto",fontSize:10,color:"#6A8AAA"}}, lang==="en"?"built-in":"内置"));}))
              , React.createElement('div', { style: {borderTop:"1px solid "+C.border,paddingTop:14,marginBottom:12}}
                , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:"#90EAF8",marginBottom:12}}, lang==="en"?"Custom Categories":"自定义小类")
                , Object.keys(cc).length===0 ? React.createElement('div', { style: {fontSize:13,color:C.text3,textAlign:"center",padding:12}}, lang==="en"?"No custom categories":"还没有自定义小类") : Object.entries(cc).map(function(e){var key=e[0],cat=e[1];return React.createElement(Card, { key: key, style: {display:"flex",alignItems:"center",gap:12,marginBottom:8}}, React.createElement('span', { style: {fontSize:22}}, cat.icon), React.createElement('div', { style: {flex:1}}, React.createElement('div', { style: {fontSize:14,fontWeight:600}}, cat.label), React.createElement('div', { style: {fontSize:12,color:C.text3}}, cat.group)), React.createElement('button', { onClick: function(){setCf({label:cat.label,icon:cat.icon,group:cat.group,_editKey:key,_returnTo:"manage_cats"});setSf("cc");}, style: {background:"none",border:"1px solid #2A4A6A",borderRadius:6,padding:"3px 8px",color:"#6AACEE",cursor:"pointer",fontSize:12,marginRight:4}}, T.edit), React.createElement('button', { onClick: function(){var u=Object.assign({},cc);delete u[key];setCc(u);}, style: {background:"none",border:"1px solid #3A1A1A",borderRadius:6,padding:"3px 8px",color:"#FF5252",cursor:"pointer",fontSize:12}}, T.del));})
                , React.createElement('button', { onClick: function(){setCf({label:"",icon:"🔧",group:"车辆",_returnTo:"manage_cats"});setSf("cc");}, style: {width:"100%",background:"#1A2A44",border:"1px dashed #2A3A54",borderRadius:10,padding:"12px",color:C.text2,fontSize:14,cursor:"pointer",marginTop:8}}, "+ " , lang==="en"?"Add Custom Category":"添加自定义小类")
              )
              , React.createElement('div', { style: {borderTop:"1px solid "+C.border,paddingTop:14}}
                , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:"#90EAF8",marginBottom:12}}, lang==="en"?"Custom Groups":"自定义大类")
                , custGroups.map(function(g,i){return React.createElement(Card, { key: i, style: {display:"flex",alignItems:"center",gap:12,marginBottom:8}}, React.createElement('span', { style: {fontSize:22}}, g.icon), React.createElement('div', { style: {flex:1}}, React.createElement('div', { style: {fontSize:14,fontWeight:700}}, g.name)), React.createElement('button', { onClick: function(){setCustGroups(custGroups.filter(function(_,j){return j!==i;}));}, style: {background:"none",border:"1px solid #3A1A1A",borderRadius:6,padding:"3px 10px",color:"#FF5252",cursor:"pointer",fontSize:12}}, T.del));})
                , custGroups.length===0 ? React.createElement('div', { style: {fontSize:13,color:C.text3,textAlign:"center",padding:12}}, lang==="en"?"No custom groups":"还没有自定义大类") : null
                , React.createElement(Field, { label: lang==="en"?"Group Name":"大类名称", value: newGrpName||"", onChange: function(v){setNewGrpName(v);}, placeholder: lang==="en"?"e.g. Family":"例：家庭"} )
                , React.createElement('div', { style: {marginTop:10,marginBottom:10}}, React.createElement('div', { style: {fontSize:13,color:C.text2,marginBottom:8}}, lang==="en"?"Icon":"图标"), React.createElement('div', { style: {display:"flex",flexWrap:"wrap",gap:6}}, ["🏠","👨‍👩‍👧","🐕","🎓","💊","🏋️","🎮","✈️","🛒","💡","📦","🎵","🍕","👔","💻"].map(function(ic){var sel=newGrpIcon===ic;return React.createElement('button', { key: ic, onClick: function(){setNewGrpIcon(ic);}, style: {width:38,height:38,borderRadius:8,border:"2px solid "+(sel?"#00D4FF":"#1E3050"),background:sel?"#0A2040":"#162338",fontSize:18,cursor:"pointer"}}, ic);})))
                , React.createElement('div', { style: {marginBottom:12}}, React.createElement('div', { style: {fontSize:13,color:C.text2,marginBottom:8}}, lang==="en"?"Color":"颜色"), React.createElement('div', { style: {display:"flex",gap:8,flexWrap:"wrap"}}, ["#00D4FF","#00E676","#FFD700","#FF9A65","#CC88FF","#FF5252","#45B7D1","#A8D0E8"].map(function(cl){var sel=newGrpColor===cl;return React.createElement('button', { key: cl, onClick: function(){setNewGrpColor(cl);}, style: {width:32,height:32,borderRadius:16,background:cl,border:sel?"3px solid #fff":"3px solid transparent",cursor:"pointer"}} );})))
              )
            )
          )
        )
      ) : null

      , sf==="tax_center" ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:C.bg,zIndex:300,overflowY:"auto"}}
          , React.createElement('div', { style: {maxWidth:600,margin:"0 auto",padding:"0 0 80px"}}
            , React.createElement('div', { style: {background:C.bg2,padding:"16px 18px",borderBottom:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10}}
              , React.createElement('button', { onClick: function(){setSf(null);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}, "✕")
              , React.createElement('div', { style: {fontSize:16,fontWeight:800}}, "🧾 " , lang==="en"?"Tax Center":"税务中心")
              , React.createElement('select', { value: taxYr, onChange: function(e){setTaxYr(e.target.value);}, style: {background:"#1E3050",border:"1px solid #2A4060",borderRadius:8,color:"#00D4FF",fontSize:13,fontWeight:700,padding:"4px 8px",cursor:"pointer"}}
                , (function(){var opts=[];for(var y=new Date().getFullYear();y>=2020;y--){opts.push(React.createElement('option', { key: y, value: ""+y}, y));}return opts;})()
              )
            )
            , React.createElement('div', { style: {padding:"16px 14px"}}
              , React.createElement(Card, { style: {background:"#1A1000",border:"1px solid #3A2800",marginBottom:12}}, React.createElement('div', { style: {fontSize:13,color:"#FFB300",fontWeight:700,marginBottom:6}}, "⚠️ " , lang==="en"?"Estimate only":"仅供参考"), React.createElement('div', { style: {fontSize:12,color:"#9A7A40"}}, lang==="en"?"Consult a tax professional for accurate filing":"请咨询会计师进行准确报税"))
              , React.createElement(Card, { style: {marginBottom:12,padding:"12px 14px"}}
                , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center"}}
                  , React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 662}}, React.createElement('div', { style: {fontSize:13,fontWeight:700}}, lang==="en"?"SE Tax Rate":"自雇税率"), React.createElement('div', { style: {fontSize:11,color:C.text3,marginTop:2}}, taxRateNote||"IRS "+taxYr))
                  , React.createElement('div', { style: {display:"flex",alignItems:"center",gap:8}}
                    , React.createElement('div', { style: {fontSize:20,fontWeight:900,color:"#CC88FF"}}, seRate, "%")
                    , React.createElement('button', { onClick: function(){setTaxLoading(true);setTaxRateNote(lang==="en"?"Checking...":"查询中...");fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:200,messages:[{role:"user",content:"What is the IRS self-employment tax rate for "+taxYr+"? Reply with number only like 15.3"}]})}).then(function(r){return r.json();}).then(function(d){var txt=d.content&&d.content[0]?d.content[0].text:"";var m=txt.match(/(\d+\.?\d*)/);if(m){var rate=parseFloat(m[1]);if(rate>5&&rate<30){setSeRate(rate);setTaxRateNote(lang==="en"?"Updated "+taxYr:"已更新 "+taxYr);}}setTaxLoading(false);}).catch(function(){setTaxRateNote("15.3%");setTaxLoading(false);});}, style: {background:"linear-gradient(135deg,#00D4FF,#0055FF)",border:"none",borderRadius:8,padding:"6px 12px",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",opacity:taxLoading?0.6:1}}, taxLoading?(lang==="en"?"Checking...":"查询中..."):(lang==="en"?"Auto Check":"自动查询"))
                  )
                )
              )
              , (function(){
                var yn=taxYr;
                var taxYMons=(function(){var ms=[];for(var i=1;i<=12;i++){ms.push(yn+"-"+(i<10?"0":"")+i);}return ms;})();
                var yStAll=sl.filter(function(x){return x.month&&x.month.slice(0,4)===yn;});
                var grossInc=yStAll.reduce(function(s,x){return s+(+x.grossFare||0)+(+x.tips||0)+(+x.bonus||0)+(+x.tollReimbursed||0)+(+x.otherIncome||0);},0);
                var yExAll=el.filter(function(e){return e.date&&e.date.slice(0,4)===yn;});
                var yFxAll=taxYMons.reduce(function(acc,m){return acc.concat(genFixed(fl,m));}, []).filter(function(e){return e.date&&e.date.slice(0,4)===yn;});
                var totalExp=yExAll.concat(yFxAll).reduce(function(s,e){return s+(+e.amount||0);},0);
                var netP=grossInc-totalExp;
                var seBase=Math.max(0,netP)*0.9235;
                var seTax=Math.round(seBase*(seRate*0.01)*100)*0.01;
                var seDed=Math.round(seTax*50)*0.01;
                var qDue=Math.round(seTax*25)*0.01;
                var qNum=new Date().getMonth()<3?1:new Date().getMonth()<5?2:new Date().getMonth()<9?3:4;
                var qDates=["Apr 15","Jun 16","Sep 15","Jan 15"];
                var yMi=wl.filter(function(w){return w.weekStart&&w.weekStart.slice(0,4)===yn;}).reduce(function(s,w){return s+(+w.miles||0);},0);
                return React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 685}}
                  , React.createElement(Card, { style: {marginBottom:10}}, React.createElement('div', { style: {fontSize:14,fontWeight:800,color:"#FFD700",marginBottom:10}}, "📋 Schedule C"  )
                    , React.createElement(Row, { label: lang==="en"?"Gross Income":"总收入", value: fmt(grossInc), color: "#00D4FF"} )
                    , React.createElement(Row, { label: lang==="en"?"Business Expenses":"可抵扣支出", value: fmt(totalExp), color: "#FF6B35"} )
                    , yMi>0?React.createElement(Row, { label: lang==="en"?"Mileage ("+yMi+"mi×$0.70)":"里程 ("+yMi+"mi×$0.70)", value: "-"+fmt(Math.round(yMi*70)*0.01), color: "#00E676"} ):null
                    , React.createElement(Row, { label: lang==="en"?"Net Profit":"净利润", value: fmt(netP), color: netP>=0?"#00E676":"#FF5252", bold: true} )
                  )
                  , React.createElement(Card, { style: {marginBottom:10}}, React.createElement('div', { style: {fontSize:14,fontWeight:800,color:"#CC88FF",marginBottom:10}}, "📋 Schedule SE"  )
                    , React.createElement(Row, { label: lang==="en"?"SE Tax Base":"应税基数", value: fmt(seBase)} )
                    , React.createElement(Row, { label: lang==="en"?"SE Tax ("+seRate+"%)":"自雇税 ("+seRate+"%)", value: fmt(seTax), color: "#CC88FF", bold: true} )
                    , React.createElement(Row, { label: lang==="en"?"Deductible Half":"可抵扣部分", value: "-"+fmt(seDed), color: "#00E676"} )
                  )
                  , React.createElement(Card, { style: {marginBottom:10}}, React.createElement('div', { style: {fontSize:14,fontWeight:800,color:"#FFB300",marginBottom:10}}, "📅 " , lang==="en"?"Quarterly Tax":"季度预缴")
                    , ["Q1 (Jan-Mar)","Q2 (Apr-May)","Q3 (Jun-Aug)","Q4 (Sep-Dec)"].map(function(q,i){var isCur=i===qNum-1,isPast=i<qNum-1;return React.createElement('div', { key: i, style: {display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #1E3050"}}, React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 698}}, React.createElement('div', { style: {fontSize:13,fontWeight:700,color:isCur?"#FFD700":isPast?"#7A9AB8":C.text}}, q), React.createElement('div', { style: {fontSize:11,color:"#7A9AB8"}}, lang==="en"?"Due: ":"截止: ", qDates[i])), React.createElement('div', { style: {textAlign:"right"}}, React.createElement('div', { style: {fontSize:14,fontWeight:800,color:isCur?"#FFD700":C.text2}}, fmt(qDue)), React.createElement('div', { style: {fontSize:11,color:isPast?"#00E676":isCur?"#FFB300":"#7A9AB8"}}, isPast?"✓"+(lang==="en"?" Past":" 已过"):isCur?(lang==="en"?"← Now":"← 当前"):(lang==="en"?"Upcoming":"待缴"))));})
                  )
                  , React.createElement(Card, { style: {marginBottom:10}}, React.createElement('div', { style: {fontSize:14,fontWeight:800,color:"#00E676",marginBottom:10}}, "📊 " , lang==="en"?"Year-End Summary":"年终汇总")
                    , (function(){var grps={"车辆":{},"牌照":{},"平台":{},"其他":{}};yExAll.concat(yFxAll).forEach(function(e){var cat=allC[e.category]||{label:e.category,g:"其他"};var g=cat.g||"其他";var lbl=e.isFixed?e.fixedLabel:cat.label;if(!grps[g])grps[g]={};if(!grps[g][lbl])grps[g][lbl]=0;grps[g][lbl]+=(+e.amount||0);});var gT=yExAll.concat(yFxAll).reduce(function(s,e){return s+(+e.amount||0);},0);var gcl={"车辆":"#00D4FF","牌照":"#FFD700","平台":"#CC88FF","其他":"#A8D0E8"};var glbl=lang==="en"?{"车辆":"Vehicle","牌照":"License","平台":"Platform","其他":"Other"}:{"车辆":"车辆","牌照":"牌照","平台":"平台","其他":"其他"};if(!gT)return React.createElement('div', { style: {textAlign:"center",color:C.text3,padding:16}}, lang==="en"?"No expenses for "+yn:yn+"年暂无支出");return React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 701}}, ["车辆","牌照","平台","其他"].map(function(g){var items=grps[g];if(!items||!Object.keys(items).length)return null;var st=Object.values(items).reduce(function(s,v){return s+v;},0);return React.createElement('div', { key: g, style: {marginBottom:10}}, React.createElement('div', { style: {display:"flex",justifyContent:"space-between",borderBottom:"2px solid "+gcl[g],paddingBottom:3,marginBottom:3}}, React.createElement('span', { style: {fontSize:12,fontWeight:800,color:gcl[g]}}, glbl[g]), React.createElement('span', { style: {fontSize:12,fontWeight:800,color:gcl[g]}}, fmt(st))), Object.entries(items).map(function(kv){return React.createElement('div', { key: kv[0], style: {display:"flex",justifyContent:"space-between",padding:"2px 8px"}}, React.createElement('span', { style: {fontSize:12,color:C.text2}}, kv[0]), React.createElement('span', { style: {fontSize:12}}, fmt(kv[1])));}));}), " " , React.createElement('div', { style: {borderTop:"2px solid "+C.border,paddingTop:8,display:"flex",justifyContent:"space-between"}}, React.createElement('span', { style: {fontSize:14,fontWeight:800}}, lang==="en"?"TOTAL":"可抵扣总额"), React.createElement('span', { style: {fontSize:16,fontWeight:900,color:"#00E676"}}, fmt(gT))));}())
                  )
                  , React.createElement(Card, {__source: {fileName: _jsxFileName, lineNumber: 703}}, React.createElement('div', { style: {fontSize:14,fontWeight:800,color:"#5AACFF",marginBottom:10}}, "🔗 " , lang==="en"?"Tax Links":"税务网站")
                    , [{label:"IRS Schedule C",url:"https://www.irs.gov/forms-pubs/about-schedule-c-form-1040"},{label:"IRS Schedule SE",url:"https://www.irs.gov/forms-pubs/about-schedule-se-form-1040"},{label:"IRS Form 1040-ES",url:"https://www.irs.gov/forms-pubs/about-form-1040-es"},{label:"NYC Free Tax Prep",url:"https://www1.nyc.gov/site/dca/consumers/file-your-taxes.page"}].map(function(lk,i){return React.createElement('a', { key: i, href: lk.url, target: "_blank", rel: "noopener noreferrer" , style: {display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #1E3050",textDecoration:"none"}}, React.createElement('span', { style: {fontSize:13,fontWeight:700,color:"#5AACFF"}}, lk.label), React.createElement('span', { style: {color:C.text3}}, ">"));})
                  )
                );
              })()
            )
          )
        )
      ) : null

      , showRemMgr ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300}}
          , React.createElement('div', { style: {background:C.bg2,borderRadius:"20px 20px 0 0",padding:"24px 20px 52px",width:"100%",maxWidth:600,border:"1px solid "+C.border,borderBottom:"none",maxHeight:"85vh",overflowY:"auto"}}
            , React.createElement('div', { style: {width:40,height:4,background:"#1E3050",borderRadius:2,margin:"0 auto 20px"}} )
            , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}
              , React.createElement('button', { onClick: function(){setShowRemMgr(false);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}, "✕")
              , React.createElement('div', { style: {fontSize:17,fontWeight:800}}, "🔔 " , T.reminder)
              , React.createElement('button', { onClick: function(){if(!rf.title||!rf.date)return;setReminders(reminders.concat([Object.assign({},rf,{id:Date.now()})]));setRf({title:"",date:"",note:"",reminderDays:"7"});}, style: {background:"linear-gradient(135deg,#00D4FF,#0055FF)",border:"none",color:"#fff",fontSize:20,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 10px rgba(0,212,255,0.3)"}}, "✓")
            )
            , React.createElement('div', { style: {display:"flex",flexDirection:"column",gap:12,marginBottom:20}}
              , React.createElement(Field, { label: T.remTitle, value: rf.title, onChange: function(v){setRf(Object.assign({},rf,{title:v}));}, options: lang==="en"?[["","-- Please Select --"],["Renew TLC License","Renew TLC License"],["Renew FHV License","Renew FHV License"],["TLC Insurance Expiry","TLC Insurance Expiry"],["DDC Defensive Driving","DDC Defensive Driving"],["Vehicle Inspection","Vehicle Inspection"],["DMV License Renewal","DMV License Renewal"],["Health Insurance","Health Insurance"],["Quarterly Tax Payment","Quarterly Tax Payment"],["Drug Test","Drug Test"],["Fingerprint/Background","Fingerprint/Background"],["custom","✏️ Custom..."]]:[["","-- 请选择 --"],["TLC驾照更新","TLC驾照更新"],["FHV车辆执照更新","FHV车辆执照更新"],["TLC商业保险到期","TLC商业保险到期"],["DDC防御驾驶课程","DDC防御驾驶课程"],["车辆检验","车辆检验"],["DMV驾照更新","DMV驾照更新"],["健康保险到期","健康保险到期"],["季度预缴税","季度预缴税"],["验毒检查","验毒检查"],["指纹背景调查","指纹背景调查"],["custom","✏️ 自定义..."]]} )
              , rf.title==="custom" ? React.createElement(Field, { label: lang==="en"?"Custom Title":"自定义标题", value: rf.customTitle||"", onChange: function(v){setRf(Object.assign({},rf,{customTitle:v}));}, placeholder: lang==="en"?"Enter title":"输入标题"} ) : null
              , React.createElement(Field, { label: T.remDate, type: "date", value: rf.date, onChange: function(v){setRf(Object.assign({},rf,{date:v}));}} )
              , React.createElement(Field, { label: T.remDays, value: rf.reminderDays, onChange: function(v){setRf(Object.assign({},rf,{reminderDays:v}));}, options: [["1",T.day1],["3",T.day3],["7",T.day7],["14",T.day14],["30",T.days30],["60",T.days60],["90",T.days90]]} )
              , React.createElement(Field, { label: T.remNote, value: rf.note, onChange: function(v){setRf(Object.assign({},rf,{note:v}));}, placeholder: T.optional} )
            )
            , reminders.length>0 ? React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 729}}
              , React.createElement('div', { style: {fontSize:13,color:"#90B4D0",marginBottom:10}}, lang==="en"?"Active Reminders":"已设置的提醒")
              , reminders.map(function(r){var d=r.date?(new Date(r.date)-new Date())*0.000011574:null;var dc=d===null?"#7A9AB8":d<0?"#FF5252":d<=3?"#FF6030":d<=7?"#FFB300":"#00E676";var dt=d===null?"":d<0?(lang==="en"?"Expired":"已过期"):d===0?(lang==="en"?"Today":"今天"):d===1?(lang==="en"?"Tomorrow":"明天"):Math.round(d)+(lang==="en"?" days left":" 天");return React.createElement(Card, { key: r.id, style: {padding:"10px 14px",marginBottom:8}}, React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}, React.createElement('div', { style: {flex:1}}, React.createElement('div', { style: {fontSize:14,fontWeight:700,color:C.text}}, r.title), React.createElement('div', { style: {fontSize:12,color:"#90B4D0",marginTop:2}}, fmtDate(r.date), " · "  , r.reminderDays, " " , lang==="en"?"days notice":"天提前提醒"), r.note?React.createElement('div', { style: {fontSize:12,color:"#7A9AB8",marginTop:2}}, r.note):null), React.createElement('div', { style: {textAlign:"right"}}, React.createElement('div', { style: Object.assign({fontSize:13,fontWeight:700},{color:dc})}, dt), React.createElement('button', { onClick: function(){setReminders(reminders.filter(function(x){return x.id!==r.id;}));}, style: {background:"none",border:"1px solid #3A1A1A",borderRadius:6,padding:"2px 8px",color:"#FF5252",cursor:"pointer",fontSize:11,marginTop:4}}, T.del))));})
            ) : React.createElement('div', { style: {fontSize:13,color:"#7A9AB8",textAlign:"center",padding:20}}, T.noData)
          )
        )
      ) : null

      , showPlatMgr ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300}}
          , React.createElement('div', { style: {background:C.bg2,borderRadius:"20px 20px 0 0",padding:"24px 20px 52px",width:"100%",maxWidth:600,border:"1px solid "+C.border,borderBottom:"none",maxHeight:"85vh",overflowY:"auto"}}
            , React.createElement('div', { style: {width:40,height:4,background:"#1E3050",borderRadius:2,margin:"0 auto 20px"}} )
            , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}
              , React.createElement('button', { onClick: function(){setShowPlatMgr(false);setNewPlat("");}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}, "✕")
              , React.createElement('div', { style: {fontSize:17,fontWeight:800}}, T.platform)
              , React.createElement('button', { onClick: function(){var v=newPlat.trim();if(!v||allPlat.indexOf(v)>=0)return;setCustPlat(custPlat.concat([v]));setNewPlat("");}, style: {background:"linear-gradient(135deg,#00D4FF,#0055FF)",border:"none",color:"#fff",fontSize:20,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 10px rgba(0,212,255,0.3)"}}, "✓")
            )
            , React.createElement('input', { value: newPlat, onChange: function(e){setNewPlat(e.target.value);}, placeholder: T.newPlatform, style: Object.assign({},IS,{marginBottom:16})} )
            , React.createElement('div', { style: {fontSize:13,color:"#90B4D0",marginBottom:12}}, lang==="en"?"Default":"默认平台")
            , defPlat.map(function(p){return React.createElement('div', { key: p, style: {display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #0F1C30"}}, React.createElement('span', { style: {fontSize:14,color:C.text}}, p), React.createElement('button', { onClick: function(){setDefPlat(defPlat.filter(function(x){return x!==p;}));}, style: {background:"none",border:"1px solid #3A1A1A",borderRadius:6,padding:"3px 10px",color:"#FF5252",cursor:"pointer",fontSize:12}}, T.del));})
            , custPlat.length>0 ? React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 749}}, React.createElement('div', { style: {fontSize:13,color:"#90B4D0",marginTop:16,marginBottom:12}}, lang==="en"?"Custom":"自定义平台"), custPlat.map(function(p){return React.createElement('div', { key: p, style: {display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #0F1C30"}}, React.createElement('span', { style: {fontSize:14,color:C.text}}, p), React.createElement('button', { onClick: function(){setCustPlat(custPlat.filter(function(x){return x!==p;}));}, style: {background:"none",border:"1px solid #3A1A1A",borderRadius:6,padding:"3px 10px",color:"#FF5252",cursor:"pointer",fontSize:12}}, T.del));})) : null
          )
        )
      ) : null

      , showBackup ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300}}
          , React.createElement('div', { style: {background:C.bg2,borderRadius:"20px 20px 0 0",padding:"24px 20px 48px",width:"100%",maxWidth:600,border:"1px solid "+C.border,borderBottom:"none",maxHeight:"90vh",overflowY:"auto"}}
            , React.createElement('div', { style: {width:40,height:4,background:"#1E3050",borderRadius:2,margin:"0 auto 16px"}} )
            , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}
              , React.createElement('div', { style: {fontSize:17,fontWeight:800}}, T.backup)
              , React.createElement('button', { onClick: function(){setShowBackup(false);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:32,height:32,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}, "✕")
            )
            , React.createElement('div', { style: {background:"#0A1828",border:"1px solid #1A3048",borderRadius:12,padding:16,marginBottom:12}}
              , React.createElement('div', { style: {fontSize:15,fontWeight:700,color:"#00D4FF",marginBottom:10}}, "☁️ Google Drive "   , lang==="en"?"Auto Sync":"自动同步")
              , gUser&&accessToken ? React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 764}}
                , React.createElement('div', { style: {fontSize:13,color:"#00E676",marginBottom:6}}, "✓ " , gUser.email)
                , React.createElement('div', { style: {fontSize:12,color:"#90B4D0",marginBottom:10}}, lang==="en"?"Auto-saves after every change":"每次修改自动保存")
                , React.createElement('button', { onClick: function(){var data={sl:sl,el:el,fl:fl,ll:ll,veh:veh,cc:cc,reminders:reminders,custPlat:custPlat,notes:notes,incGoal:incGoal};saveToDrive(accessToken,driveFileId,data);}, style: {width:"100%",background:"#0A4020",border:"1px solid #2A8050",borderRadius:10,padding:12,color:"#00E676",fontSize:14,fontWeight:700,cursor:"pointer",marginBottom:8}}, syncing?(lang==="en"?"Saving...":"保存中..."):(lang==="en"?"💾 Save Now":"💾 立即保存"))
                , React.createElement('button', { onClick: function(){loadFromDrive(accessToken);}, style: {width:"100%",background:"#0A2040",border:"1px solid #1A5080",borderRadius:10,padding:12,color:"#00D4FF",fontSize:14,fontWeight:700,cursor:"pointer"}}, lang==="en"?"📥 Restore from Drive":"📥 从Drive恢复")
                , syncStatus?React.createElement('div', { style: {fontSize:12,color:"#00E676",marginTop:8,textAlign:"center"}}, syncStatus):null
              ) : React.createElement('div', { style: {fontSize:13,color:"#90B4D0"}}, lang==="en"?"Sign in with Google to enable auto-sync":"登录Google后自动启用同步")
            )
            , React.createElement('button', { onClick: function(){var data={sl:sl,el:el,fl:fl,ll:ll,veh:veh,cc:cc,reminders:reminders,custPlat:custPlat,notes:notes,incGoal:incGoal,exported:new Date().toISOString()};var blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});var url=URL.createObjectURL(blob);var a=document.createElement("a");a.href=url;a.download="nyc-driver-backup-"+new Date().toLocaleDateString().replace(/[/]/g,"-")+".json";a.click();URL.revokeObjectURL(url);}, style: {width:"100%",background:"#0A1828",border:"1px solid #1A3048",borderRadius:12,padding:14,marginBottom:10,textAlign:"left",cursor:"pointer"}}
              , React.createElement('div', { style: {fontSize:15,fontWeight:700,color:"#5AACFF",marginBottom:3}}, lang==="en"?"📤 Export JSON Backup":"📤 导出JSON备份")
              , React.createElement('div', { style: {fontSize:12,color:"#90B4D0"}}, lang==="en"?"Download all data as JSON":"下载所有数据为JSON文件")
            )
            , React.createElement('div', { style: {background:"#0A1828",border:"1px solid #1A3048",borderRadius:12,padding:14,marginBottom:10}}
              , React.createElement('div', { style: {fontSize:15,fontWeight:700,color:"#5AACFF",marginBottom:6}}, lang==="en"?"📥 Restore from File":"📥 从文件恢复")
              , React.createElement('input', { type: "file", accept: ".json", onChange: function(e){var file=e.target.files[0];if(!file)return;var reader=new FileReader();reader.onload=function(ev){try{var data=JSON.parse(ev.target.result);if(data.sl)setSl(data.sl);if(data.el)setEl(data.el);if(data.fl)setFl(data.fl);if(data.ll)setLl(data.ll);if(data.veh)setVeh(data.veh);if(data.cc)setCc(data.cc);if(data.reminders)setReminders(data.reminders);if(data.custPlat)setCustPlat(data.custPlat);if(data.notes)setNotes(data.notes);if(data.incGoal)setIncGoal(data.incGoal);alert(lang==="en"?"Data restored!":"数据恢复成功！");}catch(err){alert(lang==="en"?"Invalid file":"文件格式错误");}};reader.readAsText(file);}, style: {width:"100%",background:"#152135",border:"1px solid #2A3A54",borderRadius:8,padding:"8px",color:C.text,fontSize:13,cursor:"pointer"}} )
            )
            , React.createElement('button', { onClick: function(){
              var yr=new Date().getFullYear()+"";
              var yStmts=sl.filter(function(x){return x.month&&x.month.slice(0,4)===yr;});
              var grossInc=yStmts.reduce(function(s,x){return s+(+x.grossFare||0)+(+x.tips||0)+(+x.bonus||0)+(+x.tollReimbursed||0)+(+x.otherIncome||0);},0);
              var yExps=el.filter(function(e){return e.date&&e.date.slice(0,4)===yr;});
              var totalExp=yExps.reduce(function(s,e){return s+(+e.amount||0);},0);
              var netP=grossInc-totalExp;
              var seBase=Math.max(0,netP)*0.9235;
              var seTax=Math.round(seBase*0.153*100)/100;
              var html="<!DOCTYPE html><html><head><meta charset=UTF-8><title>NYC Driver Tax Report "+yr+"</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;padding:20px;color:#1a1a1a}h1{color:#1a3a6a;border-bottom:3px solid #1a3a6a;padding-bottom:10px;margin-bottom:20px}h2{color:#2a5a9a;margin:25px 0 10px}table{width:100%;border-collapse:collapse;margin:10px 0}td,th{padding:10px 14px;border:1px solid #ddd;text-align:left}th{background:#f0f4ff;font-weight:bold}tr:nth-child(even){background:#f8f9ff}.total{font-weight:bold;background:#e8f0ff!important}.green{color:#1a8a1a}.red{color:#cc1a1a}.print-btn{margin-top:30px;padding:12px 24px;background:#1a3a6a;color:white;border:none;border-radius:6px;cursor:pointer;font-size:15px}@media print{.print-btn{display:none}}</style></head><body>";
              html+="<h1>🚖 NYC Rideshare Driver - Tax Report "+yr+"</h1>";
              html+="<p style=color:#666;margin-bottom:20px>Generated: "+new Date().toLocaleDateString()+(gUser?" | "+gUser.email:"")+"</p>";
              html+="<h2>📋 Schedule C - Profit or Loss from Business</h2><table><tr><th>Line</th><th>Description</th><th>Amount</th></tr><tr><td>1</td><td>Gross receipts (1099-K / 1099-NEC)</td><td class=green>$"+grossInc.toFixed(2)+"</td></tr><tr><td>28</td><td>Total expenses</td><td class=red>$"+totalExp.toFixed(2)+"</td></tr><tr class=total><td>31</td><td>Net profit or loss</td><td class="+(netP>=0?"green":"red")+">$"+netP.toFixed(2)+"</td></tr></table>";
              html+="<h2>📋 Schedule SE - Self-Employment Tax</h2><table><tr><th>Description</th><th>Amount</th></tr><tr><td>Net profit × 92.35%</td><td>$"+seBase.toFixed(2)+"</td></tr><tr><td>Self-employment tax (×15.3%)</td><td class=red>$"+seTax.toFixed(2)+"</td></tr><tr class=total><td>Deductible portion (½ SE tax)</td><td class=green>$"+(seTax/2).toFixed(2)+"</td></tr></table>";
              html+="<h2>📅 Quarterly Estimated Tax Payments</h2><table><tr><th>Quarter</th><th>Due Date</th><th>Amount</th></tr><tr><td>Q1 (Jan-Mar)</td><td>April 15</td><td>$"+(seTax/4).toFixed(2)+"</td></tr><tr><td>Q2 (Apr-May)</td><td>June 16</td><td>$"+(seTax/4).toFixed(2)+"</td></tr><tr><td>Q3 (Jun-Aug)</td><td>September 15</td><td>$"+(seTax/4).toFixed(2)+"</td></tr><tr><td>Q4 (Sep-Dec)</td><td>January 15</td><td>$"+(seTax/4).toFixed(2)+"</td></tr></table>";
              if(yExps.length>0){html+="<h2>💸 Business Expense Detail</h2><table><tr><th>Date</th><th>Category</th><th>Notes</th><th>Amount</th></tr>";yExps.forEach(function(e){var cat=allC[e.category];html+="<tr><td>"+(e.date||"")+"</td><td>"+(cat?cat.icon+" "+cat.label:e.category)+"</td><td>"+(e.notes||"")+"</td><td>$"+(+e.amount||0).toFixed(2)+"</td></tr>";});html+="<tr class=total><td colspan=3>Total Expenses</td><td>$"+totalExp.toFixed(2)+"</td></tr></table>";}
              html+="<button class=print-btn onclick=window.print()>🖨️ Print / Save as PDF (Ctrl+P)</button></body></html>";
              var w=window.open("","_blank");if(w){w.document.write(html);w.document.close();}
            }, style: {width:"100%",background:"linear-gradient(135deg,#1A3060,#0A1828)",border:"1px solid #2A5080",borderRadius:12,padding:14,textAlign:"left",cursor:"pointer"}}
              , React.createElement('div', { style: {fontSize:15,fontWeight:700,color:"#5AACFF",marginBottom:3}}, "📄 " , lang==="en"?"Export Tax Report PDF":"导出报税表PDF")
              , React.createElement('div', { style: {fontSize:12,color:"#90B4D0"}}, lang==="en"?"Generate "+new Date().getFullYear()+" tax report, print or save as PDF":"生成"+new Date().getFullYear()+"年报税表，打印或存为PDF")
            )
          )
        )
      ) : null

      , reportData ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:C.bg,zIndex:300,overflowY:"auto"}}
          , React.createElement('div', { style: {maxWidth:600,margin:"0 auto",padding:"0 0 60px"}}
            , React.createElement('div', { style: {background:C.bg2,padding:"18px",borderBottom:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10}}
              , React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 810}}, React.createElement('div', { style: {fontSize:16,fontWeight:800}}, reportData.type==="exp"?(lang==="en"?"&#128184; Expense Detail":"&#128184; 支出明细"):(lang==="en"?"&#128202; Financial Report":"&#128202; 财务报告")), React.createElement('div', { style: {fontSize:13,color:"#90B4D0"}}, reportData.label))
              , React.createElement('button', { onClick: function(){setReportData(null);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:32,height:32,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}, "✕")
            )
            , React.createElement('div', { style: {padding:"20px 16px 0",fontFamily:"monospace"}}
              , React.createElement('div', { style: {textAlign:"center",marginBottom:20}}
                , React.createElement('div', { style: {fontSize:18,fontWeight:900,color:C.text,letterSpacing:1}}, "🚖 " , lang==="en"?"NYC DRIVER REPORT":"纽约司机财务报告")
                , React.createElement('div', { style: {fontSize:14,color:"#90B4D0",marginTop:4}}, reportData.label)
              )
              , React.createElement('div', { style: {borderTop:"2px solid #2A4060",marginBottom:16}} )
              , reportData.type==="exp" ? (
                React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 820}}
                  , React.createElement('div', { style: {fontSize:13,fontWeight:800,color:"#CC88FF",letterSpacing:2,marginBottom:12}}, lang==="en"?"EXPENSES":"支出明细")
                  , ["车辆","牌照","平台","其他"].map(function(g){var cats=reportData.byGroup[g];if(!cats||!cats.length)return null;var gTotal=cats.reduce(function(s,c){return s+c.total;},0);var gcl=g==="车辆"?"#00D4FF":g==="牌照"?"#FFD700":g==="平台"?"#CC88FF":"#B0D4E8";var glbl=lang==="en"?(g==="车辆"?"Vehicle":g==="牌照"?"License":g==="平台"?"Platform":"Other"):g;return React.createElement('div', { key: g, style: {marginBottom:16}}
                    , React.createElement('div', { style: Object.assign({fontSize:13,fontWeight:700,marginBottom:8},{color:gcl})}, glbl)
                    , cats.map(function(cat){return React.createElement('div', { key: cat.label, style: {display:"flex",justifyContent:"space-between",padding:"3px 0 3px 16px"}}, React.createElement('span', { style: {fontSize:13,color:C.text2}}, cat.icon, " " , cat.label), React.createElement('span', { style: {fontSize:13,color:C.text}}, fmt(cat.total)));})
                    , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",padding:"6px 0 6px 16px",borderTop:"1px solid #1A2A40",marginTop:4}}, React.createElement('span', { style: {fontSize:12,color:"#7A9AB8"}}, lang==="en"?"Subtotal":"小计"), React.createElement('span', { style: {fontSize:13,fontWeight:700,color:"#FF9A65"}}, fmt(gTotal)))
                  );})
                  , React.createElement('div', { style: {borderTop:"2px solid #2A4060",padding:"12px 0",display:"flex",justifyContent:"space-between"}}
                    , React.createElement('span', { style: {fontSize:14,fontWeight:800,color:C.text,letterSpacing:1}}, lang==="en"?"TOTAL EXPENSES":"总支出")
                    , React.createElement('span', { style: {fontSize:16,fontWeight:900,color:"#FF6B35"}}, fmt(reportData.total))
                  )
                )
              ) : (
                React.createElement('div', {__source: {fileName: _jsxFileName, lineNumber: 833}}
                  , React.createElement('div', { style: {fontSize:13,fontWeight:800,color:"#00D4FF",letterSpacing:2,marginBottom:12}}, lang==="en"?"INCOME":"收入明细")
                  , reportData.stmts&&reportData.stmts.length>0 ? reportData.stmts.map(function(s){var sub=(+s.grossFare||0)+(+s.tips||0)+(+s.bonus||0)+(+s.tollReimbursed||0)+(+s.otherIncome||0);return React.createElement('div', { key: s.id, style: {marginBottom:14}}
                    , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:C.text,marginBottom:6}}, s.platform)
                    , +s.grossFare>0?React.createElement('div', { style: {display:"flex",justifyContent:"space-between",padding:"3px 0 3px 16px"}}, React.createElement('span', { style: {fontSize:13,color:C.text2}}, "Gross Fare" ), React.createElement('span', { style: {fontSize:13,color:C.text}}, fmt(s.grossFare))):null
                    , +s.tips>0?React.createElement('div', { style: {display:"flex",justifyContent:"space-between",padding:"3px 0 3px 16px"}}, React.createElement('span', { style: {fontSize:13,color:C.text2}}, T.tips), React.createElement('span', { style: {fontSize:13,color:C.text}}, fmt(s.tips))):null
                    , +s.bonus>0?React.createElement('div', { style: {display:"flex",justifyContent:"space-between",padding:"3px 0 3px 16px"}}, React.createElement('span', { style: {fontSize:13,color:C.text2}}, T.bonus), React.createElement('span', { style: {fontSize:13,color:C.text}}, fmt(s.bonus))):null
                    , +s.tollReimbursed>0?React.createElement('div', { style: {display:"flex",justifyContent:"space-between",padding:"3px 0 3px 16px"}}, React.createElement('span', { style: {fontSize:13,color:C.text2}}, lang==="en"?"Toll":"过桥"), React.createElement('span', { style: {fontSize:13,color:C.text}}, fmt(s.tollReimbursed))):null
                    , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",padding:"6px 0 6px 16px",borderTop:"1px solid #1A2A40",marginTop:4}}, React.createElement('span', { style: {fontSize:12,color:"#7A9AB8"}}, lang==="en"?"Subtotal":"小计"), React.createElement('span', { style: {fontSize:13,fontWeight:700,color:"#00E676"}}, fmt(sub)))
                  );}) : React.createElement('div', { style: {fontSize:13,color:"#7A9AB8",padding:"8px 0 16px"}}, lang==="en"?"No income recorded":"暂无收入记录")
                  , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",padding:"10px 0",borderTop:"1px solid #2A4060",marginBottom:20}}
                    , React.createElement('span', { style: {fontSize:13,fontWeight:700,color:C.text2,letterSpacing:1}}, lang==="en"?"Total Income":"总收入")
                    , React.createElement('span', { style: {fontSize:14,fontWeight:800,color:"#00D4FF"}}, fmt(reportData.r.ri))
                  )
                  , React.createElement('div', { style: {borderTop:"1px solid #182540",marginBottom:16}} )
                  , React.createElement('div', { style: {fontSize:13,fontWeight:800,color:"#CC88FF",letterSpacing:2,marginBottom:12}}, lang==="en"?"EXPENSES":"支出明细")
                  , ["车辆","牌照","平台","其他"].map(function(g){var items=reportData.byGroup[g];if(!items||!items.length)return null;var gTotal=items.reduce(function(s,c){return s+c.total;},0);var gcl=g==="车辆"?"#00D4FF":g==="牌照"?"#FFD700":g==="平台"?"#CC88FF":"#B0D4E8";var glbl=lang==="en"?(g==="车辆"?"Vehicle":g==="牌照"?"License":g==="平台"?"Platform":"Other"):g;return React.createElement('div', { key: g, style: {marginBottom:14}}
                    , React.createElement('div', { style: Object.assign({fontSize:13,fontWeight:700,marginBottom:6},{color:gcl})}, glbl)
                    , items.map(function(c){return React.createElement('div', { key: c.label, style: {display:"flex",justifyContent:"space-between",padding:"3px 0 3px 16px"}}, React.createElement('span', { style: {fontSize:13,color:C.text2}}, c.label), React.createElement('span', { style: {fontSize:13,color:C.text}}, fmt(c.total)));})
                    , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",padding:"6px 0 6px 16px",borderTop:"1px solid #1A2A40",marginTop:4}}, React.createElement('span', { style: {fontSize:12,color:"#7A9AB8"}}, lang==="en"?"Subtotal":"小计"), React.createElement('span', { style: {fontSize:13,fontWeight:700,color:"#FF9A65"}}, fmt(gTotal)))
                  );})
                  , React.createElement('div', { style: {borderTop:"2px solid #2A4060",padding:"12px 0",marginBottom:16}}
                    , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",marginBottom:6}}, React.createElement('span', { style: {fontSize:13,fontWeight:700,color:C.text2,letterSpacing:1}}, lang==="en"?"Total Expenses":"总支出"), React.createElement('span', { style: {fontSize:14,fontWeight:800,color:"#FF6B35"}}, fmt(reportData.r.rTot)))
                  )
                  , React.createElement('div', { style: {borderTop:"2px solid #2A4060",padding:"14px 0"}}
                    , (function(){var rn=reportData.r.rn,nc=rn>=0?"#00E676":"#FF5252";return React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center"}}, React.createElement('span', { style: {fontSize:15,fontWeight:900,color:C.text,letterSpacing:1}}, lang==="en"?"NET PROFIT":"净利润"), React.createElement('span', { style: Object.assign({fontSize:20,fontWeight:900,letterSpacing:-1},{color:nc})}, fmt(rn)));}())
                  )
                  , reportData.isYear&&reportData.mData ? (
                    React.createElement('div', { style: {marginTop:16}}
                      , React.createElement('div', { style: {borderTop:"1px solid #182540",marginBottom:16}} )
                      , React.createElement('div', { style: {fontSize:13,fontWeight:800,color:"#FFD700",letterSpacing:2,marginBottom:12}}, lang==="en"?"MONTHLY BREAKDOWN":"逐月明细")
                      , reportData.mData.filter(function(m){return m.inc>0||m.exp>0;}).map(function(m){var nc=m.net>=0?"#00E676":"#FF5252";return React.createElement('div', { key: m.m, style: {display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #0F1C30"}}, React.createElement('span', { style: {fontSize:13,color:C.text2}}, m.label), React.createElement('span', { style: {fontSize:12,color:"#00D4FF"}}, fmt(m.inc)), React.createElement('span', { style: {fontSize:12,color:"#FF9A65"}}, fmt(m.exp)), React.createElement('span', { style: Object.assign({fontSize:13,fontWeight:700},{color:nc})}, fmt(m.net)));})
                    )
                  ) : null
                )
              )
              , React.createElement('div', { style: {borderTop:"2px solid #2A4060",marginTop:20,padding:"14px 0",textAlign:"center"}}
                , React.createElement('div', { style: {fontSize:11,color:"#6A8AAA",letterSpacing:1}}, "NYC RIDESHARE DRIVER TRACKER"   )
              )
            )
          )
        )
      ) : null

      , React.createElement('div', { style: {position:"fixed",bottom:0,left:0,right:0,display:"flex",background:C.bg2,borderTop:"1px solid "+C.border,zIndex:90,paddingBottom:"env(safe-area-inset-bottom)",alignItems:"center"}}
        , (function(){
          var items=[{ti:0,icon:"&#128202;",label:T.dashboard},{ti:1,icon:"&#128181;",label:T.income},{ti:-1,icon:"+",label:T.addExpense,isPlus:true},{ti:2,icon:"&#128184;",label:T.expense},{ti:3,icon:"&#128200;",label:T.report}];
          return React.createElement('div', { style: {display:"contents"}}, items.map(function(item,i){
            if(item.isPlus){return React.createElement('button', { key: i, onClick: function(){setEf({date:today(),time:nowTime(),category:"fuel",amount:"",notes:"",qty:"",statementMonth:curMo(),isRecurring:false});setSf("exp");}, style: {flex:1,padding:"6px 2px 10px",background:"none",border:"none",cursor:"pointer",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}, React.createElement('div', { style: {width:44,height:44,borderRadius:22,background:"linear-gradient(135deg,#00D4FF,#0055FF)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,color:"#fff",boxShadow:"0 2px 12px rgba(0,212,255,0.4)",marginTop:-18}}, "+"), React.createElement('span', { style: {fontSize:11,color:C.text3}}, item.label));}
            var active=tab===item.ti,cl=active?"#00D4FF":C.text3,bg=active?"#0A1828":"transparent";
            return React.createElement('button', { key: i, onClick: function(){setTab(item.ti);}, style: {flex:1,padding:"8px 2px 10px",background:bg,border:"none",fontSize:10,cursor:"pointer",color:cl,fontWeight:active?700:400,textAlign:"center"}}, React.createElement('div', { style: {fontSize:20,marginBottom:3}, dangerouslySetInnerHTML: {__html:item.icon}} ), item.label);
          }));
        })()
      )
    )
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
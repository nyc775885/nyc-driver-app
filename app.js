// === Error monitoring (Sentry) ===
var APP_VERSION = "v3.11.75";  // ← single source of truth: bump this once per release
console.log("%cNYC Driver Tracker — version "+APP_VERSION,"color:#00D4FF;font-weight:bold;font-size:14px");
// To enable Sentry: add to index.html before app.js:
//   <script src="https://browser.sentry-cdn.com/8.40.0/bundle.min.js" crossorigin="anonymous"></script>
//   <script>window.SENTRY_DSN = "https://YOUR_KEY@oXXX.ingest.sentry.io/PROJECT";</script>
// Then errors will be sent to Sentry. Without Sentry, errors fall back to console.error.
(function initErrorTracking(){
  if(typeof window==="undefined")return;
  if(window.Sentry&&window.SENTRY_DSN){
    try{
      window.Sentry.init({
        dsn:window.SENTRY_DSN,
        environment:(location.hostname==="localhost"||location.hostname==="127.0.0.1")?"development":"production",
        release:"nyc-driver-tracker@1.5.50",
        tracesSampleRate:0.1,
        // Don't send events from local dev
        beforeSend:function(event){
          if(location.hostname==="localhost"||location.hostname==="127.0.0.1")return null;
          // Strip user data to protect privacy
          if(event.request&&event.request.cookies)delete event.request.cookies;
          return event;
        }
      });
    }catch(e){console.error("Sentry init failed:",e);}
  }
  // Fallback: log unhandled errors so they're at least visible in console
  window.addEventListener("error",function(ev){
    if(window.Sentry&&window.SENTRY_DSN)return; // Sentry already captures
    console.error("[unhandled]",ev.error||ev.message);
  });
  window.addEventListener("unhandledrejection",function(ev){
    if(window.Sentry&&window.SENTRY_DSN)return;
    console.error("[unhandled promise]",ev.reason);
  });
})();

// Helper for explicit error reporting from try/catch blocks
function reportError(err,context){
  try{
    if(window.Sentry&&window.SENTRY_DSN){
      window.Sentry.withScope(function(scope){
        if(context)scope.setContext("app",context);
        window.Sentry.captureException(err);
      });
    }else{
      console.error("[reportError]",err,context||"");
    }
  }catch(e){console.error("reportError failed:",e);}
}

const _jsxFileName = "";var useState = React.useState; var useEffect = React.useEffect; var useMemo = React.useMemo;

// Error boundary catches React render errors so the whole app doesn't blank out
class ErrorBoundary extends React.Component {
  constructor(props){super(props);this.state={hasError:false,err:null};}
  static getDerivedStateFromError(err){return {hasError:true,err:err};}
  componentDidCatch(err,info){reportError(err,{component:info.componentStack});}
  render(){
    if(this.state.hasError){
      return React.createElement('div',{style:{padding:24,fontFamily:"sans-serif",color:C.text,background:"#080C18",minHeight:"100vh"}},
        React.createElement('div',{style:{fontSize:48,marginBottom:16}},"⚠️"),
        React.createElement('h2',{style:{color:C.danger,marginBottom:12}},"App crashed / 应用崩溃"),
        React.createElement('p',{style:{marginBottom:8}},"Something went wrong. Your data is safe in localStorage."),
        React.createElement('p',{style:{marginBottom:16,color:C.text2,fontSize:13}},"出错了，但你的数据还在 localStorage 中。"),
        React.createElement('button',{onClick:function(){location.reload();},style:{background:C.accent,color:"#000",border:"none",borderRadius:8,padding:"10px 18px",fontSize:14,fontWeight:700,cursor:"pointer",marginRight:8}},"🔄 Reload / 刷新"),
        React.createElement('details',{style:{marginTop:24,fontSize:12,color:C.text3}},
          React.createElement('summary',{style:{cursor:"pointer"}},"Technical details / 技术详情"),
          React.createElement('pre',{style:{background:C.bg3,padding:12,borderRadius:8,overflow:"auto",marginTop:8}},String(this.state.err&&this.state.err.stack||this.state.err))
        )
      );
    }
    return this.props.children;
  }
}
var CATS_ZH={fuel:{label:"燃油费",icon:"⛽",g:"车辆",taxable:true},charging:{label:"充电费",icon:"⚡",g:"车辆",taxable:true},toll:{label:"过桥费(月结)",icon:"🌉",g:"车辆",mo:true,taxable:true},congestion:{label:"拥堵费(月结)",icon:"🏙",g:"车辆",mo:true,taxable:true},parking:{label:"停车费",icon:"🅿",g:"车辆",taxable:true},ticket:{label:"停车罚款",icon:"🎫",g:"车辆",taxable:false},carwash:{label:"洗车费",icon:"🧼",g:"车辆",taxable:true},oil:{label:"换机油",icon:"🛢",g:"车辆",taxable:true},tires:{label:"轮胎",icon:"🔄",g:"车辆",taxable:true},brakes:{label:"刹车",icon:"🔩",g:"车辆",taxable:true},battery:{label:"电池",icon:"🔋",g:"车辆",taxable:true},ac:{label:"冷暖气维修",icon:"❄",g:"车辆",taxable:true},cabinFilter:{label:"空调滤芯",icon:"🌬",g:"车辆",taxable:true},airFilter:{label:"空气滤芯",icon:"💨",g:"车辆",taxable:true},wipers:{label:"雨刮片",icon:"🌂",g:"车辆",taxable:true},washer:{label:"玻璃水",icon:"💧",g:"车辆",taxable:true},maint:{label:"定期保养",icon:"🔧",g:"车辆",taxable:true},repair:{label:"意外维修",icon:"🛠",g:"车辆",taxable:true},insurance:{label:"TLC商业保险",icon:"🛡",g:"车辆",taxable:true},carloan:{label:"车贷月付",icon:"💳",g:"车辆",taxable:true},rentalcar:{label:"周租车费",icon:"🔑",g:"车辆",taxable:true},tlc:{label:"TLC驾照费",icon:"📋",g:"牌照",taxable:true},fhv:{label:"FHV车辆执照费",icon:"🚗",g:"牌照",taxable:true},dmv:{label:"DMV驾照",icon:"📝",g:"牌照",taxable:true},drug:{label:"验毒检查",icon:"🧪",g:"牌照",taxable:true},finger:{label:"指纹背景调查",icon:"👆",g:"牌照",taxable:true},ddcourse:{label:"TLC 24小时培训",icon:"📚",g:"牌照",taxable:true},defensive:{label:"DDC防御驾驶课程",icon:"🎓",g:"牌照",taxable:true},wav:{label:"WAV轮椅车辆培训",icon:"♿",g:"牌照",taxable:true},medical:{label:"体检费用",icon:"🩺",g:"牌照",taxable:true},background:{label:"其他背景调查费",icon:"🔎",g:"牌照",taxable:true},platform:{label:"被平台收取的费用(仅记录)",icon:"📋",g:"平台",mo:true,taxable:true,refOnly:true},blackcar:{label:"Black Car Fund(月结)",icon:"🖤",g:"平台",mo:true,taxable:true},uberpro:{label:"Uber Pro",icon:"⭐",g:"平台",taxable:true},phonebill:{label:"手机费",icon:"📱",g:"其他",taxable:true},coffee:{label:"现磨咖啡",icon:"☕",g:"其他",taxable:false},tax:{label:"季度预缴税",icon:"🧾",g:"其他",taxable:false},accountant:{label:"会计费用",icon:"🧮",g:"其他",taxable:true},health:{label:"健康保险",icon:"🏥",g:"其他",taxable:true},meals:{label:"工作餐饮",icon:"🍱",g:"其他",taxable:false},other:{label:"其他支出",icon:"💼",g:"其他",taxable:true}};
var CATS_EN={fuel:{label:"Gas",icon:"⛽",g:"车辆",taxable:true},charging:{label:"Charging",icon:"⚡",g:"车辆",taxable:true},toll:{label:"Toll(mo)",icon:"🌉",g:"车辆",mo:true,taxable:true},congestion:{label:"Congestion(mo)",icon:"🏙",g:"车辆",mo:true,taxable:true},parking:{label:"Parking",icon:"🅿",g:"车辆",taxable:true},ticket:{label:"Parking Fine",icon:"🎫",g:"车辆",taxable:false},carwash:{label:"Car Wash",icon:"🧼",g:"车辆",taxable:true},oil:{label:"Oil Change",icon:"🛢",g:"车辆",taxable:true},tires:{label:"Tires",icon:"🔄",g:"车辆",taxable:true},brakes:{label:"Brakes",icon:"🔩",g:"车辆",taxable:true},battery:{label:"Battery",icon:"🔋",g:"车辆",taxable:true},ac:{label:"A/C Repair",icon:"❄",g:"车辆",taxable:true},cabinFilter:{label:"Cabin Filter",icon:"🌬",g:"车辆",taxable:true},airFilter:{label:"Air Filter",icon:"💨",g:"车辆",taxable:true},wipers:{label:"Wipers",icon:"🌂",g:"车辆",taxable:true},washer:{label:"Washer Fluid",icon:"💧",g:"车辆",taxable:true},maint:{label:"Maintenance",icon:"🔧",g:"车辆",taxable:true},repair:{label:"Repair",icon:"🛠",g:"车辆",taxable:true},insurance:{label:"TLC Insurance",icon:"🛡",g:"车辆",taxable:true},carloan:{label:"Car Loan",icon:"💳",g:"车辆",taxable:true},rentalcar:{label:"Weekly Rental",icon:"🔑",g:"车辆",taxable:true},tlc:{label:"TLC License",icon:"📋",g:"牌照",taxable:true},fhv:{label:"FHV License",icon:"🚗",g:"牌照",taxable:true},dmv:{label:"DMV License",icon:"📝",g:"牌照",taxable:true},drug:{label:"Drug Test",icon:"🧪",g:"牌照",taxable:true},finger:{label:"Fingerprint",icon:"👆",g:"牌照",taxable:true},ddcourse:{label:"TLC Training",icon:"📚",g:"牌照",taxable:true},defensive:{label:"DDC Course",icon:"🎓",g:"牌照",taxable:true},wav:{label:"WAV Training",icon:"♿",g:"牌照",taxable:true},medical:{label:"Medical Exam",icon:"🩺",g:"牌照",taxable:true},background:{label:"Background Check",icon:"🔎",g:"牌照",taxable:true},platform:{label:"Platform Fees Charged(ref only)",icon:"📋",g:"平台",mo:true,taxable:true,refOnly:true},blackcar:{label:"Black Car Fund(mo)",icon:"🖤",g:"平台",mo:true,taxable:true},uberpro:{label:"Uber Pro",icon:"⭐",g:"平台",taxable:true},phonebill:{label:"Phone Bill",icon:"📱",g:"其他",taxable:true},coffee:{label:"Fresh Coffee",icon:"☕",g:"其他",taxable:false},tax:{label:"Quarterly Tax",icon:"🧾",g:"其他",taxable:false},accountant:{label:"Accountant",icon:"🧮",g:"其他",taxable:true},health:{label:"Health Insurance",icon:"🏥",g:"其他",taxable:true},meals:{label:"Meals",icon:"🍱",g:"其他",taxable:false},other:{label:"Other",icon:"💼",g:"其他",taxable:true}};
var PLATS=["Uber","Lyft","Via","Uber Black","Lyft Lux","其他"];
var GROUPS=["车辆","牌照","平台","其他","自定义"];
var TABS=["仪表盘","收入","支出","报告"];
var MILE_PRESETS_EV=[
  {key:"rotate",icon:"🔄",lbl_zh:"转胎",lbl_en:"Tire Rotation",interval:6250},
  {key:"cabin",icon:"💨",lbl_zh:"空调滤芯",lbl_en:"Cabin Filter",interval:15000},
  {key:"hepa",icon:"🌬",lbl_zh:"HEPA 滤芯",lbl_en:"HEPA Filter",interval:25000},
  {key:"tires",icon:"🛞",lbl_zh:"轮胎更换",lbl_en:"Tire Replacement",interval:35000}
];
var MILE_PRESETS_GAS=[
  {key:"oil",icon:"🛢",lbl_zh:"换机油",lbl_en:"Oil Change",interval:5000},
  {key:"rotate",icon:"🔄",lbl_zh:"转胎",lbl_en:"Tire Rotation",interval:5000},
  {key:"airfilter",icon:"🌬",lbl_zh:"空气滤清器",lbl_en:"Air Filter",interval:15000},
  {key:"cabin",icon:"💨",lbl_zh:"空调滤芯",lbl_en:"Cabin Filter",interval:15000},
  {key:"sparkplug",icon:"⚡",lbl_zh:"火花塞",lbl_en:"Spark Plugs",interval:30000},
  {key:"brakefluid",icon:"🛑",lbl_zh:"刹车油",lbl_en:"Brake Fluid",interval:30000},
  {key:"transmission",icon:"⚙",lbl_zh:"变速箱油",lbl_en:"Transmission Fluid",interval:30000},
  {key:"tires",icon:"🛞",lbl_zh:"轮胎更换",lbl_en:"Tire Replacement",interval:35000}
];
var LICTYPES_ZH=["TLC 驾驶执照(2年·$252)","TLC 车辆执照FHV(1年)","DMV 驾驶执照","商业保险单","车辆注册","车辆年检(每4个月)","验毒证明","指纹背景调查","TLC 24小时培训课程","DDC防御驾驶课程(每3年)","WAV轮椅车辆培训","体检证明","FS-6T保险申报表","其他证件"];
var LICTYPES_EN=["TLC Driver License (2yr·$252)","TLC FHV Vehicle License (1yr)","DMV Driver License","Commercial Insurance","Vehicle Registration","Vehicle Inspection (every 4 mo)","Drug Test","Fingerprint Background Check","TLC 24-hour Training","DDC Defensive Driving Course (every 3yr)","WAV Wheelchair Vehicle Training","Medical Exam","FS-6T Insurance Form","Other License"];
var LICTYPES=LICTYPES_ZH;
var CARBRANDS=["Acura","Audi","BMW","Buick","Cadillac","Chevrolet","Chrysler","Dodge","Ford","Genesis","GMC","Honda","Hyundai","Infiniti","Jaguar","Jeep","Kia","Land Rover","Lexus","Lincoln","Mazda","Mercedes-Benz","Mitsubishi","Nissan","Polestar","Porsche","Ram","Rivian","Subaru","Tesla","Toyota","Volkswagen","Volvo","Other"];

// Brand → common models for NYC rideshare drivers
var CARMODELS = {
  "Tesla": ["Model 3","Model Y","Model S","Model X","Cybertruck"],
  "Toyota": ["Camry","Corolla","Prius","Prius Prime","RAV4","Highlander","Sienna","Avalon","Venza"],
  "Honda": ["Accord","Civic","CR-V","HR-V","Pilot","Odyssey","Insight"],
  "Hyundai": ["Sonata","Elantra","Ioniq 5","Ioniq 6","Tucson","Santa Fe","Kona","Palisade"],
  "Kia": ["K5","Forte","Niro","EV6","Sportage","Sorento","Telluride","Carnival"],
  "Nissan": ["Altima","Sentra","Maxima","Leaf","Ariya","Rogue","Pathfinder","Murano"],
  "Chevrolet": ["Malibu","Impala","Bolt EV","Bolt EUV","Equinox","Traverse","Tahoe","Suburban"],
  "Ford": ["Fusion","Escape","Edge","Explorer","Mustang Mach-E","F-150 Lightning","Maverick"],
  "Lexus": ["ES","ES Hybrid","RX","RX Hybrid","NX","NX Hybrid","UX","GX","LS"],
  "BMW": ["3 Series","5 Series","7 Series","X3","X5","X7","i4","iX","i7"],
  "Mercedes-Benz": ["C-Class","E-Class","S-Class","GLC","GLE","GLS","EQE","EQS"],
  "Audi": ["A4","A6","A8","Q3","Q5","Q7","Q8","e-tron","Q4 e-tron"],
  "Acura": ["TLX","ILX","RDX","MDX","Integra"],
  "Infiniti": ["Q50","Q60","QX50","QX55","QX60","QX80"],
  "Cadillac": ["CT4","CT5","XT4","XT5","XT6","Lyriq","Escalade"],
  "Lincoln": ["Continental","MKZ","Nautilus","Aviator","Navigator"],
  "Mazda": ["3","6","CX-30","CX-5","CX-50","CX-9","CX-90","MX-30"],
  "Subaru": ["Impreza","Legacy","Outback","Forester","Ascent","Crosstrek","Solterra"],
  "Volkswagen": ["Jetta","Passat","Arteon","Tiguan","Atlas","ID.4"],
  "Volvo": ["S60","S90","XC40","XC60","XC90","C40 Recharge"],
  "Jeep": ["Compass","Cherokee","Grand Cherokee","Wrangler","Wrangler 4xe","Grand Wagoneer"],
  "Chrysler": ["300","Pacifica","Pacifica Hybrid","Voyager"],
  "Dodge": ["Charger","Challenger","Durango","Hornet"],
  "Buick": ["Encore","Encore GX","Envision","Enclave"],
  "GMC": ["Terrain","Acadia","Yukon","Yukon XL","Hummer EV"],
  "Genesis": ["G70","G80","G90","GV60","GV70","GV80"],
  "Jaguar": ["XF","F-Pace","E-Pace","I-Pace"],
  "Land Rover": ["Range Rover","Range Rover Sport","Range Rover Velar","Range Rover Evoque","Discovery","Defender"],
  "Mitsubishi": ["Mirage","Outlander","Outlander PHEV","Eclipse Cross"],
  "Polestar": ["Polestar 2","Polestar 3","Polestar 4"],
  "Porsche": ["911","Panamera","Macan","Cayenne","Taycan"],
  "Ram": ["1500","1500 Classic","2500","ProMaster"],
  "Rivian": ["R1T","R1S"]
};
var ICONS=["💼","🚗","⛽","💰","🔧","📱","🏠","🍔","☕","💊","🔑","💡","🎓","🏥","🛒","⚙","🔄","🛠","🛡","🏷","📶","⭐","🧾","🧮"];
// Global color theme — Tesla-inspired dark tech aesthetic
// Layered backgrounds (deep → mid → elevated) + neon accents + semantic colors
var C={
  // Backgrounds (3 layers for depth)
  bg:    "#0A0E1A",    // deepest — page background, almost pure black with hint of blue
  bg2:   "#121826",    // mid — card surface
  bg3:   "#101828",    // mid-deep — for inset cards, secondary surfaces
  bg4:   "#0F1420",    // sunken — input fields, code blocks
  // Borders (subtle, almost invisible by default)
  border:"#1E2A3F",    // default subtle border
  border2:"#2A3A55",   // hover/focus border
  // Text (high contrast on dark)
  text:  "#F5F7FA",    // primary text, almost white
  text2: "#A0B0C8",    // secondary, labels
  text3: "#5A6B85",    // tertiary, hints
  // Brand accents (Tesla-inspired neon)
  accent:    "#00D4FF", // primary cyan-blue (data, links, focus)
  accent2:   "#5AACFF", // softer blue (icons, decorative)
  // Semantic colors (status)
  success:   "#00E676", // income, positive
  successDim:"#0A4020", // success bg
  warn:      "#FFB347", // warning amber
  warnDim:   "#1A1400",
  danger:    "#FF5252", // expense, negative
  dangerDim: "#1A0808",
  gold:      "#FFD700"  // highlights, premium feel
};
// Design tokens — use these for spacing, radii, shadows
var SPACE={xs:4, sm:8, md:12, lg:16, xl:24, xxl:32};
var RADIUS={sm:8, md:12, lg:16, xl:20};
var SHADOW={
  sm: "0 1px 3px rgba(0,0,0,0.4)",
  md: "0 4px 12px rgba(0,0,0,0.5)",
  lg: "0 8px 24px rgba(0,0,0,0.6)",
  glow:"0 0 20px rgba(0,212,255,0.15)" // cyan glow for primary CTAs
};
var FS={xs:10, sm:11, md:13, lg:15, xl:18, xxl:22, xxxl:28, hero:36};
var FIXSUGG_ZH=[{label:"车贷月付",icon:"🏷",cat:"carloan",day:1},{label:"TLC保险",icon:"🛡",cat:"insurance",day:1},{label:"手机费",icon:"📱",cat:"phonebill",day:15},{label:"健康保险",icon:"🏥",cat:"health",day:1},{label:"Uber Pro",icon:"⭐",cat:"uberpro",day:1}];
var FIXSUGG_EN=[{label:"Car Loan",icon:"🏷",cat:"carloan",day:1},{label:"TLC Insurance",icon:"🛡",cat:"insurance",day:1},{label:"Phone Bill",icon:"📱",cat:"phonebill",day:15},{label:"Health Insurance",icon:"🏥",cat:"health",day:1},{label:"Uber Pro",icon:"⭐",cat:"uberpro",day:1}];
var IS={background:C.bg4,border:"1px solid "+C.border,color:C.text,borderRadius:RADIUS.sm,padding:"10px 12px",fontSize:FS.md,outline:"none",width:"100%",boxSizing:"border-box",transition:"border-color 0.15s, background 0.15s"};
var LINKS=[
  {title:"TLC 官方",title_en:"TLC Official",color:C.accent,links:[{label:"TLC 官网",label_en:"TLC Website",desc:"执照申请、更新、罚单",desc_en:"License apply, renewal, tickets",url:"https://www.nyc.gov/site/tlc"},{label:"LARS 系统",label_en:"LARS System",desc:"在线缴费、更新执照",desc_en:"Online payment, license renewal",url:"https://apps.nyc.gov/lars"},{label:"TLC UP 文件上传",label_en:"TLC UP File Upload",desc:"上传证件文件",desc_en:"Upload license documents",url:"https://tlcup.nyc.gov"}]},
  {title:"背景调查 & 指纹",title_en:"Background & Fingerprint",color:C.gold,links:[{label:"指纹预约 IdentoGO",label_en:"IdentoGO Fingerprint",desc:"背景调查指纹预约（代码 15425Y）",desc_en:"Background check fingerprinting (code 15425Y)",url:"https://uenroll.identogo.com"},{label:"OCA 法院记录查询",label_en:"OCA Court Records",desc:"纽约法院案件记录",desc_en:"NY court case records",url:"https://iapps.courts.state.ny.us/webcivil/ecourtsMain"}]},
  {title:"DDC 防御驾驶课程",title_en:"DDC Defensive Driving",color:C.success,links:[{label:"NSC 全国安全委员会",label_en:"NSC National Safety Council",desc:"NSC DDC 认证课程",desc_en:"NSC DDC certified course",url:"https://www.nsc.org/road-safety"},{label:"I Drive Safely",label_en:"I Drive Safely",desc:"在线DDC课程（TLC认证）",desc_en:"Online DDC course (TLC approved)",url:"https://www.idrivesafely.com"},{label:"DriversEd.com",label_en:"DriversEd.com",desc:"在线防御驾驶课程",desc_en:"Online defensive driving course",url:"https://www.driversed.com/defensive-driving/"}]},
  {title:"纽约 311",title_en:"NYC 311",color:C.success,links:[{label:"311 网页版",label_en:"311 Web Portal",desc:"投诉、举报、城市服务请求",desc_en:"Complaints, reports, city service requests",url:"https://portal.311.nyc.gov"},{label:"311 地图查询",label_en:"311 Map Search",desc:"查看附近的服务请求",desc_en:"View nearby service requests",url:"https://maps.nyc.gov/311"}]},
  {title:"平台司机中心",title_en:"Platform Driver Centers",color:"#AB47BC",links:[{label:"Uber 司机中心",label_en:"Uber Driver Center",desc:"Uber 账单、文件、支持",desc_en:"Uber bills, documents, support",url:"https://drivers.uber.com"},{label:"Lyft 司机中心",label_en:"Lyft Driver Center",desc:"Lyft 账单、文件、支持",desc_en:"Lyft bills, documents, support",url:"https://www.lyft.com/driver"},{label:"Via 司机",label_en:"Via Driver",desc:"Via 司机登录",desc_en:"Via driver login",url:"https://drivers.ridewithvia.com"}]},
  {title:"TLC 公开数据",title_en:"TLC Open Data",color:"#FF9A65",links:[{label:"TLC 行程记录数据",label_en:"TLC Trip Record Data",desc:"每月更新的历史行程数据",desc_en:"Monthly historical trip data",url:"https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page"},{label:"TLC 统计报告",label_en:"TLC Statistical Reports",desc:"行业报告、年度数据",desc_en:"Industry reports, annual data",url:"https://www.nyc.gov/site/tlc/about/data.page"},{label:"NYC Open Data",label_en:"NYC Open Data",desc:"纽约市全部公开数据集",desc_en:"All NYC open data sets",url:"https://opendata.cityofnewyork.us"}]},
  {title:"其他实用网站",title_en:"Other Useful Sites",color:"#B0D4E8",links:[{label:"DMV 纽约州驾照",label_en:"DMV NY State License",desc:"驾照更新、地址变更",desc_en:"License renewal, address change",url:"https://dmv.ny.gov"},{label:"IRS 自雇税指南",label_en:"IRS Self-Employment Tax",desc:"自雇人员税务信息",desc_en:"Self-employed tax info",url:"https://www.irs.gov/businesses/small-businesses-self-employed/self-employed-individuals-tax-center"}]},
];
function p2(n){return n<10?"0"+n:""+n;}
// Days from today (midnight-to-midnight). Positive = future, negative = past, 0 = today.
function daysFromToday(dateStr){if(!dateStr)return null;var p=String(dateStr).split("-");if(p.length<3)return null;var target=new Date(+p[0],+p[1]-1,+p[2]);var now=new Date();var todayMid=new Date(now.getFullYear(),now.getMonth(),now.getDate());return Math.round((target-todayMid)/86400000);}
function today(){var d=new Date();return d.getFullYear()+"-"+p2(d.getMonth()+1)+"-"+p2(d.getDate());}function fmtDate(s){if(!s)return "";var a=s.split("-");if(a.length===3&&a[0].length===4)return a[1]+"-"+a[2]+"-"+a[0];return s;}
function nowTime(){var d=new Date();return p2(d.getHours())+":"+p2(d.getMinutes());}
function curMo(){var d=new Date();return d.getFullYear()+"-"+p2(d.getMonth()+1);}
function curYr(){return ""+new Date().getFullYear();}
function fmt(n){var v=Number(n||0);var sign=v<0?"-":"";var abs=Math.abs(v);var s=abs.toFixed(2);var parts=s.split(".");parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");return sign+"$"+parts.join(".");}
// Format number with 2 decimals (no $ sign) for non-money values
function fmt2(n){return Number(n||0).toFixed(2);}
// Parse Uber Annual Tax Summary + 1099-K + 1099-NEC text (combined).
// Returns parsed object with year, totals, monthly breakdown, OR null if no year found.
function parseUberTaxSummary(text){
  if(!text||text.length<50) return null;
  function num(s){ return parseFloat(String(s).replace(/,/g,"")); }
  var MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];

  // Year — and detect monthly format (e.g. "Tax Summary for 2026/2")
  var monthlyMatch=text.match(/Tax Summary for (\d{4})[\/\-](\d{1,2})\b/);
  var isMonthly=!!monthlyMatch;
  var year, monthNum;
  if(isMonthly){
    year=monthlyMatch[1];
    monthNum=parseInt(monthlyMatch[2],10);
  } else {
    var ym=text.match(/Tax Summary for (\d{4})/);
    year=ym?ym[1]:null;
    if(!year){
      var ym2=text.match(/(20\d{2})\s*\n?\s*Form 1099-/);
      if(ym2) year=ym2[1];
    }
  }
  if(!year) return null;

  // Annual totals
  var kM=text.match(/Gross Trip Earnings\s*\/\s*1099\s*-\s*K\s*\+?\s*\$([\d,]+\.\d{2})/);
  var kTotal=kM?num(kM[1]):0;
  // Fallback: 1099-K box 1a amount
  if(!kTotal){
    var k1a=text.match(/Gross amount of payment.*?\$([\d,]+\.\d{2})/);
    if(k1a) kTotal=num(k1a[1]);
  }

  var necM=text.match(/Total Additional Earnings\s*\/\s*1099\s*-\s*NEC\s*\+?\s*\$([\d,]+\.\d{2})/);
  var necTotal=necM?num(necM[1]):0;
  if(!necTotal){
    var nec1=text.match(/Nonemployee compensation\s*\$?([\d,]+\.\d{2})/);
    if(nec1) necTotal=num(nec1[1]);
  }
  if(!necTotal){
    // Monthly Summary format (page 1): "Total Additional Earnings** + $363.37"
    // and Table 2 (page 2): "TOTAL ADDITIONAL EARNINGS $363.37" — case-insensitive catches both
    var nec2=text.match(/Total Additional Earnings\*{0,2}\s*\+?\s*\$([\d,]+\.\d{2})/i);
    if(nec2) necTotal=num(nec2[1]);
  }

  var tollM=text.match(/Tolls,?\s+(?:airport|Airport)\s+fees.*?\$([\d,]+\.\d{2})/);
  var tollTotal=tollM?num(tollM[1]):0;

  var feesM=text.match(/(?:Expenses,?\s+Fees and Tax|TOTAL EXPENSES,?\s+FEES,?\s+TAX)\s*\+?\s*\$([\d,]+\.\d{2})/);
  var feesTotal=feesM?num(feesM[1]):0;

  var totM=text.match(/Driving Totals\s+([\d,]+)\s+([\d,]+)/);
  var totalTrips=totM?parseInt(totM[1].replace(/,/g,""),10):0;
  var totalMiles=totM?parseInt(totM[2].replace(/,/g,""),10):0;

  // Monthly trips/miles (Table 3)
  var monthlyTrips={}, monthlyMiles={};
  MONTHS.forEach(function(mo){
    var re=new RegExp(mo+"\\s+([\\d,]+)\\s+([\\d,]+)");
    var m=text.match(re);
    if(m){
      // Reject decimals (would mean it matched a $X.XX pattern)
      if(m[1].indexOf(".")<0 && m[2].indexOf(".")<0){
        monthlyTrips[mo]=parseInt(m[1].replace(/,/g,""),10);
        monthlyMiles[mo]=parseInt(m[2].replace(/,/g,""),10);
      }
    }
  });

  // Monthly 1099-K amounts (boxes 5a-5l)
  var monthlyK={};
  MONTHS.forEach(function(mo){
    var re=new RegExp("5[a-l]\\s+"+mo+"\\s*\\$([\\d,]+\\.\\d{2})");
    var m=text.match(re);
    if(m) monthlyK[mo]=num(m[1]);
  });

  // For monthly format: extract Tips and gross-only from Table 3
  var monthlyTips=0, monthlyGrossOnly=0;
  if(isMonthly){
    var tipsM=text.match(/^Tips\s+\$([\d,]+\.\d{2})/m);
    if(tipsM) monthlyTips=num(tipsM[1]);
    var goM=text.match(/^Gross trip earnings\s+\$([\d,]+\.\d{2})/m);
    if(goM) monthlyGrossOnly=num(goM[1]);
  }
  
  return {
    year:year,
    monthNum:monthNum||null,
    isMonthly:isMonthly,
    kTotal:kTotal,
    necTotal:necTotal,
    tollTotal:tollTotal,
    feesTotal:feesTotal,
    totalTrips:totalTrips,
    totalMiles:totalMiles,
    monthlyTrips:monthlyTrips,
    monthlyMiles:monthlyMiles,
    monthlyK:monthlyK,
    monthlyTips:monthlyTips,
    monthlyGrossOnly:monthlyGrossOnly,
    hasMonthly:Object.keys(monthlyK).length>=12,
    hasTrips:Object.keys(monthlyTrips).length>=12
  };
}

// Open the report HTML in a hidden iframe and trigger the native print dialog.
// User picks "Save as PDF" / "Save to Files" — produces real text PDFs (selectable,
// searchable, small). No library needed; works offline forever.
// Parse Uber weekly statement plain text (copy-pasted from PDF) into a wl-compatible entry.
// Returns { weekStart, weekEnd, platform, grossFare, tips, bonus, tollReimbursed, notes } or null.
// Extract all text content from a PDF File using PDF.js.
// Returns a Promise<string>. Errors propagate.
function extractPdfText(file){
  return new Promise(function(resolve, reject){
    if(!window.pdfjsLib){
      reject(new Error("PDF.js library not loaded"));
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e){
      var typedArray = new Uint8Array(e.target.result);
      window.pdfjsLib.getDocument({data:typedArray}).promise.then(function(pdf){
        var pagePromises = [];
        for(var i=1; i<=pdf.numPages; i++){
          pagePromises.push(pdf.getPage(i).then(function(page){
            return page.getTextContent().then(function(content){
              // Join items with spaces, preserving line breaks where the y-position changes significantly
              var lastY = null;
              var lines = [];
              var currentLine = [];
              content.items.forEach(function(item){
                var y = item.transform ? item.transform[5] : 0;
                if(lastY !== null && Math.abs(y - lastY) > 3){
                  if(currentLine.length) lines.push(currentLine.join(" "));
                  currentLine = [];
                }
                if(item.str) currentLine.push(item.str);
                lastY = y;
              });
              if(currentLine.length) lines.push(currentLine.join(" "));
              return lines.join("\n");
            });
          }));
        }
        Promise.all(pagePromises).then(function(pageTexts){
          resolve(pageTexts.join("\n\n"));
        }).catch(reject);
      }).catch(reject);
    };
    reader.onerror = function(){ reject(new Error("Failed to read PDF file")); };
    reader.readAsArrayBuffer(file);
  });
}

// Parse Fuelio monthly report PDF text into a list of expense entries.
// Auto-detects EV vs gas car based on "Total fuel" units (kWh vs gal).
// Returns: { isEv, period, entries: [{date, category, amount, qty, odometer, notes}] }
function parseFuelioReport(text){
  var result = { isEv:false, period:"", entries:[], stats:{count:0, totalCost:0, byCategory:{}}, error:null };
  // Detect EV from "Total fuel ... kWh" vs "... gal"
  var totalFuelM = text.match(/Total fuel\s*\n?\s*([\d,.]+)\s*(kWh|gal|liter|gallon)/i);
  result.isEv = totalFuelM ? /kwh/i.test(totalFuelM[2]) : /TESLA|Tesla|electric/i.test(text);
  // Period
  var periodM = text.match(/Period:\s*(\d{2})-(\d{2})-(\d{4})\s*[–-]\s*(\d{2})-(\d{2})-(\d{4})/);
  if(periodM){ result.period = periodM[3]+"-"+periodM[1]; }
  // Category mapping (Fuelio label → app category id)
  // Order matters: more specific patterns first
  var categoryMap = [
    [/^Gas\s*:?/i,                              result.isEv ? "charging" : "fuel"],
    [/charg|Supercharger|^Electric/i,           "charging"],
    [/^Tolls?.*EZpass/i,                        "toll"],
    [/^Tolls?\s*:?/i,                           "toll"],
    [/Congestion/i,                             "congestion"],
    [/Home Made Coffee|Home-?made Coffee/i,     "coffee"],
    // Uber Expenses Fees Tax — recognize category but mark as ignored (not an expense, belongs in monthly stmt)
    [/Uber Expenses,?\s*Fees?\s*&?\s*Tax/i,     "_ignore_uberexp"],
    [/Uber Fee|Black Car Fund/i,                "platform"],
    [/^Parking for EV Charging/i,               "parking"],
    [/^Parking Meter/i,                         "parking"],
    [/^Parking Ticket|Parking Violation/i,      "ticket"],
    [/^Parking\s*:?|Garage|Meter/i,             "parking"],
    [/^Insurance.*TLC/i,                        "insurance"],
    [/^Insurance\s*:?|Liability/i,              "insurance"],
    [/^Loan.*Auto Loan APY/i,                   "carloan"],
    [/^Loan.*Auto Loan/i,                       "carloan"],
    [/^Loan\s*:?|Car Payment|Finance/i,         "carloan"],
    [/^Phone Bill|Verizon|T-?Mobile|AT&T/i,     "phonebill"],
    [/^DMV Registration|Registration/i,         "dmv"],
    [/^TLC Vehicle License|FHV/i,               "fhv"],
    [/^TLC.*Inspection|Inspection/i,            "fhv"],
    [/^TLC.*Driver/i,                           "tlc"],
    [/Drug Test/i,                              "drug"],
    [/Fingerprint/i,                            "finger"],
    [/Defensive Driving/i,                      "defensive"],
    [/WAV.*Training|Wheelchair/i,               "wav"],
    [/Medical|Physical Exam/i,                  "medical"],
    [/Background.*Check/i,                      "background"],
    [/^Dunkin|Coffee|Starbucks/i,               "coffee"],
    [/^Wash|Car Wash|Detail/i,                  "carwash"],
    [/^Parts/i,                                 "other"],
    [/^TESLA service/i,                         "maint"],
    [/Oil Change|Engine Oil/i,                  "oil"],
    [/^Tires|Tire/i,                            "tires"],
    [/^Wipers|Wiper/i,                          "wipers"],
    [/Brake/i,                                  "brakes"],
    [/Battery/i,                                "battery"],
    [/^Service|Maintenance|Tune Up|Alignment|Rotation/i,  "maint"],
    [/Repair|Body Shop|Collision/i,             "repair"],
    [/Ticket|Violation|Fine/i,                  "ticket"],
    [/Lawyer|Attorney|Legal/i,                  "other"],
    [/Health Insurance/i,                       "health"],
    [/Quarterly Tax|Estimated Tax/i,            "tax"],
    [/Accountant|CPA|Tax Prep/i,                "accountant"],
    [/Black Car|Uber Fee/i,                     "platform"]
  ];
  // Skip patterns — these are NOT expenses
  // Skip patterns — these are NOT expenses (income, headers, etc.)
  var skipPatterns = [
    /UBER INCOME/i,                  // income, not expense
    /^Uber Paid/i,                   // income detail line
    /^Income\s*$/i,
    /^Records\s/i,
    /^Total\b/i,
    /^Period:/i,
    /^By Month/i,
    /^Distance/i,
    /^Fuel consumption/i,
    /^Average cost/i,
    /^TESLA Y/i,
    /^License plate/i,
    /^VIN:/i,
    /^Report\b/i
  ];
  function categorize(label){
    for(var i=0;i<categoryMap.length;i++){
      if(categoryMap[i][0].test(label)) return categoryMap[i][1];
    }
    return null;
  }
  // Split text into lines, normalize whitespace
  // Pre-process: PDF text extraction sometimes glues amount + next date together
  // e.g. "$4.6701-12-2026" → "$4.67\n01-12-2026"
  // e.g. "$10.00Phone Bill" → "$10.00\nPhone Bill"
  // e.g. "1.33 mi/kWhRevel" → "1.33 mi/kWh\nRevel"
  text = text.replace(/(\$\d[\d,]*\.\d{2})(\d{2}-\d{2}-\d{4})/g, "$1\n$2");
  text = text.replace(/(\$\d[\d,]*\.\d{2})([A-Z])/g, "$1\n$2");
  text = text.replace(/(\d+\s*mi\/kWh)([A-Z])/g, "$1\n$2");
  text = text.replace(/(\d+\.\d+\s*kWh)([A-Z])/g, "$1\n$2");
  text = text.replace(/(\$\d[\d,]*\.\d{2})([\u4e00-\u9fff])/g, "$1\n$2");
  // CRITICAL: location/notes text glued to next date — e.g. "Lower Eastside.01-09-2026" or "11378 01-24-2026"
  // Date format MM-DD-YYYY where MM is 01-12 — fairly safe
  text = text.replace(/([A-Za-z\u4e00-\u9fff,.\s)\]\d])\s*(0[1-9]-\d{2}-\d{4}|1[0-2]-\d{2}-\d{4})/g, function(m, p1, p2){
    // Don't split if p1 is part of an already-existing date (e.g. "MM-DD-YYYY" where YYYY ends with digit)
    return p1 + "\n" + p2;
  });
  var lines = text.split(/\n+/).map(function(l){return l.trim();}).filter(function(l){return l.length>0;});
  // Find "By Month" anchor — entries start after it
  var startIdx = -1;
  for(var i=0;i<lines.length;i++){
    if(/^By Month\b/i.test(lines[i])){ startIdx = i+1; break; }
  }
  if(startIdx < 0){ result.error = "Could not find 'By Month' section"; return result; }
  // Walk through lines after "By Month". Pattern is roughly:
  // [Category line OR YYYY-MM] → date (MM-DD-YYYY) → odometer (X,XXX mi) → amount ($XX.XX) → location → notes
  // We track current category by looking back at the most recent category-like line.
  var currentCategory = null;
  var currentCategoryLabel = "";
  var i2 = startIdx;
  while(i2 < lines.length){
    var line = lines[i2];
    // Skip noise
    var skip = false;
    for(var s=0;s<skipPatterns.length;s++){ if(skipPatterns[s].test(line)){ skip=true; break; } }
    if(skip){ i2++; continue; }
    // Year-month header (like "2023-08") — informational, skip
    if(/^\d{4}-\d{2}\s*$/.test(line)){ i2++; continue; }
    // Category header: any line ending with ": $XX.XX" or just "$XX.XX"
    // Examples: "Gas: $288.01" / "(Home Made Coffee): $88.73" / "☕ ☕ ☕ (Home Made Coffee): $88.73"
    // / "Phone Bill - Verizon 📱 💵 : $89.62" / "保 险 费 ⼜ 起 价 了 UBER INCOME 🚖..."
    // First char can be anything (emoji, unicode, parens, letters). categorize() validates.
    var catM = line.match(/^(\S[^\n]*?)\s*:?\s*-?\$([\d,]+\.\d{2})\s*$/);
    if(catM){
      var label = catM[1].trim();
      var catId = categorize(label);
      // CHANGED: If we don't recognize the category, default to "other" instead of skipping
      // This way users don't lose data — they can re-categorize later
      currentCategory = catId || "other";
      currentCategoryLabel = label;
      i2++; continue;
    }
    // Date line: MM-DD-YYYY (with optional inline content)
    // Format A (Gas/Charging): just "01-28-2026" → next lines have odo/amount/notes
    // Format B (other categories): "01-28-2026 Description $XX.XX [optional miles]"
    var dateOnly = line.match(/^(\d{2})-(\d{2})-(\d{4})\s*$/);
    var dateInline = line.match(/^(\d{2})-(\d{2})-(\d{4})\s+(.+)$/);
    var dateM = dateOnly || dateInline;
    if(dateM){
      var dateStr = dateM[3]+"-"+dateM[1]+"-"+dateM[2];
      // FORMAT B: inline content — try to extract amount + notes from the rest of the line
      if(dateInline){
        var rest = dateM[4];
        // Find the FIRST $ amount in the rest of the line
        var inlineAmtM = rest.match(/\$([\d,]+\.\d{2})/);
        if(inlineAmtM){
          var amount = parseFloat(inlineAmtM[1].replace(/,/g,""));
          // Notes = everything before the $ amount
          var notes = rest.substring(0, rest.indexOf(inlineAmtM[0])).trim();
          // Optional: trailing miles after amount, like "$10.00 45,152 mi"
          var afterAmt = rest.substring(rest.indexOf(inlineAmtM[0]) + inlineAmtM[0].length).trim();
          var odoM = afterAmt.match(/^([\d,]+)\s*mi/);
          var odo = odoM ? parseInt(odoM[1].replace(/,/g,""), 10) : 0;
          // Strip trailing punctuation from notes
          notes = notes.replace(/[.,;:]+$/,'').trim();
          if(currentCategory && amount > 0){
            // Skip if this is income (negative amount marker, or category looks like income)
            if(currentCategory === "income" || /^_ignore_/.test(currentCategory) || /UBER INCOME|Uber Paid/i.test(currentCategoryLabel + " " + notes)){
              i2++; continue;
            }
            var noteText = notes;
            var isUnrecognized = currentCategory === "other" && !/^Other\b/i.test(currentCategoryLabel);
            if(isUnrecognized && currentCategoryLabel){
              noteText = "[" + currentCategoryLabel + "]" + (noteText ? " · "+noteText : "");
            }
            result.entries.push({
              date: dateStr,
              category: currentCategory,
              categoryLabel: currentCategoryLabel,
              amount: amount,
              odometer: odo,
              notes: noteText
            });
            result.stats.count++;
            result.stats.totalCost += amount;
            result.stats.byCategory[currentCategory] = (result.stats.byCategory[currentCategory]||0) + amount;
          }
          i2++; continue;
        }
        // No amount on inline line — fall through to multi-line parsing below
      }
      // FORMAT A: Multi-line — look ahead for odo/amount/notes on subsequent lines
      var odo = 0, amount = 0, notes = "", location = "";
      var look = i2+1;
      // Try to find odometer in next 1-2 lines (but description might be there instead)
      if(look < lines.length){
        var odoM = lines[look].match(/^([\d,]+)\s*mi\s*$/);
        if(odoM){
          odo = parseInt(odoM[1].replace(/,/g,""), 10);
          look++;
        }
      }
      // Amount — "$26.10" — search up to 3 lines forward (description might come before amount)
      var amtFoundAt = -1;
      for(var ax = look; ax < Math.min(look + 3, lines.length); ax++){
        var amtTry = lines[ax].match(/^\$([\d,]+\.\d{2})\s*$/) || lines[ax].match(/^\$([\d,]+\.\d{2})/);
        if(amtTry){
          amount = parseFloat(amtTry[1].replace(/,/g,""));
          amtFoundAt = ax;
          // Lines BETWEEN look and amtFoundAt are description (e.g. "Coffee", "Uber Expense Fee and Tax")
          for(var nx = look; nx < amtFoundAt; nx++){
            notes += (notes?" · ":"") + lines[nx];
          }
          look = ax + 1;
          break;
        }
      }
      // Location (free text, 1 line) — only if we have amount
      if(amount > 0 && look < lines.length && !/^\d{2}-\d{2}-\d{4}/.test(lines[look]) && !/^\$/.test(lines[look])){
        // Don't grab if it looks like a category header
        var locCatTest = lines[look].match(/^(\S[^\n]*?)\s*:?\s*-?\$[\d,]+\.\d{2}\s*$/);
        if(!locCatTest){
          location = lines[look];
          look++;
        }
      }
      // Notes (free text, optional 1-2 lines until next date or category)
      while(look < lines.length){
        var nl = lines[look];
        if(/^\d{2}-\d{2}-\d{4}/.test(nl)) break;
        if(/^\$[\d,]+\.\d{2}\s*$/.test(nl)) break;
        if(/^\d{4}-\d{2}\s*$/.test(nl)) break;
        // Stop at next category header (also allow parens/brackets/negative/emoji)
        var ncatM = nl.match(/^(\S[^\n]*?)\s*:?\s*-?\$[\d,]+\.\d{2}\s*$/);
        if(ncatM){ break; }
        // Stop at income/skip lines (UBER INCOME, Uber Paid, etc) — they don't belong in notes
        var isSkipLine = false;
        for(var sk=0; sk<skipPatterns.length; sk++){
          if(skipPatterns[sk].test(nl)){ isSkipLine = true; break; }
        }
        if(isSkipLine) break;
        notes += (notes?" · ":"") + nl;
        look++;
        if(look - i2 > 5) break; // safety
      }
      if(currentCategory && amount > 0){
        // Skip income (check label + notes + location for Uber Paid / UBER INCOME markers)
        if(currentCategory === "income" || /^_ignore_/.test(currentCategory) || /UBER INCOME|Uber Paid/i.test(currentCategoryLabel + " " + notes + " " + location)){
          i2 = look; continue;
        }
        var noteText = location ? (location + (notes ? " · "+notes : "")) : notes;
        var isUnrecognized2 = currentCategory === "other" && !/^Other\b/i.test(currentCategoryLabel);
        if(isUnrecognized2 && currentCategoryLabel){
          noteText = "[" + currentCategoryLabel + "]" + (noteText ? " · "+noteText : "");
        }
        result.entries.push({
          date: dateStr,
          category: currentCategory,
          categoryLabel: currentCategoryLabel,
          amount: amount,
          odometer: odo,
          notes: noteText
        });
        result.stats.count++;
        result.stats.totalCost += amount;
        result.stats.byCategory[currentCategory] = (result.stats.byCategory[currentCategory]||0) + amount;
      } else if(amount === 0 && currentCategory){
        // Skip $0 entries silently (free charging, etc.)
      }
      i2 = look;
      continue;
    }
    i2++;
  }
  return result;
}

// Parse Fuelio CSV export — much more accurate than PDF.
// CSV has multiple sections: ## Vehicle, ## Log (charging/fuel), ## CostCategories, ## Costs.
// Returns same shape as parseFuelioReport: { isEv, period, entries, stats, error }
function parseFuelioCSV(text){
  var result = { isEv:false, period:"", entries:[], stats:{count:0, totalCost:0, byCategory:{}}, error:null, vehicleName:"" };
  if(!window.XLSX){ result.error = "XLSX library not loaded"; return result; }
  // Map Fuelio's CostTypeID (and category name patterns) to our app's category id
  var categoryMap = function(name){
    if(!name) return "other";
    var n = name.toLowerCase();
    // EV-specific & fuel
    if(/charg|electric|kwh|tesla supercharger/i.test(n)) return "charging";
    if(/^gas$|gasoline|petrol|diesel|fuel$/i.test(n)) return "fuel";
    // Toll / congestion
    if(/toll|ezpass|e-zpass|e zpass/i.test(n)) return "toll";
    if(/congestion/i.test(n)) return "congestion";
    // Parking
    if(/parking ticket|parking violation/i.test(n)) return "ticket";
    if(/parking|garage|meter/i.test(n)) return "parking";
    // Insurance
    if(/insurance|liability/i.test(n)) return "insurance";
    // Loan
    if(/loan|finance|car payment|monthly payment/i.test(n)) return "carloan";
    // Wash
    if(/wash|detail|clean/i.test(n)) return "carwash";
    // Phone
    if(/phone|verizon|t-mobile|tmobile|att|at&t|cell/i.test(n)) return "phonebill";
    // Coffee / meals
    if(/coffee|starbucks|dunkin|☕/i.test(n)) return "coffee";
    if(/meal|lunch|food|breakfast|dinner|🍔|🍱/i.test(n)) return "meals";
    // Maintenance / repair
    if(/oil change|engine oil/i.test(n)) return "oil";
    if(/tire|wheel/i.test(n)) return "tires";
    if(/brake/i.test(n)) return "brakes";
    if(/battery/i.test(n)) return "battery";
    if(/maint|service|tune|alignment|rotation|inspection.*every/i.test(n)) return "maint";
    if(/repair|修车|fix|body shop|collision/i.test(n)) return "repair";
    // License / TLC / DMV
    if(/tlc.*driver/i.test(n)) return "tlc";
    if(/tlc.*vehicle|tlc.*license renewal|fhv/i.test(n)) return "fhv";
    if(/dmv|registration/i.test(n)) return "dmv";
    if(/drug test/i.test(n)) return "drug";
    if(/fingerprint|finger print/i.test(n)) return "finger";
    if(/defensive driving|ddc/i.test(n)) return "defensive";
    if(/wav training|wheelchair/i.test(n)) return "wav";
    if(/medical|physical|exam/i.test(n)) return "medical";
    if(/background.*check/i.test(n)) return "background";
    // Tickets (non-parking)
    if(/ticket|violation|fine|moving/i.test(n)) return "ticket";
    if(/lawyer|attorney|legal/i.test(n)) return "other";
    // Health / tax / accountant
    if(/health insurance/i.test(n)) return "health";
    if(/quarterly tax|estimated tax/i.test(n)) return "tax";
    if(/accountant|cpa|tax prep/i.test(n)) return "accountant";
    // Black Car Fund / Uber-related
    if(/uber expenses|uber fee|uber tax|black car/i.test(n)) return "platform";
    // Default
    return "other";
  };
  try{
    // Split text by section markers. Each section starts with "## SectionName" line.
    var lines = text.split(/\r?\n/);
    var sections = {};
    var curName = null;
    var curBuf = [];
    for(var i=0;i<lines.length;i++){
      var line = lines[i];
      var m = line.match(/^"?##\s*([A-Za-z]+)"?\s*$/);
      if(m){
        if(curName) sections[curName] = curBuf.join("\n");
        curName = m[1];
        curBuf = [];
      } else if(curName){
        curBuf.push(line);
      }
    }
    if(curName) sections[curName] = curBuf.join("\n");
    // Helper: parse a CSV section with SheetJS
    var parseCSVSection = function(csvText){
      if(!csvText || !csvText.trim()) return [];
      try{
        var wb = window.XLSX.read(csvText, {type:"string", raw:false});
        var sheet = wb.Sheets[wb.SheetNames[0]];
        return window.XLSX.utils.sheet_to_json(sheet, {raw:false, defval:""});
      }catch(e){ return []; }
    };
    // === 1) Vehicle: detect EV vs gas ===
    var vehicleRows = parseCSVSection(sections.Vehicle);
    if(vehicleRows.length){
      var v = vehicleRows[0];
      result.vehicleName = v.Name || v.Make || "";
      // Detect EV: by Make/Name (Tesla etc) OR FuelType in Log section starts with "6" (Fuelio uses 600+ for electric)
      // Tank1Type is unreliable (Fuelio uses different codes across versions)
      result.isEv = /tesla|electric|model\s*[3sxy]|polestar|rivian|lucid|nissan leaf|chevy bolt|ev$|byd/i.test((v.Make||"") + " " + (v.Name||"") + " " + (v.Model||""));
    }
    // Also check Log entries: if any has kWh > 0 with no Liter/Gallon, it's EV
    var logRowsPreview = parseCSVSection(sections.Log);
    if(!result.isEv && logRowsPreview.length){
      var hasKwh = logRowsPreview.some(function(r){return parseFloat(r.kWh||"0") > 0;});
      var hasLiter = logRowsPreview.some(function(r){return parseFloat(r.Liter||r.Gallon||"0") > 0;});
      if(hasKwh && !hasLiter) result.isEv = true;
    }
    // === 2) Log: charging/fuel records ===
    var logRows = logRowsPreview;
    var fuelCat = result.isEv ? "charging" : "fuel";
    logRows.forEach(function(row){
      var dt = row.Data || row.Date || "";
      // Date format: "yyyy-MM-dd HH:mm" or "yyyy-MM-dd"
      var dm = dt.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if(!dm) return;
      var date = dm[1]+"-"+dm[2]+"-"+dm[3];
      var time = dt.length>10 ? dt.slice(11,16) : "";
      var price = parseFloat(row["Price (optional)"] || row.Price || "0") || 0;
      var qty = parseFloat(row.kWh || row.Liter || row.Gallon || "0") || 0;
      var odo = parseFloat(row["Odo (mi)"] || row.Odo || "0") || 0;
      var notes = (row["City (optional)"] || row.City || "") + (row["Notes (optional)"] || row.Notes ? " · "+(row["Notes (optional)"]||row.Notes) : "");
      // Even $0 entries kept (per user request)
      result.entries.push({
        date: date,
        time: time,
        category: fuelCat,
        categoryLabel: fuelCat,
        amount: price,
        odometer: Math.round(odo),
        qty: qty,
        notes: notes.trim()
      });
    });
    // === 3) CostCategories: build ID → name lookup ===
    var catRows = parseCSVSection(sections.CostCategories);
    var costCatById = {};
    catRows.forEach(function(c){
      var id = String(c.CostTypeID || "");
      if(id) costCatById[id] = c.Name || "";
    });
    // === 4) Costs: all other expenses ===
    var costRows = parseCSVSection(sections.Costs);
    costRows.forEach(function(row){
      // Skip income (UBER INCOME, etc.) — per user request: completely skip
      if(String(row.isIncome || "0") === "1") return;
      var dt = row.Date || "";
      var dm = dt.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if(!dm) return;
      var date = dm[1]+"-"+dm[2]+"-"+dm[3];
      var time = dt.length>10 ? dt.slice(11,16) : "";
      var amount = parseFloat(row.Cost || "0") || 0;
      // Even $0 entries kept (per user request)
      var ctId = String(row.CostTypeID || "");
      var catName = costCatById[ctId] || row.CostTitle || "Other";
      var catId = categoryMap(catName);
      // Also check title for refinement (sometimes title is more descriptive than category)
      if(catId === "other" && row.CostTitle){
        var fromTitle = categoryMap(row.CostTitle);
        if(fromTitle !== "other") catId = fromTitle;
      }
      var odo = parseFloat(row.Odo || "0") || 0;
      var notes = (row.CostTitle || "") + (row.Notes ? " · "+row.Notes : "");
      // If we fell back to "other", prepend the original Fuelio category name to notes for clarity
      if(catId === "other" && catName && !/^Other$/i.test(catName)){
        notes = "[" + catName + "]" + (notes.trim() ? " · "+notes.trim() : "");
      }
      result.entries.push({
        date: date,
        time: time,
        category: catId,
        categoryLabel: catName,
        amount: amount,
        odometer: Math.round(odo),
        qty: 0,
        notes: notes.trim()
      });
    });
    // Sort by date desc (newest first)
    result.entries.sort(function(a,b){return (b.date||"").localeCompare(a.date||"");});
    // Stats
    if(result.entries.length){
      result.period = result.entries[result.entries.length-1].date.slice(0,7) + " → " + result.entries[0].date.slice(0,7);
      result.entries.forEach(function(e){
        result.stats.count++;
        result.stats.totalCost += e.amount;
        result.stats.byCategory[e.category] = (result.stats.byCategory[e.category]||0) + e.amount;
      });
    }
  }catch(err){
    result.error = err.message;
  }
  return result;
}

function parseUberStatement(text){
  if(!text||text.length<50) return null;
  var MONTHS={Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12};
  function fmtDate(mAbbr,day,year){
    var m=MONTHS[mAbbr]; if(!m) return null;
    var d=parseInt(day,10);
    return year+"-"+(m<10?"0":"")+m+"-"+(d<10?"0":"")+d;
  }
  // Date range: e.g. "Feb 23, 2026 4 AM - Mar 2, 2026 4 AM"
  var dre=/([A-Z][a-z]{2})\s+(\d{1,2}),?\s+(\d{4})\s+\d{1,2}\s*[AP]M\s*[\-\u2013\u2014]\s*([A-Z][a-z]{2})\s+(\d{1,2}),?\s+(\d{4})/;
  var dm=text.match(dre);
  if(!dm) return null;
  var weekStart=fmtDate(dm[1],dm[2],dm[3]);
  var weekEnd=fmtDate(dm[4],dm[5],dm[6]);
  if(!weekStart||!weekEnd) return null;
  // Sanity: only accept ranges spanning >= 2 days (avoids partial daily statements)
  // Compute day diff
  var ms=Math.abs(new Date(weekEnd)-new Date(weekStart));
  var dayDiff=Math.round(ms/86400000);
  if(dayDiff<1){ return {error:"This looks like a partial-day statement (range "+weekStart+" to "+weekEnd+"). Please use a full-week statement."}; }
  // Fare: match "Fare" or "Trip Fare" but NOT "customer fare" / "Total customer fare"
  // Use negative lookbehind via word boundary check
  var fareMatches=[]; var m;
  var fareRe=/(?:Trip\s+)?Fare\s*\+?\s*\$([0-9,]+\.\d{2})/gi;
  while((m=fareRe.exec(text))!==null){
    // Check what's BEFORE the match — exclude "customer" or "total"
    var beforeIdx = m.index;
    var preceding = text.slice(Math.max(0, beforeIdx-30), beforeIdx).toLowerCase();
    if(preceding.indexOf("customer") >= 0) continue;
    if(preceding.match(/total\s*$/)) continue;
    fareMatches.push(parseFloat(m[1].replace(/,/g,"")));
  }
  var fare=fareMatches.length>0?Math.max.apply(null,fareMatches):0;
  // Tip parsing: handle "Breakdown of Your earnings" (current week) AND
  // "Breakdown of Your earnings (from previous weeks)" — late tips from prior weeks.
  // Strategy: split text at "(from previous weeks)" if present.
  var prevWeekIdx = text.indexOf("(from previous weeks)");
  var currentText = prevWeekIdx >= 0 ? text.slice(0, prevWeekIdx) : text;
  // prevText: only the immediate (from previous weeks) section, NOT all text after
  // Bound by next "Mike L X of X" footer or next "Breakdown of" or 500 chars max
  var prevText = "";
  if(prevWeekIdx >= 0){
    var prevTail = text.slice(prevWeekIdx);
    // End at next page footer or next Breakdown header or 500 chars
    var endIdx = prevTail.length;
    var p1 = prevTail.indexOf("Mike L", 50);  // skip past current footer
    var p2 = prevTail.indexOf("Breakdown of", 50);
    var p3 = prevTail.indexOf("Weekly Uber service fee");
    [p1,p2,p3].forEach(function(p){ if(p>0 && p<endIdx) endIdx = p; });
    prevText = prevTail.slice(0, Math.min(endIdx, 500));
  }
  
  // Current week tip — tolerate "Tip" or "Tips" with optional + sign
  var tipMatches=[];
  var tipRe=/Tips?\s*\+?\s*\$([0-9,]+\.\d{2})/gi;
  while((m=tipRe.exec(currentText))!==null){ tipMatches.push(parseFloat(m[1].replace(/,/g,""))); }
  var tip=tipMatches.length>0?Math.max.apply(null,tipMatches):0;
  
  // Previous-week leftover tip
  var prevWeekTip = 0;
  if(prevText){
    var ptipMatches=[];
    var ptipRe=/Tips?\s*\+?\s*\$([0-9,]+\.\d{2})/gi;
    while((m=ptipRe.exec(prevText))!==null){ ptipMatches.push(parseFloat(m[1].replace(/,/g,""))); }
    if(ptipMatches.length > 0) prevWeekTip = Math.max.apply(null, ptipMatches);
  }
  // Also check the summary line "Events from previous weeks $X" — covers cases where
  // the breakdown section is missing but summary line exists
  var prevSummaryRe = /Events from previous weeks\s+\$([0-9,]+\.\d{2})/;
  var prevSummaryM = text.match(prevSummaryRe);
  if(prevSummaryM){
    var prevSummary = parseFloat(prevSummaryM[1].replace(/,/g,""));
    if(prevSummary > prevWeekTip) prevWeekTip = prevSummary;
  }
  // Toll refund — tolerate "Toll", "Tolls", "Toll Reimbursement"
  var tollRe=/Tolls?(?:\s+Reimbursement)?\s*\+?\s*\$([0-9,]+\.\d{2})/i;
  var tollM=text.match(tollRe);
  var toll=tollM?parseFloat(tollM[1].replace(/,/g,"")):0;
  // Uber Service Fee (Uber\'s commission/cut) — tax-deductible expense for Schedule C
  // Pattern: "Uber Service Fee $146.28" — appears on Page 5
  var serviceFeeRe = /Uber Service Fee\s+\$([0-9,]+\.\d{2})/i;
  var serviceFeeM = text.match(serviceFeeRe);
  var uberServiceFee = serviceFeeM ? parseFloat(serviceFeeM[1].replace(/,/g,"")) : 0;
  // Payout amount + transferred date
  var payoutAmount=0, payoutDate="";
  var payRe=/Transferred to your bank account on (\w+),\s*(\w+)\s+(\d{1,2}),\s*\d{1,2}:\d{2}\s*[AP]M\s*\$?([0-9,]+\.\d{2})/;
  var payM=text.match(payRe);
  if(payM){
    var monAbbr=payM[2];
    var monMap={Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12};
    var mn=monMap[monAbbr];
    var dy=parseInt(payM[3],10);
    payoutAmount=parseFloat(payM[4].replace(/,/g,""));
    var pyr=parseInt(weekStart.slice(0,4),10);
    if(mn===1 && weekStart.slice(5,7)==="12") pyr++;
    payoutDate=pyr+"-"+(mn<10?"0":"")+mn+"-"+(dy<10?"0":"")+dy;
  } else {
    var poutRe=/Payouts\s+\$([0-9,]+\.\d{2})/;
    var poutM=text.match(poutRe);
    if(poutM) payoutAmount=parseFloat(poutM[1].replace(/,/g,""));
  }
  // Sanity check: "Your earnings" should equal fare + tip
  var earnRe=/Your earnings\s+\$([0-9,]+\.\d{2})/;
  var earnM=text.match(earnRe);
  var statedEarnings=earnM?parseFloat(earnM[1].replace(/,/g,"")):0;
  
  // SELF-HEALING: if fare + tip != statedEarnings (off by >$1), reverse-calculate tip.
  // Trust statedEarnings (appears prominently in summary) and fare (always matches max).
  // This handles cases where mobile PDF copy misorders text.
  var tipReverseUsed = false;
  if(statedEarnings > 0 && fare > 0){
    var calc = fare + tip;
    if(Math.abs(calc - statedEarnings) > 1.0){
      // Try reverse-calc — only adopt if result is sane (positive, < earnings)
      var revTip = statedEarnings - fare;
      if(revTip >= 0 && revTip < statedEarnings){
        tip = Math.round(revTip * 100) / 100;
        tipReverseUsed = true;
      }
    }
  }
  
  // SELF-HEALING for prevWeekTip: trust the "Events from previous weeks $X" summary line
  // which is unambiguous (appears in main summary, not buried).
  // (Already done above via prevSummaryRe — but reinforce: prefer summary over breakdown extraction)
  if(prevSummaryM){
    var prevSummary2 = parseFloat(prevSummaryM[1].replace(/,/g,""));
    // Override prevWeekTip with summary value (more reliable)
    prevWeekTip = prevSummary2;
  }
  // ============ AUDIT: cross-check Uber-stated totals vs our extracted values ============
  // Look for "Refunds & Expenses $X" total (in Weekly Summary)
  var refundsSummaryRe = /Refunds & Expenses\s+\$([0-9,]+\.\d{2})/;
  var refundsSummaryM = text.match(refundsSummaryRe);
  var refundsSummary = refundsSummaryM ? parseFloat(refundsSummaryM[1].replace(/,/g,"")) : 0;
  
  // Look for "Payouts $X" total
  var payoutsTotalRe = /Payouts\s+\$([0-9,]+\.\d{2})/;
  var payoutsTotalM = text.match(payoutsTotalRe);
  var payoutsTotal = payoutsTotalM ? parseFloat(payoutsTotalM[1].replace(/,/g,"")) : 0;
  
  // Audit checks
  var audit = { warnings: [] };
  
  // Check 1: Fare + Tip should equal Your earnings (within $0.50).
  if(tipReverseUsed){
    audit.warnings.push({
      type: "tip_reversed",
      msg: "Tip auto-corrected via reverse-calculation (text copy may have been incomplete). Original parsed tip didn\'t match Uber\'s stated earnings.",
      msgCn: "小费已自动修正（粘贴文字可能不完整，已用 Uber 显示收入反推）。请核对小费是否正确。",
      severity: "med"
    });
  }
  if(statedEarnings > 0 && !tipReverseUsed){
    var calcEarnings = fare + tip;
    var earnDiff = Math.abs(calcEarnings - statedEarnings);
    if(earnDiff >= 0.5){
      audit.warnings.push({
        type: "earnings_mismatch",
        msg: "Fare+Tip ($"+calcEarnings.toFixed(2)+") ≠ Uber stated earnings ($"+statedEarnings.toFixed(2)+"). Off by $"+earnDiff.toFixed(2)+". May be missing income items.",
        msgCn: "总车费+小费 ($"+calcEarnings.toFixed(2)+") ≠ Uber 显示收入 ($"+statedEarnings.toFixed(2)+")。差 $"+earnDiff.toFixed(2)+"。可能有遗漏的收入项。",
        severity: "high"
      });
    }
  }
  
  // Check 2: Refunds breakdown (toll) should equal Refunds total
  if(refundsSummary > 0 && Math.abs(refundsSummary - toll) >= 0.5){
    audit.warnings.push({
      type: "refunds_mismatch",
      msg: "Toll ($"+toll.toFixed(2)+") ≠ Refunds total ($"+refundsSummary.toFixed(2)+"). Other refund types may exist.",
      msgCn: "过桥退款 ($"+toll.toFixed(2)+") ≠ 退款合计 ($"+refundsSummary.toFixed(2)+")。可能有其他类型的退款。",
      severity: "med"
    });
  }
  
  // Check 3: Find all $XX.XX in text that we DIDN'T categorize — they might be missed income
  // Look in the "Breakdown of Your earnings" section specifically
  var earningsBreakdownStart = currentText.indexOf("Breakdown of Your earnings");
  if(earningsBreakdownStart >= 0){
    // Find end of section: next "Breakdown of" or end of currentText
    var nextSection = currentText.indexOf("Breakdown of", earningsBreakdownStart + 30);
    var sectionEnd = nextSection > 0 ? nextSection : earningsBreakdownStart + 2000;
    var earningsSection = currentText.slice(earningsBreakdownStart, Math.min(sectionEnd, earningsBreakdownStart + 2000));
    // Extract labeled $ amounts
    var labelRe = /([A-Z][A-Za-z\s&\-]+?)\s+\$([0-9,]+\.\d{2})/g;
    var foundLabels = [];
    var lm;
    while((lm = labelRe.exec(earningsSection)) !== null){
      var lbl = lm[1].trim();
      var amt = parseFloat(lm[2].replace(/,/g,""));
      // Skip known categories we already handle
      var lblLower = lbl.toLowerCase();
      if(lblLower.indexOf("fare") >= 0) continue;
      if(lblLower.indexOf("tip") >= 0) continue;
      if(lblLower.indexOf("your earnings") >= 0) continue;
      if(lblLower.indexOf("distance") >= 0) continue;  // sub-component of fare
      if(lblLower.indexOf("time") >= 0) continue;  // sub-component of fare
      if(lblLower.indexOf("surge") >= 0) continue;  // sub-component of fare
      if(lblLower.indexOf("minimum fare") >= 0) continue;  // sub-component
      if(lblLower.indexOf("wait time") >= 0) continue;  // sub-component
      if(lblLower.indexOf("reserve premium") >= 0) continue;  // sub-component
      if(lblLower.indexOf("out of town") >= 0) continue;  // sub-component
      if(lblLower.indexOf("supplement") >= 0) continue;  // sub-component
      if(lblLower.indexOf("breakdown") >= 0) continue;  // header
      if(lblLower.indexOf("toll") >= 0) continue;  // tolls handled separately
      if(lblLower.indexOf("refund") >= 0) continue;  // refunds total
      if(lblLower.indexOf("expense") >= 0) continue;  // expense total
      if(lblLower.indexOf("payout") >= 0) continue;  // payout total
      if(lblLower.indexOf("balance") >= 0) continue;  // start/end balance
      if(lblLower.indexOf("transferred") >= 0) continue;  // bank transfer
      if(lblLower.indexOf("events from previous") >= 0) continue;  // prev-week earnings (already in bonus)
      if(amt < 0.01) continue;
      foundLabels.push({label: lbl, amount: amt});
    }
    if(foundLabels.length > 0){
      audit.warnings.push({
        type: "unrecognized_items",
        msg: "Possible uncategorized income items: " + foundLabels.map(function(f){return f.label+" $"+f.amount.toFixed(2);}).join(", "),
        msgCn: "可能有未分类的收入项: " + foundLabels.map(function(f){return f.label+" $"+f.amount.toFixed(2);}).join("、"),
        severity: "high",
        items: foundLabels
      });
    }
  }
  
  return {
    weekStart:weekStart,
    weekEnd:weekEnd,
    platform:"Uber",
    grossFare:fare.toFixed(2),
    tips:tip.toFixed(2),
    bonus:prevWeekTip.toFixed(2),
    tollReimbursed:toll.toFixed(2),
    statedEarnings:statedEarnings.toFixed(2),
    prevWeekTip:prevWeekTip.toFixed(2),
    refundsSummary:refundsSummary.toFixed(2),
    payoutsTotal:payoutsTotal.toFixed(2),
    uberServiceFee:uberServiceFee.toFixed(2),
    audit:audit,
    payoutAmount:payoutAmount?payoutAmount.toFixed(2):"",
    payoutDate:payoutDate||"",
    notes:"Imported from Uber weekly statement ("+weekStart+" – "+weekEnd+")"+(prevWeekTip>0?" + $"+prevWeekTip.toFixed(2)+" prior-week tips":"")
  };
}

function downloadPdf(html, filename){
  try{
    var iframe=document.createElement("iframe");
    iframe.setAttribute("aria-hidden","true");
    iframe.style.cssText="position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;";
    document.body.appendChild(iframe);
    var idoc=iframe.contentDocument||iframe.contentWindow.document;
    // Inject our HTML; the doc <title> becomes the default PDF filename in most browsers.
    idoc.open();
    idoc.write(html);
    idoc.close();
    // Override the title with the suggested filename (without .pdf extension)
    if(filename){
      try{ idoc.title=filename.replace(/\.pdf$/i,""); }catch(e){}
    }
    var fired=false;
    function fire(){
      if(fired) return;
      fired=true;
      try{
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      }catch(err){
        alert("Print failed: "+(err&&err.message?err.message:err));
      }
      // Clean up after print dialog closes (delay so dialog can read the doc)
      setTimeout(function(){
        try{ document.body.removeChild(iframe); }catch(e){}
      },2000);
    }
    // Wait for the iframe document to be ready, then print
    if(idoc.readyState==="complete"){
      setTimeout(fire,150);
    }else{
      iframe.addEventListener("load",function(){ setTimeout(fire,150); });
      // Safety fallback in case load never fires
      setTimeout(fire,1500);
    }
  }catch(e){
    alert("Error: "+e.message);
  }
}
function prevMo(mo){var a=mo.split("-"),y=+a[0],m=+a[1]-1;if(m<1){m=12;y--;}return y+"-"+p2(m);}
function nextMo(mo){var a=mo.split("-"),y=+a[0],m=+a[1]+1;if(m>12){m=1;y++;}return y+"-"+p2(m);}
function getIcon(k,aC){var c=aC[k];return c?c.icon||"💼":"💼";}
function catGrp(k,aC){var c=aC[k];return c?(c.g||c.group||"其他"):"其他";}
function wkMon(dt){var a=dt.split("-"),d=new Date(+a[0],+a[1]-1,+a[2]),dy=d.getDay();d.setDate(d.getDate()+(dy===0?-6:1-dy));return d.getFullYear()+"-"+p2(d.getMonth()+1)+"-"+p2(d.getDate());}
function wkEnd(s){var a=s.split("-"),d=new Date(+a[0],+a[1]-1,+a[2]);d.setDate(d.getDate()+6);return d.getFullYear()+"-"+p2(d.getMonth()+1)+"-"+p2(d.getDate());}
function wkLabel(s){var e=wkEnd(s);return s.slice(5).replace("-","/")+"-"+e.slice(5).replace("-","/")}
function genFixed(fl,month){var now=new Date(),curMonth=now.getFullYear()+"-"+p2(now.getMonth()+1),today=now.getDate();return fl.filter(function(f){if(!f.active||!f.amount)return false;if(month>curMonth)return false;if(f.startDate&&month<f.startDate.slice(0,7))return false;if(f.endDate&&month>f.endDate.slice(0,7))return false;if(month===curMonth&&today<(+f.day||1))return false;return true;}).map(function(f){var amt=f.cycle==="annual"?Math.round(+f.amount/12*100)/100:+f.amount;return {id:"fx_"+f.id+"_"+month,date:month+"-"+p2(+f.day||1),category:f.cat||"other",amount:amt,notes:f.notes||"",isFixed:true,fixedLabel:f.label,fixedIcon:f.icon};});}
function Btn(p){return React.createElement('button', { onClick: p.onClick, style: Object.assign({background:"linear-gradient(135deg,#00D4FF,#0055FF)",border:"none",borderRadius:RADIUS.sm,padding:"10px 18px",color:"#fff",fontSize:FS.md+1,fontWeight:700,cursor:"pointer",boxShadow:SHADOW.glow,transition:"transform 0.1s, box-shadow 0.15s",letterSpacing:0.2},p.style||{}), __self: this, __source: {fileName: _jsxFileName, lineNumber: 37}}, p.children);}
function Card(p){return React.createElement('div', { className: "nyc-card", onClick: p.onClick, style: Object.assign({background:C.bg2,borderRadius:RADIUS.md,padding:"14px 16px",marginBottom:10,border:"1px solid "+C.border,boxShadow:SHADOW.sm},p.style||{}), __self: this, __source: {fileName: _jsxFileName, lineNumber: 38}}, p.children);}
function Empty(p){return React.createElement('div', { style: {textAlign:"center",padding:"50px 20px",color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 39}}, React.createElement('div', { style: {fontSize:48,marginBottom:14,opacity:0.5}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 39}}, "📊"), React.createElement('div', { style: {fontSize:FS.md+1,lineHeight:1.7,fontWeight:500}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 39}}, p.text));}
function Row(p){var fw=p.bold?800:600;var cl=p.color||C.text;return React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #0F1C30"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 40}}, React.createElement('span', { style: {fontSize:14,color:C.text2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 40}}, p.label), React.createElement('span', { style: Object.assign({fontSize:15},{fontWeight:fw,color:cl}), __self: this, __source: {fileName: _jsxFileName, lineNumber: 40}}, p.value));}
function Stat(p){var pad=p.sm?"10px 8px":"14px 12px";var fs1=p.sm?FS.sm:FS.md;var fs2=p.sm?FS.lg:FS.xl;var cl=p.color||C.text;return React.createElement('div', { style: {background:C.bg2,borderRadius:RADIUS.md,padding:pad,border:"1px solid "+C.border,textAlign:"center",boxShadow:SHADOW.sm,transition:"transform 0.15s"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}}, React.createElement('div', { style: {color:C.text2,marginBottom:4,fontSize:fs1,letterSpacing:0.3,fontWeight:500}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}}, p.label), React.createElement('div', { style: {fontWeight:800,fontSize:fs2,color:cl,letterSpacing:-0.3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}}, p.value));}
function ABox(p){return React.createElement('div', { style: {margin:"10px 14px 0",background:p.bg,border:"1px solid "+p.color,borderRadius:RADIUS.md,padding:"12px 14px",fontSize:FS.md+1,color:p.color,display:"flex",gap:10,alignItems:"center",boxShadow:SHADOW.sm,fontWeight:600,letterSpacing:0.1}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 42}}, React.createElement('span', { style: {fontSize:20,filter:"drop-shadow(0 1px 2px rgba(0,0,0,0.4))"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 42}}, p.icon), React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 42}}, p.text));}
function Field(p){var el;if(p.options){el=React.createElement('select', { value: p.value, onChange: function(e){p.onChange(e.target.value);}, style: IS, __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}}, p.options.map(function(o){return React.createElement('option', { key: o[0], value: o[0], __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}}, o[1]);}));}else{var isDateTime=p.type==="date"||p.type==="month"||p.type==="time";var baseStyle=isDateTime?Object.assign({},IS,{colorScheme:"dark",color:C.text,fontSize:17,padding:"14px 16px",cursor:"pointer"}):IS;var inputProps={type:p.type||"text",value:p.value,onChange:function(e){p.onChange(e.target.value);},placeholder:p.placeholder||"",style:baseStyle,__self:this,__source:{fileName:_jsxFileName,lineNumber:43}};if(isDateTime){inputProps.onClick=function(e){try{if(e.currentTarget.showPicker)e.currentTarget.showPicker();}catch(err){}};}else if(p.type==="number"){inputProps.onFocus=function(e){try{e.target.select();}catch(err){}};}if(p.money){inputProps.step="0.01";inputProps.inputMode="decimal";inputProps.onFocus=function(e){try{e.target.select();}catch(err){}};inputProps.onBlur=function(e){var v=e.target.value;if(v===""||isNaN(+v))return;var formatted=(+v).toFixed(2);if(formatted!==v)p.onChange(formatted);};}var inputEl=React.createElement('input',inputProps);// For date/month inputs, wrap with a Today button
if(p.type==="date"||p.type==="month"){
  var todayHandler=function(){
    var d=new Date();
    var todayVal;
    if(p.type==="month")todayVal=d.getFullYear()+"-"+(d.getMonth()+1<10?"0":"")+(d.getMonth()+1);
    else todayVal=d.getFullYear()+"-"+(d.getMonth()+1<10?"0":"")+(d.getMonth()+1)+"-"+(d.getDate()<10?"0":"")+d.getDate();
    // Toggle: if currently equals today, clear; otherwise fill with today
    if(p.value===todayVal)p.onChange("");
    else p.onChange(todayVal);
  };
  el=React.createElement('div',{style:{display:"flex",gap:6}},
    React.createElement('div',{style:{flex:1}},inputEl),
    React.createElement('button',{onClick:function(e){e.preventDefault();e.stopPropagation();todayHandler();},type:"button",style:{background:"linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,85,255,0.1))",border:"1px solid rgba(0,212,255,0.3)",color:C.accent,fontSize:FS.md,fontWeight:700,padding:"0 16px",borderRadius:RADIUS.sm,cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.15s"}}, (typeof document!=="undefined"&&document.documentElement.lang==="en")?"Today":"今天")
  );
}else{el=inputEl;}}return React.createElement('label', { style: {display:"flex",flexDirection:"column",gap:6,fontSize:FS.sm+1,color:C.text2,fontWeight:600,letterSpacing:0.2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}}, p.label, el);}
function Modal(p){return React.createElement('div', { style: {position:"fixed",inset:0,background:C.bg,display:"flex",alignItems:"stretch",justifyContent:"center",zIndex:600,animation:"fadeIn 0.15s ease-out"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}, React.createElement('div', { style: {background:C.bg2,borderRadius:0,width:"100%",maxWidth:"none",border:"none",height:"100vh",maxHeight:"100vh",display:"flex",flexDirection:"column",overflow:"hidden"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}, React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",borderBottom:"1px solid "+C.border,background:C.bg2,flexShrink:0}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}, React.createElement('button', { onClick: p.onClose, style: {background:C.bg3,border:"1px solid "+C.border,color:C.text2,fontSize:13,cursor:"pointer",width:32,height:32,borderRadius:RADIUS.sm,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}, "✕"), React.createElement('div', { style: {fontSize:FS.lg+1,fontWeight:800,color:C.text,letterSpacing:-0.2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}, p.title), React.createElement('button', { onClick: p.onSave, style: {background:"linear-gradient(135deg,#00CFFF,#0044EE)",border:"none",color:"#fff",fontSize:15,cursor:"pointer",width:32,height:32,borderRadius:RADIUS.sm,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:SHADOW.glow,transition:"transform 0.1s"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}, "✓")), React.createElement('div', { style: {padding:"12px 14px 40px",display:"flex",flexDirection:"column",gap:8,overflowY:"auto",flex:1}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}, p.children)));}
var MONTHS=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function MoNav(p){var isEn=p.lang==="en";var moDisp=isEn?MONTHS[+p.val.slice(5)-1]+" "+p.val.slice(0,4):p.val.slice(0,4)+"年 "+p.val.slice(5)+"月";return React.createElement('div', { style: {display:"flex",alignItems:"center",gap:10,marginBottom:p.mb||14,position:"sticky",top:108,zIndex:35,background:"rgba(10,14,26,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",paddingTop:8,paddingBottom:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 45}}, React.createElement('button', { onClick: function(){p.set(prevMo(p.val));}, style: {background:C.bg2,border:"1px solid "+C.border,borderRadius:RADIUS.sm,padding:"10px 16px",color:C.accent2,fontSize:18,cursor:"pointer",fontWeight:700,transition:"all 0.15s"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 45}}, "‹"), React.createElement('button', { onClick: function(){if(p.onPick)p.onPick();}, style: {flex:1,textAlign:"center",fontSize:FS.xl,fontWeight:800,background:C.bg2,border:"1px solid "+C.border,borderRadius:RADIUS.sm,color:C.text,cursor:p.onPick?"pointer":"default",padding:"10px 0",letterSpacing:0.3,boxShadow:SHADOW.sm}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 45}}, moDisp), React.createElement('button', { onClick: function(){p.set(nextMo(p.val));}, style: {background:C.bg2,border:"1px solid "+C.border,borderRadius:RADIUS.sm,padding:"10px 16px",color:C.accent2,fontSize:18,cursor:"pointer",fontWeight:700,transition:"all 0.15s"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 45}}, "›"), p.children);}
function YrNav(p){var yrDisp=p.lang==="en"?p.val:p.val+" 年";return React.createElement('div', { style: {display:"flex",alignItems:"center",gap:10,marginBottom:14,position:"sticky",top:108,zIndex:35,background:"rgba(10,14,26,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",paddingTop:8,paddingBottom:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 46}}, React.createElement('button', { onClick: function(){p.set(String(+p.val-1));}, style: {background:C.bg2,border:"1px solid "+C.border,borderRadius:RADIUS.sm,padding:"10px 16px",color:C.accent2,fontSize:18,cursor:"pointer",fontWeight:700,transition:"all 0.15s"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 46}}, "‹"), React.createElement('button', { onClick: function(){if(p.onPick)p.onPick();}, style: {flex:1,textAlign:"center",fontSize:FS.xl,fontWeight:800,background:C.bg2,border:"1px solid "+C.border,borderRadius:RADIUS.sm,color:C.text,cursor:p.onPick?"pointer":"default",padding:"10px 0",letterSpacing:0.3,boxShadow:SHADOW.sm}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 46}}, yrDisp), React.createElement('button', { onClick: function(){p.set(String(+p.val+1));}, style: {background:C.bg2,border:"1px solid "+C.border,borderRadius:RADIUS.sm,padding:"10px 16px",color:C.accent2,fontSize:18,cursor:"pointer",fontWeight:700,transition:"all 0.15s"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 46}}, "›"));}
function SegBtn(p){return React.createElement('div', { style: {display:"flex",background:C.bg4,borderRadius:RADIUS.md,padding:4,gap:2,marginBottom:p.mb||14,border:"1px solid "+C.border,position:"sticky",top:48,zIndex:40,boxShadow:SHADOW.sm}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 47}}, p.opts.map(function(o,i){var active=p.val===o[0];var bg=active?"linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,85,255,0.1))":"transparent";var cl=active?C.accent:C.text2;var fw=active?700:500;return React.createElement('button', { key: i, onClick: function(){p.set(o[0]);}, style: {flex:1,padding:"10px 12px",borderRadius:RADIUS.sm+1,border:active?"1px solid rgba(0,212,255,0.3)":"1px solid transparent",background:bg,color:cl,fontSize:FS.md,fontWeight:fw,cursor:"pointer",transition:"all 0.15s",letterSpacing:0.2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 47}}, o[1]);}));}
function ExpItem(p){var item=p.item,aC=p.allC,isEn=p.lang==="en",cat=aC[item.category]||{label:isEn?"Other":"其他"},icon=item.isFixed?item.fixedIcon:getIcon(item.category,aC),label=item.isFixed?item.fixedLabel:cat.label,isMo=cat.mo,moPrefix=isEn?"Monthly ":"月结 ";
// Hide placeholder times from imported data ("12:00" charging, "08:00" coffee, "23:59" month-end)
var hideTime=item.time==="12:00"||item.time==="08:00"||item.time==="23:59";
var dateStr=isMo?moPrefix+(item.statementMonth||item.date.slice(0,7)):(item.time&&!hideTime?fmtDate(item.date)+" "+item.time:fmtDate(item.date));
var L_FIXED=isEn?"Fixed":"固定";return React.createElement('div', {style:{cursor:"pointer",background:C.bg2,borderRadius:RADIUS.md,padding:"12px 14px",marginBottom:8,border:"1px solid "+C.border,boxShadow:SHADOW.sm,transition:"transform 0.1s, border-color 0.15s, background 0.15s"}, onClick: p.onEdit}, React.createElement('div', { style: {display:"flex",gap:12,alignItems:"flex-start"}}, React.createElement('div', {style:{width:40,height:40,borderRadius:RADIUS.sm,background:"linear-gradient(135deg, "+C.bg3+", "+C.bg4+")",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0,border:"1px solid "+C.border}}, icon), React.createElement('div', { style: {flex:1,minWidth:0}}, React.createElement('div', { style: {fontSize:FS.lg,fontWeight:700,marginBottom:3,color:C.text,letterSpacing:-0.1}}, label), React.createElement('div', { style: {fontSize:FS.md,color:C.text2,display:"flex",alignItems:"center",gap:6}}, dateStr ), item.notes?React.createElement('div', { style: {fontSize:FS.md-1,color:C.text3,marginTop:2,lineHeight:1.4}}, item.notes):null, item.odometer?React.createElement('div', { style: {fontSize:FS.sm+1,color:C.gold,marginTop:4,fontWeight:600}}, "🛣 " , (+item.odometer).toLocaleString(), " mi", p.distFromLast?" (+"+p.distFromLast+(isEn?" mi since last":" mi 距上次")+")":""):null, item.isFixed?React.createElement('span', { style: {fontSize:FS.xs+1,background:C.successDim,borderRadius:5,padding:"2px 8px",color:C.success,display:"inline-block",marginTop:5,fontWeight:600,letterSpacing:0.3}}, L_FIXED):null), React.createElement('div', { style: {textAlign:"right",flexShrink:0}}, React.createElement('div', { style: {fontSize:FS.xl,fontWeight:800,color:C.text,letterSpacing:-0.3,fontVariantNumeric:"tabular-nums"}}, "−", fmt(item.amount)))));}
// Wrap with React.memo: re-render only when item data, lang, allC, or distFromLast changes.
// Skip checking onEdit/onDel callbacks (they're recreated each render but functionally identical).
ExpItem = React.memo(ExpItem, function(prevP, nextP){
  if(prevP.lang !== nextP.lang) return false;
  if(prevP.distFromLast !== nextP.distFromLast) return false;
  if(prevP.allC !== nextP.allC) return false;
  // Item identity check (most common — same object reference if list unchanged)
  if(prevP.item === nextP.item) return true;
  // Different reference but maybe same data — compare key fields
  var a=prevP.item, b=nextP.item;
  if(a.id!==b.id||a.amount!==b.amount||a.notes!==b.notes||a.odometer!==b.odometer||a.date!==b.date||a.time!==b.time||a.category!==b.category||a.qty!==b.qty) return false;
  return true;
});
// Module-level expansion state (not React state, so it persists across re-renders without hooks)
var __bucketExpanded = {};
function BucketList(p){
  var items=p.items,aC=p.allC,isEn=p.lang==="en";
  if(!items.length)return React.createElement(Empty, { text: p.emptyText||(isEn?"No records":"暂无记录"), __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}} );
  // Build odometer distance map
  var distMap = {};
  var allFills = (p.allEl||items).filter(function(e){return (e.category==="fuel"||e.category==="charging")&&e.odometer&&+e.odometer>0;}).sort(function(a,b){return (+a.odometer)-(+b.odometer);});
  for(var i=0;i<allFills.length;i++){
    var cur=allFills[i];
    if(i>0){var prev=allFills[i-1];var d=+cur.odometer-+prev.odometer;if(d>0&&d<2000)distMap[cur.id]=d;}
  }
  // Force-render counter to make toggle work without hooks
  var forceRerender=p.forceRerender||function(){};
  // Default: collapsed. Explicitly set true = expanded.
  var toggle=function(k){__bucketExpanded[k]=__bucketExpanded[k]===true?false:true;forceRerender();};
  // Group by bucket. "其他" group items are NOT bucketed — each category becomes its own top-level row.
  var B={"车辆":{label:isEn?"🚗 Vehicle":"🚗 车辆",color:C.accent,items:[]},"牌照":{label:isEn?"📋 License":"📋 牌照",color:C.gold,items:[]},"平台":{label:isEn?"📱 Platform":"📱 平台",color:"#AB47BC",items:[]}};
  var otherFlat={};  // {catKey: {label, icon, items[], total, color}}
  items.forEach(function(x){
    var g=catGrp(x.category,aC);
    if(B[g]){
      B[g].items.push(x);
    } else {
      // Other group → flatten by category (each category is its own top-level)
      var k=x.isFixed?"fx_"+x.fixedLabel:x.category;
      var cat=aC[x.category];
      var lbl=x.isFixed?x.fixedLabel:(cat?cat.label:(isEn?"Other":"其他"));
      var ico=x.isFixed?x.fixedIcon:getIcon(x.category,aC);
      if(!otherFlat[k]) otherFlat[k]={label:lbl,icon:ico,items:[],total:0,_catKey:k};
      otherFlat[k].items.push(x);
      otherFlat[k].total+=(+x.amount||0);
    }
  });
  return React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}, ["车辆","牌照","平台"].map(function(bk){
    var bkt=B[bk];if(!bkt.items.length)return null;
    // Bucket subtotal excludes ref-only categories (they're shown for reference, not counted)
    var bT=bkt.items.reduce(function(s,e){var c=aC[e.category];if(c&&c.refOnly)return s;return s+(+e.amount||0);},0);
    var bRefT=bkt.items.reduce(function(s,e){var c=aC[e.category];if(c&&c.refOnly)return s+(+e.amount||0);return s;},0);
    var bcl=bkt.color;
    // Group items by category within this bucket
    var byCat={};
    bkt.items.forEach(function(it){
      var k=it.isFixed?"fx_"+it.fixedLabel:it.category;
      var cat=aC[it.category];
      var lbl=it.isFixed?it.fixedLabel:(cat?cat.label:(isEn?"Other":"其他"));
      var ico=it.isFixed?it.fixedIcon:getIcon(it.category,aC);
      if(!byCat[k]){byCat[k]={label:lbl,icon:ico,items:[],total:0};}
      byCat[k].items.push(it);
      byCat[k].total+=(+it.amount||0);
    });
    // Sort: multi-entry categories first (by amount desc), then single-entry at bottom (by amount desc)
    var catKeys=Object.keys(byCat).sort(function(a,b){
      var aMulti = byCat[a].items.length >= 2;
      var bMulti = byCat[b].items.length >= 2;
      if(aMulti !== bMulti) return aMulti ? -1 : 1;  // multi first
      return byCat[b].total - byCat[a].total;        // within group, by amount
    });
    return React.createElement('div', { key: bk, style: {marginBottom:18}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}
      , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,paddingBottom:6,borderBottom:"2px solid #182540"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}
        , React.createElement('span', { style: Object.assign({fontSize:15,fontWeight:700},{color:bcl}), __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}, bkt.label)
        , React.createElement('span', { style: {fontSize:16,fontWeight:800,color:bcl}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}, fmt(bT))
      )
      , catKeys.map(function(ck){
        var cat=byCat[ck];
        var groupKey=bk+"|"+ck;
        var isExp=__bucketExpanded[groupKey]===true;  // default collapsed — must be explicitly opened
        var catDef = aC[cat.items[0] && cat.items[0].category];
        var isRefOnly = catDef && catDef.refOnly;
        return React.createElement('div', { key: ck, style: {marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}
          , React.createElement('button', { onClick: function(){toggle(groupKey);}, style: {width:"100%",background:isRefOnly?"rgba(255,215,0,0.04)":C.bg2,border:"1px solid "+(isRefOnly?"rgba(255,215,0,0.2)":C.border),borderRadius:10,padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",marginBottom:isExp?8:0}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}
            , React.createElement('div', { style: {display:"flex",alignItems:"center",gap:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}
              , React.createElement('span', { style: {fontSize:18}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}, cat.icon)
              , React.createElement('div', { style: {textAlign:"left"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}
                , React.createElement('div', { style: {fontSize:14,fontWeight:600,color:isRefOnly?"#FFD89A":bcl}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}, cat.label)
                , React.createElement('div', { style: {fontSize:12,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}, cat.items.length+" "+(p.lang==="en"?(cat.items.length===1?"entry":"entries"):"笔"), isRefOnly ? (p.lang==="en"?" · ref only":" · 仅记录") : "")
              )
            )
            , React.createElement('div', { style: {display:"flex",alignItems:"center",gap:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}
              , React.createElement('span', { style: {fontSize:14,fontWeight:600,color:isRefOnly?"#C0A878":bcl}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}, fmt(cat.total))
              , React.createElement('span', { style: {fontSize:13,color:C.text3,minWidth:14}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}, isExp?"▲":"▼")
            )
          )
          , isExp ? React.createElement('div', { style: {paddingLeft:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}
            , p.groupByMonth ? (function(){
                // Year view: aggregate items by month
                var byMo={};
                cat.items.forEach(function(it){
                  var m = it.isFixed ? (it.statementMonth||(it.date||"").slice(0,7)) : (it.date||"").slice(0,7);
                  if(!m) return;
                  if(!byMo[m]) byMo[m] = {month:m, total:0, count:0, items:[]};
                  byMo[m].total += (+it.amount||0);
                  byMo[m].count++;
                  byMo[m].items.push(it);
                });
                var months = Object.values(byMo).sort(function(a,b){return b.month.localeCompare(a.month);});
                return months.map(function(mo){
                  var moExpKey = "ym_"+groupKey+"_"+mo.month;
                  var moIsExp = __bucketExpanded[moExpKey]===true;
                  var moLabel = isEn ? (mo.month.slice(0,4)+"-"+mo.month.slice(5)) : (mo.month.slice(0,4)+"年"+(+mo.month.slice(5))+"月");
                  return React.createElement('div', {key:mo.month, style:{marginBottom:4}},
                    React.createElement('button', {
                      onClick: function(){__bucketExpanded[moExpKey]=!moIsExp;forceRerender();},
                      style: {width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:moIsExp?"#0F1A2A":C.bg2,border:"1px solid "+C.border,borderRadius:8,cursor:"pointer",textAlign:"left"}
                    },
                      React.createElement('span', {style:{fontSize:13,color:C.text2}}, "📅 ", moLabel, React.createElement('span', {style:{fontSize:11,color:C.text3,marginLeft:6}}, "×", mo.count)),
                      React.createElement('span', {style:{display:"flex",alignItems:"center",gap:6}},
                        React.createElement('span', {style:{fontSize:13,fontWeight:700,color:"#FF9A65"}}, fmt(mo.total)),
                        React.createElement('span', {style:{fontSize:11,color:C.text3,minWidth:12}}, moIsExp?"▲":"▼")
                      )
                    ),
                    // Expanded: show individual items in this month
                    moIsExp ? React.createElement('div', {style:{paddingTop:4}},
                      mo.items.slice().sort(function(a,b){
                        var ad = a.isFixed ? (a.statementMonth||"") : (a.date||"");
                        var bd = b.isFixed ? (b.statementMonth||"") : (b.date||"");
                        if(ad !== bd) return bd.localeCompare(ad);
                        return (b.time||"").localeCompare(a.time||"");
                      }).map(function(item){return React.createElement(ExpItem, { key: item.id, item: item, allC: aC, lang: p.lang, distFromLast: distMap[item.id]||null, onDel: function(){var prev=p.el.slice();p.setEl(p.el.filter(function(x){return x.id!==item.id;}));if(p.showUndo){p.showUndo((p.lang==="en"?"✓ Expense deleted":"✓ 支出已删除"), {prevEl:prev});}else if(typeof showToast==="function"){showToast(p.lang==="en"?"✓ Expense deleted":"✓ 支出已删除");}}, onEdit: function(){if(item.isFixed){p.onEditFixed&&p.onEditFixed(item);}else{p.onEditExp&&p.onEditExp(item);}} });})
                    ) : null
                  );
                });
              }()) : cat.items.slice().sort(function(a,b){
                // Sort by date desc; for fixed monthly items use statementMonth, otherwise date.
                var ad = a.isFixed ? (a.statementMonth||"") : (a.date||"");
                var bd = b.isFixed ? (b.statementMonth||"") : (b.date||"");
                if(ad !== bd) return bd.localeCompare(ad);
                // Tiebreak by time (HH:MM) within same date
                return (b.time||"").localeCompare(a.time||"");
              }).map(function(item){return React.createElement(ExpItem, { key: item.id, item: item, allC: aC, lang: p.lang, distFromLast: distMap[item.id]||null, onDel: function(){var prev=p.el.slice();p.setEl(p.el.filter(function(x){return x.id!==item.id;}));if(p.showUndo){p.showUndo((p.lang==="en"?"✓ Expense deleted":"✓ 支出已删除"), {prevEl:prev});}else if(typeof showToast==="function"){showToast(p.lang==="en"?"✓ Expense deleted":"✓ 支出已删除");}}, onEdit: function(){if(item.isFixed){p.onEditFixed&&p.onEditFixed(item);}else{p.onEditExp&&p.onEditExp(item);}}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}} );})
          ) : null
        );
      })
    );
  }), 
  // === Flat "其他" categories — each becomes a top-level row (no parent group label) ===
  // Sort: multi-entry first (by amount), then single-entry at bottom (by amount)
  Object.values(otherFlat).sort(function(a,b){
    var aMulti = a.items.length >= 2;
    var bMulti = b.items.length >= 2;
    if(aMulti !== bMulti) return aMulti ? -1 : 1;
    return b.total - a.total;
  }).map(function(cat){
    var ck = cat._catKey;
    var groupKey = "other_flat|"+ck;
    var isExp = __bucketExpanded[groupKey]===true;
    var otherCol = "#A8C0D8";  // 其他 group color — pale slate (matches dashboard breakdown)
    return React.createElement('div', { key: ck, style: {marginBottom:10}}
      , React.createElement('button', { onClick: function(){toggle(groupKey);}, style: {width:"100%",background:C.bg2,border:"1px solid "+C.border,borderRadius:10,padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",marginBottom:isExp?8:0}}
        , React.createElement('div', { style: {display:"flex",alignItems:"center",gap:10}}
          , React.createElement('span', { style: {fontSize:18}}, cat.icon)
          , React.createElement('div', { style: {textAlign:"left"}}
            , React.createElement('div', { style: {fontSize:14,fontWeight:600,color:otherCol}}, cat.label)
            , React.createElement('div', { style: {fontSize:12,color:C.text3}}, cat.items.length+" "+(p.lang==="en"?(cat.items.length===1?"entry":"entries"):"笔"))
          )
        )
        , React.createElement('div', { style: {display:"flex",alignItems:"center",gap:8}}
          , React.createElement('span', { style: {fontSize:14,fontWeight:600,color:otherCol}}, fmt(cat.total))
          , React.createElement('span', { style: {fontSize:13,color:C.text3,minWidth:14}}, isExp?"▲":"▼")
        )
      )
      , isExp ? React.createElement('div', { style: {paddingLeft:8}},
          p.groupByMonth ? (function(){
            var byMo={};
            cat.items.forEach(function(it){
              var m = it.isFixed ? (it.statementMonth||(it.date||"").slice(0,7)) : (it.date||"").slice(0,7);
              if(!m) return;
              if(!byMo[m]) byMo[m]={month:m,total:0,items:[]};
              byMo[m].total+=(+it.amount||0);
              byMo[m].items.push(it);
            });
            return Object.values(byMo).sort(function(a,b){return b.month.localeCompare(a.month);}).map(function(mo){
              return mo.items.slice().sort(function(a,b){
                var ad=a.isFixed?(a.statementMonth||""):(a.date||"");
                var bd=b.isFixed?(b.statementMonth||""):(b.date||"");
                if(ad!==bd) return bd.localeCompare(ad);
                return (b.time||"").localeCompare(a.time||"");
              }).map(function(item){return React.createElement(ExpItem, { key: item.id, item: item, allC: aC, lang: p.lang, distFromLast: distMap[item.id]||null, onDel: function(){var prev=p.el.slice();p.setEl(p.el.filter(function(x){return x.id!==item.id;}));if(p.showUndo){p.showUndo((p.lang==="en"?"✓ Expense deleted":"✓ 支出已删除"), {prevEl:prev});}}, onEdit: function(){if(item.isFixed){p.onEditFixed&&p.onEditFixed(item);}else{p.onEditExp&&p.onEditExp(item);}}});});
            });
          }()) : cat.items.slice().sort(function(a,b){
            var ad=a.isFixed?(a.statementMonth||""):(a.date||"");
            var bd=b.isFixed?(b.statementMonth||""):(b.date||"");
            if(ad!==bd) return bd.localeCompare(ad);
            return (b.time||"").localeCompare(a.time||"");
          }).map(function(item){return React.createElement(ExpItem, { key: item.id, item: item, allC: aC, lang: p.lang, distFromLast: distMap[item.id]||null, onDel: function(){var prev=p.el.slice();p.setEl(p.el.filter(function(x){return x.id!==item.id;}));if(p.showUndo){p.showUndo((p.lang==="en"?"✓ Expense deleted":"✓ 支出已删除"), {prevEl:prev});}}, onEdit: function(){if(item.isFixed){p.onEditFixed&&p.onEditFixed(item);}else{p.onEditExp&&p.onEditExp(item);}}});})
        ) : null
    );
  })
  );
}
function CatBreakdown(p){
  if(!p.items.length)return null;
  var cm={};
  p.items.forEach(function(e){
    var cat0=p.allC[e.category];
    if(cat0&&cat0.refOnly) return;  // refOnly entries (like platform fees) shown elsewhere; skip from main expense list
    var k=e.isFixed?"fx_"+e.fixedLabel:e.category,cat=p.allC[e.category],lbl=e.isFixed?e.fixedLabel:(cat?cat.label:"其他"),ico=e.isFixed?e.fixedIcon:getIcon(e.category,p.allC);
    if(!cm[k]){cm[k]={label:lbl,icon:ico,total:0,count:0,items:[],_key:k};}
    cm[k].total+=(+e.amount||0);
    cm[k].count++;
    cm[k].items.push(e);
  });
  var sorted=Object.values(cm).sort(function(a,b){return b.total-a.total;}),mx=sorted[0]?sorted[0].total:1;
  var isEn=p.lang==="en";
  var forceRerender=p.forceRerender||function(){};
  return React.createElement('div', null, sorted.map(function(c){
    var pct=Math.round(c.total/p.total*100),bw=Math.max(3,Math.round(c.total/mx*100))+"%";
    var expKey="cb_"+(p.scope||"")+"_"+c._key;
    var isExp=__bucketExpanded[expKey]===true;
    return React.createElement('div', {key:c.label, style:{marginBottom:12}},
      // Header (clickable)
      React.createElement('button', {
        onClick: function(){__bucketExpanded[expKey]=!isExp;forceRerender();},
        style:{width:"100%",background:isExp?"#0F1A2A":"transparent",border:"none",padding:"4px 6px",borderRadius:6,cursor:"pointer",textAlign:"left"}
      },
        React.createElement('div', {style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}},
          React.createElement('span', {style:{fontSize:14,color:C.text}}, c.icon, " ", c.label, React.createElement('span', {style:{fontSize:12,color:C.text3,marginLeft:6}}, "×", c.count)),
          React.createElement('div', {style:{display:"flex",alignItems:"center",gap:6}},
            React.createElement('span', {style:{fontSize:14,fontWeight:700,color:"#FF9A65"}}, fmt(c.total)),
            React.createElement('span', {style:{fontSize:12,color:C.text2}}, pct, "%"),
            React.createElement('span', {style:{fontSize:11,color:C.text3,minWidth:12,textAlign:"right"}}, isExp?"▲":"▼")
          )
        ),
        React.createElement('div', {style:{height:5,borderRadius:3,background:C.border}},
          React.createElement('div', {style:{height:5,borderRadius:3,width:bw,background:"linear-gradient(90deg,#FF6B35,#FF9A65)"}})
        )
      ),
      // Expanded items list
      isExp ? React.createElement('div', {style:{padding:"6px 6px 8px 24px",background:"#0A1422",borderRadius:6,marginTop:4}},
        c.items.slice().sort(function(a,b){
          var ad=a.isFixed?(a.statementMonth||""):(a.date||"");
          var bd=b.isFixed?(b.statementMonth||""):(b.date||"");
          return bd.localeCompare(ad);
        }).map(function(it,ix){
          var dateStr=it.isFixed?(it.statementMonth||it.date||""):(it.date||"");
          return React.createElement('div', {key:it.id||ix, style:{display:"flex",justifyContent:"space-between",padding:"4px 0",fontSize:12,borderBottom:ix<c.items.length-1?"1px solid #0F1C30":"none"}},
            React.createElement('div', {style:{flex:1,minWidth:0}},
              React.createElement('div', {style:{color:C.text3,fontSize:11}}, dateStr),
              it.notes ? React.createElement('div', {style:{color:C.text2,marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}, it.notes) : null
            ),
            React.createElement('span', {style:{color:C.text,fontWeight:600,marginLeft:8,flexShrink:0}}, fmt(it.amount))
          );
        })
      ) : null
    );
  }));
}
function CatDetail(p){var aC=p.allC,items=p.items,total=p.total;var cm={};items.forEach(function(e){var cat0=aC[e.category];if(cat0&&cat0.refOnly)return;var k=e.isFixed?"fx_"+e.fixedLabel:e.category,cat=aC[e.category],lbl=e.isFixed?e.fixedLabel:(cat?cat.label:"其他"),ico=e.isFixed?e.fixedIcon:getIcon(e.category,aC),grp=catGrp(e.category,aC);if(!cm[k]){cm[k]={label:lbl,icon:ico,total:0,count:0,grp:grp};}cm[k].total+=(+e.amount||0);cm[k].count++;});var sorted=Object.values(cm).sort(function(a,b){return b.total-a.total;});var isEn=p.lang==="en";var totalCount=Object.values(cm).reduce(function(s,c){return s+c.count;},0);return React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}
  , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0 10px",borderBottom:"1px solid #182540",marginBottom:6}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}
    , React.createElement('span', { style: {fontSize:13,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}, isEn?"Total entries":"总笔数")
    , React.createElement('span', { style: {fontSize:14,fontWeight:700,color:C.accent}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}, totalCount, " " , isEn?(totalCount===1?"entry":"entries"):"笔")
  )
  , sorted.map(function(c){var pct=Math.round(c.total/total*100),gcl=c.grp==="车辆"?C.accent:c.grp==="牌照"?C.gold:c.grp==="平台"?"#AB47BC":"#B0D4E8";return React.createElement('div', { key: c.label, style: {padding:"8px 0",borderBottom:"1px solid #111D30"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}, React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}, React.createElement('span', { style: {fontSize:14,color:C.text2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}, c.icon, " " , c.label, React.createElement('span', { style: {fontSize:12,color:C.text3,marginLeft:6}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}, "×", c.count)), React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}, React.createElement('span', { style: {fontSize:14,fontWeight:700,color:"#FF9A65"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}, fmt(c.total)), React.createElement('span', { style: {fontSize:12,color:C.text2,marginLeft:6}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}, pct, "%"))), React.createElement('div', { style: {height:4,borderRadius:2,background:C.border}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}, React.createElement('div', { style: {height:4,borderRadius:2,width:pct+"%",background:gcl}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}})));})
);}

// Custom full-screen date picker — replaces native browser picker for better UX
function DatePicker(p){
  var isEn = p.lang === "en";
  var todayStr = (function(){var d=new Date();return d.getFullYear()+"-"+p2(d.getMonth()+1)+"-"+p2(d.getDate());})();
  var initial = p.value && /^\d{4}-\d{2}-\d{2}$/.test(p.value) ? p.value : todayStr;
  var initMonth = initial.slice(0,7);
  var r = useState(initMonth);
  var viewMo = r[0], setViewMo = r[1];
  var year = +viewMo.slice(0,4);
  var month = +viewMo.slice(5,7);
  var firstDay = new Date(year, month-1, 1).getDay();
  var daysInMonth = new Date(year, month, 0).getDate();
  var DAYS = isEn ? ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"] : ["日","一","二","三","四","五","六"];
  var monthDisp = isEn
    ? ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][month-1] + " " + year
    : year + "年 " + month + "月";
  var goPrev = function(){var y=year,m=month-1;if(m<1){m=12;y--;}setViewMo(y+"-"+p2(m));};
  var goNext = function(){var y=year,m=month+1;if(m>12){m=1;y++;}setViewMo(y+"-"+p2(m));};
  var pick = function(day){var d=year+"-"+p2(month)+"-"+p2(day);p.onChange(d);p.onClose();};
  // Build 6×7 grid
  var cells = [];
  for(var i=0;i<firstDay;i++)cells.push(null);
  for(var d=1;d<=daysInMonth;d++)cells.push(d);
  while(cells.length<42)cells.push(null);
  var weeks = [];
  for(var w=0;w<6;w++)weeks.push(cells.slice(w*7,(w+1)*7));
  var ydayDate=new Date();ydayDate.setDate(ydayDate.getDate()-1);
  var ydayStr=ydayDate.getFullYear()+"-"+p2(ydayDate.getMonth()+1)+"-"+p2(ydayDate.getDate());
  return React.createElement('div',{
    style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:16},
    onClick:function(e){if(e.target===e.currentTarget)p.onClose();}
  },
    React.createElement('div',{style:{background:C.bg2,borderRadius:16,padding:18,width:"100%",maxWidth:380,border:"1px solid "+C.border,boxShadow:"0 8px 40px rgba(0,0,0,0.6)"}},
      // Header
      React.createElement('div',{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}},
        React.createElement('button',{onClick:goPrev,style:{background:C.border,border:"none",color:C.accent,fontSize:20,cursor:"pointer",width:40,height:40,borderRadius:10}},"<"),
        React.createElement('div',{style:{fontSize:18,fontWeight:800,color:C.text}},monthDisp),
        React.createElement('button',{onClick:goNext,style:{background:C.border,border:"none",color:C.accent,fontSize:20,cursor:"pointer",width:40,height:40,borderRadius:10}},">")
      ),
      // Day-of-week headers
      React.createElement('div',{style:{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:6}},
        DAYS.map(function(dn,i){return React.createElement('div',{key:i,style:{textAlign:"center",fontSize:12,fontWeight:700,color:i===0||i===6?"#FF9A65":C.text3,padding:"6px 0"}},dn);})
      ),
      // Calendar grid
      React.createElement('div',{style:{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}},
        weeks.map(function(week,wi){return week.map(function(day,di){
          if(day===null)return React.createElement('div',{key:wi+"-"+di});
          var dStr=year+"-"+p2(month)+"-"+p2(day);
          var isToday=dStr===todayStr;
          var isSelected=dStr===p.value;
          var isWeekend=di===0||di===6;
          var bg=isSelected?"#0055FF":isToday?C.bg3:"transparent";
          var color=isSelected?"#fff":isToday?C.accent:isWeekend?"#FF9A65":C.text;
          return React.createElement('button',{key:wi+"-"+di,onClick:function(){pick(day);},style:{aspectRatio:"1",background:bg,border:isToday&&!isSelected?"1px solid #00D4FF":"1px solid transparent",borderRadius:10,color:color,fontSize:16,fontWeight:isSelected||isToday?700:500,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0}},day);
        });})
      ),
      // Quick buttons
      React.createElement('div',{style:{display:"flex",gap:8,marginTop:16}},
        React.createElement('button',{onClick:function(){p.onChange(todayStr);p.onClose();},style:{flex:1,background:"linear-gradient(135deg,#00D4FF,#0055FF)",border:"none",color:"#fff",fontSize:14,fontWeight:700,padding:"10px",borderRadius:10,cursor:"pointer"}},isEn?"Today":"今天"),
        React.createElement('button',{onClick:function(){p.onChange(ydayStr);p.onClose();},style:{flex:1,background:C.border,border:"1px solid #2A3A54",color:C.text2,fontSize:14,fontWeight:600,padding:"10px",borderRadius:10,cursor:"pointer"}},isEn?"Yesterday":"昨天"),
        React.createElement('button',{onClick:p.onClose,style:{flex:1,background:"transparent",border:"1px solid #2A3A54",color:C.text3,fontSize:14,fontWeight:600,padding:"10px",borderRadius:10,cursor:"pointer"}},isEn?"Cancel":"取消")
      )
    )
  );
}

// Custom time picker — wheel-style hour + minute selectors
function TimePicker(p){
  var isEn = p.lang === "en";
  var nowStr = (function(){var d=new Date();return p2(d.getHours())+":"+p2(d.getMinutes());})();
  var initial = p.value && /^\d{2}:\d{2}$/.test(p.value) ? p.value : nowStr;
  var r = useState(initial);
  var pickedTime = r[0], setPickedTime = r[1];
  var hour = +pickedTime.slice(0,2), minute = +pickedTime.slice(3,5);
  var setHour = function(h){setPickedTime(p2((h+24)%24)+":"+p2(minute));};
  var setMin = function(m){setPickedTime(p2(hour)+":"+p2((m+60)%60));};
  var confirm = function(){p.onChange(pickedTime);p.onClose();};
  return React.createElement('div',{
    style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:16},
    onClick:function(e){if(e.target===e.currentTarget)p.onClose();}
  },
    React.createElement('div',{style:{background:C.bg2,borderRadius:16,padding:24,width:"100%",maxWidth:320,border:"1px solid "+C.border,boxShadow:"0 8px 40px rgba(0,0,0,0.6)"}},
      React.createElement('div',{style:{textAlign:"center",fontSize:14,color:C.text3,marginBottom:16,fontWeight:600}},isEn?"Select Time":"选择时间"),
      // Big time display with up/down buttons
      React.createElement('div',{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:20}},
        // Hour
        React.createElement('div',{style:{textAlign:"center"}},
          React.createElement('button',{onClick:function(){setHour(hour+1);},style:{background:C.border,border:"none",color:C.accent,fontSize:18,cursor:"pointer",width:60,height:36,borderRadius:8,marginBottom:4}},"▲"),
          React.createElement('div',{style:{fontSize:48,fontWeight:900,color:C.accent,fontFamily:"monospace",padding:"4px 0",minWidth:80}},p2(hour)),
          React.createElement('button',{onClick:function(){setHour(hour-1);},style:{background:C.border,border:"none",color:C.accent,fontSize:18,cursor:"pointer",width:60,height:36,borderRadius:8,marginTop:4}},"▼")
        ),
        React.createElement('div',{style:{fontSize:48,fontWeight:900,color:C.text3,padding:"0 4px"}},":"),
        // Minute
        React.createElement('div',{style:{textAlign:"center"}},
          React.createElement('button',{onClick:function(){setMin(minute+5);},style:{background:C.border,border:"none",color:C.accent,fontSize:18,cursor:"pointer",width:60,height:36,borderRadius:8,marginBottom:4}},"▲"),
          React.createElement('div',{style:{fontSize:48,fontWeight:900,color:C.accent,fontFamily:"monospace",padding:"4px 0",minWidth:80}},p2(minute)),
          React.createElement('button',{onClick:function(){setMin(minute-5);},style:{background:C.border,border:"none",color:C.accent,fontSize:18,cursor:"pointer",width:60,height:36,borderRadius:8,marginTop:4}},"▼")
        )
      ),
      // Quick presets
      React.createElement('div',{style:{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16,justifyContent:"center"}},
        ["06:00","09:00","12:00","15:00","18:00","21:00"].map(function(t){return React.createElement('button',{key:t,onClick:function(){setPickedTime(t);},style:{background:pickedTime===t?C.bg3:C.bg3,border:"1px solid "+(pickedTime===t?C.accent:"#2A3A54"),color:pickedTime===t?C.accent:C.text2,fontSize:12,padding:"6px 10px",borderRadius:8,cursor:"pointer",minWidth:54}},t);})
      ),
      // Action buttons
      React.createElement('div',{style:{display:"flex",gap:8}},
        React.createElement('button',{onClick:function(){setPickedTime(nowStr);},style:{flex:1,background:C.border,border:"1px solid #2A3A54",color:C.text2,fontSize:14,fontWeight:600,padding:"10px",borderRadius:10,cursor:"pointer"}},isEn?"Now":"现在"),
        React.createElement('button',{onClick:p.onClose,style:{flex:1,background:"transparent",border:"1px solid #2A3A54",color:C.text3,fontSize:14,fontWeight:600,padding:"10px",borderRadius:10,cursor:"pointer"}},isEn?"Cancel":"取消"),
        React.createElement('button',{onClick:confirm,style:{flex:1,background:"linear-gradient(135deg,#00D4FF,#0055FF)",border:"none",color:"#fff",fontSize:14,fontWeight:700,padding:"10px",borderRadius:10,cursor:"pointer"}},isEn?"Confirm":"确认")
      )
    )
  );
}

// Custom month picker — for "Billing Month", "Statement Month" etc.
// InputModal — replacement for native prompt() with theme-consistent UI.
function InputModal(p){
  var isEn = p.lang === "en";
  var r1 = useState(p.defaultValue||""); var val = r1[0], setVal = r1[1];
  var doSubmit = function(){
    var trimmed = (val||"").trim();
    if(p.required && !trimmed) return; // disallow empty if required
    p.onSubmit(trimmed);
  };
  return React.createElement('div',{
    style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1500,padding:16,animation:"fadeIn 0.15s ease-out"},
    onClick:function(e){if(e.target===e.currentTarget)p.onCancel();}
  },
    React.createElement('div',{style:{background:C.bg2,borderRadius:14,padding:20,width:"100%",maxWidth:340,border:"1px solid #1F3A5A",boxShadow:"0 8px 32px rgba(0,0,0,0.5)"}},
      p.title?React.createElement('div',{style:{textAlign:"center",fontSize:16,fontWeight:700,color:C.text,marginBottom:8}},p.title):null,
      p.message?React.createElement('div',{style:{fontSize:13,color:C.text2,marginBottom:14,lineHeight:1.5,textAlign:"center"}},p.message):null,
      React.createElement('input',{
        type:p.inputType||"text",
        inputMode:p.inputMode||undefined,
        pattern:p.pattern||undefined,
        value:val,
        onChange:function(e){setVal(e.target.value);},
        onKeyDown:function(e){if(e.key==="Enter")doSubmit();},
        autoFocus:true,
        placeholder:p.placeholder||"",
        style:{width:"100%",background:C.bg3,border:"1px solid "+C.border,borderRadius:10,padding:"12px 14px",color:C.text,fontSize:15,fontWeight:500,marginBottom:14,outline:"none",boxSizing:"border-box"}
      }),
      React.createElement('div',{style:{display:"flex",gap:10}},
        React.createElement('button',{onClick:p.onCancel,style:{flex:1,background:C.border,border:"1px solid #2A3A54",color:C.text2,fontSize:14,fontWeight:600,padding:"10px",borderRadius:8,cursor:"pointer"}},isEn?"Cancel":"取消"),
        React.createElement('button',{onClick:doSubmit,style:{flex:1,background:"linear-gradient(135deg,#00D4FF,#0055FF)",border:"none",color:"#fff",fontSize:14,fontWeight:700,padding:"10px",borderRadius:8,cursor:"pointer"}},p.confirmLabel||(isEn?"OK":"确定"))
      )
    )
  );
}

// ConfirmModal — lightweight confirmation for routine actions (delete with undo, etc.)
// Unlike DangerConfirm, does NOT require typing — just OK/Cancel.
function ConfirmModal(p){
  var isEn = p.lang === "en";
  var isDanger = p.danger !== false; // default to danger styling (red)
  return React.createElement('div',{
    style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1500,padding:16,animation:"fadeIn 0.15s ease-out"},
    onClick:function(e){if(e.target===e.currentTarget)p.onCancel();}
  },
    React.createElement('div',{style:{background:C.bg2,borderRadius:14,padding:20,width:"100%",maxWidth:340,border:"1px solid "+(isDanger?"#5A2A2A":C.border),boxShadow:"0 8px 32px rgba(0,0,0,0.5)"}},
      React.createElement('div',{style:{textAlign:"center",fontSize:32,marginBottom:6}},isDanger?"🗑":"❓"),
      p.title?React.createElement('div',{style:{textAlign:"center",fontSize:16,fontWeight:700,color:C.text,marginBottom:8}},p.title):null,
      React.createElement('div',{style:{fontSize:13,color:C.text2,marginBottom:16,lineHeight:1.5,textAlign:"center"}},p.message),
      React.createElement('div',{style:{display:"flex",gap:10}},
        React.createElement('button',{onClick:p.onCancel,style:{flex:1,background:C.border,border:"1px solid #2A3A54",color:C.text2,fontSize:14,fontWeight:600,padding:"10px",borderRadius:8,cursor:"pointer"}},isEn?"Cancel":"取消"),
        React.createElement('button',{
          onClick:p.onConfirm,
          autoFocus:true,
          style:{flex:1,background:isDanger?"linear-gradient(135deg,#FF5252,#CC0000)":"linear-gradient(135deg,#00D4FF,#0055FF)",border:"none",color:"#fff",fontSize:14,fontWeight:700,padding:"10px",borderRadius:8,cursor:"pointer"}
        },p.confirmLabel||(isEn?(isDanger?"Delete":"OK"):(isDanger?"删除":"确定")))
      )
    )
  );
}

// DangerConfirm — type-to-confirm modal for destructive operations
// User must type the magic word (e.g. "确认" or "OK") before the Continue button enables.
function DangerConfirm(p){
  var isEn = p.lang === "en";
  var magicWord = "OK";
  var r1 = useState(""); var typed = r1[0], setTyped = r1[1];
  var matches = typed.trim().toUpperCase() === magicWord;
  return React.createElement('div',{
    style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1500,padding:16},
    onClick:function(e){if(e.target===e.currentTarget)p.onCancel();}
  },
    React.createElement('div',{style:{background:C.bg2,borderRadius:16,padding:22,width:"100%",maxWidth:380,border:"2px solid #FF5252",boxShadow:"0 8px 40px rgba(255,80,80,0.3)"}},
      React.createElement('div',{style:{textAlign:"center",fontSize:42,marginBottom:8}},"⚠️"),
      React.createElement('div',{style:{textAlign:"center",fontSize:18,fontWeight:800,color:C.danger,marginBottom:10}},p.title),
      React.createElement('div',{style:{fontSize:14,color:C.text2,marginBottom:14,lineHeight:1.5,textAlign:"center"}},p.message),
      React.createElement('div',{style:{fontSize:13,color:C.text3,marginBottom:8,textAlign:"center"}},
        isEn ? 'To confirm, type ' : '若确认操作，请输入 ',
        React.createElement('span',{style:{color:C.gold,fontWeight:800,fontFamily:"monospace"}},magicWord),
        isEn ? ' below:' : ' :'
      ),
      React.createElement('input',{
        type:"text",
        value:typed,
        onChange:function(e){setTyped(e.target.value);},
        autoFocus:true,
        placeholder:magicWord,
        style:{width:"100%",background:C.bg3,border:"1px solid "+(matches?C.success:C.border2),borderRadius:10,padding:"12px 14px",color:matches?C.success:C.text,fontSize:18,fontWeight:700,textAlign:"center",fontFamily:"monospace",marginBottom:14,outline:"none"}
      }),
      React.createElement('div',{style:{display:"flex",gap:10}},
        React.createElement('button',{onClick:p.onCancel,style:{flex:1,background:C.border,border:"1px solid #2A3A54",color:C.text2,fontSize:14,fontWeight:600,padding:"12px",borderRadius:10,cursor:"pointer"}},isEn?"Cancel":"取消"),
        React.createElement('button',{
          onClick:function(){if(matches)p.onConfirm();},
          disabled:!matches,
          style:{flex:1,background:matches?"linear-gradient(135deg,#FF5252,#CC0000)":"#2A1010",border:"none",color:matches?"#fff":"#5A2020",fontSize:14,fontWeight:700,padding:"12px",borderRadius:10,cursor:matches?"pointer":"not-allowed",opacity:matches?1:0.5}
        },isEn?"Continue":"继续")
      )
    )
  );
}

function MonthPicker(p){
  var isEn = p.lang === "en";
  var todayMo = (function(){var d=new Date();return d.getFullYear()+"-"+p2(d.getMonth()+1);})();
  var initVal = p.value && /^\d{4}-\d{2}$/.test(p.value) ? p.value : todayMo;
  var initYear = +initVal.slice(0,4);
  var r = useState(initYear);
  var year = r[0], setYear = r[1];
  var MONTHS = isEn ? ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] : ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
  var pick = function(m){var v=year+"-"+p2(m);p.onChange(v);p.onClose();};
  var curYear = +todayMo.slice(0,4);
  var curMonth = +todayMo.slice(5,7);
  var selYear = +initVal.slice(0,4);
  var selMonth = +initVal.slice(5,7);
  return React.createElement('div',{
    style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:16},
    onClick:function(e){if(e.target===e.currentTarget)p.onClose();}
  },
    React.createElement('div',{style:{background:C.bg2,borderRadius:16,padding:20,width:"100%",maxWidth:340,border:"1px solid "+C.border,boxShadow:"0 8px 40px rgba(0,0,0,0.6)"}},
      // Year nav
      React.createElement('div',{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}},
        React.createElement('button',{onClick:function(){setYear(year-1);},style:{background:C.border,border:"none",color:C.accent,fontSize:20,cursor:"pointer",width:44,height:40,borderRadius:10}},"<"),
        React.createElement('div',{style:{fontSize:22,fontWeight:800,color:C.text}},isEn?String(year):year+"年"),
        React.createElement('button',{onClick:function(){setYear(year+1);},style:{background:C.border,border:"none",color:C.accent,fontSize:20,cursor:"pointer",width:44,height:40,borderRadius:10}},">")
      ),
      // 4×3 month grid
      React.createElement('div',{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}},
        MONTHS.map(function(mn,i){
          var m = i+1;
          var isCur = year===curYear && m===curMonth;
          var isSel = year===selYear && m===selMonth;
          var bg = isSel?"#0055FF":isCur?C.bg3:"transparent";
          var color = isSel?"#fff":isCur?C.accent:C.text;
          var border = isCur&&!isSel?"1px solid #00D4FF":"1px solid #2A3A54";
          return React.createElement('button',{key:i,onClick:function(){pick(m);},style:{padding:"14px 8px",background:bg,border:border,borderRadius:10,color:color,fontSize:15,fontWeight:isSel||isCur?700:500,cursor:"pointer"}},mn);
        })
      ),
      // Quick buttons
      React.createElement('div',{style:{display:"flex",gap:8,marginTop:18}},
        React.createElement('button',{onClick:function(){p.onChange(todayMo);p.onClose();},style:{flex:1,background:"linear-gradient(135deg,#00D4FF,#0055FF)",border:"none",color:"#fff",fontSize:14,fontWeight:700,padding:"10px",borderRadius:10,cursor:"pointer"}},isEn?"This Month":"本月"),
        React.createElement('button',{onClick:p.onClose,style:{flex:1,background:"transparent",border:"1px solid #2A3A54",color:C.text3,fontSize:14,fontWeight:600,padding:"10px",borderRadius:10,cursor:"pointer"}},isEn?"Cancel":"取消")
      )
    )
  );
}

// Year picker — tap to choose, no typing.
// Shows years from 2020 to currentYear+1 in a 3-column grid, today's year highlighted.
function YearPicker(p){
  var isEn = p.lang === "en";
  var currentYear = new Date().getFullYear();
  var initVal = p.value && /^\d{4}$/.test(p.value) ? +p.value : currentYear;
  var startYear = 2020;
  var endYear = currentYear + 1;
  var years = [];
  for(var y=endYear; y>=startYear; y--) years.push(y);
  var pick = function(y){p.onChange(String(y));p.onClose();};
  return React.createElement('div',{
    style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:16},
    onClick:function(e){if(e.target===e.currentTarget)p.onClose();}
  },
    React.createElement('div',{style:{background:C.bg2,borderRadius:16,padding:20,width:"100%",maxWidth:340,border:"1px solid "+C.border,boxShadow:"0 8px 40px rgba(0,0,0,0.6)"}},
      React.createElement('div',{style:{textAlign:"center",fontSize:16,fontWeight:700,color:C.text,marginBottom:14}},isEn?"Select Year":"选择年份"),
      React.createElement('div',{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:14}},
        years.map(function(y){
          var isCur = y===currentYear, isSel = y===initVal;
          return React.createElement('button',{
            key:y,
            onClick:function(){pick(y);},
            style:{padding:"14px 10px",borderRadius:10,fontSize:16,fontWeight:700,cursor:"pointer",
              background: isSel ? "#0A4020" : (isCur ? "#1A2A4A" : C.bg3),
              color: isSel ? "#5ADA7A" : (isCur ? C.accent2 : C.text),
              border: "1px solid "+(isSel ? "#2A8050" : (isCur ? C.border2 : C.border))
            }
          }, y, isEn?"":" 年");
        })
      ),
      React.createElement('button',{onClick:p.onClose,style:{width:"100%",background:"transparent",border:"1px solid #2A3A54",color:C.text3,fontSize:14,fontWeight:600,padding:"10px",borderRadius:10,cursor:"pointer"}},isEn?"Cancel":"取消")
    )
  );
}

function Badge(p){return React.createElement('div', { style: {display:"inline-flex",alignItems:"center",gap:7,background:p.bg||"#1A2A10",border:"1px solid "+(p.color||C.success),borderRadius:24,padding:"7px 14px",fontSize:FS.md+1,fontWeight:700,color:p.color||C.success,boxShadow:"0 2px 8px rgba(0,0,0,0.3), 0 0 12px "+(p.color||C.success)+"30",letterSpacing:0.2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 53}}, React.createElement('span', { style: {fontSize:17,filter:"drop-shadow(0 1px 2px rgba(0,0,0,0.4))"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 53}}, p.icon), p.text);}

// PIN-based lock screen. Shown when:
//   - User is idle for the configured timeout (default 5 min)
//   - User has set a PIN previously (stored in localStorage as a simple hash)
// First-time setup mode: user enters PIN twice to set it.
// PINs are hashed (FNV-1a, simple non-cryptographic) so plaintext doesn't sit in localStorage.
function hashPIN(s){var h=2166136261;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=(h*16777619)>>>0;}return h.toString(16);}

function LockScreen(p){
  var isEn = p.lang === "en";
  var isSetup = p.mode === "setup";  // true = setting up new PIN, false = unlocking
  var r1 = useState(""); var pin = r1[0], setPin = r1[1];
  var r2 = useState(""); var confirmPin = r2[0], setConfirmPin = r2[1];
  var r3 = useState(""); var error = r3[0], setError = r3[1];
  var r4 = useState(0); var attempts = r4[0], setAttempts = r4[1];
  var r5 = useState(isSetup ? "first" : "verify"); var stage = r5[0], setStage = r5[1];
  // first → confirm → done (setup) | verify (unlock)
  var current = stage === "confirm" ? confirmPin : pin;
  var setCurrent = stage === "confirm" ? setConfirmPin : setPin;
  // Keyboard support — listen for digit keys + backspace globally
  useEffect(function(){
    var onKey = function(ev){
      if(ev.key>="0"&&ev.key<="9"){ev.preventDefault();addDigit(ev.key);}
      else if(ev.key==="Backspace"){ev.preventDefault();delDigit();}
      else if(ev.key==="Escape"&&isSetup&&p.onCancel){ev.preventDefault();p.onCancel();}
    };
    window.addEventListener("keydown",onKey);
    return function(){window.removeEventListener("keydown",onKey);};
  },[current,stage]);
  var addDigit = function(d){
    if(current.length>=4)return;
    var next = current + d;
    setCurrent(next);
    setError("");
    if(next.length===4){
      // Auto-submit when 4 digits entered
      setTimeout(function(){submit(next);}, 150);
    }
  };
  var delDigit = function(){setCurrent(current.slice(0,-1));setError("");};
  var submit = function(value){
    var pinValue = stage === "confirm" ? value : value;
    if(isSetup){
      if(stage === "first"){
        // Move to confirm stage
        setPin(value);
        setStage("confirm");
        setConfirmPin("");
      } else {
        // Verify both match
        if(pin === value){
          // Save PIN
          try{localStorage.setItem("nyc_pin", hashPIN(value));}catch(e){}
          p.onSuccess();
        } else {
          setError(isEn ? "PINs don't match, try again" : "两次输入不一致，请重试");
          setPin("");
          setConfirmPin("");
          setStage("first");
        }
      }
    } else {
      // Unlock mode
      var stored = "";
      try{stored = localStorage.getItem("nyc_pin")||"";}catch(e){}
      if(hashPIN(value) === stored){
        p.onSuccess();
      } else {
        setAttempts(attempts+1);
        setError(isEn ? "Wrong PIN" : "PIN 错误");
        setPin("");
      }
    }
  };
  var title = isSetup
    ? (stage === "first" ? (isEn?"Set a 4-digit PIN":"设置 4 位 PIN") : (isEn?"Confirm PIN":"再次输入"))
    : (isEn ? "Enter PIN" : "输入 PIN");
  var subtitle = isSetup
    ? (isEn?"This PIN protects your data when idle":"PIN 在空闲时保护你的数据")
    : (isEn?"App locked due to inactivity":"App 因长时间未操作已锁定");
  return React.createElement('div',{style:{position:"fixed",inset:0,background:"#080C18",zIndex:9999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}},
    // Lock icon
    React.createElement('div',{style:{fontSize:48,marginBottom:12}},isSetup?"🔐":"🔒"),
    React.createElement('div',{style:{fontSize:20,fontWeight:800,color:C.text,marginBottom:6,textAlign:"center"}},title),
    React.createElement('div',{style:{fontSize:13,color:C.text2,marginBottom:30,textAlign:"center"}},subtitle),
    // 4-dot indicator
    React.createElement('div',{style:{display:"flex",gap:14,marginBottom:24}},
      [0,1,2,3].map(function(i){
        var filled = i < current.length;
        return React.createElement('div',{key:i,style:{width:18,height:18,borderRadius:9,background:filled?C.accent:"transparent",border:"2px solid "+(filled?C.accent:C.border2),transition:"all 0.15s"}});
      })
    ),
    // Error message
    error ? React.createElement('div',{style:{fontSize:13,color:C.danger,marginBottom:16,minHeight:18}},error) : React.createElement('div',{style:{minHeight:18,marginBottom:16}}),
    // Number pad — uses onPointerDown for instant response (no 300ms tap delay).
    // Also adds visual press feedback + haptic vibration.
    React.createElement('div',{style:{display:"grid",gridTemplateColumns:"repeat(3,64px)",gap:12,marginBottom:20}},
      [1,2,3,4,5,6,7,8,9].map(function(n){
        return React.createElement('button',{
          key:n,
          onPointerDown:function(ev){
            ev.preventDefault();
            try{if(navigator.vibrate)navigator.vibrate(15);}catch(e){}
            addDigit(""+n);
          },
          // Fallback for non-pointer-event browsers (rare)
          onClick:function(ev){ev.preventDefault();},
          style:{width:64,height:64,borderRadius:32,background:"#0F1C30",border:"1px solid #1E3050",color:C.text,fontSize:24,fontWeight:600,cursor:"pointer",userSelect:"none",WebkitUserSelect:"none",WebkitTapHighlightColor:"transparent",touchAction:"manipulation",transition:"transform 0.08s, background 0.08s"},
          onPointerUp:function(ev){ev.currentTarget.style.transform="";ev.currentTarget.style.background="#0F1C30";},
          onPointerLeave:function(ev){ev.currentTarget.style.transform="";ev.currentTarget.style.background="#0F1C30";},
          onPointerCancel:function(ev){ev.currentTarget.style.transform="";ev.currentTarget.style.background="#0F1C30";},
          onMouseDown:function(ev){ev.currentTarget.style.transform="scale(0.92)";ev.currentTarget.style.background="#1A3050";}
        },n);
      }),
      // Empty slot
      React.createElement('div',{key:"empty"}),
      // 0
      React.createElement('button',{
        key:"0",
        onPointerDown:function(ev){
          ev.preventDefault();
          try{if(navigator.vibrate)navigator.vibrate(15);}catch(e){}
          addDigit("0");
        },
        onClick:function(ev){ev.preventDefault();},
        style:{width:64,height:64,borderRadius:32,background:"#0F1C30",border:"1px solid #1E3050",color:C.text,fontSize:24,fontWeight:600,cursor:"pointer",userSelect:"none",WebkitUserSelect:"none",WebkitTapHighlightColor:"transparent",touchAction:"manipulation",transition:"transform 0.08s, background 0.08s"},
        onPointerUp:function(ev){ev.currentTarget.style.transform="";ev.currentTarget.style.background="#0F1C30";},
        onPointerLeave:function(ev){ev.currentTarget.style.transform="";ev.currentTarget.style.background="#0F1C30";},
        onPointerCancel:function(ev){ev.currentTarget.style.transform="";ev.currentTarget.style.background="#0F1C30";},
        onMouseDown:function(ev){ev.currentTarget.style.transform="scale(0.92)";ev.currentTarget.style.background="#1A3050";}
      },"0"),
      // Backspace
      React.createElement('button',{
        key:"del",
        onPointerDown:function(ev){
          ev.preventDefault();
          try{if(navigator.vibrate)navigator.vibrate(10);}catch(e){}
          delDigit();
        },
        onClick:function(ev){ev.preventDefault();},
        style:{width:64,height:64,borderRadius:32,background:"transparent",border:"1px solid #1E3050",color:C.text2,fontSize:18,cursor:"pointer",userSelect:"none",WebkitUserSelect:"none",WebkitTapHighlightColor:"transparent",touchAction:"manipulation",transition:"transform 0.08s, background 0.08s"},
        onPointerUp:function(ev){ev.currentTarget.style.transform="";ev.currentTarget.style.background="transparent";},
        onPointerLeave:function(ev){ev.currentTarget.style.transform="";ev.currentTarget.style.background="transparent";},
        onPointerCancel:function(ev){ev.currentTarget.style.transform="";ev.currentTarget.style.background="transparent";},
        onMouseDown:function(ev){ev.currentTarget.style.transform="scale(0.92)";ev.currentTarget.style.background="#1A2A40";}
      },"⌫")
    ),
    // Forgot PIN (unlock mode only)
    !isSetup ? React.createElement('button',{onClick:function(){if(confirm(isEn?"Forgot PIN? This will sign you out and require Google login again. Continue?":"忘记 PIN？这会让你退出登录，需要重新用 Google 登录。继续吗？"))p.onForgot();},style:{background:"none",border:"none",color:C.text3,fontSize:13,cursor:"pointer",marginTop:10}},isEn?"Forgot PIN?":"忘记 PIN？") : null,
    // Cancel setup
    isSetup ? React.createElement('button',{onClick:p.onCancel,style:{background:"none",border:"none",color:C.text3,fontSize:13,cursor:"pointer",marginTop:10}},isEn?"Skip / Setup later":"跳过 / 以后再设") : null
  );
}
function App() {
  var r0=useState(0),tab=r0[0],setTab=r0[1]; var r1=useState("month"),dashV=r1[0],setDashV=r1[1]; var r1c=useState("month"),incV=r1c[0],setIncV=r1c[1];
  var r2=useState("month"),repP=r2[0],setRepP=r2[1]; var r3=useState(curMo()),mo=r3[0],setMo=r3[1];
  var r4=useState(curYr()),yr=r4[0],setYr=r4[1];
  var r6=useState(function(){try{var s=localStorage.getItem("nyc_sf");return s||null;}catch(e){return null;}}()),sf=r6[0],_setSf=r6[1];function setSf(v){_setSf(v);try{if(v)localStorage.setItem("nyc_sf",v);else localStorage.removeItem("nyc_sf");}catch(e){}} var r7=useState("month"),expV=r7[0],setExpV=r7[1];
  var r8=useState(false),mExpDet=r8[0],setMExpDet=r8[1]; var r9=useState(false),yExpDet=r9[0],setYExpDet=r9[1];
  var r10=useState("车辆"),selGrp=r10[0],setSelGrp=r10[1];
  var r11=useState(function(){
    var stored = lsLoad("nyc_veh",{type:"",brand:"",plate:"",tlcPlate:"",insComp:"",insPolicy:"",insExpiry:"",loanType:"loan",loanAmt:"",lastInsp:""});
    // Migration: ensure every veh has a stable vehicleId for tagging expenses
    if(!stored.vehicleId){
      stored.vehicleId = "v_" + Date.now() + "_" + Math.random().toString(36).slice(2,8);
    }
    return stored;
  });
  var veh=r11[0],setVeh=r11[1];
  function lsLoad(k,def){try{var s=localStorage.getItem(k);return s?JSON.parse(s):def;}catch(e){return def;}}
  // Debounced localStorage write — coalesces rapid successive writes into one.
  // Prevents UI lag when user types in inputs that trigger setter chains.
  var __lsTimers = {};
  function lsSaveDebounced(k, v, ms){
    // Cancel any pending write for this key
    if(__lsTimers[k]){
      var existing = __lsTimers[k];
      clearTimeout(existing && existing.id ? existing.id : existing);
    }
    var entry = {k:k, v:v, id:null};
    entry.id = setTimeout(function(){
      try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){}
      delete __lsTimers[k];
    }, ms||400);
    __lsTimers[k] = entry;
  }
  // Flush all pending writes IMMEDIATELY to localStorage (call before unload to avoid losing data)
  function lsFlushPending(){
    Object.keys(__lsTimers).forEach(function(k){
      var info = __lsTimers[k];
      clearTimeout(info && info.id ? info.id : info);
      // If we have the pending value, write it now
      if(info && info.k && typeof info.v !== "undefined"){
        try{ localStorage.setItem(info.k, JSON.stringify(info.v)); }catch(e){}
      }
      delete __lsTimers[k];
    });
  }
  // Make sure pending writes are flushed before page unload
  if(typeof window!=="undefined" && !window.__lsFlushBound){
    window.__lsFlushBound = true;
    window.addEventListener("beforeunload", function(){
      lsFlushPending();
    });
    // Also flush on visibility change (mobile background)
    document.addEventListener("visibilitychange", function(){
      if(document.visibilityState==="hidden") lsFlushPending();
    });
    // Also flush on pagehide (better mobile coverage)
    window.addEventListener("pagehide", function(){
      lsFlushPending();
    });
  }

  // ============ IndexedDB-based snapshot history ============
  // Stores up to 7 full data snapshots (FIFO). Used for "undo" in case of accidental data loss.
  var IDB_NAME = "nycDriverSnapshots";
  var IDB_STORE = "snapshots";
  var IDB_MAX = 7;

  function idbOpen(){
    return new Promise(function(resolve, reject){
      try{
        var req = indexedDB.open(IDB_NAME, 1);
        req.onupgradeneeded = function(e){
          var db = e.target.result;
          if(!db.objectStoreNames.contains(IDB_STORE)){
            db.createObjectStore(IDB_STORE, { keyPath: "id", autoIncrement: true });
          }
        };
        req.onsuccess = function(e){ resolve(e.target.result); };
        req.onerror = function(e){ reject(e.target.error); };
      }catch(err){ reject(err); }
    });
  }

  function idbAddSnapshot(data){
    return idbOpen().then(function(db){
      return new Promise(function(resolve, reject){
        var tx = db.transaction(IDB_STORE, "readwrite");
        var store = tx.objectStore(IDB_STORE);
        var entry = { timestamp: Date.now(), data: data };
        var req = store.add(entry);
        req.onsuccess = function(){
          // Trim to keep only last IDB_MAX entries
          var getAll = store.getAll();
          getAll.onsuccess = function(e){
            var all = e.target.result || [];
            if(all.length > IDB_MAX){
              // Sort ascending by id (oldest first), delete excess
              all.sort(function(a,b){return a.id - b.id;});
              var toDelete = all.length - IDB_MAX;
              for(var i=0; i<toDelete; i++){
                store.delete(all[i].id);
              }
            }
            resolve();
          };
        };
        req.onerror = function(e){ reject(e.target.error); };
      });
    }).catch(function(err){ console.warn("[idb] add failed:", err); });
  }

  function idbListSnapshots(){
    return idbOpen().then(function(db){
      return new Promise(function(resolve, reject){
        var tx = db.transaction(IDB_STORE, "readonly");
        var store = tx.objectStore(IDB_STORE);
        var req = store.getAll();
        req.onsuccess = function(e){
          var all = e.target.result || [];
          all.sort(function(a,b){return b.timestamp - a.timestamp;});  // newest first
          resolve(all);
        };
        req.onerror = function(e){ reject(e.target.error); };
      });
    }).catch(function(err){ console.warn("[idb] list failed:", err); return []; });
  }

  function idbDeleteSnapshot(id){
    return idbOpen().then(function(db){
      return new Promise(function(resolve, reject){
        var tx = db.transaction(IDB_STORE, "readwrite");
        var req = tx.objectStore(IDB_STORE).delete(id);
        req.onsuccess = function(){ resolve(); };
        req.onerror = function(e){ reject(e.target.error); };
      });
    }).catch(function(err){ console.warn("[idb] delete failed:", err); });
  }
  // ============ End IndexedDB helpers ============

  var r12=useState(function(){return lsLoad("nyc_wl",[]);}),wl=r12[0],setWl=r12[1]; var r13=useState(function(){return lsLoad("nyc_sl",[]);}),sl=r13[0],setSl=r13[1];
  var r14=useState(function(){return lsLoad("nyc_el",[]);}),el=r14[0],setEl=r14[1]; var r15=useState(function(){return lsLoad("nyc_fl",[]);}),fl=r15[0],setFl=r15[1];
  var r16=useState(function(){return lsLoad("nyc_ll",[]);}),ll=r16[0],setLl=r16[1]; var r17=useState(function(){return lsLoad("nyc_cc",{});}),cc=r17[0],setCc=r17[1];
  var r18=useState({weekStart:wkMon(today()),platform:"Uber",trips:"",hours:"",onlineHours:"",miles:"",grossFare:"",tips:"",bonus:"",tollReimbursed:"",payoutAmount:"",payoutDate:"",notes:""});
  var wf=r18[0],setWf=r18[1];
  var r19=useState({month:curMo(),platform:"Uber",grossFare:"",tips:"",bonus:"",tollReimbursed:"",otherIncome:"",platformFee:"",trips:"",onlineHours:"",miles:"",acceptRate:"",completionRate:"",notes:""});
  var stf=r19[0],setStf=r19[1];
  var r20=useState({date:today(),time:nowTime(),category:"",amount:"",notes:"",qty:"",chargedTo:"",statementMonth:curMo(),isRecurring:false,mode:""});
  var ef=r20[0],setEf=r20[1];
  // FIX: sf="exp" persists to localStorage but ef does not. After page refresh,
  // sf is restored ("exp") but ef.category is still "" — causing the form to render
  // without any category-specific fields (kWh, unit price, etc.) even though the
  // dropdown visually shows "充电费" (browser default-selects first option when value="").
  // This effect detects that mismatch on mount and initializes ef like the + button does.
  useEffect(function(){
    var initialSf = (function(){try{return localStorage.getItem("nyc_sf");}catch(e){return null;}})();
    if(initialSf==="exp" && !ef.category){
      // Defer to next tick so all hooks have initialized (veh, driverType, etc.)
      Promise.resolve().then(function(){
        setEf(function(prev){
          if(prev.category) return prev; // user already started filling — don't clobber
          return Object.assign({}, prev, {
            category: (veh && veh.type==="petrol" ? "fuel" : "charging")
          });
        });
        setSelGrp("车辆");
      });
    }
  }, []); // run once on mount
  var r21=useState({label:"",icon:"💼",cat:"other",cycle:"monthly",amount:"",day:"1",notes:"",active:true,startDate:"",endDate:"",maxCount:""});
  var ff=r21[0],setFf=r21[1];
  var r22=useState({type:"",number:"",issueDate:"",expiryDate:"",renewalFee:"",reminderDays:"60",notes:""});
  var lf=r22[0],setLf=r22[1];
  var r23=useState({label:"",icon:"🔧",group:"车辆"});
  var cf=r23[0],setCf=r23[1];
  var r24=useState(null),reportData=r24[0],setReportData=r24[1];
  var r25=useState(function(){return lsLoad("nyc_custPlat",[]);}),custPlat=r25[0],setCustPlat=r25[1]; var r26=useState(""),newPlat=r26[0],setNewPlat=r26[1];
  var r25b=useState(function(){return lsLoad("nyc_custBrands",[]);}),custBrands=r25b[0],_setCustBrands=r25b[1];function setCustBrands(v){_setCustBrands(v);try{localStorage.setItem("nyc_custBrands",JSON.stringify(v));}catch(e){}}
  var r25c=useState(function(){return lsLoad("nyc_custLicTypes",[]);}),custLicTypes=r25c[0],_setCustLicTypes=r25c[1];function setCustLicTypes(v){_setCustLicTypes(v);try{localStorage.setItem("nyc_custLicTypes",JSON.stringify(v));}catch(e){}}
  var r25e=useState(function(){return lsLoad("nyc_favNotes",{});}),favNotes=r25e[0],_setFavNotes=r25e[1];function setFavNotes(v){_setFavNotes(v);try{localStorage.setItem("nyc_favNotes",JSON.stringify(v));}catch(e){}}
  // favStations: {charging:[name1,name2,...], fuel:[name1,name2,...]} — favorited charging/fuel stations
  var r25g=useState(function(){return lsLoad("nyc_favStations",{charging:[],fuel:[]});}),favStations=r25g[0],_setFavStations=r25g[1];function setFavStations(v){_setFavStations(v);try{localStorage.setItem("nyc_favStations",JSON.stringify(v));}catch(e){}}
  // Calculator state
  var rCalc=useState({display:"0",prevValue:null,operator:null,waitingForOperand:false,history:[],memory:0}),calcState=rCalc[0],setCalcState=rCalc[1];
  // Floating calculator — can be shown/minimized on any page
  // mode: "hidden" | "minimized" (small chip in corner) | "floating" (full popup)
  var rCalcF=useState(function(){return lsLoad("nyc_calcFloat",{mode:"hidden",x:null,y:null,scale:1});}),calcFloat=rCalcF[0],_setCalcFloat=rCalcF[1];
  function setCalcFloat(v){_setCalcFloat(v);try{localStorage.setItem("nyc_calcFloat",JSON.stringify(v));}catch(e){}}
  // favExpenses: [{id, label, category, amount, notes, icon}] - quick expense templates
  var r25f=useState(function(){return lsLoad("nyc_favExpenses",[]);}),favExpenses=r25f[0],_setFavExpenses=r25f[1];function setFavExpenses(v){_setFavExpenses(v);try{localStorage.setItem("nyc_favExpenses",JSON.stringify(v));}catch(e){}}
  var r25d=useState(function(){return lsLoad("nyc_custLoanTypes",[]);}),custLoanTypes=r25d[0],_setCustLoanTypes=r25d[1];function setCustLoanTypes(v){_setCustLoanTypes(v);try{localStorage.setItem("nyc_custLoanTypes",JSON.stringify(v));}catch(e){}}
  var r27=useState(false),showBackup=r27[0],setShowBackup=r27[1];
  useEffect(function(){
    if(showBackup){
      idbListSnapshots().then(function(snaps){ setSnapshotList(snaps); });
    }
  }, [showBackup]); var r28=useState(function(){return lsLoad("nyc_user",null);}),gUser=r28[0],setGUser=r28[1];
  var r30=useState(null),openSec=r30[0],setOpenSec=r30[1];
  var r32=useState(false),showPlatMgr=r32[0],setShowPlatMgr=r32[1];
  var r34=useState(function(){return lsLoad("nyc_reminders",[]);}),reminders=r34[0],setReminders=r34[1]; var r35=useState({type:"date",title:"",customTitle:"",date:"",note:"",reminderDays:"7",triggerMile:"",intervalMile:"",reminderMile:"200"}),rf=r35[0],setRf=r35[1];
  // Uber paste-import modal
  var rPU=useState(false),showPasteUber=rPU[0],setShowPasteUber=rPU[1];
  var rPUT=useState(""),pasteUberText=rPUT[0],setPasteUberText=rPUT[1];
  var rPUR=useState(null),pasteUberResult=rPUR[0],setPasteUberResult=rPUR[1];
  // Uber annual tax summary import modal
  var rPT=useState(false),showPasteUberTax=rPT[0],setShowPasteUberTax=rPT[1];
  var rPTT=useState(""),pasteUberTaxText=rPTT[0],setPasteUberTaxText=rPTT[1];
  var rPTR=useState(null),pasteUberTaxResult=rPTR[0],setPasteUberTaxResult=rPTR[1];
  // Fuelio PDF import modal
  var rFI=useState(false),showFuelioImport=rFI[0],setShowFuelioImport=rFI[1];
  var rFIR=useState(null),fuelioImportResult=rFIR[0],setFuelioImportResult=rFIR[1];
  var rFIS=useState({}),fuelioSelected=rFIS[0],setFuelioSelected=rFIS[1]; // {entryIdx: true/false}
  // Expense diagnostic modal — quick scan of all el entries to find missing imports etc.
  var rELD=useState(false),showElDiag=rELD[0],setShowElDiag=rELD[1];
  // Completion modal state (for ✓ Done on mile-type reminders)
  var rCmp=useState(null),cmpRem=rCmp[0],setCmpRem=rCmp[1];
  var rCmpf=useState({currentMile:"",intervalMile:""}),cmpf=rCmpf[0],setCmpf=rCmpf[1];
  // Daily income log (for taxi drivers — one entry per day)
  var r53=useState(function(){return lsLoad("nyc_dl",[]);}),dl=r53[0],setDl=r53[1];
  // dlf is the form state for daily log entry. Supports BOTH:
  //   - taxi mode: cash, card, tips, lease (driver keeps cash directly)
  //   - rideshare mode: grossFare, tips, bonus, tollReimbursed, platformFee, per-platform
  // mode field stores which type. platform stores which platform (Uber/Lyft/etc) for rideshare.
  var r54=useState({date:today(),mode:"",platform:"Uber",cash:"",card:"",grossFare:"",tips:"",bonus:"",tollReimbursed:"",platformFee:"",trips:"",hours:"",miles:"",lease:"",notes:""}),dlf=r54[0],setDlf=r54[1];
  // Driver type: "rideshare" / "taxi" / null (null triggers onboarding)
  var r55=useState(function(){return lsLoad("nyc_driverType",null);}),driverType=r55[0],_setDriverType=r55[1];
  function setDriverType(v){_setDriverType(v);try{if(v===null){localStorage.removeItem("nyc_driverType");}else{localStorage.setItem("nyc_driverType",JSON.stringify(v));}}catch(e){}}
  // Onboarding: shown when driverType is null AND user hasn't dismissed this session.
  // Picking a type sets driverType (persisted) → modal hides automatically (derived).
  // Dismissing only sets local flag → next reload (with no type saved) it shows again.
  var r56=useState(false),onboardingDismissed=r56[0],setOnboardingDismissed=r56[1];
  var showOnboarding = driverType===null && !onboardingDismissed;
  // Onboarding wizard step: 0=idle, 2=vehicle filled, 3=license filled, 4=income filled (done)
  // (Step 1 = type selection, handled by showOnboarding above)
  var rWiz=useState(0),wizStep=rWiz[0],setWizStep=rWiz[1];
  // When user closes a wizard page (sf becomes null), advance to next step.
  // Safeguards added v3.7.3: timeout to avoid race with React re-renders + reset on driverType change.
  useEffect(function(){
    if(wizStep===0) return;
    if(sf!==null) return;  // wait until current page closed
    // Defer the advance to next tick so any pending state updates settle first
    var timer = setTimeout(function(){
      if(wizStep===2){
        setSf("drawer_lic"); 
        setWizStep(3);
        showToast(lang==="en"?"Step 3/4: Licenses":"第 3/4 步：证件");
      }
      else if(wizStep===3){
        if(driverType==="taxi"){
          setDlf({date:today(),cash:"",card:"",tips:"",trips:"",hours:"",miles:"",lease:"",notes:""});
          setSf("daily");
        } else {
          setStf({month:curMo(),platform:"Uber",grossFare:"",tips:"",bonus:"",tollReimbursed:"",otherIncome:"",platformFee:"",trips:"",onlineHours:"",miles:"",acceptRate:"",completionRate:"",notes:""});
          setSf("stmt");
        }
        setWizStep(4);
        showToast(lang==="en"?"Step 4/4: Add first income":"第 4/4 步：添加首条收入");
      }
      else if(wizStep===4){ 
        setWizStep(0);
        showToast(lang==="en"?"✓ Setup complete!":"✓ 引导完成！");
      }
    }, 100);
    return function(){ clearTimeout(timer); };  // cleanup on re-render
  }, [sf, wizStep, driverType]);
  var r36=useState(false),showRemMgr=r36[0],setShowRemMgr=r36[1]; var r37=useState(false),showDrawer=r37[0],setShowDrawer=r37[1];
  var r39=useState("zh"),lang=r39[0],setLang=r39[1];
  var r33=useState(PLATS.slice()),defPlat=r33[0],setDefPlat=r33[1];
  var r31=useState(null),editFx=r31[0],setEditFx=r31[1];
  var allC=Object.assign({},lang==="en"?CATS_EN:CATS_ZH,cc),allPlat=defPlat.concat(custPlat);
  var isDark=true;
  var T_ZH={dashboard:"仪表盘",income:"收入",expense:"支出",report:"报告",thisMonth:"本月",thisYear:"全年",netIncome:"本月净收入",totalIncome:"总营业额",totalExpense:"总支出",netProfit:"净利润",weekly:"每周运营",monthly:"月度账单",addExpense:"记账",vehicle:"车辆信息",license:"执照 & 证件",fixedFees:"固定月费管理",reminder:"自定义提醒",platform:"平台管理",backup:"备份 & 同步",menu:"菜单",edit:"编辑",del:"删除",save:"确认保存",cancel:"取消",add:"添加",date:"日期",time:"时间",qty:"数量",tips:"小费",bonus:"奖励",toll:"过桥退款",otherIncome:"其他",profitRate:"利润率",hourlyRate:"时薪",vsLastMonth:"vs 上月",lastMonth:"上月",subtotal:"小计",perHour:"/时",perMonth:"/月",amount:"金额",brand:"品牌",carType:"车辆类型",category:"类别",cycleMonthly:"每月",cycleAnnual:"每年",day:"日",dayOfMonth:"每月几号",electric:"电动",endMonth:"结束月份",expiryDate:"到期日期",fixedMonthly:"添加为固定月费",fixedMonthlyDesc:"以后每月自动出现在支出里",grossFare:"总车费",hybrid:"混合动力",insComp:"保险公司",insExpiry:"保险到期",issueDate:"发出日期",lastInsp:"上次检验日期",lease:"租赁",licNum:"证件编号",licType:"证件类型",loan:"贷款",loanAmt:"贷款月供",loanType:"持有方式",miles:"里程",month_lbl:"月份",newPlatform:"新平台名称",noData:"暂无记录",notes:"备注",onlineHours:"在线时长",optional:"选填",own:"全款",pause:"暂停",petrol:"燃油",plate:"车牌",platform_lbl:"平台",pleaseSelect:"-- 请选择 --",quickAdd:"快速添加常见项",remDate:"提醒日期",remDays:"提前天数",remNote:"备注",remTitle:"提醒标题",rental:"周租",renewalFee:"更新费",reminderDays:"提前提醒天数",resume:"启用",selectBrand:"选择品牌",startMonth:"开始月份",weekStart:"周起始日",trips:"趟数",days30:"30 天",days60:"60 天",days90:"90 天",days180:"180 天",day1:"1 天",day3:"3 天",day7:"7 天",day14:"14 天"};
  var T_EN={dashboard:"Dashboard",income:"Income",expense:"Expense",report:"Report",thisMonth:"This Month",thisYear:"This Year",netIncome:"Net Income",totalIncome:"Gross Revenue",totalExpense:"Total Expense",netProfit:"Net Profit",weekly:"Weekly Ops",monthly:"Monthly Stmt",addExpense:"Add Expense",vehicle:"Vehicle",license:"License",fixedFees:"Fixed Fees",reminder:"Reminders",platform:"Platforms",backup:"Backup",menu:"Menu",edit:"Edit",del:"Delete",save:"Save",cancel:"Cancel",add:"Add",date:"Date",time:"Time",qty:"Qty",tips:"Tips",bonus:"Bonus",toll:"Toll",otherIncome:"Other",profitRate:"Profit %",hourlyRate:"$/hr",vsLastMonth:"vs Last Mo",lastMonth:"Last Mo",subtotal:"Subtotal",perHour:"/hr",perMonth:"/mo",amount:"Amount",brand:"Brand",carType:"Car Type",category:"Category",cycleMonthly:"Monthly",cycleAnnual:"Annual",day:"Day",dayOfMonth:"Day of month",electric:"Electric",endMonth:"End month",expiryDate:"Expiry date",fixedMonthly:"Add as fixed monthly",fixedMonthlyDesc:"Auto-appears in expenses each month",grossFare:"Gross Fare",hybrid:"Hybrid",insComp:"Insurance Co.",insExpiry:"Insurance expiry",issueDate:"Issue date",lastInsp:"Last inspection",lease:"Lease",licNum:"License No.",licType:"License Type",loan:"Loan",loanAmt:"Monthly payment",loanType:"Ownership",miles:"Miles",month_lbl:"Month",newPlatform:"New platform name",noData:"No records",notes:"Notes",onlineHours:"Online hours",optional:"Optional",own:"Owned",pause:"Pause",petrol:"Petrol",plate:"Plate",platform_lbl:"Platform",pleaseSelect:"-- Please Select --",quickAdd:"Quick add common items",remDate:"Reminder date",remDays:"Days before",remNote:"Notes",remTitle:"Reminder title",rental:"Weekly rental",renewalFee:"Renewal fee",reminderDays:"Days notice",resume:"Resume",selectBrand:"Select brand",startMonth:"Start month",weekStart:"Week start",trips:"Trips",days30:"30 days",days60:"60 days",days90:"90 days",days180:"180 days",day1:"1 day",day3:"3 days",day7:"7 days",day14:"14 days"};
  var T=lang==="en"?T_EN:T_ZH;
  var getAppData=function(){return JSON.stringify({v:1,wl:wl,sl:sl,el:el,fl:fl,ll:ll,veh:veh,cc:cc,custPlat:custPlat,driver:driver});};
  var loadData=function(j){try{var d=JSON.parse(j);if(d.wl)setWl(d.wl);if(d.sl)setSl(d.sl);if(d.el)setEl(d.el);if(d.fl)setFl(d.fl);if(d.ll)setLl(d.ll);if(d.veh)setVeh(d.veh);if(d.driver)setDriver(d.driver);if(d.cc)setCc(d.cc);if(d.custPlat)setCustPlat(d.custPlat);if(Array.isArray(d.dl))setDl(d.dl);if(d.driverType==="rideshare"||d.driverType==="taxi")setDriverType(d.driverType);return true;}catch(e){return false;}};
  var doExport=function(){var j=getAppData(),b=new Blob([j],{type:"application/json"}),u=URL.createObjectURL(b),a=document.createElement("a");a.href=u;a.download="nyc-"+today()+".json";a.click();setTimeout(function(){URL.revokeObjectURL(u);},1000);};
  var doImport=function(file){var r=new FileReader();r.onload=function(e){if(loadData(e.target.result)){setShowBackup(false);alert("恢复成功！");}else{alert("文件错误");}};r.readAsText(file);};
  var mStmts=useMemo(function(){return sl.filter(function(x){return x.month===mo;});},[sl,mo]);
  var mWeeks=useMemo(function(){return wl.filter(function(w){return w.weekStart.slice(0,7)===mo;});},[wl,mo]);
  var fixMo=useMemo(function(){return genFixed(fl,mo);},[fl,mo]);
  var feAll=useMemo(function(){return el.filter(function(e){var c=allC[e.category];if(c&&c.mo)return (e.statementMonth||e.date.slice(0,7))===mo;return e.date.slice(0,7)===mo;}).concat(fixMo);},[el,allC,mo,fixMo]);
  var mDailies=useMemo(function(){return dl.filter(function(d){return d.date&&d.date.slice(0,7)===mo;});},[dl,mo]);
  // Helper: is this a "cash tip only" entry? (Reference-only, NOT included in income calculations)
  // Detected via: explicit cashTip flag OR (legacy) notes containing "现金小费"/"Cash tip"
  var isCashTip = function(d){
    if(d.cashTip === true) return true;
    if(d.notes && typeof d.notes === "string"){
      var n = d.notes;
      if(n.indexOf("现金小费") >= 0 || n.indexOf("Cash tip") >= 0 || n.indexOf("cash tip") >= 0) return true;
    }
    return false;
  };
  // Cash tips: track separately for reference, NOT included in income totals
  var mCashTips = useMemo(function(){
    return mDailies.reduce(function(s,d){return isCashTip(d) ? s + (+d.tips||0) : s;}, 0);
  },[mDailies]);
  // dl supports BOTH modes. For income aggregation (cash tips EXCLUDED):
  //   - taxi entry: cash + card + tips
  //   - rideshare entry: grossFare + tips + bonus + tollReimbursed
  var mDailyInc=mDailies.reduce(function(s,d){
    if(isCashTip(d)) return s; // Skip cash-tip-only entries from income
    if(d.mode==="rideshare"){
      return s + (+d.grossFare||0) + (+d.tips||0) + (+d.bonus||0);
    }
    return s + (+d.cash||0) + (+d.card||0) + (+d.tips||0);
  },0);
  var mDailyLease=mDailies.reduce(function(s,d){return s+(+d.lease||0);},0);
  // Per-month rideshare platform fees (entered on daily entries, not statement) — used for "bank pay" calc
  var mDlPlatformFee=mDailies.reduce(function(s,d){return s+(d.mode==="rideshare"?(+d.platformFee||0):0);},0);
  // Total revenue: gross + tips + bonus + other. Toll reimbursement is NOT included
  // (it's pass-through money: rider pays toll → platform forwards to driver → driver pays toll booth).
  // tInc = "营业额" (revenue, no toll). 
  // To get "总营业额" (gross with toll) use tInc+tToll. 
  // Toll is pass-through; we expose it but don't double-count it.
  var tInc=mStmts.reduce(function(s,x){return s+(+x.grossFare||0)+(+x.tips||0)+(+x.bonus||0)+(+x.otherIncome||0);},0)+mDailyInc;
  // For taxi mode: cash+card maps to grossFare; tips maps to tips
  var mDlCash=mDailies.reduce(function(s,d){return s+(d.mode==="rideshare"?0:(+d.cash||0));},0);
  var mDlCard=mDailies.reduce(function(s,d){return s+(d.mode==="rideshare"?0:(+d.card||0));},0);
  var mDlTipsSum=mDailies.reduce(function(s,d){return s+(+d.tips||0);},0);
  // For rideshare daily entries — count gross fare and bonus/toll into proper aggregates
  var mDlRideGross=mDailies.reduce(function(s,d){return s+(d.mode==="rideshare"?(+d.grossFare||0):0);},0);
  var mDlRideBonus=mDailies.reduce(function(s,d){return s+(d.mode==="rideshare"?(+d.bonus||0):0);},0);
  var mDlRideToll=mDailies.reduce(function(s,d){return s+(d.mode==="rideshare"?(+d.tollReimbursed||0):0);},0);
  var tGross=mStmts.reduce(function(s,x){return s+(+x.grossFare||0);},0)+mDlCash+mDlCard+mDlRideGross,tTips=mStmts.reduce(function(s,x){return s+(+x.tips||0);},0)+mDlTipsSum;
  var tBonus=mStmts.reduce(function(s,x){return s+(+x.bonus||0);},0)+mDlRideBonus,tToll=mStmts.reduce(function(s,x){return s+(+x.tollReimbursed||0);},0)+mDlRideToll;
  // Platform service fees (Uber service fee, Lyft commission) — captured directly on monthly statement.
  // tNetPay = "What hits your bank" (Gross Revenue - Platform Fee, before other expenses).
  // NOTE: platformFee is also a deductible business expense for taxes, but we do NOT add it to tExp here
  // because it would double-count if the user also recorded it as a 📱 platform fee expense.
  // For Schedule C, the PDF export adds it as Line 10 "Commissions and fees" separately.
  var tPlatformFee=mStmts.reduce(function(s,x){return s+(+x.platformFee||0);},0)+mDlPlatformFee;
  var tNetPay=tInc-tPlatformFee; // What you actually receive in your bank from platforms
  // tExp excludes platformfee — that's separately accounted via tPlatformFee from monthly stmts.
  // Including it here would double-count when net = tInc - tExp - tPlatformFee.
  var tExp=feAll.reduce(function(s,e){return e.category==="platform" ? s : s+(+e.amount||0);},0)+mDailyLease,tFix=fixMo.reduce(function(s,e){return s+(+e.amount||0);},0),net=tInc-tExp-tPlatformFee;
  var tTrips=mWeeks.reduce(function(s,w){return s+(+w.trips||0);},0)+mDailies.reduce(function(s,d){return s+(+d.trips||0);},0)+mStmts.reduce(function(s,x){return s+(+x.trips||0);},0);
  var tHours=mWeeks.reduce(function(s,w){return s+(+w.hours||0);},0)+mDailies.reduce(function(s,d){return s+(+d.hours||0);},0)+mStmts.reduce(function(s,x){return s+(+x.onlineHours||0);},0);
  var tOnl=mWeeks.reduce(function(s,w){return s+(+w.onlineHours||0);},0)+mStmts.reduce(function(s,x){return s+(+x.onlineHours||0);},0),tMiles=mWeeks.reduce(function(s,w){return s+(+w.miles||0);},0)+mDailies.reduce(function(s,d){return s+(+d.miles||0);},0)+mStmts.reduce(function(s,x){return s+(+x.miles||0);},0);
  var yMons=[];for(var yi=1;yi<=12;yi++){yMons.push(yr+"-"+p2(yi));}
  var yStmts=useMemo(function(){return sl.filter(function(x){return x.month.slice(0,4)===yr;});},[sl,yr]); var yWeeks=useMemo(function(){return wl.filter(function(w){return w.weekStart&&w.weekStart.slice(0,4)===yr;});},[wl,yr]);
  var yExps=useMemo(function(){return el.filter(function(e){return e.date.slice(0,4)===yr;});},[el,yr]);
  var yFixT=yMons.reduce(function(s,m){return s+genFixed(fl,m).reduce(function(a,e){return a+(+e.amount||0);},0);},0);
  var yDailies=dl.filter(function(d){return d.date&&d.date.slice(0,4)===yr;});
  // Year cash tips (reference only, NOT included in yInc)
  var yCashTips = yDailies.reduce(function(s,d){return isCashTip(d) ? s + (+d.tips||0) : s;}, 0);
  var yDailyInc=yDailies.reduce(function(s,d){
    if(isCashTip(d)) return s; // exclude cash-tip-only entries from income
    if(d.mode==="rideshare"){
      return s + (+d.grossFare||0) + (+d.tips||0) + (+d.bonus||0);
    }
    return s + (+d.cash||0) + (+d.card||0) + (+d.tips||0);
  },0);
  var yDailyLease=yDailies.reduce(function(s,d){return s+(+d.lease||0);},0);
  var yInc=yStmts.reduce(function(s,x){return s+(+x.grossFare||0)+(+x.tips||0)+(+x.bonus||0)+(+x.otherIncome||0);},0)+yDailyInc;
  var yToll=yStmts.reduce(function(s,x){return s+(+x.tollReimbursed||0);},0)+yDailies.reduce(function(s,d){return s+(d.mode==="rideshare"?(+d.tollReimbursed||0):0);},0);
  var yPlatformFee=yStmts.reduce(function(s,x){return s+(+x.platformFee||0);},0)+yDailies.reduce(function(s,d){return s+(d.mode==="rideshare"?(+d.platformFee||0):0);},0);
  var yExp=yExps.reduce(function(s,e){return e.category==="platform" ? s : s+(+e.amount||0);},0)+yFixT+yDailyLease,yNet=yInc-yExp-yPlatformFee;
  var yTrips=wl.filter(function(w){return w.weekStart.slice(0,4)===yr;}).reduce(function(s,w){return s+(+w.trips||0);},0)+yDailies.reduce(function(s,d){return s+(+d.trips||0);},0)+yStmts.reduce(function(s,x){return s+(+x.trips||0);},0);
  var yHours=wl.filter(function(w){return w.weekStart.slice(0,4)===yr;}).reduce(function(s,w){return s+(+w.hours||0);},0)+yDailies.reduce(function(s,d){return s+(+d.hours||0);},0)+yStmts.reduce(function(s,x){return s+(+x.onlineHours||0);},0);
  var yMiles=wl.filter(function(w){return w.weekStart.slice(0,4)===yr;}).reduce(function(s,w){return s+(+w.miles||0);},0)+yDailies.reduce(function(s,d){return s+(+d.miles||0);},0)+yStmts.reduce(function(s,x){return s+(+x.miles||0);},0);  var yStmtTrips=yStmts.reduce(function(s,x){return s+(+x.trips||0);},0),yStmtHours=yStmts.reduce(function(s,x){return s+(+x.onlineHours||0);},0),yStmtMiles=yStmts.reduce(function(s,x){return s+(+x.miles||0);},0);
  var mData=yMons.map(function(m){var ms=sl.filter(function(x){return x.month===m;}),me=el.filter(function(e){return e.date.slice(0,7)===m;}),md=dl.filter(function(d){return d.date&&d.date.slice(0,7)===m;}),mf=genFixed(fl,m).reduce(function(s,e){return s+(+e.amount||0);},0),inc=ms.reduce(function(s,x){return s+(+x.grossFare||0)+(+x.tips||0)+(+x.bonus||0)+(+x.otherIncome||0);},0)+md.reduce(function(s,d){if(isCashTip(d))return s;if(d.mode==="rideshare")return s+(+d.grossFare||0)+(+d.tips||0)+(+d.bonus||0);return s+(+d.cash||0)+(+d.card||0)+(+d.tips||0);},0),exp=me.reduce(function(s,e){return e.category==="platform" ? s : s+(+e.amount||0);},0)+mf+md.reduce(function(s,d){return s+(+d.lease||0);},0),mToll=ms.reduce(function(s,x){return s+(+x.tollReimbursed||0);},0)+md.reduce(function(s,d){return s+(d.mode==="rideshare"?(+d.tollReimbursed||0):0);},0),mPlat=ms.reduce(function(s,x){return s+(+x.platformFee||0);},0)+md.reduce(function(s,d){return s+(d.mode==="rideshare"?(+d.platformFee||0):0);},0);return {m:m,inc:inc,exp:exp,net:inc-exp-mPlat,label:m.slice(5)+"月"};});
  var insW=null;if(veh.lastInsp){var ip=veh.lastInsp.split("-"),baseY=+ip[0],baseM=+ip[1]-1;var isTlc=!!(veh.tlcPlate&&veh.tlcPlate.trim());var addMonths=isTlc?4:12;
    // TLC counts by month, not by day. So "Jan inspection + 4 months" means valid through end of April.
    // The due date is the LAST day of (lastInspMonth + addMonths - 1).
    var tY=baseY,tM=baseM+addMonths-1;while(tM>=12){tM-=12;tY++;}
    var tD=new Date(tY,tM+1,0).getDate(); // last day of target month
    var idEnd=new Date(tY,tM,tD);
    var nowD=new Date();var todayMidnight=new Date(nowD.getFullYear(),nowD.getMonth(),nowD.getDate());
    insW={next:tY+"-"+p2(tM+1)+"-"+p2(tD),diff:Math.round((idEnd-todayMidnight)/86400000),isTlc:isTlc};}
  var insExpDiff=veh.insExpiry?daysFromToday(veh.insExpiry):null; var expiring=ll.filter(function(l){if(!l.expiryDate)return false;var d=daysFromToday(l.expiryDate);var rd=+(l.reminderDays||60);return d!==null&&d>=0&&d<=rd;});
  var expired=ll.filter(function(l){if(!l.expiryDate)return false;var d=daysFromToday(l.expiryDate);return d!==null&&d<0;}); var totalFix=fl.filter(function(f){return f.active&&f.amount;}).reduce(function(s,f){return s+(f.cycle==="annual"?Math.round(+f.amount/12*100)/100:+f.amount);},0); var bldRep=function(p){var isM=p==="month",ri=isM?tInc:yInc,rg=isM?tGross:yStmts.reduce(function(s,x){return s+(+x.grossFare||0);},0),rt=isM?tTips:yStmts.reduce(function(s,x){return s+(+x.tips||0);},0),rb=isM?tBonus:yStmts.reduce(function(s,x){return s+(+x.bonus||0);},0),rtr=isM?tToll:yStmts.reduce(function(s,x){return s+(+x.tollReimbursed||0);},0),rTot=isM?tExp:yExp,rn=ri-rTot,rT=isM?tTrips:yTrips,rH=isM?tHours:yHours,rM=isM?tMiles:yMiles;return {ri:ri,rg:rg,rt:rt,rb:rb,rtr:rtr,rTot:rTot,rn:rn,rTrips:rT,rHours:rH,rMiles:rM};};
  var yAllExps=function(){
    // CRITICAL: must match yExp formula at line 2137:
    //   yExps (excl. platform refOnly) + fixed expenses + daily lease
    // Otherwise the report total ≠ expense page total.
    var realExps = yExps.filter(function(e){return e.category!=="platform";});
    var fixedExps = yMons.reduce(function(acc,m){return acc.concat(genFixed(fl,m));},[]);
    // Wrap daily lease as virtual expense entries so CatDetail/BucketList can group them
    var leaseExps = yDailies.filter(function(d){return +d.lease>0;}).map(function(d){
      return {id:"_lease_"+(d.id||d.date), date:d.date, category:"carloan", amount:+d.lease, notes:(lang==="en"?"Daily lease":"每日租金"), isFixed:false, _virtual:true};
    });
    return realExps.concat(fixedExps).concat(leaseExps);
  }; var hourlyRate=tHours>0?Math.round(tInc/tHours*100)/100:0,lastMo=prevMo(mo),lmStmts=sl.filter(function(x){return x.month===lastMo;}),lmWeeks=wl.filter(function(w){return w.weekStart.slice(0,7)===lastMo;}),lmFixMo=genFixed(fl,lastMo),lmDailies=dl.filter(function(d){return d.date&&d.date.slice(0,7)===lastMo;}),lmDlInc=lmDailies.reduce(function(s,d){if(isCashTip(d))return s;if(d.mode==="rideshare")return s+(+d.grossFare||0)+(+d.tips||0)+(+d.bonus||0);return s+(+d.cash||0)+(+d.card||0)+(+d.tips||0);},0),lmDlLease=lmDailies.reduce(function(s,d){return s+(+d.lease||0);},0),lmDlHours=lmDailies.reduce(function(s,d){return s+(+d.hours||0);},0),lmFeAll=el.filter(function(e){var c=allC[e.category];if(c&&c.mo)return (e.statementMonth||e.date.slice(0,7))===lastMo;return e.date.slice(0,7)===lastMo;}).concat(lmFixMo),lmInc=lmStmts.reduce(function(s,x){return s+(+x.grossFare||0)+(+x.tips||0)+(+x.bonus||0)+(+x.otherIncome||0);},0)+lmDlInc,lmExp=lmFeAll.reduce(function(s,e){return e.category==="platform" ? s : s+(+e.amount||0);},0)+lmDlLease,lmToll=lmStmts.reduce(function(s,x){return s+(+x.tollReimbursed||0);},0)+lmDailies.reduce(function(s,d){return s+(d.mode==="rideshare"?(+d.tollReimbursed||0):0);},0),lmPlatformFee=lmStmts.reduce(function(s,x){return s+(+x.platformFee||0);},0)+lmDailies.reduce(function(s,d){return s+(d.mode==="rideshare"?(+d.platformFee||0):0);},0),lmNet=lmInc-lmExp-lmPlatformFee,lmHours=lmWeeks.reduce(function(s,w){return s+(+w.hours||0);},0)+lmDlHours+lmStmts.reduce(function(s,x){return s+(+x.onlineHours||0);},0),lmHourly=lmHours>0?Math.round(lmInc/lmHours*100)/100:0,nextExpiry=ll.filter(function(l){return l.expiryDate;}).sort(function(a,b){return a.expiryDate.localeCompare(b.expiryDate);})[0]
    // YEAR-OVER-YEAR comparisons
    // (a) Same month last year — for month-view comparison
    , lyMo = (function(){var p=mo.split("-");return (+p[0]-1)+"-"+p[1];})()
    , lyMoStmts = sl.filter(function(x){return x.month===lyMo;})
    , lyMoFixMo = genFixed(fl,lyMo)
    , lyMoDailies = dl.filter(function(d){return d.date&&d.date.slice(0,7)===lyMo;})
    , lyMoDlInc = lyMoDailies.reduce(function(s,d){if(d.mode==="rideshare")return s+(+d.grossFare||0)+(+d.tips||0)+(+d.bonus||0);return s+(+d.cash||0)+(+d.card||0)+(+d.tips||0);},0)
    , lyMoDlLease = lyMoDailies.reduce(function(s,d){return s+(+d.lease||0);},0)
    , lyMoFeAll = el.filter(function(e){var c=allC[e.category];if(c&&c.mo)return (e.statementMonth||e.date.slice(0,7))===lyMo;return e.date.slice(0,7)===lyMo;}).concat(lyMoFixMo)
    , lyMoInc = lyMoStmts.reduce(function(s,x){return s+(+x.grossFare||0)+(+x.tips||0)+(+x.bonus||0)+(+x.otherIncome||0);},0)+lyMoDlInc
    , lyMoExp = lyMoFeAll.reduce(function(s,e){return e.category==="platform" ? s : s+(+e.amount||0);},0)+lyMoDlLease
    , lyMoToll = lyMoStmts.reduce(function(s,x){return s+(+x.tollReimbursed||0);},0)+lyMoDailies.reduce(function(s,d){return s+(d.mode==="rideshare"?(+d.tollReimbursed||0):0);},0)
    , lyMoPlatformFee = lyMoStmts.reduce(function(s,x){return s+(+x.platformFee||0);},0)+lyMoDailies.reduce(function(s,d){return s+(d.mode==="rideshare"?(+d.platformFee||0):0);},0)
    , lyMoNet = lyMoInc-lyMoExp-lyMoPlatformFee
    // (b) Previous full year — for year-view comparison
    , prevYr = String(+yr-1)
    , prevYrMons = (function(){var arr=[];for(var i=1;i<=12;i++)arr.push(prevYr+"-"+(i<10?"0":"")+i);return arr;})()
    , pyStmts = sl.filter(function(x){return x.month && x.month.slice(0,4)===prevYr;})
    , pyExpsList = el.filter(function(e){return e.date && e.date.slice(0,4)===prevYr;})
    , pyDailies = dl.filter(function(d){return d.date && d.date.slice(0,4)===prevYr;})
    , pyDlInc = pyDailies.reduce(function(s,d){if(d.mode==="rideshare")return s+(+d.grossFare||0)+(+d.tips||0)+(+d.bonus||0);return s+(+d.cash||0)+(+d.card||0)+(+d.tips||0);},0)
    , pyDlLease = pyDailies.reduce(function(s,d){return s+(+d.lease||0);},0)
    , pyFixT = prevYrMons.reduce(function(s,m){return s+genFixed(fl,m).reduce(function(a,e){return a+(+e.amount||0);},0);},0)
    , pyInc = pyStmts.reduce(function(s,x){return s+(+x.grossFare||0)+(+x.tips||0)+(+x.bonus||0)+(+x.otherIncome||0);},0)+pyDlInc
    , pyExp = pyExpsList.reduce(function(s,e){return e.category==="platform" ? s : s+(+e.amount||0);},0)+pyFixT+pyDlLease
    , pyToll = pyStmts.reduce(function(s,x){return s+(+x.tollReimbursed||0);},0)+pyDailies.reduce(function(s,d){return s+(d.mode==="rideshare"?(+d.tollReimbursed||0):0);},0)
    , pyPlatformFee = pyStmts.reduce(function(s,x){return s+(+x.platformFee||0);},0)+pyDailies.reduce(function(s,d){return s+(d.mode==="rideshare"?(+d.platformFee||0):0);},0)
    , pyNet = pyInc-pyExp-pyPlatformFee
    ; var achievements=[];if(tInc>=5000)achievements.push({icon:"🏆",text:lang==="en"?"Income > $5000":"本月收入破$5000",color:C.gold,bg:"#1A1400"});else if(tInc>=3000)achievements.push({icon:"⭐",text:lang==="en"?"Income > $3000":"本月收入破$3000",color:C.gold,bg:"#1A1400"});if(net>0&&tInc>0&&net>=tInc*0.5)achievements.push({icon:"💰",text:lang==="en"?"Profit > 50%":"净利润超50%",color:C.success,bg:"#0A1A0A"});if(tTrips>=200)achievements.push({icon:"🚗",text:lang==="en"?"200 trips this month":"本月200趟达成",color:C.accent,bg:"#0A1428"});else if(tTrips>=100)achievements.push({icon:"🎯",text:lang==="en"?"100 trips this month":"本月100趟达成",color:C.accent,bg:"#0A1428"});if(expiring.length===0&&expired.length===0&&ll.length>0)achievements.push({icon:"✅",text:lang==="en"?"All licenses valid":"证件全部有效",color:C.success,bg:"#0A1A0A"});if(yInc>=50000)achievements.push({icon:"👑",text:lang==="en"?"Annual income > $50000":"年收入破$50000",color:C.gold,bg:"#1A1400"}); var r40=useState(function(){return lsLoad("nyc_custGroups",[]);}),custGroups=r40[0],setCustGroups=r40[1]; var r41=useState(""),newGrpName=r41[0],setNewGrpName=r41[1]; var r42=useState("📁"),newGrpIcon=r42[0],setNewGrpIcon=r42[1]; var r43=useState("#A8D0E8"),newGrpColor=r43[0],setNewGrpColor=r43[1]; var r44=useState(new Date().getFullYear()+""),taxYr=r44[0],setTaxYr=r44[1]; var r45=useState(function(){return lsLoad("nyc_seRate",15.3);}),seRate=r45[0],_setSeRate=r45[1];function setSeRate(v){_setSeRate(v);try{localStorage.setItem("nyc_seRate",JSON.stringify(v));}catch(e){}} var r45b=useState(function(){return lsLoad("nyc_fedRate",12);}),fedRate=r45b[0],_setFedRate=r45b[1];function setFedRate(v){_setFedRate(v);try{localStorage.setItem("nyc_fedRate",JSON.stringify(v));}catch(e){}} var r45c=useState(function(){return lsLoad("nyc_stateRate",8.5);}),stateRate=r45c[0],_setStateRate=r45c[1];function setStateRate(v){_setStateRate(v);try{localStorage.setItem("nyc_stateRate",JSON.stringify(v));}catch(e){}} var r45d=useState(function(){return lsLoad("nyc_stdDed",14600);}),stdDed=r45d[0],_setStdDed=r45d[1];function setStdDed(v){_setStdDed(v);try{localStorage.setItem("nyc_stdDed",JSON.stringify(v));}catch(e){}} var r45e=useState(function(){return lsLoad("nyc_mtaRate",0.34);}),mtaRate=r45e[0],_setMtaRate=r45e[1];function setMtaRate(v){_setMtaRate(v);try{localStorage.setItem("nyc_mtaRate",JSON.stringify(v));}catch(e){}} var r45f=useState(function(){return lsLoad("nyc_mileageRate",0.70);}),mileageRate=r45f[0],_setMileageRate=r45f[1];function setMileageRate(v){_setMileageRate(v);try{localStorage.setItem("nyc_mileageRate",JSON.stringify(v));}catch(e){}} var rSV=useState(function(){return lsLoad("nyc_savedVehicles",[]);}),savedVehicles=rSV[0],_setSavedVehicles=rSV[1];function setSavedVehicles(v){_setSavedVehicles(v);try{localStorage.setItem("nyc_savedVehicles",JSON.stringify(v));}catch(e){}} var r46=useState(false),taxLoading=r46[0],setTaxLoading=r46[1]; var r47=useState(""),taxRateNote=r47[0],setTaxRateNote=r47[1]; var r48=useState(function(){return lsLoad("nyc_notes",[]);}),notes=r48[0],setNotes=r48[1];
  // Driver info (separate from vehicle so it survives vehicle switches)
  // Migration: if nyc_driver doesn't exist but veh.driver has data, copy it over.
  var rDrv = useState(function(){
    var stored = lsLoad("nyc_driver", null);
    if(stored) return stored;
    // Fallback: pull from legacy veh.driver if present
    var legacy = (function(){try{var v=JSON.parse(localStorage.getItem("nyc_veh")||"{}");return v.driver||null;}catch(e){return null;}})();
    if(legacy) return legacy;
    return {name:"",phone:"",tlcHack:"",dmvLic:"",email:"",emergName:"",emergPhone:""};
  });
  var driver=rDrv[0],_setDriver=rDrv[1];
  function setDriver(v){_setDriver(v);try{localStorage.setItem("nyc_driver",JSON.stringify(v));}catch(e){}}
 var rSnap=useState([]),snapshotList=rSnap[0],setSnapshotList=rSnap[1];
  // Undo banner: { msg, prevEl, until } (for bulk operations)
  var rUndo=useState(null),undoBanner=rUndo[0],setUndoBanner=rUndo[1];
  // Tick to update countdown display
  var rTick=useState(0),_undoTick=rTick[0],_setUndoTick=rTick[1];
  useEffect(function(){
    if(!undoBanner) return;
    var iv = setInterval(function(){_setUndoTick(function(x){return x+1;});}, 1000);
    return function(){ clearInterval(iv); };
  }, [undoBanner]);
  // Drawer "Advanced" submenu toggle
  var rAdv=useState(false),showAdvanced=rAdv[0],setShowAdvanced=rAdv[1];
  // Simple mode: hide power-user features. Persisted.
  var rSimple=useState(function(){return lsLoad("nyc_simpleMode",false);}),simpleMode=rSimple[0],_setSimpleMode=rSimple[1];
  function setSimpleMode(v){_setSimpleMode(v);try{localStorage.setItem("nyc_simpleMode",JSON.stringify(v));}catch(e){}}
  // Toast notifications: array of { id, msg, type, until }
  var rToast=useState([]),toasts=rToast[0],setToasts=rToast[1];
  // Helper: trigger undo banner with a 30s timeout for any data restore
  function showUndo(msg, prevState){
    var until = Date.now()+20000;
    setUndoBanner(Object.assign({msg:msg, until:until}, prevState));
    // Clear the banner after 30s — but only if it's still the SAME banner (untilToken matches)
    setTimeout(function(){
      setUndoBanner(function(b){
        // If banner exists and matches this until-token (within 100ms tolerance) → clear
        if(b && Math.abs(b.until - until) < 100) return null;
        return b;  // otherwise leave it (a newer banner replaced this one)
      });
    }, 20200);
  }
  function showToast(msg, type){
    var id=Date.now()+Math.random();
    var t=type||"success";
    setToasts(function(prev){return prev.concat([{id:id,msg:msg,type:t,until:Date.now()+4000}]);});
    setTimeout(function(){
      setToasts(function(prev){return prev.filter(function(x){return x.id!==id;});});
    }, 4100);
  }
  // DEBUG: show a test toast on first render to verify UI works
  useEffect(function(){
    setTimeout(function(){
      showToast(lang==="en"?"✓ Toast works! Save anything to test":"✓ Toast 正常！保存任何东西测试一下", "success");
    }, 800);
  }, []);
  // Week calendar state: current week's Monday + selected day in week
  var rWcWeek=useState(wkMon(today())),wcWeek=rWcWeek[0],setWcWeek=rWcWeek[1];
  var rWcSel=useState(today()),wcSel=rWcSel[0],setWcSel=rWcSel[1];
  // showPlatform: false = single combined entry per day; true = per-platform entries
  var rWcPlat=useState(false),wcShowPlatform=rWcPlat[0],setWcShowPlatform=rWcPlat[1];
  var rDailyId=useState(function(){return lsLoad("nyc_driveDailyFileId",null);}),driveDailyFileId=rDailyId[0],_setDriveDailyFileId=rDailyId[1];function setDriveDailyFileId(v){_setDriveDailyFileId(v);try{if(v)localStorage.setItem("nyc_driveDailyFileId",JSON.stringify(v));else localStorage.removeItem("nyc_driveDailyFileId");}catch(e){}}
  var rDailyMod=useState(null),driveDailyModTime=rDailyMod[0],setDriveDailyModTime=rDailyMod[1];
  var rMonthlyId=useState(function(){return lsLoad("nyc_driveMonthlyFileId",null);}),driveMonthlyFileId=rMonthlyId[0],_setDriveMonthlyFileId=rMonthlyId[1];function setDriveMonthlyFileId(v){_setDriveMonthlyFileId(v);try{if(v)localStorage.setItem("nyc_driveMonthlyFileId",JSON.stringify(v));else localStorage.removeItem("nyc_driveMonthlyFileId");}catch(e){}}
  var rMonthlyMod=useState(null),driveMonthlyModTime=rMonthlyMod[0],setDriveMonthlyModTime=rMonthlyMod[1]; var rSnapKey=useState(0),snapRefreshKey=rSnapKey[0],setSnapRefreshKey=rSnapKey[1]; var r49=useState({title:"",body:"",id:null}),noteF=r49[0],setNoteF=r49[1]; var r50=useState(false),noteEdit=r50[0],setNoteEdit=r50[1]; var r51=useState(function(){
    // Migration: if old single-value nyc_incGoal exists, convert to per-month object
    var perMonth = lsLoad("nyc_incGoals", null);
    if(perMonth && typeof perMonth === "object") return perMonth;
    var oldVal = lsLoad("nyc_incGoal", "");
    var migrated = {};
    if(oldVal && +oldVal > 0){
      // Apply old single value to current calendar month only
      var d = new Date(), curMonth = d.getFullYear()+"-"+(d.getMonth()+1<10?"0":"")+(d.getMonth()+1);
      migrated[curMonth] = String(oldVal);
      try{ localStorage.setItem("nyc_incGoals", JSON.stringify(migrated)); localStorage.removeItem("nyc_incGoal"); }catch(e){}
    }
    return migrated;
  }),incGoals=r51[0],_setIncGoals=r51[1];
  // Persist whole object
  function setIncGoals(v){_setIncGoals(v);try{localStorage.setItem("nyc_incGoals",JSON.stringify(v));}catch(e){}}
  // Derive: incGoal and setIncGoal for CURRENT VIEW MONTH (mo)
  // (these names match the original API so all downstream UI code still works)
  var incGoal = (incGoals && incGoals[mo]) || "";
  function setIncGoal(v){
    var nx = Object.assign({}, incGoals||{});
    if(!v || +v <= 0) delete nx[mo]; else nx[mo] = String(v);
    setIncGoals(nx);
  }
  function setIncGoal(v){_setIncGoal(v);try{localStorage.setItem("nyc_incGoal",JSON.stringify(v));}catch(e){}} var r52=useState(false),showGoal=r52[0],setShowGoal=r52[1]; var r52b=useState(false),showDP=r52b[0],setShowDP=r52b[1]; var r52c=useState(false),showTP=r52c[0],setShowTP=r52c[1]; var r52d=useState(null),mpState=r52d[0],setMpState=r52d[1]; var r52d2=useState(null),ypState=r52d2[0],setYpState=r52d2[1]; var r52z=useState(false),trendOpen=r52z[0],setTrendOpen=r52z[1]; var r52y=useState(0),_forceCount=r52y[0],_setForceCount=r52y[1]; var forceRerender=function(){_setForceCount(function(x){return x+1;});};
  // Quick add form state (for fuel/park/food quick entry)
  var rQF=useState({}),quickF=rQF[0],setQuickF=rQF[1];
  // Global search modal state
  var rSearch=useState(""),searchQ=rSearch[0],setSearchQ=rSearch[1];
  var rSearchOpen=useState(false),searchOpen=rSearchOpen[0],setSearchOpen=rSearchOpen[1];
  // Onboarding (first-time user) — show 3-step welcome tour
  var rOnb=useState(function(){return !lsLoad("nyc_seenOnboarding",false);}),showOnboarding=rOnb[0],_setShowOnboarding=rOnb[1];
  function setShowOnboarding(v){_setShowOnboarding(v);if(!v)try{localStorage.setItem("nyc_seenOnboarding","true");}catch(e){}}
  var rOnbStep=useState(0),onbStep=rOnbStep[0],setOnbStep=rOnbStep[1];
  // Danger zone toggle (collapsed by default to avoid accidental clicks)
  var rDanger=useState(false),dangerOpen=rDanger[0],setDangerOpen=rDanger[1];
  // Collapsible state for advanced cards (default collapsed). Persisted across sessions.
  var rColl=useState(function(){return lsLoad("nyc_collOpen",{energy:false,fuelchart:false,pie:false,expDet:false,expRatio:false,energyYr:false,bigNum:false});}),collOpen=rColl[0],_setCollOpen=rColl[1];
  function setCollOpen(v){_setCollOpen(v);try{localStorage.setItem("nyc_collOpen",JSON.stringify(v));}catch(e){}}
  var toggleColl=function(k){var nv=Object.assign({},collOpen);nv[k]=!collOpen[k];setCollOpen(nv);};

  // Last time local data was modified (ISO string). Used by smart sync.
  // Bumped whenever any persisted state changes. Stored in localStorage so it survives reloads.
  var r52e=useState(function(){return lsLoad("nyc_localModTime","");}),localModTime=r52e[0],_setLocalModTime=r52e[1];
  function setLocalModTime(v){_setLocalModTime(v);try{localStorage.setItem("nyc_localModTime",JSON.stringify(v));}catch(e){}}
  // Danger confirm modal state — { title, message, onConfirm, opKey }
  var r52f=useState(null),dangerConfirm=r52f[0],setDangerConfirm=r52f[1];
  // Lightweight confirm modal state (replaces native confirm() for routine deletes)
  var r52g=useState(null),confirmState=r52g[0],setConfirmState=r52g[1];
  // Input modal state (replaces native prompt())
  var r52j=useState(null),inputState=r52j[0],setInputState=r52j[1];
  function inputAction(opts){
    setInputState({
      title: opts.title,
      message: opts.message,
      placeholder: opts.placeholder,
      defaultValue: opts.defaultValue,
      confirmLabel: opts.confirmLabel,
      inputType: opts.inputType,
      inputMode: opts.inputMode,
      pattern: opts.pattern,
      required: opts.required!==false,
      onSubmit: function(v){setInputState(null);opts.onSubmit(v);},
      onCancel: function(){setInputState(null);if(opts.onCancel)opts.onCancel();}
    });
  }
  // Expense search & filter
  var r52h=useState(""),expSearch=r52h[0],setExpSearch=r52h[1];
  var r52i=useState([]),expFilterCat=r52i[0],setExpFilterCat=r52i[1];
  function confirmAction(title, message, onConfirm, opts){
    setConfirmState({
      title: title,
      message: message,
      confirmLabel: opts && opts.confirmLabel,
      danger: opts ? opts.danger : true,
      onConfirm: function(){setConfirmState(null);onConfirm();},
      onCancel: function(){setConfirmState(null);}
    });
  }
  // Grace period: after user confirms an op, skip the prompt for 5 minutes
  // for that same op key. Map of opKey → expiry timestamp (ms).
  var r52g=useState({}),dangerGrace=r52g[0],setDangerGrace=r52g[1];
  // Helper: trigger a danger op. If grace is active for opKey, run onConfirm directly.
  function requireDangerConfirm(opKey, title, message, onConfirm){
    var now = Date.now();
    if(dangerGrace[opKey] && dangerGrace[opKey] > now){
      // Grace period active — skip prompt
      onConfirm();
      return;
    }
    setDangerConfirm({
      title: title,
      message: message,
      onConfirm: function(){
        setDangerConfirm(null);
        // Mark grace until 5 min from now
        var newGrace = Object.assign({}, dangerGrace);
        newGrace[opKey] = Date.now() + 5*60*1000;
        setDangerGrace(newGrace);
        onConfirm();
      }
    });
  }

  // PIN lock state
  var r53a=useState(function(){return lsLoad("nyc_pinTimeout",5);}),pinTimeout=r53a[0],_setPinTimeout=r53a[1]; function setPinTimeout(v){_setPinTimeout(v);try{localStorage.setItem("nyc_pinTimeout",JSON.stringify(v));}catch(e){}}
  var r53b=useState(function(){var p="";try{p=localStorage.getItem("nyc_pin")||"";}catch(e){}return !!p;}),hasPIN=r53b[0],setHasPIN=r53b[1];
  // locked: true when PIN screen should be displayed.
  // Logic: if PIN is set, lock only if time since last unlock > pinTimeout minutes.
  // This means a quick refresh / reopen within the timeout window won't re-prompt.
  var r53c=useState(function(){
    var p="";
    try{p=localStorage.getItem("nyc_pin")||"";}catch(e){}
    if(!p) return false; // No PIN set → never lock
    var lastUnlock=0,timeoutMin=5;
    try{lastUnlock=+localStorage.getItem("nyc_lastUnlock")||0;}catch(e){}
    try{timeoutMin=+localStorage.getItem("nyc_pinTimeout")||5;}catch(e){}
    if(timeoutMin<=0) return false; // user disabled idle timeout → never lock
    var minutesSince = (Date.now()-lastUnlock)/60000;
    // If never unlocked OR more than `timeoutMin` minutes since last unlock → lock
    return !lastUnlock || minutesSince > timeoutMin;
  }),locked=r53c[0],setLocked=r53c[1];
  // Record successful unlock timestamp
  function recordUnlock(){try{localStorage.setItem("nyc_lastUnlock",String(Date.now()));}catch(e){}}
  // showPinSetup: true when user is in "set up new PIN" flow
  var r53d=useState(false),showPinSetup=r53d[0],setShowPinSetup=r53d[1];

  // Idle detection: if user has set a PIN and pinTimeout > 0, lock the app after N minutes of inactivity.
  useEffect(function(){
    if(!hasPIN || pinTimeout<=0 || locked) return;
    var timer;
    var lastWrite = Date.now();
    var resetTimer = function(){
      clearTimeout(timer);
      timer = setTimeout(function(){setLocked(true);}, pinTimeout*60*1000);
      // Throttle localStorage writes — record activity at most every 30s
      var now = Date.now();
      if(now - lastWrite > 30000){
        lastWrite = now;
        try{localStorage.setItem("nyc_lastUnlock", String(now));}catch(e){}
      }
    };
    var events = ["mousedown","keydown","touchstart","scroll"];
    events.forEach(function(ev){window.addEventListener(ev, resetTimer, {passive:true});});
    // Also lock when tab becomes hidden (user switches away)
    var onVisChange = function(){
      if(document.visibilityState === "hidden"){
        // Persist last activity timestamp before going to background
        try{localStorage.setItem("nyc_lastUnlock", String(Date.now()));}catch(e){}
        // Start a timer when tab is hidden
        clearTimeout(timer);
        timer = setTimeout(function(){setLocked(true);}, pinTimeout*60*1000);
      } else {
        resetTimer();
      }
    };
    document.addEventListener("visibilitychange", onVisChange);
    resetTimer();
    return function(){
      clearTimeout(timer);
      events.forEach(function(ev){window.removeEventListener(ev, resetTimer);});
      document.removeEventListener("visibilitychange", onVisChange);
    };
  }, [hasPIN, pinTimeout, locked]);

  useEffect(function(){
    // (was: cleanup nyc_debug_fuelio_pdf — re-enabled for diagnostics, kept across loads)
    var s=document.createElement("script");s.src="https://accounts.google.com/gsi/client";s.async=true;s.defer=true;document.body.appendChild(s);
  },[]); var r55=useState(""),syncStatus=r55[0],setSyncStatus=r55[1]; var r56=useState(false),syncing=r56[0],setSyncing=r56[1]; var r57=useState(function(){return lsLoad("nyc_driveFileId",null);}),driveFileId=r57[0],_setDriveFileId=r57[1];function setDriveFileId(v){_setDriveFileId(v);try{if(v)localStorage.setItem("nyc_driveFileId",JSON.stringify(v));else localStorage.removeItem("nyc_driveFileId");}catch(e){}} var r58=useState(null),accessToken=r58[0],setAccessToken=r58[1];

  // Google Drive sync functions
  // Files are stored inside a dedicated folder "NYC Driver Income Backup"
  // for tidiness. This requires the drive.file scope which only sees files
  // the app itself created — that's fine because the folder is also
  // created by us.
  var DRIVE_FOLDER_NAME = "NYC Driver Income Backup";
  var DRIVE_FILE_NAME = "nyc-driver-data.json";
  var DRIVE_DAILY_NAME = "nyc-driver-data-daily.json";
  var DRIVE_MONTHLY_NAME = "nyc-driver-data-monthly.json";

  // Find or create the backup folder; calls cb(folderId).
  function getOrCreateFolder(tok, cb) {
    var q = encodeURIComponent("name='"+DRIVE_FOLDER_NAME+"' and mimeType='application/vnd.google-apps.folder' and trashed=false");
    fetch("https://www.googleapis.com/drive/v3/files?q="+q+"&spaces=drive&fields=files(id,name)",
      {headers:{Authorization:"Bearer "+tok}})
    .then(function(r){return r.json();})
    .then(function(d){
      if(d.files && d.files.length>0){
        cb(d.files[0].id);
      } else {
        // Create the folder
        fetch("https://www.googleapis.com/drive/v3/files",{
          method:"POST",
          headers:{Authorization:"Bearer "+tok,"Content-Type":"application/json"},
          body:JSON.stringify({name:DRIVE_FOLDER_NAME,mimeType:"application/vnd.google-apps.folder"})
        })
        .then(function(r){return r.json();})
        .then(function(d2){cb(d2.id||null);})
        .catch(function(err){reportError(err,{op:"createFolder"});cb(null);});
      }
    }).catch(function(err){reportError(err,{op:"findFolder"});cb(null);});
  }

  // Track if we've warned about duplicates this session
  var dupWarned = false;
  function getDriveData(tok,cb){
    // PRIORITY 1: if we have a saved fileId in localStorage, use it directly
    if(driveFileId){
      // Verify this fileId is still valid by fetching its metadata
      fetch("https://www.googleapis.com/drive/v3/files/"+driveFileId+"?fields=id,name,modifiedTime,trashed",
        {headers:{Authorization:"Bearer "+tok}})
      .then(function(r){return r.json();})
      .then(function(d){
        if(d.id && !d.trashed){
          // File exists and not trashed → use it directly (no folder lookup needed)
          getOrCreateFolder(tok, function(folderId){ cb(d.id, folderId, d.modifiedTime); });
        } else {
          // FileId stale (deleted) → fall back to name search
          setDriveFileId(null);
          getDriveDataByName(tok, cb);
        }
      }).catch(function(){
        // Network error or permission issue → fall back to name search
        getDriveDataByName(tok, cb);
      });
    } else {
      getDriveDataByName(tok, cb);
    }
  }
  function getDriveDataByName(tok,cb){
    // Fallback: search by name. Detects duplicates and warns user.
    getOrCreateFolder(tok,function(folderId){
      if(!folderId){cb(null,null,null);return;}
      var q = encodeURIComponent("name='"+DRIVE_FILE_NAME+"' and '"+folderId+"' in parents and trashed=false");
      fetch("https://www.googleapis.com/drive/v3/files?q="+q+"&spaces=drive&fields=files(id,name,modifiedTime)&orderBy=modifiedTime desc",
        {headers:{Authorization:"Bearer "+tok}})
      .then(function(r){return r.json();})
      .then(function(d){
        if(d.files && d.files.length > 0){
          // WARN if more than 1 file with this name
          if(d.files.length > 1 && !dupWarned){
            dupWarned = true;
            setTimeout(function(){
              alert((lang==="en"?"⚠️ Found ":"⚠️ Drive 上发现 ") + d.files.length + (lang==="en"?" copies of nyc-driver-data.json on Drive. Using the most recently modified one. Please clean up duplicates manually in Drive folder to avoid future sync issues.":" 份同名文件 nyc-driver-data.json。已选用最近修改的那份。请手动到 Drive 文件夹清理多余的副本，以避免同步问题。"));
            }, 2000);
          }
          // Pick most recently modified (already sorted desc)
          var picked = d.files[0];
          // Save the picked id for future use
          setDriveFileId(picked.id);
          cb(picked.id, folderId, picked.modifiedTime);
        } else {
          cb(null, folderId, null);
        }
      }).catch(function(){cb(null,folderId,null);});
    });
  }
  // Cleanup duplicate Drive files: keeps the most recently modified, trashes the rest.
  // Uses Drive API DELETE which moves files to Trash (recoverable for 30 days), not permanent delete.
  function cleanupDriveDuplicates(tok, onDone){
    setSyncStatus(lang==="en"?"⏳ Scanning Drive…":"⏳ 扫描 Drive…");
    getOrCreateFolder(tok, function(folderId){
      if(!folderId){
        setSyncStatus("");
        showToast(lang==="en"?"✗ Could not access Drive folder":"✗ 无法访问 Drive 文件夹","error");
        if(onDone)onDone({error:"no_folder"});
        return;
      }
      var q = encodeURIComponent("name='"+DRIVE_FILE_NAME+"' and '"+folderId+"' in parents and trashed=false");
      fetch("https://www.googleapis.com/drive/v3/files?q="+q+"&spaces=drive&fields=files(id,name,modifiedTime,size)&orderBy=modifiedTime desc",
        {headers:{Authorization:"Bearer "+tok}})
      .then(function(r){return r.json();})
      .then(function(d){
        var files = (d && d.files) || [];
        if(files.length <= 1){
          setSyncStatus("");
          showToast(lang==="en"?"✓ No duplicates found":"✓ 没有重复文件");
          if(onDone)onDone({kept:files.length, removed:0});
          return;
        }
        // Keep [0] (most recent), delete the rest
        var keep = files[0];
        var toDelete = files.slice(1);
        setSyncStatus((lang==="en"?"⏳ Removing ":"⏳ 删除 ")+toDelete.length+(lang==="en"?" duplicates…":" 个重复文件…"));
        // Trash each one (sequential to avoid rate limits)
        var idx = 0;
        var failures = 0;
        function next(){
          if(idx >= toDelete.length){
            setSyncStatus("");
            // Update local file ID to the kept file
            setDriveFileId(keep.id);
            var msg = failures > 0
              ? (lang==="en"?"⚠ Removed "+(toDelete.length-failures)+" of "+toDelete.length+" duplicates":"⚠ 已删除 "+(toDelete.length-failures)+"/"+toDelete.length+" 个重复文件")
              : (lang==="en"?"✓ Removed "+toDelete.length+" duplicate(s) — kept latest":"✓ 已清理 "+toDelete.length+" 个重复文件，保留最新的一份");
            showToast(msg, failures>0?"warn":"success");
            // Reset duplicate warning so it doesn't fire again this session
            dupWarned = false;
            if(onDone)onDone({kept:1, removed:toDelete.length-failures, failed:failures});
            return;
          }
          var f = toDelete[idx++];
          fetch("https://www.googleapis.com/drive/v3/files/"+f.id, {
            method:"DELETE",
            headers:{Authorization:"Bearer "+tok}
          }).then(function(r){
            if(!r.ok && r.status !== 204) failures++;
            next();
          }).catch(function(){
            failures++;
            next();
          });
        }
        next();
      }).catch(function(err){
        reportError(err,{op:"cleanupDriveDuplicates"});
        setSyncStatus("");
        showToast(lang==="en"?"✗ Cleanup failed":"✗ 清理失败","error");
        if(onDone)onDone({error:"fetch_failed"});
      });
    });
  }
  function loadFromDrive(tok){
    setSyncStatus(lang==="en"?"Loading data...":"正在加载数据...");
    getDriveData(tok,function(fileId,folderId,modTime){
      if(!fileId){setSyncStatus(lang==="en"?"No saved data found":"未找到保存的数据");return;}
      setDriveFileId(fileId);
      fetch("https://www.googleapis.com/drive/v3/files/"+fileId+"?alt=media",{headers:{Authorization:"Bearer "+tok}})
      .then(function(r){return r.json();})
      .then(function(data){
        // === TOMBSTONE CHECK: was this account cleared on another device? ===
        if(data && data._tombstone === true){
          // Another device cleared all data — wipe local too to keep devices in sync
          var clearedAt = data.clearedAt || "another device";
          setSyncStatus(lang==="en"?"⚠️ Cleared on another device":"⚠️ 在另一台设备已清空");
          // Wipe everything except the Google sign-in (so we can show the message)
          try{
            var keysToRemove = [];
            for(var i=0; i<localStorage.length; i++){
              var k = localStorage.key(i);
              if(k && k.indexOf("nyc_") === 0 && k !== "nyc_user") keysToRemove.push(k);
            }
            keysToRemove.forEach(function(k){ try{ localStorage.removeItem(k); }catch(e){} });
          }catch(e){}
          // Clear React state
          setEl([]);setSl([]);setWl([]);setFl([]);setLl([]);setDl([]);setReminders([]);setNotes([]);
          setVeh({});setDriver({});setSavedVehicles([]);
          alert(lang==="en"?
            "⚠️ This account was cleared on another device.\n\nThis device's data has been removed to stay in sync.\n\nIf you want to start fresh, you're done — enjoy! If this was a mistake, restore from a JSON backup file.":
            "⚠️ 此账号在另一台设备上已被清空。\n\n本设备的数据已同步移除。\n\n如果你正想重新开始，那就好了 — 享受吧！如果是误操作，请从 JSON 备份文件恢复。");
          setTimeout(function(){
            window.location.replace(window.location.pathname + "?cleared=" + Date.now());
          }, 500);
          return;
        }
        // === DEFENSIVE: never silently wipe local data with empty cloud arrays ===
        var localSl=lsLoad("nyc_sl",[]),localEl=lsLoad("nyc_el",[]),localWl=lsLoad("nyc_wl",[]),localDl=lsLoad("nyc_dl",[]);
        var cloudHasLessData = (
          (Array.isArray(data.sl) && data.sl.length===0 && localSl.length>0) ||
          (Array.isArray(data.el) && data.el.length===0 && localEl.length>0) ||
          (Array.isArray(data.wl) && data.wl.length===0 && localWl.length>0) ||
          (Array.isArray(data.dl) && data.dl.length===0 && localDl.length>0)
        );
        if(cloudHasLessData){
          console.warn("[sync-onSignIn] Cloud has empty arrays where local has data. Refusing to overwrite. Re-uploading local.");
          setSyncStatus(lang==="en"?"⚠ Cloud was empty — kept local data":"⚠ 云端为空 · 已保留本地数据");
          setTimeout(function(){setSyncStatus("");},3500);
          // Re-upload local data to cloud so this device "wins"
          var safeData={wl:localWl,sl:localSl,el:localEl,fl:lsLoad("nyc_fl",[]),ll:lsLoad("nyc_ll",[]),veh:lsLoad("nyc_veh",{}),cc:lsLoad("nyc_cc",[]),custGroups:lsLoad("nyc_custGroups",{}),reminders:lsLoad("nyc_reminders",[]),custPlat:lsLoad("nyc_custPlat",[]),dl:localDl,localModTime:new Date().toISOString()};
          saveToDrive(tok,fileId,safeData);
          return;
        }
        if(Array.isArray(data.wl) && data.wl.length>0)setWl(data.wl);
        if(Array.isArray(data.sl) && data.sl.length>0)setSl(data.sl);
        if(Array.isArray(data.el) && data.el.length>0)setEl(data.el);
        if(Array.isArray(data.fl) && data.fl.length>0)setFl(data.fl);
        if(Array.isArray(data.ll) && data.ll.length>0)setLl(data.ll);
        if(data.veh)setVeh(data.veh);if(data.driver)setDriver(data.driver);
        if(data.cc)setCc(data.cc);
        if(data.custGroups)setCustGroups(data.custGroups);
        if(data.reminders)setReminders(data.reminders);
        if(data.custPlat)setCustPlat(data.custPlat);if(data.custBrands)setCustBrands(data.custBrands);if(data.custLicTypes)setCustLicTypes(data.custLicTypes);if(data.custLoanTypes)setCustLoanTypes(data.custLoanTypes);if(data.favNotes)setFavNotes(data.favNotes);if(data.favStations)setFavStations(data.favStations);
        if(data.notes)setNotes(data.notes);
        if(data.incGoals && typeof data.incGoals === "object") setIncGoals(data.incGoals);
        else if(typeof data.incGoal!=="undefined" && data.incGoal!=="") {
          var d=new Date(),cm=d.getFullYear()+"-"+(d.getMonth()+1<10?"0":"")+(d.getMonth()+1);
          var g={}; g[cm]=String(data.incGoal); setIncGoals(g);
        }
        if(typeof data.seRate==="number")setSeRate(data.seRate);
        if(typeof data.fedRate==="number")setFedRate(data.fedRate);
        if(typeof data.stateRate==="number")setStateRate(data.stateRate);
        if(typeof data.stdDed==="number")setStdDed(data.stdDed);if(typeof data.mtaRate==="number")setMtaRate(data.mtaRate);if(Array.isArray(data.savedVehicles))setSavedVehicles(data.savedVehicles);if(Array.isArray(data.dl) && data.dl.length>0)setDl(data.dl);if(data.driverType==="rideshare"||data.driverType==="taxi")setDriverType(data.driverType);
        setSyncStatus(lang==="en"?"✓ Data loaded":"✓ 数据已加载");
        setTimeout(function(){setSyncStatus("");},3000);
      }).catch(function(err){reportError(err,{op:"loadFromDrive"});setSyncStatus(lang==="en"?"Load failed":"加载失败");});
    });
  }
  // Module-level lock: ensures only ONE saveToDrive runs at a time, preventing race-condition duplicates.
  // If a save is in progress, additional calls wait for it to finish before starting.
  var __driveSaveLock = null;
  function saveToDrive(tok,fid,dataObj){
    // If another save is in flight, queue behind it (don't start a parallel POST/PATCH)
    if(__driveSaveLock){
      __driveSaveLock = __driveSaveLock.then(function(){return _saveToDriveInner(tok,fid,dataObj);}, function(){return _saveToDriveInner(tok,fid,dataObj);});
    } else {
      __driveSaveLock = _saveToDriveInner(tok,fid,dataObj);
    }
    // After this save completes (success or fail), release the lock
    var current = __driveSaveLock;
    current.finally(function(){
      if(__driveSaveLock === current) __driveSaveLock = null;
    });
    return current;
  }
  function _saveToDriveInner(tok,fid,dataObj){
    return new Promise(function(resolve){
      setSyncing(true);
      var body=JSON.stringify(dataObj);
      var bound="-------nycdriverfoo";
      var doUpload = function(folderId, useFid){
        // For new file, include parents (folder); for update (PATCH), don't include parents
        var meta = useFid
          ? {name:DRIVE_FILE_NAME,mimeType:"application/json"}
          : {name:DRIVE_FILE_NAME,mimeType:"application/json",parents:folderId?[folderId]:undefined};
        var metaStr = JSON.stringify(meta);
        var reqBody = "--"+bound+"\r\nContent-Type: application/json\r\n\r\n"+metaStr+"\r\n--"+bound+"\r\nContent-Type: application/json\r\n\r\n"+body+"\r\n--"+bound+"--";
        var url = useFid
          ? "https://www.googleapis.com/upload/drive/v3/files/"+useFid+"?uploadType=multipart"
          : "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";
        var method = useFid ? "PATCH" : "POST";
        fetch(url,{method:method,headers:{Authorization:"Bearer "+tok,"Content-Type":"multipart/related; boundary="+bound},body:reqBody})
        .then(function(r){return r.json();})
        .then(function(d){
          if(d.id)setDriveFileId(d.id);
          setSyncing(false);
          setSyncStatus("");
          try{localStorage.setItem("nyc_lastBackup", String(Date.now()));}catch(e){}
          // After CREATE (POST without useFid), do a final dedupe sweep:
          // If somehow another file with the same name exists (race / leftover), trash the older ones.
          if(!useFid && d.id && folderId){
            setTimeout(function(){
              var qq = encodeURIComponent("name='"+DRIVE_FILE_NAME+"' and '"+folderId+"' in parents and trashed=false");
              fetch("https://www.googleapis.com/drive/v3/files?q="+qq+"&spaces=drive&fields=files(id,modifiedTime)&orderBy=modifiedTime desc",
                {headers:{Authorization:"Bearer "+tok}})
              .then(function(r){return r.json();})
              .then(function(dd){
                if(!dd.files || dd.files.length<=1){resolve(); return;}
                // Multiple files exist — keep the one we just created/updated, trash the rest
                var keep = d.id;
                var toTrash = dd.files.filter(function(f){return f.id !== keep;});
                var done = 0;
                toTrash.forEach(function(f){
                  fetch("https://www.googleapis.com/drive/v3/files/"+f.id, {method:"DELETE", headers:{Authorization:"Bearer "+tok}})
                  .finally(function(){
                    done++;
                    if(done === toTrash.length){
                      console.log("[drive] auto-trashed "+toTrash.length+" duplicate(s) after upload");
                      resolve();
                    }
                  });
                });
              })
              .catch(function(){resolve();});
            }, 500); // wait briefly for Drive to index the new file
          } else {
            resolve();
          }
          showToast(lang==="en"?"☁ Synced to Drive":"☁ 已同步到 Drive");
        }).catch(function(err){
          reportError(err,{op:"saveToDrive"});
          setSyncing(false);
          setSyncStatus("");
          showToast(lang==="en"?"✗ Sync failed":"✗ 同步失败","error");
          resolve();
        });
      };
      if(fid){
        // We already have a fileId — go straight to PATCH update
        doUpload(null, fid);
      }else{
        // No fileId — RACE-SAFE check: search by name first to avoid creating duplicates
        // (covers cases like: cache cleared, multi-device first sync, stale fileId after Drive cleanup)
        getOrCreateFolder(tok,function(folderId){
          if(!folderId){doUpload(null, null);return;}
          var q = encodeURIComponent("name='"+DRIVE_FILE_NAME+"' and '"+folderId+"' in parents and trashed=false");
          fetch("https://www.googleapis.com/drive/v3/files?q="+q+"&spaces=drive&fields=files(id,modifiedTime)&orderBy=modifiedTime desc",
            {headers:{Authorization:"Bearer "+tok}})
          .then(function(r){return r.json();})
          .then(function(d){
            if(d.files && d.files.length > 0){
              // File(s) already exist — adopt the most recent and PATCH it instead of creating a new one
              var existing = d.files[0];
              setDriveFileId(existing.id);
              doUpload(null, existing.id);
              // If multiple, auto-trash the older ones (silent cleanup)
              if(d.files.length > 1){
                var older = d.files.slice(1);
                older.forEach(function(f){
                  fetch("https://www.googleapis.com/drive/v3/files/"+f.id, {method:"DELETE", headers:{Authorization:"Bearer "+tok}}).catch(function(){});
                });
                console.log("[drive] auto-trashed "+older.length+" older duplicate(s) before upload");
              }
            } else {
              // Truly no file → safe to create
              doUpload(folderId, null);
            }
          }).catch(function(){
            // Search failed → fall back to creating (best effort; may produce a duplicate but rare)
            doUpload(folderId, null);
          });
        });
      }
    });
  }

  // Save data to a specific named file in Drive (for daily/monthly snapshots)
  function saveToNamedFile(tok, fileName, fileId, dataObj, onSuccess){
    var body=JSON.stringify(dataObj);
    var bound="-------nycdriversnap";
    var doUpload = function(folderId){
      var meta = fileId
        ? {name:fileName,mimeType:"application/json"}
        : {name:fileName,mimeType:"application/json",parents:folderId?[folderId]:undefined};
      var metaStr = JSON.stringify(meta);
      var reqBody = "--"+bound+"\r\nContent-Type: application/json\r\n\r\n"+metaStr+"\r\n--"+bound+"\r\nContent-Type: application/json\r\n\r\n"+body+"\r\n--"+bound+"--";
      var url = fileId
        ? "https://www.googleapis.com/upload/drive/v3/files/"+fileId+"?uploadType=multipart&fields=id,modifiedTime"
        : "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,modifiedTime";
      var method = fileId ? "PATCH" : "POST";
      fetch(url,{method:method,headers:{Authorization:"Bearer "+tok,"Content-Type":"multipart/related; boundary="+bound},body:reqBody})
      .then(function(r){return r.json();})
      .then(function(d){
        if(onSuccess) onSuccess(d.id, d.modifiedTime);
      }).catch(function(err){console.warn("[drive snap save] "+fileName, err);});
    };
    if(fileId){
      doUpload(null);
    }else{
      getOrCreateFolder(tok,function(folderId){doUpload(folderId);});
    }
  }

  // Find a named file in our Drive folder, with optional cached fileId
  function findNamedFileById(tok, fileId, cb){
    if(!fileId){cb(null,null);return;}
    fetch("https://www.googleapis.com/drive/v3/files/"+fileId+"?fields=id,modifiedTime,trashed",
      {headers:{Authorization:"Bearer "+tok}})
    .then(function(r){return r.json();})
    .then(function(d){
      if(d.id && !d.trashed) cb(d.id, d.modifiedTime);
      else cb(null, null);
    }).catch(function(){cb(null, null);});
  }
  function findNamedFile(tok, fileName, cb){
    // Use cached id first
    var cached = null;
    if(fileName === DRIVE_DAILY_NAME) cached = driveDailyFileId;
    else if(fileName === DRIVE_MONTHLY_NAME) cached = driveMonthlyFileId;
    if(cached){
      findNamedFileById(tok, cached, function(id, modTime){
        if(id){ cb(id, modTime); return; }
        // Cached id stale → fall back to name search
        if(fileName === DRIVE_DAILY_NAME) setDriveDailyFileId(null);
        else if(fileName === DRIVE_MONTHLY_NAME) setDriveMonthlyFileId(null);
        findNamedFileByName(tok, fileName, cb);
      });
    } else {
      findNamedFileByName(tok, fileName, cb);
    }
  }
  function findNamedFileByName(tok, fileName, cb){
    getOrCreateFolder(tok, function(folderId){
      if(!folderId){cb(null,null);return;}
      var q = encodeURIComponent("name='"+fileName+"' and '"+folderId+"' in parents and trashed=false");
      fetch("https://www.googleapis.com/drive/v3/files?q="+q+"&spaces=drive&fields=files(id,name,modifiedTime)&orderBy=modifiedTime desc",
        {headers:{Authorization:"Bearer "+tok}})
      .then(function(r){return r.json();})
      .then(function(d){
        if(d.files && d.files.length > 0){
          // Warn if duplicates
          if(d.files.length > 1 && !dupWarned){
            dupWarned = true;
            setTimeout(function(){
              alert((lang==="en"?"⚠️ Found ":"⚠️ Drive 上发现 ") + d.files.length + " " + fileName + (lang==="en"?" copies. Using most recent. Clean up extras in Drive folder.":" 同名文件。已用最近的那份。请到 Drive 文件夹清理多余副本。"));
            }, 2000);
          }
          var picked = d.files[0];
          // Save id back to state
          if(fileName === DRIVE_DAILY_NAME) setDriveDailyFileId(picked.id);
          else if(fileName === DRIVE_MONTHLY_NAME) setDriveMonthlyFileId(picked.id);
          cb(picked.id, picked.modifiedTime);
        } else {
          cb(null, null);
        }
      }).catch(function(){cb(null,null);});
    });
  }

  // Read a named file's content
  function readNamedFile(tok, fileId, cb){
    fetch("https://www.googleapis.com/drive/v3/files/"+fileId+"?alt=media",{headers:{Authorization:"Bearer "+tok}})
    .then(function(r){return r.json();})
    .then(function(data){cb(data, null);})
    .catch(function(err){cb(null, err);});
  }

  // Check & rotate daily/monthly snapshots if stale
  function maybeRotateSnapshots(tok){
    if(!tok) return;
    var now = new Date();
    var todayStr = now.toISOString().slice(0,10);
    var thisMonth = todayStr.slice(0,7);
    
    var currentData = function(){
      return {
        wl:wl,sl:sl,el:el,fl:fl,ll:ll,veh:veh,cc:cc,
        custGroups:custGroups,reminders:reminders,
        custPlat:custPlat,custBrands:custBrands,
        custLicTypes:custLicTypes,custLoanTypes:custLoanTypes,
        favNotes:favNotes,favStations:favStations,favExpenses:favExpenses,notes:notes,
        incGoals:incGoals,seRate:seRate,fedRate:fedRate,
        stateRate:stateRate,stdDed:stdDed,mtaRate:mtaRate,
        savedVehicles:savedVehicles,dl:dl,driverType:driverType,driver:driver,
        _snapshotTime: now.toISOString()
      };
    };
    
    // Daily check
    findNamedFile(tok, DRIVE_DAILY_NAME, function(fid, modTime){
      var stale = !modTime || modTime.slice(0,10) < todayStr;
      if(fid) setDriveDailyFileId(fid);
      if(modTime) setDriveDailyModTime(modTime);
      if(stale && (sl.length>0 || el.length>0 || wl.length>0)){
        // Only rotate if we have data (avoid empty file on first launch)
        saveToNamedFile(tok, DRIVE_DAILY_NAME, fid, currentData(), function(newId, newMod){
          if(newId) setDriveDailyFileId(newId);
          if(newMod) setDriveDailyModTime(newMod);
          console.log("[drive] daily snapshot rotated");
        });
      }
    });
    
    // Monthly check
    findNamedFile(tok, DRIVE_MONTHLY_NAME, function(fid, modTime){
      var stale = !modTime || modTime.slice(0,7) < thisMonth;
      if(fid) setDriveMonthlyFileId(fid);
      if(modTime) setDriveMonthlyModTime(modTime);
      if(stale && (sl.length>0 || el.length>0 || wl.length>0)){
        saveToNamedFile(tok, DRIVE_MONTHLY_NAME, fid, currentData(), function(newId, newMod){
          if(newId) setDriveMonthlyFileId(newId);
          if(newMod) setDriveMonthlyModTime(newMod);
          console.log("[drive] monthly snapshot rotated");
        });
      }
    });
  }

  // Restore from a Drive snapshot file (daily or monthly)
  function restoreFromDriveSnapshot(tok, fileId, label){
    if(!fileId){alert(lang==="en"?"Snapshot not found":"快照不存在");return;}
    if(!confirm((lang==="en"?"Restore from ":"从 ")+label+(lang==="en"?" snapshot? Current data will be replaced.":" 快照恢复？当前数据会被替换。")))return;
    // Save current to local pre-restore backup first
    try {
      var snapshot = {timestamp:new Date().toISOString(),label:lang==="en"?"Pre-Drive-snapshot-restore":"Drive 快照恢复前",
        data:{wl:wl,sl:sl,el:el,fl:fl,ll:ll,veh:veh,cc:cc,custGroups:custGroups,reminders:reminders,custPlat:custPlat,custBrands:custBrands,custLicTypes:custLicTypes,custLoanTypes:custLoanTypes,favNotes:favNotes,favStations:favStations,favExpenses:favExpenses,notes:notes,incGoals:incGoals,seRate:seRate,fedRate:fedRate,stateRate:stateRate,stdDed:stdDed,mtaRate:mtaRate,savedVehicles:savedVehicles,dl:dl,driverType:driverType,driver:driver}};
      localStorage.setItem("nyc_pre_restore_backup", JSON.stringify(snapshot));
    } catch(e){}
    setSyncStatus(lang==="en"?"⏳ Restoring...":"⏳ 恢复中...");
    readNamedFile(tok, fileId, function(data, err){
      if(err || !data){setSyncStatus(lang==="en"?"✗ Failed":"✗ 失败");setTimeout(function(){setSyncStatus("");},2000);return;}
      if(data.wl)setWl(data.wl); if(data.sl)setSl(data.sl); if(data.el)setEl(data.el); if(data.fl)setFl(data.fl);
      if(data.ll)setLl(data.ll); if(data.veh)setVeh(data.veh);if(data.driver)setDriver(data.driver); if(data.cc)setCc(data.cc);
      if(data.custGroups)setCustGroups(data.custGroups); if(data.reminders)setReminders(data.reminders);
      if(data.custPlat)setCustPlat(data.custPlat); if(data.custBrands)setCustBrands(data.custBrands);
      if(data.custLicTypes)setCustLicTypes(data.custLicTypes); if(data.custLoanTypes)setCustLoanTypes(data.custLoanTypes);
      if(data.favNotes)setFavNotes(data.favNotes);if(data.favStations)setFavStations(data.favStations); if(Array.isArray(data.favExpenses))setFavExpenses(data.favExpenses); if(data.notes)setNotes(data.notes);
      if(data.incGoals && typeof data.incGoals === "object") setIncGoals(data.incGoals);
        else if(typeof data.incGoal!=="undefined" && data.incGoal!=="") {
          var d=new Date(),cm=d.getFullYear()+"-"+(d.getMonth()+1<10?"0":"")+(d.getMonth()+1);
          var g={}; g[cm]=String(data.incGoal); setIncGoals(g);
        }
      if(typeof data.seRate==="number")setSeRate(data.seRate);
      if(typeof data.fedRate==="number")setFedRate(data.fedRate);
      if(typeof data.stateRate==="number")setStateRate(data.stateRate);
      if(typeof data.stdDed==="number")setStdDed(data.stdDed);
      if(typeof data.mtaRate==="number")setMtaRate(data.mtaRate);
      if(Array.isArray(data.savedVehicles))setSavedVehicles(data.savedVehicles);
      if(Array.isArray(data.dl))setDl(data.dl);
      if(data.driverType==="rideshare"||data.driverType==="taxi")setDriverType(data.driverType);
      setSyncStatus(lang==="en"?"✓ Restored":"✓ 恢复成功");
      setTimeout(function(){setSyncStatus("");},2500);
      showToast((lang==="en"?"✓ Restored from ":"✓ 已从 ")+label+(lang==="en"?" snapshot":" 快照恢复"));
    });
  }
  
  function signInWithGoogle(onDone, opts){
    opts = opts || {};
    if(!window.google||!window.google.accounts||!window.google.accounts.oauth2){
      if(!opts.silent)alert(lang==="en"?"Google not loaded, please refresh":"Google未加载，请刷新页面");
      return;
    }
    var client=window.google.accounts.oauth2.initTokenClient({
      client_id:"191679830947-efrr8o2em07oo9q88co37rd57qnnb0ai.apps.googleusercontent.com",
      scope:"https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
      // hint: pre-select the previously-signed-in account (if any) for smoother re-auth
      hint: gUser&&gUser.email ? gUser.email : undefined,
      // For silent re-auth: prompt:"" tries to skip the consent screen if user already granted
      prompt: opts.silent ? "" : undefined,
      callback:function(tokenResp){
        if(tokenResp.error){
          if(!opts.silent)console.warn("OAuth error:",tokenResp.error);
          return;
        }
        var tok=tokenResp.access_token;
        setAccessToken(tok);
        fetch("https://www.googleapis.com/oauth2/v2/userinfo",{headers:{Authorization:"Bearer "+tok}})
        .then(function(r){return r.json();})
        .then(function(u){
          setGUser({name:u.name,email:u.email,picture:u.picture});
          loadFromDrive(tok); setTimeout(function(){maybeRotateSnapshots(tok);}, 5000);
          if(onDone)onDone(tok);
        });
      }
    });
    client.requestAccessToken();
  }

  // Auto-reconnect on startup: if user was previously signed in (gUser saved),
  // try to silently re-authenticate so they don't have to click "Reconnect" every time.
  useEffect(function(){
    if(!gUser||accessToken)return;
    var t=setTimeout(function(){
      if(window.google&&window.google.accounts&&window.google.accounts.oauth2){
        signInWithGoogle(null,{silent:true});
      }
    },1500); // wait for GIS script to load
    return function(){clearTimeout(t);};
  },[gUser,accessToken]);

  // One-time migration: assign IDs to any legacy records imported without them.
  // (Some old import JSON files didn't include id fields, which made delete-by-id
  // accidentally remove ALL records. This patches existing data on App load.)
  useEffect(function(){
    var nextId = Date.now();
    var fixed = false;
    var fix = function(arr){
      return arr.map(function(item){
        if(!item.id){fixed = true; return Object.assign({},item,{id: ++nextId});}
        return item;
      });
    };
    var newSl = fix(sl), newWl = fix(wl), newEl = fix(el), newFl = fix(fl), newLl = fix(ll);
    if(fixed){
      console.log("[migration] Assigning IDs to legacy records");
      setSl(newSl); setWl(newWl); setEl(newEl); setFl(newFl); setLl(newLl);
    }
  // Run once on mount (sl/wl/el etc. are deps but we only want to migrate once)
  // eslint-disable-next-line
  },[]);


  // Strategy: every 30 seconds (or when data changes) compare timestamps:
  //   - If cloud is NEWER than local → download (another device has newer data)
  //   - If local is NEWER than cloud → upload (we have unsaved changes)
  //   - If equal → do nothing (already synced)
  // localModTime is set whenever any persisted state changes. saveToDrive will
  // store this timestamp inside the file, so we can compare across devices.
  // Drive's modifiedTime is the file's last-write timestamp from Google itself.
  //
  // This prevents the "device with stale data overwrites cloud" disaster.

  // One-time migration: tag any pre-existing expenses as mode="shared".
  // Honest default — we don't actually know what mode old data belongs to.
  // User can later use the bulk-reclassify buttons in Backup to convert them.
  useEffect(function(){
    try{
      if(localStorage.getItem("nyc_migrated_expmode_v2")==="1") return;
      var changed=false;
      var newEl=el.map(function(item){
        if(item.mode==="rideshare"||item.mode==="taxi"||item.mode==="shared") return item;
        changed=true;
        return Object.assign({},item,{mode:"shared"});
      });
      if(changed){ setEl(newEl); }
      localStorage.setItem("nyc_migrated_expmode_v2","1");
    }catch(e){}
  },[]);

  // Bump localModTime whenever any persisted field changes, but skip the very
  // first render (which would mark a fresh device as "modified" before sync).
  var firstRenderRef = useState({first:true})[0];
  useEffect(function(){
    if(firstRenderRef.first){firstRenderRef.first=false;return;}
    setLocalModTime(new Date().toISOString());
  },[wl,sl,el,fl,ll,veh,cc,custGroups,reminders,custPlat,custBrands,custLicTypes,custLoanTypes,favNotes,favExpenses,notes,incGoals,seRate,fedRate,stateRate,stdDed,mtaRate,savedVehicles,dl,driverType,driver]);

  // Smart sync function — compares timestamps and decides direction
  function smartSync(){
    if(!accessToken)return;
    getDriveData(accessToken,function(fileId,folderId,driveModTime){
      if(!fileId){
        // No cloud file → upload our local data (first-time sync)
        if(localModTime){
          var data={wl:wl,sl:sl,el:el,fl:fl,ll:ll,veh:veh,cc:cc,custGroups:custGroups,reminders:reminders,custPlat:custPlat,custBrands:custBrands,custLicTypes:custLicTypes,custLoanTypes:custLoanTypes,favNotes:favNotes,favStations:favStations,favExpenses:favExpenses,notes:notes,incGoals:incGoals,seRate:seRate,fedRate:fedRate,stateRate:stateRate,stdDed:stdDed,mtaRate:mtaRate,savedVehicles:savedVehicles,dl:dl,driverType:driverType,driver:driver,localModTime:localModTime};
          saveToDrive(accessToken,null,data);
        }
        return;
      }
      // Compare: download the file's content first to read the localModTime stored inside
      // (Drive's own modifiedTime can be misleading — it changes whenever ANY device uploads,
      //  even an upload of the same data, so we trust the in-file timestamp instead.)
      fetch("https://www.googleapis.com/drive/v3/files/"+fileId+"?alt=media",{headers:{Authorization:"Bearer "+accessToken}})
      .then(function(r){return r.json();})
      .then(function(cloudData){
        setDriveFileId(fileId);
        var cloudModTime = cloudData.localModTime || "";
        // === DEFENSIVE: never let cloud silently delete data ===
        // If cloud has empty arrays for sl/el/wl/dl but local has data, the user almost
        // certainly does NOT want to lose that data. Could be: stale cloud from a fresh
        // device, sync race condition, or token-expired-then-restored scenario.
        // Rule: when arrays are empty on cloud but populated locally, keep local data
        // and re-upload it. Do this BEFORE the timestamp comparison so it's never bypassed.
        var cloudHasLessData = (
          (Array.isArray(cloudData.sl) && cloudData.sl.length===0 && sl.length>0) ||
          (Array.isArray(cloudData.el) && cloudData.el.length===0 && el.length>0) ||
          (Array.isArray(cloudData.wl) && cloudData.wl.length===0 && wl.length>0) ||
          (Array.isArray(cloudData.dl) && cloudData.dl.length===0 && dl.length>0)
        );
        if(cloudHasLessData){
          console.warn("[sync] Refusing to overwrite local data with empty cloud arrays. Re-uploading local.");
          var safeData={wl:wl,sl:sl,el:el,fl:fl,ll:ll,veh:veh,cc:cc,custGroups:custGroups,reminders:reminders,custPlat:custPlat,custBrands:custBrands,custLicTypes:custLicTypes,custLoanTypes:custLoanTypes,favNotes:favNotes,favStations:favStations,favExpenses:favExpenses,notes:notes,incGoals:incGoals,seRate:seRate,fedRate:fedRate,stateRate:stateRate,stdDed:stdDed,mtaRate:mtaRate,savedVehicles:savedVehicles,dl:dl,driverType:driverType,driver:driver,localModTime:new Date().toISOString()};
          saveToDrive(accessToken,fileId,safeData);
          setSyncStatus(lang==="en"?"⚠ Cloud was empty — kept local data":"⚠ 云端为空 · 已保留本地数据");
          setTimeout(function(){setSyncStatus("");},3500);
          return;
        }
        // Compare timestamps as ISO strings (lexicographic compare works for ISO 8601)
        if(cloudModTime > localModTime){
          // Cloud is newer — download. But still guard each array: only overwrite if cloud has data.
          if(Array.isArray(cloudData.wl) && cloudData.wl.length>0)setWl(cloudData.wl);
          if(Array.isArray(cloudData.sl) && cloudData.sl.length>0)setSl(cloudData.sl);
          if(Array.isArray(cloudData.el) && cloudData.el.length>0)setEl(cloudData.el);
          if(Array.isArray(cloudData.fl) && cloudData.fl.length>0)setFl(cloudData.fl);
          if(Array.isArray(cloudData.ll) && cloudData.ll.length>0)setLl(cloudData.ll);
          if(cloudData.veh)setVeh(cloudData.veh);if(cloudData.driver)setDriver(cloudData.driver);
          if(cloudData.cc)setCc(cloudData.cc);
          if(cloudData.custGroups)setCustGroups(cloudData.custGroups);
          if(cloudData.reminders)setReminders(cloudData.reminders);
          if(cloudData.custPlat)setCustPlat(cloudData.custPlat);if(cloudData.custBrands)setCustBrands(cloudData.custBrands);if(cloudData.custLicTypes)setCustLicTypes(cloudData.custLicTypes);if(cloudData.custLoanTypes)setCustLoanTypes(cloudData.custLoanTypes);if(cloudData.favNotes)setFavNotes(cloudData.favNotes);if(Array.isArray(cloudData.favExpenses))setFavExpenses(cloudData.favExpenses);
          if(cloudData.notes)setNotes(cloudData.notes);
          if(cloudData.incGoals && typeof cloudData.incGoals === "object") setIncGoals(cloudData.incGoals);
          else if(typeof cloudData.incGoal!=="undefined" && cloudData.incGoal!=="") {
            var d=new Date(),cm=d.getFullYear()+"-"+(d.getMonth()+1<10?"0":"")+(d.getMonth()+1);
            var g={}; g[cm]=String(cloudData.incGoal); setIncGoals(g);
          }
          if(typeof cloudData.seRate==="number")setSeRate(cloudData.seRate);
          if(typeof cloudData.fedRate==="number")setFedRate(cloudData.fedRate);
          if(typeof cloudData.stateRate==="number")setStateRate(cloudData.stateRate);
          if(typeof cloudData.stdDed==="number")setStdDed(cloudData.stdDed);if(typeof cloudData.mtaRate==="number")setMtaRate(cloudData.mtaRate);if(Array.isArray(cloudData.savedVehicles))setSavedVehicles(cloudData.savedVehicles);
          if(Array.isArray(cloudData.dl) && cloudData.dl.length>0)setDl(cloudData.dl);
          if(cloudData.driverType==="rideshare"||cloudData.driverType==="taxi")setDriverType(cloudData.driverType);
          // Adopt cloud's timestamp (without bumping it, to avoid triggering the dirty effect)
          firstRenderRef.first = true;
          setLocalModTime(cloudModTime);
          setSyncStatus(lang==="en"?"✓ Pulled from cloud":"✓ 从云端更新");
          setTimeout(function(){setSyncStatus("");},2000);
        } else if(localModTime > cloudModTime){
          // Local is newer — upload
          var data={wl:wl,sl:sl,el:el,fl:fl,ll:ll,veh:veh,cc:cc,custGroups:custGroups,reminders:reminders,custPlat:custPlat,custBrands:custBrands,custLicTypes:custLicTypes,custLoanTypes:custLoanTypes,favNotes:favNotes,favStations:favStations,favExpenses:favExpenses,notes:notes,incGoals:incGoals,seRate:seRate,fedRate:fedRate,stateRate:stateRate,stdDed:stdDed,mtaRate:mtaRate,savedVehicles:savedVehicles,dl:dl,driverType:driverType,driver:driver,localModTime:localModTime};
          saveToDrive(accessToken,fileId,data);
        }
        // else: timestamps equal — already synced, do nothing
      })
      .catch(function(err){reportError(err,{op:"smartSync"});});
    });
  }

  // Run smart sync periodically (every 30s) and once on mount
  useEffect(function(){
    if(!accessToken)return;
    var t1=setTimeout(smartSync,2000); // initial sync 2s after sign-in
    var interval=setInterval(smartSync,30000);
    return function(){clearTimeout(t1);clearInterval(interval);};
  },[accessToken]);

  // Also trigger sync 2 seconds after any local data change (debounced upload)
  useEffect(function(){
    if(!accessToken||!localModTime)return;
    var t=setTimeout(smartSync,2000);
    return function(){clearTimeout(t);};
  },[accessToken,localModTime]);

  // Backwards-compat stub
  function autoSave(){if(accessToken)smartSync();}


  // Save to localStorage when data changes (load is handled by lazy useState initializers)
  function lsSave(k,v){
    // Save immediately AND keep debounced for safety (immediate is most reliable)
    try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){}
  }
  // IRS standard rates by year. Std deduction is single-filer; fed rate is the bracket
  // most NYC drivers (net $30-60k after SE deduction) actually fall into. State rate
  // combines NY State (~5.5%) + NYC City tax (~3%) for NYC residents.
  var TAX_PRESETS={
    "2020":{se:15.3,fed:12,state:8.5,std:12400},
    "2021":{se:15.3,fed:12,state:8.5,std:12550},
    "2022":{se:15.3,fed:12,state:8.5,std:12950},
    "2023":{se:15.3,fed:12,state:8.5,std:13850},
    "2024":{se:15.3,fed:12,state:8.5,std:14600},
    "2025":{se:15.3,fed:12,state:8.5,std:15000},
    "2026":{se:15.3,fed:12,state:8.5,std:15500}
  };
  function applyTaxPreset(yr){var p=TAX_PRESETS[yr];if(!p)return;setSeRate(p.se);setFedRate(p.fed);setStateRate(p.state);setStdDed(p.std);setTaxRateNote((lang==="en"?"Loaded IRS ":"已加载 IRS ")+yr);}

  useEffect(function(){lsSave("nyc_wl",wl);}, [wl]);
  useEffect(function(){lsSave("nyc_sl",sl);}, [sl]);
  useEffect(function(){lsSave("nyc_el",el);}, [el]);
  useEffect(function(){lsSave("nyc_fl",fl);}, [fl]);
  useEffect(function(){lsSave("nyc_ll",ll);}, [ll]);
  useEffect(function(){lsSave("nyc_veh",veh);}, [veh]);
  useEffect(function(){lsSave("nyc_cc",cc);}, [cc]);
  useEffect(function(){lsSave("nyc_custPlat",custPlat);}, [custPlat]);
  useEffect(function(){lsSave("nyc_custGroups",custGroups);}, [custGroups]);
  useEffect(function(){lsSave("nyc_reminders",reminders);}, [reminders]);
  useEffect(function(){lsSave("nyc_dl",dl);}, [dl]);
  useEffect(function(){lsSave("nyc_notes",notes);}, [notes]);
  // === One-time migration: tag legacy expenses with current vehicleId ===
  // Runs only once. Sets a flag in localStorage so it never runs again.
  // For users with one car, this correctly attributes all history to it.
  // For users who switched cars before this feature: history goes to current car;
  // they can use "Reassign by date range" tool later to fix.
  useEffect(function(){
    try{
      var migrated = localStorage.getItem("nyc_vehMigrated_v1");
      if(migrated) return;
      if(!veh.vehicleId) return; // wait for veh to be ready
      var elNeedsTag = el.some(function(e){return !e.vehicleId;});
      var dlNeedsTag = dl.some(function(d){return !d.vehicleId;});
      // Migrate legacy cash-tip entries: detect by notes content, add cashTip:true flag
      var dlCashTipMigrated = localStorage.getItem("nyc_cashTipMigrated_v1") === "1";
      var dlNeedsCashTipTag = !dlCashTipMigrated && dl.some(function(d){
        if(d.cashTip === true) return false;
        if(!d.notes || typeof d.notes !== "string") return false;
        return d.notes.indexOf("现金小费") >= 0 || d.notes.indexOf("Cash tip") >= 0 || d.notes.indexOf("cash tip") >= 0;
      });
      if(!elNeedsTag && !dlNeedsTag && !dlNeedsCashTipTag){
        localStorage.setItem("nyc_vehMigrated_v1","1");
        if(!dlCashTipMigrated) localStorage.setItem("nyc_cashTipMigrated_v1","1");
        return;
      }
      if(elNeedsTag){
        setEl(el.map(function(e){return e.vehicleId ? e : Object.assign({}, e, {vehicleId: veh.vehicleId});}));
      }
      if(dlNeedsTag || dlNeedsCashTipTag){
        setDl(dl.map(function(d){
          var updated = d;
          if(!d.vehicleId){ updated = Object.assign({}, updated, {vehicleId: veh.vehicleId}); }
          if(d.cashTip !== true && d.notes && typeof d.notes === "string" &&
             (d.notes.indexOf("现金小费") >= 0 || d.notes.indexOf("Cash tip") >= 0 || d.notes.indexOf("cash tip") >= 0)){
            updated = Object.assign({}, updated, {cashTip: true});
          }
          return updated;
        }));
      }
      localStorage.setItem("nyc_vehMigrated_v1","1");
      localStorage.setItem("nyc_cashTipMigrated_v1","1");
    }catch(e){}
  }, [veh.vehicleId]); // re-run if veh ID just got created
  // ============ Auto-snapshot to IndexedDB ============
  // Whenever core data changes, push a snapshot (throttled to once per 60s).
  var lastSnapTime = useState({t:0})[0];
  useEffect(function(){
    var now = Date.now();
    if(now - lastSnapTime.t < 60000) return;  // throttle: 1 per minute max
    lastSnapTime.t = now;
    var snapshot = {
      wl:wl, sl:sl, el:el, fl:fl, ll:ll, veh:veh, cc:cc,
      custGroups:custGroups, reminders:reminders, custPlat:custPlat,
      custBrands:custBrands, custLicTypes:custLicTypes, custLoanTypes:custLoanTypes,
      favNotes:favNotes, notes:notes, incGoals:incGoals, seRate:seRate,
      fedRate:fedRate, stateRate:stateRate, stdDed:stdDed, mtaRate:mtaRate,
      savedVehicles:savedVehicles, dl:dl, driverType:driverType
    };
    idbAddSnapshot(snapshot);
  }, [wl,sl,el,fl,ll,veh,cc,custGroups,reminders,custPlat,custBrands,custLicTypes,custLoanTypes,favNotes,favExpenses,notes,dl,driverType,driver]);
  // ============ End Auto-snapshot ============

  useEffect(function(){try{document.documentElement.lang=lang==="en"?"en":"zh";}catch(e){}}, [lang]);

  // Auto-logout after 1 hour of inactivity (security)
  useEffect(function(){
    if(!gUser) return;
    var IDLE_LIMIT = 60 * 60 * 1000; // 1 hour in ms
    // On mount: check if last activity was too long ago → force logout
    try {
      var lastActive = +localStorage.getItem("nyc_lastActive") || 0;
      if(lastActive > 0 && (Date.now() - lastActive) > IDLE_LIMIT) {
        localStorage.removeItem("nyc_user");
        localStorage.removeItem("nyc_lastActive");
        localStorage.removeItem("nyc_tab");
        setGUser(null);
        setAccessToken(null);
        setTab(0);
        setSf(null);
        return;
      }
    } catch(e){}
    // Update timestamp on any user interaction
    var updateActive = function(){ try{ localStorage.setItem("nyc_lastActive", String(Date.now())); }catch(e){} };
    updateActive();
    var events = ["click","touchstart","keydown"];
    events.forEach(function(ev){ document.addEventListener(ev, updateActive, { passive: true }); });
    return function(){
      events.forEach(function(ev){ document.removeEventListener(ev, updateActive); });
    };
  }, [gUser]);
  useEffect(function(){try{if(gUser)localStorage.setItem("nyc_user",JSON.stringify(gUser));else localStorage.removeItem("nyc_user");}catch(e){}}, [gUser]);

  if(!gUser) return (
React.createElement('div', { style: {minHeight:"100vh",background:C.bg2,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 204}}
          , React.createElement('img', { src: "icon-192.png", alt: "NYC Driver Tracker", style: {width:96,height:96,marginBottom:20,borderRadius:22,boxShadow:"0 8px 24px rgba(85,56,238,0.4)"} })
          , React.createElement('div', { style: {fontSize:22,fontWeight:900,color:C.text,marginBottom:6}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 206}}, "NYC Driver Tracker"  )
          , React.createElement('div', { style: {fontSize:14,color:C.text3,marginBottom:40,textAlign:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 207}}, "纽约网约车司机财务管理")
          , React.createElement('div', { id: "g_id_signin", style: {marginBottom:20}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 208}})
          , React.createElement('button', { onClick: function(){signInWithGoogle();}, style: {background:"#fff",border:"none",borderRadius:24,padding:"12px 28px",fontSize:15,fontWeight:700,color:"#1A1A1A",cursor:"pointer",display:"flex",alignItems:"center",gap:10,boxShadow:"0 2px 12px rgba(0,0,0,0.3)"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 209}}
            , React.createElement('svg', { width: "20", height: "20", viewBox: "0 0 48 48"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 234}}, React.createElement('path', { fill: "#EA4335", d: "M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"                       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 234}}), React.createElement('path', { fill: "#4285F4", d: "M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 234}}), React.createElement('path', { fill: "#FBBC05", d: "M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 234}}), React.createElement('path', { fill: "#34A853", d: "M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 234}}))
            , lang==="en"?"Sign in with Google":"用 Google 账号登录"
          )
          , React.createElement('button', { onClick: function(){setLang(lang==="zh"?"en":"zh");}, style: {marginTop:20,background:"none",border:"1px solid "+C.border2,borderRadius:8,padding:"6px 16px",color:C.text3,fontSize:13,cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 237}}, lang==="zh"?"English":"中文")
        )
  );
  return (
      React.createElement('div', { style: {minHeight:"100vh",background:C.bg,fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,'PingFang SC','Noto Sans SC','Segoe UI',Roboto,sans-serif",color:C.text}, className: "app-wrapper", __self: this, __source: {fileName: _jsxFileName, lineNumber: 241}}
      // === Simple Mode banner (subtle reminder) ===
      , simpleMode ? React.createElement('div', {
          style: {position:"fixed",bottom:140,left:14,zIndex:9999,background:"#0A2018",border:"1px solid #2A6040",borderRadius:8,padding:"4px 10px",fontSize:11,color:"#5ADA7A",pointerEvents:"none",opacity:0.7}
        }, "🎯 ", lang==="en"?"Simple":"精简") : null

      // === ONBOARDING — first-time welcome (3 steps) ===
      , showOnboarding ? (function(){
          var steps = lang==="en" ? [
            {emoji:"👋", title:"Welcome!", body:"NYC Driver Tracker helps you record income, expenses, and see exactly how much you really earn — after platform fees, tolls, and all costs.", btn:"Next →"},
            {emoji:"⚡", title:"Quick Add", body:"On the dashboard, tap ⚡ Charge / 🅿️ Park / 🍔 Meal for one-tap expense entry. The amount you used last time will be hinted as a placeholder.", btn:"Next →"},
            {emoji:"📊", title:"Two Big Numbers", body:"📱 Platform Pay = what Uber actually deposits.\n💰 Net Profit = what you really earn after all expenses.\n\nTap either card for the full breakdown.", btn:"Got it!"}
          ] : [
            {emoji:"👋", title:"欢迎！", body:"NYC 司机记账帮你记录收入、支出，看清楚扣除平台抽成、过桥、所有开销之后**真正赚多少**。", btn:"下一步 →"},
            {emoji:"⚡", title:"快速记账", body:"仪表盘上点 ⚡ 充电 / 🅿️ 停车 / 🍔 吃饭 一键记账。占位符显示你**上次输的金额**。", btn:"下一步 →"},
            {emoji:"📊", title:"两个大数字", body:"📱 平台到账 = Uber 实际打到银行的钱\n💰 净收入 = 扣完所有支出真正赚的\n\n点任一卡看完整明细。", btn:"开始用！"}
          ];
          var s = steps[onbStep] || steps[0];
          return React.createElement('div', {style:{position:"fixed",inset:0,background:"rgba(0,4,12,0.96)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",zIndex:20000,display:"flex",alignItems:"center",justifyContent:"center",padding:20,animation:"fadeIn 0.2s"}}
            , React.createElement('div', {style:{background:"linear-gradient(180deg, "+C.bg2+" 0%, "+C.bg+" 100%)",border:"1px solid "+C.border2,borderRadius:RADIUS.xl,maxWidth:400,width:"100%",padding:"36px 28px",textAlign:"center",boxShadow:"0 20px 60px rgba(0,0,0,0.8), 0 0 80px rgba(0,212,255,0.1)",position:"relative",overflow:"hidden",animation:"slideUp 0.3s"}}
              // Top glow

              , React.createElement('div', {style:{fontSize:64,marginBottom:18,filter:"drop-shadow(0 4px 12px rgba(0,212,255,0.4))",position:"relative"}}, s.emoji)
              , React.createElement('div', {style:{fontSize:FS.xxl+2,fontWeight:900,color:C.accent,marginBottom:16,letterSpacing:-0.4,position:"relative"}}, s.title)
              , React.createElement('div', {style:{fontSize:FS.md+2,color:C.text2,lineHeight:1.7,marginBottom:28,whiteSpace:"pre-line",position:"relative"}}, s.body)
              // Progress dots
              , React.createElement('div', {style:{display:"flex",justifyContent:"center",gap:10,marginBottom:24,position:"relative"}}
                , steps.map(function(_,i){
                    return React.createElement('div', {key:i, style:{width:i===onbStep?28:8,height:8,borderRadius:4,background:i===onbStep?C.accent:C.border2,transition:"all 0.3s",boxShadow:i===onbStep?"0 0 12px rgba(0,212,255,0.5)":"none"}});
                  })
              )
              , React.createElement('button', {onClick:function(){
                  if(onbStep < steps.length-1){
                    setOnbStep(onbStep+1);
                  }else{
                    setShowOnboarding(false);
                    setOnbStep(0);
                  }
                }, style:{width:"100%",background:"linear-gradient(135deg,#00CFFF,#0044EE)",border:"none",color:"#fff",fontSize:FS.lg+1,fontWeight:800,padding:"16px",borderRadius:RADIUS.md,cursor:"pointer",boxShadow:"0 4px 20px rgba(0,207,255,0.4), 0 0 30px rgba(0,207,255,0.2)",letterSpacing:0.3,position:"relative",transition:"transform 0.1s"}}, s.btn)
              , onbStep < steps.length-1 ? React.createElement('button', {onClick:function(){setShowOnboarding(false);setOnbStep(0);}, style:{background:"none",border:"none",color:C.text3,fontSize:FS.md,marginTop:16,cursor:"pointer",padding:"8px",fontWeight:500,position:"relative"}}, lang==="en"?"Skip":"跳过") : null
            )
          );
        }()) : null

            // === Toast notifications (extra visible) ===
      , toasts && toasts.length > 0 ? React.createElement('div', {
          style: {position:"fixed",bottom:100,left:0,right:0,zIndex:10000,display:"flex",flexDirection:"column",gap:8,alignItems:"center",pointerEvents:"none",padding:"0 14px"}
        },
        toasts.slice(-4).map(function(t){
          var colors={
            success: {bg:"linear-gradient(135deg,#00C853,#0A4020)",border:"rgba(90,218,122,0.5)",text:"#FFFFFF"},
            error:   {bg:"linear-gradient(135deg,#E53935,#5A0A0A)",border:"rgba(255,112,96,0.5)",text:"#FFFFFF"},
            warn:    {bg:"linear-gradient(135deg,#FF9100,#5A2C00)",border:"rgba(255,179,71,0.5)",text:"#FFFFFF"},
            info:    {bg:"linear-gradient(135deg,#0288D1,#0A2845)",border:"rgba(90,172,255,0.5)",text:"#FFFFFF"}
          };
          var c=colors[t.type]||colors.success;
          return React.createElement('div', {
            key: t.id,
            style: {background:c.bg,border:"1px solid "+c.border,color:c.text,padding:"10px 16px",borderRadius:RADIUS.md,fontSize:FS.md,fontWeight:700,boxShadow:"0 6px 20px rgba(0,0,0,0.6), 0 0 30px rgba(0,0,0,0.3)",minWidth:140,maxWidth:320,textAlign:"center",animation:"toastIn 0.25s ease-out",backdropFilter:"blur(4px)",letterSpacing:0.2}
          }, t.msg);
        })
      ) : null
      // === Undo Banner (5-30s grace period for bulk operations) ===
      , undoBanner ? React.createElement('div', {
          style: {position:"fixed",top:0,left:0,right:0,zIndex:9999,background:"linear-gradient(135deg,#1A6030,#0A2818)",color:"#fff",padding:"12px 16px 14px",display:"flex",alignItems:"center",gap:12,boxShadow:"0 4px 24px rgba(0,0,0,0.5)",borderBottom:"1px solid rgba(90,218,122,0.4)",backdropFilter:"blur(8px)",animation:"slideUp 0.2s"}
        }
        
        , React.createElement('div', {style:{flex:1,fontSize:13,fontWeight:700}}
            , undoBanner.msg
            , React.createElement('span', {style:{marginLeft:10,fontSize:12,fontWeight:500,opacity:0.85}}
              , (function(){
                  var sec = Math.max(0, Math.ceil((undoBanner.until - Date.now())/1000));
                  return "(" + sec + "s)";
                }())
            )
          )
        , React.createElement('button', {
            onClick: function(){
              if(undoBanner.prevEl) setEl(undoBanner.prevEl);
              if(undoBanner.prevWl) setWl(undoBanner.prevWl);
              if(undoBanner.prevSl) setSl(undoBanner.prevSl);
              if(undoBanner.prevDl) setDl(undoBanner.prevDl);
              if(undoBanner.prevLl) setLl(undoBanner.prevLl);
              if(undoBanner.prevFl) setFl(undoBanner.prevFl);
              if(undoBanner.prevReminders) setReminders(undoBanner.prevReminders);
              if(undoBanner.prevCc) setCc(undoBanner.prevCc);
              if(undoBanner.prevNotes) setNotes(undoBanner.prevNotes);
              if(undoBanner.prevCustGroups) setCustGroups(undoBanner.prevCustGroups);
              if(undoBanner.prevSavedVehicles) setSavedVehicles(undoBanner.prevSavedVehicles);
              if(undoBanner.prevFavExpenses) setFavExpenses(undoBanner.prevFavExpenses);
              setUndoBanner(null);
              showToast(lang==="en"?"↩️ Restored":"↩️ 已恢复");
            },
            style: {background:"#fff",border:"none",borderRadius:8,padding:"6px 14px",color:"#1A6030",fontSize:13,fontWeight:800,cursor:"pointer"}
          }, "↩️ " , lang==="en"?"Undo":"撤销")
        , React.createElement('button', {
            onClick: function(){setUndoBanner(null);},
            style: {background:"transparent",border:"1px solid rgba(255,255,255,0.3)",borderRadius:8,padding:"6px 10px",color:"#fff",fontSize:12,cursor:"pointer"}
          }, "✕")
        // Progress bar at bottom (shrinks from 100% to 0% over 30s)
        , React.createElement('div', {
            style: {position:"absolute",bottom:0,left:0,right:0,height:3,background:"rgba(0,0,0,0.25)"}
          }
          , React.createElement('div', {
              style: {
                height:"100%",
                width: (function(){
                  var pct = Math.max(0, Math.min(100, (undoBanner.until - Date.now())/20000*100));
                  return pct.toFixed(1)+"%";
                }()),
                background:"linear-gradient(90deg,#FFD700,#FFA500)",
                transition:"width 1s linear",
                borderRadius:"0 2px 2px 0"
              }
            })
        )
      ) : null
      , React.createElement('div', { style: {background:"rgba(10,14,26,0.92)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",padding:"8px 14px 7px",borderBottom:"1px solid "+C.border,position:"sticky",top:0,zIndex:50}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 242}}
        , React.createElement('div', { style: {display:"flex",alignItems:"center",gap:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 243}}
          , React.createElement('button', { onClick: function(){setShowDrawer(true);}, style: {background:C.bg3,border:"1px solid "+C.border,color:C.text2,fontSize:18,cursor:"pointer",padding:"6px 10px",lineHeight:1,flexShrink:0,borderRadius:RADIUS.sm,transition:"all 0.15s"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 244}}, "☰")
          , React.createElement('div', { style: {flex:1,textAlign:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 245}}
            , veh.brand||veh.plate ? React.createElement('div', { style: {fontSize:FS.md,fontWeight:800,color:C.text,letterSpacing:-0.1}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 246}}, veh.year?veh.year+" ":"", veh.brand?veh.brand+" ":"", veh.model?veh.model+" ":"", veh.plate?React.createElement('span',{style:{color:C.accent,fontWeight:700,marginLeft:2}},"["+veh.plate+"]"):"") : React.createElement('div', { style: {fontSize:FS.md,fontWeight:700,color:C.text3,letterSpacing:0.5}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 246}}, "NYC RIDESHARE TRACKER"  )
            , React.createElement('div', { style: {fontSize:FS.xs,color:C.text3,letterSpacing:0.8,marginTop:1,textTransform:"uppercase",fontWeight:600,opacity:0.55}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 247}}, "Driver Tracker"  )
          )
          , React.createElement('button', { onClick: function(){setLang(lang==="zh"?"en":"zh");}, style: {background:C.bg3,border:"1px solid "+C.border,borderRadius:6,color:C.accent2,fontSize:FS.sm,cursor:"pointer",padding:"4px 8px",fontWeight:700,flexShrink:0,transition:"all 0.15s",letterSpacing:0.3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 249}}, lang==="zh"?"EN":"中")
          , React.createElement('button', { onClick: function(){setSearchOpen(true);}, style: {background:"none",border:"none",color:C.accent2,fontSize:16,cursor:"pointer",padding:"4px 6px",flexShrink:0}, title:lang==="en"?"Search":"搜索"}, "🔍")
          , React.createElement('button', { onClick: function(){setShowRemMgr(true);}, style: {background:"none",border:"none",color:"#CC88FF",fontSize:16,cursor:"pointer",padding:"4px 6px",flexShrink:0}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 250}}, "🔔")
        )
      )
      , expired.length > 0 ? React.createElement(ABox, { color: "#FF1744", bg: "#2A0505", icon: "!", text: expired.length+(lang==="en"?" licenses expired":" 项执照已过期"), __self: this, __source: {fileName: _jsxFileName, lineNumber: 253}} ) : null
      , expiring.length > 0 ? React.createElement(ABox, { color: "#FF6D00", bg: "#2A1500", icon: "!", text: expiring.length+(lang==="en"?" licenses expiring soon":" 项执照60天内到期"), __self: this, __source: {fileName: _jsxFileName, lineNumber: 254}} ) : null
      , insW && insW.diff < 0 ? React.createElement(ABox, { color: C.danger, bg: "#200808", icon: "!", text: (lang==="en"?"Inspection overdue ":"车辆检验已逾期 ")+Math.abs(insW.diff)+(lang==="en"?" days":" 天"), __self: this, __source: {fileName: _jsxFileName, lineNumber: 255}} ) : null
      , insW && insW.diff >= 0 && insW.diff <= 30 ? React.createElement(ABox, { color: "#FFB300", bg: "#1A1400", icon: "!", text: (lang==="en"?"Inspection in ":"车辆检验还剩 ")+insW.diff+(lang==="en"?" days":" 天"), __self: this, __source: {fileName: _jsxFileName, lineNumber: 256}} ) : null
      , (function(){if(!nextExpiry)return null;var d=daysFromToday(nextExpiry.expiryDate);if(d===null||d<=0||d>(+(nextExpiry.reminderDays||60)))return null;return React.createElement(ABox, { color: "#FF9A00", bg: "#1A1000", icon: "📋", text: nextExpiry.type+" "+(lang==="en"?"expires in ":"还剩 ")+d+(lang==="en"?" days":" 天到期"), __self: this, __source: {fileName: _jsxFileName, lineNumber: 257}});})()
      , reminders.filter(function(r){if(!r.date)return false;var d=daysFromToday(r.date);return d!==null&&d>=0&&d<=(+(r.reminderDays||7));}).map(function(r,i){var d=daysFromToday(r.date);return React.createElement(ABox, { key: i, color: "#CC88FF", bg: "#150A20", icon: "🔔", text: r.title+(d===0?(lang==="en"?" · Today":" · 今天"):d===1?(lang==="en"?" · Tomorrow":" · 明天"):(lang==="en"?" · "+d+" days left":" · 还剩"+d+"天")), __self: this, __source: {fileName: _jsxFileName, lineNumber: 258}} );}) 
      , (function(){var lo=el.filter(function(e){return e.odometer&&+e.odometer>0;}).sort(function(a,b){var c=b.date.localeCompare(a.date);return c!==0?c:(+b.odometer)-(+a.odometer);})[0];var co=lo?+lo.odometer:0;if(co<=0)return null;return reminders.filter(function(r){if(r.type!=="mile")return false;if(!r.triggerMile)return false;var rem=(+r.triggerMile)-co;return rem<=(+(r.reminderMile||200));}).map(function(r,i){var rem=(+r.triggerMile)-co;var txt=r.title+(rem<=0?(lang==="en"?" · Overdue by "+Math.abs(rem).toLocaleString()+" mi":" · 已超 "+Math.abs(rem).toLocaleString()+" mi"):(lang==="en"?" · "+rem.toLocaleString()+" mi left":" · 还剩 "+rem.toLocaleString()+" mi"));var col=rem<=0?C.danger:"#FFB300",bg=rem<=0?"#200808":"#1A1400";return React.createElement(ABox, { key: "m"+i, color: col, bg: bg, icon: "🛣", text: txt });});})()
      // Smart preset-based maintenance alerts (independent of manual reminders)
      , (function(){
          var lo=el.filter(function(e){return e.odometer&&+e.odometer>0;}).sort(function(a,b){var c=b.date.localeCompare(a.date);return c!==0?c:(+b.odometer)-(+a.odometer);})[0];
          var co=lo?+lo.odometer:0;
          if(co<=0||!veh.type) return null;
          var presets=veh.type==="electric"?MILE_PRESETS_EV:MILE_PRESETS_GAS;
          // Track which preset keys are already covered by manual reminders (by title contains lbl)
          var manuallyCovered=function(presetLbl){
            return reminders.some(function(r){
              if(r.type!=="mile") return false;
              if(!r.title) return false;
              return r.title.toLowerCase().indexOf(presetLbl.toLowerCase())>=0;
            });
          };
          var alerts=[];
          presets.forEach(function(p,i){
            var lbl = lang==="en" ? p.lbl_en : p.lbl_zh;
            if(manuallyCovered(p.lbl_en)||manuallyCovered(p.lbl_zh)) return;
            // Next milestone: smallest multiple of interval >= currentOdo
            var nextDue = Math.ceil(co / p.interval) * p.interval;
            // If currentOdo is exactly on a milestone (like 5000 with interval 5000), next should be 10000
            if(nextDue === co) nextDue += p.interval;
            var rem = nextDue - co;
            var thresh = Math.min(200, Math.round(p.interval * 0.05));
            if(rem > thresh) return;  // too far away
            var txt = p.icon + " " + lbl + (lang==="en" ? " · "+rem.toLocaleString()+" mi to "+nextDue.toLocaleString() : " · 还剩 "+rem.toLocaleString()+" mi (" + nextDue.toLocaleString() + ")");
            alerts.push(React.createElement(ABox, { key: "preset_"+p.key, color: C.accent2, bg: C.bg3, icon: "🔧", text: txt }));
          });
          return alerts.length ? alerts : null;
        }())
      , React.createElement('div', { style: {padding:"16px 14px",paddingBottom:100,maxWidth:800,margin:"0 auto"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 259}}

        , tab===0 ? (
          React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 262}}
            // === ⚡ QUICK ADD BAR — high-frequency operations (1-tap from dashboard) ===
            , (function(){
                var hasCharging=el.some(function(e){return e.category==="charging"&&e.qty&&+e.qty>0;});
                var hasFuel=el.some(function(e){return e.category==="fuel"&&e.qty&&+e.qty>0;});
                // EV detection: vehicle type is electric, OR history shows only charging,
                // OR hybrid driver who's mostly charging
                var isEv = veh.type === "electric" || (hasCharging && !hasFuel) || (veh.type === "hybrid" && hasCharging);
                var fuelCat=isEv?"charging":"fuel";
                var fuelIcon=isEv?"⚡":"⛽";
                var fuelLabel=lang==="en"?(isEv?"Charge":"Gas"):(isEv?"充电":"加油");
                // Last amount for each category (shown as hint)
                var lastOf=function(cat){var matches=el.filter(function(e){return e.category===cat&&e.amount;}).sort(function(a,b){return (b.date||"").localeCompare(a.date||"");});return matches[0];};
                var lastFuel=lastOf(fuelCat);
                var lastCoffee=lastOf("coffee");
                // Last cash tip: find most recent dl entry with tips > 0
                var lastTip=dl.filter(function(d){return +d.tips>0;}).sort(function(a,b){return (b.date||"").localeCompare(a.date||"");})[0];
                var btnStyle={
                  flex:1,
                  background:"linear-gradient(180deg, "+C.bg3+" 0%, "+C.bg2+" 100%)",
                  border:"1px solid "+C.border,
                  borderRadius:RADIUS.md,
                  padding:"8px 4px",
                  cursor:"pointer",
                  textAlign:"center",
                  boxShadow:SHADOW.sm,
                  transition:"transform 0.1s, box-shadow 0.15s, border-color 0.15s"
                };
                var iconStyle={fontSize:18,marginBottom:2,filter:"drop-shadow(0 1px 2px rgba(0,0,0,0.3))"};
                var labelStyle={fontSize:FS.sm+1,fontWeight:700,color:C.text,letterSpacing:0.1};
                var hintStyle={fontSize:FS.xs,color:C.text3,marginTop:1,fontWeight:500};
                return React.createElement('div', {style:{display:"flex",gap:8,marginBottom:12}}
                  , React.createElement('button', {onClick:function(){setSf("quick_fuel");}, style:btnStyle}
                    , React.createElement('div', {style:iconStyle}, fuelIcon)
                    , React.createElement('div', {style:labelStyle}, fuelLabel)
                    , lastFuel ? (function(){
                        // For charging/fuel: show unit price ($/kWh or $/gal) instead of total
                        if(lastFuel.qty && +lastFuel.qty > 0){
                          var unitP = (+lastFuel.amount / +lastFuel.qty).toFixed(3);
                          var unit = isEv ? "kWh" : (lang==="en"?"gal":"加仑");
                          return React.createElement('div', {style:hintStyle}, "$"+unitP+"/"+unit);
                        }
                        return React.createElement('div', {style:hintStyle}, lang==="en"?"last ":"上次 ", fmt(+lastFuel.amount));
                      }()) : null
                  )
                  , React.createElement('button', {onClick:function(){setSf("quick_coffee");}, style:btnStyle}
                    , React.createElement('div', {style:iconStyle}, "☕")
                    , React.createElement('div', {style:labelStyle}, lang==="en"?"Coffee":"咖啡")
                    , lastCoffee ? React.createElement('div', {style:hintStyle}, lang==="en"?"last ":"上次 ", fmt(+lastCoffee.amount)) : null
                  )
                  , React.createElement('button', {onClick:function(){setSf("quick_tip");}, style:btnStyle}
                    , React.createElement('div', {style:iconStyle}, "💵")
                    , React.createElement('div', {style:labelStyle}, lang==="en"?"Cash Tip":"现金小费")
                    , mCashTips > 0
                      ? React.createElement('div', {style:Object.assign({},hintStyle,{color:C.gold,fontWeight:700})}, lang==="en"?"month ":"本月 ", fmt(mCashTips))
                      : (lastTip ? React.createElement('div', {style:hintStyle}, lang==="en"?"last ":"上次 ", fmt(+lastTip.tips)) : null)
                  )
                );
              }())

            , incGoal&&+incGoal>0 ? React.createElement(Card, { style: {marginBottom:10,padding:"12px 14px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 267}}, React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 267}}, React.createElement('div', { style: {fontSize:13,fontWeight:700,color:C.gold}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 267}}, "🎯 " , lang==="en"?"Monthly Goal":"本月目标"), React.createElement('div', { style: {display:"flex",alignItems:"center",gap:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 267}}, React.createElement('span', { style: {fontSize:13,color:C.text2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 267}}, fmt(tInc), " / "  , fmt(+incGoal)), React.createElement('button', { onClick: function(){setShowGoal(true);}, style: {background:"none",border:"none",color:C.text3,fontSize:12,cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 267}}, "✏️"))), React.createElement('div', { style: {height:8,borderRadius:4,background:"#1A2A40",overflow:"hidden",marginBottom:4}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 267}}, React.createElement('div', { style: {height:8,borderRadius:4,width:Math.min(100,Math.round(tInc/+incGoal*100))+"%",background:tInc>=+incGoal?"linear-gradient(90deg,#00E676,#FFD700)":"linear-gradient(90deg,#00D4FF,#0055FF)"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 267}} )), React.createElement('div', { style: {fontSize:12,color:tInc>=+incGoal?C.success:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 267}}, tInc>=+incGoal?(lang==="en"?"🎉 Goal reached!":"🎉 目标达成！"):(lang==="en"?"Still need: ":"还差: ")+fmt(+incGoal-tInc)+" ("+Math.round(tInc/+incGoal*100)+"%)")) : React.createElement('button', { onClick: function(){setShowGoal(true);}, style: {width:"100%",background:C.bg3,border:"1px dashed #2A4A6A",borderRadius:10,padding:"8px 14px",color:C.text3,fontSize:12,cursor:"pointer",marginBottom:10,textAlign:"left"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 267}}, "🎯 " , lang==="en"?"Set monthly goal...":"设定本月收入目标...")

            , React.createElement(SegBtn, { val: dashV, set: setDashV, opts: [["month",T.thisMonth],["year",T.thisYear]], __self: this, __source: {fileName: _jsxFileName, lineNumber: 263}} )

            // === SMART INSIGHTS CARD: month view → vs last month + vs same month last year; year view → vs last year + IRS mileage deduction ===
            , (function(){
                var hasInsights=false;
                var summarySection=null;
                var yoyMonthSection=null;
                var yoyYearSection=null;
                var mileageDeduction=null;

                if(dashV==="month"){
                  // MONTH VIEW: vs last month
                  if(lmInc>0||lmExp>0){
                    hasInsights=true;
                    var dInc=lmInc>0?Math.round((tInc-lmInc)/lmInc*100):0;
                    var dirSym=dInc>0?"↑":(dInc<0?"↓":"→");
                    var dirCol=dInc>0?C.success:(dInc<0?C.danger:C.text3);
                    // Format last-month label same way as last-year-month label
                    var lmLabel = lastMo.slice(0,4) + (lang==="en"?" "+["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][+lastMo.slice(5,7)-1]:" 年 "+lastMo.slice(5,7)+" 月");
                    summarySection=React.createElement('div',null,
                      React.createElement('div',{style:{fontSize:FS.xs+1,color:C.text3,marginBottom:6,letterSpacing:1.2,textTransform:"uppercase",fontWeight:600}},lang==="en"?"VS LAST MONTH · "+lmLabel:"对比上月 · "+lmLabel),
                      React.createElement('div',{style:{fontSize:FS.md+1,color:C.text,lineHeight:1.6}},
                        lang==="en"
                          ? React.createElement('span',null,"Net ",React.createElement('b',{style:{color:net>=0?C.success:C.danger}},fmt(net))," ",lmInc>0?React.createElement('span',{style:{color:dirCol,fontWeight:600}},dirSym," ",Math.abs(dInc),"%"):null,hourlyRate>0?React.createElement('span',{style:{color:C.text3}},"  ·  ",fmt(hourlyRate),"/hr"):null)
                          : React.createElement('span',null,"净利润 ",React.createElement('b',{style:{color:net>=0?C.success:C.danger}},fmt(net))," ",lmInc>0?React.createElement('span',{style:{color:dirCol,fontWeight:600}},dirSym," ",Math.abs(dInc),"%"):null,hourlyRate>0?React.createElement('span',{style:{color:C.text3}},"  ·  时薪 ",fmt(hourlyRate)):null)
                      )
                    );
                  }
                  // MONTH VIEW: vs same month last year (only if we have last-year data)
                  if(lyMoInc>0||lyMoExp>0){
                    hasInsights=true;
                    var dyInc=lyMoInc>0?Math.round((tInc-lyMoInc)/lyMoInc*100):0;
                    var dyNet=lyMoNet!==0?Math.round((net-lyMoNet)/Math.abs(lyMoNet)*100):0;
                    var dySym=dyNet>0?"↑":(dyNet<0?"↓":"→");
                    var dyCol=dyNet>0?C.success:(dyNet<0?C.danger:C.text3);
                    var lyMoLabel = lyMo.slice(0,4) + (lang==="en"?" "+["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][+lyMo.slice(5,7)-1]:" 年 "+lyMo.slice(5,7)+" 月");
                    yoyMonthSection=React.createElement('div',{style:{paddingTop:summarySection?8:0,marginTop:summarySection?8:0,borderTop:summarySection?"1px solid "+C.border:"none"}},
                      React.createElement('div',{style:{fontSize:FS.xs+1,color:C.text3,marginBottom:6,letterSpacing:1.2,textTransform:"uppercase",fontWeight:600}},lang==="en"?"VS SAME MONTH LAST YEAR · "+lyMoLabel:"对比去年同月 · "+lyMoLabel),
                      React.createElement('div',{style:{fontSize:FS.md+1,color:C.text,lineHeight:1.6}},
                        lang==="en"
                          ? React.createElement('span',null,"Inc ",fmt(tInc)," vs ",fmt(lyMoInc),"  ",lyMoInc>0?React.createElement('span',{style:{color:dyCol,fontWeight:600}},dySym," ",Math.abs(dyNet),"%"):null)
                          : React.createElement('span',null,"收入 ",fmt(tInc)," vs ",fmt(lyMoInc),"  ",lyMoInc>0?React.createElement('span',{style:{color:dyCol,fontWeight:600}},dySym," ",Math.abs(dyNet),"%"):null)
                      )
                    );
                  }
                } else {
                  // YEAR VIEW: vs previous year
                  if(pyInc>0||pyExp>0){
                    hasInsights=true;
                    var dpInc=pyInc>0?Math.round((yInc-pyInc)/pyInc*100):0;
                    var dpNet=pyNet!==0?Math.round((yNet-pyNet)/Math.abs(pyNet)*100):0;
                    var dpSym=dpNet>0?"↑":(dpNet<0?"↓":"→");
                    var dpCol=dpNet>0?C.success:(dpNet<0?C.danger:C.text3);
                    yoyYearSection=React.createElement('div',null,
                      React.createElement('div',{style:{fontSize:FS.xs+1,color:C.text3,marginBottom:6,letterSpacing:1.2,textTransform:"uppercase",fontWeight:600}},lang==="en"?"VS LAST YEAR · "+prevYr:"对比上一年 · "+prevYr+" 年"),
                      React.createElement('div',{style:{fontSize:FS.md+1,color:C.text,lineHeight:1.6}},
                        lang==="en"
                          ? React.createElement('span',null,"Net ",React.createElement('b',{style:{color:yNet>=0?C.success:C.danger}},fmt(yNet))," ",pyNet!==0?React.createElement('span',{style:{color:dpCol,fontWeight:600}},dpSym," ",Math.abs(dpNet),"%"):null,React.createElement('span',{style:{color:C.text3}},"  ·  ",lang==="en"?"prev: ":"上年: ",fmt(pyNet)))
                          : React.createElement('span',null,"净利润 ",React.createElement('b',{style:{color:yNet>=0?C.success:C.danger}},fmt(yNet))," ",pyNet!==0?React.createElement('span',{style:{color:dpCol,fontWeight:600}},dpSym," ",Math.abs(dpNet),"%"):null,React.createElement('span',{style:{color:C.text3}},"  ·  上年: ",fmt(pyNet)))
                      )
                    );
                  }
                  // YEAR VIEW: IRS mileage deduction
                  if(yMiles>0){
                    hasInsights=true;
                    var deduction=Math.round(yMiles*(+mileageRate)*100)/100;
                    mileageDeduction=React.createElement('div',{style:{paddingTop:yoyYearSection?10:0,marginTop:yoyYearSection?10:0,borderTop:yoyYearSection?"1px solid "+C.border:"none"}},
                      React.createElement('div',{style:{fontSize:FS.xs+1,color:C.text3,marginBottom:6,letterSpacing:1.2,textTransform:"uppercase",fontWeight:600}},lang==="en"?"IRS MILEAGE DEDUCTION · "+yr:"里程抵税 · "+yr+"年"),
                      React.createElement('div',{style:{display:"flex",justifyContent:"space-between",alignItems:"baseline"}},
                        React.createElement('div',{style:{fontSize:13,color:C.text2}},
                          React.createElement('b',{style:{color:C.gold,fontSize:18}},"$"+deduction.toLocaleString()),
                          React.createElement('span',{style:{fontSize:12,color:C.text3,marginLeft:6}},yMiles.toLocaleString()+(lang==="en"?" mi × $":" mi × $")+(+mileageRate).toFixed(2))
                        ),
                        React.createElement('div',{style:{fontSize:11,color:C.text3,fontStyle:"italic"}},lang==="en"?"Est. — confirm w/ accountant":"参考 · 请询会计师")
                      )
                    );
                  }
                }

                if(!hasInsights)return null;
                // Backup reminder: if user is on Drive and hasn't synced in 7+ days, show gentle hint
                var backupReminder=null;
                try{
                  var lastBak=+localStorage.getItem("nyc_lastBackup")||0;
                  var daysSince=lastBak?(Date.now()-lastBak)/86400000:null;
                  if(gUser&&(daysSince===null||daysSince>=7)){
                    var msgTxt=daysSince===null
                      ? (lang==="en"?"☁ Not backed up yet — tap menu → Backup":"☁ 还未备份过 · 点菜单 → 备份")
                      : (lang==="en"?"☁ Last backup "+Math.round(daysSince)+" days ago":"☁ 已 "+Math.round(daysSince)+" 天未备份");
                    backupReminder=React.createElement('div',{style:{marginTop:10,paddingTop:10,borderTop:"1px solid "+C.border,fontSize:12,color:"#FFB347",display:"flex",alignItems:"center",gap:6}},
                      msgTxt
                    );
                  }
                }catch(e){}
                // === Anomaly detection (month view only) ===
                var anomalyAlerts = null;
                if(dashV==="month"){
                  try{
                    // Compare current month's per-category spending against last 3 months average
                    var anom = [];
                    var cmpMonths = [];
                    for(var ai=1; ai<=3; ai++){
                      var pm = mo;
                      for(var aj=0; aj<ai; aj++) pm = prevMo(pm);
                      cmpMonths.push(pm);
                    }
                    // Get per-category total for cur month and avg of last 3
                    var curByCat = {}, prevByCat = {};
                    feAll.forEach(function(e){
                      if(e.category==="platform") return;
                      curByCat[e.category] = (curByCat[e.category]||0) + (+e.amount||0);
                    });
                    cmpMonths.forEach(function(pm){
                      el.filter(function(e){
                        var c=allC[e.category];
                        if(c&&c.mo) return (e.statementMonth||e.date.slice(0,7))===pm;
                        return e.date.slice(0,7)===pm;
                      }).forEach(function(e){
                        if(e.category==="platform") return;
                        if(!prevByCat[e.category]) prevByCat[e.category]={tot:0,count:0};
                        prevByCat[e.category].tot += (+e.amount||0);
                      });
                    });
                    // Detect: current >150% of 3-month avg AND total $> $30
                    Object.keys(curByCat).forEach(function(cat){
                      var prevTotal = prevByCat[cat] ? prevByCat[cat].tot/3 : 0;
                      var curTotal = curByCat[cat];
                      if(prevTotal > 0 && curTotal >= 30 && curTotal >= prevTotal * 1.5){
                        var pctUp = Math.round((curTotal-prevTotal)/prevTotal*100);
                        var c = allC[cat];
                        anom.push({icon:c?c.icon:"⚠️", label:c?c.label:cat, cur:curTotal, prev:prevTotal, pct:pctUp});
                      }
                    });
                    if(anom.length > 0){
                      // Sort by pct descending, top 3
                      anom.sort(function(a,b){return b.pct-a.pct;});
                      anom = anom.slice(0,3);
                      anomalyAlerts = React.createElement('div',{style:{marginTop:10,paddingTop:10,borderTop:"1px solid "+C.border}},
                        React.createElement('div',{style:{fontSize:11,color:"#FFB347",marginBottom:6,letterSpacing:0.3}}, "⚠️ ", lang==="en"?"UNUSUAL SPENDING":"支出异常"),
                        anom.map(function(a,i){
                          return React.createElement('div',{key:i,style:{fontSize:12,color:"#FFD7A8",lineHeight:1.5,marginBottom:2}},
                            a.icon, " ", a.label, ": ",
                            React.createElement('b',{style:{color:"#FF8855"}}, fmt(a.cur)),
                            React.createElement('span',{style:{color:C.text3,marginLeft:6,fontSize:11}}, lang==="en"?"avg "+fmt(a.prev)+" · ":"均"+fmt(a.prev)+" · "),
                            React.createElement('span',{style:{color:C.danger,fontWeight:700,fontSize:11}}, "↑", a.pct, "%")
                          );
                        })
                      );
                    }
                  }catch(e){}
                }
                // === Trend prediction (month view, only show after day 5 of month) ===
                var prediction = null;
                if(dashV==="month" && tInc>0){
                  try{
                    var todayStr = today();
                    var curMo = todayStr.slice(0,7);
                    if(mo === curMo){
                      // Only predict for current month, not historical
                      var dayOfMo = +todayStr.slice(8,10);
                      var daysInMo = new Date(+mo.slice(0,4), +mo.slice(5,7), 0).getDate();
                      if(dayOfMo >= 5 && dayOfMo < daysInMo){
                        // Simple linear extrapolation: tInc / dayOfMo * daysInMo
                        var projInc = Math.round(tInc / dayOfMo * daysInMo);
                        var projNet = Math.round(net / dayOfMo * daysInMo);
                        prediction = React.createElement('div',{style:{marginTop:10,paddingTop:10,borderTop:"1px solid "+C.border}},
                          React.createElement('div',{style:{fontSize:11,color:"#90C8DC",marginBottom:6,letterSpacing:0.3}}, "🔮 ", lang==="en"?"MONTH-END PROJECTION":"月底预测"),
                          React.createElement('div',{style:{fontSize:FS.md+1,color:C.text,lineHeight:1.6}},
                            lang==="en"
                              ? React.createElement('span',null,"Based on "+dayOfMo+" days, projected: ",React.createElement('b',{style:{color:C.accent2}},fmt(projInc))," income · ",React.createElement('b',{style:{color:projNet>=0?C.success:C.danger}},fmt(projNet))," net")
                              : React.createElement('span',null,"按目前 "+dayOfMo+" 天进度，月底预计: ",React.createElement('b',{style:{color:C.accent2}},fmt(projInc))," 收入 · ",React.createElement('b',{style:{color:projNet>=0?C.success:C.danger}},fmt(projNet))," 净利润")
                          )
                        );
                      }
                    }
                  }catch(e){}
                }
                if(anomalyAlerts || prediction) hasInsights = true;
                return React.createElement(Card,{style:{marginBottom:12,padding:"14px 16px",background:"linear-gradient(180deg, rgba(15,30,55,0.7) 0%, rgba(10,24,40,0.95) 100%)",border:"1px solid "+C.border,boxShadow:SHADOW.md}},
                  React.createElement('div',{style:{fontSize:FS.md,fontWeight:700,color:C.accent,marginBottom:10,letterSpacing:0.5,textTransform:"uppercase"}},"💡 ",lang==="en"?"Smart Insights":"智能洞察"),
                  // Revenue breakdown (month view, only if platform fee recorded)
                  // Revenue breakdown moved to dashboard's big number cards (with expand)
                  summarySection,
                  yoyMonthSection,
                  yoyYearSection,
                  mileageDeduction,
                  prediction,
                  anomalyAlerts,
                  backupReminder
                );
              }())
            , dashV==="month" ? (
              React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 265}}
                , React.createElement(MoNav, { val: mo, set: setMo, lang: lang, onPick: function(){setMpState({value:mo,onChange:function(v){setMo(v);}});}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 266}} )
                , (function(){
                    // === Two-column big number card: Platform Pay + Net Profit ===
                    // Per Uber's monthly PDF math:
                    //   Gross Payment (lhs of "Net Payout" page) = grossFare + tips + bonus = $4,725.34
                    //   This figure does NOT include toll reimbursement separately.
                    //   Net Payout (bank deposit) = Gross Payment − Platform Fees = $2,895.76
                    //
                    // Therefore:
                    //   tInc = grossFare + tips + bonus + other   (== Gross Payment)
                    //   平台到账 (Platform Pay) = tInc − tPlatformFee  (Uber 实际打到银行的钱)
                    //   实收 (Real Earnings) = Platform Pay − tToll  (扣掉司机付给收费站的过桥钱)
                    //   净收入 (Net Profit) = tInc − tExp − tPlatformFee   (toll 是 pass-through, 不影响 net)
                    var platformPay = tInc - tPlatformFee;
                    var realEarnings = platformPay - tToll;
                    var bigNumKey = "dash_bignum_"+mo;
                    // Two independent expansions: bigPlat (left card), bigNet (right card)
                    var bigPlat = collOpen.bigPlat === true;
                    var bigNet = collOpen.bigNet === true;
                    return React.createElement('div', {style:{marginBottom:14}},
                      // Two big number cards side-by-side — Tesla-inspired hero cards
                      React.createElement('div', {style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:(bigPlat||bigNet)?10:0}},
                        // Platform Pay card
                        React.createElement('div', {
                          onClick:function(){toggleColl("bigPlat");},
                          style:{
                            position:"relative",
                            background:"linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(10,30,55,0.95) 60%, rgba(15,20,32,1) 100%)",
                            borderRadius:RADIUS.lg,
                            padding:"16px 14px",
                            cursor:"pointer",
                            border:"1px solid rgba(0,212,255,0.2)",
                            boxShadow: "0 4px 16px rgba(0,212,255,0.08)",
                            overflow:"hidden",
                            transition:"transform 0.15s, box-shadow 0.15s"
                          }
                        },

                          React.createElement('div', {style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8,position:"relative"}},
                            React.createElement('div', {style:{fontSize:FS.sm,color:C.accent2,letterSpacing:0.5,fontWeight:600,textTransform:"uppercase"}}, "📱 ", lang==="en"?"Platform Pay":"平台到账"),
                            React.createElement('span', {style:{fontSize:FS.xs,color:C.text3}}, bigPlat?"▲":"▼")
                          ),
                          React.createElement('div', {style:{fontSize:FS.xl,fontWeight:700,color:C.accent2,letterSpacing:-0.5,lineHeight:1.1,fontVariantNumeric:"tabular-nums",position:"relative"}}, fmt(platformPay)),
                          tToll>0 ? React.createElement('div', {style:{fontSize:FS.xs,color:C.text3,marginTop:6,position:"relative"}}, "−", lang==="en"?"toll ":"过桥 ", fmt(tToll)) : null,
                          tToll>0 ? React.createElement('div', {style:{fontSize:FS.sm,color:C.success,fontWeight:700,marginTop:2,position:"relative"}}, lang==="en"?"net ":"实收 ", fmt(realEarnings)) : null
                        ),
                        // Net Profit card
                        React.createElement('div', {
                          onClick:function(){toggleColl("bigNet");},
                          style:{
                            position:"relative",
                            background: net>=0 ?
                              "linear-gradient(135deg, rgba(0,230,118,0.08) 0%, rgba(10,40,25,0.95) 60%, rgba(15,20,32,1) 100%)" :
                              "linear-gradient(135deg, rgba(255,82,82,0.08) 0%, rgba(40,15,15,0.95) 60%, rgba(15,20,32,1) 100%)",
                            borderRadius:RADIUS.lg,
                            padding:"16px 14px",
                            cursor:"pointer",
                            border: net>=0 ? "1px solid rgba(0,230,118,0.2)" : "1px solid rgba(255,82,82,0.25)",
                            boxShadow: net>=0 ?
                              "0 4px 16px rgba(0,230,118,0.08)" :
                              "0 4px 16px rgba(255,82,82,0.1)",
                            overflow:"hidden",
                            transition:"transform 0.15s, box-shadow 0.15s"
                          }
                        },

                          React.createElement('div', {style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8,position:"relative"}},
                            React.createElement('div', {style:{fontSize:FS.sm,color:net>=0?C.success:C.danger,letterSpacing:0.5,fontWeight:600,textTransform:"uppercase",opacity:0.85}}, "💰 ", lang==="en"?"Net Profit":"净收入"),
                            React.createElement('span', {style:{fontSize:FS.xs,color:C.text3}}, bigNet?"▲":"▼")
                          ),
                          (function(){var nc=net>=0?C.success:C.danger;return React.createElement('div', {style:{fontSize:FS.xl,fontWeight:700,color:nc,letterSpacing:-0.5,lineHeight:1.1,fontVariantNumeric:"tabular-nums",position:"relative"}}, fmt(net));}()),
                          React.createElement('div', {style:{fontSize:FS.xs,color:C.text3,marginTop:8,position:"relative"}}, lang==="en"?"after all expenses":"扣除所有开销")
                        )
                      ),
                      // === Left card expansion: PLATFORM-only breakdown ===
                      // Shows how Gross Payment becomes Platform Pay (and Real Earnings after toll)
                      bigPlat ? React.createElement(Card, {style:{padding:"12px 14px",background:C.bg3,border:"1px solid "+C.border}},
                        React.createElement('div', {style:{fontSize:11,color:C.accent2,marginBottom:8,letterSpacing:0.3,fontWeight:600}}, "📱 ", lang==="en"?"PLATFORM BREAKDOWN":"平台明细"),
                        React.createElement('div', {style:{display:"flex",flexDirection:"column",gap:5,fontSize:13,lineHeight:1.5}},
                          // Layer 1: Gross Payment + sub-items
                          React.createElement('div', {style:{display:"flex",justifyContent:"space-between"}},
                            React.createElement('span', {style:{color:C.text2,fontWeight:600}}, lang==="en"?"Gross Payment":"总营业额"),
                            React.createElement('b', {style:{color:C.accent2}}, fmt(tInc))
                          ),
                          tGross>0 ? React.createElement('div', {style:{display:"flex",justifyContent:"space-between",fontSize:12,color:C.text3,paddingLeft:18}},
                            React.createElement('span', null, lang==="en"?"Trip earnings":"车费"),
                            React.createElement('span', null, fmt(tGross))
                          ) : null,
                          tTips>0 ? React.createElement('div', {style:{display:"flex",justifyContent:"space-between",fontSize:12,color:C.text3,paddingLeft:18}},
                            React.createElement('span', null, lang==="en"?"Tips":"小费"),
                            React.createElement('span', null, fmt(tTips))
                          ) : null,
                          tBonus>0 ? React.createElement('div', {style:{display:"flex",justifyContent:"space-between",fontSize:12,color:C.text3,paddingLeft:18}},
                            React.createElement('span', null, lang==="en"?"Bonus":"奖励"),
                            React.createElement('span', null, fmt(tBonus))
                          ) : null,
                          // − Platform fee
                          tPlatformFee>0 ? React.createElement('div', {style:{display:"flex",justifyContent:"space-between",paddingTop:5,borderTop:"1px dashed #1F3A5A"}},
                            React.createElement('span', {style:{color:C.text3}}, "− ", lang==="en"?"Platform fee":"平台抽成"),
                            React.createElement('span', {style:{color:C.danger}}, "−", fmt(tPlatformFee))
                          ) : null,
                          // = Platform Pay
                          React.createElement('div', {style:{display:"flex",justifyContent:"space-between",paddingTop:5,borderTop:"1px solid "+C.border,marginTop:3}},
                            React.createElement('span', {style:{color:C.text,fontWeight:700}}, "📱 ", lang==="en"?"Platform Pay (bank)":"平台到账（银行入账）"),
                            React.createElement('b', {style:{color:C.accent2,fontSize:14}}, fmt(platformPay))
                          ),
                          // − Toll paid out & = Real Earnings (only if toll > 0)
                          tToll>0 ? React.createElement('div', {style:{display:"flex",justifyContent:"space-between"}},
                            React.createElement('span', {style:{color:C.text3}}, "− ", lang==="en"?"Toll paid (booth)":"过桥支出"),
                            React.createElement('span', {style:{color:C.danger}}, "−", fmt(tToll))
                          ) : null,
                          tToll>0 ? React.createElement('div', {style:{display:"flex",justifyContent:"space-between",paddingTop:5,borderTop:"1px dashed #1F3A5A"}},
                            React.createElement('span', {style:{color:C.text2,fontWeight:600}}, lang==="en"?"Real Earnings":"实收"),
                            React.createElement('b', {style:{color:C.gold}}, fmt(realEarnings))
                          ) : null
                        )
                      ) : null,
                      // === Right card expansion: NET PROFIT breakdown ===
                      // Starts from Platform Pay → subtract all other expenses → net
                      bigNet ? React.createElement(Card, {style:{padding:"12px 14px",background:C.bg3,border:"1px solid "+C.border}},
                        React.createElement('div', {style:{fontSize:11,color:net>=0?C.success:C.danger,marginBottom:8,letterSpacing:0.3,fontWeight:600}}, "💰 ", lang==="en"?"NET PROFIT BREAKDOWN":"净收入明细"),
                        React.createElement('div', {style:{display:"flex",flexDirection:"column",gap:5,fontSize:13,lineHeight:1.5}},
                          // Start: Platform Pay
                          React.createElement('div', {style:{display:"flex",justifyContent:"space-between"}},
                            React.createElement('span', {style:{color:C.text2,fontWeight:600}}, "📱 ", lang==="en"?"Platform Pay":"平台到账"),
                            React.createElement('b', {style:{color:C.accent2}}, fmt(platformPay))
                          ),
                          // − Toll paid (the "real" cost since Uber's deposit included it)
                          tToll>0 ? React.createElement('div', {style:{display:"flex",justifyContent:"space-between"}},
                            React.createElement('span', {style:{color:C.text3}}, "− ", lang==="en"?"Toll paid (booth)":"过桥支出"),
                            React.createElement('span', {style:{color:C.danger}}, "−", fmt(tToll))
                          ) : null,
                          // − Other expenses (vehicle, license, other — excluding platform refOnly)
                          tExp>0 ? React.createElement('div', {style:{display:"flex",justifyContent:"space-between"}},
                            React.createElement('span', {style:{color:C.text3}}, "− ", lang==="en"?"Other expenses":"其他支出"),
                            React.createElement('span', {style:{color:C.danger}}, "−", fmt(tExp))
                          ) : null,
                          // Breakdown of "other expenses" by category group (small dim text)
                          (function(){
                            if(tExp<=0) return null;
                            var grps={"车辆":0,"牌照":0,"其他":0};
                            feAll.forEach(function(e){
                              if(e.category==="platform") return;  // refOnly excluded
                              var cat=allC[e.category];
                              var g=cat?(cat.g||"其他"):"其他";
                              if(grps[g]===undefined) g="其他";
                              grps[g]+=(+e.amount||0);
                            });
                            var lbls=lang==="en"?{"车辆":"Vehicle","牌照":"License","其他":"Other"}:{"车辆":"车辆","牌照":"牌照","其他":"其他"};
                            return Object.entries(grps).filter(function(kv){return kv[1]>0;}).map(function(kv){
                              return React.createElement('div', {key:kv[0], style:{display:"flex",justifyContent:"space-between",fontSize:12,color:C.text3,paddingLeft:18}},
                                React.createElement('span', null, lbls[kv[0]]),
                                React.createElement('span', null, fmt(kv[1]))
                              );
                            });
                          })(),
                          // = Net Profit
                          React.createElement('div', {style:{display:"flex",justifyContent:"space-between",paddingTop:5,borderTop:"1px solid "+C.border,marginTop:3}},
                            React.createElement('span', {style:{color:C.text,fontWeight:700}}, "💰 ", lang==="en"?"Net Profit":"净收入"),
                            React.createElement('b', {style:{color:net>=0?C.success:C.danger,fontSize:14}}, fmt(net))
                          )
                        )
                      ) : null
                    );
                  }())
                , tInc > 0 ? React.createElement('div', {style:{marginBottom:14}}
                  , React.createElement('div', {style:{fontSize:FS.xs+1,color:C.text3,marginBottom:6,letterSpacing:1.2,fontWeight:600,textTransform:"uppercase"}}, "💵 ", lang==="en"?"Income Sources":"收入来源")
                  , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6,marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 277}}, React.createElement(Stat, { sm: true, label: lang==="en"?"Gross":"总车费", value: fmt(tGross), color: C.accent, __self: this, __source: {fileName: _jsxFileName, lineNumber: 277}} ), React.createElement(Stat, { sm: true, label: T.tips, value: fmt(tTips), color: C.success, __self: this, __source: {fileName: _jsxFileName, lineNumber: 277}} ), React.createElement(Stat, { sm: true, label: T.bonus, value: fmt(tBonus), color: C.gold, __self: this, __source: {fileName: _jsxFileName, lineNumber: 277}} ), React.createElement(Stat, { sm: true, label: T.toll, value: fmt(tToll), color: C.accent2, __self: this, __source: {fileName: _jsxFileName, lineNumber: 277}} ))
                  , React.createElement('div', {style:{fontSize:FS.xs+1,color:C.text3,marginTop:0,marginBottom:6,letterSpacing:1.2,fontWeight:600,textTransform:"uppercase"}}, "🚗 ", lang==="en"?"Operations":"运营数据")
                , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}
                  , (function(){var vt=tTrips?String(tTrips):"—",vh=tHours?String(tHours):"—",vo=tOnl?String(tOnl):"—",vm=tMiles?String(tMiles):"—";return React.createElement('div', { style: {display:"contents"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 283}}, React.createElement(Stat, { sm: true, label: T.trips, value: vt, __self: this, __source: {fileName: _jsxFileName, lineNumber: 283}} ), React.createElement(Stat, { sm: true, label: lang==="en"?"Drive h":"行驶h", value: vh, __self: this, __source: {fileName: _jsxFileName, lineNumber: 283}} ), React.createElement(Stat, { sm: true, label: lang==="en"?"Online h":"在线h", value: vo, __self: this, __source: {fileName: _jsxFileName, lineNumber: 283}} ), React.createElement(Stat, { sm: true, label: T.miles, value: vm, __self: this, __source: {fileName: _jsxFileName, lineNumber: 283}} ));}())
                )
                ) : null
                , (function(){
                    if(dashV !== "year") return null;
                    var hm=mData.filter(function(m){return m.inc>0;});if(hm.length<2)return null;var mx=Math.max.apply(null,hm.map(function(m){return m.inc;}));return React.createElement(Card, { style: {marginBottom:8,padding:"12px 14px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 268}}, React.createElement('div', { style: {fontSize:13,fontWeight:700,color:C.text2,marginBottom:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 268}}, "📊 " , lang==="en"?("Income Trend · "+yr):("收入趋势 · "+yr+"年")), React.createElement('div', { style: {display:"flex",alignItems:"center",gap:3,height:60}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 268}}, mData.map(function(m,i){if(!m.inc)return React.createElement('div', { key: i, style: {flex:1}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 268}} );var h=Math.round(8+m.inc/mx*48);var isCur=m.m===mo;return React.createElement('div', { key: i, onClick: function(){setMo(m.m);setDashV("month");}, style: {flex:1,cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 268}}, React.createElement('div', { style: {width:"100%",height:h,borderRadius:"4px 4px 1px 1px",background:isCur?"linear-gradient(180deg, #00D4FF, #0066AA)":m.net>=0?"linear-gradient(180deg, #00E676, #0A8050)":"linear-gradient(180deg, #FF7060, #C03030)",opacity:isCur?1:0.75,boxShadow:isCur?"0 0 12px rgba(0,212,255,0.4)":"none",transition:"opacity 0.2s"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 268}} ));}), " " ), React.createElement('div', { style: {display:"flex",fontSize:11,color:C.text3,marginTop:3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 268}}, mData.map(function(m,i){return React.createElement('div', { key: i, style: {flex:1,textAlign:"center",color:m.m===mo?C.accent:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 268}}, m.label.slice(0,3));})));
                  }())
                // === Month view: This-month-by-week bar chart ===
                , (function(){
                    if(dashV !== "month") return null;
                    // Compute weekly buckets for this month (group by ISO week start)
                    var weeks = {};
                    // Sources: monthly stmts (sl), daily entries (dl rideshare), weekly stmts (wl)
                    // We use sl + dl mostly. For sl we have no date, so put it on the 1st of month.
                    var moDays = mDailies.filter(function(d){return d.mode==="rideshare";});
                    moDays.forEach(function(d){
                      var wk = wkMon(d.date);
                      var inc = (+d.grossFare||0) + (+d.tips||0) + (+d.bonus||0);
                      if(!weeks[wk]) weeks[wk] = 0;
                      weeks[wk] += inc;
                    });
                    // Add monthly stmt total to first week of the month if no daily data
                    if(Object.keys(weeks).length === 0 && tInc > 0){
                      var firstDay = mo + "-01";
                      weeks[wkMon(firstDay)] = tInc;
                    }
                    var weekKeys = Object.keys(weeks).sort();
                    if(weekKeys.length < 2) return null; // Only show if 2+ weeks have data
                    var maxWk = Math.max.apply(null, weekKeys.map(function(k){return weeks[k];}));
                    return React.createElement(Card, {style:{marginBottom:8,padding:"12px 14px"}}
                      , React.createElement('div', {style:{fontSize:13,fontWeight:700,color:C.text2,marginBottom:8}}, "📊 ", lang==="en"?"This Month by Week":"本月按周")
                      , React.createElement('div', {style:{display:"flex",alignItems:"flex-end",gap:6,height:80}}
                        , weekKeys.map(function(wk, i){
                            var v = weeks[wk];
                            var h = Math.round(8 + v/maxWk*64);
                            return React.createElement('div', {key:wk, style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}
                              , React.createElement('div', {style:{fontSize:10,color:C.text3,fontWeight:600}}, "$"+Math.round(v))
                              , React.createElement('div', {style:{width:"100%",height:h,background:"linear-gradient(180deg,#00D4FF,#0088CC)",borderRadius:"4px 4px 0 0"}})
                            );
                          })
                      )
                      , React.createElement('div', {style:{display:"flex",fontSize:10,color:C.text3,marginTop:4,gap:6}}
                        , weekKeys.map(function(wk,i){
                            return React.createElement('div', {key:wk, style:{flex:1,textAlign:"center"}}, lang==="en"?"W":"周", i+1, " · ", wk.slice(5));
                          })
                      )
                    );
                  }())
                // === Month view: This-month by-platform comparison ===
                , (function(){
                    if(dashV !== "month") return null;
                    // Aggregate revenue by platform from sl + dl
                    var byPlat = {};
                    mStmts.forEach(function(x){
                      var p = x.platform || "Other";
                      if(!byPlat[p]) byPlat[p] = 0;
                      byPlat[p] += (+x.grossFare||0) + (+x.tips||0) + (+x.bonus||0) + (+x.otherIncome||0);
                    });
                    mDailies.filter(function(d){return d.mode==="rideshare";}).forEach(function(d){
                      var p = d.platform || "Uber";
                      if(!byPlat[p]) byPlat[p] = 0;
                      byPlat[p] += (+d.grossFare||0) + (+d.tips||0) + (+d.bonus||0);
                    });
                    var platKeys = Object.keys(byPlat).filter(function(p){return byPlat[p] > 0;}).sort(function(a,b){return byPlat[b]-byPlat[a];});
                    if(platKeys.length < 2) return null; // Only show if 2+ platforms
                    var maxPlat = Math.max.apply(null, platKeys.map(function(p){return byPlat[p];}));
                    var totalPlat = platKeys.reduce(function(s,p){return s+byPlat[p];},0);
                    var platColors = {"Uber":"#FFFFFF","Lyft":"#FF00BF","Curb":"#00C853","Via":C.accent2};
                    return React.createElement(Card, {style:{marginBottom:8,padding:"12px 14px"}}
                      , React.createElement('div', {style:{fontSize:13,fontWeight:700,color:C.text2,marginBottom:10}}, "📱 ", lang==="en"?"This Month by Platform":"本月分平台")
                      , platKeys.map(function(p){
                          var v = byPlat[p];
                          var pct = Math.round(v/totalPlat*100);
                          var bw = Math.max(5, Math.round(v/maxPlat*100)) + "%";
                          var color = platColors[p] || "#8ABCD0";
                          return React.createElement('div', {key:p, style:{marginBottom:8}}
                            , React.createElement('div', {style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}
                              , React.createElement('span', {style:{fontSize:13,color:C.text,fontWeight:600}}, p)
                              , React.createElement('div', {style:{display:"flex",alignItems:"center",gap:6}}
                                , React.createElement('span', {style:{fontSize:14,fontWeight:700,color:color}}, fmt(v))
                                , React.createElement('span', {style:{fontSize:11,color:C.text3}}, pct, "%")
                              )
                            )
                            , React.createElement('div', {style:{height:6,borderRadius:3,background:C.border}}
                              , React.createElement('div', {style:{height:6,borderRadius:3,width:bw,background:color,opacity:0.85}})
                            )
                          );
                        })
                    );
                  }())
                // (Removed: "Recent Bank Payout Card" — replaced by the new dual big-number card "📱 平台到账")

                // === #11: Multi-line trend chart (income/expense/net) — year view only ===
                , (function(){
                    if(dashV !== "year") return null;
                    var hm=mData.filter(function(m){return m.inc>0||m.exp>0;});
                    if(hm.length<2) return null;
                    // Find max across income, expense, |net|
                    var allVals=[];
                    mData.forEach(function(m){if(m.inc)allVals.push(m.inc); if(m.exp)allVals.push(m.exp); if(m.net)allVals.push(Math.abs(m.net));});
                    var mx=Math.max.apply(null,allVals);
                    if(mx<=0) return null;
                    var W=300, H=80, padY=8, padX=10;
                    var n=mData.length;
                    var sx=function(i){return padX+(i/(n-1))*(W-2*padX);};
                    var sy=function(v){return padY+(1-v/mx)*(H-2*padY);};
                    var sym=function(v){return padY+(0.5-v/mx*0.5)*(H-2*padY);};  // for net (around 0 baseline)
                    // Build paths
                    var incPath="", expPath="", netPath="";
                    var incPoints=[], expPoints=[], netPoints=[];
                    mData.forEach(function(m,i){
                      var x=sx(i);
                      incPoints.push({x:x,y:sy(m.inc),v:m.inc});
                      expPoints.push({x:x,y:sy(m.exp),v:m.exp});
                      netPoints.push({x:x,y:sy(Math.max(0,m.net)),v:m.net});
                    });
                    incPath=incPoints.map(function(p,i){return (i===0?"M":"L")+p.x.toFixed(1)+","+p.y.toFixed(1);}).join(" ");
                    expPath=expPoints.map(function(p,i){return (i===0?"M":"L")+p.x.toFixed(1)+","+p.y.toFixed(1);}).join(" ");
                    netPath=netPoints.map(function(p,i){return (i===0?"M":"L")+p.x.toFixed(1)+","+p.y.toFixed(1);}).join(" ");
                    return React.createElement(Card, {style:{marginBottom:8,padding:"12px 14px"}}
                      , React.createElement('div', {style:{fontSize:13,fontWeight:700,color:C.text2,marginBottom:8}}, "📈 " , lang==="en"?("Trends · "+yr):("月度趋势 · "+yr+"年"))
                      , React.createElement('div', {style:{display:"flex",gap:12,fontSize:11,marginBottom:6,color:C.text3}}
                        , React.createElement('span', null, React.createElement('span',{style:{display:"inline-block",width:8,height:2,background:C.accent,verticalAlign:"middle",marginRight:4}}), lang==="en"?"Income":"收入")
                        , React.createElement('span', null, React.createElement('span',{style:{display:"inline-block",width:8,height:2,background:C.danger,verticalAlign:"middle",marginRight:4}}), lang==="en"?"Expense":"支出")
                        , React.createElement('span', null, React.createElement('span',{style:{display:"inline-block",width:8,height:2,background:C.success,verticalAlign:"middle",marginRight:4}}), lang==="en"?"Net":"净利润")
                      )
                      , React.createElement('svg', {viewBox:"0 0 "+W+" "+H,width:"100%",height:H,preserveAspectRatio:"none"}
                        , React.createElement('path', {d:incPath,stroke:C.accent,strokeWidth:2,fill:"none",strokeLinejoin:"round"})
                        , React.createElement('path', {d:expPath,stroke:C.danger,strokeWidth:2,fill:"none",strokeLinejoin:"round"})
                        , React.createElement('path', {d:netPath,stroke:C.success,strokeWidth:2,fill:"none",strokeLinejoin:"round",strokeDasharray:"4,2"})
                        // Highlight current month
                        , (function(){var i=mData.findIndex(function(m){return m.m===mo;}); if(i<0||!incPoints[i]) return null; return React.createElement('circle', {cx:incPoints[i].x,cy:incPoints[i].y,r:3,fill:C.accent,stroke:C.bg2,strokeWidth:1});}())
                      )
                      , React.createElement('div', {style:{display:"flex",fontSize:10,color:C.text3,marginTop:4}}
                        , mData.map(function(m,i){return React.createElement('div', {key:i,style:{flex:1,textAlign:"center",color:m.m===mo?C.accent:C.text3}}, m.label.slice(0,3));})
                      )
                    );
                  }())

                , achievements.length>0 ? React.createElement('div', { style: {display:"flex",flexWrap:"wrap",gap:8,marginBottom:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 275}}, achievements.map(function(a,i){return React.createElement(Badge, { key: i, icon: a.icon, text: a.text, color: a.color, bg: a.bg, __self: this, __source: {fileName: _jsxFileName, lineNumber: 275}} );})) : null
                , tInc > 0 ? React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 276}}
                  , hourlyRate>0 ? React.createElement('div', { style: {marginBottom:10,padding:"14px 16px",background:"linear-gradient(135deg, rgba(255,215,0,0.06), "+C.bg2+")",border:"1px solid "+C.border,borderRadius:RADIUS.md,boxShadow:SHADOW.sm}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 278}}, React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 278}}, React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 278}}, React.createElement('div', { style: {fontSize:FS.xs,color:C.text3,letterSpacing:0.8,textTransform:"uppercase",fontWeight:600,marginBottom:3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 278}}, T.hourlyRate), React.createElement('div', { style: {fontSize:FS.xxxl-2,fontWeight:900,color:C.gold,letterSpacing:-0.6,fontVariantNumeric:"tabular-nums"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 278}}, fmt(hourlyRate), React.createElement('span', { style: {fontSize:FS.sm,color:C.text3,marginLeft:4,fontWeight:500}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 278}}, T.perHour))), lmHourly>0?React.createElement('div', { style: {textAlign:"right"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 278}}, React.createElement('div', { style: {fontSize:FS.xs,color:C.text3,marginBottom:2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 278}}, T.lastMonth+" "+fmt(lmHourly)), React.createElement('div', { style: {fontSize:FS.md,fontWeight:700,color:hourlyRate>=lmHourly?C.success:C.danger,letterSpacing:0.2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 278}}, hourlyRate>=lmHourly?"▲":"▼", " " , fmt(Math.abs(hourlyRate-lmHourly)))):null)) : null
                  , lmInc>0 ? React.createElement('div', { style: {marginBottom:10,padding:"12px 16px",background:"linear-gradient(135deg, rgba(255,255,255,0.02), "+C.bg2+")",border:"1px solid "+C.border,borderRadius:RADIUS.md,boxShadow:SHADOW.sm}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 279}}, React.createElement('div', { style: {fontSize:FS.xs+1,color:C.text3,marginBottom:8,letterSpacing:1.2,textTransform:"uppercase",fontWeight:600}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 279}}, T.vsLastMonth), React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 279}}, React.createElement('div', { style: {textAlign:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 279}}, React.createElement('div', { style: {fontSize:FS.sm,color:C.text3,marginBottom:3,fontWeight:500}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 279}}, T.income), React.createElement('div', { style: {fontSize:FS.lg,fontWeight:800,color:tInc>=lmInc?C.success:C.danger,letterSpacing:0.2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 279}}, tInc>=lmInc?"▲":"▼", Math.round(Math.abs(tInc-lmInc)/lmInc*100), "%")), React.createElement('div', { style: {textAlign:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 279}}, React.createElement('div', { style: {fontSize:FS.sm,color:C.text3,marginBottom:3,fontWeight:500}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 279}}, T.expense), React.createElement('div', { style: {fontSize:FS.lg,fontWeight:800,color:tExp<=lmExp?C.success:C.danger,letterSpacing:0.2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 279}}, tExp<=lmExp?"▼":"▲", lmExp>0?Math.round(Math.abs(tExp-lmExp)/lmExp*100):0, "%")), React.createElement('div', { style: {textAlign:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 279}}, React.createElement('div', { style: {fontSize:FS.sm,color:C.text3,marginBottom:3,fontWeight:500}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 279}}, T.netProfit), React.createElement('div', { style: {fontSize:FS.lg,fontWeight:800,color:net>=lmNet?C.success:C.danger,letterSpacing:0.2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 279}}, net>=lmNet?"▲":"▼", lmNet!==0?Math.round(Math.abs(net-lmNet)/Math.abs(lmNet)*100):0, "%")))) : null
                ) : null
                , (function(){
                  // Collapsible — show header only when collapsed
                  // Display condition: at least 2 entries with odometer (qty optional — many users don't track kWh)
                  if(!collOpen.energy){
                    var hasFuelData = el.some(function(e){return (e.category==="charging"||e.category==="fuel")&&e.odometer&&+e.odometer>0;});
                    if(!hasFuelData) return null;
                    var hasChargingPeek=el.some(function(e){return e.category==="charging"&&e.odometer&&+e.odometer>0;});
                    var hasFuelPeek=el.some(function(e){return e.category==="fuel"&&e.odometer&&+e.odometer>0;});
                    var isEvPeek=veh.type==="electric"||(hasChargingPeek&&!hasFuelPeek);
                    var titleStrPeek=lang==="en"?(isEvPeek?"⚡ Energy Efficiency":"⛽ Fuel Efficiency"):(isEvPeek?"⚡ 能耗统计":"⛽ 油耗统计");
                    return React.createElement(Card, {style:{marginBottom:8,padding:"10px 14px",cursor:"pointer"}, onClick:function(){toggleColl("energy");}}
                      , React.createElement('div', {style:{display:"flex",justifyContent:"space-between",alignItems:"center"}}
                        , React.createElement('div', {style:{fontSize:13,fontWeight:700,color:"#90EAF8"}}, titleStrPeek)
                        , React.createElement('span', {style:{fontSize:12,color:C.text3}}, "▼")
                      )
                    );
                  }
                  // Auto-detect from data (don't rely solely on veh.type which might be empty after reset)
                  var hasCharging=el.some(function(e){return e.category==="charging"&&e.odometer&&+e.odometer>0;});
                  var hasFuel=el.some(function(e){return e.category==="fuel"&&e.odometer&&+e.odometer>0;});
                  var isEv=veh.type==="electric"||(hasCharging&&!hasFuel);
                  var fuelCat=isEv?"charging":"fuel";var unitName=isEv?"kWh":"Gal";var effLabel=isEv?"mi/kWh":"MPG";
                  // Get all fuel/charging entries with odometer (qty optional), sorted by date+odometer.
                  // Need at least 2 fills with odometer to compute mi between them.
                  var allFi=el.filter(function(e){return e.category===fuelCat&&e.odometer&&+e.odometer>0;}).sort(function(a,b){var c=a.date.localeCompare(b.date);return c!==0?c:(+a.odometer)-(+b.odometer);});
                  if(allFi.length<2)return null;
                  // For each pair, compute miles driven and units used since previous fill
                  var monthSegs=[]; // segments where the END date is in current month
                  var ytdSegs=[];   // segments where the END date is in current year
                  for(var i=1;i<allFi.length;i++){
                    var prev=allFi[i-1],cur=allFi[i];
                    var miles=+cur.odometer-+prev.odometer;
                    var units=+cur.qty;
                    if(miles<=0||miles>2000)continue; // sanity check (skip if odometer reset or huge gap)
                    var seg={miles:miles,units:units,cost:+cur.amount,date:cur.date};
                    if(cur.date.slice(0,7)===mo)monthSegs.push(seg);
                    if(cur.date.slice(0,4)===mo.slice(0,4))ytdSegs.push(seg);
                  }
                  if(monthSegs.length===0&&ytdSegs.length===0)return null;
                  var calc=function(segs){
                    if(!segs.length)return null;
                    var mi=segs.reduce(function(s,x){return s+x.miles;},0);
                    var un=segs.reduce(function(s,x){return s+x.units;},0);
                    var co=segs.reduce(function(s,x){return s+x.cost;},0);
                    return {mi:mi,un:un,co:co,eff:un>0?mi/un:0,cpm:mi>0?co/mi:0};
                  };
                  var mStats=calc(monthSegs),yStats=calc(ytdSegs);
                  var titleStr=lang==="en"?(isEv?"⚡ Energy Efficiency":"⛽ Fuel Efficiency"):(isEv?"⚡ 能耗统计":"⛽ 油耗统计");
                  // Inverse: per-10-mile consumption (more intuitive for many users)
                  var per10 = function(eff){
                    if(!eff || eff<=0) return null;
                    return (10/eff).toFixed(2); // units per 10 mi
                  };
                  return React.createElement(Card, { style: {marginBottom:8,padding:"12px 14px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}
                    , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,cursor:"pointer"}, onClick:function(){toggleColl("energy");}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}
                      , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:C.success}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}, titleStr)
                      , React.createElement('span', {style:{fontSize:12,color:C.text3}}, "▲")
                    )
                    , mStats?React.createElement('div', { style: {marginBottom:yStats?10:0}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}
                      , React.createElement('div', { style: {fontSize:12,color:C.text3,marginBottom:4}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}, lang==="en"?"This Month":"本月")
                      , React.createElement('div', { style: {display:"grid",gridTemplateColumns: mStats.eff>0 ? "1fr 1fr 1fr" : "1fr 1fr",gap:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}
                        , React.createElement('div', { style: {textAlign:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}, React.createElement('div', { style: {fontSize:16,fontWeight:800,color:C.accent}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}, mStats.mi.toLocaleString(), " mi"), React.createElement('div', { style: {fontSize:12,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}, lang==="en"?"Distance":"行驶里程"))
                        , mStats.eff>0 ? React.createElement('div', { style: {textAlign:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}, React.createElement('div', { style: {fontSize:16,fontWeight:800,color:C.gold}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}, fmt2(mStats.eff), " ", effLabel), React.createElement('div', { style: {fontSize:12,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}, lang==="en"?"Efficiency":"能效")) : null
                        , React.createElement('div', { style: {textAlign:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}, React.createElement('div', { style: {fontSize:16,fontWeight:800,color:"#FF9A65"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}, "$", fmt2(mStats.cpm), "/mi"), React.createElement('div', { style: {fontSize:12,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}, lang==="en"?"Cost/Mile":"每英里成本"))
                      )
                      , per10(mStats.eff)?React.createElement('div',{style:{fontSize:12,color:"#90C8DC",marginTop:6,textAlign:"center",fontStyle:"italic"}},
                          lang==="en"
                            ? "≈ "+per10(mStats.eff)+" "+unitName+" per 10 mi · $"+(mStats.cpm*10).toFixed(2)+"/10 mi"
                            : "≈ 每 10 mi 用 "+per10(mStats.eff)+" "+unitName+" · $"+(mStats.cpm*10).toFixed(2)+"/10 mi"
                        ):(mStats.cpm>0?React.createElement('div',{style:{fontSize:12,color:"#90C8DC",marginTop:6,textAlign:"center",fontStyle:"italic"}},
                          lang==="en"
                            ? "≈ $"+(mStats.cpm*10).toFixed(2)+"/10 mi"
                            : "≈ $"+(mStats.cpm*10).toFixed(2)+"/10 mi"
                        ):null)
                    ):null
                    , yStats?React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}
                      , React.createElement('div', { style: {fontSize:12,color:C.text3,marginBottom:4}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}, lang==="en"?"Year to Date":"年累计")
                      , React.createElement('div', { style: {display:"grid",gridTemplateColumns: yStats.eff>0 ? "1fr 1fr 1fr" : "1fr 1fr",gap:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}
                        , React.createElement('div', { style: {textAlign:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}, React.createElement('div', { style: {fontSize:14,fontWeight:700,color:C.accent}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}, yStats.mi.toLocaleString(), " mi"))
                        , yStats.eff>0 ? React.createElement('div', { style: {textAlign:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}, React.createElement('div', { style: {fontSize:14,fontWeight:700,color:C.gold}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}, fmt2(yStats.eff), " ", effLabel)) : null
                        , React.createElement('div', { style: {textAlign:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}, React.createElement('div', { style: {fontSize:14,fontWeight:700,color:"#FF9A65"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}, "$", fmt2(yStats.cpm), "/mi"))
                      )
                      , per10(yStats.eff)?React.createElement('div',{style:{fontSize:12,color:"#90C8DC",marginTop:6,textAlign:"center",fontStyle:"italic"}},
                          lang==="en"
                            ? "≈ "+per10(yStats.eff)+" "+unitName+" per 10 mi · $"+(yStats.cpm*10).toFixed(2)+"/10 mi"
                            : "≈ 每 10 mi 用 "+per10(yStats.eff)+" "+unitName+" · $"+(yStats.cpm*10).toFixed(2)+"/10 mi"
                        ):null
                    ):null
                  );
                }())
                , (function(){
                  // Collapsible — show header only when collapsed
                  if(!collOpen.fuelchart){
                    var hasFuelData = el.some(function(e){return (e.category==="charging"||e.category==="fuel")&&e.qty&&+e.qty>0&&e.date&&e.date.slice(0,7)===mo;});
                    if(!hasFuelData) return null;
                    return React.createElement(Card, {style:{marginBottom:8,padding:"10px 14px",cursor:"pointer"}, onClick:function(){toggleColl("fuelchart");}}
                      , React.createElement('div', {style:{display:"flex",justifyContent:"space-between",alignItems:"center"}}
                        , React.createElement('div', {style:{fontSize:13,fontWeight:700,color:C.gold}}, "⛽ ", lang==="en"?"Fuel/Charge price chart":"加油/充电价格趋势")
                        , React.createElement('span', {style:{fontSize:12,color:C.text3}}, "▼")
                      )
                    );
                  }
                  var hasCharging=el.some(function(e){return e.category==="charging"&&e.qty&&+e.qty>0;});
                  var hasFuel=el.some(function(e){return e.category==="fuel"&&e.qty&&+e.qty>0;});
                  var isEv=veh.type==="electric"||(hasCharging&&!hasFuel);
                  var fuelCat=isEv?"charging":"fuel";var unit=isEv?"/kWh":"/Gal";var unitName=isEv?"kWh":"Gal";
                  // Get last 30 fills (not last 30 days — more useful for sparse data)
                  // Filter by current selected month (mo) so the chart follows month navigation
                  var fiAll=el.filter(function(e){return e.category===fuelCat&&e.qty&&+e.qty>0&&e.date&&e.date.slice(0,7)===mo;}).sort(function(a,b){return a.date.localeCompare(b.date);});
                  var fi=fiAll.slice(-30);
                  if(fi.length<2)return null;
                  var pts=fi.map(function(e){return {date:e.date,price:Math.round(+e.amount/+e.qty*100)/100,qty:+e.qty,amount:+e.amount,notes:e.notes||""};});
                  var prices=pts.map(function(x){return x.price;});
                  var minP=Math.min.apply(null,prices),maxP=Math.max.apply(null,prices);
                  var avgP=prices.reduce(function(a,b){return a+b;},0)/prices.length;
                  var maxIdx=prices.indexOf(maxP),minIdx=prices.indexOf(minP);
                  var latest=pts[pts.length-1];
                  // Build SVG line path
                  var W=300,H=50,padY=4;
                  var sx=function(i){return pts.length>1?(i/(pts.length-1))*W:W/2;};
                  var sy=function(p){return maxP===minP?H/2:H-padY-(p-minP)/(maxP-minP)*(H-2*padY);};
                  var pathD=pts.map(function(p,i){return (i===0?"M":"L")+sx(i).toFixed(1)+","+sy(p.price).toFixed(1);}).join(" ");
                  // Date label X positions: first, max, min, last (deduplicated)
                  return React.createElement(Card, { style: {marginBottom:8,padding:"12px 14px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}
                    , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,cursor:"pointer"}, onClick: function(){toggleColl("fuelchart");}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}
                      , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:C.gold}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}, "⛽ " , lang==="en"?(isEv?"Charging · "+fi.length+" fills · avg $"+fmt2(avgP)+unit:"Gas · "+fi.length+" fills · avg $"+fmt2(avgP)+unit):(isEv?"充电 · "+fi.length+" 次 · 均价 $"+fmt2(avgP)+unit:"加油 · "+fi.length+" 次 · 均价 $"+fmt2(avgP)+unit))
                      , React.createElement('span', { style: {fontSize:12,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}, "▲")
                    )
                    // 3 key numbers
                    , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}
                      , React.createElement('div', { style: {textAlign:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}, React.createElement('div', { style: {fontSize:12,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}, lang==="en"?"Highest":"最贵"), React.createElement('div', { style: {fontSize:15,fontWeight:800,color:C.danger}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}, "$"+fmt2(maxP)), React.createElement('div', { style: {fontSize:10,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}, fmtDate(pts[maxIdx].date)))
                      , React.createElement('div', { style: {textAlign:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}, React.createElement('div', { style: {fontSize:12,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}, lang==="en"?"Lowest":"最便宜"), React.createElement('div', { style: {fontSize:15,fontWeight:800,color:C.success}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}, "$"+fmt2(minP)), React.createElement('div', { style: {fontSize:10,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}, fmtDate(pts[minIdx].date)))
                      , React.createElement('div', { style: {textAlign:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}, React.createElement('div', { style: {fontSize:12,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}, lang==="en"?"Latest":"最近"), React.createElement('div', { style: {fontSize:15,fontWeight:800,color:C.gold}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}, "$"+fmt2(latest.price)), React.createElement('div', { style: {fontSize:10,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}, fmtDate(latest.date)))
                    )
                    // SVG line chart
                    , React.createElement('div', { style: {marginBottom:6,height:H+18,position:"relative"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}
                      , React.createElement('svg', { width:"100%", height:H, viewBox:"0 0 "+W+" "+H, preserveAspectRatio:"none", style:{display:"block"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}
                        , React.createElement('path', { d: pathD, fill: "none", stroke: C.gold, strokeWidth: 1.5, vectorEffect:"non-scaling-stroke", __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}})
                        , pts.map(function(p,i){var isMax=i===maxIdx,isMin=i===minIdx,isLast=i===pts.length-1;var col=isMax?C.danger:isMin?C.success:isLast?C.gold:"#5A6A80";var rad=isMax||isMin||isLast?2.5:1.5;return React.createElement('circle', { key: i, cx: sx(i), cy: sy(p.price), r: rad, fill: col, vectorEffect:"non-scaling-stroke", __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}});})
                      )
                      , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",fontSize:10,color:C.text3,marginTop:2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}, React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}, fmtDate(pts[0].date)), React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}, fmtDate(pts[pts.length-1].date)))
                    )
                    // Expanded detail list
                    , trendOpen ? React.createElement('div', { style: {marginTop:12,paddingTop:10,borderTop:"1px solid "+C.border}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}
                      , React.createElement('div', { style: {fontSize:12,color:C.text3,marginBottom:6}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}, lang==="en"?"All "+fi.length+" fills this month":"本月 "+fi.length+" 次充电详情")
                      , pts.slice().reverse().map(function(p,i){var isMax=p.price===maxP,isMin=p.price===minP;var col=isMax?C.danger:isMin?C.success:C.text;return React.createElement('div', { key: i, style: {display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:i<pts.length-1?"1px solid "+C.border:"none",fontSize:13}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}
                        , React.createElement('span', { style: {color:C.text2,fontSize:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}, fmtDate(p.date))
                        , React.createElement('span', { style: {color:C.text2,fontSize:12,flex:1,marginLeft:8,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}, p.notes)
                        , React.createElement('span', { style: {color:C.text3,fontSize:12,marginRight:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}, fmt2(p.qty), unitName)
                        , React.createElement('span', { style: {color:col,fontWeight:700}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}, "$"+fmt2(p.price))
                      );})
                    ) : null
                  );
                }())

                , (tExp > 0 || tPlatformFee > 0) ? (
                  !collOpen.expDet ? (
                    // Collapsed view — show summary header with platform fee inline
                    React.createElement(Card, {style:{marginBottom:8,padding:"10px 14px",cursor:"pointer"}, onClick:function(){toggleColl("expDet");}}
                      , React.createElement('div', {style:{display:"flex",justifyContent:"space-between",alignItems:"center"}}
                        , React.createElement('div', {style:{fontSize:13,fontWeight:700,color:C.text2,display:"flex",flexDirection:"column",gap:2}}
                          , React.createElement('div', null, "💸 ", T.expense, " · ", fmt(tExp))
                          , tPlatformFee > 0 ? React.createElement('div', {style:{fontSize:11,fontWeight:500,color:C.text3}}
                              , "📋 ", lang==="en"?"Platform fee · ":"平台抽成 · ", fmt(tPlatformFee), " ", lang==="en"?"(ref only)":"(仅记录)"
                            ) : null
                        )
                        , React.createElement('span', {style:{fontSize:12,color:C.text3}}, "▼")
                      )
                    )
                  ) : (
                  React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 286}}
                    , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,cursor:"pointer"}, onClick:function(){toggleColl("expDet");}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 287}}
                      , React.createElement('div', { style: {fontSize:14,fontWeight:700,color:C.text2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 288}}, "💸 ", T.expense)
                      , React.createElement('span', {style:{fontSize:12,color:C.text3}}, "▲")
                    )
                    // Platform fee callout (refOnly — info only, doesn't impact net)
                    , tPlatformFee > 0 ? React.createElement('div', { style: {marginBottom:8,padding:"8px 12px",background:"rgba(171,71,188,0.08)",border:"1px solid rgba(171,71,188,0.25)",borderRadius:8,display:"flex",justifyContent:"space-between",alignItems:"center"} }
                      , React.createElement('div', {style:{display:"flex",flexDirection:"column"}}
                        , React.createElement('span', { style: {fontSize:12,color:"#CC88FF",fontWeight:600} }, "📋 ", lang==="en"?"Platform Fee Charged":"平台抽成")
                        , React.createElement('span', { style: {fontSize:10,color:C.text3} }, lang==="en"?"already deducted from Platform Pay":"已从平台到账中扣除")
                      )
                      , React.createElement('span', { style: {fontSize:14,fontWeight:700,color:"#CC88FF"} }, fmt(tPlatformFee))
                    ) : null
                    , React.createElement('div', { style: {display:"flex",justifyContent:"flex-end",marginBottom:8}}
                      , React.createElement('button', { onClick: function(e){e.stopPropagation();setMExpDet(!mExpDet);}, style: {background:"none",border:"1px solid "+C.border2,borderRadius:8,padding:"4px 10px",color:C.text2,fontSize:12,cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 289}}, mExpDet?(lang==="en"?"By Group":"按大类"):(lang==="en"?"By Item":"按小类"))
                    )
                    , mExpDet ? React.createElement(Card, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 291}}, React.createElement(CatDetail, { items: feAll, total: tExp, allC: allC, lang: lang, __self: this, __source: {fileName: _jsxFileName, lineNumber: 291}} )) : React.createElement(CatBreakdown, { items: feAll, total: tExp, allC: allC, lang: lang, scope: "dash_m", forceRerender: forceRerender, __self: this, __source: {fileName: _jsxFileName, lineNumber: 291}} )
                  
                    , tInc>0&&tExp>0 ? React.createElement('div', { style: {marginTop:8,background:C.bg3,borderRadius:10,padding:"10px 14px",border:"1px solid #151F30"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 293}}, React.createElement('div', { style: {display:"flex",justifyContent:"space-between",marginBottom:6}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 293}}, React.createElement('span', { style: {fontSize:12,color:"#7AB8A8"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 293}}, lang==="en"?"Expense Ratio":"支出占比"), React.createElement('span', { style: Object.assign({fontSize:13,fontWeight:700},{color:tExp/tInc>0.8?C.danger:tExp/tInc>0.5?"#FFB300":C.success}), __self: this, __source: {fileName: _jsxFileName, lineNumber: 293}}, Math.round(tExp/tInc*100), "%")), React.createElement('div', { style: {height:8,borderRadius:4,background:"#1A2A40",overflow:"hidden"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 293}}, React.createElement('div', { style: {height:8,borderRadius:4,width:Math.min(100,Math.round(tExp/tInc*100))+"%",background:tExp/tInc>0.8?"linear-gradient(90deg,#FF5252,#FF8855)":tExp/tInc>0.5?"linear-gradient(90deg,#FFB300,#FFD700)":"linear-gradient(90deg,#00E676,#00D4FF)"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 293}}))) : null
                  )
                  )
                ) : null
              )
            ) : null
            , dashV==="year" ? (
              React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 299}}
                , React.createElement(YrNav, { val: yr, set: setYr, lang: lang, onPick: function(){setYpState({value:yr,onChange:function(v){setYr(v);}});}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 300}} )
                , (function(){var hm=mData.filter(function(m){return m.inc>0;});if(hm.length<2)return null;var mx=Math.max.apply(null,hm.map(function(m){return m.inc;}));return React.createElement(Card, { style: {marginBottom:8,padding:"12px 14px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 301}}, React.createElement('div', { style: {fontSize:13,fontWeight:700,color:C.text2,marginBottom:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 301}}, "📊 " , lang==="en"?("Income Trend · "+yr):("收入趋势 · "+yr+"年")), React.createElement('div', { style: {display:"flex",alignItems:"center",gap:3,height:60}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 301}}, mData.map(function(m,i){if(!m.inc)return React.createElement('div', { key: i, style: {flex:1}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 301}} );var h=Math.round(8+m.inc/mx*48);var isCur=m.m===mo;return React.createElement('div', { key: i, onClick: function(){setMo(m.m);setDashV("month");}, style: {flex:1,cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 301}}, React.createElement('div', { style: {width:"100%",height:h,borderRadius:"4px 4px 1px 1px",background:isCur?"linear-gradient(180deg, #00D4FF, #0066AA)":m.net>=0?"linear-gradient(180deg, #00E676, #0A8050)":"linear-gradient(180deg, #FF7060, #C03030)",opacity:isCur?1:0.75,boxShadow:isCur?"0 0 12px rgba(0,212,255,0.4)":"none",transition:"opacity 0.2s"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 301}} ));}), " " ), React.createElement('div', { style: {display:"flex",fontSize:11,color:C.text3,marginTop:3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 301}}, mData.map(function(m,i){return React.createElement('div', { key: i, style: {flex:1,textAlign:"center",color:m.m===mo?C.accent:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 301}}, m.label.slice(0,3));})));}())
                , React.createElement(Card, { style: {marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 302}}
                  , React.createElement('div', { style: {fontSize:13,color:"#8ACCA8",marginBottom:6}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 303}}, yr+" "+(lang==="en"?"Annual":"全年"))
                  , (function(){var nc=yNet>=0?C.success:C.danger;return React.createElement('div', { style: {fontSize:22,fontWeight:900,color:nc,letterSpacing:-1}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 304}}, fmt(yNet));}())
                  , React.createElement('div', { style: {fontSize:12,color:"#8ACCA8",marginTop:4}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 305}}, lang==="en"?"Income":"收", " " , fmt(yInc), " · "  , lang==="en"?"Expense":"支", " " , fmt(yExp))
                )
                , (yStmtTrips>0||yStmtHours>0||yStmtMiles>0) ? React.createElement('div', { style: {display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 307}}, (function(){var vt=yStmtTrips?String(yStmtTrips):"—",vh=yStmtHours?yStmtHours+"h":"—",vm=yStmtMiles?yStmtMiles+"mi":"—";return React.createElement('div', { style: {display:"contents"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 307}}, React.createElement(Stat, { label: T.trips, value: vt, color: C.accent, __self: this, __source: {fileName: _jsxFileName, lineNumber: 307}} ), React.createElement(Stat, { label: lang==="en"?"Online h":"在线h", value: vh, color: C.accent, __self: this, __source: {fileName: _jsxFileName, lineNumber: 307}} ), React.createElement(Stat, { label: T.miles, value: vm, color: C.accent, __self: this, __source: {fileName: _jsxFileName, lineNumber: 307}} ));}())) : null
                // === Year Energy Stats Card (collapsible, default collapsed) ===
                , (function(){
                    // Detect EV vs gas car from data
                    var hasCharging=el.some(function(e){return e.category==="charging"&&e.qty&&+e.qty>0;});
                    var hasFuel=el.some(function(e){return e.category==="fuel"&&e.qty&&+e.qty>0;});
                    var isEv=veh.type==="electric"||(hasCharging&&!hasFuel);
                    var fuelCat=isEv?"charging":"fuel";
                    var unitName=isEv?"kWh":"Gal";
                    var titleStrYr=lang==="en"?(isEv?"⚡ Annual Energy · "+yr:"⛽ Annual Fuel · "+yr):(isEv?"⚡ "+yr+"年充电统计":"⛽ "+yr+"年加油统计");
                    // All charging/fuel entries in this year
                    var yrFi=el.filter(function(e){return e.category===fuelCat&&e.qty&&+e.qty>0&&e.date&&e.date.slice(0,4)===yr;});
                    if(yrFi.length===0) return null;
                    var yrCount=yrFi.length;
                    var yrQty=yrFi.reduce(function(s,x){return s+(+x.qty||0);},0);
                    var yrCost=yrFi.reduce(function(s,x){return s+(+x.amount||0);},0);
                    var avgUnitPrice = yrQty>0 ? yrCost/yrQty : 0;
                    // Efficiency calc: need entries with odometer for mi/unit
                    var fiOdo=yrFi.filter(function(e){return e.odometer&&+e.odometer>0;}).sort(function(a,b){var c=a.date.localeCompare(b.date);return c!==0?c:(+a.odometer)-(+b.odometer);});
                    var totalMi=0,totalUn=0;
                    for(var k=1;k<fiOdo.length;k++){
                      var prev=fiOdo[k-1],cur=fiOdo[k];
                      var dMi=(+cur.odometer)-(+prev.odometer);
                      if(dMi>0&&dMi<3000){ totalMi+=dMi; totalUn+=(+cur.qty||0); }
                    }
                    var avgEff = totalUn>0 ? totalMi/totalUn : 0;
                    var effLabel = isEv?"mi/kWh":"MPG";
                    // Collapsed view
                    if(!collOpen.energyYr){
                      return React.createElement(Card, {style:{marginBottom:8,padding:"10px 14px",cursor:"pointer"}, onClick:function(){var nv=Object.assign({},collOpen);nv.energyYr=true;setCollOpen(nv);}}
                        , React.createElement('div', {style:{display:"flex",justifyContent:"space-between",alignItems:"center"}}
                          , React.createElement('div', {style:{fontSize:13,fontWeight:700,color:"#90EAF8"}}, titleStrYr)
                          , React.createElement('span', {style:{fontSize:12,color:C.text3}}, "▼")
                        )
                      );
                    }
                    // Expanded view
                    return React.createElement(Card, {style:{marginBottom:12,padding:"12px 14px"}}
                      , React.createElement('div', {style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,cursor:"pointer"}, onClick:function(){var nv=Object.assign({},collOpen);nv.energyYr=false;setCollOpen(nv);}}
                        , React.createElement('div', {style:{fontSize:13,fontWeight:700,color:C.success}}, titleStrYr)
                        , React.createElement('span', {style:{fontSize:12,color:C.text3}}, "▲")
                      )
                      // Top 4 numbers
                      , React.createElement('div', {style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}
                        , React.createElement('div', {style:{textAlign:"center",padding:"8px 6px",background:C.bg3,borderRadius:8}}
                          , React.createElement('div', {style:{fontSize:18,fontWeight:800,color:C.accent}}, yrCount)
                          , React.createElement('div', {style:{fontSize:11,color:C.text3,marginTop:2}}, lang==="en"?(isEv?"Charges":"Fills"):(isEv?"充电次数":"加油次数"))
                        )
                        , React.createElement('div', {style:{textAlign:"center",padding:"8px 6px",background:C.bg3,borderRadius:8}}
                          , React.createElement('div', {style:{fontSize:18,fontWeight:800,color:C.gold}}, fmt2(yrQty), " ", unitName)
                          , React.createElement('div', {style:{fontSize:11,color:C.text3,marginTop:2}}, lang==="en"?(isEv?"Total kWh":"Total Gallons"):(isEv?"总度数":"总加仑"))
                        )
                        , React.createElement('div', {style:{textAlign:"center",padding:"8px 6px",background:C.bg3,borderRadius:8}}
                          , React.createElement('div', {style:{fontSize:18,fontWeight:800,color:C.danger}}, fmt(yrCost))
                          , React.createElement('div', {style:{fontSize:11,color:C.text3,marginTop:2}}, lang==="en"?"Total Spent":"总花费")
                        )
                        , React.createElement('div', {style:{textAlign:"center",padding:"8px 6px",background:C.bg3,borderRadius:8}}
                          , React.createElement('div', {style:{fontSize:18,fontWeight:800,color:"#5ADA7A"}}, "$", fmt2(avgUnitPrice), "/", unitName)
                          , React.createElement('div', {style:{fontSize:11,color:C.text3,marginTop:2}}, lang==="en"?"Avg unit price":"平均单价")
                        )
                      )
                      // Efficiency row (if enough odometer data)
                      , avgEff>0 ? React.createElement('div', {style:{textAlign:"center",padding:"10px",background:C.bg3,borderRadius:8,marginTop:8}}
                        , React.createElement('div', {style:{fontSize:20,fontWeight:800,color:C.gold}}, fmt2(avgEff), " ", effLabel)
                        , React.createElement('div', {style:{fontSize:11,color:C.text3,marginTop:2}}, lang==="en"?"Avg efficiency · "+totalMi.toLocaleString()+" mi tracked":"平均能效 · "+totalMi.toLocaleString()+" mi 计入")
                      ) : null
                    );
                  }())
                , React.createElement(Card, { style: {marginBottom:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 308}}
                  , React.createElement('div', { style: {fontSize:14,fontWeight:700,color:C.text,marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 309}}, lang==="en"?"Monthly Breakdown":"逐月明细")
                  , mData.map(function(m){if(m.inc===0&&m.exp===0)return null;var ncl=m.net>=0?C.success:C.danger,mcl=m.m===mo?C.accent:C.text;return React.createElement('div', { key: m.m, onClick: function(){setMo(m.m);setDashV("month");}, style: {display:"grid",gridTemplateColumns:"2fr 2fr 2fr 2fr",padding:"7px 0",borderBottom:"1px solid #182030",cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 310}}, React.createElement('span', { style: Object.assign({fontSize:12,fontWeight:700},{color:mcl}), __self: this, __source: {fileName: _jsxFileName, lineNumber: 310}}, m.label), React.createElement('span', { style: {fontSize:12,color:C.accent}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 310}}, m.inc>0?fmt(m.inc):"—"), React.createElement('span', { style: {fontSize:12,color:C.danger}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 310}}, m.exp>0?fmt(m.exp):"—"), React.createElement('span', { style: Object.assign({fontSize:12,fontWeight:700},{color:ncl}), __self: this, __source: {fileName: _jsxFileName, lineNumber: 310}}, fmt(m.net)));})
                )
                // === Pie Chart for YEAR mode (NEW v3.7.3) ===
                , (function(){
                    if(yExp<=0) return null;
                    var allYE = yAllExps();
                    var groupTotals={"车辆":0,"牌照":0,"平台":0,"其他":0};
                    allYE.forEach(function(e){
                      if(e.category==="platform") return;  // refOnly: never counted as expense
                      var cat=allC[e.category];
                      var g=cat?(cat.g||"其他"):"其他";
                      if(groupTotals[g]===undefined) g="其他";
                      groupTotals[g]+=(+e.amount||0);
                    });
                    var total=Object.values(groupTotals).reduce(function(a,b){return a+b;},0);
                    if(total<=0) return null;
                    var colors={"车辆":C.accent,"牌照":C.gold,"平台":"#CC88FF","其他":"#A8D0E8"};
                    var labels=lang==="en"?{"车辆":"Vehicle","牌照":"License","平台":"Platform","其他":"Other"}:{"车辆":"车辆","牌照":"牌照","平台":"平台","其他":"其他"};
                    var cx=60, cy=60, r=50;
                    var startAngle=-Math.PI/2;
                    var slices=[];
                    ["车辆","牌照","平台","其他"].forEach(function(g){
                      if(!groupTotals[g]) return;
                      var pct=groupTotals[g]/total;
                      var endAngle=startAngle+pct*2*Math.PI;
                      var x1=cx+r*Math.cos(startAngle), y1=cy+r*Math.sin(startAngle);
                      var x2=cx+r*Math.cos(endAngle), y2=cy+r*Math.sin(endAngle);
                      var largeArc=pct>0.5?1:0;
                      var path;
                      if(pct>=0.999){
                        path="M"+(cx-r)+","+cy+" A"+r+","+r+" 0 1,1 "+(cx+r)+","+cy+" A"+r+","+r+" 0 1,1 "+(cx-r)+","+cy+" Z";
                      }else{
                        path="M"+cx.toFixed(2)+","+cy.toFixed(2)+" L"+x1.toFixed(2)+","+y1.toFixed(2)+" A"+r+","+r+" 0 "+largeArc+",1 "+x2.toFixed(2)+","+y2.toFixed(2)+" Z";
                      }
                      slices.push({path:path,color:colors[g],label:labels[g],amount:groupTotals[g],pct:pct});
                      startAngle=endAngle;
                    });
                    return React.createElement(Card, {style:{marginBottom:8,padding:"12px 14px"}}
                      , React.createElement('div', {style:{fontSize:13,fontWeight:700,color:C.text2,marginBottom:10}}, "🥧 " , lang==="en"?("Annual Expense Distribution · "+yr):(yr+"年支出分布"))
                      , React.createElement('div', {style:{display:"flex",alignItems:"center",gap:14}}
                        , React.createElement('svg', {viewBox:"0 0 120 120",width:110,height:110,style:{flexShrink:0}}
                          , slices.map(function(s,i){return React.createElement('path', {key:i,d:s.path,fill:s.color,stroke:C.bg2,strokeWidth:1.5});})
                          , React.createElement('circle', {cx:60,cy:60,r:24,fill:C.bg})
                          , React.createElement('text', {x:60,y:58,textAnchor:"middle",fill:C.text2,fontSize:10}, lang==="en"?"Total":"总计")
                          , React.createElement('text', {x:60,y:70,textAnchor:"middle",fill:C.danger,fontSize:12,fontWeight:700}, fmt(total))
                        )
                        , React.createElement('div', {style:{flex:1,display:"flex",flexDirection:"column",gap:5}}
                          , slices.map(function(s,i){return React.createElement('div', {key:i,style:{display:"flex",alignItems:"center",gap:6,fontSize:12}}
                            , React.createElement('div', {style:{width:10,height:10,borderRadius:2,background:s.color,flexShrink:0}})
                            , React.createElement('span', {style:{flex:1,color:C.text2}}, s.label)
                            , React.createElement('span', {style:{color:C.text3}}, Math.round(s.pct*100), "%")
                            , React.createElement('span', {style:{color:C.text,fontWeight:600,minWidth:48,textAlign:"right"}}, fmt(s.amount))
                          );})
                        )
                      )
                    );
                  }())
                , yExp > 0 ? React.createElement(Card, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 312}}, React.createElement('div', { style: {fontSize:14,fontWeight:700,color:C.text,marginBottom:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 312}}, lang==="en"?"Annual Expenses":"全年支出明细"), React.createElement(CatDetail, { items: yAllExps(), total: yExp, allC: allC, lang: lang, __self: this, __source: {fileName: _jsxFileName, lineNumber: 312}} )) : null
              )
            ) : null
          )
        ) : null

        , tab===1 ? (
          driverType==="taxi" ? (
          // ---- TAXI MODE: daily income UI ----
          React.createElement('div', {}
            , React.createElement(MoNav, { val: mo, set: setMo, lang: lang, onPick: function(){setMpState({value:mo,onChange:function(v){setMo(v);}});} } )
            , React.createElement('button', { onClick: function(){setDlf({date:today(),cash:"",card:"",tips:"",trips:"",hours:"",miles:"",lease:"",notes:""});setSf("daily");}, style: {width:"100%",background:"linear-gradient(135deg, rgba(255,179,71,0.12), rgba(60,40,0,0.6))",border:"1px solid rgba(255,179,71,0.3)",borderRadius:RADIUS.lg,padding:"22px",cursor:"pointer",textAlign:"center",color:"#FFB300",marginBottom:14,boxShadow:"0 4px 16px rgba(255,179,71,0.08)",transition:"transform 0.15s"} }
              , React.createElement('div', { style: {fontSize:32,marginBottom:8,filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.3))"} }, "🚖")
              , React.createElement('div', { style: {fontSize:FS.lg+1,fontWeight:800,letterSpacing:0.2} }, lang==="en"?"+ Add Today's Income":"+ 添加今日收入")
              , React.createElement('div', { style: {fontSize:FS.sm+1,color:"#9A7A40",marginTop:4} }, lang==="en"?"Cash · Card · Tips · Lease":"现金 · 信用卡 · 小费 · 租金")
            )
            , (mDailies.length>0 || mDailyInc>0) ? React.createElement('div', { style: {marginBottom:14,padding:"16px 18px",background:"linear-gradient(135deg, rgba(0,230,118,0.06), "+C.bg2+" 60%)",border:"1px solid "+C.border,borderRadius:RADIUS.lg,boxShadow:SHADOW.md,position:"relative",overflow:"hidden"} }

              , React.createElement('div', { style: {fontSize:FS.xs+1,color:C.text3,marginBottom:4,letterSpacing:0.8,textTransform:"uppercase",fontWeight:600,position:"relative"} }, lang==="en"?"This Month — Gross":"本月毛收入")
              , React.createElement('div', { style: {fontSize:FS.xxl,fontWeight:900,color:C.success,marginBottom:8,letterSpacing:-0.8,fontVariantNumeric:"tabular-nums",position:"relative"} }, fmt(mDailyInc))
              , mDailyLease>0 ? React.createElement('div', { style: {fontSize:FS.md+1,color:"#FF9A65",marginBottom:4,position:"relative"} }, "− " , lang==="en"?"Lease ":"租金 " , fmt(mDailyLease)) : null
              , mDailyLease>0 ? React.createElement('div', { style: {fontSize:FS.lg,color:"#FFB300",fontWeight:700,paddingTop:8,borderTop:"1px solid "+C.border,position:"relative"} }, lang==="en"?"Net":"净收入" , ": " , fmt(mDailyInc-mDailyLease)) : null
            ) : null
            , mDailies.length>0 ? React.createElement('div', {}
              , React.createElement('div', { style: {fontSize:FS.xs+1,color:C.text3,letterSpacing:1.2,marginBottom:10,textTransform:"uppercase",fontWeight:600} }, "📅 " , lang==="en"?"Daily Entries":"每日记录")
              , mDailies.slice().sort(function(a,b){return (b.date||"").localeCompare(a.date||"");}).map(function(d){
                  var gross=(+d.cash||0)+(+d.card||0)+(+d.tips||0);
                  var net=gross-(+d.lease||0);
                  return React.createElement('div', { key: d.id, style: {background:C.bg2,borderRadius:RADIUS.md,padding:"12px 14px",marginBottom:8,border:"1px solid "+C.border,boxShadow:SHADOW.sm,cursor:"pointer",transition:"all 0.15s"}, onClick: function(){setDlf(Object.assign({},d));setSf("daily");} }
                    , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"flex-start"} }
                      , React.createElement('div', { style: {flex:1,minWidth:0} }
                        , React.createElement('div', { style: {fontSize:FS.lg,fontWeight:700,color:C.text,marginBottom:4} }, fmtDate(d.date))
                        , React.createElement('div', { style: {fontSize:FS.xl,color:C.success,fontWeight:800,marginBottom:6,letterSpacing:-0.3,fontVariantNumeric:"tabular-nums"} }, fmt(gross), d.lease ? React.createElement('span', {style:{color:"#FF9A65",fontWeight:600,marginLeft:10,fontSize:FS.md}}, "− " , fmt(+d.lease||0)) : null)
                        , React.createElement('div', { style: {display:"flex",gap:6,flexWrap:"wrap"} }
                          , d.cash ? React.createElement('span', { style: {fontSize:FS.sm+1,background:"rgba(0,230,118,0.1)",border:"1px solid rgba(0,230,118,0.25)",borderRadius:6,padding:"3px 9px",color:"#5ADA7A",fontWeight:600} }, "💵 ", fmt(+d.cash||0)) : null
                          , d.card ? React.createElement('span', { style: {fontSize:FS.sm+1,background:"rgba(90,172,255,0.1)",border:"1px solid rgba(90,172,255,0.25)",borderRadius:6,padding:"3px 9px",color:C.accent2,fontWeight:600} }, "💳 ", fmt(+d.card||0)) : null
                          , d.tips ? React.createElement('span', { style: {fontSize:FS.sm+1,background:"rgba(255,215,0,0.1)",border:"1px solid rgba(255,215,0,0.25)",borderRadius:6,padding:"3px 9px",color:C.gold,fontWeight:600} }, "💰 ", fmt(+d.tips||0)) : null
                          , d.trips ? React.createElement('span', { style: {fontSize:FS.sm+1,background:C.bg4,border:"1px solid "+C.border,borderRadius:6,padding:"3px 9px",color:C.text2,fontWeight:600} }, d.trips, " ", T.trips) : null
                          , d.hours ? React.createElement('span', { style: {fontSize:FS.sm+1,background:C.bg4,border:"1px solid "+C.border,borderRadius:6,padding:"3px 9px",color:C.text2,fontWeight:600} }, d.hours, "h") : null
                          , d.miles ? React.createElement('span', { style: {fontSize:FS.sm+1,background:C.bg4,border:"1px solid "+C.border,borderRadius:6,padding:"3px 9px",color:C.text2,fontWeight:600} }, d.miles, "mi") : null
                        )
                      )
                    )
                  );
                })
            ) : React.createElement(Empty, { text: T.noData })
          )
          ) : (
          // ---- RIDESHARE MODE (default): existing UI ----
          React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 319}}
            , React.createElement(SegBtn, { val: incV, set: setIncV, opts: [["month",T.thisMonth],["year",T.thisYear]] } )
            , incV==="month"
              ? React.createElement(MoNav, { val: mo, set: setMo, lang: lang, onPick: function(){setMpState({value:mo,onChange:function(v){setMo(v);}});} } )
              : React.createElement(YrNav, { val: yr, set: setYr, lang: lang, onPick: function(){setYpState({value:yr,onChange:function(v){setYr(v);}});} } )

            // === Income comparison card (vs last month + vs same month last year, OR vs last year for year view) ===
            , (function(){
                var rows=[];
                if(incV==="month"){
                  // vs last month
                  if(lmInc>0){
                    var d1=Math.round((tInc-lmInc)/lmInc*100);
                    var s1=d1>0?"↑":(d1<0?"↓":"→");
                    var c1=d1>0?C.success:(d1<0?C.danger:C.text3);
                    rows.push({
                      label: lang==="en"?"vs Last Month":"对比上月",
                      sub: lastMo,
                      cur: tInc,
                      base: lmInc,
                      pct: d1,
                      sym: s1,
                      col: c1
                    });
                  }
                  // vs same month last year
                  if(lyMoInc>0){
                    var d2=Math.round((tInc-lyMoInc)/lyMoInc*100);
                    var s2=d2>0?"↑":(d2<0?"↓":"→");
                    var c2=d2>0?C.success:(d2<0?C.danger:C.text3);
                    rows.push({
                      label: lang==="en"?"vs Same Month Last Year":"对比去年同月",
                      sub: lyMo,
                      cur: tInc,
                      base: lyMoInc,
                      pct: d2,
                      sym: s2,
                      col: c2
                    });
                  }
                } else {
                  // YEAR VIEW: vs previous year
                  if(pyInc>0){
                    var d3=Math.round((yInc-pyInc)/pyInc*100);
                    var s3=d3>0?"↑":(d3<0?"↓":"→");
                    var c3=d3>0?C.success:(d3<0?C.danger:C.text3);
                    rows.push({
                      label: lang==="en"?"vs Last Year":"对比上一年",
                      sub: prevYr,
                      cur: yInc,
                      base: pyInc,
                      pct: d3,
                      sym: s3,
                      col: c3
                    });
                  }
                }
                if(rows.length===0)return null;
                return React.createElement(Card, { style: {marginBottom:14,padding:"12px 14px",background:"linear-gradient(180deg,#0F1F35 0%,#0A1828 100%)",border:"1px solid #1F3A5A"} },
                  React.createElement('div',{style:{fontSize:12,fontWeight:700,color:C.accent,marginBottom:8,letterSpacing:0.3}},"💵 ",lang==="en"?"Income Comparison":"收入对比"),
                  rows.map(function(r,i){
                    return React.createElement('div',{
                      key:i,
                      style:{paddingTop:i>0?8:0,marginTop:i>0?8:0,borderTop:i>0?"1px solid "+C.border:"none"}
                    },
                      React.createElement('div',{style:{fontSize:12,color:C.text3,marginBottom:3,letterSpacing:0.3}},r.label," · ",r.sub),
                      React.createElement('div',{style:{display:"flex",alignItems:"baseline",gap:8,fontSize:13,color:C.text}},
                        React.createElement('b',{style:{fontSize:15,color:C.success}},fmt(r.cur)),
                        React.createElement('span',{style:{color:C.text3,fontSize:12}},lang==="en"?"vs ":"对比 ",fmt(r.base)),
                        React.createElement('span',{style:{color:r.col,fontWeight:700,marginLeft:"auto"}},r.sym," ",Math.abs(r.pct),"%")
                      )
                    );
                  })
                );
              }())
            // === Daily entries (rideshare per-day records from dl) ===
            , (function(){
                var dailySrc = incV==="month" ? mDailies : yDailies;
                var rideEntries = dailySrc.filter(function(d){return d.mode==="rideshare";}).slice().sort(function(a,b){return (b.date||"").localeCompare(a.date||"");});
                if(rideEntries.length===0) return null;
                var totalInc = rideEntries.reduce(function(s,e){return s+(+e.grossFare||0)+(+e.tips||0)+(+e.bonus||0)+(+e.tollReimbursed||0);},0);
                var totalTrips = rideEntries.reduce(function(s,e){return s+(+e.trips||0);},0);
                var totalHours = rideEntries.reduce(function(s,e){return s+(+e.hours||0);},0);
                var totalMiles = rideEntries.reduce(function(s,e){return s+(+e.miles||0);},0);
                var uniqueDates = {}; rideEntries.forEach(function(e){if(e.date)uniqueDates[e.date]=true;});
                var dayCount = Object.keys(uniqueDates).length;
                return React.createElement('div', { style: {marginBottom:16} }
                  , React.createElement('div', { style: {fontSize:12,color:C.text3,letterSpacing:1,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"} }
                    , React.createElement('span', null, "📅 ", lang==="en"?"Daily Entries · "+dayCount+" days":"每日记录 · "+dayCount+" 天")
                    , React.createElement('button', {
                        onClick: function(){var t=today();setWcWeek(wkMon(t));setWcSel(t);setSf("week_cal");},
                        style: {background:"none",border:"1px solid "+C.border2,borderRadius:6,padding:"2px 10px",color:C.accent2,fontSize:11,cursor:"pointer"}
                      }, lang==="en"?"+ Add":"+ 添加")
                  )
                  , React.createElement(Card, { style: {background:C.bg3,border:"1px solid "+C.border,marginBottom:8,padding:"10px 14px"} }
                    , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:4} }
                      , React.createElement('div', { style: {fontSize:18,fontWeight:800,color:C.success} }, fmt(totalInc))
                      , React.createElement('div', { style: {fontSize:11,color:C.text3} },
                          totalTrips>0 ? totalTrips+(lang==="en"?" trips":" 趟") : "",
                          totalHours>0 ? (totalTrips>0?" · ":"")+totalHours+"h" : "",
                          totalMiles>0 ? (totalTrips||totalHours?" · ":"")+totalMiles+" mi" : ""
                        )
                    )
                  )
                  , (function(){
                      var byDate = {};
                      rideEntries.forEach(function(e){
                        var d = e.date || "";
                        if(!byDate[d]) byDate[d] = [];
                        byDate[d].push(e);
                      });
                      var dateKeys = Object.keys(byDate).sort(function(a,b){return b.localeCompare(a);});
                      return dateKeys.map(function(d){
                        var entries = byDate[d];
                        var dayInc = entries.reduce(function(s,e){return s+(+e.grossFare||0)+(+e.tips||0)+(+e.bonus||0)+(+e.tollReimbursed||0);},0);
                        var dayTrips = entries.reduce(function(s,e){return s+(+e.trips||0);},0);
                        var dayHours = entries.reduce(function(s,e){return s+(+e.hours||0);},0);
                        var dayMiles = entries.reduce(function(s,e){return s+(+e.miles||0);},0);
                        return React.createElement(Card, { key:d, style: {marginBottom:6,padding:"8px 12px",cursor:"pointer"},
                          onClick: function(){setWcWeek(wkMon(d));setWcSel(d);setSf("week_cal");}
                        }
                          // Top row: date + day total
                          , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:entries.length>0?4:0} }
                            , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:C.text} }, d)
                            , React.createElement('div', { style: {fontSize:14,fontWeight:700,color:C.success} }, fmt(dayInc))
                          )
                          // Per-platform breakdown rows
                          , entries.map(function(e,ei){
                              var entryInc = (+e.grossFare||0)+(+e.tips||0)+(+e.bonus||0)+(+e.tollReimbursed||0);
                              return React.createElement('div', {key:ei, style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,paddingLeft:8,paddingTop:2,paddingBottom:2}}
                                , React.createElement('div', {style:{display:"flex",alignItems:"center",gap:6,flex:1,minWidth:0}}
                                  , React.createElement('span', {style:{fontSize:11,color:C.accent2,fontWeight:600}}, e.platform||"Uber")
                                  , React.createElement('span', {style:{fontSize:10,color:C.text3}},
                                      e.trips?e.trips+(lang==="en"?" trips":" 趟"):"",
                                      e.hours?(e.trips?" · ":"")+e.hours+"h":"",
                                      e.miles?(e.trips||e.hours?" · ":"")+e.miles+"mi":""
                                    )
                                )
                                , React.createElement('span', {style:{fontSize:12,color:C.text2}}, fmt(entryInc))
                              );
                            })
                        );
                      });
                    }())
                );
              }())
            // === Monthly income goal (only for month view) ===
            , (incV==="month") ? (
                incGoal&&+incGoal>0
                  ? React.createElement(Card, { style: {marginBottom:14,padding:"10px 14px"} },
                      React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6} },
                        React.createElement('div', { style: {fontSize:13,fontWeight:700,color:C.gold} }, "🎯 " , lang==="en"?"Monthly Goal":"本月目标"),
                        React.createElement('div', { style: {display:"flex",alignItems:"center",gap:8} },
                          React.createElement('span', { style: {fontSize:13,color:C.text2} }, fmt(tInc), " / "  , fmt(+incGoal)),
                          React.createElement('button', { onClick: function(){setShowGoal(true);}, style: {background:"none",border:"none",color:C.text3,fontSize:12,cursor:"pointer",padding:"2px 4px"} }, "✏️")
                        )
                      ),
                      React.createElement('div', { style: {height:8,borderRadius:4,background:"#1A2A40",overflow:"hidden",marginBottom:4} },
                        React.createElement('div', { style: {height:8,borderRadius:4,width:Math.min(100,Math.round(tInc/+incGoal*100))+"%",background:tInc>=+incGoal?"linear-gradient(90deg,#00E676,#FFD700)":"linear-gradient(90deg,#00D4FF,#0055FF)"} } )
                      ),
                      React.createElement('div', { style: {fontSize:12,color:tInc>=+incGoal?C.success:C.text3} },
                        tInc>=+incGoal
                          ? (lang==="en"?"🎉 Goal reached!":"🎉 目标达成！")
                          : (lang==="en"?"Still need: ":"还差: ")+fmt(+incGoal-tInc)+" ("+Math.round(tInc/+incGoal*100)+"%)"
                      )
                    )
                  : React.createElement('button', { onClick: function(){setShowGoal(true);}, style: {width:"100%",background:C.bg3,border:"1px dashed #2A4A6A",borderRadius:10,padding:"8px 14px",color:C.text3,fontSize:12,cursor:"pointer",marginBottom:14,textAlign:"left"} }, "🎯 " , lang==="en"?"Set monthly goal...":"设定本月收入目标...")
              ) : null
            , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14} }
              , React.createElement('button', { onClick: function(){setStf({month:mo,platform:"Uber",grossFare:"",tips:"",bonus:"",tollReimbursed:"",otherIncome:"",platformFee:"",trips:"",onlineHours:"",miles:"",notes:""});setSf("stmt");}, style: {background:"linear-gradient(135deg, "+C.bg3+", "+C.bg2+")",border:"1px solid "+C.border,borderRadius:RADIUS.md,padding:"12px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:10,textAlign:"left",boxShadow:SHADOW.sm,transition:"all 0.15s"} }
                , React.createElement('div', { style: {fontSize:24,flexShrink:0} }, "💵")
                , React.createElement('div', { style: {flex:1,minWidth:0} }
                  , React.createElement('div', { style: {fontSize:FS.md+1,fontWeight:700,color:C.text,lineHeight:1.2} }, T.monthly)
                  , React.createElement('div', { style: {fontSize:FS.xs+1,color:C.text3,marginTop:2,letterSpacing:0.3} }, "Uber/Lyft")
                )
              )
              , React.createElement('button', { onClick: function(){setSf("week_cal");}, style: {background:"linear-gradient(135deg, "+C.bg3+", "+C.bg2+")",border:"1px solid "+C.border,borderRadius:RADIUS.md,padding:"12px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:10,textAlign:"left",boxShadow:SHADOW.sm,transition:"all 0.15s"} }
                , React.createElement('div', { style: {fontSize:24,flexShrink:0} }, "📅")
                , React.createElement('div', { style: {flex:1,minWidth:0} }
                  , React.createElement('div', { style: {fontSize:FS.md+1,fontWeight:700,color:C.success,lineHeight:1.2} }, T.weekly)
                  , React.createElement('div', { style: {fontSize:FS.xs+1,color:C.text3,marginTop:2,letterSpacing:0.3} }, T.trips, " · ", T.miles)
                )
              )
            )
            , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:8} }
              , React.createElement('button', { onClick: function(){setPasteUberTaxText("");setPasteUberTaxResult(null);setShowPasteUberTax(true);}, style: {background:"linear-gradient(135deg, rgba(255,179,0,0.08), rgba(40,28,0,0.6))",border:"1px solid rgba(255,179,0,0.3)",borderRadius:RADIUS.md,padding:"10px 12px",color:"#FFB300",fontSize:FS.md,fontWeight:600,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all 0.15s"} }
                , React.createElement('span', null, "📊 " , lang==="en"?"Paste month/yr":"粘贴月/年报")
                , React.createElement('span', {style:{color:"#9A7A40",fontSize:14}}, "→")
              )
              , React.createElement('button', { onClick: function(){setPasteUberText("");setPasteUberResult(null);setShowPasteUber(true);}, style: {background:"linear-gradient(135deg, rgba(90,172,255,0.08), rgba(10,30,60,0.6))",border:"1px solid rgba(90,172,255,0.3)",borderRadius:RADIUS.md,padding:"10px 12px",color:C.accent2,fontSize:FS.md,fontWeight:600,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all 0.15s"} }
                , React.createElement('span', null, "📄 " , lang==="en"?"Paste weekly":"粘贴周报")
                , React.createElement('span', {style:{color:"#3A6080",fontSize:14}}, "→")
              )
            )
            // PDF file picker — auto-extracts text and routes to the right parser
            , React.createElement('div', {style:{marginBottom:8}}
              , React.createElement('label', {style:{display:"block",background:"linear-gradient(135deg, rgba(0,212,255,0.06), rgba(10,30,55,0.7))",border:"1px dashed rgba(0,212,255,0.4)",borderRadius:RADIUS.md,padding:"12px 14px",cursor:"pointer",fontSize:FS.md,fontWeight:700,color:C.accent2,textAlign:"center",transition:"all 0.15s"}}
                , React.createElement('input', {
                    type:"file",
                    accept:"application/pdf,.pdf",
                    style:{display:"none"},
                    onChange: function(e){
                      var f = e.target.files && e.target.files[0];
                      if(!f) return;
                      e.target.value = ""; // allow re-selecting same file
                      if(!window.pdfjsLib){
                        showToast(lang==="en"?"PDF library not ready, try refresh":"PDF 库未就绪，请刷新", "error");
                        return;
                      }
                      showToast(lang==="en"?"📄 Reading PDF...":"📄 读取 PDF 中...", "info");
                      extractPdfText(f).then(function(text){
                        if(!text || text.length < 50){
                          showToast(lang==="en"?"PDF appears empty":"PDF 看起来是空的", "error");
                          return;
                        }
                        // Auto-detect: tax summary vs weekly statement
                        var isTaxSummary = /1099-?K|1099-?NEC|Tax Summary|Annual Summary|Tax year/i.test(text);
                        var isWeekly = /Earnings Statement|Statement Period|Week of|weekly/i.test(text) && !isTaxSummary;
                        if(isTaxSummary){
                          setPasteUberTaxText(text);
                          var r=parseUberTaxSummary(text);
                          setPasteUberTaxResult(r);
                          setShowPasteUberTax(true);
                          var toastMsg = r && r.isMonthly
                            ? (lang==="en"?"✓ Monthly summary detected":"✓ 识别为月度账单")
                            : (lang==="en"?"✓ Tax summary detected":"✓ 识别为税务汇总");
                          showToast(toastMsg, "success");
                        } else if(isWeekly){
                          setPasteUberText(text);
                          var r2=parseUberStatement(text);
                          setPasteUberResult(r2);
                          setShowPasteUber(true);
                          showToast(lang==="en"?"✓ Weekly statement detected":"✓ 识别为周报", "success");
                        } else {
                          // Fallback: show extracted text in tax-summary modal so user can decide
                          setPasteUberTaxText(text);
                          setShowPasteUberTax(true);
                          showToast(lang==="en"?"⚠️ Couldn't auto-detect, please check":"⚠️ 无法自动识别，请检查", "warn");
                        }
                      }).catch(function(err){
                        showToast(lang==="en"?"PDF read failed: "+err.message:"PDF 读取失败: "+err.message, "error");
                      });
                    }
                  })
                , "📥 ", lang==="en"?"Pick Uber PDF (auto-detect)":"选 Uber PDF（自动识别）"
              )
            )
            , (function(){
              var isMonth=incV==="month";
              var vInc=isMonth?tInc:yInc;
              var vGross=isMonth?tGross:yStmts.reduce(function(s,x){return s+(+x.grossFare||0);},0)+yDailies.reduce(function(s,d){return s+(+d.cash||0)+(+d.card||0);},0);
              var vTips=isMonth?tTips:yStmts.reduce(function(s,x){return s+(+x.tips||0);},0)+yDailies.reduce(function(s,d){return s+(+d.tips||0);},0);
              var vBonus=isMonth?tBonus:yStmts.reduce(function(s,x){return s+(+x.bonus||0);},0);
              var vToll=isMonth?tToll:yStmts.reduce(function(s,x){return s+(+x.tollReimbursed||0);},0)+yDailies.reduce(function(s,d){return s+(d.mode==="rideshare"?(+d.tollReimbursed||0):0);},0);
              // Per Uber PDF: Gross Payment already includes toll. Don't double-count.
              // tInc / yInc = grossFare + tips + bonus = Uber's "Gross Payment". Use that as 总营业额.
              var vGrossTotal = vInc;
              // Mode breakdown — rideshare comes from sl + dl(rideshare), taxi comes from dl(taxi only)
              // (Don't include tollReimbursed here either — it's pass-through, already in grossFare per Uber PDF.)
              var rsStmtInc = isMonth?mStmts.reduce(function(s,x){return s+(+x.grossFare||0)+(+x.tips||0)+(+x.bonus||0)+(+x.otherIncome||0);},0):yStmts.reduce(function(s,x){return s+(+x.grossFare||0)+(+x.tips||0)+(+x.bonus||0)+(+x.otherIncome||0);},0);
              var dlSrc = isMonth ? mDailies : yDailies;
              var rsDlInc = dlSrc.reduce(function(s,d){return d.mode==="rideshare" ? s+(+d.grossFare||0)+(+d.tips||0)+(+d.bonus||0) : s;},0);
              var rsInc = rsStmtInc + rsDlInc;
              // Taxi: only entries WITHOUT mode==="rideshare" (legacy taxi-mode entries)
              var txInc = dlSrc.reduce(function(s,d){return d.mode!=="rideshare" ? s+(+d.cash||0)+(+d.card||0)+(+d.tips||0) : s;},0);
              var txLease = dlSrc.reduce(function(s,d){return d.mode!=="rideshare" ? s+(+d.lease||0) : s;},0);
              // Data source counts
              var slCnt=isMonth?mStmts.length:yStmts.length;
              var wlCnt=isMonth?mWeeks.length:yWeeks.length;
              var dlCnt=isMonth?mDailies.length:yDailies.length;
              if(vInc<=0)return null;
              return React.createElement('div', { style: {marginBottom:14,padding:"16px 18px",background:"linear-gradient(135deg, rgba(0,212,255,0.06), "+C.bg2+" 60%)",border:"1px solid "+C.border,borderRadius:RADIUS.lg,boxShadow:SHADOW.md,position:"relative",overflow:"hidden"} }

                , React.createElement('div', { style: {fontSize:FS.xs+1,color:C.text3,marginBottom:4,letterSpacing:0.8,textTransform:"uppercase",fontWeight:600,position:"relative"} }, T.totalIncome)
                , React.createElement('div', { style: {fontSize:FS.xxl,fontWeight:900,color:C.text,marginBottom:10,letterSpacing:-0.8,fontVariantNumeric:"tabular-nums",position:"relative"} }, fmt(vGrossTotal))
                // Mode breakdown row — only show when BOTH modes have data
                , (rsInc>0 && txInc>0) ? React.createElement('div', { style: {display:"flex",gap:10,fontSize:FS.md,marginBottom:10,padding:"8px 12px",background:C.bg4,borderRadius:RADIUS.sm,border:"1px solid "+C.border,position:"relative"} }
                    , React.createElement('span', null, "📱 " , lang==="en"?"Rideshare":"网约车" , " ", React.createElement('b',{style:{color:C.accent2}}, fmt(rsInc)))
                    , React.createElement('span', null, "🚖 " , lang==="en"?"Taxi":"出租车" , " ", React.createElement('b',{style:{color:"#FFB300"}}, fmt(txInc-txLease)))
                  ) : null
                // Per-platform breakdown — only show when 2+ platforms have stmts
                , (function(){
                    var stmtsToUse = isMonth ? mStmts : yStmts;
                    var platTotals = {};
                    stmtsToUse.forEach(function(x){
                      var p = x.platform || "Unknown";
                      // Toll is pass-through and (per Uber PDF) already included in Gross Payment.
                      // Don't add tollReimbursed here.
                      var amt = (+x.grossFare||0)+(+x.tips||0)+(+x.bonus||0)+(+x.otherIncome||0);
                      platTotals[p] = (platTotals[p]||0) + amt;
                    });
                    var platEntries = Object.entries(platTotals).filter(function(e){return e[1]>0;}).sort(function(a,b){return b[1]-a[1];});
                    if(platEntries.length < 2) return null;  // only show if 2+ platforms
                    var totalP = platEntries.reduce(function(s,e){return s+e[1];},0);
                    var colors = [C.accent2,"#FF9A65","#5ADA7A","#CC88FF",C.gold,"#FF6090"];
                    return React.createElement('div', {style:{marginBottom:10,padding:"8px 12px",background:C.bg4,borderRadius:RADIUS.sm,border:"1px solid "+C.border,position:"relative"}}
                      , React.createElement('div', {style:{fontSize:FS.xs,color:C.text3,marginBottom:6,letterSpacing:0.8,textTransform:"uppercase",fontWeight:600}}, "🏢 " , lang==="en"?"By Platform":"按平台")
                      , platEntries.map(function(en,i){
                          var pct = totalP>0 ? Math.round(en[1]/totalP*100) : 0;
                          var col = colors[i%colors.length];
                          return React.createElement('div', {key:en[0],style:{display:"flex",alignItems:"center",gap:8,fontSize:FS.md,marginBottom:i<platEntries.length-1?4:0}}
                            , React.createElement('div', {style:{width:10,height:10,borderRadius:3,background:col,flexShrink:0,boxShadow:"0 0 8px "+col+"60"}})
                            , React.createElement('span', {style:{flex:1,color:C.text2,fontWeight:500}}, en[0])
                            , React.createElement('span', {style:{color:C.text3,minWidth:36,textAlign:"right",fontSize:FS.sm+1}}, pct+"%")
                            , React.createElement('span', {style:{color:col,fontWeight:700,minWidth:68,textAlign:"right",fontVariantNumeric:"tabular-nums"}}, fmt(en[1]))
                          );
                        })
                    );
                  }())
                // Gross/Tips/Bonus row (toll moved out — it's pass-through, shown on dashboard)
                , React.createElement('div', { style: {display:"flex",gap:14,fontSize:FS.md,marginBottom:8,flexWrap:"wrap",position:"relative"} }
                    , React.createElement('span', { style: {color:C.text2} }, (lang==="en"?"Gross ":"总车费 ") , React.createElement('b',{style:{color:C.text}},fmt(vGross)))
                    , React.createElement('span', { style: {color:C.text2} }, T.tips, " " , React.createElement('b',{style:{color:C.success}},fmt(vTips)))
                    , vBonus>0 ? React.createElement('span', { style: {color:C.text2} }, T.bonus, " " , React.createElement('b',{style:{color:C.gold}},fmt(vBonus))) : null
                  )
                // Data source counts (small dim text)
                , React.createElement('div', { style: {fontSize:11,color:C.text3,letterSpacing:0.3} }
                    , (lang==="en"?"From: ":"数据：")
                    , slCnt>0 ? "sl " + slCnt + " " + (lang==="en"?"stmts":"月报") : null
                    , (slCnt>0 && wlCnt>0) ? " · " : null
                    , wlCnt>0 ? "wl " + wlCnt + " " + (lang==="en"?"weeks":"周记") : null
                    , ((slCnt>0||wlCnt>0) && dlCnt>0) ? " · " : null
                    , dlCnt>0 ? "dl " + dlCnt + " " + (lang==="en"?"days":"日记") : null
                  )
              );
            }())
            , (function(){var vS=incV==="month"?mStmts:yStmts; return vS.length > 0 ? React.createElement('div', { style: {marginBottom:16} }, React.createElement('div', { style: {fontSize:FS.xs+1,color:C.text3,letterSpacing:1.2,marginBottom:10,textTransform:"uppercase",fontWeight:600} }, "💵 " , T.monthly), vS.slice().sort(function(a,b){return (b.month||"").localeCompare(a.month||"");}).map(function(s){var total=(+s.grossFare||0)+(+s.tips||0)+(+s.bonus||0)+(+s.otherIncome||0);return React.createElement('div', { key: s.id, style:{background:C.bg2,borderRadius:RADIUS.md,padding:"12px 14px",marginBottom:8,border:"1px solid "+C.border,boxShadow:SHADOW.sm,transition:"all 0.15s",cursor:"pointer"}, onClick: function(){setStf(Object.assign({trips:"",onlineHours:"",miles:"",notes:""},s));setSf("stmt");}}, React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center"}}, React.createElement('div', {style:{flex:1,minWidth:0}}, React.createElement('div', { style: {fontSize:FS.lg,fontWeight:700,marginBottom:4,color:C.text}}, s.platform, " · "  , s.month), React.createElement('div', { style: {fontSize:FS.xl,color:C.success,fontWeight:800,letterSpacing:-0.3,fontVariantNumeric:"tabular-nums",marginBottom:6}}, fmt(total)), React.createElement('div', { style: {display:"flex",gap:6,flexWrap:"wrap"}}, s.trips?React.createElement('span', { style: {fontSize:FS.sm+1,background:C.bg4,border:"1px solid "+C.border,borderRadius:6,padding:"3px 9px",color:C.text2,fontWeight:600}}, s.trips, " " , T.trips):null, s.onlineHours?React.createElement('span', { style: {fontSize:FS.sm+1,background:C.bg4,border:"1px solid "+C.border,borderRadius:6,padding:"3px 9px",color:C.text2,fontWeight:600}}, s.onlineHours, "h"):null, s.miles?React.createElement('span', { style: {fontSize:FS.sm+1,background:C.bg4,border:"1px solid "+C.border,borderRadius:6,padding:"3px 9px",color:C.text2,fontWeight:600}}, s.miles, "mi"):null))));}), " " ) : null;}())
            , (function(){var vW=incV==="month"?mWeeks:yWeeks; return vW.length > 0 ? React.createElement('div', {}, (function(){var tw=vW.reduce(function(s,w){return {trips:s.trips+(+w.trips||0),hours:s.hours+(+w.hours||0),miles:s.miles+(+w.miles||0)};},{trips:0,hours:0,miles:0});if(!tw.trips&&!tw.hours)return null;return React.createElement('div', { style: {background:"linear-gradient(135deg, "+C.bg3+", "+C.bg2+")",border:"1px solid "+C.border,borderRadius:RADIUS.md,marginBottom:10,padding:"14px 16px",boxShadow:SHADOW.sm}}, React.createElement('div', { style: {display:"flex",justifyContent:"space-around",alignItems:"center"}}, tw.trips?React.createElement('div', { style: {textAlign:"center"}}, React.createElement('div', { style: {fontSize:FS.xs+1,color:C.text3,marginBottom:3,letterSpacing:0.5,fontWeight:600,textTransform:"uppercase"}}, T.trips), React.createElement('div', { style: {fontSize:FS.xl,fontWeight:800,color:C.success,letterSpacing:-0.2}}, tw.trips)):null, tw.hours?React.createElement('div', { style: {textAlign:"center"}}, React.createElement('div', { style: {fontSize:FS.xs+1,color:C.text3,marginBottom:3,letterSpacing:0.5,fontWeight:600,textTransform:"uppercase"}}, lang==="en"?"Hours":"时长"), React.createElement('div', { style: {fontSize:FS.xl,fontWeight:800,color:C.accent,letterSpacing:-0.2}}, tw.hours, "h")):null, tw.miles?React.createElement('div', { style: {textAlign:"center"}}, React.createElement('div', { style: {fontSize:FS.xs+1,color:C.text3,marginBottom:3,letterSpacing:0.5,fontWeight:600,textTransform:"uppercase"}}, T.miles), React.createElement('div', { style: {fontSize:FS.xl,fontWeight:800,color:C.gold,letterSpacing:-0.2}}, tw.miles)):null, tw.hours>0&&tInc>0?React.createElement('div', { style: {textAlign:"center"}}, React.createElement('div', { style: {fontSize:FS.xs+1,color:C.text3,marginBottom:3,letterSpacing:0.5,fontWeight:600,textTransform:"uppercase"}}, T.hourlyRate), React.createElement('div', { style: {fontSize:FS.xl,fontWeight:800,color:"#FF9A65",letterSpacing:-0.2}}, fmt(Math.round(tInc/tw.hours*100)/100))):null));}()), " " , React.createElement('div', { style: {fontSize:FS.xs+1,color:C.text3,letterSpacing:1.2,marginBottom:10,textTransform:"uppercase",fontWeight:600}}, "📅 " , T.weekly), vW.slice().sort(function(a,b){return b.weekStart.localeCompare(a.weekStart);}).map(function(w){return React.createElement('div', { key: w.id, style:{background:C.bg2,borderRadius:RADIUS.md,padding:"12px 14px",marginBottom:8,border:"1px solid "+C.border,boxShadow:SHADOW.sm,cursor:"pointer",transition:"all 0.15s"}, onClick: function(){setWf(Object.assign({},w));setSf("week");}}, React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}, React.createElement('div', { style: {flex:1,minWidth:0}}, React.createElement('div', { style: {fontSize:FS.lg,fontWeight:700,color:C.success,marginBottom:4}}, wkLabel(w.weekStart)), React.createElement('div', { style: {fontSize:FS.md+1,color:C.text2,marginBottom:6,fontWeight:500}}, w.platform), (function(){var winc=(+w.grossFare||0)+(+w.tips||0)+(+w.bonus||0)+(+w.tollReimbursed||0);if(winc>0)return React.createElement('div', { style: {fontSize:FS.xl,fontWeight:800,color:C.accent,marginBottom:6,letterSpacing:-0.3,fontVariantNumeric:"tabular-nums"}}, "💵 " , fmt(winc));return null;}()), React.createElement('div', { style: {display:"flex",gap:6,flexWrap:"wrap"}}, w.trips?React.createElement('span', { style: {fontSize:FS.sm+1,background:C.bg4,border:"1px solid "+C.border,borderRadius:6,padding:"3px 9px",color:C.text2,fontWeight:600}}, w.trips, " " , T.trips):null, w.hours?React.createElement('span', { style: {fontSize:FS.sm+1,background:C.bg4,border:"1px solid "+C.border,borderRadius:6,padding:"3px 9px",color:C.text2,fontWeight:600}}, w.hours, "h"):null, w.miles?React.createElement('span', { style: {fontSize:FS.sm+1,background:C.bg4,border:"1px solid "+C.border,borderRadius:6,padding:"3px 9px",color:C.text2,fontWeight:600}}, w.miles, "mi"):null))));}), " " ) : null;}())
            , (function(){
                var hasStmts = incV==="month" ? mStmts.length>0 : yStmts.length>0;
                var hasWeeks = incV==="month" ? mWeeks.length>0 : yWeeks.length>0;
                var dailySrc = incV==="month" ? mDailies : yDailies;
                var hasRide = dailySrc.some(function(d){return d.mode==="rideshare";});
                return (!hasStmts && !hasWeeks && !hasRide) ? React.createElement(Empty, { text: T.noData } ) : null;
              }())
            , null
          )
          )
        ) : null

        , tab===2 ? (
          React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 342}}
            , React.createElement(SegBtn, { val: expV, set: setExpV, opts: [["month",T.thisMonth],["year",T.thisYear]], __self: this, __source: {fileName: _jsxFileName, lineNumber: 343}} )

            // Fuelio PDF file picker — for charging/fuel/parking historical import
            , React.createElement('div', {style:{marginBottom:8,marginTop:10}}
              , React.createElement('label', {style:{display:"block",background:"linear-gradient(135deg, rgba(0,230,118,0.06), rgba(10,30,15,0.7))",border:"1px dashed rgba(0,230,118,0.4)",borderRadius:RADIUS.md,padding:"12px 14px",cursor:"pointer",fontSize:FS.md,fontWeight:700,color:"#90D080",textAlign:"center",transition:"all 0.15s"}}
                , React.createElement('input', {
                    type:"file",
                    accept:"application/pdf,.pdf",
                    style:{display:"none"},
                    onChange: function(e){
                      var f = e.target.files && e.target.files[0];
                      if(!f) return;
                      e.target.value = "";
                      if(!window.pdfjsLib){
                        showToast(lang==="en"?"PDF library not ready, try refresh":"PDF 库未就绪，请刷新", "error");
                        return;
                      }
                      showToast(lang==="en"?"📄 Reading Fuelio PDF...":"📄 读取 Fuelio PDF 中...", "info");
                      extractPdfText(f).then(function(text){
                        // === Debug capture: save what the parser saw, even if it fails ===
                        // Helps diagnose "I imported but nothing showed up" issues. Cleared on next import.
                        try{
                          var dbg = {
                            ts: new Date().toISOString(),
                            fileName: f.name || "unknown",
                            fileSize: f.size || 0,
                            textLen: text ? text.length : 0,
                            textHead: text ? text.slice(0, 600) : "",
                            textTail: text ? text.slice(-400) : ""
                          };
                          localStorage.setItem("nyc_debug_fuelio_pdf", JSON.stringify(dbg));
                        }catch(e){}
                        var r = parseFuelioReport(text);
                        // Update debug with parse result
                        try{
                          var dbg2 = JSON.parse(localStorage.getItem("nyc_debug_fuelio_pdf") || "{}");
                          dbg2.parseError = r.error || null;
                          dbg2.parseEntryCount = r.entries ? r.entries.length : 0;
                          dbg2.parsePeriod = r.period || "";
                          dbg2.parseIsEv = !!r.isEv;
                          dbg2.parseStats = r.stats || null;
                          if(r.entries && r.entries.length > 0){
                            // Sort by date for sample
                            var sorted = r.entries.slice().sort(function(a,b){return (a.date||"").localeCompare(b.date||"");});
                            dbg2.parseFirst = sorted[0];
                            dbg2.parseLast = sorted[sorted.length-1];
                            // Date range
                            dbg2.dateRange = sorted[0].date + " → " + sorted[sorted.length-1].date;
                          }
                          localStorage.setItem("nyc_debug_fuelio_pdf", JSON.stringify(dbg2));
                        }catch(e){}
                        if(r.error || !r.entries || r.entries.length === 0){
                          showToast(lang==="en"?"No entries found — check 🔍 diagnostic for details":"没找到记录 — 看 🔍 诊断按钮查原因", "error");
                          return;
                        }
                        var sel = {};
                        r.entries.forEach(function(_,i){sel[i]=true;});
                        setFuelioSelected(sel);
                        setFuelioImportResult(r);
                        setShowFuelioImport(true);
                        // Build category summary for toast
                        var catSummary = Object.entries(r.stats.byCategory||{}).map(function(kv){
                          var c = allC[kv[0]];
                          var lbl = c ? c.label : kv[0];
                          var count = r.entries.filter(function(e){return e.category===kv[0];}).length;
                          return lbl+":"+count;
                        }).join(" · ");
                        showToast(lang==="en"?
                          ("✓ "+r.entries.length+" total | "+catSummary):
                          ("✓ 共"+r.entries.length+"条 | "+catSummary),
                          "success");
                      }).catch(function(err){
                        try{
                          var dbgErr = JSON.parse(localStorage.getItem("nyc_debug_fuelio_pdf") || "{}");
                          dbgErr.extractError = err.message || String(err);
                          localStorage.setItem("nyc_debug_fuelio_pdf", JSON.stringify(dbgErr));
                        }catch(e){}
                        showToast(lang==="en"?"PDF read failed: "+err.message:"PDF 读取失败: "+err.message, "error");
                      });
                    }
                  })
                , "📥 ", lang==="en"?"Pick Fuelio PDF (all expenses)":"选 Fuelio PDF（所有支出）"
              )
            )
            // Fuelio CSV file picker — multi-file, full data import (charging + all expenses)
            , React.createElement('div', {style:{marginBottom:12}}
              , React.createElement('label', {style:{display:"block",background:"linear-gradient(135deg, rgba(48,160,112,0.1), rgba(0,30,20,0.8))",border:"1px dashed rgba(48,160,112,0.5)",borderRadius:RADIUS.md,padding:"12px 14px",cursor:"pointer",fontSize:FS.md,fontWeight:700,color:"#5ADAB0",textAlign:"center",transition:"all 0.15s"}}
                , React.createElement('input', {
                    type:"file",
                    accept:".csv,text/csv",
                    multiple: true,
                    style:{display:"none"},
                    onChange: function(e){
                      var files = e.target.files;
                      if(!files || files.length === 0) return;
                      e.target.value = "";
                      if(!window.XLSX){
                        showToast(lang==="en"?"CSV library not ready, refresh":"CSV 库未就绪，请刷新", "error");
                        return;
                      }
                      showToast(lang==="en"?"📄 Reading "+files.length+" file(s)...":"📄 读取 "+files.length+" 份文件中...", "info");
                      var allEntries = [];
                      var fileResults = [];
                      var promises = [];
                      for(var fi=0; fi<files.length; fi++){
                        (function(f){
                          var p = new Promise(function(resolve){
                            var reader = new FileReader();
                            reader.onload = function(ev){
                              try{
                                var r = parseFuelioCSV(ev.target.result);
                                fileResults.push({name:f.name, entries:r.entries.length, isEv:r.isEv, vehicle:r.vehicleName});
                                allEntries = allEntries.concat(r.entries);
                                resolve();
                              }catch(err){
                                fileResults.push({name:f.name, error:err.message});
                                resolve();
                              }
                            };
                            reader.onerror = function(){
                              fileResults.push({name:f.name, error:"read failed"});
                              resolve();
                            };
                            reader.readAsText(f);
                          });
                          promises.push(p);
                        })(files[fi]);
                      }
                      Promise.all(promises).then(function(){
                        if(allEntries.length === 0){
                          showToast(lang==="en"?"No entries found":"没找到记录","error");
                          return;
                        }
                        var seen = {};
                        var deduped = [];
                        var dupCount = 0;
                        allEntries.forEach(function(e){
                          var key = e.date+"|"+e.category+"|"+e.amount.toFixed(2)+"|"+(e.odometer||0);
                          if(seen[key]){ dupCount++; return; }
                          seen[key] = true;
                          deduped.push(e);
                        });
                        deduped.sort(function(a,b){return (b.date||"").localeCompare(a.date||"");});
                        var totalCost = deduped.reduce(function(s,e){return s+e.amount;},0);
                        var byCategory = {};
                        deduped.forEach(function(e){byCategory[e.category]=(byCategory[e.category]||0)+e.amount;});
                        var period = deduped.length ? (deduped[deduped.length-1].date.slice(0,7)+" → "+deduped[0].date.slice(0,7)) : "";
                        var hasEv = fileResults.some(function(r){return r.isEv;});
                        var fileSummary = fileResults.map(function(r){return r.name+": "+(r.error?"❌ "+r.error:r.entries+" 条");}).join(" · ");
                        var sel = {};
                        deduped.forEach(function(_,i){sel[i]=true;});
                        setFuelioSelected(sel);
                        setFuelioImportResult({
                          isEv: hasEv,
                          period: period,
                          entries: deduped,
                          stats: {count: deduped.length, totalCost: totalCost, byCategory: byCategory},
                          error: null,
                          fileSummary: fileSummary,
                          dupRemoved: dupCount,
                          fileCount: files.length
                        });
                        setShowFuelioImport(true);
                        showToast(lang==="en"?
                          ("✓ "+deduped.length+" entries (dedup -"+dupCount+")"):
                          ("✓ "+deduped.length+" 条记录（去重 -"+dupCount+"）"), "success");
                      });
                    }
                  })
                , "📥 ", lang==="en"?"Pick Fuelio CSV (multi-file)":"选 Fuelio CSV（可多选）"
                , React.createElement('div', {style:{fontSize:10,marginTop:4,color:"#3AAA80"}}, lang==="en"?"All expenses, charging, all years — auto-dedup":"全部支出、充电、多年 — 自动去重")
              )
            )

            // === Diagnostic: scan all el entries (helps locate missing imports) ===
            , React.createElement('button', {
                onClick: function(){ setShowElDiag(true); },
                style: {display:"block",width:"100%",background:"linear-gradient(135deg, rgba(255,179,0,0.06), rgba(40,28,0,0.5))",border:"1px dashed rgba(255,179,0,0.35)",borderRadius:RADIUS.md,padding:"10px 14px",cursor:"pointer",fontSize:FS.sm,fontWeight:700,color:"#FFB300",textAlign:"center",marginBottom:10}
              }, "🔍 ", lang==="en"?("Scan all expenses ("+el.length+")"):("扫描全部支出（"+el.length+" 条）"))

            // === SEARCH + CATEGORY FILTER ===
            , (function(){
                var hasSearch=expSearch&&expSearch.trim();
                var hasFilter=expFilterCat&&expFilterCat.length>0;
                // Build list of distinct categories present in current view (month or year scope)
                var sourceList=expV==="year"?yAllExps():feAll;
                var catCount={};
                sourceList.forEach(function(e){var k=e.isFixed?("__fixed_"+(e.fixedLabel||"")):e.category;catCount[k]=(catCount[k]||0)+1;});
                var sortedCats=Object.keys(catCount).sort(function(a,b){return catCount[b]-catCount[a];}).slice(0,8);
                return React.createElement('div',{style:{marginBottom:10}},
                  React.createElement('div',{style:{position:"relative",marginBottom:hasFilter||sortedCats.length>0?8:0}},
                    React.createElement('input',{
                      type:"text",
                      value:expSearch,
                      onChange:function(e){setExpSearch(e.target.value);},
                      placeholder:lang==="en"?"🔍 Search notes, category…":"🔍 搜索备注、类别…",
                      style:Object.assign({},IS,{paddingLeft:14,paddingRight:hasSearch?40:14})
                    }),
                    hasSearch?React.createElement('button',{onClick:function(){setExpSearch("");},style:{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:C.text3,fontSize:18,cursor:"pointer",padding:"0 6px"}},"✕"):null
                  ),
                  // Category filter chips: Clear button is FIXED on the left (outside scroll area), chips scroll horizontally
                  sortedCats.length>0?React.createElement('div',{style:{display:"flex",gap:6,alignItems:"center",paddingBottom:2}},
                    // Fixed Clear button — only shown when something is filtered (hidden when nothing selected to save space)
                    hasFilter ? React.createElement('button',{
                      onClick: function(){setExpFilterCat([]);},
                      style:{
                        flexShrink:0,
                        background:"rgba(255,82,82,0.12)",
                        border:"1px solid rgba(255,82,82,0.3)",
                        color:C.danger,
                        fontSize:FS.sm+1,
                        padding:"6px 12px",
                        borderRadius:18,
                        cursor:"pointer",
                        whiteSpace:"nowrap",
                        fontWeight:600,
                        transition:"all 0.15s"
                      }
                    }, lang==="en"?"× Clear":"× 清除") : null,
                    // Scrollable chips area
                    React.createElement('div',{style:{display:"flex",gap:6,overflowX:"auto",WebkitOverflowScrolling:"touch",flex:1,minWidth:0}},
                    sortedCats.map(function(k){
                      var isFixed=k.indexOf("__fixed_")===0;
                      var label=isFixed?k.slice(8):(allC[k]?allC[k].label:k);
                      var icon=isFixed?"💼":(allC[k]?allC[k].icon:"📌");
                      var sel=expFilterCat.indexOf(k)>=0;
                      return React.createElement('button',{
                        key:k,
                        onClick:function(){
                          if(sel)setExpFilterCat(expFilterCat.filter(function(x){return x!==k;}));
                          else setExpFilterCat(expFilterCat.concat([k]));
                        },
                        style:{flexShrink:0,background:sel?"linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,85,255,0.08))":C.bg2,border:"1px solid "+(sel?"rgba(0,212,255,0.4)":C.border),color:sel?C.accent:C.text2,fontSize:FS.sm+1,padding:"6px 12px",borderRadius:18,cursor:"pointer",whiteSpace:"nowrap",fontWeight:sel?700:500,transition:"all 0.15s",boxShadow:sel?"0 0 12px rgba(0,212,255,0.15)":"none",letterSpacing:0.2}
                      },icon," ",label," ",React.createElement('span',{style:{opacity:0.6,fontSize:FS.xs+1,marginLeft:2}},catCount[k]));
                    })
                    )
                  ):null
                );
              }())
            // Helper: filter list by search + category
            , (function(){
                window.__filterExp=function(list){
                  var q=(expSearch||"").trim().toLowerCase();
                  return list.filter(function(e){
                    if(expFilterCat.length>0){
                      var k=e.isFixed?("__fixed_"+(e.fixedLabel||"")):e.category;
                      if(expFilterCat.indexOf(k)<0)return false;
                    }
                    if(q){
                      var hay=((e.notes||"")+" "+(e.fixedLabel||"")+" "+(allC[e.category]?allC[e.category].label:"")+" "+(e.amount||"")).toLowerCase();
                      if(hay.indexOf(q)<0)return false;
                    }
                    return true;
                  });
                };
                return null;
              }())


            , expV==="month" ? (
              React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 345}}
                , React.createElement(MoNav, { val: mo, set: setMo, lang: lang, onPick: function(){setMpState({value:mo,onChange:function(v){setMo(v);}});}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 346}} )
                , fixMo.length > 0 ? React.createElement(Card, { style: {background:"#0D1E10",border:"1px solid #1A3A20",display:"flex",justifyContent:"space-between",alignItems:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 347}}, React.createElement('span', { style: {fontSize:14,color:"#5ADA7A",fontWeight:700}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 347}}, T.fixedFees+" "+fixMo.length), React.createElement('span', { style: {fontSize:14,fontWeight:700,color:"#FF9A65"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 347}}, "-", fmt(tFix))) : null
                , React.createElement(Card, { style: {display:"flex",justifyContent:"space-between"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 348}}, React.createElement('span', { style: {fontSize:14,color:C.text2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 348}}, T.totalExpense), React.createElement('span', { style: {fontSize:18,fontWeight:800,color:C.danger}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 348}}, fmt(tExp)))
                , React.createElement(BucketList, { items: window.__filterExp?window.__filterExp(feAll):feAll, allC: allC, lang: lang, el: el, setEl: setEl, allEl: el, forceRerender: forceRerender, showUndo: showUndo, emptyText: (expSearch||expFilterCat.length>0)?(lang==="en"?"No matching expenses":"无匹配的支出"):T.noData, onEditFixed: function(item){setEditFx({id:item.id,amount:item.amount,notes:item.notes||"",fixedLabel:item.fixedLabel});}, onEditExp: function(item){var _i=Object.assign({},item,{qty:item.qty||"",isRecurring:false});if((item.category==="fuel"||item.category==="charging")&&item.amount&&item.qty&&+item.qty>0){_i.unitPrice=(+item.amount/+item.qty).toFixed(3);_i._editOrder=["qty","amount"];}setEf(_i);setSf("exp_edit_"+item.id);}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 349}} )
              )
            ) : null
            , expV==="year" ? (
              React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 353}}
                , React.createElement(YrNav, { val: yr, set: setYr, lang: lang, onPick: function(){setYpState({value:yr,onChange:function(v){setYr(v);}});}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 354}} )
                , React.createElement(Card, { style: {display:"flex",justifyContent:"space-between",marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 355}}, React.createElement('span', { style: {fontSize:14,color:C.text2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 355}}, T.totalExpense), React.createElement('span', { style: {fontSize:18,fontWeight:800,color:C.danger}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 355}}, fmt(yExp)))
                , (function(){var allYE_raw=yAllExps(); var allYE=window.__filterExp?window.__filterExp(allYE_raw):allYE_raw; if(!allYE.length)return React.createElement(Empty, { text: (expSearch||expFilterCat.length>0)?(lang==="en"?"No matching expenses":"无匹配的支出"):T.noData, __self: this, __source: {fileName: _jsxFileName, lineNumber: 356}} );return React.createElement(BucketList, { items: allYE, allC: allC, lang: lang, el: el, setEl: setEl, allEl: el, forceRerender: forceRerender, showUndo: showUndo, emptyText: "", groupByMonth: true, onEditFixed: function(item){setEditFx({id:item.id,amount:item.amount,notes:item.notes||"",fixedLabel:item.fixedLabel});}, onEditExp: function(item){var _i=Object.assign({},item,{qty:item.qty||"",isRecurring:false});if((item.category==="fuel"||item.category==="charging")&&item.amount&&item.qty&&+item.qty>0){_i.unitPrice=(+item.amount/+item.qty).toFixed(3);_i._editOrder=["qty","amount"];}setEf(_i);setSf("exp_edit_"+item.id);}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 356}} );}())
                , Object.keys(cc).length > 0 ? React.createElement('div', { style: {marginTop:16}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 357}}, React.createElement('div', { style: {fontSize:14,fontWeight:700,color:C.text,marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 357}}, lang==="en"?"Custom Categories":"我的自定义类别"), Object.entries(cc).map(function(entry){var key=entry[0],cat=entry[1];return React.createElement(Card, { key: key, style: {display:"flex",alignItems:"center",gap:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 357}}, React.createElement('span', { style: {fontSize:22}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 357}}, cat.icon), React.createElement('div', { style: {flex:1}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 357}}, React.createElement('div', { style: {fontSize:14,fontWeight:600}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 357}}, cat.label), React.createElement('div', { style: {fontSize:12,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 357}}, cat.group)), React.createElement('button', { onClick: function(){setCf({label:cat.label,icon:cat.icon,group:cat.group,_editKey:key});setSf("cc");}, style: {background:"none",border:"1px solid "+C.border2,borderRadius:8,padding:"4px 10px",color:C.accent2,cursor:"pointer",fontSize:13}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 357}}, T.edit), React.createElement('button', { onClick: function(){confirmAction(lang==="en"?"Delete category?":"删除类别？", lang==="en"?"This category will be removed (with undo).":"此类别将被移除（可撤销）。", function(){var prev=Object.assign({},cc);var u=Object.assign({},cc);delete u[key];setCc(u);showUndo((lang==="en"?"✓ Category deleted":"✓ 类别已删除"), {prevCc:prev});});}, style: {background:"none",border:"1px solid #3A1A1A",borderRadius:8,padding:"4px 10px",color:C.danger,cursor:"pointer",fontSize:13}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 357}}, T.del));})) : null
                , React.createElement('div', { style: {marginTop:14,textAlign:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 358}}, React.createElement('button', { onClick: function(){setCf({label:"",icon:"&#128296;",group:"车辆"});setSf("cc");}, style: {background:C.border,border:"1px dashed #2A3A54",borderRadius:10,padding:"10px 18px",color:C.text2,fontSize:14,cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 358}}, "+ " , lang==="en"?"Custom Category":"新增自定义类别"))
              )
            ) : null
          )
        ) : null

        , tab===3 ? (
          React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 365}}
            , React.createElement(SegBtn, { val: repP, set: setRepP, opts: [["month",T.thisMonth],["year",T.thisYear]], __self: this, __source: {fileName: _jsxFileName, lineNumber: 366}} )
            , repP==="month" ? React.createElement(MoNav, { val: mo, set: setMo, lang: lang, onPick: function(){setMpState({value:mo,onChange:function(v){setMo(v);}});}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 367}} ) : React.createElement(YrNav, { val: yr, set: setYr, lang: lang, onPick: function(){setYpState({value:yr,onChange:function(v){setYr(v);}});}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 367}} )
            , React.createElement('div', { style: {display:"flex",gap:10,marginBottom:14}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 368}}
              , React.createElement('button', { onClick: function(){var period=repP,label=period==="month"?mo:yr,srcExps=period==="month"?feAll:yAllExps(),r=bldRep(period),catMap={};srcExps.forEach(function(item){var cat=allC[item.category],key=item.isFixed?"fx_"+item.fixedLabel:item.category,lbl=item.isFixed?item.fixedLabel:(cat?cat.label:"Other"),grp=cat?(cat.g||cat.group||"Other"):"Other";if(!catMap[key]){catMap[key]={label:lbl,group:grp,total:0,count:0};}catMap[key].total+=(+item.amount||0);catMap[key].count+=1;});var byGroup={"车辆":[],"牌照":[],"平台":[],"其他":[]};Object.values(catMap).forEach(function(c){var g=byGroup[c.group]?c.group:"其他";byGroup[g].push(c);});["车辆","牌照","平台","其他"].forEach(function(g){byGroup[g].sort(function(a,b){return b.total-a.total;});});var isYear=period==="year";setReportData({type:"summary",r:r,label:label,byGroup:byGroup,stmts:isYear?yStmts:mStmts,isYear:isYear,mData:isYear?mData:null});}, style: {flex:1,background:"linear-gradient(135deg, rgba(0,212,255,0.1), rgba(0,85,255,0.05))",border:"1px solid rgba(0,212,255,0.3)",borderRadius:RADIUS.md,padding:14,color:C.accent2,fontSize:FS.md+1,fontWeight:700,cursor:"pointer",boxShadow:SHADOW.sm,transition:"all 0.15s",letterSpacing:0.2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 369}}, "📊 " , T.report)
              , React.createElement('button', { onClick: function(){var period=repP,label=period==="month"?mo:yr,srcExps=period==="month"?feAll:yAllExps();var catMap={};srcExps.forEach(function(item){var cat=allC[item.category],key=item.isFixed?"fx_"+item.fixedLabel:item.category,lbl=item.isFixed?item.fixedLabel:(cat?cat.label:"Other"),grp=cat?(cat.g||cat.group||"Other"):"Other",ico=item.isFixed?item.fixedIcon:getIcon(item.category,allC);if(!catMap[key]){catMap[key]={label:lbl,group:grp,icon:ico,total:0,items:[]};}catMap[key].total+=(+item.amount||0);catMap[key].items.push(item);});var byGroup={"车辆":[],"牌照":[],"平台":[],"其他":[]};Object.values(catMap).forEach(function(c){var g=byGroup[c.group]?c.group:"其他";byGroup[g].push(c);});["车辆","牌照","平台","其他"].forEach(function(g){byGroup[g].sort(function(a,b){return b.total-a.total;});});var total=srcExps.reduce(function(s,e){return s+(+e.amount||0);},0);setReportData({type:"exp",label:label,byGroup:byGroup,total:total});}, style: {flex:1,background:"linear-gradient(135deg, rgba(204,136,255,0.1), rgba(60,16,80,0.4))",border:"1px solid rgba(204,136,255,0.3)",borderRadius:RADIUS.md,padding:14,color:"#CC88FF",fontSize:FS.md+1,fontWeight:700,cursor:"pointer",boxShadow:SHADOW.sm,transition:"all 0.15s",letterSpacing:0.2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 370}}, "💸 " , T.expense)
            )
            , React.createElement('button', { onClick: function(){setSf("tax_center");}, style: {width:"100%",background:"linear-gradient(135deg, rgba(255,179,0,0.08), rgba(40,28,0,0.6))",border:"1px solid rgba(255,179,0,0.3)",borderRadius:RADIUS.md,padding:"12px 16px",color:"#FFB300",fontSize:FS.md+1,fontWeight:700,cursor:"pointer",marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:SHADOW.sm,transition:"all 0.15s",letterSpacing:0.2} }
              , React.createElement('span', null, "🧾 " , lang==="en"?"Open Tax Center":"进入税务中心")
              , React.createElement('span', {style:{color:"#9A7A40",fontSize:16}}, "→")
            )
            , (function(){var r=bldRep(repP),rn=r.rn;var rnCl=rn>=0?C.success:C.danger;return (
              React.createElement(Card, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 373}}
                , React.createElement('div', { style: {fontSize:14,fontWeight:700,color:C.text,marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 374}}, T.totalIncome)
                , React.createElement(Row, { label: T.grossFare, value: fmt(r.rg), __self: this, __source: {fileName: _jsxFileName, lineNumber: 375}} ), React.createElement(Row, { label: T.tips, value: fmt(r.rt), color: C.success, __self: this, __source: {fileName: _jsxFileName, lineNumber: 375}} ), React.createElement(Row, { label: T.bonus, value: fmt(r.rb), color: C.gold, __self: this, __source: {fileName: _jsxFileName, lineNumber: 375}} )
                , React.createElement(Row, { label: T.totalIncome, value: fmt(r.ri), color: C.accent, bold: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 376}} )
                , React.createElement('div', { style: {borderTop:"1px solid #0F1C30",margin:"8px 0"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 377}} )
                , React.createElement(Row, { label: T.totalExpense, value: fmt(r.rTot), color: C.danger, bold: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 378}} )
                , React.createElement('div', { style: {borderTop:"1px solid #0F1C30",margin:"8px 0"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 379}} )
                , React.createElement(Row, { label: T.netProfit, value: fmt(rn), color: rnCl, bold: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 380}} )
              )
            );}())
          )
        ) : null

      )

      , sf==="drawer_veh" ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:C.bg,zIndex:300,overflowY:"auto"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 389}}
          , React.createElement('div', { style: {maxWidth:600,margin:"0 auto",padding:"0 0 80px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 390}}
            , React.createElement('div', { style: {background:C.bg2,padding:"16px 18px",borderBottom:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 391}}
              , React.createElement('button', { onClick: function(){setSf(null);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 393}}, "✕")
              , React.createElement('div', { style: {fontSize:16,fontWeight:800}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 392}}, "🚗 " , T.vehicle)
              , React.createElement('button', { onClick: function(){setSf(null);}, style: {background:"linear-gradient(135deg,#00CFFF,#0044EE)",border:"none",color:"#fff",fontSize:20,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 10px rgba(0,207,255,0.3)"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 393}}, "✓")
            )
            , React.createElement('div', { style: {padding:"16px 14px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 395}}
// === Vehicle Profiles section ===
              , (function(){
                  var hasProfiles = savedVehicles && savedVehicles.length > 0;
                  // Match current veh against saved profiles: prefer vehicleId, fallback to plate
                  var currentIdx = hasProfiles ? savedVehicles.findIndex(function(p){
                    if(p.vehicleId && veh.vehicleId && p.vehicleId === veh.vehicleId) return true;
                    return (p.plate && p.plate===veh.plate) || (p.tlcPlate && p.tlcPlate===veh.tlcPlate);
                  }) : -1;
                  
                  // Save action
                  var doSave = function(){
                    inputAction({
                      title: lang==="en"?"Profile name":"车辆名称",
                      message: lang==="en"?"e.g. \"Tesla Y\", \"Camry rental\"":"例如 \"Tesla Y\"、\"租来的 Camry\"",
                      defaultValue: (veh.brand||"")+" "+(veh.model||""),
                      onSubmit: function(label){
                        if(!label||!label.trim()) return;
                        // Capture current odometer from latest expense entry (best estimate of "miles when saved")
                        var lastOdoEntry = el.filter(function(e){return e.odometer&&+e.odometer>0;}).sort(function(a,b){var c=b.date.localeCompare(a.date);return c!==0?c:(+b.odometer)-(+a.odometer);})[0];
                        var savedOdo = lastOdoEntry ? +lastOdoEntry.odometer : 0;
                        var profile=Object.assign({},veh,{_savedName:label.trim(),_savedAt:new Date().toISOString(),_savedOdometer:savedOdo});
                        setSavedVehicles((savedVehicles||[]).concat([profile]));
                        showToast(lang==="en"?"✓ Saved":"✓ 已保存");
                      }
                    });
                  };
                  
                  // EMPTY state — friendly intro + warning if vehicle has data
                  if(!hasProfiles){
                    var hasVehData = !!(veh.brand || veh.plate || veh.tlcPlate || veh.model);
                    var vehLabel = (veh.brand||"")+(veh.model?" "+veh.model:"")+(veh.plate?" ["+veh.plate+"]":"");
                    var headerTxt = hasVehData ? (lang==="en"?"Save Current Vehicle First!":"先保存当前车辆！") : (lang==="en"?"Multi-Vehicle Profiles":"多车辆管理");
                    var bodyTxt = hasVehData ? (lang==="en"?("You have vehicle data ("+vehLabel+"). Save it as a profile FIRST before changing fields — otherwise editing will overwrite it permanently."):("已有车辆数据（"+vehLabel+"）。改字段前请先保存为 profile — 否则修改会永久覆盖。")) : (lang==="en"?"Save your current vehicle as a profile, so you can quickly switch later when you change cars or rent another.":"把当前车辆保存为 profile，以后换车 / 租车时可以快速切换回来。");
                    var btnTxt = hasVehData ? (lang==="en"?"Save Now":"立即保存") : (lang==="en"?"Save Current Vehicle":"保存当前车辆");
                    return React.createElement('div', { style: {background:hasVehData?"#1A1400":C.bg3,border:hasVehData?"2px solid #5A3A00":"1px dashed "+C.border,borderRadius:12,padding:"16px 14px",marginBottom:16,textAlign:"center"} }
                      , React.createElement('div', { style: {fontSize:14,fontWeight:700,color:hasVehData?"#FFB300":"#90EAF8",marginBottom:6} }, hasVehData?"⚠️ ":"🚗 " , headerTxt)
                      , React.createElement('div', { style: {fontSize:12,color:hasVehData?"#FFD380":C.text3,marginBottom:12,lineHeight:1.6} }, bodyTxt)
                      , React.createElement('button', { onClick: doSave, style: {background:hasVehData?"linear-gradient(135deg,#5A3A00,#3A2800)":"linear-gradient(135deg,#0A4020,#1A6030)",border:"1px solid "+(hasVehData?"#7A5500":"#2A8050"),borderRadius:10,padding:"10px 20px",color:hasVehData?C.gold:"#5ADA7A",fontSize:13,fontWeight:700,cursor:"pointer"} }, "💾 " , btnTxt)
                    );
                  }
                  
                  // POPULATED state — list with current marked
                  // Compute current vehicle's live odometer (from latest expense with odometer)
                  var liveLastOdo = el.filter(function(e){return e.odometer&&+e.odometer>0;}).sort(function(a,b){var c=b.date.localeCompare(a.date);return c!==0?c:(+b.odometer)-(+a.odometer);})[0];
                  var liveOdoMi = liveLastOdo ? +liveLastOdo.odometer : 0;
                  return React.createElement('div', { style: {background:C.bg3,border:"1px solid "+C.border,borderRadius:12,padding:14,marginBottom:16} }
                    , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:"#90EAF8",marginBottom:10} }, "🚗 " , lang==="en"?"Switch Vehicle":"切换车辆")
                    , React.createElement('div', null
                      , savedVehicles.map(function(p,i){
                          var isCurrent = i===currentIdx;
                          // Show LIVE odometer for current vehicle, SAVED odometer for others
                          var displayOdo = isCurrent ? liveOdoMi : (+p._savedOdometer || 0);
                          var odoLabel = isCurrent ? (lang==="en"?"now":"当前") : (lang==="en"?"saved":"保存时");
                          return React.createElement('div', { key: i, style: {display:"flex",alignItems:"center",gap:8,padding:"10px 12px",background:isCurrent?"#0A2018":C.bg2,border:isCurrent?"1px solid #2A6040":"1px solid transparent",borderRadius:8,marginBottom:6} }
                            , React.createElement('div', { style: {flex:1,minWidth:0} }
                              , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:isCurrent?"#5ADA7A":C.text,display:"flex",alignItems:"center",gap:6} }
                                , isCurrent ? React.createElement('span',null,"✓ ") : null
                                , p._savedName||(p.brand+" "+p.model)
                                , isCurrent ? React.createElement('span',{style:{fontSize:11,padding:"1px 6px",borderRadius:4,background:"#2A6040",color:"#5ADA7A",fontWeight:600}},lang==="en"?"CURRENT":"当前") : null
                              )
                              , React.createElement('div', { style: {fontSize:12,color:C.text3,marginTop:2} }, [p.year,p.brand,p.model].filter(Boolean).join(" "), p.plate?" · ["+p.plate+"]":"", p.tlcPlate?" · TLC ["+p.tlcPlate+"]":"")
                              , displayOdo > 0 ? React.createElement('div', { style: {fontSize:12,color:C.gold,marginTop:3,fontWeight:600} }, "🛣 " , displayOdo.toLocaleString(), " mi", React.createElement('span',{style:{color:C.text3,fontWeight:400,marginLeft:4,fontSize:11}}, "(", odoLabel, ")")) : null
                            )
                            , React.createElement('button', { onClick: function(){
                                // Open vehicle history sheet (works for both current and saved profiles)
                                var pid = p.vehicleId || (isCurrent ? veh.vehicleId : null);
                                if(!pid){
                                  // Profile has no ID yet — assign one and persist it
                                  pid = "v_" + Date.now() + "_" + Math.random().toString(36).slice(2,8);
                                  setSavedVehicles(savedVehicles.map(function(sp,si){return si===i ? Object.assign({},sp,{vehicleId:pid}) : sp;}));
                                }
                                setSf("vehicle_history_"+pid);
                              }, style: {background:"#0A2040",border:"1px solid #2A5080",borderRadius:6,padding:"5px 10px",color:"#FFB347",fontSize:12,fontWeight:700,cursor:"pointer"} }, "📊")
                            , !isCurrent ? React.createElement('button', { onClick: function(){
                                if(!confirm(lang==="en"?"Switch to this vehicle? Current vehicle data will be replaced.":"切换到这辆车？当前车辆资料会被替换。"))return;
                                var loaded=Object.assign({},p);
                                delete loaded._savedName; delete loaded._savedAt; delete loaded._savedOdometer;
                                // Ensure switched-to profile has a stable vehicleId (so its expenses can be tracked)
                                if(!loaded.vehicleId){
                                  loaded.vehicleId = "v_" + Date.now() + "_" + Math.random().toString(36).slice(2,8);
                                  // Also persist this ID back to the saved profile so it's stable next time
                                  setSavedVehicles(savedVehicles.map(function(sp,si){return si===i ? Object.assign({},sp,{vehicleId:loaded.vehicleId}) : sp;}));
                                }
                                setVeh(loaded);
                              }, style: {background:"#0A2040",border:"1px solid #2A5080",borderRadius:6,padding:"5px 12px",color:C.accent2,fontSize:12,fontWeight:700,cursor:"pointer"} }, lang==="en"?"Switch":"切换") : null
                            , React.createElement('button', { onClick: function(){
                                confirmAction(lang==="en"?"Delete this profile?":"删除这个车辆 profile？", lang==="en"?"Won't affect current vehicle data.":"不影响当前正在用的车辆资料。", function(){
                                  var prev=savedVehicles.slice();setSavedVehicles(savedVehicles.filter(function(_,j){return j!==i;}));showUndo((lang==="en"?"✓ Profile deleted":"✓ Profile 已删除"), {prevSavedVehicles:prev});
                                });
                              }, style: {background:"none",border:"none",color:C.danger,fontSize:14,cursor:"pointer",padding:"4px 6px"} }, "✕")
                          );
                        })
                    )
                    , React.createElement('div', { style: {marginTop:8,paddingTop:10,borderTop:"1px solid "+C.border,textAlign:"center"} }
                      , currentIdx >= 0
                        ? React.createElement('div', { style: {fontSize:12,color:C.text3,fontStyle:"italic",padding:"4px 0"} },
                            lang==="en"?"✓ Current vehicle is already saved":"✓ 当前车辆已保存"
                          )
                        : React.createElement('button', { onClick: doSave, style: {background:"transparent",border:"1px dashed #2A4A6A",borderRadius:8,padding:"6px 14px",color:C.accent2,fontSize:12,fontWeight:600,cursor:"pointer"} }, "💾 " , lang==="en"?"Save current as new profile":"将当前车辆保存为新 profile")
                    )
                  );
                }())
              // Quick link to dedicated Driver Info page (driver lives there now, separate from vehicle)
              , React.createElement('button', {
                  onClick: function(){setSf("drawer_driver");},
                  style: {width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",background:C.bg3,border:"1px solid "+C.border,borderRadius:10,padding:"12px 14px",color:C.text,fontSize:13,cursor:"pointer",marginBottom:16}
                },
                React.createElement('div',{style:{display:"flex",alignItems:"center",gap:10}},
                  React.createElement('span',{style:{fontSize:18}},"🧑"),
                  React.createElement('div',{style:{textAlign:"left"}},
                    React.createElement('div',{style:{fontSize:13,fontWeight:600,color:C.gold}},lang==="en"?"Driver Info":"司机信息"),
                    React.createElement('div',{style:{fontSize:12,color:C.text3,marginTop:2}},
                      driver.name
                        ? driver.name + (driver.tlcHack?" · TLC "+driver.tlcHack:"")
                        : (lang==="en"?"Tap to set up":"点击设置")
                    )
                  )
                ),
                React.createElement('span',{style:{color:C.text3,fontSize:14}},"›")
              )
              , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:"#90EAF8",marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 396}}, lang==="en"?"Vehicle Info":"车辆基本信息")
              , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 397}}
                , React.createElement(Field, { label: T.carType, value: veh.type, onChange: function(v){setVeh(Object.assign({},veh,{type:v}));}, options: [["",T.pleaseSelect],["petrol",T.petrol],["electric",T.electric],["hybrid",T.hybrid]], __self: this, __source: {fileName: _jsxFileName, lineNumber: 398}} )
                , React.createElement(Field, { label: T.plate, value: veh.plate, onChange: function(v){setVeh(Object.assign({},veh,{plate:v.toUpperCase()}));}, placeholder: "ABC1234", __self: this, __source: {fileName: _jsxFileName, lineNumber: 399}} )
                , React.createElement(Field, { label: "TLC Plate" , value: veh.tlcPlate||"", onChange: function(v){setVeh(Object.assign({},veh,{tlcPlate:v.toUpperCase()}));}, placeholder: "TLC", __self: this, __source: {fileName: _jsxFileName, lineNumber: 400}} )
                , React.createElement(Field, { label: T.brand, value: veh.brand||"", onChange: function(v){if(v==="__new__"){inputAction({title:lang==="en"?"New brand name":"新品牌名称",placeholder:lang==="en"?"e.g. Tesla":"如 特斯拉",onSubmit:function(n){if(n&&n.trim()){var nm=n.trim();setCustBrands(custBrands.concat([nm]));setVeh(Object.assign({},veh,{brand:nm}));}}});return;}setVeh(Object.assign({},veh,{brand:v}));}, options: [["",T.selectBrand]].concat(CARBRANDS.slice(0,-1).map(function(b){return [b,b];})).concat(custBrands.map(function(b){return [b,b];})).concat([[lang==="en"?"Other":"其他",lang==="en"?"Other":"其他"],["__new__",lang==="en"?"+ Add new brand...":"+ 添加新品牌..."]]), __self: this, __source: {fileName: _jsxFileName, lineNumber: 401}} )
                , (function(){
                    // Build car model dropdown options based on currently-selected brand
                    var brandModels = CARMODELS[veh.brand] || [];
                    var hasModelsForBrand = brandModels.length > 0;
                    if(!hasModelsForBrand){
                      // Brand without preset models (or no brand selected) → show free text input
                      return React.createElement(Field, { label: lang==="en"?"Model":"车型", value: veh.model||"", onChange: function(v){setVeh(Object.assign({},veh,{model:v}));}, placeholder: veh.brand?(lang==="en"?"Type model":"输入车型"):(lang==="en"?"Pick brand first":"请先选品牌") } );
                    }
                    // Has preset models → show dropdown with custom option
                    var modelOpts = [["",lang==="en"?"Select model":"选择车型"]]
                      .concat(brandModels.map(function(m){return [m,m];}))
                      .concat([["__custom__",lang==="en"?"+ Custom model...":"+ 自定义车型..."]]);
                    var isCustom = veh.model && brandModels.indexOf(veh.model) === -1;
                    return React.createElement(React.Fragment, null
                      , React.createElement(Field, { label: lang==="en"?"Model":"车型", value: isCustom ? "__custom__" : (veh.model||""), onChange: function(v){
                          if(v === "__custom__"){
                            inputAction({title:lang==="en"?"Custom model":"自定义车型",placeholder:lang==="en"?"e.g. New EV":"如 新款车",onSubmit:function(n){if(n&&n.trim()){setVeh(Object.assign({},veh,{model:n.trim()}));}}});
                            return;
                          }
                          setVeh(Object.assign({},veh,{model:v}));
                        }, options: modelOpts } )
                      , isCustom ? React.createElement('div',{style:{fontSize:11,color:C.text3,marginTop:-6,marginBottom:8}}, lang==="en"?("Custom: "+veh.model):("自定义："+veh.model)) : null
                    );
                  }())
                , React.createElement(Field, { label: lang==="en"?"Year":"年份", type:"number", value: veh.year||"", onChange: function(v){setVeh(Object.assign({},veh,{year:v}));}, placeholder: "2023", __self: this, __source: {fileName: _jsxFileName, lineNumber: 401}} )
                , React.createElement(Field, { label: lang==="en"?"Color":"车身颜色", value: veh.color||"", onChange: function(v){setVeh(Object.assign({},veh,{color:v}));}, placeholder: lang==="en"?"e.g. White":"如 白色", __self: this, __source: {fileName: _jsxFileName, lineNumber: 401}} )
              )
              , React.createElement(Field, { label: "VIN", value: veh.vin||"", onChange: function(v){setVeh(Object.assign({},veh,{vin:v.toUpperCase()}));}, placeholder: lang==="en"?"17-character VIN":"17 位车架号", __self: this, __source: {fileName: _jsxFileName, lineNumber: 402}} )
              , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:"#90EAF8",marginBottom:10,marginTop:14}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 403}}, lang==="en"?(veh.tlcPlate?"Inspection (every 4 months · TLC)":"Inspection (every 12 months)"):(veh.tlcPlate?"车辆检验（每 4 个月 · TLC）":"车辆检验（每 12 个月）"))
              , React.createElement(Field, { label: T.lastInsp, type: "date", value: veh.lastInsp, onChange: function(v){setVeh(Object.assign({},veh,{lastInsp:v}));}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 404}} )
              , insW ? React.createElement('div', { style: {background:"#1A1400",border:"1px solid #FFB300",borderRadius:10,padding:"10px 14px",marginTop:8,fontSize:14,color:"#FFB300",fontWeight:700}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 405}}, insW.diff < 0 ? (lang==="en"?"Overdue ":"已逾期 ")+Math.abs(insW.diff)+(lang==="en"?" days":" 天") : (lang==="en"?"Next: ":"下次检验：")+fmtDate(insW.next)+(lang==="en"?" ("+insW.diff+" days left)":"（还剩 "+insW.diff+" 天）")) : null
              , (function(){
                // Current mileage: latest odometer reading from any expense record
                var lastOdo=el.filter(function(e){return e.odometer&&+e.odometer>0;}).sort(function(a,b){var c=b.date.localeCompare(a.date);return c!==0?c:(+b.odometer)-(+a.odometer);})[0];
                if(!lastOdo)return null;
                return React.createElement('div', { style: {background:C.bg3,border:"1px solid "+C.border2,borderRadius:10,padding:"12px 14px",marginTop:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 405}}
                  , React.createElement('div', { style: {fontSize:12,color:C.text3,marginBottom:4}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 405}}, "🛣 " , lang==="en"?"Current Mileage":"当前总里程")
                  , React.createElement('div', { style: {fontSize:24,fontWeight:900,color:C.gold}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 405}}, (+lastOdo.odometer).toLocaleString(), " mi")
                  , React.createElement('div', { style: {fontSize:12,color:C.text3,marginTop:2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 405}}, lang==="en"?"As of ":"截至 ", fmtDate(lastOdo.date))
                );
              }())
              , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:"#90EAF8",marginBottom:10,marginTop:14}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 406}}, lang==="en"?"TLC Insurance":"TLC 商业保险")
              , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 407}}
                , React.createElement(Field, { label: T.insComp, value: veh.insComp||"", onChange: function(v){setVeh(Object.assign({},veh,{insComp:v}));}, placeholder: "Progressive", __self: this, __source: {fileName: _jsxFileName, lineNumber: 408}} )
                , React.createElement(Field, { label: T.insExpiry, type: "date", value: veh.insExpiry||"", onChange: function(v){setVeh(Object.assign({},veh,{insExpiry:v}));}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 409}} )
              )
              , React.createElement(Field, { label: "Policy Number" , value: veh.insPolicy||"", onChange: function(v){setVeh(Object.assign({},veh,{insPolicy:v}));}, placeholder: "PA-12345678", __self: this, __source: {fileName: _jsxFileName, lineNumber: 411}} )
              , insExpDiff !== null ? React.createElement('div', { style: {background:"#1A1400",border:"1px solid #00E676",borderRadius:8,padding:"8px 12px",fontSize:14,color:C.success,marginTop:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 412}}, insExpDiff < 0 ? (lang==="en"?"Insurance expired":"保险已过期") : (lang==="en"?"Insurance: "+Math.round(insExpDiff)+" days left":"保险还剩 "+Math.round(insExpDiff)+" 天")) : null
              , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:"#90EAF8",marginBottom:10,marginTop:14}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 413}}, lang==="en"?"Financing":"车辆融资")
              , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 414}}
                , React.createElement(Field, { label: T.loanType, value: veh.loanType||"loan", onChange: function(v){if(v==="__new__"){inputAction({title:lang==="en"?"New ownership type":"新持有方式",onSubmit:function(n){if(n&&n.trim()){var nm=n.trim();setCustLoanTypes(custLoanTypes.concat([nm]));setVeh(Object.assign({},veh,{loanType:nm}));}}});return;}setVeh(Object.assign({},veh,{loanType:v}));}, options: [["loan",T.loan],["lease",T.lease],["own",T.own],["rental",T.rental]].concat(custLoanTypes.map(function(l){return [l,l];})).concat([["__new__",lang==="en"?"+ Add new...":"+ 添加新选项..."]]), __self: this, __source: {fileName: _jsxFileName, lineNumber: 415}} )
                , React.createElement(Field, { label: T.loanAmt, type: "number", value: veh.loanAmt||"", onChange: function(v){setVeh(Object.assign({},veh,{loanAmt:v}));}, money: true, placeholder: "0.00", __self: this, __source: {fileName: _jsxFileName, lineNumber: 416}} )
              )
            )
          )
        )
      ) : null

      , sf==="help" ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:C.bg,zIndex:300,overflowY:"auto"} }
          , React.createElement('div', { style: {maxWidth:600,margin:"0 auto",padding:"0 0 80px"} }
            , React.createElement('div', { style: {background:C.bg2,padding:"16px 18px",borderBottom:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10} }
              , React.createElement('button', { onClick: function(){setSf(null);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"} }, "✕")
              , React.createElement('div', { style: {fontSize:16,fontWeight:800} }, "📖 " , lang==="en"?"User Guide":"使用指南")
              , React.createElement('div', { style: {width:34} })
            )
            , React.createElement('div', { style: {padding:"16px 14px",lineHeight:1.7} }
              // ========== HERO ==========
              , React.createElement('div', {style:{background:"linear-gradient(135deg,#3010A0,#1A0560)",border:"1px solid #6030C0",borderRadius:14,padding:"18px 16px",marginBottom:16,color:"#fff"}}
                , React.createElement('div', {style:{fontSize:18,fontWeight:800,marginBottom:6}}, "🚖 NYC Driver Tracker")
                , React.createElement('div', {style:{fontSize:13,opacity:0.9}}, lang==="en"?"Your driver income & tax companion. 3 minutes to learn the essentials.":"司机收入与税务助手。3 分钟掌握核心用法。")
              )
              
              // ========== SECTION 1: 日常记账 ==========
              , React.createElement('div', {style:{marginBottom:18}}
                , React.createElement('div', {style:{fontSize:15,fontWeight:800,color:C.gold,marginBottom:8}}, "1️⃣ " , lang==="en"?"Daily Bookkeeping":"日常记账")
                , React.createElement('div', {style:{background:C.bg3,border:"1px solid "+C.border,borderRadius:10,padding:"12px 14px",fontSize:13,color:C.text2}}
                  , React.createElement('div', {style:{marginBottom:8}}, "💸 ", React.createElement('b',null,lang==="en"?"Add expense:":"录支出："), lang==="en"?" Bottom blue [+] → Expense → pick category → enter amount":" 底部蓝色 [+] → 支出 → 选类别 → 输金额")
                  , React.createElement('div', {style:{marginBottom:8}}, "💡 ", React.createElement('b',null,lang==="en"?"Auto-prefill price:":"自动填上次价格："), lang==="en"?" After picking category, last 2 prices show as blue chips. Most recent auto-fills the amount — just save":" 选好类别后，顶部蓝色框显示最近 2 次价格，最新一个自动填进金额栏，直接保存")
                  , React.createElement('div', null, "📋 ", React.createElement('b',null,lang==="en"?"Address book:":"地址簿："), lang==="en"?" Notes ⏷ dropdown shows all saved locations across categories":" 备注框 ⏷ 下拉跨类别显示所有保存地址")
                )
              )
              
              // ========== SECTION 2: 收入录入 ==========
              , React.createElement('div', {style:{marginBottom:18}}
                , React.createElement('div', {style:{fontSize:15,fontWeight:800,color:"#5ADA7A",marginBottom:8}}, "2️⃣ " , lang==="en"?"Recording Income":"收入录入")
                , React.createElement('div', {style:{background:C.bg3,border:"1px solid "+C.border,borderRadius:10,padding:"12px 14px",fontSize:13,color:C.text2}}
                  , React.createElement('div', {style:{fontWeight:700,marginBottom:6,color:C.accent2}}, lang==="en"?"📅 Per Week (manual)":"📅 按周（手动）")
                  , React.createElement('div', {style:{marginBottom:8,paddingLeft:8}}, lang==="en"?"Income tab → 📅 Weekly card → fill 4 main fields (Pay/Tip/Toll/Service Fee)":"收入页 → 📅 每周运营 → 填 4 个主字段（金额/小费/过桥/平台费）")
                  , React.createElement('div', {style:{fontWeight:700,marginBottom:6,color:"#FFB300",marginTop:10}}, lang==="en"?"📥 Auto-import Uber":"📥 Uber 自动导入")
                  , React.createElement('div', {style:{paddingLeft:8}}, lang==="en"?"Drawer → Platform → Uber Data Import. Paste Weekly Statement OR Monthly/Annual Tax Summary PDF text. Auto-extracts all amounts + Service Fee":"抽屉 → 平台管理 → Uber 数据导入。粘贴周报或月度/年度税务总结 PDF 文字。自动提取所有金额 + 抽成")
                )
              )
              
              // ========== SECTION 3: 报税 ==========
              , React.createElement('div', {style:{marginBottom:18}}
                , React.createElement('div', {style:{fontSize:15,fontWeight:800,color:"#CC88FF",marginBottom:8}}, "3️⃣ " , lang==="en"?"Tax Reports":"报税")
                , React.createElement('div', {style:{background:C.bg3,border:"1px solid "+C.border,borderRadius:10,padding:"12px 14px",fontSize:13,color:C.text2}}
                  , React.createElement('div', {style:{marginBottom:8}}, lang==="en"?"Drawer → 🧾 Tax Center":"抽屉 → 🧾 税务中心")
                  , React.createElement('div', {style:{marginBottom:6,paddingLeft:8}}, "📄 ", React.createElement('b',null,lang==="en"?"Tax Report":"报税表"), " — Schedule C summary")
                  , React.createElement('div', {style:{marginBottom:6,paddingLeft:8}}, "📊 ", React.createElement('b',null,lang==="en"?"Accountant Report":"会计师年度报表"), " — categorized")
                  , React.createElement('div', {style:{paddingLeft:8}}, "📦 ", React.createElement('b',{style:{color:"#CC88FF"}},lang==="en"?"Complete Tax Package":"完整报税包"), " — ", lang==="en"?"all-in-one PDF for accountant":"给会计师的一份全套 PDF（推荐）")
                )
              )
              
              // ========== SECTION 4: 数据安全 ==========
              , React.createElement('div', {style:{marginBottom:18}}
                , React.createElement('div', {style:{fontSize:15,fontWeight:800,color:"#5ADA7A",marginBottom:8}}, "4️⃣ " , lang==="en"?"Data Safety":"数据安全")
                , React.createElement('div', {style:{background:C.bg3,border:"1px solid "+C.border,borderRadius:10,padding:"12px 14px",fontSize:13,color:C.text2}}
                  , React.createElement('div', {style:{marginBottom:8}}, "☁️ ", React.createElement('b',null,lang==="en"?"Auto Drive sync:":"自动 Drive 同步："), lang==="en"?" Always-on if signed in":" 登录后自动开启")
                  , React.createElement('div', {style:{marginBottom:8}}, "📅 ", React.createElement('b',null,lang==="en"?"Daily/Monthly snapshots:":"每日/每月快照："), lang==="en"?" In Drive folder, auto-rotated":" Drive 文件夹中自动轮换")
                  , React.createElement('div', {style:{marginBottom:8}}, "↩️ ", React.createElement('b',null,lang==="en"?"20s Undo banner":"20 秒撤销横条"), lang==="en"?" — every delete can be undone":" — 每次删除都可撤销")
                  , React.createElement('div', null, "📤 ", React.createElement('b',null,lang==="en"?"Manual export:":"手动导出："), lang==="en"?" Drawer → Backup → Export JSON":" 抽屉 → 备份 → 导出 JSON")
                )
              )
              
              // ========== SECTION 5: 仪表盘 ==========
              , React.createElement('div', {style:{marginBottom:18}}
                , React.createElement('div', {style:{fontSize:15,fontWeight:800,color:C.accent,marginBottom:8}}, "5️⃣ " , lang==="en"?"Dashboard":"仪表盘")
                , React.createElement('div', {style:{background:C.bg3,border:"1px solid "+C.border,borderRadius:10,padding:"12px 14px",fontSize:13,color:C.text2}}
                  , React.createElement('div', {style:{marginBottom:6}}, "📊 ", lang==="en"?"Pie chart, trend lines, expense breakdown":"饼图、趋势线、支出分类")
                  , React.createElement('div', {style:{marginBottom:6}}, "🎯 ", lang==="en"?"Monthly goal — set per month":"月度目标 — 每月单独设定")
                  , React.createElement('div', {style:{marginBottom:6}}, "🔧 ", lang==="en"?"Smart maintenance alerts (rotate tires, etc.)":"智能保养提醒（转胎等）")
                  , React.createElement('div', null, "🏦 ", lang==="en"?"Latest bank payout card (rideshare)":"最近银行入账卡片（网约车）")
                )
              )
              
              // ========== TIPS ==========
              , React.createElement('div', {style:{background:"#1A1400",border:"1px solid #5A3A00",borderRadius:10,padding:"12px 14px",fontSize:12,color:"#FFD380",lineHeight:1.7,marginBottom:16}}
                , React.createElement('div', {style:{fontWeight:700,color:C.gold,marginBottom:8,fontSize:13}}, "💡 " , lang==="en"?"Pro Tips":"小技巧")
                , React.createElement('div', null, "• ", lang==="en"?"App auto-learns your prices — no need to manually \"save as quick\"":"App 自动记住你的常用价格 — 不需要手动收藏")
                , React.createElement('div', null, "• ", lang==="en"?"Same expense → blue suggestion chip → auto-fills latest price":"同类支出第二次录 → 蓝色提示 → 自动填上次价格")
                , React.createElement('div', null, "• ", lang==="en"?"Different platforms tracked separately — Uber/Lyft/Via don\'t mix":"多平台数据独立 — Uber/Lyft/Via 各自记录")
                , React.createElement('div', null, "• ", lang==="en"?"Monthly goal can be set per month — view different months in dashboard":"月度目标可按月设 — 仪表盘切换月份分别设定")
                , React.createElement('div', null, "• ", lang==="en"?"Service Fee auto-records as deductible expense (no double entry)":"平台费会自动作为可抵税支出录入（不会重复）")
                , React.createElement('div', null, "• ", lang==="en"?"All deletes have 20s undo banner with progress bar":"所有删除有 20 秒撤销横条带进度条")
                , React.createElement('div', null, "• ", lang==="en"?"Drawer → Advanced → 🎯 Simple Mode hides power features":"抽屉 → 高级 → 🎯 精简模式隐藏复杂功能")
                , React.createElement('div', null, "• ", lang==="en"?"☰ menu (top-left) · 🔔 reminders (top-right)":"☰ 菜单（左上）· 🔔 提醒（右上）")
              )
              
              // ========== Version footer ==========
              , React.createElement('div', {style:{textAlign:"center",fontSize:12,color:C.text3,padding:"10px 0"}}
                , "NYC Driver Tracker · "+APP_VERSION
                , React.createElement('br')
                , lang==="en"?"Built for NYC drivers who care about their numbers.":"为认真对待数字的 NYC 司机而做。"
              )
            )
          )
        )
      ) : null

      , sf==="health_check" ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:C.bg,zIndex:300,overflowY:"auto"} }
          , React.createElement('div', { style: {maxWidth:600,margin:"0 auto",padding:"0 0 80px"} }
            , React.createElement('div', { style: {background:C.bg2,padding:"16px 18px",borderBottom:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10} }
              , React.createElement('button', { onClick: function(){setSf(null);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"} }, "✕")
              , React.createElement('div', { style: {fontSize:16,fontWeight:800} }, "🏥 " , lang==="en"?"Data Health Check":"数据健康检查")
              , React.createElement('div', { style: {width:34} })
            )
            , React.createElement('div', { style: {padding:"16px 14px"} }
              , (function(){
                  var findings=[];
                  var todayStr=new Date().toISOString().slice(0,10);
                  
                  // CRITICAL: $0 or negative amount expenses
                  el.forEach(function(e){
                    if(!e.amount || +e.amount<=0){
                      findings.push({sev:"crit",icon:"💸",cat:lang==="en"?"Zero/Negative Amount":"金额异常",txt:(lang==="en"?"Expense amount is $":"支出金额为 $")+(e.amount||"0"),detail:e.date+" · "+(e.category||"?"),item:e,kind:"el"});
                    }
                  });
                  
                  // CRITICAL: Invalid date format
                  el.forEach(function(e){
                    if(e.date && !/^\d{4}-\d{2}-\d{2}$/.test(e.date)){
                      findings.push({sev:"crit",icon:"📅",cat:lang==="en"?"Invalid Date":"日期格式错误",txt:e.date,detail:lang==="en"?"Expense":"支出",item:e,kind:"el"});
                    }
                  });
                  
                  // CRITICAL: Statement missing month
                  sl.forEach(function(s){
                    if(!s.month){
                      findings.push({sev:"crit",icon:"📊",cat:lang==="en"?"Missing Month":"缺月份",txt:lang==="en"?"Statement has no month":"月度账单缺月份字段",detail:s.platform||"?",item:s,kind:"sl"});
                    }
                  });
                  
                  // CRITICAL: Odometer going backwards
                  var sortedOdo=el.filter(function(e){return e.odometer&&+e.odometer>0&&e.date;}).sort(function(a,b){return a.date.localeCompare(b.date);});
                  for(var i=1;i<sortedOdo.length;i++){
                    if(+sortedOdo[i].odometer<+sortedOdo[i-1].odometer-100){  // tolerate 100mi rounding
                      findings.push({sev:"crit",icon:"🛣",cat:lang==="en"?"Odometer Regression":"里程倒退",txt:sortedOdo[i].date+": "+(+sortedOdo[i].odometer).toLocaleString()+" mi < "+sortedOdo[i-1].date+": "+(+sortedOdo[i-1].odometer).toLocaleString()+" mi",detail:"",item:sortedOdo[i],kind:"el"});
                    }
                  }
                  
                  // WARNING: Vehicle type mismatch
                  if(veh.type==="electric"){
                    var fuelCnt=el.filter(function(e){return e.category==="fuel";}).length;
                    if(fuelCnt>0){
                      findings.push({sev:"warn",icon:"⛽",cat:lang==="en"?"Type Mismatch":"类型不匹配",txt:(lang==="en"?"Electric vehicle has ":"电动车有 ")+fuelCnt+(lang==="en"?" gas entries":" 条加油记录"),detail:"",kind:"info"});
                    }
                  } else if(veh.type==="petrol"){
                    var chgCnt=el.filter(function(e){return e.category==="charging";}).length;
                    if(chgCnt>0){
                      findings.push({sev:"warn",icon:"⚡",cat:lang==="en"?"Type Mismatch":"类型不匹配",txt:(lang==="en"?"Gas vehicle has ":"汽油车有 ")+chgCnt+(lang==="en"?" charging entries":" 条充电记录"),detail:"",kind:"info"});
                    }
                  }
                  
                  // WARNING: Possible duplicates (same date+category+amount in el)
                  var seen={};
                  el.forEach(function(e){
                    var key=e.date+"|"+e.category+"|"+e.amount;
                    if(seen[key]){
                      findings.push({sev:"warn",icon:"📑",cat:lang==="en"?"Possible Duplicate":"疑似重复",txt:e.date+" · "+(e.category||"?")+" · $"+e.amount,detail:lang==="en"?"Same as another entry":"与另一条记录相同",item:e,kind:"el"});
                    }
                    seen[key]=true;
                  });
                  
                  // WARNING: Very large amounts (>$3000 single expense)
                  el.forEach(function(e){
                    if(+e.amount>3000){
                      findings.push({sev:"warn",icon:"💰",cat:lang==="en"?"Large Amount":"金额偏大",txt:"$"+(+e.amount).toLocaleString()+(lang==="en"?" expense (verify if correct)":" 支出（请确认）"),detail:e.date+" · "+(e.category||"?"),item:e,kind:"el"});
                    }
                  });
                  
                  // WARNING: Future-dated entries
                  el.forEach(function(e){
                    if(e.date&&e.date>todayStr){
                      findings.push({sev:"warn",icon:"🔮",cat:lang==="en"?"Future Date":"未来日期",txt:e.date+" "+(lang==="en"?"is in the future":"在未来"),detail:lang==="en"?"Expense":"支出·"+(e.category||"?"),item:e,kind:"el"});
                    }
                  });
                  
                  // INFO: Expired date reminders
                  reminders.forEach(function(r){
                    if(r.type==="date"&&r.date&&r.date<todayStr){
                      findings.push({sev:"info",icon:"🔔",cat:lang==="en"?"Expired Reminder":"过期提醒",txt:(r.title||"?")+" ("+r.date+")",detail:lang==="en"?"You may want to clear this":"可以清除此提醒",item:r,kind:"reminders"});
                    }
                  });
                  
                  // Group by severity
                  var crit=findings.filter(function(f){return f.sev==="crit";});
                  var warn=findings.filter(function(f){return f.sev==="warn";});
                  var info=findings.filter(function(f){return f.sev==="info";});
                  
                  // Data summary (always shown at top)
                  var summary={
                    sl:sl.length,wl:wl.length,dl:dl.length,el:el.length,
                    reminders:reminders.length,licenses:ll.length,
                    totalIssues:findings.length
                  };
                  
                  var renderGroup=function(label,items,color){
                    if(!items.length) return null;
                    return React.createElement('div', {style:{marginBottom:14}}
                      , React.createElement('div', {style:{fontSize:13,fontWeight:700,color:color,marginBottom:8,letterSpacing:0.5}}, label+" ("+items.length+")")
                      , items.map(function(f,i){
                          return React.createElement('div', {key:i,style:{background:C.bg3,border:"1px solid "+C.border,borderRadius:10,padding:"10px 12px",marginBottom:6}}
                            , React.createElement('div', {style:{display:"flex",alignItems:"center",gap:8,marginBottom:4}}
                              , React.createElement('span', {style:{fontSize:16}}, f.icon)
                              , React.createElement('span', {style:{fontSize:12,color:color,fontWeight:700,background:C.bg,padding:"2px 8px",borderRadius:4}}, f.cat)
                            )
                            , React.createElement('div', {style:{fontSize:13,color:C.text,marginBottom:f.detail?2:0}}, f.txt)
                            , f.detail ? React.createElement('div', {style:{fontSize:12,color:C.text3}}, f.detail) : null
                            // Action button — delete (only for el and reminders)
                            , (f.item && f.kind==="el") ? React.createElement('div', {style:{marginTop:6,display:"flex",gap:6}}
                                , React.createElement('button', {onClick:function(){
                                    confirmAction(lang==="en"?"Delete this expense entry?":"删除这条支出记录？", lang==="en"?"This expense will be removed (with undo).":"此支出将被移除（可撤销）。", function(){
                                      var prev=el.slice();
                                      setEl(el.filter(function(x){return x.id!==f.item.id;}));
                                      showUndo((lang==="en"?"✓ Expense deleted":"✓ 支出已删除"), {prevEl:prev});
                                    });
                                  },style:{background:"none",border:"1px solid #5A1A1A",borderRadius:6,padding:"4px 10px",color:C.danger,fontSize:12,cursor:"pointer"}}, "🗑 " , lang==="en"?"Delete":"删除")
                              ) : null
                            , (f.item && f.kind==="reminders") ? React.createElement('div', {style:{marginTop:6,display:"flex",gap:6}}
                                , React.createElement('button', {onClick:function(){
                                    confirmAction(lang==="en"?"Delete this reminder?":"删除这条提醒？", lang==="en"?"This reminder will be removed (with undo).":"此提醒将被移除（可撤销）。", function(){
                                      var prev=reminders.slice();
                                      setReminders(reminders.filter(function(x){return x.id!==f.item.id;}));
                                      showUndo((lang==="en"?"✓ Reminder deleted":"✓ 提醒已删除"), {prevReminders:prev});
                                    });
                                  },style:{background:"none",border:"1px solid #5A1A1A",borderRadius:6,padding:"4px 10px",color:C.danger,fontSize:12,cursor:"pointer"}}, "🗑 " , lang==="en"?"Delete":"删除")
                              ) : null
                          );
                        })
                    );
                  };
                  
                  return React.createElement('div', null
                    // Top summary
                    , React.createElement('div', {style:{background:C.bg3,border:"1px solid "+C.border,borderRadius:12,padding:"14px",marginBottom:14}}
                      , findings.length===0 
                        ? React.createElement('div', {style:{textAlign:"center",padding:"8px"}}
                            , React.createElement('div', {style:{fontSize:36,marginBottom:6}}, "✅")
                            , React.createElement('div', {style:{fontSize:15,fontWeight:700,color:"#5ADA7A"}}, lang==="en"?"All looks good!":"数据健康，无需处理！")
                          )
                        : React.createElement('div', {style:{textAlign:"center",padding:"4px"}}
                            , React.createElement('div', {style:{fontSize:24,marginBottom:4}}, crit.length>0?"⚠️":"📋")
                            , React.createElement('div', {style:{fontSize:14,fontWeight:700,color:crit.length>0?C.danger:"#FFB300"}}, lang==="en"?("Found "+findings.length+" issue"+(findings.length>1?"s":"")):"发现 "+findings.length+" 个问题")
                          )
                    )
                    // Data inventory
                    , React.createElement('div', {style:{background:C.bg3,border:"1px solid "+C.border,borderRadius:12,padding:"12px 14px",marginBottom:14}}
                      , React.createElement('div', {style:{fontSize:12,fontWeight:700,color:C.text2,marginBottom:6}}, "📦 " , lang==="en"?"Data Inventory":"数据清单")
                      , React.createElement('div', {style:{fontSize:12,color:C.text3,lineHeight:1.7}}
                        , (lang==="en"?"Statements: ":"月度账单：")+summary.sl+" · "
                        , (lang==="en"?"Weekly: ":"周记录：")+summary.wl+" · "
                        , (lang==="en"?"Daily: ":"每日：")+summary.dl
                        , React.createElement('br')
                        , (lang==="en"?"Expenses: ":"支出：")+summary.el+" · "
                        , (lang==="en"?"Reminders: ":"提醒：")+summary.reminders+" · "
                        , (lang==="en"?"Licenses: ":"证件：")+summary.licenses
                      )
                    )
                    // Findings
                    , renderGroup(lang==="en"?"🔴 Critical":"🔴 严重问题",crit,C.danger)
                    , renderGroup(lang==="en"?"🟡 Warnings":"🟡 需要注意",warn,"#FFB300")
                    , renderGroup(lang==="en"?"🔵 Info":"🔵 提示信息",info,C.accent2)
                  );
                }())
            )
          )
        )
      ) : null

      , sf==="drawer_driver" ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:C.bg,zIndex:300,overflowY:"auto"} }
          , React.createElement('div', { style: {maxWidth:600,margin:"0 auto",padding:"0 0 80px"} }
            , React.createElement('div', { style: {background:C.bg2,padding:"16px 18px",borderBottom:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10} }
              , React.createElement('button', { onClick: function(){setSf(null);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"} }, "✕")
              , React.createElement('div', { style: {fontSize:16,fontWeight:800} }, "🧑 " , lang==="en"?"Driver Info":"司机信息")
              , React.createElement('button', { onClick: function(){setSf(null);}, style: {background:"linear-gradient(135deg,#00CFFF,#0044EE)",border:"none",color:"#fff",fontSize:20,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 10px rgba(0,207,255,0.3)"} }, "✓")
            )
            , React.createElement('div', { style: {padding:"16px 14px"} }
              , React.createElement('div', { style: {fontSize:12,color:C.text3,marginBottom:14,lineHeight:1.5,padding:"10px 12px",background:C.bg3,border:"1px solid "+C.border,borderRadius:8} },
                  lang==="en"
                    ? "💡 Driver info is independent of your vehicle — you only need to fill it once, and it stays even when you switch vehicles."
                    : "💡 司机信息独立于车辆 — 只需填写一次，切换车辆时不会丢失。"
                )
              , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:C.gold,marginBottom:10} }, lang==="en"?"Personal":"基本信息")
              , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:8} }
                , React.createElement(Field, { label: lang==="en"?"Full Name":"姓名", value: driver.name||"", onChange: function(v){setDriver(Object.assign({},driver,{name:v}));}, placeholder: lang==="en"?"John Doe":"姓名" })
                , React.createElement(Field, { label: lang==="en"?"Phone":"电话", type: "tel", value: driver.phone||"", onChange: function(v){setDriver(Object.assign({},driver,{phone:v}));}, placeholder: "(347) 555-0100" })
                , React.createElement(Field, { label: lang==="en"?"TLC Hack #":"TLC 驾照号", value: driver.tlcHack||"", onChange: function(v){setDriver(Object.assign({},driver,{tlcHack:v}));}, placeholder: "6-digit" })
                , React.createElement(Field, { label: lang==="en"?"DMV License #":"DMV 驾照号", value: driver.dmvLic||"", onChange: function(v){setDriver(Object.assign({},driver,{dmvLic:v.toUpperCase()}));}, placeholder: "NY DMV #" })
              )
              , React.createElement(Field, { label: "Email", type: "email", value: driver.email||"", onChange: function(v){setDriver(Object.assign({},driver,{email:v}));}, placeholder: "you@example.com" })
              , React.createElement('div', { style: {height:1,background:C.border,margin:"20px 0"} })
              , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:C.danger,marginBottom:10} }, "🆘 " , lang==="en"?"Emergency Contact":"紧急联系人")
              , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:10} }
                , React.createElement(Field, { label: lang==="en"?"Name":"姓名", value: driver.emergName||"", onChange: function(v){setDriver(Object.assign({},driver,{emergName:v}));}, placeholder: lang==="en"?"Spouse / Family":"配偶 / 亲属" })
                , React.createElement(Field, { label: lang==="en"?"Phone":"电话", type: "tel", value: driver.emergPhone||"", onChange: function(v){setDriver(Object.assign({},driver,{emergPhone:v}));}, placeholder: "(347) 555-0200" })
              )
            )
          )
        )
      ) : null

      , (sf && sf.indexOf("vehicle_history_")===0) ? (function(){
          var vid = sf.replace("vehicle_history_","");
          // Find the vehicle (current veh OR saved profile)
          var isCurrent = veh.vehicleId === vid;
          var vp = isCurrent ? veh : (savedVehicles||[]).find(function(p){return p.vehicleId===vid;});
          if(!vp){
            // Vehicle not found — close
            return React.createElement('div', { style: {position:"fixed",inset:0,background:C.bg,zIndex:600,padding:20,textAlign:"center"} },
              React.createElement('button', {onClick:function(){setSf(null);}, style:{background:"#1E3050",border:"none",color:C.text,padding:"10px 20px",borderRadius:8,cursor:"pointer"}}, lang==="en"?"Close":"关闭"),
              React.createElement('div', {style:{marginTop:40,color:C.text3}}, lang==="en"?"Vehicle not found":"未找到该车辆")
            );
          }
          // Filter expenses for this vehicle — ONLY vehicle-related categories.
          // Excludes platform/license/other categories that are tagged with vehicleId
          // but aren't actually about THIS vehicle (e.g., TLC license, phone bill, coffee).
          var vExps = el.filter(function(e){
            if(e.vehicleId !== vid) return false;
            var cat = allC[e.category];
            // Keep only categories in the "车辆" group; reject if category is unknown or in other groups.
            return cat && cat.g === "车辆";
          });
          var vDailies = (dl||[]).filter(function(d){return d.vehicleId===vid;});
          // Total spend
          var totalSpend = vExps.reduce(function(s,e){return s+(+e.amount||0);},0);
          var totalLease = vDailies.reduce(function(s,d){return s+(+d.lease||0);},0);
          // Group by category
          var byCat = {};
          vExps.forEach(function(e){
            var k = e.category || "other";
            if(!byCat[k]) byCat[k] = {total:0,count:0,items:[]};
            byCat[k].total += (+e.amount||0);
            byCat[k].count++;
            byCat[k].items.push(e);
          });
          var catList = Object.keys(byCat).sort(function(a,b){return byCat[b].total-byCat[a].total;});
          // Date range
          var dates = vExps.map(function(e){return e.date;}).filter(Boolean).sort();
          var firstDate = dates[0] || "";
          var lastDate = dates[dates.length-1] || "";
          var daysSpan = (firstDate && lastDate) ? Math.round((new Date(lastDate)-new Date(firstDate))/86400000)+1 : 0;
          // Odometer span
          var odoEntries = vExps.filter(function(e){return e.odometer&&+e.odometer>0;}).sort(function(a,b){return a.date.localeCompare(b.date);});
          var firstOdo = odoEntries[0]?+odoEntries[0].odometer:0;
          var lastOdo = odoEntries[odoEntries.length-1]?+odoEntries[odoEntries.length-1].odometer:0;
          var milesDriven = lastOdo>firstOdo ? lastOdo-firstOdo : 0;
          // Maintenance timeline (specific categories: oil, tires, brakes, battery, repair, maint)
          var maintCats = ["oil","tires","brakes","battery","repair","maint","carwash"];
          var maintTimeline = vExps.filter(function(e){return maintCats.indexOf(e.category)>=0;}).sort(function(a,b){return (b.date||"").localeCompare(a.date||"");}).slice(0,15);
          // Recent fuel/charging
          var fuelCharge = vExps.filter(function(e){return (e.category==="fuel"||e.category==="charging")&&e.amount&&e.qty&&+e.qty>0;}).sort(function(a,b){return (b.date||"").localeCompare(a.date||"");}).slice(0,10);
          var vehLabel = vp._savedName || ((vp.year?vp.year+" ":"")+(vp.brand||"")+(vp.model?" "+vp.model:""));
          return React.createElement('div', { style: {position:"fixed",inset:0,background:C.bg,zIndex:600,overflowY:"auto"} }
            , React.createElement('div', { style: {maxWidth:600,margin:"0 auto",padding:"0 0 80px"} }
              // Header
              , React.createElement('div', { style: {background:C.bg2,padding:"14px 18px",borderBottom:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10} }
                , React.createElement('button', { onClick: function(){setSf(null);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"} }, "✕")
                , React.createElement('div', { style: {fontSize:15,fontWeight:800,flex:1,textAlign:"center",padding:"0 8px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"} }, "📊 ", vehLabel || (lang==="en"?"Vehicle History":"车辆履历"))
                , React.createElement('div', {style:{width:34}}) // spacer
              )
              , React.createElement('div', { style: {padding:"14px"} }
                // Vehicle summary card
                , React.createElement(Card, { style: {marginBottom:12,padding:"14px"} }
                  , React.createElement('div', { style: {fontSize:12,color:C.text3,marginBottom:8,letterSpacing:0.3} }, lang==="en"?"VEHICLE":"车辆")
                  , React.createElement('div', { style: {fontSize:16,fontWeight:700,color:isCurrent?"#5ADA7A":C.text,marginBottom:4} },
                      isCurrent ? "✓ " : "",
                      vehLabel,
                      isCurrent ? React.createElement('span',{style:{fontSize:11,padding:"1px 6px",borderRadius:4,background:"#2A6040",color:"#5ADA7A",fontWeight:600,marginLeft:6}},lang==="en"?"CURRENT":"当前") : null
                    )
                  , React.createElement('div', { style: {fontSize:12,color:C.text3,lineHeight:1.6} },
                      vp.plate ? (lang==="en"?"Plate: ":"车牌: ")+vp.plate+"  " : "",
                      vp.tlcPlate ? "TLC: "+vp.tlcPlate+"  " : "",
                      vp.type ? (vp.type==="electric"?"⚡ "+(lang==="en"?"Electric":"电动"):vp.type==="petrol"?"⛽ "+(lang==="en"?"Petrol":"燃油"):vp.type==="hybrid"?"🔄 "+(lang==="en"?"Hybrid":"混动"):"") : "",
                      vp.loanType ? "  · "+(vp.loanType==="loan"?(lang==="en"?"Loan":"贷款"):vp.loanType==="lease"?(lang==="en"?"Lease":"租赁"):vp.loanType==="own"?(lang==="en"?"Owned":"全款"):vp.loanType==="rental"?(lang==="en"?"Rental":"周租"):vp.loanType) : ""
                    )
                )
                // Stats summary
                , React.createElement(Card, { style: {marginBottom:12,padding:"14px",background:"linear-gradient(180deg,#0F1F35 0%,#0A1828 100%)",border:"1px solid #1F3A5A"} }
                  , React.createElement('div', { style: {fontSize:12,fontWeight:700,color:C.accent,marginBottom:10,letterSpacing:0.3} }, "💰 ", lang==="en"?"Lifetime Stats":"累计数据")
                  , vExps.length === 0
                    ? React.createElement('div', { style: {fontSize:13,color:C.text3,textAlign:"center",padding:"10px 0"} }, lang==="en"?"No expenses recorded yet for this vehicle":"还没有这辆车的支出记录")
                    : React.createElement('div', null
                      , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10} }
                        , React.createElement('div', null
                          , React.createElement('div', {style:{fontSize:12,color:C.text3,marginBottom:2}}, lang==="en"?"Total Spend":"累计支出")
                          , React.createElement('div', {style:{fontSize:18,fontWeight:800,color:C.danger}}, fmt(totalSpend+totalLease))
                        )
                        , React.createElement('div', null
                          , React.createElement('div', {style:{fontSize:12,color:C.text3,marginBottom:2}}, lang==="en"?"Records":"记录数")
                          , React.createElement('div', {style:{fontSize:18,fontWeight:800,color:C.accent}}, vExps.length+vDailies.length)
                        )
                      )
                      , milesDriven > 0 ? React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,paddingTop:8,borderTop:"1px solid "+C.border} }
                        , React.createElement('div', null
                          , React.createElement('div', {style:{fontSize:12,color:C.text3,marginBottom:2}}, lang==="en"?"Miles Driven":"行驶里程")
                          , React.createElement('div', {style:{fontSize:16,fontWeight:700,color:C.gold}}, milesDriven.toLocaleString()+" mi")
                        )
                        , totalSpend>0 && milesDriven>0 ? React.createElement('div', null
                          , React.createElement('div', {style:{fontSize:12,color:C.text3,marginBottom:2}}, lang==="en"?"Cost / Mile":"每英里成本")
                          , React.createElement('div', {style:{fontSize:16,fontWeight:700,color:"#FF9A65"}}, "$",((totalSpend+totalLease)/milesDriven).toFixed(3))
                        ) : null
                      ) : null
                      , firstDate ? React.createElement('div', { style: {fontSize:12,color:C.text3,marginTop:8,textAlign:"center"} },
                          lang==="en"?"From ":"从 ", firstDate, lang==="en"?" to ":" 至 ", lastDate,
                          daysSpan>0 ? "  ("+daysSpan+(lang==="en"?" days":" 天")+")" : ""
                        ) : null
                    )
                )
                // Spending by category
                , catList.length > 0 ? React.createElement(Card, { style: {marginBottom:12,padding:"14px"} }
                  , React.createElement('div', { style: {fontSize:12,fontWeight:700,color:"#CC88FF",marginBottom:10,letterSpacing:0.3} }, "📂 ", lang==="en"?"Spending by Category":"按类别支出")
                  , catList.map(function(k){
                      var cat = allC[k] || {label:k, icon:"📌"};
                      var d = byCat[k];
                      var pct = totalSpend>0 ? Math.round(d.total/totalSpend*100) : 0;
                      return React.createElement('div', {key:k, style:{marginBottom:8}}
                        , React.createElement('div', {style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3,fontSize:13}}
                          , React.createElement('span', null, cat.icon, " ", cat.label, React.createElement('span',{style:{fontSize:11,color:C.text3,marginLeft:6}},"×",d.count))
                          , React.createElement('span', {style:{color:"#FF9A65",fontWeight:700}}, fmt(d.total))
                        )
                        , React.createElement('div', {style:{height:4,borderRadius:2,background:"#1A2A40",overflow:"hidden"}}
                          , React.createElement('div', {style:{height:4,borderRadius:2,width:pct+"%",background:"linear-gradient(90deg,#CC88FF,#FF9A65)"}})
                        )
                      );
                    })
                ) : null
                // Recent fuel/charging
                , fuelCharge.length > 0 ? React.createElement(Card, { style: {marginBottom:12,padding:"14px"} }
                  , React.createElement('div', { style: {fontSize:12,fontWeight:700,color:C.gold,marginBottom:10,letterSpacing:0.3} }, vp.type==="electric"?"⚡":"⛽", " ", lang==="en"?"Recent Fills":"最近加注")
                  , fuelCharge.map(function(e,idx){
                      var unit = e.amount/e.qty;
                      var unitLabel = e.category==="charging"?"/kWh":"/Gal";
                      return React.createElement('div', {key:e.id||idx, style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:idx<fuelCharge.length-1?"1px solid #0F1C30":"none",fontSize:13}}
                        , React.createElement('div', null
                          , React.createElement('div', {style:{color:C.text}}, fmt(e.amount), "  ", React.createElement('span',{style:{fontSize:12,color:C.text3}}, e.qty, e.category==="charging"?" kWh":" Gal"))
                          , React.createElement('div', {style:{fontSize:11,color:C.text3,marginTop:1}}, e.date, e.notes?" · "+e.notes:"")
                        )
                        , React.createElement('div', {style:{fontSize:13,fontWeight:700,color:C.accent2}}, "$"+unit.toFixed(3), unitLabel)
                      );
                    })
                ) : null
                // Maintenance timeline
                , maintTimeline.length > 0 ? React.createElement(Card, { style: {marginBottom:12,padding:"14px"} }
                  , React.createElement('div', { style: {fontSize:12,fontWeight:700,color:"#5ADA7A",marginBottom:10,letterSpacing:0.3} }, "🔧 ", lang==="en"?"Maintenance Timeline":"维修保养履历")
                  , maintTimeline.map(function(e,idx){
                      var cat = allC[e.category] || {label:e.category, icon:"🔧"};
                      return React.createElement('div', {key:e.id||idx, style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"6px 0",borderBottom:idx<maintTimeline.length-1?"1px solid #0F1C30":"none",fontSize:13,gap:8}}
                        , React.createElement('div', {style:{flex:1,minWidth:0}}
                          , React.createElement('div', {style:{color:C.text}}, cat.icon, " ", cat.label)
                          , React.createElement('div', {style:{fontSize:11,color:C.text3,marginTop:1}}, e.date, e.odometer?" · "+(+e.odometer).toLocaleString()+" mi":"", e.notes?" · "+e.notes:"")
                        )
                        , React.createElement('div', {style:{fontSize:13,fontWeight:700,color:"#FF9A65",flexShrink:0}}, fmt(e.amount))
                      );
                    })
                ) : null
                // Empty state
                , vExps.length === 0 ? React.createElement('div', { style: {padding:"30px 20px",textAlign:"center",color:C.text3,fontSize:13,lineHeight:1.6} },
                    lang==="en"?"This vehicle has no expense records yet. New expenses you add while this vehicle is current will appear here automatically.":"这辆车还没有支出记录。在它是当前车辆时新增的支出会自动归入这里。"
                  ) : null
              )
            )
          );
        })() : null

      , sf==="drawer_lic" ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:C.bg,zIndex:300,overflowY:"auto"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 424}}
          , React.createElement('div', { style: {maxWidth:600,margin:"0 auto",padding:"0 0 80px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 425}}
            , React.createElement('div', { style: {background:C.bg2,padding:"16px 18px",borderBottom:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 426}}
              , React.createElement('div', { style: {fontSize:16,fontWeight:800}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 427}}, "📋 " , T.license)
              , React.createElement('div', { style: {display:"flex",gap:8,alignItems:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 428}}
                , React.createElement(Btn, { onClick: function(){setLf({type:"",number:"",issueDate:"",expiryDate:"",renewalFee:"",reminderDays:"60",notes:""});setSf("lic");}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 429}}, "+ " , T.add)
                , React.createElement('button', { onClick: function(){setSf(null);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:32,height:32,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 430}}, "✕")
              )
            )
            , React.createElement('div', { style: {padding:"16px 14px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 433}}
              , React.createElement(Card, { style: {background:C.bg3,border:"1px solid "+C.border,marginBottom:14}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 434}}
                , React.createElement('div', { style: {fontSize:14,color:"#90EAF8",fontWeight:700,marginBottom:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 435}}, lang==="en"?"NYC TLC Renewal":"纽约 TLC 到期提醒")
                , React.createElement('div', { style: {fontSize:13,color:"#CCE8F8",lineHeight:2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 436}}, lang==="en"?"TLC Driver License: every 2 yrs ($252)":"TLC 驾驶执照：每 2年 更新（$252）", React.createElement('br', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 436}} ), lang==="en"?"FHV Vehicle License: every 1 yr":"TLC 车辆执照 FHV：每 1年 更新", React.createElement('br', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 436}} ), lang==="en"?"Vehicle Inspection: every 4 months":"车辆检验：每 4个月 一次", React.createElement('br', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 436}} ), lang==="en"?"DDC Course: every 3 yrs":"DDC 防御驾驶课程：每 3年 一次")
              )
              , ll.length===0 ? React.createElement(Empty, { text: T.noData, __self: this, __source: {fileName: _jsxFileName, lineNumber: 438}} ) : ll.map(function(lic){
                var diff=lic.expiryDate?daysFromToday(lic.expiryDate):null;
                var sc,st;
                if(diff===null){sc="#B0D4E8";st="";}
                else if(diff<0){sc="#FF1744";st=(lang==="en"?"Expired ":"已过期 ")+Math.abs(Math.round(diff))+(lang==="en"?" days ago":" 天");}
                else if(diff<30){sc=C.danger;st=Math.round(diff)+(lang==="en"?" days left":" 天");}
                else if(diff<60){sc="#FFB300";st=Math.round(diff)+(lang==="en"?" days left":" 天");}
                else{sc=C.success;st=Math.round(diff)+(lang==="en"?" days left":" 天");}
                return React.createElement(Card, { key: lic.id, __self: this, __source: {fileName: _jsxFileName, lineNumber: 446}}, React.createElement('div', { style: {display:"flex",justifyContent:"space-between"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 446}}, React.createElement('div', { style: {flex:1}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 446}}, React.createElement('div', { style: {fontSize:14,fontWeight:700,marginBottom:5}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 446}}, lic.type), lic.number?React.createElement('div', { style: {fontSize:13,color:C.text}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 446}}, lang==="en"?"No: ":"编号: ", lic.number):null, React.createElement('div', { style: {display:"flex",gap:14,marginTop:6,flexWrap:"wrap"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 446}}, lic.issueDate?React.createElement('span', { style: {fontSize:13,color:C.text}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 446}}, lang==="en"?"Issued: ":"发出: ", fmtDate(lic.issueDate)):null, lic.expiryDate?React.createElement('span', { style: Object.assign({fontSize:13,fontWeight:600},{color:sc}), __self: this, __source: {fileName: _jsxFileName, lineNumber: 446}}, lang==="en"?"Exp: ":"到期: ", fmtDate(lic.expiryDate), " " , st):null), lic.renewalFee?React.createElement('div', { style: {fontSize:13,color:"#FFB300",marginTop:5}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 446}}, lang==="en"?"Fee: ":"更新费: ", "$", lic.renewalFee):null), React.createElement('div', { style: {display:"flex",flexDirection:"column",gap:6}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 446}}, React.createElement('button', { onClick: function(){setLf(Object.assign({},lic));setSf("lic_edit_"+lic.id);}, style: {background:"none",border:"1px solid "+C.border2,borderRadius:6,padding:"3px 8px",color:C.accent2,cursor:"pointer",fontSize:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 446}}, T.edit), React.createElement('button', { onClick: function(){confirmAction(lang==="en"?"Delete license?":"删除证件？", lang==="en"?"This license will be removed (with undo).":"此证件将被移除（可撤销）。", function(){var prev=ll.slice();setLl(ll.filter(function(x){return x.id!==lic.id;}));showUndo((lang==="en"?"✓ License deleted":"✓ 证件已删除"), {prevLl:prev});});}, style: {background:"none",border:"1px solid #3A1A1A",borderRadius:6,padding:"3px 8px",color:C.danger,cursor:"pointer",fontSize:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 446}}, T.del))));
              })
              , React.createElement('div', { style: {marginTop:20}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 448}}
                , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:"#90EAF8",marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 449}}, lang==="en"?"Useful Links":"常用网站")
                , LINKS.map(function(sec,si){var isOpen=openSec===si;return React.createElement('div', { key: si, style: {marginBottom:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 450}}
                  , React.createElement('button', { onClick: function(){setOpenSec(isOpen?null:si);}, style: {width:"100%",background:C.bg2,border:"1px solid "+C.border,borderRadius:isOpen?"10px 10px 0 0":10,padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 451}}
                    , React.createElement('div', { style: {display:"flex",alignItems:"center",gap:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 452}}, React.createElement('span', { style: Object.assign({fontSize:14,fontWeight:700},{color:sec.color}), __self: this, __source: {fileName: _jsxFileName, lineNumber: 452}}, lang==="en"&&sec.title_en?sec.title_en:sec.title), React.createElement('span', { style: {fontSize:12,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 452}}, sec.links.length))
                    , React.createElement('span', { style: {color:C.text3,fontSize:14}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 453}}, isOpen?"▼":"▶")
                  )
                  , isOpen ? React.createElement('div', { style: {background:C.bg3,border:"1px solid "+C.border,borderRadius:"0 0 10px 10px",borderTop:"none"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 455}}, sec.links.map(function(link,li){return React.createElement('a', { key: li, href: link.url, target: "_blank", rel: "noopener noreferrer" , style: {display:"flex",alignItems:"center",gap:12,padding:"11px 14px",borderBottom:"1px solid #1A2A44",textDecoration:"none"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 455}}, React.createElement('div', { style: {flex:1}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 455}}, React.createElement('div', { style: {fontSize:14,fontWeight:600,color:C.text}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 455}}, lang==="en"&&link.label_en?link.label_en:link.label), React.createElement('div', { style: {fontSize:12,color:C.text3,marginTop:2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 455}}, lang==="en"&&link.desc_en?link.desc_en:link.desc)), React.createElement('span', { style: {color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 455}}, ">"));})) : null
                );})
              )
            )
          )
        )
      ) : null

      , sf==="drawer_fixed" ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:C.bg,zIndex:300,overflowY:"auto"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 464}}
          , React.createElement('div', { style: {maxWidth:600,margin:"0 auto",padding:"0 0 80px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 465}}
            , React.createElement('div', { style: {background:C.bg2,padding:"16px 18px",borderBottom:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 466}}
              , React.createElement('div', { style: {fontSize:16,fontWeight:800}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 467}}, "📅 " , T.fixedFees)
              , React.createElement('div', { style: {display:"flex",gap:8,alignItems:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 468}}
                , React.createElement(Btn, { onClick: function(){setFf({label:"",icon:"💼",cat:"other",cycle:"monthly",amount:"",day:"1",notes:"",active:true,startDate:"",endDate:"",maxCount:""});setSf("fixed");}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 469}}, "+ " , T.add)
                , React.createElement('button', { onClick: function(){setSf(null);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:32,height:32,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 470}}, "✕")
              )
            )
            , React.createElement('div', { style: {padding:"16px 14px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 473}}
              , fl.length > 0 ? React.createElement(Card, { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 474}}, React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 474}}, React.createElement('div', { style: {fontSize:13,color:C.text,marginBottom:2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 474}}, lang==="en"?"Monthly Fixed Total":"每月固定总支出"), React.createElement('div', { style: {fontSize:12,color:C.text2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 474}}, fl.filter(function(f){return f.active;}).length, " " , lang==="en"?"active":"项启用")), React.createElement('div', { style: {fontSize:22,fontWeight:900,color:"#FF9A65"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 474}}, fmt(totalFix))) : null
              , fl.length===0 ? React.createElement('div', { style: {marginBottom:14}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 475}}, React.createElement('div', { style: {fontSize:14,fontWeight:700,color:C.text2,marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 475}}, T.quickAdd), (lang==="en"?FIXSUGG_EN:FIXSUGG_ZH).map(function(sg,i){return React.createElement('button', { key: i, onClick: function(){setFf({label:sg.label,icon:sg.icon,cat:sg.cat,cycle:"monthly",amount:"",day:""+sg.day,notes:"",active:true,startDate:"",endDate:"",maxCount:""});setSf("fixed");}, style: {display:"flex",alignItems:"center",gap:12,width:"100%",background:C.bg2,border:"1px dashed #2A3A54",borderRadius:10,padding:"10px 14px",cursor:"pointer",textAlign:"left",marginBottom:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 475}}, React.createElement('span', { style: {fontSize:20}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 475}}, sg.icon), React.createElement('span', { style: {fontSize:14,color:C.text}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 475}}, sg.label), React.createElement('span', { style: {marginLeft:"auto",color:"#2A5A8A",fontSize:18}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 475}}, "+"));}), " " ) : null
              , fl.map(function(f){var monthly=f.cycle==="annual"?Math.round(+f.amount/12*100)/100:+f.amount,activeVal=f.active,cardBorder=activeVal?"#1A3A20":"#2A2A2A";return React.createElement(Card, { key: f.id, style: {border:"1px solid "+cardBorder,opacity:activeVal?1:0.5}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 476}}, React.createElement('div', { style: {display:"flex",alignItems:"center",gap:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 476}}, React.createElement('span', { style: {fontSize:22,flexShrink:0}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 476}}, f.icon), React.createElement('div', { style: {flex:1,minWidth:0}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 476}}, React.createElement('div', { style: {fontSize:14,fontWeight:700}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 476}}, f.label, activeVal?"":" ("+(lang==="en"?"paused":"暂停")+")"), React.createElement('div', { style: {fontSize:12,color:C.text2,marginTop:2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 476}}, lang==="en"?"Day ":"每月 ", f.day, lang==="en"?" ":"日", f.startDate?(lang==="en"?" · from ":" · 从")+f.startDate.slice(0,7):"", f.endDate?(lang==="en"?" · to ":" · 至")+f.endDate.slice(0,7):""), f.cycle==="annual"?React.createElement('div', { style: {fontSize:12,color:"#BAA850"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 476}}, lang==="en"?"Annual":"年费", " " , fmt(+f.amount), " ÷12" ):null), React.createElement('div', { style: {textAlign:"right"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 476}}, React.createElement('div', { style: {fontSize:16,fontWeight:800,color:"#FF9A65",marginBottom:6}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 476}}, fmt(monthly), lang==="en"?"/mo":"/月"), React.createElement('div', { style: {display:"flex",gap:6}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 476}}, React.createElement('button', { onClick: function(){setFf(Object.assign({},f));setSf("fixed_edit_"+f.id);}, style: {background:"none",border:"1px solid "+C.border2,borderRadius:6,padding:"3px 8px",color:C.accent2,cursor:"pointer",fontSize:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 476}}, T.edit), React.createElement('button', { onClick: function(){setFl(fl.map(function(x){return x.id===f.id?Object.assign({},x,{active:!x.active}):x;}));showToast(activeVal?(lang==="en"?"⏸ Paused":"⏸ 已暂停"):(lang==="en"?"▶ Resumed":"▶ 已恢复"));}, style: {background:"none",border:"1px solid "+C.border2,borderRadius:6,padding:"3px 8px",color:"#5ADA7A",cursor:"pointer",fontSize:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 476}}, activeVal?T.pause:T.resume), React.createElement('button', { onClick: function(){confirmAction(lang==="en"?"Delete fixed fee?":"删除固定费？", lang==="en"?"This fee will be removed (with undo).":"此固定费将被移除（可撤销）。", function(){var prev=fl.slice();setFl(fl.filter(function(x){return x.id!==f.id;}));showUndo((lang==="en"?"✓ Fixed fee deleted":"✓ 固定费已删除"), {prevFl:prev});});}, style: {background:"none",border:"1px solid #3A1A1A",borderRadius:6,padding:"3px 8px",color:"#FF3D00",cursor:"pointer",fontSize:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 476}}, T.del)))));})
            )
          )
        )
      ) : null

      , sf==="daily" ? (
        React.createElement(Modal, { title: dlf.id?(lang==="en"?"Edit Day":"编辑当日"):(lang==="en"?"Today\'s Income":"今日收入"), onClose: function(){setSf(null);}, onSave: function(){
          var hasIncome=(+dlf.cash||0)+(+dlf.card||0)+(+dlf.tips||0)>0;
          if(!dlf.date||!hasIncome){alert(lang==="en"?"Please enter date and at least one income field":"请输入日期和至少一项收入");return;}
          if(dlf.id){
            setDl(dl.map(function(x){return x.id===dlf.id?Object.assign({},dlf):x;}));
          }else{
            // Check for existing entry on same date
            var ex=dl.find(function(x){return x.date===dlf.date;});
            if(ex){
              if(!confirm(lang==="en"?"An entry already exists for "+dlf.date+". Overwrite?":dlf.date+" 已有记录，是否覆盖？"))return;
              setDl(dl.map(function(x){return x.id===ex.id?Object.assign({},dlf,{id:ex.id}):x;}));
            }else{
              setDl([Object.assign({},dlf,{id:Date.now()})].concat(dl));
            }
          }
          setSf(null);
        } }
          , React.createElement(Field, { label: T.date, type: "date", value: dlf.date, onChange: function(v){setDlf(Object.assign({},dlf,{date:v}));} })
          , (function(){
              // "Same as yesterday" — find most recent dl entry before today (excluding the current dlf if editing)
              if(!dl||!dl.length)return null;
              var sorted=dl.slice().sort(function(a,b){return (b.date||"").localeCompare(a.date||"");});
              var prev=sorted.find(function(d){return d.date && d.date<dlf.date && d.id!==dlf.id;});
              if(!prev)return null;
              return React.createElement('button', { onClick: function(){
                  setDlf(Object.assign({},dlf,{cash:prev.cash||"",card:prev.card||"",tips:prev.tips||"",trips:prev.trips||"",hours:prev.hours||"",miles:prev.miles||"",lease:prev.lease||"",notes:prev.notes||""}));
                }, style: {width:"100%",background:"#0A2030",border:"1px dashed #2A5070",borderRadius:8,padding:"8px 10px",color:C.accent2,fontSize:12,fontWeight:600,cursor:"pointer",marginTop:-4} }
                , "📋 ", lang==="en"?"Copy from last entry ("+fmtDate(prev.date)+")":"复制上次记录 ("+fmtDate(prev.date)+")"
              );
            })()
          , React.createElement('div', { style: {fontSize:13,color:C.text3,marginTop:4,marginBottom:-4} }, "💵 " , lang==="en"?"Income":"收入")
          , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:8} }
            , React.createElement(Field, { label: (lang==="en"?"Cash":"现金")+" ($)", type: "number", value: dlf.cash, onChange: function(v){setDlf(Object.assign({},dlf,{cash:v}));}, money: true, placeholder: "0.00" })
            , React.createElement(Field, { label: (lang==="en"?"Card":"信用卡")+" ($)", type: "number", value: dlf.card, onChange: function(v){setDlf(Object.assign({},dlf,{card:v}));}, money: true, placeholder: "0.00" })
          )
          , React.createElement(Field, { label: T.tips+" ($)", type: "number", value: dlf.tips, onChange: function(v){setDlf(Object.assign({},dlf,{tips:v}));}, money: true, placeholder: "0.00" })
          , React.createElement('div', { style: {fontSize:13,color:C.text3,marginTop:6,marginBottom:-4} }, "🚗 " , lang==="en"?"Operations":"运营")
          , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8} }
            , React.createElement(Field, { label: T.trips, type: "number", value: dlf.trips, onChange: function(v){setDlf(Object.assign({},dlf,{trips:v}));}, placeholder: "0" })
            , React.createElement(Field, { label: (lang==="en"?"Hours":"时长")+" (h)", type: "number", value: dlf.hours, onChange: function(v){setDlf(Object.assign({},dlf,{hours:v}));}, placeholder: "0" })
            , React.createElement(Field, { label: T.miles+" (mi)", type: "number", value: dlf.miles, onChange: function(v){setDlf(Object.assign({},dlf,{miles:v}));}, placeholder: "0" })
          )
          , React.createElement('div', { style: {fontSize:13,color:C.text3,marginTop:6,marginBottom:-4} }, "🏷 " , lang==="en"?"Daily Cost":"当日成本")
          , React.createElement(Field, { label: (lang==="en"?"Lease / Rental":"班车租金")+" ($)", type: "number", value: dlf.lease, onChange: function(v){setDlf(Object.assign({},dlf,{lease:v}));}, money: true, placeholder: "0.00" })
          , React.createElement(Field, { label: T.notes, value: dlf.notes, onChange: function(v){setDlf(Object.assign({},dlf,{notes:v}));}, placeholder: T.optional })
          , dlf.id ? React.createElement('button', { onClick: function(){confirmAction(lang==="en"?"Delete entry?":"删除记录？", lang==="en"?"This entry will be removed (with undo).":"此记录将被移除（可撤销）。", function(){var prev=dl.slice();setDl(dl.filter(function(x){return x.id!==dlf.id;}));setSf(null);showUndo((lang==="en"?"✓ Day deleted":"✓ 日记已删除"), {prevDl:prev});});}, style: {width:"100%",background:"#2A1010",border:"1px solid #5A2020",color:C.danger,fontSize:14,fontWeight:700,padding:"12px",borderRadius:10,cursor:"pointer",marginTop:8} }, "🗑 " , T.del) : null
        )
      ) : null

      , sf==="week_cal" ? (function(){
          // Compute the 7 days of the current week (Monday → Sunday)
          var ws = wkMon(wcWeek);
          var days = [];
          var startD = new Date(ws+"T00:00:00");
          for(var i=0;i<7;i++){
            var d = new Date(startD); d.setDate(startD.getDate()+i);
            var dStr = d.getFullYear()+"-"+p2(d.getMonth()+1)+"-"+p2(d.getDate());
            days.push(dStr);
          }
          // Get all rideshare daily entries for this week's days
          var weekEntries = dl.filter(function(d){return d.mode==="rideshare"&&days.indexOf(d.date)>=0;});
          // Per-day stats (for the badge under each date)
          var dayStats = {};
          days.forEach(function(d){
            var entries = weekEntries.filter(function(e){return e.date===d;});
            var inc = entries.reduce(function(s,e){return s+(+e.grossFare||0)+(+e.tips||0)+(+e.bonus||0)+(+e.tollReimbursed||0);},0);
            dayStats[d] = {entries:entries, inc:inc, hasData:inc>0};
          });
          // Get entries for selected day
          var selEntries = weekEntries.filter(function(e){return e.date===wcSel;});
          // Helper: prev/next week
          var prevWeek = function(){var p=new Date(ws+"T00:00:00");p.setDate(p.getDate()-7);setWcWeek(p.getFullYear()+"-"+p2(p.getMonth()+1)+"-"+p2(p.getDate()));};
          var nextWeek = function(){var p=new Date(ws+"T00:00:00");p.setDate(p.getDate()+7);setWcWeek(p.getFullYear()+"-"+p2(p.getMonth()+1)+"-"+p2(p.getDate()));};
          // Week totals
          var wkInc = days.reduce(function(s,d){return s+dayStats[d].inc;},0);
          var wkTrips = weekEntries.reduce(function(s,e){return s+(+e.trips||0);},0);
          var wkHours = weekEntries.reduce(function(s,e){return s+(+e.hours||0);},0);
          var wkMiles = weekEntries.reduce(function(s,e){return s+(+e.miles||0);},0);
          var todayStr = today();
          var dayLabels = lang==="en" ? ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] : ["一","二","三","四","五","六","日"];
          // Save individual entry helper
          var saveEntry = function(entry){
            // entry: {id?, date, platform, grossFare, tips, bonus, tollReimbursed, platformFee, trips, hours, miles, notes}
            var newEntry = Object.assign({mode:"rideshare", vehicleId: veh.vehicleId}, entry);
            if(entry.id){
              setDl(dl.map(function(x){return x.id===entry.id ? Object.assign({},x,newEntry) : x;}));
            } else {
              newEntry.id = Date.now() + Math.floor(Math.random()*1000);
              setDl([newEntry].concat(dl));
            }
          };
          var deleteEntry = function(id){
            setDl(dl.filter(function(x){return x.id!==id;}));
          };
          return React.createElement('div', { style: {position:"fixed",inset:0,background:C.bg,zIndex:600,overflowY:"auto"} }
            , React.createElement('div', { style: {maxWidth:600,margin:"0 auto",padding:"0 0 80px"} }
              // Header
              , React.createElement('div', { style: {background:C.bg2,padding:"14px 18px",borderBottom:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10} }
                , React.createElement('button', { onClick: function(){setSf(null);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"} }, "✕")
                , React.createElement('div', { style: {fontSize:15,fontWeight:800} }, "📅 ", T.weekly)
                , React.createElement('div', { style: {width:34} })
              )
              , React.createElement('div', { style: {padding:"14px"} }
                // Week navigation
                , React.createElement('div', { style: {display:"flex",alignItems:"center",gap:8,marginBottom:12} }
                  , React.createElement('button', { onClick: prevWeek, style: {background:C.bg3,border:"1px solid "+C.border,borderRadius:8,padding:"8px 14px",color:C.text,fontSize:14,cursor:"pointer"} }, "‹")
                  , React.createElement('div', { style: {flex:1,textAlign:"center",fontSize:14,fontWeight:600,color:C.text} },
                      lang==="en" ? ("Week of "+ws) : (ws.slice(5)+" 那一周")
                    )
                  , React.createElement('button', {
                      onClick: function(){var t=today();setWcWeek(wkMon(t));setWcSel(t);},
                      style: {background:wcSel===todayStr?"#0A4020":C.border,border:"1px solid "+(wcSel===todayStr?"#2A8050":C.border2),borderRadius:8,padding:"8px 12px",color:wcSel===todayStr?"#5ADA7A":C.accent2,fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}
                    }, lang==="en"?"Today":"今天")
                  , React.createElement('button', { onClick: nextWeek, style: {background:C.bg3,border:"1px solid "+C.border,borderRadius:8,padding:"8px 14px",color:C.text,fontSize:14,cursor:"pointer"} }, "›")
                )
                // 7-day calendar strip
                , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:14} }
                  , days.map(function(d,i){
                      var stats = dayStats[d];
                      var isSel = d===wcSel;
                      var isToday = d===todayStr;
                      var dayNum = +d.slice(8);
                      // Color: green if has data, blue if selected, gray otherwise
                      var bg = isSel ? C.bg3 : (stats.hasData ? "#0A2018" : C.bg3);
                      var bd = isSel ? C.accent : (stats.hasData ? "#2A6040" : C.border);
                      var fg = stats.hasData ? "#5ADA7A" : C.text2;
                      return React.createElement('button', {
                        key:d,
                        onClick: function(){setWcSel(d);},
                        style: {background:bg,border:"1.5px solid "+bd,borderRadius:8,padding:"6px 2px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,minHeight:62}
                      },
                        React.createElement('div', {style:{fontSize:9,color:C.text3,letterSpacing:0.3}}, dayLabels[i]),
                        React.createElement('div', {style:{fontSize:15,fontWeight:700,color:isSel?C.accent:(stats.hasData?fg:C.text)}}, dayNum, isToday?React.createElement('span',{style:{color:C.gold,marginLeft:1,fontSize:10}},"•"):null),
                        stats.hasData ? React.createElement('div', {style:{fontSize:9,color:fg,fontWeight:600}}, "$"+Math.round(stats.inc)) : React.createElement('div', {style:{fontSize:9,color:C.text3}}, "—")
                      );
                    })
                )
                // Week totals
                , wkInc>0 ? React.createElement(Card, { style: {marginBottom:14,padding:"10px 14px",background:"#0A2040",border:"1px solid #1A4080"} }
                  , React.createElement('div', {style:{fontSize:11,color:C.text3,marginBottom:4,letterSpacing:0.3}}, lang==="en"?"WEEK TOTAL":"本周累计")
                  , React.createElement('div', {style:{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}
                    , React.createElement('div', {style:{fontSize:20,fontWeight:800,color:"#5ADA7A"}}, fmt(wkInc))
                    , React.createElement('div', {style:{fontSize:12,color:C.text3}},
                        wkTrips>0?wkTrips+" "+T.trips:"",
                        wkHours>0?(wkTrips>0?" · ":"")+wkHours+"h":"",
                        wkMiles>0?(wkTrips||wkHours?" · ":"")+wkMiles+" mi":""
                      )
                  )
                ) : null
                // Selected day editing area
                , React.createElement('div', { style: {borderTop:"2px solid #1A2A40",paddingTop:14,marginBottom:10} }
                  , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10} }
                    , React.createElement('div', {style:{fontSize:14,fontWeight:700,color:C.text}},
                        "📝 ", wcSel,
                        wcSel===todayStr ? React.createElement('span',{style:{fontSize:11,color:C.gold,marginLeft:6}}, lang==="en"?"(today)":"(今天)") : null
                      )
                    , React.createElement('label', {style:{display:"flex",alignItems:"center",gap:6,fontSize:11,color:C.text3,cursor:"pointer"}}
                      , React.createElement('input',{type:"checkbox",checked:wcShowPlatform,onChange:function(e){setWcShowPlatform(e.target.checked);},style:{cursor:"pointer"}})
                      , lang==="en"?"Per platform":"分平台"
                    )
                  )
                  // List existing entries for this day
                  , selEntries.length>0 ? React.createElement('div', {style:{marginBottom:10}}
                    , selEntries.map(function(e){
                        var inc = (+e.grossFare||0)+(+e.tips||0)+(+e.bonus||0)+(+e.tollReimbursed||0);
                        return React.createElement('div', {key:e.id, style:{background:C.bg3,border:"1px solid "+C.border,borderRadius:8,padding:"8px 12px",marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center"}}
                          , React.createElement('div', {style:{flex:1,minWidth:0}}
                            , React.createElement('div', {style:{fontSize:13,fontWeight:600,color:C.text}}, e.platform||"Uber", " · ", fmt(inc))
                            , React.createElement('div', {style:{fontSize:11,color:C.text3,marginTop:1}},
                                e.trips?e.trips+" "+T.trips:"",
                                e.hours?(e.trips?" · ":"")+e.hours+"h":"",
                                e.miles?(e.trips||e.hours?" · ":"")+e.miles+" mi":"",
                                (+e.platformFee||0)>0?(e.trips||e.hours||e.miles?" · ":"")+"抽 "+fmt(e.platformFee):""
                              )
                          )
                          , React.createElement('div', {style:{display:"flex",gap:6}}
                            , React.createElement('button', {onClick:function(){
                                setDlf(Object.assign({},{date:wcSel,mode:"rideshare",platform:"Uber",grossFare:"",tips:"",bonus:"",tollReimbursed:"",platformFee:"",trips:"",hours:"",miles:"",notes:""},e));
                                setSf("dl_edit");
                              }, style:{background:"none",border:"1px solid "+C.border2,borderRadius:6,padding:"4px 10px",color:C.accent2,fontSize:12,cursor:"pointer"}}, T.edit)
                            , React.createElement('button', {onClick:function(){
                                confirmAction(lang==="en"?"Delete entry?":"删除记录？", lang==="en"?"This entry will be removed.":"此条记录将被移除。", function(){deleteEntry(e.id);showToast(lang==="en"?"✓ Deleted":"✓ 已删除");});
                              }, style:{background:"none",border:"1px solid #5A2020",borderRadius:6,padding:"4px 10px",color:C.danger,fontSize:12,cursor:"pointer"}}, T.del)
                          )
                        );
                      })
                  ) : null
                  // Add entry button
                  , React.createElement('button', {
                      onClick: function(){
                        setDlf({date:wcSel,mode:"rideshare",platform:"Uber",grossFare:"",tips:"",bonus:"",tollReimbursed:"",platformFee:"",trips:"",hours:"",miles:"",notes:""});
                        setSf("dl_edit");
                      },
                      style: {width:"100%",background:"linear-gradient(135deg,#0A4020,#1A6030)",border:"1px solid #2A8050",borderRadius:10,padding:"12px",color:"#5ADA7A",fontSize:14,fontWeight:700,cursor:"pointer"}
                    }, "+ ", selEntries.length===0 ? (lang==="en"?"Add entry for this day":"添加这一天的记录") : (lang==="en"?"Add another platform":"再加一个平台")
                  )
                )
                // All days with data (overview of the whole week — no need to tap each day)
                , (function(){
                    var daysWithData = days.filter(function(d){return dayStats[d].hasData;});
                    if(daysWithData.length<=1) return null;  // Only show if 2+ days have data
                    return React.createElement('div', {style:{borderTop:"1px solid "+C.border,paddingTop:14,marginTop:14}}
                      , React.createElement('div', {style:{fontSize:13,fontWeight:700,color:C.text2,marginBottom:10}}, "📋 ", lang==="en"?"All days this week":"本周所有记录")
                      , daysWithData.map(function(d){
                          var dEntries = dayStats[d].entries;
                          var dayNum = +d.slice(8);
                          var dowIdx = (new Date(d+"T00:00:00").getDay()+6)%7;  // Mon=0
                          var dowLabel = dayLabels[dowIdx];
                          var isToday = d===todayStr;
                          var dayInc = dayStats[d].inc;
                          var dayTrips = dEntries.reduce(function(s,e){return s+(+e.trips||0);},0);
                          var dayHours = dEntries.reduce(function(s,e){return s+(+e.hours||0);},0);
                          var dayMiles = dEntries.reduce(function(s,e){return s+(+e.miles||0);},0);
                          return React.createElement('div', {key:d, style:{background:C.bg3,border:"1px solid "+C.border,borderRadius:8,padding:"8px 12px",marginBottom:6}}
                            // Day header
                            , React.createElement('div', {style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6,paddingBottom:6,borderBottom:"1px solid "+C.border}}
                              , React.createElement('div', {style:{display:"flex",alignItems:"center",gap:8}}
                                , React.createElement('span', {style:{fontSize:12,color:C.text3}}, dowLabel)
                                , React.createElement('span', {style:{fontSize:14,fontWeight:700,color:isToday?C.gold:C.text}}, d.slice(5))
                                , isToday?React.createElement('span',{style:{fontSize:10,color:C.gold}},"•"):null
                              )
                              , React.createElement('div', {style:{textAlign:"right"}}
                                , React.createElement('div', {style:{fontSize:14,fontWeight:700,color:"#5ADA7A"}}, fmt(dayInc))
                                , (dayTrips||dayHours||dayMiles) ? React.createElement('div', {style:{fontSize:10,color:C.text3,marginTop:1}},
                                    dayTrips?dayTrips+(lang==="en"?" trips":" 趟"):"",
                                    dayHours?(dayTrips?" · ":"")+dayHours+"h":"",
                                    dayMiles?(dayTrips||dayHours?" · ":"")+dayMiles+"mi":""
                                  ) : null
                              )
                            )
                            // Per-platform rows
                            , dEntries.map(function(e,ei){
                                var entryInc = (+e.grossFare||0)+(+e.tips||0)+(+e.bonus||0)+(+e.tollReimbursed||0);
                                return React.createElement('div', {key:ei, style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,padding:"3px 0"}}
                                  , React.createElement('div', {style:{display:"flex",alignItems:"center",gap:8,flex:1,minWidth:0}}
                                    , React.createElement('span', {style:{fontSize:12,color:C.accent2,fontWeight:600}}, e.platform||"Uber")
                                    , React.createElement('span', {style:{fontSize:10,color:C.text3}},
                                        e.trips?e.trips+(lang==="en"?" trips":" 趟"):"",
                                        e.hours?(e.trips?" · ":"")+e.hours+"h":"",
                                        e.miles?(e.trips||e.hours?" · ":"")+e.miles+"mi":"",
                                        (+e.platformFee||0)>0?(e.trips||e.hours||e.miles?" · ":"")+(lang==="en"?"fee ":"抽 ")+fmt(e.platformFee):""
                                      )
                                  )
                                  , React.createElement('div', {style:{display:"flex",alignItems:"center",gap:6,flexShrink:0}}
                                    , React.createElement('span', {style:{fontSize:12,color:C.text2}}, fmt(entryInc))
                                    , React.createElement('button', {
                                        onClick: function(){
                                          setDlf(Object.assign({},{date:d,mode:"rideshare",platform:"Uber",grossFare:"",tips:"",bonus:"",tollReimbursed:"",platformFee:"",trips:"",hours:"",miles:"",notes:""},e));
                                          setSf("dl_edit");
                                        },
                                        style: {background:"none",border:"none",color:C.accent2,fontSize:14,cursor:"pointer",padding:"0 4px"}
                                      }, "✎")
                                  )
                                );
                              })
                          );
                        })
                    );
                  }())
                // Help text
                , React.createElement('div', {style:{fontSize:11,color:C.text3,padding:"10px 12px",background:C.bg3,borderRadius:8,lineHeight:1.6,marginTop:14}}
                  , "💡 ", lang==="en"?"Tap any day to edit it. Days with data show in green. Cross-month weeks are split automatically.":"点击任何一天来填写。已填的天会变绿。跨月的周自动按日期归到对应月份。"
                )
              )
            )
          );
        }()) : null

      , sf==="dl_edit" ? (
        React.createElement(Modal, {
          title: dlf.id ? (lang==="en"?"Edit Entry":"编辑记录") : (lang==="en"?"New Entry":"新增记录"),
          onClose: function(){setSf("week_cal");},
          onSave: function(){
            if(!dlf.grossFare && !dlf.tips && !dlf.trips && !dlf.miles){
              showToast(lang==="en"?"⚠ Fill at least one field":"⚠ 至少填写一个字段","warn");
              return;
            }
            var entry = Object.assign({}, dlf, {mode:"rideshare", vehicleId: veh.vehicleId});
            if(dlf.id){
              setDl(dl.map(function(x){return x.id===dlf.id ? entry : x;}));
            } else {
              entry.id = Date.now() + Math.floor(Math.random()*1000);
              setDl([entry].concat(dl));
            }
            setSf("week_cal");
            showToast(lang==="en"?"✓ Saved":"✓ 已保存");
          }
        }
          , React.createElement('div', { style: {fontSize:13,color:C.text2,marginBottom:8} }, "📅 ", dlf.date)
          , React.createElement(Field, {
              label: T.platform_lbl,
              value: dlf.platform||"Uber",
              onChange: function(v){
                if(v==="__new__"){
                  inputAction({title:lang==="en"?"New platform":"新平台",onSubmit:function(n){if(n&&n.trim()){var nm=n.trim();if(allPlat.indexOf(nm)<0)setCustPlat(custPlat.concat([nm]));setDlf(Object.assign({},dlf,{platform:nm}));}}});return;
                }
                setDlf(Object.assign({},dlf,{platform:v}));
              },
              options: allPlat.map(function(p){return [p,p];}).concat([["__new__",lang==="en"?"+ Add new platform...":"+ 添加新平台..."]])
            })
          , React.createElement('div', {style:{background:"#0A2010",border:"1px solid #2A6030",borderRadius:10,padding:"12px",marginBottom:6}}
            , React.createElement('div', {style:{fontSize:11,color:"#5ADA7A",fontWeight:700,marginBottom:8,letterSpacing:0.3}}, "💰 ", lang==="en"?"Income":"收入")
            , React.createElement('div', {style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}
              , React.createElement(Field, { label: T.grossFare+" ($)", type: "number", value: dlf.grossFare||"", onChange: function(v){setDlf(Object.assign({},dlf,{grossFare:v}));}, money: true, placeholder: "0.00" })
              , React.createElement(Field, { label: T.tips+" ($)", type: "number", value: dlf.tips||"", onChange: function(v){setDlf(Object.assign({},dlf,{tips:v}));}, money: true, placeholder: "0.00" })
              , React.createElement(Field, { label: T.bonus+" ($)", type: "number", value: dlf.bonus||"", onChange: function(v){setDlf(Object.assign({},dlf,{bonus:v}));}, money: true, placeholder: "0.00" })
              , React.createElement(Field, { label: T.toll+" ($)", type: "number", value: dlf.tollReimbursed||"", onChange: function(v){setDlf(Object.assign({},dlf,{tollReimbursed:v}));}, money: true, placeholder: "0.00" })
            )
            , React.createElement(Field, { label: (lang==="en"?"Platform fee":"平台抽成")+" ($)", type: "number", value: dlf.platformFee||"", onChange: function(v){setDlf(Object.assign({},dlf,{platformFee:v}));}, money: true, placeholder: "0.00" })
          )
          , React.createElement('div', {style:{background:C.bg3,border:"1px solid "+C.border,borderRadius:10,padding:"12px",marginTop:6}}
            , React.createElement('div', {style:{fontSize:11,color:C.text3,fontWeight:700,marginBottom:8,letterSpacing:0.3}}, "📊 ", lang==="en"?"Operations":"运营数据")
            , React.createElement('div', {style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}
              , React.createElement(Field, { label: T.trips, type: "number", value: dlf.trips||"", onChange: function(v){setDlf(Object.assign({},dlf,{trips:v}));}, placeholder: "0" })
              , React.createElement(Field, { label: lang==="en"?"Hours":"小时", type: "number", value: dlf.hours||"", onChange: function(v){setDlf(Object.assign({},dlf,{hours:v}));}, placeholder: "0" })
              , React.createElement(Field, { label: T.miles, type: "number", value: dlf.miles||"", onChange: function(v){setDlf(Object.assign({},dlf,{miles:v}));}, placeholder: "0" })
            )
          )
          , React.createElement(Field, { label: T.notes, value: dlf.notes||"", onChange: function(v){setDlf(Object.assign({},dlf,{notes:v}));}, placeholder: T.optional })
          , dlf.id ? React.createElement('button', { onClick: function(){confirmAction(lang==="en"?"Delete entry?":"删除记录？", lang==="en"?"This entry will be removed.":"此条记录将被移除。", function(){setDl(dl.filter(function(x){return x.id!==dlf.id;}));setSf("week_cal");showToast(lang==="en"?"✓ Deleted":"✓ 已删除");});}, style: {width:"100%",background:"#2A1010",border:"1px solid #5A2020",color:C.danger,fontSize:14,fontWeight:700,padding:"12px",borderRadius:10,cursor:"pointer",marginTop:8} }, "🗑 " + (lang==="en"?"Delete":"删除")) : null
        )
      ) : null

      , sf==="week" ? (
        React.createElement(Modal, { title: T.weekly, onClose: function(){setSf(null);setWf({weekStart:wkMon(today()),platform:"Uber",trips:"",hours:"",onlineHours:"",miles:"",grossFare:"",tips:"",bonus:"",tollReimbursed:"",payoutAmount:"",payoutDate:"",notes:""});}, onSave: function(){if(!wf.trips&&!wf.hours&&!wf.miles&&!wf.grossFare)return;var ws=wkMon(wf.weekStart);if(wf.id){setWl(wl.map(function(x){return x.id===wf.id?Object.assign({},wf,{weekStart:ws}):x;}));}else{var ex=wl.find(function(w){return w.weekStart===ws&&w.platform===wf.platform;});if(ex){setWl(wl.map(function(w){return w.id===ex.id?Object.assign({},wf,{weekStart:ws,id:ex.id}):w;}));}else{var nwl=[Object.assign({},wf,{weekStart:ws,id:Date.now()})].concat(wl);setWl(nwl);autoSave({sl:sl,el:el,fl:fl});}}setSf(null);showToast(lang==="en"?"✓ Week saved":"✓ 周记录已保存");}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 483}}
          , React.createElement(Field, { label: T.weekStart, type: "date", value: wf.weekStart, onChange: function(v){setWf(Object.assign({},wf,{weekStart:wkMon(v)}));}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 484}} )
          , React.createElement('div', { style: {background:C.bg3,borderRadius:8,padding:"8px 12px",fontSize:14,color:C.text}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 485}}, lang==="en"?"Week: ":"本周：", wkLabel(wf.weekStart))
          , React.createElement(Field, { label: T.platform_lbl, value: wf.platform, onChange: function(v){if(v==="__new__"){inputAction({title:lang==="en"?"New platform name":"新平台名称",placeholder:lang==="en"?"e.g. Curb, Via":"如 Curb, Via",onSubmit:function(n){if(n&&n.trim()){var nm=n.trim();if(allPlat.indexOf(nm)<0)setCustPlat(custPlat.concat([nm]));setWf(Object.assign({},wf,{platform:nm}));}}});return;}setWf(Object.assign({},wf,{platform:v}));}, options: allPlat.map(function(p){return [p,p];}).concat([["__new__",lang==="en"?"+ Add new platform...":"+ 添加新平台..."]]), __self: this, __source: {fileName: _jsxFileName, lineNumber: 486}} )
          // PRIMARY FIELDS — what you really need to fill weekly
          , React.createElement('div', {style:{background:"#0A2010",border:"1px solid #2A6030",borderRadius:10,padding:"12px 14px",marginBottom:6}}
              , React.createElement('div', {style:{fontSize:12,color:"#5ADA7A",fontWeight:700,marginBottom:8,letterSpacing:0.3}}, "💰 " , lang==="en"?"Weekly Income (4 main fields)":"本周收入（4 个主要字段）")
              , React.createElement('div', { style: {display:"flex",flexDirection:"column",gap:8} }
                  , React.createElement(Field, { label: lang==="en"?"Platform paid amount ($)":"平台发的金额 ($)", type: "number", value: wf.grossFare, onChange: function(v){setWf(Object.assign({},wf,{grossFare:v}));}, money: true, placeholder: "0.00" })
                  , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:8} }
                      , React.createElement(Field, { label: T.tips+" ($)", type: "number", value: wf.tips, onChange: function(v){setWf(Object.assign({},wf,{tips:v}));}, money: true, placeholder: "0.00" })
                      , React.createElement(Field, { label: T.toll+" ($)", type: "number", value: wf.tollReimbursed, onChange: function(v){setWf(Object.assign({},wf,{tollReimbursed:v}));}, money: true, placeholder: "0.00" })
                    )
                  , (function(){
                      var existingFee = null;
                      if(wf.weekStart){
                        existingFee = el.find(function(e){
                          if(e.category!=="platform") return false;
                          if(!e.date) return false;
                          if(e.date!==wf.weekStart) return false;
                          if(wf.platform && e.notes && e.notes.indexOf(wf.platform)<0) return false;
                          return true;
                        });
                      }
                      return React.createElement('div', {style:{background:"#1A0A1A",border:"1px solid #5A2A4A",borderRadius:8,padding:"8px 10px"}}
                        , React.createElement('div', {style:{fontSize:12,color:"#CC88FF",fontWeight:700,marginBottom:4}}, "💸 " , lang==="en"?"Service Fee ($) — auto-recorded as expense":"平台费 ($) — 自动作为支出录入")
                        , existingFee ? React.createElement('div', {style:{fontSize:11,color:"#5ADA7A",marginBottom:4,padding:"4px 6px",background:"#0A2018",border:"1px solid #2A6040",borderRadius:4}}, "✓ ", lang==="en"?"Already recorded: $":"已记录：$", (+existingFee.amount||0).toFixed(2)) : null
                        , React.createElement(Field, { label: existingFee?(lang==="en"?"Add more (extra)":"再加"):"$", type: "number", value: wf.platformFee, onChange: function(v){setWf(Object.assign({},wf,{platformFee:v}));}, money: true, placeholder: existingFee?"0.00 (already recorded)":"0.00" })
                      );
                    }())
                )
            )
          // SECONDARY: collapsed details
          , React.createElement('details', {style:{background:C.bg3,border:"1px solid "+C.border,borderRadius:10,padding:"8px 12px",marginTop:6}}
              , React.createElement('summary', {style:{cursor:"pointer",fontSize:12,color:C.text3,fontWeight:600,padding:"4px 0",listStyle:"none",userSelect:"none"}}, "▸ " , lang==="en"?"More details (optional)":"更多详情（选填）")
              , React.createElement('div', {style:{paddingTop:10,display:"flex",flexDirection:"column",gap:8}}
                // Bonus first (still money-related, complements main income fields above)
                , React.createElement(Field, { label: T.bonus+" ($)", type: "number", value: wf.bonus, onChange: function(v){setWf(Object.assign({},wf,{bonus:v}));}, money: true, placeholder: "0.00" })
                // Operations data (trips/hours/miles) — middle of week
                , React.createElement('div', {style:{fontSize:12,color:C.text3,marginTop:4,marginBottom:-2}}, "🚗 " , lang==="en"?"Operations":"运营数据")
                , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:8} }
                    , React.createElement(Field, { label: T.trips, type: "number", value: wf.trips, onChange: function(v){setWf(Object.assign({},wf,{trips:v}));}, placeholder: "0" })
                    , React.createElement(Field, { label: lang==="en"?"Hours (h)":"时长(h)", type: "number", value: wf.hours, onChange: function(v){setWf(Object.assign({},wf,{hours:v}));}, placeholder: "0" })
                  )
                , React.createElement(Field, { label: T.miles+" (mi)", type: "number", value: wf.miles, onChange: function(v){setWf(Object.assign({},wf,{miles:v}));}, placeholder: "0" })
                // Bank payout last — comes AFTER the work week ends
                , React.createElement('div', {style:{fontSize:12,color:C.text3,marginTop:4,marginBottom:-2}}, "🏦 " , lang==="en"?"Bank Payout":"银行入账")
                , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:8} }
                    , React.createElement(Field, { label: lang==="en"?"Amount":"金额", type: "number", value: wf.payoutAmount, onChange: function(v){setWf(Object.assign({},wf,{payoutAmount:v}));} })
                    , React.createElement(Field, { label: lang==="en"?"Date":"日期", type: "date", value: wf.payoutDate, onChange: function(v){setWf(Object.assign({},wf,{payoutDate:v}));} })
                  )
              )
            )
          , (wf.id||wf.weekStart) ? React.createElement('button', { onClick: function(){confirmAction(lang==="en"?"Delete week record?":"删除周记录？", lang==="en"?"This entry will be removed (with undo).":"此记录将被移除（可撤销）。", function(){var prev=wl.slice();setWl(wl.filter(function(x){if(wf.id){return x.id!==wf.id;}return !(x.weekStart===wf.weekStart&&x.platform===wf.platform);}));setSf(null);showUndo((lang==="en"?"✓ Week deleted":"✓ 周记录已删除"), {prevWl:prev});});}, style: {width:"100%",background:"#2A1010",border:"1px solid #5A2020",color:C.danger,fontSize:14,fontWeight:700,padding:"12px",borderRadius:10,cursor:"pointer",marginTop:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 492}}, "🗑 " , lang==="en"?"Delete":"删除") : null
        )
      ) : null

      , sf==="stmt" ? (
        React.createElement(Modal, { title: stf.id?T.edit+" "+T.monthly:T.monthly, onClose: function(){setSf(null);}, onSave: function(){if(!stf.grossFare)return;if(stf.id){var nsl2=sl.map(function(x){return x.id===stf.id?Object.assign({},stf):x;});setSl(nsl2);autoSave({sl:nsl2});}else{var ex=sl.find(function(x){return x.month===stf.month&&x.platform===stf.platform;});if(ex){setSl(sl.map(function(x){return x.id===ex.id?Object.assign({},stf,{id:ex.id}):x;}));}else{setSl([Object.assign({},stf,{id:Date.now()})].concat(sl));}}showToast(lang==="en"?"✓ Statement saved":"✓ 月度账单已保存");
              // Save platform fee — update existing per platform OR create new
              if(stf.platformFee && +stf.platformFee > 0){
                var expDate=stf.month+"-15";
                var existingMS=el.find(function(e){
                  if(e.category!=="platform") return false;
                  if(!e.date || e.date.slice(0,7)!==stf.month) return false;
                  if(!e.notes || e.notes.indexOf(stf.platform)<0) return false;
                  return true;
                });
                if(existingMS){
                  setEl(el.map(function(e){return e.id===existingMS.id?Object.assign({},e,{amount:+stf.platformFee,notes:stf.platform+" platform fee · "+stf.month}):e;}));
                } else {
                  setEl([{id:Date.now()+1,date:expDate,category:"platform",amount:+stf.platformFee,notes:stf.platform+" platform fee · "+stf.month,isFixed:false,mode:"rideshare"}].concat(el));
                }
              }
              setSf(null);}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 497}}
          , React.createElement(Field, { label: T.month_lbl, type: "month", value: stf.month, onChange: function(v){setStf(Object.assign({},stf,{month:v}));}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 498}} )
          , React.createElement(Field, { label: T.platform_lbl, value: stf.platform, onChange: function(v){if(v==="__new__"){inputAction({title:lang==="en"?"New platform name":"新平台名称",placeholder:lang==="en"?"e.g. Curb, Via":"如 Curb, Via",onSubmit:function(n){if(n&&n.trim()){var nm=n.trim();if(allPlat.indexOf(nm)<0)setCustPlat(custPlat.concat([nm]));setStf(Object.assign({},stf,{platform:nm}));}}});return;}setStf(Object.assign({},stf,{platform:v}));}, options: allPlat.map(function(p){return [p,p];}).concat([["__new__",lang==="en"?"+ Add new platform...":"+ 添加新平台..."]]), __self: this, __source: {fileName: _jsxFileName, lineNumber: 499}} )
          , React.createElement(Field, { label: T.grossFare+" ($)", type: "number", value: stf.grossFare, onChange: function(v){setStf(Object.assign({},stf,{grossFare:v}));}, money: true, placeholder: "0.00", __self: this, __source: {fileName: _jsxFileName, lineNumber: 500}} )
          , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 501}}
            , React.createElement(Field, { label: T.tips+" ($)", type: "number", value: stf.tips, onChange: function(v){setStf(Object.assign({},stf,{tips:v}));}, money: true, placeholder: "0.00", __self: this, __source: {fileName: _jsxFileName, lineNumber: 502}} )
            , React.createElement(Field, { label: T.bonus+" ($)", type: "number", value: stf.bonus, onChange: function(v){setStf(Object.assign({},stf,{bonus:v}));}, money: true, placeholder: "0.00", __self: this, __source: {fileName: _jsxFileName, lineNumber: 503}} )
          )
          , React.createElement(Field, { label: T.toll+" ($)", type: "number", value: stf.tollReimbursed, onChange: function(v){setStf(Object.assign({},stf,{tollReimbursed:v}));}, money: true, placeholder: "0.00", __self: this, __source: {fileName: _jsxFileName, lineNumber: 505}} )
          , (function(){
              // Detect existing platformfee expense for this month + platform
              var existingFee = null;
              if(stf.month){
                existingFee = el.find(function(e){
                  if(e.category!=="platform") return false;
                  if(!e.date) return false;
                  if(e.date.slice(0,7)!==stf.month) return false;
                  if(stf.platform && e.notes && e.notes.indexOf(stf.platform)<0) return false;
                  return true;
                });
              }
              return React.createElement('div', {style:{background:"#1A0A1A",border:"1px solid #5A2A4A",borderRadius:8,padding:"10px 12px"}}
                , React.createElement('div', {style:{fontSize:12,color:"#CC88FF",fontWeight:700,marginBottom:6}}, "💸 " , lang==="en"?"Service Fee (tax-deductible)":"平台抽成（可抵税支出）")
                , existingFee ? React.createElement('div', {style:{fontSize:12,color:"#5ADA7A",marginBottom:6,lineHeight:1.5,padding:"6px 8px",background:"#0A2018",border:"1px solid #2A6040",borderRadius:6}}
                    , "✓ ", lang==="en"?"Already recorded as expense: $":"已记录为支出：$" , (+existingFee.amount||0).toFixed(2)
                    , React.createElement('br')
                    , React.createElement('span', {style:{fontSize:11,color:C.text3}}, existingFee.notes||"")
                  ) : React.createElement('div', {style:{fontSize:11,color:C.text3,marginBottom:6,lineHeight:1.4}}, lang==="en"?"Platform service fee. Auto-records as expense if filled.":"平台抽成。填了会自动作为支出录入。")
                , React.createElement(Field, { label: existingFee?(lang==="en"?"Add more (will create another expense)":"再加（会创建额外支出）"):"$", type: "number", value: stf.platformFee||"", onChange: function(v){setStf(Object.assign({},stf,{platformFee:v}));}, money: true, placeholder: existingFee?"0.00 (skip if already recorded)":"0.00" })
              );
            }())
          , React.createElement(Field, { label: T.otherIncome+" ($)", type: "number", value: stf.otherIncome, onChange: function(v){setStf(Object.assign({},stf,{otherIncome:v}));}, money: true, placeholder: "0.00", __self: this, __source: {fileName: _jsxFileName, lineNumber: 506}} )
          , React.createElement(Field, { label: (lang==="en"?"Platform Service Fee":"平台抽成 / Uber 服务费")+" ($)", type: "number", value: stf.platformFee||"", onChange: function(v){setStf(Object.assign({},stf,{platformFee:v}));}, money: true, placeholder: "0.00" } )
          , React.createElement('div', { style: {borderTop:"1px solid #1A2A40",paddingTop:14}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 507}}
            , React.createElement('div', { style: {fontSize:13,color:C.text3,marginBottom:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 508}}, lang==="en"?"Operations (optional)":"运营数据（可选）")
            , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 509}}
              , React.createElement(Field, { label: T.trips, type: "number", value: stf.trips||"", onChange: function(v){setStf(Object.assign({},stf,{trips:v}));}, placeholder: "0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 510}} )
              , React.createElement(Field, { label: T.onlineHours+" (h)", type: "number", value: stf.onlineHours||"", onChange: function(v){setStf(Object.assign({},stf,{onlineHours:v}));}, placeholder: "0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 511}} )
              , React.createElement(Field, { label: T.miles+" (mi)", type: "number", value: stf.miles||"", onChange: function(v){setStf(Object.assign({},stf,{miles:v}));}, placeholder: "0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 512}} )
            )
          )
          , React.createElement(Field, { label: T.notes, value: stf.notes||"", onChange: function(v){setStf(Object.assign({},stf,{notes:v}));}, placeholder: T.optional, __self: this, __source: {fileName: _jsxFileName, lineNumber: 515}} )
          , (stf.id||stf.month) ? React.createElement('button', { onClick: function(){confirmAction(lang==="en"?"Delete statement?":"删除月账单？", lang==="en"?"This statement will be removed (with undo).":"此月账单将被移除（可撤销）。", function(){var prev=sl.slice();setSl(sl.filter(function(x){if(stf.id){return x.id!==stf.id;}return !(x.month===stf.month&&x.platform===stf.platform);}));setSf(null);showUndo((lang==="en"?"✓ Statement deleted":"✓ 月度账单已删除"), {prevSl:prev});});}, style: {width:"100%",background:"#2A1010",border:"1px solid #5A2020",color:C.danger,fontSize:14,fontWeight:700,padding:"12px",borderRadius:10,cursor:"pointer",marginTop:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 516}}, "🗑 " , lang==="en"?"Delete":"删除") : null
        )
      ) : null

      // === QUICK ADD MODALS — minimal fields, last value pre-filled ===
      , sf==="quick_fuel" ? (function(){
          var hasCharging=el.some(function(e){return e.category==="charging"&&e.qty&&+e.qty>0;});
          var hasFuel=el.some(function(e){return e.category==="fuel"&&e.qty&&+e.qty>0;});
          // EV detection: vehicle type is electric, OR history shows only charging (no fuel)
          // Also covers hybrid drivers who mostly charge: if hasCharging > hasFuel, default to charging
          var isEv = veh.type === "electric" || (hasCharging && !hasFuel) || (veh.type === "hybrid" && hasCharging);
          var fuelCat=isEv?"charging":"fuel";
          var unitLabel=isEv?(lang==="en"?"kWh":"度数"):(lang==="en"?"Gallons":"加仑");
          var unitShort=isEv?"kWh":(lang==="en"?"gal":"加仑");
          var titleStr=isEv?(lang==="en"?"⚡ Quick Charge":"⚡ 快速充电"):(lang==="en"?"⛽ Quick Fuel":"⛽ 快速加油");
          var locLabel=isEv?(lang==="en"?"Charging Station":"充电站"):(lang==="en"?"Gas Station":"加油站");
          var locPlaceholder=isEv?(lang==="en"?"e.g. Tesla Supercharger - Bay Parkway":"如 Tesla Supercharger - Bay Parkway"):(lang==="en"?"e.g. Shell, Sunoco":"如 壳牌、Sunoco");
          // Last 2 entries of this type (for showing recent unit prices)
          var recentEntries=el.filter(function(e){return e.category===fuelCat;}).sort(function(a,b){return (b.date||"").localeCompare(a.date||"");}).slice(0,2);
          var lastEntry = recentEntries[0];
          var lastOdo=el.filter(function(e){return e.odometer&&+e.odometer>0;}).sort(function(a,b){var c=(b.date||"").localeCompare(a.date||"");return c!==0?c:(+b.odometer||0)-(+a.odometer||0);})[0];
          var lastOdoVal = lastOdo ? +lastOdo.odometer : 0;
          // Pre-fill date/time and unit price from last entry — actual values, not placeholder
          if(typeof quickF.date === "undefined") quickF.date = today();
          if(typeof quickF.time === "undefined") quickF.time = nowTime();
          if(typeof quickF.unitPrice === "undefined" && lastEntry && lastEntry.qty && +lastEntry.qty>0){
            quickF.unitPrice = (+lastEntry.amount / +lastEntry.qty).toFixed(3);
          }
          // Calculate amount from unitPrice * qty when both provided
          var computedAmount = "";
          if(quickF.unitPrice && quickF.qty && +quickF.unitPrice>0 && +quickF.qty>0){
            computedAmount = (+quickF.unitPrice * +quickF.qty).toFixed(2);
          }
          // The displayed amount: user can type freely; if empty, fall back to computed
          var displayAmount = quickF.amount || computedAmount;
          // Efficiency: if we have last odometer + this odometer + qty
          var efficiency = "";
          if(quickF.odometer && lastOdoVal>0 && +quickF.odometer>lastOdoVal && quickF.qty && +quickF.qty>0){
            var milesDriven = +quickF.odometer - lastOdoVal;
            efficiency = (milesDriven / +quickF.qty).toFixed(2);
          }
          return React.createElement(Modal, {title:titleStr, onClose:function(){setSf(null);setQuickF({});}, onSave:function(){
            // Use displayed amount (typed or auto-computed)
            var finalAmount = quickF.amount ? +quickF.amount : (computedAmount ? +computedAmount : 0);
            if(!finalAmount){showToast(lang==="en"?"Enter amount or unit price + qty":"请输入金额，或单价+数量");return;}
            // Build notes: include location prefix + user notes
            var combinedNotes = "";
            if(quickF.location){ combinedNotes = quickF.location; }
            if(quickF.notes){ combinedNotes = combinedNotes ? combinedNotes+" · "+quickF.notes : quickF.notes; }
            var newEntry={id:Date.now(),date:quickF.date||today(),time:quickF.time||nowTime(),category:fuelCat,amount:finalAmount,qty:+quickF.qty||0,odometer:+quickF.odometer||0,notes:combinedNotes,vehicleId:veh.vehicleId};
            var nel=[newEntry].concat(el);
            setEl(nel);autoSave({el:nel});
            setSf(null);setQuickF({});
            showToast(lang==="en"?"✓ Saved":"✓ 已保存");
          }}
            // Recent 2 entries (unit prices) — tap to use
            , recentEntries.length > 0 ? React.createElement('div', {style:{marginBottom:10,padding:"8px 10px",background:C.bg3,border:"1px solid "+C.border,borderRadius:8}}
                , React.createElement('div', {style:{fontSize:10,color:C.text3,letterSpacing:0.5,marginBottom:6,textTransform:"uppercase",fontWeight:600}}, lang==="en"?"Recent unit prices · tap to use":"最近单价 · 点击使用")
                , recentEntries.map(function(e,i){
                    if(!e.qty || +e.qty<=0) return null;
                    var up = (+e.amount / +e.qty).toFixed(3);
                    var dt = e.date || "";
                    var sel = quickF.unitPrice === up;
                    return React.createElement('button', {
                      key:i,
                      onClick: function(){
                        setQuickF(Object.assign({},quickF,{unitPrice:up,amount:""}));
                        showToast(lang==="en"?("✓ Using $"+up+"/"+unitShort):("✓ 使用 $"+up+"/"+unitShort));
                      },
                      style: {display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,color:C.text2,padding:"6px 8px",margin:"2px -2px",borderRadius:6,cursor:"pointer",background:sel?"rgba(0,212,255,0.08)":"transparent",border:"1px solid "+(sel?"rgba(0,212,255,0.3)":"transparent"),width:"100%",textAlign:"left"}
                    }
                      , React.createElement('span', null, dt + (e.notes ? " · " + (e.notes.length>28?e.notes.slice(0,28)+"...":e.notes) : ""))
                      , React.createElement('b', {style:{color:sel?C.accent:C.text,fontVariantNumeric:"tabular-nums",fontSize:13}}, "$"+up+"/"+unitShort)
                    );
                  })
              ) : null
            // Unit price field (pre-filled from last entry)
            , React.createElement('div', {style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}
              , React.createElement(Field, {label:lang==="en"?("Unit Price ($/"+unitShort+")"):("单价 ($/"+unitShort+")"), type:"number", value:quickF.unitPrice||"", onChange:function(v){setQuickF(Object.assign({},quickF,{unitPrice:v,amount:""}));}, money:true, placeholder:"0.000"})
              , React.createElement(Field, {label:unitLabel, type:"number", value:quickF.qty||"", onChange:function(v){setQuickF(Object.assign({},quickF,{qty:v,amount:""}));}, placeholder:lastEntry&&lastEntry.qty?"last "+lastEntry.qty:"0"})
            )
            // Total amount (auto-computed but editable)
            , React.createElement(Field, {label:lang==="en"?("Total ($) — auto: $"+(computedAmount||"0.00")):("总金额 ($) — 自动算: $"+(computedAmount||"0.00")), type:"number", value:displayAmount, onChange:function(v){setQuickF(Object.assign({},quickF,{amount:v}));}, money:true, placeholder:"0.00"})
            // Efficiency calc display
            , efficiency ? React.createElement('div', {style:{fontSize:11,color:C.success,marginTop:-4,marginBottom:8,padding:"6px 10px",background:"rgba(0,230,118,0.05)",borderRadius:6,fontWeight:600}}
                , lang==="en"?"⚡ Efficiency: ":"⚡ 效率：", React.createElement('b', null, efficiency+" mi/"+unitShort)
              ) : null
            , React.createElement(Field, {label:lang==="en"?"Odometer (mi) — optional":"当前里程 (mi) — 选填", type:"number", value:quickF.odometer||"", onChange:function(v){setQuickF(Object.assign({},quickF,{odometer:v}));}, placeholder:lastOdoVal>0?"last "+lastOdoVal.toLocaleString():"0"})
            // Charging/fuel station with favorites
            , (function(){
                var favs = (favStations && favStations[fuelCat]) ? favStations[fuelCat] : [];
                var currentLoc = (quickF.location||"").trim();
                var isFavd = currentLoc && favs.indexOf(currentLoc) !== -1;
                return React.createElement('div', {style:{marginBottom:14}}
                  // Label row + star button
                  , React.createElement('div', {style:{display:"flex",alignItems:"center",gap:6,marginBottom:6}}
                    , React.createElement('div', {style:{fontSize:FS.sm+1,color:C.text2,fontWeight:600,letterSpacing:0.2,flex:1}}, locLabel, " — ", T.optional)
                    // Star toggle button (only if location is filled)
                    , currentLoc ? React.createElement('button', {
                        onClick: function(){
                          var newFavs = favs.slice();
                          if(isFavd){
                            // Unfavorite
                            newFavs = newFavs.filter(function(x){return x !== currentLoc;});
                            showToast(lang==="en"?"☆ Removed from favorites":"☆ 已取消收藏","info");
                          } else {
                            // Favorite
                            newFavs.unshift(currentLoc);
                            if(newFavs.length > 20) newFavs = newFavs.slice(0,20); // cap at 20
                            showToast(lang==="en"?"⭐ Added to favorites":"⭐ 已添加到收藏","success");
                          }
                          var nfs = Object.assign({},favStations||{});
                          nfs[fuelCat] = newFavs;
                          setFavStations(nfs);
                        },
                        style: {background:isFavd?"rgba(255,215,0,0.15)":"transparent",border:"1px solid "+(isFavd?C.gold:C.border),color:isFavd?C.gold:C.text3,fontSize:13,padding:"3px 9px",borderRadius:6,cursor:"pointer",whiteSpace:"nowrap"}
                      }, isFavd ? "⭐ "+(lang==="en"?"Favorited":"已收藏") : "☆ "+(lang==="en"?"Save":"收藏")) : null
                  )
                  // Input field
                  , React.createElement('input', {
                      type: "text",
                      value: quickF.location||"",
                      onChange: function(e){setQuickF(Object.assign({},quickF,{location:e.target.value}));},
                      placeholder: locPlaceholder,
                      style: IS
                    })
                  // Favorite chips
                  , favs.length > 0 ? React.createElement('div', {style:{display:"flex",flexWrap:"wrap",gap:6,marginTop:8}}
                      , React.createElement('div', {style:{fontSize:11,color:C.text3,letterSpacing:0.3,marginRight:4,alignSelf:"center"}}, "⭐ ")
                      , favs.slice(0,8).map(function(stn){
                          var sel = currentLoc === stn;
                          return React.createElement('button', {
                            key: stn,
                            onClick: function(){setQuickF(Object.assign({},quickF,{location:stn}));},
                            style: {flexShrink:0,background:sel?"rgba(0,212,255,0.15)":C.bg3,border:"1px solid "+(sel?"rgba(0,212,255,0.4)":C.border),color:sel?C.accent:C.text2,fontSize:12,padding:"5px 10px",borderRadius:14,cursor:"pointer",whiteSpace:"nowrap",fontWeight:sel?700:500,maxWidth:200,overflow:"hidden",textOverflow:"ellipsis"}
                          }, stn);
                        })
                    ) : null
                );
              }())
            , React.createElement('div', {style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}
              , React.createElement(Field, {label:T.date, type:"date", value:quickF.date||today(), onChange:function(v){setQuickF(Object.assign({},quickF,{date:v}));}})
              , React.createElement(Field, {label:T.time, type:"time", value:quickF.time||nowTime(), onChange:function(v){setQuickF(Object.assign({},quickF,{time:v}));}})
            )
            , React.createElement(Field, {label:T.notes, value:quickF.notes||"", onChange:function(v){setQuickF(Object.assign({},quickF,{notes:v}));}, placeholder:T.optional})
          );
        }()) : null

      , sf==="quick_coffee" ? (function(){
          var recentEntries=el.filter(function(e){return e.category==="coffee";}).sort(function(a,b){return (b.date||"").localeCompare(a.date||"");}).slice(0,2);
          var lastEntry = recentEntries[0];
          if(typeof quickF.date === "undefined") quickF.date = today();
          if(typeof quickF.time === "undefined") quickF.time = nowTime();
          if(typeof quickF.amount === "undefined" && lastEntry){
            quickF.amount = (+lastEntry.amount).toFixed(2);
          }
          return React.createElement(Modal, {title:lang==="en"?"☕ Quick Coffee":"☕ 快速咖啡", onClose:function(){setSf(null);setQuickF({});}, onSave:function(){
            if(!quickF.amount){showToast(lang==="en"?"Enter amount":"请输入金额");return;}
            var newEntry={id:Date.now(),date:quickF.date||today(),time:quickF.time||nowTime(),category:"coffee",amount:+quickF.amount,notes:quickF.notes||"",vehicleId:veh.vehicleId};
            var nel=[newEntry].concat(el);
            setEl(nel);autoSave({el:nel});
            setSf(null);setQuickF({});
            showToast(lang==="en"?"✓ Saved":"✓ 已保存");
          }}
            // Recent 2 entries (amounts) — tap to use
            , recentEntries.length > 0 ? React.createElement('div', {style:{marginBottom:10,padding:"8px 10px",background:C.bg3,border:"1px solid "+C.border,borderRadius:8}}
                , React.createElement('div', {style:{fontSize:10,color:C.text3,letterSpacing:0.5,marginBottom:6,textTransform:"uppercase",fontWeight:600}}, lang==="en"?"Recent amounts · tap to use":"最近金额 · 点击使用")
                , recentEntries.map(function(e,i){
                    var dt = e.date || "";
                    var amt = (+e.amount).toFixed(2);
                    var sel = quickF.amount === amt;
                    return React.createElement('button', {
                      key:i,
                      onClick: function(){
                        setQuickF(Object.assign({},quickF,{amount:amt}));
                        showToast(lang==="en"?("✓ Using $"+amt):("✓ 使用 $"+amt));
                      },
                      style: {display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,color:C.text2,padding:"6px 8px",margin:"2px -2px",borderRadius:6,cursor:"pointer",background:sel?"rgba(0,212,255,0.08)":"transparent",border:"1px solid "+(sel?"rgba(0,212,255,0.3)":"transparent"),width:"100%",textAlign:"left"}
                    }
                      , React.createElement('span', null, dt + (e.notes ? " · " + (e.notes.length>28?e.notes.slice(0,28)+"...":e.notes) : ""))
                      , React.createElement('b', {style:{color:sel?C.accent:C.text,fontVariantNumeric:"tabular-nums",fontSize:13}}, "$"+amt)
                    );
                  })
              ) : null
            , React.createElement(Field, {label:lang==="en"?"Amount ($)":"金额 ($)", type:"number", value:quickF.amount||"", onChange:function(v){setQuickF(Object.assign({},quickF,{amount:v}));}, money:true, placeholder:"0.00"})
            , React.createElement('div', {style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}
              , React.createElement(Field, {label:T.date, type:"date", value:quickF.date||today(), onChange:function(v){setQuickF(Object.assign({},quickF,{date:v}));}})
              , React.createElement(Field, {label:T.time, type:"time", value:quickF.time||nowTime(), onChange:function(v){setQuickF(Object.assign({},quickF,{time:v}));}})
            )
            , React.createElement(Field, {label:T.notes, value:quickF.notes||"", onChange:function(v){setQuickF(Object.assign({},quickF,{notes:v}));}, placeholder:T.optional})
          );
        }()) : null

      , sf==="quick_tip" ? (function(){
          // Cash tip from passenger — adds to a daily log (today by default)
          // Recent 2 cash tips
          var recentTips=dl.filter(function(d){return +d.tips>0;}).sort(function(a,b){return (b.date||"").localeCompare(a.date||"");}).slice(0,2);
          var lastTip = recentTips[0];
          var lastPlat = lastTip && lastTip.tipPlatform ? lastTip.tipPlatform : "Uber";
          if(typeof quickF.platform === "undefined") quickF.platform = lastPlat;
          if(typeof quickF.date === "undefined") quickF.date = today();
          if(typeof quickF.time === "undefined") quickF.time = nowTime();
          if(typeof quickF.amount === "undefined" && lastTip){
            quickF.amount = (+lastTip.tips).toFixed(2);
          }
          // Look for daily log on the chosen date (live, updates as user changes date)
          var targetDate = quickF.date || today();
          var targetDl = dl.find(function(d){return d.date===targetDate;});
          return React.createElement(Modal, {title:lang==="en"?"💵 Cash Tip":"💵 现金小费", onClose:function(){setSf(null);setQuickF({});}, onSave:function(){
            if(!quickF.amount){showToast(lang==="en"?"Enter amount":"请输入金额");return;}
            var amt=+quickF.amount;
            var plat=quickF.platform||"Uber";
            var platTag = "["+plat+"]";
            var theDate = quickF.date || today();
            var theNotes = quickF.notes || "";
            var existingDl = dl.find(function(d){return d.date===theDate;});
            if(existingDl){
              // Add to existing daily log on that date — append platform tag to notes
              var ndl=dl.map(function(d){
                if(d.date===theDate){
                  var newNote = (d.notes||"").trim();
                  var addPart = platTag + " +$"+amt.toFixed(2)+(theNotes?" "+theNotes:"");
                  newNote = newNote ? newNote+" · "+addPart : addPart;
                  return Object.assign({},d,{tips:((+d.tips||0)+amt).toFixed(2), notes:newNote, tipPlatform:plat});
                }
                return d;
              });
              setDl(ndl);autoSave({dl:ndl});
              showToast(lang==="en"?("✓ Added $"+amt.toFixed(2)+" tip ["+plat+"] on "+theDate):("✓ "+theDate+" 加入小费 $"+amt.toFixed(2)+" ["+plat+"]"));
            } else {
              // Create new daily log entry for that date, rideshare mode, only tips field filled
              var newDl={id:Date.now(),date:theDate,mode:"rideshare",tips:amt.toFixed(2),tipPlatform:plat,grossFare:"",bonus:"",tollReimbursed:"",cash:"",card:"",lease:"",hours:"",miles:"",notes:platTag+(theNotes?" "+theNotes:" "+(lang==="en"?"Cash tip":"现金小费")),vehicleId:veh.vehicleId,cashTip:true};
              var ndl=[newDl].concat(dl);
              setDl(ndl);autoSave({dl:ndl});
              showToast(lang==="en"?("✓ $"+amt.toFixed(2)+" tip ["+plat+"] recorded on "+theDate):("✓ "+theDate+" 记入小费 $"+amt.toFixed(2)+" ["+plat+"]"));
            }
            setSf(null);setQuickF({});
          }}
            // === Cash tips summary card with month/year navigation ===
            , (function(){
                // Filter all cash tips
                var allCashTips = dl.filter(function(d){
                  if(d.cashTip === true) return true;
                  if(d.notes && typeof d.notes === "string"){
                    var n = d.notes;
                    return n.indexOf("现金小费") >= 0 || n.indexOf("Cash tip") >= 0 || n.indexOf("cash tip") >= 0;
                  }
                  return false;
                });
                if(allCashTips.length === 0) return null;
                
                // View state in quickF — defaults to month + current month
                var view = quickF.cashView || "month"; // "month" or "year"
                var selMo = quickF.cashSelMo || today().slice(0,7);
                var selYr = quickF.cashSelYr || today().slice(0,4);
                
                // Compute totals for selected period
                var selTotal = 0, allTimeTotal = 0;
                var byMonth = {}; // for selected year
                allCashTips.forEach(function(d){
                  var amt = +d.tips || 0;
                  allTimeTotal += amt;
                  if(!d.date) return;
                  var dMo = d.date.slice(0,7);
                  var dYr = d.date.slice(0,4);
                  if(view === "month" && dMo === selMo) selTotal += amt;
                  if(view === "year" && dYr === selYr) {
                    selTotal += amt;
                    byMonth[dMo] = (byMonth[dMo] || 0) + amt;
                  }
                });
                
                // Period label
                var periodLabel = "";
                if(view === "month"){
                  var mp = selMo.split("-");
                  periodLabel = lang === "en" 
                    ? (["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][+mp[1]-1] + " " + mp[0])
                    : (mp[0] + "年 " + mp[1] + "月");
                } else {
                  periodLabel = lang === "en" ? ("Year " + selYr) : (selYr + " 年");
                }
                
                // Prev/next handlers
                var goPrev = function(){
                  if(view === "month"){
                    setQuickF(Object.assign({},quickF,{cashSelMo: prevMo(selMo)}));
                  } else {
                    setQuickF(Object.assign({},quickF,{cashSelYr: String(+selYr - 1)}));
                  }
                };
                var goNext = function(){
                  if(view === "month"){
                    setQuickF(Object.assign({},quickF,{cashSelMo: nextMo(selMo)}));
                  } else {
                    setQuickF(Object.assign({},quickF,{cashSelYr: String(+selYr + 1)}));
                  }
                };
                var monthList = Object.keys(byMonth).sort(); // chronological
                
                return React.createElement('div', {style:{marginBottom:10,padding:"10px 12px",background:"linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,215,0,0.02))",border:"1px solid rgba(255,215,0,0.25)",borderRadius:10}}
                  , React.createElement('div', {style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}
                    , React.createElement('div', {style:{fontSize:10,color:C.gold,letterSpacing:0.5,textTransform:"uppercase",fontWeight:700,opacity:0.9}}, "💵 ", lang==="en"?"Cash tips (ref only)":"现金小费（仅记录）")
                    // Month/Year segmented toggle
                    , React.createElement('div', {style:{display:"flex",gap:0,background:C.bg3,borderRadius:6,padding:2,border:"1px solid "+C.border}}
                      , React.createElement('button', {
                          onClick: function(){setQuickF(Object.assign({},quickF,{cashView:"month"}));},
                          style:{background:view==="month"?"rgba(255,215,0,0.2)":"transparent",border:"none",color:view==="month"?C.gold:C.text3,fontSize:10,padding:"4px 10px",borderRadius:4,cursor:"pointer",fontWeight:700}
                        }, lang==="en"?"Month":"月")
                      , React.createElement('button', {
                          onClick: function(){setQuickF(Object.assign({},quickF,{cashView:"year"}));},
                          style:{background:view==="year"?"rgba(255,215,0,0.2)":"transparent",border:"none",color:view==="year"?C.gold:C.text3,fontSize:10,padding:"4px 10px",borderRadius:4,cursor:"pointer",fontWeight:700}
                        }, lang==="en"?"Year":"年")
                    )
                  )
                  // Period navigator: ‹ Period › with big total
                  , React.createElement('div', {style:{display:"flex",alignItems:"center",gap:8,marginBottom:10}}
                    , React.createElement('button', {
                        onClick: goPrev,
                        style:{background:C.bg3,border:"1px solid "+C.border,borderRadius:6,padding:"6px 10px",color:C.gold,fontSize:14,cursor:"pointer",fontWeight:700,flexShrink:0}
                      }, "‹")
                    , React.createElement('div', {style:{flex:1,padding:"6px 10px",background:"rgba(255,215,0,0.08)",borderRadius:8,border:"1px solid rgba(255,215,0,0.2)",textAlign:"center"}}
                      , React.createElement('div', {style:{fontSize:10,color:C.text3,letterSpacing:0.3,marginBottom:2}}, periodLabel)
                      , React.createElement('div', {style:{fontSize:20,fontWeight:800,color:C.gold,fontVariantNumeric:"tabular-nums",lineHeight:1}}, fmt(selTotal))
                    )
                    , React.createElement('button', {
                        onClick: goNext,
                        style:{background:C.bg3,border:"1px solid "+C.border,borderRadius:6,padding:"6px 10px",color:C.gold,fontSize:14,cursor:"pointer",fontWeight:700,flexShrink:0}
                      }, "›")
                  )
                  // Year mode: monthly breakdown bars
                  , (view === "year" && monthList.length > 0) ? React.createElement('div', null
                    , React.createElement('div', {style:{fontSize:9,color:C.text3,letterSpacing:0.5,textTransform:"uppercase",fontWeight:600,marginBottom:5}}, lang==="en"?"Monthly breakdown":"按月分布")
                    , monthList.map(function(m,i){
                        var amt = byMonth[m];
                        var maxAmt = Math.max.apply(null, monthList.map(function(mm){return byMonth[mm];}));
                        var barW = maxAmt > 0 ? Math.round(amt / maxAmt * 100) : 0;
                        var isCurMo = m === today().slice(0,7);
                        return React.createElement('div', {key:i, onClick: function(){setQuickF(Object.assign({},quickF,{cashView:"month",cashSelMo:m}));}, style:{display:"flex",alignItems:"center",gap:8,padding:"3px 0",fontSize:11,cursor:"pointer"}}
                          , React.createElement('span', {style:{color:isCurMo?C.gold:C.text3,fontWeight:isCurMo?700:400,minWidth:50,fontVariantNumeric:"tabular-nums"}}, m.slice(5)+lang==="en"?"":"月")
                          , React.createElement('div', {style:{flex:1,height:6,background:"rgba(255,215,0,0.05)",borderRadius:3,overflow:"hidden"}}
                            , React.createElement('div', {style:{height:"100%",width:barW+"%",background:isCurMo?"linear-gradient(90deg,#FFD700,#FFA500)":"rgba(255,215,0,0.4)",borderRadius:3}})
                          )
                          , React.createElement('span', {style:{color:isCurMo?C.gold:C.text2,fontWeight:isCurMo?700:600,minWidth:55,textAlign:"right",fontVariantNumeric:"tabular-nums"}}, fmt(amt))
                        );
                      })
                  ) : null
                  // All-time total
                  , React.createElement('div', {style:{fontSize:10,color:C.text3,marginTop:8,paddingTop:6,borderTop:"1px dashed rgba(255,215,0,0.15)",display:"flex",justifyContent:"space-between"}}
                    , React.createElement('span', null, lang==="en"?("All time · "+allCashTips.length+" entries"):("累计 · "+allCashTips.length+" 笔"))
                    , React.createElement('span', {style:{color:C.gold,fontWeight:600,fontVariantNumeric:"tabular-nums"}}, fmt(allTimeTotal))
                  )
                );
              }())
            // Recent 2 tips · tap to use
            , recentTips.length > 0 ? React.createElement('div', {style:{marginBottom:8,padding:"8px 10px",background:C.bg3,border:"1px solid "+C.border,borderRadius:8}}
                , React.createElement('div', {style:{fontSize:10,color:C.text3,letterSpacing:0.5,marginBottom:6,textTransform:"uppercase",fontWeight:600}}, lang==="en"?"Recent tips · tap to use":"最近小费 · 点击使用")
                , recentTips.map(function(d,i){
                    var dt = d.date || "";
                    var plat2 = d.tipPlatform || "";
                    var amt = (+d.tips).toFixed(2);
                    var sel = quickF.amount === amt;
                    return React.createElement('button', {
                      key:i,
                      onClick: function(){
                        setQuickF(Object.assign({},quickF,{amount:amt,platform:plat2||quickF.platform}));
                        showToast(lang==="en"?("✓ Using $"+amt):("✓ 使用 $"+amt));
                      },
                      style: {display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,color:C.text2,padding:"6px 8px",margin:"2px -2px",borderRadius:6,cursor:"pointer",background:sel?"rgba(0,212,255,0.08)":"transparent",border:"1px solid "+(sel?"rgba(0,212,255,0.3)":"transparent"),width:"100%",textAlign:"left"}
                    }
                      , React.createElement('span', null, dt + (plat2 ? " · "+plat2 : ""))
                      , React.createElement('b', {style:{color:sel?C.accent:C.gold,fontVariantNumeric:"tabular-nums",fontSize:13}}, "$"+amt)
                    );
                  })
              ) : null
            , React.createElement('div', {style:{fontSize:11,color:C.text3,marginBottom:8,padding:"8px 10px",background:C.bg3,borderRadius:8,lineHeight:1.5}}
              , targetDl ? (lang==="en"?("➕ Adds to "+targetDate+" daily log"):("➕ 加入 "+targetDate+" 的日记账小费")) : (lang==="en"?("📝 Creates "+targetDate+" daily log"):("📝 新建 "+targetDate+" 日记账"))
              , React.createElement('div', {style:{fontSize:10,color:C.text3,marginTop:3}}, lang==="en"?"💡 Cash tips are tracked for reference only — NOT counted in income/profit calculations":"💡 现金小费仅作记录跟踪，不计入收入/利润计算")
            )
            , React.createElement(Field, {label:lang==="en"?"Tip Amount ($)":"小费金额 ($)", type:"number", value:quickF.amount||"", onChange:function(v){setQuickF(Object.assign({},quickF,{amount:v}));}, money:true, placeholder:"0.00"})
            , React.createElement(Field, {label:T.date, type:"date", value:quickF.date||today(), onChange:function(v){setQuickF(Object.assign({},quickF,{date:v}));}})
            // Platform picker — chip-style buttons
            , React.createElement('div', {style:{marginBottom:14}}
              , React.createElement('div', {style:{fontSize:FS.sm+1,color:C.text2,fontWeight:600,letterSpacing:0.2,marginBottom:6}}, lang==="en"?"Platform":"平台")
              , React.createElement('div', {style:{display:"flex",flexWrap:"wrap",gap:6}}
                , allPlat.map(function(p){
                    var sel = (quickF.platform||"Uber") === p;
                    var label = (p==="其他" && lang==="en") ? "Other" : p;
                    return React.createElement('button', {
                      key: p,
                      onClick: function(){setQuickF(Object.assign({},quickF,{platform:p}));},
                      style: {flexShrink:0,background:sel?"linear-gradient(135deg, rgba(0,212,255,0.18), rgba(0,85,255,0.1))":C.bg3,border:"1px solid "+(sel?"rgba(0,212,255,0.4)":C.border),color:sel?C.accent:C.text2,fontSize:FS.md,padding:"8px 14px",borderRadius:18,cursor:"pointer",whiteSpace:"nowrap",fontWeight:sel?700:500,transition:"all 0.15s",boxShadow:sel?"0 0 12px rgba(0,212,255,0.15)":"none",letterSpacing:0.2}
                    }, label);
                  })
              )
            )
            , React.createElement(Field, {label:T.notes, value:quickF.notes||"", onChange:function(v){setQuickF(Object.assign({},quickF,{notes:v}));}, placeholder:T.optional})
          );
        }()) : null

      // === GLOBAL SEARCH MODAL ===
      , searchOpen ? (function(){
          var q = (searchQ||"").toLowerCase().trim();
          // Search across: expenses (el), monthly stmts (sl), weekly logs (wl), daily logs (dl)
          var hits = [];
          if(q.length >= 1){
            // Search expenses by notes, category label, amount
            el.forEach(function(e){
              var cat = allC[e.category];
              var catLabel = cat ? cat.label.toLowerCase() : "";
              var notes = (e.notes||"").toLowerCase();
              var amtStr = String(+e.amount||0);
              if(notes.indexOf(q)>=0 || catLabel.indexOf(q)>=0 || amtStr.indexOf(q)>=0 || (e.category||"").toLowerCase().indexOf(q)>=0){
                hits.push({type:"exp", date:e.date||"", icon:cat?cat.icon:"💼", title:cat?cat.label:e.category, sub:e.notes||"", amount:+e.amount||0, raw:e});
              }
            });
            // Monthly stmts by platform/month/notes
            sl.forEach(function(s){
              var p=(s.platform||"").toLowerCase(), m=(s.month||"").toLowerCase(), n=(s.notes||"").toLowerCase();
              if(p.indexOf(q)>=0 || m.indexOf(q)>=0 || n.indexOf(q)>=0){
                var total=(+s.grossFare||0)+(+s.tips||0)+(+s.bonus||0)+(+s.otherIncome||0);
                hits.push({type:"stmt", date:s.month+"-01", icon:"💵", title:s.platform+" · "+s.month, sub:lang==="en"?"Monthly statement":"月度账单", amount:total, raw:s});
              }
            });
            // Weekly logs by platform/week/notes
            wl.forEach(function(w){
              var p=(w.platform||"").toLowerCase(), ws=(w.weekStart||"").toLowerCase(), n=(w.notes||"").toLowerCase();
              if(p.indexOf(q)>=0 || ws.indexOf(q)>=0 || n.indexOf(q)>=0){
                var total=(+w.grossFare||0)+(+w.tips||0)+(+w.bonus||0)+(+w.tollReimbursed||0);
                hits.push({type:"week", date:w.weekStart||"", icon:"📅", title:w.platform+" · "+(lang==="en"?"week ":"周 ")+w.weekStart, sub:lang==="en"?"Weekly log":"周报", amount:total, raw:w});
              }
            });
            // Daily logs by date/notes
            dl.forEach(function(d){
              var dt=(d.date||"").toLowerCase(), n=(d.notes||"").toLowerCase();
              if(dt.indexOf(q)>=0 || n.indexOf(q)>=0){
                var total=d.mode==="rideshare"?((+d.grossFare||0)+(+d.tips||0)+(+d.bonus||0)+(+d.tollReimbursed||0)):((+d.cash||0)+(+d.card||0)+(+d.tips||0));
                hits.push({type:"daily", date:d.date||"", icon:"📝", title:(d.mode==="rideshare"?(lang==="en"?"Daily ride · ":"日记网约 · "):(lang==="en"?"Daily taxi · ":"日记出租 · "))+d.date, sub:d.notes||"", amount:total, raw:d});
              }
            });
            // Sort by date desc, limit 50
            hits.sort(function(a,b){return (b.date||"").localeCompare(a.date||"");});
            hits = hits.slice(0,50);
          }
          return React.createElement(Modal, {title:lang==="en"?"🔍 Search":"🔍 搜索", onClose:function(){setSearchOpen(false);setSearchQ("");}, onSave:function(){setSearchOpen(false);setSearchQ("");}}
            , React.createElement('input', {
                type:"text",
                value:searchQ,
                onChange:function(e){setSearchQ(e.target.value);},
                autoFocus:true,
                placeholder:lang==="en"?"Search amount, category, platform, notes...":"搜金额、类别、平台、备注...",
                style:{width:"100%",padding:"14px 16px",fontSize:16,background:C.bg4,border:"1px solid "+C.border2,borderRadius:RADIUS.md,color:C.text,marginBottom:14,boxSizing:"border-box",boxShadow:SHADOW.sm,transition:"border-color 0.15s"}
              })
            , q.length === 0 ? React.createElement('div', {style:{fontSize:FS.md+1,color:C.text3,textAlign:"center",padding:"40px 14px",lineHeight:1.7}}
                , React.createElement('div',{style:{fontSize:48,marginBottom:14,opacity:0.4}}, "🔍")
                , lang==="en"?"Type to search across all your records.":"输入关键词搜索所有记录。"
                , React.createElement('br')
                , React.createElement('span',{style:{fontSize:FS.sm+1,color:C.text3,opacity:0.7}}, lang==="en"?"Try: \"uber\", \"100\", \"parking\", \"2025-08\"":"试试: \"uber\"、\"100\"、\"停车\"、\"2025-08\"")
              ) : hits.length === 0 ? React.createElement('div', {style:{fontSize:FS.md+1,color:C.text3,textAlign:"center",padding:"40px 14px"}}
                , React.createElement('div',{style:{fontSize:48,marginBottom:14,opacity:0.4}}, "🤷")
                , lang==="en"?"No matches.":"没找到。"
              )
              : React.createElement('div', null
                , React.createElement('div', {style:{fontSize:FS.xs+1,color:C.text3,marginBottom:10,letterSpacing:1.2,textTransform:"uppercase",fontWeight:600}}, lang==="en"?(hits.length+" Result"+(hits.length>1?"s":"")):(hits.length+" 条结果"))
                , hits.map(function(h,i){
                    return React.createElement('div', {key:i, style:{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",background:C.bg2,borderRadius:RADIUS.md,marginBottom:8,cursor:"pointer",border:"1px solid "+C.border,boxShadow:SHADOW.sm,transition:"all 0.15s"}, onClick:function(){
                      // Navigate to relevant tab and close search
                      setSearchOpen(false);setSearchQ("");
                      if(h.type==="exp"){ setEf(Object.assign({},h.raw)); setSf("exp_edit_"+h.raw.id); }
                      else if(h.type==="stmt"){ setStf(Object.assign({trips:"",onlineHours:"",miles:"",notes:""},h.raw)); setSf("stmt"); }
                      else if(h.type==="week"){ setWf(Object.assign({},h.raw)); setSf("week"); }
                      else if(h.type==="daily"){ setDlf(Object.assign({},h.raw)); setSf("daily"); }
                    }}
                      , React.createElement('div', {style:{fontSize:22,width:36,textAlign:"center",flexShrink:0}}, h.icon)
                      , React.createElement('div', {style:{flex:1,minWidth:0}}
                        , React.createElement('div', {style:{fontSize:13,fontWeight:700,color:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}, h.title)
                        , React.createElement('div', {style:{fontSize:11,color:C.text3,marginTop:2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}, h.date, h.sub?" · "+h.sub:"")
                      )
                      , React.createElement('div', {style:{fontSize:13,fontWeight:700,color:h.type==="exp"?C.danger:C.success,flexShrink:0}}, fmt(h.amount))
                    );
                  })
              )
          );
        }()) : null

      , sf && (sf==="exp" || sf.startsWith("exp_edit_")) ? (
        React.createElement(Modal, { title: sf.startsWith("exp_edit_")?(T.edit+" "+(lang==="en"?"Expense":"支出")):(lang==="en"?"Add Expense":"添加支出"), onClose: function(){setSf(null);}, onSave: function(){
          if(!ef.amount)return;
          if(sf.startsWith("exp_edit_")){
            var eid=+sf.replace("exp_edit_","");
            var prevEl=el.slice();
            setEl(el.map(function(x){return x.id===eid?Object.assign({},ef,{id:eid,vehicleId:ef.vehicleId||x.vehicleId||veh.vehicleId}):x;}));
            setSf(null);
            showUndo(lang==="en"?"✓ Expense updated":"✓ 支出已更新", {prevEl:prevEl});
            return;
          } else if(ef.isRecurring){
            setFl(fl.concat([{id:Date.now(),label:allC[ef.category]?allC[ef.category].label:ef.notes||"Fixed",icon:allC[ef.category]?allC[ef.category].icon:"💼",cat:ef.category,cycle:"monthly",amount:ef.amount,day:new Date().getDate()+"",notes:ef.notes,active:true,startDate:"",endDate:"",maxCount:""}]));
          } else {
            // === DEDUP CHECK: warn if same MONTH + same MONTHLY category already has entries ===
            // Only for monthly-billed categories (insurance, carloan, phone, toll, platform, etc.)
            // — these should only have 1 entry per month. Skip warn for daily categories like coffee, parking.
            var catDef = allC[ef.category];
            var isMonthlyCat = catDef && catDef.mo === true;
            if(isMonthlyCat){
              var newMonth = (ef.date||"").slice(0,7);
              var sameMonthSameCat = el.filter(function(e){
                if(e.category !== ef.category) return false;
                var emo = e.statementMonth || (e.date||"").slice(0,7);
                return emo === newMonth;
              });
              if(sameMonthSameCat.length > 0){
                var existingTotal = sameMonthSameCat.reduce(function(s,e){return s+(+e.amount||0);},0);
                var catLbl = catDef.label;
                var msg = lang==="en"?
                  ("⚠ "+newMonth+" already has "+sameMonthSameCat.length+" "+catLbl+" entry/entries totaling $"+existingTotal.toFixed(2)+".\n\n"+catLbl+" is a monthly-billed category — usually only 1 entry per month.\n\nAdd this $"+(+ef.amount).toFixed(2)+" anyway?\n\n• OK = Add (in addition to existing)\n• Cancel = Don't add"):
                  ("⚠ "+newMonth+" 已有 "+sameMonthSameCat.length+" 笔「"+catLbl+"」共 $"+existingTotal.toFixed(2)+"。\n\n「"+catLbl+"」是月结类别，通常每月只有 1 笔。\n\n继续添加 $"+(+ef.amount).toFixed(2)+" 吗？\n\n• 确定 = 添加（与现有累加）\n• 取消 = 不添加");
                if(!confirm(msg)){ setSf(null); return; }
              }
            }
            var nel=[Object.assign({},ef,{id:Date.now(),vehicleId:veh.vehicleId})].concat(el);
            setEl(nel);
            autoSave({el:nel});
          }
          setSf(null);
          showToast(lang==="en"?"✓ Expense saved":"✓ 支出已保存");
        }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 520}}
          , (function(){
              if(sf.startsWith("exp_edit_")) return null;
              if(simpleMode) return null;  // hide in simple mode
              // Find recent matching expenses by category + notes similarity
              // Side effect: auto-prefill amount with most recent price (only when amount is empty)
              var noteKey = (ef.notes||"").trim().toLowerCase();
              var catKey = ef.category || "";
              if(!catKey) return null;
              // For fuel/charging, we show UNIT PRICE (more useful than total).
              // For other categories, we show TOTAL AMOUNT (parking/wash etc. tend to be flat fees).
              var isUnitMode = (catKey==="fuel"||catKey==="charging");
              // Match: same category + (no notes filter OR notes contains query as substring)
              var matches = el.filter(function(e){
                if(e.category !== catKey) return false;
                if(!e.amount || +e.amount <= 0) return false;
                if(isUnitMode && (!e.qty || +e.qty <= 0)) return false; // need qty to compute unit price
                if(noteKey){
                  var en = (e.notes||"").toLowerCase();
                  if(en.indexOf(noteKey) < 0 && noteKey.indexOf(en) < 0) return false;
                }
                return true;
              });
              if(matches.length === 0) return null;
              // Sort by date desc and dedupe by VALUE (unit price for fuel/chrg, amount for others)
              matches.sort(function(a,b){return (b.date||"").localeCompare(a.date||"");});
              var seenVals = {};
              var distinctRecent = [];
              for(var i=0;i<matches.length && distinctRecent.length<2;i++){
                var v = isUnitMode ? (+matches[i].amount/+matches[i].qty) : +matches[i].amount;
                var key = isUnitMode ? v.toFixed(3) : v.toFixed(2);
                if(!seenVals[key]){
                  seenVals[key] = true;
                  distinctRecent.push(Object.assign({}, matches[i], {_displayVal: v}));
                }
              }
              if(distinctRecent.length === 0) return null;
              // AUTO-PREFILL: only for non-unit mode (avoid fighting smart-calc which manages amount/qty/unitPrice itself)
              if(!isUnitMode){
                var prefillAmt = String(+distinctRecent[0].amount);
                var prefillCatKey = catKey + "|" + noteKey;
                var shouldPrefill = false;
                if(!ef.amount){
                  shouldPrefill = (ef._lastPrefillKey !== prefillCatKey);
                } else if(ef._lastPrefillKey && ef._lastPrefillKey !== prefillCatKey && ef._lastPrefillAmt === ef.amount){
                  shouldPrefill = true;
                }
                if(shouldPrefill){
                  Promise.resolve().then(function(){
                    setEf(function(prev){
                      if(prev._lastPrefillKey && prev._lastPrefillAmt && prev.amount && prev.amount !== prev._lastPrefillAmt){
                        return prev;
                      }
                      return Object.assign({}, prev, {amount: prefillAmt, _lastPrefillKey: prefillCatKey, _lastPrefillAmt: prefillAmt, _editOrder: ((prev._editOrder||[]).filter(function(f){return f!=="amount";})).concat(["amount"])});
                    });
                  });
                }
              }
              var unitSuffix = catKey==="charging" ? "/kWh" : "/Gal";
              return React.createElement('div', {style:{background:C.bg3,border:"1px solid "+C.border2,borderRadius:10,padding:"8px 10px",marginBottom:6}}
                , React.createElement('div', {style:{fontSize:11,color:C.text3,marginBottom:6,letterSpacing:0.3}}
                  , "💡 ", isUnitMode ? (lang==="en"?"Recent unit prices · tap to use ":"最近单价 · 点击使用 ") : (lang==="en"?"Recent prices · tap to use ":"最近价格 · 点击使用 ")
                  , React.createElement('b',{style:{color:C.accent2}}, (allC[catKey]||{}).label || catKey)
                  , noteKey ? " · \"" + (ef.notes||"") + "\"" : ""
                )
                , React.createElement('div', {style:{display:"flex",gap:6,flexWrap:"wrap"}}
                  , distinctRecent.map(function(m,idx){
                      var displayVal = m._displayVal;
                      var valStr = isUnitMode ? displayVal.toFixed(3) : displayVal.toFixed(2);
                      var isCurrent;
                      if(isUnitMode){
                        // Compare current effective unit price (manual or auto-derived)
                        var curUnit = +ef.unitPrice;
                        if(!curUnit && ef.amount && ef.qty && +ef.qty>0) curUnit = +ef.amount/+ef.qty;
                        isCurrent = curUnit && Math.abs(curUnit - displayVal) < 0.005;
                      } else {
                        isCurrent = ef.amount && Math.abs(+ef.amount - displayVal) < 0.005;
                      }
                      return React.createElement('button', {
                        key:idx,
                        onClick: function(){
                          if(isUnitMode){
                            // Set unitPrice and mark it as the latest manual entry
                            // (smart-calc will auto-derive amount once user enters qty)
                            setEf(Object.assign({},ef,{unitPrice:valStr,_editOrder:((ef._editOrder||[]).filter(function(f){return f!=="unitPrice";})).concat(["unitPrice"])}));
                          } else {
                            setEf(Object.assign({},ef,{amount:String(displayVal),_editOrder:((ef._editOrder||[]).filter(function(f){return f!=="amount";})).concat(["amount"])}));
                          }
                        },
                        style: {flex:"1 1 0",minWidth:0,background:isCurrent?"#0A4020":"#0A2840",border:"1px solid "+(isCurrent?"#2A8050":"#2A5080"),borderRadius:8,padding:"6px 8px",color:isCurrent?"#5ADA7A":C.accent2,fontSize:13,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",textAlign:"center"}
                      }, isCurrent?"✓ ":"", "$" + valStr, isUnitMode?React.createElement('span',{style:{fontSize:10,color:C.text3,marginLeft:1}},unitSuffix):null, React.createElement('span', {style:{fontSize:9,color:C.text3,marginLeft:3}}, m.date?(m.date.slice(5)+"-"+m.date.slice(2,4)):""));
                    })
                )
              );
            }())
          

          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 521}}
            
            , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:5,marginBottom:5}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 523}}
              , [["车辆","&#128663;",C.accent,"Vehicle"],["牌照","&#128203;",C.gold,"License"],["平台","&#128241;","#AB47BC","Platform"],["其他","&#128188;","#B0D4E8","Other"]].map(function(gb){
                var isA=selGrp===gb[0],bdCol=isA?gb[2]:C.border,bgCol=isA?"#0A2040":"#0F1829",textCol=isA?gb[2]:C.text2,fw=isA?700:400;
                var lbl=lang==="en"?gb[3]:gb[0];
                return React.createElement('button', { key: gb[0], onClick: function(){setSelGrp(gb[0]);var first=Object.entries(allC).find(function(e){if(veh.type==="electric"&&e[0]==="fuel")return false;if(veh.type==="petrol"&&e[0]==="charging")return false;if(veh.type==="electric"&&e[0]==="oil")return false;return e[1].g===gb[0];});if(first)setEf(Object.assign({},ef,{category:first[0],amount:"",qty:"",unitPrice:"",chargedTo:"",_editOrder:[],_lastPrefillKey:"",_lastPrefillAmt:""}));}, style: {padding:"4px 2px",borderRadius:6,border:"1.5px solid "+bdCol,background:bgCol,color:textCol,fontSize:11,fontWeight:fw,cursor:"pointer",textAlign:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 527}}
                  , React.createElement('div', { style: {fontSize:14,marginBottom:0}, dangerouslySetInnerHTML: {__html:gb[1]}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 528}} ), React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 528}}, lbl)
                );
              })
            )
            , React.createElement('div', { style: {display:"flex",gap:8,alignItems:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 532}}
              , React.createElement('select', { value: ef.category, onChange: function(e){setEf(Object.assign({},ef,{category:e.target.value,amount:"",qty:"",unitPrice:"",chargedTo:"",_editOrder:[],_lastPrefillKey:"",_lastPrefillAmt:""}));}, style: Object.assign({},IS,{flex:1}), __self: this, __source: {fileName: _jsxFileName, lineNumber: 533}}
                , Object.entries(allC).filter(function(e){if(veh.type==="electric"&&e[0]==="fuel")return false;if(veh.type==="petrol"&&e[0]==="charging")return false;if(veh.type==="electric"&&e[0]==="oil")return false;return e[1].g===selGrp;}).map(function(e){return React.createElement('option', { key: e[0], value: e[0], __self: this, __source: {fileName: _jsxFileName, lineNumber: 534}}, e[1].icon, " " , e[1].label);})
              )
              , React.createElement('button', { onClick: function(){setCf({label:"",icon:"&#128296;",group:selGrp,_returnTo:"exp"});setSf("cc");}, style: {flexShrink:0,width:38,height:38,borderRadius:8,border:"2px dashed #2A4A6A",background:C.bg3,color:C.accent2,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 536}}, "+")
            )
          )
          , (function(){var c=allC[ef.category],isMo=c&&c.mo;var isPlatformCat=c&&c.g==="平台";if(isMo){return React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 539}}, React.createElement('div', { style: {background:"#0A1428",border:"1px solid #1A3060",borderRadius:10,padding:"10px 13px",fontSize:14,color:C.text2,marginBottom:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 539}}, lang==="en"?"Monthly billing item":"月结项目"), React.createElement(Field, { label: lang==="en"?"Billing Month":"账单月份", type: "month", value: ef.statementMonth, onChange: function(v){setEf(Object.assign({},ef,{statementMonth:v}));}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 539}} ), isPlatformCat ? React.createElement(Field, { label: T.platform_lbl, value: ef.platform||"", onChange: function(v){if(v==="__new__"){inputAction({title:lang==="en"?"New platform name":"新平台名称",placeholder:lang==="en"?"e.g. Curb, Via":"如 Curb, Via",onSubmit:function(n){if(n&&n.trim()){var nm=n.trim();if(allPlat.indexOf(nm)<0)setCustPlat(custPlat.concat([nm]));setEf(Object.assign({},ef,{platform:nm}));}}});return;}setEf(Object.assign({},ef,{platform:v}));}, options: [["",T.pleaseSelect]].concat(allPlat.map(function(p){return [p, p==="其他"&&lang==="en"?"Other":p];})).concat([["__new__",lang==="en"?"+ Add new platform...":"+ 添加新平台..."]]) }) : null);}var todayStr=today();var ydayDate=new Date();ydayDate.setDate(ydayDate.getDate()-1);var ydayStr=ydayDate.getFullYear()+"-"+p2(ydayDate.getMonth()+1)+"-"+p2(ydayDate.getDate());var dbyDate=new Date();dbyDate.setDate(dbyDate.getDate()-2);var dbyStr=dbyDate.getFullYear()+"-"+p2(dbyDate.getMonth()+1)+"-"+p2(dbyDate.getDate());var quickBtn=function(label,onClick,active){return React.createElement('button',{onClick:onClick,style:{flex:1,background:active?C.bg3:C.bg3,border:"1px solid "+(active?C.accent:"#2A3A54"),borderRadius:6,padding:"4px 6px",color:active?C.accent:C.text2,fontSize:12,fontWeight:active?700:500,cursor:"pointer"}},label);};return React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 539}}, React.createElement('div',{style:{display:"flex",gap:5,marginBottom:5}},quickBtn(lang==="en"?"Today":"今天",function(){setEf(Object.assign({},ef,{date:todayStr,time:nowTime()}));},ef.date===todayStr),quickBtn(lang==="en"?"Yesterday":"昨天",function(){setEf(Object.assign({},ef,{date:ydayStr}));},ef.date===ydayStr),quickBtn(lang==="en"?"2 days ago":"前天",function(){setEf(Object.assign({},ef,{date:dbyStr}));},ef.date===dbyStr),quickBtn(lang==="en"?"Now":"现在",function(){setEf(Object.assign({},ef,{time:nowTime()}));})), React.createElement('div', {style:{display:"grid",gridTemplateColumns:"3fr 2fr",gap:6}}, React.createElement('input', { type: "date", value: ef.date, onChange: function(e){setEf(Object.assign({},ef,{date:e.target.value}));}, onClick: function(e){try{if(e.currentTarget.showPicker)e.currentTarget.showPicker();}catch(err){}}, style: Object.assign({},IS,{colorScheme:"dark",fontSize:13,padding:"8px",cursor:"pointer"}) } ), React.createElement('input', { type: "time", value: ef.time, onChange: function(e){setEf(Object.assign({},ef,{time:e.target.value}));}, onClick: function(e){try{if(e.currentTarget.showPicker)e.currentTarget.showPicker();}catch(err){}}, style: Object.assign({},IS,{colorScheme:"dark",fontSize:13,padding:"8px",cursor:"pointer"}) } )), isPlatformCat ? React.createElement(Field, { label: T.platform_lbl, value: ef.platform||"", onChange: function(v){if(v==="__new__"){inputAction({title:lang==="en"?"New platform name":"新平台名称",placeholder:lang==="en"?"e.g. Curb, Via":"如 Curb, Via",onSubmit:function(n){if(n&&n.trim()){var nm=n.trim();if(allPlat.indexOf(nm)<0)setCustPlat(custPlat.concat([nm]));setEf(Object.assign({},ef,{platform:nm}));}}});return;}setEf(Object.assign({},ef,{platform:v}));}, options: [["",T.pleaseSelect]].concat(allPlat.map(function(p){return [p, p==="其他"&&lang==="en"?"Other":p];})).concat([["__new__",lang==="en"?"+ Add new platform...":"+ 添加新平台..."]]) }) : null);}())
          , (function(){var c=allC[ef.category];if(!c||!c.refOnly)return null;return React.createElement('div', {style:{background:"linear-gradient(135deg, rgba(255,215,0,0.08), rgba(40,30,5,0.4))",border:"1px solid rgba(255,215,0,0.3)",borderRadius:RADIUS.md,padding:"10px 12px",marginBottom:10,fontSize:12,lineHeight:1.5,color:"#FFD89A"}}
            , React.createElement('div', {style:{fontWeight:700,marginBottom:3}}, "📋 ", lang==="en"?"Reference only — not counted in expenses":"仅作记录 · 不计入总支出")
            , React.createElement('div', {style:{fontSize:11,color:"#C0A878"}}, lang==="en"?
                "Platform fees (Service Fee, Booking Fee, etc.) are already deducted via your monthly statement. This category lets you log them for your own reference without double-counting.":
                "平台抽成（Service Fee、Booking Fee 等）已通过月度账单扣除。此类别仅供你自己留档查阅，避免重复计算。")
          );}())
          // === SMART 3-WAY CALC for fuel/charging ===
          // Fill any 2 of {amount, qty, unitPrice} → 3rd auto-calculates.
          // Track manual edit order in ef._editOrder (last 2 = manual; the other = auto).
          // Edit the auto field → it becomes manual, oldest manual becomes new auto.
          , (function(){
              var isFuelChrg = (ef.category==="fuel"||ef.category==="charging");
              if(!isFuelChrg){
                return React.createElement(Field, { label: T.amount, type: "number", value: ef.amount, onChange: function(v){setEf(Object.assign({},ef,{amount:v}));}, money: true, placeholder: "0.00", __self: this, __source: {fileName: _jsxFileName, lineNumber: 540}} );
              }
              var FIELDS=["amount","qty","unitPrice"];
              var unitSuffix=ef.category==="charging"?"/kWh":"/Gal";
              var qtyLabel=ef.category==="charging"?(lang==="en"?"kWh Charged":"充电度数 (kWh)"):(lang==="en"?"Gallons (Gal)":"加油加仑 (Gal)");
              var unitPriceLabel=ef.category==="charging"?(lang==="en"?"Price ($/kWh)":"单价 ($/kWh)"):(lang==="en"?"Price ($/Gal)":"单价 ($/Gal)");
              // === Compute historical avg unit price (last 30 records of same category) for anomaly detection ===
              var histAvg=null;
              // Sort by DATE descending (most recent first), then take top 30.
              // Previously used .slice(-30) which gave last 30 by INPUT ORDER — buggy if user back-fills old records.
              var histRecords=el.filter(function(e){return e.category===ef.category&&e.amount&&e.qty&&+e.qty>0&&e.date;})
                                .sort(function(a,b){return (b.date||"").localeCompare(a.date||"");})
                                .slice(0,30);
              if(histRecords.length>=5){
                // Median is more robust than mean: a single expensive fast-charge won't skew the baseline.
                var unitPrices=histRecords.map(function(e){return +e.amount/+e.qty;}).sort(function(a,b){return a-b;});
                var mid=Math.floor(unitPrices.length/2);
                histAvg=unitPrices.length%2===0?(unitPrices[mid-1]+unitPrices[mid])/2:unitPrices[mid];
              }
              var order=ef._editOrder||[];
              var manual2=order.slice(-2);
              var autoField=manual2.length>=2?FIELDS.find(function(f){return manual2.indexOf(f)<0;}):null;
              var setSmart=function(field,value){
                setEf(function(prev){
                  var next=Object.assign({},prev);
                  next[field]=value;
                  var ord=(prev._editOrder||[]).filter(function(f){return f!==field;});
                  if(value!==""&&value!=null&&+value>0)ord.push(field);
                  next._editOrder=ord;
                  if(ord.length>=2){
                    var m2=ord.slice(-2);
                    var auto=FIELDS.find(function(f){return m2.indexOf(f)<0;});
                    var vAmt=+next.amount,vQty=+next.qty,vUnit=+next.unitPrice;
                    var result=null;
                    if(auto==="amount"&&vQty>0&&vUnit>0)result=(vQty*vUnit).toFixed(2);
                    else if(auto==="qty"&&vAmt>0&&vUnit>0)result=(vAmt/vUnit).toFixed(3);
                    else if(auto==="unitPrice"&&vAmt>0&&vQty>0)result=(vAmt/vQty).toFixed(3);
                    if(result!==null&&isFinite(+result))next[auto]=result;
                    else next[auto]="";
                  }
                  return next;
                });
              };
              var smartField=function(opts){
                var isAuto=(opts.field===autoField);
                var inputStyle=Object.assign({},IS,isAuto?{borderColor:"#2A8050",background:"#0A2018",color:"#5ADA7A"}:{});
                return React.createElement('label',{key:opts.field,style:{display:"flex",flexDirection:"column",gap:4,fontSize:12,color:C.text2,fontWeight:500}},
                  React.createElement('span',null,opts.label,isAuto?React.createElement('span',{style:{background:"#2A8050",color:C.bg3,fontSize:10,padding:"1px 6px",borderRadius:5,fontWeight:700,marginLeft:6,letterSpacing:0.05}},lang==="en"?"AUTO":"自动"):null),
                  React.createElement('input',{type:"number",inputMode:"decimal",step:opts.step||"0.01",value:opts.value||"",placeholder:opts.placeholder||"",onChange:function(e){setSmart(opts.field,e.target.value);},style:inputStyle})
                );
              };
              var formulaStrip=null;
              // Determine current effective unit price (auto or manual) for anomaly check
              var effUnit=+ef.unitPrice;
              if(!effUnit&&ef.amount&&ef.qty&&+ef.qty>0)effUnit=+ef.amount/+ef.qty;
              var anomaly=null;
              if(histAvg&&effUnit>0){
                var dev=(effUnit-histAvg)/histAvg;
                if(dev>=0.30){
                  anomaly={type:"high",pct:Math.round(dev*100),avg:histAvg};
                }else if(dev<=-0.20){
                  anomaly={type:"low",pct:Math.round(Math.abs(dev)*100),avg:histAvg};
                }
              }
              if(autoField&&ef[autoField]){
                var fmtN=function(v,d){return (+v).toFixed(d||2);};
                var ftxt;
                if(autoField==="amount")ftxt=fmtN(ef.qty,2)+(ef.category==="charging"?" kWh":" Gal")+" × $"+fmtN(ef.unitPrice,3)+" = $"+fmtN(ef.amount,2);
                else if(autoField==="qty")ftxt="$"+fmtN(ef.amount,2)+" ÷ $"+fmtN(ef.unitPrice,3)+" = "+fmtN(ef.qty,3)+(ef.category==="charging"?" kWh":" Gal");
                else ftxt="$"+fmtN(ef.amount,2)+" ÷ "+fmtN(ef.qty,2)+(ef.category==="charging"?" kWh":" Gal")+" = $"+fmtN(ef.unitPrice,3)+unitSuffix;
                formulaStrip=React.createElement('div',{style:{background:"rgba(42,128,80,0.08)",border:"1px solid rgba(42,128,80,0.3)",borderRadius:8,padding:"6px 10px",fontSize:12,color:"#5ADA7A",textAlign:"center",letterSpacing:0.2}},"✓ ",ftxt);
              }else if(!autoField){
                formulaStrip=React.createElement('div',{style:{padding:"6px 10px",fontSize:12,color:C.text3,textAlign:"center",letterSpacing:0.2}},lang==="en"?"Fill any 2 — the 3rd auto-calculates":"填任意两个，第三个自动算");
              }
              // Anomaly banner: shown alongside formula strip when unit price is unusual
              var anomalyBanner=null;
              if(anomaly){
                var aIsHigh=(anomaly.type==="high");
                var aColBg=aIsHigh?"rgba(255,150,40,0.10)":"rgba(0,210,255,0.08)";
                var aColBd=aIsHigh?"rgba(255,150,40,0.40)":"rgba(0,210,255,0.30)";
                var aColTx=aIsHigh?"#FFB347":"#5BC8E5";
                var aIcon=aIsHigh?"⚠️":"💚";
                var aMsg=aIsHigh
                  ? (lang==="en"?aIcon+" Unit price "+anomaly.pct+"% above your avg ($"+anomaly.avg.toFixed(3)+unitSuffix+") — confirm?":aIcon+" 单价比你均价高 "+anomaly.pct+"% (你均价 $"+anomaly.avg.toFixed(3)+unitSuffix+") · 确认下？")
                  : (lang==="en"?aIcon+" Nice — "+anomaly.pct+"% below your avg ($"+anomaly.avg.toFixed(3)+unitSuffix+")":aIcon+" 划算！比你均价低 "+anomaly.pct+"% (均价 $"+anomaly.avg.toFixed(3)+unitSuffix+")");
                anomalyBanner=React.createElement('div',{style:{background:aColBg,border:"1px solid "+aColBd,borderRadius:8,padding:"6px 10px",fontSize:12,color:aColTx,textAlign:"center",letterSpacing:0.2,marginTop:0}},aMsg);
              }
              return React.createElement('div',{style:{display:"flex",flexDirection:"column",gap:6}},
                smartField({field:"amount",label:T.amount,value:ef.amount,placeholder:"0.00",step:"0.01"}),
                smartField({field:"qty",label:qtyLabel,value:ef.qty,placeholder:"0.0",step:"0.01"}),
                smartField({field:"unitPrice",label:unitPriceLabel,value:ef.unitPrice,placeholder:"0.000",step:"0.001"}),
                formulaStrip,
                anomalyBanner,
                ef.category==="charging"?React.createElement(Field,{label:lang==="en"?"Charged to (%)":"充到 (%)",type:"number",value:ef.chargedTo||"",onChange:function(v){setEf(Object.assign({},ef,{chargedTo:v}));},placeholder:"e.g. 80"}):null
              );
            }())
          , (function(){var c=allC[ef.category];if(c&&c.g==="车辆"){return React.createElement(Field, { label: (lang==="en"?"Odometer (mi)":"里程读数 (mi)")+" — "+(lang==="en"?"optional":"选填"), type: "number", value: ef.odometer||"", onChange: function(v){setEf(Object.assign({},ef,{odometer:v}));}, placeholder: "e.g. 45142", __self: this, __source: {fileName: _jsxFileName, lineNumber: 543}} );}return null;}())
          , (function(){
              var catKey=ef.category||"_default";
              var favs=(favNotes&&favNotes[catKey])||[];
              var modeOpt=ef.mode||"";  // "" = 共用, "rideshare", "taxi"
              var currentNotes=(ef.notes||"").trim();
              var alreadyFav=favs.some(function(f){return f.toLowerCase()===currentNotes.toLowerCase();});
              var addFav=function(){if(!currentNotes||alreadyFav)return;var newFavs=Object.assign({},favNotes);newFavs[catKey]=(newFavs[catKey]||[]).concat([currentNotes]);setFavNotes(newFavs);};
              var removeFav=function(item){var newFavs=Object.assign({},favNotes);newFavs[catKey]=(newFavs[catKey]||[]).filter(function(x){return x!==item;});setFavNotes(newFavs);};
              return React.createElement('label',{style:{display:"flex",flexDirection:"column",gap:6,fontSize:12,color:C.text2,fontWeight:500,position:"relative"}},
                T.notes,
                React.createElement('div',{style:{position:"relative"}},
                  React.createElement('input',{type:"text",value:ef.notes||"",onChange:function(e){setEf(Object.assign({},ef,{notes:e.target.value}));},placeholder:T.optional,style:Object.assign({},IS,{paddingRight:favs.length>0?(currentNotes&&!alreadyFav?"82px":"40px"):(currentNotes&&!alreadyFav?"42px":undefined)})}),
                  // ⭐ Star button: only shows when there's text not already saved
                  currentNotes&&!alreadyFav?React.createElement('button',{type:"button",onClick:addFav,title:lang==="en"?"Save as favorite":"添加为常用",style:{position:"absolute",right:favs.length>0?42:6,top:4,background:"#0A2010",border:"1px solid #2A6030",color:C.gold,borderRadius:6,width:32,height:32,cursor:"pointer",fontSize:14,padding:0}},"⭐"):null,
                  // ⏷ Globally searchable dropdown across all categories
                  (function(){
                    // Collect ALL favorites with their category
                    var allFavs=[];
                    Object.keys(favNotes||{}).forEach(function(catKey){
                      var catLabel=(allC[catKey]||{}).label||catKey;
                      (favNotes[catKey]||[]).forEach(function(loc){
                        allFavs.push({loc:loc, catKey:catKey, catLabel:catLabel, sameCategory: catKey===ef.category});
                      });
                    });
                    if(allFavs.length===0) return null;
                    return React.createElement('details',{
                      style:{position:"absolute",right:6,top:4},
                      ref:function(d){
                        if(!d) return;
                        d._allFavs=allFavs;
                        // Bind document-level click handler ONCE per element to close on outside click
                        if(!d._outsideBound){
                          d._outsideBound = true;
                          var handler = function(ev){
                            if(d.open && !d.contains(ev.target)) d.open = false;
                          };
                          // Use capture phase so we beat any internal stopPropagation
                          document.addEventListener("click", handler, true);
                          // Also close on Escape key
                          var keyHandler = function(ev){
                            if(ev.key === "Escape" && d.open) d.open = false;
                          };
                          document.addEventListener("keydown", keyHandler);
                        }
                      }
                    },
                      React.createElement('summary',{style:{listStyle:"none",cursor:"pointer",background:C.border,border:"1px solid "+C.border2,borderRadius:6,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",color:C.accent,fontSize:14}},"⏷"),
                      // Open UPWARD (bottom-anchored) — avoids covering the "Add as fixed monthly" toggle below notes
                      React.createElement('div',{style:{position:"absolute",right:0,bottom:36,background:C.bg2,border:"1px solid "+C.border,borderRadius:10,width:300,maxHeight:380,overflowY:"auto",boxShadow:"0 -4px 20px rgba(0,0,0,0.5)",zIndex:100}},
                        // Header with search input
                        React.createElement('div',{style:{padding:"8px 10px",borderBottom:"1px solid "+C.border,background:"#1A1400",position:"sticky",top:0,zIndex:1}},
                          React.createElement('div',{style:{fontSize:12,color:C.gold,marginBottom:6}},"⭐ ",lang==="en"?"Address Book":"地址簿"," (",allFavs.length,")"),
                          React.createElement('input',{
                            type:"search",
                            placeholder: lang==="en"?"Search across all categories...":"搜索所有类别...",
                            onChange: function(ev){
                              var q = (ev.target.value||"").toLowerCase().trim();
                              var list = ev.target.closest('div').nextElementSibling;
                              if(!list) return;
                              Array.from(list.children).forEach(function(node){
                                var txt = (node.textContent||"").toLowerCase();
                                node.style.display = (q==="" || txt.indexOf(q)>=0) ? "" : "none";
                              });
                            },
                            onClick: function(ev){ev.stopPropagation();},
                            style: {width:"100%",padding:"6px 10px",borderRadius:6,border:"1px solid "+C.border,background:C.bg3,color:C.text,fontSize:12,boxSizing:"border-box"}
                          })
                        ),
                        // Favorites list (current category first, then others)
                        React.createElement('div', null,
                          allFavs.sort(function(a,b){return (b.sameCategory?1:0)-(a.sameCategory?1:0);}).map(function(item,i){
                            return React.createElement('div',{key:item.catKey+"_"+item.loc+"_"+i,style:{display:"flex",alignItems:"center",borderBottom:"1px solid #0F1C30"}},
                              React.createElement('button',{type:"button",onClick:function(ev){
                                  ev.preventDefault();
                                  // Just set the notes — DO NOT change category. User has already chosen
                                  // the category they want; selecting an address shouldn't switch them away.
                                  setEf(Object.assign({},ef,{notes:item.loc}));
                                  ev.target.closest('details').open=false;
                                }, style:{flex:1,textAlign:"left",background:"none",border:"none",padding:"8px 12px",color:C.text,fontSize:13,cursor:"pointer"}},
                                React.createElement('div',{style:{fontSize:13,marginBottom:2}},item.loc),
                                React.createElement('div',{style:{fontSize:11,color:item.sameCategory?"#5ADA7A":C.text3}},
                                  item.sameCategory ? "📍 " + item.catLabel : item.catLabel
                                )
                              ),
                              React.createElement('button',{type:"button",onClick:function(ev){
                                  ev.preventDefault();ev.stopPropagation();
                                  if(!confirm((lang==="en"?"Remove from ":"从 ")+item.catLabel+(lang==="en"?" favorites?":" 中移除？")))return;
                                  var nf=Object.assign({},favNotes);
                                  nf[item.catKey]=(nf[item.catKey]||[]).filter(function(x){return x!==item.loc;});
                                  setFavNotes(nf);
                                }, style:{background:"none",border:"none",color:C.danger,padding:"6px 10px",cursor:"pointer",fontSize:13}},"✕")
                            );
                          })
                        )
                      )
                    );
                  }())
                )
              );
            }())
          , !sf.startsWith("exp_edit_") ? (function(){
              // Compact pill that toggles via confirm dialog (rarely used, prevent accidents in both directions)
              var toggleRecurring = function(){
                if(ef.isRecurring){
                  // Currently ON → confirm before turning OFF
                  confirmAction(
                    lang==="en"?"Cancel fixed monthly?":"取消固定月费？",
                    lang==="en"?"This expense will only be recorded once (not repeated each month).":"这笔支出只会记录一次（不会每月重复出现）。",
                    function(){setEf(Object.assign({},ef,{isRecurring:false}));showToast(lang==="en"?"✓ One-time expense":"✓ 一次性支出","success");},
                    {confirmLabel: lang==="en"?"Yes, one-time only":"确定，只记一次", danger:false}
                  );
                } else {
                  // Currently OFF → confirm before turning ON (the dangerous direction)
                  confirmAction(
                    lang==="en"?"Make this a fixed monthly expense?":"设为固定月费？",
                    lang==="en"?"This expense will AUTO-APPEAR every month from now on. Use only for true recurring fees (insurance, loan, lease).":"这笔支出从现在起每个月都会自动出现。只在真正的循环支出上使用（保险、贷款、租车等）。",
                    function(){setEf(Object.assign({},ef,{isRecurring:true}));showToast(lang==="en"?"✓ Now a fixed monthly":"✓ 已设为固定月费","success");},
                    {confirmLabel: lang==="en"?"Yes, every month":"确定，每月生成", danger:true}
                  );
                }
              };
              return React.createElement('div', {style:{display:"flex",justifyContent:"flex-end",marginTop:6}}
                , React.createElement('button', {
                    onClick: toggleRecurring,
                    style: {
                      background: ef.isRecurring ? "linear-gradient(135deg, rgba(255,179,71,0.15), rgba(255,140,66,0.08))" : "transparent",
                      border: "1px solid " + (ef.isRecurring ? "rgba(255,179,71,0.5)" : C.border),
                      color: ef.isRecurring ? "#FFB347" : C.text3,
                      fontSize: 11,
                      fontWeight: ef.isRecurring ? 700 : 500,
                      padding: "5px 10px",
                      borderRadius: 12,
                      cursor: "pointer",
                      letterSpacing: 0.2,
                      whiteSpace: "nowrap",
                      transition: "all 0.15s"
                    }
                  }, ef.isRecurring ? "🔁 " + (lang==="en"?"Recurring monthly":"已设为月费") : "🔁 " + (lang==="en"?"Make recurring":"设为月费"))
              );
            }()) : null

          , sf.startsWith("exp_edit_") ? React.createElement('button', { onClick: function(){confirmAction(lang==="en"?"Delete expense?":"删除支出？", lang==="en"?"This expense will be removed (with undo).":"此支出将被移除（可撤销）。", function(){var eid=+sf.replace("exp_edit_","");var prev=el.slice();setEl(el.filter(function(x){return x.id!==eid;}));setSf(null);showUndo((lang==="en"?"✓ Expense deleted":"✓ 支出已删除"), {prevEl:prev});});}, style: {width:"100%",background:"#2A1010",border:"1px solid #5A2020",color:C.danger,fontSize:14,fontWeight:700,padding:"12px",borderRadius:10,cursor:"pointer",marginTop:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 547}}, "🗑 " , lang==="en"?"Delete":"删除") : null
        )
      ) : null

      , sf && (sf==="fixed" || sf.startsWith("fixed_edit_")) ? (
        React.createElement(Modal, { title: sf.startsWith("fixed_edit_")?(T.edit+" "+(lang==="en"?"Fixed":"固定")):(lang==="en"?"Add Fixed":"添加固定支出"), onClose: function(){setSf(null);}, onSave: function(){if(!ff.label||!ff.amount)return;if(sf.startsWith("fixed_edit_")){var eid=+sf.replace("fixed_edit_","");setFl(fl.map(function(x){return x.id===eid?Object.assign({},ff,{id:eid}):x;}));}else{var nfl=fl.concat([Object.assign({},ff,{id:Date.now(),active:true})]);setFl(nfl);autoSave({fl:nfl});}setSf(null);showToast(lang==="en"?"✓ Fixed expense saved":"✓ 固定支出已保存");}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 552}}
          , React.createElement(Field, { label: lang==="en"?"Name":"项目名称", value: ff.label, onChange: function(v){setFf(Object.assign({},ff,{label:v}));}, placeholder: lang==="en"?"e.g. Car Loan":"例：车贷、手机费", __self: this, __source: {fileName: _jsxFileName, lineNumber: 553}} )
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 554}}, React.createElement('div', { style: {fontSize:14,color:C.text2,marginBottom:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 554}}, lang==="en"?"Icon":"图标"), React.createElement('div', { style: {display:"flex",flexWrap:"wrap",gap:5}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 554}}, ICONS.map(function(ic){var bdCol=ff.icon===ic?C.accent:C.border,bgCol=ff.icon===ic?"#0A2040":"#111D30";return React.createElement('button', { key: ic, onClick: function(){setFf(Object.assign({},ff,{icon:ic}));}, style: {width:38,height:38,borderRadius:8,border:"2px solid "+bdCol,background:bgCol,fontSize:16,cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 554}}, ic);}), " " ))
          , React.createElement('div', { style: {display:"flex",background:C.bg3,borderRadius:10,padding:3,gap:3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 555}}, [["monthly",T.cycleMonthly],["annual",T.cycleAnnual]].map(function(v){var isA=ff.cycle===v[0],bg=isA?C.bg3:"transparent",cl=isA?C.accent:C.text2,fw=isA?700:400;return React.createElement('button', { key: v[0], onClick: function(){setFf(Object.assign({},ff,{cycle:v[0]}));}, style: {flex:1,padding:8,borderRadius:8,border:"none",background:bg,color:cl,fontSize:13,cursor:"pointer",fontWeight:fw}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 555}}, v[1]);}), " " )
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 556}}, React.createElement(Field, { label: ff.cycle==="annual"?(lang==="en"?"Annual Total ($)":"全年总金额 ($)"):(lang==="en"?"Monthly ($)":"每月金额 ($)"), type: "number", value: ff.amount, onChange: function(v){setFf(Object.assign({},ff,{amount:v}));}, money: true, placeholder: "0.00", __self: this, __source: {fileName: _jsxFileName, lineNumber: 556}} ), ff.cycle==="annual"&&+ff.amount>0?React.createElement('div', { style: {marginTop:6,background:"#1A2A10",border:"1px solid #2A4A20",borderRadius:8,padding:"8px 12px",display:"flex",justifyContent:"space-between"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 556}}, React.createElement('span', { style: {fontSize:13,color:"#8AAA70"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 556}}, lang==="en"?"Per Month":"每月计入"), React.createElement('span', { style: {fontSize:15,fontWeight:800,color:C.gold}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 556}}, fmt(Math.round(+ff.amount/12*100)/100), lang==="en"?"/mo":"/月")):null)
          , React.createElement(Field, { label: T.dayOfMonth, value: ff.day, onChange: function(v){setFf(Object.assign({},ff,{day:v}));}, options: (function(){var o=[];for(var i=1;i<=28;i++){o.push([""+i,(lang==="en"?"Day ":"每月 ")+i+(lang==="en"?"":"日")]);}return o;})(), __self: this, __source: {fileName: _jsxFileName, lineNumber: 557}} )
          , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 558}}
            , React.createElement(Field, { label: T.startMonth, type: "month", value: ff.startDate||"", onChange: function(v){setFf(Object.assign({},ff,{startDate:v}));}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 559}} )
            , React.createElement(Field, { label: T.endMonth, type: "month", value: ff.endDate||"", onChange: function(v){setFf(Object.assign({},ff,{endDate:v}));}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 560}} )
          )
          , React.createElement(Field, { label: T.category, value: ff.cat, onChange: function(v){setFf(Object.assign({},ff,{cat:v}));}, options: Object.entries(allC).map(function(e){return [e[0],e[1].label];}), __self: this, __source: {fileName: _jsxFileName, lineNumber: 562}} )
        )
      ) : null

      , sf && (sf==="lic" || sf.startsWith("lic_edit_")) ? (
        React.createElement(Modal, { title: sf.startsWith("lic_edit_")?(T.edit+" "+(lang==="en"?"License":"执照")):(lang==="en"?"Add License":"添加执照/证件"), onClose: function(){setSf(null);}, onSave: function(){if(!lf.type)return;if(sf.startsWith("lic_edit_")){var lid=+sf.replace("lic_edit_","");setLl(ll.map(function(x){return x.id===lid?Object.assign({},lf,{id:lid}):x;}));}else{setLl([Object.assign({},lf,{id:Date.now()})].concat(ll));}setSf(null);showToast(lang==="en"?"✓ License saved":"✓ 证件已保存");}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 567}}
          , React.createElement(Field, { label: T.licType, value: lf.type, onChange: function(v){if(v==="__new__"){inputAction({title:lang==="en"?"New license type":"新证件类型",onSubmit:function(n){if(n&&n.trim()){var nm=n.trim();setCustLicTypes(custLicTypes.concat([nm]));setLf(Object.assign({},lf,{type:nm}));}}});return;}setLf(Object.assign({},lf,{type:v}));}, options: [["",T.pleaseSelect]].concat((lang==="en"?LICTYPES_EN:LICTYPES_ZH).map(function(l){return [l,l];})).concat(custLicTypes.map(function(l){return [l,l];})).concat([["__new__",lang==="en"?"+ Add new type...":"+ 添加新证件..."]]), __self: this, __source: {fileName: _jsxFileName, lineNumber: 568}} )
          , React.createElement(Field, { label: T.licNum, value: lf.number, onChange: function(v){setLf(Object.assign({},lf,{number:v}));}, placeholder: lang==="en"?"Optional":"编号（可选）", __self: this, __source: {fileName: _jsxFileName, lineNumber: 569}} )
          , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 570}}
            , React.createElement(Field, { label: T.issueDate, type: "date", value: lf.issueDate, onChange: function(v){setLf(Object.assign({},lf,{issueDate:v}));}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 571}} )
            , React.createElement(Field, { label: T.expiryDate, type: "date", value: lf.expiryDate, onChange: function(v){setLf(Object.assign({},lf,{expiryDate:v}));}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 572}} )
          )
          , React.createElement(Field, { label: T.renewalFee, type: "number", value: lf.renewalFee, onChange: function(v){setLf(Object.assign({},lf,{renewalFee:v}));}, money: true, placeholder: "0.00", __self: this, __source: {fileName: _jsxFileName, lineNumber: 574}} )
          , React.createElement(Field, { label: T.reminderDays, value: lf.reminderDays||"60", onChange: function(v){setLf(Object.assign({},lf,{reminderDays:v}));}, options: [["30",T.days30],["60",T.days60],["90",T.days90],["180",T.days180]], __self: this, __source: {fileName: _jsxFileName, lineNumber: 575}} )
        )
      ) : null

      , sf==="cc" ? (
        React.createElement(Modal, { title: cf._editKey?(lang==="en"?"Edit Category":"编辑类别"):(lang==="en"?"Add Category":"添加类别"), onClose: function(){setSf(cf._returnTo||null);}, onSave: function(){if(!cf.label.trim())return;var key=cf._editKey||"cc_"+Date.now(),newCat={label:cf.label.trim(),icon:cf.icon,group:cf.group,g:cf.group},newCc=Object.assign({},cc);newCc[key]=newCat;setCc(newCc);if(cf._returnTo==="exp"){setEf(Object.assign({},ef,{category:key}));setSelGrp(cf.group);setSf("exp");}else{setSf(null);}}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 580}}
          , React.createElement(Field, { label: lang==="en"?"Name":"类别名称", value: cf.label, onChange: function(v){setCf(Object.assign({},cf,{label:v}));}, placeholder: lang==="en"?"e.g. Wheel Repair":"例：轮毂修复", __self: this, __source: {fileName: _jsxFileName, lineNumber: 581}} )
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 582}}, React.createElement('div', { style: {fontSize:14,color:C.text2,marginBottom:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 582}}, lang==="en"?"Icon":"图标"), React.createElement('div', { style: {display:"flex",flexWrap:"wrap",gap:5}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 582}}, ICONS.map(function(ic){var bdCol=cf.icon===ic?C.accent:C.border,bgCol=cf.icon===ic?"#0A2040":"#111D30";return React.createElement('button', { key: ic, onClick: function(){setCf(Object.assign({},cf,{icon:ic}));}, style: {width:38,height:38,borderRadius:8,border:"2px solid "+bdCol,background:bgCol,fontSize:16,cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 582}}, ic);}), " " ))
          , React.createElement(Field, { label: lang==="en"?"Group":"归属大类", value: cf.group, onChange: function(v){if(v==="__new__"){inputAction({title:lang==="en"?"New group name":"新大类名称",onSubmit:function(name){if(name&&name.trim()){var trimmed=name.trim();setCustGroups(custGroups.concat([{name:trimmed,icon:"📁",color:"#A8D0E8"}]));setCf(Object.assign({},cf,{group:trimmed}));}}});return;}setCf(Object.assign({},cf,{group:v}));}, options: (function(){var GROUP_LABELS=lang==="en"?{"车辆":"Vehicle","牌照":"License","平台":"Platform","其他":"Other","自定义":"Custom"}:{"车辆":"车辆","牌照":"牌照","平台":"平台","其他":"其他","自定义":"自定义"};var opts=GROUPS.map(function(g){return [g,GROUP_LABELS[g]||g];});custGroups.forEach(function(cg){opts.push([cg.name,cg.icon+" "+cg.name]);});opts.push(["__new__",lang==="en"?"+ Add new group...":"+ 添加新大类..."]);return opts;})(), __self: this, __source: {fileName: _jsxFileName, lineNumber: 583}} )
        )
      ) : null

      , editFx ? (
        React.createElement(Modal, { title: (lang==="en"?"Edit: ":"编辑：")+editFx.fixedLabel, onClose: function(){setEditFx(null);}, onSave: function(){setEl(el.map(function(x){return x.id===editFx.id?Object.assign({},x,{amount:editFx.amount,notes:editFx.notes}):x;}));setEditFx(null);}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 588}}
          , React.createElement(Field, { label: T.amount, type: "number", value: editFx.amount, onChange: function(v){setEditFx(Object.assign({},editFx,{amount:v}));}, money: true, placeholder: "0.00", __self: this, __source: {fileName: _jsxFileName, lineNumber: 589}} )
          , React.createElement(Field, { label: T.notes, value: editFx.notes, onChange: function(v){setEditFx(Object.assign({},editFx,{notes:v}));}, placeholder: T.optional, __self: this, __source: {fileName: _jsxFileName, lineNumber: 590}} )
          , React.createElement('div', { style: {fontSize:13,color:C.text3,background:"#0A1428",borderRadius:8,padding:"10px 12px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 591}}, lang==="en"?"Only edits this month, does not affect other months":"只修改本月这一笔，不影响其他月份")
        )
      ) : null

      , showDrawer ? (
        React.createElement('div', { style: {position:"fixed",inset:0,zIndex:400,display:"flex",animation:"fadeIn 0.15s"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 596}}
          , React.createElement('div', { style: {width:"68%",maxWidth:260,background:"linear-gradient(180deg, "+C.bg2+" 0%, "+C.bg+" 100%)",height:"100%",overflowY:"auto",borderRight:"1px solid "+C.border,display:"flex",flexDirection:"column",paddingBottom:"70px",boxShadow:SHADOW.lg}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 597}}
            , React.createElement('div', { style: {padding:"24px 20px 18px",borderBottom:"1px solid "+C.border,background:"linear-gradient(135deg, rgba(0,212,255,0.05), transparent)"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 598}}
              , React.createElement('div', { style: {fontSize:FS.lg+1,fontWeight:800,color:C.text,letterSpacing:-0.2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 599}}, T.menu)
              , React.createElement('div', { style: {fontSize:FS.xs,color:C.text3,marginTop:4,letterSpacing:0.5,textTransform:"uppercase"}}, "Settings & Tools")
            )
            , React.createElement('div', { style: {padding:"10px 0",flex:1}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 602}}
              , (function(){
                var mainItems = [
                  {icon:"🧮",label:lang==="en"?"Calculator":"计算器",action:function(){setShowDrawer(false);setCalcFloat(Object.assign({},calcFloat,{mode:"floating"}));}},
                  {icon:"📝",label:lang==="en"?"Notes":"记事本",action:function(){setShowDrawer(false);setSf("notes");}},
                  {icon:"🧾",label:lang==="en"?"Tax Center":"税务中心",action:function(){setShowDrawer(false);setSf("tax_center");}},
                  {icon:"&#128190;",label:T.backup,action:function(){setShowDrawer(false);setShowBackup(true);}},
                  {icon:"&#128276;",label:T.reminder,action:function(){setShowDrawer(false);setShowRemMgr(true);}},
                  {icon:"&#128663;",label:T.vehicle,action:function(){setShowDrawer(false);setSf("drawer_veh");}},
                  {icon:"🧑",label:lang==="en"?"Driver Info":"司机信息",action:function(){setShowDrawer(false);setSf("drawer_driver");}},
                  {icon:"&#128241;",label:T.platform,action:function(){setShowDrawer(false);setShowPlatMgr(true);}},
                  {icon:"🚖",label:lang==="en"?"Driver Type":"切换司机类型",action:function(){setShowDrawer(false);setDriverType(null);setOnboardingDismissed(false);}},
                  {icon:"📖",label:lang==="en"?"User Guide":"使用指南",action:function(){setShowDrawer(false);setSf("help");}}
                ];
                var advancedItems = [
                  {icon:simpleMode?"🎯":"⚡", label:(simpleMode?(lang==="en"?"Simple Mode (ON)":"精简模式（开启）"):(lang==="en"?"Simple Mode (OFF)":"精简模式（关闭）")), action:function(){setSimpleMode(!simpleMode);showToast(simpleMode?(lang==="en"?"Full mode":"完整模式"):(lang==="en"?"✓ Simple mode":"✓ 精简模式"));}, color:simpleMode?"#5ADA7A":C.text2},
                  {icon:"&#128197;",label:T.fixedFees,action:function(){setShowDrawer(false);setSf("drawer_fixed");}},
                  {icon:"🗂",label:lang==="en"?"Categories":"支出类别",action:function(){setShowDrawer(false);setSf("manage_cats");}},
                  {icon:"&#128203;",label:T.license,action:function(){setShowDrawer(false);setSf("drawer_lic");}},
                  {icon:"🏥",label:lang==="en"?"Health Check":"数据健康检查",action:function(){setShowDrawer(false);setSf("health_check");}},
                  {icon:"🔒",label:lang==="en"?"PIN Lock":"PIN 锁屏",action:function(){setShowDrawer(false);setSf("pin_settings");}}
                ];
                var signOut = {icon:"🚪",label:lang==="en"?"Sign Out":"退出登录",action:function(){confirmAction(lang==="en"?"Sign out of Google?":"退出 Google 登录？", lang==="en"?"You will be signed out from Drive sync.":"将退出 Drive 同步。", function(){setGUser(null);try{localStorage.removeItem("nyc_user");localStorage.removeItem("nyc_tab");}catch(e){}setTab(0);setSf(null);setShowDrawer(false);setShowBackup(false);setShowPlatMgr(false);setShowRemMgr(false);showToast(lang==="en"?"✓ Signed out":"✓ 已退出");}, {danger:false, confirmLabel:lang==="en"?"Sign Out":"退出"});},color:C.danger};
                
                var renderItem = function(item, i){
                  return React.createElement('button', { key: i, onClick: item.action, style: {display:"flex",alignItems:"center",gap:14,width:"100%",background:"none",border:"none",padding:"13px 20px",cursor:"pointer",textAlign:"left",color:item.color||C.text,transition:"background 0.15s"} }
                    , React.createElement('span', { style: {fontSize:20,width:24,textAlign:"center"}, dangerouslySetInnerHTML: {__html:item.icon} } )
                    , React.createElement('span', { style: {fontSize:FS.md+1,color:item.color||C.text,fontWeight:600,letterSpacing:0.1} }, item.label)
                    );
                };
                
                return React.createElement('div', null
                  // Main items
                  , mainItems.map(renderItem)
                  // Advanced toggle (collapsed by default)
                  , React.createElement('button', {
                      onClick: function(){setShowAdvanced(!showAdvanced);},
                      style: {display:"flex",alignItems:"center",gap:14,width:"100%",background:"none",border:"none",padding:"14px 18px",cursor:"pointer",textAlign:"left",borderBottom:"1px solid "+C.border,color:C.text3}
                    }
                    , React.createElement('span', {style:{fontSize:20}}, "⚙️")
                    , React.createElement('span', {style:{fontSize:14,fontWeight:600}}, lang==="en"?"Advanced":"高级设置")
                    , React.createElement('span', {style:{marginLeft:"auto",fontSize:14}}, showAdvanced?"▾":"▸")
                  )
                  // Advanced items (only when expanded)
                  , showAdvanced ? React.createElement('div', {style:{background:"#0A0A12"}}, advancedItems.map(renderItem)) : null
                  // Sign out (always at bottom)
                  , renderItem(signOut, 999)
                );
              }())
            )
            , React.createElement('div', { style: {fontSize:11,color:C.text3,textAlign:"center",padding:"12px 18px 16px",borderTop:"1px solid "+C.border,letterSpacing:0.5} }, "NYC RIDESHARE TRACKER · "+APP_VERSION    )
          )
          , React.createElement('div', { style: {flex:1,background:"rgba(0,0,0,0.6)"}, onClick: function(){setShowDrawer(false);}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 606}} )
        )
      ) : null

      , showGoal ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300,padding:20}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 611}}
          , React.createElement('div', { style: {background:C.bg2,borderRadius:16,padding:24,width:"100%",maxWidth:320,border:"1px solid "+C.border}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 612}}
            , React.createElement('div', { style: {fontSize:16,fontWeight:800,marginBottom:16}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 613}}, "🎯 " , lang==="en"?("Goal for "+mo):(mo+" 收入目标"))
            , React.createElement('input', { type: "number", value: incGoal, onChange: function(e){setIncGoal(e.target.value);}, placeholder: lang==="en"?"e.g. 5000":"例：5000", style: Object.assign({},IS,{fontSize:20,fontWeight:700,marginBottom:16}), __self: this, __source: {fileName: _jsxFileName, lineNumber: 614}} )
            , React.createElement('div', { style: {display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 615}}, ["3000","4000","5000","6000","7000","8000"].map(function(v){return React.createElement('button', { key: v, onClick: function(){setIncGoal(v);}, style: {background:incGoal===v?C.bg3:C.bg3,border:"1px solid "+(incGoal===v?C.accent:"#2A3A54"),borderRadius:8,padding:"6px 12px",color:incGoal===v?C.accent:C.text2,fontSize:13,cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 615}}, "$", v);}))
            , React.createElement('div', { style: {display:"flex",gap:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 616}}, React.createElement('button', { onClick: function(){setIncGoal("");setShowGoal(false);}, style: {flex:1,background:"#1E3050",border:"none",borderRadius:10,padding:12,color:C.text2,fontSize:14,cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 616}}, lang==="en"?"Clear":"清除"), React.createElement('button', { onClick: function(){setShowGoal(false);}, style: {flex:2,background:"linear-gradient(135deg,#00D4FF,#0055FF)",border:"none",borderRadius:10,padding:12,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 616}}, "✓ " , lang==="en"?"Save":"保存"))
          )
        )
      ) : null

      , sf==="pin_settings" ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:C.bg,zIndex:300,overflowY:"auto"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}
          , React.createElement('div', { style: {maxWidth:600,margin:"0 auto",padding:"0 0 80px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}
            , React.createElement('div', { style: {background:C.bg2,padding:"16px 18px",borderBottom:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}
              , React.createElement('div', { style: {fontSize:16,fontWeight:800}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}, "🔒 " , lang==="en"?"PIN Lock":"PIN 锁屏")
              , React.createElement('button', { onClick: function(){setSf(null);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:32,height:32,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}, "✕")
            )
            , React.createElement('div', { style: {padding:"20px 18px",display:"flex",flexDirection:"column",gap:16}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}
              // Status card
              , React.createElement(Card, { style: {padding:"16px 18px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}
                , React.createElement('div', { style: {fontSize:14,fontWeight:700,color:hasPIN?C.success:"#FF9A65",marginBottom:6}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}, hasPIN?(lang==="en"?"✓ PIN is set":"✓ 已设置 PIN"):(lang==="en"?"⚠ No PIN set":"⚠ 未设置 PIN"))
                , React.createElement('div', { style: {fontSize:13,color:C.text3,marginBottom:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}, hasPIN?(lang==="en"?"App will lock after "+pinTimeout+" min of inactivity":"App 将在空闲 "+pinTimeout+" 分钟后锁定"):(lang==="en"?"Set a 4-digit PIN to protect your data":"设置 4 位 PIN 来保护你的数据"))
                , !hasPIN ? React.createElement('button', { onClick: function(){setShowPinSetup(true);}, style: {width:"100%",background:"linear-gradient(135deg,#00D4FF,#0055FF)",border:"none",color:"#fff",fontSize:14,fontWeight:700,padding:"12px",borderRadius:10,cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}, lang==="en"?"🔐 Set PIN":"🔐 设置 PIN") : React.createElement('div', { style: {display:"flex",gap:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}
                  , React.createElement('button', { onClick: function(){confirmAction(lang==="en"?"Reset PIN?":"重置 PIN？", lang==="en"?"You'll set a new PIN.":"将设置新的 PIN。", function(){try{localStorage.removeItem("nyc_pin");}catch(e){}setHasPIN(false);setShowPinSetup(true);}, {danger:false});}, style: {flex:1,background:C.border,border:"1px solid "+C.border2,color:C.text2,fontSize:13,fontWeight:600,padding:"10px",borderRadius:10,cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}, lang==="en"?"🔄 Change PIN":"🔄 修改 PIN")
                  , React.createElement('button', { onClick: function(){confirmAction(lang==="en"?"Disable PIN lock?":"关闭 PIN 锁屏？", lang==="en"?"Your data will no longer be PIN-protected.":"数据将不再受 PIN 保护。", function(){try{localStorage.removeItem("nyc_pin");}catch(e){}setHasPIN(false);});}, style: {flex:1,background:"#2A1010",border:"1px solid #5A2020",color:C.danger,fontSize:13,fontWeight:600,padding:"10px",borderRadius:10,cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}, lang==="en"?"❌ Disable":"❌ 关闭")
                )
              )
              // Timeout setting
              , hasPIN ? React.createElement(Card, { style: {padding:"16px 18px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}
                , React.createElement('div', { style: {fontSize:14,fontWeight:700,color:C.text2,marginBottom:4}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}, lang==="en"?"⏱ Auto-lock after":"⏱ 空闲多久后锁定")
                , React.createElement('div', { style: {fontSize:12,color:C.text3,marginBottom:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}, lang==="en"?"How long of inactivity before App locks":"App 多长时间不操作后自动锁定")
                , React.createElement('div', { style: {display:"flex",gap:6,flexWrap:"wrap"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}
                  , [1,3,5,10,30].map(function(m){
                    var sel = pinTimeout===m;
                    return React.createElement('button', { key: m, onClick: function(){setPinTimeout(m);}, style: {flex:"1 0 auto",minWidth:60,padding:"8px 12px",borderRadius:8,border:"1px solid "+(sel?C.accent:"#2A3A54"),background:sel?C.bg3:C.bg3,color:sel?C.accent:C.text2,fontSize:13,fontWeight:sel?700:600,cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}, m+(lang==="en"?" min":" 分钟"));
                  })
                )
              ) : null
              // Info
              , React.createElement('div', { style: {fontSize:12,color:C.text3,padding:"8px 4px",lineHeight:1.6}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}
                , React.createElement('div', { style: {marginBottom:4}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}, "ℹ️ " , lang==="en"?"How it works:":"工作原理：")
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}, lang==="en"?"• PIN is stored locally (hashed) on this device":"• PIN 仅存储在本机（已加密）")
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}, lang==="en"?"• You'll need to set PIN separately on each device":"• 每台设备需要单独设置 PIN")
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}, lang==="en"?"• Forgot PIN? Sign out and start fresh":"• 忘记 PIN？退出登录后可重置")
              )
            )
          )
        )
      ) : null

      , (sf==="calculator" || calcFloat.mode==="floating") ? (function(){
          var isFloat = calcFloat.mode==="floating" && sf!=="calculator";
          var closeAndCloseAll = function(){
            // From floating: hide; from full: just close sf
            if(isFloat){
              setCalcFloat(Object.assign({},calcFloat,{mode:"hidden"}));
            } else {
              setSf(null);
            }
          };
          var minimize = function(){
            // Minimize to corner chip — works for both floating and full
            setCalcFloat(Object.assign({},calcFloat,{mode:"minimized"}));
            if(sf==="calculator") setSf(null);
          };
          // Inline calculator helpers (defined inside the modal scope to keep state changes simple)
          var doClear = function(){
            setCalcState({display:"",prevValue:null,operator:null,waitingForOperand:false,history:calcState.history||[],memory:calcState.memory||0});
          };
          var doToggleSign = function(){
            var v = parseFloat(calcState.display) || 0;
            setCalcState(Object.assign({},calcState,{display:String(-v)}));
          };
          var doPercent = function(){
            var v = parseFloat(calcState.display) || 0;
            setCalcState(Object.assign({},calcState,{display:String(v/100)}));
          };
          var compute = function(prev, curr, op){
            switch(op){
              case "+": return prev+curr;
              case "−": return prev-curr;
              case "×": return prev*curr;
              case "÷": return curr===0 ? 0 : prev/curr;
              default: return curr;
            }
          };
          var doOperator = function(op){
            var curr = parseFloat(calcState.display) || 0;
            if(calcState.prevValue===null){
              setCalcState(Object.assign({},calcState,{prevValue:curr,operator:op,waitingForOperand:true}));
            } else if(calcState.operator){
              var result = compute(calcState.prevValue, curr, calcState.operator);
              var newHist = (calcState.history||[]).slice();
              newHist.unshift(calcState.prevValue+" "+calcState.operator+" "+curr+" = "+result);
              if(newHist.length>20) newHist = newHist.slice(0,20);
              setCalcState({display:String(result),prevValue:result,operator:op,waitingForOperand:true,history:newHist,memory:calcState.memory});
            }
          };
          var doEquals = function(){
            var curr = parseFloat(calcState.display) || 0;
            if(calcState.prevValue!==null && calcState.operator){
              var result = compute(calcState.prevValue, curr, calcState.operator);
              var newHist = (calcState.history||[]).slice();
              newHist.unshift(calcState.prevValue+" "+calcState.operator+" "+curr+" = "+result);
              if(newHist.length>20) newHist = newHist.slice(0,20);
              setCalcState({display:String(result),prevValue:null,operator:null,waitingForOperand:true,history:newHist,memory:calcState.memory});
            }
          };
          // Memory functions
          var doMemPlus = function(){
            var v = parseFloat(calcState.display) || 0;
            var newMem = (calcState.memory||0) + v;
            setCalcState(Object.assign({},calcState,{memory:newMem,waitingForOperand:true}));
            showToast(lang==="en"?("M+ "+v.toFixed(2)+" → M="+newMem.toFixed(2)):("M+ "+v.toFixed(2)+" → 记忆="+newMem.toFixed(2)),"success");
          };
          var doMemMinus = function(){
            var v = parseFloat(calcState.display) || 0;
            var newMem = (calcState.memory||0) - v;
            setCalcState(Object.assign({},calcState,{memory:newMem,waitingForOperand:true}));
            showToast(lang==="en"?("M− "+v.toFixed(2)+" → M="+newMem.toFixed(2)):("M− "+v.toFixed(2)+" → 记忆="+newMem.toFixed(2)),"success");
          };
          var doMemRecall = function(){
            var m = calcState.memory||0;
            setCalcState(Object.assign({},calcState,{display:String(m),waitingForOperand:false}));
            showToast(lang==="en"?("MR → "+m.toFixed(2)):("MR → 读出 "+m.toFixed(2)),"info");
          };
          var doMemClear = function(){
            setCalcState(Object.assign({},calcState,{memory:0}));
            showToast(lang==="en"?"MC → memory cleared":"MC → 记忆已清空","info");
          };
          var doMemStore = function(){
            var v = parseFloat(calcState.display) || 0;
            setCalcState(Object.assign({},calcState,{memory:v,waitingForOperand:true}));
            showToast(lang==="en"?("MS → memory = "+v.toFixed(2)):("MS → 存入记忆 "+v.toFixed(2)),"success");
          };
          // === Voice input: parse spoken phrase to a number/expression ===
          // Handles Chinese & English: "二十三点五" / "twenty-three point five" / "100加50" → applies to calculator
          // Try to parse as expression first (e.g. "1 + 1", "5加3", "10 times 2")
          var parseSpokenExpression = function(s){
            if(!s) return null;
            // Normalize: replace Chinese operators and English words with symbols
            var normalized = s.toLowerCase().trim();
            // Chinese operators
            normalized = normalized.replace(/加/g, " + ");
            normalized = normalized.replace(/减|减去/g, " - ");
            normalized = normalized.replace(/乘|乘以|乘上|x|×/g, " * ");
            normalized = normalized.replace(/除|除以/g, " / ");
            normalized = normalized.replace(/等于|得|结果/g, ""); // strip
            // English operators
            normalized = normalized.replace(/\bplus\b/g, " + ");
            normalized = normalized.replace(/\bminus\b/g, " - ");
            normalized = normalized.replace(/\btimes\b|\bmultiplied by\b/g, " * ");
            normalized = normalized.replace(/\bdivided by\b|\bover\b/g, " / ");
            normalized = normalized.replace(/\bequals\b/g, "");
            // Find operator position (only if string contains exactly one operator)
            var opMatch = normalized.match(/[\+\-\*\/]/g);
            if(!opMatch || opMatch.length === 0) return null;
            // Split by first operator found
            var opChars = ["+","-","*","/"];
            var splitOp = null, splitIdx = -1;
            for(var oi=0; oi<opChars.length; oi++){
              var idx = normalized.indexOf(opChars[oi]);
              if(idx > 0 && (splitIdx < 0 || idx < splitIdx)){
                splitOp = opChars[oi];
                splitIdx = idx;
              }
            }
            if(!splitOp) return null;
            var leftStr = normalized.slice(0, splitIdx).trim();
            var rightStr = normalized.slice(splitIdx+1).trim();
            // Each side might still be Chinese/English number — parse with parseSpokenToNumber
            var leftN = parseSpokenToNumber(leftStr);
            var rightN = parseSpokenToNumber(rightStr);
            if(!leftN || !rightN) return null;
            var result;
            switch(splitOp){
              case "+": result = leftN.n + rightN.n; break;
              case "-": result = leftN.n - rightN.n; break;
              case "*": result = leftN.n * rightN.n; break;
              case "/": result = rightN.n === 0 ? 0 : leftN.n / rightN.n; break;
            }
            // Convert back to display operator
            var displayOp = splitOp === "*" ? "×" : (splitOp === "/" ? "÷" : (splitOp === "-" ? "−" : "+"));
            return {type:"expr", a: leftN.n, op: displayOp, b: rightN.n, n: result, raw: s};
          };
          var parseSpokenToNumber = function(s){
            if(!s) return null;
            s = s.toLowerCase().trim();
            // First try direct number parse
            var direct = s.replace(/[^\d.\-]/g, "");
            if(direct && !isNaN(parseFloat(direct))) return {n: parseFloat(direct), raw: s};
            // Chinese number parsing
            var zhDigits = {"零":0,"〇":0,"一":1,"二":2,"两":2,"三":3,"四":4,"五":5,"六":6,"七":7,"八":8,"九":9};
            var zhUnits = {"十":10,"百":100,"千":1000,"万":10000};
            // "十五" → 15, "三十" → 30, "三百二十" → 320
            var parseZh = function(text){
              var n=0, current=0;
              for(var i=0;i<text.length;i++){
                var ch = text[i];
                if(zhDigits[ch] !== undefined){
                  current = zhDigits[ch];
                } else if(zhUnits[ch] !== undefined){
                  if(current===0) current = 1;
                  n += current * zhUnits[ch];
                  current = 0;
                }
              }
              return n + current;
            };
            // Handle decimal: "二十三点五" → 23.5
            if(s.indexOf("点") >= 0){
              var parts = s.split("点");
              var intPart = parseZh(parts[0]);
              var decStr = "";
              for(var j=0;j<parts[1].length;j++){
                var d = zhDigits[parts[1][j]];
                if(d !== undefined) decStr += d;
              }
              if(decStr) return {n: parseFloat(intPart + "." + decStr), raw:s};
              return {n: intPart, raw:s};
            }
            // Pure Chinese number
            if(/^[零〇一二两三四五六七八九十百千万]+$/.test(s)){
              return {n: parseZh(s), raw:s};
            }
            // English word numbers (basic)
            var enWords = {zero:0,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12,thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,eighteen:18,nineteen:19,twenty:20,thirty:30,forty:40,fifty:50,sixty:60,seventy:70,eighty:80,ninety:90,hundred:100,thousand:1000};
            // "twenty three point five"
            if(s.indexOf("point") >= 0){
              var enParts = s.split("point");
              var enInt = enParts[0].trim().split(/[\s-]+/).reduce(function(acc, w){
                if(enWords[w] !== undefined){
                  if(enWords[w] === 100 || enWords[w] === 1000){ return acc * enWords[w]; }
                  return acc + enWords[w];
                }
                return acc;
              }, 0);
              var enDec = "";
              enParts[1].trim().split(/\s+/).forEach(function(w){
                if(enWords[w] !== undefined && enWords[w] < 10) enDec += enWords[w];
              });
              if(enDec) return {n: parseFloat(enInt + "." + enDec), raw:s};
              return {n: enInt, raw:s};
            }
            // "twenty three" or "three hundred fifty"
            var words = s.split(/[\s-]+/);
            var hasWord = false;
            var enResult = words.reduce(function(acc, w){
              if(enWords[w] !== undefined){
                hasWord = true;
                if(enWords[w] === 100 || enWords[w] === 1000){ return acc===0 ? enWords[w] : acc * enWords[w]; }
                return acc + enWords[w];
              }
              return acc;
            }, 0);
            if(hasWord) return {n: enResult, raw:s};
            return null;
          };
          var doVoiceInput = function(){
            var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
            if(!SR){
              showToast(lang==="en"?"Voice input not supported on this browser":"此浏览器不支持语音输入","error");
              return;
            }
            try{
              var rec = new SR();
              rec.lang = lang==="en" ? "en-US" : "zh-CN";
              rec.interimResults = false;
              rec.continuous = false;
              rec.maxAlternatives = 3;
              setCalcState(Object.assign({},calcState,{voiceListening:true}));
              showToast(lang==="en"?"🎤 Listening... say a number":"🎤 听着呢… 说个数字","info");
              rec.onresult = function(ev){
                // Try each alternative — first try expression, then plain number
                var foundExpr = null, foundNum = null, allTranscripts = [];
                for(var i=0;i<ev.results[0].length;i++){
                  var t = ev.results[0][i].transcript;
                  allTranscripts.push(t);
                  // Try expression first (e.g. "1+1", "5加3")
                  if(!foundExpr){
                    var pe = parseSpokenExpression(t);
                    if(pe) foundExpr = pe;
                  }
                  // Then try plain number
                  if(!foundNum){
                    var pn = parseSpokenToNumber(t);
                    if(pn) foundNum = pn;
                  }
                  if(foundExpr) break; // expression found, stop
                }
                if(foundExpr){
                  // Apply expression: set display to result, also push to history
                  setCalcState(function(prev){
                    var newHist = (prev.history||[]).slice();
                    newHist.unshift(foundExpr.a + " " + foundExpr.op + " " + foundExpr.b + " = " + foundExpr.n);
                    if(newHist.length>20) newHist = newHist.slice(0,20);
                    return Object.assign({},prev,{
                      voiceListening:false,
                      display: String(foundExpr.n),
                      prevValue:null,
                      operator:null,
                      waitingForOperand:true,
                      history:newHist
                    });
                  });
                  showToast(lang==="en"
                    ? ("✓ Heard: "+foundExpr.raw+" → "+foundExpr.a+" "+foundExpr.op+" "+foundExpr.b+" = "+foundExpr.n)
                    : ("✓ 听到："+foundExpr.raw+" → "+foundExpr.a+" "+foundExpr.op+" "+foundExpr.b+" = "+foundExpr.n)
                    ,"success");
                } else if(foundNum){
                  setCalcState(function(prev){
                    return Object.assign({},prev,{voiceListening:false, display: String(foundNum.n), waitingForOperand:false});
                  });
                  showToast(lang==="en"?("✓ Heard: "+foundNum.raw+" → "+foundNum.n):("✓ 听到："+foundNum.raw+" → "+foundNum.n),"success");
                } else {
                  setCalcState(function(prev){return Object.assign({},prev,{voiceListening:false});});
                  showToast(lang==="en"?("Couldn't parse: "+allTranscripts[0]):("没听清: "+allTranscripts[0]),"error");
                }
              };
              rec.onerror = function(ev){
                setCalcState(function(prev){return Object.assign({},prev,{voiceListening:false});});
                showToast(lang==="en"?("Voice error: "+ev.error):("语音错误："+ev.error),"error");
              };
              rec.onend = function(){
                setCalcState(function(prev){return Object.assign({},prev,{voiceListening:false});});
              };
              rec.start();
            }catch(err){
              setCalcState(function(prev){return Object.assign({},prev,{voiceListening:false});});
              showToast(lang==="en"?"Voice input failed":"语音输入失败","error");
            }
          };
          var btn = function(label, onClick, style){
            return React.createElement('button', {
              onClick: onClick,
              style: Object.assign({
                background: C.bg3,
                border: "1px solid "+C.border,
                color: C.text,
                fontSize: 22,
                fontWeight: 600,
                padding: "16px 0",
                borderRadius: 12,
                cursor: "pointer",
                transition: "all 0.1s",
                fontVariantNumeric: "tabular-nums"
              }, style||{})
            }, label);
          };
          var opStyle = {background:"linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,85,255,0.05))",border:"1px solid rgba(0,212,255,0.3)",color:C.accent,fontWeight:700};
          var fnStyle = {background:C.bg4,color:C.text2,fontSize:18};
          var equalStyle = {background:"linear-gradient(135deg,#00D4FF,#0055FF)",border:"none",color:"#fff",fontWeight:800,fontSize:24};
          // Outer wrapper: full-screen for "calculator" sf, or floating panel for floating mode
          // Compute floating position — use saved x/y, or default to bottom center
          var fx = (calcFloat.x != null) ? calcFloat.x : null;
          var fy = (calcFloat.y != null) ? calcFloat.y : null;
          var fscale = (calcFloat.scale && calcFloat.scale > 0) ? calcFloat.scale : 1;
          var fopacity = (calcFloat.opacity != null) ? calcFloat.opacity : 0.92;
          // Convert hex bg to rgba with opacity
          var floatBg = "rgba(10,14,26,"+fopacity+")"; // C.bg = #0A0E1A
          // Bar mode: horizontal strip — only display + minimal essential
          var barMode = !!calcFloat.barMode;
          // Compactness levels based on scale:
          // scale > 0.85 = full mode (everything visible)
          // scale 0.70-0.85 = compact mode (hide MC/MS, smaller fonts)
          // scale < 0.70 = ultra-compact (hide all M-buttons + ±/%, only digits + ops + =)
          var compact = fscale < 0.85 || barMode;
          var ultraCompact = fscale < 0.70 || barMode;
          // Width scales with fscale; bar mode stretches wider
          var floatW = barMode
            ? Math.max(280, Math.min(window.innerWidth - 24, Math.round(420 * fscale)))
            : Math.max(200, Math.min(380, Math.round(380 * fscale)));
          // Display number font: scales but with floor of 22px so digits stay readable
          var dispFont = Math.max(22, Math.round(30 * fscale));
          var btnFont = Math.max(11, Math.round(18 * fscale));
          var btnPad = Math.max(6, Math.round(10 * fscale));
          var memFont = Math.max(9, Math.round(11 * fscale));
          var memPad = Math.max(4, Math.round(7 * fscale));
          var outerStyle = isFloat ? (
            (fx != null && fy != null) ? {
              position:"fixed",
              top:fy,
              left:fx,
              width:floatW,
              background:floatBg,
              backdropFilter:"blur(12px) saturate(1.4)",
              WebkitBackdropFilter:"blur(12px) saturate(1.4)",
              border:"2px solid "+C.accent,
              borderRadius:RADIUS.lg,
              boxShadow:"0 8px 28px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,212,255,0.4), 0 0 32px rgba(0,212,255,0.35)",
              zIndex:550,
              overflow:"hidden",
              animation:"fadeIn 0.15s"
            } : {
              position:"fixed",
              bottom:80,
              right:12,
              width:floatW,
              background:floatBg,
              backdropFilter:"blur(12px) saturate(1.4)",
              WebkitBackdropFilter:"blur(12px) saturate(1.4)",
              border:"2px solid "+C.accent,
              borderRadius:RADIUS.lg,
              boxShadow:"0 8px 28px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,212,255,0.4), 0 0 32px rgba(0,212,255,0.35)",
              zIndex:550,
              overflow:"hidden",
              animation:"fadeIn 0.15s"
            }
          ) : {
            position:"fixed",
            inset:0,
            background:C.bg,
            zIndex:300,
            overflowY:"auto"
          };
          // Drag handler — only active when floating
          var startDrag = function(e){
            if(!isFloat) return;
            // Don't start drag if clicking buttons inside header
            var tag = (e.target.tagName||"").toUpperCase();
            if(tag === "BUTTON" || tag === "INPUT") return;
            e.preventDefault();
            var t = e.touches ? e.touches[0] : e;
            var startX = t.clientX, startY = t.clientY;
            // Initial position of the panel (use bounding rect to handle the default centered case)
            var panel = e.currentTarget.parentNode.parentNode;
            var rect = panel.getBoundingClientRect();
            var origX = rect.left, origY = rect.top;
            var moved = false;
            var onMove = function(ev){
              var t2 = ev.touches ? ev.touches[0] : ev;
              var dx = t2.clientX - startX, dy = t2.clientY - startY;
              if(Math.abs(dx) > 3 || Math.abs(dy) > 3) moved = true;
              var newX = origX + dx;
              var newY = origY + dy;
              // Clamp to viewport
              var w = panel.offsetWidth, h = panel.offsetHeight;
              if(newX < 4) newX = 4;
              if(newY < 4) newY = 4;
              if(newX + w > window.innerWidth - 4) newX = window.innerWidth - w - 4;
              if(newY + h > window.innerHeight - 4) newY = window.innerHeight - h - 4;
              panel.style.left = newX + "px";
              panel.style.top = newY + "px";
              panel.style.right = "auto";
              panel.style.bottom = "auto";
              panel.style.margin = "0";
              if(ev.cancelable) ev.preventDefault();
            };
            var onEnd = function(){
              window.removeEventListener("mousemove", onMove);
              window.removeEventListener("mouseup", onEnd);
              window.removeEventListener("touchmove", onMove);
              window.removeEventListener("touchend", onEnd);
              if(moved){
                // Save final position
                var rect2 = panel.getBoundingClientRect();
                setCalcFloat(Object.assign({},calcFloat,{x:rect2.left, y:rect2.top}));
              }
            };
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onEnd);
            window.addEventListener("touchmove", onMove, {passive:false});
            window.addEventListener("touchend", onEnd);
          };
          // Resize handler — drag bottom-right corner to scale calculator
          var startResize = function(e){
            if(!isFloat) return;
            e.preventDefault();
            e.stopPropagation();
            var t = e.touches ? e.touches[0] : e;
            var startX = t.clientX, startY = t.clientY;
            var origScale = fscale;
            var moved = false;
            var lastScale = origScale;
            var onMove = function(ev){
              var t2 = ev.touches ? ev.touches[0] : ev;
              var dx = t2.clientX - startX;
              var dy = t2.clientY - startY;
              if(Math.abs(dx) > 3 || Math.abs(dy) > 3) moved = true;
              // Use larger of dx/dy to scale; every 250px diagonal = 1x
              var delta = (dx + dy) / 250;
              var newScale = Math.max(0.55, Math.min(1.5, origScale + delta));
              newScale = Math.round(newScale * 20) / 20; // snap to 5% steps
              if(newScale !== lastScale){
                lastScale = newScale;
                // Live update via state — re-renders with new sizes
                setCalcFloat(Object.assign({},calcFloat,{scale: newScale}));
              }
              if(ev.cancelable) ev.preventDefault();
            };
            var onEnd = function(){
              window.removeEventListener("mousemove", onMove);
              window.removeEventListener("mouseup", onEnd);
              window.removeEventListener("touchmove", onMove);
              window.removeEventListener("touchend", onEnd);
            };
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onEnd);
            window.addEventListener("touchmove", onMove, {passive:false});
            window.addEventListener("touchend", onEnd);
          };
          var innerStyle = isFloat ? {padding:0} : {maxWidth:480,margin:"0 auto",padding:"0 0 80px"};
          return React.createElement('div', {style:outerStyle}
            , React.createElement('div', {style:innerStyle}
              // Header — also acts as drag handle when floating
              , React.createElement('div', {
                  onMouseDown: isFloat ? startDrag : undefined,
                  onTouchStart: isFloat ? startDrag : undefined,
                  style: {background:isFloat?"rgba(18,24,38,"+(fopacity*0.85)+")":C.bg2,padding:barMode?"5px 8px":(isFloat?"10px 12px":"16px 18px"),borderBottom:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",position:isFloat?"static":"sticky",top:0,zIndex:10,cursor:isFloat?"move":"default",userSelect:"none",WebkitUserSelect:"none",touchAction:isFloat?"none":"auto"}
                }
                , React.createElement('div', {style:{display:"flex",gap:barMode?4:6}}
                  // Close button
                  , React.createElement('button', {onClick:closeAndCloseAll, style:{background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:barMode?12:14,cursor:"pointer",width:barMode?22:(isFloat?28:34),height:barMode?22:(isFloat?28:34),borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center"}, title:lang==="en"?"Close":"关闭"}, "✕")
                  // Minimize button
                  , React.createElement('button', {onClick:minimize, style:{background:C.bg3,border:"1px solid "+C.border,color:C.text3,fontSize:barMode?12:14,cursor:"pointer",width:barMode?22:(isFloat?28:34),height:barMode?22:(isFloat?28:34),borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center"}, title:lang==="en"?"Minimize to corner":"最小化到角落"}, "−")
                )
                , React.createElement('div', {style:{fontSize:isFloat?(barMode?12:14):16,fontWeight:800,display:"flex",alignItems:"center",gap:5,minWidth:0,overflow:"hidden",flexShrink:1}}
                  , (isFloat && !barMode) ? React.createElement('span',{style:{fontSize:11,color:C.text3,letterSpacing:1,marginRight:2}},"⋮⋮") : null
                  , "🧮"
                  , isFloat ? null : React.createElement('span', {style:{marginLeft:6}}, lang==="en"?"Calculator":"计算器")
                )
                , React.createElement('div', {style:{display:"flex",gap:4,alignItems:"center"}}
                  // Zoom out (hidden in barMode — bar IS the small mode)
                  , (isFloat && !barMode) ? React.createElement('button', {
                      onClick: function(){
                        var ns = Math.max(0.6, (calcFloat.scale||1) - 0.1);
                        setCalcFloat(Object.assign({},calcFloat,{scale: Math.round(ns*10)/10}));
                      },
                      style:{background:C.bg3,border:"1px solid "+C.border,color:C.text2,fontSize:14,cursor:"pointer",width:24,height:24,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700},
                      title: lang==="en"?"Smaller":"缩小"
                    }, "−") : null
                  // Scale label (hidden in barMode)
                  , (isFloat && !barMode) ? React.createElement('button', {
                      onClick: function(){
                        // Tap label → reset to 100%
                        setCalcFloat(Object.assign({},calcFloat,{scale: 1}));
                        showToast(lang==="en"?"✓ Reset zoom":"✓ 还原大小","info");
                      },
                      style:{background:"none",border:"none",color:C.text3,fontSize:9,cursor:"pointer",padding:"0 2px",fontVariantNumeric:"tabular-nums",minWidth:28,textAlign:"center"},
                      title: lang==="en"?"Tap to reset to 100%":"点击还原 100%"
                    }, Math.round((calcFloat.scale||1)*100) + "%") : null
                  // Zoom in (hidden in barMode)
                  , (isFloat && !barMode) ? React.createElement('button', {
                      onClick: function(){
                        var ns = Math.min(1.5, (calcFloat.scale||1) + 0.1);
                        setCalcFloat(Object.assign({},calcFloat,{scale: Math.round(ns*10)/10}));
                      },
                      style:{background:C.bg3,border:"1px solid "+C.border,color:C.text2,fontSize:14,cursor:"pointer",width:24,height:24,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700},
                      title: lang==="en"?"Larger":"放大"
                    }, "+") : null
                  // Opacity cycler (only when floating) — cycles through 100/75/50/30
                  , isFloat ? React.createElement('button', {
                      onClick: function(){
                        var levels = [0.92, 0.7, 0.45, 0.25];
                        var cur = calcFloat.opacity != null ? calcFloat.opacity : 0.92;
                        // Find current index, go to next
                        var idx = 0;
                        for(var i=0;i<levels.length;i++){
                          if(Math.abs(levels[i] - cur) < 0.05){ idx = i; break; }
                        }
                        var nxt = levels[(idx+1) % levels.length];
                        setCalcFloat(Object.assign({},calcFloat,{opacity: nxt}));
                        showToast(lang==="en"?("Opacity: "+Math.round(nxt*100)+"%"):("透明度："+Math.round(nxt*100)+"%"),"info");
                      },
                      style:{background:C.bg3,border:"1px solid "+C.border,color:C.text2,fontSize:barMode?10:12,cursor:"pointer",width:barMode?22:24,height:barMode?22:24,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",marginLeft:2},
                      title: lang==="en"?"Cycle opacity (see through)":"切换透明度（看穿背景）"
                    }, "👁") : null
                  // M+ and AC — only shown in barMode header (moved from main row to reduce crowding)
                  , barMode ? React.createElement('button', {
                      onClick: doMemPlus,
                      style:{background:"rgba(0,230,118,0.15)",border:"1px solid rgba(0,230,118,0.35)",color:C.success,fontSize:10,cursor:"pointer",padding:"3px 7px",borderRadius:6,fontWeight:700,height:22,whiteSpace:"nowrap"},
                      title: lang==="en"?"Add to memory":"加入内存"
                    }, "M+") : null
                  , barMode ? React.createElement('button', {
                      onClick: doClear,
                      style:{background:C.bg4,border:"1px solid "+C.border,color:C.text2,fontSize:10,cursor:"pointer",padding:"3px 7px",borderRadius:6,fontWeight:700,height:22,whiteSpace:"nowrap"},
                      title: lang==="en"?"Clear current":"清空当前"
                    }, "AC") : null
                  // Bar mode toggle — shrink to horizontal strip
                  , isFloat ? React.createElement('button', {
                      onClick: function(){
                        setCalcFloat(Object.assign({},calcFloat,{barMode: !barMode}));
                        showToast(barMode ? (lang==="en"?"✓ Full mode":"✓ 完整模式") : (lang==="en"?"✓ Bar mode":"✓ 长条模式"),"info");
                      },
                      style:{background:barMode?"rgba(0,212,255,0.25)":"rgba(0,212,255,0.08)",border:"1px solid "+(barMode?"rgba(0,212,255,0.5)":"rgba(0,212,255,0.3)"),color:barMode?"#fff":C.accent,fontSize:barMode?10:11,cursor:"pointer",padding:barMode?"3px 6px":"4px 8px",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,gap:3,whiteSpace:"nowrap",height:barMode?22:"auto"},
                      title: lang==="en"?(barMode?"Expand to full":"Shrink to bar"):(barMode?"展开":"长条模式")
                    }
                      , React.createElement('span', {style:{fontSize:barMode?11:13}}, barMode ? "▢" : "▭")
                      , React.createElement('span', null, barMode ? (lang==="en"?"Full":"展开") : (lang==="en"?"Bar":"长条"))
                    ) : null
                  // Clear button hidden in barMode (AC in header replaces it)
                  , barMode ? null : React.createElement('button', {onClick:function(){setCalcState({display:"",prevValue:null,operator:null,waitingForOperand:false,history:[],memory:0});showToast(lang==="en"?"✓ All cleared":"✓ 已全部清空");}, style:{background:"none",border:"1px solid "+C.border,color:C.text3,fontSize:11,cursor:"pointer",padding:"5px 9px",borderRadius:6}}, lang==="en"?"Clear":"清空")
                )
              )
              , React.createElement('div', {style:{padding:barMode?"6px 8px":(isFloat?Math.max(6, Math.round(12*fscale))+"px":"12px"),display:barMode?"flex":"block",alignItems:barMode?"center":"stretch",gap:barMode?5:0}}

                // ============ BAR MODE: SINGLE HORIZONTAL ROW ============
                , barMode ? React.createElement(React.Fragment, null
                  // Memory indicator (only if has memory) — small chip on the left
                  , (calcState.memory && calcState.memory !== 0) ? React.createElement('div', {
                      onClick: doMemRecall,
                      style:{flexShrink:0,fontSize:10,color:C.gold,fontWeight:700,letterSpacing:0.3,fontVariantNumeric:"tabular-nums",padding:"2px 6px",background:"rgba(255,215,0,0.12)",border:"1px solid rgba(255,215,0,0.3)",borderRadius:5,cursor:"pointer",height:32,display:"flex",alignItems:"center"},
                      title: lang==="en"?"Tap to recall (MR)":"点击读取(MR)"
                    }, "M ", calcState.memory.toFixed(0)) : null
                  // Operator preview (e.g., "5 +") if a chained operation is pending
                  , (calcState.prevValue!==null && calcState.operator) ? React.createElement('div', {
                      style:{flexShrink:0,fontSize:11,color:C.text3,fontVariantNumeric:"tabular-nums",height:32,display:"flex",alignItems:"center",padding:"0 4px"}
                    }, calcState.prevValue+" "+calcState.operator) : null
                  // Number input — flex grows to fill space
                  , React.createElement('input', {
                      type: "text",
                      inputMode: "decimal",
                      autoFocus: false,
                      value: calcState.display,
                      placeholder: "0",
                      onChange: function(e){
                        var v = e.target.value;
                        v = v.replace(/[^0-9.\-]/g, "");
                        if(v.indexOf("-") > 0) v = v.replace(/-/g, "");
                        var dots = v.split(".").length - 1;
                        if(dots > 1){
                          var firstDot = v.indexOf(".");
                          v = v.slice(0,firstDot+1) + v.slice(firstDot+1).replace(/\./g, "");
                        }
                        setCalcState(Object.assign({},calcState,{display:v,waitingForOperand:false}));
                      },
                      onKeyDown: function(e){
                        var k = e.key;
                        if(k === "Enter" || k === "="){ e.preventDefault(); doEquals(); return; }
                        if(k === "+"){ e.preventDefault(); doOperator("+"); return; }
                        if(k === "-"){
                          if(calcState.display === "0" || calcState.display === "" || calcState.waitingForOperand){
                            return;
                          }
                          e.preventDefault(); doOperator("−"); return;
                        }
                        if(k === "*" || k === "x" || k === "X"){ e.preventDefault(); doOperator("×"); return; }
                        if(k === "/"){ e.preventDefault(); doOperator("÷"); return; }
                        if(k === "%"){ e.preventDefault(); doPercent(); return; }
                        if(k === "Escape"){ e.preventDefault(); doClear(); return; }
                      },
                      style: {flex:"1 1 auto",minWidth:60,height:32,fontSize:22,fontWeight:800,color:C.text,textAlign:"right",letterSpacing:-0.3,fontVariantNumeric:"tabular-nums",background:"rgba(255,255,255,0.04)",border:"1px solid "+C.border,borderRadius:6,outline:"none",padding:"0 8px",fontFamily:"inherit",WebkitAppearance:"none"}
                    })
                  // Voice mic button
                  , React.createElement('button', {
                      onClick: doVoiceInput,
                      title: lang==="en"?"Voice input":"语音输入",
                      style: {flexShrink:0,width:34,height:32,borderRadius:6,background: calcState.voiceListening ? "rgba(255,82,82,0.2)" : "rgba(0,212,255,0.1)",border: "1px solid " + (calcState.voiceListening ? "rgba(255,82,82,0.5)" : "rgba(0,212,255,0.3)"),color: calcState.voiceListening ? C.danger : C.accent,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0}
                    }, "🎤")
                  // Operator buttons — bigger now that M+/AC are gone
                  , React.createElement('button', {onClick:function(){doOperator("+");}, style:{flexShrink:0,width:34,height:32,fontSize:18,fontWeight:700,background:"rgba(0,212,255,0.12)",border:"1px solid rgba(0,212,255,0.3)",color:C.accent,borderRadius:6,cursor:"pointer",padding:0}}, "+")
                  , React.createElement('button', {onClick:function(){doOperator("−");}, style:{flexShrink:0,width:34,height:32,fontSize:18,fontWeight:700,background:"rgba(0,212,255,0.12)",border:"1px solid rgba(0,212,255,0.3)",color:C.accent,borderRadius:6,cursor:"pointer",padding:0}}, "−")
                  , React.createElement('button', {onClick:function(){doOperator("×");}, style:{flexShrink:0,width:34,height:32,fontSize:18,fontWeight:700,background:"rgba(0,212,255,0.12)",border:"1px solid rgba(0,212,255,0.3)",color:C.accent,borderRadius:6,cursor:"pointer",padding:0}}, "×")
                  , React.createElement('button', {onClick:function(){doOperator("÷");}, style:{flexShrink:0,width:34,height:32,fontSize:18,fontWeight:700,background:"rgba(0,212,255,0.12)",border:"1px solid rgba(0,212,255,0.3)",color:C.accent,borderRadius:6,cursor:"pointer",padding:0}}, "÷")
                  // = button (highlighted)
                  , React.createElement('button', {onClick:doEquals, style:{flexShrink:0,width:42,height:32,fontSize:18,fontWeight:800,background:"linear-gradient(135deg,#00D4FF,#0055FF)",border:"none",color:"#fff",borderRadius:6,cursor:"pointer",padding:0}}, "=")
                ) :

                // ============ FULL MODE: original block layout ============
                React.createElement(React.Fragment, null
                // Display
                , React.createElement('div', {style:{background:C.bg3,border:"1px solid "+C.border,borderRadius:RADIUS.md,padding:"14px 14px 10px",marginBottom:10,minHeight:60,display:"flex",flexDirection:"column",justifyContent:"flex-end",boxShadow:SHADOW.sm,position:"relative"}}
                  // Memory indicator (top-left of display)
                  , (calcState.memory && calcState.memory !== 0) ? React.createElement('div', {style:{position:"absolute",top:6,left:10,fontSize:10,color:C.gold,fontWeight:700,letterSpacing:0.5,fontVariantNumeric:"tabular-nums"}}, "M ", calcState.memory.toFixed(2)) : null
                  , (calcState.prevValue!==null && calcState.operator) ? React.createElement('div', {style:{fontSize:12,color:C.text3,textAlign:"right",marginBottom:4,fontVariantNumeric:"tabular-nums"}}, calcState.prevValue+" "+calcState.operator) : null
                  // Editable input + voice mic button (right side)
                  , React.createElement('div', {style:{display:"flex",alignItems:"center",gap:8}}
                    , React.createElement('input', {
                        type: "text",
                        inputMode: "decimal",
                        autoFocus: !isFloat,
                        value: calcState.display,
                        placeholder: "0",
                        onChange: function(e){
                          var v = e.target.value;
                          v = v.replace(/[^0-9.\-]/g, "");
                          if(v.indexOf("-") > 0) v = v.replace(/-/g, "");
                          var dots = v.split(".").length - 1;
                          if(dots > 1){
                            var firstDot = v.indexOf(".");
                            v = v.slice(0,firstDot+1) + v.slice(firstDot+1).replace(/\./g, "");
                          }
                          setCalcState(Object.assign({},calcState,{display:v,waitingForOperand:false}));
                        },
                        onKeyDown: function(e){
                          var k = e.key;
                          if(k === "Enter" || k === "="){ e.preventDefault(); doEquals(); return; }
                          if(k === "+"){ e.preventDefault(); doOperator("+"); return; }
                          if(k === "-"){
                            if(calcState.display === "0" || calcState.display === "" || calcState.waitingForOperand){
                              return;
                            }
                            e.preventDefault(); doOperator("−"); return;
                          }
                          if(k === "*" || k === "x" || k === "X"){ e.preventDefault(); doOperator("×"); return; }
                          if(k === "/"){ e.preventDefault(); doOperator("÷"); return; }
                          if(k === "%"){ e.preventDefault(); doPercent(); return; }
                          if(k === "Escape"){ e.preventDefault(); doClear(); return; }
                        },
                        style: {flex:1,minWidth:0,fontSize:isFloat?dispFont:30,fontWeight:800,color:C.text,textAlign:"right",letterSpacing:-0.3,fontVariantNumeric:"tabular-nums",background:"transparent",border:"none",outline:"none",padding:0,fontFamily:"inherit",WebkitAppearance:"none"}
                      })
                    // Voice input button
                    , React.createElement('button', {
                        onClick: doVoiceInput,
                        title: lang==="en"?"Voice input — say a number":"语音输入 — 说一个数字",
                        style: {
                          flexShrink: 0,
                          width: 34,
                          height: 34,
                          borderRadius: 17,
                          background: calcState.voiceListening ? "rgba(255,82,82,0.2)" : "rgba(0,212,255,0.1)",
                          border: "1px solid " + (calcState.voiceListening ? "rgba(255,82,82,0.5)" : "rgba(0,212,255,0.3)"),
                          color: calcState.voiceListening ? C.danger : C.accent,
                          fontSize: 16,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          animation: calcState.voiceListening ? "fadeIn 0.5s ease-in-out infinite alternate" : "none"
                        }
                      }, "🎤")
                  )
                )
                // BAR MODE: condensed horizontal button strip (M+ / M- / +/- / = inline next to display)
                // Memory buttons row — hidden in ultraCompact, only essentials in compact
                , (isFloat && ultraCompact) ? null : React.createElement('div', {style:{display:"grid",gridTemplateColumns: (isFloat && compact) ? "1fr 1fr 1fr" : "1fr 1fr 1fr 1fr 1fr",gap:5,marginBottom:6}}
                  , (isFloat && compact) ? null : btn("MC", doMemClear, {background:C.bg4,color:C.text3,fontSize:memFont,padding:memPad+"px 0",fontWeight:700,borderRadius:8})
                  , btn("MR", doMemRecall, {background:(calcState.memory&&calcState.memory!==0)?"rgba(255,215,0,0.1)":C.bg4,color:(calcState.memory&&calcState.memory!==0)?C.gold:C.text3,fontSize:memFont,padding:memPad+"px 0",fontWeight:700,border:"1px solid "+((calcState.memory&&calcState.memory!==0)?"rgba(255,215,0,0.3)":C.border),borderRadius:8})
                  , (isFloat && compact) ? null : btn("MS", doMemStore, {background:C.bg4,color:C.text3,fontSize:memFont,padding:memPad+"px 0",fontWeight:700,borderRadius:8})
                  , btn("M+", doMemPlus, {background:"rgba(0,230,118,0.08)",color:C.success,fontSize:memFont,padding:memPad+"px 0",fontWeight:700,border:"1px solid rgba(0,230,118,0.25)",borderRadius:8})
                  , btn("M−", doMemMinus, {background:"rgba(255,82,82,0.08)",color:C.danger,fontSize:memFont,padding:memPad+"px 0",fontWeight:700,border:"1px solid rgba(255,82,82,0.25)",borderRadius:8})
                )
                // Operator row — always visible (core functionality)
                , React.createElement('div', {style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6,marginBottom:6}}
                  , btn("÷", function(){doOperator("÷");}, Object.assign({},opStyle,{fontSize:btnFont,padding:btnPad+"px 0",borderRadius:8}))
                  , btn("×", function(){doOperator("×");}, Object.assign({},opStyle,{fontSize:btnFont,padding:btnPad+"px 0",borderRadius:8}))
                  , btn("−", function(){doOperator("−");}, Object.assign({},opStyle,{fontSize:btnFont,padding:btnPad+"px 0",borderRadius:8}))
                  , btn("+", function(){doOperator("+");}, Object.assign({},opStyle,{fontSize:btnFont,padding:btnPad+"px 0",borderRadius:8}))
                )
                // Function row — AC + = always; ±/% hidden in ultraCompact
                , React.createElement('div', {style:{display:"grid",gridTemplateColumns: (isFloat && ultraCompact) ? "1fr 2fr" : "1fr 1fr 1fr 2fr",gap:6}}
                  , btn("AC", doClear, Object.assign({},fnStyle,{fontSize:Math.max(11, Math.round(13*fscale)),padding:btnPad+"px 0",borderRadius:8}))
                  , (isFloat && ultraCompact) ? null : btn("±", doToggleSign, Object.assign({},fnStyle,{fontSize:Math.max(11, Math.round(13*fscale)),padding:btnPad+"px 0",borderRadius:8}))
                  , (isFloat && ultraCompact) ? null : btn("%", doPercent, Object.assign({},fnStyle,{fontSize:Math.max(11, Math.round(13*fscale)),padding:btnPad+"px 0",borderRadius:8}))
                  , btn("=", doEquals, Object.assign({},equalStyle,{fontSize:btnFont,padding:btnPad+"px 0",borderRadius:8}))
                )
                // Hint text — hidden in compact mode
                , (isFloat && compact) ? null : React.createElement('div', {style:{fontSize:10,color:C.text3,marginTop:8,textAlign:"center",lineHeight:1.4}}
                  , lang==="en"?
                      "Type · 🎤 voice · Enter = · Esc clear · drag header to move":
                      "打字 · 🎤 语音 · Enter 等于 · Esc 清空 · 拖动顶部移动"
                )
                ) // ← end of FULL MODE Fragment
                // History
                , (calcState.history && calcState.history.length>0 && !isFloat) ? React.createElement('div', {style:{marginTop:24,padding:"14px 16px",background:C.bg2,border:"1px solid "+C.border,borderRadius:RADIUS.md}}
                  , React.createElement('div', {style:{fontSize:11,color:C.text3,letterSpacing:0.5,textTransform:"uppercase",fontWeight:600,marginBottom:8}}, lang==="en"?"History":"历史记录")
                  , calcState.history.slice(0,10).map(function(h,i){
                      return React.createElement('div', {
                        key:i,
                        onClick: function(){
                          // tap to recall result
                          var parts = h.split(" = ");
                          if(parts.length===2){
                            setCalcState(Object.assign({},calcState,{display:parts[1],waitingForOperand:true}));
                            showToast(lang==="en"?("✓ Recalled "+parts[1]):("✓ 已读取 "+parts[1]));
                          }
                        },
                        style: {fontSize:13,color:C.text2,padding:"6px 0",borderBottom:i<calcState.history.length-1?"1px solid "+C.border:"none",fontVariantNumeric:"tabular-nums",cursor:"pointer"}
                      }, h);
                    })
                ) : null
              )
              // Resize handle — bottom-right corner (only when floating)
              , isFloat ? React.createElement('div', {
                  onMouseDown: startResize,
                  onTouchStart: startResize,
                  style: {
                    position:"absolute",
                    bottom:0,
                    right:0,
                    width:22,
                    height:22,
                    cursor:"nwse-resize",
                    display:"flex",
                    alignItems:"flex-end",
                    justifyContent:"flex-end",
                    padding:3,
                    color:C.accent,
                    fontSize:11,
                    fontWeight:800,
                    userSelect:"none",
                    WebkitUserSelect:"none",
                    touchAction:"none",
                    background:"linear-gradient(135deg, transparent 50%, rgba(0,212,255,0.25) 50%)",
                    borderBottomRightRadius:RADIUS.lg,
                    opacity:0.9
                  },
                  title: lang==="en"?"Drag to resize":"拖拽改大小"
                }, "⤡") : null
            )
          );
        }()) : null

      , sf==="notes" ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:C.bg,zIndex:300,overflowY:"auto"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 622}}
          , React.createElement('div', { style: {maxWidth:600,margin:"0 auto",padding:"0 0 80px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 623}}
            , React.createElement('div', { style: {background:C.bg2,padding:"16px 18px",borderBottom:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 624}}
              , React.createElement('button', { onClick: function(){setSf(null);setNoteEdit(false);setNoteF({title:"",body:"",id:null});}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 625}}, "✕")
              , React.createElement('div', { style: {fontSize:16,fontWeight:800}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 626}}, "📝 " , lang==="en"?"Notes":"记事本")
              , React.createElement('button', { onClick: function(){setNoteF({title:"",body:"",id:null});setNoteEdit(true);}, style: {background:"linear-gradient(135deg,#00D4FF,#0055FF)",border:"none",color:"#fff",fontSize:18,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 627}}, "+")
            )
            , React.createElement('div', { style: {padding:"16px 14px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 629}}
              , noteEdit ? React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 630}}
                , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 631}}
                  , React.createElement('div', { style: {fontSize:14,fontWeight:700}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 632}}, noteF.id?(lang==="en"?"Edit":"编辑"):(lang==="en"?"New Note":"新建"))
                  , React.createElement('div', { style: {display:"flex",gap:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 633}}
                    , React.createElement('button', { onClick: function(){setNoteEdit(false);setNoteF({title:"",body:"",id:null});}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:13,cursor:"pointer",padding:"6px 12px",borderRadius:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 634}}, lang==="en"?"Cancel":"取消")
                    , React.createElement('button', { onClick: function(){if(!noteF.body.trim())return;var now=new Date().toLocaleDateString();if(noteF.id){setNotes(notes.map(function(n){return n.id===noteF.id?Object.assign({},n,{title:noteF.title,body:noteF.body,updated:now}):n;}));}else{setNotes([{id:Date.now(),title:noteF.title,body:noteF.body,date:now,updated:now}].concat(notes));}setNoteEdit(false);setNoteF({title:"",body:"",id:null});}, style: {background:"linear-gradient(135deg,#00D4FF,#0055FF)",border:"none",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",padding:"6px 12px",borderRadius:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 635}}, "✓ " , lang==="en"?"Save":"保存")
                  )
                )
                , React.createElement('input', { value: noteF.title, onChange: function(e){setNoteF(Object.assign({},noteF,{title:e.target.value}));}, placeholder: lang==="en"?"Title (optional)":"标题（可选）", style: Object.assign({},IS,{marginBottom:10,fontSize:15,fontWeight:600}), __self: this, __source: {fileName: _jsxFileName, lineNumber: 638}} )
                , React.createElement('textarea', { value: noteF.body, onChange: function(e){setNoteF(Object.assign({},noteF,{body:e.target.value}));}, placeholder: lang==="en"?"Write your note...":"写下你的记事...", rows: 10, style: Object.assign({},IS,{resize:"vertical",lineHeight:1.7,fontSize:14}), __self: this, __source: {fileName: _jsxFileName, lineNumber: 639}} )
              ) : React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 640}}
                , notes.length===0 ? React.createElement('div', { style: {textAlign:"center",padding:40,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 641}}, React.createElement('div', { style: {fontSize:40,marginBottom:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 641}}, "📝"), React.createElement('div', { style: {fontSize:14}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 641}}, lang==="en"?"No notes yet":"还没有记事")) : notes.map(function(n){return React.createElement(Card, { key: n.id, style: {marginBottom:10,cursor:"pointer"}, onClick: function(){setNoteF({title:n.title,body:n.body,id:n.id});setNoteEdit(true);}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 641}}, React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"flex-start"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 641}}, React.createElement('div', { style: {flex:1,minWidth:0}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 641}}, n.title?React.createElement('div', { style: {fontSize:14,fontWeight:700,marginBottom:4}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 641}}, n.title):null, React.createElement('div', { style: {fontSize:13,color:C.text2,lineHeight:1.5}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 641}}, n.body.slice(0,120), n.body.length>120?"...":""), React.createElement('div', { style: {fontSize:12,color:C.text3,marginTop:6}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 641}}, n.updated||n.date)), React.createElement('button', { onClick: function(e){e.stopPropagation();confirmAction(lang==="en"?"Delete note?":"删除记事？", lang==="en"?"This note will be removed (with undo).":"此记事将被移除（可撤销）。", function(){var prev=notes.slice();setNotes(notes.filter(function(x){return x.id!==n.id;}));showUndo((lang==="en"?"✓ Note deleted":"✓ 记事已删除"), {prevNotes:prev});});}, style: {background:"none",border:"none",color:C.danger,fontSize:16,cursor:"pointer",padding:"0 0 0 10px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 641}}, "✕")));})
              )
            )
          )
        )
      ) : null

      , sf==="manage_cats" ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:C.bg,zIndex:300,overflowY:"auto"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 649}}
          , React.createElement('div', { style: {maxWidth:600,margin:"0 auto",padding:"0 0 80px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 650}}
            , React.createElement('div', { style: {background:C.bg2,padding:"16px 18px",borderBottom:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 651}}
              , React.createElement('button', { onClick: function(){setSf(null);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 652}}, "✕")
              , React.createElement('div', { style: {fontSize:16,fontWeight:800}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 653}}, "🗂 " , lang==="en"?"Categories":"支出类别")
              , React.createElement('button', { onClick: function(){if(!newGrpName)return;setCustGroups(custGroups.concat([{name:newGrpName,icon:newGrpIcon||"📁",color:newGrpColor||"#A8D0E8"}]));setNewGrpName("");setNewGrpIcon("📁");setNewGrpColor("#A8D0E8");showToast(lang==="en"?"✓ Group added":"✓ 大类已添加");}, style: {background:"linear-gradient(135deg,#00D4FF,#0055FF)",border:"none",color:"#fff",fontSize:20,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 654}}, "✓")
            )
            , React.createElement('div', { style: {padding:"16px 14px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 656}}
              , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:"#90EAF8",marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 657}}, lang==="en"?"Default Groups":"默认大类")
              , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 658}}, [["🚗",lang==="en"?"Vehicle":"车辆",C.accent],["📋",lang==="en"?"License":"牌照",C.gold],["📱",lang==="en"?"Platform":"平台","#CC88FF"],["💼",lang==="en"?"Other":"其他","#B0D4E8"]].map(function(g,i){return React.createElement('div', { key: i, style: {background:C.bg2,border:"1px solid #2A3A54",borderRadius:10,padding:"10px 12px",display:"flex",alignItems:"center",gap:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 658}}, React.createElement('span', { style: {fontSize:20}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 658}}, g[0]), React.createElement('span', { style: Object.assign({fontSize:13,fontWeight:700},{color:g[2]}), __self: this, __source: {fileName: _jsxFileName, lineNumber: 658}}, g[1]), React.createElement('span', { style: {marginLeft:"auto",fontSize:11,color:"#6A8AAA"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 658}}, lang==="en"?"built-in":"内置"));}))
              , React.createElement('div', { style: {borderTop:"1px solid "+C.border,paddingTop:14,marginBottom:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 659}}
                , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:"#90EAF8",marginBottom:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 660}}, lang==="en"?"Custom Categories":"自定义小类")
                , Object.keys(cc).length===0 ? React.createElement('div', { style: {fontSize:13,color:C.text3,textAlign:"center",padding:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 661}}, lang==="en"?"No custom categories":"还没有自定义小类") : Object.entries(cc).map(function(e){var key=e[0],cat=e[1];return React.createElement(Card, { key: key, style: {display:"flex",alignItems:"center",gap:12,marginBottom:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 661}}, React.createElement('span', { style: {fontSize:22}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 661}}, cat.icon), React.createElement('div', { style: {flex:1}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 661}}, React.createElement('div', { style: {fontSize:14,fontWeight:600}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 661}}, cat.label), React.createElement('div', { style: {fontSize:12,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 661}}, cat.group)), React.createElement('button', { onClick: function(){setCf({label:cat.label,icon:cat.icon,group:cat.group,_editKey:key,_returnTo:"manage_cats"});setSf("cc");}, style: {background:"none",border:"1px solid "+C.border2,borderRadius:6,padding:"3px 8px",color:C.accent2,cursor:"pointer",fontSize:12,marginRight:4}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 661}}, T.edit), React.createElement('button', { onClick: function(){confirmAction(lang==="en"?"Delete category?":"删除类别？", lang==="en"?"This category will be removed (with undo).":"此类别将被移除（可撤销）。", function(){var prev=Object.assign({},cc);var u=Object.assign({},cc);delete u[key];setCc(u);showUndo((lang==="en"?"✓ Category deleted":"✓ 类别已删除"), {prevCc:prev});});}, style: {background:"none",border:"1px solid #3A1A1A",borderRadius:6,padding:"3px 8px",color:C.danger,cursor:"pointer",fontSize:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 661}}, T.del));})
                , React.createElement('button', { onClick: function(){setCf({label:"",icon:"🔧",group:"车辆",_returnTo:"manage_cats"});setSf("cc");}, style: {width:"100%",background:C.border,border:"1px dashed #2A3A54",borderRadius:10,padding:"12px",color:C.text2,fontSize:14,cursor:"pointer",marginTop:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 662}}, "+ " , lang==="en"?"Add Custom Category":"添加自定义小类")
              )
              , React.createElement('div', { style: {borderTop:"1px solid "+C.border,paddingTop:14}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 664}}
                , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:"#90EAF8",marginBottom:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 665}}, lang==="en"?"Custom Groups":"自定义大类")
                , custGroups.map(function(g,i){return React.createElement(Card, { key: i, style: {display:"flex",alignItems:"center",gap:12,marginBottom:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 666}}, React.createElement('span', { style: {fontSize:22}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 666}}, g.icon), React.createElement('div', { style: {flex:1}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 666}}, React.createElement('div', { style: {fontSize:14,fontWeight:700}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 666}}, g.name)), React.createElement('button', { onClick: function(){confirmAction(lang==="en"?"Delete group?":"删除大类？", lang==="en"?"This group will be removed (with undo).":"此大类将被移除（可撤销）。", function(){var prev=custGroups.slice();setCustGroups(custGroups.filter(function(_,j){return j!==i;}));showUndo((lang==="en"?"✓ Group deleted":"✓ 分类已删除"), {prevCustGroups:prev});});}, style: {background:"none",border:"1px solid #3A1A1A",borderRadius:6,padding:"3px 10px",color:C.danger,cursor:"pointer",fontSize:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 666}}, T.del));})
                , custGroups.length===0 ? React.createElement('div', { style: {fontSize:13,color:C.text3,textAlign:"center",padding:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 667}}, lang==="en"?"No custom groups":"还没有自定义大类") : null
                , React.createElement(Field, { label: lang==="en"?"Group Name":"大类名称", value: newGrpName||"", onChange: function(v){setNewGrpName(v);}, placeholder: lang==="en"?"e.g. Family":"例：家庭", __self: this, __source: {fileName: _jsxFileName, lineNumber: 668}} )
                , React.createElement('div', { style: {marginTop:10,marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 669}}, React.createElement('div', { style: {fontSize:13,color:C.text2,marginBottom:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 669}}, lang==="en"?"Icon":"图标"), React.createElement('div', { style: {display:"flex",flexWrap:"wrap",gap:6}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 669}}, ["🏠","👨‍👩‍👧","🐕","🎓","💊","🏋️","🎮","✈️","🛒","💡","📦","🎵","🍕","👔","💻"].map(function(ic){var sel=newGrpIcon===ic;return React.createElement('button', { key: ic, onClick: function(){setNewGrpIcon(ic);}, style: {width:38,height:38,borderRadius:8,border:"2px solid "+(sel?C.accent:"#1E3050"),background:sel?"#0A2040":"#162338",fontSize:18,cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 669}}, ic);})))
                , React.createElement('div', { style: {marginBottom:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 670}}, React.createElement('div', { style: {fontSize:13,color:C.text2,marginBottom:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 670}}, lang==="en"?"Color":"颜色"), React.createElement('div', { style: {display:"flex",gap:8,flexWrap:"wrap"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 670}}, [C.accent,C.success,C.gold,"#FF9A65","#CC88FF",C.danger,"#45B7D1","#A8D0E8"].map(function(cl){var sel=newGrpColor===cl;return React.createElement('button', { key: cl, onClick: function(){setNewGrpColor(cl);}, style: {width:32,height:32,borderRadius:16,background:cl,border:sel?"3px solid #fff":"3px solid transparent",cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 670}} );})))
              )
            )
          )
        )
      ) : null

      , sf==="tax_center" ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:C.bg,zIndex:300,overflowY:"auto"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 678}}
          , React.createElement('div', { style: {maxWidth:600,margin:"0 auto",padding:"0 0 80px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 679}}
            , React.createElement('div', { style: {background:C.bg2,padding:"16px 18px",borderBottom:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 680}}
              , React.createElement('button', { onClick: function(){setSf(null);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 681}}, "✕")
              , React.createElement('div', { style: {fontSize:16,fontWeight:800}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 682}}, "🧾 " , lang==="en"?"Tax Center":"税务中心")
              , React.createElement('select', { value: taxYr, onChange: function(e){setTaxYr(e.target.value);}, style: {background:"#1E3050",border:"1px solid "+C.border,borderRadius:8,color:C.accent,fontSize:13,fontWeight:700,padding:"4px 8px",cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 683}}
                , (function(){var opts=[];for(var y=new Date().getFullYear();y>=2020;y--){opts.push(React.createElement('option', { key: y, value: ""+y, __self: this, __source: {fileName: _jsxFileName, lineNumber: 684}}, y));}return opts;})()
              )
            )
            , React.createElement('div', { style: {padding:"16px 14px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 687}}
              , React.createElement('button', { onClick: function(){setSf(null);setTab(3);}, style: {width:"100%",background:C.bg3,border:"1px solid #2A5080",borderRadius:10,padding:"10px 14px",color:C.accent2,fontSize:13,fontWeight:700,cursor:"pointer",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"} }
                , React.createElement('span', null, "📊 " , lang==="en"?"Open Report":"进入报告")
                , React.createElement('span', {style:{color:"#5A7A9A",fontSize:14}}, "→")
              )
              , React.createElement(Card, { style: {background:"#1A1000",border:"1px solid #3A2800",marginBottom:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 688}}, React.createElement('div', { style: {fontSize:13,color:"#FFB300",fontWeight:700,marginBottom:6}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 688}}, "⚠️ " , lang==="en"?"Estimate only":"仅供参考"), React.createElement('div', { style: {fontSize:12,color:"#9A7A40"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 688}}, lang==="en"?"Consult a tax professional for accurate filing":"请咨询会计师进行准确报税"))
              , React.createElement(Card, { style: {marginBottom:12,padding:"14px 14px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}
                , React.createElement('div', { style: {fontSize:13,fontWeight:800,color:"#CC88FF",marginBottom:4}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}, "⚙️ " , lang==="en"?"Tax Rate Settings":"税率设置")
                , React.createElement('div', { style: {fontSize:12,color:C.text3,marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}, taxRateNote||(lang==="en"?"Tap a year to load IRS defaults, or edit any rate manually":"点年份加载 IRS 标准税率，或手动修改任意一项"))
                // Year preset buttons
                , React.createElement('div', { style: {display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}
                  , Object.keys(TAX_PRESETS).map(function(y){var isCur=y===taxYr;return React.createElement('button', { key: y, onClick: function(){setTaxYr(y);applyTaxPreset(y);}, style: {flex:"1 0 auto",minWidth:54,padding:"6px 10px",borderRadius:8,border:"1px solid "+(isCur?"#CC88FF":"#2A3A54"),background:isCur?"#1A0A30":C.bg3,color:isCur?"#CC88FF":C.text2,fontSize:12,fontWeight:isCur?800:600,cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}, y);})
                )
                // Rate inputs in a 2x2 grid
                , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}
                  , React.createElement('div', { style: {background:C.bg3,border:"1px solid #2A3A54",borderRadius:8,padding:"8px 10px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}
                    , React.createElement('div', { style: {fontSize:12,color:C.text3,marginBottom:4}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}, lang==="en"?"SE Tax (固定)":"自雇税 (固定)")
                    , React.createElement('div', { style: {display:"flex",alignItems:"baseline",gap:3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}
                      , React.createElement('input', { type: "number", step: "0.1", value: seRate, onChange: function(e){var v=parseFloat(e.target.value);if(!isNaN(v)&&v>=0&&v<100){setSeRate(v);setTaxRateNote(lang==="en"?"Edited":"已修改");}}, style: {background:"transparent",border:"none",color:"#CC88FF",fontSize:18,fontWeight:900,width:"100%",padding:0,outline:"none"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}} )
                      , React.createElement('span', { style: {fontSize:14,color:"#CC88FF",fontWeight:700}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}, "%")
                    )
                  )
                  , React.createElement('div', { style: {background:C.bg3,border:"1px solid #2A3A54",borderRadius:8,padding:"8px 10px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}
                    , React.createElement('div', { style: {fontSize:12,color:C.text3,marginBottom:4}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}, lang==="en"?"Federal":"联邦所得税")
                    , React.createElement('div', { style: {display:"flex",alignItems:"baseline",gap:3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}
                      , React.createElement('input', { type: "number", step: "0.5", value: fedRate, onChange: function(e){var v=parseFloat(e.target.value);if(!isNaN(v)&&v>=0&&v<100){setFedRate(v);setTaxRateNote(lang==="en"?"Edited":"已修改");}}, style: {background:"transparent",border:"none",color:"#FFB300",fontSize:18,fontWeight:900,width:"100%",padding:0,outline:"none"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}} )
                      , React.createElement('span', { style: {fontSize:14,color:"#FFB300",fontWeight:700}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}, "%")
                    )
                  )
                  , React.createElement('div', { style: {background:C.bg3,border:"1px solid #2A3A54",borderRadius:8,padding:"8px 10px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}
                    , React.createElement('div', { style: {fontSize:12,color:C.text3,marginBottom:4}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}, lang==="en"?"State + City":"州+市税")
                    , React.createElement('div', { style: {display:"flex",alignItems:"baseline",gap:3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}
                      , React.createElement('input', { type: "number", step: "0.1", value: stateRate, onChange: function(e){var v=parseFloat(e.target.value);if(!isNaN(v)&&v>=0&&v<100){setStateRate(v);setTaxRateNote(lang==="en"?"Edited":"已修改");}}, style: {background:"transparent",border:"none",color:"#FFB300",fontSize:18,fontWeight:900,width:"100%",padding:0,outline:"none"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}} )
                      , React.createElement('span', { style: {fontSize:14,color:"#FFB300",fontWeight:700}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}, "%")
                    )
                  )
                  , React.createElement('div', { style: {background:C.bg3,border:"1px solid #2A3A54",borderRadius:8,padding:"8px 10px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}
                    , React.createElement('div', { style: {fontSize:12,color:C.text3,marginBottom:4}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}, lang==="en"?"Std Deduction":"标准扣除")
                    , React.createElement('div', { style: {display:"flex",alignItems:"baseline",gap:3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}
                      , React.createElement('span', { style: {fontSize:14,color:C.success,fontWeight:700}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}, "$")
                      , React.createElement('input', { type: "number", step: "100", value: stdDed, onChange: function(e){var v=parseInt(e.target.value,10);if(!isNaN(v)&&v>=0){setStdDed(v);setTaxRateNote(lang==="en"?"Edited":"已修改");}}, style: {background:"transparent",border:"none",color:C.success,fontSize:18,fontWeight:900,width:"100%",padding:0,outline:"none"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}} )
                    )
                  )
                  , React.createElement('div', { style: {background:C.bg3,border:"1px solid #2A3A54",borderRadius:8,padding:"8px 10px"} }
                    , React.createElement('div', { style: {fontSize:12,color:C.text3,marginBottom:4} }, lang==="en"?"MTA Surcharge":"MTA 附加税")
                    , React.createElement('div', { style: {display:"flex",alignItems:"baseline",gap:3} }
                      , React.createElement('input', { type: "number", step: "0.01", value: mtaRate, onChange: function(e){var v=parseFloat(e.target.value);if(!isNaN(v)&&v>=0&&v<10){setMtaRate(v);setTaxRateNote(lang==="en"?"Edited":"已修改");}}, style: {background:"transparent",border:"none",color:"#FFB300",fontSize:18,fontWeight:900,width:"100%",padding:0,outline:"none"} } )
                      , React.createElement('span', { style: {fontSize:14,color:"#FFB300",fontWeight:700} }, "%")
                    )
                  )
                )
              )
              // Quick-link buttons to official tax tools
              , React.createElement(Card, { style: {marginBottom:12,padding:"12px 14px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}
                , React.createElement('div', { style: {fontSize:13,fontWeight:800,color:C.accent2,marginBottom:4}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}, "🎯 " , lang==="en"?"Get Exact Numbers":"获取准确数字")
                , React.createElement('div', { style: {fontSize:12,color:C.text3,marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}, lang==="en"?"App estimates are rough. Use these official tools for filing.":"App 估算仅供参考，报税时请用以下官方工具")
                , [
                  {label:lang==="en"?"📊 IRS Tax Estimator":"📊 IRS 税额计算器",desc:lang==="en"?"Official 2026 federal estimate":"官方 2026 联邦税估算",url:"https://www.irs.gov/individuals/tax-withholding-estimator",color:"#1A4060"},
                  {label:lang==="en"?"🗽 NY State Tax Calculator":"🗽 纽约州税计算器",desc:lang==="en"?"NY State + NYC city tax":"州税 + NYC 市税",url:"https://www.tax.ny.gov/pit/file/wtax_pers_inc.htm",color:C.bg3},
                  {label:lang==="en"?"💼 TurboTax Self-Employed":"💼 TurboTax 自雇报税",desc:lang==="en"?"Full-service filing (~$130/yr)":"代你完整报税（约 $130/年）",url:"https://turbotax.intuit.com/personal-taxes/online/self-employed.jsp",color:"#1A4030"}
                ].map(function(lk,i){return React.createElement('a', { key: i, href: lk.url, target: "_blank", rel: "noopener noreferrer", style: {display:"flex",alignItems:"center",gap:10,padding:"10px 12px",marginBottom:6,background:lk.color,border:"1px solid "+C.border2,borderRadius:10,textDecoration:"none",cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}, React.createElement('div', { style: {flex:1}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}, React.createElement('div', { style: {fontSize:13,fontWeight:700,color:C.text}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}, lk.label), React.createElement('div', { style: {fontSize:12,color:C.text3,marginTop:2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}, lk.desc)), React.createElement('span', { style: {color:C.text3,fontSize:14}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 689}}, "↗"));})
              )
              , (function(){
                var yn=taxYr;
                var taxYMons=(function(){var ms=[];for(var i=1;i<=12;i++){ms.push(yn+"-"+(i<10?"0":"")+i);}return ms;})();
                var yStAll=sl.filter(function(x){return x.month&&x.month.slice(0,4)===yn;});
                var yDlAll=dl.filter(function(d){return d.date&&d.date.slice(0,4)===yn;});
                var yDlInc=yDlAll.reduce(function(s,d){if(d.mode==="rideshare")return s+(+d.grossFare||0)+(+d.tips||0)+(+d.bonus||0)+(+d.tollReimbursed||0);return s+(+d.cash||0)+(+d.card||0)+(+d.tips||0);},0);
                var yDlLease=yDlAll.reduce(function(s,d){return s+(+d.lease||0);},0);
                // Synthetic lease expenses for category breakdown (under "rentalcar" → "车辆" group)
                var yDlLeaseExps=yDlAll.filter(function(d){return (+d.lease||0)>0;}).map(function(d){return {id:"dl_"+d.id,date:d.date,category:"rentalcar",amount:+d.lease,notes:"Daily lease",isDailyLease:true};});
                var grossInc=yStAll.reduce(function(s,x){return s+(+x.grossFare||0)+(+x.tips||0)+(+x.bonus||0)+(+x.tollReimbursed||0)+(+x.otherIncome||0);},0)+yDlInc;
                var yExAll=el.filter(function(e){return e.date&&e.date.slice(0,4)===yn;}).concat(yDlLeaseExps);
                var yFxAll=taxYMons.reduce(function(acc,m){return acc.concat(genFixed(fl,m));}, []).filter(function(e){return e.date&&e.date.slice(0,4)===yn;});
                var totalExp=yExAll.concat(yFxAll).reduce(function(s,e){return s+(+e.amount||0);},0);
                // IRS standard mileage rate by year (cents/mile)
                var MILE_RATES={"2020":0.575,"2021":0.56,"2022":0.625,"2023":0.655,"2024":0.67,"2025":0.70,"2026":0.70};
                var mileRate=MILE_RATES[yn]||0.70;
                var yMi=wl.filter(function(w){return w.weekStart&&w.weekStart.slice(0,4)===yn;}).reduce(function(s,w){return s+(+w.miles||0);},0);
                var mileDed=Math.round(yMi*mileRate*100)/100;
                var netP=grossInc-totalExp-mileDed;
                var seBase=Math.max(0,netP)*0.9235;
                var seTax=Math.round(seBase*(seRate*0.01)*100)/100;
                var seDed=Math.round(seTax*50)/100;
                // Federal income tax estimate using editable rate and standard deduction
                var taxableIncome=Math.max(0,netP-seDed-stdDed);
                var fedIncTax=Math.round(taxableIncome*(fedRate*0.01)*100)/100;
                // State+city income tax using editable rate
                var stateIncTax=Math.round(Math.max(0,netP-seDed)*(stateRate*0.01)*100)/100;
                // MTA Surcharge: NYC self-employment metropolitan commuter tax (no deduction)
                var mtaIncTax=Math.round(Math.max(0,netP)*(mtaRate*0.01)*100)/100;
                var totalAnnualTax=seTax+fedIncTax+stateIncTax+mtaIncTax;
                var qDue=Math.round(totalAnnualTax*25)/100;
                var qNum=new Date().getMonth()<3?1:new Date().getMonth()<5?2:new Date().getMonth()<9?3:4;
                var qDates=["Apr 15","Jun 15","Sep 15","Jan 15"];
                return React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 714}}
                  , React.createElement(Card, { style: {marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 715}}, React.createElement('div', { style: {fontSize:14,fontWeight:800,color:C.gold,marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 715}}, "📋 Schedule C"  )
                    , React.createElement(Row, { label: lang==="en"?"Gross Revenue":"总营业额", value: fmt(grossInc), color: C.accent, __self: this, __source: {fileName: _jsxFileName, lineNumber: 716}} )
                    , React.createElement(Row, { label: lang==="en"?"Business Expenses":"可抵扣支出", value: fmt(totalExp), color: C.danger, __self: this, __source: {fileName: _jsxFileName, lineNumber: 717}} )
                    , yMi>0?React.createElement(Row, { label: (lang==="en"?"Mileage (":"里程 (")+yMi+"mi × $"+mileRate.toFixed(3)+")", value: "-"+fmt(mileDed), color: C.success, __self: this, __source: {fileName: _jsxFileName, lineNumber: 718}} ):null
                    , React.createElement(Row, { label: lang==="en"?"Net Profit":"净利润", value: fmt(netP), color: netP>=0?C.success:C.danger, bold: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 719}} )
                  )
                  , React.createElement(Card, { style: {marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 721}}, React.createElement('div', { style: {fontSize:14,fontWeight:800,color:"#CC88FF",marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 721}}, "📋 " , lang==="en"?"Tax Summary":"税额汇总"  )
                    , React.createElement(Row, { label: lang==="en"?"SE Tax Base":"自雇税基数", value: fmt(seBase), __self: this, __source: {fileName: _jsxFileName, lineNumber: 722}} )
                    , React.createElement(Row, { label: (lang==="en"?"SE Tax (":"自雇税 (")+seRate+"%)", value: fmt(seTax), color: "#CC88FF", __self: this, __source: {fileName: _jsxFileName, lineNumber: 723}} )
                    , React.createElement(Row, { label: lang==="en"?"½ SE Deductible":"自雇税抵扣 (½)", value: "-"+fmt(seDed), color: C.success, __self: this, __source: {fileName: _jsxFileName, lineNumber: 724}} )
                    , React.createElement(Row, { label: (lang==="en"?"Federal Income (":"联邦所得税 (")+fedRate+"%)", value: fmt(fedIncTax), color: "#FFB300", __self: this, __source: {fileName: _jsxFileName, lineNumber: 724}} )
                    , React.createElement(Row, { label: (lang==="en"?"State+City (":"州+市税 (")+stateRate+"%)", value: fmt(stateIncTax), color: "#FFB300", __self: this, __source: {fileName: _jsxFileName, lineNumber: 724}} )
                    , mtaIncTax>0 ? React.createElement(Row, { label: (lang==="en"?"MTA Surcharge (":"MTA 附加税 (")+mtaRate+"%)", value: fmt(mtaIncTax), color: "#FFB300" } ) : null
                    , React.createElement(Row, { label: lang==="en"?"Total Estimated Tax":"预计税额合计", value: fmt(totalAnnualTax), color: C.danger, bold: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 724}} )
                  )
                  , React.createElement(Card, { style: {marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 726}}, React.createElement('div', { style: {fontSize:14,fontWeight:800,color:"#FFB300",marginBottom:6}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 726}}, "📅 " , lang==="en"?"Quarterly Estimated":"季度预缴")
                    , React.createElement('div', { style: {fontSize:12,color:C.text3,marginBottom:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 726}}, lang==="en"?"Includes SE + federal + NY state estimate. Confirm with a CPA.":"包含自雇税 + 联邦 + 纽约州估算。请与会计师核对。")
                    , ["Q1 (Jan-Mar)","Q2 (Apr-May)","Q3 (Jun-Aug)","Q4 (Sep-Dec)"].map(function(q,i){var isCur=i===qNum-1,isPast=i<qNum-1;return React.createElement('div', { key: i, style: {display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #1E3050"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 727}}, React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 727}}, React.createElement('div', { style: {fontSize:13,fontWeight:700,color:isCur?C.gold:isPast?C.text3:C.text}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 727}}, q), React.createElement('div', { style: {fontSize:12,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 727}}, lang==="en"?"Due: ":"截止: ", qDates[i])), React.createElement('div', { style: {textAlign:"right"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 727}}, React.createElement('div', { style: {fontSize:14,fontWeight:800,color:isCur?C.gold:C.text2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 727}}, fmt(qDue)), React.createElement('div', { style: {fontSize:12,color:isPast?C.success:isCur?"#FFB300":C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 727}}, isPast?"✓"+(lang==="en"?" Past":" 已过"):isCur?(lang==="en"?"← Now":"← 当前"):(lang==="en"?"Upcoming":"待缴"))));})
                  )
                  , React.createElement(Card, { style: {marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 729}}, React.createElement('div', { style: {fontSize:14,fontWeight:800,color:C.success,marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 729}}, "📊 " , lang==="en"?"Year-End Summary":"年终汇总")
                    , (function(){var grps={"车辆":{},"牌照":{},"平台":{},"其他":{}};yExAll.concat(yFxAll).forEach(function(e){var cat=allC[e.category]||{label:e.category,g:"其他"};var g=cat.g||"其他";var lbl=e.isFixed?e.fixedLabel:cat.label;if(!grps[g])grps[g]={};if(!grps[g][lbl])grps[g][lbl]=0;grps[g][lbl]+=(+e.amount||0);});var gT=yExAll.concat(yFxAll).reduce(function(s,e){return s+(+e.amount||0);},0);var gcl={"车辆":C.accent,"牌照":C.gold,"平台":"#CC88FF","其他":"#A8D0E8"};var glbl=lang==="en"?{"车辆":"Vehicle","牌照":"License","平台":"Platform","其他":"Other"}:{"车辆":"车辆","牌照":"牌照","平台":"平台","其他":"其他"};if(!gT)return React.createElement('div', { style: {textAlign:"center",color:C.text3,padding:16}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 730}}, lang==="en"?"No expenses for "+yn:yn+"年暂无支出");return React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 730}}, ["车辆","牌照","平台","其他"].map(function(g){var items=grps[g];if(!items||!Object.keys(items).length)return null;var st=Object.values(items).reduce(function(s,v){return s+v;},0);return React.createElement('div', { key: g, style: {marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 730}}, React.createElement('div', { style: {display:"flex",justifyContent:"space-between",borderBottom:"2px solid "+gcl[g],paddingBottom:3,marginBottom:3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 730}}, React.createElement('span', { style: {fontSize:12,fontWeight:800,color:gcl[g]}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 730}}, glbl[g]), React.createElement('span', { style: {fontSize:12,fontWeight:800,color:gcl[g]}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 730}}, fmt(st))), Object.entries(items).map(function(kv){return React.createElement('div', { key: kv[0], style: {display:"flex",justifyContent:"space-between",padding:"2px 8px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 730}}, React.createElement('span', { style: {fontSize:12,color:C.text2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 730}}, kv[0]), React.createElement('span', { style: {fontSize:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 730}}, fmt(kv[1])));}));}), " " , React.createElement('div', { style: {borderTop:"2px solid "+C.border,paddingTop:8,display:"flex",justifyContent:"space-between"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 730}}, React.createElement('span', { style: {fontSize:14,fontWeight:800}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 730}}, lang==="en"?"TOTAL":"可抵扣总额"), React.createElement('span', { style: {fontSize:16,fontWeight:900,color:C.success}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 730}}, fmt(gT))));}())
                  )
                  , React.createElement('button', { onClick: function(){if(!confirm(lang==="en"?"Download "+(taxYr||new Date().getFullYear())+" tax report PDF?":"下载 "+(taxYr||new Date().getFullYear())+" 年报税表 PDF？"))return;
                    var yr=taxYr||(new Date().getFullYear()+"");
                    var yStmts=sl.filter(function(x){return x.month&&x.month.slice(0,4)===yr;});
                    var yDls=dl.filter(function(d){return d.date&&d.date.slice(0,4)===yr;});
                    var yDlInc=yDls.reduce(function(s,d){if(d.mode==="rideshare")return s+(+d.grossFare||0)+(+d.tips||0)+(+d.bonus||0)+(+d.tollReimbursed||0);return s+(+d.cash||0)+(+d.card||0)+(+d.tips||0);},0);
                    var yDlLease=yDls.reduce(function(s,d){return s+(+d.lease||0);},0);
                    var yDlLeaseExps=yDls.filter(function(d){return (+d.lease||0)>0;}).map(function(d){return {id:"dl_"+d.id,date:d.date,category:"rentalcar",amount:+d.lease,notes:"Daily lease",isDailyLease:true};});
                    var grossInc=yStmts.reduce(function(s,x){return s+(+x.grossFare||0)+(+x.tips||0)+(+x.bonus||0)+(+x.tollReimbursed||0)+(+x.otherIncome||0);},0)+yDlInc;
                    var yMonths=[];for(var mi=1;mi<=12;mi++){yMonths.push(yr+"-"+p2(mi));}
                    var yFx=yMonths.reduce(function(acc,m){return acc.concat(genFixed(fl,m));},[]);
                    var yExps=el.filter(function(e){return e.date&&e.date.slice(0,4)===yr;}).concat(yDlLeaseExps);
                    var allYExps=yExps.concat(yFx);
                    var totalExp=allYExps.reduce(function(s,e){return s+(+e.amount||0);},0);
                    var MILE_RATES={"2020":0.575,"2021":0.56,"2022":0.625,"2023":0.655,"2024":0.67,"2025":0.70,"2026":0.70};
                    var mileRate=MILE_RATES[yr]||0.70;
                    var yMi=wl.filter(function(w){return w.weekStart&&w.weekStart.slice(0,4)===yr;}).reduce(function(s,w){return s+(+w.miles||0);},0);
                    var mileDed=Math.round(yMi*mileRate*100)/100;
                    var netP=grossInc-totalExp-mileDed;
                    var seBase=Math.max(0,netP)*0.9235;
                    var rate=(seRate||15.3)*0.01;
                    var seTax=Math.round(seBase*rate*100)/100;
                    var seDed=Math.round(seTax*50)/100;
                    var taxableIncome=Math.max(0,netP-seDed-stdDed);
                    var fedIncTax=Math.round(taxableIncome*(fedRate*0.01)*100)/100;
                    var stateIncTax=Math.round(Math.max(0,netP-seDed)*(stateRate*0.01)*100)/100;
                    var totalTax=seTax+fedIncTax+stateIncTax;
                    function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
                    var html="<!DOCTYPE html><html><head><meta charset=UTF-8><title>NYC Driver Tax Report "+esc(yr)+"</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;padding:20px;color:#1a1a1a}h1{color:#1a3a6a;border-bottom:3px solid #1a3a6a;padding-bottom:10px;margin-bottom:20px}h2{color:#2a5a9a;margin:25px 0 10px}table{width:100%;border-collapse:collapse;margin:10px 0}td,th{padding:10px 14px;border:1px solid #ddd;text-align:left}th{background:#f0f4ff;font-weight:bold}tr:nth-child(even){background:#f8f9ff}.total{font-weight:bold;background:#e8f0ff!important}.green{color:#1a8a1a}.red{color:#cc1a1a}.note{color:#666;font-size:13px;margin-bottom:8px}.print-btn{margin-top:30px;padding:12px 24px;background:#1a3a6a;color:white;border:none;border-radius:6px;cursor:pointer;font-size:15px}@media print{.print-btn{display:none}}</style></head><body>";
                    html+="<h1>🚖 NYC Rideshare Driver - Tax Report "+esc(yr)+"</h1>";
                    html+="<p class=note>Generated: "+esc(new Date().toLocaleDateString())+(gUser?" | "+esc(gUser.email):"")+". Estimates only — confirm with a CPA before filing.</p>";
                    // Driver & Vehicle information block
                    var drvForPdf = (driver && (driver.name || driver.tlcHack || driver.dmvLic)) ? driver : (veh.driver||{});
                    var hasDriverInfo = !!(drvForPdf.name||drvForPdf.tlcHack||drvForPdf.dmvLic||drvForPdf.phone||drvForPdf.email);
                    var hasVehInfo = !!(veh.brand||veh.model||veh.plate||veh.tlcPlate||veh.vin);
                    if(hasDriverInfo||hasVehInfo){
                      html+="<h2>👤 Driver & Vehicle Info</h2><table>";
                      if(drvForPdf.name) html+="<tr><th>Name</th><td>"+esc(drvForPdf.name)+"</td></tr>";
                      if(drvForPdf.tlcHack) html+="<tr><th>TLC Hack #</th><td>"+esc(drvForPdf.tlcHack)+"</td></tr>";
                      if(drvForPdf.dmvLic) html+="<tr><th>DMV License #</th><td>"+esc(drvForPdf.dmvLic)+"</td></tr>";
                      if(drvForPdf.phone) html+="<tr><th>Phone</th><td>"+esc(drvForPdf.phone)+"</td></tr>";
                      if(drvForPdf.email) html+="<tr><th>Email</th><td>"+esc(drvForPdf.email)+"</td></tr>";
                      if(veh.year||veh.brand||veh.model) html+="<tr><th>Vehicle</th><td>"+esc((veh.year||"")+" "+(veh.brand||"")+" "+(veh.model||"")).replace(/\s+/g," ").trim()+"</td></tr>";
                      if(veh.plate) html+="<tr><th>License Plate</th><td>"+esc(veh.plate)+"</td></tr>";
                      if(veh.tlcPlate) html+="<tr><th>TLC Plate</th><td>"+esc(veh.tlcPlate)+"</td></tr>";
                      if(veh.vin) html+="<tr><th>VIN</th><td>"+esc(veh.vin)+"</td></tr>";
                      html+="</table>";
                    }
                    html+="<h2>📋 Schedule C - Profit or Loss from Business</h2><table><tr><th>Line</th><th>Description</th><th>Amount</th></tr><tr><td>1</td><td>Gross receipts (1099-K / 1099-NEC)</td><td class=green>$"+grossInc.toFixed(2)+"</td></tr><tr><td>9</td><td>Standard mileage ("+yMi+" mi × $"+mileRate.toFixed(3)+")</td><td class=red>$"+mileDed.toFixed(2)+"</td></tr><tr><td>28</td><td>Other business expenses</td><td class=red>$"+totalExp.toFixed(2)+"</td></tr><tr class=total><td>31</td><td>Net profit or loss</td><td class="+(netP>=0?"green":"red")+">$"+netP.toFixed(2)+"</td></tr></table>";
                    html+="<h2>📋 Schedule SE - Self-Employment Tax</h2><table><tr><th>Description</th><th>Amount</th></tr><tr><td>Net profit × 92.35%</td><td>$"+seBase.toFixed(2)+"</td></tr><tr><td>SE tax (×"+(seRate||15.3)+"%)</td><td class=red>$"+seTax.toFixed(2)+"</td></tr><tr class=total><td>Deductible portion (½ SE tax)</td><td class=green>$"+seDed.toFixed(2)+"</td></tr></table>";
                    html+="<h2>💰 Income Tax Estimate</h2><p class=note>Using your editable rates: federal "+fedRate+"%, state+city "+stateRate+"%, standard deduction $"+stdDed+".</p><table><tr><th>Description</th><th>Amount</th></tr><tr><td>Federal income tax ("+fedRate+"%)</td><td>$"+fedIncTax.toFixed(2)+"</td></tr><tr><td>State+City income tax ("+stateRate+"%)</td><td>$"+stateIncTax.toFixed(2)+"</td></tr><tr class=total><td>Total estimated annual tax</td><td>$"+totalTax.toFixed(2)+"</td></tr></table>";
                    html+="<h2>📅 Quarterly Estimated Tax Payments</h2><p class=note>Includes SE + federal + state/city estimate. Actual amounts may vary.</p><table><tr><th>Quarter</th><th>Due Date</th><th>Amount</th></tr><tr><td>Q1 (Jan-Mar)</td><td>April 15</td><td>$"+(totalTax/4).toFixed(2)+"</td></tr><tr><td>Q2 (Apr-May)</td><td>June 15</td><td>$"+(totalTax/4).toFixed(2)+"</td></tr><tr><td>Q3 (Jun-Aug)</td><td>September 15</td><td>$"+(totalTax/4).toFixed(2)+"</td></tr><tr><td>Q4 (Sep-Dec)</td><td>January 15</td><td>$"+(totalTax/4).toFixed(2)+"</td></tr></table>";
                    if(allYExps.length>0){html+="<h2>💸 Business Expense Detail</h2><table><tr><th>Date</th><th>Category</th><th>Notes</th><th>Amount</th></tr>";allYExps.slice().sort(function(a,b){return (a.date||"").localeCompare(b.date||"");}).forEach(function(e){var cat=allC[e.category],lbl=e.isFixed?(e.fixedIcon||"")+" "+(e.fixedLabel||""):(cat?cat.icon+" "+cat.label:e.category);html+="<tr><td>"+esc(e.date||"")+"</td><td>"+esc(lbl)+"</td><td>"+esc(e.notes||"")+"</td><td>$"+(+e.amount||0).toFixed(2)+"</td></tr>";});html+="<tr class=total><td colspan=3>Total Expenses</td><td>$"+totalExp.toFixed(2)+"</td></tr></table>";}
                    html+="</body></html>";
                    downloadPdf(html,"tax-report-"+today()+".pdf");
                  }, style: {width:"100%",background:"linear-gradient(135deg,#1A3060,#0A1828)",border:"1px solid #2A5080",borderRadius:12,padding:14,textAlign:"left",cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 809}}
                    , React.createElement('div', { style: {fontSize:15,fontWeight:700,color:C.text2,marginBottom:3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 828}}, "📄 " , lang==="en"?"Export Tax Report PDF":"导出报税表PDF")
                    , React.createElement('div', { style: {fontSize:12,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 829}}, lang==="en"?"Generate "+(taxYr||new Date().getFullYear())+" tax report (year selectable in Tax Center)":"生成 "+(taxYr||new Date().getFullYear())+" 年报税表（年份在税务中心选择）")
                  )
                  , React.createElement('button', { onClick: function(){if(!confirm(lang==="en"?"Download "+(taxYr||new Date().getFullYear())+" accountant tax summary PDF?":"下载 "+(taxYr||new Date().getFullYear())+" 年会计师报表 PDF？"))return;
                      var yr=taxYr||(new Date().getFullYear()+"");
                      var yStmts=sl.filter(function(x){return x.month&&x.month.slice(0,4)===yr;});
                      var yDlAll=dl.filter(function(d){return d.date&&d.date.slice(0,4)===yr;});
                      var yDlInc=yDlAll.reduce(function(s,d){if(d.mode==="rideshare")return s+(+d.grossFare||0)+(+d.tips||0)+(+d.bonus||0)+(+d.tollReimbursed||0);return s+(+d.cash||0)+(+d.card||0)+(+d.tips||0);},0);
                      var yDlCash=yDlAll.reduce(function(s,d){return s+(+d.cash||0);},0);
                      var yDlCard=yDlAll.reduce(function(s,d){return s+(+d.card||0);},0);
                      var yDlTips=yDlAll.reduce(function(s,d){return s+(+d.tips||0);},0);
                      var yDlLeaseExps=yDlAll.filter(function(d){return (+d.lease||0)>0;}).map(function(d){return {id:"dl_"+d.id,date:d.date,category:"rentalcar",amount:+d.lease,notes:"Daily lease",isDailyLease:true};});
                      var allYExps=el.filter(function(e){return e.date&&e.date.slice(0,4)===yr;}).concat(yDlLeaseExps);
                      if(allYExps.length===0&&yStmts.length===0&&yDlAll.length===0){alert(lang==="en"?"No data for "+yr:"没有 "+yr+" 年的数据");return;}
                      // Income
                      var grossFare=yStmts.reduce(function(s,x){return s+(+x.grossFare||0);},0)+yDlCash+yDlCard;
                      var tips=yStmts.reduce(function(s,x){return s+(+x.tips||0);},0)+yDlTips;
                      var bonus=yStmts.reduce(function(s,x){return s+(+x.bonus||0);},0);
                      var tollReimb=yStmts.reduce(function(s,x){return s+(+x.tollReimbursed||0);},0);
                      var otherInc=yStmts.reduce(function(s,x){return s+(+x.otherIncome||0);},0);
                      var totalInc=grossFare+tips+bonus+tollReimb+otherInc;
                      // Group expenses by taxable status
                      var deductible={"车辆":[],"牌照":[],"平台":[],"其他":[]}, nonDeductible=[];
                      var grpLabels={"车辆":lang==="en"?"Vehicle":"车辆","牌照":lang==="en"?"License & Permits":"牌照","平台":lang==="en"?"Platform & Communications":"平台","其他":lang==="en"?"Other":"其他"};
                      allYExps.forEach(function(e){
                        var cat=allC[e.category];
                        var isDeductible=cat?cat.taxable!==false:true;
                        var grp=cat?(cat.g||"其他"):"其他";
                        var entry={date:e.date,label:e.isFixed?e.fixedLabel:(cat?cat.label:"Other"),amount:+e.amount||0,notes:e.notes||""};
                        if(isDeductible){if(!deductible[grp])deductible[grp]=[];deductible[grp].push(entry);}
                        else{nonDeductible.push(Object.assign(entry,{grp:grp}));}
                      });
                      // Calculate group totals
                      var dedGroupTotals={};
                      Object.keys(deductible).forEach(function(g){dedGroupTotals[g]=deductible[g].reduce(function(s,x){return s+x.amount;},0);});
                      var totalDed=Object.values(dedGroupTotals).reduce(function(s,x){return s+x;},0);
                      var totalNonDed=nonDeductible.reduce(function(s,x){return s+x.amount;},0);
                      var netProfit=totalInc-totalDed;
                      // Build category breakdown within each group
                      var dedByCategory={};
                      Object.keys(deductible).forEach(function(g){
                        var byCat={};
                        deductible[g].forEach(function(e){if(!byCat[e.label]){byCat[e.label]={total:0,count:0};}byCat[e.label].total+=e.amount;byCat[e.label].count++;});
                        dedByCategory[g]=byCat;
                      });
                      var nonDedByCategory={};
                      nonDeductible.forEach(function(e){if(!nonDedByCategory[e.label]){nonDedByCategory[e.label]={total:0,count:0};}nonDedByCategory[e.label].total+=e.amount;nonDedByCategory[e.label].count++;});
                      // Driver info — prefer new dedicated state, fallback to legacy veh.driver
                      var drv = (driver && (driver.name || driver.tlcHack || driver.dmvLic)) ? driver : (veh.driver||{});
                      var esc=function(s){return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
                      // Build HTML
                      var html='<!DOCTYPE html><html><head><meta charset=utf-8><title>Tax Summary '+yr+'</title>';
                      html+='<style>';
                      html+='body{font-family:-apple-system,Helvetica,Arial,sans-serif;max-width:800px;margin:30px auto;padding:20px;color:#222;line-height:1.5;background:#fff;}';
                      html+='h1{font-size:22px;border-bottom:3px solid #000;padding-bottom:8px;margin-bottom:4px;}';
                      html+='h2{font-size:16px;border-bottom:1px solid #888;padding-bottom:4px;margin-top:24px;color:#000;}';
                      html+='.subtitle{font-size:12px;color:#666;margin-bottom:20px;}';
                      html+='.info{font-size:12px;margin:10px 0;line-height:1.7;}';
                      html+='.info b{display:inline-block;width:140px;color:#444;}';
                      html+='table{width:100%;border-collapse:collapse;margin:8px 0 16px;font-size:12px;}';
                      html+='th,td{padding:6px 10px;border-bottom:1px solid #ddd;text-align:left;}';
                      html+='th{background:#f0f0f0;font-weight:700;}';
                      html+='td.amt{text-align:right;font-variant-numeric:tabular-nums;}';
                      html+='tr.subtotal td{font-weight:700;background:#f8f8f8;border-top:1px solid #888;}';
                      html+='tr.total td{font-weight:800;background:#222;color:#fff;font-size:13px;}';
                      html+='tr.section td{background:#e8e8e8;font-weight:700;font-size:11px;letter-spacing:0.5px;text-transform:uppercase;}';
                      html+='.note{font-size:11px;color:#666;font-style:italic;margin:6px 0 10px;}';
                      html+='.print-btn{display:inline-block;margin:30px 0 0;padding:10px 20px;background:#0055FF;color:#fff;border:none;border-radius:6px;font-size:14px;cursor:pointer;}';
                      html+='@media print{.print-btn{display:none;}}';
                      html+='</style></head><body>';
                      html+='<h1>NYC RIDESHARE DRIVER<br>TAX SUMMARY — '+esc(yr)+'</h1>';
                      html+='<div class=subtitle>Generated '+new Date().toLocaleDateString()+' by NYC Driver Tracker</div>';
                      // Driver info
                      html+='<h2>Driver Information</h2><div class=info>';
                      if(drv.name)html+='<div><b>Name:</b> '+esc(drv.name)+'</div>';
                      if(drv.tlcHack)html+='<div><b>TLC Hack #:</b> '+esc(drv.tlcHack)+'</div>';
                      if(drv.dmvLic)html+='<div><b>DMV License #:</b> '+esc(drv.dmvLic)+'</div>';
                      if(drv.phone)html+='<div><b>Phone:</b> '+esc(drv.phone)+'</div>';
                      if(drv.email)html+='<div><b>Email:</b> '+esc(drv.email)+'</div>';
                      html+='</div>';
                      // Vehicle info
                      html+='<h2>Vehicle Information</h2><div class=info>';
                      if(veh.year||veh.brand||veh.model)html+='<div><b>Vehicle:</b> '+esc((veh.year||"")+" "+(veh.brand||"")+" "+(veh.model||""))+'</div>';
                      if(veh.plate)html+='<div><b>License Plate:</b> '+esc(veh.plate)+'</div>';
                      if(veh.tlcPlate)html+='<div><b>TLC Plate:</b> '+esc(veh.tlcPlate)+'</div>';
                      if(veh.vin)html+='<div><b>VIN:</b> '+esc(veh.vin)+'</div>';
                      html+='</div>';
                      // Income
                      html+='<h2>Income</h2><table>';
                      html+='<tr><th>Description</th><th class=amt>Amount</th></tr>';
                      html+='<tr><td>Gross Fares</td><td class=amt>$'+grossFare.toFixed(2)+'</td></tr>';
                      html+='<tr><td>Tips</td><td class=amt>$'+tips.toFixed(2)+'</td></tr>';
                      html+='<tr><td>Bonuses</td><td class=amt>$'+bonus.toFixed(2)+'</td></tr>';
                      html+='<tr><td>Toll Reimbursements</td><td class=amt>$'+tollReimb.toFixed(2)+'</td></tr>';
                      html+='<tr><td>Other Income</td><td class=amt>$'+otherInc.toFixed(2)+'</td></tr>';
                      html+='<tr class=total><td>TOTAL INCOME</td><td class=amt>$'+totalInc.toFixed(2)+'</td></tr>';
                      html+='</table>';
                      // Deductible expenses
                      html+='<h2>Deductible Business Expenses (Schedule C)</h2><table>';
                      html+='<tr><th>Category</th><th class=amt>Count</th><th class=amt>Amount</th></tr>';
                      ["车辆","牌照","平台","其他"].forEach(function(g){
                        var cats=Object.keys(dedByCategory[g]||{});
                        if(cats.length===0)return;
                        html+='<tr class=section><td colspan=3>'+esc(grpLabels[g])+'</td></tr>';
                        cats.sort(function(a,b){return dedByCategory[g][b].total-dedByCategory[g][a].total;}).forEach(function(c){
                          html+='<tr><td>&nbsp;&nbsp;'+esc(c)+'</td><td class=amt>'+dedByCategory[g][c].count+'</td><td class=amt>$'+dedByCategory[g][c].total.toFixed(2)+'</td></tr>';
                        });
                        html+='<tr class=subtotal><td>Subtotal '+esc(grpLabels[g])+'</td><td></td><td class=amt>$'+dedGroupTotals[g].toFixed(2)+'</td></tr>';
                      });
                      html+='<tr class=total><td>TOTAL DEDUCTIBLE</td><td></td><td class=amt>$'+totalDed.toFixed(2)+'</td></tr>';
                      html+='</table>';
                      // Non-deductible (reference)
                      if(Object.keys(nonDedByCategory).length>0){
                        html+='<h2>Non-Deductible Expenses (Reference Only)</h2>';
                        html+='<p class=note>These items are NOT tax-deductible per IRS rules. Listed here for your records only.</p><table>';
                        html+='<tr><th>Category</th><th class=amt>Count</th><th class=amt>Amount</th></tr>';
                        Object.keys(nonDedByCategory).sort(function(a,b){return nonDedByCategory[b].total-nonDedByCategory[a].total;}).forEach(function(c){
                          html+='<tr><td>'+esc(c)+'</td><td class=amt>'+nonDedByCategory[c].count+'</td><td class=amt>$'+nonDedByCategory[c].total.toFixed(2)+'</td></tr>';
                        });
                        html+='<tr class=subtotal><td>Total Non-Deductible</td><td></td><td class=amt>$'+totalNonDed.toFixed(2)+'</td></tr>';
                        html+='</table>';
                      }
                      // Net Profit
                      html+='<h2>Net Profit Summary</h2><table>';
                      html+='<tr><td>Total Revenue</td><td class=amt>$'+totalInc.toFixed(2)+'</td></tr>';
                      html+='<tr><td>Less: Total Deductible Expenses</td><td class=amt>($'+totalDed.toFixed(2)+')</td></tr>';
                      html+='<tr class=total><td>NET PROFIT (Schedule C Line 31)</td><td class=amt>$'+netProfit.toFixed(2)+'</td></tr>';
                      html+='</table>';
                      // Notes for accountant
                      html+='<h2>Notes for Accountant</h2><div class=info style="font-size:11px;">';
                      html+='<p>• <b>Auto Loan:</b> Only the interest portion is deductible. Principal is not.</p>';
                      html+='<p>• <b>Phone Bill:</b> Currently 100% claimed as business. Adjust if any personal use.</p>';
                      html+='<p>• <b>Health Insurance:</b> Self-employed health insurance is an above-the-line deduction (Form 1040 Schedule 1), not Schedule C.</p>';
                      html+='<p>• <b>Standard Mileage vs Actual Expenses:</b> The expenses above use the actual expense method. The standard mileage method may yield different results — please advise.</p>';
                      html+='<p>• <b>Quarterly Estimates:</b> Listed under non-deductible (these are tax payments, not expenses).</p>';
                      html+='</div>';
                                            html+='</body></html>';
                      downloadPdf(html,"tax-report-"+today()+".pdf");
                    }, style: {width:"100%",background:"linear-gradient(135deg,#1A3010,#0A1808)",border:"1px solid #2A6020",borderRadius:12,padding:14,textAlign:"left",cursor:"pointer",marginTop:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 810}}
                    , React.createElement('div', { style: {fontSize:15,fontWeight:700,color:"#5ADA7A",marginBottom:3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 828}}, "📊 " , lang==="en"?"Tax Summary for Accountant":"会计师年度报表")
                    , React.createElement('div', { style: {fontSize:12,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 829}}, lang==="en"?(taxYr||new Date().getFullYear())+" · Schedule C-style summary, separates deductible vs non-deductible":(taxYr||new Date().getFullYear())+" 年 · Schedule C 格式，区分可抵税与不可抵税")
                  )
                  // === Complete Tax Package — combines everything into one big PDF ===
                  , React.createElement('button', { onClick: function(){
                      var yr=taxYr||(new Date().getFullYear()+"");
                      var yStmts=sl.filter(function(x){return x.platform!=="QUARTERLY"&&x.month&&x.month.slice(0,4)===yr;});
                      var yDls=dl.filter(function(d){return d.date&&d.date.slice(0,4)===yr;});
                      var yExpsRaw=el.filter(function(e){return e.date&&e.date.slice(0,4)===yr;});
                      var yMonths=[];for(var mi=1;mi<=12;mi++){yMonths.push(yr+"-"+p2(mi));}
                      var yFx=yMonths.reduce(function(acc,m){return acc.concat(genFixed(fl,m));},[]);
                      var allYExps=yExpsRaw.concat(yFx);
                      if(allYExps.length===0&&yStmts.length===0&&yDls.length===0){
                        showToast(lang==="en"?"No data for "+yr:"没有 "+yr+" 年的数据","warn");
                        return;
                      }
                      
                      // Collect totals
                      var grossFare=yStmts.reduce(function(s,x){return s+(+x.grossFare||0);},0);
                      var dlCash=yDls.reduce(function(s,d){return s+(+d.cash||0);},0);
                      var dlCard=yDls.reduce(function(s,d){return s+(+d.card||0);},0);
                      var tips=yStmts.reduce(function(s,x){return s+(+x.tips||0);},0);
                      var dlTips=yDls.reduce(function(s,d){return s+(+d.tips||0);},0);
                      var bonus=yStmts.reduce(function(s,x){return s+(+x.bonus||0);},0);
                      var tollReimb=yStmts.reduce(function(s,x){return s+(+x.tollReimbursed||0);},0);
                      var otherInc=yStmts.reduce(function(s,x){return s+(+x.otherIncome||0);},0);
                      var totalGross=grossFare+dlCash+dlCard;
                      var totalTips=tips+dlTips;
                      var totalIncome=totalGross+totalTips+bonus+tollReimb+otherInc;
                      var totalExp=allYExps.reduce(function(s,e){return s+(+e.amount||0);},0);
                      var netProfit=totalIncome-totalExp;
                      
                      var esc=function(s){return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
                      var html='<!DOCTYPE html><html><head><meta charset=utf-8><title>'+esc((lang==="en"?"Complete Tax Package ":"完整报税包 ")+yr)+'</title>';
                      html+='<style>'+
                        '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap");'+
                        '*{box-sizing:border-box;}'+
                        'body{font-family:"Inter","SF Pro Display",-apple-system,Helvetica,Arial,sans-serif;max-width:800px;margin:30px auto;padding:30px 35px;color:#1a1a1a;line-height:1.6;background:#fff;}'+
                        'h1{font-size:28px;font-weight:900;color:#0f172a;border-bottom:4px solid #2563eb;padding-bottom:10px;margin-bottom:6px;letter-spacing:-0.5px;}'+
                        'h2{font-size:20px;font-weight:800;color:#0f172a;border-bottom:2px solid #cbd5e1;padding-bottom:6px;margin-top:36px;letter-spacing:-0.3px;}'+
                        'h3{font-size:15px;font-weight:700;margin-top:20px;color:#334155;}'+
                        '.subtitle{font-size:13px;color:#64748b;margin-bottom:24px;font-weight:500;}'+
                        'table{width:100%;border-collapse:collapse;margin:10px 0 20px;font-size:12px;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06);}'+
                        'th,td{padding:9px 12px;border-bottom:1px solid #e2e8f0;text-align:left;}'+
                        'th{background:#f1f5f9;font-weight:700;color:#475569;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;}'+
                        'td.amt{text-align:right;font-variant-numeric:tabular-nums;font-weight:600;}'+
                        'tr:hover td{background:#f8fafc;}'+
                        'tr.subtotal td{font-weight:700;background:#f1f5f9;border-top:2px solid #cbd5e1;}'+
                        'tr.total td{font-weight:800;background:linear-gradient(135deg,#1e293b,#0f172a);color:#fff;font-size:14px;}'+
                        '.summary-box{background:linear-gradient(135deg,#f8fafc,#f1f5f9);border:1px solid #e2e8f0;padding:18px 22px;border-radius:12px;margin:16px 0 24px;box-shadow:0 1px 3px rgba(0,0,0,0.04);}'+
                        '.summary-row{display:flex;justify-content:space-between;padding:6px 0;font-size:14px;}'+
                        '.summary-row.big{font-size:18px;font-weight:800;border-top:2px solid #1e293b;margin-top:10px;padding-top:12px;color:#0f172a;}'+
                        '.page-break{page-break-before:always;}'+
                        '@media print{body{margin:0;padding:20px;}h1{break-inside:avoid;}h2,h3{break-after:avoid;}table{break-inside:auto;}tr{break-inside:avoid;}}'+
                        '</style></head><body>';
                      
                      // ========== COVER PAGE ==========
                      html+='<h1>📋 '+(lang==="en"?"Complete Tax Package":"完整报税包")+'</h1>';
                      html+='<div class="subtitle">'+(lang==="en"?"Tax Year ":"税务年度 ")+yr+' &nbsp;·&nbsp; '+(lang==="en"?"Generated ":"生成于 ")+today()+'</div>';
                      
                      html+='<div class="summary-box">';
                      html+='<h3 style="margin-top:0">'+(lang==="en"?"Quick Summary":"快速概览")+'</h3>';
                      html+='<div class="summary-row"><span>'+(lang==="en"?"Total Gross Income":"总毛收入")+'</span><span>$'+totalIncome.toFixed(2)+'</span></div>';
                      html+='<div class="summary-row"><span>'+(lang==="en"?"Total Expenses":"总支出")+'</span><span>$'+totalExp.toFixed(2)+'</span></div>';
                      html+='<div class="summary-row big"><span>'+(lang==="en"?"Net Profit":"净利润")+'</span><span>$'+netProfit.toFixed(2)+'</span></div>';
                      html+='</div>';
                      
                      html+='<h3>'+(lang==="en"?"Contents":"目录")+'</h3>';
                      html+='<ol style="line-height:2">';
                      html+='<li>'+(lang==="en"?"Income Summary":"收入汇总")+' (Schedule C Line 1)</li>';
                      html+='<li>'+(lang==="en"?"Monthly Income Detail":"月度收入明细")+'</li>';
                      html+='<li>'+(lang==="en"?"Expense Summary by Category":"按类别支出汇总")+' (Schedule C Lines 8-27)</li>';
                      html+='<li>'+(lang==="en"?"Expense Detail (all entries)":"全部支出明细")+'</li>';
                      html+='<li>'+(lang==="en"?"Tax Estimates":"税额估算")+' (Form 1040-ES)</li>';
                      html+='<li>'+(lang==="en"?"Driver & Vehicle Info":"司机/车辆信息")+'</li>';
                      html+='</ol>';
                      
                      // ========== 1. INCOME SUMMARY ==========
                      html+='<h2>1. '+(lang==="en"?"Income Summary":"收入汇总")+' (Schedule C Line 1)</h2>';
                      html+='<table>';
                      html+='<tr><th>'+(lang==="en"?"Item":"项目")+'</th><th class="amt">'+(lang==="en"?"Amount":"金额")+'</th></tr>';
                      html+='<tr><td>'+(lang==="en"?"Gross Trip Earnings (1099-K)":"总车费 (1099-K)")+'</td><td class="amt">$'+totalGross.toFixed(2)+'</td></tr>';
                      html+='<tr><td>'+(lang==="en"?"Tips":"小费")+'</td><td class="amt">$'+totalTips.toFixed(2)+'</td></tr>';
                      html+='<tr><td>'+(lang==="en"?"Bonus / Incentives (1099-NEC)":"奖励/激励 (1099-NEC)")+'</td><td class="amt">$'+bonus.toFixed(2)+'</td></tr>';
                      html+='<tr><td>'+(lang==="en"?"Toll Reimbursement":"过桥退款")+'</td><td class="amt">$'+tollReimb.toFixed(2)+'</td></tr>';
                      if(otherInc>0) html+='<tr><td>'+(lang==="en"?"Other Income":"其他收入")+'</td><td class="amt">$'+otherInc.toFixed(2)+'</td></tr>';
                      html+='<tr class="total"><td>'+(lang==="en"?"TOTAL GROSS INCOME":"总毛收入")+'</td><td class="amt">$'+totalIncome.toFixed(2)+'</td></tr>';
                      html+='</table>';
                      
                      // ========== 2. MONTHLY INCOME DETAIL ==========
                      html+='<h2>2. '+(lang==="en"?"Monthly Income Detail":"月度收入明细")+'</h2>';
                      html+='<table>';
                      html+='<tr><th>'+(lang==="en"?"Month":"月份")+'</th><th>'+(lang==="en"?"Platform":"平台")+'</th><th class="amt">'+(lang==="en"?"Gross":"总车费")+'</th><th class="amt">'+(lang==="en"?"Tips":"小费")+'</th><th class="amt">'+(lang==="en"?"Bonus":"奖励")+'</th><th class="amt">'+(lang==="en"?"Total":"合计")+'</th></tr>';
                      yStmts.sort(function(a,b){return a.month.localeCompare(b.month);}).forEach(function(s){
                        var t=(+s.grossFare||0)+(+s.tips||0)+(+s.bonus||0)+(+s.otherIncome||0);
                        html+='<tr><td>'+esc(s.month)+'</td><td>'+esc(s.platform)+'</td><td class="amt">$'+(+s.grossFare||0).toFixed(2)+'</td><td class="amt">$'+(+s.tips||0).toFixed(2)+'</td><td class="amt">$'+(+s.bonus||0).toFixed(2)+'</td><td class="amt">$'+t.toFixed(2)+'</td></tr>';
                      });
                      if(yDls.length>0){
                        // Group dl by month
                        var dlByMonth={};
                        yDls.forEach(function(d){
                          var mo=d.date.slice(0,7);
                          if(!dlByMonth[mo]) dlByMonth[mo]={cash:0,card:0,tips:0};
                          dlByMonth[mo].cash+=(+d.cash||0);
                          dlByMonth[mo].card+=(+d.card||0);
                          dlByMonth[mo].tips+=(+d.tips||0);
                        });
                        Object.keys(dlByMonth).sort().forEach(function(mo){
                          var dm=dlByMonth[mo];
                          var t=dm.cash+dm.card+dm.tips;
                          html+='<tr><td>'+esc(mo)+'</td><td>Daily (Taxi)</td><td class="amt">$'+(dm.cash+dm.card).toFixed(2)+'</td><td class="amt">$'+dm.tips.toFixed(2)+'</td><td class="amt">$0.00</td><td class="amt">$'+t.toFixed(2)+'</td></tr>';
                        });
                      }
                      html+='<tr class="total"><td colspan="5">'+(lang==="en"?"TOTAL":"合计")+'</td><td class="amt">$'+totalIncome.toFixed(2)+'</td></tr>';
                      html+='</table>';
                      
                      // ========== 3. EXPENSE SUMMARY BY CATEGORY ==========
                      html+='<h2 class="page-break">3. '+(lang==="en"?"Expense Summary by Category":"按类别支出汇总")+' (Schedule C Lines 8-27)</h2>';
                      var catTotals={};
                      allYExps.forEach(function(e){
                        var cat=allC[e.category]||{label:e.category||"Other",g:"其他"};
                        var key=cat.label||e.category||"Other";
                        if(!catTotals[key]) catTotals[key]={total:0,group:cat.g||"其他",count:0};
                        catTotals[key].total+=(+e.amount||0);
                        catTotals[key].count++;
                      });
                      var catEntries=Object.entries(catTotals).sort(function(a,b){return b[1].total-a[1].total;});
                      html+='<table>';
                      html+='<tr><th>'+(lang==="en"?"Category":"类别")+'</th><th>'+(lang==="en"?"Group":"分组")+'</th><th class="amt">'+(lang==="en"?"Count":"笔数")+'</th><th class="amt">'+(lang==="en"?"Total":"合计")+'</th></tr>';
                      catEntries.forEach(function(en){
                        html+='<tr><td>'+esc(en[0])+'</td><td>'+esc(en[1].group)+'</td><td class="amt">'+en[1].count+'</td><td class="amt">$'+en[1].total.toFixed(2)+'</td></tr>';
                      });
                      html+='<tr class="total"><td colspan="3">'+(lang==="en"?"TOTAL EXPENSES":"总支出")+'</td><td class="amt">$'+totalExp.toFixed(2)+'</td></tr>';
                      html+='</table>';
                      
                      // ========== 4. EXPENSE DETAIL ==========
                      html+='<h2 class="page-break">4. '+(lang==="en"?"Expense Detail":"全部支出明细")+'</h2>';
                      html+='<p class="subtitle">'+allYExps.length+' '+(lang==="en"?"entries":"条")+'</p>';
                      html+='<table>';
                      html+='<tr><th>'+(lang==="en"?"Date":"日期")+'</th><th>'+(lang==="en"?"Category":"类别")+'</th><th>'+(lang==="en"?"Notes":"备注")+'</th><th class="amt">'+(lang==="en"?"Amount":"金额")+'</th></tr>';
                      allYExps.sort(function(a,b){return (a.date||"").localeCompare(b.date||"");}).forEach(function(e){
                        var cat=allC[e.category]||{label:e.category||"Other"};
                        html+='<tr><td>'+esc(e.date)+'</td><td>'+esc(cat.label)+'</td><td>'+esc(e.notes||"")+'</td><td class="amt">$'+(+e.amount||0).toFixed(2)+'</td></tr>';
                      });
                      html+='<tr class="total"><td colspan="3">'+(lang==="en"?"TOTAL":"合计")+'</td><td class="amt">$'+totalExp.toFixed(2)+'</td></tr>';
                      html+='</table>';
                      
                      // ========== 5. TAX ESTIMATES ==========
                      html+='<h2 class="page-break">5. '+(lang==="en"?"Tax Estimates":"税额估算")+' (Form 1040-ES)</h2>';
                      var seDed=Math.round(netProfit*0.0765*100)/100;
                      var seTax=Math.round(netProfit*0.9235*0.153*100)/100;
                      var fedTax=Math.round(Math.max(0,netProfit-seDed-stdDed)*(fedRate*0.01)*100)/100;
                      var stateTax=Math.round(Math.max(0,netProfit-seDed)*(stateRate*0.01)*100)/100;
                      var mtaTax=netProfit>50000?Math.round(netProfit*(mtaRate*0.01)*100)/100:0;
                      var totalTax=seTax+fedTax+stateTax+mtaTax;
                      html+='<table>';
                      html+='<tr><th>'+(lang==="en"?"Tax Type":"税种")+'</th><th>'+(lang==="en"?"Rate":"税率")+'</th><th class="amt">'+(lang==="en"?"Amount":"金额")+'</th></tr>';
                      html+='<tr><td>'+(lang==="en"?"Self-Employment Tax":"自雇税")+'</td><td>15.3% (×0.9235)</td><td class="amt">$'+seTax.toFixed(2)+'</td></tr>';
                      html+='<tr><td>'+(lang==="en"?"Federal Income Tax":"联邦所得税")+'</td><td>'+fedRate+'%</td><td class="amt">$'+fedTax.toFixed(2)+'</td></tr>';
                      html+='<tr><td>'+(lang==="en"?"State + City Tax":"州+市税")+'</td><td>'+stateRate+'%</td><td class="amt">$'+stateTax.toFixed(2)+'</td></tr>';
                      if(mtaTax>0) html+='<tr><td>'+(lang==="en"?"MTA Surcharge (NYC self-employed)":"MTA 附加税 (NYC 自雇)")+'</td><td>'+mtaRate+'%</td><td class="amt">$'+mtaTax.toFixed(2)+'</td></tr>';
                      html+='<tr class="total"><td colspan="2">'+(lang==="en"?"ESTIMATED TOTAL TAX":"估算总税额")+'</td><td class="amt">$'+totalTax.toFixed(2)+'</td></tr>';
                      html+='<tr class="subtotal"><td colspan="2">'+(lang==="en"?"Quarterly Estimate":"季度预缴")+'</td><td class="amt">$'+(totalTax/4).toFixed(2)+'</td></tr>';
                      html+='</table>';
                      html+='<p class="subtitle">'+(lang==="en"?"Estimates use Standard Deduction $":"估算使用标准扣除 $")+stdDed.toLocaleString()+'.</p>';
                      
                      // ========== 6. DRIVER & VEHICLE INFO ==========
                      html+='<h2 class="page-break">6. '+(lang==="en"?"Driver & Vehicle Info":"司机/车辆信息")+'</h2>';
                      html+='<table>';
                      html+='<tr><th>'+(lang==="en"?"Field":"字段")+'</th><th>'+(lang==="en"?"Value":"值")+'</th></tr>';
                      if(veh.driverName) html+='<tr><td>'+(lang==="en"?"Name":"姓名")+'</td><td>'+esc(veh.driverName)+'</td></tr>';
                      if(veh.tlcDriverLicense) html+='<tr><td>TLC '+(lang==="en"?"Driver License":"驾照")+'</td><td>'+esc(veh.tlcDriverLicense)+'</td></tr>';
                      if(veh.dmvLicense) html+='<tr><td>DMV '+(lang==="en"?"License":"驾照")+'</td><td>'+esc(veh.dmvLicense)+'</td></tr>';
                      if(veh.email) html+='<tr><td>Email</td><td>'+esc(veh.email)+'</td></tr>';
                      if(veh.brand||veh.model) html+='<tr><td>'+(lang==="en"?"Vehicle":"车辆")+'</td><td>'+esc((veh.year||"")+" "+(veh.brand||"")+" "+(veh.model||""))+'</td></tr>';
                      if(veh.plate) html+='<tr><td>'+(lang==="en"?"License Plate":"车牌")+'</td><td>'+esc(veh.plate)+'</td></tr>';
                      if(veh.tlcPlate) html+='<tr><td>TLC '+(lang==="en"?"Plate":"牌照")+'</td><td>'+esc(veh.tlcPlate)+'</td></tr>';
                      if(veh.vin) html+='<tr><td>VIN</td><td>'+esc(veh.vin)+'</td></tr>';
                      html+='</table>';
                      
                      // Footer
                      html+='<div style="margin-top:40px;padding-top:20px;border-top:1px solid #ccc;font-size:11px;color:#888;text-align:center">';
                      html+=esc(lang==="en"?"Generated by NYC Driver Tracker · Not an official tax document · Consult a tax professional":"由 NYC Driver Tracker 生成 · 非官方税务文档 · 请咨询税务专业人员");
                      html+='</div>';
                      html+='</body></html>';
                      
                      downloadPdf(html,"complete-tax-package-"+yr+".pdf");
                      showToast(lang==="en"?"📦 Tax package generated":"📦 报税包已生成");
                    }, style: {width:"100%",background:"linear-gradient(135deg,#3010A0,#1A0560)",border:"1px solid #6030C0",borderRadius:12,padding:14,textAlign:"left",cursor:"pointer",marginTop:10} }
                    , React.createElement('div', { style: {fontSize:15,fontWeight:700,color:"#CC88FF",marginBottom:3} }, "📦 " , lang==="en"?"Complete Tax Package":"完整报税包")
                    , React.createElement('div', { style: {fontSize:12,color:C.text3,lineHeight:1.5} }, lang==="en"?(taxYr||new Date().getFullYear())+" · All-in-one PDF: income + expenses + monthly detail + tax estimates + driver info":(taxYr||new Date().getFullYear())+" 年 · 一份 PDF 包含：收入 + 支出 + 月度明细 + 税额估算 + 司机信息（给会计师用）")
                  )
                  , React.createElement(Card, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 732}}, React.createElement('div', { style: {fontSize:14,fontWeight:800,color:C.text2,marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 732}}, "🔗 " , lang==="en"?"Tax Links":"税务网站")
                    , [{label:"IRS Schedule C",url:"https://www.irs.gov/forms-pubs/about-schedule-c-form-1040"},{label:"IRS Schedule SE",url:"https://www.irs.gov/forms-pubs/about-schedule-se-form-1040"},{label:"IRS Form 1040-ES",url:"https://www.irs.gov/forms-pubs/about-form-1040-es"},{label:"NYC Free Tax Prep",url:"https://www1.nyc.gov/site/dca/consumers/file-your-taxes.page"}].map(function(lk,i){return React.createElement('a', { key: i, href: lk.url, target: "_blank", rel: "noopener noreferrer" , style: {display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #1E3050",textDecoration:"none"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 733}}, React.createElement('span', { style: {fontSize:13,fontWeight:700,color:C.accent2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 733}}, lk.label), React.createElement('span', { style: {color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 733}}, ">"));})
                  )
                );
              })()
            )
          )
        )
      ) : null

      // === Fuelio PDF Import Modal — preview + selective import ===
      , showFuelioImport && fuelioImportResult ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:"rgba(2,4,12,0.95)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:400,padding:"16px"} }
          , React.createElement('div', { style: {background:C.bg2,borderRadius:16,width:"100%",maxWidth:600,border:"1px solid "+C.border,maxHeight:"92vh",display:"flex",flexDirection:"column",overflow:"hidden"} }
            , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 18px",borderBottom:"1px solid #1A2A44",flexShrink:0} }
              , React.createElement('button', { onClick: function(){setShowFuelioImport(false);setFuelioImportResult(null);setFuelioSelected({});}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"} }, "✕")
              , React.createElement('div', { style: {fontSize:16,fontWeight:800} }, fuelioImportResult.isEv?"⚡ ":"⛽ ", lang==="en"?"Import Fuelio":"导入 Fuelio")
              , React.createElement('button', { onClick: function(){
                  // Import all SELECTED entries
                  var toImport = fuelioImportResult.entries.filter(function(_,i){return fuelioSelected[i];});
                  if(toImport.length === 0){ showToast(lang==="en"?"Select at least one":"请至少选一条","warn"); return; }
                  // === MONTHLY CATEGORY CONFLICT CHECK ===
                  // For monthly-billed categories (insurance, carloan, phone, toll, etc.),
                  // check if same month + same category already has entries.
                  // Group importing entries by month+category to detect conflicts.
                  var importByMoCat = {};
                  toImport.forEach(function(en){
                    var c = allC[en.category];
                    if(!c || !c.mo) return; // only monthly-billed
                    var mo = (en.date||"").slice(0,7);
                    var k = mo+"|"+en.category;
                    if(!importByMoCat[k]) importByMoCat[k] = {month:mo, cat:en.category, label:c.label, importTotal:0, importCount:0};
                    importByMoCat[k].importTotal += +en.amount;
                    importByMoCat[k].importCount++;
                  });
                  // For each conflict, check existing el
                  var conflicts = [];
                  Object.values(importByMoCat).forEach(function(grp){
                    var existSame = el.filter(function(e){
                      if(e.category !== grp.cat) return false;
                      var emo = e.statementMonth || (e.date||"").slice(0,7);
                      return emo === grp.month;
                    });
                    if(existSame.length > 0){
                      var existTotal = existSame.reduce(function(s,e){return s+(+e.amount||0);},0);
                      conflicts.push({
                        month: grp.month,
                        label: grp.label,
                        existCount: existSame.length,
                        existTotal: existTotal,
                        importCount: grp.importCount,
                        importTotal: grp.importTotal
                      });
                    }
                  });
                  if(conflicts.length > 0){
                    var msg = lang==="en"?"⚠ Conflict detected — these months already have entries for monthly categories:\n\n":"⚠ 检测到冲突 — 以下月份的月结类别已存在记录：\n\n";
                    conflicts.forEach(function(c){
                      msg += "• "+c.month+" "+c.label+": "+(lang==="en"?
                        "existing "+c.existCount+" ($"+c.existTotal.toFixed(2)+") + importing "+c.importCount+" ($"+c.importTotal.toFixed(2)+")":
                        "已有 "+c.existCount+" 笔 $"+c.existTotal.toFixed(2)+" + 要导入 "+c.importCount+" 笔 $"+c.importTotal.toFixed(2))+"\n";
                    });
                    msg += lang==="en"?"\nProceed with import? Existing entries will NOT be removed.\n• OK = Import anyway (will be in addition to existing)\n• Cancel = Don't import":"\n继续导入？现有记录不会被删除。\n• 确定 = 继续导入（与现有累加）\n• 取消 = 不导入";
                    if(!confirm(msg)) return;
                  }
                  // De-dup against existing el (same date + category + amount)
                  var existing = {};
                  el.forEach(function(e){
                    var key = e.date+"|"+e.category+"|"+(+e.amount||0).toFixed(2);
                    existing[key] = true;
                  });
                  var newEntries = [];
                  var skipped = 0;
                  toImport.forEach(function(en){
                    var key = en.date+"|"+en.category+"|"+en.amount.toFixed(2);
                    if(existing[key]){ skipped++; return; }
                    newEntries.push({
                      id: Date.now() + Math.floor(Math.random()*10000) + newEntries.length,
                      date: en.date,
                      time: "",
                      category: en.category,
                      amount: en.amount,
                      qty: 0,
                      odometer: en.odometer || 0,
                      notes: en.notes || "",
                      vehicleId: veh.vehicleId
                    });
                  });
                  if(newEntries.length === 0){
                    showToast(lang==="en"?"All "+skipped+" entries already exist":"全部 "+skipped+" 条已存在","warn");
                    return;
                  }
                  var prevEl = el.slice();
                  var nel = newEntries.concat(el);
                  setEl(nel);
                  autoSave({el:nel});
                  setShowFuelioImport(false);
                  setFuelioImportResult(null);
                  setFuelioSelected({});
                  showUndo(lang==="en"?("✓ Imported "+newEntries.length+(skipped?" (skipped "+skipped+" dup)":"")):("✓ 已导入 "+newEntries.length+" 条"+(skipped?"（跳过 "+skipped+" 重复）":"")), {prevEl:prevEl});
                }, style: {background:"linear-gradient(135deg,#00CFFF,#0044EE)",border:"none",color:"#fff",fontSize:14,fontWeight:700,padding:"6px 14px",borderRadius:8,cursor:"pointer"}}, lang==="en"?"Import":"导入")
            )
            , React.createElement('div', { style: {padding:"14px 18px",overflowY:"auto",flex:1} }
              // Summary header
              , React.createElement('div', {style:{background:C.bg3,border:"1px solid "+C.border,borderRadius:10,padding:"12px 14px",marginBottom:12}}
                , React.createElement('div', {style:{fontSize:14,fontWeight:700,color:C.accent,marginBottom:6}}
                  , fuelioImportResult.isEv?"⚡ ":"⛽ ", lang==="en"?"Period: ":"月份: ", fuelioImportResult.period || "?"
                )
                , React.createElement('div', {style:{fontSize:12,color:C.text2,lineHeight:1.6}}
                  , lang==="en"?"Found ":"找到 ", React.createElement('b',{style:{color:C.gold}}, fuelioImportResult.entries.length), lang==="en"?" entries · Total ":" 条记录 · 总额 ", React.createElement('b',{style:{color:C.danger}}, fmt(fuelioImportResult.stats.totalCost))
                )
                , fuelioImportResult.fileCount && fuelioImportResult.fileCount > 1 ? React.createElement('div', {style:{fontSize:11,color:"#5ADA7A",marginTop:6}}
                    , "📁 ", fuelioImportResult.fileCount, lang==="en"?" files · ":" 份文件 · ", lang==="en"?"Removed ":"自动去重 ", fuelioImportResult.dupRemoved||0, lang==="en"?" duplicates":""
                  ) : null
                , React.createElement('div', {style:{fontSize:11,color:C.text3,marginTop:6,lineHeight:1.6}}
                  , Object.keys(fuelioImportResult.stats.byCategory).sort(function(a,b){return fuelioImportResult.stats.byCategory[b]-fuelioImportResult.stats.byCategory[a];}).map(function(cat,i){
                      var c = allC[cat];
                      return (i>0?" · ":"") + (c?c.icon:"💼") + " " + (c?c.label:cat) + " " + fmt(fuelioImportResult.stats.byCategory[cat]);
                    }).join("")
                )
              )
              // Bulk select
              , React.createElement('div', {style:{display:"flex",gap:8,marginBottom:10,fontSize:12,flexWrap:"wrap"}}
                , React.createElement('button', {onClick:function(){var sel={};fuelioImportResult.entries.forEach(function(_,i){sel[i]=true;});setFuelioSelected(sel);}, style:{background:"#0A2030",border:"1px solid #2A5070",borderRadius:6,padding:"4px 10px",color:"#7AC0E8",cursor:"pointer"}}, lang==="en"?"Select all":"全选")
                , React.createElement('button', {onClick:function(){setFuelioSelected({});}, style:{background:"#0A2030",border:"1px solid #2A5070",borderRadius:6,padding:"4px 10px",color:"#7AC0E8",cursor:"pointer"}}, lang==="en"?"Clear":"清空")
                , React.createElement('div', {style:{flex:1,textAlign:"right",color:C.text3,fontSize:12,padding:"4px 0",minWidth:80}}, Object.keys(fuelioSelected).filter(function(k){return fuelioSelected[k];}).length, "/", fuelioImportResult.entries.length, lang==="en"?" selected":" 选中")
              )
              // Performance warning if many entries
              , fuelioImportResult.entries.length > 200 ? React.createElement('div', {style:{background:"#1A1400",border:"1px solid #5A4400",borderRadius:8,padding:"8px 12px",marginBottom:10,fontSize:11,color:"#FFB347"}}
                  , "⚡ ", lang==="en"?
                      ("Showing first 200 of "+fuelioImportResult.entries.length+" entries. Click 'Import' to import all selected."):
                      ("仅显示前 200 条（共 "+fuelioImportResult.entries.length+" 条）。点「导入」会导入所有勾选的。")
                ) : null
              // Entry list (only render first 200 for performance)
              , fuelioImportResult.entries.slice(0, 200).map(function(en, i){
                  var c = allC[en.category];
                  var isSel = fuelioSelected[i];
                  return React.createElement('div', {
                    key:i,
                    onClick:function(){var nv=Object.assign({},fuelioSelected);nv[i]=!isSel;setFuelioSelected(nv);},
                    style:{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:isSel?"#0A1F2A":"#0A1422",borderRadius:8,marginBottom:4,cursor:"pointer",border:"1px solid "+(isSel?"#2A5070":"#1A2030")}
                  }
                    , React.createElement('div', {style:{fontSize:14,color:isSel?"#5ADA7A":C.text3,width:18,textAlign:"center"}}, isSel?"✓":"○")
                    , React.createElement('div', {style:{fontSize:18,width:24,textAlign:"center"}}, c?c.icon:"💼")
                    , React.createElement('div', {style:{flex:1,minWidth:0}}
                      , React.createElement('div', {style:{fontSize:12,fontWeight:600,color:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}, en.date, " · ", c?c.label:en.category, en.odometer>0?" · "+en.odometer.toLocaleString()+"mi":"")
                      , en.notes ? React.createElement('div', {style:{fontSize:10,color:C.text3,marginTop:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}, en.notes) : null
                    )
                    , React.createElement('div', {style:{fontSize:13,fontWeight:700,color:C.gold,flexShrink:0}}, fmt(en.amount))
                  );
                })
            )
          )
        )
      ) : null

      // === Diagnostic: scan all el entries — list every expense with date/category/amount/notes/vehicleId ===
      // Helps locate "where did my Fuelio import go" by showing entries across ALL months/vehicles.
      , showElDiag ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:"rgba(2,4,12,0.95)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:400,padding:"16px"} }
          , React.createElement('div', { style: {background:C.bg2,borderRadius:16,width:"100%",maxWidth:620,border:"1px solid "+C.border,maxHeight:"92vh",display:"flex",flexDirection:"column",overflow:"hidden"} }
            , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 18px",borderBottom:"1px solid #1A2A44",flexShrink:0} }
              , React.createElement('button', { onClick: function(){setShowElDiag(false);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"} }, "✕")
              , React.createElement('div', { style: {fontSize:16,fontWeight:800} }, "🔍 ", lang==="en"?"All Expenses (Diagnostic)":"全部支出（诊断）")
              , React.createElement('div', { style: {width:34} })
            )
            , React.createElement('div', { style: {padding:"14px 16px",overflowY:"auto",flex:1} }
              // === Last Fuelio import attempt (debug capture) ===
              , (function(){
                  var dbgRaw = "";
                  try{ dbgRaw = localStorage.getItem("nyc_debug_fuelio_pdf") || ""; }catch(e){}
                  if(!dbgRaw) return null;
                  var d = null;
                  try{ d = JSON.parse(dbgRaw); }catch(e){ return null; }
                  if(!d) return null;
                  var ok = !d.parseError && !d.extractError && d.parseEntryCount > 0;
                  return React.createElement('div', {style:{marginBottom:14,padding:"12px 14px",background:ok?"rgba(0,200,80,0.08)":"rgba(255,80,80,0.10)",border:"1px solid "+(ok?"rgba(0,200,80,0.3)":"rgba(255,80,80,0.3)"),borderRadius:8}}
                    , React.createElement('div', {style:{fontSize:12,fontWeight:700,color:ok?"#5ADA7A":"#FF8080",marginBottom:6}}
                      , ok?"✓ ":"⚠ ", lang==="en"?"Last Fuelio import:":"上次 Fuelio 导入：", " ", (d.ts||"").slice(0,19).replace("T"," "))
                    , React.createElement('div', {style:{fontSize:11,color:C.text2,lineHeight:1.6,fontFamily:"monospace",wordBreak:"break-word"}}
                      , React.createElement('div', null, lang==="en"?"File: ":"文件：", d.fileName||"?", " (", ((d.fileSize||0)/1024).toFixed(1), " KB)")
                      , React.createElement('div', null, lang==="en"?"Extracted text length: ":"提取文本长度：", React.createElement('b',{style:{color:d.textLen>0?C.text2:C.danger}}, (d.textLen||0).toLocaleString()), " chars")
                      , d.extractError ? React.createElement('div', {style:{color:C.danger}}, "❌ PDF read error: ", d.extractError) : null
                      , d.parseError ? React.createElement('div', {style:{color:C.danger}}, "❌ Parse error: ", d.parseError) : null
                      , React.createElement('div', null, lang==="en"?"Entries parsed: ":"解析到条目数：", React.createElement('b',{style:{color:d.parseEntryCount>0?"#5ADA7A":C.danger}}, d.parseEntryCount||0))
                      , d.dateRange ? React.createElement('div', null, lang==="en"?"Date range: ":"日期范围：", React.createElement('b',{style:{color:C.gold}}, d.dateRange)) : null
                      , d.parsePeriod ? React.createElement('div', null, lang==="en"?"Period header: ":"PDF 周期：", d.parsePeriod) : null
                      , React.createElement('div', null, "EV: ", d.parseIsEv?"yes":"no")
                    )
                    // Show first 600 chars of extracted text — helps see if PDF is actually Fuelio format
                    , React.createElement('details', {style:{marginTop:8}}
                      , React.createElement('summary', {style:{cursor:"pointer",fontSize:11,color:C.text3}}, lang==="en"?"▸ Show extracted text head/tail":"▸ 看提取文本开头/结尾")
                      , React.createElement('div', {style:{fontSize:10,fontFamily:"monospace",color:C.text3,marginTop:6,padding:"6px 8px",background:C.bg3,borderRadius:6,maxHeight:200,overflowY:"auto",whiteSpace:"pre-wrap",wordBreak:"break-word"}}
                        , "=== HEAD (first 600 chars) ===\n", d.textHead||"(empty)", "\n\n=== TAIL (last 400 chars) ===\n", d.textTail||"(empty)")
                    )
                  );
                })()
              // === Summary by month ===
              , (function(){
                  // Detect Fuelio-imported entries by content patterns (notes don't literally contain "Fuelio")
                  // Patterns: charging kWh, EZpass tolls, DMV Inspection, formatted kWh prices
                  var fuelioPattern = /\bkWh\b|EZpass|mi\/kWh|DMV Inspection/i;
                  var total = el.reduce(function(s,e){return s+(+e.amount||0);},0);
                  var byMo = {};
                  var vidSet = {};
                  el.forEach(function(e){
                    var moK = (e.date||"").slice(0,7) || "(no-date)";
                    if(!byMo[moK]) byMo[moK] = {count:0, total:0, fuelio:0};
                    byMo[moK].count++;
                    byMo[moK].total += +e.amount||0;
                    if(e.notes && fuelioPattern.test(e.notes)) byMo[moK].fuelio++;
                    if(e.vehicleId) vidSet[e.vehicleId] = (vidSet[e.vehicleId]||0)+1;
                  });
                  var moEntries = Object.entries(byMo).sort(function(a,b){return b[0].localeCompare(a[0]);});
                  var vidCount = Object.keys(vidSet).length;
                  var fuelioTotal = el.filter(function(e){return e.notes && fuelioPattern.test(e.notes);}).length;
                  return React.createElement('div', {style:{marginBottom:12}}
                    , React.createElement('div', {style:{fontSize:13,marginBottom:8,padding:"10px 12px",background:C.bg3,border:"1px solid "+C.border,borderRadius:8}}
                      , React.createElement('div', {style:{fontWeight:700,color:C.text2,marginBottom:4}}
                        , lang==="en"?"el array: ":"el 数组：", React.createElement('b',{style:{color:C.gold}}, el.length+(lang==="en"?" entries · $":" 条 · $")+total.toFixed(2)))
                      , React.createElement('div', {style:{fontSize:11,color:C.text3}}
                        , lang==="en"?"Vehicles tagged: ":"车辆标签数：", React.createElement('b',{style:{color:C.text2}}, vidCount)
                        , " · ", lang==="en"?"Fuelio entries: ":"Fuelio 条目：", React.createElement('b',{style:{color:fuelioTotal>0?"#5ADA7A":C.text3}}, fuelioTotal)
                      )
                    )
                    , React.createElement('div', {style:{fontSize:11,color:C.text3,marginBottom:4,fontWeight:700}}, lang==="en"?"By month (newest first):":"按月份（最新在上）：")
                    , React.createElement('div', {style:{background:C.bg3,border:"1px solid "+C.border,borderRadius:8,padding:"6px 10px",fontSize:11,fontFamily:"monospace",maxHeight:120,overflowY:"auto"}}
                      , moEntries.length === 0
                        ? React.createElement('div', {style:{color:C.text3,fontStyle:"italic",padding:"6px 0"}}, lang==="en"?"(empty)":"（空）")
                        : moEntries.map(function(en){
                            var hasFuelio = en[1].fuelio > 0;
                            return React.createElement('div', {key:en[0], style:{display:"flex",justifyContent:"space-between",padding:"2px 0",color:hasFuelio?"#5ADA7A":C.text2}}
                              , React.createElement('span', null, en[0], hasFuelio?" 🟢":"")
                              , React.createElement('span', {style:{color:C.text3}}, en[1].count+(lang==="en"?" · $":" · $")+en[1].total.toFixed(2)+(hasFuelio?" ("+en[1].fuelio+" Fuelio)":""))
                            );
                          })
                    )
                  );
                })()
              // === Full entry list ===
              , React.createElement('div', {style:{fontSize:11,color:C.text3,marginBottom:6,fontWeight:700}}, lang==="en"?"All entries (date desc):":"所有条目（按日期倒序）：")
              , React.createElement('div', {style:{background:C.bg3,border:"1px solid "+C.border,borderRadius:8,padding:"6px 10px",fontSize:11,fontFamily:"monospace"}}
                , (function(){
                    var sorted = el.slice().sort(function(a,b){return (b.date||"").localeCompare(a.date||"");});
                    if(sorted.length === 0){
                      return React.createElement('div', {style:{color:C.text3,fontStyle:"italic",textAlign:"center",padding:"20px 0"}}, lang==="en"?"(no expenses found in el array)":"（el 数组为空）");
                    }
                    return sorted.map(function(e,i){
                      var c = allC[e.category];
                      var lbl = c ? (c.icon+" "+c.label) : ("? "+e.category);
                      var notesShort = e.notes ? (" · "+(e.notes.length>40 ? e.notes.slice(0,40)+"…" : e.notes)) : "";
                      var isFuelio = e.notes && /\bkWh\b|EZpass|mi\/kWh|DMV Inspection/i.test(e.notes);
                      return React.createElement('div', {key:e.id||i, style:{padding:"4px 0",borderBottom:i<sorted.length-1?"1px solid #1A2A44":"none",display:"flex",justifyContent:"space-between",gap:6,alignItems:"flex-start"}}
                        , React.createElement('div', {style:{flex:1,minWidth:0}}
                          , React.createElement('div', {style:{color:isFuelio?"#5ADA7A":C.text2}}, e.date || "??", " ", lbl, isFuelio?" 🟢":"")
                          , notesShort ? React.createElement('div', {style:{color:C.text3,fontSize:10,marginTop:1,wordBreak:"break-word"}}, notesShort.slice(3)) : null
                        )
                        , React.createElement('span', {style:{color:C.gold,minWidth:60,textAlign:"right",flexShrink:0}}, "$"+(+e.amount||0).toFixed(2))
                      );
                    });
                  })()
              )
              , React.createElement('div', {style:{fontSize:10,color:C.text3,marginTop:10,padding:"8px 10px",background:C.bg3,border:"1px solid "+C.border,borderRadius:8,lineHeight:1.5}}
                , "💡 ", lang==="en"?"Entries with 'Fuelio' in notes are highlighted green. If you don't see green entries here, the import never saved. If you see them but they don't appear in the expense list, switch to the matching month — main views filter by month, NOT by vehicle.":"备注里含 'Fuelio' 的条目高亮为绿色。如果这里没绿色条目 → 导入根本没存上；如果有但其他地方看不到 → 切到对应月份，主视图按月份筛选，不会因车辆而隐藏。")
            )
          )
        )
      ) : null

      , showPasteUberTax ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:"rgba(2,4,12,0.95)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:400,padding:"16px"} }
          , React.createElement('div', { style: {background:C.bg2,borderRadius:16,width:"100%",maxWidth:600,border:"1px solid "+C.border,maxHeight:"92vh",display:"flex",flexDirection:"column",overflow:"hidden"} }
            , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 18px",borderBottom:"1px solid #1A2A44",flexShrink:0} }
              , React.createElement('button', { onClick: function(){setShowPasteUberTax(false);setPasteUberTaxText("");setPasteUberTaxResult(null);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"} }, "✕")
              , React.createElement('div', { style: {fontSize:16,fontWeight:800} }, "📊 " , lang==="en"?"Import Tax Summary":"导入税务总结")
              , React.createElement('div', { style: {width:34} })
            )
            , React.createElement('div', { style: {padding:"16px 18px",overflowY:"auto",flex:1} }
              // === Quick PDF upload — accepts multiple files ===
              , React.createElement('label', {style:{display:"block",background:"linear-gradient(135deg, rgba(255,179,0,0.12), rgba(58,40,0,0.7))",border:"2px dashed rgba(255,179,0,0.5)",borderRadius:RADIUS.md,padding:"16px 14px",cursor:"pointer",fontSize:14,fontWeight:800,color:"#FFB300",textAlign:"center",marginBottom:12,transition:"all 0.15s"}}
                , React.createElement('input', {
                    type:"file",
                    accept:"application/pdf,.pdf",
                    multiple: true,
                    style:{display:"none"},
                    onChange: function(e){
                      var files = Array.prototype.slice.call(e.target.files || []);
                      if(!files.length) return;
                      e.target.value = "";
                      if(!window.pdfjsLib){
                        showToast(lang==="en"?"PDF library not ready, try refresh":"PDF 库未就绪，请刷新", "error");
                        return;
                      }
                      showToast(lang==="en"?("📄 Reading "+files.length+" PDF(s)..."):("📄 读取 "+files.length+" 份 PDF 中..."), "info");
                      Promise.all(files.map(function(f){return extractPdfText(f);}))
                        .then(function(texts){
                          var combined = texts.join("\n\n=== PDF SEPARATOR ===\n\n");
                          if(!combined || combined.length < 50){
                            showToast(lang==="en"?"PDFs appear empty":"PDF 看起来是空的", "error");
                            return;
                          }
                          setPasteUberTaxText(combined);
                          var r = parseUberTaxSummary(combined);
                          if(r){
                            setPasteUberTaxResult(r);
                            showToast(lang==="en"?"✓ Parsed successfully":"✓ 解析成功", "success");
                          } else {
                            showToast(lang==="en"?"Couldn't parse — try paste manually":"PDF 解析失败，可手动粘贴", "warn");
                          }
                        })
                        .catch(function(err){
                          showToast(lang==="en"?"PDF read failed: "+err.message:"PDF 读取失败: "+err.message, "error");
                        });
                    }
                  })
                , React.createElement('div', {style:{fontSize:18,marginBottom:4}}, "📥")
                , React.createElement('div', null, lang==="en"?"Tap to pick Uber Tax Summary PDF(s)":"点击选择 Uber 税务 PDF")
                , React.createElement('div', {style:{fontSize:11,color:C.text3,fontWeight:500,marginTop:4}}, lang==="en"?"Annual: pick all 3 · Monthly: pick 1":"年度：3 份 · 月度：1 份")
              )
              // === Or: paste text fallback ===
              , React.createElement('details', { style: {marginBottom:14} }
                , React.createElement('summary', {style:{cursor:"pointer",fontSize:12,color:C.text3,padding:"6px 4px",userSelect:"none"}}, lang==="en"?"▸ Or paste text manually":"▸ 或手动粘贴文字（备选方式）")
                , React.createElement('div', { style: {background:"#1A1000",border:"1px solid #3A2800",borderRadius:10,padding:"10px 12px",fontSize:11,color:C.text3,lineHeight:1.6,marginTop:8,marginBottom:8} }
                  , React.createElement('div', {}, lang==="en"?"1. Uber Driver App → Account → Tax Information":"1. Uber Driver App → 账户 → Tax Information")
                  , React.createElement('div', {}, lang==="en"?"2. Open the PDF(s), select all, copy":"2. 打开 PDF → 全选 → 复制")
                  , React.createElement('div', {}, lang==="en"?"3. Annual: paste all 3 together · Monthly: paste 1":"3. 年度：3 份合并粘贴 · 月度：粘 1 份即可")
                )
                , React.createElement('textarea', {
                    value: pasteUberTaxText,
                    onChange: function(e){setPasteUberTaxText(e.target.value);setPasteUberTaxResult(null);},
                    placeholder: lang==="en"?"Paste tax PDF text here (annual: 3 PDFs combined; monthly: 1 PDF)":"在这里粘贴税务 PDF 文字（年度：3 份合并；月度：1 份）",
                    style: {width:"100%",minHeight:120,maxHeight:240,padding:"10px 12px",borderRadius:10,border:"1px solid "+C.border,background:C.bg3,color:C.text,fontSize:12,fontFamily:"monospace",resize:"vertical",boxSizing:"border-box"}
                  })
              )
              , React.createElement('button', { onClick: function(){
                    var r=parseUberTaxSummary(pasteUberTaxText);
                    if(!r){alert(lang==="en"?"Could not find a tax year/month. Make sure you copied the Tax Summary text including the title (annual or monthly).":"找不到税务年/月。请确认复制了 Tax Summary（含标题，年度或月度均可）。");return;}
                    setPasteUberTaxResult(r);
                  }, style: {width:"100%",background:"linear-gradient(135deg,#3A2800,#5A3A00)",border:"none",borderRadius:10,padding:"12px",color:"#FFB300",fontSize:14,fontWeight:800,cursor:"pointer",marginTop:12} }, "🔍 " , lang==="en"?"Parse":"解析")
              , pasteUberTaxResult ? React.createElement('div', { style: {marginTop:14} }
                  // === Hero card: actual bank deposit (the most important number) ===
                  , pasteUberTaxResult.isMonthly ? (function(){
                      // Per Uber's PDF math:
                      //   Gross Payment = grossFare + tips + bonus = $4,725.34
                      //   Net Payout (bank deposit) = Gross − Uber fees = $2,895.76
                      // Toll reimbursement is already INCLUDED in Gross — don't add again.
                      // (This matches user's toll double-entry accounting rule.)
                      var gross = +pasteUberTaxResult.monthlyGrossOnly + +pasteUberTaxResult.monthlyTips + +pasteUberTaxResult.necTotal;
                      var bankNet = gross - +pasteUberTaxResult.feesTotal;
                      return React.createElement('div', { style: {padding:"16px 18px",background:"linear-gradient(135deg, rgba(0,230,118,0.10), rgba(10,40,25,0.4))",border:"1px solid rgba(0,230,118,0.35)",borderRadius:12,marginBottom:12} }
                        , React.createElement('div', { style: {fontSize:12,color:C.text3,letterSpacing:0.5,marginBottom:4,textTransform:"uppercase"} }, "🏦 ", lang==="en"?"Net Payout (to your bank)":"实际入账（打入银行）")
                        , React.createElement('div', { style: {fontSize:24,fontWeight:800,color:"#5ADA7A",letterSpacing:-0.5,fontVariantNumeric:"tabular-nums"} }, "$"+bankNet.toFixed(2))
                        , React.createElement('div', { style: {fontSize:11,color:C.text3,marginTop:6,lineHeight:1.5} }
                          , lang==="en"?"Gross ":"营业额 ", "$"+gross.toFixed(2)
                          , " − ", lang==="en"?"Uber fees ":"Uber 抽成 ", "$"+(+pasteUberTaxResult.feesTotal).toFixed(2)
                        )
                        , +pasteUberTaxResult.tollTotal>0 ? React.createElement('div', { style: {fontSize:10,color:C.text3,marginTop:3,fontStyle:"italic"} }
                          , "💡 ", lang==="en"?"Toll $":"过桥退款 $", (+pasteUberTaxResult.tollTotal).toFixed(2), lang==="en"?" already included in Gross — you still owe it back at the toll plaza.":" 已含在营业额内 — 你还需付给收费站。")
                        : null
                      );
                    })() : null
                  , React.createElement('div', { style: {padding:"14px 16px",background:"#1A1000",border:"1px solid #5A3A00",borderRadius:10,marginBottom:12} }
                    , React.createElement('div', { style: {fontSize:14,fontWeight:800,color:"#FFB300",marginBottom:10} }, "✓ " , pasteUberTaxResult.isMonthly ? (lang==="en"?"Monthly Statement · ":"月度账单 · ")+pasteUberTaxResult.year+"-"+(pasteUberTaxResult.monthNum<10?"0":"")+pasteUberTaxResult.monthNum : (lang==="en"?"Tax Year ":"税务年度 ")+pasteUberTaxResult.year)
                    , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,fontSize:12,marginBottom:8} }
                      , pasteUberTaxResult.isMonthly
                          // Monthly format has no "1099-K" — show Gross Fare + Tips separately (matches the actual save fields)
                          ? React.createElement('div', {}, "🚕 " , lang==="en"?"Gross Fare":"总车费" , ": ", pasteUberTaxResult.monthlyGrossOnly>0 ? React.createElement('b',{style:{color:C.accent}}, "$"+pasteUberTaxResult.monthlyGrossOnly.toFixed(2)) : React.createElement('span',{style:{color:C.text3,fontStyle:"italic"}}, lang==="en"?"none":"无"))
                          : React.createElement('div', {}, "💵 1099-K: ", pasteUberTaxResult.kTotal>0 ? React.createElement('b',{style:{color:C.accent}}, "$"+pasteUberTaxResult.kTotal.toFixed(2)) : React.createElement('span',{style:{color:C.text3,fontStyle:"italic"}}, lang==="en"?"none":"无"))
                      , pasteUberTaxResult.isMonthly
                          ? React.createElement('div', {}, "💰 " , lang==="en"?"Tips":T.tips , ": ", pasteUberTaxResult.monthlyTips>0 ? React.createElement('b',{style:{color:C.success}}, "$"+pasteUberTaxResult.monthlyTips.toFixed(2)) : React.createElement('span',{style:{color:C.text3,fontStyle:"italic"}}, lang==="en"?"none":"无"))
                          : React.createElement('div', {}, "⭐ 1099-NEC: ", pasteUberTaxResult.necTotal>0 ? React.createElement('b',{style:{color:C.success}}, "$"+pasteUberTaxResult.necTotal.toFixed(2)) : React.createElement('span',{style:{color:C.text3,fontStyle:"italic"}}, lang==="en"?"none":"无"))
                      , pasteUberTaxResult.isMonthly
                          ? React.createElement('div', {}, "⭐ " , lang==="en"?"Incentives":"奖励" , ": ", pasteUberTaxResult.necTotal>0 ? React.createElement('b',{style:{color:C.success}}, "$"+pasteUberTaxResult.necTotal.toFixed(2)) : React.createElement('span',{style:{color:C.text3,fontStyle:"italic"}}, lang==="en"?"none":"无"))
                          : React.createElement('div', {}, "🌉 " , lang==="en"?"Tolls":"过桥退款" , ": ", pasteUberTaxResult.tollTotal>0 ? React.createElement('b',{style:{color:C.gold}}, "$"+pasteUberTaxResult.tollTotal.toFixed(2)) : React.createElement('span',{style:{color:C.text3,fontStyle:"italic"}}, lang==="en"?"none":"无"))
                      , pasteUberTaxResult.isMonthly
                          ? React.createElement('div', {}, "🌉 " , lang==="en"?"Tolls":"过桥退款" , ": ", pasteUberTaxResult.tollTotal>0 ? React.createElement('b',{style:{color:C.gold}}, "$"+pasteUberTaxResult.tollTotal.toFixed(2)) : React.createElement('span',{style:{color:C.text3,fontStyle:"italic"}}, lang==="en"?"none":"无"))
                          : React.createElement('div', {}, "💸 " , lang==="en"?"Uber Fees":"Uber 抽成" , ": ", pasteUberTaxResult.feesTotal>0 ? React.createElement('b',{style:{color:C.danger}}, "$"+pasteUberTaxResult.feesTotal.toFixed(2)) : React.createElement('span',{style:{color:C.text3,fontStyle:"italic"}}, lang==="en"?"none":"无"))
                      , pasteUberTaxResult.isMonthly
                          ? React.createElement('div', {}, "💸 " , lang==="en"?"Uber Fees":"Uber 抽成" , ": ", pasteUberTaxResult.feesTotal>0 ? React.createElement('b',{style:{color:C.danger}}, "$"+pasteUberTaxResult.feesTotal.toFixed(2)) : React.createElement('span',{style:{color:C.text3,fontStyle:"italic"}}, lang==="en"?"none":"无"))
                          : React.createElement('div', {}, "🚗 " , T.trips , ": ", pasteUberTaxResult.totalTrips>0 ? React.createElement('b', null, pasteUberTaxResult.totalTrips.toLocaleString()) : React.createElement('span',{style:{color:C.text3,fontStyle:"italic"}}, lang==="en"?"none":"无"))
                      , React.createElement('div', {}, "🚗 " , T.trips , ": ", pasteUberTaxResult.totalTrips>0 ? React.createElement('b', null, pasteUberTaxResult.totalTrips.toLocaleString()) : React.createElement('span',{style:{color:C.text3,fontStyle:"italic"}}, lang==="en"?"none":"无"))
                      , React.createElement('div', {}, "🛣 " , T.miles , ": ", pasteUberTaxResult.totalMiles>0 ? React.createElement('b', null, pasteUberTaxResult.totalMiles.toLocaleString()) : React.createElement('span',{style:{color:C.text3,fontStyle:"italic"}}, lang==="en"?"none":"无"))
                    )
                  )
                  , pasteUberTaxResult.isMonthly
                    ? null  // monthly PDF is a single-month file by design — no breakdown grid, no "missing data" warning
                    : (pasteUberTaxResult.hasMonthly && pasteUberTaxResult.hasTrips) ? React.createElement('div', { style: {marginBottom:12} }
                      , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:C.text2,marginBottom:6} }, lang==="en"?"Monthly Breakdown:":"月度明细：")
                      , React.createElement('div', { style: {background:C.bg3,border:"1px solid "+C.border,borderRadius:8,padding:"8px 12px",fontSize:12,fontFamily:"monospace"} }
                        , (function(){
                            var MNS=["January","February","March","April","May","June","July","August","September","October","November","December"];
                            return MNS.map(function(mo,i){
                              var k=pasteUberTaxResult.monthlyK[mo]||0;
                              var t=pasteUberTaxResult.monthlyTrips[mo]||0;
                              var mi=pasteUberTaxResult.monthlyMiles[mo]||0;
                              var isEmpty = k===0 && t===0 && mi===0;
                              return React.createElement('div', { key: mo, style: {display:"flex",justifyContent:"space-between",padding:"2px 0",borderBottom:i<11?"1px solid #1A2A44":"none",opacity:isEmpty?0.5:1} }
                                , React.createElement('span', {style:{color:C.text3,minWidth:90}}, pasteUberTaxResult.year+"-"+(i+1<10?"0":"")+(i+1))
                                , isEmpty
                                  ? React.createElement('span', {style:{color:C.text3,fontStyle:"italic",fontSize:11}}, lang==="en"?"— no income —":"— 无收入 —")
                                  : React.createElement('span', {style:{color:C.accent}}, "$"+k.toFixed(2))
                                , isEmpty
                                  ? React.createElement('span', {style:{color:"transparent"}}, "—")
                                  : React.createElement('span', {style:{color:C.text2}}, t+"t · "+mi+"mi")
                              );
                            });
                          })()
                      )
                    ) : React.createElement('div', { style: {fontSize:12,color:"#FFB300",padding:"10px 12px",background:"#1A1000",borderRadius:8,marginBottom:12} }, "⚠ " , lang==="en"?"Some monthly data is missing. Make sure you pasted ALL 3 PDFs (Tax Summary + 1099-K + 1099-NEC).":"月度数据不完整。请确认 3 份 PDF 都粘贴了（Tax Summary + 1099-K + 1099-NEC）。")
                  , React.createElement('div', { style: {fontSize:12,color:C.text3,padding:"8px 10px",background:C.bg3,border:"1px solid #1A2A44",borderRadius:8,marginBottom:10,lineHeight:1.6} }
                      , "💡 ", lang==="en"?"Note: 1099-K is gross (rider-paid amount before Uber's service fee). To get accurate net income on Schedule C, also record Uber's $":"提示：1099-K 是 Gross（乘客付的金额，含 Uber 抽成）。Schedule C 报税时，把 Uber 抽成 $"
                      , pasteUberTaxResult.feesTotal.toFixed(2)
                      , lang==="en"?" service fees as a deductible expense.":" 也作为可抵税支出录入。"
                  )
                  // Monthly import button (1 statement)
                  , pasteUberTaxResult.isMonthly ? React.createElement('button', { onClick: function(){
                      var r=pasteUberTaxResult;
                      var yr=r.year, mn=r.monthNum;
                      var monthStr=yr+"-"+(mn<10?"0":"")+mn;
                      // === Pre-check: detect overlap with existing toll/platform expenses ===
                      var relatedExp = el.filter(function(e){
                        if(e.category !== "toll" && e.category !== "platform") return false;
                        var emo = e.statementMonth || (e.date||"").slice(0,7);
                        return emo === monthStr;
                      });
                      var deleteOverlap = false;
                      if(relatedExp.length > 0){
                        var byCat = {};
                        relatedExp.forEach(function(e){
                          if(!byCat[e.category]) byCat[e.category] = {count:0, total:0};
                          byCat[e.category].count++;
                          byCat[e.category].total += +e.amount||0;
                        });
                        var lines = [];
                        Object.keys(byCat).forEach(function(c){
                          var lbl = allC[c] ? allC[c].label : c;
                          lines.push("  • "+lbl+": "+byCat[c].count+(lang==="en"?" entries $":" 笔 $")+byCat[c].total.toFixed(2));
                        });
                        var monthlyToll = (+r.tollTotal||0).toFixed(2);
                        var monthlyFees = (+r.feesTotal||0).toFixed(2);
                        // Three-way prompt: 1 = keep both, 2 = delete existing, 3 = cancel
                        var msg = lang==="en"?
                          ("⚠ "+monthStr+" already has expense entries that overlap with this monthly statement:\n\n"+lines.join("\n")+"\n\nThe monthly statement contains:\n  • Tolls reimbursement: $"+monthlyToll+"\n  • Platform fees: $"+monthlyFees+"\n\nWhat to do?\n  1 = Keep all (manual entries + monthly statement coexist)\n  2 = Delete existing manual entries, only use monthly statement\n  3 = Cancel (don't save monthly statement)\n\nEnter 1, 2, or 3:"):
                          ("⚠ "+monthStr+" 已有以下支出，与即将粘贴的月度账单类别重叠：\n\n"+lines.join("\n")+"\n\n本月账单内含：\n  • 过桥退款：$"+monthlyToll+"\n  • 平台抽成：$"+monthlyFees+"\n\n如何处理？\n  1 = 都保留（手动记录 + 月度账单共存）\n  2 = 删除已有手动记录，只用月度账单\n  3 = 取消（不保存月度账单）\n\n输入 1、2 或 3：");
                        var choice = prompt(msg, "1");
                        if(choice === null || choice === "" || choice === "3") return;
                        if(choice === "2"){ deleteOverlap = true; }
                        // Otherwise (default "1") keep both
                      }
                      // Check existing sl FIRST so a cancel here doesn't leave el modified
                      var existing=sl.find(function(x){return x.platform==="Uber"&&x.month===monthStr;});
                      if(existing){
                        if(!confirm(lang==="en"?"A statement for "+monthStr+" Uber already exists. Overwrite (operations fields like trips/miles will be preserved)?":monthStr+" Uber 已有记录。覆盖（趟数/里程等字段会保留）？"))return;
                      }
                      // Compute el-after-deletion if user chose option 2 (do NOT setEl yet — combine with platform-create below)
                      var elBase = el;
                      if(deleteOverlap && relatedExp.length > 0){
                        var keepIds = {};
                        relatedExp.forEach(function(e){keepIds[e.id]=true;});
                        elBase = el.filter(function(e){return !keepIds[e.id];});
                      }
                      // Auto-create/update platform expense (refOnly) — matches manual stmt-form behavior at line ~6066
                      // tExp filters out category==="platform" so this never double-counts; it's for display in the expense list.
                      var elFinal = elBase;
                      if(r.feesTotal && +r.feesTotal > 0){
                        var existingPlatExp = elBase.find(function(e){
                          if(e.category!=="platform") return false;
                          if(!e.date || e.date.slice(0,7)!==monthStr) return false;
                          if(!e.notes || e.notes.indexOf("Uber")<0) return false;
                          return true;
                        });
                        var platExpDate = monthStr+"-15";
                        if(existingPlatExp){
                          elFinal = elBase.map(function(e){return e.id===existingPlatExp.id?Object.assign({},e,{amount:+r.feesTotal,notes:"Uber platform fee · "+monthStr}):e;});
                        } else {
                          elFinal = [{id:Date.now()+2,date:platExpDate,category:"platform",amount:+r.feesTotal,notes:"Uber platform fee · "+monthStr,isFixed:false,mode:"rideshare"}].concat(elBase);
                        }
                      }
                      if(elFinal !== el) setEl(elFinal);
                      if(existing){
                        setSl(sl.map(function(x){
                          if(x.id!==existing.id) return x;
                          return Object.assign({},x,{
                            grossFare:r.monthlyGrossOnly.toFixed(2),
                            tips:r.monthlyTips.toFixed(2),
                            bonus:r.necTotal.toFixed(2),
                            tollReimbursed:r.tollTotal.toFixed(2),
                            platformFee:r.feesTotal.toFixed(2),
                            trips:String(r.totalTrips||""),
                            miles:String(r.totalMiles||""),
                            notes:"Imported from Uber "+monthStr+" Monthly Summary"
                          });
                        }));
                      } else {
                        setSl([{
                          id:Date.now(),
                          month:monthStr,
                          platform:"Uber",
                          grossFare:r.monthlyGrossOnly.toFixed(2),
                          tips:r.monthlyTips.toFixed(2),
                          bonus:r.necTotal.toFixed(2),
                          tollReimbursed:r.tollTotal.toFixed(2),
                          otherIncome:"0.00",
                          platformFee:r.feesTotal.toFixed(2),
                          trips:String(r.totalTrips||""),
                          onlineHours:"",
                          miles:String(r.totalMiles||""),
                          notes:"Imported from Uber "+monthStr+" Monthly Summary"
                        }].concat(sl));
                      }
                      // NOTE: Monthly statement saves INCOME (sl) + auto-creates a refOnly platform expense (el)
                      // for display in the expense list. tExp filters out category==="platform" so no double-count.
                      setShowPasteUberTax(false);setPasteUberTaxText("");setPasteUberTaxResult(null);
                      var msgDone = lang==="en"?"✓ Saved monthly statement":"✓ 月度账单已保存";
                      if(deleteOverlap){
                        msgDone += lang==="en"?" (existing overlapping expenses removed)":"（已删除重叠支出）";
                      }
                      showToast(msgDone);
                    }, style: {width:"100%",background:"linear-gradient(135deg,#5A3A00,#3A2800)",border:"1px solid #7A5500",borderRadius:10,padding:"12px",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer"} }, "✓ " , (lang==="en"?"Save Monthly Statement":"保存月度账单"))
                  // Annual import button (12 statements)
                  : (pasteUberTaxResult.hasMonthly && pasteUberTaxResult.hasTrips) ? React.createElement('button', { onClick: function(){
                        var r=pasteUberTaxResult;
                        var yr=r.year;
                        // Check if any year statements exist
                        var existing=sl.filter(function(x){return x.platform==="Uber"&&x.month&&x.month.slice(0,4)===yr;});
                        var msg=lang==="en"
                          ?"Create 12 monthly statements for "+yr+" Uber?"+(existing.length>0?"\n\n⚠ "+existing.length+" existing entry/entries will be overwritten.":"")
                          :"为 "+yr+" 年 Uber 创建 12 个月度账单？"+(existing.length>0?"\n\n⚠ 已有 "+existing.length+" 条记录会被覆盖。":"");
                        if(!confirm(msg))return;
                        var MNS=["January","February","March","April","May","June","July","August","September","October","November","December"];
                        var newSl=sl.slice();
                        // Remove existing Uber entries for this year first
                        newSl=newSl.filter(function(x){return !(x.platform==="Uber"&&x.month&&x.month.slice(0,4)===yr);});
                        // Add 12 new ones; allocate NEC into December as bonus
                        var necRemainder=r.necTotal;
                        MNS.forEach(function(mo,i){
                          var k=r.monthlyK[mo]||0;
                          var t=r.monthlyTrips[mo]||0;
                          var mi=r.monthlyMiles[mo]||0;
                          if(k===0 && t===0 && mi===0) return; // skip empty months
                          var monthStr=yr+"-"+(i+1<10?"0":"")+(i+1);
                          newSl.push({
                            id:Date.now()+i,
                            month:monthStr,
                            platform:"Uber",
                            grossFare:k.toFixed(2),
                            tips:"0.00",
                            bonus:i===11?necRemainder.toFixed(2):"0.00",
                            tollReimbursed:i===11?r.tollTotal.toFixed(2):"0.00",
                            otherIncome:"0.00",
                            trips:String(t),
                            onlineHours:"",
                            miles:String(mi),
                            notes:"Imported from Uber "+yr+" Tax Summary"+(i===11?" (bonus = annual NEC; toll = annual reimbursement)":"")
                          });
                        });
                        setSl(newSl);
                        setShowPasteUberTax(false);setPasteUberTaxText("");setPasteUberTaxResult(null);
                        showToast(lang==="en"?"✓ Imported 12 monthly statements for "+yr:"✓ "+yr+" 年 12 个月度账单已导入");
                      }, style: {width:"100%",background:"linear-gradient(135deg,#5A3A00,#3A2800)",border:"1px solid #7A5500",borderRadius:10,padding:"12px",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer"} }, "✓ " , lang==="en"?"Import 12 Monthly Statements":"导入 12 个月度账单") : null
                ) : null
            )
          )
        )
      ) : null

      , showPasteUber ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:"rgba(2,4,12,0.95)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:400,padding:"16px"} }
          , React.createElement('div', { style: {background:C.bg2,borderRadius:16,width:"100%",maxWidth:560,border:"1px solid "+C.border,maxHeight:"90vh",display:"flex",flexDirection:"column",overflow:"hidden"} }
            , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 18px",borderBottom:"1px solid #1A2A44",flexShrink:0} }
              , React.createElement('button', { onClick: function(){setShowPasteUber(false);setPasteUberText("");setPasteUberResult(null);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"} }, "✕")
              , React.createElement('div', { style: {fontSize:16,fontWeight:800} }, "📄 " , lang==="en"?"Import Uber Statement":"导入 Uber 周报")
              , React.createElement('div', { style: {width:34} })
            )
            , React.createElement('div', { style: {padding:"16px 18px",overflowY:"auto",flex:1} }
              // === Quick PDF upload (recommended path) ===
              , React.createElement('label', {style:{display:"block",background:"linear-gradient(135deg, rgba(0,212,255,0.12), rgba(10,30,55,0.7))",border:"2px dashed rgba(0,212,255,0.5)",borderRadius:RADIUS.md,padding:"16px 14px",cursor:"pointer",fontSize:14,fontWeight:800,color:C.accent,textAlign:"center",marginBottom:12,transition:"all 0.15s"}}
                , React.createElement('input', {
                    type:"file",
                    accept:"application/pdf,.pdf",
                    style:{display:"none"},
                    onChange: function(e){
                      var f = e.target.files && e.target.files[0];
                      if(!f) return;
                      e.target.value = "";
                      if(!window.pdfjsLib){
                        showToast(lang==="en"?"PDF library not ready, try refresh":"PDF 库未就绪，请刷新", "error");
                        return;
                      }
                      showToast(lang==="en"?"📄 Reading PDF...":"📄 读取 PDF 中...", "info");
                      extractPdfText(f).then(function(text){
                        if(!text || text.length < 50){
                          showToast(lang==="en"?"PDF appears empty":"PDF 看起来是空的", "error");
                          return;
                        }
                        setPasteUberText(text);
                        var r2 = parseUberStatement(text);
                        if(r2 && !r2.error){
                          setPasteUberResult(r2);
                          showToast(lang==="en"?"✓ Parsed successfully":"✓ 解析成功", "success");
                        } else {
                          showToast(lang==="en"?"Couldn't parse PDF — try paste instead":"PDF 解析失败，可以试试粘贴方式", "warn");
                        }
                      }).catch(function(err){
                        showToast(lang==="en"?"PDF read failed: "+err.message:"PDF 读取失败: "+err.message, "error");
                      });
                    }
                  })
                , React.createElement('div', {style:{fontSize:18,marginBottom:4}}, "📥")
                , React.createElement('div', null, lang==="en"?"Tap to pick Uber PDF":"点击选择 Uber PDF 文件")
                , React.createElement('div', {style:{fontSize:11,color:C.text3,fontWeight:500,marginTop:4}}, lang==="en"?"Recommended — auto parses everything":"推荐方式 — 自动解析所有数据")
              )
              // === Or: paste text fallback ===
              , React.createElement('details', { style: {marginBottom:14} }
                , React.createElement('summary', {style:{cursor:"pointer",fontSize:12,color:C.text3,padding:"6px 4px",userSelect:"none"}}, lang==="en"?"▸ Or paste text manually":"▸ 或手动粘贴文字（备选方式）")
                , React.createElement('div', { style: {background:C.bg3,border:"1px solid "+C.border2,borderRadius:10,padding:"10px 12px",fontSize:11,color:C.text3,lineHeight:1.6,marginTop:8,marginBottom:8} }
                  , React.createElement('div', {}, lang==="en"?"1. Uber Driver App → Earnings → Statements":"1. Uber Driver App → 收入 → Statements")
                  , React.createElement('div', {}, lang==="en"?"2. Open PDF, select all, copy":"2. 打开 PDF, 长按全选, 复制")
                  , React.createElement('div', {}, lang==="en"?"3. Paste below, tap Parse":"3. 粘贴到下方, 点解析")
                )
                , React.createElement('textarea', {
                    value: pasteUberText,
                    onChange: function(e){setPasteUberText(e.target.value);setPasteUberResult(null);},
                    placeholder: lang==="en"?"Paste statement text here...":"在这里粘贴周报文字...",
                    style: {width:"100%",minHeight:100,maxHeight:200,padding:"10px 12px",borderRadius:10,border:"1px solid "+C.border,background:C.bg3,color:C.text,fontSize:13,fontFamily:"monospace",resize:"vertical",boxSizing:"border-box"}
                  })
              )
              , React.createElement('button', { onClick: function(){
                    var r=parseUberStatement(pasteUberText);
                    if(!r){alert(lang==="en"?"Could not parse. Make sure you copied the full statement text including the date range header.":"无法解析。请确认复制了完整周报文字（包含日期范围那一行）。");return;}
                    if(r.error){alert(r.error);return;}
                    setPasteUberResult(r);
                  }, style: {width:"100%",background:"linear-gradient(135deg,#0A4020,#1A6030)",border:"none",borderRadius:10,padding:"12px",color:"#5ADA7A",fontSize:14,fontWeight:800,cursor:"pointer",marginTop:12} }, "🔍 " , lang==="en"?"Parse":"解析")
              , pasteUberResult ? React.createElement('div', { style: {marginTop:14,padding:"14px 16px",background:"#0A2010",border:"1px solid #2A6020",borderRadius:10} }
                  , React.createElement('div', { style: {fontSize:13,fontWeight:800,color:"#5ADA7A",marginBottom:6} }, "✓ " , lang==="en"?"Parsed — please verify before saving":"解析完成 — 保存前请核对")
                  , React.createElement('div', { style: {fontSize:12,color:C.text3,marginBottom:8} }, "📝 " , lang==="en"?"Tap any number to edit":"点任何数字可修改")
                  , React.createElement('div', { style: {fontSize:12,color:C.text3,marginBottom:8} }, lang==="en"?"Week: ":"周次：" , React.createElement('b',{style:{color:C.gold}}, pasteUberResult.weekStart, " → " , pasteUberResult.weekEnd))
                  , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:6} }
                    , React.createElement('div', {style:{display:"flex",flexDirection:"column",gap:2}}
                      , React.createElement('span',{style:{color:C.text3,fontSize:12}}, "💵 " , lang==="en"?"Fare":"总车费")
                      , React.createElement('input',{type:"number",step:"0.01",value:pasteUberResult.grossFare,onChange:function(e){setPasteUberResult(Object.assign({},pasteUberResult,{grossFare:e.target.value}));},style:{background:C.bg3,border:"1px solid #2A3A54",borderRadius:6,padding:"6px 8px",color:C.accent,fontSize:14,fontWeight:700,width:"100%",boxSizing:"border-box"}})
                    )
                    , React.createElement('div', {style:{display:"flex",flexDirection:"column",gap:2}}
                      , React.createElement('span',{style:{color:C.text3,fontSize:12}}, "💰 " , T.tips)
                      , React.createElement('input',{type:"number",step:"0.01",value:pasteUberResult.tips,onChange:function(e){setPasteUberResult(Object.assign({},pasteUberResult,{tips:e.target.value}));},style:{background:C.bg3,border:"1px solid #2A3A54",borderRadius:6,padding:"6px 8px",color:C.success,fontSize:14,fontWeight:700,width:"100%",boxSizing:"border-box"}})
                    )
                    , React.createElement('div', {style:{display:"flex",flexDirection:"column",gap:2}}
                      , React.createElement('span',{style:{color:C.text3,fontSize:12}}, "🎁 " , lang==="en"?"Bonus / Prior tips":"奖励 / 遗留小费")
                      , React.createElement('input',{type:"number",step:"0.01",value:pasteUberResult.bonus||"0.00",onChange:function(e){setPasteUberResult(Object.assign({},pasteUberResult,{bonus:e.target.value}));},style:{background:C.bg3,border:"1px solid #2A3A54",borderRadius:6,padding:"6px 8px",color:C.gold,fontSize:14,fontWeight:700,width:"100%",boxSizing:"border-box"}})
                    )
                    , React.createElement('div', {style:{display:"flex",flexDirection:"column",gap:2}}
                      , React.createElement('span',{style:{color:C.text3,fontSize:12}}, "🌉 " , T.toll)
                      , React.createElement('input',{type:"number",step:"0.01",value:pasteUberResult.tollReimbursed,onChange:function(e){setPasteUberResult(Object.assign({},pasteUberResult,{tollReimbursed:e.target.value}));},style:{background:C.bg3,border:"1px solid #2A3A54",borderRadius:6,padding:"6px 8px",color:"#FFB300",fontSize:14,fontWeight:700,width:"100%",boxSizing:"border-box"}})
                    )
                    , React.createElement('div', {style:{display:"flex",flexDirection:"column",gap:2}}
                      , React.createElement('span',{style:{color:C.text3,fontSize:12}}, "🏦 " , lang==="en"?"Bank Payout":"银行入账")
                      , React.createElement('input',{type:"number",step:"0.01",value:pasteUberResult.payoutAmount||"",placeholder:"0.00",onChange:function(e){setPasteUberResult(Object.assign({},pasteUberResult,{payoutAmount:e.target.value}));},style:{background:C.bg3,border:"1px solid #2A3A54",borderRadius:6,padding:"6px 8px",color:C.accent2,fontSize:14,fontWeight:700,width:"100%",boxSizing:"border-box"}})
                    )
                    , React.createElement('div', {style:{display:"flex",flexDirection:"column",gap:2}}
                      , React.createElement('span',{style:{color:C.text3,fontSize:12}}, "📅 " , lang==="en"?"Payout Date":"入账日期")
                      , React.createElement('input',{type:"date",value:pasteUberResult.payoutDate||"",onChange:function(e){setPasteUberResult(Object.assign({},pasteUberResult,{payoutDate:e.target.value}));},style:{background:C.bg3,border:"1px solid #2A3A54",borderRadius:6,padding:"6px 8px",color:C.text2,fontSize:13,fontWeight:600,width:"100%",boxSizing:"border-box"}})
                    )
                  )
                  , (pasteUberResult.uberServiceFee && +pasteUberResult.uberServiceFee>0) ? React.createElement('div', {style:{marginTop:10,padding:"10px 12px",background:"#1A0A1A",border:"1px solid #5A2A4A",borderRadius:8}}
                      , React.createElement('div', {style:{fontSize:12,color:"#CC88FF",fontWeight:700,marginBottom:6}}, "💸 " , lang==="en"?"Uber Service Fee (tax-deductible expense)":"Uber 抽成（可抵税支出）")
                      , React.createElement('div', {style:{display:"flex",alignItems:"center",gap:8}}
                        , React.createElement('span', {style:{fontSize:14,fontWeight:700,color:"#CC88FF"}}, "$", pasteUberResult.uberServiceFee)
                        , React.createElement('div', {style:{flex:1,fontSize:11,color:C.text3,lineHeight:1.4}}, lang==="en"?"This is what Uber takes. Will be auto-recorded as platform expense if you save.":"这是 Uber 从乘客那扣走的。保存时会自动作为平台支出录入。")
                      )
                    ) : null
                  , React.createElement('div', {style:{marginTop:10,padding:"8px 12px",background:C.bg3,borderRadius:6,fontSize:13,textAlign:"center"}}
                    , "📊 ", lang==="en"?"Total: ":"合计：" , React.createElement('b',{style:{color:C.gold,fontSize:16}}, "$"+(((+pasteUberResult.grossFare||0)+(+pasteUberResult.tips||0)+(+pasteUberResult.bonus||0)+(+pasteUberResult.tollReimbursed||0)).toFixed(2)))
                  )
                  , (+pasteUberResult.statedEarnings>0) ? (function(){
                      // Uber stated earnings is current-week only — compare against fare+tips (NOT bonus, since bonus is prior-week tips)
                      var calculated = (+pasteUberResult.grossFare||0)+(+pasteUberResult.tips||0);
                      var diff = Math.abs(calculated - (+pasteUberResult.statedEarnings));
                      var match = diff < 0.5;
                      return React.createElement('div', {style:{fontSize:12,color:match?"#5ADA7A":"#FFB300",marginTop:8,padding:"6px 10px",background:match?"#0A2018":"#1A1400",borderRadius:6}}
                        , match ? "✓ " : "⚠ "
                        , lang==="en"?"Uber stated earnings: ":"Uber 显示收入：" , "$"+pasteUberResult.statedEarnings
                        , match ? (lang==="en"?" — matches Fare+Tip":" — 与总车费+小费一致") : (lang==="en"?(" — off by $"+diff.toFixed(2)):(" — 差 $"+diff.toFixed(2)))
                      );
                    }()) : null
                  , (pasteUberResult.audit && pasteUberResult.audit.warnings && pasteUberResult.audit.warnings.length > 0) ? React.createElement('div', {style:{marginTop:10,padding:"10px 12px",background:"#1A1400",border:"1px solid #5A3A00",borderRadius:8}}
                      , React.createElement('div', {style:{fontSize:12,fontWeight:700,color:"#FFB300",marginBottom:6}}, "🔍 " , lang==="en"?"Audit Warnings — please verify":"审核警告 — 请核对")
                      , pasteUberResult.audit.warnings.map(function(w,i){
                          return React.createElement('div', {key:i,style:{fontSize:12,color:"#FFD380",marginBottom:4,lineHeight:1.5,paddingLeft:8,borderLeft:"2px solid #5A3A00"}}, lang==="en"?w.msg:w.msgCn);
                        })
                      , React.createElement('div', {style:{fontSize:11,color:C.text3,marginTop:6,fontStyle:"italic"}}, lang==="en"?"💡 If something is missing, edit the fields above before saving.":"💡 如有遗漏，请在上方字段中手动修正后保存。")
                    ) : null
                  , React.createElement('button', { onClick: function(){
                      var r=pasteUberResult;
                      // Find existing wl entry for same week + Uber
                      var ex=wl.find(function(w){return w.weekStart===r.weekStart&&w.platform==="Uber";});
                      if(ex){
                        if(!confirm(lang==="en"?"A weekly entry for "+r.weekStart+" Uber already exists. Overwrite (operations fields like trips/miles will be preserved)?":r.weekStart+" Uber 已有记录。覆盖（趟数、里程等运营字段会保留）？"))return;
                        setWl(wl.map(function(w){
                          if(w.id!==ex.id) return w;
                          return Object.assign({}, w, {
                            grossFare:r.grossFare, tips:r.tips, bonus:r.bonus,
                            tollReimbursed:r.tollReimbursed,
                            payoutAmount:r.payoutAmount||"", payoutDate:r.payoutDate||"",
                            notes:r.notes
                          });
                        }));
                        // NOTE: weekly is reference-only, no auto-expense creation.
                      }else{
                        setWl([{
                          id:Date.now(), weekStart:r.weekStart, platform:"Uber",
                          grossFare:r.grossFare, tips:r.tips, bonus:r.bonus,
                          tollReimbursed:r.tollReimbursed,
                          payoutAmount:r.payoutAmount||"", payoutDate:r.payoutDate||"",
                          trips:"", hours:"", onlineHours:"", miles:"",
                          notes:r.notes
                        }].concat(wl));
                        // NOTE: Weekly logs are REFERENCE-ONLY — they don't affect income/expense calculations.
                        // The monthly statement is the source of truth for taxes and totals.
                        // So we do NOT auto-create platform fee or toll expenses from weekly imports —
                        // that would conflict with the monthly statement's auto-generated entries.
                      }
                      setShowPasteUber(false);setPasteUberText("");setPasteUberResult(null);
                      showToast(lang==="en"?"✓ Saved to weekly log (reference only — totals come from monthly statement)":"✓ 已保存到周记录（仅供参考 — 总账以月度报表为准）");
                    }, style: {width:"100%",background:"linear-gradient(135deg,#1A6030,#0A4020)",border:"1px solid #2A8050",borderRadius:10,padding:"12px",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer",marginTop:14} }, "✓ " , lang==="en"?"Save to Weekly Log":"保存到周记录")
                ) : null
            )
          )
        )
      ) : null

      , showOnboarding ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:"rgba(2,4,12,0.96)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500,padding:"20px"} }
          , React.createElement('div', { style: {background:C.bg2,borderRadius:18,width:"100%",maxWidth:440,border:"1px solid "+C.border,padding:"24px",boxShadow:"0 -10px 60px rgba(0,0,0,0.7)"} }
            , React.createElement('div', { style: {fontSize:22,fontWeight:900,marginBottom:6,textAlign:"center"} }, "👋 " , lang==="en"?"Welcome":"欢迎使用")
            , React.createElement('div', { style: {fontSize:14,color:C.text3,marginBottom:24,textAlign:"center",lineHeight:1.6} }, lang==="en"?"What kind of driver are you? This sets up the right income recording flow for you.":"你是哪种司机？这会决定收入记录方式。")
            , React.createElement('div', { style: {display:"flex",flexDirection:"column",gap:12,marginBottom:18} }
              , React.createElement('button', { onClick: function(){
                  setDriverType("rideshare");
                  setOnboardingDismissed(false);
                  showToast(lang==="en"?"✓ Switched to Rideshare":"✓ 已切换为网约车模式");
                  // Check what's already filled
                  var hasVeh = !!(veh.plate || veh.tlcPlate || veh.brand || veh.model);
                  var hasLic = ll.length>0;
                  var hasInc = sl.length>0 || wl.length>0 || dl.length>0;
                  if(!hasVeh && !hasLic && !hasInc){
                    // Brand-new user: run full wizard automatically
                    setSf("drawer_veh"); setWizStep(2);
                  } else if(hasVeh && hasLic && hasInc){
                    // Everything filled: nothing to do, just close
                  } else {
                    // Partially filled: ask
                    if(confirm(lang==="en"?"You have unfilled setup info. Continue filling?":"还有资料没填完，继续填写吗？")){
                      if(!hasVeh){ setSf("drawer_veh"); setWizStep(2); }
                      else if(!hasLic){ setSf("drawer_lic"); setWizStep(3); }
                      else {
                        setStf({month:curMo(),platform:"Uber",grossFare:"",tips:"",bonus:"",tollReimbursed:"",otherIncome:"",platformFee:"",trips:"",onlineHours:"",miles:"",acceptRate:"",completionRate:"",notes:""});
                        setSf("stmt"); setWizStep(4);
                      }
                    }
                  }
                }, style: {background:"linear-gradient(135deg,#0A2040,#1A3060)",border:"1px solid #2A5080",borderRadius:14,padding:"18px 16px",cursor:"pointer",textAlign:"left",color:"#fff"} }
                , React.createElement('div', { style: {display:"flex",alignItems:"center",gap:14} }
                  , React.createElement('div', { style: {fontSize:32} }, "📱")
                  , React.createElement('div', { style: {flex:1} }
                    , React.createElement('div', { style: {fontSize:16,fontWeight:800,marginBottom:3,color:C.accent2} }, lang==="en"?"Rideshare Driver":"网约车司机")
                    , React.createElement('div', { style: {fontSize:12,color:C.text3,lineHeight:1.5} }, lang==="en"?"Uber, Lyft, Via — record weekly/monthly statements":"Uber、Lyft、Via — 按周/月记录平台账单")
                  )
                  , React.createElement('div', { style: {color:C.accent2,fontSize:18} }, "→")
                )
              )
              , React.createElement('button', { onClick: function(){
                  setDriverType("taxi");
                  setOnboardingDismissed(false);
                  showToast(lang==="en"?"✓ Switched to Taxi":"✓ 已切换为出租车模式");
                  var hasVeh = !!(veh.plate || veh.tlcPlate || veh.brand || veh.model);
                  var hasLic = ll.length>0;
                  var hasInc = sl.length>0 || wl.length>0 || dl.length>0;
                  if(!hasVeh && !hasLic && !hasInc){
                    setSf("drawer_veh"); setWizStep(2);
                  } else if(hasVeh && hasLic && hasInc){
                    // all filled, just close
                  } else {
                    if(confirm(lang==="en"?"You have unfilled setup info. Continue filling?":"还有资料没填完，继续填写吗？")){
                      if(!hasVeh){ setSf("drawer_veh"); setWizStep(2); }
                      else if(!hasLic){ setSf("drawer_lic"); setWizStep(3); }
                      else {
                        setDlf({date:today(),cash:"",card:"",tips:"",trips:"",hours:"",miles:"",lease:"",notes:""});
                        setSf("daily"); setWizStep(4);
                      }
                    }
                  }
                }, style: {background:"linear-gradient(135deg,#3A2800,#1A1000)",border:"1px solid #5A3A00",borderRadius:14,padding:"18px 16px",cursor:"pointer",textAlign:"left",color:"#fff"} }
                , React.createElement('div', { style: {display:"flex",alignItems:"center",gap:14} }
                  , React.createElement('div', { style: {fontSize:32} }, "🚖")
                  , React.createElement('div', { style: {flex:1} }
                    , React.createElement('div', { style: {fontSize:16,fontWeight:800,marginBottom:3,color:"#FFB300"} }, lang==="en"?"Taxi Driver":"出租车司机")
                    , React.createElement('div', { style: {fontSize:12,color:C.text3,lineHeight:1.5} }, lang==="en"?"Yellow cab, black car — daily cash/card/tips entry":"黄牌车、黑车 — 每日现金/信用卡/小费记账")
                  )
                  , React.createElement('div', { style: {color:"#FFB300",fontSize:18} }, "→")
                )
              )
            )
            , React.createElement('button', { onClick: function(){setOnboardingDismissed(true);}, style: {width:"100%",background:"transparent",border:"none",color:C.text3,fontSize:13,padding:"10px",cursor:"pointer"} }, lang==="en"?"Skip — ask me later":"跳过 — 下次再问")
          )
        )
      ) : null

      , showRemMgr ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300,paddingBottom:"80px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 743}}
          , React.createElement('div', { style: {background:C.bg2,borderRadius:16,width:"100%",maxWidth:600,border:"1px solid "+C.border,maxHeight:"calc(85vh - 80px)",display:"flex",flexDirection:"column",overflow:"hidden"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 744}}
            , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 18px",borderBottom:"1px solid #1A2A44",background:C.bg2,flexShrink:0}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 746}}
              , React.createElement('button', { onClick: function(){setShowRemMgr(false);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 747}}, "✕")
              , React.createElement('div', { style: {fontSize:17,fontWeight:800}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 748}}, "🔔 " , T.reminder)
              , React.createElement('button', { onClick: function(){var title=rf.title==="custom"?(rf.customTitle||"").trim():rf.title;if(!title){alert(lang==="en"?"Please select or enter a title":"请选择或输入标题");return;}if(rf.type==="mile"){var trig=+rf.triggerMile;if(!trig||trig<=0){alert(lang==="en"?"Please enter trigger mileage":"请输入到期里程");return;}setReminders(reminders.concat([{id:Date.now(),type:"mile",title:title,note:rf.note||"",triggerMile:trig,intervalMile:rf.intervalMile?+rf.intervalMile:null,reminderMile:+(rf.reminderMile||"200")}]));}else{if(!rf.date){alert(lang==="en"?"Please pick a date":"请选择日期");return;}setReminders(reminders.concat([{id:Date.now(),type:"date",title:title,date:rf.date,note:rf.note||"",reminderDays:rf.reminderDays||"7"}]));}setRf({type:"date",title:"",customTitle:"",date:"",note:"",reminderDays:"7",triggerMile:"",intervalMile:"",reminderMile:"200"});setShowRemMgr(false);}, style: {background:"linear-gradient(135deg,#00D4FF,#0055FF)",border:"none",color:"#fff",fontSize:20,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 10px rgba(0,212,255,0.3)"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 749}}, "✓")
            )
            , React.createElement('div', { style: {padding:"18px 20px 52px",overflowY:"auto",flex:1}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 750}}
            , React.createElement('div', { style: {display:"flex",flexDirection:"column",gap:12,marginBottom:20}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 751}}
              // Type toggle: date vs mile
              , React.createElement('div', { style: {display:"flex",gap:6,marginBottom:2} }
                , React.createElement('button', { onClick: function(){setRf(Object.assign({},rf,{type:"date"}));}, style: {flex:1,padding:"10px 8px",borderRadius:10,border:"1px solid "+(rf.type!=="mile"?C.accent:"#2A3A54"),background:rf.type!=="mile"?C.bg3:"#0D1426",color:rf.type!=="mile"?C.accent:C.text3,fontSize:13,fontWeight:rf.type!=="mile"?800:600,cursor:"pointer"} }, "📅 " , lang==="en"?"By Date":"按日期")
                , React.createElement('button', { onClick: function(){setRf(Object.assign({},rf,{type:"mile"}));}, style: {flex:1,padding:"10px 8px",borderRadius:10,border:"1px solid "+(rf.type==="mile"?"#FFB300":"#2A3A54"),background:rf.type==="mile"?"#1A1000":"#0D1426",color:rf.type==="mile"?"#FFB300":C.text3,fontSize:13,fontWeight:rf.type==="mile"?800:600,cursor:"pointer"} }, "🛣 " , lang==="en"?"By Mileage":"按里程")
              )
              // Mile mode: presets row + current odo banner
              , rf.type==="mile" ? (function(){
                  var lo=el.filter(function(e){return e.odometer&&+e.odometer>0;}).sort(function(a,b){var c=b.date.localeCompare(a.date);return c!==0?c:(+b.odometer)-(+a.odometer);})[0];
                  var co=lo?+lo.odometer:0;
                  var presets=veh.type==="electric"?MILE_PRESETS_EV:MILE_PRESETS_GAS;
                  return React.createElement('div', {style:{display:"flex",flexDirection:"column",gap:10}}
                    , React.createElement('div', {style:{fontSize:12,color:C.text3,letterSpacing:0.5}}, lang==="en"?"QUICK PRESETS":"快速添加")
                    , React.createElement('div', {style:{display:"flex",flexWrap:"wrap",gap:6}}
                      , presets.map(function(p){return React.createElement('button',{key:p.key,onClick:function(){
                          var lbl=lang==="en"?p.lbl_en:p.lbl_zh;
                          setRf(Object.assign({},rf,{title:"custom",customTitle:lbl,triggerMile:String(co?(co+p.interval):p.interval),intervalMile:String(p.interval)}));
                        },style:{flex:"1 0 auto",minWidth:100,padding:"8px 10px",borderRadius:8,border:"1px solid #2A3A54",background:C.bg3,color:C.text2,fontSize:12,fontWeight:600,cursor:"pointer",textAlign:"left"}}, p.icon, " " , lang==="en"?p.lbl_en:p.lbl_zh, React.createElement('div',{style:{fontSize:11,color:C.text3,marginTop:2}}, "每 "+p.interval.toLocaleString()+" mi"));})
                      , React.createElement('button',{onClick:function(){setRf(Object.assign({},rf,{title:"custom",customTitle:""}));},style:{flex:"1 0 auto",minWidth:100,padding:"8px 10px",borderRadius:8,border:"1px dashed #2A3A54",background:"transparent",color:C.text3,fontSize:12,fontWeight:600,cursor:"pointer",textAlign:"left"}}, "✏️ " , lang==="en"?"Custom":"自定义")
                    )
                    , React.createElement('div', {style:{background:co>0?"#0A2030":"#2A1500",border:"1px solid "+(co>0?"#1A4060":"#5A3000"),borderRadius:8,padding:"8px 12px",fontSize:13}}
                      , co>0 ? React.createElement('span', null, "🛣 " , lang==="en"?"Current odometer: ":"当前里程：" , React.createElement('b',{style:{color:C.gold}}, co.toLocaleString()+" mi"), " " , React.createElement('span',{style:{color:C.text3,fontSize:12}}, lang==="en"?"(from latest fuel/charge)":"(取自最近充电/加油记录)"))
                        : React.createElement('span',{style:{color:"#FFB300"}}, "⚠ " , lang==="en"?"No odometer data yet — log a fuel/charge entry with mileage first":"暂无里程数据 — 请先在加油/充电记账时输入里程读数")
                    )
                  );
                })() : null
              // Title — for date mode use existing select; for mile mode just a free-text input
              , rf.type!=="mile" ? React.createElement(Field, { label: T.remTitle, value: rf.title, onChange: function(v){setRf(Object.assign({},rf,{title:v}));}, options: lang==="en"?[["","-- Please Select --"],["Renew TLC License","Renew TLC License"],["Renew FHV License","Renew FHV License"],["TLC Insurance Expiry","TLC Insurance Expiry"],["DDC Defensive Driving","DDC Defensive Driving"],["Vehicle Inspection","Vehicle Inspection"],["DMV License Renewal","DMV License Renewal"],["Health Insurance","Health Insurance"],["Quarterly Tax Payment","Quarterly Tax Payment"],["Drug Test","Drug Test"],["Fingerprint/Background","Fingerprint/Background"],["custom","✏️ Custom..."]]:[["","-- 请选择 --"],["TLC驾照更新","TLC驾照更新"],["FHV车辆执照更新","FHV车辆执照更新"],["TLC商业保险到期","TLC商业保险到期"],["DDC防御驾驶课程","DDC防御驾驶课程"],["车辆检验","车辆检验"],["DMV驾照更新","DMV驾照更新"],["健康保险到期","健康保险到期"],["季度预缴税","季度预缴税"],["验毒检查","验毒检查"],["指纹背景调查","指纹背景调查"],["custom","✏️ 自定义..."]] }) : null
              , (rf.type!=="mile" && rf.title==="custom") || (rf.type==="mile") ? React.createElement(Field, { label: lang==="en"?"Title":"标题", value: rf.customTitle||"", onChange: function(v){setRf(Object.assign({},rf,{title:"custom",customTitle:v}));}, placeholder: lang==="en"?"Enter title":"输入标题" }) : null
              // Date mode: date + days notice
              , rf.type!=="mile" ? React.createElement(Field, { label: T.remDate, type: "date", value: rf.date, onChange: function(v){setRf(Object.assign({},rf,{date:v}));} }) : null
              , rf.type!=="mile" ? React.createElement(Field, { label: T.remDays, value: rf.reminderDays, onChange: function(v){setRf(Object.assign({},rf,{reminderDays:v}));}, options: [["1",T.day1],["3",T.day3],["7",T.day7],["14",T.day14],["30",T.days30],["60",T.days60],["90",T.days90]] }) : null
              // Mile mode: trigger + interval + reminder threshold
              , rf.type==="mile" ? React.createElement(Field, { label: lang==="en"?"Trigger at (mi)":"到期里程 (mi)", type: "number", value: rf.triggerMile, onChange: function(v){setRf(Object.assign({},rf,{triggerMile:v}));}, placeholder: "e.g. 52500" }) : null
              , rf.type==="mile" ? React.createElement(Field, { label: lang==="en"?"Repeat every (mi) — optional":"间隔 (mi) — 选填，留空=一次性", type: "number", value: rf.intervalMile, onChange: function(v){setRf(Object.assign({},rf,{intervalMile:v}));}, placeholder: "e.g. 5000" }) : null
              , rf.type==="mile" ? React.createElement(Field, { label: lang==="en"?"Alert when remaining ≤ (mi)":"提前警告 (mi)", type: "number", value: rf.reminderMile, onChange: function(v){setRf(Object.assign({},rf,{reminderMile:v}));}, placeholder: "200" }) : null
              // Note (both modes)
              , React.createElement(Field, { label: T.remNote, value: rf.note, onChange: function(v){setRf(Object.assign({},rf,{note:v}));}, placeholder: T.optional })
            )
            , reminders.length>0 ? React.createElement('div', {}
              , React.createElement('div', { style: {fontSize:13,color:C.text3,marginBottom:10} }, lang==="en"?"Active Reminders":"已设置的提醒")
              , (function(){
                  var lo=el.filter(function(e){return e.odometer&&+e.odometer>0;}).sort(function(a,b){var c=b.date.localeCompare(a.date);return c!==0?c:(+b.odometer)-(+a.odometer);})[0];
                  var co=lo?+lo.odometer:0;
                  return reminders.map(function(r){
                    var isMile=r.type==="mile";
                    var col,statusText,subText;
                    if(isMile){
                      var rem=co>0?((+r.triggerMile)-co):null;
                      var thr=+(r.reminderMile||200);
                      col=rem===null?C.text3:rem<=0?C.danger:rem<=thr?"#FFB300":C.success;
                      statusText=rem===null?(lang==="en"?"No odo":"无里程"):rem<=0?((lang==="en"?"Over by ":"已超 ")+Math.abs(rem).toLocaleString()+" mi"):(rem.toLocaleString()+(lang==="en"?" mi left":" mi"));
                      subText=(lang==="en"?"Due at ":"到期: ")+(+r.triggerMile).toLocaleString()+" mi"+(r.intervalMile?(lang==="en"?" · every "+(+r.intervalMile).toLocaleString()+" mi":" · 每 "+(+r.intervalMile).toLocaleString()+" mi"):(lang==="en"?" · one-time":" · 一次性"));
                    }else{
                      var d=r.date?daysFromToday(r.date):null;
                      col=d===null?C.text3:d<0?C.danger:d<=3?"#FF6030":d<=7?"#FFB300":C.success;
                      statusText=d===null?"":d<0?(lang==="en"?"Expired":"已过期"):d===0?(lang==="en"?"Today":"今天"):d===1?(lang==="en"?"Tomorrow":"明天"):d+(lang==="en"?" days left":" 天");
                      subText=fmtDate(r.date)+" · "+(r.reminderDays||"7")+" "+(lang==="en"?"days notice":"天提前提醒");
                    }
                    return React.createElement(Card, { key: r.id, style: {padding:"10px 14px",marginBottom:8} }
                      , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"flex-start"} }
                        , React.createElement('div', { style: {flex:1} }
                          , React.createElement('div', { style: {fontSize:14,fontWeight:700,color:C.text} }, isMile?"🛣 ":"📅 ", r.title)
                          , React.createElement('div', { style: {fontSize:12,color:C.text3,marginTop:2} }, subText)
                          , r.note?React.createElement('div', { style: {fontSize:12,color:C.text3,marginTop:2} }, r.note):null
                        )
                        , React.createElement('div', { style: {textAlign:"right",display:"flex",flexDirection:"column",gap:4,alignItems:"flex-end"} }
                          , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:col} }, statusText)
                          , isMile?React.createElement('button', { onClick: function(){
                              setCmpRem(r);
                              setCmpf({currentMile:co>0?String(co):"",intervalMile:r.intervalMile?String(r.intervalMile):""});
                            }, style: {background:"#0A4020",border:"1px solid #2A8050",borderRadius:6,padding:"3px 10px",color:"#5ADA7A",cursor:"pointer",fontSize:12,fontWeight:700} }, "✓ " , lang==="en"?"Done":"完成"):null
                          , React.createElement('button', { onClick: function(){confirmAction(lang==="en"?"Delete reminder?":"删除提醒？", lang==="en"?"This reminder will be removed.":"此提醒将被移除。", function(){setReminders(reminders.filter(function(x){return x.id!==r.id;}));showToast(lang==="en"?"✓ Reminder deleted":"✓ 提醒已删除");});}, style: {background:"none",border:"1px solid #3A1A1A",borderRadius:6,padding:"2px 8px",color:C.danger,cursor:"pointer",fontSize:12} }, T.del)
                        )
                      )
                    );
                  });
                })()
            ) : React.createElement('div', { style: {fontSize:13,color:C.text3,textAlign:"center",padding:20}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 761}}, T.noData)
            )
          )
        )
      ) : null

      , cmpRem ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:"rgba(0,0,0,0.94)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:400,padding:"20px"} }
          , React.createElement('div', { style: {background:C.bg2,borderRadius:16,width:"100%",maxWidth:440,border:"1px solid "+C.border,padding:"20px"} }
            , React.createElement('div', { style: {fontSize:17,fontWeight:800,marginBottom:6} }, "✓ " , lang==="en"?"Mark Service Done":"标记保养完成")
            , React.createElement('div', { style: {fontSize:14,color:C.gold,marginBottom:14} }, "🛣 " , cmpRem.title)
            , React.createElement('div', { style: {fontSize:12,color:C.text3,marginBottom:14,lineHeight:1.5} }, lang==="en"?"Confirm and the next due mileage will be recalculated from your current odometer.":"确认后，下次到期里程会以当前里程为基准重新计算。")
            , React.createElement('div', { style: {display:"flex",flexDirection:"column",gap:12,marginBottom:18} }
              , React.createElement(Field, { label: lang==="en"?"Current odometer (mi)":"当前里程 (mi)", type: "number", value: cmpf.currentMile, onChange: function(v){setCmpf(Object.assign({},cmpf,{currentMile:v}));}, placeholder: "e.g. 51000" })
              , cmpRem.intervalMile ? React.createElement(Field, { label: lang==="en"?"Interval (mi)":"间隔 (mi)", type: "number", value: cmpf.intervalMile, onChange: function(v){setCmpf(Object.assign({},cmpf,{intervalMile:v}));}, placeholder: "e.g. 5000" }) : null
              , (function(){
                  var cm=+cmpf.currentMile, iv=+cmpf.intervalMile;
                  if(!cm||cm<=0)return null;
                  if(cmpRem.intervalMile){
                    if(!iv||iv<=0)return null;
                    return React.createElement('div', {style:{background:"#0A2030",border:"1px solid #1A4060",borderRadius:8,padding:"10px 12px",fontSize:13}}, lang==="en"?"Next due: ":"下次到期：" , React.createElement('b',{style:{color:C.success}}, (cm+iv).toLocaleString()+" mi"));
                  }
                  return React.createElement('div', {style:{background:"#1A1000",border:"1px solid #5A3000",borderRadius:8,padding:"10px 12px",fontSize:13,color:"#FFB300"}}, lang==="en"?"One-time reminder will be removed.":"一次性提醒会被删除。");
                })()
            )
            , React.createElement('div', { style: {display:"flex",gap:10} }
              , React.createElement('button', { onClick: function(){setCmpRem(null);}, style: {flex:1,padding:"12px",borderRadius:10,border:"1px solid "+C.border,background:C.bg3,color:C.text2,fontSize:14,fontWeight:700,cursor:"pointer"} }, lang==="en"?"Cancel":"取消")
              , React.createElement('button', { onClick: function(){
                  var cm=+cmpf.currentMile;
                  if(!cm||cm<=0){alert(lang==="en"?"Please enter current odometer":"请输入当前里程");return;}
                  if(cmpRem.intervalMile){
                    var iv=+cmpf.intervalMile;
                    if(!iv||iv<=0){alert(lang==="en"?"Please enter interval":"请输入间隔");return;}
                    setReminders(reminders.map(function(x){return x.id===cmpRem.id?Object.assign({},x,{triggerMile:cm+iv,intervalMile:iv}):x;}));showToast(lang==="en"?"✓ Reminder rescheduled":"✓ 提醒已重新设定");
                  }else{
                    setReminders(reminders.filter(function(x){return x.id!==cmpRem.id;}));
                  }
                  setCmpRem(null);
                }, style: {flex:1,padding:"12px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#00C46A,#008A4A)",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer"} }, "✓ " , lang==="en"?"Confirm":"确认")
            )
          )
        )
      ) : null

      , showPlatMgr ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300,paddingBottom:"80px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 767}}
          , React.createElement('div', { style: {background:C.bg2,borderRadius:16,width:"100%",maxWidth:600,border:"1px solid "+C.border,maxHeight:"calc(85vh - 80px)",display:"flex",flexDirection:"column",overflow:"hidden"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 768}}
            , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 18px",borderBottom:"1px solid #1A2A44",background:C.bg2,flexShrink:0}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 770}}
              , React.createElement('button', { onClick: function(){setShowPlatMgr(false);setNewPlat("");}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 771}}, "✕")
              , React.createElement('div', { style: {fontSize:17,fontWeight:800}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 772}}, T.platform)
              , React.createElement('button', { onClick: function(){var v=newPlat.trim();if(!v){showToast(lang==="en"?"⚠ Platform name is empty":"⚠ 平台名不能为空","warn");return;}if(allPlat.indexOf(v)>=0){showToast(lang==="en"?"⚠ Platform already exists":"⚠ 平台已存在","warn");return;}setCustPlat(custPlat.concat([v]));setNewPlat("");showToast((lang==="en"?"✓ Added: ":"✓ 已添加：")+v);}, style: {background:"linear-gradient(135deg,#00D4FF,#0055FF)",border:"none",color:"#fff",fontSize:20,cursor:"pointer",width:34,height:34,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 10px rgba(0,212,255,0.3)"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 773}}, "✓")
            )
            , React.createElement('div', { style: {padding:"18px 20px 52px",overflowY:"auto",flex:1}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 774}}
            , React.createElement('div', { style: {background:C.bg3,border:"1px solid "+C.border,borderRadius:12,padding:14,marginBottom:10} }
              , React.createElement('div', { style: {fontSize:15,fontWeight:700,color:C.text2,marginBottom:4} }, "📥 " , lang==="en"?"Uber Data Import":"Uber 数据导入")
              , React.createElement('div', { style: {fontSize:12,color:C.text3,marginBottom:10} }, lang==="en"?"Paste statement PDF text to auto-fill":"粘贴账单 PDF 文字自动填入")
              , React.createElement('button', { onClick: function(){setShowPlatMgr(false);setPasteUberText("");setPasteUberResult(null);setShowPasteUber(true);}, style: {width:"100%",background:"#0A2040",border:"1px solid #2A5080",borderRadius:10,padding:"10px 14px",color:C.accent2,fontSize:13,fontWeight:700,cursor:"pointer",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"} }
                , React.createElement('span', null, "📄 " , lang==="en"?"Weekly Statement":"周报")
                , React.createElement('span', {style:{color:"#3A6080",fontSize:14}}, "→")
              )
              , React.createElement('button', { onClick: function(){setShowPlatMgr(false);setPasteUberTaxText("");setPasteUberTaxResult(null);setShowPasteUberTax(true);}, style: {width:"100%",background:"#1A1000",border:"1px solid #3A2800",borderRadius:10,padding:"10px 14px",color:"#FFB300",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"} }
                , React.createElement('span', null, "📊 " , lang==="en"?"Monthly / Annual Summary":"月度 / 年度总结")
                , React.createElement('span', {style:{color:"#9A7A40",fontSize:14}}, "→")
              )
            )
            , React.createElement('div', { style: {background:C.bg3,border:"1px solid "+C.border,borderRadius:12,padding:14,marginBottom:14} }
              , React.createElement('div', { style: {fontSize:15,fontWeight:700,color:C.text2,marginBottom:10} }, "🏢 " , lang==="en"?"Platform List":"平台列表")
              , React.createElement('input', { value: newPlat, onChange: function(e){setNewPlat(e.target.value);}, placeholder: T.newPlatform, style: Object.assign({},IS,{marginBottom:14}) })
            , React.createElement('div', { style: {fontSize:13,color:C.text3,marginBottom:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 776}}, lang==="en"?"Default":"默认平台")
            , defPlat.map(function(p){return React.createElement('div', { key: p, style: {display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #0F1C30"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 777}}, React.createElement('span', { style: {fontSize:14,color:C.text}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 777}}, p==="其他"&&lang==="en"?"Other":p), React.createElement('button', { onClick: function(){confirmAction(lang==="en"?"Delete platform?":"删除平台？", lang==="en"?"This platform will be removed.":"此平台将被移除。", function(){setDefPlat(defPlat.filter(function(x){return x!==p;}));showToast(lang==="en"?"✓ Platform deleted":"✓ 平台已删除");});}, style: {background:"none",border:"1px solid #3A1A1A",borderRadius:6,padding:"3px 10px",color:C.danger,cursor:"pointer",fontSize:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 777}}, T.del));})
            , custPlat.length>0 ? React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 778}}, React.createElement('div', { style: {fontSize:13,color:C.text3,marginTop:16,marginBottom:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 778}}, lang==="en"?"Custom":"自定义平台"), custPlat.map(function(p){return React.createElement('div', { key: p, style: {display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #0F1C30"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 778}}, React.createElement('span', { style: {fontSize:14,color:C.text}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 778}}, p==="其他"&&lang==="en"?"Other":p), React.createElement('button', { onClick: function(){confirmAction(lang==="en"?"Delete platform?":"删除平台？", lang==="en"?"This platform will be removed.":"此平台将被移除。", function(){setCustPlat(custPlat.filter(function(x){return x!==p;}));showToast(lang==="en"?"✓ Platform deleted":"✓ 平台已删除");});}, style: {background:"none",border:"1px solid #3A1A1A",borderRadius:6,padding:"3px 10px",color:C.danger,cursor:"pointer",fontSize:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 778}}, T.del));})) : null
            )
            
            )
          )
        )
      ) : null

      , showBackup ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300,paddingBottom:"80px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 784}}
          , React.createElement('div', { style: {background:C.bg2,borderRadius:16,width:"100%",maxWidth:600,border:"1px solid "+C.border,maxHeight:"calc(90vh - 80px)",display:"flex",flexDirection:"column",overflow:"hidden"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 785}}
            , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 18px",borderBottom:"1px solid #1A2A44",background:C.bg2,flexShrink:0}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 787}}
              , React.createElement('button', { onClick: function(){setShowBackup(false);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:32,height:32,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 789}}, "✕")
              , React.createElement('div', { style: {fontSize:17,fontWeight:800}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 788}}, T.backup)
              , React.createElement('div', { style: {width:32}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 788}})
            )
            , React.createElement('div', { style: {padding:"18px 20px 48px",overflowY:"auto",flex:1}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 790}}
            , React.createElement('div', { style: {background:C.bg3,border:"1px solid "+C.border,borderRadius:12,padding:16,marginBottom:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 791}}
              , React.createElement('div', { style: {fontSize:15,fontWeight:700,color:C.text2,marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 792}}, "☁️ Google Drive "   , lang==="en"?"Auto Sync":"自动同步")
              , gUser&&accessToken ? React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 793}}
                , React.createElement('div', { style: {fontSize:13,color:C.success,marginBottom:6}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 794}}, "✓ " , gUser.email)
                , React.createElement('div', { style: {fontSize:12,color:C.text3,marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 795}}, lang==="en"?"Auto-saves after every change":"每次修改自动保存")
                , React.createElement('button', { onClick: function(){if(!confirm(lang==="en"?"Upload current data to Google Drive? This will overwrite the cloud backup.":"上传当前数据到 Google Drive？这会覆盖云端备份。"))return;var data={wl:wl,sl:sl,el:el,fl:fl,ll:ll,veh:veh,cc:cc,custGroups:custGroups,reminders:reminders,custPlat:custPlat,custBrands:custBrands,custLicTypes:custLicTypes,custLoanTypes:custLoanTypes,favNotes:favNotes,favStations:favStations,favExpenses:favExpenses,notes:notes,incGoals:incGoals,seRate:seRate,fedRate:fedRate,stateRate:stateRate,stdDed:stdDed,mtaRate:mtaRate,savedVehicles:savedVehicles,dl:dl,driverType:driverType,driver:driver};saveToDrive(accessToken,driveFileId,data);}, style: {width:"100%",background:"#0A4020",border:"1px solid #2A8050",borderRadius:10,padding:12,color:C.success,fontSize:14,fontWeight:700,cursor:"pointer",marginBottom:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 796}}, syncing?(lang==="en"?"Saving...":"保存中..."):(lang==="en"?"💾 Save Now":"💾 立即保存"))
                , React.createElement('button', { onClick: function(){requireDangerConfirm("restoreDrive", lang==="en"?"Restore from Drive":"从 Drive 恢复", lang==="en"?"This will OVERWRITE all your current local data with the cloud backup. This cannot be undone.":"此操作会用云端备份覆盖当前所有本地数据，无法撤销。", function(){loadFromDrive(accessToken);});}, style: {width:"100%",background:"#0A2040",border:"1px solid #1A5080",borderRadius:10,padding:12,color:C.accent,fontSize:14,fontWeight:700,cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 797}}, lang==="en"?"📥 Restore from Drive":"📥 从Drive恢复")
                , React.createElement('button', {
                    onClick: function(){
                      confirmAction(
                        lang==="en"?"Clean up duplicate files?":"清理重复文件？",
                        lang==="en"?"Scans your Drive for multiple copies of nyc-driver-data.json. Keeps the most recently modified, moves others to Drive Trash (recoverable for 30 days).":"扫描 Drive 上的同名文件 nyc-driver-data.json，保留最新的一份，其余移入 Drive 回收站（30 天内可恢复）。",
                        function(){cleanupDriveDuplicates(accessToken);},
                        {danger:false, confirmLabel:lang==="en"?"Clean up":"开始清理"}
                      );
                    },
                    style: {width:"100%",background:"#1A1400",border:"1px solid #5A4400",borderRadius:10,padding:12,color:"#FFB347",fontSize:13,fontWeight:600,cursor:"pointer",marginTop:8}
                  }, lang==="en"?"🧹 Clean up duplicate files":"🧹 清理 Drive 重复文件")
                
                , React.createElement('div', { style: {marginTop:14,paddingTop:14,borderTop:"1px solid "+C.border} }
                  , React.createElement('div', { style: {fontSize:12,fontWeight:700,color:C.text2,marginBottom:6} }, "📅 " , lang==="en"?"Time-shifted Snapshots":"时间快照")
                  , React.createElement('div', { style: {fontSize:12,color:C.text3,marginBottom:10,lineHeight:1.5} }, lang==="en"?"Auto-rotating snapshots on Drive — daily refreshed today, monthly at month start.":"Drive 上自动轮换快照 — 每日今天首次启动刷新，每月月初首次启动刷新。")
                  , React.createElement('div', { style: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:8} }
                    , React.createElement('div', { style: {background:C.bg3,border:"1px solid #2A3A54",borderRadius:8,padding:"10px 12px"} }
                      , React.createElement('div', { style: {fontSize:12,color:C.accent2,fontWeight:700,marginBottom:4} }, "🌅 " , lang==="en"?"Daily":"每日")
                      , React.createElement('div', { style: {fontSize:11,color:C.text3,marginBottom:8,minHeight:14} }, driveDailyModTime ? new Date(driveDailyModTime).toLocaleString() : (lang==="en"?"Not yet":"暂无"))
                      , driveDailyFileId ? React.createElement('button', { onClick: function(){requireDangerConfirm("restoreDaily", lang==="en"?"Restore from Daily Snapshot":"从每日快照恢复", lang==="en"?"This will OVERWRITE all current data with the daily snapshot from Drive. This cannot be undone.":"将用 Drive 上的每日快照覆盖当前所有数据，无法撤销。", function(){restoreFromDriveSnapshot(accessToken, driveDailyFileId, lang==="en"?"daily":"每日");});}, style: {width:"100%",background:"#0A2840",border:"1px solid #2A5080",borderRadius:6,padding:"6px",color:C.accent2,fontSize:12,fontWeight:700,cursor:"pointer"} }, "↩️ " , lang==="en"?"Restore":"恢复") : React.createElement('div', {style:{fontSize:11,color:C.text3,textAlign:"center",padding:"6px"}}, lang==="en"?"Pending":"待生成")
                    )
                    , React.createElement('div', { style: {background:C.bg3,border:"1px solid #2A3A54",borderRadius:8,padding:"10px 12px"} }
                      , React.createElement('div', { style: {fontSize:12,color:"#FFB300",fontWeight:700,marginBottom:4} }, "📆 " , lang==="en"?"Monthly":"每月")
                      , React.createElement('div', { style: {fontSize:11,color:C.text3,marginBottom:8,minHeight:14} }, driveMonthlyModTime ? new Date(driveMonthlyModTime).toLocaleString() : (lang==="en"?"Not yet":"暂无"))
                      , driveMonthlyFileId ? React.createElement('button', { onClick: function(){requireDangerConfirm("restoreMonthly", lang==="en"?"Restore from Monthly Snapshot":"从每月快照恢复", lang==="en"?"This will OVERWRITE all current data with the monthly snapshot from Drive. This cannot be undone.":"将用 Drive 上的每月快照覆盖当前所有数据，无法撤销。", function(){restoreFromDriveSnapshot(accessToken, driveMonthlyFileId, lang==="en"?"monthly":"每月");});}, style: {width:"100%",background:"#1A1000",border:"1px solid #3A2800",borderRadius:6,padding:"6px",color:"#FFB300",fontSize:12,fontWeight:700,cursor:"pointer"} }, "↩️ " , lang==="en"?"Restore":"恢复") : React.createElement('div', {style:{fontSize:11,color:C.text3,textAlign:"center",padding:"6px"}}, lang==="en"?"Pending":"待生成")
                    )
                  )
                )
                , syncStatus?React.createElement('div', { style: {fontSize:12,color:C.success,marginTop:8,textAlign:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 798}}, syncStatus):null
              ) : gUser ? React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 799}}
                , React.createElement('div', { style: {fontSize:13,color:"#FFB300",marginBottom:6}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 799}}, "⚠ " , gUser.email)
                , React.createElement('div', { style: {fontSize:12,color:C.text3,marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 799}}, lang==="en"?"Drive token expired. Reconnect to enable sync.":"Drive 令牌已失效，请重新连接以启用同步。")
                , React.createElement('button', { onClick: function(){signInWithGoogle();}, style: {width:"100%",background:"linear-gradient(135deg,#00D4FF,#0055FF)",border:"none",borderRadius:10,padding:12,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 799}}, lang==="en"?"🔄 Reconnect Drive":"🔄 重新连接 Drive")
              ) : React.createElement('div', { style: {fontSize:13,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 799}}, lang==="en"?"Sign in with Google to enable auto-sync":"登录Google后自动启用同步")
            )
            , (function(){var hasPlaceholder=el.some(function(item){return item.time==="12:00"||item.time==="08:00"||item.time==="23:59";});if(!hasPlaceholder)return null;return React.createElement('button', { onClick: function(){
                var cleaned=el.map(function(item){if(item.time==="12:00"||item.time==="08:00"||item.time==="23:59"){var c=Object.assign({},item);delete c.time;return c;}return item;});
                var changed=cleaned.filter(function(c,i){return c.time!==el[i].time;}).length;
                if(changed===0){alert(lang==="en"?"No placeholder times found":"没有占位时间需要清理");return;}
                if(!confirm((lang==="en"?"Remove placeholder times from "+changed+" entries?":"清除 "+changed+" 条记录的占位时间？")))return;
                setEl(cleaned);
                showToast((lang==="en"?"✓ Cleaned ":"✓ 已清理 ")+changed+(lang==="en"?" entries":" 条记录"));
              }, style: {width:"100%",background:C.bg3,border:"1px solid "+C.border,borderRadius:12,padding:14,marginBottom:10,textAlign:"left",cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 801}}
              , React.createElement('div', { style: {fontSize:15,fontWeight:700,color:"#FFB300",marginBottom:3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 802}}, lang==="en"?"🧹 Clear Placeholder Times":"🧹 清除占位时间")
              , React.createElement('div', { style: {fontSize:12,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 803}}, lang==="en"?"Remove imported placeholder times (12:00 / 08:00 / 23:59)":"清除导入的占位时间（12:00 / 08:00 / 23:59）")
            );}())
            // === Fix orphaned expenses (no vehicleId) ===
            , (function(){
                var orphans = el.filter(function(e){return !e.vehicleId;}).length;
                if(orphans === 0 || !veh.vehicleId) return null;
                return React.createElement('button', { onClick: function(){
                  if(!confirm(lang==="en"?
                    ("Link "+orphans+" expense entries (currently with no vehicle) to your current vehicle ("+(veh.brand||"")+" "+(veh.model||"")+" "+(veh.plate||"")+")?"):
                    ("将 "+orphans+" 笔无车辆的支出关联到当前车辆（"+(veh.brand||"")+" "+(veh.model||"")+" "+(veh.plate||"")+"）？"))) return;
                  var prevEl = el.slice();
                  var nel = el.map(function(e){
                    return e.vehicleId ? e : Object.assign({},e,{vehicleId:veh.vehicleId});
                  });
                  setEl(nel);
                  autoSave({el:nel});
                  showUndo(lang==="en"?("✓ Linked "+orphans+" entries"):("✓ 已关联 "+orphans+" 条"), {prevEl:prevEl});
                }, style: {width:"100%",background:"linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,85,255,0.05))",border:"1px solid rgba(0,212,255,0.4)",borderRadius:12,padding:14,marginBottom:10,textAlign:"left",cursor:"pointer"} }
                  , React.createElement('div', { style: {fontSize:15,fontWeight:700,color:"#00D4FF",marginBottom:3} }, "🔗 ", lang==="en"?("Link "+orphans+" Orphaned Expenses"):("关联 "+orphans+" 笔无车辆支出"))
                  , React.createElement('div', { style: {fontSize:12,color:C.text3} }, lang==="en"?
                      "These were imported when no vehicle existed. Link them to current vehicle.":
                      "这些是无车辆时导入的。关联到当前车辆。")
                );
              }())
            , React.createElement('button', { onClick: function(){if(!confirm(lang==="en"?"Download a JSON backup file to your device?":"下载 JSON 备份文件到此设备？"))return;setSyncStatus(lang==="en"?"⏳ Exporting...":"⏳ 导出中...");setTimeout(function(){try{var data={wl:wl,sl:sl,el:el,fl:fl,ll:ll,veh:veh,cc:cc,custGroups:custGroups,reminders:reminders,custPlat:custPlat,custBrands:custBrands,custLicTypes:custLicTypes,custLoanTypes:custLoanTypes,favNotes:favNotes,favStations:favStations,favExpenses:favExpenses,notes:notes,incGoals:incGoals,seRate:seRate,fedRate:fedRate,stateRate:stateRate,stdDed:stdDed,mtaRate:mtaRate,savedVehicles:savedVehicles,dl:dl,driverType:driverType,driver:driver,exported:new Date().toISOString()};var blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});var url=URL.createObjectURL(blob);var a=document.createElement("a");a.href=url;a.download="nyc-driver-backup-"+today()+".json";a.click();URL.revokeObjectURL(url);setSyncStatus(lang==="en"?"✓ Exported":"✓ 导出成功");setTimeout(function(){setSyncStatus("");},2500);}catch(err){setSyncStatus(lang==="en"?"✗ Export failed":"✗ 导出失败");setTimeout(function(){setSyncStatus("");},2500);}},100);}, style: {width:"100%",background:C.bg3,border:"1px solid "+C.border,borderRadius:12,padding:14,marginBottom:10,textAlign:"left",cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 801}}
              , React.createElement('div', { style: {fontSize:15,fontWeight:700,color:C.text2,marginBottom:3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 802}}, lang==="en"?"📤 Export JSON Backup":"📤 导出JSON备份")
              , React.createElement('div', { style: {fontSize:12,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 803}}, lang==="en"?"Download all data as JSON":"下载所有数据为JSON文件")
            )
            // === Export Excel button ===
            , React.createElement('button', { onClick: function(){
                if(!window.XLSX){ showToast(lang==="en"?"Excel library not ready, refresh app":"Excel 库未就绪，请刷新", "error"); return; }
                if(!confirm(lang==="en"?"Export all data to Excel file?":"导出所有数据到 Excel 文件？")) return;
                setSyncStatus(lang==="en"?"⏳ Exporting Excel...":"⏳ 导出 Excel 中...");
                setTimeout(function(){
                  try{
                    var wb = window.XLSX.utils.book_new();
                    // Sheet 1: Expenses
                    var expRows = el.map(function(e){
                      var c = allC[e.category];
                      return {
                        Date: e.date||"",
                        Time: e.time||"",
                        Category: c?(lang==="en"?c.label:c.label):e.category,
                        CategoryID: e.category||"",
                        Amount: +e.amount||0,
                        Quantity: +e.qty||0,
                        Odometer: +e.odometer||0,
                        Notes: e.notes||"",
                        VehicleID: e.vehicleId||""
                      };
                    });
                    if(expRows.length){
                      var ws1 = window.XLSX.utils.json_to_sheet(expRows);
                      window.XLSX.utils.book_append_sheet(wb, ws1, "Expenses");
                    }
                    // Sheet 2: Monthly Statements
                    var slRows = sl.map(function(s){
                      return {
                        Month: s.month||"", Platform: s.platform||"",
                        GrossFare: +s.grossFare||0, Tips: +s.tips||0, Bonus: +s.bonus||0,
                        TollReimbursed: +s.tollReimbursed||0, OtherIncome: +s.otherIncome||0,
                        PlatformFee: +s.platformFee||0,
                        PayoutAmount: +s.payoutAmount||0, PayoutDate: s.payoutDate||"",
                        Trips: +s.trips||0, OnlineHours: +s.onlineHours||0, Miles: +s.miles||0,
                        Notes: s.notes||""
                      };
                    });
                    if(slRows.length){
                      var ws2 = window.XLSX.utils.json_to_sheet(slRows);
                      window.XLSX.utils.book_append_sheet(wb, ws2, "Monthly_Stmts");
                    }
                    // Sheet 3: Weekly Logs
                    var wlRows = wl.map(function(w){
                      return {
                        WeekStart: w.weekStart||"", Platform: w.platform||"",
                        GrossFare: +w.grossFare||0, Tips: +w.tips||0, Bonus: +w.bonus||0,
                        TollReimbursed: +w.tollReimbursed||0,
                        PayoutAmount: +w.payoutAmount||0, PayoutDate: w.payoutDate||"",
                        Trips: +w.trips||0, Hours: +w.hours||0, OnlineHours: +w.onlineHours||0, Miles: +w.miles||0,
                        Notes: w.notes||""
                      };
                    });
                    if(wlRows.length){
                      var ws3 = window.XLSX.utils.json_to_sheet(wlRows);
                      window.XLSX.utils.book_append_sheet(wb, ws3, "Weekly_Logs");
                    }
                    // Sheet 4: Daily Logs
                    var dlRows = dl.map(function(d){
                      return {
                        Date: d.date||"", Mode: d.mode||"taxi",
                        Cash: +d.cash||0, Card: +d.card||0, Tips: +d.tips||0,
                        GrossFare: +d.grossFare||0, Bonus: +d.bonus||0, TollReimbursed: +d.tollReimbursed||0,
                        Lease: +d.lease||0, Hours: +d.hours||0, Miles: +d.miles||0,
                        Notes: d.notes||""
                      };
                    });
                    if(dlRows.length){
                      var ws4 = window.XLSX.utils.json_to_sheet(dlRows);
                      window.XLSX.utils.book_append_sheet(wb, ws4, "Daily_Logs");
                    }
                    // Sheet 5: Summary
                    var summary = [
                      {Field:"Export Date", Value:new Date().toISOString().slice(0,10)},
                      {Field:"Vehicle", Value:[veh.year,veh.brand,veh.model].filter(Boolean).join(" ")+(veh.plate?" ["+veh.plate+"]":"")},
                      {Field:"Driver", Value:driver||""},
                      {Field:"Total Expenses Records", Value:el.length},
                      {Field:"Total Monthly Stmts", Value:sl.length},
                      {Field:"Total Weekly Logs", Value:wl.length},
                      {Field:"Total Daily Logs", Value:dl.length}
                    ];
                    var ws5 = window.XLSX.utils.json_to_sheet(summary);
                    window.XLSX.utils.book_append_sheet(wb, ws5, "Summary");
                    // Write & download
                    window.XLSX.writeFile(wb, "nyc-driver-"+today()+".xlsx");
                    setSyncStatus(lang==="en"?"✓ Excel exported":"✓ Excel 已导出");
                    setTimeout(function(){setSyncStatus("");},2500);
                  }catch(err){
                    setSyncStatus(lang==="en"?"✗ Excel export failed":"✗ Excel 导出失败");
                    setTimeout(function(){setSyncStatus("");},2500);
                    showToast("Error: "+err.message, "error");
                  }
                },100);
              }, style: {width:"100%",background:"linear-gradient(135deg,#0A2A1A,#0A1A0A)",border:"1px solid #2A6040",borderRadius:12,padding:14,marginBottom:10,textAlign:"left",cursor:"pointer"}}
              , React.createElement('div', {style:{fontSize:15,fontWeight:700,color:"#5ADA7A",marginBottom:3}}, lang==="en"?"📊 Export Excel":"📊 导出 Excel")
              , React.createElement('div', {style:{fontSize:12,color:"#7AB890"}}, lang==="en"?"5 sheets: Expenses, Monthly, Weekly, Daily, Summary":"5 个 sheet：支出、月报、周报、日记、汇总")
            )
            // === Import Excel/CSV button ===
            , React.createElement('div', {style:{background:C.bg3,border:"1px solid "+C.border,borderRadius:12,padding:14,marginBottom:10}}
              , React.createElement('div', {style:{fontSize:15,fontWeight:700,color:C.text2,marginBottom:6}}, lang==="en"?"📥 Import Excel/CSV":"📥 导入 Excel/CSV")
              , React.createElement('div', {style:{fontSize:11,color:C.text3,marginBottom:8,lineHeight:1.5}}
                , lang==="en"?"Import expenses from any spreadsheet. Required columns: Date, Amount. Optional: Category, Notes, Odometer, Quantity. App will let you map columns.":"从任何表格导入支出。必填列：Date 日期、Amount 金额。可选：Category 类别、Notes 备注、Odometer 里程、Quantity 数量。会让你映射列。")
              , React.createElement('input', {
                  type:"file",
                  accept:".xlsx,.xls,.csv,.tsv",
                  onChange:function(e){
                    var f=e.target.files&&e.target.files[0]; if(!f) return;
                    var inputEl = e.target;
                    if(!window.XLSX){ showToast(lang==="en"?"Excel library not ready":"Excel 库未就绪","error"); inputEl.value=""; return; }
                    var reader=new FileReader();
                    reader.onload=function(ev){
                      try{
                        var data = new Uint8Array(ev.target.result);
                        var wb = window.XLSX.read(data, {type:"array", cellDates:true});
                        var firstSheet = wb.SheetNames[0];
                        var rows = window.XLSX.utils.sheet_to_json(wb.Sheets[firstSheet], {raw:false, defval:""});
                        if(rows.length === 0){ showToast(lang==="en"?"Empty file":"文件为空","warn"); inputEl.value=""; return; }
                        // Detect columns from first row
                        var cols = Object.keys(rows[0]);
                        // Try auto-mapping
                        var find=function(patterns){return cols.find(function(c){return patterns.some(function(p){return p.test(c);});});};
                        var dateCol = find([/^date$/i, /日期/, /^when$/i]);
                        var amtCol = find([/^amount$/i, /金额/, /^cost$/i, /^price$/i, /^total$/i, /^value$/i]);
                        var catCol = find([/^category(id)?$/i, /类别/, /^type$/i, /^kind$/i]);
                        var noteCol = find([/^notes?$/i, /^description$/i, /^memo$/i, /备注/, /说明/]);
                        var odoCol = find([/^odometer$/i, /里程/, /^miles$/i, /^mileage$/i]);
                        var qtyCol = find([/^quantity$/i, /数量/, /^qty$/i, /^volume$/i, /^liters?$/i, /^gallons?$/i, /^kwh$/i]);
                        if(!dateCol || !amtCol){
                          showToast(lang==="en"?"Need at least Date + Amount columns":"至少需要 Date 和 Amount 列","error");
                          inputEl.value=""; return;
                        }
                        // Parse rows into entry candidates
                        var entries = [];
                        rows.forEach(function(r,i){
                          var dRaw = r[dateCol];
                          var d = "";
                          if(dRaw instanceof Date){
                            d = dRaw.toISOString().slice(0,10);
                          } else if(typeof dRaw === "string" && dRaw){
                            // Try various formats
                            var dStr = dRaw.trim();
                            // YYYY-MM-DD
                            if(/^\d{4}-\d{2}-\d{2}/.test(dStr)){ d=dStr.slice(0,10); }
                            // MM/DD/YYYY or M/D/YYYY
                            else if(/^\d{1,2}\/\d{1,2}\/\d{4}/.test(dStr)){
                              var p=dStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
                              d=p[3]+"-"+(p[1].length<2?"0"+p[1]:p[1])+"-"+(p[2].length<2?"0"+p[2]:p[2]);
                            }
                            // MM-DD-YYYY
                            else if(/^\d{1,2}-\d{1,2}-\d{4}/.test(dStr)){
                              var p2=dStr.match(/^(\d{1,2})-(\d{1,2})-(\d{4})/);
                              d=p2[3]+"-"+(p2[1].length<2?"0"+p2[1]:p2[1])+"-"+(p2[2].length<2?"0"+p2[2]:p2[2]);
                            }
                          }
                          var amtRaw = r[amtCol];
                          var amt = parseFloat(String(amtRaw).replace(/[$,\s]/g,""));
                          if(!d || !amt || isNaN(amt) || amt <= 0) return;
                          // Category mapping (best effort)
                          var catId = "other";
                          if(catCol && r[catCol]){
                            var cv = String(r[catCol]).toLowerCase().trim();
                            // First: exact id match
                            if(allC[cv]){ catId = cv; }
                            else {
                              // Match by label
                              var foundKey = Object.keys(allC).find(function(k){
                                return allC[k].label.toLowerCase() === cv ||
                                       allC[k].label.toLowerCase().indexOf(cv) >= 0 ||
                                       cv.indexOf(allC[k].label.toLowerCase()) >= 0;
                              });
                              if(foundKey) catId = foundKey;
                              // Heuristics for common terms
                              else if(/charg|electric/i.test(cv)) catId = "charging";
                              else if(/gas|fuel|petrol/i.test(cv)) catId = "fuel";
                              else if(/park/i.test(cv)) catId = "parking";
                              else if(/toll/i.test(cv)) catId = "toll";
                              else if(/insur/i.test(cv)) catId = "insurance";
                              else if(/loan|payment/i.test(cv)) catId = "carloan";
                              else if(/wash/i.test(cv)) catId = "carwash";
                              else if(/phone|verizon|t-mobile/i.test(cv)) catId = "phonebill";
                              else if(/coffee|starbucks|dunkin/i.test(cv)) catId = "coffee";
                              else if(/meal|food|lunch/i.test(cv)) catId = "meals";
                              else if(/repair|maint/i.test(cv)) catId = "maint";
                              else if(/dmv/i.test(cv)) catId = "dmv";
                              else if(/tlc|fhv/i.test(cv)) catId = "fhv";
                            }
                          }
                          entries.push({
                            date: d,
                            category: catId,
                            categoryLabel: allC[catId]?allC[catId].label:catId,
                            amount: amt,
                            odometer: odoCol&&r[odoCol] ? parseFloat(String(r[odoCol]).replace(/[,\s]/g,"")) || 0 : 0,
                            qty: qtyCol&&r[qtyCol] ? parseFloat(String(r[qtyCol]).replace(/[,\s]/g,"")) || 0 : 0,
                            notes: noteCol&&r[noteCol] ? String(r[noteCol]) : ""
                          });
                        });
                        if(entries.length === 0){
                          showToast(lang==="en"?"No valid rows found (need Date + Amount > 0)":"没有有效行（需要日期 + 金额 > 0）","error");
                          inputEl.value=""; return;
                        }
                        // Reuse Fuelio import modal!
                        var totalCost = entries.reduce(function(s,e){return s+e.amount;},0);
                        var byCategory = {};
                        entries.forEach(function(e){byCategory[e.category]=(byCategory[e.category]||0)+e.amount;});
                        var sel = {};
                        entries.forEach(function(_,i){sel[i]=true;});
                        setFuelioSelected(sel);
                        setFuelioImportResult({
                          isEv: false,
                          period: lang==="en"?"Excel/CSV import":"Excel/CSV 导入",
                          entries: entries,
                          stats: {count: entries.length, totalCost: totalCost, byCategory: byCategory},
                          error: null
                        });
                        setShowFuelioImport(true);
                        setShowBackup(false);
                        showToast(lang==="en"?"✓ "+entries.length+" rows parsed":"✓ 解析 "+entries.length+" 行","success");
                        inputEl.value="";
                      }catch(err){
                        showToast(lang==="en"?"Import failed: "+err.message:"导入失败: "+err.message,"error");
                        inputEl.value="";
                      }
                    };
                    reader.readAsArrayBuffer(f);
                  },
                  style: {width:"100%",fontSize:13,padding:8,background:C.bg2,border:"1px solid "+C.border,borderRadius:8,color:C.text}
                })
            )
            , React.createElement('div', { style: {background:C.bg3,border:"1px solid "+C.border,borderRadius:12,padding:14,marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 805}}
              , React.createElement('div', { style: {fontSize:15,fontWeight:700,color:C.text2,marginBottom:6}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 806}}, lang==="en"?"📥 Restore from File":"📥 从文件恢复")
              , React.createElement('input', { type: "file", accept: ".json", onChange: function(e){var file=e.target.files[0];if(!file)return;var inputEl=e.target;var reader=new FileReader();reader.onload=function(ev){var fileText=ev.target.result;requireDangerConfirm("restoreFile", lang==="en"?"Restore from File":"从文件恢复", lang==="en"?"⚠️ DANGER: This will OVERWRITE ALL your current data (notes, expenses, income, everything) with this file. The current state will be saved to a backup slot — you can undo within this session via the \"Undo Restore\" button.":"⚠️ 危险操作：将用此文件完全覆盖当前所有数据（记事本、收入、支出等等）。当前状态会自动保存到备份槽，本次会话内可通过「↩️ 撤销恢复」按钮回滚。", function(){setSyncStatus(lang==="en"?"⏳ Restoring...":"⏳ 恢复中...");setTimeout(function(){try{
                  // SAFETY NET: snapshot ALL current data before overwriting
                  try {
                    var snapshot = {
                      timestamp: new Date().toISOString(),
                      label: lang==="en"?"Pre-restore snapshot":"恢复前快照",
                      data: {
                        wl: wl, sl: sl, el: el, fl: fl, ll: ll, veh: veh, cc: cc,
                        custGroups: custGroups, reminders: reminders,
                        custPlat: custPlat, custBrands: custBrands,
                        custLicTypes: custLicTypes, custLoanTypes: custLoanTypes,
                        favNotes: favNotes, notes: notes,
                        incGoal: incGoal, seRate: seRate, fedRate: fedRate,
                        stateRate: stateRate, stdDed: stdDed, mtaRate: mtaRate,
                        savedVehicles: savedVehicles, dl: dl, driverType: driverType
                      }
                    };
                    localStorage.setItem("nyc_pre_restore_backup", JSON.stringify(snapshot));
                  } catch(e) {}
                  var data=JSON.parse(fileText);if(data.wl)setWl(data.wl);if(data.sl)setSl(data.sl);if(data.el)setEl(data.el);if(data.fl)setFl(data.fl);if(data.ll)setLl(data.ll);if(data.veh)setVeh(data.veh);if(data.driver)setDriver(data.driver);if(data.cc)setCc(data.cc);if(data.custGroups)setCustGroups(data.custGroups);if(data.reminders)setReminders(data.reminders);if(data.custPlat)setCustPlat(data.custPlat);if(data.custBrands)setCustBrands(data.custBrands);if(data.custLicTypes)setCustLicTypes(data.custLicTypes);if(data.custLoanTypes)setCustLoanTypes(data.custLoanTypes);if(data.favNotes)setFavNotes(data.favNotes);if(data.favStations)setFavStations(data.favStations);if(data.notes)setNotes(data.notes);if(data.incGoals && typeof data.incGoals === "object") setIncGoals(data.incGoals);
        else if(typeof data.incGoal!=="undefined" && data.incGoal!=="") {
          var d=new Date(),cm=d.getFullYear()+"-"+(d.getMonth()+1<10?"0":"")+(d.getMonth()+1);
          var g={}; g[cm]=String(data.incGoal); setIncGoals(g);
        }if(typeof data.seRate==="number")setSeRate(data.seRate);if(typeof data.fedRate==="number")setFedRate(data.fedRate);if(typeof data.stateRate==="number")setStateRate(data.stateRate);if(typeof data.stdDed==="number")setStdDed(data.stdDed);if(typeof data.mtaRate==="number")setMtaRate(data.mtaRate);if(Array.isArray(data.savedVehicles))setSavedVehicles(data.savedVehicles);if(Array.isArray(data.dl))setDl(data.dl);if(data.driverType==="rideshare"||data.driverType==="taxi")setDriverType(data.driverType);setSyncStatus(lang==="en"?"✓ Restored":"✓ 恢复成功");setTimeout(function(){setSyncStatus("");},2500);alert(lang==="en"?"Data restored!":"数据恢复成功！");}catch(err){setSyncStatus(lang==="en"?"✗ Restore failed":"✗ 恢复失败");setTimeout(function(){setSyncStatus("");},2500);alert(lang==="en"?"Invalid file":"文件格式错误");}inputEl.value="";},100);});};reader.readAsText(file);}, style: {width:"100%",background:C.bg3,border:"1px solid #2A3A54",borderRadius:8,padding:"8px",color:C.text,fontSize:13,cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 807}} )
            )
            , (function(){
                var snapshot = null;
                try {
                  var raw = localStorage.getItem("nyc_pre_restore_backup");
                  if(raw) snapshot = JSON.parse(raw);
                } catch(e) {}
                if(!snapshot || !snapshot.data) return null;
                var d = snapshot.data;
                var stats = (d.el?d.el.length:0)+" exp · "+(d.notes?d.notes.length:0)+" notes · "+(d.sl?d.sl.length:0)+" stmts · "+(d.wl?d.wl.length:0)+" weeks";
                var ts = snapshot.timestamp ? new Date(snapshot.timestamp).toLocaleString() : "?";
                return React.createElement('div', { style: {background:"#0A2018",border:"1px solid #2A6040",borderRadius:12,padding:14,marginBottom:10} }
                  , React.createElement('div', { style: {fontSize:14,fontWeight:700,color:"#5ADA7A",marginBottom:4} }, "↩️ " , lang==="en"?"Undo Last Restore":"撤销最近一次恢复")
                  , React.createElement('div', { style: {fontSize:12,color:C.text3,marginBottom:6,lineHeight:1.5} }, lang==="en"?"You can roll back to the data that existed before your last \"Restore from File\" action.":"可以回滚到上次「从文件恢复」之前的数据状态。")
                  , React.createElement('div', { style: {fontSize:12,color:C.text2,marginBottom:10,padding:"6px 10px",background:C.bg3,borderRadius:6} }, "🕐 ", ts, React.createElement('br'), "📊 ", stats)
                  , React.createElement('div', { style: {display:"flex",gap:6} }
                    , React.createElement('button', { onClick: function(){
                        if(!confirm(lang==="en"?"Roll back to pre-restore data? Your CURRENT data will be replaced with the snapshot above.":"回滚到恢复前的数据？当前数据会被上面快照覆盖。"))return;
                        if(d.wl)setWl(d.wl); if(d.sl)setSl(d.sl); if(d.el)setEl(d.el); if(d.fl)setFl(d.fl);
                        if(d.ll)setLl(d.ll); if(d.veh)setVeh(d.veh);if(d.driver)setDriver(d.driver); if(d.cc)setCc(d.cc);
                        if(d.custGroups)setCustGroups(d.custGroups); if(d.reminders)setReminders(d.reminders);
                        if(d.custPlat)setCustPlat(d.custPlat); if(d.custBrands)setCustBrands(d.custBrands);
                        if(d.custLicTypes)setCustLicTypes(d.custLicTypes); if(d.custLoanTypes)setCustLoanTypes(d.custLoanTypes);
                        if(d.favNotes)setFavNotes(d.favNotes); if(Array.isArray(d.favExpenses))setFavExpenses(d.favExpenses); if(d.notes)setNotes(d.notes);
                        if(typeof d.incGoal!=="undefined")setIncGoal(d.incGoal);
                        if(typeof d.seRate==="number")setSeRate(d.seRate);
                        if(typeof d.fedRate==="number")setFedRate(d.fedRate);
                        if(typeof d.stateRate==="number")setStateRate(d.stateRate);
                        if(typeof d.stdDed==="number")setStdDed(d.stdDed);
                        if(typeof d.mtaRate==="number")setMtaRate(d.mtaRate);
                        if(Array.isArray(d.savedVehicles))setSavedVehicles(d.savedVehicles);
                        if(Array.isArray(d.dl))setDl(d.dl);
                        if(d.driverType==="rideshare"||d.driverType==="taxi")setDriverType(d.driverType);
                        try{localStorage.removeItem("nyc_pre_restore_backup");}catch(e){}
                        showToast(lang==="en"?"✓ Rolled back":"✓ 已回滚");
                      }, style: {flex:1,background:"linear-gradient(135deg,#1A6030,#0A4020)",border:"1px solid #2A8050",borderRadius:8,padding:"10px",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"} }, "↩️ " , lang==="en"?"Roll Back":"回滚")
                    , React.createElement('button', { onClick: function(){
                        if(!confirm(lang==="en"?"Discard the snapshot? You won\'t be able to undo the last restore anymore.":"丢弃快照？以后将无法撤销上次恢复。"))return;
                        try{localStorage.removeItem("nyc_pre_restore_backup");}catch(e){}
                        forceRerender();
                      }, style: {background:"none",border:"1px solid #3A1A1A",borderRadius:8,padding:"10px 14px",color:C.danger,fontSize:12,cursor:"pointer"} }, "✕ " , lang==="en"?"Discard":"丢弃")
                  )
                );
              }())
            , React.createElement('div', { style: {background:C.bg3,border:"1px solid "+C.border,borderRadius:12,padding:14,marginBottom:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 808}}
              , React.createElement('div', { style: {fontSize:15,fontWeight:700,color:C.text2,marginBottom:4}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 808}}, lang==="en"?"➕ Smart Import":"➕ 智能导入")
              , React.createElement('div', { style: {fontSize:12,color:C.text3,marginBottom:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 808}}, lang==="en"?"Add new + update existing (no duplicates)":"添加新数据 + 更新已有数据（避免重复）")
              , React.createElement('input', { type: "file", accept: ".json", onChange: function(e){var file=e.target.files[0];if(!file)return;var inputEl=e.target;var reader=new FileReader();reader.onload=function(ev){var fileText=ev.target.result;requireDangerConfirm("mergeImport", lang==="en"?"Smart Import":"智能导入", lang==="en"?"This will add new entries and update existing ones (matched by month/date+category+amount). Duplicates are skipped automatically.":"将添加新数据并更新已有数据（按月份/日期+类别+金额匹配）。重复数据会自动跳过。", function(){setSyncStatus(lang==="en"?"⏳ Importing...":"⏳ 导入中...");setTimeout(function(){try{
                var data=JSON.parse(fileText);
                var stats={elAdd:0,elSkip:0,slAdd:0,slUpd:0,wlAdd:0,wlUpd:0};
                // sl: match by month+platform → update or insert
                if(data.sl&&data.sl.length){
                  var newSl=sl.slice();
                  data.sl.forEach(function(item){var idx=newSl.findIndex(function(x){return x.month===item.month&&x.platform===item.platform;});if(idx>=0){newSl[idx]=Object.assign({},newSl[idx],item);stats.slUpd++;}else{newSl.push(item);stats.slAdd++;}});
                  setSl(newSl);
                }
                // wl: match by weekStart+platform → update or insert
                if(data.wl&&data.wl.length){
                  var newWl=wl.slice();
                  data.wl.forEach(function(item){var idx=newWl.findIndex(function(x){return x.weekStart===item.weekStart&&x.platform===item.platform;});if(idx>=0){newWl[idx]=Object.assign({},newWl[idx],item);stats.wlUpd++;}else{newWl.push(item);stats.wlAdd++;}});
                  setWl(newWl);
                }
                // el: match by date+category+amount+notes → skip if exists, else add
                if(data.el&&data.el.length){
                  var newEl=el.slice();
                  data.el.forEach(function(item){var key=(item.date||"")+"|"+(item.category||"")+"|"+((+item.amount||0).toFixed(2))+"|"+(item.notes||"")+"|"+(item.statementMonth||"");var exists=newEl.some(function(x){var xk=(x.date||"")+"|"+(x.category||"")+"|"+((+x.amount||0).toFixed(2))+"|"+(x.notes||"")+"|"+(x.statementMonth||"");return xk===key;});if(exists){stats.elSkip++;}else{newEl.push(item);stats.elAdd++;}});
                  setEl(newEl);
                }
                // fl/ll/reminders/notes: simple concat for now (low duplication risk)
                if(data.fl&&data.fl.length)setFl(fl.concat(data.fl));
                if(data.ll&&data.ll.length)setLl(ll.concat(data.ll));
                if(data.reminders&&data.reminders.length)setReminders(reminders.concat(data.reminders));
                if(data.notes&&data.notes.length)setNotes(notes.concat(data.notes));
                var msg=lang==="en"
                  ?("Import complete:\n• Statements: "+stats.slAdd+" added, "+stats.slUpd+" updated\n• Weekly logs: "+stats.wlAdd+" added, "+stats.wlUpd+" updated\n• Expenses: "+stats.elAdd+" added, "+stats.elSkip+" skipped (duplicates)")
                  :("导入完成：\n• 月度账单：新增 "+stats.slAdd+"，更新 "+stats.slUpd+"\n• 周记录：新增 "+stats.wlAdd+"，更新 "+stats.wlUpd+"\n• 支出：新增 "+stats.elAdd+"，跳过重复 "+stats.elSkip);
                setSyncStatus(lang==="en"?"✓ Imported":"✓ 导入成功");setTimeout(function(){setSyncStatus("");},2500);
                alert(msg);
              }catch(err){setSyncStatus(lang==="en"?"✗ Import failed":"✗ 导入失败");setTimeout(function(){setSyncStatus("");},2500);alert((lang==="en"?"Error: ":"错误：")+err.message);}inputEl.value="";},100);});};reader.readAsText(file);}, style: {width:"100%",background:C.bg3,border:"1px solid #2A3A54",borderRadius:8,padding:"8px",color:C.text,fontSize:13,cursor:"pointer"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 808}} )
            )

            // === DANGER ZONE: Reset all app data (collapsible — closed by default) ===
            , React.createElement('div', {style:{marginTop:24,paddingTop:16,borderTop:"1px solid "+C.border}}
              , React.createElement('button', {
                  onClick: function(){setDangerOpen(!dangerOpen);},
                  style:{
                    width:"100%",
                    background:"none",
                    border:"none",
                    fontSize:FS.sm+1,
                    color:C.text3,
                    fontWeight:600,
                    letterSpacing:0.5,
                    padding:"8px 4px",
                    cursor:"pointer",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"space-between",
                    textAlign:"left"
                  }
                }
                , React.createElement('span', null, "⚠️ ", lang==="en"?"Danger Zone":"危险操作")
                , React.createElement('span', {style:{fontSize:FS.sm,opacity:0.6}}, dangerOpen?"▼":"▶")
              )
              , dangerOpen ? React.createElement('div', {style:{background:"#1A0808",border:"1px solid #5A2020",borderRadius:RADIUS.md,padding:14,marginTop:8}}
                , React.createElement('div', {style:{fontSize:FS.md+1,fontWeight:700,color:"#FF8855",marginBottom:6}}
                  , "🗑️ ", lang==="en"?"Clear Everything":"清空全部数据")
                , React.createElement('div', {style:{fontSize:FS.sm,color:"#D08070",lineHeight:1.6,marginBottom:10}}
                  , lang==="en"?
                    "Erases all data from this device, AND signals all your other devices (same Google account) to auto-clear next time they open. Cannot be undone — make a JSON backup first.":
                    "清空本设备的所有数据，并通知你其他设备（同一 Google 账号）下次打开时自动清空。无法撤销 — 请先导出 JSON 备份。"
                )
                , React.createElement('button', {
                    onClick: function(){
                      var step1 = lang==="en"?
                        "⚠️ FINAL WARNING\n\nThis will:\n- Erase all data on THIS device\n- Auto-clear other devices (same Google account) next time they open\n- Make a JSON backup first if you want to recover\n\nProceed?":
                        "⚠️ 最后警告\n\n此操作：\n- 清空本设备所有数据\n- 通知其他设备（同一 Google 账号）下次打开时自动清空\n- 想要可恢复，请先导出 JSON 备份\n\n继续？";
                      if(!confirm(step1)) return;
                      var input = prompt(lang==="en"?"Type DELETE to confirm:":"输入 DELETE 确认：");
                      if(input === null){showToast(lang==="en"?"Cancelled":"已取消","info");return;}
                      var inputClean = (input||"").trim().toUpperCase();
                      if(inputClean !== "DELETE"){showToast(lang==="en"?"Cancelled — must type DELETE":"已取消 — 必须输入 DELETE","warn");return;}
                      setSyncStatus(lang==="en"?"⏳ Clearing...":"⏳ 清空中...");
                      // 1) Write TOMBSTONE to Drive (other devices will detect this and auto-clear)
                      var writeTombstone = function(callback){
                        if(!gUser || !accessToken || !driveFileId){ callback(); return; }
                        try{
                          var tombstone = JSON.stringify({
                            _tombstone: true,
                            clearedAt: new Date().toISOString(),
                            clearedBy: (gUser && gUser.email) || "unknown"
                          });
                          var bound = "-------nycdriver-clear";
                          var meta = JSON.stringify({name:"nyc-driver-data.json", mimeType:"application/json"});
                          var body = "--"+bound+"\r\nContent-Type: application/json\r\n\r\n"+meta+"\r\n--"+bound+"\r\nContent-Type: application/json\r\n\r\n"+tombstone+"\r\n--"+bound+"--";
                          fetch("https://www.googleapis.com/upload/drive/v3/files/"+driveFileId+"?uploadType=multipart", {
                            method:"PATCH",
                            headers:{Authorization:"Bearer "+accessToken,"Content-Type":"multipart/related; boundary="+bound},
                            body: body
                          }).then(function(){
                            // Also write tombstone to daily/monthly snapshots so they don't restore old data
                            var snapshots = [
                              {fid:driveDailyFileId, name:"nyc-driver-data-daily.json"},
                              {fid:driveMonthlyFileId, name:"nyc-driver-data-monthly.json"}
                            ].filter(function(s){return s.fid;});
                            if(snapshots.length === 0){ callback(); return; }
                            var done = 0;
                            snapshots.forEach(function(s){
                              var snapMeta = JSON.stringify({name:s.name, mimeType:"application/json"});
                              var snapBody = "--"+bound+"\r\nContent-Type: application/json\r\n\r\n"+snapMeta+"\r\n--"+bound+"\r\nContent-Type: application/json\r\n\r\n"+tombstone+"\r\n--"+bound+"--";
                              fetch("https://www.googleapis.com/upload/drive/v3/files/"+s.fid+"?uploadType=multipart", {
                                method:"PATCH",
                                headers:{Authorization:"Bearer "+accessToken,"Content-Type":"multipart/related; boundary="+bound},
                                body: snapBody
                              }).then(function(){done++;if(done===snapshots.length)callback();}).catch(function(){done++;if(done===snapshots.length)callback();});
                            });
                          }).catch(function(){ callback(); });
                        }catch(e){ callback(); }
                      };
                      writeTombstone(function(){
                        try{
                          // Clear ALL localStorage (nuclear)
                          try{ localStorage.clear(); }catch(e){}
                          try{ sessionStorage.clear(); }catch(e){}
                          if(window.indexedDB && indexedDB.databases){
                            try{ indexedDB.databases().then(function(dbs){dbs.forEach(function(db){try{indexedDB.deleteDatabase(db.name);}catch(e){}});}).catch(function(){}); }catch(e){}
                          }
                          if(navigator.serviceWorker && navigator.serviceWorker.getRegistrations){
                            try{ navigator.serviceWorker.getRegistrations().then(function(regs){regs.forEach(function(r){try{r.unregister();}catch(e){}});}).catch(function(){}); }catch(e){}
                          }
                          if(window.caches && caches.keys){
                            try{ caches.keys().then(function(names){names.forEach(function(n){try{caches.delete(n);}catch(e){}});}).catch(function(){}); }catch(e){}
                          }
                        }catch(e){}
                        setTimeout(function(){
                          window.location.replace(window.location.pathname + "?reset=" + Date.now());
                        }, 1000);
                      });
                    },
                    style:{width:"100%",background:"linear-gradient(135deg,#5A1010,#2A0808)",border:"1px solid #8A2020",color:"#FF8866",fontSize:FS.md+1,fontWeight:800,padding:"12px",borderRadius:RADIUS.sm,cursor:"pointer"}
                  }, "🗑️ ", lang==="en"?"Clear Everything":"清空全部数据")
              ) : null
            )

            )
          )
        )
      ) : null

      , reportData ? (
        React.createElement('div', { style: {position:"fixed",inset:0,background:C.bg,zIndex:300,overflowY:"auto"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 836}}
          , React.createElement('div', { style: {background:C.bg2,padding:"18px",borderBottom:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 838}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 839}}, React.createElement('div', { style: {fontSize:16,fontWeight:800}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 839}}, reportData.type==="exp"?(lang==="en"?"💸 Expense Detail":"💸 支出明细"):(lang==="en"?"📊 Financial Report":"📊 财务报告")), React.createElement('div', { style: {fontSize:13,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 839}}, reportData.label))
              , React.createElement('div', { style: {display:"flex",gap:8}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 840}}
                , React.createElement('button', { onClick: function(){
                    var rd=reportData;var esc=function(s){return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
                    var html='<!DOCTYPE html><html><head><meta charset=utf-8><title>'+(rd.type==="exp"?"Expense Detail":"Financial Report")+' '+esc(rd.label)+'</title>';
                    html+='<style>'+
                    '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap");'+
                    '*{box-sizing:border-box;}'+
                    'body{font-family:"Inter",-apple-system,Helvetica,Arial,sans-serif;max-width:800px;margin:30px auto;padding:30px 35px;color:#1a1a1a;line-height:1.6;background:#fff;}'+
                    'h1{font-size:26px;font-weight:900;color:#0f172a;border-bottom:4px solid #2563eb;padding-bottom:10px;margin-bottom:4px;letter-spacing:-0.4px;}'+
                    'h2{font-size:18px;font-weight:800;color:#0f172a;border-bottom:2px solid #cbd5e1;padding-bottom:6px;margin-top:28px;}'+
                    '.subtitle{font-size:13px;color:#64748b;margin-bottom:22px;font-weight:500;}'+
                    'table{width:100%;border-collapse:collapse;margin:10px 0 18px;font-size:12px;border-radius:8px;overflow:hidden;}'+
                    'th,td{padding:9px 12px;border-bottom:1px solid #e2e8f0;text-align:left;}'+
                    'th{background:#f1f5f9;font-weight:700;color:#475569;text-transform:uppercase;font-size:11px;letter-spacing:0.5px;}'+
                    'td.amt{text-align:right;font-variant-numeric:tabular-nums;font-weight:600;}'+
                    'tr.subtotal td{font-weight:700;background:#f1f5f9;border-top:2px solid #cbd5e1;}'+
                    'tr.total td{font-weight:800;background:linear-gradient(135deg,#1e293b,#0f172a);color:#fff;font-size:14px;}'+
                    'tr.section td{background:linear-gradient(135deg,#dbeafe,#e0e7ff);font-weight:700;font-size:11px;letter-spacing:0.5px;color:#1e40af;text-transform:uppercase;}'+
                    '@media print{body{margin:0;padding:20px;}}'+
                    '</style></head><body>';
                    html+='<h1>🚖 NYC DRIVER '+(rd.type==="exp"?(lang==="en"?"EXPENSE DETAIL":"支出明细"):(lang==="en"?"FINANCIAL REPORT":"财务报告"))+'</h1>';
                    html+='<div class=subtitle>'+esc(rd.label)+' · Generated '+new Date().toLocaleDateString()+'</div>';
                    // Driver & Vehicle info block — adds identity to all PDF exports
                    var drvForPdf = (driver && (driver.name || driver.tlcHack || driver.dmvLic)) ? driver : (veh.driver||{});
                    var hasDriverInfo = !!(drvForPdf.name||drvForPdf.tlcHack||drvForPdf.dmvLic||drvForPdf.phone||drvForPdf.email);
                    var hasVehInfo = !!(veh.brand||veh.model||veh.plate||veh.tlcPlate||veh.vin);
                    if(hasDriverInfo||hasVehInfo){
                      html+='<table>';
                      if(drvForPdf.name) html+='<tr><th>'+(lang==="en"?"Name":"姓名")+'</th><td>'+esc(drvForPdf.name)+'</td></tr>';
                      if(drvForPdf.tlcHack) html+='<tr><th>TLC Hack #</th><td>'+esc(drvForPdf.tlcHack)+'</td></tr>';
                      if(drvForPdf.dmvLic) html+='<tr><th>DMV License #</th><td>'+esc(drvForPdf.dmvLic)+'</td></tr>';
                      if(drvForPdf.phone) html+='<tr><th>'+(lang==="en"?"Phone":"电话")+'</th><td>'+esc(drvForPdf.phone)+'</td></tr>';
                      if(drvForPdf.email) html+='<tr><th>Email</th><td>'+esc(drvForPdf.email)+'</td></tr>';
                      if(veh.year||veh.brand||veh.model) html+='<tr><th>'+(lang==="en"?"Vehicle":"车辆")+'</th><td>'+esc(((veh.year||"")+" "+(veh.brand||"")+" "+(veh.model||"")).replace(/\s+/g," ").trim())+'</td></tr>';
                      if(veh.plate) html+='<tr><th>'+(lang==="en"?"License Plate":"车牌")+'</th><td>'+esc(veh.plate)+'</td></tr>';
                      if(veh.tlcPlate) html+='<tr><th>TLC Plate</th><td>'+esc(veh.tlcPlate)+'</td></tr>';
                      if(veh.vin) html+='<tr><th>VIN</th><td>'+esc(veh.vin)+'</td></tr>';
                      html+='</table>';
                    }
                    var grpLabels={"车辆":"Vehicle","牌照":"License","平台":"Platform","其他":"Other"};
                    if(rd.type==="exp"){
                      html+='<h2>Expenses</h2><table><tr><th>Category</th><th class=amt>Count</th><th class=amt>Amount</th></tr>';
                      ["车辆","牌照","平台","其他"].forEach(function(g){
                        var cats=rd.byGroup[g];if(!cats||!cats.length)return;
                        html+='<tr class=section><td colspan=3>'+grpLabels[g]+'</td></tr>';
                        var gTotal=0;
                        cats.forEach(function(cat){var ct=cat.items?cat.items.length:(cat.count||0);gTotal+=cat.total;html+='<tr><td>&nbsp;&nbsp;'+esc(cat.label)+'</td><td class=amt>'+ct+'</td><td class=amt>$'+cat.total.toFixed(2)+'</td></tr>';});
                        html+='<tr class=subtotal><td>Subtotal '+grpLabels[g]+'</td><td></td><td class=amt>$'+gTotal.toFixed(2)+'</td></tr>';
                      });
                      html+='<tr class=total><td>TOTAL EXPENSES</td><td></td><td class=amt>$'+rd.total.toFixed(2)+'</td></tr></table>';
                    }else{
                      var r=rd.r;
                      html+='<h2>Income</h2><table><tr><th>Description</th><th class=amt>Amount</th></tr>';
                      if(rd.stmts&&rd.stmts.length>0){rd.stmts.forEach(function(s){var sub=(+s.grossFare||0)+(+s.tips||0)+(+s.bonus||0)+(+s.otherIncome||0);html+='<tr><td>'+esc(s.platform||"")+(s.month?' · '+esc(s.month):'')+'</td><td class=amt>$'+sub.toFixed(2)+'</td></tr>';});}
                      html+='<tr class=total><td>TOTAL INCOME</td><td class=amt>$'+r.rInc.toFixed(2)+'</td></tr></table>';
                      html+='<h2>Expenses</h2><table><tr><th>Category</th><th class=amt>Count</th><th class=amt>Amount</th></tr>';
                      ["车辆","牌照","平台","其他"].forEach(function(g){
                        var items=rd.byGroup[g];if(!items||!items.length)return;
                        html+='<tr class=section><td colspan=3>'+grpLabels[g]+'</td></tr>';
                        var gTotal=0;
                        items.forEach(function(c){gTotal+=c.total;html+='<tr><td>&nbsp;&nbsp;'+esc(c.label)+'</td><td class=amt>'+(c.count||"")+'</td><td class=amt>$'+c.total.toFixed(2)+'</td></tr>';});
                        html+='<tr class=subtotal><td>Subtotal '+grpLabels[g]+'</td><td></td><td class=amt>$'+gTotal.toFixed(2)+'</td></tr>';
                      });
                      html+='<tr class=total><td>TOTAL EXPENSES</td><td></td><td class=amt>$'+r.rTot.toFixed(2)+'</td></tr></table>';
                      html+='<h2>Net Profit</h2><table>';
                      html+='<tr><td>Income</td><td class=amt>$'+r.rInc.toFixed(2)+'</td></tr>';
                      html+='<tr><td>Less: Expenses</td><td class=amt>($'+r.rTot.toFixed(2)+')</td></tr>';
                      html+='<tr class=total><td>NET PROFIT</td><td class=amt>$'+r.rn.toFixed(2)+'</td></tr></table>';
                    }
                    html+='</body></html>';
                    if(!confirm(lang==="en"?"Generate PDF?":"生成 PDF？"))return;
                    downloadPdf(html,"report-"+today()+".pdf");
                  }, style: {background:"linear-gradient(135deg,#1A3060,#0A1828)",border:"1px solid #2A5080",color:"#5ABCFF",fontSize:13,fontWeight:600,cursor:"pointer",padding:"6px 12px",borderRadius:8,display:"flex",alignItems:"center",gap:4} }, "📄", " ", lang==="en"?"PDF":"PDF")
                , React.createElement('button', { onClick: function(){
                    var rd=reportData;var esc=function(s){return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
                    var html='<!DOCTYPE html><html><head><meta charset=utf-8><title>'+(rd.type==="exp"?"Expense Detail":"Financial Report")+' '+esc(rd.label)+'</title>';
                    html+='<style>body{font-family:-apple-system,Helvetica,Arial,sans-serif;max-width:800px;margin:30px auto;padding:20px;color:#222;line-height:1.5;background:#fff;}h1{font-size:22px;border-bottom:3px solid #000;padding-bottom:8px;margin-bottom:4px;}h2{font-size:16px;border-bottom:1px solid #888;padding-bottom:4px;margin-top:24px;color:#000;}.subtitle{font-size:12px;color:#666;margin-bottom:20px;}table{width:100%;border-collapse:collapse;margin:8px 0 16px;font-size:12px;}th,td{padding:6px 10px;border-bottom:1px solid #ddd;text-align:left;}th{background:#f0f0f0;font-weight:700;}td.amt{text-align:right;font-variant-numeric:tabular-nums;}tr.subtotal td{font-weight:700;background:#f8f8f8;border-top:1px solid #888;}tr.total td{font-weight:800;background:#222;color:#fff;font-size:13px;}tr.section td{background:#e8e8e8;font-weight:700;font-size:11px;letter-spacing:0.5px;}.print-btn{display:inline-block;margin:30px 0 0;padding:10px 20px;background:#0055FF;color:#fff;border:none;border-radius:6px;font-size:14px;cursor:pointer;}@media print{.print-btn{display:none;}}</style></head><body>';
                    html+='<h1>🚖 NYC DRIVER '+(rd.type==="exp"?(lang==="en"?"EXPENSE DETAIL":"支出明细"):(lang==="en"?"FINANCIAL REPORT":"财务报告"))+'</h1>';
                    html+='<div class=subtitle>'+esc(rd.label)+' · Generated '+new Date().toLocaleDateString()+'</div>';
                    // Driver & Vehicle info block — adds identity to all PDF exports
                    var drvForPdf = (driver && (driver.name || driver.tlcHack || driver.dmvLic)) ? driver : (veh.driver||{});
                    var hasDriverInfo = !!(drvForPdf.name||drvForPdf.tlcHack||drvForPdf.dmvLic||drvForPdf.phone||drvForPdf.email);
                    var hasVehInfo = !!(veh.brand||veh.model||veh.plate||veh.tlcPlate||veh.vin);
                    if(hasDriverInfo||hasVehInfo){
                      html+='<table>';
                      if(drvForPdf.name) html+='<tr><th>'+(lang==="en"?"Name":"姓名")+'</th><td>'+esc(drvForPdf.name)+'</td></tr>';
                      if(drvForPdf.tlcHack) html+='<tr><th>TLC Hack #</th><td>'+esc(drvForPdf.tlcHack)+'</td></tr>';
                      if(drvForPdf.dmvLic) html+='<tr><th>DMV License #</th><td>'+esc(drvForPdf.dmvLic)+'</td></tr>';
                      if(drvForPdf.phone) html+='<tr><th>'+(lang==="en"?"Phone":"电话")+'</th><td>'+esc(drvForPdf.phone)+'</td></tr>';
                      if(drvForPdf.email) html+='<tr><th>Email</th><td>'+esc(drvForPdf.email)+'</td></tr>';
                      if(veh.year||veh.brand||veh.model) html+='<tr><th>'+(lang==="en"?"Vehicle":"车辆")+'</th><td>'+esc(((veh.year||"")+" "+(veh.brand||"")+" "+(veh.model||"")).replace(/\s+/g," ").trim())+'</td></tr>';
                      if(veh.plate) html+='<tr><th>'+(lang==="en"?"License Plate":"车牌")+'</th><td>'+esc(veh.plate)+'</td></tr>';
                      if(veh.tlcPlate) html+='<tr><th>TLC Plate</th><td>'+esc(veh.tlcPlate)+'</td></tr>';
                      if(veh.vin) html+='<tr><th>VIN</th><td>'+esc(veh.vin)+'</td></tr>';
                      html+='</table>';
                    }
                    var grpLabels={"车辆":"Vehicle","牌照":"License","平台":"Platform","其他":"Other"};
                    if(rd.type==="exp"){
                      html+='<h2>Expenses</h2><table><tr><th>Category</th><th class=amt>Count</th><th class=amt>Amount</th></tr>';
                      ["车辆","牌照","平台","其他"].forEach(function(g){
                        var cats=rd.byGroup[g];if(!cats||!cats.length)return;
                        html+='<tr class=section><td colspan=3>'+grpLabels[g]+'</td></tr>';
                        var gTotal=0;
                        cats.forEach(function(cat){var ct=cat.items?cat.items.length:(cat.count||0);gTotal+=cat.total;html+='<tr><td>&nbsp;&nbsp;'+esc(cat.label)+'</td><td class=amt>'+ct+'</td><td class=amt>$'+cat.total.toFixed(2)+'</td></tr>';});
                        html+='<tr class=subtotal><td>Subtotal '+grpLabels[g]+'</td><td></td><td class=amt>$'+gTotal.toFixed(2)+'</td></tr>';
                      });
                      html+='<tr class=total><td>TOTAL EXPENSES</td><td></td><td class=amt>$'+rd.total.toFixed(2)+'</td></tr></table>';
                    }else{
                      // Financial report (summary)
                      var r=rd.r;
                      html+='<h2>Income</h2><table><tr><th>Description</th><th class=amt>Amount</th></tr>';
                      if(rd.stmts&&rd.stmts.length>0){rd.stmts.forEach(function(s){var sub=(+s.grossFare||0)+(+s.tips||0)+(+s.bonus||0)+(+s.otherIncome||0);html+='<tr><td>'+esc(s.platform||"")+(s.month?' · '+esc(s.month):'')+'</td><td class=amt>$'+sub.toFixed(2)+'</td></tr>';});}
                      html+='<tr class=total><td>TOTAL INCOME</td><td class=amt>$'+r.rInc.toFixed(2)+'</td></tr></table>';
                      html+='<h2>Expenses</h2><table><tr><th>Category</th><th class=amt>Count</th><th class=amt>Amount</th></tr>';
                      ["车辆","牌照","平台","其他"].forEach(function(g){
                        var items=rd.byGroup[g];if(!items||!items.length)return;
                        html+='<tr class=section><td colspan=3>'+grpLabels[g]+'</td></tr>';
                        var gTotal=0;
                        items.forEach(function(c){gTotal+=c.total;html+='<tr><td>&nbsp;&nbsp;'+esc(c.label)+'</td><td class=amt>'+(c.count||"")+'</td><td class=amt>$'+c.total.toFixed(2)+'</td></tr>';});
                        html+='<tr class=subtotal><td>Subtotal '+grpLabels[g]+'</td><td></td><td class=amt>$'+gTotal.toFixed(2)+'</td></tr>';
                      });
                      html+='<tr class=total><td>TOTAL EXPENSES</td><td></td><td class=amt>$'+r.rTot.toFixed(2)+'</td></tr></table>';
                      html+='<h2>Net Profit</h2><table>';
                      html+='<tr><td>Income</td><td class=amt>$'+r.rInc.toFixed(2)+'</td></tr>';
                      html+='<tr><td>Less: Expenses</td><td class=amt>($'+r.rTot.toFixed(2)+')</td></tr>';
                      html+='<tr class=total><td>NET PROFIT</td><td class=amt>$'+r.rn.toFixed(2)+'</td></tr></table>';
                    }
                    html+='</body></html>';
                    try{var blob=new Blob([html],{type:"text/html;charset=utf-8"});var url=URL.createObjectURL(blob);var a=document.createElement("a");a.href=url;a.download="report-"+today()+".html";a.click();setTimeout(function(){URL.revokeObjectURL(url);},1000);alert(lang==="en"?"✓ Report downloaded. Open it then tap Share → Print to save as PDF.":"✓ 报表已下载。打开后点分享 → 打印，可保存为 PDF。");}catch(e){alert("Error: "+e.message);}
                  }, style: {background:"#0A4020",border:"1px solid #2A8050",color:"#5ADA7A",fontSize:13,fontWeight:600,cursor:"pointer",padding:"6px 12px",borderRadius:8,display:"flex",alignItems:"center",gap:4}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 840}}, "🖨", " ", lang==="en"?"Print":"打印")
                , React.createElement('button', { onClick: function(){setReportData(null);}, style: {background:"#1E3050",border:"none",color:"#8ABCD0",fontSize:16,cursor:"pointer",width:32,height:32,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 840}}, "✕")
              )
            )
            , React.createElement('div', { style: {maxWidth:600,margin:"0 auto",padding:"20px 16px 60px",fontFamily:"monospace"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 842}}
              , React.createElement('div', { style: {textAlign:"center",marginBottom:20}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 843}}
                , React.createElement('div', { style: {fontSize:18,fontWeight:900,color:C.text,letterSpacing:1}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 844}}, "🚖 " , lang==="en"?"NYC DRIVER REPORT":"纽约司机财务报告")
                , React.createElement('div', { style: {fontSize:14,color:C.text3,marginTop:4}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 845}}, reportData.label)
              )
              , React.createElement('div', { style: {borderTop:"2px solid #2A4060",marginBottom:16}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 847}} )
              , reportData.type==="exp" ? (
                React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 849}}
                  , React.createElement('div', { style: {fontSize:13,fontWeight:800,color:"#CC88FF",letterSpacing:2,marginBottom:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}, lang==="en"?"EXPENSES":"支出明细")
                  , (function(){var totalEntries=0;["车辆","牌照","平台","其他"].forEach(function(g){var cats=reportData.byGroup[g]||[];cats.forEach(function(c){totalEntries+=(c.items?c.items.length:c.count||0);});});return React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #1A2A40",marginBottom:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}
                    , React.createElement('span', { style: {fontSize:13,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}, lang==="en"?"Total entries":"总笔数")
                    , React.createElement('span', { style: {fontSize:14,fontWeight:700,color:C.accent}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 850}}, totalEntries, " " , lang==="en"?(totalEntries===1?"entry":"entries"):"笔")
                  );})()
                  , ["车辆","牌照","平台","其他"].map(function(g){var cats=reportData.byGroup[g];if(!cats||!cats.length)return null;var gTotal=cats.reduce(function(s,c){return s+c.total;},0);var gcl=g==="车辆"?C.accent:g==="牌照"?C.gold:g==="平台"?"#CC88FF":"#B0D4E8";var glbl=lang==="en"?(g==="车辆"?"Vehicle":g==="牌照"?"License":g==="平台"?"Platform":"Other"):g;return React.createElement('div', { key: g, style: {marginBottom:16}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 851}}
                    , React.createElement('div', { style: Object.assign({fontSize:13,fontWeight:700,marginBottom:8},{color:gcl}), __self: this, __source: {fileName: _jsxFileName, lineNumber: 852}}, glbl)
                    , cats.map(function(cat){
                        var ct=cat.items?cat.items.length:(cat.count||0);
                        var key="rep_"+g+"_"+cat.label;
                        var isExp=__bucketExpanded[key]===true;  // default collapsed
                        var hasItems=cat.items && cat.items.length>0;
                        return React.createElement('div', {key: cat.label, style: {marginBottom:2}},
                          // Category header — clickable
                          React.createElement('button', {
                            onClick: hasItems ? function(){__bucketExpanded[key]=!isExp;forceRerender();} : null,
                            style: {width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 8px 5px 16px",background:isExp?"#0F1A2A":"transparent",border:"none",borderRadius:6,cursor:hasItems?"pointer":"default",textAlign:"left"}
                          },
                            React.createElement('span', {style:{fontSize:13,color:C.text2}}, cat.icon, " ", cat.label, React.createElement('span', {style:{fontSize:12,color:C.text3,marginLeft:6}}, "×", ct)),
                            React.createElement('span', {style:{display:"flex",alignItems:"center",gap:8}},
                              React.createElement('span', {style:{fontSize:13,color:C.text}}, fmt(cat.total)),
                              hasItems ? React.createElement('span', {style:{fontSize:11,color:C.text3,minWidth:12}}, isExp?"▲":"▼") : null
                            )
                          ),
                          // Expanded items list
                          isExp && hasItems ? React.createElement('div', {style:{padding:"4px 8px 8px 28px",background:"#0A1422",borderRadius:6,marginTop:2}},
                            cat.items.slice().sort(function(a,b){var ad=a.isFixed?(a.statementMonth||""):(a.date||"");var bd=b.isFixed?(b.statementMonth||""):(b.date||"");return bd.localeCompare(ad);}).map(function(it,ix){
                              var dateStr = it.isFixed ? (it.statementMonth||it.date||"") : (it.date||"");
                              return React.createElement('div', {key:it.id||ix, style:{display:"flex",justifyContent:"space-between",padding:"4px 0",fontSize:12,borderBottom:ix<cat.items.length-1?"1px solid #0F1C30":"none"}},
                                React.createElement('div', {style:{flex:1,minWidth:0}},
                                  React.createElement('div', {style:{color:C.text3,fontSize:11}}, dateStr),
                                  it.notes ? React.createElement('div', {style:{color:C.text2,marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}, it.notes) : null
                                ),
                                React.createElement('span', {style:{color:C.text,fontWeight:600,marginLeft:8,flexShrink:0}}, fmt(it.amount))
                              );
                            })
                          ) : null
                        );
                      })
                    , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",padding:"6px 0 6px 16px",borderTop:"1px solid #1A2A40",marginTop:4}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 854}}, React.createElement('span', { style: {fontSize:12,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 854}}, lang==="en"?"Subtotal":"小计"), React.createElement('span', { style: {fontSize:13,fontWeight:700,color:"#FF9A65"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 854}}, fmt(gTotal)))
                  );})
                  , React.createElement('div', { style: {borderTop:"2px solid #2A4060",padding:"12px 0",display:"flex",justifyContent:"space-between"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 856}}
                    , React.createElement('span', { style: {fontSize:14,fontWeight:800,color:C.text,letterSpacing:1}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 857}}, lang==="en"?"TOTAL EXPENSES":"总支出")
                    , React.createElement('span', { style: {fontSize:16,fontWeight:900,color:C.danger}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 858}}, fmt(reportData.total))
                  )
                )
              ) : (
                React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 862}}
                  , React.createElement('div', { style: {fontSize:13,fontWeight:800,color:C.accent,letterSpacing:2,marginBottom:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 863}}, lang==="en"?"INCOME":"收入明细")
                  , reportData.stmts&&reportData.stmts.length>0 ? reportData.stmts.map(function(s){var sub=(+s.grossFare||0)+(+s.tips||0)+(+s.bonus||0)+(+s.otherIncome||0);return React.createElement('div', { key: s.id, style: {marginBottom:14}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 864}}
                    , React.createElement('div', { style: {fontSize:13,fontWeight:700,color:C.text,marginBottom:6}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 865}}, s.platform)
                    , +s.grossFare>0?React.createElement('div', { style: {display:"flex",justifyContent:"space-between",padding:"3px 0 3px 16px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 866}}, React.createElement('span', { style: {fontSize:13,color:C.text2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 866}}, T.grossFare), React.createElement('span', { style: {fontSize:13,color:C.text}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 866}}, fmt(s.grossFare))):null
                    , +s.tips>0?React.createElement('div', { style: {display:"flex",justifyContent:"space-between",padding:"3px 0 3px 16px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 867}}, React.createElement('span', { style: {fontSize:13,color:C.text2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 867}}, T.tips), React.createElement('span', { style: {fontSize:13,color:C.text}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 867}}, fmt(s.tips))):null
                    , +s.bonus>0?React.createElement('div', { style: {display:"flex",justifyContent:"space-between",padding:"3px 0 3px 16px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 868}}, React.createElement('span', { style: {fontSize:13,color:C.text2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 868}}, T.bonus), React.createElement('span', { style: {fontSize:13,color:C.text}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 868}}, fmt(s.bonus))):null
                    , +s.tollReimbursed>0?React.createElement('div', { style: {display:"flex",justifyContent:"space-between",padding:"3px 0 3px 16px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 869}}, React.createElement('span', { style: {fontSize:13,color:C.text2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 869}}, lang==="en"?"Toll":"过桥"), React.createElement('span', { style: {fontSize:13,color:C.text}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 869}}, fmt(s.tollReimbursed))):null
                    , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",padding:"6px 0 6px 16px",borderTop:"1px solid #1A2A40",marginTop:4}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 870}}, React.createElement('span', { style: {fontSize:12,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 870}}, lang==="en"?"Subtotal":"小计"), React.createElement('span', { style: {fontSize:13,fontWeight:700,color:C.success}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 870}}, fmt(sub)))
                  );}) : React.createElement('div', { style: {fontSize:13,color:C.text3,padding:"8px 0 16px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 871}}, lang==="en"?"No income recorded":"暂无收入记录")
                  , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",padding:"10px 0",borderTop:"1px solid #2A4060",marginBottom:20}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 872}}
                    , React.createElement('span', { style: {fontSize:13,fontWeight:700,color:C.text2,letterSpacing:1}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 873}}, lang==="en"?"Total Revenue":"总营业额")
                    , React.createElement('span', { style: {fontSize:14,fontWeight:800,color:C.accent}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 874}}, fmt(reportData.r.ri))
                  )
                  , React.createElement('div', { style: {borderTop:"1px solid #182540",marginBottom:16}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 876}} )
                  , React.createElement('div', { style: {fontSize:13,fontWeight:800,color:"#CC88FF",letterSpacing:2,marginBottom:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 877}}, lang==="en"?"EXPENSES":"支出明细")
                  , ["车辆","牌照","平台","其他"].map(function(g){var items=reportData.byGroup[g];if(!items||!items.length)return null;var gTotal=items.reduce(function(s,c){return s+c.total;},0);var gcl=g==="车辆"?C.accent:g==="牌照"?C.gold:g==="平台"?"#CC88FF":"#B0D4E8";var glbl=lang==="en"?(g==="车辆"?"Vehicle":g==="牌照"?"License":g==="平台"?"Platform":"Other"):g;return React.createElement('div', { key: g, style: {marginBottom:14}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 878}}
                    , React.createElement('div', { style: Object.assign({fontSize:13,fontWeight:700,marginBottom:6},{color:gcl}), __self: this, __source: {fileName: _jsxFileName, lineNumber: 879}}, glbl)
                    , items.map(function(c){return React.createElement('div', { key: c.label, style: {display:"flex",justifyContent:"space-between",padding:"3px 0 3px 16px"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 880}}, React.createElement('span', { style: {fontSize:13,color:C.text2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 880}}, c.label, c.count?React.createElement('span',{style:{fontSize:12,color:C.text3,marginLeft:6}},"×",c.count):null), React.createElement('span', { style: {fontSize:13,color:C.text}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 880}}, fmt(c.total)));})
                    , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",padding:"6px 0 6px 16px",borderTop:"1px solid #1A2A40",marginTop:4}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 881}}, React.createElement('span', { style: {fontSize:12,color:C.text3}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 881}}, lang==="en"?"Subtotal":"小计"), React.createElement('span', { style: {fontSize:13,fontWeight:700,color:"#FF9A65"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 881}}, fmt(gTotal)))
                  );})
                  , React.createElement('div', { style: {borderTop:"2px solid #2A4060",padding:"12px 0",marginBottom:16}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 883}}
                    , React.createElement('div', { style: {display:"flex",justifyContent:"space-between",marginBottom:6}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 884}}, React.createElement('span', { style: {fontSize:13,fontWeight:700,color:C.text2,letterSpacing:1}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 884}}, lang==="en"?"Total Expenses":"总支出"), React.createElement('span', { style: {fontSize:14,fontWeight:800,color:C.danger}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 884}}, fmt(reportData.r.rTot)))
                  )
                  , React.createElement('div', { style: {borderTop:"2px solid #2A4060",padding:"14px 0"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 886}}
                    , (function(){var rn=reportData.r.rn,nc=rn>=0?C.success:C.danger;return React.createElement('div', { style: {display:"flex",justifyContent:"space-between",alignItems:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 887}}, React.createElement('span', { style: {fontSize:15,fontWeight:900,color:C.text,letterSpacing:1}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 887}}, lang==="en"?"NET PROFIT":"净利润"), React.createElement('span', { style: Object.assign({fontSize:20,fontWeight:900,letterSpacing:-1},{color:nc}), __self: this, __source: {fileName: _jsxFileName, lineNumber: 887}}, fmt(rn)));}())
                  )
                  , reportData.isYear&&reportData.mData ? (
                    React.createElement('div', { style: {marginTop:16}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 890}}
                      , React.createElement('div', { style: {borderTop:"1px solid #182540",marginBottom:16}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 891}} )
                      , React.createElement('div', { style: {fontSize:13,fontWeight:800,color:C.gold,letterSpacing:2,marginBottom:12}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 892}}, lang==="en"?"MONTHLY BREAKDOWN":"逐月明细")
                      , reportData.mData.filter(function(m){return m.inc>0||m.exp>0;}).map(function(m){var nc=m.net>=0?C.success:C.danger;return React.createElement('div', { key: m.m, style: {display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #0F1C30"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 893}}, React.createElement('span', { style: {fontSize:13,color:C.text2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 893}}, m.label), React.createElement('span', { style: {fontSize:12,color:C.accent}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 893}}, fmt(m.inc)), React.createElement('span', { style: {fontSize:12,color:"#FF9A65"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 893}}, fmt(m.exp)), React.createElement('span', { style: Object.assign({fontSize:13,fontWeight:700},{color:nc}), __self: this, __source: {fileName: _jsxFileName, lineNumber: 893}}, fmt(m.net)));})
                    )
                  ) : null
                )
              )
              , React.createElement('div', { style: {borderTop:"2px solid #2A4060",marginTop:20,padding:"14px 0",textAlign:"center"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 898}}
                , React.createElement('div', { style: {fontSize:12,color:"#6A8AAA",letterSpacing:1}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 899}}, "NYC DRIVER TRACKER"  )
              )
            )
          )
      ) : null

      , React.createElement('div', { style: {position:"fixed",bottom:0,left:0,right:0,display:"flex",background:"rgba(18,24,38,0.92)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",borderTop:"1px solid "+C.border,zIndex:500,paddingBottom:"env(safe-area-inset-bottom)",alignItems:"center",boxShadow:"0 -4px 16px rgba(0,0,0,0.3)"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 906}}
        , (function(){
          var items=[{ti:0,icon:"&#128202;",label:T.dashboard},{ti:1,icon:"&#128181;",label:T.income},{ti:-1,icon:"+",label:T.addExpense,isPlus:true},{ti:2,icon:"&#128184;",label:T.expense},{ti:3,icon:"&#128200;",label:T.report}];
          return React.createElement('div', { style: {display:"contents"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 909}}, items.map(function(item,i){
            if(item.isPlus){return React.createElement('button', { key: i, onClick: function(){setShowDrawer(false);setSelGrp("车辆");setEf({date:today(),time:nowTime(),category:(veh&&veh.type==="petrol"?"fuel":"charging"),amount:"",notes:"",qty:"",statementMonth:curMo(),isRecurring:false,mode:(driverType==="rideshare"||driverType==="taxi")?driverType:""});setSf("exp");}, style: {flex:1,padding:"6px 2px 10px",background:"none",border:"none",cursor:"pointer",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 910}}, React.createElement('div', { style: {width:48,height:48,borderRadius:24,background:"linear-gradient(135deg,#00D4FF,#0055FF)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,color:"#fff",boxShadow:"0 2px 8px rgba(0,0,0,0.3)",marginTop:-22,fontWeight:300}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 910}}, "+"), React.createElement('span', { style: {fontSize:FS.sm,color:C.text3,marginTop:2}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 910}}, item.label));}
            var active=tab===item.ti,cl=active?C.accent:C.text3,bg=active?"linear-gradient(180deg, rgba(0,212,255,0.08), transparent)":"transparent";
            return React.createElement('button', { key: i, onClick: function(){setTab(item.ti);setShowDrawer(false);setSf(null);setShowBackup(false);setShowPlatMgr(false);setShowRemMgr(false);setShowGoal(false);setReportData(null);}, style: {flex:1,padding:"6px 2px 8px",background:bg,border:"none",fontSize:FS.sm,cursor:"pointer",color:cl,fontWeight:active?700:500,textAlign:"center",borderTop:active?"2px solid "+C.accent:"2px solid transparent",transition:"all 0.15s"}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 912}}, React.createElement('div', { style: {fontSize:18,marginBottom:2}, dangerouslySetInnerHTML: {__html:item.icon}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 912}} ), item.label);
          }));
        })()
      )
      // === FLOATING CALCULATOR — minimized chip (small button in corner) ===
      , (calcFloat.mode==="minimized") ? React.createElement('button', {
          onClick: function(){setCalcFloat(Object.assign({},calcFloat,{mode:"floating"}));},
          style: {
            position:"fixed",
            bottom:80,
            right:14,
            zIndex:540,
            background:"linear-gradient(135deg, rgba(0,212,255,0.95), rgba(0,85,255,0.92))",
            border:"none",
            color:"#fff",
            borderRadius:24,
            padding:"10px 14px",
            display:"flex",
            alignItems:"center",
            gap:8,
            fontSize:13,
            fontWeight:700,
            boxShadow:"0 6px 20px rgba(0,212,255,0.4), 0 0 24px rgba(0,212,255,0.2)",
            cursor:"pointer",
            fontVariantNumeric:"tabular-nums",
            letterSpacing:0.2,
            animation:"fadeIn 0.2s"
          },
          title: lang==="en"?"Tap to expand calculator":"点击展开计算器"
        }
          , React.createElement('span', {style:{fontSize:16}}, "🧮")
          , React.createElement('span', null, calcState.display || "0")
          , (calcState.memory && calcState.memory !== 0) ? React.createElement('span', {style:{fontSize:10,opacity:0.85,marginLeft:2}}, "M ", calcState.memory.toFixed(0)) : null
        ) : null

      , showDP ? React.createElement(DatePicker, { value: ef.date, lang: lang, onChange: function(v){setEf(Object.assign({},ef,{date:v}));}, onClose: function(){setShowDP(false);} }) : null
      , showTP ? React.createElement(TimePicker, { value: ef.time, lang: lang, onChange: function(v){setEf(Object.assign({},ef,{time:v}));}, onClose: function(){setShowTP(false);} }) : null
      , mpState ? React.createElement(MonthPicker, { value: mpState.value, lang: lang, onChange: mpState.onChange, onClose: function(){setMpState(null);} }) : null
      , ypState ? React.createElement(YearPicker, { value: ypState.value, lang: lang, onChange: ypState.onChange, onClose: function(){setYpState(null);} }) : null
      , dangerConfirm ? React.createElement(DangerConfirm, { lang: lang, title: dangerConfirm.title, message: dangerConfirm.message, onConfirm: dangerConfirm.onConfirm, onCancel: function(){setDangerConfirm(null);} }) : null
      , confirmState ? React.createElement(ConfirmModal, { lang: lang, title: confirmState.title, message: confirmState.message, confirmLabel: confirmState.confirmLabel, danger: confirmState.danger, onConfirm: confirmState.onConfirm, onCancel: confirmState.onCancel }) : null
      , inputState ? React.createElement(InputModal, { lang: lang, title: inputState.title, message: inputState.message, placeholder: inputState.placeholder, defaultValue: inputState.defaultValue, confirmLabel: inputState.confirmLabel, inputType: inputState.inputType, inputMode: inputState.inputMode, pattern: inputState.pattern, required: inputState.required, onSubmit: inputState.onSubmit, onCancel: inputState.onCancel }) : null
      , locked ? React.createElement(LockScreen, { lang: lang, mode: "unlock", onSuccess: function(){recordUnlock();setLocked(false);}, onForgot: function(){try{localStorage.removeItem("nyc_pin");localStorage.removeItem("nyc_user");localStorage.removeItem("nyc_lastUnlock");}catch(e){}setHasPIN(false);setLocked(false);setGUser(null);setAccessToken(null);} }) : null
      , showPinSetup ? React.createElement(LockScreen, { lang: lang, mode: "setup", onSuccess: function(){setHasPIN(true);setShowPinSetup(false);showToast(lang==="en"?"✓ PIN set":"✓ PIN 设置成功");}, onCancel: function(){setShowPinSetup(false);} }) : null
    )
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(ErrorBoundary,null,React.createElement(App)));
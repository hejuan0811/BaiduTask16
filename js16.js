/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {},
nullReg=/[(^\s+)(\s+$)]/g,
numReg=/^[1-9]*$/i,
cityReg=/^[\u4e00-\u9fa5a-zA-Z]+$/i,
cityIn=document.getElementById("aqi-city-input"),
valueIn=document.getElementById("aqi-value-input"),
addBtn=document.getElementById("add-btn"),
table=document.getElementById("aqi-table");

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city=cityIn.value.replace(nullReg,"");
	var num=valueIn.value.replace(nullReg,"");
	if(parseInt(num)<num){
		alert("请输入整数");
		return;
	}
	if(!cityReg.test(city)){
		alert("请输入字符或汉字");
		return;
	}
	if(!numReg.test(num)){
		alert("请输入数字");
		return;
	}
	aqiData[city]=num;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var tableNode=[];
	for(var data in aqiData){
		tableNode.push("<tr>");
		tableNode.push("<td>"+data+"</td>");
		tableNode.push("<td>"+aqiData[data]+"</td>");
		tableNode.push("<td ><button type='button' onclick='delBtnHandle(\""+ data + "\")'>删除</button></td>");
		//tableNode.push("<td><button type=\"button\" onclick=\"delBtnHandle("+data+")\">删除</button></td>");
		tableNode.push("</tr>");
	}
	table.innerHTML=tableNode.join("");
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
	delete aqiData[city];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	addBtn.onclick=addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();
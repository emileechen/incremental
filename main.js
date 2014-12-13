var logText = document.getElementById("log");
var logCount = 0;

function updateLog(string) {
	if (logCount >= 5) {
		oldLog = logText.substring(0, 2);
	} else {
		oldLog = logText.innerHTML;
	}
	var newLog = string.concat("<br>").concat(oldLog);
	logText.innerHTML = newLog;
	logCount = logCount + 1;
};



var gold = 0;

function goldClick(number) {
    gold = gold + number;
    document.getElementById("gold").innerHTML = gold;
};



var minions = 0;
var minionCost = Math.floor(10 * Math.pow(1.1, minions));

function buyMinion() {
	if (gold >= minionCost) {
		minions = minions + 1;
		gold = gold - minionCost;
		document.getElementById('minions').innerHTML = minions;
    	document.getElementById("gold").innerHTML = gold;
		updateLog("You have bought a minion.");
	};
	minionCost = Math.floor(10 * Math.pow(1.1, minions));
	document.getElementById('minionCost').innerHTML = minionCost;
};








function save() {
	var save = {
		gold: gold,
		minions: minions,
		minionCost: minionCost
	}
	localStorage.setItem("save",JSON.stringify(save));
	updateLog("Game is saved!");
};


function load() {
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (typeof savegame.gold !== "undefined") gold = savegame.gold;
	if (typeof savegame.minions !== "undefined") minions = savegame.minions;
	if (typeof savegame.minionCost !== "undefined") minionCost = savegame.minionCost;
	updateLog("Game loaded!");
	refresh();
};


function refresh() {
    document.getElementById("gold").innerHTML = gold;
	document.getElementById('minions').innerHTML = minions;
	document.getElementById('minionCost').innerHTML = minionCost;
};


function reset() {
	localStorage.removeItem("save");
};








window.setInterval(function(){
	goldClick(minions);
}, 1000);		// fires every 1000ms


window.setInterval(function(){
	save();
}, 10000);
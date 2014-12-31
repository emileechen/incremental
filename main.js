var logText = null;

function updateLog(string) {
	logText = document.getElementById("log");
	var oldLog = logText.innerHTML;
	var newLog = string.concat("<br>").concat(oldLog);
	logText.innerHTML = newLog;
};






var nectar = 0;
var nectarRate = 0;

function nectarCollect(number) {
	nectar = nectar + number;
	updateResources();
};



var workers = 0;
var workerCost = 10;
var workerRate = 0;

function buyWorker() {
	if (nectar >= workerCost) {
		workers = workers + 1;
		nectar = nectar - workerCost;
		updateResources();
		updateRates();
		updateCosts();
		updateLog("You have recruited a worker bee.");
	} else {
		updateLog("Not enough nectar to recruit worker bee!");
	};
};


var nursery = false;

function buyNursery() {
	nursery = true;
};




function updateResources() {
	document.getElementById("nectar").innerHTML = addSuffix(nectar);
	document.getElementById("workers").innerHTML = addSuffix(workers);
};

function updateRates() {
	nectarRate = workers;
	document.getElementById("nectarRate").innerHTML = addSuffix(nectarRate);
};

function updateCosts() {
	workerCost = Math.floor(10 * Math.pow(1.1, workers));
	document.getElementById("workerCost").innerHTML = addSuffix(workerCost);
};




function addSuffix(resource) {
	var suffixes = ["K","M","B","T","Qa","Qt","Sx","Sp","Oc","Dc"];
	for (var i = suffixes.length - 1; i >= 0; i--) {
		if (resource >= Math.pow(1000, i + 1)) {
			return (resource / Math.pow(1000, i + 1)).toFixed(2) + suffixes[i];
		};
	};
	return resource;
};







function save() {
	var save = {
		nectar: nectar,
		nectarRate: nectarRate,
		workers: workers,
		workerCost: workerCost
	};
	localStorage.setItem("save",JSON.stringify(save));
	updateLog("Game is saved!");
};


function load() {
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (typeof savegame.nectar !== "undefined") nectar = savegame.nectar;
	if (typeof savegame.nectarRate !== "undefined") nectarRate = savegame.nectarRate;
	if (typeof savegame.workers !== "undefined") workers = savegame.workers;
	if (typeof savegame.workerCost !== "undefined") workerCost = savegame.workerCost;
	updateLog("Game loaded!");
	refresh();
};


function refresh() {
	updateResources();
	updateRates();
	updateCosts();
};


function reset() {
	localStorage.removeItem("save");
};








window.setInterval(function(){
	nectarCollect(workers);
}, 1000);		// fires every 1000ms


//window.setInterval(function(){
//	save();
//}, 30000);
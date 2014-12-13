var gold = 0;

function goldClick(number) {
    gold = gold + number;
    document.getElementById("gold").innerHTML = gold;
};



var minions = 0;

function buyMinion() {
	var minionCost = Math.floor(10 * Math.pow(1.1, minions));	// calculates cost of minions
	if (gold >= minionCost) {
		minions = minions + 1;
		gold = gold - minionCost;
		document.getElementById('minions').innerHTML = minions;
    document.getElementById("gold").innerHTML = gold;
	};
	var nextCost = Math.floor(10 * Math.pow(1.1, minions));
	document.getElementById('minionCost').innerHTML = nextCost
};





function save() {
	var save = {
		gold: gold,
		minions: minions
	}
	localStorage.setItem("save",JSON.stringify(save));
};


function load() {
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (typeof savegame.gold !== "undefined") gold = savegame.gold;
	if (typeof savegame.minions !== "undefined") minions = savegame.minions;
};



window.setInterval(function(){
	goldClick(minions)
}, 1000);		// fires every 1000ms
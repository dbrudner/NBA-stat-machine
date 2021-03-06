// function to get a players stats and put them in their divs using a playerId 
alert("Must have CORS enabled for this to work. Try downloading and enabling CORS chrome extension")

var getStats = (playerId) => {
	var url = "https://stats.nba.com/stats/playerprofilev2?PlayerID=" + playerId + "&Season=2017-18&PerMode=PerGame"
	console.log(url);
	$.getJSON(url, function(data) {
		var currentSeason = data.resultSets[0].rowSet.length - 1
		$("#rebounds-inner").text(data.resultSets[0].rowSet[currentSeason][20]); //rebounds
		$("#assists-inner").text(data.resultSets[0].rowSet[currentSeason][21]); //assists
		$("#points-inner").text(data.resultSets[0].rowSet[currentSeason][26]); //points
		$("#fg").text(((data.resultSets[0].rowSet[currentSeason][11])*100).toFixed(2) + "%");
		$("#ft").text(((data.resultSets[0].rowSet[currentSeason][17])*100).toFixed(2) + "%");
		$("#3pt").text(((data.resultSets[0].rowSet[currentSeason][14])*100).toFixed(2) + "%");
		$("#stl").text((data.resultSets[0].rowSet[currentSeason][22]));
		$("#blk").text((data.resultSets[0].rowSet[currentSeason][23]));
		$("#tov").text((data.resultSets[0].rowSet[currentSeason][24]));
		console.log(currentSeason);
	})
}

// click function.
$("#get-stats").click(function(e) {
	e.preventDefault();
	var entry = nameChange($("#player").val());
	getPlayerId(entry);
})

//retrieves a playerId given the player's name as an argument. Case sensitive right now.
var getPlayerId = (playerName) => {
	var getPlayerUrl = "https://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=1&Season=2017-18&LeagueID=00"
	$.getJSON((getPlayerUrl), function(data) {
				// console.log(data.resultSets[0].rowSet)
				for (i=0; i<data.resultSets[0].rowSet.length; i++) {
					if (data.resultSets[0].rowSet[i][6] === playerName) {
						var playerId = data.resultSets[0].rowSet[i][0];
						getStats(playerId);
						console.log(playerId);
						$("#name").text((data.resultSets[0].rowSet[i][2]));
					}
				}
});

};

//function to allow case insensitive names
var nameChange = (string) => {
	string = string.replace(" ", "_")
	return string.toLowerCase()
}
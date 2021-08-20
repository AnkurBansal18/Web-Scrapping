
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
const request = require("request");
const cheerio = require("cheerio");
const chalk = require("chalk");

console.log("Before");
request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        extractHTML(html);
    }
}
function extractHTML(html) {
    let $ = cheerio.load(html);
    // for full page search
    let teamsArr = $(".match-info.match-info-MATCH .team");
    let WteamName;
    for (let i = 0; i < teamsArr.length; i++) {
        let hasclass = $(teamsArr[i]).hasClass("team-gray");
        if (hasclass == false) {
            // find 
            let teamNameElement = $(teamsArr[i]).find(".name");
            WteamName = teamNameElement.text().trim();
        }
    }
 
    // req html fetch
    let inningsArr = $(".card.content-block.match-scorecard-table>.Collapsible");
    // let htmlStr = "";
    for (let i = 0; i < inningsArr.length; i++) {
        // let cHtml = $(innigsArr[i]).html();        //html table
        // htmlStr += cHtml;
        // team names
        let teamNameElement = $(inningsArr[i]).find(".header-title.label");
        let teamName = teamNameElement.text();
        teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim();
        // team table
        // console.log(teamName);
        let HighestWicketTaker = "";
          let highestWickets = 0;
        if (WteamName !== teamName) {
            // console.log(teamName);
            let tableElement = $(inningsArr[i]).find(".table.bowler");
            let Bowlers = $(tableElement).find("tr");
            for (let j = 0; j < Bowlers.length; j++) {
                let BowlerStats = $(Bowlers[j]).find("td");
                let playerName = $(BowlerStats[0]).text();
                let wickets = $(BowlerStats[4]).text();
                if (wickets >= highestWickets) {
                    highestWickets = wickets;
                    HighestWicketTaker = playerName;
                }
            }
            
            console.log(chalk.bgGreenBright(chalk.bold.black(`Winning Team: ${WteamName}`)));
           console.log(chalk.bgYellow(chalk.bold.black(`Highest WicketTaker : ${HighestWicketTaker}`)));
           console.log(chalk.bgWhiteBright(chalk.bold.black(`Wickets Taken: ${highestWickets}`))); 
        }

    }

}

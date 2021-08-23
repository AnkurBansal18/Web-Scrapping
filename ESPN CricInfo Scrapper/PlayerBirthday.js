
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
const request = require("request");
const cheerio = require("cheerio");

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

    // req html fetch
    let inningsArr = $(".card.content-block.match-scorecard-table>.Collapsible");
    for (let i = 0; i < inningsArr.length; i++) {

        let teamNameElement = $(inningsArr[i]).find(".header-title.label");
        let teamName = teamNameElement.text();
        teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim();
      
        // batsmantable
            let tableElement = $(inningsArr[i]).find(".table.batsman");
            let batsman = $(tableElement).find("tr");
            for (let j = 0; j < batsman.length; j++) {
                let batsmanStats = $(batsman[j]).find("td");
                let exist = $(batsmanStats[0]).hasClass("batsman-cell");
                if(exist){
                    let href = $(batsmanStats[0]).find("a").attr("href");
                    let name = $(batsmanStats[0]).text();
                    let route = "https://www.espncricinfo.com"+href;
                   // console.log(route);
                   getBirthdayPage(route, name, teamName);
                }
            }
        }
    }

function getBirthdayPage(url, name, teamName){
    request(url,cb);
    function cb(err, response, html){
        if(err){
          console.log("error");
        }
        else{
            extractBirthday(html, name, teamName);
        }
    }
}
function extractBirthday(html,name, teamName){
    let $ = cheerio.load(html);
    let playerDetails = $(".player-card-description");                    //all details of a player
    let birthday = $(playerDetails[1]).text();
    console.log(`${name} plays for ${teamName} and was born on ${birthday}`);
}

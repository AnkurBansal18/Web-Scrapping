
const request = require("request");
const cheerio = require("cheerio");
const chalk =  require("chalk");
//const figlet = require("figlet");
request('https://www.worldometers.info/coronavirus/', cb) ;
    console.log("after");
    function cb (error, response, html){
        
        if(error){
            console.error('error:', error); // Print the error if one occurred
             // Print the response status code if a response was received
        }else{
           // console.log('statusCode:', response && response.statusCode);
            handleHtml(html); // Print the HTML for the Google homepage.
        }
    }
function handleHtml(html){
    let selTool = cheerio.load(html);
   // let h1count = selTool("h1");
   // console.log(h1count.length);
   let contentArr = selTool("#maincounter-wrap span");
//    for(let i=0; i<contentArr.length; i++){
//        let data = selTool(contentArr[i]).text();
//        console.log("Data", data);
//    }
 let total = selTool(contentArr[0]).text();
 let deaths = selTool(contentArr[1]).text();
 let recovered = selTool(contentArr[2]).text();

 console.log(chalk.blue("Total cases : " + total));
 console.log(chalk.red("Total deaths : "+ deaths));
 console.log(chalk.green("Total recovered : " + recovered));
}

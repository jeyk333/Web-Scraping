const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const writeStream = fs.createWriteStream("post.csv");

//Write Headers
writeStream.write(`Item,Link \n`);

request("https://github.com/jeyk333", (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    //const header = $(".application-main");
    // console.log(header.html());
    //console.log(header.text());
    //const output = header.find("strong").text();
    //const output = header.children("strong").next().text();
    // const output = header
    //   .children("strong")
    //   .parent()
    //   .text();

    $("a").each((i, el) => {
      const item = $(el)
        .text()
        .replace(/\s\s+/g, "");
      const link = $(el)
        .attr("href")
        .replace(/\s\s+/g, "");
      console.log(item);

      //Write Row to CSV
      writeStream.write(`${item}, ${link} \n`);
    });

    console.log("Scraping Done");
  }
});

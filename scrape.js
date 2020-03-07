const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const writeStream = fs.createWriteStream("post.csv");

//Headers for the CSV file
writeStream.write(`Item,Link \n`);

// Replace the 'https://www.dummysite.com' with the site address, you want scrape
request("https://www.dummysite.com", (error, response, html) => {
  if (!error && response.statusCode == 200) {
    //Getting access to the Website HTML
    const $ = cheerio.load(html);

    /**
     * To know all the available methods in Cheerio,
     * Please visit https://cheerio.js.org/
     */

    //To access the content inside the Body tag. You can also use class name.
    const body = $("body");
    body.html(); // This method will print the content inside the Body as an HTML strucure
    body.text(); //This method will print the content inside the Body in text format

    // The find method will find all the div tags inside the body and the text method will convert those data into text format and print
    //You can also pass class names or tag names instead of div
    body.find("div").text();

    // The Children method will get the items under the div tags and the text method will print only the text inside those items
    body.children("div").text();

    //You can also loop through items and print the data, For eg. In the below code, it will get all link tags inside a HTML

    $("a").each((i, el) => {
      //This text() Method will get the link text for all the tags and replace method will remove the space inbetween the text vertically. If you use without replace, you may end up getting lot space inbetween the text
      const item = $(el)
        .text()
        .replace(/\s\s+/g, "");

      //The attr("href") will get the http link of the link tags.
      const link = $(el)
        .attr("href")
        .replace(/\s\s+/g, "");
      console.log(item);

      //Write Row to CSV and listing everything inside the CSV file
      //You can found example CSV file in the current directory for the below code.
      writeStream.write(`${item}, ${link} \n`);
    });

    //console.log("Scraping Done");
  }
});

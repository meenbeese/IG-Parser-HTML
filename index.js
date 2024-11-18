const fs = require("fs");
const cheerio = require("cheerio");

function parseFollowers(htmlFile, outputFile) {
  try {
    const html = fs.readFileSync(htmlFile, "utf-8");
    const $ = cheerio.load(html);
    const followers = [];

    $(".pam._3-95._2ph-._a6-g.uiBoxWhite.noborder").each((_, element) => {
      try {
        const username = $(element).find("a").text().trim();
        const date = $(element).find("div").last().text().trim();

        followers.push({ username, date });
      } catch (error) {
        console.error("Error parsing a follower entry:", error);
      }
    });

    fs.writeFileSync(outputFile, JSON.stringify(followers, null, 4), "utf8");

    console.log(
      `Successfully parsed ${followers.length} followers and saved to ${outputFile}`,
    );
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

const htmlFilePath = "following.html";
const outputJsonPath = "following.json";
parseFollowers(htmlFilePath, outputJsonPath);

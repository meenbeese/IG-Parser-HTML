const fs = require("fs");
const cheerio = require("cheerio");

function parseHtmlFile(htmlFile, outputFile) {
  try {
    const selector = ".pam._3-95._2ph-._a6-g.uiBoxWhite.noborder";
    const html = fs.readFileSync(htmlFile, "utf-8");
    const $ = cheerio.load(html);
    const entries = [];

    $(selector).each((_, element) => {
      try {
        const username = $(element).find("a").text().trim();
        const date = $(element).find("div").last().text().trim();

        entries.push({ username, date });
      } catch (error) {
        console.error("Error parsing an entry:", error);
      }
    });

    fs.writeFileSync(outputFile, JSON.stringify(entries, null, 4), "utf8");

    console.log(
      `Successfully parsed ${entries.length} entries and saved to ${outputFile}`,
    );
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

const htmlFilePath = "following.html";
const outputJsonPath = "following.json";
parseHtmlFile(htmlFilePath, outputJsonPath);

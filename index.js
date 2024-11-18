const fs = require("fs");
const cheerio = require("cheerio");
const readline = require("readline");

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

function promptUser() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let type, htmlFilePath, outputJsonPath;

  rl.question(
    "Do you want to parse 'followers' or 'following'? ",
    (answer1) => {
      type = answer1.trim().toLowerCase();
      if (type !== "followers" && type !== "following") {
        console.error(
          "Invalid choice. Please choose 'followers' or 'following'.",
        );
        rl.close();
        return;
      }

      rl.question("Enter the path to the HTML file to parse: ", (answer2) => {
        htmlFilePath = answer2.trim();
        if (!fs.existsSync(htmlFilePath)) {
          console.error("The specified file does not exist.");
          rl.close();
          return;
        }

        rl.question(
          "Enter the path to save the output JSON file: ",
          (answer3) => {
            outputJsonPath = answer3.trim();

            try {
              parseHtmlFile(htmlFilePath, outputJsonPath);
            } catch (error) {
              console.error("An error occurred:", error);
            } finally {
              rl.close();
            }
          },
        );
      });
    },
  );

  rl.on("close", () => {
    console.log("Process completed. Exiting.");
    process.exit(0);
  });
}

promptUser();

const fs = require("fs");
const cheerio = require("cheerio");
const readline = require("readline");
const path = require("path");

function parseHtmlFile(htmlFile) {
  const selector = ".pam._3-95._2ph-._a6-g.uiBoxWhite.noborder";
  const html = fs.readFileSync(htmlFile, "utf-8");
  const $ = cheerio.load(html);
  const entries = [];

  $(selector).each((_, element) => {
    try {
      const username = $(element).find("a").text().trim();
      entries.push(username);
    } catch (error) {
      console.error("Error parsing an entry:", error);
    }
  });

  return entries.sort();
}

function compareLists(followers, following) {
  const notFollowingBack = following.filter((user) => !followers.includes(user));
  const notFollowedBack = followers.filter((user) => !following.includes(user));
  const mutual = followers.filter((user) => following.includes(user));

  return { notFollowingBack, notFollowedBack, mutual };
}

function saveJsonToFile(data, outputPath) {
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 4), "utf8");
  console.log(`Saved to: ${outputPath}`);
}

function formatList(title, list) {
  if (list.length === 0) {
    return `${title}: None`;
  }

  const formattedList = list
    .map((username, index) => `${index + 1}. ${username}`)
    .join("\n");

  return `${title}:\n${formattedList}`;
}

function exportAllPrompt(rl, followers, following) {
  rl.question(
    "\nWould you like to export all followers and following as JSON? (y/n): ",
    (answer) => {
      if (answer.trim().toLowerCase() === "y") {
        rl.question("Enter the directory to save JSON files: ", (directory) => {
          const outputDir = path.resolve(directory.trim());
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }

          const followersPath = path.join(outputDir, "followers.json");
          const followingPath = path.join(outputDir, "following.json");

          saveJsonToFile(followers, followersPath);
          saveJsonToFile(following, followingPath);

          rl.close();
        });
      } else {
        console.log("Skipping export. Exiting.");
        rl.close();
      }
    },
  );
}

function promptUser() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "Enter the path to the followers HTML file: ",
    (followersFile) => {
      if (!fs.existsSync(followersFile.trim())) {
        console.error("The specified followers file does not exist.");
        rl.close();
        return;
      }

      rl.question(
        "Enter the path to the following HTML file: ",
        (followingFile) => {
          if (!fs.existsSync(followingFile.trim())) {
            console.error("The specified following file does not exist.");
            rl.close();
            return;
          }

          const followers = parseHtmlFile(followersFile.trim());
          const following = parseHtmlFile(followingFile.trim());
          const { notFollowingBack, notFollowedBack, mutual } = compareLists(
            followers,
            following,
          );

          rl.question(
            "Choose an option:\n1. See who you're following but not being followed back by.\n2. See who is following you but you're not following back.\n3. See mutual followers.\nEnter your choice (1, 2, 3): ",
            (choice) => {
              switch (choice.trim()) {
                case "1":
                  console.log(
                    formatList("Not following you back", notFollowingBack),
                  );
                  break;
                case "2":
                  console.log(
                    formatList("You're not following back", notFollowedBack),
                  );
                  break;
                case "3":
                  console.log(formatList("Mutual followers", mutual));
                  break;
                default:
                  console.error("Invalid choice.");
              }

              exportAllPrompt(rl, followers, following);
            },
          );
        },
      );
    },
  );
}

promptUser();

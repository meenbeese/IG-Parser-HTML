const fs = require("fs");
const cheerio = require("cheerio");
const readline = require("readline");

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
                  console.log("Not following you back:");
                  console.log(
                    notFollowingBack.length ? notFollowingBack : "None",
                  );
                  break;
                case "2":
                  console.log("You're not following back:");
                  console.log(
                    notFollowedBack.length ? notFollowedBack : "None",
                  );
                  break;
                case "3":
                  console.log("Mutual followers:");
                  console.log(mutual.length ? mutual : "None");
                  break;
                default:
                  console.error("Invalid choice.");
              }

              rl.close();
            },
          );
        },
      );
    },
  );

  rl.on("close", () => {
    console.log("Process completed. Exiting.");
    process.exit(0);
  });
}

promptUser();

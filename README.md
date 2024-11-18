# HTML Parser for Instagram

A Node.js script to analyze and export Instagram follower and following data. This script parses HTML files downloaded from Instagram and identifies relationships between your followers and the people you are following.

## Features

- **Mutual Followers**: See who you follow and who follows you back.
- **Not Following Back**: Identify people you follow who don’t follow you back.
- **Not Followed Back**: Find people who follow you, but you don’t follow them.
- **JSON Export**: Export follower and following data as JSON files.

## Requirements

- **Node.js** (latest LTS release)
- Instagram HTML files (`followers.html` and `following.html`)

## How to Download Data from Instagram

To use this script, you need to download your **followers** and **following** data from Instagram. Follow these steps:

1. **Log in to Instagram**:

   - Open your browser and log in to your Instagram account.

2. **Request Your Data**:

   - Go to your Instagram profile and click on the **More** menu at the bottom left.
   - Navigate to **Settings** and click on the **Accounts Center** banner at the top.
   - Navigate to **Account settings** > **Your information and permissions** > **Download your information**.
   - Click on **Download or transfer information**, then on **Some of your information**.
   - Scroll down, check the box under **Connections** > **Followers and following**, and click next.
   - Click on **Download to device**, choose **All Time** range, `HTML` format and enter your email under **Notify**.
   - Submit your request. You will receive a link to download your data via email within a few minutes to a few hours.

3. **Download the Data**:

   - Open the email from Instagram and click the download link.
   - Log in to your Instagram account if prompted.
   - Download the ZIP file containing your data.

4. **Extract the Files**:

   - Unzip the downloaded file.
   - Locate the `followers.html` and `following.html` files inside the extracted folder.

5. **Place Files in the Script Directory**:
   - Copy the `followers.html` and `following.html` files into a directory (default: `./test`) for processing.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/meenbeese/IG-Parser-HTML.git
   cd IG-Parser-HTML
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Place the Instagram HTML files (followers.html and following.html) into a directory (default: ./test).

## Usage

1. Run the script:
   ```bash
   node index.js
   ```
2. Follow the interactive prompts.

## License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2024 Meenbeese

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

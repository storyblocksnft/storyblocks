import fs from "fs";
import path from "path";
import axios from "axios";

const MORALIS_API_KEY =
  "REDACTED";
const IMAGES_DIR = "./data";

// Build ipfs data for Moralis
const files = fs.readdirSync(IMAGES_DIR);
const ipfsData = [];
for (const file of files) {
  // Get the full paths
  const image = path.join(IMAGES_DIR, file);
  const word = file.split(".")[0];
  const pathData = `images/${word}.svg`;
  const data = fs.readFileSync(image).toString("base64");
  ipfsData.push({ path: pathData, data: data });
}

axios
  .post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", ipfsData, {
    headers: {
      "X-API-KEY": MORALIS_API_KEY,
      "Content-Type": "application/json",
      accept: "application/json",
    },
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch((error) => {
    console.log(error);
  });

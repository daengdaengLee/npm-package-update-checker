const fetch = require("node-fetch");

const npmPackage = async (parent, { name }) => {
  try {
    const response = await fetch(`https://registry.npmjs.org/${name}`);
    const json = await response.json();
    const latestVersion = json["dist-tags"].latest;

    if (typeof latestVersion !== "string") throw new Error("Invalid version");

    return { name, latestVersion };
  } catch {
    return null;
  }
};

const Query = {
  npmPackage
};

exports.Query = Query;

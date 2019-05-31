#! /usr/bin/env node

/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */

const fs = require("fs");
const path = require("path");
const https = require("https");

const BASE_URL = "https://registry.npmjs.org";

const getNextVersion = name =>
  new Promise(resolve =>
    https
      .get(`${BASE_URL}/${name}`, res => {
        try {
          res.setEncoding("utf8");
          let rawData = "";
          res.on("data", chunk => {
            rawData += chunk;
          });
          res.on("end", () => {
            try {
              const json = JSON.parse(rawData);
              resolve(json["dist-tags"].latest);
            } catch (error) {
              resolve(`ERROR : Cannot parse response`);
            }
          });
        } catch (error) {
          resolve(`ERROR : Cannot parse response`);
        }
      })
      .on("error", error => resolve(error.toString()))
  );

(async () => {
  try {
    console.log("Read package.json ...");
    const execPath = process.cwd();
    const packageJsonPath = path.join(execPath, "package.json");
    const packageJsonStr = await new Promise((resolve, reject) =>
      fs.readFile(packageJsonPath, { encoding: "utf8" }, (error, data) => {
        if (error) reject(error);
        resolve(data);
      })
    );
    const packageJsonObj = JSON.parse(packageJsonStr);

    const { dependencies, devDependencies } = packageJsonObj;
    const result = {
      dependencies: [],
      devDependencies: []
    };

    if (dependencies) {
      console.log("Check version updates of dependencies ...");
      for (const [name, prevVersion] of Object.entries(dependencies)) {
        const nextVersion = await getNextVersion(name);
        result.dependencies.push({ name, prevVersion, nextVersion });
      }
    } else {
      console.log("There is no dependencies in package.json");
    }

    if (devDependencies) {
      console.log("Check version updates of devDependencies ...");
      for (const [name, prevVersion] of Object.entries(devDependencies)) {
        const nextVersion = await getNextVersion(name);
        result.devDependencies.push({ name, prevVersion, nextVersion });
      }
    } else {
      console.log("There is no devDependencies in package.json");
    }

    console.log("[dependencies]");
    console.table(result.dependencies);
    console.log("[devDpendencies]");
    console.table(result.devDependencies);
  } catch (error) {
    console.log(
      "Failed to check version updates of dependencies in package.json"
    );
    console.error(error);
    process.exit(1);
  }
})();

const { NpmPackage } = require("./npm-package");

const Query = `
type Query {
  npmPackage(name: String!): NpmPackage
}

${NpmPackage}
`.trim();

exports.Query = Query;

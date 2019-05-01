const { Query } = require("./query");

const typeDefs = `
${Query}
`.trim();

exports.typeDefs = typeDefs;

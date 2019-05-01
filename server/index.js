const { GraphQLServer } = require("graphql-yoga");
const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(
  {
    port: 4000,
    endpoint: "/graphql",
    playground: "/graphiql",
    subscriptions: "/subscribe"
  },
  ({ port }) => console.log(`graphql server started, listening on port ${port}`)
);

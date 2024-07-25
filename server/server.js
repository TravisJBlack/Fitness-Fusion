const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const stripe = require("stripe")(
  "sk_test_51PgZdVElAhzy4uGeVPTVIizjXMqKEKPhyjdK7tC3fo6LuZmEKU9fkkEVZ2ldwegaDbgpYyBjHyqGsr8m9i7qP3T500o17GY0Zk"
);

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: "10",
        quantity: 1,
      },
      {
        price: "25",
        quantity: 1,
      },
      {
        price: "50",
        quantity: 1,
      },
      {
        price: "100",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${server}?success=true`,
    cancel_url: `${server}?canceled=true`,
  });
  res.redirect(303, session.url);
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve up static assets
  app.use("/images", express.static(path.join(__dirname, "../client/images")));

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();

// Publishable key = pk_test_51PgZdVElAhzy4uGesMESjpkxKEKaw5eGllQtvQupIqKRqSEyhMVD6YMozJUx0OpIOOHwZNRswZs9Z238vXJUaJtk000YQFx7LB
// Secret Key = sk_test_51PgZdVElAhzy4uGeVPTVIizjXMqKEKPhyjdK7tC3fo6LuZmEKU9fkkEVZ2ldwegaDbgpYyBjHyqGsr8m9i7qP3T500o17GY0Zk

const { User, Class, Membership } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const stripe = require("stripe")(
  "sk_test_51PgZdVElAhzy4uGeVPTVIizjXMqKEKPhyjdK7tC3fo6LuZmEKU9fkkEVZ2ldwegaDbgpYyBjHyqGsr8m9i7qP3T500o17GY0Zk"
);

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("classes");
    },

    class: async (parent, args) => {
      return Class.find({});
    },

    membership: async (parent, args) => {
      return Membership.find({});
    },

    getSingleClass: async (parent, { name }) => {
      return Class.findOne({ name });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password, age }) => {
      const user = User.create({ username, email, password, age });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);

      return { token, user };
    },
    createStripeCheckoutSession: async () => {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          { price: "10", quantity: 1 },
          { price: "25", quantity: 1 },
          { price: "50", quantity: 1 },
          { price: "100", quantity: 1 },
        ],
        mode: "payment",
        success_url: `${server}?success=true`,
        cancel_url: `${server}?canceled=true`,
      });

      return session.url;
    },

    addClassToUser: async (parent, { _id }, context) => {
      if (context.user) {
        const register = await Class.findOne({ _id });

        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              classes: {
                _id: register._id,
                name: register.name,
                description: register.description,
                price: register.price,
                schedule: register.schedule,
              },
            },
          },
          { new: true, runValidators: true }
        ).populate("classes");
      }
      throw AuthenticationError;
    },

    removeClassFromUser: async (parent, { _id }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { classes: { _id: _id } } },
          { new: true, runValidators: true }
        ).populate("classes");
      }
      throw AuthenticationError;
    },

    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
    },

    addMembershipToUser: async (parent, { _id }, context) => {
      if (context.user) {
        const membership = await Membership.findOne({ _id });

        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              membership: {
                _id: membership._id,
                name: membership.name,
                description: membership.description,
                price: membership.price,
              },
            },
          },
          { new: true, runValidators: true }
        ).populate("classes");
      }
      throw AuthenticationError;
    },
  },
};
module.exports = resolvers;

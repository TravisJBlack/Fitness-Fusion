const { User, Class, Membership } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("classes");
      }
      throw new AuthenticationError("Not logged in");
    },
    classes: async () => {
      // Ensure the query name matches
      return Class.find({});
    },
    memberships: async () => {
      // Ensure the query name matches
      return Membership.find({});
    },
    getSingleClass: async (parent, { id }) => {
      return Class.findById(id);
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password, age }) => {
      const user = await User.create({ username, email, password, age });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Invalid credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Invalid credentials");
      }
      const token = signToken(user);

      return { token, user };
    },
    addClassToUser: async (parent, { id }, context) => {
      if (context.user) {
        const register = await Class.findById(id);

        return User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { classes: register } },
          { new: true, runValidators: true }
        ).populate("classes");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeClassFromUser: async (parent, { id }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          context.user._id,
          { $pull: { classes: id } },
          { new: true, runValidators: true }
        ).populate("classes");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndDelete(context.user._id);
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addMembershipToUser: async (parent, { id }, context) => {
      if (context.user) {
        const membership = await Membership.findById(id);

        return User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { membership } },
          { new: true, runValidators: true }
        ).populate("classes");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;

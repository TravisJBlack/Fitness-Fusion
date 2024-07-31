const { User, Class, Membership } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("classes");
      }
      throw new AuthenticationError("You must be logged in!");
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

    getClassesByName: async (parent, { name }) => {
      const classes = await Class.find({
        name: { $regex: name, $options: "i" },
      });
      return classes;
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
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    addClassToUser: async (parent, { name, isID }, context) => {
      if (context.user) {
        console.log(context.user);
        const register = isID
          ? await Class.findOne({ _id: name })
          : await Class.findOne({ name });
        console.log(register);
        if (!register) {
          throw new Error("Class not found");
        }
        const user = await User.findByIdAndUpdate(
          context.user._id,
          {
            $addToSet: { classes: register._id },
          },
          { new: true, runValidators: true }
        ).populate("classes");
        console.log(user);
        return user;
      }
      throw new AuthenticationError("You must be logged in!");
    },

    removeClassFromUser: async (parent, { name }, context) => {
      if (context.user) {
        const register = await Class.findOne({ name });
        if (!register) {
          throw new Error("Class not found");
        }
        return User.findByIdAndUpdate(
          context.user._id,
          { $pull: { classes: register._id } },
          { new: true, runValidators: true }
        ).populate("classes");
      }
      throw new AuthenticationError("You must be logged in!");
    },

    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndDelete(context.user._id);
      }
      throw new AuthenticationError("You must be logged in!");
    },

    addMembershipToUser: async (parent, { _id }, context) => {
      if (context.user) {
        const membership = await Membership.findById(_id);

        if (!membership) {
          throw new Error("Membership not found");
        }

        return User.findByIdAndUpdate(
          context.user._id,
          {
            $addToSet: { membership: membership._id },
          },
          { new: true, runValidators: true }
        ).populate("membership");
      }
      throw new AuthenticationError("You must be logged in!");
    },
  },
};

module.exports = resolvers;

const { User, Class, Membership } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('classes');
            }
            throw AuthenticationError;
        },

        class: async (parent, args) => {
            return Class.find({});
        },

        membership: async (parent, args) => {
            return Membership.find({});
        },

        getSingleClass: async (parent, { name }) => {
            return Class.findOne({ name })
        }
    },

    Mutation: {
        addUser: async (parent, { username, email, password, age }) => {
            const user = User.create({ username, email, password, age })
            const token = signToken(user);
            return { token, user }
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

            return { token, user }
        },

        addClassToUser: async (parent, { _id }, context) => {
            if (context.user) {
                const register = await Class.findOne({ _id });
                
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { classes: { _id: register._id, name: register.name, description: register.description, price: register.price, schedule: register.schedule, image: register.image } } },
                    { new: true, runValidators: true }
                ).populate('classes')
            }
            throw AuthenticationError;
        },

        removeClassFromUser: async (parent, { _id }, context) => {
            if (context.user) {

                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { classes: { _id: _id, } } },
                    { new: true, runValidators: true }
                ).populate('classes')
            }
            throw AuthenticationError;
        },

        removeUser: async (parent, args, context) => {
            if (context.user) {
                return User.findOneAndDelete(
                    { _id: context.user._id },
                )
            }
        },

        addMembershipToUser: async (parent, { _id }, context) => {
            if (context.user) {
                const membership = await Membership.findOne({ _id });

                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { membership: { _id: membership._id, name: membership.name, description: membership.description, price: membership.price } } },
                    { new: true, runValidators: true }
                ).populate('classes')
            }
            throw AuthenticationError;
        }
    }
}
module.exports = resolvers;
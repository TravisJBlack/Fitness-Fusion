const { User, Class } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
    Query: {
        user: async (parent, { username }) => {
            return User.findOne({username}).populate('classes');
        },

        class: async () => {
            return Class.find();
        }
    },

    Mutation: {
        addUser: async (parent, { username, email, password, age }) => {
            const user = User.create({ username, email, password, age })
            const token = signToken(user);
            return { token, user }
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({email});

            if(!user){
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw){
                throw AuthenticationError;
            }
            const token = signToken(user);

            return { token, user}
        },

        addClass: async (parent, { name, description, price, schedule}, context) => {
            if(context.user){
                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $addToSet: {clasess: {name, description, price, schedule}}}
                )
            }
            throw AuthenticationError;
        }
    }
}
module.exports = resolvers;
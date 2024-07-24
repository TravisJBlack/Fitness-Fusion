const { User, Class } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
    Query: {
        user: async (parent, { username }) => {
            return User.findOne({username}).populate('classes');
        },

        class: async (parent, args) => {
            return Class.find({});
        },

        getSingleClass: async (parent, {name}) => {
            return Class.findOne({name})
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

        addClassToUser: async (parent, {_id}, context) => {
            if(context.user){
                const register = await Class.findOne({_id});
                console.log(register)

                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $addToSet: {classes:  {_id: register._id, name: register.name, description: register.description, price: register.price, schedule: register.schedule}}},
                    {new: true, runValidators: true}
                ).populate('classes')
            }
            throw AuthenticationError;
        },

        removeClassFromUser: async (parent, {_id}, context) => {
            if(context.user){

                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $pull: {classes:  {_id: _id,}}},
                    {new: true, runValidators: true}
                ).populate('classes')
            }
            throw AuthenticationError;
        },

        removeUser: async (parent, args, context) => {
            if(context.user) {
                return User.findOneAndDelete(
                    {_id: context.user._id},
                )
            }
        }
    }
}
module.exports = resolvers;
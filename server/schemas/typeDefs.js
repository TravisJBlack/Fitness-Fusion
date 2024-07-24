const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        age: Int
        classes: [Class]
    }

    type Class {
        _id: ID
        name: String
        description: String
        price: Float
        schedule: String
    }

    type Auth {
        token: ID!
        user: User
    }


    type Query {
        user(username: String!): User
        getSingleClass(name: String!): Class
        class: [Class]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!, age: Int!): Auth
        login(email: String!, password: String!): Auth
        addClassToUser(_id: ID!): User
        removeClassFromUser(_id: ID!): User      
        removeUser(_id: ID!): User
    }
`

module.exports = typeDefs;
const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
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
        class: Class
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!, age: Int!): Auth
        login(email: String!, password: String!): Auth
        addClass(classId: ID!, name: String, description: String, price: Int, schedule: String): Class
    }
`

module.exports = typeDefs;
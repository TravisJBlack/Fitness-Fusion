import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
        _id
        username
        email
        age
        membership {
            _id
            name
            description
            price
        }
        classes {
            _id
            name
            description
            schedule
            price
        }
        }
    }
`;

export const QUERY_CLASS = gql`
    query class {
        class {
        _id
        name
        description
        schedule
        price
        }
    }
`;

export const QUERY_MEMBERSHIP = gql`
    query membership {
        membership {
        _id
        name
        description
        price
        }
    }
`;

export const QUERY_SINGLECLASS = gql`
    query getSingleClass($id: ID!) {
        getSingleClass(_id: $id) {
        _id
        name
        description
        schedule
        price
        }
    }
`;
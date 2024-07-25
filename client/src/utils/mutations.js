import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!, $age: Int!) {
    addUser(username: $username, email: $email, password: $password, age: $age) {
      token
      user {
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
  }
`;

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
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
  }
`;

export const ADDCLASSTOUSER = gql`
mutation addClassToUser($id: ID!) {
    addClassToUser(_id: $id) {
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

export const REMOVECLASSFROMUSER = gql`
mutation removeClassFromUser($id: ID!) {
    removeClassFromUser(_id: $id) {
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

export const REMOVEUSER = gql`
mutation removeUser($id: ID!) {
    removeUser(_id: $id) {
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

export const ADDMEMBERSHIPTOUSER = gql`
mutation addMembershipToUser($id: ID!) {
    addMembershipToUser(_id: $id) {
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

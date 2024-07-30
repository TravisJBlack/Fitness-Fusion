import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user {
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
        image
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
      image
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
  query getSingleClass($name: String!) {
    getSingleClass(name: $name) {
      _id
      description
      image
      name
      price
      schedule
    }
  }
`;
export const QUERY_CLASSES_BY_NAME = gql`
  query getClassesByName($name: String!) {
    getClassesByName(name: $name) {
      _id
      description
      image
      name
      price
      schedule
    }
  }
`;

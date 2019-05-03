import { gql } from 'apollo-server-express';

// GraphQL: TypeDefs
const TYPEDEFS = gql`

type Query {
    test: String,
    test_query: Test
  }

type Test {
    test_field_1: String
    test_field_2: Int
    test_field_3: Boolean
  }
`;

export default TYPEDEFS;
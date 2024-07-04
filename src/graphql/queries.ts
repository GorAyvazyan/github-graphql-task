import { gql } from '@apollo/client';
export const GET_REPOSITORIES = gql`
  query GetRepositories($query: String!, $first: Int, $after: String, $before: String, $last: Int) {
    search(
      query: $query
      type: REPOSITORY
      first: $first
      after: $after
      before: $before
      last: $last
    ) {
      repositoryCount
      edges {
        cursor
        node {
          ... on Repository {
            id
            name
            owner {
              login
              avatarUrl
            }
            languages(first: 10) {
              edges {
                node {
                  name
                  color
                }
              }
            }
            stargazerCount
            updatedAt
            url
            description
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

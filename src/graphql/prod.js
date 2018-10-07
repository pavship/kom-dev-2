import gql from 'graphql-tag'

export const upsertProd = gql`
  mutation UpsertProd ($input: ProdInput!) {
    upsertProd(input: $input) {
      id
      melt
      meltShift
      number
      year
      isSpoiled
      hasDefect
      progress
      htmlNote
      model {
        id
        name
        article
      }
      dept {
        id
      }
    }
  }
`
export const moveProds = gql`
  mutation moveProds ( $to: ID!, $prodIds: [ID!]! ) {
    moveProds (
      to: $to,
      prodIds: $prodIds
    ) {
      prods {
        id
        dept {
          id
        }
      }
      to
    }
  }
`
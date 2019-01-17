import gql from 'graphql-tag'

export const allDepts = gql`
  query AllDepts {
    depts {
      id
      name
      type
      prods {
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
        order {
          id
          fullnum
        }
      }
    }
  }
`

export const deptFragment = gql`
  fragment myDept on Dept {
    id
    name
    type
    prods {
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
      order {
        id
        fullnum
      }
    }
  }
`
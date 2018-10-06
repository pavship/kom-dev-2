import gql from 'graphql-tag'

// const allDepts = gql`
//   query AllDepts {
//     allDepts (orderBy: type_ASC) {
//       id
//       name
//       type
//       _prodsMeta {
//        count
//       }
//       deptModels {
//         id
//         model {
//           id
//           name
//         }
//         allProds: _prodsMeta {
//           count
//         }
//         prodsReady: _prodsMeta(filter: {
//          progress: 100
//         }) {
//           count
//         }
//         prodsDefect: _prodsMeta(filter: {
//          hasDefect: true
//         }) {
//           count
//         }
//         prodsSpoiled: _prodsMeta(filter: {
//          isSpoiled: true
//         }) {
//          count
//         }
//         prods {
//           id
//           melt
//           meltShift
//           number
//           year
//           isSpoiled
//           hasDefect
//           progress
//           note
//         }
//       }
//     }
//   }
// `
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
      }
    }
  }
`
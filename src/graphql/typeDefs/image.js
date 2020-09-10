import { gql } from 'apollo-server-express';

export default gql`
    extend type Query{
        getAllImage: String!
    }
    extend type Mutation {
        uploadSingle(file: Upload!): FileResp!
        mulipleUploads(files: [Upload!]!): [FileResp!]!
    }

    type FileResp {
        serverFile: String!
    }
`
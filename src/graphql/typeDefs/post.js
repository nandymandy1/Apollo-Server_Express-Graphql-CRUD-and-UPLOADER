import { gql } from 'apollo-server-express';

export default gql`
    extend type Query{
        getAllPost:[Post!]!
        postById(id: String!): Post!
    },

    extend type Mutation{
        deletePostById(id: String!): String!
        createNewPost(title:String!, content: String!, postImage: String): Post!
        updatePostById(id:String!, title: String!, content: String!, postImage: String): Post!
    }

    type Post {
        id: ID!
        title:String!
        content: String!
        postImage: String
        createdAt: String!
        updatedAt: String!
    }
`
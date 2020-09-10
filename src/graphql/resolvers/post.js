export default {
    Query: {
        getAllPost: async (_, args, { Post }) => {
            let posts = await Post.find();
            return posts;
        },
        postById: async (_, { id }, { Post }) => {
            let post = await Post.findById(id);
            return post;
        }
    },
    Mutation: {
        createNewPost: async (_, { title, content, postImage }, { Post }) => {
            let newPost = new Post({ title, content, postImage });
            let resp = await newPost.save();
            return resp;
        },
        updatePostById: async (_, { id, title, content, postImage }, { Post }) => {
            let updatedPost = await Post.findByIdAndUpdate(id, {
                title, content, postImage
            }, { new: true });
            return updatedPost;
        },
        deletePostById: async (_, { id }, { Post }) => {
            await Post.findOneAndDelete(id);
            return "Post deleted successfully."
        }
    }
}
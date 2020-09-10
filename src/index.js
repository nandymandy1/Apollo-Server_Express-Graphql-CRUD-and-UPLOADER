import { join } from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { success, error } from 'consola';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

import { Post } from './models';

import { DB, PORT } from './config';

// Initialize App
const app = express();

// Set Express Static Directory
app.use(express.static(join(__dirname, './uploads')));

// Apply middleware
app.use(bodyParser.json());

// Create Apollo-Server Instance
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        Post
    }
});

const startApp = async () => {
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
        });
        success({ message: 'Successfully connected with the database', badge: true });
        server.applyMiddleware({ app, cors: true });
        app.listen(PORT, () => success({ message: `Server started on port ${PORT}`, badge: true }));
    } catch (err) {
        console.log(err);
        error({ message: err.message, badge: true });
    }
}

startApp();
import { join, parse } from 'path';
import { createWriteStream } from 'fs';
import { BASE_URL } from '../../config';

export default {
    Query: {
        getAllImage: () => {
            return 'HELLO I AM IMAGE RESOLVER.'
        }
    },
    Mutation: {
        uploadSingle: async (_, { file }) => {
            try {
                const { filename, createReadStream } = await file;
                let stream = createReadStream();

                let { ext, name } = parse(filename);
                name = name.replace(/([^a-z0-9 ]+)/gi, '-').replace(' ', '_');
                let serverFile = join(__dirname, `../../uploads/${name}-${Date.now()}${ext}`);
                serverFile = serverFile.replace(' ', '_');
                let writeStream = await createWriteStream(serverFile);
                await stream.pipe(writeStream);
                serverFile = `${BASE_URL}${serverFile.split('uploads')[1]}`;
                return {
                    serverFile
                }
            } catch (err) {
                console.log("ERROR_UPLOAD_SINGLE", err);
                throw err;
            }
        },
        mulipleUploads: async (_, { files }) => {
            let uploadedFiles = [];
            for (let i = 0; i < files.length; i++) {
                const { filename, createReadStream } = await files[i];
                let stream = createReadStream();
                let { ext, name } = parse(filename);
                name = name.replace(/([^a-z0-9 ]+)/gi, '-').replace(' ', '_');
                let serverFile = join(__dirname, `../../uploads/${name}-${Date.now()}${ext}`);
                serverFile = serverFile.replace(' ', '_');
                let writeStream = await createWriteStream(serverFile);
                await stream.pipe(writeStream);
                serverFile = `${BASE_URL}${serverFile.split('uploads')[1]}`;
                uploadedFiles.push({ serverFile });
            }
            return uploadedFiles;
        }
    }
}
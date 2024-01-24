import * as mongoose from 'mongoose';

export const FileSchema = new mongoose.Schema({
    filename: String,
    originalname: String,
    destination: String,
    path: String,
    size: Number,
});

export interface File extends mongoose.Document {
    filename: string;
    originalname: string;
    destination: string;
    path: string;
    size: number;
}

import { Databases, ID, Query, Storage } from "appwrite";
import client from "./client";
import type { IArticleCreate, IArticleUpdate } from "../types/article.types";
import config from "../config/environment-variables";

export class ArticleService {
    private readonly databases;
    private readonly bucket;
    constructor() {
        this.databases = new Databases(client);
        this.bucket = new Storage(client);
    }
    async createPost({ title, slug, content, featuredImage, status, userId }: IArticleCreate) {
        try {
            return await this.databases.createDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug, { title, content, featuredImage, status, userId });
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }
    async updatePost(slug: string, { title, content, featuredImage, status }: IArticleUpdate) {
        try {
            return await this.databases.updateDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug, { title, content, featuredImage, status });
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }
    async deletePost(slug: string) {
        try {
            await this.databases.deleteDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug);
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }
    async getPost(slug: string) {
        try {
            return await this.databases.getDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug);
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return null;
        }
    }
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(config.appwriteDatabaseId, config.appwriteCollectionId, queries);
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }
    async uploadFile(file: File) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }
    async deleteFile(fileId: string) {
        try {
            await this.bucket.deleteFile(config.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }
    getFilePreview(fileId: string) {
        return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
    }
}
const service = new ArticleService();
export default service;
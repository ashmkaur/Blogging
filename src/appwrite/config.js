import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject("6698ee2900083aa4262b");
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // https://appwrite.io/docs/references/cloud/client-web/databases

    async createPost({title, slug, content, featuredimage, status, user_id}){
        try {
            return await this.databases.createDocument(
                "6698efd1000702209c28",//db id
                '6698f010003b66f63982',// collection id
                slug,//doc id
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    user_id,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredimage, status}){
        try {
            return await this.databases.updateDocument(
                "6698efd1000702209c28",// db id
                '6698f010003b66f63982',// collection id
                slug,//doc id
                {
                    title,
                    content,
                    featuredimage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                "6698efd1000702209c28",
                '6698f010003b66f63982',
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                "6698efd1000702209c28",
                '6698f010003b66f63982',
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                "6698efd1000702209c28",
                '6698f010003b66f63982',
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    // https://appwrite.io/docs/references/cloud/client-web/storage

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                '6698f159002ebe94eb56',//bucket id
                ID.unique(),// file id
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                '6698f159002ebe94eb56',// bucket id
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            '6698f159002ebe94eb56',
            fileId
        )
    }
}


const service = new Service()
export default service
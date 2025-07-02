import { Client } from "appwrite";
import config from "../config/environment-variables";

const client=new Client();
client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
export default client;
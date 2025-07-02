import { Account, ID } from "appwrite";
import client from "./client";
import type { IUserCreate, IUserLogin } from "../types/auth.types";

export class AuthService {
    private readonly account;
    constructor() {
        this.account = new Account(client);
    }
    async createAccount({ email, password, name }: IUserCreate) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return userAccount;
                //return this.login({ email, password });
            }
        } catch (error) {
            throw error;
        }
        return null;
    }
    async login({ email, password }: IUserLogin) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }
    async getCurrentAccount() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}
const authService = new AuthService();
export default authService;
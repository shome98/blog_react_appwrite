export interface IArticleCreate {
    title: string,
    slug: string,
    content: string,
    featuredImage: string;
    status: string;
    userId: string;
}
export interface IArticleUpdate {
    title: string,
    content: string,
    featuredImage: string;
    status: string;
}
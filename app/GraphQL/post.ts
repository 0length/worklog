import { gql } from 'apollo-server-express'
import { prisma } from '../../prisma/src/generated/prisma-client'

export const typeDefs =  gql`
type Post {
    id: ID!
    title: String!
    p: String
    author_name: String!
    img_url: String!
    text_content: String
    published_at: String
    view_cont: String!
    interisting_count: Int!
    social_links: String
}

    input PostWhereUniqueInput {
        id: ID
        title: String!
    }

    extend type Query {
        posts: [Post]
        post(id: ID, title: String!):Post
    }

    extend type Mutation {
        createPost(title: String!, p: String, author_name: String!, img_url: String!, text_content: String, published_at: String, view_cont: String!, interisting_count: Int!, social_links: String):Post
        updatePost(where: PostWhereUniqueInput!, title: String, p: String, author_name: String, img_url: String, text_content: String, published_at: String, view_cont: String, interisting_count: Int, social_links: String):Post
        deletePost(where: PostWhereUniqueInput!): Post
    }   

`

export const resolvers = {
    Query: {
        posts: async (root: any, args: any, context: any, info: any)=> await prisma.posts(),
        post: async (obj: any, args: any, context: any, info: any) => await prisma.post({id: args.id})
    },
    Mutation: {
        createPost: async (obj: any, {title, p, author_name, img_url, text_content, published_at, view_cont, interisting_count, social_links}: any, context: any, info: any)=>{
            const postWithNameAlreadyExists = await prisma.post({title});
            if(postWithNameAlreadyExists){
            throw new Error(` ${name} already in use`);
            }
            const createdPost = await prisma.createPost({title, p, author_name, img_url, text_content, published_at, view_cont, interisting_count, social_links});
            return createdPost;
        },
        updatePost: async (obj: any, { where, title, p, author_name, img_url, text_content, published_at, view_cont, interisting_count, social_links }: any, context: any, info: any)=>{
            const postWhereName = await prisma.post({title:where.title});
            if(!postWhereName){
                throw new Error(`Post with ${name} is doesn't exists`);
            }
            !title&& !p&& !author_name&& !img_url&& !text_content&& !published_at&& !view_cont&& !interisting_count&& !social_links? ()=>{throw new Error("nothing to update")}:!title?title=postWhereName.title:!p?p=postWhereName.p:!author_name?author_name=postWhereName.author_name:!img_url?img_url=postWhereName.img_url:!text_content?text_content=postWhereName.text_content:!published_at?published_at=postWhereName.published_at: !view_cont?view_cont=postWhereName.view_cont: !interisting_count?interisting_count=postWhereName.interisting_count: !social_links?social_links=postWhereName.social_links:null 
            const updatedPost = await prisma.updatePost({data:{title, p, author_name, img_url, text_content, published_at, view_cont, interisting_count, social_links},where:{title:where.title}})
            return updatedPost;
        },
        deletePost: async (obj: any, {where}: any, context: any, info: any)=>{
            const {title} = where
            const postWhereName = await prisma.post({title});
            if(!postWhereName){
                throw new Error(`Post with ${title} is doesn't exists`);
            }
            const deletedPost = await prisma.deletePost({title});
            return deletedPost;
        }
    }
}
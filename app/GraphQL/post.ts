import { gql } from 'apollo-server-express'
import { prisma } from '../../prisma/src/generated/prisma-client'
import { getAccess } from '../lib/utils/getAccess'

export const typeDefs =  gql`
type Post {
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
        title: String!
    }

    extend type Query {
        posts: [Post]
        post(title: String!):Post
    }

    extend type Mutation {
        createPost(title: String!, p: String, author_name: String!, img_url: String!, text_content: String, published_at: String, view_cont: String!, interisting_count: Int!, social_links: String):Post
        updatePost(where: PostWhereUniqueInput!, title: String, p: String, author_name: String, img_url: String, text_content: String, published_at: String, view_cont: String, interisting_count: Int, social_links: String):Post
        deletePost(where: PostWhereUniqueInput!): Post
    }   

`

export const resolvers = {
    Query: {
        posts: async (root: any, args: any, context: any, info: any)=>{
            const  access: any = await getAccess(context)
            const result: any = await prisma.posts()
            if(access.post.indexOf("r")===-1){throw new Error("No Access")}else{return result}
        },
        post: async (obj: any, args: any, context: any, info: any) =>{
            const  access: any = await getAccess(context)
            const result: any = await prisma.post({title: args.title})
            if(access.post.indexOf("r")===-1){throw new Error("No Access")}else{return result}
        }
    },
    Mutation: {
        createPost: async (obj: any, {title, p, author_name, img_url, text_content, published_at, view_cont, interisting_count, social_links}: any, context: any, info: any)=>{
            const  access: any = await getAccess(context)
            const result: any = async ()=>{
                const postWithNameAlreadyExists = await prisma.post({title});
                if(postWithNameAlreadyExists){
                throw new Error(`Already Exist`);
                }
                const createdPost = await prisma.createPost({title, p, author_name, img_url, text_content, published_at, view_cont, interisting_count, social_links});
                return createdPost;
            }
            if(access.post.indexOf("c")===-1){throw new Error("No Access")}else{return result}
        },
        updatePost: async (obj: any, { where, title, p, author_name, img_url, text_content, published_at, view_cont, interisting_count, social_links }: any, context: any, info: any)=>{
            const  access: any = await getAccess(context)
            const result: any = async ()=>{
                const postWhereName = await prisma.post({title:where.title});
                if(!postWhereName){
                    throw new Error(`Not Found`);
                }
                !title&& !p&& !author_name&& !img_url&& !text_content&& !published_at&& !view_cont&& !interisting_count&& !social_links? ()=>{throw new Error("nothing to update")}:!title?title=postWhereName.title:!p?p=postWhereName.p:!author_name?author_name=postWhereName.author_name:!img_url?img_url=postWhereName.img_url:!text_content?text_content=postWhereName.text_content:!published_at?published_at=postWhereName.published_at: !view_cont?view_cont=postWhereName.view_cont: !interisting_count?interisting_count=postWhereName.interisting_count: !social_links?social_links=postWhereName.social_links:null 
                const updatedPost = await prisma.updatePost({data:{title, p, author_name, img_url, text_content, published_at, view_cont, interisting_count, social_links},where:{title:where.title}})
                return updatedPost;    
            }
            if(access.post.indexOf("u")===-1){throw new Error("No Access")}else{return result}
        },
        deletePost: async (obj: any, {where}: any, context: any, info: any)=>{
            const  access: any = await getAccess(context)
            const result: any = async ()=>{
                const {title} = where
                const postWhereName = await prisma.post({title});
                if(!postWhereName){
                    throw new Error(`Not Found`);
                }
                const deletedPost = await prisma.deletePost({title});
                return deletedPost;
            }
            if(access.post.indexOf("d")===-1){throw new Error("No Access")}else{return result}
        }
    }
}
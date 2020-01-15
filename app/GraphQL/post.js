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
        posts: async (root, args, context, info)=> await prisma.post(),
        post: async (obj, args, context, info) => await prisma.post({id: args.id})
    },
    Mutation: {
        createPost: async (obj, {title, p, author_name, img_url, text_content, published_at, view_cont, interisting_count, social_links}, context, info)=>{
            const postWithNameAlreadyExists = await prisma.post({name});
            if(postWithNameAlreadyExists){
            throw new Error(` ${name} already in use`);
            }
            const createdPost = await prisma.createPost({title, p, author_name, img_url, text_content, published_at, view_cont, interisting_count, social_links});
            return createdPost;
        },
        updatePost: async (obj, { where, title, p, author_name, img_url, text_content, published_at, view_cont, interisting_count, social_links }, context, info)=>{
            const postWhereName = await prisma.post({name:where.name});
            if(!postWhereName){
                throw new Error(`Post with ${name} is doesn't exists`);
            }
            !title&& !p&& !author_name&& !img_url&& !ext_content&& !published_at&& !view_cont&& !interisting_count&& !social_links? ()=>{throw new Error("nothing to update")}:!title?title=workWhereName.title:!p?p=workWhereName.p:!author_name?author_name=workWhereName.author_name:!img_url?img_url=workWhereName.img_url:!text_content?text_content=workWhereName.text_content:!published_at?published_at=workWhereName.published_at: !view_cont?view_cont=workWhereName.view_cont: !interisting_count?interisting_count=workWhereName.interisting_count: !social_links?social_links=workWhereName.social_links:null 
            const updatedPost = await prisma.updatePost({data:{title, p, author_name, img_url, text_content, published_at, view_cont, interisting_count, social_links},where:{name:where.title}})
            return updatedPost;
        },
        deletePost: async (obj, {where}, context, info)=>{
            const {name} = where
            const postWhereName = await prisma.post({name});
            if(!postWhereName){
                throw new Error(`Post with ${name} is doesn't exists`);
            }
            const deletedPost = await prisma.deletePost({name});
            return deletedPost;
        }
    }
}
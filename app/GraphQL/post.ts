import { gql } from 'apollo-server-express'
import { Post, prisma } from '../../prisma/src/generated/prisma-client'
import { getAccess } from '../lib/utils/getAccess'
import { BehaviorSubject } from 'rxjs'
import observableToIterator from '../lib/utils/observableToAsyncIterator'
import { map } from 'rxjs/operators'

const postSub =  async ()=>await prisma.posts()
const postSubject = new BehaviorSubject(postSub())

export const typeDefs =  gql`
type Post {
    title: String!
    p: String
    author_name: String!
    img_url: String!
    text_content: String
    published_at: String
    view_count: Int!
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
        createPost(title: String!, p: String, img_url: String!, text_content: String, published_at: String, view_count: Int!, interisting_count: Int!, social_links: String):Post
        updatePost(where: PostWhereUniqueInput!, title: String, p: String, author_name: String, img_url: String, text_content: String, published_at: String, view_count: String, interisting_count: Int, social_links: String):Post
        deletePost(where: PostWhereUniqueInput!): Post
    }


    extend type Subscription {
        posts: [Post]
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
        // tslint:disable-next-line: max-line-length
        createPost: async (obj: any, {title, p, img_url, text_content, published_at, view_count, interisting_count, social_links}: Post, context: any, info: any)=>{
            const  access: any = await getAccess(context)
            const result: any = async ()=>{
                const postWithNameAlreadyExists = await prisma.post({title})
                if(postWithNameAlreadyExists){
                    throw new Error(`Already Exist`)
                }
                // tslint:disable-next-line: max-line-length
                const createdPost = await prisma.createPost({title, p: p.split("'").join('"'), author_name: access.owner.user.name, img_url, text_content: text_content.split("'").join('"'), published_at, view_count, interisting_count, social_links})
                postSubject.next(postSub())
                return createdPost
            }
            if(access.post.indexOf("c")===-1){throw new Error("No Access")}else{return result()}
        },
        // tslint:disable-next-line: max-line-length
        updatePost: async (obj: any, { where, title, p, author_name, img_url, text_content, published_at, view_count, interisting_count, social_links }: any, context: any, info: any)=>{
            const  access: any = await getAccess(context)
            const result: any = async ()=>{
                const postWhereName = await prisma.post({title:where.title})
                if(!postWhereName){
                    throw new Error(`Not Found`)
                }
                // tslint:disable-next-line: max-line-length no-unused-expression
                !title&& !p&& !author_name&& !img_url&& !text_content&& !published_at&& !view_count&& !interisting_count&& !social_links? ()=>{throw new Error("nothing to update")}:!title?title=postWhereName.title:!p?p=postWhereName.p:!author_name?author_name=postWhereName.author_name:!img_url?img_url=postWhereName.img_url:!text_content?text_content=postWhereName.text_content:!published_at?published_at=postWhereName.published_at: !view_count?view_count=postWhereName.view_count: !interisting_count?interisting_count=postWhereName.interisting_count: !social_links?social_links=postWhereName.social_links:null
                // tslint:disable-next-line: max-line-length
                const updatedPost = await prisma.updatePost({data:{title, p: p.split("'").join('"'), author_name, img_url, text_content, published_at, view_count, interisting_count, social_links},where:{title:where.title}})
                postSubject.next(postSub())
                return updatedPost
            }
            if(access.post.indexOf("u")===-1){throw new Error("No Access")}else{return result()}
        },
        deletePost: async (obj: any, {where}: any, context: any, info: any)=>{
            const  access: any = await getAccess(context)
            const result: any = async ()=>{
                const {title} = where
                const postWhereName = await prisma.post({title})
                if(!postWhereName){
                    throw new Error(`Not Found`)
                }
                const deletedPost = await prisma.deletePost({title})
                postSubject.next(postSub())
                return deletedPost
            }
            if(access.post.indexOf("d")===-1){throw new Error("No Access")}else{return result()}
        }
    },
    Subscription: {
        posts: {
            subscribe: () => {
                return observableToIterator(
                    postSubject.pipe(map((item: any)=>({posts: item})))
                )
            },
        }
    }
}
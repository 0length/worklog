import { gql } from 'apollo-server-express'
import { prisma } from '../../prisma/src/generated/prisma-client'
import { getAccess } from '../lib/utils/getAccess'
import observableToIterator from '../lib/utils/observableToAsyncIterator'
import { map } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs'

const commentSub =  async ()=>await prisma.comments()
const commentSubject = new BehaviorSubject(commentSub())

export const typeDefs =  gql`
    type Comment {
        id: ID
        #kosong
    }

    input commentWhereUniqueInput {
        id: ID
    }

    extend type Query {
        comments: [Comment]
        postComments(post_title: String): [Comment]
        comment(id: ID): Comment
    }

    extend type Mutation {
        createComment():Comment
        updateComment(where: commentWhereUniqueInput!, ):Comment
        deleteComment(where: commentWhereUniqueInput!): Comment
    }

    extend type Subscription {
        comments: [Comment]
    }

`

export const resolvers = {
    Query: {
        comment: async (root: any, {id}: any, context: any, info: any)=>{
            const  access: any = await getAccess(context)
            const result: any = await prisma.comment({id})
            if(access.work.indexOf("r")===-1){throw new Error("No Access")}else{return result}
        },
        comments: async (root: any, args: any, context: any, info: any)=>{
            const  access: any = await getAccess(context)
            const result: any = await prisma.comments()
            if(access.work.indexOf("r")===-1){throw new Error("No Access")}else{return result}
        },
        postComments: async (root: any, args: any, context: any, info: any)=> {
            const  access: any = await getAccess(context)
            const result: any = await prisma.comments({where: {post_title: ""}})
            if(access.work.indexOf("r")===-1){throw new Error("No Access")}else{return result}
        }
    },
    Mutation: {
        createComment: async (obj: any, {parent_id, post_title, text_content}: any, context: any, info: any)=>{
            const  access: any = await getAccess(context)
            const result: any = async () => {
                // tslint:disable-next-line: max-line-length
                const createdComment = await prisma.createComment({post_title, parent_id, user_username: access.owner.user.name, text_content})
                commentSubject.next(commentSub())
                return createdComment
            }
            if(access.comments.indexOf("c")===-1){throw new Error("No Access")}else{return result()}

        },
        updateComment: async (obj: any, { where, parent_id, post_title, text_content }: any, context: any, info: any)=>{
            const  access: any = await getAccess(context)
            const result: any = async () => {
                const commentWhereName = await prisma.comment({id: where.id})
                if(!commentWhereName){
                    throw new Error(`Not found`)
                }
                /**
                 * using original if undefine
                 */
                // tslint:disable-next-line: max-line-length no-unused-expression
                !parent_id && !post_title && !text_content ?()=>{throw new Error("nothing to update")}:!parent_id?parent_id=commentWhereName.parent_id:!post_title?post_title=commentWhereName.post_title:!text_content?text_content=commentWhereName.text_content:null
                // tslint:disable-next-line: max-line-length
                const updatedComment = await prisma.updateComment({data:{parent_id, post_title, text_content},where:{id:where.id}})
                commentSubject.next(commentSub())
                return updatedComment
            }
            if(access.comment.indexOf("u")===-1){throw new Error("No Access")}else{return result()}
        },
        deleteComment: async (obj: any, {where}: any, context: any, info: any)=>{
            const  access: any = await getAccess(context)
            const result: any = async () => {
                const {id} = where
                const commentWhereName = await prisma.comment({id})
                if(!commentWhereName){
                    throw new Error(`Not found`)
                }
                const deletedComment = await prisma.deleteComment({id})
                commentSubject.next(commentSub())
                return deletedComment
            }
            if(access.comment.indexOf("d")===-1){throw new Error("No Access")}else{return result()}
        }
    },
    Subscription: {
        comments: {
            subscribe: () => {
                return observableToIterator(
                    commentSubject.pipe(map((item: any)=>({comments: item})))
                )
            },
        }
    }
}
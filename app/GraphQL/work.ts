import { gql } from 'apollo-server-express'
import { prisma } from '../../prisma/src/generated/prisma-client'
import { getUserId } from '../lib/utils/json-web-token/verifyer';
import { getAccess } from '../lib/utils/getAccess';

export const typeDefs =  gql`
    type Work {
        id: ID
        name: String
        p: String
        simple_caption: String
        img_url: String
        client: String
        website: String
        completed_at: String
        long_desc: String
        interisting_count: Int
        social_links: String
    }

    input WorkWhereUniqueInput {
        id: ID
        name: String!
    }

    extend type Query {
        works: [Work]
        work(id: ID, name: String!):Work
    }

    extend type Mutation {
        createWork(name: String!, p: String!, simple_caption: String!, img_url: String!, client: String!, website: String!, completed_at: String!, long_desc: String!, interisting_count: Int!, social_links: String):Work
        updateWork(where: WorkWhereUniqueInput!, name: String, p: String, simple_caption: String, img_url: String, client: String, website: String, completed_at: String, long_desc: String, interisting_count: Int, social_links: String):Work
        deleteWork(where: WorkWhereUniqueInput!): Work
    }
    
    extend type Subscription {
        works: [Work]
    }

`

export const resolvers = {
    Query: {
        works: async (root: any, args: any, context: any, info: any)=> {
            const  access: any = await getAccess(context)
            const result: any = await prisma.works()
            if(access.work.indexOf("r")===-1){throw new Error("No Access")}else{return result}
        },
        work: async (obj: any, {name}: any, context: any, info: any) =>{
            const  access: any = await getAccess(context)
            const result: any = await prisma.work(name)
            if(access.work.indexOf("r")===-1){throw new Error("No Access")}else{return result}
        }
    },
    Mutation: {
        createWork: async (obj: any, {name, p, simple_caption, img_url, client, website, completed_at, long_desc, interisting_count, social_links}: any, context: any, info: any)=>{
            const  access: any = await getAccess(context)
            const result: any = async () => {
                const workWithNameAlreadyExists = await prisma.work({name});
                if(workWithNameAlreadyExists){
                throw new Error(` ${name} already in use`);
                }
                const createdWork = await prisma.createWork({name, p, author_name: access.owner.user.name, simple_caption, img_url, client, website, completed_at, long_desc, interisting_count, social_links});
                return createdWork;
            }
            if(access.work.indexOf("c")===-1){throw new Error("No Access")}else{return result}

        },
        updateWork: async (obj: any, { where, name, p, simple_caption, img_url, client, website, completed_at, long_desc, interisting_count, social_links }: any, context: any, info: any)=>{
            const  access: any = await getAccess(context)
            const result: any = async () => {
                const workWhereName = await prisma.work({name:where.name});
                if(!workWhereName){
                    throw new Error(`Work with ${name} is doesn't exists`);
                }
                /**
                 * using original if undefine
                 */!name && !p && !simple_caption && !img_url && !client && !website && !completed_at && !long_desc && !interisting_count && !social_links ? ()=>{throw new Error("nothing to update")}:!name?name=workWhereName.name:!p?p=workWhereName.p:!simple_caption?simple_caption=workWhereName.simple_caption:!img_url?img_url=workWhereName.img_url:!client?client=workWhereName.client:!website?website=workWhereName.website: !completed_at?completed_at=workWhereName.completed_at: !long_desc?long_desc=workWhereName.long_desc: !interisting_count?interisting_count=workWhereName.interisting_count: !social_links?social_links=workWhereName.social_links:null 
                const updatedWork = await prisma.updateWork({data:{name, p, simple_caption, img_url, client, website, completed_at, long_desc, interisting_count, social_links},where:{name:where.name}})
                return updatedWork;
            }
            if(access.work.indexOf("u")===-1){throw new Error("No Access")}else{return result}
        },
        deleteWork: async (obj: any, {where}: any, context: any, info: any)=>{
            const  access: any = await getAccess(context)
            const result: any = async () => {
                const {name} = where
                const workWhereName = await prisma.work({name});
                if(!workWhereName){
                    throw new Error(`Work with ${name} is doesn't exists`);
                }
                const deletedWork = await prisma.deleteWork({name});
                return deletedWork;
            }
            if(access.work.indexOf("d")===-1){throw new Error("No Access")}else{return result}
        }
    },
    Subscription: {
        /**Masih Kosong */
    }
}
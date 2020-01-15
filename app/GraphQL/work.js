import { gql } from 'apollo-server-express'
import { prisma } from '../../prisma/src/generated/prisma-client'

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

`

export const resolvers = {
    Query: {
        works: async (root, args, context, info)=> await prisma.works(),
        work: async (obj, args, context, info) => await prisma.work({id: args.id})
    },
    Mutation: {
        createWork: async (obj, {name, p, simple_caption, img_url, client, website, completed_at, long_desc, interisting_count, social_links}, context, info)=>{
            const workWithNameAlreadyExists = await prisma.work({name});
            if(workWithNameAlreadyExists){
            throw new Error(` ${name} already in use`);
            }
            const createdWork = await prisma.createWork({name, p, simple_caption, img_url, client, website, completed_at, long_desc, interisting_count, social_links});
            return createdWork;
        },
        updateWork: async (obj, { where, name, p, simple_caption, img_url, client, website, completed_at, long_desc, interisting_count, social_links }, context, info)=>{
            const workWhereName = await prisma.work({name:where.name});
            if(!workWhereName){
                throw new Error(`Work with ${name} is doesn't exists`);
            }
            !name && !p && !simple_caption && !img_url && !client && !website && !completed_at && !long_desc && !interisting_count && !social_links ? ()=>{throw new Error("nothing to update")}:!name?name=workWhereName.name:!p?p=workWhereName.p:!simple_caption?simple_caption=workWhereName.simple_caption:!img_url?img_url=workWhereName.img_url:!client?client=workWhereName.client:!website?website=workWhereName.website: !completed_at?completed_at=workWhereName.completed_at: !long_desc?long_desc=workWhereName.long_desc: !interisting_count?interisting_count=workWhereName.interisting_count: !social_links?social_links=workWhereName.social_links:null 
            const updatedWork = await prisma.updateWork({data:{name, p, simple_caption, img_url, client, website, completed_at, long_desc, interisting_count, social_links},where:{name:where.name}})
            return updatedWork;
        },
        deleteWork: async (obj, {where}, context, info)=>{
            const {name} = where
            const workWhereName = await prisma.work({name});
            if(!workWhereName){
                throw new Error(`Work with ${name} is doesn't exists`);
            }
            const deletedWork = await prisma.deleteWork({name});
            return deletedWork;
        }
    }
}
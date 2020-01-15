import { gql } from 'apollo-server-express'
import { prisma } from '../../prisma/src/generated/prisma-client'

export const typeDefs =  gql`

    extend type Query {
        posts: [Post]
        post(id: ID, title: String!):Post
    }

`

export const resolvers = {
    Query: {
        workTags: async (root, args, context, info)=> {
            const allWork = await prisma.works()
            let allWorkTag = [] 
            const uniq = a =>[...new Set(a)]
            allWork.map((work)=>{
                allWorkTag = [...allWorkTag, ...work.p]
            })
            // allWorkTag = uniq(allWorkTag);
            return allWorkTag;
        },
        postTags: async (obj, args, context, info) => {
            await prisma.post({id: args.id})
        },
    }
}
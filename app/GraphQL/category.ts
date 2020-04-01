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
        workTags: async (root: any, args: any, context: any, info: any)=> {
            const allWork = await prisma.works()
            let allWorkTag: any[] = [] // todo make global iterface for model
            const uniq = (a: any) =>[...new Set(a)]
            allWork.map((work: any)=>{
                allWorkTag = [...allWorkTag, ...work.p]
            })
            // allWorkTag = uniq(allWorkTag);
            return allWorkTag
        },
        postTags: async (obj: any, args: any, context: any, info: any) => {
            // await prisma.post({id: args.id})
        },
    }
}
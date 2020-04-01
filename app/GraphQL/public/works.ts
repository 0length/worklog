import { gql } from 'apollo-server-express'
import { prisma } from '../../../prisma/src/generated/prisma-client'
export const typeDefs =  gql`
    type Work {
        id: ID
        name: String
        p: String
        author_name: String
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
        works(author_name: String): [Work]
    }

`

export const resolvers = {
    Query: {
        works:  async (root: any, args: any, context: any, info: any)=> {
            const result: any = args.author_name?
                await prisma.works({where: { author_name: args.author_name}}):
                await prisma.works()
            return result
        },
    },
}
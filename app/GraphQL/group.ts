import { gql } from 'apollo-server-express'
import { prisma, User } from '../../prisma/src/generated/prisma-client'
import { tokenGenerator } from '../lib/utils/json-web-token/generator'
import { getUserId } from '../lib/utils/json-web-token/verifyer'
import { getAccess } from '../lib/utils/getAccess'


const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')


export const typeDefs =  gql`
    type Group {
        access: String!
        name: String!
    }

    extend type Mutation {
        createGroup(name: String, access: String):Group
        updateGroup(where: GroupWhereUniqueInput!, name: String, access: String):Group
        deleteGroup(where: GroupWhereUniqueInput!): Group
    }


    extend type Query {
        groups: [Group]
        group(name: String!): Group
    }

    input UserWhereUniqueInput {
        name: String
    }

    `



export const resolvers = {
    Query: {
        groups: async (root:any, args:any, context:any, info:any)=>{
            const  access: any = await getAccess(context)
            const result: any = await prisma.groups()
            if(access.group.indexOf("r")===-1){throw new Error("No Access")}else{return result}
        }, 
        group: async (obj:any, {name}:any, context:any, info:any) =>{
            const  access: any = await getAccess(context)
            const result: any = await prisma.group({name})
            if(access.group.indexOf("r")===-1){throw new Error("No Access")}else{return result}
        } 
    },
    Mutation: {
        createGroup: async (obj: any, args: any, context: any, info: any)=>{
            const  access: any = await getAccess(context)
            const result: any = async () => {
                const groupWithNameAlreadyExists = await prisma.group({name: args.name});
                if(groupWithNameAlreadyExists){
                    throw new Error(`Already exist`);
                }
                const createdGroup =  await prisma.createGroup({name: args.name, access: args.access});
                return createdGroup;
            }
            if(access.group.indexOf("c")===-1){throw new Error("No Access")}else{return result}
        },
        updateGroup: async (obj: any, args: any, context: any, info: any)=>{
            const  access: any = await getAccess(context)
            const result: any = async () => {
                const groupWhereName = await prisma.group({name:args.where.name});
                if(!groupWhereName){
                    throw new Error(`Not found`);
                }
                /**
                 * using original if undefine
                 */!args.name && !args.access ?()=>{throw new Error("Nothing to Update")}:!name?args.name=groupWhereName.name:!args.access?args.access=groupWhereName.access:null
                const updatedGroup = await prisma.updateGroup({data:{name, access},where:{name:args.where.name}})
                return updatedGroup;
            }
            if(access.group.indexOf("u")===-1){throw new Error("No Access")}else{return result}
        },
        deleteGroup: async (obj: any, {where}: any, context: any, info: any)=>{
            const  access: any = await getAccess(context)
            const result: any = async () => {
                const {name} = where
                const groupWhereName = await prisma.group({name});
                if(!groupWhereName){
                    throw new Error(`Not found`);
                }
                const deletedGroup = await prisma.deleteGroup({name});
                return deletedGroup;
            }
            if(access.group.indexOf("d")===-1){throw new Error("No Access")}else{return result}
        }
    }
}
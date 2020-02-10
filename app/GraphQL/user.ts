import { gql } from 'apollo-server-express'
import { prisma } from '../../prisma/src/generated/prisma-client'
import { tokenGenerator } from '../lib/utils/json-web-token/generator'
import { getAccess } from '../lib/utils/getAccess'


const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')


export const typeDefs =  gql`
    type User {
        email: String!
        name: String!
        username: String!
        password: String!
    }

    type AuthPayload {
        token: String
        user: User
    }

    extend type Mutation {
        login(email: String!, password: String!): AuthPayload
        signup(name: String!, username: String!, email:String!, password:String!): AuthPayload
        createUser(name: String!, username: String!, email:String!, password:String!):User
        updateUser(where: UserWhereUniqueInput!, name: String!, username: String!, email:String!, password:String!):User
        deleteUser(where: UserWhereUniqueInput!): User
    }


    extend type Query {
        users: [User]
        user(username: String!): User
    }

    input UserWhereUniqueInput {
        username: String
        email: String
    }

    `



export const resolvers = {
    Query: {
        users: async (root:any, args:any, context:any, info:any)=>{
            const  access: any = await getAccess(context)
            const result: any = await prisma.users()
            if(access.user.indexOf("r")===-1){throw new Error("No Access")}else{return result}
        }, 
        user: async (obj:any, args:any, context:any, info:any) =>{
            const  access: any = await getAccess(context)
            const result: any = await prisma.user({username: args.username})
            if(access.user.indexOf("r")===-1){throw new Error("No Access")}else{return result}
        } 
    },
    Mutation: {
        login: async (obj:any, {username, email, password}:any, context:any, info:any)=>{
            let user
            !username? user = await prisma.user({email}):await prisma.user({username})
            if(!user){
                throw new Error('Not Found')
            }
            const valid = await bcrypt.compare(password, user.password)
            if(!valid){
                throw new Error('Invalid password')
            }
            const token = tokenGenerator({ userId: user.email })
            user.password = password
            return { token, user };
        },
        signup: async (obj:any, {name, username, email, password}: any, context: any, info:any)=>{
            const userWithEmailAlreadyExists = await prisma.user({email});
                if(userWithEmailAlreadyExists){
                throw new Error(`Already Exist`);
            }
            password = await bcrypt.hash(password, 10);
            const createdUser = await prisma.createUser({name, username,  email, password, group: "Guest"});
            const token = tokenGenerator({ userId: createdUser.email })
            return { token, user: createdUser }
        },
        createUser: async (obj: any, {name, username, email, password}: any, context: any, info: any)=>{
            const  access: any = await getAccess(context)
            const result: any = async () => {
                const userWithUsernameAlreadyExists = await prisma.user({username});
                if(userWithUsernameAlreadyExists){
                    throw new Error(`Already Exist`);
                }
                const createdUser = await prisma.createUser({name, username, email, password, group: "Guest"});
                return createdUser;
            }
            if(access.user.indexOf("c")===-1){throw new Error("No Access")}else{return result}
        },
        updateUser: async (obj: any, {where, name, username, email, password, group}: any, context: any, info: any)=>{
            const  access: any = await getAccess(context)
            const result: any = async () => {
                const userWhereUname = await prisma.user({username:where.username});
                if(!userWhereUname){
                    throw new Error(`Not Found`);
                }
                /**
                 * using original if undefine
                 */!name && !username && !email && !password && !group? ()=>{throw new Error("Nothing to Update")}:!name?name=userWhereUname.name:!username?username=userWhereUname.username:!email?email=userWhereUname.email:!password?password=userWhereUname.password:!group?group=userWhereUname.group:null
                const updatedUser = await prisma.updateUser({data:{name, username, email, password, group},where:{username:where.username}})
                return updatedUser;
            }
            if(access.user.indexOf("u")===-1){throw new Error("No Access")}else{return result}
        },
        deleteUser: async (obj: any, {where}: any, context: any, info: any)=>{
            const  access: any = await getAccess(context)
            const result: any = async () => {
                const {username} = where
                const userWhereName = await prisma.user({username});
                if(!userWhereName){
                    throw new Error(`User not found`);
                }
                const deletedUser = await prisma.deleteUser({username});
                return deletedUser;
            }
            if(access.user.indexOf("d")===-1){throw new Error("No Access")}else{return result}
        }
    }
}
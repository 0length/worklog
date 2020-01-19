import { gql } from 'apollo-server-express'
import { prisma } from '../../prisma/src/generated/prisma-client'
import { tokenGenerator } from '../lib/utils/json-web-token/generator'
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')


export const typeDefs =  gql`
    type User {
        email: String!
        name: String
        password: String
    }

    type AuthPayload {
        token: String
        user: User
    }



    extend type Mutation {
        login(email:String!, password: String!): AuthPayload
        signup(name: String!, email:String!, password:String!): AuthPayload
    }

`

// extend type Query {
//     users: [User]
//     user(email: String!): User
//   }

export const resolvers = {
    // Query: {
        // users: async (root, args, context, info)=> await prisma.users(),
        // user: async (obj, args, context, info) => await prisma.user({email: args.email})
    // },
    Mutation: {
        login: async (obj:any, {email, password}:any, context:any, info:any)=>{
            let  user = await prisma.user({email});
            if(!user){
                throw new Error('No such user found')
            }
            const valid = await bcrypt.compare(password, user.password)
            if(!valid){
                throw new Error('Invalid password')
            }
            const token = tokenGenerator({ userId: user.email })
            user.password = password
            return { token, user };

        },
        signup: async (obj:any, {name, email, password}: any, context: any, info:any)=>{
            const userWithEmailAlreadyExists = await prisma.user({email});
                if(userWithEmailAlreadyExists){
                throw new Error(`User with email ${email} already exists`);
            }
            password = await bcrypt.hash(password, 10);
            const createdUser = await prisma.createUser({name, email, password});
            if(!createdUser){
                throw new Error('Fail Create User');
            }
            const token = tokenGenerator({ userId: createdUser.email })
            return { token, user: createdUser }
        }
    }
}
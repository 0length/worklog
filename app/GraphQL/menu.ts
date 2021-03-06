import { gql } from 'apollo-server-express'
import { prisma } from '../../prisma/src/generated/prisma-client'
import { getAccess } from '../lib/utils/getAccess'

export const typeDefs =  gql`
    type Menu {
        name: String!
        parent_name: String!
        sequence: String!
    }

    extend type Mutation {
        createMenu(name: String!, parent_name: String!, sequence: Int!):Menu
        updateMenu(where: MenuWhereUniqueInput!, name: String!, parent_name: String!, sequence:String!):Menu
        deleteMenu(where: MenuWhereUniqueInput!): Menu
    }

    extend type Query {
        menus: [Menu]
        menu(name: String!): Menu
    }

    input MenuWhereUniqueInput {
        name: String
    }

    `



export const resolvers = {
    Query: {
        menus: async (root:any, args:any, context:any, info:any)=>{
            const  access: any = await getAccess(context)
            const allMenu =  await prisma.menus()
            const result: any = []
            Object.keys(access).map((keys)=>access[keys] && result.push(...allMenu.filter((menu)=>menu.name===keys)))
            if(access.menu.indexOf("r")===-1){throw new Error("No Access")}else{return result}
        },
        menu: async (obj:any, {name}:any, context:any, info:any) =>{
            const  access: any = await getAccess(context)
            const result: any = await prisma.menu({name})
            if(access.menu.indexOf("r")===-1){throw new Error("No Access")}else{return result}
        }
    },
    Mutation: {
        createMenu: async (obj: any, {name, parent_name, sequence}: any, context: any, info: any)=>{
            const  access: any = await getAccess(context)
            const result: any = async () => {
                const menuWithUsernameAlreadyExists = await prisma.menu({name})
                if(menuWithUsernameAlreadyExists){
                    throw new Error(`Already Exist`)
                }
                const createdMenu = await prisma.createMenu({name, parent_name, sequence})
                return createdMenu
            }
            if(access.menu.indexOf("c")===-1){throw new Error("No Access")}else{return result()}
        },
        updateMenu: async (obj: any, {where, name, parent_name, sequence}: any, context: any, info: any)=>{
            const  access: any = await getAccess(context)
            const result: any = async () => {
                const menuWhereName = await prisma.menu({name: where.name})
                if(!menuWhereName){
                    throw new Error(`Not Found`)
                }
                /**
                 * using original if undefine
                 */
                // tslint:disable-next-line: max-line-length no-unused-expression
                !name && !parent_name && !sequence ? ()=>{throw new Error("Nothing to Update")}:!name?name=menuWhereName.name:!parent_name?parent_name=menuWhereName.parent_name:!sequence?sequence=menuWhereName.sequence:null
                // tslint:disable-next-line: max-line-length
                const updatedMenu = await prisma.updateMenu({data:{name, parent_name, sequence},where:{name:where.name}})
                return updatedMenu
            }
            if(access.menu.indexOf("u")===-1){throw new Error("No Access")}else{return result()}
        },
        deleteMenu: async (obj: any, {where}: any, context: any, info: any)=>{
            const  access: any = await getAccess(context)
            const result: any = async () => {
                const {name} = where
                const menuWhereName = await prisma.menu({name})
                if(!menuWhereName){
                    throw new Error(`User not found`)
                }
                const deletedMenu = await prisma.deleteMenu({name})
                return deletedMenu
            }
            if(access.menu.indexOf("d")===-1){throw new Error("No Access")}else{return result()}
        }
    }
}
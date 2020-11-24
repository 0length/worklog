import { Work, Menu, Post, Comment, Group, User,  } from './../prisma/src/generated/prisma-client'

export {
    Work,
    Menu,
    Post,
    Comment,
    Group,
    User
}

export type Models = Work | Menu | Post | Comment | Group | User 
export interface AccessGuard {
    context: any
    menu: string
    accessCode?: 'c' | 'r' | 'u' | 'd' | Function
    result: (access: any)=>Promise<Models>
}

export interface AllMode {
    [key: string]: ()=>JSX.Element
}

export interface ActivityModeProps {
    action: JSX.Element[]
    generic: any
    mode: "read"|"create"|"update"
    title: string
    instanceOf: string
}

export interface ActivityPageProps {
    generic: any
    mode: "read"|"create"|"update"
    instanceOf: string
    setAction?: React.Dispatch<React.SetStateAction<JSX.Element[]>>
}


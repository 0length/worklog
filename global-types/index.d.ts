import { Work, Menu, Post, Comment, Group, User,  } from './../prisma/src/generated/prisma-client'

export {
    Work,
    Menu,
    Post,
    Comment,
    Group,
    User
}

export interface AllMode {
    [key: string]: JSX.Element
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
}


import { Work, Menu, Post, Comment, Group, User } from './../prisma/src/generated/prisma-client'

export {
    Work,
    Menu,
    Post,
    Comment,
}

export interface AllMode {
    [key: string]: JSX.Element
}



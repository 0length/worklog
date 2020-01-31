 const {prisma} = require('../prisma/src/generated/prisma-client');

const menuSeeder = async ({name, sequence})=>await prisma.createMenu({name, sequence});
const groupSeeder = async ({name, access})=>await prisma.createGroup({name, access})

const initGroup = [
    {name:'SuperUser', access:"user:'crud', group:'crud', menu:'crud', work:'crud', post:'crud'}"},
    {name:'Admin', access:"user:'r', group:'', menu:'r', work:'crud', post:'crud'}"},
    {name:'Guest', access:"user:'', group:'', menu:'r', work:'crud', post:'crud'}"},
]

menuSeeder({name: "dashboard", sequence: 1})
initGroup.map((item, idx)=>groupSeeder(item))
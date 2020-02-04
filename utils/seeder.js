 const {prisma} = require('../prisma/src/generated/prisma-client');

const menuSeeder = async ({name, parent_name, sequence})=>await prisma.createMenu({name, parent_name, sequence});
const groupSeeder = async ({name, access})=>await prisma.createGroup({name, access})

const initGroup = [
    {name:'SuperUser', access:`{"dashboard":"r", "user":"crud", "group":"crud", "menu":"crud", "work":"crud", "post":"crud"}`},
    {name:'Admin', access:`{"dashboard":"r", "user":"r", "group":"", "menu":"r", "work":"crud", "post":"crud"}`},
    {name:'Guest', access:`{"dashboard":"r", "user":"", "group":"", "menu":"r", "work":"crud", "post":"crud"}`},
]

const initMemu = [
    {name:'dashboard', parent_name: "", sequence: 0},
    {name:'work', parent_name: "dashboard", sequence: 0},
    {name:'post', parent_name: "dashboard", sequence: 1},
    {name:'comment', parent_name: "dashboard", sequence: 2},
    {name:'user', parent_name: "",sequence: 1},
    {name:'group', parent_name: "",sequence: 2},
    {name:'menu', parent_name: "",sequence: 3},
]

initMemu.map((item)=>menuSeeder(item))
initGroup.map((item, idx)=>groupSeeder(item))
console.log("done")
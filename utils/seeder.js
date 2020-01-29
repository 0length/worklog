 const {prisma} = require('../prisma/src/generated/prisma-client');

const menuSeeder = async ({name, sequence})=>await prisma.createMenu({name, sequence});

const groupSeeder = async ({name, access})=>await prisma.createGroup({name, access})
menuSeeder({name: "dashboard", sequence: 1})
groupSeeder({name:'SuperUser', access:"user:'crud', group:'crud', menu:'crud', work:'crud', post:'crud'}"})
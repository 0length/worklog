import { Work, Menu, Group, User, prisma } from '../prisma/src/generated/prisma-client'


const menuSeeder = async ({name, parent_name, sequence}: Menu)=>await prisma.createMenu({name, parent_name, sequence});
const groupSeeder = async ({name, access}: Group)=>await prisma.createGroup({name, access})
const userSeeder = async ({name, username, email, password, group}: User)=>await prisma.createUser({name, username, email, password, group})
const workSeeder = async ({name, website, social_links, long_desc, author_name, interisting_count, img_url, completed_at, client, simple_caption, p}: Work)=>await prisma.createWork({name, website, social_links, long_desc, author_name, interisting_count, img_url, completed_at, client, simple_caption, p})

const ikisandiku = '$2a$10$/5z0fKK1YYXAAnY7cDJJ7.IfDr4k3LpY9tvqH7ToSeHIO8kVSNlSO'

const initGroup = [
    {name:'SuperUser', access:`{"dashboard":"r", "user":"crud", "group":"crud", "menu":"crud", "work":"crud", "post":"crud"}`},
    {name:'Admin', access:`{"dashboard":"r", "user":"r", "group":"", "menu":"r", "work":"crud", "post":"crud"}`},
    {name:'Guest', access:`{"dashboard":"r", "user":"", "group":"", "menu":"r", "work":"crud", "post":"crud"}`},
]
const initUser = [
    {name: 'su', username: 'su', email: 'su@this.site', password: ikisandiku, group: 'SuperUser'},
    {name: 'admin', username: 'admin', email: 'admin@this.site', password: ikisandiku, group: 'Admin'},
    {name: 'guest', username: 'guest', email: 'guest@this.site', password: ikisandiku, group: 'Guest'}

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

const dummyWork: Array<Work> = [
    {name:'React Toast Card', p: `["frontend", "react", "JSX", "UI/UX", "Card"]`, author_name: 'admin', simple_caption: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.", client: "Other People", completed_at: "Feb 19 2020", img_url: "1EhnI0Glj38ygBvix0-nlePF7YalU0LUk", interisting_count: 50, long_desc: "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.", social_links: `{facebook: "", twitter: "", instagram: ""}`, website: "http://websitenaik.com"},
    {name:'React Simple Login', p: `["frontend", "react", "JSX", "UI/UX", "Auth"]`, author_name: 'admin', simple_caption: "One red herring to be careful of that I ran into and was confusing me. I had a simple TypeScript file named test.ts that was never transpiled and had the single line of code: console.log('hello'); in it. I was running node test.ts from the command line and it worked outputting 'hello` which was confusing me. Well if the file is purely valid JavaScript and you run node myFile.ts it still works.", client: "Other People", completed_at: "Jan 21 2020", img_url: "1ZuvDyXhzZPwHfQuurF2T6GRBWRalVX98", interisting_count: 53, long_desc: "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.", social_links: `{facebook: "", twitter: "", instagram: ""}`, website: "http://websitenaik.com"}
]


const runner = () =>{
    console.log("deleting old menus")
    prisma.deleteManyMenus({name_not: "ahahaha telo goreng hahahahah"})
    console.log("seeding menus")
    initMemu.map((item)=>menuSeeder(item))

    console.log("deleting old groups")
    prisma.deleteManyGroups({name_not: "ahahaha cicak krispy hahahahah"})
    console.log("seeding groups")
    initGroup.map((item, idx)=>groupSeeder(item))

    console.log("deleting old users")
    prisma.deleteManyUsers({name_not: "ahahaha as kui hahahahah"})
    console.log("seeding users")
    initUser.map((item, idx)=>userSeeder(item))

    // console.log("deleting old work")
    // prisma.deleteManyWorks({name_not: "ahaha"})
    dummyWork.map((item, idx)=>workSeeder(item))
}



console.log("done")
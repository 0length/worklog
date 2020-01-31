import { prisma } from "../../../prisma/src/generated/prisma-client";
import { getUserId } from "../utils/json-web-token/verifyer"


export const getAccess = async (context: any)=>{
    const email = getUserId(context) 
    // const email = await getUserId(context).then((email:any)=>email).catch((err:any)=>err) 
    const  user  = await prisma.user({email})
    if(!user){
        throw new Error('No such user found')
    }
    const { group } = user
    if(!group){
        throw new Error('No access for this user')
    }
    const Group = await prisma.group({name: group})
    let access = JSON.parse(Group!.access)
    if(!access){
        throw new Error('Nothing to access for this user')
    }
    access.owner={user, group: Group}
    return access
}

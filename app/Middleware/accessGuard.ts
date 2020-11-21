import { AccessGuard, Models } from "../../global-types"
import { getAccess } from "../lib/utils/getAccess"

const accessGuard: (param: AccessGuard)=>Promise<Models> = async ({context, menu, accessCode, result})=> {
    const  access: any = await getAccess(context)
    if(access[menu].indexOf(typeof accessCode === 'string' ? accessCode: typeof accessCode === 'function' ? accessCode.name[1] :'r')===-1){throw new Error("No Access")}else{return result(access)}
}

export {
    accessGuard
}
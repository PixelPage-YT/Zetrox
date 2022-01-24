import * as harmony from "https://code.harmony.rocks/main"

export async function isAuthorized(member:harmony.Member|undefined){
    if(member == undefined){
        return false
    }
    let teamRoledb = JSON.parse(Deno.readTextFileSync("./databases/teamRole.json"))
    let role = await member.guild.roles.get(teamRoledb[member.guild.id])
    if(role == undefined){
        role = await member.guild.roles.resolve(teamRoledb[member.guild.id])
    }
    if(role != undefined){
        if((await member.roles.array()).findIndex(index => index === role)){
            return true
        }
    }
    if(member.permissions.toArray().findIndex(index => index === "MANAGE_GUILD") != -1){
        return true
    }
    return false
}
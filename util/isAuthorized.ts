import { supabaseClient } from "https://deno.land/x/supabase_deno@v1.0.5/mod.ts"
import * as harmony from "https://code.harmony.rocks/main"

export async function isAuthorized(member:harmony.Member|undefined){
    try{
        if(member == undefined){
            return false
        }
        const sbclient:supabaseClient = new supabaseClient("https://lvqcvchccfkvuihmdbiu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2cWN2Y2hjY2ZrdnVpaG1kYml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUyODcwNTUsImV4cCI6MTk2MDg2MzA1NX0.rr8wnLdwcF99sstojzwkgdgCk6_qMh2tSIq5Bf8EUUE")
        let table = sbclient.tables().get("guild_settings")
        let item = (await table.items().get("id", member.guild.id))[0]
        if(!(item == undefined)){
            let role = await member.guild.roles.get(item.teamRole)
            if(role == undefined){
                role = await member.guild.roles.resolve(item.teamRole)
            }
            if(role != undefined){
                if((await member.roles.array()).findIndex(index => index === role)){
                    return true
                }
            }
        }
        if(member.permissions.toArray().findIndex(index => index === "MANAGE_GUILD") != -1){
            return true
        }
        return false
    }catch(err){
        console.log(err)
    }
}
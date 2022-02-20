import * as harmony from "https://code.harmony.rocks/main"
import { supabaseClient } from "https://deno.land/x/supabase_deno@v1.0.5/mod.ts"

export async function messageCreate(message:harmony.Message) {
    try{
        const sbclient:supabaseClient = new supabaseClient("https://lvqcvchccfkvuihmdbiu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2cWN2Y2hjY2ZrdnVpaG1kYml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUyODcwNTUsImV4cCI6MTk2MDg2MzA1NX0.rr8wnLdwcF99sstojzwkgdgCk6_qMh2tSIq5Bf8EUUE")
        let table = sbclient.tables().get("guild_settings")
        let messagedb = JSON.parse(Deno.readTextFileSync("./databases/messages.json"));
        
        if(message.guild){
            if(!(messagedb[message.guild.id])){
                messagedb[message.guild.id] = {}
            }
            if(!(messagedb[message.guild.id][message.author.id])){
                messagedb[message.guild.id][message.author.id] = {count:0,lastsend:0}
            }
            let antiSpamTime:number = 10000
            let item = (await table.items().get("id", message.guild.id))[0]
            if(item != undefined){
                antiSpamTime = item.antiSpamTime * 1000
            }
            if(Date.now() - messagedb[message.guild.id][message.author.id].lastsend > antiSpamTime){
                messagedb[message.guild.id][message.author.id].lastsend = Date.now()
                messagedb[message.guild.id][message.author.id].count++
            }
            Deno.writeTextFileSync("./databases/messages.json", JSON.stringify(messagedb))
        }
    }catch(err){
    }
}
import * as harmony from "https://code.harmony.rocks/main"

export async function messageCreate(message:harmony.Message) {
    try{
        let messagedb = JSON.parse(Deno.readTextFileSync("./databases/messages.json"));
        let antiSpamTimeDB = JSON.parse(Deno.readTextFileSync("./databases/antiSpamTime.json"));
        if(message.guild){
            if(!(messagedb[message.guild.id])){
                messagedb[message.guild.id] = {}
            }
            if(!(messagedb[message.guild.id][message.author.id])){
                messagedb[message.guild.id][message.author.id] = {count:0,lastsend:0}
            }
            let antiSpamTime:number = 10000
            if(antiSpamTimeDB[message.guild.id] != undefined){
                antiSpamTime = antiSpamTimeDB[message.guild.id] * 1000
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
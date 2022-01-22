import * as harmony from "https://code.harmony.rocks/main"

export async function messageCreate(message:harmony.Message) {
    let messagedb = JSON.parse(Deno.readTextFileSync("./databases/messages.json"));
    if(message.guild){
        if(!(messagedb[message.guild.id])){
            messagedb[message.guild.id] = {}
        }
        if(!(messagedb[message.guild.id][message.author.id])){
            messagedb[message.guild.id][message.author.id] = {count:0,lastsend:0}
        }
        if(Date.now() - messagedb[message.guild.id][message.author.id].lastsend > 10000){
            messagedb[message.guild.id][message.author.id].lastsend = Date.now()
            messagedb[message.guild.id][message.author.id].count++
        }
        Deno.writeTextFileSync("./databases/messages.json", JSON.stringify(messagedb))
    }
}
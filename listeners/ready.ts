import * as harmony from "https://code.harmony.rocks/main"

export async function ready(client:harmony.Client) {
    console.log(`[Info] Client-Benutzername: ${client.user?.username}`)
    console.log(`[Info] Client-ID: ${client.user?.id}`)
    if(Deno.args[1] != undefined){
        if(Deno.args[1] == "newSlash"){
            let customCommand = Deno.args[2]
            if(customCommand != undefined){
                console.log("[Info] Slash Command " + customCommand + " wird gelöscht")
                const clguilds = await client.guilds.array()
                for(let guild of clguilds){
                    let commands = await guild.commands.all()
                    for(let command of commands.array()){
                        if(command.name == customCommand){
                            command.delete()
                        }
                    }
                }
            }else{
                console.log("[Info] Alle Slash Commands werden gelöscht")
                const clguilds = await client.guilds.array()
                for(let guild of clguilds){
                    let commands = await guild.commands.all()
                    for(let command of commands.array()){
                        command.delete()
                        console.info("[Info] Slash Command " + command.name + " in dem Server " + command.guild?.name + " gelöscht.")
                    }
                }
            }
        }
    }
    for(let guild of await client.guilds.array()){
        await guild.invites.fetchAll()
        guild.invites.array().then((guildinvites) => {
            guildinvites.forEach(guildInvite => {
                // @ts-ignore
                client.oinvites[guildInvite.code] = guildInvite.uses
            })
        })
    }
}
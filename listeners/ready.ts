import * as harmony from "https://code.harmony.rocks/main"
import { commands } from "../commands.ts"

export async function ready(client:harmony.Client) {
    console.log(`[Info] Client-Benutzername: ${client.user?.username}`)
    console.log(`[Info] Client-ID: ${client.user?.id}`)
    if(Deno.args[1] != undefined){
        if(Deno.args[1] == "newSlash"){
            if(Deno.args[0] != undefined && Deno.args[0] == "prod"){
                let customCommand = Deno.args[2]
                if(customCommand != undefined){
                    console.log("[Info] Slash Command " + customCommand + " wird gelöscht")
                    for(let command of (await client.interactions.commands.all()).array()){
                        if(command.name == customCommand){
                            await command.delete()
                            console.log("[Info] Slash Command " + customCommand + " gelöscht")
                        }
                    }
                }
            }else{
                let customCommand = Deno.args[2]
                if(customCommand != undefined){
                    console.log("[Info] Slash Command " + customCommand + " wird gelöscht")
                    const clguilds = await client.guilds.array()
                    for(let guild of clguilds){
                        let commands = await guild.commands.all()
                        for(let command of commands.array()){
                            if(command.name == customCommand){
                                command.delete()
                                console.info("[Info] Slash Command " + command.name + " in dem Server " + command.guild?.name + " gelöscht.")
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
    }
    for(let guild of await client.guilds.array()){
        try{
            await guild.invites.fetchAll()
            guild.invites.array().then((guildinvites) => {
                guildinvites.forEach(guildInvite => {
                    // @ts-ignore
                    client.oinvites[guildInvite.code] = guildInvite.uses
                })
            })
        }catch(err){
            
        }
    }
    async function checkSlash(){
        commands.forEach(command => {
            // If you want to create command globally, just remove 'Your Server/Guild ID' part
            // I recommend making it for only one guild for now because Global Slash Commands can take max 1 hour to come live.
            client.guilds.array().then((guilds) => {
                guilds.forEach((guild) => {
                    guild.commands.all().then((existingcommands) => {
                        var excommandarray = existingcommands.array()
                        let check = false;
                        for(let i in excommandarray){
                            if(excommandarray[i].name == command.name){
                                check = true;
                            }
                        }
                        if(check == false){
                            client.interactions.commands.create(command,guild.id)
                                .then((cmd) => console.log(`[Info] Slash Command ${cmd.name} in ${guild.name} erstellt`))
                                .catch((err) => {
                                    if(Deno.args[0] != undefined && Deno.args[0] == "prod"){
                                        console.log(`[Info] Es ist fehlgeschlagen, den Slash Command ${command.name} in ${guild.name} einzurichten, weil: ${err}`)
                                    }
                                });
                        }
                    })
                })
            })
        })
    }
    if(Deno.args[0] != undefined && Deno.args[0] == "prod"){
        commands.forEach(command => {
            client.interactions.commands.create(command)
                .then((cmd) => console.log(`[Info] Slash Command ${cmd.name} erstellt`))
                .catch((err) => console.log(`[Info] Es ist fehlgeschlagen, den Slash Command ${command.name} einzurichten, weil: ${err}`));
        })
    }else{
        setInterval(checkSlash,15000)
    }
}
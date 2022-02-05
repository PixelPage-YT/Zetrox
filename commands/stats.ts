import * as harmony from "https://code.harmony.rocks/main"

import {
    database,
    saveDatabase
} from "../util/database.ts"

import {
    isAuthorized
} from "../util/isAuthorized.ts"
import {noPerms} from "../util/noPerms.ts"
export async function serverStats(i:harmony.Interaction,client:harmony.Client){
    try{
        if(!(await isAuthorized(i.member))){
            i.respond({
                content: ":x: Du hast dazu keine Rechte! :x:",
                ephemeral: true
            })
            return
        }
        if(i.isApplicationCommand()){
            let statdb = database("stats.json")
            let currentcount:number = 0
            for(let stat of statdb.data){
                if(stat.guild == i.guild?.id){
                    currentcount++
                }
            }
            if(currentcount < 2 && i.guild){
                try{
                    let msg = await i.channel?.send({
                        embeds: [
                            {
                                "title": "Wird generiert...",
                                "description": "Bitte warte einen kurzen Augenblick!",
                                "color": 44469,
                                "author": {
                                    "name": "Server Statistiken",
                                    "icon_url": "https://emoji.gg/assets/emoji/5464-discord-new.png"
                                },
                                "footer": {
                                    "text": "⇢ Zetrox von Folizza Studios",
                                    "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                                }
                            }
                        ]
                    })
                    if(msg && i.channel){
                        statdb.data.push({guild:i.guild.id,type:"server",msg:msg.id,channel:i.channel.id})
                        saveDatabase("stats.json",statdb)
                        i.respond({content:":white_check_mark: Erfolgreich eingerichtet! :white_check_mark:",ephemeral:true})
                    }
                }catch(err){
                    
                }
            }else{
                i.respond({content:":x: Du kannst nur 2 Statistik-Nachrichten pro Server erstellen!"})
            }
        }
    }catch(err){
        noPerms(i);
    }
}

export async function minecraftStats(i:harmony.Interaction,client:harmony.Client){
    try{
        if(!(await isAuthorized(i.member))){
            i.respond({
                content: ":x: Du hast dazu keine Rechte! :x:",
                ephemeral: true
            })
            return
        }
        if(i.isApplicationCommand()){
            if(i.option<string>("ip")){
                let ip = i.option<string>("ip")
                let statdb = database("stats.json")
                let currentcount:number = 0
                for(let stat of statdb.data){
                    if(stat.guild == i.guild?.id){
                        currentcount++
                    }
                }
                if(currentcount < 2 && i.guild){
                    try{
                        let msg = await i.channel?.send({
                            embeds: [
                                {
                                    "title": "Wird generiert...",
                                    "description": "Bitte warte einen kurzen Augenblick!",
                                    "color": 44469,
                                    "author": {
                                        "name": "Minecraft-Server Statistiken",
                                        "icon_url": "https://emoji.gg/assets/emoji/8246-apple.png"
                                    },
                                    "footer": {
                                        "text": "⇢ Zetrox von Folizza Studios",
                                        "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                                    }
                                }
                            ]
                        })
                        if(msg && i.channel){
                            statdb.data.push({guild:i.guild.id,type:"minecraft",ip:ip,msg:msg.id,channel:i.channel.id})
                            saveDatabase("stats.json",statdb)
                            i.respond({content:":white_check_mark: Erfolgreich eingerichtet! :white_check_mark:",ephemeral:true})
                        }
                    }catch(err){
                        
                    }
                }else{
                    i.respond({content:":x: Du kannst nur 2 Statistik-Nachrichten pro Server erstellen!"})
                }
            }
        }
    }catch(err){
        noPerms(i);
    }
}
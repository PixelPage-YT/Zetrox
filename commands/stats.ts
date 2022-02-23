import * as harmony from "https://code.harmony.rocks/main"

import {
    database,
    saveDatabase
} from "../util/database.ts"

import {
    isAuthorized
} from "../util/isAuthorized.ts"
import {noPerms} from "../util/noPerms.ts"
import {askInteraction} from "../util/askInteraction.ts"
export async function serverStats(i:harmony.Interaction,client:harmony.Client){
    try{
        if(!(await isAuthorized(i.member))){
            await i.respond({
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
                        await i.respond({content:":white_check_mark: Erfolgreich eingerichtet! :white_check_mark:",ephemeral:true})
                    }
                }catch(err){
                    
                }
            }else{
                await i.respond({content:":x: Du kannst nur 2 Statistik-Nachrichten pro Server erstellen!"})
            }
        }
    }catch(err){
        noPerms(i);
    }
}

export async function minecraftStats(i:harmony.Interaction,client:harmony.Client){
    try{
        if(!(await isAuthorized(i.member))){
            await i.respond({
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
                            await i.respond({content:":white_check_mark: Erfolgreich eingerichtet! :white_check_mark:",ephemeral:true})
                        }
                    }catch(err){
                        
                    }
                }else{
                    await i.respond({content:":x: Du kannst nur 2 Statistik-Nachrichten pro Server erstellen!"})
                }
            }
        }
    }catch(err){
        noPerms(i);
    }
}

export async function deleteStats(i:harmony.Interaction, client:harmony.Client){
    try{
        if(i.guild && i.member && i.channel){
            const controls: harmony.MessageComponentData[] = [
                {
                    type: harmony.MessageComponentType.ACTION_ROW,
                    components: [
                        {
                            type: harmony.MessageComponentType.BUTTON,
                            style: harmony.ButtonStyle.DANGER,
                            customID: 'st-yes',
                            emoji: {name:"✅"},
                            label:"Ja"
                        },
                        {
                            type: harmony.MessageComponentType.BUTTON,
                            style: harmony.ButtonStyle.SECONDARY,
                            customID: 'st-no',
                            emoji: {name:"🚫"},
                            label:"Nein"
                        },
                    ]
                },
            ]
            await i.respond({content:"** :question: Bist du dir sicher? :question: **\n*Dies wird alle deine Statistik Nachrichten ungeupdatet lassen!*", components: controls})
            let answer = await askInteraction(client,i,10000,["st-yes", "st-no"])
            if(answer != undefined){
                if(answer.isMessageComponent() && answer.customID == "st-yes"){
                    let statdb = database("stats.json")
                    let index = 0;
                    for(let stat of statdb.data){
                        if(stat.guild == i.guild?.id){
                            statdb.data.splice(index)
                        }
                        index++
                    }
                    saveDatabase("stats.json", statdb)
                    await answer.respond({content:"✅ **Erfolgreich gelöscht** ✅"})
                }else{
                    await answer.respond({content:"✅ **Abgebrochen** ✅"})
                }
            }else{
                await i.channel.send({content:"✅ **Abgebrochen** ✅"})
            }
        }
    }catch(err){
        console.log(err)
        noPerms(i);
    }
}
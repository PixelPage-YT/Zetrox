import * as harmony from "https://code.harmony.rocks/main"
import {database ,saveDatabase} from "../util/database.ts"
import {isAuthorized} from "../util/isAuthorized.ts"

export async function interactionCreate(i:harmony.Interaction,client:harmony.Client) {
    if(i.isMessageComponent()){
        if(i.customID == "gw-teilnehmen"){
            if(i.member && i.guild){
                let giveawaydb:{giveaways:{reqs:{type:string,value:string|number}[]|undefined,start:number|undefined,msgid:string,users:string[],bypass:undefined|{type:string,value:string}}[]} = database("giveaways.json")
                let index = 0
                let isthere = 0
                for(let giveaway of giveawaydb.giveaways){
                    if(giveaway.msgid == i.message.id){
                        if(i.member != undefined){
                            if((giveaway.start && giveaway.start < Date.now()) || (giveaway.start == undefined)){
                                let member = i.member
                                if(giveaway.users.findIndex((user: string) => user === member.id) == -1){
                                    let check:boolean = false;
                                    if(giveaway.reqs){
                                        let reqs:{type:string,value:string|number}[] = giveaway.reqs
                                        let index = 0;
                                        let fills = 0;
                                        for(let req of reqs){
                                            if(req.type == "messages" && typeof req.value == "number"){
                                                let messagedb = database("messages.json")
                                                if(messagedb[i.guild.id]){
                                                    if(messagedb[i.guild.id][i.member.id]){
                                                        if(messagedb[i.guild.id][i.member.id].count > (req.value - 1)){
                                                            fills++
                                                        }
                                                    }
                                                }
                                            }
                                            if(req.type == "invites"){
                                                let messagedb = database("invites.json")
                                                if(messagedb[i.guild.id]){
                                                    if(messagedb[i.guild.id][i.member.id]){
                                                        if(messagedb[i.guild.id][i.member.id].count >= req.value){
                                                            fills++
                                                        }
                                                    }
                                                }
                                            }
                                            if(req.type == "gamepoints"){
                                                let messagedb = database("gamePoints.json")
                                                if(messagedb[i.guild.id]){
                                                    if(messagedb[i.guild.id][i.member.id]){
                                                        if(messagedb[i.guild.id][i.member.id].count >= req.value){
                                                            fills++
                                                        }
                                                    }
                                                }
                                            }
                                            if(req.type == "role"){
                                                if((await i.member.roles.array()).findIndex(index => index.id === req.value) != -1){
                                                    fills++
                                                }
                                            }
                                            if(req.type == "other"){
                                                fills++
                                            }
                                            index++
                                        }
                                        if(fills == reqs.length){
                                            check = true
                                        }
                                    }else{
                                        check = true;
                                    }
                                    if(check == false){
                                        if(giveaway.bypass){
                                            if(giveaway.bypass.type == "role"){
                                                if((await i.member.roles.array()).findIndex(index => index.id === giveaway.bypass?.value) != -1){
                                                    check = true
                                                }
                                            }
                                        }
                                    }
                                    if(check == true){
                                        giveawaydb.giveaways[index].users.push(i.member.id)
                                        saveDatabase("giveaways.json",giveawaydb)
                                        let controls: harmony.MessageComponentData[] = [
                                            {
                                                type: harmony.MessageComponentType.ACTION_ROW,
                                                components: [
                                                    {
                                                        type: harmony.MessageComponentType.BUTTON,
                                                        style: harmony.ButtonStyle.BLURPLE,
                                                        customID: 'gw-teilnehmen',
                                                        label: "(" + giveaway.users.length.toString() + ") Teilnehmen",
                                                        emoji: {name:"🎁"}
                                                    }
                                                ]
                                            },
                                        ]
                                        i.message.edit({components:controls})
                                        i.respond({
                                            content:"✅ Du hast erfolgreich teilgenommen! ✅",
                                            ephemeral: true
                                        })
                                    }else{
                                        i.respond({
                                            content:"⛔️  Du erfüllst die Bedingungen nicht! ⛔️",
                                            ephemeral: true
                                        })
                                    }
                                }else{
                                    i.respond({
                                        content:"⛔️ Du hast bereits teilgenommen! ⛔️",
                                        ephemeral: true
                                    })
                                }
                            }else{
                                i.respond({
                                    content:"⛔️ Die Verlosung hat noch nicht gestartet! ⛔️",
                                    ephemeral: true
                                })
                            }
                        }
                    }
                    isthere = 1
                    index++
                }
                if(isthere == 0){
                    i.respond({
                        content:"⛔️ Diese Verlosung existiert nicht! ⛔️",
                        ephemeral: true
                    })
                }
            }
        }else if(i.customID == "gw-claim" && i.member){
            let gwdb:{giveaways: {claimmsg:string|undefined,msgid:string,winners:string[],channel:string,end:number,winnercount:number,users:string[],preis:string,claimtime:number,ended:boolean|undefined}[]} = JSON.parse(Deno.readTextFileSync("./databases/giveaways.json"))
            let index = 0;
            for(let gw of gwdb.giveaways){
                if(gw.claimmsg == i.message.id){
                    if(gw.winners.findIndex(index => index === i.member?.id) != -1){
                        if(gw.claimtime > Date.now()){
                            i.respond({content:":white_check_mark: " + i.member?.user.mention + " hat seinen Preis geclaimt! :white_check_mark:"})
                            gwdb.giveaways[index].winners.splice(gwdb.giveaways[index].winners.findIndex(index => index === i.member?.id))
                            if(gwdb.giveaways[index].winners == []){
                                gwdb.giveaways.splice(index)
                            }
                            saveDatabase("giveaways.json",gwdb)
                        }else{
                            i.respond({content:":x: Du hast zu spät geclaimt! :x:",ephemeral:true})
                        }
                    }else{
                        i.respond({content:":x: Du bist kein Gewinner dieser Verlosung oder hast deinen Preis schon geclaimt! :x:",ephemeral:true})
                    }
                }
                index++
            }
        }else if(i.customID == "gw-reroll"){
            if(!await isAuthorized(i.member)){
                i.respond({content:":x: Du hast dazu keine Rechte! :x:",ephemeral:true})
                return
            }
            i.message.delete()
            let gwdb:{giveaways: {claimtimeraw:number|undefined,sendclaimmsg:boolean|undefined,aclaimmsg:string|undefined,claimmsg:string|undefined,msgid:string,winners:string[],channel:string,end:number,winnercount:number,users:string[],preis:string,claimtime:number,ended:boolean|undefined}[]} = JSON.parse(Deno.readTextFileSync("./databases/giveaways.json"))
            let index = 0;
            for(let gw of gwdb.giveaways){
                
                if(gw.aclaimmsg && gw.aclaimmsg == i.message.id){
                    
                    let winnercount = gw.winners.length
                    let embed = new harmony.Embed({
                        "color": 44469,
                        "author": {
                            "name": "Verlosungs-Ende",
                            "icon_url": "https://cdn.discordapp.com/emojis/714392829362831401.gif?size=96&quality=lossless"
                        },
                        "footer": {
                            "text": "⇢ Zetrox von Folizza Studios",
                            "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                        }
                    })
                    let content = ""
                    if(winnercount > 0){
                        
                        let winnernames = []
                        let winnermentions = []
                        let users = gw.users
                        let winnercount = gw.winnercount
                        let winnerids = []
                        while(winnercount!=0){
                            let choice:string = randomChoice(users)
                            let user = await client.users.get(choice)
                            if(user == undefined){
                                user = await client.users.resolve(choice)
                            }
                            if(user != undefined){
                                users.splice(users.findIndex(user=>user === choice))
                                winnernames.push(user.username)
                                winnermentions.push(user.mention)
                                winnerids.push(user.id)
                            }
                            winnercount--
                        }
                        embed.setTitle(winnernames.join(", "))
                        embed.setDescription(`***Glückwunsch! ***\nIhr/Du hast **${gw.preis}** gewonnen!`)
                        content = winnermentions.join(" ")
                        let channel = await client.channels.get(gw.channel)
                        if(channel == undefined){
                            channel = await client.channels.resolve(gw.channel)
                        }
                        if(channel != undefined && channel.isText()){
                            
                            if(gw.claimtime != undefined && gw.claimtime < Date.now() && gwdb.giveaways[index].winners.length > 0){
                                
                                let waitmsg = await i.respond({content:":game_die: Rerollen... :game_die:"})
                                const controls: harmony.MessageComponentData[] = [
                                    {
                                        type: harmony.MessageComponentType.ACTION_ROW,
                                        components: [
                                            {
                                                type: harmony.MessageComponentType.BUTTON,
                                                style: harmony.ButtonStyle.BLURPLE,
                                                customID: 'gw-claim',
                                                label: "Claimen",
                                                emoji: {name:"✅"}
                                            }
                                        ]
                                    },
                                ]
                                let claimmsg = await i.channel?.send({
                                    embeds:[
                                        embed
                                    ],
                                    content:content,
                                    components:controls
                                })
                                if(claimmsg){
                                    gwdb.giveaways[index].claimmsg = claimmsg.id
                                    // @ts-ignore
                                    gwdb.giveaways[index].claimtime = Date.now() + gwdb.giveaways[index].claimtimeraw
                                }
                            }
                        }
                        gwdb.giveaways[index].winners = winnerids
                        Deno.writeTextFileSync("./databases/giveaways.json", JSON.stringify(gwdb))
                    }
                }
                index++
            }
        }
    }
}

function randomChoice(arr:any) {
    return arr[Math.floor(Math.random() * arr.length)];
}
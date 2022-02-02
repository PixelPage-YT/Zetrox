import * as harmony from "https://code.harmony.rocks/main"
import {database ,saveDatabase} from "../util/database.ts"
import {isAuthorized} from "../util/isAuthorized.ts"

export async function gwEnd(i:harmony.Interaction,client:harmony.Client){
    if(i.isApplicationCommand() && i.name == "Enden lassen" && i.targetMessage){
        if(!await isAuthorized(i.member)){
            i.respond({content:":x: Du hast dazu keine Rechte! :x:",ephemeral:true})
            return
        }
        let gwdb:{giveaways: {claimmsg:string|undefined,msgid:string,winners:string[],channel:string,end:number,winnercount:number,users:string[],preis:string,ended:boolean|undefined}[]} = JSON.parse(Deno.readTextFileSync("./databases/giveaways.json"))
        let index = 0;
        let check = false;
        for(let gw of gwdb.giveaways){
            
            if(gw.msgid == i.targetMessage.id){
                if(gw.ended == false||gw.ended == undefined){
                    let winnercount = gw.winnercount
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
                        let users: string[] = structuredClone(gw.users)
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
                            
                            if(gwdb.giveaways[index].winners.length > 0){
                                gwdb.giveaways[index].ended = true
                                let waitmsg = await i.respond({content:":game_die: Beenden... :game_die:"})
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
                                    check = true
                                }
                            }
                        }
                        gwdb.giveaways[index].winners = winnerids
                        Deno.writeTextFileSync("./databases/giveaways.json", JSON.stringify(gwdb))
                    }
                }else{
                    i.respond({content:":x: Diese Verlosung ist bereits zu Ende. Bitte benutze 'Rerollen'! :x:",ephemeral:true})
                    return
                }
            }
            index++
        }
        if(check == false){
            i.respond({content:":x: Dies ist keine Verlosung oder alle Gewinner stehen schon fest! :x:",ephemeral:true})
        }
    }
}

function randomChoice(arr:any) {
    return arr[Math.floor(Math.random() * arr.length)];
}
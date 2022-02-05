import * as harmony from "https://code.harmony.rocks/main"

export async function checkGW(client:harmony.Client){
    try{
        let gwdb:{"giveaways": {msgid:string,claimmsg:undefined|string,winners:string[],channel:string,end:number,winnercount:number,users:string[],preis:string,claimtime:number,ended:boolean|undefined}[]} = JSON.parse(Deno.readTextFileSync("./databases/giveaways.json"))
        let index = 0
        for(let gw of gwdb.giveaways){
            if(gw.end < Date.now() && (gw.ended == undefined || gw.ended == false)){
                let channel = await client.channels.get(gw.channel)
                if(channel == undefined){
                    channel = await client.channels.resolve(gw.channel)
                }
                if(channel != undefined){
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
                    if(gw.winnercount > -1){
                        let winnernames = []
                        let winnermentions = []
                        let users:string[] = structuredClone(gw.users)
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
                        embed.setDescription(`***Glückwunsch! ***\nIhr habt **${gw.preis}** gewonnen!`)
                        content = winnermentions.join(" ")
                        if(winnernames.length == 0){
                            embed.setTitle("Kein gewinner!")
                            embed.setDescription(`Niemand hat teilgenommen.\nDer Preis war ${gw.preis}!`)
                        }
                        if(winnernames.length == 1){
                            embed.setDescription(`***Glückwunsch! ***\nDu hast **${gw.preis}** gewonnen!`)
                        }
                        gwdb.giveaways[index].winners = winnerids
                    }
                    if(channel.isText()){
                        if(gwdb.giveaways[index].winners.length > 0){
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
                            let claimmsg = await channel.send({
                                embeds:[
                                    embed
                                ],
                                content:content,
                                components:controls
                            })
                            gwdb.giveaways[index].claimmsg = claimmsg.id
                        }else{
                            let claimmsg = await channel.send({
                                embeds:[
                                    embed
                                ],
                                content:content
                            })
                            gwdb.giveaways[index].claimmsg = claimmsg.id
                        }
                        gwdb.giveaways[index].ended = true
                        Deno.writeTextFileSync("./databases/giveaways.json", JSON.stringify(gwdb))
                    }
                }
            }
            index++
        }
    }catch(err){
    }
}

function randomChoice(arr:any) {
    return arr[Math.floor(Math.random() * arr.length)];
}
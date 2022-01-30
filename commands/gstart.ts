import * as harmony from "https://code.harmony.rocks/main"
import {isAuthorized} from "../util/isAuthorized.ts"
import {database,saveDatabase} from "../util/database.ts"

export async function gstart(i:harmony.Interaction,client:harmony.Client){
    if(i.guild && i.member && i.channel && i.isApplicationCommand()){
        if(!(await isAuthorized(i.member))){
            i.respond({
                content: ":x: Du hast dazu keine Rechte! :x:",
                ephemeral: true
            })
            return
        }
        if(i.option<string>("preis") && i.option<number>("gewinneranzahl")){
            let preis = i.option<string>("preis") 
            let gewinneranzahl = i.option<number>("gewinneranzahl")
            let sekunden:number = 0
            if(i.option<number>("tage")&&i.option<number>("tage") > -1){
                sekunden += i.option<number>("tage") * 86400
            }
            if(i.option<number>("stunden")&&i.option<number>("stunden") > -1){
                sekunden += i.option<number>("stunden") * 3600
            }
            if(i.option<number>("minuten")&&i.option<number>("minuten") > -1){
                sekunden += i.option<number>("minuten") * 60
            }
            if(i.option<number>("sekunden")&&i.option<number>("sekunden") > -1){
                sekunden += i.option<number>("sekunden")
            }
            if(sekunden > 0 && sekunden < 1814400 && gewinneranzahl > 0){
                let millisekunden:number = sekunden * 1000
                let date = new Date(Date.now() + millisekunden)
                const controls: harmony.MessageComponentData[] = [
                    {
                        type: harmony.MessageComponentType.ACTION_ROW,
                        components: [
                            {
                                type: harmony.MessageComponentType.BUTTON,
                                style: harmony.ButtonStyle.BLURPLE,
                                customID: 'gw-teilnehmen',
                                label: "Teilnehmen",
                                emoji: {name:"🎁"}
                            }
                        ]
                    },
                ]
                let msg = await i.channel?.send({
                    embeds:[{
                        "title": preis,
                        "description": `Reagiere mit 🎁 , um teilzunehmen.\n**Hoster**: ${i.member?.user.mention}\n**Endet**: <t:${Math.floor(date.getTime()/1000)}:R>\n**Gewinneranzahl**: ${gewinneranzahl.toString()}`,
                        "color": 44469,
                        "author": {
                            "name": "Neue Verlosung",
                            "icon_url": "https://emoji.gg/assets/emoji/3461-giveaway.gif"
                        },
                        "footer": {
                            "text": "⇢ Zetrox von Folizza Studios",
                            "icon_url": "https://images-ext-2.discordapp.net/external/Bz1kDlXLtgMdIMxKgKx1i-8i-wXOSEKFY48ouCl1hPM/https/sph-download.neocities.org/share/GoDaddyStudioPage-0%25202.png"
                        }
                    }],
                    components:controls
                })
                let giveawaydb = database("giveaways.json")
                giveawaydb.giveaways.push({
                    guild:i.guild.id,
                    channel:i.channel.id,
                    end:date.getTime(),
                    hoster:i.member.id,
                    preis:preis,
                    users:[],
                    msgid: msg.id,
                    winnercount: gewinneranzahl
                })
                saveDatabase("giveaways.json",giveawaydb)
                i.respond({content:":white_check_mark: Giveaway erstellt! :white_check_mark:",ephemeral:true})
            }else{
                i.respond({content:":x: Ein Gewinnspiel muss mindestens 1 Sekunde und maximal 3 Wochen lang sein! :x:"})
            }
        }
    }
}
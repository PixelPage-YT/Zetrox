import * as harmony from "https://code.harmony.rocks/main"
import {getGamePoints,modifyGamePoints} from "./bonus/gamepoints.ts"
import{
    random
} from "https://raw.githubusercontent.com/PixelPage-YT/random/main/mod.ts"
import {
    database
} from "../util/database.ts"
import {emojiquiz_solution} from "../util/types.ts"
import {noPerms} from "../util/noPerms.ts"
export async function emojiquiz(i:harmony.Interaction,client:harmony.Client) {
    try{
        if(i.member){
            if(i.guild){
                const emojis = JSON.parse(Deno.readTextFileSync("./data/emojiquiz.json")).data;
                const solution:emojiquiz_solution = random.choice(emojis)
                let guessed:string
                let startTime = Date.now()
                await i.respond({
                    embeds:[
                        {
                            "title": ":game_die: Emojiquiz :game_die:",
                            "description": "*Beim Emojiquiz musst du anhand von Emojis herausfinden, um welchen Gegenstand/Film/Song/Person es sich handelt!*\nBenutze `/guess emojiquiz <wort>`, um ein Wort zu raten oder benutze `/guess emojiquiz abbrechen`, um abzubrechen.\n__**Emojis:**__ **" + solution.emojis + "**",
                            "color": 44469,
                            "footer": {
                                "text": "⇢ Zetrox von Folizza Studios",
                                "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                            }
                        }
                    ]
                })
                while(true){
                    let answer1 = await client.waitFor("interactionCreate", (i2) => {
                        if(i2.member && i.member && i2.channel && i.channel){
                            return i2.member.id == i.member.id && i2.channel.id == i.channel.id
                        }
                        return false
                    }, 10000)
                    let answer: harmony.Interaction | undefined;
                    if(answer1[0]){
                        answer = answer1[0]
                    }

                    if(answer instanceof harmony.Interaction && answer.isApplicationCommand() && answer.name == "guess" && answer.subCommand == "emojiquiz"){
                        guessed = answer.option<string>("wort")
                        if(guessed){
                            if(guessed == "abbrechen"){
                                await i.channel?.send({content:"<:icons_Wrong:947468536492752906> Abgebrochen. <:icons_Wrong:947468536492752906>"})
                                break;
                            }
                            if(solution.solutions.findIndex(index => index.toLowerCase() === guessed.toLocaleLowerCase()) == -1){
                                await answer.respond({content:":x: " + guessed + " ist falsch! :x:"})
                            }
                            if(solution.solutions.findIndex(index => index.toLowerCase() === guessed.toLocaleLowerCase()) != -1){
                                let endtime = Date.now()
                                let difference = endtime - startTime
                                let minutes:number = Math.floor(difference / 60000)
                                difference -= minutes * 60000
                                let seconds = difference / 1000

                                let belohnung:number = solution.points
                                await answer.respond({
                                    embeds:[
                                        {
                                            "title": ":game_die: Spiel abgeschlossen! :game_die:",
                                            "color": 44469,
                                            "fields": [
                                            {
                                                "name": "Zeit gebraucht",
                                                "value": `${minutes} Minuten und ${seconds} Sekunden.`
                                            },
                                            {
                                                "name": "Deine Belohnung",
                                                "value": belohnung.toString()
                                            },
                                            {
                                                "name": "Lösung",
                                                "value": solution.solutions.toString()
                                            }
                                            ],
                                            "footer": {
                                            "text": "⇢ Zetrox von Folizza Studios",
                                            "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                                            }
                                        }
                                    ]
                                })
                                modifyGamePoints(i.member,belohnung)
                                break;
                            }
                        }
                    }else{
                        await i.channel?.send({
                            content:"<:icons_Wrong:947468536492752906> Bitte antworte innerhalb 10 Sekunden <:icons_Wrong:947468536492752906>"
                        })
                        break;
                    }
                }
            }
        }
    }catch(err){
        noPerms(i);
    }
}
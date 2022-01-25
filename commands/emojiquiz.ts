import * as harmony from "https://code.harmony.rocks/main"
import {getGamePoints,modifyGamePoints} from "./bonus/gamepoints.ts"
import{
    random
} from "https://raw.githubusercontent.com/PixelPage-YT/random/main/mod.ts"
import {
    database
} from "../util/database.ts"
export async function emojiquiz(i:harmony.Interaction,client:harmony.Client) {
    if(i.member){
        if(i.guild){
            const emojis = database("emojiquiz.json").data;
            const solution:{emojis:string,points:number,solutions:string[]} = random.choice(emojis)
            let guessed:string
            let startTime = Date.now()
            i.respond({
                embeds:[
                    {
                        "title": ":game_die: Emojiquiz :game_die:",
                        "description": "*Beim Emojiquiz musst du anhand von Emojis herausfinden, um welchen Gegenstand/Film/Song/Person es sich handelt!*\n**Je schneller du bist, desto mehr Punkte gibt es!**\nDu hast 50 Sekunden Zeit.\n__**Emojis:**__ **" + solution.emojis + "**",
                        "color": 44469,
                        "footer": {
                            "text": "⇢ Zetrox von Folizza Studios",
                            "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                        }
                    }
                ]
            })
            while(true){
                let answer1 = await client.waitFor("messageCreate", (message) => {
                    return message.author.id == i.member?.id && message.channel.id == i.channel?.id
                }, 50000)
                let answer: harmony.Message | undefined;
                if(answer1[0]){
                    answer = answer1[0]
                }

                if(answer instanceof harmony.Message){
                    guessed = answer.content
                    if(solution.solutions.findIndex(index => index.toLowerCase() === answer?.content.toLocaleLowerCase()) == -1){
                        answer.addReaction("❌")
                    }
                    if(solution.solutions.findIndex(index => index.toLowerCase() === answer?.content.toLocaleLowerCase()) != -1){
                        let endtime = Date.now()
                        let difference = endtime - startTime
                        let minutes:number = Math.floor(difference / 60000)
                        difference -= minutes * 60000
                        let seconds = difference / 1000

                        let belohnung:number = solution.points
                        i.channel?.send({
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
                }else{
                    i.channel?.send({
                        content:":x: Bitte antworte innerhalb 50 Sekunden :x:"
                    })
                    break;
                }
            }
        }
    }
}
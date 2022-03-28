import * as harmony from "https://code.harmony.rocks/main"
import {getGamePoints,modifyGamePoints} from "./bonus/gamepoints.ts"
import{
    random
} from "https://raw.githubusercontent.com/PixelPage-YT/random/main/mod.ts"
import {
    database
} from "../util/database.ts"
import {noPerms} from "../util/noPerms.ts"
import {quiz_solution} from "../util/types.ts"
export async function quiz(i:harmony.Interaction, client:harmony.Client){
    try{
        if(i.member){
            if(i.guild){
                const emojis = JSON.parse(Deno.readTextFileSync("./data/quiz.json")).data;
                const solution:quiz_solution = random.choice(emojis)
                let guessed:number
                let startTime = Date.now()
                const controls: harmony.MessageComponentData[] = [
                    {
                        type: harmony.MessageComponentType.ACTION_ROW,
                        components: [
                            {
                                type: harmony.MessageComponentType.BUTTON,
                                style: harmony.ButtonStyle.SECONDARY,
                                customID: 'quiz-1',
                                emoji: {name:"1️⃣"},
                                label:"Eins"
                            },
                            {
                                type: harmony.MessageComponentType.BUTTON,
                                style: harmony.ButtonStyle.SECONDARY,
                                customID: 'quiz-2',
                                emoji: {name:"2️⃣"},
                                label:"Zwei"
                            },
                            {
                                type: harmony.MessageComponentType.BUTTON,
                                style: harmony.ButtonStyle.SECONDARY,
                                customID: 'quiz-3',
                                emoji: {name:"3️⃣"},
                                label:"Drei"
                            },
                            {
                                type: harmony.MessageComponentType.BUTTON,
                                style: harmony.ButtonStyle.SECONDARY,
                                customID: 'quiz-4',
                                emoji: {name:"4️⃣"},
                                label:"Vier"
                            }
                        ]
                    },
                ]
                await i.respond({
                    embeds:[
                        {
                            "title": ":game_die: Quiz :game_die:",
                            "description": `*Beim Quiz musst du spannende Fragen beantworten!*\nDu hast 10 Sekunden Zeit.\n__**Frage:**__ **${solution.frage}**\n__**Möglichkeiten:**__\n:one: ${solution.possible[0]}\n:two: ${solution.possible[1]}\n:three: ${solution.possible[2]}\n:four: ${solution.possible[3]}`,
                            "color": 44469,
                            "footer": {
                                "text": "⇢ Zetrox von Folizza Studios",
                                "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                            }
                        }
                    ],
                    components: controls
                })
                let answer1 = await client.waitFor("interactionCreate", (i2:harmony.Interaction) => {
                    if(i.member && i2.member && i.channel&& i2.channel){
                        return i.member.id == i2.member.id && i2.channel.id == i.channel.id
                    }
                    return false
                }, 10000)
                let answer: harmony.Interaction | undefined;
                if(answer1[0]){
                    answer = answer1[0]
                }

                if(answer instanceof harmony.Interaction){
                    if(answer.isMessageComponent()){
                        if((answer.customID == "quiz-1" && solution.solution == 0) || (answer.customID == "quiz-2" && solution.solution == 1) || (answer.customID == "quiz-3" && solution.solution ==2) || (answer.customID == "quiz-4" && solution.solution ==3)){
                            // Richtig
                            let endtime = Date.now()
                            let difference = endtime - startTime
                            let minutes:number = Math.floor(difference / 60000)
                            difference -= minutes * 60000
                            let seconds = difference / 1000

                            let belohnung:number = solution.points
                            answer.respond({
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
                                            "value": solution.possible[solution.solution]
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
                        }else{
                            // Falsch
                            answer.respond({content:"<:icons_Wrong:947468536492752906> Deine Antwort war Falsch! <:icons_Wrong:947468536492752906>"})
                        }
                    }
                }else{
                    await i.channel?.send({
                        content:"<:icons_Wrong:947468536492752906> Bitte antworte innerhalb 10 Sekunden <:icons_Wrong:947468536492752906>"
                    })
                }
            }
        }
    }catch(err){
        noPerms(i,err);
    }
}
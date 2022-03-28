import * as harmony from "https://code.harmony.rocks/main"
import {modifyGamePoints} from "./bonus/gamepoints.ts"
import {
    randomNumber,
    randomNumberGenerator,
    randomNumberList,
} from "https://deno.land/x/random_number@v0.1.0/mod.ts";
import {askInteraction} from "../util/askInteraction.ts"
import {noPerms} from "../util/noPerms.ts"
export async function gtn(i:harmony.Interaction,client:harmony.Client) {
    try{
        if(i.member){
            if(i.guild){
                let zahl = randomNumber({ integer: true, max: 100 });
                let guessed:number;
                let startTime = Date.now()
                await i.respond({
                    embeds:[
                        {
                            "title": ":game_die: Guess The Number :game_die:",
                            "description": "*Bei Guess The Number musst du eine Zahl erraten und dir wird gesagt, ob die Lösung größer oder Kleiner ist.*\n**Benutze `/guess gtn <zahl>` um die Zahl zu erraten (0-100)**",
                            "color": 44469,
                            "footer": {
                                "text": "⇢ Zetrox von Folizza Studios",
                                "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                            }
                        }
                    ],
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

                    if(answer instanceof harmony.Interaction && answer.isApplicationCommand() && answer.name == "guess" && answer.subCommand == "gtn"){
                        guessed = answer.option<number>("zahl")
                        if(guessed){
                            if(guessed < zahl){
                                await answer.respond({content:":game_die: Die gesuchte Zahl ist **größer** :game_die:"})
                            }
                            if(guessed > zahl){
                                await answer.respond({content:":game_die: Die gesuchte Zahl ist **kleiner** :game_die:"})
                            }
                            if(guessed == zahl){
                                let endtime = Date.now()
                                let difference = endtime - startTime
                                let realdifference = endtime - startTime
                                let minutes:number = Math.floor(difference / 60000)
                                difference -= minutes * 60000
                                let seconds = difference / 1000

                                let belohnung:number = 0
                                if(!((realdifference / 300) > 99)){
                                    belohnung = Math.floor(100 - (realdifference / 300))
                                }
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
                                                "value": zahl.toString()
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
        console.log(err)
        noPerms(i,err);
    }
}
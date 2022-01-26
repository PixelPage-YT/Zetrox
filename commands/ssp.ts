import * as harmony from "https://code.harmony.rocks/main"
import {getGamePoints,modifyGamePoints} from "./bonus/gamepoints.ts"
import{
    random
} from "https://raw.githubusercontent.com/PixelPage-YT/random/main/mod.ts"
import {
    database
} from "../util/database.ts"

export async function ssp(i:harmony.Interaction, client:harmony.Client){
    if(i.member){
        if(i.guild){
            if(i.isApplicationCommand()){
                if(i.option<string>("user") == undefined){
                    const choices:any = ["schere","stein","papier"]
                    let computerChoice = random.choice(choices)
                    const controls: harmony.MessageComponentData[] = [
                        {
                            type: harmony.MessageComponentType.ACTION_ROW,
                            components: [
                                {
                                    type: harmony.MessageComponentType.BUTTON,
                                    style: harmony.ButtonStyle.SECONDARY,
                                    customID: 'ssp-schere',
                                    emoji: {name:"✂️"}
                                },
                                {
                                    type: harmony.MessageComponentType.BUTTON,
                                    style: harmony.ButtonStyle.SECONDARY,
                                    customID: 'ssp-stein',
                                    emoji: {name:"🪨"}
                                },
                                {
                                    type: harmony.MessageComponentType.BUTTON,
                                    style: harmony.ButtonStyle.SECONDARY,
                                    customID: 'ssp-papier',
                                    emoji: {name:"📄"}
                                }
                            ]
                        },
                    ]
                    i.respond({
                        embeds:[
                            {
                                "title": ":game_die: Schere Stein Papier (Single-Player) :game_die:",
                                "description": `*Bitte wähle deinen Gegenstand*`,
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
                              
                            let userChoice:string
                            if(answer.customID == "ssp-schere"){
                                userChoice = "schere"
                            }else if(answer.customID == "ssp-stein"){
                                userChoice = "stein"
                            }else if(answer.customID == "ssp-papier"){
                                userChoice = "papier"
                            }else{
                                answer.respond({
                                    content:":x: Irgendetwas ist schief gelaufen... :x:"
                                })
                                console.log("[Info] SSP: Benutzerauswahl nicht gefunen")
                                return
                            }

                            if(checker(userChoice,computerChoice) == "gewonnen"){
                                answer.respond({
                                    embeds:[
                                        {
                                            "title": ":game_die: Spiel abgeschlossen! :game_die:",
                                            "color": 44469,
                                            "fields": [
                                            {
                                                "name": "Du hast gewählt",
                                                "value": userChoice
                                            },
                                            {
                                                "name": "Ich habe gewählt",
                                                "value": computerChoice
                                            },
                                            {
                                                "name": "SpielStand",
                                                "value": ":tada: Gewonnen :tada:"
                                            },
                                            {
                                                "name": "Deine Belohnung",
                                                "value": "20 SpielPunkte"
                                            }
                                            ],
                                                "footer": {
                                                "text": "⇢ Zetrox von Folizza Studios",
                                                "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                                            }
                                        }
                                    ]
                                })
                                modifyGamePoints(i.member,20)
                            }
                            if(checker(userChoice,computerChoice) == "verloren"){
                                answer.respond({
                                    embeds:[
                                        {
                                            "title": ":game_die: Spiel abgeschlossen! :game_die:",
                                            "color": 44469,
                                            "fields": [
                                            {
                                                "name": "Du hast gewählt",
                                                "value": userChoice
                                            },
                                            {
                                                "name": "Ich habe gewählt",
                                                "value": computerChoice
                                            },
                                            {
                                                "name": "SpielStand",
                                                "value": ":slight_frown: Verloren :slight_frown:"
                                            },
                                            {
                                                "name": "Deine Belohnung",
                                                "value": "-5 SpielPunkte"
                                            }
                                            ],
                                                "footer": {
                                                "text": "⇢ Zetrox von Folizza Studios",
                                                "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                                            }
                                        }
                                    ]
                                })
                                modifyGamePoints(i.member,-5)
                            }
                            if(checker(userChoice,computerChoice) == "unentschieden"){
                                answer.respond({
                                    embeds:[
                                        {
                                            "title": ":game_die: Spiel abgeschlossen! :game_die:",
                                            "color": 44469,
                                            "fields": [
                                            {
                                                "name": "Du hast gewählt",
                                                "value": userChoice
                                            },
                                            {
                                                "name": "Ich habe gewählt",
                                                "value": computerChoice
                                            },
                                            {
                                                "name": "SpielStand",
                                                "value": ":heavy_minus_sign: Unentschieden :heavy_minus_sign: "
                                            },
                                            {
                                                "name": "Deine Belohnung",
                                                "value": "0 SpielPunkte"
                                            }
                                            ],
                                                "footer": {
                                                "text": "⇢ Zetrox von Folizza Studios",
                                                "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                                            }
                                        }
                                    ]
                                })
                            }
                        }
                    }else{
                        i.channel?.send({
                            content:":x: Bitte antworte innerhalb 10 Sekunden :x:"
                        })
                    }
                }
            }
        }
    }
}

function checker(human:string,computer:string){
    let choicesObject:any = {
        'stein' : {
            'stein' : 'unentschieden',
            'schere' : 'gewonnen',
            'papier' : 'verloren'
        },
        'schere' : {
            'stein' : 'verloren',
            'schere' : 'unentschieden',
            'papier' : 'gewonnen'
        },
        'papier' : {
            'stein' : 'gewonnen',
            'schere' : 'verloren',
            'papier' : 'unentschieden'
        }
    }
    return choicesObject[human][computer]
}

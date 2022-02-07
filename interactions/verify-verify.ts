import * as harmony from "https://code.harmony.rocks/main"
import {database ,saveDatabase} from "../util/database.ts"
import {isAuthorized} from "../util/isAuthorized.ts"
import {noPerms} from "../util/noPerms.ts"
export async function verifyVerify(i:harmony.Interaction,client:harmony.Client){
    try{
        if(i.member && i.channel && i.guild && i.isMessageComponent()){
            let verifydb = database("verify.json")
            if(verifydb[i.guild.id]){
                if(verifydb[i.guild.id].needAuth == true){
                    let r1 = Math.floor(Math.random() * 10);
                    let r2 = Math.floor(Math.random() * 10);
                    let sol = r1+r2
                    let pos1 = sol - getRndInteger(-5,5)
                    let pos2 = sol - getRndInteger(-5,5)
                    while(pos2 == pos1 || pos1 == sol || pos2 == sol){
                        pos1 = sol - getRndInteger(-5,5)
                        pos2 = sol - getRndInteger(-5,5)
                    }
                    let possible = shuffle([sol,pos1,pos2])
                    let rsol = (possible.findIndex(index => index === sol))+1
                    const controls: harmony.MessageComponentData[] = [
                        {
                            type: harmony.MessageComponentType.ACTION_ROW,
                            components: [
                                {
                                    type: harmony.MessageComponentType.BUTTON,
                                    style: harmony.ButtonStyle.BLURPLE,
                                    customID: 'verify-one',
                                    label:possible[0].toString()
                                },
                                {
                                    type: harmony.MessageComponentType.BUTTON,
                                    style: harmony.ButtonStyle.BLURPLE,
                                    customID: 'verify-two',
                                    label:possible[1].toString()
                                },
                                {
                                    type: harmony.MessageComponentType.BUTTON,
                                    style: harmony.ButtonStyle.BLURPLE,
                                    customID: 'verify-three',
                                    label:possible[2].toString()
                                }
                            ]
                        },
                    ]
                    let resmsg = await i.respond({embeds:[
                        {
                            "title": `Was ist ${r1} + ${r2}?`,
                            "color": 44469,
                            "author": {
                                "name": "Verifizieren",
                                "icon_url": "https://vectorified.com/images/white-lock-icon-png-9.png"
                            },
                            "footer": {
                                "text": "⇢ Zetrox von Folizza Studios",
                                "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                            }
                        }
                    ],components:controls,ephemeral:true})
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
                            if(answer.customID == "verify-one" || answer.customID == "verify-two" || answer.customID == "verify-three"){
                                if(answer.customID == "verify-one" && rsol == 1 || answer.customID == "verify-two" && rsol == 2 || answer.customID == "verify-three" && rsol == 3){
                                    let dbentry = verifydb[i.guild.id]
                                    if(i.guild && i.message && i.member && i.channel){
                                        let role = await i.guild.roles.get(dbentry.role)
                                        if(role == undefined){
                                            role = await i.guild.roles.resolve(dbentry.role)
                                        }
                                        if(role != undefined){
                                            await i.member.roles.add(role)
                                            await answer.respond({content:i.member.user.mention + ", :white_check_mark: Verifiziert! :white_check_mark:",ephemeral:true})
                                        }
                                    }
                                }else{
                                    answer.respond({ephemeral:true,content:i.user.mention + ", :x: **Das war nicht die richtige Lösung!** :x:"})
                                    return
                                }
                            }
                        }
                    }
                }else{
                    let dbentry = verifydb[i.guild.id]
                    if(i.guild && i.message && i.member && i.channel){
                        let role = await i.guild.roles.get(dbentry.role)
                        if(role == undefined){
                            role = await i.guild.roles.resolve(dbentry.role)
                        }
                        if(role != undefined){
                            i.member.roles.add(role)
                            await i.respond({content:i.member.user.mention + ", :white_check_mark: Verifiziert! :white_check_mark:",ephemeral:true})
                        }
                    }
                }
            }
        }
    }catch(err){
        noPerms(i);
    }
}

function getRndInteger(min:number, max:number) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function shuffle(a:number[]) {
    return a.sort(() => Math.random() - 0.5);
}


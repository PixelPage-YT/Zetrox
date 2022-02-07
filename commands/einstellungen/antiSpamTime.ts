import * as harmony from "https://code.harmony.rocks/main"
import {isAuthorized} from "../../util/isAuthorized.ts"
import {noPerms} from "../../util/noPerms.ts"

export async function eAntiSpamTime(i:harmony.Interaction,client:harmony.Client){
    try{
        if(i.member){
            if(!(await isAuthorized(i.member))){
                await i.respond({
                    content: ":x: Du hast dazu keine Rechte! :x:",
                    ephemeral: true
                })
                return
            }
        }
        if(i.isApplicationCommand()){
            if(i.member){
                if(i.guild){
                    if(i.option<string>("time") != undefined){
                        let time = parseInt(i.option<string>("time"));
                        if(time > -1 && time < 100){
                            const invChanneldb = JSON.parse(Deno.readTextFileSync("./databases/antiSpamTime.json"))
                            invChanneldb[i.guild.id] = time
                            Deno.writeTextFileSync("./databases/antiSpamTime.json", JSON.stringify(invChanneldb))
                            await i.respond({
                                embeds:[
                                    {
                                        "title": ":white_check_mark: Erfolgreich eingestellt! :white_check_mark:",
                                        "description": `Du hast die Einstellung \`AntiSpamTime\` auf ${time.toString()} Sekunden gesetzt!`,
                                        "color": 44469,
                                        "footer": {
                                            "text": "⇢ Zetrox von Folizza Studios",
                                            "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                                        }
                                    }
                                ]
                            })
                        }else{
                            await i.respond({
                                content: ":x: Die Zeit in Sekunden muss über 0 und unter 100 Sekunden sein! :x:",
                                ephemeral:true
                            })
                        }
                    }
                }
            }
        }
    }catch(err){
        noPerms(i);
    }
}
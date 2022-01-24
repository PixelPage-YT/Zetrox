import * as harmony from "https://code.harmony.rocks/main"
import {isAuthorized} from "../../util/isAuthorized.ts"

export async function eTeamRole(i:harmony.Interaction,client:harmony.Client){
    if(i.member){
        if(!(await isAuthorized(i.member))){
            i.respond({
                content: ":x: Du hast dazu keine Rechte! :x:",
                ephemeral: true
            })
            return
        }
    }
    if(i.isApplicationCommand()){
        if(i.member){
            if(i.guild){
                if(i.option<harmony.Role>("role")){
                    let role = i.option<harmony.Role>("role")
                    if(role != undefined){
                        const teamRoledb = JSON.parse(Deno.readTextFileSync("./databases/teamRole.json"))
                        if(teamRoledb[i.guild.id] && teamRoledb[i.guild.id] == role.id){
                            teamRoledb[i.guild.id] = "0"
                            i.respond({
                                embeds:[
                                    {
                                        "title": ":white_check_mark: Erfolgreich eingestellt! :white_check_mark:",
                                        "description": `Du hast die \`TeamRole\` erfolgreich gelöscht!`,
                                        "color": 44469,
                                        "footer": {
                                            "text": "⇢ Zetrox von Folizza Studios",
                                            "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                                        }
                                    }
                                ]
                            })
                            Deno.writeTextFileSync("./databases/teamRole.json", JSON.stringify(teamRoledb))
                            return
                        }
                        teamRoledb[i.guild.id] = role.id
                        Deno.writeTextFileSync("./databases/teamRole.json", JSON.stringify(teamRoledb))
                        i.respond({
                            embeds:[
                                {
                                    "title": ":white_check_mark: Erfolgreich eingestellt! :white_check_mark:",
                                    "description": `Du hast die Einstellung \`TeamRole\` auf ${role.name} gesetzt!\n*Setze die Einstellung erneut auf ${role.name}, um die Rolle zu löschen.*`,
                                    "color": 44469,
                                    "footer": {
                                        "text": "⇢ Zetrox von Folizza Studios",
                                        "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                                    }
                                }
                            ]
                        })
                    }else{
                        i.respond({
                            content: ":x: Diese Rolle existiert nicht! :x:",
                            ephemeral:true
                        })
                    }
                }
            }
        }
    }
}
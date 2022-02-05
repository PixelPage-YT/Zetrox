import * as harmony from "https://code.harmony.rocks/main"
import {isAuthorized} from "../../util/isAuthorized.ts"
import {noPerms} from "../../util/noPerms.ts"

export async function eInviteKanal(i:harmony.Interaction,client:harmony.Client){
    try{
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
                    if(i.option<harmony.InteractionChannel>("channel")){
                        const channel:harmony.GuildChannel|undefined = await i.guild.channels.get(i.option<harmony.InteractionChannel>("channel").id)
                        if(channel != undefined && channel.isText()){
                            const invChanneldb = JSON.parse(Deno.readTextFileSync("./databases/invites/inviteChannels.json"))
                            if(invChanneldb[i.guild.id] && invChanneldb[i.guild.id] == channel.id){
                                invChanneldb[i.guild.id] = "0"
                                i.respond({
                                    embeds:[
                                        {
                                            "title": ":white_check_mark: Erfolgreich eingestellt! :white_check_mark:",
                                            "description": `Du hast den \`InviteKanal\` erfolgreich gelöscht!`,
                                            "color": 44469,
                                            "footer": {
                                                "text": "⇢ Zetrox von Folizza Studios",
                                                "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                                            }
                                        }
                                    ]
                                })
                                Deno.writeTextFileSync("./databases/invites/inviteChannels.json", JSON.stringify(invChanneldb))
                                return
                            }
                            invChanneldb[i.guild.id] = channel.id
                            Deno.writeTextFileSync("./databases/invites/inviteChannels.json", JSON.stringify(invChanneldb))
                            i.respond({
                                embeds:[
                                    {
                                        "title": ":white_check_mark: Erfolgreich eingestellt! :white_check_mark:",
                                        "description": `Du hast die Einstellung \`InviteKanal\` auf ${channel.mention} gesetzt!\n*Setze die Einstellung erneut auf ${channel.mention}, um den Kanal zu löschen.*`,
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
                                content: ":x: Dieser Kanal existiert nicht oder es ist kein __TextKanal__! :x:",
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
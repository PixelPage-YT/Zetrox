import * as harmony from "https://code.harmony.rocks/main"
import {isAuthorized} from "../../util/isAuthorized.ts"
import {noPerms} from "../../util/noPerms.ts"
import { supabaseClient } from "https://deno.land/x/supabase_deno@v1.0.5/mod.ts"

export async function eInviteKanal(i:harmony.Interaction,client:harmony.Client){
    try{
        const sbclient:supabaseClient = new supabaseClient("https://lvqcvchccfkvuihmdbiu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2cWN2Y2hjY2ZrdnVpaG1kYml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUyODcwNTUsImV4cCI6MTk2MDg2MzA1NX0.rr8wnLdwcF99sstojzwkgdgCk6_qMh2tSIq5Bf8EUUE")
        let table = sbclient.tables().get("guild_settings")
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
                    if(i.option<harmony.InteractionChannel>("channel")){
                        const channel:harmony.GuildChannel|undefined = await i.guild.channels.get(i.option<harmony.InteractionChannel>("channel").id)
                        if(channel != undefined && channel.isText()){
                            type guild_setting = {
                                id:string,
                                teamRole:string,
                                antiSpamTime:number,
                                inviteChannel:string
                            }
                            let item:guild_setting = {id:i.guild.id,teamRole:"0",antiSpamTime:10,inviteChannel:"0"}
                            let nitem: guild_setting = (await table.items().get("id", i.guild.id))[0]
                            if(nitem != undefined){
                                item = nitem
                            }
                            if(item != undefined && item.inviteChannel == channel.id){
                                item.inviteChannel = "0"
                                table.items().edit("id", i.guild.id, item)
                                await i.respond({
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
                                return
                            }
                            item.inviteChannel = channel.id
                            table.items().edit("id", i.guild.id, item)
                            await i.respond({
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
                            await i.respond({
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
import * as harmony from "https://code.harmony.rocks/main"
import {isAuthorized} from "../../util/isAuthorized.ts"
import {noPerms} from "../../util/noPerms.ts"
import { supabaseClient } from "https://deno.land/x/supabase_deno@v1.0.5/mod.ts"
import {guild_setting} from "../../util/types.ts"

export async function eAntiSpamTime(i:harmony.Interaction,client:harmony.Client){
    try{
        const sbclient:supabaseClient = new supabaseClient("https://lvqcvchccfkvuihmdbiu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2cWN2Y2hjY2ZrdnVpaG1kYml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUyODcwNTUsImV4cCI6MTk2MDg2MzA1NX0.rr8wnLdwcF99sstojzwkgdgCk6_qMh2tSIq5Bf8EUUE")
        let table = sbclient.tables().get("guild_settings")
        if(i.member){
            if(!(await isAuthorized(i.member))){
                await i.respond({
                    content: "<:icons_Wrong:947468536492752906> Du hast dazu keine Rechte! <:icons_Wrong:947468536492752906>",
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
                            let item:guild_setting = {id:i.guild.id,teamRole:"0",antiSpamTime:10,inviteChannel:"0"}
                            let nitem: guild_setting = (await table.items().get("id", i.guild.id))[0]
                            if(nitem != undefined){
                                item = nitem
                            }
                            item.antiSpamTime = time
                            table.items().edit("id", i.guild.id, item)
                            await i.respond({
                                embeds:[
                                    {
                                        "title": "<:icons_Correct:947467655630164038> Erfolgreich eingestellt! <:icons_Correct:947467655630164038>",
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
                                content: "<:icons_Wrong:947468536492752906> Die Zeit in Sekunden muss über 0 und unter 100 Sekunden sein! <:icons_Wrong:947468536492752906>",
                                ephemeral:true
                            })
                        }
                    }
                }
            }
        }
    }catch(err){
        noPerms(i,err);
    }
}
import { supabaseClient } from "https://deno.land/x/supabase_deno@v1.0.5/mod.ts"
import * as harmony from "https://code.harmony.rocks/main"
import {database ,saveDatabase} from "../util/database.ts"
import {isAuthorized} from "../util/isAuthorized.ts"
import {noPerms} from "../util/noPerms.ts"
export async function ticketClose(i:harmony.Interaction,client:harmony.Client){
    try{
        if(i.member && i.channel && i.guild && i.isMessageComponent()){
            let ticketopendb = database("ticketopen.json")
            if(ticketopendb[i.channel.id]){
                if(!(ticketopendb[i.channel.id].closed == true)){
                    ticketopendb[i.channel.id].closed = true
                    if(i.channel.isGuildText()){
                        if(i.member){
                            let catopen = await client.channels.get(ticketopendb[i.channel.id].catopen)
                            if(catopen == undefined){
                                catopen = await client.channels.resolve(ticketopendb[i.channel.id].catopen)
                            }
                            let catclose = await client.channels.get(ticketopendb[i.channel.id].catclose)
                            if(catopen == undefined){
                                catclose = await client.channels.resolve(ticketopendb[i.channel.id].catclose)
                            }
                            if(catclose != undefined && catopen != undefined && catopen.isCategory() && catclose.isCategory()){
                                let ticketdb = database("tickets.json")
                                const sbclient:supabaseClient = new supabaseClient("https://lvqcvchccfkvuihmdbiu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2cWN2Y2hjY2ZrdnVpaG1kYml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUyODcwNTUsImV4cCI6MTk2MDg2MzA1NX0.rr8wnLdwcF99sstojzwkgdgCk6_qMh2tSIq5Bf8EUUE")
                                let table = sbclient.tables().get("guild_settings")
                                let item = (await table.items().get("id", i.guild.id))[0]
                                if(item != undefined){
                                    let role = await i.guild.roles.get(item.teamRole)
                                    if(role == undefined){
                                        role = await i.guild.roles.resolve(item.teamRole)
                                    }
                                    if(role != undefined){
                                        await i.channel.edit({parentID:catclose.id,permissionOverwrites:[{id:i.guild.id,type:harmony.OverwriteType.ROLE,allow:"0",deny:"68608"},{id:i.member.id,type:harmony.OverwriteType.USER,allow:"0",deny:"68608"},{id:role.id,type:harmony.OverwriteType.ROLE,allow:"68608",deny:"0"}]})
                                        saveDatabase("ticketopen.json",ticketopendb)
                                        const controls: harmony.MessageComponentData[] = [
                                            {
                                                type: harmony.MessageComponentType.ACTION_ROW,
                                                components: [
                                                    {
                                                        type: harmony.MessageComponentType.BUTTON,
                                                        style: harmony.ButtonStyle.DESTRUCTIVE,
                                                        customID: 'ticket-delete',
                                                        label: "Ticket Löschen",
                                                        emoji: {name:"🧨"}
                                                    },
                                                    {
                                                        type: harmony.MessageComponentType.BUTTON,
                                                        style: harmony.ButtonStyle.PRIMARY,
                                                        customID: 'ticket-transcript',
                                                        label: "Transkript Erstellen",
                                                        emoji: {name:"📂"}
                                                    },
                                                    {
                                                        type: harmony.MessageComponentType.BUTTON,
                                                        style: harmony.ButtonStyle.SECONDARY,
                                                        customID: 'ticket-open',
                                                        label: "Ticket Öffnen",
                                                        emoji: {name:"🗝"}
                                                    }
                                                ]
                                            },
                                        ]
                                        await i.respond({
                                            embeds: [{
                                                "title": "Ticket geschlossen",
                                                "description": "Das Ticket wurde erfolgreich geschlossen. \nWenn du weitere Aktionen durchführen willst, kannst du\nunter dieser Nachricht die jeweiligen Buttons benutzen.",
                                                "color": 44469,
                                                "author": {
                                                    "name": "Ticket System",
                                                    "icon_url": "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/twitter/214/open-mailbox-with-lowered-flag_1f4ed.png"
                                                },
                                                "footer": {
                                                    "text": "⇢ Zetrox von Folizza Studios",
                                                    "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                                                }
                                            }],
                                            components:controls
                                        })
                                    }
                                }
                            }
                        }
                    }
                }else{
                    await i.respond({content:"<:icons_Wrong:947468536492752906> Das Ticket ist bereits geschlossen worden! <:icons_Wrong:947468536492752906>",ephemeral:true})
                }
            }else{
                await i.respond({content:"<:icons_Wrong:947468536492752906> Das hier ist kein Ticket! <:icons_Wrong:947468536492752906>",ephemeral:true})
            }
        }
    }catch(err){
        noPerms(i);
    }
}

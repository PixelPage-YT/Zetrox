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
                                let teamroledb = database("teamRole.json")
                                if(teamroledb[i.guild.id]){
                                    let role = await i.guild.roles.get(teamroledb[i.guild.id])
                                    if(role == undefined){
                                        role = await i.guild.roles.resolve(teamroledb[i.guild.id])
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
                    await i.respond({content:":x: Das Ticket ist bereits geschlossen worden! :x:",ephemeral:true})
                }
            }else{
                await i.respond({content:":x: Das hier ist kein Ticket! :x:",ephemeral:true})
            }
        }
    }catch(err){
        noPerms(i);
    }
}

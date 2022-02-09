import * as harmony from "https://code.harmony.rocks/main"
import {database ,saveDatabase} from "../util/database.ts"
import {isAuthorized} from "../util/isAuthorized.ts"
import {noPerms} from "../util/noPerms.ts"
export async function ticketOpen(i:harmony.Interaction,client:harmony.Client){
    try{
        if(i.member && i.channel && i.guild && i.isMessageComponent()){
            let ticketopendb = database("ticketopen.json")
            if(ticketopendb[i.channel.id]){
                ticketopendb[i.channel.id].closed = false
                let user = await client.users.get(ticketopendb[i.channel.id].owner)
                if(user == undefined){
                    user = await client.users.resolve(ticketopendb[i.channel.id].owner)
                }
                let catopen = await client.channels.get(ticketopendb[i.channel.id].catopen)
                if(catopen == undefined){
                    catopen = await client.channels.resolve(ticketopendb[i.channel.id].catopen)
                }
                let catclose = await client.channels.get(ticketopendb[i.channel.id].catclose)
                if(catopen == undefined){
                    catclose = await client.channels.resolve(ticketopendb[i.channel.id].catclose)
                }
                if(catclose != undefined && catopen != undefined && catopen.isCategory() && catclose.isCategory()){
                    if(i.channel.isGuildText()){
                        if(i.member){
                            if(user){
                                let teamroledb = database("teamRole.json")
                                if(teamroledb[i.guild.id]){
                                    let role = await i.guild.roles.get(teamroledb[i.guild.id])
                                    if(role == undefined){
                                        role = await i.guild.roles.resolve(teamroledb[i.guild.id])
                                    }
                                    if(role != undefined){
                                        await i.channel.edit({parentID:catopen.id,permissionOverwrites:[{id:i.guild.id,type:harmony.OverwriteType.ROLE,allow:"0",deny:"68608"},{id:user.id,type:harmony.OverwriteType.USER,allow:"68608",deny:"0"},{id:role.id,type:harmony.OverwriteType.ROLE,allow:"68608",deny:"0"}]})
                                        saveDatabase("ticketopen.json",ticketopendb)
                                        const ticketcontrol: harmony.MessageComponentData[] = [
                                            {
                                                type: harmony.MessageComponentType.ACTION_ROW,
                                                components: [
                                                    {
                                                        type: harmony.MessageComponentType.BUTTON,
                                                        style: harmony.ButtonStyle.DANGER,
                                                        customID: 'ticket-close',
                                                        label: "Ticket schließen",
                                                        emoji: {name:"🔐"}
                                                    }
                                                ]
                                            },
                                        ]
                                        await i.channel.send({
                                            content:user?.mention,
                                            embeds:[{
                                                    "title": "Ticket wieder eröffnet",
                                                    "color": 44469,
                                                    "author": {
                                                        "name": "Ticket System",
                                                        "icon_url": "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/twitter/214/open-mailbox-with-lowered-flag_1f4ed.png"
                                                    },
                                                    "footer": {
                                                        "text": "⇢ Zetrox von Folizza Studios",
                                                        "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                                                    }
                                                }
                                            ],
                                            components:ticketcontrol
                                        })
                                        await i.respond({
                                            content:":white_check_mark: Das Ticket wurde wieder eröffnet! :white_check_mark:",
                                            ephemeral: true
                                        })
                                    }
                                }
                            }
                        }
                    }
                }
            }else{
                await i.respond({content:":x: Das hier ist kein Ticket! :x:",ephemeral:true})
            }
        }
    }catch(err){
        noPerms(i);
    }
}

import { supabaseClient } from "https://deno.land/x/supabase_deno@v1.0.5/mod.ts"
import * as harmony from "https://code.harmony.rocks/main"

export async function guildMemberAdd(member:harmony.Member,client:harmony.Client){
    try{
        const sbclient:supabaseClient = new supabaseClient("https://lvqcvchccfkvuihmdbiu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2cWN2Y2hjY2ZrdnVpaG1kYml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUyODcwNTUsImV4cCI6MTk2MDg2MzA1NX0.rr8wnLdwcF99sstojzwkgdgCk6_qMh2tSIq5Bf8EUUE")
        let table = sbclient.tables().get("guild_settings")
        let guildInvites = await member.guild.invites.fetchAll()
        guildInvites.forEach(async invite => { //basically a for loop over the invites
            // @ts-ignore
            let invite1 = client.oinvites[invite.code]
            if(invite.uses != invite1) { //if it doesn't match what we stored:
                if(invite.inviter){
                    invite.inviter.id
                    let invitedb = JSON.parse(Deno.readTextFileSync("./databases/invites/invites.json"));
                    if(invite.guild){
                        if(!(invitedb[invite.guild.id])){
                            invitedb[invite.guild.id] = {}
                        }
                        if(!(invitedb[invite.guild.id][invite.inviter.id])){
                            invitedb[invite.guild.id][invite.inviter.id] = {count:0,invited:[],leaves:0}
                        }
                        invitedb[invite.guild.id][invite.inviter.id].count++
                        invitedb[invite.guild.id][invite.inviter.id].invited.push(member.id)
                        let item = (await table.items().get("id", member.guild.id))[0]
                        if(item != undefined){
                            let channel = await member.guild.channels.get(item.inviteChannel)
                            if(channel == undefined){
                                let channel = await member.guild.channels.resolve(item.inviteChannel)
                            }
                            if(channel != undefined && channel.isText()){
                                await channel.send({
                                    embeds: [
                                        {
                                            "title": member.user.username,
                                            "description": "ist gerade dem Server beigetreten! \n*Er/Sie wurde eingeladen von* **" + invite.inviter.username + "**",
                                            "color": 5814783,
                                            "author": {
                                            "name": "Neues Mitglied",
                                            "icon_url": "https://emoji.gg/assets/emoji/3118-discord-members.png"
                                            },
                                            "thumbnail": {
                                            "url": member.avatarURL()
                                            },
                                            "footer": {
                                                "text": "⇢ Zetrox von Folizza Studios",
                                                "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                                            }
                                        }
                                    ]
                                })
                            }
                        }
                        // console.log(member.user.username + " wurde eingeladen von " + invite.inviter.username)
                        Deno.writeTextFileSync("./databases/invites/invites.json", JSON.stringify(invitedb))
                    }
                }
                // @ts-ignore
                client.oinvites[invite.code] = invite.uses
            }
        })
    }catch(err){
        
    }
}
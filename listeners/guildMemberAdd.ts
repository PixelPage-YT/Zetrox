import * as harmony from "https://code.harmony.rocks/main"

export async function guildMemberAdd(member:harmony.Member){
    try{
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
                        const invChanneldb = JSON.parse(Deno.readTextFileSync("./databases/invites/inviteChannels.json"))
                        if(invChanneldb[member.guild.id]){
                            let channel = await member.guild.channels.get(invChanneldb[member.guild.id])
                            if(channel == undefined){
                                let channel = await member.guild.channels.resolve(invChanneldb[member.guild.id])
                            }
                            if(channel != undefined && channel.isText()){
                                channel.send({
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
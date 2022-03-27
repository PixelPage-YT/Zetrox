import * as harmony from "https://code.harmony.rocks/main"
import {noPerms} from "../util/noPerms.ts"
import {gamepoints_member,invites_member,messages_member} from "../util/types.ts"
async function lbMessages(i:harmony.Interaction, client:harmony.Client) {
    try{
        if(i.isApplicationCommand()){
            let messagedb = JSON.parse(Deno.readTextFileSync("./databases/messages.json"));
            let content = "";
            let nocontent = "";
            let embed = new harmony.Embed({
                "title": "Leaderboard",
                "color": 15658734,
                "author": {
                    "name": "Nachrichten-Tracker",
                    "icon_url": "https://emoji.gg/assets/emoji/3646-imessageokay.png"
                },
                "footer": {
                    "text": "⇢ Zetrox von Folizza Studios",
                    "icon_url": "https://images-ext-2.discordapp.net/external/Bz1kDlXLtgMdIMxKgKx1i-8i-wXOSEKFY48ouCl1hPM/https/sph-download.neocities.org/share/GoDaddyStudioPage-0%25202.png"
                }
                });
            if(i.guild){
                let points: messages_member[];
                points = []
                if(!(messagedb[i.guild.id])){
                    messagedb[i.guild.id] = {}
                }
                let guild = messagedb[i.guild.id]
                for(let member1 of Object.entries(guild)){
                    // @ts-ignore
                    points.push({member:member1[0],count:member1[1].count})
                }
                let sorted = points.sort((a:messages_member, b:messages_member) => {
                    return b.count - a.count
                })
                let index = 0;
                for(let element of sorted){
                    if(index+1 == 10){
                        break;
                    }
                    let currentuser: harmony.User|undefined
                    currentuser = await client.users.get(element.member)
                    if(currentuser == undefined){
                        currentuser = await client.users.resolve(element.member)
                    }
                    if(currentuser != undefined && currentuser.bot != true){
                        if(index+1 == 1){
                            content+="🥇 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                        }else if(index+1 == 2){
                            content+="🥈 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                        }else if(index+1 == 3){
                            content+="🥉 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                        }else{
                            content += (index+1).toString() + " **" + currentuser.username + "** | " + element.count.toString() + "\n"
                        }
                        index++
                    }
                }
            }
            if(content == nocontent){
                content = "*Hier hat noch niemand eine Nachricht geschrieben...*"
            }
            embed.setDescription(content)
            await i.respond({
                embeds: [embed]
            })
        }
    }catch(err){
        noPerms(i);
    }
}

async function lbInvites(i:harmony.Interaction, client:harmony.Client) {
    try{
        let invitedb = JSON.parse(Deno.readTextFileSync("./databases/invites/invites.json"));
        let content = "";
        let nocontent = "";
        let embed = new harmony.Embed({
            "title": "Leaderboard",
            "color": 15658734,
            "author": {
                "name": "Invite-Tracker",
                "icon_url": "https://emoji.gg/assets/emoji/7236-invite-listen.png"
            },
            "footer": {
                "text": "⇢ Zetrox von Folizza Studios",
                "icon_url": "https://images-ext-2.discordapp.net/external/Bz1kDlXLtgMdIMxKgKx1i-8i-wXOSEKFY48ouCl1hPM/https/sph-download.neocities.org/share/GoDaddyStudioPage-0%25202.png"
            }
            });
        if(i.guild){
            let points: invites_member[];
            points = []
            if(!(invitedb[i.guild.id])){
                invitedb[i.guild.id] = {}
            }
            let guild = invitedb[i.guild.id]
            for(let member1 of Object.entries(guild)){
                // @ts-ignore
                points.push({member:member1[0],count:member1[1].count})
            }
            let sorted = points.sort((a:invites_member, b:invites_member) => {
                return b.count - a.count
            })
            for(let index in sorted){
                if(parseInt(index)+1 == 10){
                    break;
                }
                let element = sorted[index]
                let currentuser: harmony.User|undefined
                currentuser = await client.users.get(element.member)
                if(currentuser == undefined){
                    currentuser = await client.users.resolve(element.member)
                }
                if(currentuser != undefined && currentuser.bot != true){
                    if(parseInt(index)+1 == 1){
                        content+="🥇 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                    }else if(parseInt(index)+1 == 2){
                        content+="🥈 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                    }else if(parseInt(index)+1 == 3){
                        content+="🥉 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                    }else{
                        content += (parseInt(index)+1).toString() + " **" + currentuser.username + "** | " + element.count.toString() + "\n"
                    }
                }
            }
        }
        if(content == nocontent){
            content = "*Hier hat noch niemand jemanden eingeladen...*"
        }
        embed.setDescription(content)
        await i.respond({
            embeds: [embed]
        })
    }catch(err){
        noPerms(i);
    }
}
async function lbGamepoints(i:harmony.Interaction, client:harmony.Client) {
    try{
        let invitedb = JSON.parse(Deno.readTextFileSync("./databases/gamePoints.json"));
        let content = "";
        let nocontent = "";
        let embed = new harmony.Embed({
            "title": "Leaderboard",
            "color": 15658734,
            "author": {
                "name": "GamePoints",
                "icon_url": "https://emoji.gg/assets/emoji/7236-invite-listen.png"
            },
            "footer": {
                "text": "⇢ Zetrox von Folizza Studios",
                "icon_url": "https://images-ext-2.discordapp.net/external/Bz1kDlXLtgMdIMxKgKx1i-8i-wXOSEKFY48ouCl1hPM/https/sph-download.neocities.org/share/GoDaddyStudioPage-0%25202.png"
            }
        });
        if(i.guild){
            let points: gamepoints_member[];
            points = []
            if(!(invitedb[i.guild.id])){
                invitedb[i.guild.id] = {}
            }
            let guild = invitedb[i.guild.id]
            for(let member1 of Object.entries(guild)){
                // @ts-ignore
                points.push({member:member1[0],count:member1[1].count})
            }
            let sorted = points.sort((a:gamepoints_member, b:gamepoints_member) => {
                return b.count - a.count
            })
            for(let index in sorted){
                if(parseInt(index)+1 == 10){
                    break;
                }
                let element = sorted[index]
                let currentuser: harmony.User|undefined
                currentuser = await client.users.get(element.member)
                if(currentuser == undefined){
                    currentuser = await client.users.resolve(element.member)
                }
                if(currentuser != undefined && currentuser.bot != true){
                    if(parseInt(index)+1 == 1){
                        content+="🥇 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                    }else if(parseInt(index)+1 == 2){
                        content+="🥈 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                    }else if(parseInt(index)+1 == 3){
                        content+="🥉 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                    }else{
                        content += (parseInt(index)+1).toString() + " **" + currentuser.username + "** | " + element.count.toString() + "\n"
                    }
                }
            }
        }
        if(content == nocontent){
            content = "*Hier hat noch niemand einen GamePoint...*"
        }
        embed.setDescription(content)
        await i.respond({
            embeds: [embed]
        })
    }catch(err){
        noPerms(i);
    }
}

export async function leaderboard(i:harmony.Interaction,client:harmony.Client){
    try{
        if(i.isApplicationCommand()){
            if(i.option<string>("type")){
                let type = i.option<string>("type");
                if(type == "lbmsgs"){
                    lbMessages(i,client)
                }
                if(type == "lbinvs"){
                    lbInvites(i,client)
                }
                if(type == "lbgps"){
                    lbGamepoints(i,client)
                }
            }
        }
    }catch(err){
        noPerms(i)
    }
}
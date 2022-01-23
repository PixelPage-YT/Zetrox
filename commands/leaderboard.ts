import * as harmony from "https://code.harmony.rocks/main"

export async function leaderboard(i:harmony.Interaction, client:harmony.Client) {
    if(i.isApplicationCommand()){
        if(i.option<string>("type") == "messages"){
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
                let points: {member:string,count:number}[];
                points = []
                if(!(messagedb[i.guild.id])){
                    messagedb[i.guild.id] = {}
                }
                let guild = messagedb[i.guild.id]
                for(let member1 of Object.entries(guild)){
                    // @ts-ignore
                    points.push({member:member1[0],count:member1[1].count})
                }
                let sorted = points.sort((a:{member:string,count:number}, b:{member:string,count:number}) => {
                    return b.count - a.count
                })
                for(let index in sorted){
                    let element = sorted[index]
                    let currentuser: harmony.User|undefined
                    currentuser = await i.client.users.get(element.member)
                    if(currentuser == undefined){
                        currentuser = await i.client.users.resolve(element.member)
                    }
                    if(currentuser != undefined){
                        if(parseInt(index)+1 == 1){
                            content+="🥇 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                        }else if(parseInt(index)+1 == 2){
                            content+="🥈 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                        }else if(parseInt(index)+1 == 3){
                            content+="🥉 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                        }else{
                            content += (parseInt(index)+1).toString() + " **" + currentuser.username + "** | " + element.count.toString() + "\n"
                        }
                    }else{
                        content += (parseInt(index)+1) + " Invalid-User" + " | " + element.count.toString() + "\n"
                    }
                }
            }
            if(content == nocontent){
                content = "*Hier hat noch niemand eine Nachricht geschrieben...*"
            }
            embed.setDescription(content)
            i.respond({
                embeds: [embed]
            })
        
        }else if(i.option<string>("type") == "invites"){
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
                let points: {member:string,count:number}[];
                points = []
                if(!(invitedb[i.guild.id])){
                    invitedb[i.guild.id] = {}
                }
                let guild = invitedb[i.guild.id]
                for(let member1 of Object.entries(guild)){
                    // @ts-ignore
                    points.push({member:member1[0],count:member1[1].count})
                }
                let sorted = points.sort((a:{member:string,count:number}, b:{member:string,count:number}) => {
                    return b.count - a.count
                })
                for(let index in sorted){
                    let element = sorted[index]
                    let currentuser: harmony.User|undefined
                    currentuser = await i.client.users.get(element.member)
                    if(currentuser == undefined){
                        currentuser = await i.client.users.resolve(element.member)
                    }
                    if(currentuser != undefined){
                        if(parseInt(index)+1 == 1){
                            content+="🥇 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                        }else if(parseInt(index)+1 == 2){
                            content+="🥈 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                        }else if(parseInt(index)+1 == 3){
                            content+="🥉 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                        }else{
                            content += (parseInt(index)+1).toString() + " **" + currentuser.username + "** | " + element.count.toString() + "\n"
                        }
                    }else{
                        content += (parseInt(index)+1) + " Invalid-User" + " | " + element.count.toString() + "\n"
                    }
                }
            }
            if(content == nocontent){
                content = "*Hier hat noch niemand jemanden eingeladen...*"
            }
            embed.setDescription(content)
            i.respond({
                embeds: [embed]
            })
        }else{
            i.respond({
                content:":x: Bitte gebe an, über was ein Leaderboard angezeigt werden soll (invites|messages) :x:",
                ephemeral: true
                
            })
        }
    }
}
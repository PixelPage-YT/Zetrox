import * as harmony from "https://code.harmony.rocks/main"
import {database ,saveDatabase} from "../util/database.ts"

export async function updateStats(client:harmony.Client){
    try{
        let db = database("stats.json").data
        for(let stat of db){
            let guild = await client.guilds.get(stat.guild)
            if(guild == undefined){
                guild = await client.guilds.resolve(stat.guild)
            }
            if(guild != undefined){
                let channel = await guild.channels.get(stat.channel)
                if(channel == undefined){
                    channel = await guild.channels.resolve(stat.channel)
                }
                if(channel != undefined && channel.isText()){
                    let message = await channel.messages.get(stat.msg)
                    if(message == undefined){
                        message = await channel.messages.resolve(stat.msg)
                    }
                    if(message != undefined){
                        if(stat.type == "minecraft"){
                            try{
                                let data = await (await fetch("https://api.mcsrvstat.us/2/" + stat.ip)).json()
                                let motd:string = ""
                                if(data.motd.raw[0]){
                                    motd += data.motd.raw[0]
                                }
                                if(data.motd.raw[1]){
                                    motd += data.motd.raw[1]
                                }
                                let embed = new harmony.Embed({
                                    "title": stat.ip,
                                    "color": 44469,
                                    "fields": [
                                        {
                                            "name": "Nachricht des Tages (MOTD)",
                                            "value": motd,
                                            "inline": true
                                        },
                                        {
                                            "name": "Spieleranzahl",
                                            "value": data.players.online + "/" + data.players.max,
                                            "inline": true
                                        },
                                        {
                                            "name": "Minecraft Versionen",
                                            "value": data.version,
                                            "inline": true
                                        }
                                    ],
                                    "footer": {
                                        "text": "⇢ Zetrox von Folizza Studios",
                                        "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                                    },
                                    "thumbnail": {
                                        "url": "https://emoji.gg/assets/emoji/1532-iron.png"
                                    }
                                })
                                if(data.hostname){
                                    embed.addField({
                                        "name": "Hostname",
                                        "value": data.hostname,
                                        "inline": true
                                    },)
                                }
                                message.edit({
                                    embeds: [embed]
                                })
                            }catch(err){
                                console.log(err)
                            }
                        }else if (stat.type == "server"){
                            // invites
                            let invitecontent:string = ""
                            let invitedb = JSON.parse(Deno.readTextFileSync("./databases/invites/invites.json"));
                            let points: {member:string,count:number}[];
                            points = []
                            if(!(invitedb[guild.id])){
                                invitedb[guild.id] = {}
                            }
                            let guilddb = invitedb[guild.id]
                            for(let member1 of Object.entries(guilddb)){
                                // @ts-ignore
                                points.push({member:member1[0],count:member1[1].count})
                            }
                            let sorted = points.sort((a:{member:string,count:number}, b:{member:string,count:number}) => {
                                return b.count - a.count
                            })
                            for(let index in sorted){
                                if(parseInt(index)+1 == 4){
                                    break;
                                }
                                let element = sorted[index]
                                let currentuser: harmony.User|undefined
                                currentuser = await client.users.get(element.member)
                                if(currentuser == undefined){
                                    currentuser = await client.users.resolve(element.member)
                                }
                                if(currentuser != undefined && currentuser.username.indexOf("Zetrox") == -1){
                                    if(parseInt(index)+1 == 1){
                                        invitecontent+="🥇 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                                    }else if(parseInt(index)+1 == 2){
                                        invitecontent+="🥈 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                                    }else if(parseInt(index)+1 == 3){
                                        invitecontent+="🥉 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                                    }
                                }
                            }
                            if(invitecontent == ""){
                                invitecontent = "*Hier hat noch niemand jemanden eingeladen...*"
                            }
                            // messages
                            let messagecontent:string = ""
                            let messagedb = JSON.parse(Deno.readTextFileSync("./databases/messages.json"));
                            points = []
                            if(!(messagedb[guild.id])){
                                messagedb[guild.id] = {}
                            }
                            guilddb = messagedb[guild.id]
                            for(let member1 of Object.entries(guilddb)){
                                // @ts-ignore
                                points.push({member:member1[0],count:member1[1].count})
                            }
                            sorted = points.sort((a:{member:string,count:number}, b:{member:string,count:number}) => {
                                return b.count - a.count
                            })
                            for(let index in sorted){
                                if(parseInt(index)+1 == 4){
                                    break;
                                }
                                let element = sorted[index]
                                let currentuser: harmony.User|undefined
                                currentuser = await client.users.get(element.member)
                                if(currentuser == undefined){
                                    currentuser = await client.users.resolve(element.member)
                                }
                                if(currentuser != undefined && currentuser.username.indexOf("Zetrox") == -1){
                                    if(parseInt(index)+1 == 1){
                                        messagecontent+="🥇 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                                    }else if(parseInt(index)+1 == 2){
                                        messagecontent+="🥈 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                                    }else if(parseInt(index)+1 == 3){
                                        messagecontent+="🥉 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                                    }
                                }
                            }
                            if(messagecontent == ""){
                                messagecontent = "*Hier hat noch niemand jemanden eingeladen...*"
                            }
                            // gamepoints
                            let gamePointdb = JSON.parse(Deno.readTextFileSync("./databases/gamePoints.json"));
                            let gamePointcontent = "";
                            let nocontent = "";
                            points = []
                            if(!(invitedb[guild.id])){
                                invitedb[guild.id] = {}
                            }
                            guilddb = invitedb[guild.id]
                            for(let member1 of Object.entries(guilddb)){
                                // @ts-ignore
                                points.push({member:member1[0],count:member1[1].count})
                            }
                            sorted = points.sort((a:{member:string,count:number}, b:{member:string,count:number}) => {
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
                                if(currentuser != undefined && currentuser.username.indexOf("Zetrox") == -1){
                                    if(parseInt(index)+1 == 1){
                                        gamePointcontent+="🥇 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                                    }else if(parseInt(index)+1 == 2){
                                        gamePointcontent+="🥈 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                                    }else if(parseInt(index)+1 == 3){
                                        gamePointcontent+="🥉 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                                    }
                                }
                            }
                            if(gamePointcontent == nocontent){
                                gamePointcontent = "*Hier hat noch niemand einen GamePoint...*"
                            }
                            let embed = new harmony.Embed({
                                "title": guild.name,
                                "description": guild.description,
                                "color": 44469,
                                "fields": [
                                    {
                                        "name": "Top 3 - Nachrichten",
                                        "value": messagecontent,
                                        "inline": true
                                    },
                                    {
                                        "name": "Top 3 - Einladungen",
                                        "value": invitecontent,
                                        "inline": true
                                    },
                                    {
                                        "name": "Top 3 - SpielPunkte",
                                        "value": gamePointcontent,
                                        "inline": true
                                    },
                                ],
                                "footer": {
                                "text": "⇢ Zetrox von Folizza Studios",
                                "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                                },
                                "thumbnail": {
                                    "url": guild.iconURL()
                                }
                            })
                            if(guild.memberCount){
                                embed.addField({
                                    "name": "MitgliederAnzahl",
                                    "value": guild.memberCount?.toString(),
                                    "inline": true
                                })
                            }
                            if(guild.snowflake.timestamp){
                                let date = new Date(guild.snowflake.timestamp)
                                embed.addField({
                                    "name": "Server erstellt",
                                    "value": `<t:${Math.floor(date.getTime() / 1000)}:R> (${date.toLocaleDateString("de-DE")} ${date.toLocaleTimeString("de-DE")})`,
                                    "inline": true
                                })
                            }
                            message.edit({embeds:[embed]})
                        }
                    }else{
                        let db2 = database("stats.json")
                        // @ts-ignore
                        db2.data.splice(db2.data.findIndex(index => index === stat))
                        saveDatabase("stats.json",db2)
                    }
                }
            }
        }
    }catch(err){
    }
}
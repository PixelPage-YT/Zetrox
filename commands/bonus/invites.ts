import * as harmony from "https://code.harmony.rocks/main"
import {isAuthorized} from "../../util/isAuthorized.ts"

export async function bonusAddInvites(i:harmony.Interaction,client:harmony.Client) {
    if(i.member){
        if(!(await isAuthorized(i.member))){
            i.respond({
                content: ":x: Du hast dazu keine Rechte! :x:",
                ephemeral: true
            })
            return
        }

        if(i.isApplicationCommand() && i.guild){
            if(i.option<string>("anzahl") != undefined){
                let anzahl = parseInt(i.option<string>("anzahl"))
                if(anzahl < 10000 && anzahl > 0){
                    let member:harmony.Member = i.member
                    if(i.option<harmony.User>("user") != undefined){
                        let member1 = await i.guild.members.get(i.option<harmony.User>("user").id)
                        if(member1 == undefined){
                            member1 = await i.guild.members.resolve(i.option<harmony.User>("user").id)
                        }
                        if(member1 != undefined){
                            member = member1
                        }
                    }
                    let messagedb = JSON.parse(Deno.readTextFileSync("./databases/invites/invites.json"));
                    if(!(messagedb[i.guild.id])){
                        messagedb[i.guild.id] = {}
                    }
                    if(!(messagedb[i.guild.id][member.id])){
                        messagedb[i.guild.id][member.id] = {count:0,invited:[],leaves:0}
                    }
                    messagedb[i.guild.id][member.id].count += anzahl
                    Deno.writeTextFileSync("./databases/invites/invites.json", JSON.stringify(messagedb))
                    i.respond({embeds: [{
                        "title": ":white_check_mark: Erfolgreich! :white_check_mark:",
                        "description": `Du hast ${member.user.username} **${anzahl}** Einladungen hinzugefügt.`,
                        "color": 15658734,
                        "author": {
                            "name": "Einladungs-Tracker",
                            "icon_url": "https://emoji.gg/assets/emoji/3646-imessageokay.png"
                        },
                        "footer": {
                        "text": "⇢ Zetrox von Folizza Studios",
                        "icon_url": "https://images-ext-2.discordapp.net/external/Bz1kDlXLtgMdIMxKgKx1i-8i-wXOSEKFY48ouCl1hPM/https/sph-download.neocities.org/share/GoDaddyStudioPage-0%25202.png"
                        }
                    }]})
                }else{
                    i.respond({
                        content: ":x: Du kannst jemandem maximal 10000 Einladungen und minimal 1 hinzufügen! :x:",
                        ephemeral: true
                    })
                }
            }
        }
    }
}

export async function bonusRemoveInvites(i:harmony.Interaction,client:harmony.Client) {
    if(i.member){
        if(!(await isAuthorized(i.member))){
            i.respond({
                content: ":x: Du hast dazu keine Rechte! :x:",
                ephemeral: true
            })
            return
        }

        if(i.isApplicationCommand() && i.guild){
            if(i.option<string>("anzahl") != undefined){
                let anzahl = parseInt(i.option<string>("anzahl"))
                if(anzahl < 10000 && anzahl > 0){
                    let member:harmony.Member = i.member
                    if(i.option<harmony.User>("user") != undefined){
                        let member1 = await i.guild.members.get(i.option<harmony.User>("user").id)
                        if(member1 == undefined){
                            member1 = await i.guild.members.resolve(i.option<harmony.User>("user").id)
                        }
                        if(member1 != undefined){
                            member = member1
                        }
                    }
                    let messagedb = JSON.parse(Deno.readTextFileSync("./databases/invites/invites.json"));
                    if(!(messagedb[i.guild.id])){
                        messagedb[i.guild.id] = {}
                    }
                    if(!(messagedb[i.guild.id][member.id])){
                        messagedb[i.guild.id][member.id] = {count:0,invited:[],leaves:0}
                    }
                    messagedb[i.guild.id][member.id].count -= anzahl
                    Deno.writeTextFileSync("./databases/invites/invites.json", JSON.stringify(messagedb))
                    i.respond({embeds: [{
                        "title": ":white_check_mark: Erfolgreich! :white_check_mark:",
                        "description": `Du hast ${member.user.username} **${anzahl}** Einladungen entfernt.`,
                        "color": 15658734,
                        "author": {
                            "name": "Einladungs-Tracker",
                            "icon_url": "https://emoji.gg/assets/emoji/3646-imessageokay.png"
                        },
                        "footer": {
                        "text": "⇢ Zetrox von Folizza Studios",
                        "icon_url": "https://images-ext-2.discordapp.net/external/Bz1kDlXLtgMdIMxKgKx1i-8i-wXOSEKFY48ouCl1hPM/https/sph-download.neocities.org/share/GoDaddyStudioPage-0%25202.png"
                        }
                    }]})
                }else{
                    i.respond({
                        content: ":x: Du kannst jemandem maximal 10000 Einladungen und minimal 1 hinzufügen! :x:",
                        ephemeral: true
                    })
                }
            }
        }
    }
}
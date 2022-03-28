import * as harmony from "https://code.harmony.rocks/main"
import {noPerms} from "../util/noPerms.ts"
export async function messages(i:harmony.Interaction, client:harmony.Client){
    try{
        if(i.isApplicationCommand()){
            let member:harmony.Member|undefined;
            if(i.option<string>("user") != undefined){
                if(i.guild){
                    member = await i.guild.members.get(i.option<harmony.User>("user").id)
                    if(member == undefined){
                        member = await i.guild.members.resolve(i.option<harmony.User>("user").id)
                    }
                }
            }else{
                member = i.member;
            }
            if(member){
                let messagecount:number = 0
                let messagedb = JSON.parse(Deno.readTextFileSync("./databases/messages.json"));
                if(i.guild){
                    if(messagedb[i.guild.id]){
                        if(messagedb[i.guild.id][member.id]){
                            messagecount = messagedb[i.guild.id][member.id].count
                        }
                    }
                    await i.respond({
                        embeds: [{
                            "title": member.user.username,
                            "description": `Dieser Benutzer hat ${messagecount} \nNachrichten gesendet.`,
                            "color": 15658734,
                            "author": {
                                "name": "Nachrichten-Tracker",
                                "icon_url": "https://emoji.gg/assets/emoji/3646-imessageokay.png"
                            },
                            "footer": {
                            "text": "⇢ Zetrox von Folizza Studios",
                            "icon_url": "https://images-ext-2.discordapp.net/external/Bz1kDlXLtgMdIMxKgKx1i-8i-wXOSEKFY48ouCl1hPM/https/sph-download.neocities.org/share/GoDaddyStudioPage-0%25202.png"
                            }
                        }]
                    })
                }
            }
        }
    }catch(err){
        noPerms(i,err);
    }
}
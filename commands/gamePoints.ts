import * as harmony from "https://code.harmony.rocks/main"
import {getGamePoints} from "./bonus/gamepoints.ts"
import {noPerms} from "../util/noPerms.ts"
export async function gamePoints(i:harmony.Interaction, client:harmony.Client){
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
                if(i.guild){
                    if(i.member) {
                        let messagecount = getGamePoints(member)
                        i.respond({
                            embeds: [{
                                "title": member.user.username,
                                "description": `Dieser Benutzer hat ${messagecount} GamePoints <:ZetroCoin:935256569984208917>.`,
                                "color": 15658734,
                                "author": {
                                    "name": "GamePoints",
                                    "icon_url": "https://emoji.gg/assets/emoji/9172-game.png"
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
        }
    }catch(err){
        noPerms(i);
    }
}
import * as harmony from "https://code.harmony.rocks/main/mod.ts"
import {database ,saveDatabase} from "../util/database.ts"
import {isAuthorized} from "../util/isAuthorized.ts"
import {noPerms} from "../util/noPerms.ts"
export async function gwTeilnehmen(i:harmony.Interaction,client:harmony.Client){
    try{
        if(i.member && i.guild && i.message){
            let giveawaydb:{giveaways:{reqs:{type:string,value:string|number}[]|undefined,start:number|undefined,msgid:string,users:string[],bypass:undefined|{type:string,value:string}}[]} = database("giveaways.json")
            let index = 0
            let isthere = 0
            for(let giveaway of giveawaydb.giveaways){
                if(giveaway.msgid == i.message.id){
                    if(i.member != undefined){
                        if((giveaway.start && giveaway.start < Date.now()) || (giveaway.start == undefined)){
                            let member = i.member
                            if(giveaway.users.findIndex((user: string) => user === member.id) == -1){
                                let check:boolean = false;
                                if(giveaway.reqs){
                                    let reqs:{type:string,value:string|number}[] = giveaway.reqs
                                    let index = 0;
                                    let fills = 0;
                                    for(let req of reqs){
                                        if(req.type == "messages" && typeof req.value == "number"){
                                            let messagedb = database("messages.json")
                                            if(messagedb[i.guild.id]){
                                                if(messagedb[i.guild.id][i.member.id]){
                                                    if(messagedb[i.guild.id][i.member.id].count > (req.value - 1)){
                                                        fills++
                                                    }
                                                }
                                            }
                                        }
                                        if(req.type == "invites"){
                                            let messagedb = database("invites.json")
                                            if(messagedb[i.guild.id]){
                                                if(messagedb[i.guild.id][i.member.id]){
                                                    if(messagedb[i.guild.id][i.member.id].count >= req.value){
                                                        fills++
                                                    }
                                                }
                                            }
                                        }
                                        if(req.type == "gamepoints"){
                                            let messagedb = database("gamePoints.json")
                                            if(messagedb[i.guild.id]){
                                                if(messagedb[i.guild.id][i.member.id]){
                                                    if(messagedb[i.guild.id][i.member.id].count >= req.value){
                                                        fills++
                                                    }
                                                }
                                            }
                                        }
                                        if(req.type == "role"){
                                            if((await i.member.roles.array()).findIndex(index => index.id === req.value) != -1){
                                                fills++
                                            }
                                        }
                                        if(req.type == "other"){
                                            fills++
                                        }
                                        index++
                                    }
                                    if(fills == reqs.length){
                                        check = true
                                    }
                                }else{
                                    check = true;
                                }
                                if(check == false){
                                    if(giveaway.bypass){
                                        if(giveaway.bypass.type == "role"){
                                            if((await i.member.roles.array()).findIndex(index => index.id === giveaway.bypass?.value) != -1){
                                                check = true
                                            }
                                        }
                                    }
                                }
                                if(check == true){
                                    giveawaydb.giveaways[index].users.push(i.member.id)
                                    saveDatabase("giveaways.json",giveawaydb)
                                    let controls: harmony.MessageComponentData[] = [
                                        {
                                            type: harmony.MessageComponentType.ACTION_ROW,
                                            components: [
                                                {
                                                    type: harmony.MessageComponentType.BUTTON,
                                                    style: harmony.ButtonStyle.BLURPLE,
                                                    customID: 'gw-teilnehmen',
                                                    label: "(" + giveaway.users.length.toString() + ") Teilnehmen",
                                                    emoji: {name:"🎁"}
                                                }
                                            ]
                                        },
                                    ]
                                    await i.message.edit({components:controls})
                                    await i.respond({
                                        content:"✅ Du hast erfolgreich teilgenommen! ✅",
                                        ephemeral: true
                                    })
                                }else{
                                    await i.respond({ephemeral:true,content:"<:icons_Wrong:947468536492752906> **Du erfüllst die Anforderungen nicht!** <:icons_Wrong:947468536492752906>"})
                                    return
                                }
                            }else{
                                let index5 = 0;
                                for(let user of giveaway.users){
                                    if(user == i.user.id){
                                        giveawaydb.giveaways[index].users.splice(index5)
                                    }
                                    index5++
                                }
                                saveDatabase("giveaways.json", giveawaydb)
                                let controls: harmony.MessageComponentData[] = [
                                    {
                                        type: harmony.MessageComponentType.ACTION_ROW,
                                        components: [
                                            {
                                                type: harmony.MessageComponentType.BUTTON,
                                                style: harmony.ButtonStyle.BLURPLE,
                                                customID: 'gw-teilnehmen',
                                                label: "(" + giveaway.users.length.toString() + ") Teilnehmen",
                                                emoji: {name:"🎁"}
                                            }
                                        ]
                                    },
                                ]
                                await i.message.edit({components:controls})
                                await i.respond({
                                    content:"✅ Du hast dich erfolgreich ausgetragen! ✅",
                                    ephemeral: true
                                })
                                return
                            }
                        }else{
                            await i.respond({
                                content:"⛔️ Die Verlosung hat noch nicht gestartet! ⛔️",
                                ephemeral: true
                            })
                        }
                    }
                }
                isthere = 1
                index++
            }
            if(isthere == 0){
                await i.respond({
                    content:"⛔️ Diese Verlosung existiert nicht! ⛔️",
                    ephemeral: true
                })
            }
        }
    }catch(err){
        noPerms(i);
    }
}
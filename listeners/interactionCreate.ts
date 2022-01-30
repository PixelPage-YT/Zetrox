import * as harmony from "https://code.harmony.rocks/main"
import {database ,saveDatabase} from "../util/database.ts"

export async function interactionCreate(i:harmony.Interaction,client:harmony.Client) {
    if(i.isMessageComponent()){
        if(i.customID == "gw-teilnehmen"){
            if(i.member && i.guild){
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
                                        i.message.edit({components:controls})
                                        i.respond({
                                            content:"✅ Du hast erfolgreich teilgenommen! ✅",
                                            ephemeral: true
                                        })
                                    }else{
                                        i.respond({
                                            content:"⛔️  Du erfüllst die Bedingungen nicht! ⛔️",
                                            ephemeral: true
                                        })
                                    }
                                }else{
                                    i.respond({
                                        content:"⛔️ Du hast bereits teilgenommen! ⛔️",
                                        ephemeral: true
                                    })
                                }
                            }else{
                                i.respond({
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
                    i.respond({
                        content:"⛔️ Diese Verlosung existiert nicht! ⛔️",
                        ephemeral: true
                    })
                }
            }
        }else if (i.customID == "gw-openweb" && i.member){
            let webdb:{data:{msgid:string,users:string[]}[]} = database("rweb.json")
            let check:boolean = false
            for(let web of webdb.data){
                if(web.msgid == i.message.id){
                    check = true
                }
            }
            if(check == false){
                webdb.data.push({msgid:i.message.id,users:[]})
            }
            for(let web of webdb.data){
                if(web.msgid == i.message.id){
                    web.users.push(i.member.id)
                }
            }
        }
    }
}
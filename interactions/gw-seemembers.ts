import * as harmony from "https://code.harmony.rocks/main/mod.ts"
import {database ,saveDatabase} from "../util/database.ts"
import {isAuthorized} from "../util/isAuthorized.ts"
import {noPerms} from "../util/noPerms.ts"
export async function gwSeeMembers(i:harmony.Interaction,client:harmony.Client){
    try{
        if(i.isApplicationCommand() && i.targetMessage){
            let gwdb:{giveaways: {claimmsg:string|undefined,msgid:string,winners:string[],channel:string,end:number,winnercount:number,users:string[],preis:string,ended:boolean|undefined}[]} = JSON.parse(Deno.readTextFileSync("./databases/giveaways.json"))
            let index = 0;
            let check = false;
            for(let gw of gwdb.giveaways){
                if(gw.msgid == i.targetMessage.id){
                    let content = ""
                    for (let user of gw.users){
                        let user1 = await client.users.get(user)
                        if(user1 == undefined){
                            user1 = await client.users.resolve(user)
                        }
                        if(user1 != undefined){
                            content += "\n<:RL_dotblue:929474180817252372> " + user1.username
                        }
                    }
                    if(content == ""){
                        content = "*Keine Teilnehmer*"
                    }
                    await i.respond({ephemeral:true,content:content})
                    check = true
                }
                index++
            }
            if(check == false){
                await i.respond({content:"<:icons_Wrong:947468536492752906> Dies ist keine Verlosung oder alle Gewinner stehen schon fest! <:icons_Wrong:947468536492752906>",ephemeral:true})
                return
            }
        }
    }catch(err){
        noPerms(i);
    }
}
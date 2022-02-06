import * as harmony from "https://code.harmony.rocks/main"
import {database ,saveDatabase} from "../util/database.ts"
import {isAuthorized} from "../util/isAuthorized.ts"
import {noPerms} from "../util/noPerms.ts"
export async function gwSeeMembers(i:harmony.Interaction,client:harmony.Client){
    try{
        if(i.isApplicationCommand() && i.targetMessage){
            if(!await isAuthorized(i.member)){
                i.respond({content:":x: Du hast dazu keine Rechte! :x:",ephemeral:true})
                return
            }
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
                    i.respond({ephemeral:true,content:content})
                    check = true
                }
                index++
            }
            if(check == false){
                i.respond({content:":x: Dies ist keine Verlosung oder alle Gewinner stehen schon fest! :x:",ephemeral:true})
                return
            }
        }
    }catch(err){
        noPerms(i);
    }
}
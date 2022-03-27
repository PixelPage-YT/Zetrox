import * as harmony from "https://code.harmony.rocks/main"
import {database ,saveDatabase} from "../util/database.ts"
import {isAuthorized} from "../util/isAuthorized.ts"
import {noPerms} from "../util/noPerms.ts"
import {giveaway_database} from "../util/types.ts"
export async function gwEnd(i:harmony.Interaction,client:harmony.Client){
    try{
        if(i.isApplicationCommand() && i.name == "Enden lassen" && i.targetMessage){
            if(!await isAuthorized(i.member)){
                await i.respond({content:"<:icons_Wrong:947468536492752906> Du hast dazu keine Rechte! <:icons_Wrong:947468536492752906>",ephemeral:true})
                return
            }
            let gwdb:giveaway_database  = JSON.parse(Deno.readTextFileSync("./databases/giveaways.json"))
            let index = 0;
            let check = false;
            for(let gw of gwdb.giveaways){
                
                if(gw.msgid == i.targetMessage.id){
                    check = true
                    if(gw.ended == false||gw.ended == undefined){
                        gw.end = Date.now() 
                        saveDatabase("giveaways.json",gwdb)
                        await i.respond({content:"<:icons_Correct:947467655630164038> Die Verlosung wird beendet... <:icons_Correct:947467655630164038>",ephemeral:true})
                    }else{
                        await i.respond({content:"<:icons_Wrong:947468536492752906> Diese Verlosung ist bereits zu Ende. Bitte benutze 'Rerollen'! <:icons_Wrong:947468536492752906>",ephemeral:true})
                        return
                    }
                }
                index++
            }
            if(check == false){
                await i.respond({content:"<:icons_Wrong:947468536492752906> Dies ist keine Verlosung oder alle Gewinner stehen schon fest! <:icons_Wrong:947468536492752906>",ephemeral:true})
            }
        }
    }catch(err){
        noPerms(i);
    }
}

function randomChoice(arr:any) {
    return arr[Math.floor(Math.random() * arr.length)];
}
import * as harmony from "https://code.harmony.rocks/main"
import {database ,saveDatabase} from "../util/database.ts"
import {isAuthorized} from "../util/isAuthorized.ts"
import {noPerms} from "../util/noPerms.ts"
export async function gwEnd(i:harmony.Interaction,client:harmony.Client){
    try{
        if(i.isApplicationCommand() && i.name == "Enden lassen" && i.targetMessage){
            if(!await isAuthorized(i.member)){
                i.respond({content:":x: Du hast dazu keine Rechte! :x:",ephemeral:true})
                return
            }
            let gwdb:{giveaways: {claimmsg:string|undefined,msgid:string,winners:string[],channel:string,end:number,winnercount:number,users:string[],preis:string,ended:boolean|undefined}[]} = JSON.parse(Deno.readTextFileSync("./databases/giveaways.json"))
            let index = 0;
            let check = false;
            for(let gw of gwdb.giveaways){
                
                if(gw.msgid == i.targetMessage.id){
                    check = true
                    if(gw.ended == false||gw.ended == undefined){
                        gw.end = Date.now() 
                        saveDatabase("giveaways.json",gwdb)
                        i.respond({content:":white_check_mark: Die Verlosung wird beendet... :white_check_mark:",ephemeral:true})
                    }else{
                        i.respond({content:":x: Diese Verlosung ist bereits zu Ende. Bitte benutze 'Rerollen'! :x:",ephemeral:true})
                        return
                    }
                }
                index++
            }
            if(check == false){
                i.respond({content:":x: Dies ist keine Verlosung oder alle Gewinner stehen schon fest! :x:",ephemeral:true})
            }
        }
    }catch(err){
        noPerms(i);
    }
}

function randomChoice(arr:any) {
    return arr[Math.floor(Math.random() * arr.length)];
}
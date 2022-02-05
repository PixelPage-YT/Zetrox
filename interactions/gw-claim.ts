import * as harmony from "https://code.harmony.rocks/main"
import {database ,saveDatabase} from "../util/database.ts"
import {isAuthorized} from "../util/isAuthorized.ts"
import {noPerms} from "../util/noPerms.ts"

export async function gwClaim(i:harmony.Interaction,client:harmony.Client){
    try{
        if(i.member && i.guild && i.message){
            let gwdb:{giveaways: {claimmsg:string|undefined,msgid:string,winners:string[],channel:string,end:number,winnercount:number,users:string[],preis:string,ended:boolean|undefined}[]} = JSON.parse(Deno.readTextFileSync("./databases/giveaways.json"))
            let index = 0;
            for(let gw of gwdb.giveaways){
                if(gw.claimmsg == i.message.id){
                    if(gw.winners.findIndex(index => index === i.member?.id) != -1){
                        i.respond({content:":white_check_mark: " + i.member?.user.mention + " hat seinen Preis geclaimt! :white_check_mark:"})
                        gwdb.giveaways[index].winners.splice(gwdb.giveaways[index].winners.findIndex(index => index === i.member?.id))
                        if(gwdb.giveaways[index].winners == []){
                            gwdb.giveaways.splice(index)
                        }
                        saveDatabase("giveaways.json",gwdb)
                    }else{
                        i.respond({content:":x: Du bist kein Gewinner dieser Verlosung oder hast deinen Preis schon geclaimt! :x:",ephemeral:true})
                    }
                }
                index++
            }
        }
    }catch(err){
        noPerms(i);
    }
}
import * as harmony from "https://code.harmony.rocks/main"
import {gwTeilnehmen} from "../interactions/gw-teilnehmen.ts"
import {gwClaim} from "../interactions/gw-claim.ts"
import {gwReroll} from "../interactions/gw-reroll.ts"
import {gwEnd} from "../interactions/gw-end.ts"
import {helpselect} from "../commands/help.ts"

export async function interactionCreate(i:harmony.Interaction,client:harmony.Client) {
    if(i.isMessageComponent()){
        if(i.customID == "gw-teilnehmen"){
            gwTeilnehmen(i,client);
        }else if(i.customID == "gw-claim" && i.member){
            gwClaim(i,client)
        }else if(i.customID == "help-select"){
            helpselect(i, client)
        }
    }
    if(i.isApplicationCommand() && i.targetMessage){
        gwReroll(i,client)
    }
    if(i.isApplicationCommand() && i.targetMessage){
        gwEnd(i,client)
    }
}
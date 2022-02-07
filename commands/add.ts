import * as harmony from "https://code.harmony.rocks/main"
import {noPerms} from "../util/noPerms.ts"

import{bonusAddMessages} from "./bonus/messages.ts"
import{bonusAddInvites} from "./bonus/invites.ts"
import{bonusAddGamePoints} from "./bonus/gamepoints.ts"
export async function add(i:harmony.Interaction,client:harmony.Client){
    try{
        if(i.isApplicationCommand()){
            if(i.option<string>("type")){
                let type = i.option<string>("type");
                if(type == "addmsgs"){
                    bonusAddMessages(i,client)
                }
                if(type == "addinvs"){
                    bonusAddInvites(i,client)
                }
                if(type == "addgps"){
                    bonusAddGamePoints(i,client)
                }
            }
        }
    }catch(err){
        noPerms(i)
    }
}
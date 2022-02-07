import{bonusRemoveMessages} from "./bonus/messages.ts"
import{bonusRemoveInvites} from "./bonus/invites.ts"
import{bonusRemoveGamePoints} from "./bonus/gamepoints.ts"

import * as harmony from "https://code.harmony.rocks/main"
import {noPerms} from "../util/noPerms.ts"
export async function remove(i:harmony.Interaction,client:harmony.Client){
    try{
        if(i.isApplicationCommand()){
            if(i.option<string>("type")){
                let type = i.option<string>("type");
                if(type == "removemsgs"){
                    bonusRemoveMessages(i,client)
                }
                if(type == "removeinvs"){
                    bonusRemoveInvites(i,client)
                }
                if(type == "removegps"){
                    bonusRemoveGamePoints(i,client)
                }
            }
        }
    }catch(err){
        noPerms(i)
    }
}
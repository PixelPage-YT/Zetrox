import * as harmony from "https://code.harmony.rocks/main"

export async function askInteraction(client:harmony.Client,i:harmony.Interaction, timeout:number, cids:string[]){
    let answerI1 = await client.waitFor("interactionCreate", (message) => {
        if(message.member && message.channel) {
            return message.member.id == i.member?.id && message.channel.id == i.channel?.id && message.isMessageComponent() && cids.findIndex(index => index === message.customID) != -1
        }
        return false
    }, timeout)
    let answerI: undefined | harmony.Interaction;
    if(answerI1[0]){
        answerI = answerI1[0]
    }
    if(answerI instanceof harmony.Interaction){
        return answerI
    }else{
        return undefined
    }
}
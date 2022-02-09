import * as harmony from "https://code.harmony.rocks/main"

export async function askMessage(client:harmony.Client,i:harmony.Interaction, timeout:number){
    let answer1 = await client.waitFor("messageCreate", (message) => {
        return message.author.id == i.member?.id && message.channel.id == i.channel?.id
    }, timeout)
    let answer: undefined | harmony.Message;
    if(answer1[0]){
        answer = answer1[0]
    }
    
    if(answer != undefined){
        return answer
    }else{
        return undefined
    }
}
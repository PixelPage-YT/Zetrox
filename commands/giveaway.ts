import * as harmony from "https://code.harmony.rocks/main/mod.ts"
import {isAuthorized} from "../util/isAuthorized.ts"
import {database,saveDatabase} from "../util/database.ts"
import {noPerms} from "../util/noPerms.ts"
export async function giveaway(i:harmony.Interaction,client:harmony.Client){
    try{
        let answertime = 60 * 1000;
        if(i.guild && i.member && i.channel && i.isApplicationCommand()){
            if(!(await isAuthorized(i.member))){
                await i.respond({
                    content: ":x: Du hast dazu keine Rechte! :x:",
                    ephemeral: true
                })
                return
            }
            let embed = new harmony.Embed({
                "title": ":tada: Verlosungs-Erstellung :tada:",
                "color": 44469,
                "footer": {
                    "text": "⇢ Zetrox von Folizza Studios",
                    "icon_url": "https://images-ext-2.discordapp.net/external/Bz1kDlXLtgMdIMxKgKx1i-8i-wXOSEKFY48ouCl1hPM/https/sph-download.neocities.org/share/GoDaddyStudioPage-0%25202.png"
                }
            })
            let msg = await i.respond({content:"**Was ist der Preis dieser Verlosung?**", embeds:[embed]})
            let answer1 = await client.waitFor("messageCreate", (message) => {
                return message.author.id == i.member?.id && message.channel.id == i.channel?.id
            }, answertime)
            let answer: harmony.Message | undefined;
            if(answer1[0]){
                answer = answer1[0]
            }

            if(answer != undefined){
                embed.addField({
                    "name": "Preis",
                    "value": answer.content,
                    "inline": true
                });
                let preis = answer.content
                answer.delete()
                msg.editResponse({embeds:[embed],content:"**Wie viele Gewinner wird es geben?**"})
                answer = undefined
                let answer1 = await client.waitFor("messageCreate", (message) => {
                    return message.author.id == i.member?.id && message.channel.id == i.channel?.id
                }, answertime)
                if(answer1[0]){
                    answer = answer1[0]
                }

                if(answer != undefined){
                    let gewinneranzahl:number|undefined
                    try{
                        gewinneranzahl = parseInt(answer.content)
                    }catch(err){
                        await i.channel.send({content:":x: Bitte gebe eine Zahl an! :x:"})
                        return
                    }
                    if(gewinneranzahl != undefined && gewinneranzahl > 0){
                        
                        embed.addField({
                            "name": "Gewinneranzahl",
                            "value": gewinneranzahl.toString(),
                            "inline": true
                        });
                        answer.delete()
                        msg.editResponse({embeds:[embed],content:"**Wann soll die Verlosung enden?**\n*Nutze <Tage>d<Stunden>h<Minuten>m<Sekunden>s*"})
                        answer = undefined
                        let answer1 = await client.waitFor("messageCreate", (message) => {
                            return message.author.id == i.member?.id && message.channel.id == i.channel?.id
                        }, answertime)
                        if(answer1[0]){
                            answer = answer1[0]
                        }
            
                        if(answer != undefined){
                            let ende:Date|undefined;
                            const match = answer.content.match(/((?<days1>\d+)d)?((?<hours1>\d+)h)?((?<minutes1>\d+)m)?((?<seconds1>\d+)s)?/);
                            if(match?.groups){
                                let days = 0;
                                let hours = 0;
                                let minutes = 0;
                                let seconds = 0;
                                let { days1, hours1, minutes1, seconds1 } = match.groups;
                                if(days1){
                                    days = parseInt(days1.replace("d",""))
                                }
                                if(hours1){
                                    hours = parseInt(hours1.replace("h",""))
                                }
                                if(minutes1){
                                    minutes = parseInt(minutes1.replace("m",""))
                                }
                                if(seconds1){
                                    seconds = parseInt(seconds1.replace("s",""))
                                }
                                if(days != NaN && days != undefined && hours != NaN && hours != undefined && minutes != NaN && minutes != undefined && seconds != NaN && seconds != undefined ){
                                    let sekunden:number = 0
                                    sekunden += days * 86400
                                    sekunden += hours * 3600
                                    sekunden += minutes * 60
                                    sekunden += seconds
                                    if(sekunden > 0 && sekunden < 1814400 && gewinneranzahl > 0){
                                        let millisekunden:number = sekunden * 1000
                                        ende = new Date(Date.now() + millisekunden)
                                    }else{
                                        await answer.channel.send({content:":x: Ein Gewinnspiel muss mindestens 1 Sekunde und maximal 3 Wochen lang sein! :x:"})
                                        return
                                    }
                                }else{
                                    await answer.channel.send({content:":x: Bitte gebe etwas gültiges ein! :x:"})
                                    return
                                }
                                if(ende != undefined && ende.getTime() > Date.now()){
                                    embed.addField({
                                        "name": "Ende",
                                        "value": `<t:${Math.floor(ende.getTime()/1000)}:R>`,
                                        "inline": true
                                    });
                                    answer.delete()
                                    const controls: harmony.MessageComponentData[] = [
                                        {
                                            type: harmony.MessageComponentType.ACTION_ROW,
                                            components: [
                                                {
                                                    type: harmony.MessageComponentType.SELECT,
                                                    customID: 'gw-reqs',
                                                    options: [{emoji:{name:"❌"},label:"Keine",value:"gw-req-no"},{emoji:{name:"💬"},label:"Nachrichten",value:"gw-req-msg"},{emoji:{name:"📩"},label:"Einladungen",value:"gw-req-inv"},{emoji:{name:"🎮"},label:"Spielpunkte",value:"gw-req-gpo"},{emoji:{name:"🎭"},label:"Rolle",value:"gw-req-role"},{emoji:{name:"➕"},label:"Sonstiges",value:"gw-req-other"}],
                                                    maxValues:5
                                                }
                                            ]
                                        },
                                    ]
                                    msg.editResponse({embeds:[embed],content:"**Welche Bedinguen soll es geben?**",components:controls})
                                    answer = undefined
                                    let answerI1 = await client.waitFor("interactionCreate", (message) => {
                                        if(message.member && message.channel) {
                                            return message.member.id == i.member?.id && message.channel.id == i.channel?.id
                                        }
                                        return false
                                    }, answertime)
                                    let answerI = undefined
                                    if(answerI1[0]){
                                        answerI = answerI1[0]
                                    }
                                    let reqs: {type:string,value:string|number}[] = []
                                    if(answerI instanceof harmony.Interaction){
                                        if(answerI.isMessageComponent() && answerI.customID == "gw-reqs"){
                                            await (await answerI.respond({content:":white_check_mark: Erfolgreich ausgewählt! :white_check_mark:"})).deleteResponse()
                                            for(let req of answerI.values){
                                                if(req == "gw-req-no"){
                                                    break;
                                                }
                                                // NACHRICHTEN
                                                if(req == "gw-req-msg"){
                                                    let question = await answerI.channel?.send({content:":question: **Wie viele Nachrichten müssen Teilnehmer haben? ** :question:"})
                                                    answer = undefined;

                                                    let answer1 = await client.waitFor("messageCreate", (message) => {
                                                        return message.author.id == i.member?.id && message.channel.id == i.channel?.id
                                                    }, answertime)
                                                    if(answer1[0]){
                                                        answer = answer1[0]
                                                    }
                                        
                                                    if(answer != undefined){
                                                        let value = parseInt(answer.content)
                                                        if(value != undefined){
                                                            reqs.push({type:"messages",value:value})
                                                            answer.delete()
                                                            if(question){
                                                                question.delete()
                                                            }
                                                        }else{
                                                            answer.reply(":x: Das ist keine Zahl! :x:")
                                                            return
                                                        }
                                                    }else{
                                                        await i.channel.send({content:":x: Bitte antworte innerhalb 60 Sekunden :x:"})
                                                        return
                                                    }
                                                }
                                                // EINLADUNGEN
                                                if(req == "gw-req-inv"){
                                                    let question = await answerI.channel?.send({content:":question: **Wie viele Einladungen müssen Teilnehmer haben? ** :question:"})
                                                    answer = undefined;
                                                    let answer1 = await client.waitFor("messageCreate", (message) => {
                                                        return message.author.id == i.member?.id && message.channel.id == i.channel?.id
                                                    }, answertime)
                                                    if(answer1[0]){
                                                        answer = answer1[0]
                                                    }
                                        
                                                    if(answer != undefined){
                                                        let value = parseInt(answer.content)
                                                        if(value != undefined){
                                                            reqs.push({type:"invites",value:value})
                                                            answer.delete()
                                                            if(question){
                                                                question.delete()
                                                            }
                                                        }else{
                                                            answer.reply(":x: Das ist keine Zahl! :x:")
                                                            return
                                                        }
                                                    }else{
                                                        await i.channel.send({content:":x: Bitte antworte innerhalb 60 Sekunden :x:"})
                                                        return
                                                    }
                                                }
                                                // SPIELPUNKTE
                                                if(req == "gw-req-gpo"){
                                                    let question = await answerI.channel?.send({content:":question: **Wie viele Spielpunkte müssen Teilnehmer haben? ** :question:"})
                                                    answer = undefined;
                                                    let answer1 = await client.waitFor("messageCreate", (message) => {
                                                        return message.author.id == i.member?.id && message.channel.id == i.channel?.id
                                                    }, answertime)
                                                    if(answer1[0]){
                                                        answer = answer1[0]
                                                    }
                                        
                                                    if(answer != undefined){
                                                        let value = parseInt(answer.content)
                                                        if(value != undefined){
                                                            reqs.push({type:"gamepoints",value:value})
                                                            answer.delete()
                                                            if(question){
                                                                question.delete()
                                                            }
                                                        }else{
                                                            answer.reply(":x: Das ist keine Zahl! :x:")
                                                            return
                                                        }
                                                    }else{
                                                        await i.channel.send({content:":x: Bitte antworte innerhalb 60 Sekunden :x:"})
                                                        return
                                                    }
                                                }
                                                // Rolle
                                                if(req == "gw-req-role"){
                                                    let question = await answerI.channel?.send({content:":question: **Welche Rolle müssen Teilnehmer haben?** :question:\nBitte schreibe den exakten Namen/die ID*:"})
                                                    answer = undefined;
                                                    let answer1 = await client.waitFor("messageCreate", (message) => {
                                                        return message.author.id == i.member?.id && message.channel.id == i.channel?.id
                                                    }, answertime)
                                                    if(answer1[0]){
                                                        answer = answer1[0]
                                                    }
                                        
                                                    if(answer != undefined){
                                                        let role = await i.member.guild.roles.get(answer.content)
                                                        if(role == undefined){
                                                            role = await i.member.guild.roles.resolve(answer.content)
                                                        }
                                                        if(role == undefined){
                                                            for( let role1 of await i.member.guild.roles.array()){
                                                                if(role1.name == answer.content){
                                                                    role = role1
                                                                }
                                                            }
                                                        }
                                                        if(role != undefined){
                                                            reqs.push({type:"role",value:role.id})
                                                            answer.delete()
                                                            if(question){
                                                                question.delete()
                                                            }
                                                        }else{
                                                            answer.reply(":x: Diese Rolle existiert nicht! :x:")
                                                            return
                                                        }
                                                    }else{
                                                        await i.channel.send({content:":x: Bitte antworte innerhalb 60 Sekunden :x:"})
                                                        return
                                                    }
                                                }
                                                if(req == "gw-req-other"){
                                                    let question = await answerI.channel?.send({content:":question: **Welche anderen Bedinguen gibt es noch? (Trenne mit einem ,)**"})
                                                    answer = undefined;
                                                    let answer1 = await client.waitFor("messageCreate", (message) => {
                                                        return message.author.id == i.member?.id && message.channel.id == i.channel?.id
                                                    }, answertime)
                                                    if(answer1[0]){
                                                        answer = answer1[0]
                                                    }
                                        
                                                    if(answer != undefined){
                                                        reqs.push({type:"other",value:answer.content})
                                                        answer.delete()
                                                        if(question){
                                                            question.delete()
                                                        }
                                                    }else{
                                                        await i.channel.send({content:":x: Bitte antworte innerhalb 60 Sekunden :x:"})
                                                        return
                                                    }
                                                }
                                            }
                                            let content = ""
                                            for(let req1 of reqs){
                                                content += "<:rechts:937003080086601789>"
                                                if(req1.type == "messages"){
                                                    content += "Nachrichten: " + req1.value
                                                }
                                                if(req1.type == "invites"){
                                                    content += "Einladungen: " + req1.value
                                                }
                                                if(req1.type == "gamepoints"){
                                                    content += "Spielpunkte: " + req1.value
                                                }
                                                if(req1.type == "role"){
                                                    if(typeof req1.value == "string"){
                                                        let role = await i.guild.roles.get(req1.value)
                                                        if(role == undefined){
                                                            role = await i.guild.roles.resolve(req1.value)
                                                        }
                                                        if(role != undefined){
                                                            content += `Rolle: ${role.name}`
                                                        }
                                                    }
                                                }
                                                if(req1.type == "other"){
                                                    content += req1.value
                                                }
                                                content += "\n"
                                            }
                                            if(content != ""){
                                                embed.addField({
                                                    "name": "Bedinguen",
                                                    "value": content,
                                                    "inline": true
                                                },)
                                            }
                                            const controls: harmony.MessageComponentData[] = [
                                                {
                                                    type: harmony.MessageComponentType.ACTION_ROW,
                                                    components: [
                                                        {
                                                            type: harmony.MessageComponentType.SELECT,
                                                            customID: 'gw-bypass',
                                                            options: [{emoji:{name:"❌"},label:"Kein Bypass",value:"gw-bypass-no"},{emoji:{name:"🎭"},label:"Rolle",value:"gw-bypass-role"}]
                                                        }
                                                    ]
                                                },
                                            ]
                                            let bypass:{type:string,value:string} = {type:"no",value:"no"}
                                            if(reqs.length > 0){
                                                msg.editResponse({embeds:[embed],content:"**Welche Bypasses soll es geben?**",components:controls})
                                                answer = undefined
                                                answerI = undefined
                                                let answerI1 = await client.waitFor("interactionCreate", (message) => {
                                                    if(message.member && message.channel) {
                                                        return message.member.id == i.member?.id && message.channel.id == i.channel?.id
                                                    }
                                                    return false
                                                }, answertime)
                                                if(answerI1[0]){
                                                    answerI = answerI1[0]
                                                }
                                                if(answerI instanceof harmony.Interaction){
                                                    if(answerI.isMessageComponent() && answerI.customID == "gw-bypass"){
                                                        await (await answerI.respond({content:":white_check_mark: Erfolgreich ausgewählt! :white_check_mark:"})).deleteResponse()
                                                        if(answerI.values[0] ==  "gw-bypass-role" ){
                                                            let question = await answerI.channel?.send({content:":question: **Welche Rolle gilt als Bypass?** :question:\nBitte schreibe den exakten Namen/die ID*:"})
                                                            answer = undefined;
                                                            let answer1 = await client.waitFor("messageCreate", (message) => {
                                                                return message.author.id == i.member?.id && message.channel.id == i.channel?.id
                                                            }, answertime)
                                                            if(answer1[0]){
                                                                answer = answer1[0]
                                                            }
                                                
                                                            if(answer != undefined){
                                                                let role = await i.member.guild.roles.get(answer.content)
                                                                if(role == undefined){
                                                                    role = await i.member.guild.roles.resolve(answer.content)
                                                                }
                                                                if(role == undefined){
                                                                    for( let role1 of await i.member.guild.roles.array()){
                                                                        if(role1.name == answer.content){
                                                                            role = role1
                                                                        }
                                                                    }
                                                                }
                                                                if(role != undefined){
                                                                    bypass = {type:"role",value:role.id}
                                                                    question?.delete()
                                                                    answer.delete()
                                                                }else{
                                                                    answer.reply(":x: Diese Rolle existiert nicht! :x:")
                                                                    return
                                                                }
                                                            }else{
                                                                await i.channel.send({content:":x: Bitte antworte innerhalb 60 Sekunden :x:"})
                                                                return
                                                            }
                                                        }
                                                    }
                                                    
                                                }else{
                                                    await i.channel.send({content:":x: Bitte antworte innerhalb 60 Sekunden :x:"})
                                                    return
                                                }
                                            }
                                            let bcontent = ""
                                            if(bypass.type == "role"){
                                                let role = await i.guild.roles.get(bypass.value)
                                                if(role == undefined){
                                                    role = await i.guild.roles.resolve(bypass.value)
                                                }
                                                if(role != undefined){
                                                    bcontent = `Rolle: ${role.name}`
                                                }
                                            }
                                            if(bcontent != ""){
                                                embed.addField({name:"Bypass",inline:true,value:bcontent})
                                            }
                                            msg.editResponse({embeds:[embed],content:":white_check_mark: **Erfolgreich!** :white_check_mark:",components:[]})
                                            // FERTIG
                                            let channel = await client.channels.get(i.option<harmony.InteractionChannel>("channel").id)
                                            let description = `
<a:info:938064837680979988> __Infos__ <a:info:938064837680979988>
\`🙋\` | **Hoster**: ${i.member?.user.mention}
\`🗓\` | **Endet**: <t:${Math.floor(ende.getTime()/1000)}:R>
\`🔢\` | **Gewinneranzahl**: ${gewinneranzahl.toString()}
                                            `
                                            if(content != ""){
                                                description += "\n<a:772192040145911849:938065752378990612> __Bedingungen__ <a:772192040145911849:938065752378990612>\n"
                                                description += content
                                            }
                                            if(bcontent != ""){
                                                description += "`⚡️` | **ByPass:** " + bcontent
                                            }
                                            if(channel != undefined && channel.isText()){
                                                let controls: harmony.MessageComponentData[] = [
                                                    {
                                                        type: harmony.MessageComponentType.ACTION_ROW,
                                                        components: [
                                                            {
                                                                type: harmony.MessageComponentType.BUTTON,
                                                                style: harmony.ButtonStyle.BLURPLE,
                                                                customID: 'gw-teilnehmen',
                                                                label: "Teilnehmen",
                                                                emoji: {name:"🎁"}
                                                            }
                                                        ]
                                                    },
                                                ]

                                                let msg = await channel.send({
                                                    embeds:[{
                                                        "title": preis,
                                                        "description": description + "\n\nReagiere mit 🎁 , um teilzunehmen.",
                                                        "color": 44469,
                                                        "author": {
                                                            "name": "Neue Verlosung",
                                                            "icon_url": "https://emoji.gg/assets/emoji/3461-giveaway.gif"
                                                        },
                                                        "footer": {
                                                            "text": "⇢ Zetrox von Folizza Studios",
                                                            "icon_url": "https://images-ext-2.discordapp.net/external/Bz1kDlXLtgMdIMxKgKx1i-8i-wXOSEKFY48ouCl1hPM/https/sph-download.neocities.org/share/GoDaddyStudioPage-0%25202.png"
                                                        }
                                                    }],
                                                    components:controls
                                                })
                                                let giveawaydb = database("giveaways.json")
                                                giveawaydb.giveaways.push({
                                                    guild:i.guild.id,
                                                    channel:channel.id,
                                                    end:ende.getTime(),
                                                    hoster:i.member.id,
                                                    preis:preis,
                                                    users:[],
                                                    msgid: msg.id,
                                                    winnercount: gewinneranzahl,
                                                    reqs:reqs,
                                                    bypass:bypass,
                                                    winners:[]
                                                })
                                                saveDatabase("giveaways.json",giveawaydb)
                                            }else{
                                                await i.channel.send({content:":x: Dieser Kanal ist kein Textkanal! :x:"})
                                                return
                                            }
                                        }
                                    }else{
                                        await i.channel.send({content:":x: Bitte antworte innerhalb 60 Sekunden :x:"})
                                        return
                                    }
                                }else{
                                    await i.channel.send({content:":x: Das Ende dieser Verlosung ist ungültig! :x:"})
                                    return
                                }
                            }
                        }else{
                            await i.channel.send({content:":x: Bitte antworte innerhalb 60 Sekunden :x:"})
                        }
                    }else{
                        await i.channel.send({content:":x: Es muss mindestens einen Gewinner geben! :x:"})
                    }
                }else{
                    await i.channel.send({content:":x: Bitte antworte innerhalb 60 Sekunden :x:"})
                }
            }else{
                await i.channel.send({content:":x: Bitte antworte innerhalb 60 Sekunden :x:"})
            }
        }
    }catch(err){
        noPerms(i);
    }
}


function isURL(str:string) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}
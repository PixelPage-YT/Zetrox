import * as harmony from "https://code.harmony.rocks/main"
import { commands } from "./commands.ts"
import {help, helpselect} from "./commands/help.ts"
import {messages} from "./commands/messages.ts"
import {invites} from "./commands/invites.ts"
import {gamePoints} from "./commands/gamePoints.ts"
import {ready} from "./listeners/ready.ts"
import {messageCreate} from "./listeners/messageCreate.ts"
import {lbInvites,lbMessages,lbGamepoints} from "./commands/leaderboard.ts"
import{eInviteKanal} from "./commands/einstellungen/inviteKanal.ts"
import{eAntiSpamTime} from "./commands/einstellungen/antiSpamTime.ts"
import{eTeamRole} from "./commands/einstellungen/teamRole.ts"
import{bonusAddMessages,bonusRemoveMessages} from "./commands/bonus/messages.ts"
import{bonusAddInvites,bonusRemoveInvites} from "./commands/bonus/invites.ts"
import{bonusAddGamePoints,bonusRemoveGamePoints} from "./commands/bonus/gamepoints.ts"
import {gtn} from "./commands/gtn.ts"
import {info} from "./commands/info.ts"
import {emojiquiz} from "./commands/emojiquiz.ts"
import {quiz} from "./commands/quiz.ts"
import {ssp} from "./commands/ssp.ts"
import {resetGamePoints,resetInvites,resetMessages} from "./commands/reset.ts"
import {minecraftStats,serverStats} from "./commands/stats.ts"
import {gstart} from "./commands/gstart.ts"
import {giveaway} from "./commands/giveaway.ts"
import {interactionCreate} from "./listeners/interactionCreate.ts"
import {database,saveDatabase} from "./util/database.ts"

class Zetrox extends harmony.Client {
    oinvites=[]
    @harmony.slash()
    help(i:harmony.Interaction){
        help(i,this);
    }

    @harmony.slash()
    messages(i:harmony.Interaction){
        messages(i,this);
    }

    @harmony.slash()
    invites(i:harmony.Interaction){
        invites(i,this);
    }

    @harmony.slash()
    gamepoints(i:harmony.Interaction){
        gamePoints(i,this);
    }

    @harmony.event()
    ready(){
        ready(this);
    }

    @harmony.subslash("einstellungen", "invitekanal")
    invitekanal(i:harmony.Interaction){
        eInviteKanal(i, this)
    }

    @harmony.subslash("einstellungen", "antispamtime")
    antispamtime(i:harmony.Interaction){
        eAntiSpamTime(i, this)
    }

    @harmony.subslash("einstellungen", "teamrole")
    teamrole(i:harmony.Interaction){
        eTeamRole(i, this)
    }

    @harmony.groupslash("bonus", "add", "messages")
    bonusAddMessages(i:harmony.Interaction){
        bonusAddMessages(i, this);
    }
    
    @harmony.groupslash("bonus", "remove", "messages")
    bonusRemoveMessages(i:harmony.Interaction){
        bonusRemoveMessages(i, this);
    }

    @harmony.groupslash("bonus", "add", "invites")
    bonusAddInvites(i:harmony.Interaction){
        bonusAddInvites(i, this);
    }

    @harmony.groupslash("bonus", "remove", "invites")
    bonusRemoveInvites(i:harmony.Interaction){
        bonusRemoveInvites(i, this);
    }
    @harmony.groupslash("bonus", "add", "gamepoints")
    bonusAddGamePoints(i:harmony.Interaction){
        bonusAddGamePoints(i, this);
    }
    @harmony.groupslash("bonus", "remove", "gamepoints")
    bonusRemoveGamePoints(i:harmony.Interaction){
        bonusRemoveGamePoints(i, this);
    }

    @harmony.subslash("leaderboard","invites")
    lbInvites(i:harmony.Interaction){
        lbInvites(i,this)
    }
    @harmony.subslash("leaderboard","messages")
    lbMessages(i:harmony.Interaction){
        lbMessages(i,this)
    }
    @harmony.subslash("leaderboard","gamepoints")
    lbGamepoints(i:harmony.Interaction){
        lbGamepoints(i,this)
    }
    @harmony.subslash("lb","invites")
    lb1Invites(i:harmony.Interaction){
        lbInvites(i,this)
    }
    @harmony.subslash("lb","messages")
    lb1Messages(i:harmony.Interaction){
        lbMessages(i,this)
    }
    @harmony.subslash("lb","gamepoints")
    lb1Gamepoints(i:harmony.Interaction){
        lbGamepoints(i,this)
    }

    @harmony.slash("gtn")
    gtn(i:harmony.Interaction){
        gtn(i,this)
    }
    @harmony.slash("info")
    info(i:harmony.Interaction){
        info(i,this)
    }

    @harmony.slash("emojiquiz")
    emojiquiz(i:harmony.Interaction){
        emojiquiz(i,this)
    }

    @harmony.slash("quiz")
    quiz(i:harmony.Interaction){
        quiz(i,this)
    }

    @harmony.subslash("reset","messages")
    resetMessages(i:harmony.Interaction){
        resetMessages(i,this)
    }
    @harmony.subslash("reset","invites")
    resetInvites(i:harmony.Interaction){
        resetInvites(i,this)
    }
    @harmony.subslash("reset","gamepoints")
    resetGamePoints(i:harmony.Interaction){
        resetGamePoints(i,this)
    }

    @harmony.slash("ssp")
    ssp(i:harmony.Interaction){
        ssp(i,this)
    }

    @harmony.subslash("stats","server")
    serverStats(i:harmony.Interaction){
        serverStats(i,this)
    }
    @harmony.subslash("stats","minecraft")
    minecraftStats(i:harmony.Interaction){
        minecraftStats(i,this)
    }

    @harmony.slash("gstart")
    gstart(i:harmony.Interaction){
        gstart(i,this)
    }
    @harmony.slash("giveaway")
    giveaway(i:harmony.Interaction){
        giveaway(i,this)
    }
}

const client = new Zetrox();
const config:{devtoken:string,token:string} = JSON.parse(Deno.readTextFileSync("config.json"));
let token:string = config.devtoken

if(Deno.args[0] == undefined || Deno.args[0] == "dev"){
    console.log("[Info] Der Bot wird im DEV Modus gestartet. (Zetrox PTB)")
    token = config.devtoken
}else if(Deno.args[0] == "prod"){
    token = config.token
    console.log("[Info] Der Bot wird im PRODUCTION Modus gestartet. (Zetrox)")
}



async function checkSlash(){
    commands.forEach(command => {
        // If you want to create command globally, just remove 'Your Server/Guild ID' part
        // I recommend making it for only one guild for now because Global Slash Commands can take max 1 hour to come live.
        client.guilds.array().then((guilds) => {
            guilds.forEach((guild) => {
                guild.commands.all().then((existingcommands) => {
                    var excommandarray = existingcommands.array()
                    let check = false;
                    for(let i in excommandarray){
                        if(excommandarray[i].name == command.name){
                            check = true;
                        }
                    }
                    if(check == false){
                        client.interactions.commands.create(command,guild.id)
                            .then((cmd) => console.log(`[Info] Slash Command ${cmd.name} in ${guild.name} erstellt`))
                            .catch((err) => console.log(`[Info] Es ist fehlgeschlagen, den Slash Command ${command.name} in ${guild.name} einzurichten, weil: ${err}`));
                    }
                })
            })
        })
    })
}
if(Deno.args[0] != undefined && Deno.args[0] == "prod"){
    commands.forEach(command => {
        client.interactions.commands.create(command)
            .then((cmd) => console.log(`[Info] Slash Command ${cmd.name} erstellt`))
            .catch((err) => console.log(`[Info] Es ist fehlgeschlagen, den Slash Command ${command.name} einzurichten, weil: ${err}`));
    })
}else{
    setInterval(checkSlash,15000)
}


async function updateStats(){
    let db = database("stats.json").data
    for(let stat of db){
        let guild = await client.guilds.get(stat.guild)
        if(guild == undefined){
            guild = await client.guilds.resolve(stat.guild)
        }
        if(guild != undefined){
            let channel = await guild.channels.get(stat.channel)
            if(channel == undefined){
                channel = await guild.channels.resolve(stat.channel)
            }
            if(channel != undefined && channel.isText()){
                let message = await channel.messages.get(stat.msg)
                if(message == undefined){
                    message = await channel.messages.resolve(stat.msg)
                }
                if(message != undefined){
                    if(stat.type == "minecraft"){
                        try{
                            let data = await (await fetch("https://api.mcsrvstat.us/2/" + stat.ip)).json()
                            let motd:string = ""
                            if(data.motd.raw[0]){
                                motd += data.motd.raw[0]
                            }
                            if(data.motd.raw[1]){
                                motd += data.motd.raw[1]
                            }
                            let embed = new harmony.Embed({
                                "title": stat.ip,
                                "color": 44469,
                                "fields": [
                                    {
                                        "name": "Nachricht des Tages (MOTD)",
                                        "value": motd,
                                        "inline": true
                                    },
                                    {
                                        "name": "Spieleranzahl",
                                        "value": data.players.online + "/" + data.players.max,
                                        "inline": true
                                    },
                                    {
                                        "name": "Minecraft Versionen",
                                        "value": data.version,
                                        "inline": true
                                    }
                                ],
                                "footer": {
                                    "text": "⇢ Zetrox von Folizza Studios",
                                    "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                                },
                                "thumbnail": {
                                    "url": "https://emoji.gg/assets/emoji/1532-iron.png"
                                }
                            })
                            if(data.hostname){
                                embed.addField({
                                    "name": "Hostname",
                                    "value": data.hostname,
                                    "inline": true
                                },)
                            }
                            message.edit({
                                embeds: [embed]
                            })
                        }catch(err){
                            console.log(err)
                        }
                    }else if (stat.type == "server"){
                        // invites
                        let invitecontent:string = ""
                        let invitedb = JSON.parse(Deno.readTextFileSync("./databases/invites/invites.json"));
                        let points: {member:string,count:number}[];
                        points = []
                        if(!(invitedb[guild.id])){
                            invitedb[guild.id] = {}
                        }
                        let guilddb = invitedb[guild.id]
                        for(let member1 of Object.entries(guilddb)){
                            // @ts-ignore
                            points.push({member:member1[0],count:member1[1].count})
                        }
                        let sorted = points.sort((a:{member:string,count:number}, b:{member:string,count:number}) => {
                            return b.count - a.count
                        })
                        for(let index in sorted){
                            if(parseInt(index)+1 == 4){
                                break;
                            }
                            let element = sorted[index]
                            let currentuser: harmony.User|undefined
                            currentuser = await client.users.get(element.member)
                            if(currentuser == undefined){
                                currentuser = await client.users.resolve(element.member)
                            }
                            if(currentuser != undefined && currentuser.username.indexOf("Zetrox") == -1){
                                if(parseInt(index)+1 == 1){
                                    invitecontent+="🥇 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                                }else if(parseInt(index)+1 == 2){
                                    invitecontent+="🥈 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                                }else if(parseInt(index)+1 == 3){
                                    invitecontent+="🥉 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                                }
                            }
                        }
                        if(invitecontent == ""){
                            invitecontent = "*Hier hat noch niemand jemanden eingeladen...*"
                        }
                        // messages
                        let messagecontent:string = ""
                        let messagedb = JSON.parse(Deno.readTextFileSync("./databases/messages.json"));
                        points = []
                        if(!(messagedb[guild.id])){
                            messagedb[guild.id] = {}
                        }
                        guilddb = messagedb[guild.id]
                        for(let member1 of Object.entries(guilddb)){
                            // @ts-ignore
                            points.push({member:member1[0],count:member1[1].count})
                        }
                        sorted = points.sort((a:{member:string,count:number}, b:{member:string,count:number}) => {
                            return b.count - a.count
                        })
                        for(let index in sorted){
                            if(parseInt(index)+1 == 4){
                                break;
                            }
                            let element = sorted[index]
                            let currentuser: harmony.User|undefined
                            currentuser = await client.users.get(element.member)
                            if(currentuser == undefined){
                                currentuser = await client.users.resolve(element.member)
                            }
                            if(currentuser != undefined && currentuser.username.indexOf("Zetrox") == -1){
                                if(parseInt(index)+1 == 1){
                                    messagecontent+="🥇 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                                }else if(parseInt(index)+1 == 2){
                                    messagecontent+="🥈 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                                }else if(parseInt(index)+1 == 3){
                                    messagecontent+="🥉 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                                }
                            }
                        }
                        if(messagecontent == ""){
                            messagecontent = "*Hier hat noch niemand jemanden eingeladen...*"
                        }
                        // gamepoints
                        let gamePointdb = JSON.parse(Deno.readTextFileSync("./databases/gamePoints.json"));
                        let gamePointcontent = "";
                        let nocontent = "";
                        points = []
                        if(!(invitedb[guild.id])){
                            invitedb[guild.id] = {}
                        }
                        guilddb = invitedb[guild.id]
                        for(let member1 of Object.entries(guilddb)){
                            // @ts-ignore
                            points.push({member:member1[0],count:member1[1].count})
                        }
                        sorted = points.sort((a:{member:string,count:number}, b:{member:string,count:number}) => {
                            return b.count - a.count
                        })
                        for(let index in sorted){
                            if(parseInt(index)+1 == 10){
                                break;
                            }
                            let element = sorted[index]
                            let currentuser: harmony.User|undefined
                            currentuser = await client.users.get(element.member)
                            if(currentuser == undefined){
                                currentuser = await client.users.resolve(element.member)
                            }
                            if(currentuser != undefined && currentuser.username.indexOf("Zetrox") == -1){
                                if(parseInt(index)+1 == 1){
                                    gamePointcontent+="🥇 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                                }else if(parseInt(index)+1 == 2){
                                    gamePointcontent+="🥈 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                                }else if(parseInt(index)+1 == 3){
                                    gamePointcontent+="🥉 **" + currentuser.username + "**" + " | " + element.count.toString() + "\n"
                                }
                            }
                        }
                        if(gamePointcontent == nocontent){
                            gamePointcontent = "*Hier hat noch niemand einen GamePoint...*"
                        }
                        let embed = new harmony.Embed({
                            "title": guild.name,
                            "description": guild.description,
                            "color": 44469,
                            "fields": [
                                {
                                    "name": "Top 3 - Nachrichten",
                                    "value": messagecontent,
                                    "inline": true
                                },
                                {
                                    "name": "Top 3 - Einladungen",
                                    "value": invitecontent,
                                    "inline": true
                                },
                                {
                                    "name": "Top 3 - SpielPunkte",
                                    "value": gamePointcontent,
                                    "inline": true
                                },
                            ],
                            "footer": {
                              "text": "⇢ Zetrox von Folizza Studios",
                              "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                            },
                            "thumbnail": {
                                "url": guild.iconURL()
                            }
                        })
                        if(guild.memberCount){
                            embed.addField({
                                "name": "MitgliederAnzahl",
                                "value": guild.memberCount?.toString(),
                                "inline": true
                            })
                        }
                        if(guild.snowflake.timestamp){
                            let date = new Date(guild.snowflake.timestamp)
                            embed.addField({
                                "name": "Server erstellt",
                                "value": `<t:${Math.floor(date.getTime() / 1000)}:R> (${date.toLocaleDateString("de-DE")} ${date.toLocaleTimeString("de-DE")})`,
                                "inline": true
                            })
                        }
                        message.edit({embeds:[embed]})
                    }
                }else{
                    let db2 = database("stats.json")
                    // @ts-ignore
                    db2.data.splice(db2.data.findIndex(index => index === stat))
                    saveDatabase("stats.json",db2)
                }
            }
        }
    }
}

setInterval(updateStats,60000)

client.interactions.on("interactionError", (err) => {
    console.log(err)
})
client.on("interactionCreate", (i:harmony.Interaction) => {
    if(i.isMessageComponent()){
        if(i.customID == "help-select"){
            helpselect(i, client)
        }
    }
})
client.on("messageCreate", (message) => {
    messageCreate(message);
})
client.on("guildMemberAdd", async (member:harmony.Member) => {
    //const channel = member.guild.channels.resolve('');
    let guildInvites = await member.guild.invites.fetchAll()
    guildInvites.forEach(async invite => { //basically a for loop over the invites
        // @ts-ignore
        let invite1 = client.oinvites[invite.code]
        if(invite.uses != invite1) { //if it doesn't match what we stored:
            if(invite.inviter){
                invite.inviter.id
                let invitedb = JSON.parse(Deno.readTextFileSync("./databases/invites/invites.json"));
                if(invite.guild){
                    if(!(invitedb[invite.guild.id])){
                        invitedb[invite.guild.id] = {}
                    }
                    if(!(invitedb[invite.guild.id][invite.inviter.id])){
                        invitedb[invite.guild.id][invite.inviter.id] = {count:0,invited:[],leaves:0}
                    }
                    invitedb[invite.guild.id][invite.inviter.id].count++
                    invitedb[invite.guild.id][invite.inviter.id].invited.push(member.id)
                    const invChanneldb = JSON.parse(Deno.readTextFileSync("./databases/invites/inviteChannels.json"))
                    if(invChanneldb[member.guild.id]){
                        let channel = await member.guild.channels.get(invChanneldb[member.guild.id])
                        if(channel == undefined){
                            let channel = await member.guild.channels.resolve(invChanneldb[member.guild.id])
                        }
                        if(channel != undefined && channel.isText()){
                            channel.send({
                                embeds: [
                                    {
                                        "title": member.user.username,
                                        "description": "ist gerade dem Server beigetreten! \n*Er/Sie wurde eingeladen von* **" + invite.inviter.username + "**",
                                        "color": 5814783,
                                        "author": {
                                          "name": "Neues Mitglied",
                                          "icon_url": "https://emoji.gg/assets/emoji/3118-discord-members.png"
                                        },
                                        "thumbnail": {
                                          "url": member.avatarURL()
                                        },
                                        "footer": {
                                            "text": "⇢ Zetrox von Folizza Studios",
                                            "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                                        }
                                    }
                                ]
                            })
                        }
                    }
                    // console.log(member.user.username + " wurde eingeladen von " + invite.inviter.username)
                    Deno.writeTextFileSync("./databases/invites/invites.json", JSON.stringify(invitedb))
                }
            }
            // @ts-ignore
            client.oinvites[invite.code] = invite.uses
        }
    })
})

client.on("inviteCreate", (invite:harmony.Invite) => {
    // @ts-ignore
    client.oinvites[invite.code] = invite.uses
})

client.on("guildMemberRemove", (member:harmony.Member) => {
    const invitedb = JSON.parse(Deno.readTextFileSync("./databases/invites/invites.json"))
    if(invitedb[member.guild.id] != undefined){
        let members = invitedb[member.guild.id]
        // @ts-ignore
        for(let member1 of Object.entries(members)){
            let memberid = member1[0]
            // @ts-ignore
            for(let invitedMem of member1[1].invited){
                if(invitedMem == member.id){
                    if(!(invitedb[member.guild.id][memberid])){
                        invitedb[member.guild.id][memberid] = {count:0,invited:[],leaves:0}
                    }
                    invitedb[member.guild.id][memberid].leaves++
                    try{
                        invitedb[member.guild.id][memberid].invited.splice(invitedb[member.guild.id][memberid].invited.findIndex((index: string)=>index === member.id))
                    }catch(err){
                        console.log("invited member no splice lol")
                    }
                    Deno.writeTextFileSync("./databases/invites/invites.json", JSON.stringify(invitedb))
                }
            }
        }
    }
})

function randomChoice(arr:any) {
    return arr[Math.floor(Math.random() * arr.length)];
}
async function checkGW(){
    try{
        let gwdb:{"giveaways": {channel:string,end:number,winnercount:number,users:string[],preis:string}[]} = JSON.parse(Deno.readTextFileSync("./databases/giveaways.json"))
        let index = 0
        for(let gw of gwdb.giveaways){
            if(gw.end < Date.now()){
                let channel = await client.channels.get(gw.channel)
                if(channel == undefined){
                    channel = await client.channels.resolve(gw.channel)
                }
                if(channel != undefined){
                    if(gw.winnercount > 1){
                        let winnernames = []
                        let winnermentions = []
                        let users = gw.users
                        let winnercount = gw.winnercount
                        while(winnercount!=0){
                            let choice:string = randomChoice(users)
                            let user = await client.users.get(choice)
                            if(user == undefined){
                                user = await client.users.resolve(choice)
                            }
                            if(user != undefined){
                                users.splice(users.findIndex(user=>user === choice))
                                winnernames.push(user.username)
                                winnermentions.push(user.mention)
                            }
                            winnercount--
                        }
                        if(channel.isText()){
                            channel.send({
                                embeds:[
                                    {
                                        "title": winnernames.join(", "),
                                        "description": `***Glückwunsch! ***\nIhr habt **${gw.preis}** gewonnen!`,
                                        "color": 44469,
                                        "author": {
                                            "name": "Verlosungs-Ende",
                                            "icon_url": "https://cdn.discordapp.com/emojis/714392829362831401.gif?size=96&quality=lossless"
                                        },
                                        "footer": {
                                            "text": "⇢ Zetrox von Folizza Studios",
                                            "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                                        }
                                    }
                                ],
                                content:winnermentions.join(" ")
                            })
                            gwdb.giveaways.splice(index)
                            Deno.writeTextFileSync("./databases/giveaways.json", JSON.stringify(gwdb))
                        }
                    }else{
                        let winner = await client.users.get(randomChoice(gw.users))
                        if(winner == undefined){
                            winner = await client.users.resolve(randomChoice(gw.users))
                        }
                        if(winner != undefined){
                            if(channel.isText()){
                                channel.send({
                                    embeds:[
                                        {
                                            "title": winner?.username,
                                            "description": `***Glückwunsch! ***\nDu hast **${gw.preis}** gewonnen!`,
                                            "color": 44469,
                                            "author": {
                                                "name": "Verlosungs-Ende",
                                                "icon_url": "https://cdn.discordapp.com/emojis/714392829362831401.gif?size=96&quality=lossless"
                                            },
                                            "footer": {
                                                "text": "⇢ Zetrox von Folizza Studios",
                                                "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                                            }
                                        }
                                    ],
                                    content:winner?.mention
                                })
                                gwdb.giveaways.splice(index)
                                Deno.writeTextFileSync("./databases/giveaways.json", JSON.stringify(gwdb))
                            }
                        }else{
                            if(channel.isText()){
                                channel.send({
                                    embeds:[
                                        {
                                            "title": "Kein gewinner!",
                                            "description": `Niemand hat teilgenommen.\nDer Preis war ${gw.preis}!`,
                                            "color": 14233679,
                                            "author": {
                                                "name": "Verlosungs-Ende",
                                                "icon_url": "https://cdn.discordapp.com/emojis/714392829362831401.gif?size=96&quality=lossless"
                                            },
                                            "footer": {
                                                "text": "⇢ Zetrox von Folizza Studios",
                                                "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                                            }
                                        }
                                    ]
                                })
                                gwdb.giveaways.splice(index)
                                Deno.writeTextFileSync("./databases/giveaways.json", JSON.stringify(gwdb))
                            }
                        }
                    }
                }
            }
            index++
        }
    }catch(err){
        console.log(err)
    }
}
setInterval(checkGW, 10000)
client.on("interactionCreate", (i:harmony.Interaction) => {
    interactionCreate(i, client)
})
client.setPresence({ type: "LISTENING", name: " /help" })
client.connect(token, [harmony.GatewayIntents.GUILD_MESSAGES,harmony.GatewayIntents.GUILD_INVITES,harmony.GatewayIntents.GUILD_MEMBERS,harmony.GatewayIntents.GUILDS]);
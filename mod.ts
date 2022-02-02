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
import {guildMemberAdd} from "./listeners/guildMemberAdd.ts"
import {updateStats} from "./loops/updateStats.ts"
import {checkGW} from "./loops/checkGW.ts"
import {guildMemberRemove} from "./listeners/guildMemberRemove.ts"

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

setInterval(checkGW, 10000, client)
setInterval(updateStats,60000, client)

client.interactions.on("interactionError", (err) => {
    console.log(err)
})
client.on("messageCreate", (message) => {
    messageCreate(message);
})
client.on("guildMemberAdd", async (member:harmony.Member) => {
    //const channel = member.guild.channels.resolve('');
    guildMemberAdd(member)
})
client.on("inviteCreate", (invite:harmony.Invite) => {
    // @ts-ignore
    client.oinvites[invite.code] = invite.uses
})
client.on("guildMemberRemove", (member:harmony.Member) => {
    guildMemberRemove(member);
})
client.on("interactionCreate", (i:harmony.Interaction) => {
    interactionCreate(i, client)
})
client.setPresence({ type: "LISTENING", name: " /help" })
client.connect(token, [harmony.GatewayIntents.GUILD_MESSAGES,harmony.GatewayIntents.GUILD_INVITES,harmony.GatewayIntents.GUILD_MEMBERS,harmony.GatewayIntents.GUILDS]);
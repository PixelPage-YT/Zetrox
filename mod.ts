import { supabaseClient } from "https://deno.land/x/supabase_deno@v1.0.5/mod.ts"
import * as harmony from "https://code.harmony.rocks/main"
import {help} from "./commands/help.ts"
import {verifypanel} from "./commands/verifypanel.ts"
import {ticketpanel} from "./commands/ticketpanel.ts"
import {messages} from "./commands/messages.ts"
import {invites} from "./commands/invites.ts"
import {gamePoints} from "./commands/gamePoints.ts"
import {ready} from "./listeners/ready.ts"
import {messageCreate} from "./listeners/messageCreate.ts"
import {leaderboard} from "./commands/leaderboard.ts"
import{eInviteKanal} from "./commands/einstellungen/inviteKanal.ts"
import{eAntiSpamTime} from "./commands/einstellungen/antiSpamTime.ts"
import{eTeamRole} from "./commands/einstellungen/teamRole.ts"
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
import {achtball} from "./commands/8ball.ts"
import {add} from "./commands/add.ts"
import {remove} from "./commands/remove.ts"
import {vote} from "./commands/vote.ts"
import {
    database,
    saveDatabase
} from "./util/database.ts"

let startDate = Date.now()
export {startDate}

const sbclient:supabaseClient = new supabaseClient("https://lvqcvchccfkvuihmdbiu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2cWN2Y2hjY2ZrdnVpaG1kYml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUyODcwNTUsImV4cCI6MTk2MDg2MzA1NX0.rr8wnLdwcF99sstojzwkgdgCk6_qMh2tSIq5Bf8EUUE")


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

    @harmony.slash("add")
    add(i:harmony.Interaction){
        add(i,this)
    }

    @harmony.slash("remove")
    remove(i:harmony.Interaction){
        remove(i,this)
    }

    @harmony.slash("lb")
    lb(i:harmony.Interaction){
        leaderboard(i,this)
    }
    @harmony.slash("leaderboard")
    leaderboard(i:harmony.Interaction){
        leaderboard(i,this)
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
    @harmony.slash("verifypanel")
    verifypanel(i:harmony.Interaction){
        verifypanel(i,this)
    }

    @harmony.slash("8ball")
    achtball(i:harmony.Interaction){
        achtball(i,this)
    }

    @harmony.slash("ticketpanel")
    ticketpanel(i:harmony.Interaction){
        ticketpanel(i,client)
    }

    @harmony.slash("vote")
    vote(i:harmony.Interaction){
        vote(i,client)
    }
}

const client = new Zetrox();
const config:{devtoken:string,token:string} = JSON.parse(Deno.readTextFileSync("config.json"));
let token:string = config.devtoken
let devmode = true;
if(Deno.args[0] == undefined || Deno.args[0] == "dev"){
    console.log("[Info] Der Bot wird im DEV Modus gestartet. (Zetrox PTB)")
    token = config.devtoken
}else if(Deno.args[0] == "prod"){
    token = config.token
    console.log("[Info] Der Bot wird im PRODUCTION Modus gestartet. (Zetrox)")
    devmode = false;
}





setInterval(checkGW, 3000, client)
setInterval(updateStats,40000, client)

client.interactions.on("interactionError", (err) => {
    console.log(err)
})
client.on("messageCreate", (message) => {
    messageCreate(message);
})
client.on("guildMemberAdd", async (member:harmony.Member) => {
    //const channel = member.guild.channels.resolve('');
    guildMemberAdd(member,client)
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
import { serve } from "https://deno.land/std@0.125.0/http/server.ts";

serve(async (req) => {
    try{
        if(req.headers.get("authorization") == "alsiudhPAIWUZZDPiuasgdhaIUDDHPAISUdzh"){
            let data = await req.json()
            let user = await client.users.get(data.user)
            if(user == undefined){
                user = await client.users.resolve(data.user)
            }
            let votechannel = await client.channels.get("940206959951482890")
            if(votechannel == undefined){
                votechannel = await client.channels.resolve("940206959951482890")
            }
            if(user != undefined && votechannel != undefined && votechannel.isText()){
                let table = sbclient.tables().get("votes")
                type vote = {
                    id:string,
                    votes:number
                }
                let item:vote = {id:user.id,votes:0}
                let nitem: vote = (await table.items().get("id", user.id))[0]
                if(nitem != undefined){
                    item = nitem
                }
                item.votes++
                await table.items().edit("id", user.id, item)
                await votechannel.send({content:user.username,embeds:[
                    {
                        "title": "<:topggBROTM:940288324000694365> Danke für deinen Vote! <:topggBROTM:940288324000694365>",
                        "description": "**Vielen Dank** für deinen Vote!\nDies ist nun " + user.username + "'s " + item.votes+1 + ". Vote!\n\n:link: [Selber Voten](https://top.gg/bot/706526290181619775/vote) :link:",
                        "color": 5588753
                    }
                ]})
            }
        }
    }catch(err){
        console.log(err)
    }
    return new Response("Silence...")
});
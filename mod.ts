import * as harmony from "https://code.harmony.rocks/main"
import {help} from "./commands/help.ts"
import {verifypanel} from "./commands/verifypanel.ts"
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
import {
    database,
    saveDatabase
} from "./util/database.ts"

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
setInterval(updateStats,60000, client)

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


const listener = Deno.listen({ port: 8000 });


client.setPresence({ type: "LISTENING", name: " /help" })
client.connect(token, [harmony.GatewayIntents.GUILD_MESSAGES,harmony.GatewayIntents.GUILD_INVITES,harmony.GatewayIntents.GUILD_MEMBERS,harmony.GatewayIntents.GUILDS]);

let votechannel = await client.channels.resolve("940206959951482890")


for await(const conn of listener) {
    for await(const {request: req, respondWith: res} of Deno.serveHttp(conn)) {
        let data = await req.json()
        let user = await client.users.get(data.user)
        if(user == undefined){
            user = await client.users.resolve(data.user)
        }
        if(user != undefined && votechannel != undefined && votechannel.isText()){
            let votedb = database("votes.json")
            if(!votedb[user.id]){
                votedb[user.id] = 0
            }
            votedb[user.id]++
            await votechannel.send({content:user.mention,embeds:[
                {
                    "title": "<:topggBROTM:940288324000694365> Danke für deinen Vote! <:topggBROTM:940288324000694365>",
                    "description": "**Vielen Dank** für deinen Vote!\nDies ist nun " + user.username + "'s " + votedb[user.id].toString() + " vote!\n\n:link: [Selber Voten](https://top.gg/bot/706526290181619775/vote) :link:",
                    "color": 5588753
                }
            ]})
            saveDatabase("votes.json",votedb)
        }
        res(new Response("Silence...", {
            headers: {
                'content-type': 'text/plain'
            }
        }));
    }
}
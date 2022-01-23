import * as harmony from "https://code.harmony.rocks/main"
import { commands } from "./commands.ts"
import {help, helpselect} from "./commands/help.ts"
import {messages} from "./commands/messages.ts"
import {invites} from "./commands/invites.ts"
import {ready} from "./listeners/ready.ts"
import {messageCreate} from "./listeners/messageCreate.ts"
import {leaderboard} from "./commands/leaderboard.ts"

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
    leaderboard(i:harmony.Interaction){
        leaderboard(i,this);
    }

    @harmony.slash()
    lb(i:harmony.Interaction){
        leaderboard(i,this);
    }

    @harmony.event()
    ready(){
        ready(this);
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

if(Deno.args[1] != undefined){
    if(Deno.args[1] == "newSlash"){
        console.log("[Info] Alle Slash Commands werden gelöscht")
        let customCommand = Deno.args[2]
        if(customCommand){
            const clguilds = await client.guilds.array()
            for(let guild of clguilds){
                let commands = await guild.commands.all()
                for(let command of commands.array()){
                    if(command.name == customCommand){
                        command.delete()
                    }
                }
            }
        }else{
            const clguilds = await client.guilds.array()
            for(let guild of clguilds){
                let commands = await guild.commands.all()
                for(let command of commands.array()){
                    command.delete()
                }
            }
        }
    }
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
                        client.interactions.commands.create(command, guild.id)
                            .then((cmd) => console.log(`[Info] Slash Command ${cmd.name} in ${guild.name} erstellt`))
                            .catch((err) => console.log(`[Info] Es ist fehlgeschlagen, den Slash Command ${command.name} in ${guild.name} einzurichten, weil: ${err}`));
                    }
                })
            })
        })
    })
    setTimeout(checkSlash, 15000)
}
checkSlash();




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

client.connect(token, [harmony.GatewayIntents.GUILD_INVITES,harmony.GatewayIntents.GUILD_MEMBERS,harmony.GatewayIntents.GUILDS]);
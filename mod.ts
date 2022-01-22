import * as harmony from "https://code.harmony.rocks/main"
import { commands } from "./commands.ts"
import {help, helpselect} from "./commands/help.ts"
import {messages} from "./commands/messages.ts"
import {ready} from "./listeners/ready.ts"
import {messageCreate} from "./listeners/messageCreate.ts"
import {leaderboard} from "./commands/leaderboard.ts"

class Zetrox extends harmony.Client {
    @harmony.slash()
    help(i:harmony.Interaction){
        help(i,this);
    }

    @harmony.slash()
    messages(i:harmony.Interaction){
        messages(i,this);
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


async function checkSlash(){
    commands.forEach(command => {
        client.guilds.array().then((guilds) => {
            guilds.forEach(async (guild) => {
                try{
                    guild.commands.all().then((existingcommands) => {
                        var excommandarray = existingcommands.array()
                        let check = false;
                        for(let i in excommandarray){
                            if(excommandarray[i].name == command.name){
                                check = true;
                            }
                        }
                        if(check == false){
                            client.slash.commands.create(command, guild.id)
                                .then((cmd) => console.log(`[Info] Slash Command ${cmd.name} wurde in ${guild.name} erstellt`))
                                .catch((err) => console.log(`[Warn] Es ist schief gegangen, den Slash Command ${command.name} in ${guild.name} einzurichten, weil: ${err}`));
                        }
                    })
                }catch(err){
                    console.log(err)
                }
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
client.connect(token, harmony.Intents.None);
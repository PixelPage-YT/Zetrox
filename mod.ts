import * as harmony from "https://code.harmony.rocks/main"

class MyBot extends harmony.Client {
}

const bot = new MyBot();
const config:{devtoken:string,token:string} = JSON.parse(Deno.readTextFileSync("config.json"));
if(Deno.args[0] == undefined || Deno.args[0] == "dev"){
    console.log("[Info] Der Bot wird im DEV Modus gestartet. (Zetrox PTB)")
    bot.connect(config.devtoken, harmony.Intents.None);
}else if(Deno.args[0] == "prod"){
    bot.connect(config.token, harmony.Intents.None);
    console.log("[Info] Der Bot wird im PRODUCTION Modus gestartet. (Zetrox)")
}
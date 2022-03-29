const config: {startcmd:string,token:string,watch:string} = JSON.parse(Deno.readTextFileSync("botstart.config.json"))
let latestpr = Deno.run({
    cmd:config.startcmd.split(" "),
    stderr:"piped"
})

import * as harmony from "http://code.harmony.rocks/main/mod.ts";
const client = new harmony.Client()
client.on("presenceUpdate", async (presence) => {
    if(presence.status == "offline" && presence.user.id == config.watch){
        latestpr.close()
        setTimeout(() => {
            latestpr = Deno.run({
                cmd:config.startcmd.split(" "),
                stderr:"piped"
            })
        }, 5000)
        const logchannel = await client.channels.fetch("950048866521206884")
        if(logchannel.isText()) logchannel.send("Zetrox ist abgestürzt und wird neu gestartet. Fehler: " + new TextDecoder().decode(await latestpr.stderrOutput()))
    }
})
client.connect(config.token,[harmony.GatewayIntents.GUILDS,harmony.GatewayIntents.GUILD_MEMBERS,harmony.GatewayIntents.GUILD_PRESENCES])

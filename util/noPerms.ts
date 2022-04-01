import * as harmony from "https://code.harmony.rocks/main/mod.ts"

export async function noPerms(i:harmony.Interaction,error:string){
    try{
        if(i){
            let errorCode = Math.floor(Math.random() * 9999999);
            const logChannel = await i.client.channels.fetch("950048866521206884")
            if(logChannel && logChannel.isText()){
                await logChannel.send(`ErrorCode: ${errorCode} | Jemand hat versucht, den Befehl ${i.isApplicationCommand() ? i.name : i.isMessageComponent() ? i.customID : "[unbekannt]"} zu nutzen, hat aber den folgenden Fehler erhalten: ${error}`)
            }
            // await i.channel?.send({
            //     embeds: [
            //         {
            //             "title": `:warning: Da ist etwas schiefgelaufen! (${errorCode}) :warning:`,
            //             "description": "*Dies kann an mehreren Sachen liegen.*",
            //             "color": 13750554,
            //             "fields": [
            //                 {
            //                     "name": "Berechtigungen",
            //                     "value": "Achte darauf, dass der Bot die richtigen Berechtigungen hat.\nFalls das nicht der Fall ist, kannst du dem Bot [hier](https://dsc.gg/zetroxbot) die Berechtigungen geben."
            //                 },
            //                 {
            //                     "name": "Anderes",
            //                     "value": "Falls es nicht daran liegt, melde dich bitte auf [unserem Server](https://discord.gg/mAFaUnT)."
            //                 }
            //             ],
            //             "footer": {
            //                 "text": "⇢ Zetrox von Folizza Studios",
            //                 "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
            //             }
            //         }
            //     ]
            // })
        }
    }catch(err){

    }
}
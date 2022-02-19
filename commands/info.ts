import * as harmony from "https://code.harmony.rocks/main"
import {noPerms} from "../util/noPerms.ts"
import {startDate} from "../mod.ts"
export async function info(i:harmony.Interaction,client:harmony.Client) {
  try{
    let members = 0;
    for(let guild of (await client.guilds.array())){
      if(guild.memberCount){
        members += guild.memberCount
      }
    }
    await i.respond({
        embeds:[
            {
                "title": ":information_source: Infos über Zetrox :information_source:",
                "color": 44469,
                "fields": [
                  {
                    "name": "Ping",
                    "value": client.shards.ping.toString() + " ms"
                  },
                  {
                    "name": "Online seit dem",
                    "value": "<t:" + Math.floor(startDate/1000) + ":R>"
                  },
                  {
                    "name": "Serveranzahl",
                    "value": (await client.guilds.array()).length.toString()
                  },
                  {
                    "name": "Benutzeranzahl",
                    "value": members.toString()
                  },
                  {
                    "name": "Gesammelte Daten",
                    "value": "Du kannst [hier](https://zetrox.neocities.org/home/datenschutz.html) sehen, welche Daten Zetrox sammelt."
                  },
                  {
                    "name": "Programmiersprache und Bibliotheken",
                    "value": "Der Bot ist in TypeScript geschrieben \nund benutzt die TypeScript Runtime Deno.\nDer Discord Client ist Harmony.\n\nTypeScript: https://typescriptlang.org/\nDeno: https://deno.land/\nHarmony: https://deno.land/x/harmony"
                  }
                ],
                "footer": {
                  "text": "⇢ Zetrox von Folizza Studios",
                  "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                }
              }
        ]
    })
  }catch(err){
    noPerms(i);
  }
}
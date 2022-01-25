import * as harmony from "https://code.harmony.rocks/main"

export async function info(i:harmony.Interaction,client:harmony.Client) {
    i.respond({
        embeds:[
            {
                "title": ":information_source: Infos über Zetrox :information_source:",
                "color": 44469,
                "fields": [
                  {
                    "name": "Serveranzahl",
                    "value": (await client.guilds.array()).length.toString()
                  },
                  {
                    "name": "Benutzeranzahl",
                    "value": (await client.users.array()).length.toString()
                  },
                  {
                    "name": "Gesammelte Daten",
                    "value": "Du kannst [hier](https://zetrox.neocities.org/home/datenschutz.html) sehen, welche Daten Zetrox sammelt.\nDu kannst Deine Daten auch unten verwalten."
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
}
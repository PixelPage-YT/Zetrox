import * as harmony from "https://code.harmony.rocks/main"
import {noPerms} from "../util/noPerms.ts"

import {
    database,
    saveDatabase
} from "../util/database.ts"
export async function vote(i:harmony.Interaction,client:harmony.Client){
    try{
        let vote = database("votes.json")[i.user.id]
        if(vote == undefined){
            vote = 0
        }
        await i.respond({
            "embeds": [
              {
                "title": "<:topggBROTM:940288324000694365> Für Zetrox Voten <:topggBROTM:940288324000694365>",
                "description": "Du willst folgende Vorteile auch bekommen? \n__Dann vote 10x für Zetrox!__ :link: [**Hier klicken**](https://top.gg/bot/706526290181619775/vote) :link:\nDeine aktuellen Votes: **" + vote + "**\n‏‏‎",
                "color": 5588753,
                "fields": [
                  {
                    "name": "Eigene Embeds für das Ticket System",
                    "value": "Du kannst deinen Server noch mehr personalisieren, indem du einfach deine eigenen Embeds verwendest!",
                    "inline": true
                  },
                  {
                    "name": "Eigene Embeds für das Verify System",
                    "value": "Du kannst deinen Server noch mehr personalisieren, indem du einfach deine eigenen Embeds verwendest!",
                    "inline": true
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
        noPerms(i)
    }
}
import { supabaseClient } from "https://deno.land/x/supabase_deno@v1.0.5/mod.ts"
import * as harmony from "https://code.harmony.rocks/main"
import {noPerms} from "../util/noPerms.ts"

import {
    database,
    saveDatabase
} from "../util/database.ts"
export async function vote(i:harmony.Interaction,client:harmony.Client){
    try{
        const sbclient:supabaseClient = new supabaseClient("https://lvqcvchccfkvuihmdbiu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2cWN2Y2hjY2ZrdnVpaG1kYml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUyODcwNTUsImV4cCI6MTk2MDg2MzA1NX0.rr8wnLdwcF99sstojzwkgdgCk6_qMh2tSIq5Bf8EUUE")
        let table = sbclient.tables().get("votes")
        let item = (await table.items().get("id", i.user.id))[0]
        let votes = 0;
        if(item != undefined){
          votes = item.votes
        }
        await i.respond({
            "embeds": [
                {
                    "title": "<:topggBROTM:940288324000694365> Für Zetrox Voten <:topggBROTM:940288324000694365>",
                    "description": "Du willst folgende Vorteile auch bekommen? \n__Dann vote 10x für Zetrox!__ :link: [**Hier klicken**](https://top.gg/bot/706526290181619775/vote) :link:\nDeine aktuellen Votes: **" + votes + "**\n‏‏‎",
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
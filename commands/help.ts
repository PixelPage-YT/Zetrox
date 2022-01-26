import * as harmony from "https://code.harmony.rocks/main"

export async function help(i:harmony.Interaction,client:harmony.Client){
    const controls: harmony.MessageComponentData[] = [
        {
            type: harmony.MessageComponentType.ACTION_ROW,
            components: [
                {
                    type: harmony.MessageComponentType.BUTTON,
                    style: harmony.ButtonStyle.LINK,
                    label: "Bot einladen",
                    url:"https://discord.com/api/oauth2/authorize?client_id=706526290181619775&permissions=8&scope=bot%20applications.commands"
                },
                {
                    type: harmony.MessageComponentType.BUTTON,
                    style: harmony.ButtonStyle.LINK,
                    label: "Support Server",
                    url:"https://discord.gg/aDmQrwUBmE"
                },
            ]
        },
        {
            type: harmony.MessageComponentType.ACTION_ROW,
            components: [
                {
                    type: harmony.MessageComponentType.SELECT,
                    customID: 'help-select',
                    options: [{label:"Gewinnspiele erstellen",value:"help-giveaways"},{label:"Eigene Commands erstellen",value:"help-commands"},{label:"Minigames spielen",value:"help-minigames"},{label:"Einladungen zählen",value:"help-invites"},{label:"Nachrichten zählen",value:"help-messages"},{label:"Statistik-Nachrichten erstellen",value:"help-stats"}]
                }
            ]
        }
    ]
    i.respond({
        content: "Hey! Du brauchst Hilfe bei Zetrox? Kein Problem. \nWähle eine Kategorie und wir erklären dir mehr!\nMit /info kannst du dir weitere Infos geben lassen.",
        components: controls
    })
}

export async function helpselect(i:harmony.Interaction, client:harmony.Client){
    if(i.message){
        if(i.isMessageComponent()){
            if(i.values[0]){
                if(i.values[0] == "help-giveaways"){
                    i.respond({
                        embeds:[
                            {
                                "title": ":gift: Giveaways erstellen :gift:",
                                "description": "Mit Zetrox kannst du ganz einfach komplizierte Giveaways\nerstellen und verwalten!",
                                "color": 44469,
                                "fields": [
                                  {
                                    "name": "Komplexe Erstellung",
                                    "value": "Möchtest du bestimmte Bedingungen festlegen, eine Claimtime setzen oder Bypasses einrichten, ist das die beste Möglichkeit dazu. Führe dazu `/giveaway` aus!"
                                  },
                                  {
                                    "name": "Schnelle Erstellung",
                                    "value": "Möchtest du schnellstmöglich und einfach ein Giveaway erstellen, führe `/gstart <Zeit> <Gewinneranzahl> <Preis>` aus!"
                                  },
                                  {
                                    "name": "Drops",
                                    "value": "Wenn du einen Drop erstellen willst (der Erste der auf das Giveaway klickt, kriegt den Preis), musst du `/drop <Preis> <Optional: Gewinneranzahl>` ausführen."
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
                if(i.values[0] == "help-commands"){
                    i.respond({
                        embeds:[
                            {
                                "title": ":keyboard: Eigene Commands erstellen :keyboard:",
                                "description": "Mit Zetrox kannst du ganz einfach deine eigenen Commands\nerstellen!",
                                "color": 44469,
                                "fields": [
                                  {
                                    "name": "Erstellen",
                                    "value": "Um einen eigenen Befehl zu erstellen musst du nur `/customcommand <Name> <Antwort>` ausführen."
                                  },
                                  {
                                    "name": "Variablen",
                                    "value": "Du kannst auch Variablen verwenden!\n{author.name} Name des Nutzers\n{guild.membercount} Anzahl der Leute, die auf dem Server sind\n*Du kannst neue Variablen auf unserem Support Server anfragen*"
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
                if(i.values[0] == "help-minigames"){
                    i.respond({
                        embeds:[
                            {
                                "title": ":game_die: Spiele spielen :game_die:",
                                "description": "Mit Zetrox kannst du spaßige Spiele spielen!\n*Wenn du die Spiele gewinnst, kriegst du Serverweit Punkte. Damit kannst du dann an speziellen Gewinnspielen teilnehmen!*",
                                "color": 44469,
                                "fields": [
                                  {
                                    "name": "Emojiquiz",
                                    "value": "Beim Emojiquiz werden dir verschiedene Emojis gezeigt,\ndie du einem Wort zuordnen musst!\n`/emojiquiz`"
                                  },
                                  {
                                    "name": "Guess the Number",
                                    "value": "Bei Guess the Number geht es darum, eine Zahl zu erraten.\nJe schneller du bist, desto besser ist deine Belohnung!\n`/gtn`"
                                  },
                                  {
                                    "name": "Quiz",
                                    "value": "Beim Quiz geht es darum, knifflige Fragen zu beantworten!\n`/quiz`"
                                  },
                                  {
                                    "name": "Schere Stein Papier",
                                    "value": "Ein spaßiges Duel gegen den Bot oder gegen deinen Freund!\n`/ssp <Optional: User>`"
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
                if(i.values[0] == "help-invites"){
                    i.respond({
                        embeds:[
                            {
                                "title": ":link: Einladungen zählen :link:",
                                "description": "Zetrox kann für dich Einladungen zählen!",
                                "color": 44469,
                                "fields": [
                                  {
                                    "name": "Einladungs-Kanal",
                                    "value": "Du kannst einen Kanal setzen,\nin den hereingeschrieben wird,\nwenn jemand Eingeladen wird.\n`/einstellungen <inviteKanal> <Kanal>`"
                                  },
                                  {
                                    "name": "Einladungen sehen",
                                    "value": "Du kannst dir die Einladungen anderer Benutzer anzeigen lassen!\n`/invites <Optional: Benutzer>`"
                                  },
                                  {
                                    "name": "Leaderboard anzeigen",
                                    "value": "Du kannst dir auch die besten von den besten anzeigen lassen!\n`/lb invites` oder `/leaderboard invites`"
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
                if(i.values[0] == "help-messages"){
                    i.respond({
                        embeds:[
                            {
                                "title": ":link: Nachrichten zählen :link:",
                                "description": "Zetrox kann für dich Nachrichten zählen!",
                                "color": 44469,
                                "fields": [
                                  {
                                    "name": "Nachrichten sehen",
                                    "value": "Du kannst dir die Nachrichten anderer Benutzer anzeigen lassen!\n`/messages <Optional: Benutzer>`"
                                  },
                                  {
                                    "name": "Leaderboard anzeigen",
                                    "value": "Du kannst dir auch die besten von den besten anzeigen lassen!\n`/lb messages` oder `/leaderboard messages`"
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
                if(i.values[0] == "help-stats"){
                    i.respond({
                        embeds:[
                            {
                                "title": ":chart_with_upwards_trend: Statistik Nachricht erstellen :chart_with_upwards_trend:",
                                "description": "Statistik Nachrichten sind Nachrichten, \ndie einmal gesendet werden und sich immer wieder aktualisieren!",
                                "color": 44469,
                                "fields": [
                                  {
                                    "name": "Einladungen",
                                    "value": "In der Nachricht werden hilfreiche \nInformationen zu Einladungen zusammengefasst.\n`/stats add invites` zum hinzufügen,\n`/stats remove invites` zum entfernen."
                                  },
                                  {
                                    "name": "Nachrichten",
                                    "value": "In der Nachricht werden hilfreiche \nInformationen zu Nachrichten zusammengefasst.\n`/stats add messages` zum hinzufügen,\n`/stats remove messages` zum entfernen."
                                  },
                                  {
                                    "name": "Minecraft Server",
                                    "value": "In der Nachricht werden hilfreiche \nInformationen zu einem Minecraft Server zusammengefasst.\n`/stats add mc <IP>` zum hinzufügen,\n`/stats remove mc` zum entfernen."
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
            }
        }
    }
}
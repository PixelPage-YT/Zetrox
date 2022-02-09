import * as harmony from "https://code.harmony.rocks/main"
import {noPerms} from "../util/noPerms.ts"
export async function help(i:harmony.Interaction,client:harmony.Client){
    try{
      const controls: harmony.MessageComponentData[] = [
          {
              type: harmony.MessageComponentType.ACTION_ROW,
              components: [
                  {
                      type: harmony.MessageComponentType.BUTTON,
                      style: harmony.ButtonStyle.LINK,
                      label: "Bot einladen",
                      url:"https://discord.com/api/oauth2/authorize?client_id=706526290181619775&permissions=2953145441&scope=bot%20applications.commands"
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
                      options: [
                        {label:"Gewinnspiele erstellen",value:"help-giveaways",emoji:{name:"🎉"},description:"Erstelle deine Gewinnspiele mit Bedinguen, Bypass & co."},
                        {label:"Minigames spielen",value:"help-minigames",emoji:{name:"🎮"}, description:"Spiele lustige Minispiele (auch Multiplayer)"},
                        {label:"Einladungen zählen",value:"help-invites",emoji:{name:"✉️"}, description:"Zähle die Einladungen von Mitgliedern"},
                        {label:"Nachrichten zählen",value:"help-messages",emoji:{name:"💬"}, description:"Zähle die Nachrichten von Mitgliedern"},
                        {label:"Statistik-Nachrichten erstellen",value:"help-stats",emoji:{name:"📊"}, description:"Erstelle Statistik-Nachrichten, die sich immer updaten"},
                        {label:"Verifizierungssystem einrichten",value:"help-verify",emoji:{name:"🔒"}, description:"Halte deinen Server mit Zetrox sicher"},
                        {label:"TicketSystem erstellen",value:"help-ticket",emoji:{name:"📬"}, description:"Gebe Mitgliedern Hilfe, wenn sie diese brauchen"}
                      ]
                  }
              ]
          }
      ]
      // {label:"Eigene Commands erstellen",value:"help-commands"}
      await i.respond({
          content: "Hey! Du brauchst Hilfe bei Zetrox? Kein Problem. \nWähle eine Kategorie und wir erklären dir mehr!\nMit /info kannst du dir weitere Infos geben lassen.",
          components: controls
      })
    }catch(err){
      noPerms(i);
    }
}

export async function helpselect(i:harmony.Interaction, client:harmony.Client){
  try{
    if(i.message){
        if(i.isMessageComponent()){
            if(i.values[0]){
                if(i.values[0] == "help-giveaways"){
                  /* {
                    "name": "Drops",
                    "value": "Wenn du einen Drop erstellen willst (der Erste der auf das Giveaway klickt, kriegt den Preis), musst du `/drop <Preis> <Optional: Gewinneranzahl>` ausführen."
                  } */
                    await i.respond({
                        embeds:[
                            {
                                "title": ":gift: Giveaways erstellen :gift:",
                                "description": "Mit Zetrox kannst du ganz einfach komplexe Giveaways\nerstellen und verwalten!",
                                "color": 44469,
                                "fields": [
                                  {
                                    "name": "Komplexe Erstellung",
                                    "value": "Möchtest du bestimmte Bedingungen festlegen, eine Claimtime setzen oder Bypasses einrichten, ist das die beste Möglichkeit dazu. Führe dazu `/giveaway <channel>` aus!"
                                  },
                                  {
                                    "name": "Schnelle Erstellung",
                                    "value": "Möchtest du schnellstmöglich und einfach ein Giveaway erstellen, führe `/gstart <Zeit> <Gewinneranzahl> <Preis>` aus!"
                                  },
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
                    await i.respond({
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
                    await i.respond({
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
                    await i.respond({
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
                    await i.respond({
                        embeds:[
                            {
                                "title": ":chart_with_upwards_trend: Statistik Nachricht erstellen :chart_with_upwards_trend:",
                                "description": "Statistik Nachrichten sind Nachrichten, \ndie einmal gesendet werden und sich immer wieder aktualisieren!",
                                "color": 44469,
                                "fields": [
                                  {
                                    "name": "Server-Statistiken",
                                    "value": "In der Nachricht werden hilfreiche \nInformationen zu Einladungen/Nachrichten/Spiele, Mitgliederanzahl und mehr zusammengefasst.\n`/stats server` zum hinzufügen,\nDie Nachricht einfach löschen zum entfernen."
                                  },
                                  {
                                    "name": "Minecraft Server",
                                    "value": "In der Nachricht werden hilfreiche \nInformationen zu einem Minecraft Server zusammengefasst.\n`/stats minecraft <IP>` zum hinzufügen.\nDie Nachricht einfach löschen zum entfernen.\n"
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
                if(i.values[0] == "help-verify"){
                  await i.respond({
                    embeds:[
                      {
                        "title": ":lock: Verifizierungssystem einrichten :lock:",
                        "description": "Mit einem Verifizierungssystem kannst du sicherstellen,\ndass keine Bots auf deinen Server kommen und deinen Server angreifen.",
                        "color": 44469,
                        "fields": [
                          {
                            "name": "Einrichten",
                            "value": "Richte das Verifizierungssystem ganz einfach mit dem Befehl\n`/verifypanel` ein."
                          },
                          {
                            "name": "Löschen",
                            "value": "Wenn du das System eingerichtet hast und unzufrieden bist,\nkannst du es jederzeit mit dem erneuten ausführen von `/verifypanel` löschen."
                          }
                        ],
                        "footer": {
                          "text": "⇢ Zetrox von Folizza Studios",
                          "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                        }
                      }
                    ]
                })
                }else if(i.customID == "help-ticket"){
                  i.respond({
                    "embeds": [
                      {
                        "title": ":mailbox: Supportsystem erstellen :mailbox:",
                        "description": "Mit Zetrox kannst du deinen Mitgliedern ganz einfach direkten Support geben.",
                        "color": 44469,
                        "fields": [
                          {
                            "name": "Einrichten",
                            "value": "Richte das Supportsystem ganz einfach mit dem Befehl\n`/ticketpanel` ein."
                          },
                          {
                            "name": "Teamrolle setzen",
                            "value": "Alle Leute, die diese Rolle haben, können Tickets sehen.\nProbiere dazu `/einstellungen teamrole <Rolle>`"
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
  }catch(err){
    noPerms(i);
}
}
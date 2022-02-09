import * as harmony from "https://code.harmony.rocks/main"
export const commands: harmony.SlashCommandPartial[] = [
    {
        name: "help",
        description: "Hier findest du hilfreiche Infos und Tipps über Zetrox.",
        options: [],
    },
    {
      name: "verifypanel",
      description: "Erstelle ein Verifizierungssystem!",
      options: [],
    },
    {
        name: "messages",
        description: "Zeigt die Nachrichtenanzahl eines Benutzers",
        options: [
            {
                type: 6,
                name: "user",
                description: "Ein bestimmtes Mitglied"
            }
        ]
    },
    {
        name: "invites",
        description: "Zeigt die Einladungsanzahl eines Benutzers",
        options: [
            {
                type: 6,
                name: "user",
                description: "Ein bestimmtes Mitglied"
            }
        ]
    },
    {
      "name": "lb",
      "description": "Zeigt eine Bestenliste.",
      "options": [
        {
          "type": 3,
          "name": "type",
          "description": "Welche Bestenliste angezeigt werden soll.",
          "required": true,
          "choices": [
            {
              "name": "invites",
              "value": "lbinvs"
            },
            {
              "name": "messages",
              "value": "lbmsgs"
            },
            {
              "name": "gamepoints",
              "value": "lbgps"
            }
          ]
        }
      ]
    },
    {
      "name": "leaderboard",
      "description": "Zeigt eine Bestenliste.",
      "options": [
        {
          "type": 3,
          "name": "type",
          "description": "Welche Bestenliste angezeigt werden soll.",
          "required": true,
          "choices": [
            {
              "name": "invites",
              "value": "lbinvs"
            },
            {
              "name": "messages",
              "value": "lbmsgs"
            },
            {
              "name": "gamepoints",
              "value": "lbgps"
            }
          ]
        }
      ]
    },
    {
        "name": "einstellungen",
        "description": "Konfiguriere den Bot nach deinen Wünschen!",
        "options": [
          {
            "type": 1,
            "name": "invitekanal",
            "description": "Setze einen Kanal, in den Wilkommensnachrichten geschrieben werden!",
            "options": [
              {
                "type": 7,
                "name": "channel",
                "description": "der Kanal",
                "required": true
              }
            ]
          },
          {
            "type": 1,
            "name": "antispamtime",
            "description": "Setze eine Zeit, in der nur eine Nachricht zählt.",
            "options": [
              {
                "type": 4,
                "name": "time",
                "description": "Die Zeit in Sekunden",
                "required": true
              }
            ]
          },
          {
            "type": 1,
            "name": "teamrole",
            "description": "Setze eine Rolle, die den Bot steuern darf.",
            "options": [
              {
                "type": 8,
                "name": "role",
                "description": "Die Rolle, die den Bot steuern darf.",
                "required": true
              }
            ]
          }
        ]
    },
    {
      "name": "add",
      "description": "Füge jemandem bestimmte Dinge hinzu!",
      "options": [
        {
          "type": 3,
          "name": "type",
          "description": "Das, was hinzugefügt werden soll.",
          "required": true,
          "choices": [
            {
              "name": "invites",
              "value": "addinvs"
            },
            {
              "name": "messages",
              "value": "addmsgs"
            },
            {
              "name": "gamepoints",
              "value": "addgps"
            }
          ]
        },
        {
          "type": 4,
          "name": "anzahl",
          "description": "Wie viel hinzugefügt werden soll.",
          "required": true
        },
        {
          "type": 6,
          "name": "user",
          "description": "Der Benutzer, dem etwas hinzugefügt werden soll."
        }
      ]
    },
    {
      "name": "remove",
      "description": "Entferne jemandem bestimmte Dinge!",
      "options": [
        {
          "type": 3,
          "name": "type",
          "description": "Das, was entfernt werden soll.",
          "required": true,
          "choices": [
            {
              "name": "invites",
              "value": "removeinvs"
            },
            {
              "name": "messages",
              "value": "removemsgs"
            },
            {
              "name": "gamepoints",
              "value": "removegps"
            }
          ]
        },
        {
          "type": 4,
          "name": "anzahl",
          "description": "Wie viel entfernt werden soll.",
          "required": true
        },
        {
          "type": 6,
          "name": "user",
          "description": "Der Benutzer, dem etwas entfernt werden soll."
        }
      ]
    },
    {
      "name": "gamepoints",
      "description": "Zeigt dir SpielPunkte eines Benutzers an.",
      "options": [
        {
          "type": 6,
          "name": "user",
          "description": "Ein bestimmter Benutzer"
        }
      ]
    },
    {
      "name": "gtn",
      "description": "Errate eine Zahl und bekomme Spielpunkte!"
    },
    {
      "name": "giveaway",
      "description": "Erstelle eine Verlosung!",
      "options": [
        {
          "type": 7,
          "name": "channel",
          "description": "Der Kanal, in dem das Giveaway stattfindet.",
          "required": true
        }
      ]
    },
    {
      "type":"MESSAGE",
      "name":"Rerollen"
    },
    {
      "type":"MESSAGE",
      "name":"Enden lassen"
    },
    {
      "type":"MESSAGE",
      "name":"Teilnehmer anzeigen"
    },
    {
      "name": "info",
      "description": "Erhalte Infos über Zetrox!"
    },
    {
      "name": "emojiquiz",
      "description": "Errate den Begriff anhand von Emojis und bekomme Spielpunkte!"
    },
    {
      "name": "quiz",
      "description": "Beantworte Fragen und bekomme Spielpunkte!"
    },
    {
      "name": "reset",
      "description": "Setze etwas zurück",
      "options": [
        {
          "type": 1,
          "name": "invites",
          "description": "Setze alle Einladungen zurück!",
          "options": []
        },
        {
          "type": 1,
          "name": "messages",
          "description": "Setze alle Nachrichten zurück!",
          "options": []
        },
        {
          "type": 1,
          "name": "gamepoints",
          "description": "Setze alle Spielpunkte zurück!",
          "options": []
        }
      ]
    },
    {
      "name": "ssp",
      "description": "Spiele Schere Stein Papier und erhalte SpielPunkte!",
      "options": [
        {
          "type": 6,
          "name": "user",
          "description": "Der Spieler, gegen den du spielst!"
        }
      ]
    },
    {
      "name": "stats",
      "description": "Generiere coole Statistik-Nachrichten!",
      "options": [
        {
          "type": 1,
          "name": "server",
          "description": "Statistiken für einen gesamten Server",
          "options": []
        },
        {
          "type": 1,
          "name": "minecraft",
          "description": "Statistiken für einen Minecraft Server",
          "options": [
            {
              "type": 3,
              "name": "ip",
              "description": "Die IP des Minecraft Servers",
              "required": true
            }
          ]
        }
      ]
    },
    {
      "name": "gstart",
      "description": "Starte ein Giveaway (Schnell)",
      "options": [
        {
          "type": 3,
          "name": "preis",
          "description": "Der Preis, den der Gewinner erhält.",
          "required": true,
          "choices": []
        },
        {
          "type": 4,
          "name": "gewinneranzahl",
          "description": "Die Anzahl der Personen, die gewinnen können.",
          "required": true,
          "choices": []
        },
        {
          "type": 4,
          "name": "sekunden",
          "description": "Die Anzahl der Sekunden, wie lange ein Giveaway läuft.",
          "choices": []
        },
        {
          "type": 4,
          "name": "minuten",
          "description": "Die Anzahl der Minuten, wie lang das Gewinnspiel läuft",
          "choices": []
        },
        {
          "type": 4,
          "name": "stunden",
          "description": "Die Anzahl der Stunden, wie lang das Gewinnspiel läuft",
          "choices": []
        },
        {
          "type": 4,
          "name": "tage",
          "description": "Die Anzahl der Tage, wie lang das Gewinnspiel läuft",
          "choices": []
        }
      ]
    },
    {
      "name": "8ball",
      "description": "Frage den bot eine Ja/Nein Frage!",
      "options": [
        {
          "type": 3,
          "name": "frage",
          "description": "Die Frage, die du stellst.",
          "required": true
        }
      ]
    },
    {
      "name": "ticketpanel",
      "description": "Erstelle ein Ticket-System für deinen Server!"
    },
    {
      "name": "vote",
      "description": "Vote für Zetrox!"
    }
];

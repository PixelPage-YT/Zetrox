import * as harmony from "https://code.harmony.rocks/main"
export const commands: harmony.SlashCommandPartial[] = [
    {
        name: "help",
        description: "Hier findest du hilfreiche Infos und Tipps über Zetrox.",
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
      "name": "leaderboard",
      "description": "Zeigt Nachrichten/Invites oder GamePoints in einer Rangliste",
      "options": [
        {
          "type": 1,
          "name": "messages",
          "description": "Zeigt Nachrichten in einer Rangliste",
          "options": []
        },
        {
          "type": 1,
          "name": "invites",
          "description": "Zeigt Invites in einer Rangliste",
          "options": []
        },
        {
          "type": 1,
          "name": "gamepoints",
          "description": "Zeigt GamePoints in einer Rangliste",
          "options": []
        }
      ]
    },
    {
      "name": "lb",
      "description": "Zeigt Nachrichten/Invites oder GamePoints in einer Rangliste",
      "options": [
        {
          "type": 1,
          "name": "messages",
          "description": "Zeigt Nachrichten in einer Rangliste",
          "options": []
        },
        {
          "type": 1,
          "name": "invites",
          "description": "Zeigt Invites in einer Rangliste",
          "options": []
        },
        {
          "type": 1,
          "name": "gamepoints",
          "description": "Zeigt GamePoints in einer Rangliste",
          "options": []
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
      "name": "bonus",
      "description": "Verwalte die Bonuspunkte eines Mitgliedes.",
      "options": [
        {
          "type": 2,
          "name": "add",
          "description": "Füge jemandem Bonuspunkte hinzu.",
          "options": [
            {
              "type": 1,
              "name": "messages",
              "description": "Füge jemandem Nachrichten hinzu.",
              "options": [
                {
                  "type": 4,
                  "name": "anzahl",
                  "description": "Die Anzahl der Nachrichten.",
                  "required": true
                },
                {
                  "type": 6,
                  "name": "user",
                  "description": "Der Benutzer, dem die Nachrichten hinzugefügt werden."
                }
              ]
            },
            {
              "type": 1,
              "name": "invites",
              "description": "Füge jemandem Einladungen hinzu.",
              "options": [
                {
                  "type": 4,
                  "name": "anzahl",
                  "description": "Die Anzahl der Einladungen.",
                  "required": true
                },
                {
                  "type": 6,
                  "name": "user",
                  "description": "Der Benutzer, dem die Einladungen hinzugefügt werden."
                }
              ]
            },
            {
              "type": 1,
              "name": "gamepoints",
              "description": "Füge jemandem Spielpunkte hinzu.",
              "options": [
                {
                  "type": 4,
                  "name": "anzahl",
                  "description": "Die Anzahl der Spielpunkte.",
                  "required": true,
                  "choices": []
                },
                {
                  "type": 6,
                  "name": "user",
                  "description": "Der Benutzer, dem die SpielPunkte hinzugefügt werden."
                }
              ]
            }
          ]
        },
        {
          "type": 2,
          "name": "remove",
          "description": "Entferne jemandem BonusPunkte.",
          "options": [
            {
              "type": 1,
              "name": "messages",
              "description": "Entferne jemandem Nachrichten.",
              "options": [
                {
                  "type": 4,
                  "name": "anzahl",
                  "description": "Die Anzahl der Nachrichten.",
                  "required": true
                },
                {
                  "type": 6,
                  "name": "user",
                  "description": "Der Benutzer, dem die Nachrichten entfernt werden."
                }
              ]
            },
            {
              "type": 1,
              "name": "invites",
              "description": "Entferne jemandem Einladungen.",
              "options": [
                {
                  "type": 4,
                  "name": "anzahl",
                  "description": "Die Anzahl der Einladungen.",
                  "required": true
                },
                {
                  "type": 6,
                  "name": "user",
                  "description": "Der Benutzer, dem die Einladungen entfernt werden."
                }
              ]
            },
            {
              "type": 1,
              "name": "gamepoints",
              "description": "Entferne jemandem Spielpunkte.",
              "options": [
                {
                  "type": 4,
                  "name": "anzahl",
                  "description": "Die Anzahl der Spielpunkte.",
                  "required": true
                },
                {
                  "type": 6,
                  "name": "user",
                  "description": "Der Benutzer, dem die SpielPunkte entfernt werden."
                }
              ]
            }
          ]
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
      "name": "einwort",
      "description": "Die Zetrox-Globale Ein-Wort Geschichte!",
      "options": [
        {
          "type": 3,
          "name": "wort",
          "description": "Das Wort, das hinzugefügt werden soll!"
        }
      ]
    }
];
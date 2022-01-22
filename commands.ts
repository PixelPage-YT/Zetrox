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
        name: "leaderboard",
        description: "Zeigt Nachrichten oder Invites in einer Rangliste",
        options: [
            {
                type: 3,
                name: "type",
                description: "invites oder messages",
                required: true
            }
        ]
    },
    {
        name: "lb",
        description: "Zeigt Nachrichten oder Invites in einer Rangliste",
        options: [
            {
                type: 3,
                name: "type",
                description: "invites oder messages",
                required: true
            }
        ]
    }
];
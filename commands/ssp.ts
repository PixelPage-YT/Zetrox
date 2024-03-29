import * as harmony from 'https://code.harmony.rocks/main';
import { modifyGamePoints } from './bonus/gamepoints.ts';
import { noPerms } from '../util/noPerms.ts';
export async function ssp(i: harmony.Interaction, client: harmony.Client) {
    try {
        if (i.member) {
            if (i.guild) {
                if (i.isApplicationCommand()) {
                    if (i.option<string>('user') == undefined) {
                        const choices: string[] = ['schere', 'stein', 'papier'];
                        const computerChoice = randomChoice(choices);
                        const controls: harmony.MessageComponentData[] = [
                            {
                                type: harmony.MessageComponentType.ACTION_ROW,
                                components: [
                                    {
                                        type:
                                            harmony.MessageComponentType.BUTTON,
                                        style: harmony.ButtonStyle.SECONDARY,
                                        customID: 'ssp-schere',
                                        emoji: { name: '✂️' },
                                        label: 'Schere',
                                    },
                                    {
                                        type:
                                            harmony.MessageComponentType.BUTTON,
                                        style: harmony.ButtonStyle.SECONDARY,
                                        customID: 'ssp-stein',
                                        emoji: { name: '🪨' },
                                        label: 'Stein',
                                    },
                                    {
                                        type:
                                            harmony.MessageComponentType.BUTTON,
                                        style: harmony.ButtonStyle.SECONDARY,
                                        customID: 'ssp-papier',
                                        emoji: { name: '📄' },
                                        label: 'Papier',
                                    },
                                ],
                            },
                        ];
                        const question = await await i.respond({
                            embeds: [
                                {
                                    'title':
                                        ':game_die: Schere Stein Papier (Single-Player) :game_die:',
                                    'description':
                                        `*Bitte wähle deinen Gegenstand*`,
                                    'color': 44469,
                                    'footer': {
                                        'text': '⇢ Zetrox von Folizza Studios',
                                        'icon_url':
                                            'https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png',
                                    },
                                },
                            ],
                            components: controls,
                        });
                        const answer1 = await client.waitFor(
                            'interactionCreate',
                            (i2: harmony.Interaction) => {
                                if (
                                    i.member && i2.member && i.channel &&
                                    i2.channel
                                ) {
                                    return i.member.id == i2.member.id &&
                                        i2.channel.id == i.channel.id;
                                }
                                return false;
                            },
                            10000,
                        );
                        let answer: harmony.Interaction | undefined;
                        if (answer1[0]) {
                            answer = answer1[0];
                        }

                        if (answer instanceof harmony.Interaction) {
                            if (answer.isMessageComponent()) {
                                let userChoice: string;
                                if (answer.customID == 'ssp-schere') {
                                    userChoice = 'schere';
                                } else if (answer.customID == 'ssp-stein') {
                                    userChoice = 'stein';
                                } else if (answer.customID == 'ssp-papier') {
                                    userChoice = 'papier';
                                } else {
                                    answer.respond({
                                        content:
                                            '<:icons_Wrong:947468536492752906> Irgendetwas ist schief gelaufen... <:icons_Wrong:947468536492752906>',
                                    });
                                    console.log(
                                        '[Info] SSP: Benutzerauswahl nicht gefunen',
                                    );
                                    return;
                                }

                                if (
                                    checker(userChoice, computerChoice) ==
                                        'gewonnen'
                                ) {
                                    answer.respond({
                                        embeds: [
                                            {
                                                'title':
                                                    ':game_die: Spiel abgeschlossen! :game_die:',
                                                'color': 44469,
                                                'fields': [
                                                    {
                                                        'name': 'Spielstand',
                                                        'value': `
:crown: **${i.member.user.username}** (${userChoice})
:second_place: **Zetrox** (${computerChoice})
`,
                                                    },
                                                    {
                                                        name: 'Deine Belohnung',
                                                        value:
                                                            '20 Spielpunkte <:ZetroCoin:935256569984208917>',
                                                    },
                                                ],
                                                'footer': {
                                                    'text':
                                                        '⇢ Zetrox von Folizza Studios',
                                                    'icon_url':
                                                        'https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png',
                                                },
                                            },
                                        ],
                                    });
                                    question.deleteResponse();
                                    modifyGamePoints(i.member, 20);
                                }
                                if (
                                    checker(userChoice, computerChoice) ==
                                        'verloren'
                                ) {
                                    answer.respond({
                                        embeds: [
                                            {
                                                'title':
                                                    ':game_die: Spiel abgeschlossen! :game_die:',
                                                'color': 44469,
                                                'fields': [
                                                    {
                                                        'name': 'Spielstand',
                                                        'value': `
:crown: **Zetrox** (${computerChoice})
:second_place: **${i.member.user.username}** (${userChoice})
`,
                                                    },
                                                    {
                                                        name: 'Deine Belohnung',
                                                        value:
                                                            '-5 Spielpunkte <:ZetroCoin:935256569984208917>',
                                                    },
                                                ],
                                                'footer': {
                                                    'text':
                                                        '⇢ Zetrox von Folizza Studios',
                                                    'icon_url':
                                                        'https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png',
                                                },
                                            },
                                        ],
                                    });
                                    modifyGamePoints(i.member, -5);
                                }
                                if (
                                    checker(userChoice, computerChoice) ==
                                        'unentschieden'
                                ) {
                                    answer.respond({
                                        embeds: [
                                            {
                                                'title':
                                                    ':game_die: Spiel abgeschlossen! :game_die:',
                                                'color': 44469,
                                                'fields': [
                                                    {
                                                        'name': 'Spielstand',
                                                        'value': `
:crown: **${i.member.user.username}** (${userChoice})
:crown: **Zetrox** (${computerChoice})
*Unentschieden*
`,
                                                    },
                                                ],
                                                'footer': {
                                                    'text':
                                                        '⇢ Zetrox von Folizza Studios',
                                                    'icon_url':
                                                        'https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png',
                                                },
                                            },
                                        ],
                                    });
                                }
                            }
                        } else {
                            await i.channel?.send({
                                content:
                                    '<:icons_Wrong:947468536492752906> Bitte antworte innerhalb 10 Sekunden <:icons_Wrong:947468536492752906>',
                            });
                        }
                    } else if (i.option<string>('user') != undefined) {
                        if (i.guild) {
                            let member = await i.guild.members.get(
                                i.option<harmony.User>('user').id,
                            );
                            if (member == undefined) {
                                member = await i.guild.members.resolve(
                                    i.option<harmony.User>('user').id,
                                );
                            }
                            if (member != undefined) {
                                const controls: harmony.MessageComponentData[] =
                                    [
                                        {
                                            type: harmony.MessageComponentType
                                                .ACTION_ROW,
                                            components: [
                                                {
                                                    type: harmony
                                                        .MessageComponentType
                                                        .BUTTON,
                                                    style: harmony.ButtonStyle
                                                        .SECONDARY,
                                                    customID: 'ssp-yes',
                                                    label: 'Annehmen',
                                                    emoji: { name: '✅' },
                                                },
                                            ],
                                        },
                                    ];
                                const question = await await i.respond({
                                    content: member.user.mention + '\n**' +
                                        i.member.user.username +
                                        '** sendet dir eine Anfrage zum Spielen von __Schere, Stein, Papier__.\nNimmst du de Herausforderung an?',
                                    components: controls,
                                });
                                const answer1 = await client.waitFor(
                                    'interactionCreate',
                                    (i2: harmony.Interaction) => {
                                        if (
                                            (i2.isMessageComponent() &&
                                                i2.customID == 'ssp-yes') &&
                                            member && i2.member && i.channel &&
                                            i2.channel
                                        ) {
                                            return member.id == i2.member.id &&
                                                i2.channel.id == i.channel.id;
                                        }
                                        return false;
                                    },
                                    30000,
                                );
                                let answer: harmony.Interaction | undefined;
                                if (answer1[0]) {
                                    answer = answer1[0];
                                }
                                if (answer instanceof harmony.Interaction) {
                                    if (answer.isMessageComponent()) {
                                        if (answer.customID == 'ssp-yes') {
                                            // GAME START
                                            const controls:
                                                harmony.MessageComponentData[] =
                                                    [
                                                        {
                                                            type: harmony
                                                                .MessageComponentType
                                                                .ACTION_ROW,
                                                            components: [
                                                                {
                                                                    type:
                                                                        harmony
                                                                            .MessageComponentType
                                                                            .BUTTON,
                                                                    style:
                                                                        harmony
                                                                            .ButtonStyle
                                                                            .SECONDARY,
                                                                    customID:
                                                                        'ssp-schere',
                                                                    emoji: {
                                                                        name:
                                                                            '✂️',
                                                                    },
                                                                    label:
                                                                        'Schere',
                                                                },
                                                                {
                                                                    type:
                                                                        harmony
                                                                            .MessageComponentType
                                                                            .BUTTON,
                                                                    style:
                                                                        harmony
                                                                            .ButtonStyle
                                                                            .SECONDARY,
                                                                    customID:
                                                                        'ssp-stein',
                                                                    emoji: {
                                                                        name:
                                                                            '🪨',
                                                                    },
                                                                    label:
                                                                        'Stein',
                                                                },
                                                                {
                                                                    type:
                                                                        harmony
                                                                            .MessageComponentType
                                                                            .BUTTON,
                                                                    style:
                                                                        harmony
                                                                            .ButtonStyle
                                                                            .SECONDARY,
                                                                    customID:
                                                                        'ssp-papier',
                                                                    emoji: {
                                                                        name:
                                                                            '📄',
                                                                    },
                                                                    label:
                                                                        'Papier',
                                                                },
                                                            ],
                                                        },
                                                    ];
                                            const question = await answer
                                                ?.respond({
                                                    embeds: [
                                                        {
                                                            'title':
                                                                ':game_die: Schere Stein Papier (Multi-Player) :game_die:',
                                                            'description':
                                                                `*Bitte wählt eure Gegenstände*`,
                                                            'color': 44469,
                                                            'footer': {
                                                                'text':
                                                                    '⇢ Zetrox von Folizza Studios',
                                                                'icon_url':
                                                                    'https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png',
                                                            },
                                                        },
                                                    ],
                                                    components: controls,
                                                });

                                            // ERSTE ABFRAGE
                                            let ownchoice = '';
                                            let enemychoice = '';
                                            const answer1 = await client
                                                .waitFor(
                                                    'interactionCreate',
                                                    (
                                                        i2: harmony.Interaction,
                                                    ) => {
                                                        if (
                                                            (i2.isMessageComponent() &&
                                                                ((i2.customID ==
                                                                    'ssp-schere') ||
                                                                    (i2.customID ==
                                                                        'ssp-stein') ||
                                                                    (i2.customID ==
                                                                        'ssp-papier'))) &&
                                                            i.member &&
                                                            i2.member &&
                                                            i.channel &&
                                                            i2.channel
                                                        ) {
                                                            return (i.member
                                                                        .id ==
                                                                    i2.member
                                                                        .id &&
                                                                i2.channel.id ==
                                                                    i.channel
                                                                        .id) ||
                                                                (member?.id ==
                                                                        i2.member
                                                                            .id &&
                                                                    i2.channel
                                                                            .id ==
                                                                        i.channel
                                                                            .id);
                                                        }
                                                        return false;
                                                    },
                                                    10000,
                                                );
                                            if (answer1[0]) {
                                                answer = answer1[0];
                                            }

                                            if (
                                                answer instanceof
                                                    harmony.Interaction
                                            ) {
                                                if (
                                                    answer.isMessageComponent()
                                                ) {
                                                    // 0 = own
                                                    let firstchoice = 0;
                                                    // 1 = enemy
                                                    if (
                                                        answer.member &&
                                                        answer.member.id ==
                                                            i.member.id
                                                    ) {
                                                        firstchoice = 0;
                                                        if (
                                                            answer.customID ==
                                                                'ssp-schere'
                                                        ) {
                                                            ownchoice =
                                                                'schere';
                                                        } else if (
                                                            answer.customID ==
                                                                'ssp-stein'
                                                        ) {
                                                            ownchoice = 'stein';
                                                        } else if (
                                                            answer.customID ==
                                                                'ssp-papier'
                                                        ) {
                                                            ownchoice =
                                                                'papier';
                                                        } else {
                                                            answer.respond({
                                                                content:
                                                                    '<:icons_Wrong:947468536492752906> Irgendetwas ist schief gelaufen... <:icons_Wrong:947468536492752906>',
                                                            });
                                                            console.log(
                                                                '[Info] SSP: Benutzerauswahl nicht gefunen',
                                                            );
                                                            return;
                                                        }
                                                    }

                                                    if (
                                                        answer.member &&
                                                        answer.member.id ==
                                                            member.id
                                                    ) {
                                                        firstchoice = 1;
                                                        if (
                                                            answer.customID ==
                                                                'ssp-schere'
                                                        ) {
                                                            enemychoice =
                                                                'schere';
                                                        } else if (
                                                            answer.customID ==
                                                                'ssp-stein'
                                                        ) {
                                                            enemychoice =
                                                                'stein';
                                                        } else if (
                                                            answer.customID ==
                                                                'ssp-papier'
                                                        ) {
                                                            enemychoice =
                                                                'papier';
                                                        } else {
                                                            answer.respond({
                                                                content:
                                                                    '<:icons_Wrong:947468536492752906> Irgendetwas ist schief gelaufen... <:icons_Wrong:947468536492752906>',
                                                            });
                                                            console.log(
                                                                '[Info] SSP: Benutzerauswahl nicht gefunen',
                                                            );
                                                            return;
                                                        }
                                                    }
                                                    answer?.respond({
                                                        content:
                                                            '<:icons_Correct:947467655630164038> Du hast den Gegenstand erfolgreich ausgewählt! <:icons_Correct:947467655630164038>',
                                                        ephemeral: true,
                                                    });
                                                    // ZWEITE ABFRAGE
                                                    const answer1 = await client
                                                        .waitFor(
                                                            'interactionCreate',
                                                            (
                                                                i2: harmony.Interaction,
                                                            ) => {
                                                                if (
                                                                    firstchoice ==
                                                                        0
                                                                ) {
                                                                    if (
                                                                        (i2.isMessageComponent() &&
                                                                            ((i2.customID ==
                                                                                'ssp-schere') ||
                                                                                (i2.customID ==
                                                                                    'ssp-stein') ||
                                                                                (i2.customID ==
                                                                                    'ssp-papier'))) &&
                                                                        i.member &&
                                                                        i2.member &&
                                                                        i.channel &&
                                                                        i2.channel
                                                                    ) {
                                                                        return member
                                                                                    ?.id ==
                                                                                i2.member
                                                                                    .id &&
                                                                            i2.channel
                                                                                    .id ==
                                                                                i.channel
                                                                                    .id;
                                                                    }
                                                                } else if (
                                                                    (i2.isMessageComponent() &&
                                                                        ((i2.customID ==
                                                                            'ssp-schere') ||
                                                                            (i2.customID ==
                                                                                'ssp-stein') ||
                                                                            (i2.customID ==
                                                                                'ssp-papier'))) &&
                                                                    firstchoice ==
                                                                        1
                                                                ) {
                                                                    if (
                                                                        i.member &&
                                                                        i2.member &&
                                                                        i.channel &&
                                                                        i2.channel
                                                                    ) {
                                                                        return i
                                                                                    .member
                                                                                    .id ==
                                                                                i2.member
                                                                                    .id &&
                                                                            i2.channel
                                                                                    .id ==
                                                                                i.channel
                                                                                    .id;
                                                                    }
                                                                }
                                                                return false;
                                                            },
                                                            10000,
                                                        );
                                                    if (answer1[0]) {
                                                        answer = answer1[0];
                                                    }

                                                    if (
                                                        answer instanceof
                                                            harmony.Interaction
                                                    ) {
                                                        if (
                                                            answer
                                                                .isMessageComponent()
                                                        ) {
                                                            // 0 = own
                                                            // 1 = enemy
                                                            if (
                                                                answer.member &&
                                                                answer.member
                                                                        .id ==
                                                                    i.member.id
                                                            ) {
                                                                if (
                                                                    answer
                                                                        .customID ==
                                                                        'ssp-schere'
                                                                ) {
                                                                    ownchoice =
                                                                        'schere';
                                                                } else if (
                                                                    answer
                                                                        .customID ==
                                                                        'ssp-stein'
                                                                ) {
                                                                    ownchoice =
                                                                        'stein';
                                                                } else if (
                                                                    answer
                                                                        .customID ==
                                                                        'ssp-papier'
                                                                ) {
                                                                    ownchoice =
                                                                        'papier';
                                                                } else {
                                                                    answer
                                                                        .respond(
                                                                            {
                                                                                content:
                                                                                    '<:icons_Wrong:947468536492752906> Irgendetwas ist schief gelaufen... <:icons_Wrong:947468536492752906>',
                                                                            },
                                                                        );
                                                                    console.log(
                                                                        '[Info] SSP: Benutzerauswahl nicht gefunen',
                                                                    );
                                                                    return;
                                                                }
                                                            }

                                                            if (
                                                                answer.member &&
                                                                answer.member
                                                                        .id ==
                                                                    member.id
                                                            ) {
                                                                if (
                                                                    answer
                                                                        .customID ==
                                                                        'ssp-schere'
                                                                ) {
                                                                    enemychoice =
                                                                        'schere';
                                                                } else if (
                                                                    answer
                                                                        .customID ==
                                                                        'ssp-stein'
                                                                ) {
                                                                    enemychoice =
                                                                        'stein';
                                                                } else if (
                                                                    answer
                                                                        .customID ==
                                                                        'ssp-papier'
                                                                ) {
                                                                    enemychoice =
                                                                        'papier';
                                                                } else {
                                                                    answer
                                                                        .respond(
                                                                            {
                                                                                content:
                                                                                    '<:icons_Wrong:947468536492752906> Irgendetwas ist schief gelaufen... <:icons_Wrong:947468536492752906>',
                                                                            },
                                                                        );
                                                                    console.log(
                                                                        '[Info] SSP: Benutzerauswahl nicht gefunen',
                                                                    );
                                                                    return;
                                                                }
                                                            }
                                                            if (
                                                                checker(
                                                                    ownchoice,
                                                                    enemychoice,
                                                                ) == 'gewonnen'
                                                            ) {
                                                                answer.respond({
                                                                    embeds: [
                                                                        {
                                                                            'title':
                                                                                ':game_die: Spiel abgeschlossen! :game_die:',
                                                                            'color':
                                                                                44469,
                                                                            'fields':
                                                                                [
                                                                                    {
                                                                                        'name':
                                                                                            `Spielstand`,
                                                                                        'value':
                                                                                            `
:crown: **${i.member.user.username}** (${ownchoice})
:second_place: **${member.user.username}** (${enemychoice})
`,
                                                                                    },
                                                                                    {
                                                                                        name:
                                                                                            'Belohnungen',
                                                                                        value:
                                                                                            `
**${i.member.user.username}** 20 SpielPunkte <:ZetroCoin:935256569984208917>
**${member.user.username}** -10 Spielpunkte <:ZetroCoin:935256569984208917>
`,
                                                                                    },
                                                                                ],
                                                                            'footer':
                                                                                {
                                                                                    'text':
                                                                                        '⇢ Zetrox von Folizza Studios',
                                                                                    'icon_url':
                                                                                        'https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png',
                                                                                },
                                                                        },
                                                                    ],
                                                                });
                                                                modifyGamePoints(
                                                                    i.member,
                                                                    20,
                                                                );
                                                                modifyGamePoints(
                                                                    member,
                                                                    -10,
                                                                );
                                                            }
                                                            if (
                                                                checker(
                                                                    ownchoice,
                                                                    enemychoice,
                                                                ) == 'verloren'
                                                            ) {
                                                                answer.respond({
                                                                    embeds: [
                                                                        {
                                                                            'title':
                                                                                ':game_die: Spiel abgeschlossen! :game_die:',
                                                                            'color':
                                                                                44469,
                                                                            'fields':
                                                                                [
                                                                                    {
                                                                                        'name':
                                                                                            `Spielstand`,
                                                                                        'value':
                                                                                            `
:crown: **${member.user.username}** (${enemychoice})
:second_place: **${i.member.user.username}** (${ownchoice})
`,
                                                                                    },
                                                                                    {
                                                                                        name:
                                                                                            'Belohnungen',
                                                                                        value:
                                                                                            `
**${member.user.username}** 20 SpielPunkte <:ZetroCoin:935256569984208917>
**${i.member.user.username}** -10 Spielpunkte <:ZetroCoin:935256569984208917>
`,
                                                                                    },
                                                                                ],
                                                                            'footer':
                                                                                {
                                                                                    'text':
                                                                                        '⇢ Zetrox von Folizza Studios',
                                                                                    'icon_url':
                                                                                        'https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png',
                                                                                },
                                                                        },
                                                                    ],
                                                                });
                                                                modifyGamePoints(
                                                                    i.member,
                                                                    -10,
                                                                );
                                                                modifyGamePoints(
                                                                    member,
                                                                    20,
                                                                );
                                                            }
                                                            if (
                                                                checker(
                                                                    ownchoice,
                                                                    enemychoice,
                                                                ) ==
                                                                    'unentschieden'
                                                            ) {
                                                                answer.respond({
                                                                    embeds: [
                                                                        {
                                                                            'title':
                                                                                ':game_die: Spiel abgeschlossen! :game_die:',
                                                                            'color':
                                                                                44469,
                                                                            'fields':
                                                                                [
                                                                                    {
                                                                                        'name':
                                                                                            `Spielstand`,
                                                                                        'value':
                                                                                            `
:crown: **${i.member.user.username}** (${ownchoice})
:crown: **${member.user.username}** (${enemychoice})
`,
                                                                                    },
                                                                                    {
                                                                                        name:
                                                                                            'Belohnungen',
                                                                                        value:
                                                                                            `
**${i.member.user.username}** 0 SpielPunkte <:ZetroCoin:935256569984208917>
**${member.user.username}** 0 Spielpunkte <:ZetroCoin:935256569984208917>
`,
                                                                                    },
                                                                                ],
                                                                            'footer':
                                                                                {
                                                                                    'text':
                                                                                        '⇢ Zetrox von Folizza Studios',
                                                                                    'icon_url':
                                                                                        'https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png',
                                                                                },
                                                                        },
                                                                    ],
                                                                });
                                                            }
                                                            if (
                                                                question.message
                                                            ) {
                                                                question
                                                                    .deleteMessage(
                                                                        question
                                                                            .message,
                                                                    );
                                                            }
                                                        }
                                                    } else {
                                                        await i.channel?.send({
                                                            content:
                                                                '<:icons_Wrong:947468536492752906> Bitte antworte innerhalb 10 Sekunden <:icons_Wrong:947468536492752906>',
                                                        });
                                                    }
                                                }
                                            } else {
                                                await i.channel?.send({
                                                    content:
                                                        '<:icons_Wrong:947468536492752906> Bitte antworte innerhalb 10 Sekunden <:icons_Wrong:947468536492752906>',
                                                });
                                            }
                                        }
                                    }
                                } else {
                                    await i.channel?.send({
                                        content:
                                            '<:icons_Wrong:947468536492752906> **' +
                                            member.user.username +
                                            '** hat die Herausforderung nicht angenommen.',
                                    });
                                }
                                if (question.message) {
                                    question.deleteMessage(question.message);
                                }
                            }
                        }
                    }
                }
            }
        }
    } catch (err) {
        console.log(err);
        noPerms(i);
    }
}

function checker(human: string, computer: string) {
    const choicesObject: any = {
        'stein': {
            'stein': 'unentschieden',
            'schere': 'gewonnen',
            'papier': 'verloren',
        },
        'schere': {
            'stein': 'verloren',
            'schere': 'unentschieden',
            'papier': 'gewonnen',
        },
        'papier': {
            'stein': 'gewonnen',
            'schere': 'verloren',
            'papier': 'unentschieden',
        },
    };
    return choicesObject[human][computer];
}

function randomChoice(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

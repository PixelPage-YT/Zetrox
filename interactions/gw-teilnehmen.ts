import * as harmony from 'https://code.harmony.rocks/main/mod.ts';
import { database, saveDatabase } from '../util/database.ts';
import { noPerms } from '../util/noPerms.ts';
import { giveaway_database } from '../util/types.ts';
export async function gwTeilnehmen(i: harmony.Interaction) {
    try {
        await i.respond({
            content: ':page_facing_up: Bitte warte kurz...',
            ephemeral: true,
        });
        if (i.member && i.guild && i.message) {
            const giveawaydb: giveaway_database = database('giveaways.json');
            let index = 0;
            let isthere = 0;
            for (const giveaway of giveawaydb.giveaways) {
                if (giveaway.msgid == i.message.id) {
                    if (i.member != undefined) {
                        if (
                            (giveaway.start && giveaway.start < Date.now()) ||
                            (giveaway.start == undefined)
                        ) {
                            const member = i.member;
                            if (
                                giveaway.users.findIndex((user: string) =>
                                    user === member.id
                                ) == -1
                            ) {
                                let check = false;
                                if (giveaway.reqs) {
                                    const reqs: {
                                        type: string;
                                        value: string | number;
                                    }[] = giveaway.reqs;
                                    let fills = 0;
                                    for (const req of reqs) {
                                        if (
                                            req.type == 'messages' &&
                                            typeof req.value == 'number'
                                        ) {
                                            const messagedb = database(
                                                'messages.json',
                                            );
                                            if (messagedb[i.guild.id]) {
                                                if (
                                                    messagedb[i.guild.id][
                                                        i.member.id
                                                    ]
                                                ) {
                                                    if (
                                                        messagedb[i.guild.id][
                                                            i.member.id
                                                        ].count >
                                                            (req.value - 1)
                                                    ) {
                                                        fills++;
                                                    }
                                                }
                                            }
                                        }
                                        if (req.type == 'invites') {
                                            const messagedb = database(
                                                'invites.json',
                                            );
                                            if (messagedb[i.guild.id]) {
                                                if (
                                                    messagedb[i.guild.id][
                                                        i.member.id
                                                    ]
                                                ) {
                                                    if (
                                                        messagedb[i.guild.id][
                                                            i.member.id
                                                        ].count >= req.value
                                                    ) {
                                                        fills++;
                                                    }
                                                }
                                            }
                                        }
                                        if (req.type == 'gamepoints') {
                                            const messagedb = database(
                                                'gamePoints.json',
                                            );
                                            if (messagedb[i.guild.id]) {
                                                if (
                                                    messagedb[i.guild.id][
                                                        i.member.id
                                                    ]
                                                ) {
                                                    if (
                                                        messagedb[i.guild.id][
                                                            i.member.id
                                                        ].count >= req.value
                                                    ) {
                                                        fills++;
                                                    }
                                                }
                                            }
                                        }
                                        if (req.type == 'role') {
                                            if (
                                                (await i.member.roles.array())
                                                    .findIndex((index) =>
                                                        index.id === req.value
                                                    ) != -1
                                            ) {
                                                fills++;
                                            }
                                        }
                                        if (req.type == 'other') {
                                            fills++;
                                        }
                                        index++;
                                    }
                                    if (fills == reqs.length) {
                                        check = true;
                                    }
                                } else {
                                    check = true;
                                }
                                if (check == false) {
                                    if (giveaway.bypass) {
                                        if (giveaway.bypass.type == 'role') {
                                            if (
                                                (await i.member.roles.array())
                                                    .findIndex((index) =>
                                                        index.id ===
                                                            giveaway.bypass
                                                                ?.value
                                                    ) != -1
                                            ) {
                                                check = true;
                                            }
                                        }
                                    }
                                }
                                if (check == true) {
                                    giveawaydb.giveaways[index].users.push(
                                        i.member.id,
                                    );
                                    saveDatabase('giveaways.json', giveawaydb);
                                    const controls:
                                        harmony.MessageComponentData[] = [
                                            {
                                                type:
                                                    harmony.MessageComponentType
                                                        .ACTION_ROW,
                                                components: [
                                                    {
                                                        type: harmony
                                                            .MessageComponentType
                                                            .BUTTON,
                                                        style:
                                                            harmony.ButtonStyle
                                                                .BLURPLE,
                                                        customID:
                                                            'gw-teilnehmen',
                                                        label: '(' +
                                                            giveaway.users
                                                                .length
                                                                .toString() +
                                                            ') Teilnehmen',
                                                        emoji: { name: '🎁' },
                                                    },
                                                ],
                                            },
                                        ];
                                    await i.message.edit({
                                        components: controls,
                                    });
                                    await i.editResponse({
                                        content:
                                            '✅ Du hast erfolgreich teilgenommen! ✅',
                                        flags: harmony.InteractionResponseFlags
                                            .EPHEMERAL,
                                    });
                                } else {
                                    await i.editResponse({
                                        ephemeral: true,
                                        content:
                                            '<:icons_Wrong:947468536492752906> **Du erfüllst die Anforderungen nicht!** <:icons_Wrong:947468536492752906>',
                                    });
                                    return;
                                }
                            } else {
                                let index5 = 0;
                                for (const user of giveaway.users) {
                                    if (user == i.user.id) {
                                        giveawaydb.giveaways[index].users
                                            .splice(index5);
                                    }
                                    index5++;
                                }
                                saveDatabase('giveaways.json', giveawaydb);
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
                                                        .BLURPLE,
                                                    customID: 'gw-teilnehmen',
                                                    label: '(' +
                                                        giveaway.users.length
                                                            .toString() +
                                                        ') Teilnehmen',
                                                    emoji: { name: '🎁' },
                                                },
                                            ],
                                        },
                                    ];
                                await i.message.edit({ components: controls });
                                await i.editResponse({
                                    content:
                                        '✅ Du hast dich erfolgreich ausgetragen! ✅',
                                    ephemeral: true,
                                });
                                return;
                            }
                        } else {
                            await i.editResponse({
                                content:
                                    '⛔️ Die Verlosung hat noch nicht gestartet! ⛔️',
                                ephemeral: true,
                            });
                        }
                    }
                }
                isthere = 1;
                index++;
            }
            if (isthere == 0) {
                await i.editResponse({
                    content: '⛔️ Diese Verlosung existiert nicht! ⛔️',
                    ephemeral: true,
                });
            }
        }
    } catch (err) {
        console.log(err);
        noPerms(i);
    }
}

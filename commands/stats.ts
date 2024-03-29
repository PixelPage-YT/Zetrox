import * as harmony from 'https://code.harmony.rocks/main';

import { database, saveDatabase } from '../util/database.ts';

import { isAuthorized } from '../util/isAuthorized.ts';
import { noPerms } from '../util/noPerms.ts';
import { askInteraction } from '../util/askInteraction.ts';
export async function serverStats(i: harmony.Interaction) {
    try {
        if (!(await isAuthorized(i.member))) {
            await i.respond({
                content:
                    '<:icons_Wrong:947468536492752906> Du hast dazu keine Rechte! <:icons_Wrong:947468536492752906>',
                ephemeral: true,
            });
            return;
        }
        if (i.isApplicationCommand()) {
            const statdb = database('stats.json');
            let currentcount = 0;
            for (const stat of statdb.data) {
                if (stat.guild == i.guild?.id) {
                    currentcount++;
                }
            }
            if (currentcount < 2 && i.guild) {
                try {
                    const msg = await i.channel?.send({
                        embeds: [
                            {
                                'title': 'Wird generiert...',
                                'description':
                                    'Bitte warte einen kurzen Augenblick!',
                                'color': 44469,
                                'author': {
                                    'name': 'Server Statistiken',
                                    'icon_url':
                                        'https://cdn.discordapp.com/emojis/866943907698180137.webp?size=128&quality=lossless',
                                },
                                'footer': {
                                    'text': '⇢ Zetrox von Folizza Studios',
                                    'icon_url':
                                        'https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png',
                                },
                            },
                        ],
                    });
                    if (msg && i.channel) {
                        statdb.data.push({
                            guild: i.guild.id,
                            type: 'server',
                            msg: msg.id,
                            channel: i.channel.id,
                        });
                        saveDatabase('stats.json', statdb);
                        await i.respond({
                            content:
                                '<:icons_Correct:947467655630164038> Erfolgreich eingerichtet! <:icons_Correct:947467655630164038>',
                            ephemeral: true,
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
            } else {
                await i.respond({
                    content:
                        '<:icons_Wrong:947468536492752906> Du kannst nur 2 Statistik-Nachrichten pro Server erstellen!',
                });
            }
        }
    } catch (err) {
        console.log(err);
        noPerms(i);
    }
}

export async function minecraftStats(i: harmony.Interaction) {
    try {
        if (!(await isAuthorized(i.member))) {
            await i.respond({
                content:
                    '<:icons_Wrong:947468536492752906> Du hast dazu keine Rechte! <:icons_Wrong:947468536492752906>',
                ephemeral: true,
            });
            return;
        }
        if (i.isApplicationCommand()) {
            if (i.option<string>('ip')) {
                const ip = i.option<string>('ip');
                const statdb = database('stats.json');
                let currentcount = 0;
                for (const stat of statdb.data) {
                    if (stat.guild == i.guild?.id) {
                        currentcount++;
                    }
                }
                if (currentcount < 2 && i.guild) {
                    try {
                        const msg = await i.channel?.send({
                            embeds: [
                                {
                                    'title': 'Wird generiert...',
                                    'description':
                                        'Bitte warte einen kurzen Augenblick!',
                                    'color': 44469,
                                    'author': {
                                        'name': 'Minecraft-Server Statistiken',
                                        'icon_url':
                                            'https://emoji.gg/assets/emoji/8246-apple.png',
                                    },
                                    'footer': {
                                        'text': '⇢ Zetrox von Folizza Studios',
                                        'icon_url':
                                            'https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png',
                                    },
                                },
                            ],
                        });
                        if (msg && i.channel) {
                            statdb.data.push({
                                guild: i.guild.id,
                                type: 'minecraft',
                                ip: ip,
                                msg: msg.id,
                                channel: i.channel.id,
                            });
                            saveDatabase('stats.json', statdb);
                            await i.respond({
                                content:
                                    '<:icons_Correct:947467655630164038> Erfolgreich eingerichtet! <:icons_Correct:947467655630164038>',
                                ephemeral: true,
                            });
                        }
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    await i.respond({
                        content:
                            '<:icons_Wrong:947468536492752906> Du kannst nur 2 Statistik-Nachrichten pro Server erstellen!',
                    });
                }
            }
        }
    } catch (err) {
        console.log(err);
        noPerms(i);
    }
}

export async function deleteStats(
    i: harmony.Interaction,
    client: harmony.Client,
) {
    try {
        if (i.guild && i.member && i.channel) {
            const controls: harmony.MessageComponentData[] = [
                {
                    type: harmony.MessageComponentType.ACTION_ROW,
                    components: [
                        {
                            type: harmony.MessageComponentType.BUTTON,
                            style: harmony.ButtonStyle.DANGER,
                            customID: 'st-yes',
                            emoji: { name: '✅' },
                            label: 'Ja',
                        },
                        {
                            type: harmony.MessageComponentType.BUTTON,
                            style: harmony.ButtonStyle.SECONDARY,
                            customID: 'st-no',
                            emoji: { name: '🚫' },
                            label: 'Nein',
                        },
                    ],
                },
            ];
            await i.respond({
                content:
                    '** :question: Bist du dir sicher? :question: **\n*Dies wird alle deine Statistik Nachrichten ungeupdatet lassen!*',
                components: controls,
            });
            const answer = await askInteraction(client, i, 10000, [
                'st-yes',
                'st-no',
            ]);
            if (answer != undefined) {
                if (
                    answer.isMessageComponent() && answer.customID == 'st-yes'
                ) {
                    const statdb = database('stats.json');
                    let index = 0;
                    for (const stat of statdb.data) {
                        if (stat.guild == i.guild?.id) {
                            statdb.data.splice(index);
                        }
                        index++;
                    }
                    saveDatabase('stats.json', statdb);
                    await answer.respond({
                        content: '✅ **Erfolgreich gelöscht** ✅',
                    });
                } else {
                    await answer.respond({ content: '✅ **Abgebrochen** ✅' });
                }
            } else {
                await i.channel.send({ content: '✅ **Abgebrochen** ✅' });
            }
        }
    } catch (err) {
        console.log(err);
        noPerms(i);
    }
}

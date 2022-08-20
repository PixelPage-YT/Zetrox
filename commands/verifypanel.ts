import * as harmony from 'https://code.harmony.rocks/main';
import { database, saveDatabase } from '../util/database.ts';
import { isAuthorized } from '../util/isAuthorized.ts';
import { noPerms } from '../util/noPerms.ts';
import { askInteraction } from '../util/askInteraction.ts';
import { askMessage } from '../util/askMessage.ts';
export async function verifypanel(
    i: harmony.Interaction,
    client: harmony.Client,
) {
    try {
        if (!(await isAuthorized(i.member))) {
            await i.respond({
                content:
                    '<:icons_Wrong:947468536492752906> Du hast dazu keine Rechte! <:icons_Wrong:947468536492752906>',
                ephemeral: true,
            });
            return;
        }
        if (i.isApplicationCommand() && i.guild && i.member && i.channel) {
            const verifydb = database('verify.json');
            if (verifydb[i.guild.id]) {
                const controls: harmony.MessageComponentData[] = [
                    {
                        type: harmony.MessageComponentType.ACTION_ROW,
                        components: [
                            {
                                type: harmony.MessageComponentType.BUTTON,
                                style: harmony.ButtonStyle.DANGER,
                                customID: 'verify-delete',
                                emoji: { name: '🗑' },
                                label: 'Löschen',
                            },
                            {
                                type: harmony.MessageComponentType.BUTTON,
                                style: harmony.ButtonStyle.SECONDARY,
                                customID: 'verify-no',
                                emoji: { name: '🛑' },
                                label: 'Abbrechen',
                            },
                        ],
                    },
                ];
                const question = await await i.respond({
                    embeds: [
                        {
                            'title':
                                '<:icons_Wrong:947468536492752906> Du hast bereits ein Verifizierungssystem <:icons_Wrong:947468536492752906>',
                            'description':
                                'Du kannst nur ein Verifizierungssystem pro Server haben.\n__Möchtest du das aktuelle löschen?__',
                            'color': 16734309,
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
                        if (i.member && i2.member && i.channel && i2.channel) {
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
                        if (answer.customID == 'verify-delete') {
                            let channel = await client.channels.get(
                                verifydb[i.guild.id].channel,
                            );
                            if (channel == undefined) {
                                channel = await client.channels.resolve(
                                    verifydb[i.guild.id].channel,
                                );
                            }
                            if (channel != undefined && channel.isText()) {
                                let message = await channel.messages.get(
                                    verifydb[i.guild.id].message,
                                );
                                if (message == undefined) {
                                    message = await channel.messages.resolve(
                                        verifydb[i.guild.id].message,
                                    );
                                }
                                if (message != undefined) {
                                    message.delete();
                                }
                            }
                            delete verifydb[i.guild.id];
                            saveDatabase('verify.json', verifydb);
                            question.editResponse({
                                components: [],
                                embeds: [
                                    {
                                        'title':
                                            ':ballot_box_with_check: Verifizierungssystem gelöscht :ballot_box_with_check:',
                                        'description':
                                            'Wir haben dein Verifizierungssystem gelöscht.\n__Wenn du ein neues System erstellen möchtest,__\n__führe den Befehl erneut aus!__',
                                        'color': 44469,
                                        'footer': {
                                            'text':
                                                '⇢ Zetrox von Folizza Studios',
                                            'icon_url':
                                                'https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png',
                                        },
                                    },
                                ],
                            });
                        } else if (answer.customID == 'verify-no') {
                            question.editResponse({
                                components: [],
                                embeds: [
                                    {
                                        'title':
                                            ':ballot_box_with_check: Abgebrochen :ballot_box_with_check:',
                                        'color': 44469,
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
                    await i.channel.send({
                        content:
                            '<:icons_Wrong:947468536492752906> Bitte antworte innerhalb 10 Sekunden <:icons_Wrong:947468536492752906>',
                    });
                }
                return;
            }
            const embed = new harmony.Embed({
                'color': 44469,
                'author': {
                    'name': 'Verifiziersystem Erstellung',
                    'icon_url':
                        'https://vectorified.com/images/white-lock-icon-png-9.png',
                },
                'footer': {
                    'text': '⇢ Zetrox von Folizza Studios',
                    'icon_url':
                        'https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png',
                },
            });
            const msg = await await i.respond({
                content:
                    '**In welchen Kanal soll die Nachricht gesendet werden?**\n*Bitte erwähne den jeweiligen Kanal.*',
                embeds: [embed],
            });
            const answer1 = await client.waitFor('messageCreate', (message) => {
                return message.author.id == i.member?.id &&
                    message.channel.id == i.channel?.id;
            }, 10000);
            let answer: harmony.Message | undefined;
            if (answer1[0]) {
                answer = answer1[0];
            }

            if (answer instanceof harmony.Message) {
                let rchannel: harmony.Channel | undefined;
                const channels = await i.guild.channels.array();
                for (const channel of channels) {
                    if (answer.content.indexOf(channel.mention) != -1) {
                        rchannel = channel;
                    }
                }
                if (rchannel != undefined && rchannel.isText()) {
                    await answer.delete();
                    embed.addField({
                        name: 'Kanal',
                        value: rchannel.mention,
                        inline: true,
                    });
                    msg.editResponse({
                        content:
                            '**Welche Rolle sollen Mitglieder bekommen?**\n*Bitte schreibe den jeweiligen Namen der Rolle*',
                        embeds: [embed],
                    });
                    const answer1 = await client.waitFor(
                        'messageCreate',
                        (message) => {
                            return message.author.id == i.member?.id &&
                                message.channel.id == i.channel?.id;
                        },
                        10000,
                    );
                    if (answer1[0]) {
                        answer = answer1[0];
                    }

                    if (answer instanceof harmony.Message) {
                        const roles = await i.guild.roles.array();
                        let rrole: harmony.Role | undefined;
                        for (const role of roles) {
                            if (
                                answer.content.toLowerCase().indexOf(
                                    role.name.toLowerCase(),
                                ) != -1
                            ) {
                                rrole = role;
                            }
                        }
                        await answer.delete();
                        if (rrole != undefined) {
                            embed.addField({
                                name: 'Rolle',
                                value: rrole.name,
                                inline: true,
                            });
                            let panelem = new harmony.Embed({
                                'title': 'Bitte verifiziere dich!',
                                'description':
                                    'Um den Server vor Bots und Angriffen zu schützen,\nmusst du dich verifizieren. Drücke dazu auf den Button "Verifizieren".',
                                'color': 44469,
                                'author': {
                                    'name': 'Verifizieren',
                                    'icon_url':
                                        'https://vectorified.com/images/white-lock-icon-png-9.png',
                                },
                                'footer': {
                                    'text': '⇢ Zetrox von Folizza Studios',
                                    'icon_url':
                                        'https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png',
                                },
                            });
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
                                                    .DANGER,
                                                customID: 'vp-yes',
                                                emoji: { name: '✅' },
                                                label: 'Ja',
                                            },
                                            {
                                                type: harmony
                                                    .MessageComponentType
                                                    .BUTTON,
                                                style: harmony.ButtonStyle
                                                    .SECONDARY,
                                                customID: 'vp-no',
                                                emoji: { name: '🚫' },
                                                label: 'Nein',
                                            },
                                        ],
                                    },
                                ];
                            await msg.editResponse({
                                components: controls,
                                content:
                                    '**Möchtest du deine eigene Nachricht nutzen?**',
                                embeds: [embed],
                            });
                            const answerI = await askInteraction(
                                client,
                                i,
                                20000,
                                ['vp-yes', 'vp-no'],
                            );
                            if (answerI != undefined) {
                                if (answerI.isMessageComponent()) {
                                    if (answerI.customID == 'vp-yes') {
                                        await msg.editResponse({
                                            components: [],
                                            content:
                                                '**Welchen Inhalt soll die Nachricht haben?**\n*Tipp: Du kannst hier auch eine DiscoHook URL, wie z.B. https://share.discohook.app/go/p9gfwfxo, hereinschreiben.*',
                                            embeds: [embed],
                                        });
                                        let answer = undefined;
                                        answer = await askMessage(
                                            client,
                                            i,
                                            60000,
                                        );
                                        if (answer != undefined) {
                                            if (isURL(answer.content)) {
                                                const dat =
                                                    await getDataFromDiscoLink(
                                                        answer.content,
                                                    );
                                                if (dat) {
                                                    panelem = new harmony
                                                        .Embed(
                                                        dat.data.embeds[0],
                                                    );
                                                } else {
                                                    noPerms(i);
                                                    return;
                                                }
                                            } else {
                                                panelem.setDescription(
                                                    answer.content,
                                                );
                                                await msg.editResponse({
                                                    components: [],
                                                    content:
                                                        '**Welchen Banner soll die Nachricht haben?**\n*Bitte gebe eine **URL** an!*',
                                                    embeds: [embed],
                                                });
                                                await answer.delete();
                                                answer = undefined;
                                                answer = await askMessage(
                                                    client,
                                                    i,
                                                    60000,
                                                );
                                                if (answer != undefined) {
                                                    if (
                                                        isURL(
                                                            answer.content,
                                                        )
                                                    ) {
                                                        panelem
                                                            .setThumbnail(
                                                                answer
                                                                    .content,
                                                            );
                                                        await msg
                                                            .editResponse({
                                                                components:
                                                                    [],
                                                                content:
                                                                    '**Welchen Titel soll die Nachricht haben?**',
                                                                embeds: [
                                                                    embed,
                                                                ],
                                                            });
                                                        await answer
                                                            .delete();
                                                        answer = undefined;
                                                        answer =
                                                            await askMessage(
                                                                client,
                                                                i,
                                                                60000,
                                                            );
                                                        if (
                                                            answer !=
                                                                undefined
                                                        ) {
                                                            panelem
                                                                .setTitle(
                                                                    answer
                                                                        .content,
                                                                );
                                                        } else {
                                                            await i.channel
                                                                .send({
                                                                    content:
                                                                        '<:icons_Wrong:947468536492752906> Bitte antworte innerhalb 1 Minute! <:icons_Wrong:947468536492752906>',
                                                                });
                                                            return;
                                                        }
                                                    } else {
                                                        await i.channel
                                                            .send({
                                                                content:
                                                                    '<:icons_Wrong:947468536492752906> Das ist keine URL! <:icons_Wrong:947468536492752906>',
                                                            });
                                                        return;
                                                    }
                                                } else {
                                                    await i.channel.send({
                                                        content:
                                                            '<:icons_Wrong:947468536492752906> Bitte antworte innerhalb 1 Minute! <:icons_Wrong:947468536492752906>',
                                                    });
                                                    return;
                                                }
                                            }
                                        } else {
                                            await i.channel.send({
                                                content:
                                                    '<:icons_Wrong:947468536492752906> Bitte antworte innerhalb 1 Minute! <:icons_Wrong:947468536492752906>',
                                            });
                                            return;
                                        }
                                    }
                                }
                            }
                            await msg.editResponse({
                                content:
                                    '**Müssen Mitglieder eine einfache Rechnung lösen bevor sie die Rolle bekommen?**\n*Dies gewährt extra Schutz vor Bots*',
                                embeds: [
                                    embed,
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
                                    let needAuth = false;
                                    if (answer.customID == 'verify-needAuth') {
                                        needAuth = true;
                                        embed.addField({
                                            name: 'Aufgabe vor Verifizierung',
                                            value: ':ballot_box_with_check: Ja',
                                            inline: true,
                                        });
                                    }
                                    if (answer.customID == 'verify-no') {
                                        embed.addField({
                                            name: 'Aufgabe vor Verifizierung',
                                            value:
                                                '<:icons_Wrong:947468536492752906> Nein',
                                            inline: true,
                                        });
                                    }
                                    msg.editResponse({
                                        components: [],
                                        embeds: [embed],
                                        content:
                                            '<:icons_Correct:947467655630164038> **Erfolgreich!** <:icons_Correct:947467655630164038>',
                                    });
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
                                                            'verify-verify',
                                                        emoji: { name: '🚪' },
                                                        label: 'Verifizieren',
                                                    },
                                                ],
                                            },
                                        ];
                                    const vmessage = await rchannel.send({
                                        embeds: [
                                            panelem,
                                        ],
                                        components: controls,
                                    });
                                    verifydb[i.guild.id] = {
                                        channel: rchannel.id,
                                        role: rrole.id,
                                        message: vmessage.id,
                                        needAuth: needAuth,
                                    };
                                    saveDatabase('verify.json', verifydb);
                                }
                            } else {
                                await i.channel.send({
                                    content:
                                        '<:icons_Wrong:947468536492752906> Bitte antworte innerhalb 10 Sekunden <:icons_Wrong:947468536492752906>',
                                });
                            }
                        } else {
                            await i.channel.send({
                                content:
                                    '<:icons_Wrong:947468536492752906> Diese Rolle existiert nicht... Schreibe den **exakten** Namen! <:icons_Wrong:947468536492752906>',
                            });
                        }
                    } else {
                        await i.channel.send({
                            content:
                                '<:icons_Wrong:947468536492752906> Bitte antworte innerhalb 10 Sekunden <:icons_Wrong:947468536492752906>',
                        });
                    }
                } else {
                    await i.channel.send({
                        content:
                            '<:icons_Wrong:947468536492752906> Diesen Kanal habe ich nicht gefunden. <:icons_Wrong:947468536492752906>',
                    });
                }
            } else {
                await i.channel.send({
                    content:
                        '<:icons_Wrong:947468536492752906> Bitte antworte innerhalb 10 Sekunden <:icons_Wrong:947468536492752906>',
                });
            }
        }
    } catch (err) {
        console.log(err);
        noPerms(i);
    }
}

function isURL(str: string) {
    const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
        'i',
    ); // fragment locator
    return !!pattern.test(str);
}
async function getDataFromDiscoLink(url: string) {
    const req = await fetch(url);
    const txt = req.url.split('?data=').pop();
    if (txt) {
        const json = JSON.parse(atob(txt));
        const msg = json.messages[0];
        return msg;
    }
    return undefined;
}

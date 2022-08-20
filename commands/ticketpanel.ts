import * as harmony from 'https://code.harmony.rocks/main';

import { database, saveDatabase } from '../util/database.ts';

import { isAuthorized } from '../util/isAuthorized.ts';
import { noPerms } from '../util/noPerms.ts';
import { askInteraction } from '../util/askInteraction.ts';

import { askMessage } from '../util/askMessage.ts';

export async function ticketpanel(
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
            const ticketdb = database('tickets.json');
            const embed = new harmony.Embed({
                'title': ':mailbox: Ticket System Erstellung :mailbox:',
                'color': 44469,
                'footer': {
                    'text': '⇢ Zetrox von Folizza Studios',
                    'icon_url':
                        'https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png',
                },
            });
            const msg = await i.respond({
                content: '**Was ist der Name dieses Panels?**',
                embeds: [embed],
            });
            let answer = await askMessage(client, i, 20000);
            if (answer != undefined) {
                if (answer.content != '') {
                    const name = answer.content;
                    embed.addField({ name: 'Name', value: name, inline: true });
                    await msg.editResponse({
                        content:
                            '**In welchem Kanal sollen Mitglieder ein Ticket erstellen können?**\n*Bitte erwähne den Kanal!*',
                        embeds: [embed],
                    });
                    answer = undefined;
                    answer = await askMessage(client, i, 20000);
                    let tchannel: harmony.Channel | undefined;
                    if (answer != undefined) {
                        for (
                            const channel of (await i.guild.channels.array())
                        ) {
                            if (answer.content.indexOf(channel.mention) != -1) {
                                tchannel = channel;
                            }
                        }
                        if (tchannel != undefined) {
                            let panelmsg = new harmony.Embed({
                                'title': name,
                                'description':
                                    'Erstelle hier ein Ticket um Support zu erhalten.\nEin Teammitglied wird sich dann um dich kümmern.',
                                'color': 44469,
                                'author': {
                                    'name': 'Ticket Erstellung',
                                    'icon_url':
                                        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/twitter/214/open-mailbox-with-lowered-flag_1f4ed.png',
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
                                                customID: 'tp-yes',
                                                emoji: { name: '✅' },
                                                label: 'Ja',
                                            },
                                            {
                                                type: harmony
                                                    .MessageComponentType
                                                    .BUTTON,
                                                style: harmony.ButtonStyle
                                                    .SECONDARY,
                                                customID: 'tp-no',
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
                            answer = undefined;
                            const answerI = await askInteraction(
                                client,
                                i,
                                20000,
                                ['tp-yes', 'tp-no'],
                            );
                            if (answerI != undefined) {
                                if (answerI.isMessageComponent()) {
                                    if (answerI.customID == 'tp-yes') {
                                        await msg.editResponse({
                                            components: [],
                                            content:
                                                '**Welchen Inhalt soll die Nachricht haben?**\n*Tipp: Du kannst hier auch eine DiscoHook URL, wie z.B. https://share.discohook.app/go/p9gfwfxo, hereinschreiben.*',
                                            embeds: [embed],
                                        });
                                        answer = undefined;
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
                                                    panelmsg = new harmony
                                                        .Embed(
                                                        dat.data.embeds[0],
                                                    );
                                                } else {
                                                    noPerms(i);
                                                    return;
                                                }
                                            } else {
                                                panelmsg.setDescription(
                                                    answer.content,
                                                );
                                                await msg.editResponse({
                                                    components: [],
                                                    content:
                                                        '**Welchen Banner soll die Nachricht haben?**\n*Bitte gebe eine **URL** an!*',
                                                    embeds: [embed],
                                                });
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
                                                        panelmsg
                                                            .setThumbnail(
                                                                answer
                                                                    .content,
                                                            );
                                                    } else {
                                                        await i.channel
                                                            .send({
                                                                content:
                                                                    '<:icons_Wrong:947468536492752906> Das ist keine URL! <:icons_Wrong:947468536492752906>',
                                                            });
                                                    }
                                                }
                                            }
                                        } else {
                                            await i.channel.send({
                                                content:
                                                    '<:icons_Wrong:947468536492752906> Bitte antworte innerhalb 1 Minute! <:icons_Wrong:947468536492752906>',
                                            });
                                        }
                                    }
                                }
                            }
                            await msg.editResponse({
                                components: [],
                                content:
                                    '**Welche Kategorie gilt für offene Tickets?**\n*Schreibe die ID oder den Namen der Kategorie.*',
                                embeds: [embed],
                            });
                            answer = undefined;
                            answer = await askMessage(client, i, 30000);
                            if (answer != undefined) {
                                let catopen = await client.channels.get(
                                    answer.content,
                                );
                                if (catopen == undefined) {
                                    catopen = await client.channels.resolve(
                                        answer.content,
                                    );
                                }
                                if (catopen == undefined) {
                                    for (
                                        const channel of await i.guild.channels
                                            .array()
                                    ) {
                                        if (
                                            answer.content.toLowerCase()
                                                .indexOf(
                                                    channel.name.toLowerCase(),
                                                ) != -1
                                        ) {
                                            catopen = channel;
                                        }
                                    }
                                }
                                if (
                                    catopen != undefined && catopen.isCategory()
                                ) {
                                    await msg.editResponse({
                                        components: [],
                                        content:
                                            '**Welche Kategorie gilt für geschlossene Tickets?**\n*Schreibe die ID oder den Namen der Kategorie.*',
                                        embeds: [embed],
                                    });
                                    answer = undefined;
                                    answer = await askMessage(client, i, 30000);
                                    if (answer != undefined) {
                                        let catclose = await client.channels
                                            .get(answer.content);
                                        if (catclose == undefined) {
                                            catclose = await client.channels
                                                .resolve(answer.content);
                                        }
                                        if (catclose == undefined) {
                                            for (
                                                const channel of await i.guild
                                                    .channels.array()
                                            ) {
                                                if (
                                                    answer.content.toLowerCase()
                                                        .indexOf(
                                                            channel.name
                                                                .toLowerCase(),
                                                        ) != -1
                                                ) {
                                                    catclose = channel;
                                                }
                                            }
                                        }
                                        if (
                                            catclose != undefined &&
                                            catclose.isCategory()
                                        ) {
                                            if (tchannel.isText()) {
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
                                                                                .PRIMARY,
                                                                        customID:
                                                                            'ticket-create',
                                                                        emoji: {
                                                                            name:
                                                                                '📬',
                                                                        },
                                                                        label:
                                                                            'Ticket öffnen',
                                                                    },
                                                                ],
                                                            },
                                                        ];
                                                const tmsg = await tchannel
                                                    .send({
                                                        embeds: [panelmsg],
                                                        components: controls,
                                                    });
                                                ticketdb.tickets.push({
                                                    msg: tmsg.id,
                                                    name: name,
                                                    catopen: catopen.id,
                                                    catclose: catclose.id,
                                                    guild: i.guild.id,
                                                });
                                                saveDatabase(
                                                    'tickets.json',
                                                    ticketdb,
                                                );
                                                await i.channel.send(
                                                    '<:icons_Correct:947467655630164038> Erfolgreich! <:icons_Correct:947467655630164038>\n__Du kannst mit `/einstellungen teamrole` einstellen, wer die Tickets sehen kann.__',
                                                );
                                            }
                                        } else {
                                            await i.channel.send({
                                                content:
                                                    '<:icons_Wrong:947468536492752906> Dies ist keine gültige Kategorie! <:icons_Wrong:947468536492752906>',
                                            });
                                        }
                                    } else {
                                        await i.channel.send({
                                            content:
                                                '<:icons_Wrong:947468536492752906> Bitte antworte innerhalb 30 Sekunden <:icons_Wrong:947468536492752906>',
                                        });
                                    }
                                } else {
                                    await i.channel.send({
                                        content:
                                            '<:icons_Wrong:947468536492752906> Dies ist keine gültige Kategorie! <:icons_Wrong:947468536492752906>',
                                    });
                                }
                            } else {
                                await i.channel.send({
                                    content:
                                        '<:icons_Wrong:947468536492752906> Bitte antworte innerhalb 30 Sekunden <:icons_Wrong:947468536492752906>',
                                });
                            }
                        } else {
                            await i.channel.send(
                                '<:icons_Wrong:947468536492752906> Das ist kein gültiger Kanal! Achte darauf, den Kanal zu **erwähnen**! <:icons_Wrong:947468536492752906>',
                            );
                        }
                    } else {
                        await i.channel.send({
                            content:
                                '<:icons_Wrong:947468536492752906> Bitte antworte innerhalb 20 Sekunden <:icons_Wrong:947468536492752906>',
                        });
                    }
                } else {
                    await i.channel.send(
                        '<:icons_Wrong:947468536492752906> Das ist kein gültiger Name! <:icons_Wrong:947468536492752906>',
                    );
                }
            } else {
                await i.channel.send({
                    content:
                        '<:icons_Wrong:947468536492752906> Bitte antworte innerhalb 20 Sekunden <:icons_Wrong:947468536492752906>',
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

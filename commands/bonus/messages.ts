import * as harmony from 'https://code.harmony.rocks/main';
import { isAuthorized } from '../../util/isAuthorized.ts';
import { noPerms } from '../../util/noPerms.ts';

export async function bonusAddMessages(i: harmony.Interaction) {
    try {
        if (i.member) {
            if (!(await isAuthorized(i.member))) {
                await i.respond({
                    content:
                        '<:icons_Wrong:947468536492752906> Du hast dazu keine Rechte! <:icons_Wrong:947468536492752906>',
                    ephemeral: true,
                });
                return;
            }

            if (i.isApplicationCommand() && i.guild) {
                if (i.option<string>('anzahl') != undefined) {
                    const anzahl = parseInt(i.option<string>('anzahl'));
                    if (anzahl < 10000 && anzahl > 0) {
                        let member: harmony.Member = i.member;
                        if (i.option<harmony.User>('user') != undefined) {
                            let member1 = await i.guild.members.get(
                                i.option<harmony.User>('user').id,
                            );
                            if (member1 == undefined) {
                                member1 = await i.guild.members.resolve(
                                    i.option<harmony.User>('user').id,
                                );
                            }
                            if (member1 != undefined) {
                                member = member1;
                            }
                        }
                        const messagedb = JSON.parse(
                            Deno.readTextFileSync('./databases/messages.json'),
                        );
                        if (!(messagedb[i.guild.id])) {
                            messagedb[i.guild.id] = {};
                        }
                        if (!(messagedb[i.guild.id][member.id])) {
                            messagedb[i.guild.id][member.id] = {
                                count: 0,
                                lastsend: 0,
                            };
                        }
                        messagedb[i.guild.id][member.id].count += anzahl;
                        Deno.writeTextFileSync(
                            './databases/messages.json',
                            JSON.stringify(messagedb),
                        );
                        await i.respond({
                            embeds: [{
                                'title':
                                    '<:icons_Correct:947467655630164038> Erfolgreich! <:icons_Correct:947467655630164038>',
                                'description':
                                    `Du hast ${member.user.username} **${anzahl}** Nachrichten hinzugefügt.`,
                                'color': 15658734,
                                'author': {
                                    'name': 'Nachrichten-Tracker',
                                    'icon_url':
                                        'https://emoji.gg/assets/emoji/3646-imessageokay.png',
                                },
                                'footer': {
                                    'text': '⇢ Zetrox von Folizza Studios',
                                    'icon_url':
                                        'https://images-ext-2.discordapp.net/external/Bz1kDlXLtgMdIMxKgKx1i-8i-wXOSEKFY48ouCl1hPM/https/sph-download.neocities.org/share/GoDaddyStudioPage-0%25202.png',
                                },
                            }],
                        });
                    } else {
                        await i.respond({
                            content:
                                '<:icons_Wrong:947468536492752906> Du kannst jemandem maximal 10000 Nachrichten und minimal 1 hinzufügen! <:icons_Wrong:947468536492752906>',
                            ephemeral: true,
                        });
                    }
                }
            }
        }
    } catch (err) {
        console.log(err);
        noPerms(i);
    }
}

export async function bonusRemoveMessages(i: harmony.Interaction) {
    try {
        if (i.member) {
            if (!(await isAuthorized(i.member))) {
                await i.respond({
                    content:
                        '<:icons_Wrong:947468536492752906> Du hast dazu keine Rechte! <:icons_Wrong:947468536492752906>',
                    ephemeral: true,
                });
                return;
            }

            if (i.isApplicationCommand() && i.guild) {
                if (i.option<string>('anzahl') != undefined) {
                    const anzahl = parseInt(i.option<string>('anzahl'));
                    if (anzahl < 10000 && anzahl > 0) {
                        let member: harmony.Member = i.member;
                        if (i.option<harmony.User>('user') != undefined) {
                            let member1 = await i.guild.members.get(
                                i.option<harmony.User>('user').id,
                            );
                            if (member1 == undefined) {
                                member1 = await i.guild.members.resolve(
                                    i.option<harmony.User>('user').id,
                                );
                            }
                            if (member1 != undefined) {
                                member = member1;
                            }
                        }
                        const messagedb = JSON.parse(
                            Deno.readTextFileSync('./databases/messages.json'),
                        );
                        if (!(messagedb[i.guild.id])) {
                            messagedb[i.guild.id] = {};
                        }
                        if (!(messagedb[i.guild.id][member.id])) {
                            messagedb[i.guild.id][member.id] = {
                                count: 0,
                                lastsend: 0,
                            };
                        }
                        messagedb[i.guild.id][member.id].count -= anzahl;
                        Deno.writeTextFileSync(
                            './databases/messages.json',
                            JSON.stringify(messagedb),
                        );
                        await i.respond({
                            embeds: [{
                                'title':
                                    '<:icons_Correct:947467655630164038> Erfolgreich! <:icons_Correct:947467655630164038>',
                                'description':
                                    `Du hast ${member.user.username} **${anzahl}** Nachrichten entfernt.`,
                                'color': 15658734,
                                'author': {
                                    'name': 'Nachrichten-Tracker',
                                    'icon_url':
                                        'https://emoji.gg/assets/emoji/3646-imessageokay.png',
                                },
                                'footer': {
                                    'text': '⇢ Zetrox von Folizza Studios',
                                    'icon_url':
                                        'https://images-ext-2.discordapp.net/external/Bz1kDlXLtgMdIMxKgKx1i-8i-wXOSEKFY48ouCl1hPM/https/sph-download.neocities.org/share/GoDaddyStudioPage-0%25202.png',
                                },
                            }],
                        });
                    } else {
                        await i.respond({
                            content:
                                '<:icons_Wrong:947468536492752906> Du kannst jemandem maximal 10000 Nachrichten und minimal 1 entfernen! <:icons_Wrong:947468536492752906>',
                            ephemeral: true,
                        });
                    }
                }
            }
        }
    } catch (err) {
        console.log(err);
        noPerms(i);
    }
}

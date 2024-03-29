import * as harmony from 'https://code.harmony.rocks/main';
import { isAuthorized } from '../../util/isAuthorized.ts';
import { noPerms } from '../../util/noPerms.ts';

export async function bonusAddGamePoints(i: harmony.Interaction) {
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
                        modifyGamePoints(member, anzahl);
                        await i.respond({
                            embeds: [{
                                'title':
                                    '<:icons_Correct:947467655630164038> Erfolgreich! :white_check_mark:',
                                'description':
                                    `Du hast ${member.user.username} **${anzahl}** GamePoints <:ZetroCoin:935256569984208917> hinzugefügt.`,
                                'color': 15658734,
                                'author': {
                                    'name': 'GamePoints',
                                    'icon_url':
                                        'https://emoji.gg/assets/emoji/9172-game.png',
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
                                '<:icons_Wrong:947468536492752906> Du kannst jemandem maximal 10000 GamePoints <:ZetroCoin:935256569984208917> und minimal 1 hinzufügen! <:icons_Wrong:947468536492752906>',
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

export async function bonusRemoveGamePoints(i: harmony.Interaction) {
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
                        modifyGamePoints(member, 0 - anzahl);
                        await i.respond({
                            embeds: [{
                                'title':
                                    ':white_check_mark: Erfolgreich! :white_check_mark:',
                                'description':
                                    `Du hast ${member.user.username} **${anzahl}** GamePoints <:ZetroCoin:935256569984208917> entfernt.`,
                                'color': 15658734,
                                'author': {
                                    'name': 'GamePoints',
                                    'icon_url':
                                        'https://emoji.gg/assets/emoji/9172-game.png',
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
                                '<:icons_Wrong:947468536492752906> Du kannst jemandem maximal 10000 GamePoints <:ZetroCoin:935256569984208917> und minimal 1 entfernen! <:icons_Wrong:947468536492752906>',
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

export function modifyGamePoints(member: harmony.Member, count: number) {
    const GamePointsdb = JSON.parse(
        Deno.readTextFileSync('./databases/gamePoints.json'),
    );
    if (!(GamePointsdb[member.guild.id])) {
        GamePointsdb[member.guild.id] = {};
    }
    if (!(GamePointsdb[member.guild.id][member.id])) {
        GamePointsdb[member.guild.id][member.id] = { count: 0 };
    }
    GamePointsdb[member.guild.id][member.id].count += count;
    Deno.writeTextFileSync(
        './databases/gamePoints.json',
        JSON.stringify(GamePointsdb),
    );
}

export function getGamePoints(member: harmony.Member) {
    const gamePointdb = JSON.parse(
        Deno.readTextFileSync('./databases/gamePoints.json'),
    );
    if (gamePointdb[member.guild.id]) {
        if (gamePointdb[member.guild.id][member.id]) {
            return gamePointdb[member.guild.id][member.id].count;
        }
    }
    return 0;
}

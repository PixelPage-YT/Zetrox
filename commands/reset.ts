import * as harmony from 'https://code.harmony.rocks/main';
import { database } from '../util/database.ts';
import { isAuthorized } from '../util/isAuthorized.ts';
import { noPerms } from '../util/noPerms.ts';

export async function resetInvites(i: harmony.Interaction) {
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
            if (i.guild) {
                const invitedb = database('invites/invites.json');
                invitedb[i.guild.id] = undefined;
                Deno.writeTextFileSync(
                    './databases/invites/invites.json',
                    JSON.stringify(invitedb),
                );
                await i.respond({
                    embeds: [
                        {
                            'title':
                                '<:icons_Correct:947467655630164038> Erfolgreich! <:icons_Correct:947467655630164038>',
                            'description':
                                'Alle Einladungen wurden erfolgreich zurückgesetzt!',
                            'color': 44469,
                            'author': {
                                'name': 'Einladungs-Tracker',
                                'icon_url':
                                    'https://emoji.gg/assets/emoji/7236-invite-listen.png',
                            },
                            'footer': {
                                'text': '⇢ Zetrox von Folizza Studios',
                                'icon_url':
                                    'https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png',
                            },
                        },
                    ],
                });
            }
        }
    } catch (err) {
        console.log(err);
        noPerms(i);
    }
}

export async function resetMessages(i: harmony.Interaction) {
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
            if (i.guild) {
                const invitedb = database('messages.json');
                invitedb[i.guild.id] = undefined;
                Deno.writeTextFileSync(
                    './databases/messages.json',
                    JSON.stringify(invitedb),
                );
                await i.respond({
                    embeds: [
                        {
                            'title':
                                '<:icons_Correct:947467655630164038> Erfolgreich! <:icons_Correct:947467655630164038>',
                            'description':
                                'Alle Nachrichten wurden erfolgreich zurückgesetzt!',
                            'color': 44469,
                            'author': {
                                'name': 'Nachrichten-Tracker',
                                'icon_url':
                                    'https://emoji.gg/assets/emoji/3646-imessageokay.png',
                            },
                            'footer': {
                                'text': '⇢ Zetrox von Folizza Studios',
                                'icon_url':
                                    'https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png',
                            },
                        },
                    ],
                });
            }
        }
    } catch (err) {
        console.log(err);
        noPerms(i);
    }
}

export async function resetGamePoints(i: harmony.Interaction) {
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
            if (i.guild) {
                const invitedb = database('gamePoints.json');
                invitedb[i.guild.id] = undefined;
                Deno.writeTextFileSync(
                    './databases/gamePoints.json',
                    JSON.stringify(invitedb),
                );
                await i.respond({
                    embeds: [
                        {
                            'title':
                                '<:icons_Correct:947467655630164038> Erfolgreich! <:icons_Correct:947467655630164038>',
                            'description':
                                'Alle SpielPunkte <:ZetroCoin:935256569984208917> wurden erfolgreich zurückgesetzt!',
                            'color': 44469,
                            'author': {
                                'name': 'GamePoints',
                                'icon_url':
                                    'https://emoji.gg/assets/emoji/9172-game.png',
                            },
                            'footer': {
                                'text': '⇢ Zetrox von Folizza Studios',
                                'icon_url':
                                    'https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png',
                            },
                        },
                    ],
                });
            }
        }
    } catch (err) {
        console.log(err);
        noPerms(i);
    }
}

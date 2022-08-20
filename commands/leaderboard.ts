import * as harmony from 'https://code.harmony.rocks/main';
import { noPerms } from '../util/noPerms.ts';
import {
    gamepoints_member,
    invites_member,
    messages_member,
} from '../util/types.ts';
async function lbMessages(i: harmony.Interaction, client: harmony.Client) {
    try {
        if (i.isApplicationCommand()) {
            const messagedb = JSON.parse(
                Deno.readTextFileSync('./databases/messages.json'),
            );
            let content = '';
            const nocontent = '';
            const embed = new harmony.Embed({
                'title': 'Leaderboard',
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
            });
            if (i.guild) {
                const points: messages_member[] = [];
                if (!(messagedb[i.guild.id])) {
                    messagedb[i.guild.id] = {};
                }
                const guild = messagedb[i.guild.id];
                for (const member1 of guild) {
                    // @ts-ignore bug
                    points.push({
                        member: member1[0],
                        count: member1[1].count,
                    });
                }
                const sorted = points.sort(
                    (a: messages_member, b: messages_member) => {
                        return b.count - a.count;
                    },
                );
                let index = 0;
                for (const element of sorted) {
                    if (index + 1 == 10) {
                        break;
                    }
                    let currentuser: harmony.User | undefined;
                    currentuser = await client.users.get(element.member);
                    if (currentuser == undefined) {
                        currentuser = await client.users.resolve(
                            element.member,
                        );
                    }
                    if (currentuser != undefined && currentuser.bot != true) {
                        if (index + 1 == 1) {
                            content += '🥇 **' + currentuser.username + '**' +
                                ' | ' + element.count.toString() + '\n';
                        } else if (index + 1 == 2) {
                            content += '🥈 **' + currentuser.username + '**' +
                                ' | ' + element.count.toString() + '\n';
                        } else if (index + 1 == 3) {
                            content += '🥉 **' + currentuser.username + '**' +
                                ' | ' + element.count.toString() + '\n';
                        } else {
                            content += (index + 1).toString() + ' **' +
                                currentuser.username + '** | ' +
                                element.count.toString() + '\n';
                        }
                        index++;
                    }
                }
            }
            if (content == nocontent) {
                content =
                    '*Hier hat noch niemand eine Nachricht geschrieben...*';
            }
            embed.setDescription(content);
            await i.respond({
                embeds: [embed],
            });
        }
    } catch (err) {
        console.log(err);
        noPerms(i);
    }
}

async function lbInvites(i: harmony.Interaction, client: harmony.Client) {
    try {
        const invitedb = JSON.parse(
            Deno.readTextFileSync('./databases/invites/invites.json'),
        );
        let content = '';
        const nocontent = '';
        const embed = new harmony.Embed({
            'title': 'Leaderboard',
            'color': 15658734,
            'author': {
                'name': 'Invite-Tracker',
                'icon_url':
                    'https://emoji.gg/assets/emoji/7236-invite-listen.png',
            },
            'footer': {
                'text': '⇢ Zetrox von Folizza Studios',
                'icon_url':
                    'https://images-ext-2.discordapp.net/external/Bz1kDlXLtgMdIMxKgKx1i-8i-wXOSEKFY48ouCl1hPM/https/sph-download.neocities.org/share/GoDaddyStudioPage-0%25202.png',
            },
        });
        if (i.guild) {
            const points: invites_member[] = [];
            if (!(invitedb[i.guild.id])) {
                invitedb[i.guild.id] = {};
            }
            const guild = invitedb[i.guild.id];
            for (const member1 of Object.entries(guild)) {
                // @ts-ignore bug
                points.push({ member: member1[0], count: member1[1].count });
            }
            const sorted = points.sort(
                (a: invites_member, b: invites_member) => {
                    return b.count - a.count;
                },
            );
            for (const index in sorted) {
                if (parseInt(index) + 1 == 10) {
                    break;
                }
                const element = sorted[index];
                let currentuser: harmony.User | undefined;
                currentuser = await client.users.get(element.member);
                if (currentuser == undefined) {
                    currentuser = await client.users.resolve(element.member);
                }
                if (currentuser != undefined && currentuser.bot != true) {
                    if (parseInt(index) + 1 == 1) {
                        content += '🥇 **' + currentuser.username + '**' +
                            ' | ' + element.count.toString() + '\n';
                    } else if (parseInt(index) + 1 == 2) {
                        content += '🥈 **' + currentuser.username + '**' +
                            ' | ' + element.count.toString() + '\n';
                    } else if (parseInt(index) + 1 == 3) {
                        content += '🥉 **' + currentuser.username + '**' +
                            ' | ' + element.count.toString() + '\n';
                    } else {
                        content += (parseInt(index) + 1).toString() + ' **' +
                            currentuser.username + '** | ' +
                            element.count.toString() + '\n';
                    }
                }
            }
        }
        if (content == nocontent) {
            content = '*Hier hat noch niemand jemanden eingeladen...*';
        }
        embed.setDescription(content);
        await i.respond({
            embeds: [embed],
        });
    } catch (err) {
        console.log(err);
        noPerms(i);
    }
}
async function lbGamepoints(i: harmony.Interaction, client: harmony.Client) {
    try {
        const invitedb = JSON.parse(
            Deno.readTextFileSync('./databases/gamePoints.json'),
        );
        let content = '';
        const nocontent = '';
        const embed = new harmony.Embed({
            'title': 'Leaderboard',
            'color': 15658734,
            'author': {
                'name': 'GamePoints',
                'icon_url':
                    'https://emoji.gg/assets/emoji/7236-invite-listen.png',
            },
            'footer': {
                'text': '⇢ Zetrox von Folizza Studios',
                'icon_url':
                    'https://images-ext-2.discordapp.net/external/Bz1kDlXLtgMdIMxKgKx1i-8i-wXOSEKFY48ouCl1hPM/https/sph-download.neocities.org/share/GoDaddyStudioPage-0%25202.png',
            },
        });
        if (i.guild) {
            const points: gamepoints_member[] = [];
            if (!(invitedb[i.guild.id])) {
                invitedb[i.guild.id] = {};
            }
            const guild = invitedb[i.guild.id];
            for (const member1 of Object.entries(guild)) {
                // @ts-ignore bug
                points.push({ member: member1[0], count: member1[1].count });
            }
            const sorted = points.sort(
                (a: gamepoints_member, b: gamepoints_member) => {
                    return b.count - a.count;
                },
            );
            for (const index in sorted) {
                if (parseInt(index) + 1 == 10) {
                    break;
                }
                const element = sorted[index];
                let currentuser: harmony.User | undefined;
                currentuser = await client.users.get(element.member);
                if (currentuser == undefined) {
                    currentuser = await client.users.resolve(element.member);
                }
                if (currentuser != undefined && currentuser.bot != true) {
                    if (parseInt(index) + 1 == 1) {
                        content += '🥇 **' + currentuser.username + '**' +
                            ' | ' + element.count.toString() + '\n';
                    } else if (parseInt(index) + 1 == 2) {
                        content += '🥈 **' + currentuser.username + '**' +
                            ' | ' + element.count.toString() + '\n';
                    } else if (parseInt(index) + 1 == 3) {
                        content += '🥉 **' + currentuser.username + '**' +
                            ' | ' + element.count.toString() + '\n';
                    } else {
                        content += (parseInt(index) + 1).toString() + ' **' +
                            currentuser.username + '** | ' +
                            element.count.toString() + '\n';
                    }
                }
            }
        }
        if (content == nocontent) {
            content = '*Hier hat noch niemand einen GamePoint...*';
        }
        embed.setDescription(content);
        await i.respond({
            embeds: [embed],
        });
    } catch (err) {
        console.log(err);
        noPerms(i);
    }
}

export function leaderboard(i: harmony.Interaction, client: harmony.Client) {
    try {
        if (i.isApplicationCommand()) {
            if (i.option<string>('type')) {
                const type = i.option<string>('type');
                if (type == 'lbmsgs') {
                    lbMessages(i, client);
                }
                if (type == 'lbinvs') {
                    lbInvites(i, client);
                }
                if (type == 'lbgps') {
                    lbGamepoints(i, client);
                }
            }
        }
    } catch (err) {
        console.log(err);
        noPerms(i);
    }
}

import * as harmony from 'https://code.harmony.rocks/main';
import { noPerms } from '../util/noPerms.ts';
export async function invites(i: harmony.Interaction) {
    try {
        if (i.isApplicationCommand()) {
            let member: harmony.Member | undefined;
            if (i.option<string>('user') != undefined) {
                if (i.guild) {
                    member = await i.guild.members.get(
                        i.option<harmony.User>('user').id,
                    );
                    if (member == undefined) {
                        member = await i.guild.members.resolve(
                            i.option<harmony.User>('user').id,
                        );
                    }
                }
            } else {
                member = i.member;
            }
            if (member) {
                let invitecount = 0;
                let leaves = 0;
                let allinvs = 0;
                const invitedb = JSON.parse(
                    Deno.readTextFileSync('./databases/invites/invites.json'),
                );
                if (i.guild) {
                    if (invitedb[i.guild.id]) {
                        if (invitedb[i.guild.id][member.id]) {
                            invitecount = invitedb[i.guild.id][member.id].count;
                            invitecount -=
                                invitedb[i.guild.id][member.id].leaves;
                            leaves = invitedb[i.guild.id][member.id].leaves;
                            allinvs = invitedb[i.guild.id][member.id].count;
                        }
                    }
                    await i.respond({
                        embeds: [{
                            'title': member.user.username,
                            'description':
                                `<:verified_server:756591613525885119> **Dieser Benutzer hat __${invitecount.toString()}__ Mitglieder eingeladen.**\n**${allinvs}** ohne Abzüge\n **${leaves}** Mitglieder haben nach der Einladung verlassen`,
                            'color': 15658734,
                            'author': {
                                'name': 'Einladungs-Tracker',
                                'icon_url':
                                    'https://emoji.gg/assets/emoji/7236-invite-listen.png',
                            },
                            'footer': {
                                'text': '⇢ Zetrox von Folizza Studios',
                                'icon_url':
                                    'https://images-ext-2.discordapp.net/external/Bz1kDlXLtgMdIMxKgKx1i-8i-wXOSEKFY48ouCl1hPM/https/sph-download.neocities.org/share/GoDaddyStudioPage-0%25202.png',
                            },
                        }],
                    });
                }
            }
        }
    } catch (err) {
        console.log(err);
        noPerms(i);
    }
}

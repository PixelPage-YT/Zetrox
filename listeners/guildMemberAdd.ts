import { supabaseClient } from 'https://deno.land/x/supabase_deno@v1.0.5/mod.ts';
import * as harmony from 'https://code.harmony.rocks/main';
const config: { devtoken: string, token: string, supabaseToken: string } = JSON.parse(
    Deno.readTextFileSync('config.json'),
);

export async function guildMemberAdd(
    member: harmony.Member,
    client: harmony.Client,
) {
    try {
        const sbclient: supabaseClient = new supabaseClient(
            'https://lvqcvchccfkvuihmdbiu.supabase.co',
            config.supabaseToken
        );
        const table = sbclient.tables().get('guild_settings');
        const guildInvites = await member.guild.invites.fetchAll();
        guildInvites.forEach(async (invite) => { //basically a for loop over the invites
            try {
                // @ts-ignore bug
                const invite1 = client.oinvites[invite.code];
                if (invite.uses != invite1) { //if it doesn't match what we stored:
                    if (invite.inviter) {
                        invite.inviter.id;
                        const invitedb = JSON.parse(
                            Deno.readTextFileSync(
                                './databases/invites/invites.json',
                            ),
                        );
                        if (invite.guild) {
                            if (!(invitedb[invite.guild.id])) {
                                invitedb[invite.guild.id] = {};
                            }
                            if (
                                !(invitedb[invite.guild.id][
                                    invite.inviter.id
                                ])
                            ) {
                                invitedb[invite.guild.id][invite.inviter.id] = {
                                    count: 0,
                                    invited: [],
                                    leaves: 0,
                                };
                            }
                            invitedb[invite.guild.id][invite.inviter.id]
                                .count++;
                            invitedb[invite.guild.id][invite.inviter.id].invited
                                .push(member.id);
                            const item = (await table.items().get(
                                'id',
                                member.guild.id,
                            ))[0];
                            if (item != undefined) {
                                const channel = await member.guild.channels
                                    .fetch(item.inviteChannel);
                                if (channel != undefined && channel.isText()) {
                                    // The error happens here
                                    await channel.send({
                                        embeds: [
                                            {
                                                'title': member.user.username,
                                                'description':
                                                    'ist gerade dem Server beigetreten! \n*Er/Sie wurde eingeladen von* **' +
                                                    invite.inviter.username +
                                                    '**',
                                                'color': 5814783,
                                                'author': {
                                                    'name': 'Neues Mitglied',
                                                    'icon_url':
                                                        'https://emoji.gg/assets/emoji/3118-discord-members.png',
                                                },
                                                'thumbnail': {
                                                    'url': member.avatarURL(),
                                                },
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
                            Deno.writeTextFileSync(
                                './databases/invites/invites.json',
                                JSON.stringify(invitedb),
                            );
                        }
                    }
                    // @ts-ignore bug
                    client.oinvites[invite.code] = invite.uses;
                }
            } catch (err) {
                console.log(err);
            }
        });
    } catch (err) {
        console.log(err);
    }
}

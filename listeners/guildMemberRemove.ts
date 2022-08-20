import * as harmony from 'https://code.harmony.rocks/main';

export function guildMemberRemove(member: harmony.Member) {
    try {
        const invitedb = JSON.parse(
            Deno.readTextFileSync('./databases/invites/invites.json'),
        );
        if (invitedb[member.guild.id] != undefined) {
            const members = invitedb[member.guild.id];
            // @ts-ignore bug
            for (const member1 of Object.entries(members)) {
                const memberid = member1[0];
                // @ts-ignore bug
                for (const invitedMem of member1[1].invited) {
                    if (invitedMem == member.id) {
                        if (!(invitedb[member.guild.id][memberid])) {
                            invitedb[member.guild.id][memberid] = {
                                count: 0,
                                invited: [],
                                leaves: 0,
                            };
                        }
                        invitedb[member.guild.id][memberid].leaves++;
                        try {
                            invitedb[member.guild.id][memberid].invited.splice(
                                invitedb[member.guild.id][memberid].invited
                                    .findIndex((index: string) =>
                                        index === member.id
                                    ),
                            );
                        } catch (err) {
                            console.log(err);
                        }
                        Deno.writeTextFileSync(
                            './databases/invites/invites.json',
                            JSON.stringify(invitedb),
                        );
                    }
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
}

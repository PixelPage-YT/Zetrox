import * as harmony from 'https://code.harmony.rocks/main/mod.ts';
import { noPerms } from '../util/noPerms.ts';

import { giveaway_database } from '../util/types.ts';
export async function gwSeeMembers(
    i: harmony.Interaction,
    client: harmony.Client,
) {
    try {
        if (i.isApplicationCommand() && i.targetMessage) {
            const gwdb: giveaway_database = JSON.parse(
                Deno.readTextFileSync('./databases/giveaways.json'),
            );
            let check = false;
            for (const gw of gwdb.giveaways) {
                if (gw.msgid == i.targetMessage.id) {
                    let content = '';
                    for (const user of gw.users) {
                        let user1 = await client.users.get(user);
                        if (user1 == undefined) {
                            user1 = await client.users.resolve(user);
                        }
                        if (user1 != undefined) {
                            content += '\n<:RL_dotblue:929474180817252372> ' +
                                user1.username;
                        }
                    }
                    if (content == '') {
                        content = '*Keine Teilnehmer*';
                    }
                    await i.respond({ ephemeral: true, content: content });
                    check = true;
                }
            }
            if (check == false) {
                await i.respond({
                    content:
                        '<:icons_Wrong:947468536492752906> Dies ist keine Verlosung oder alle Gewinner stehen schon fest! <:icons_Wrong:947468536492752906>',
                    ephemeral: true,
                });
                return;
            }
        }
    } catch (err) {
        console.log(err);
        noPerms(i);
    }
}

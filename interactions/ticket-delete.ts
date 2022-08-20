import * as harmony from 'https://code.harmony.rocks/main';
import { database, saveDatabase } from '../util/database.ts';
import { noPerms } from '../util/noPerms.ts';
export async function ticketDelete(i: harmony.Interaction) {
    try {
        if (i.member && i.channel && i.guild && i.isMessageComponent()) {
            const ticketopendb = database('ticketopen.json');
            if (ticketopendb[i.channel.id]) {
                if (i.channel.isGuildText()) {
                    delete ticketopendb[i.channel.id];
                    await i.channel.delete();
                    saveDatabase('ticketopen.json', ticketopendb);
                }
            }
        }
    } catch (err) {
        console.log(err);
        noPerms(i);
    }
}

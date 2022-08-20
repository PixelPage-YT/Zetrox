import * as harmony from 'https://code.harmony.rocks/main';
import { supabaseClient } from 'https://deno.land/x/supabase_deno@v1.0.5/mod.ts';
const config: { devtoken: string, token: string, supabaseToken: string } = JSON.parse(
    Deno.readTextFileSync('config.json'),
);
export async function messageCreate(message: harmony.Message) {
    try {
        const sbclient: supabaseClient = new supabaseClient(
            'https://lvqcvchccfkvuihmdbiu.supabase.co',
            config.supabaseToken
        );
        const table = sbclient.tables().get('guild_settings');
        const messagedb = JSON.parse(
            Deno.readTextFileSync('./databases/messages.json'),
        );

        if (message.guild) {
            if (!(messagedb[message.guild.id])) {
                messagedb[message.guild.id] = {};
            }
            if (!(messagedb[message.guild.id][message.author.id])) {
                messagedb[message.guild.id][message.author.id] = {
                    count: 0,
                    lastsend: 0,
                };
            }
            let antiSpamTime = 10000;
            const item = (await table.items().get('id', message.guild.id))[0];
            if (item != undefined) {
                antiSpamTime = item.antiSpamTime * 1000;
            }
            if (
                Date.now() -
                        messagedb[message.guild.id][message.author.id]
                            .lastsend > antiSpamTime
            ) {
                messagedb[message.guild.id][message.author.id].lastsend = Date
                    .now();
                messagedb[message.guild.id][message.author.id].count++;
            }
            Deno.writeTextFileSync(
                './databases/messages.json',
                JSON.stringify(messagedb),
            );
        }
    } catch (err) {
        console.log(err);
    }
}

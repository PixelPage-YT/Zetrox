import { supabaseClient } from 'https://deno.land/x/supabase_deno@v1.0.5/mod.ts';
import * as harmony from 'https://code.harmony.rocks/main';

const config: { devtoken: string, token: string, supabaseToken: string } = JSON.parse(
    Deno.readTextFileSync('config.json'),
);
export async function isAuthorized(member: harmony.Member | undefined) {
    try {
        if (member == undefined) {
            return false;
        }
        const sbclient: supabaseClient = new supabaseClient(
            'https://lvqcvchccfkvuihmdbiu.supabase.co',
            config.supabaseToken
        );
        const table = sbclient.tables().get('guild_settings');
        const item = (await table.items().get('id', member.guild.id))[0];
        if (!(item == undefined)) {
            let role = await member.guild.roles.get(item.teamRole);
            if (role == undefined) {
                role = await member.guild.roles.resolve(item.teamRole);
            }
            if (role != undefined) {
                if (
                    (await member.roles.array()).findIndex((index) =>
                        index === role
                    )
                ) {
                    return true;
                }
            }
        }
        if (
            member.permissions.toArray().findIndex((index) =>
                index === 'MANAGE_GUILD'
            ) != -1
        ) {
            return true;
        }
        return false;
    } catch (err) {
        console.log(err);
    }
}

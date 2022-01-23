import * as harmony from "https://code.harmony.rocks/main"

export async function ready(client:harmony.Client) {
    console.log(`[Info] Client-Benutzername: ${client.user?.username}`)
    console.log(`[Info] Client-ID: ${client.user?.id}`)
    for(let guild of await client.guilds.array()){
        await guild.invites.fetchAll()
        guild.invites.array().then((guildinvites) => {
            guildinvites.forEach(guildInvite => {
                // @ts-ignore
                client.oinvites[guildInvite.code] = guildInvite.uses
            })
        })
    }
}
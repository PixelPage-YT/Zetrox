import * as harmony from 'https://code.harmony.rocks/main/mod.ts';
import { isAuthorized } from '../util/isAuthorized.ts';
import { noPerms } from '../util/noPerms.ts';
import { giveaway_database } from '../util/types.ts';
export async function gwReroll(i: harmony.Interaction, client: harmony.Client) {
    try {
        if (
            i.isApplicationCommand() && i.name == 'Rerollen' && i.targetMessage
        ) {
            if (!await isAuthorized(i.member)) {
                await i.respond({
                    content:
                        '<:icons_Wrong:947468536492752906> Du hast dazu keine Rechte! <:icons_Wrong:947468536492752906>',
                    ephemeral: true,
                });
                return;
            }
            const gwdb: giveaway_database = JSON.parse(
                Deno.readTextFileSync('./databases/giveaways.json'),
            );
            let index = 0;
            let check = false;
            for (const gw of gwdb.giveaways) {
                if (gw.msgid == i.targetMessage.id) {
                    const winnercount = gw.winners.length;
                    const embed = new harmony.Embed({
                        'color': 44469,
                        'author': {
                            'name': 'Verlosungs-Ende',
                            'icon_url':
                                'https://cdn.discordapp.com/emojis/714392829362831401.gif?size=96&quality=lossless',
                        },
                        'footer': {
                            'text': '⇢ Zetrox von Folizza Studios',
                            'icon_url':
                                'https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png',
                        },
                    });
                    let content = '';
                    if (winnercount > 0) {
                        const winnernames = [];
                        const winnermentions = [];
                        const users: string[] = structuredClone(gw.users);
                        let winnercount = gw.winnercount;
                        const winnerids = [];
                        while (winnercount != 0) {
                            const choice: string = randomChoice(users);
                            let user = await client.users.get(choice);
                            if (user == undefined) {
                                user = await client.users.resolve(choice);
                            }
                            if (user != undefined) {
                                users.splice(
                                    users.findIndex((user) => user === choice),
                                );
                                winnernames.push(user.username);
                                winnermentions.push(user.mention);
                                winnerids.push(user.id);
                            }
                            winnercount--;
                        }
                        embed.setTitle(winnernames.join(', '));
                        embed.setDescription(
                            `***Glückwunsch! ***\nIhr/Du hast **${gw.preis}** gewonnen!`,
                        );
                        content = winnermentions.join(' ');
                        let channel = await client.channels.get(gw.channel);
                        if (channel == undefined) {
                            channel = await client.channels.resolve(gw.channel);
                        }
                        if (channel != undefined && channel.isText()) {
                            if (gwdb.giveaways[index].winners.length > 0) {
                                gwdb.giveaways[index].ended = true;
                                check = true;
                                await await i.respond({
                                    content:
                                        ':game_die: Rerollen... :game_die:',
                                });
                                const controls: harmony.MessageComponentData[] =
                                    [
                                        {
                                            type: harmony.MessageComponentType
                                                .ACTION_ROW,
                                            components: [
                                                {
                                                    type: harmony
                                                        .MessageComponentType
                                                        .BUTTON,
                                                    style: harmony.ButtonStyle
                                                        .BLURPLE,
                                                    customID: 'gw-claim',
                                                    label: 'Claimen',
                                                    emoji: { name: '✅' },
                                                },
                                            ],
                                        },
                                    ];
                                const claimmsg = await i.channel?.send({
                                    embeds: [
                                        embed,
                                    ],
                                    content: content,
                                    components: controls,
                                });
                                if (claimmsg) {
                                    gwdb.giveaways[index].claimmsg =
                                        claimmsg.id;
                                }
                            }
                        }
                        gwdb.giveaways[index].winners = winnerids;
                        Deno.writeTextFileSync(
                            './databases/giveaways.json',
                            JSON.stringify(gwdb),
                        );
                    }
                }
                index++;
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

function randomChoice(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

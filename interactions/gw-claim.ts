import * as harmony from 'https://code.harmony.rocks/main';
import { saveDatabase } from '../util/database.ts';
import { noPerms } from '../util/noPerms.ts';
import { giveaway_database } from '../util/types.ts';

export async function gwClaim(i: harmony.Interaction) {
    try {
        if (i.member && i.guild && i.message) {
            const gwdb: giveaway_database = JSON.parse(
                Deno.readTextFileSync('./databases/giveaways.json'),
            );
            let index = 0;
            for (const gw of gwdb.giveaways) {
                if (gw.claimmsg == i.message.id) {
                    if (
                        gw.winners.findIndex((index) =>
                            index === i.member?.id
                        ) != -1
                    ) {
                        await i.respond({
                            content: '<:icons_Correct:947467655630164038> ' +
                                i.member?.user.mention +
                                ' hat seinen Preis geclaimt! <:icons_Correct:947467655630164038>',
                        });
                        gwdb.giveaways[index].winners.splice(
                            gwdb.giveaways[index].winners.findIndex((index) =>
                                index === i.member?.id
                            ),
                        );
                        if (gwdb.giveaways[index].winners == []) {
                            gwdb.giveaways.splice(index);
                        }
                        saveDatabase('giveaways.json', gwdb);
                    } else {
                        await i.respond({
                            content:
                                '<:icons_Wrong:947468536492752906> Du bist kein Gewinner dieser Verlosung oder hast deinen Preis schon geclaimt! <:icons_Wrong:947468536492752906>',
                            ephemeral: true,
                        });
                    }
                }
                index++;
            }
        }
    } catch (err) {
        console.log(err);
        noPerms(i);
    }
}

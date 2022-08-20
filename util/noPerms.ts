import * as harmony from 'https://code.harmony.rocks/main/mod.ts';

export async function noPerms(i: harmony.Interaction) {
    try {
        if (i) {
            await i.respond({
                embeds: [
                    {
                        'title':
                            `:warning: Da ist etwas schiefgelaufen! :warning:`,
                        'description': '*Dies kann an mehreren Sachen liegen.*',
                        'color': 13750554,
                        'fields': [
                            {
                                'name': 'Berechtigungen',
                                'value':
                                    'Achte darauf, dass der Bot die richtigen Berechtigungen hat.\nFalls das nicht der Fall ist, kannst du dem Bot [hier](https://dsc.gg/zetroxbot) die Berechtigungen geben.',
                            },
                            {
                                'name': 'Anderes',
                                'value':
                                    'Falls es nicht daran liegt, melde dich bitte auf [unserem Server](https://discord.gg/mAFaUnT).',
                            },
                        ],
                        'footer': {
                            'text': '⇢ Zetrox von Folizza Studios',
                            'icon_url':
                                'https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png',
                        },
                    },
                ],
                ephemeral: true,
            });
        }
    } catch (err) {
        console.log(err);
    }
}

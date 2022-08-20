import * as harmony from 'https://code.harmony.rocks/main';
import { noPerms } from '../util/noPerms.ts';
export async function achtball(i: harmony.Interaction) {
    try {
        if (i.isApplicationCommand() && i.option<string>('frage')) {
            const antworten = [
                'Nein',
                'Ja',
                'Vielleicht',
                'Auf jeden Fall!',
                'Warscheinlich',
                'Ich denke schon',
                'Jo',
                'Ne',
                'Weiß nicht',
            ];
            const antwort = randomChoice(antworten);
            await i.respond({
                embeds: [
                    {
                        'title': ':8ball: 8ball :8ball:',
                        'description': 'Deine Frage: ' +
                            i.option<string>('frage') + '\n```yaml\n' +
                            antwort + '\n```',
                        'color': 44469,
                        'footer': {
                            'text': '⇢ Zetrox von Folizza Studios',
                            'icon_url':
                                'https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png',
                        },
                    },
                ],
            });
        }
    } catch (err) {
        console.log(err);
        noPerms(i);
    }
}

function randomChoice(arr: string[] | number[] | Record<string, unknown>[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

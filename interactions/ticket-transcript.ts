import * as harmony from 'https://code.harmony.rocks/main';
import { noPerms } from '../util/noPerms.ts';
import {
    NeocitiesAPI,
    type UploadableFile,
} from 'https://deno.land/x/neocities@v0.1.0/mod.ts';
export async function ticketTranscript(i: harmony.Interaction) {
    try {
        if (i.member && i.channel && i.guild && i.isMessageComponent()) {
            let messages = await (await i.channel.fetchMessages()).array();
            let content = `
<img src='../logo.png'><link rel='stylesheet' href='../tstyle.css'> </head><meta charset='UTF-8'><h1>Nachrichten</h1>
            `;
            messages = messages.reverse();
            messages.forEach((message) => {
                if (message.author.bot != true) {
                    content += '<p>[' + message.author.username + '] ' +
                        message.content + '</p>';
                }
            });
            const r = Math.floor(Math.random() * 99999999999999999999);
            const api = new NeocitiesAPI('ebd082bc357cc40b1ccbfaba526f6dba');
            const files: UploadableFile[] = [
                {
                    data: content,
                    uploadPath: 'tickets/' + r + '.html',
                },
            ];

            await api.upload(files);
            await i.respond({
                content:
                    '<:icons_Correct:947467655630164038> Transkript erstellt! https://zetrox.neocities.org/tickets/' +
                    r + '.html <:icons_Correct:947467655630164038>',
            });
        }
    } catch (err) {
        console.log(err);
        noPerms(i);
    }
}

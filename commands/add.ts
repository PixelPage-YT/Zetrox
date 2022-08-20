import * as harmony from 'https://code.harmony.rocks/main';
import { noPerms } from '../util/noPerms.ts';

import { bonusAddMessages } from './bonus/messages.ts';
import { bonusAddInvites } from './bonus/invites.ts';
import { bonusAddGamePoints } from './bonus/gamepoints.ts';
export function add(i: harmony.Interaction) {
    try {
        if (i.isApplicationCommand()) {
            if (i.option<string>('type')) {
                const type = i.option<string>('type');
                if (type == 'addmsgs') {
                    bonusAddMessages(i);
                }
                if (type == 'addinvs') {
                    bonusAddInvites(i);
                }
                if (type == 'addgps') {
                    bonusAddGamePoints(i);
                }
            }
        }
    } catch (err) {
        console.log(err);
        noPerms(i);
    }
}

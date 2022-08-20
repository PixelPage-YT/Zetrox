import { bonusRemoveMessages } from './bonus/messages.ts';
import { bonusRemoveInvites } from './bonus/invites.ts';
import { bonusRemoveGamePoints } from './bonus/gamepoints.ts';

import * as harmony from 'https://code.harmony.rocks/main';
import { noPerms } from '../util/noPerms.ts';
export function remove(i: harmony.Interaction) {
    try {
        if (i.isApplicationCommand()) {
            if (i.option<string>('type')) {
                const type = i.option<string>('type');
                if (type == 'removemsgs') {
                    bonusRemoveMessages(i);
                }
                if (type == 'removeinvs') {
                    bonusRemoveInvites(i);
                }
                if (type == 'removegps') {
                    bonusRemoveGamePoints(i);
                }
            }
        }
    } catch (err) {
        console.log(err);
        noPerms(i);
    }
}

import * as harmony from 'https://code.harmony.rocks/main';
import { gwTeilnehmen } from '../interactions/gw-teilnehmen.ts';
import { gwClaim } from '../interactions/gw-claim.ts';
import { gwReroll } from '../interactions/gw-reroll.ts';
import { gwEnd } from '../interactions/gw-end.ts';
import { helpselect } from '../commands/help.ts';
import { gwSeeMembers } from '../interactions/gw-seemembers.ts';
import { ticketCreate } from '../interactions/ticket-create.ts';
import { ticketClose } from '../interactions/ticket-close.ts';
import { ticketOpen } from '../interactions/ticket-open.ts';
import { ticketDelete } from '../interactions/ticket-delete.ts';
import { ticketTranscript } from '../interactions/ticket-transcript.ts';

import { verifyVerify } from '../interactions/verify-verify.ts';
export function interactionCreate(
    i: harmony.Interaction,
    client: harmony.Client,
) {
    if (i.isMessageComponent()) {
        if (i.customID == 'gw-teilnehmen') {
            gwTeilnehmen(i);
        } else if (i.customID == 'gw-claim' && i.member) {
            gwClaim(i);
        } else if (i.customID == 'help-select') {
            helpselect(i);
        } else if (i.customID == 'verify-verify') {
            verifyVerify(i, client);
        } else if (i.customID == 'ticket-create') {
            ticketCreate(i, client);
        } else if (i.customID == 'ticket-close') {
            ticketClose(i, client);
        } else if (i.customID == 'ticket-open') {
            ticketOpen(i, client);
        } else if (i.customID == 'ticket-delete') {
            ticketDelete(i);
        } else if (i.customID == 'ticket-transcript') {
            ticketTranscript(i);
        }
    }
    if (i.isApplicationCommand() && i.targetMessage) {
        gwReroll(i, client);
    }
    if (i.isApplicationCommand() && i.targetMessage) {
        gwEnd(i);
    }
    if (
        i.isApplicationCommand() && i.targetMessage &&
        i.name == 'Teilnehmer anzeigen'
    ) {
        gwSeeMembers(i, client);
    }
}

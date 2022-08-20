import * as harmony from 'https://code.harmony.rocks/main/mod.ts';
import { help } from './commands/help.ts';
import { verifypanel } from './commands/verifypanel.ts';
import { ticketpanel } from './commands/ticketpanel.ts';
import { messages } from './commands/messages.ts';
import { invites } from './commands/invites.ts';
import { gamePoints } from './commands/gamePoints.ts';
import { ready } from './listeners/ready.ts';
import { messageCreate } from './listeners/messageCreate.ts';
import { leaderboard } from './commands/leaderboard.ts';
import { eInviteKanal } from './commands/einstellungen/inviteKanal.ts';
import { eAntiSpamTime } from './commands/einstellungen/antiSpamTime.ts';
import { eTeamRole } from './commands/einstellungen/teamRole.ts';
import { gtn } from './commands/gtn.ts';
import { info } from './commands/info.ts';
import { emojiquiz } from './commands/emojiquiz.ts';
import { quiz } from './commands/quiz.ts';
import { ssp } from './commands/ssp.ts';
import {
    resetGamePoints,
    resetInvites,
    resetMessages,
} from './commands/reset.ts';
import { deleteStats, minecraftStats, serverStats } from './commands/stats.ts';
import { gstart } from './commands/gstart.ts';
import { giveaway } from './commands/giveaway.ts';
import { interactionCreate } from './listeners/interactionCreate.ts';
import { guildMemberAdd } from './listeners/guildMemberAdd.ts';
import { updateStats } from './loops/updateStats.ts';
import { checkGW } from './loops/checkGW.ts';
import { guildMemberRemove } from './listeners/guildMemberRemove.ts';
import { achtball } from './commands/8ball.ts';
import { add } from './commands/add.ts';
import { remove } from './commands/remove.ts';

const startDate = Date.now();
export { startDate };

class Zetrox extends harmony.Client {
    oinvites = [];
    @harmony.slash()
    help(i: harmony.Interaction) {
        help(i);
    }

    @harmony.slash()
    messages(i: harmony.Interaction) {
        messages(i);
    }

    @harmony.slash()
    invites(i: harmony.Interaction) {
        invites(i);
    }

    @harmony.slash()
    gamepoints(i: harmony.Interaction) {
        gamePoints(i);
    }

    @harmony.event()
    ready() {
        ready(this);
    }

    @harmony.subslash('einstellungen', 'invitekanal')
    invitekanal(i: harmony.Interaction) {
        eInviteKanal(i);
    }

    @harmony.subslash('einstellungen', 'antispamtime')
    antispamtime(i: harmony.Interaction) {
        eAntiSpamTime(i);
    }

    @harmony.subslash('einstellungen', 'teamrole')
    teamrole(i: harmony.Interaction) {
        eTeamRole(i);
    }

    @harmony.slash('add')
    add(i: harmony.Interaction) {
        add(i);
    }

    @harmony.slash('remove')
    remove(i: harmony.Interaction) {
        remove(i);
    }

    @harmony.slash('lb')
    lb(i: harmony.Interaction) {
        leaderboard(i, this);
    }
    @harmony.slash('leaderboard')
    leaderboard(i: harmony.Interaction) {
        leaderboard(i, this);
    }

    @harmony.slash('gtn')
    gtn(i: harmony.Interaction) {
        gtn(i, this);
    }
    @harmony.slash('info')
    info(i: harmony.Interaction) {
        info(i, this);
    }

    @harmony.slash('emojiquiz')
    emojiquiz(i: harmony.Interaction) {
        emojiquiz(i, this);
    }

    @harmony.slash('quiz')
    quiz(i: harmony.Interaction) {
        quiz(i, this);
    }

    @harmony.subslash('reset', 'messages')
    resetMessages(i: harmony.Interaction) {
        resetMessages(i);
    }
    @harmony.subslash('reset', 'invites')
    resetInvites(i: harmony.Interaction) {
        resetInvites(i);
    }
    @harmony.subslash('reset', 'gamepoints')
    resetGamePoints(i: harmony.Interaction) {
        resetGamePoints(i);
    }

    @harmony.slash('ssp')
    ssp(i: harmony.Interaction) {
        ssp(i, this);
    }

    @harmony.subslash('stats', 'server')
    serverStats(i: harmony.Interaction) {
        serverStats(i);
    }
    @harmony.subslash('stats', 'minecraft')
    minecraftStats(i: harmony.Interaction) {
        minecraftStats(i);
    }

    @harmony.slash('gstart')
    gstart(i: harmony.Interaction) {
        gstart(i);
    }
    @harmony.slash('giveaway')
    giveaway(i: harmony.Interaction) {
        giveaway(i, this);
    }
    @harmony.slash('verifypanel')
    verifypanel(i: harmony.Interaction) {
        verifypanel(i, this);
    }

    @harmony.slash('8ball')
    achtball(i: harmony.Interaction) {
        achtball(i);
    }

    @harmony.slash('ticketpanel')
    ticketpanel(i: harmony.Interaction) {
        ticketpanel(i, client);
    }

    @harmony.subslash('stats', 'delete')
    deleteStats(i: harmony.Interaction) {
        deleteStats(i, this);
    }
}

const client = new Zetrox();
const config: { devtoken: string; token: string, supabaseToken: string } = JSON.parse(
    Deno.readTextFileSync('config.json'),
);
const token: string = config.devtoken;

setInterval(checkGW, 3000, client);
setInterval(updateStats, 40000, client);

client.interactions.on('interactionError', (err) => {
    console.log(err);
});
client.on('messageCreate', (message) => {
    messageCreate(message);
});
client.on('guildMemberAdd', (member: harmony.Member) => {
    //const channel = member.guild.channels.resolve('');
    guildMemberAdd(member, client);
});
client.on('inviteCreate', (invite: harmony.Invite) => {
    // @ts-ignore Bug
    client.oinvites[invite.code] = invite.uses;
});
client.on('guildMemberRemove', (member: harmony.Member) => {
    guildMemberRemove(member);
});
client.on('interactionCreate', (i: harmony.Interaction) => {
    interactionCreate(i, client);
});

client.setPresence({ type: 'PLAYING', name: '/help | 🇺🇦' });
client.connect(token, [
    harmony.GatewayIntents.GUILD_MESSAGES,
    harmony.GatewayIntents.GUILD_INVITES,
    harmony.GatewayIntents.GUILD_MEMBERS,
    harmony.GatewayIntents.GUILDS,
]);

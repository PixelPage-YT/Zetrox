export type guild_setting = {
    id: string;
    teamRole: string;
    antiSpamTime: number;
    inviteChannel: string;
};

export type emojiquiz_solution = {
    emojis: string;
    points: number;
    solutions: string[];
};

export type giveaway_req = {
    type: string;
    value: string | number;
};

export type giveaway_bypass = {
    type: string;
    value: string;
};

export type gamepoints_member = {
    member: string;
    count: number;
};

export type invites_member = {
    member: string;
    count: number;
};

export type messages_member = {
    member: string;
    count: number;
};

export type quiz_solution = {
    frage: string;
    possible: string[];
    solution: number;
    points: number;
};

export type giveaway_database = {
    giveaways: {
        claimmsg: string | undefined;
        msgid: string;
        winners: string[];
        channel: string;
        end: number;
        winnercount: number;
        users: string[];
        preis: string;
        ended: boolean | undefined;
        reqs: { type: string; value: string | number }[] | undefined;
        start: number | undefined;
        bypass: undefined | { type: string; value: string };
    }[];
};

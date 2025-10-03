export type FeedEntry = {
    _id: string;
    amount: number;
    date: string;
    guardian: string;
    time: string;
    type: string;
};

export type SleepEntry = {
    _id: string;
    fromTime: string;
    toTime: string;
    elapsedTime: string;
    date: string;
    guardian: string;
};

export type DiaperEntry = {
    _id: string;
    type: string;
    time: string;
    date: string;
    guardian: string;
};

export type SickEntry = {
    _id: string;
    notes: string;
    time: string;
    date: string;
    guardian: string;
};

export type InjuryEntry = {
    _id: string;
    notes: string;
    time: string;
    date: string;
    guardian: string;
};

export type DoctorEntry = {
    _id: string;
    notes: string;
    time: string;
    date: string;
    guardian: string;
};

export type PictureEntry = {
    _id: string;
    guardian: string;
    imageUri: string;
    caption: string;
    date: string;
    imageUrl: string;
};


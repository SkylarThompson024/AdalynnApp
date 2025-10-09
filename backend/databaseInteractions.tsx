import type {
    DiaperEntry,
    DoctorEntry,
    FeedEntry,
    InjuryEntry,
    SickEntry,
    SleepEntry,
    PictureEntry,
} from "../src/assets/constants";

const BASE_URL = 'https://adalynnapp1.onrender.com/'

const fetchFeedEntries = async (): Promise<FeedEntry[]> => {
    try {
        const response = await fetch(BASE_URL + 'feed');
        const data: FeedEntry[] = await response.json();
        console.log('Feed Entries: ', data);

        const entries: FeedEntry[] = [];

        for (const entry of data) {
            const {
                _id,
                amount,
                date,
                guardian,
                time,
                type,
            } = entry;

            entries.push({
                _id,
                amount,
                date,
                guardian,
                time,
                type,
            });
        }

        return entries;

  } catch (error) {
    console.error('Failed to fetch feed: ', error);
    return [];
  }
};
const postFeedEntry = async ({ amount, date, guardian, time, type }: {amount: number, date: string, guardian: string, time: string, type: string}) => {
    try { 
        const response = await fetch(BASE_URL + 'feed', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount,     
                date,       
                guardian,   
                time,       
                type,       
            }),
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Entry Posted!: ', result);
        } else {
            console.warn('Server responded with error: ', result.error);
        }
    } catch (error) {
        console.error('Failed to post entry: ', error);
    }
};

const fetchSleepEntries = async (): Promise<SleepEntry[]> => {
    try {
        const response = await fetch(BASE_URL + 'sleep');
        const data: SleepEntry[] = await response.json();
        console.log("Sleep Entries: ", data);

        const entries: SleepEntry[] = [];

        for (const entry of data) {
            const {
                _id,
                fromTime,
                toTime,
                elapsedTime,
                date,
                guardian,              
            } = entry;

            entries.push({
                _id,
                fromTime,
                toTime,
                elapsedTime,
                date,
                guardian,
            });
        }

        return entries;

    } catch (error) {
        console.error('Failed to fetch sleep: ', error);
        return [];
    }
};
const postSleepEntry = async ({ fromTime, toTime, elapsedTime, date, guardian } : {fromTime: string, toTime: string, elapsedTime: string, date: string, guardian: string}) => {
    try {
        const response = await fetch(BASE_URL + 'sleep', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                fromTime,       
                toTime,
                elapsedTime,
                date,
                guardian,
            }),
        });

        
        const result = await response.json();

        if (response.ok) {
            console.log('Entry posted!: ', result);
        } else {
            console.warn('Server responded with error: ', result.error);
        }
    } catch (error) {
        console.error('Failed to post entry: ', error);
    }
};

const fetchDiaperEntries = async (): Promise<DiaperEntry[]> => {
    try {
        const response = await fetch(BASE_URL + 'diaper');
        const data: DiaperEntry[] = await response.json();
        console.log('Diaper Entries: ', data);

        const entries: DiaperEntry[] = [];

        for (const entry of data) {
            const {
                _id,
                type,
                date,
                guardian,
                time,
            } = entry;

            entries.push({
                _id,
                type,
                date,
                guardian,
                time,
            });
        }

        return entries;

    } catch (error) {
        console.error('Failed to fetch diaper: ', error);
        return [];
    }
};
const postDiaperEntry = async ({ type, date, guardian, time }:{type: string, date: string, guardian: string, time: string}) => {
    try {
        const response = await fetch(BASE_URL + 'diaper', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type,
                date,
                guardian,
                time,
            }),
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Entry Posted!: ', result);
        } else {
            console.warn('Server responded with error: ', result.error);
        }
    } catch (error) {
        console.error('Failed to post entry: ', error);
    }
};

const fetchSickEntries = async (): Promise<SickEntry[]> => {
    try {
        const response = await fetch(BASE_URL + 'sick');
        const data: SickEntry[] = await response.json();
        console.log('Sick Entries: ', data);

        const entries: SickEntry[] = [];

        for (const entry of data) {
            const {
                _id,
                date,
                time,
                notes,
                guardian,
            } = entry;

            entries.push({
                _id,
                date,
                time,
                notes,
                guardian,
            });
        }

        return entries;
    } catch (error) {
        console.error('Failed to fetch sick: ', error);
        return [];
    }
};
const postSickEntry = async ({date, time, notes, guardian}:{date: string, time: string, notes: string, guardian: string}) => {
    try {
        const response = await fetch(BASE_URL + 'sick', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date,
                time,
                notes,
                guardian, 
            }),
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Entry Posted!: ', result);
        } else {
            console.warn('Server responded with error: ', result.error);
        }
    } catch (error) {
        console.error('Failed to post entry: ', error);
    }
};

const fetchInjuryEntries = async (): Promise<InjuryEntry[]> => {
    try {
        const response = await fetch(BASE_URL + 'injury');
        const data: InjuryEntry[] = await response.json();
        console.log('Injury Entries: ', data);

        const entries: InjuryEntry[] = [];

        for (const entry of data) {
            const {
                _id,
                date,
                time,
                notes,
                guardian,
            } = entry;

            entries.push({
                _id,
                date,
                time,
                notes,
                guardian,
            });
        }

        return entries;
    } catch (error) {
        console.error('Failed to fetch injury: ', error);
        return [];
    }
};
const postInjuryEntry = async ({date, time, notes, guardian}:{date: string, time: string, notes: string, guardian: string}) => {
    try {
        const response = await fetch(BASE_URL + 'injury', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date,
                time,
                notes,
                guardian, 
            }),
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Entry Posted!: ', result);
        } else {
            console.warn('Server responded with error: ', result.error);
        }
    } catch (error) {
        console.error('Failed to post entry: ', error);
    }
};

const fetchDoctorEntries = async (): Promise<DoctorEntry[]> => {
    try {
        const response = await fetch(BASE_URL + 'doctor');
        const data: DoctorEntry[] = await response.json();
        console.log('Doctor Entries: ', data);

        const entries: DoctorEntry[] = [];

        for (const entry of data) {
            const {
                _id,
                date,
                time,
                notes,
                guardian,
            } = entry;

            entries.push({
                _id,
                date,
                time,
                notes,
                guardian,
            });
        }

        return entries;
    } catch (error) {
        console.error('Failed to fetch doctor: ', error);
        return [];
    }
};
const postDoctorEntry = async ({date, time, notes, guardian}:{date: string, time: string, notes: string, guardian: string}) => {
    try {
        const response = await fetch(BASE_URL + 'doctor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date,
                time,
                notes,
                guardian, 
            }),
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Entry Posted!: ', result);
        } else {
            console.warn('Server responded with error: ', result.error);
        }
    } catch (error) {
        console.error('Failed to post entry: ', error);
    }
};

const fetchPictureEntries = async ():Promise<PictureEntry[]> => {
    try {
        const response = await fetch(BASE_URL + 'picture');
        const data: PictureEntry[] = await response.json();
        console.log('Picture Entries: ', data);
        
        const entries: PictureEntry[] = [];

        for (const entry of data) {
            const {
                _id,
                guardian,
                imageUri,
                caption,
                date,
                imageUrl,
            } = entry;

            entries.push({
                _id,
                guardian,
                imageUri,
                caption,
                date,
                imageUrl,
            });
        }
        //console.log(`=============ImageURL: ${entries[0].imageUrl}`)
        return entries;
    } catch (error) {
        console.error('Failed to fetch picture: ', error);
        return [];
    }
};
const postPictureEntry = async ({guardian, imageUri, caption, date}:{guardian: string, imageUri: string, caption: string, date: string}) => {
    try {
        //The imageUri is not a URL just the file image from the users phone
        const formData = new FormData();
        //Append the image file
        formData.append('photo', {
            uri: imageUri,
            name: 'upload.png',
            type: 'image/png', 
        } as any);
        //Append the rest of the metadata
        formData.append('guardian', guardian);
        formData.append('caption', caption);
        formData.append('date', date);
        
        const response = await fetch(BASE_URL + 'picture', {
            method: 'POST',
            body: formData,
            //No need for set Content-Type for multipart/form-data
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Upload success: ', result);
        } else {
            console.warn('Server responded with error: ', result.error);
        }
    } catch (error) {
        console.error('Failed to post entry: ', error);
    }
};





export {
    fetchDiaperEntries,
    fetchDoctorEntries,
    fetchFeedEntries,
    fetchInjuryEntries,
    fetchSickEntries,
    fetchSleepEntries,
    fetchPictureEntries,
    postDiaperEntry,
    postDoctorEntry,
    postFeedEntry,
    postInjuryEntry,
    postSickEntry,
    postSleepEntry,
    postPictureEntry,
};


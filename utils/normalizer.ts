import type { ArrayDB, NewArrayDB, Workout } from "./types";

function formatTime(hours: number, minutes: number, seconds: number): string {
    const formattedHours = hours.toString().padStart(2, '0')
    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedSeconds = seconds.toString().padStart(2, '0')
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}

function timeToSeconds(time: string) {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return (hours * 60 + minutes) * 60 + seconds;
}

function formatTimeSeconds(totalSeconds: number, withHours?: boolean): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const time = [];

    if (withHours || hours) {
        const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
        time.push(formattedHours);
    }

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    time.push(formattedMinutes);

    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    time.push(formattedSeconds);

    let finalTime = "";
    for (let i = 0; i < time.length; i++) {
        finalTime += time[i]
        if (i !== time.length - 1) {
            finalTime += ":";
        }
    }
    return finalTime;
}

function calcTotalTime(workout: Workout) {
    const { prepTime, activeTime, restTime, restBetweenSets, series, sets } = workout;
    return (+prepTime + ((+activeTime + +restTime) * (+series - 1) + (+activeTime + +restBetweenSets)) * +sets) - +restBetweenSets;
}

function normalizer(arrayDB: ArrayDB): NewArrayDB {
    const newArray: NewArrayDB = [];

    arrayDB.forEach(workout => {
        const { id, name, prepTime, activeTime, restTime, restBetweenSets, series, sets } = workout;

        const newObject = {
            id: id,
            name: name,
            prepTime: formatTimeSeconds(prepTime),
            activeTime: formatTimeSeconds(activeTime),
            restTime: formatTimeSeconds(restTime),
            restBetweenSets: formatTimeSeconds(restBetweenSets),
            series: series,
            sets: sets,
            totalTime: formatTimeSeconds(calcTotalTime(workout), true)
        }

        newArray.push(newObject)
    });

    return newArray
}

export default normalizer;
export { formatTimeSeconds, calcTotalTime, formatTime, timeToSeconds };

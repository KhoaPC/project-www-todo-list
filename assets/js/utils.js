// vercel: NextJS
// matBao

/* CONVENTIONS 🍀
    [+] new
    [*] modify
    [-] remove
    [!] fix bug
*/
// [+] formatTime(format: string, input = currentTime: string | DateTime): string
// formatTime('YYYY-MM-dd')               => 2022-08-15
// formatTime('dd/MM/YYYY', '2022-08-15') => 15/08/2022

/* TODO 💪

   

*/
function CheckOperatingSystem() {
    let NameOperatingSystem = '';
    if (navigator.userAgent.indexOf("Win") != -1) NameOperatingSystem =
        "Windows";
    if (navigator.userAgent.indexOf("Mac") != -1) NameOperatingSystem =
        "Mac";
    if (navigator.userAgent.indexOf("Linux") != -1) NameOperatingSystem =
        "Linux";
    if (navigator.userAgent.indexOf("like Mac") != -1) NameOperatingSystem =
        "iOS";
    if (navigator.userAgent.indexOf("Android") != -1) NameOperatingSystem =
        "Android";

    return NameOperatingSystem;
}

function editTime(time) {
    return time < 10 ? `0${time}` : time;
} // editTime

function getTime() {
    const newTime = new Date();
    const minutes = newTime.getMinutes();
    const hours = newTime.getHours();
    const date = newTime.getDate();
    const month = newTime.getMonth() + 1;
    const year = newTime.getFullYear();

    return `${editTime(hours )}:${editTime(minutes)}.${editTime(date)}-${editTime(month)}-${year}`;
} // getTime

function getTimeToday() {
    const newTime = new Date();
    const date = newTime.getDate();
    const month = newTime.getMonth() + 1;
    const year = newTime.getFullYear();

    return [
        Number(editTime(date)),
        Number(editTime(month)),
        year
    ];
} // getTimeToday

function totalDay(dateString) {
    const secondsInADay = 24 * 60 * 60;
    const stampOfToday = (new Date()).getTime();
    const stampOfInput = (new Date(dateString)).getTime();
    const deltaInSeconds = (stampOfInput - stampOfToday) / 1000;

    return Math.ceil(deltaInSeconds / secondsInADay);
} // totalDay

function getDayName() {
    let dayName;
    const newDate = new Date;
    const currentDay = newDate.getDay() + 1;

    switch (currentDay) {
        case 1:
            dayName = "Sunday";
            break;
        case 2:
            dayName = "Monday";
            break;
        case 3:
            dayName = "Tuesday";
            break;
        case 4:
            dayName = "Wednesday";
            break;
        case 5:
            dayName = "Thursday";
            break;
        case 6:
            dayName = "Friday";
            break;
        case 7:
            dayName = "Saturday";
    } // switch
    return dayName;
} // getDayName

function getDeadline(arrTime) {
    const monthM31 = [1, 3, 5, 7, 8, 10, 12];
    const monthSpecial = 2;
    let years;
    let months;
    let days;

    //#region count year, month, day.
    years = (arrTime[2] - getTimeToday()[2]);

    months;
    if (arrTime[1] >= (getTimeToday()[1]))
        months = arrTime[1] - (getTimeToday()[1]);
    else {
        months = 12 + arrTime[1] - (getTimeToday()[1]);
        years -= 1;
    } // else

    days = arrTime[0] - (getTimeToday()[0]);
    if (arrTime[0] - (getTimeToday()[0]) < 0 && arrTime[1] == (getTimeToday()[1])) {
        years -= 1;
        months += 12;
        months -= 1;

        monthM31.forEach(item => {
            if (arrTime[1] == item) {
                days += 31;

            } else if (arrTime[1] == monthSpecial) {
                days += 28;
            } // else if
        }); // forEach
        const monthOdd = [4, 6, 9, 11];
        monthOdd.forEach(item => {
            if (arrTime[1] == item) {
                days += 30;
            }
        }); //forEach
    } else if (arrTime[0] - (getTimeToday()[0]) >= 0) {
        days = arrTime[0] - (getTimeToday()[0]);
    } else {
        monthM31.forEach(item => {
            if (getTimeToday()[1] == item) {
                days += 31;

                if (months <= 0) {
                    months += 12;
                    months -= 1;
                    years -= 1;
                } else {
                    months -= 1;
                }
            } else if (getTimeToday()[1] == monthSpecial) {
                days += 28;
                months -= 1;
            } // else if
        }); // forEach
        const monthOdd = [4, 6, 9, 11];
        monthOdd.forEach(item => {
            if (getTimeToday()[1] == item) {
                days += 30;
                months -= 1;
            }
        }); //forEach
    }
    // #endregion count year, month, day.

    if (getTimeToday()[0] == arrTime[0]) {
        days = 0;
    } // if     

    const dayStrings = arrTime.reverse().toString().replace(/,/g, '-');
    const totalDays = totalDay(dayStrings);

    const text =
        totalDays == -1 ?
            'Yesterday' :
            totalDays == 0 ?
                '' :
                totalDays == 1 ?
                    'Tomorrow' :
                    totalDays <= 6 ?
                        `${totalDay(dayStrings)} day` :
                        totalDays == 7 ?
                            `Next ${getDayName()}` :
                            `${years <= 0 ? '' : `${years} year`} ${months <= 0 ? '' : `${months} month`} ${days <= 0 ? '' : `${days} day`}`

    return {
        totalDays,
        text
    }
} // getDeadline 

function moveItem(arr, fromIndex, toIndex) {
    const item = arr.at(fromIndex);

    // remove item from current location
    arr.splice(fromIndex, 1);
    // insert toIndex
    arr.splice(toIndex, 0, item);

    return arr;
}

function getIndexItem(arr, item) {
    let index = arr.indexOf(item);
 
    return index;
}
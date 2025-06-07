export function generateCalendar(month, year) {
    const weeks = [];
    const firstDay = new Date(year, month - 1, 1).getDay(); // 0 = Sunday
    const daysInMonth = new Date(year, month, 0).getDate();

    let currentWeek = Array(firstDay).fill(null); // เติมช่องว่างก่อนวันที่ 1
    for (let day = 1; day <= daysInMonth; day++) {
        currentWeek.push(day);
        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    }

    // ถ้าอาทิตย์สุดท้ายยังไม่ครบ 7 ช่อง ให้เติม null
    if (currentWeek.length > 0) {
        while (currentWeek.length < 7) currentWeek.push(null);
        weeks.push(currentWeek);
    }

    return weeks;
}

export const getMymood = async (userId, thisMonth, thisYear) => {
    const res = await fetch('/api/getMood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, thisMonth, thisYear }),
    });

    const data = await res.json();
    if (data) {
        const convertedData = data.map(item => ({ //แปลง dateAt ให้เเป็น type Date
            ...item,
            dateAt: new Date(item.dateAt)
        }));
        return convertedData;
    }

}


export const nextMonth = (thisMonth, thisYear, setThismonth, setTthisYear) => {
    if (thisMonth === 11) {
        setThismonth(0);
        setTthisYear(thisYear + 1);
    }
    else {
        setThismonth(thisMonth + 1)
    }
}

export const prevMonth = (thisMonth, thisYear, setThismonth, setTthisYear) => {
    if (thisMonth === 0) {
        setThismonth(11);
        setTthisYear(thisYear - 1);
    }
    else {
        setThismonth(thisMonth - 1);
    }
}
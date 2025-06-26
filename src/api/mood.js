
//เพิ่ม mood 
export const addMood = async (userId, userText, moodValue) => {
    try {
        const res = await fetch(`${API}/api/addMood`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, userText, moodValue })
        });

        const data = await res.json();
        if (data) {
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

//อัพเดตเวลาต่อเนื่องการบันทึกอารมณ์
export const updateDayStack = async ( userId ) => {
    try {
        const res = await fetch(`${API}/api/updateDayStack`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
        });

        const data = await res.json();
        if( res.ok && data.success ){
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

//สร้างปฏิทิน
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

//ดึงข้อมูลอารมณ์ทั้งหมด
export const getMymood = async (userId, thisMonth, thisYear) => {
    const res = await fetch(`${API}/api/getMood`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, thisMonth, thisYear }),
    });

    const data = await res.json();
    if (data && data.success) {
        const moodObj = data.data;
        const convertedData = moodObj.map(item => ({ //แปลง dateAt ให้เเป็น type Date
            ...item,
            dateAt: new Date(item.dateAt)
        }));
        return convertedData;
    }
    else{
        return [];
    }

}

//เพิ่มจำนวนเดือน
export const nextMonth = (thisMonth, thisYear, setThismonth, setTthisYear) => {
    if (thisMonth === 11) {
        setThismonth(0);
        setTthisYear(thisYear + 1);
    }
    else {
        setThismonth(thisMonth + 1)
    }
}

//ลดจำนวนเดือน
export const prevMonth = (thisMonth, thisYear, setThismonth, setTthisYear) => {
    if (thisMonth === 0) {
        setThismonth(11);
        setTthisYear(thisYear - 1);
    }
    else {
        setThismonth(thisMonth - 1);
    }
}

//ดึงข้อมูลอารมณ์ของเมื่อวาน
export const getLatestMood = async (userId, setLatestMood) => {
    const res = await fetch(`${API}/api/getLatestMood`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
    });

    const value = await res.json();
    if (res.ok && value.success) {
        setLatestMood(value.data);
        return;
    }else{
        setLatestMood(null);
    }
}

//ดึงข้อมูลเวลาต่อเนื่องการบันทึกอารมณ์
export const getDayStack = async (userId, setDayStack) => {
    const res = await fetch(`${API}/api/getDayStack`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
    });

    const value = await res.json();
    if(res.ok && value.success){
        setDayStack(value.data);
    }
}
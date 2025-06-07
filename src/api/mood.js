export const addMood = async (userId, userMood, userText, moodValue) => {
    try {
        const res = await fetch('/api/addMood', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, userMood, userText, moodValue })
        });

        const data = await res.json();
        if (data) {
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateDayStack = async ( userId ) => {
    try {
        const res = await fetch('/api/updateDayStack', {
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
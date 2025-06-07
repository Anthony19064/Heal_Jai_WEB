export const getLatestMood = async (userId, setLatestMood) => {
    const res = await fetch('/api/getLatestMood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
    });

    const value = await res.json();
    if (res.ok && value.success) {
        setLatestMood(value.data);
    }
}

export const getDayStack = async (userId, setDayStack) => {
    const res = await fetch('/api/getDayStack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
    });

    const value = await res.json();
    if(res.ok && value.success){
        setDayStack(value.data);
    }
}
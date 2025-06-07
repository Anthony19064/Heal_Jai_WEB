export const getMypost = async (ownerId) => {
    try {
        const res = await fetch('/api/getMypost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ownerId }), //ส่งไอดีตัวเอง
        });

        const data = await res.json();
        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error)
    }
}
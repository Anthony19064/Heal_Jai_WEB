export const regis = async (username, mail, password, confirmPassword) => {
    try {
        const res = await fetch('/api/regis', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, mail, password, confirmPassword }),
        });

        const data = await res.json();
        if (data){
            return data
        }
        else{
            throw new Error(data.message)
        }

    } catch (error) {
        console.log(error)
    }
}
export const getAccount = async (postowner, setAccount) => {
    const res = await fetch('/api/getAccount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postowner }),
    });

    const data = await res.json();
    if (data) {
        setAccount(data);
    }
}

export const getCountComment = async (postID, setCountComment) => {
    const res = await fetch('/api/countComment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postID }),
    });

    const data = await res.json();
    if (data) {
        setCountComment(data);
    }
}


export const getComment = async (postID, setcommenObj) => {
    const resComment = await fetch('/api/getComment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postID }),
    });

    const data = await resComment.json();
    if (data) {
        // Promise.all รันพร้อมกัน
        const commentWithAccount = await Promise.all(
            data.map(async (item) => {
                const res = await fetch('/api/getAccount', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ postowner: item.ownerComment }),
                });
                const account = await res.json();
                return {
                    ...item,
                    username: account.username,
                    photo: account.photoURL
                };
            })
        );
        setcommenObj(commentWithAccount);
    }
}


export const addComment = async (postID, userId, commentInfo) => {
    const res = await fetch('/api/addComment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postID, userId, commentInfo }),
    })

    const data = await res.json();
    if (data) {
        return data
    }
}
// USER // 
export async function fetchUsers(body) {
    console.log(body);
    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

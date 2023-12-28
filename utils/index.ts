
export async function fetchUsers() {

        const response = await fetch(`/api/users`)
        const data = await response.json()

    return data.users
}
    

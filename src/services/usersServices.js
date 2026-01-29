export async function getUsers() {
    try {
        const response = await fetch('http://localhost:3000/users')
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error);
    }

}

export async function login(email) {
    const users = await getUsers()
    try {
        const userFind = users.filter(user => user.email == email)
        //Delete password
        /* const userCopy = { ...userFind }
        delete userCopy.password */
        if (userFind.length > 0) {
            sessionStorage.setItem('user', JSON.stringify(userFind))
            location.hash = '#/dashboard'
            return userFind
        } else {
            throw new Error("User doesn't exist")
        }

    } catch (error) {
        console.error(error);

    }
}

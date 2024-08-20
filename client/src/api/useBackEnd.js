import axios from 'axios';

export async function useRegister(url, username, password, email) {
    try {
        const { data, status } = await axios.post(url, {
            username,
            password,
            email
        })
        return { data, status }
    } catch ({ response }) {
        const data = response.data
        const status = response.status
        return { data, status }
    }
}

export async function useLogin(url, username, password) {
    try {
        const { data, status } = await axios.post(url, {
            username,
            password
        })
        return { data, status }
    } catch ({ response }) {
        const data = response.data
        const status = response.status
        return { data, status }
    }
}

export async function useMe(url, token) {
    try {
        const { data, status } = await axios.get(url, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        return { data, status }
    } catch ({ response }) {
        const data = response.data
        const status = response.status
        return { data, status }
    }
}
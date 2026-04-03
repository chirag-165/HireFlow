const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const login = async ( email , password ) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method : "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({email,password})
    });

    const data = await res.json();

    if(!res.ok){
        throw new Error(data.msg || "Login failed...")
    }

    return data;
}


export const register = async (formData) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        body: formData,
    });

    const data = await res.json();

    if(!res.ok){
        throw new Error(data.msg || "Registeration Failed");
    }

    return data;
};

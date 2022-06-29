import api from './AdminApi.js';

export const getAdminProfile = async () => {
    let response;
    try{
        response = await api.get('/admin/auth/profile');
    }catch(err){
        console.log(err);
    }
    return response;
}

export const logout = () => {
    window.localStorage.removeItem("token-lingo-admin");
}
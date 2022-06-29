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

export const changePassword = async (oldPassword, newPassword) => {
    let response = await api.post('/admin/auth/change-password', {
            oldPassword: oldPassword,
            newPassword: newPassword
        });
    return response;
}
import api from './AdminApi.js';
import axios from 'axios';
import { URL } from '../consts/index.js';

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

export const getAllGrammarWithPaginationAndKeyword = async (limit, offset, keyword) => {
    let response;
    try{
        let url = limit !== undefined
            ? (offset !== undefined
                ? (keyword !==undefined ? `?limit=${limit}&offset=${offset}&keyword=${keyword}` : `?limit=${limit}&offset=${offset}`)
                : (keyword !== undefined ? `?limit=${limit}&keyword=${keyword}` : `?limit=${limit}`))
            : (keyword !== undefined ? `?keyword=${keyword}` : '');
        console.log(url);
        response = await axios.get(`${URL}/user/grammar${url}`);
    }catch(err){
        console.log(err);
    }
    return response;
}
export const getListChapterInGrammar = async () => {
    let response;
    try{
        response = await api.get('/admin/auth/grammar/chapter/list');
    }catch(err){
        console.log(err);
    }
    return response;
}
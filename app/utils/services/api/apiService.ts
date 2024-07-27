import { signInRequest } from '../Dto/requestsTypes';
import { taskResponse } from '../Dto/responseTypes';
import apiClient from './apiClient';

export let AuthService={
    async loginApi(data:signInRequest){
        return await apiClient.post()
    }
}
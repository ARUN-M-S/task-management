import { signInRequest, signUpRequest, taskDataRequest,  taskRequests } from '../Dto/requestsTypes';
import { taskResponse } from '../Dto/responseTypes';
import { AuthUrls, TaskUrls } from '../urls/endPointUrls';
import apiClient from './apiClient';

export let AuthServices ={
    async signUp(data:signUpRequest){
        return await apiClient.post(AuthUrls.signUp,data)
    },
    async signIn(data:signInRequest){
        return await apiClient.post(AuthUrls.signIn,data)
    }
}


export let TaskServices ={
    async taskCreate(data:taskRequests){
        return await apiClient.post(TaskUrls.taskCreate,data)
    },
    async taskUpdate(data:taskRequests,id:number){
        return await apiClient.put(TaskUrls.task + '/' +id,data)
    },
    async taskDelete(id:number){
        return await apiClient.delete(TaskUrls.task + '/' + id)
    },
    async task(){
        return await apiClient.get(TaskUrls.task)
    }
}
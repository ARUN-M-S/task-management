export interface signUpRequest {
    email: string,
    name: string,
    passWord: string
}


export interface signInRequest {
    email: string,
    passWord: string
}

export interface taskDataRequest {
    id: number,
    title: string,
    description: string,
    status: string,
    priority: string
}
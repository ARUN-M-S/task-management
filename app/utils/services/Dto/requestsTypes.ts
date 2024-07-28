export interface signUpRequest {
    email: any,
    name: string,
    password: string
}
export interface taskRequests{
task :taskDataRequest
}

export interface signInRequest {
    email: string,
    password: string
}

export interface taskDataRequest {
    id?: number,
    title: string,
    description: string,
    status: string,
    priority: string
}


export enum TaskStatus {
    'To Do' = 1,
    'In Progress' = 2,
    'Done' = 0,
    'In Preview' = 3,
  }
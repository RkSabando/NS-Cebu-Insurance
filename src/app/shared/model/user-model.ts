import { Policy } from "./policy-model";

export interface User {
    email: string,
    id: string,
    name: string,
    role: string
}

export interface UserDetails {
    user: User,
    policy?: Policy[]
}
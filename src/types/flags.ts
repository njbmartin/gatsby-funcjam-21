export interface FlagModel {
    id: string
    name: string
    created: string
}

export interface UserFlags {
    userId: string
    flags: UserFlag
    created: string
    lastUpdated?: Date
}

export interface UserFlag {
    [name:string]: boolean
}

export interface FaunaResponse<T> {
    ref: string
    data: T
}
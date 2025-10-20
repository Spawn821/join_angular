export interface UserData {
    name: string,
    email: string,
    uid: string
}

export interface contacts {
    id?: string,
    name: string,
    email: string,
    firstContactperLetter: boolean,
    color: string,
    initials: string,
    phoneNumber: string
}

export interface newContact {
    name: string,
    email: string,
    phoneNumber: string
}

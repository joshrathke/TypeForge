export interface UserEntity {
    userID: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    lastLogin: string;
    resetPassword: boolean;
    createdAt: string;
    updatedAt: string;
    version: number;
}

export interface LocalUser extends UserEntity {
    token: string
}
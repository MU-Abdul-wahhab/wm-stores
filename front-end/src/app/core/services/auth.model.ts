export type AuthResponseData = {
    status: string;
    message: string;
    access_token: string;
    refresh_token: string;
    user: {
        _id: string;
        first_name: string;
        last_name: string;
        addresses?: string[],
        email: string;
        user_role: string;
        phone?: string;
        email_verified?: boolean;
        phone_verified?: boolean;
        created_at?: string;
        updated_at?: string;
    };
}


export class User {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public role: string,
        private _accessToken: string,
        private _accessTokenExpirationDate: Date,
        private _refreshToken: string,
        private _refreshTokenExpirationDate: Date
    ) { }

    get accessToken() {
        if (!this._accessTokenExpirationDate || new Date() > this._accessTokenExpirationDate) {
            return null;
        }
        return this._accessToken;
    }

    get refreshToken() {
        if (!this._refreshTokenExpirationDate || new Date() > this._refreshTokenExpirationDate) {
            return null;
        }
        return this._refreshToken;
    }
}
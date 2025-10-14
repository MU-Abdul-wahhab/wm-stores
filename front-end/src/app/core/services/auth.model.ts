export type AuthResponseData = {
    status: string;
    message: string;
    access_token: string;
    refresh_token: string;
    user: {
        _id: string;
        first_name: string;
        last_name: string;
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
        private _token: string,
        private _tokenExpirationDate: Date
    ) { }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}
import axios from 'axios';

export class API {
    static Instant() {
        return axios.create({
            baseURL: 'http://localhost:5200/api'
        });
    }
}

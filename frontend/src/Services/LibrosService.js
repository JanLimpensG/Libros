import axios from 'axios';

class LibrosDataService {
    getAll(params) {
        return axios.get("localhost:8000/api/libros", { params });
    }

    // other CRUD methods
}

export default new LibrosDataService();
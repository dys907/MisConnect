import http from "../http-common";

const getAll = () => {
    return http.get("/profsearch");
}


const get = id => {
    return http.get(`/profsearch/${id}`);
}

const create = data => {
    return http.post("/profsearch", data);
}
const update = (id, data) => {
    return http.put(`/profsearch/${id}`, data);
}
const remove = id => {
    return http.delete(`/profsearch/${id}`);
}
const removeAll = () => {
    return http.delete("/profsearch");
}
const findByName = (rec_name, app) => {
    return http.get(`/profsearch?rec_name=${rec_name}&app=${app}`);
}

export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName
}
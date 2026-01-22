import { Projects } from "../../../semana-3/flowdesk-spa/src/views/Projects";

export const store = {
    user: null,
    projects: [],
    loading: false,
    error: null
};
export function setUser(user) {
    store.user = user;
}

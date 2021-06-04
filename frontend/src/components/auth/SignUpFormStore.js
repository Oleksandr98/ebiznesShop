import {observable} from "mobx";

const signUpFormStore = observable({
    login: '',
    password: '',
    name: '',
    surname: '',
    birthDate: null
});

export default signUpFormStore;
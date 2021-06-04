import {makeObservable, observable, runInAction} from "mobx";
import {signIn, signOut, signUp} from "../../PathResolver";

class AuthStore {
    constructor() {
        this.signUpStatus = 'initial';
        this.signInStatus = 'initial';
        this.loggedIn = false;

        makeObservable(this, {
            signUpStatus: observable,
            signInStatus: observable,
            loggedIn: observable
        });
    }

    signUpAsync = async (model) => {
        try {
            const response = await signUp(model);
            if (response.status === 201) {
                runInAction(() => {
                    this.signUpStatus = "success";
                })
            } else {
                runInAction(() => {
                    this.signUpStatus = "error";
                })
            }
        } catch (error) {
            runInAction(() => {
                this.signUpStatus = "error";
            });
        }
    }
    signInAsync = async (model) => {
        try {
            const response = await signIn(model);
            if (response.status === 200) {
                runInAction(() => {
                    this.loggedIn = true;
                    this.signInStatus = "success";
                })
            } else {
                runInAction(() => {
                    this.loggedIn = false;
                    this.signInStatus = "error";
                })
            }
        } catch (error) {
            runInAction(() => {
                this.signInStatus = "error";
            });
        }
    }

    signOutAsync = async () => {
        try {
            const response = await signOut();
            if (response.status === 200) {
                runInAction(() => {
                    this.loggedIn = false;
                    this.status = "success";
                })
            }
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }
}

export default new AuthStore();
import React, {Component} from 'react';
import M from "materialize-css";
import {inject, observer} from "mobx-react";

class SignOutForm extends Component {

    componentDidMount() {
        M.Range.init(this.Range);
    }

    signOut = (e) => {
        this.props.authStore.signOutAsync()
            .then(() => {
                if (this.props.authStore.loggedIn === false) {
                    M.toast({
                        html: 'Logged out!',
                        classes: 'rounded center-align teal lighten-2',
                        displayLength: 2000
                    })
                    setTimeout(() => {
                        window.location.href = "http://localhost:8082";
                    }, 1000)
                } else {
                    M.toast({
                        html: 'Log out failure!',
                        classes: 'rounded center-align red lighten-2',
                        displayLength: 2000
                    })
                }
            })
    }

    render() {
        return (
            <input type="button" onClick={this.signOut} value="Sign Out"/>
        );
    }
}

export default inject('authStore')(observer(SignOutForm))
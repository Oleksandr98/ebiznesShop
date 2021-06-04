import React, {Component} from 'react';
import M from "materialize-css";
import {inject, observer} from "mobx-react";

class SignUpForm extends Component {

    componentDidMount() {
        M.Range.init(this.Range);
    }

    signUp = (e) => {
        e.preventDefault();
        const request = {
            login: this.props.signUpFormStore.login,
            password: this.props.signUpFormStore.password,
            name: this.props.signUpFormStore.name,
            surname: this.props.signUpFormStore.surname,
            birthDate: this.props.signUpFormStore.birthDate,
        };
        e.persist();
        this.props.authStore.signUpAsync(request)
            .then(() => {
                if (this.props.authStore.signUpStatus === "success") {
                    this.clear(e);
                    M.toast({
                        html: 'Thank you for registration!',
                        classes: 'rounded center-align teal lighten-2',
                        displayLength: 2000
                    })
                    setTimeout(() => {
                        this.props.closeModal();
                        window.location.href = "http://localhost:8082";
                    }, 2000)
                } else {
                    M.toast({
                        html: 'User with this e-mail already exists!',
                        classes: 'rounded center-align red lighten-2',
                        displayLength: 2000
                    })
                }
            })
    }

    clear = (e) => {
        e.target.reset();
    }

    updateProperty = (key, value) => {
        this.props.signUpFormStore[key] = value
    }

    onChange = (event) => {
        this.updateProperty(event.target.name, event.target.value)
    }

    render() {
        return (
            <form onSubmit={this.signUp} onReset={this.clear} id={this.props.formId}>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="sign_up_email" name="login" type="text" className="validate"
                               onChange={this.onChange} required aria-required="true"/>
                        <label htmlFor="sign_up_email" data-error="wrong" data-success="right">E-mail</label>
                    </div>
                </div>

                <div className=" row">
                    <div className=" input-field col s12">
                        <input id="sign_up_password" name="password" type="password" className="validate"
                               onChange={this.onChange} required aria-required="true"/>
                        <label htmlFor="sign_up_password">Password</label>
                    </div>
                </div>
                <div className=" row">
                    <div className=" input-field col s12">
                        <input id="sign_up_name" name="name" type="text" className="validate"
                               onChange={this.onChange} required aria-required="true"/>
                        <label htmlFor="sign_up_name">Name</label>
                    </div>
                </div>
                <div className=" row">
                    <div className=" input-field col s12">
                        <input id="sign_up_surname" name="surname" type="text" className="validate"
                               onChange={this.onChange} required aria-required="true"/>
                        <label htmlFor="sign_up_surname">Surname</label>
                    </div>
                </div>
                <div className=" row">
                    <div className=" input-field col s12">
                        <input id="sign_up_birthDate" name="birthDate" type="date" className="validate"
                               onChange={this.onChange} required aria-required="true"/>
                        <label htmlFor="sign_up_birthDate">birth date</label>
                    </div>
                </div>
            </form>
        );
    }
}

export default inject('signUpFormStore', 'authStore')(observer(SignUpForm))
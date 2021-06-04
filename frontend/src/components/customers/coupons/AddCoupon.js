import React from 'react';
import {withRouter} from "react-router";
import {addCoupon, getCustomers} from "../../../PathResolver";

class AddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            customerId: null,
            discountVal: null,
            customers: [],
            content: null,
        };
    }

    myChangeHandler = (event, name) => {
        this.setState({[name]: event.target.value});
    }

    addCoupon = (e) => {
        e.preventDefault();
        addCoupon(this.state).then(x => {
                window.location.href = "/coupons/" + x.data?.message;
            }
        ).catch(error => console.log(error?.response?.data?.message));
    }

    setupData = (buttonText) => {
        this.setState({
            content: <form style={{textAlign: "left"}} onSubmit={this.addCoupon}>
                <h3>Category {buttonText} form</h3>
                <p>Number: <input
                    type='text'
                    defaultValue={this.state.code}
                    onChange={(e) => this.myChangeHandler(e, "number")}
                /></p>
                <p>discount value: <input
                    type='text'
                    defaultValue={this.state.description}
                    onChange={(e) => this.myChangeHandler(e, "discountVal")}
                /></p>
                <p>Customer: <select onChange={(e) => this.myChangeHandler(e, "customerId")}>
                    {this.state.customers?.map(x => <option value={x.id}>{x.name} {x.surname}</option>)}
                </select></p>
                <input type="submit" value={buttonText}/>
            </form>
        })
    }

    componentDidMount() {
        getCustomers().then(x => {
            this.setState({customers: x.data});
            this.setupData("Add");
        }).catch(error => console.log(error?.response?.data?.message));
    }

    render() {
        return this.state.content;
    }
}

export default withRouter(AddCategory)
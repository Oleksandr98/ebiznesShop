import {Component, React} from "react";
import {blockCustomer, closeCustomer, getCustomer, unblockCustomer} from "../../PathResolver";
import {withRouter} from "react-router";

class Offer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customer: null,
        }
    }

    componentDidMount() {
        getCustomer(this.props.match.params.id).then(x => {
            this.setState({customer: x.data})
        }).catch(error => console.log(error.response?.data.message));
    }

    closeAndRedirect = (id) => {
        closeCustomer(id);
        window.location.href = "/customers";
    }

    showNonEmptyDate = (fieldName, date) => {
        if (date) {
            return fieldName + ": " + new Date(date).toLocaleString();
        } else {
            return null;
        }
    }

    block(id) {
        blockCustomer(this.state.customer?.id).catch(error => console.log(error.response?.data.message));
    }

    unblock(id) {
        unblockCustomer(this.state.customer?.id).catch(error => console.log(error.response?.data.message));
    }

    render() {
        return (
            <div style={{textAlign: "left"}}>
                <a href="/customers">Back to customers</a>

                <p>Name: {this.state.customer?.name}</p>
                <p>Surname: {this.state.customer?.surname}</p>
                <p>Status: {this.state.customer?.status}</p>
                <p>Login: {this.state.customer?.login}</p>
                <p>Enrollment date: {
                    new Date(this.state.customer?.createDate).toLocaleString()
                }</p>
                <p>{
                    this.showNonEmptyDate("Closure date", this.state.customer?.closureDate)
                }</p>
                <p>{
                    this.showNonEmptyDate("Date of birth", this.state.customer?.birthDate)
                }</p>
                <a href={"/customers/" + this.state.customer?.id + "/cards"}>Cards</a>  &nbsp;
                <a href={"/customers/" + this.state.customer?.id + "/transactions"}>Transactions</a>  &nbsp;
                <a href={"/customers/" + this.state.customer?.id + "/coupons"}>Coupons</a>  &nbsp;
                <a href={"/customers/" + this.state.customer?.id + "/orders"}>Orders</a>  &nbsp;
                <a href={"/customers/" + this.state.customer?.id + "/shopping"}>Shopping Cart</a>  &nbsp;
                <br/>
                <br/>
                <br/>
                <br/>
                <a href={"/customers/" + this.state.customer?.id + "/modify"}>Modify</a>  &nbsp;
                <a href="#" onClick={() => this.closeAndRedirect(this.state.customer?.id)}>Close</a> &nbsp;
                <a href="#" onClick={() => this.block(this.state.customer?.id)}>Block</a> &nbsp;
                <a href="#" onClick={() => this.unblock(this.state.customer?.id)}>Unblock</a>
            </div>);
    }
}

export default withRouter(Offer)
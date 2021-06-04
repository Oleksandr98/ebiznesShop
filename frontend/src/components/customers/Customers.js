import {Component, React} from "react";
import {getCustomers} from "../../PathResolver";


class Customers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
        };
    }

    componentDidMount() {
        getCustomers().then(x => {
            this.setState({
                customers: x.data,
            })
        }).catch(error => console.log(error?.response?.data?.message));
    }

    render() {
        return <div style={{textAlign: "left"}}>
            <a href="/">Home</a>

            <ul style={{width: "fit-content", textAlign: "left"}}>
                {this.state.customers.map(x => <li>Customer: <a href={"customers/" + x.id}>{x.name} {x.surname}</a></li>)}
            </ul>
            <a href="/customers/form">Register</a>
        </div>;
    }

}

export default Customers

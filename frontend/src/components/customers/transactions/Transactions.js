import {Component, React} from "react";
import {getTransactions} from "../../../PathResolver";
import {withRouter} from "react-router";


class Transactions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
        };
    }

    componentDidMount() {
        getTransactions().then(y => {
            let res = y.data.filter(z => z.transaction.customerId.toString() === this.props.match.params.id);
            this.setState({
                transactions: res,
            })
        }).catch(error => console.log(error.response?.data.message));
    }

    render() {
        return <div style={{textAlign: "left"}}>
            <a href={"/customers/" + this.props.match.params.id}>Back to customer</a>
            {console.log(this.state.transactions)}
            <ul style={{width: "fit-content", textAlign: "left"}}>
                {this.state.transactions.map(x => <li>Transaction:
                    <p>CreateDate: {
                        new Date(x.transaction?.createDate).toLocaleString()
                    }</p>
                    <p>Type: {x.transaction?.tType}</p>
                    <p>Status: {x.transaction?.status}</p>
                    <p>Comment: {x.transaction?.comment}</p>
                    <p>value: {x.transaction?.value}</p>
                    <p>location: {x.location?.code}</p>
                    <p>order products: </p>
                    {x.order?.orderProducts.map(y =>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;name: {y.product?.name} -> quantity: {y.itemInfo?.quantity}</p>
                    )}
                    <hr/>
                </li>)}
            </ul>
        </div>;
    }

}

export default withRouter(Transactions)

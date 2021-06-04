import {Component, React} from "react";
import {withRouter} from "react-router";
import {getOrders} from "../../../PathResolver";
import Order from "./Order";

class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            content: null,
        }
    }

    componentDidMount() {
        getOrders().then(y => {
            let res = y.data.filter(z => z.order.customerId.toString() === this.props.match.params.id);
            this.setState({
                orders: res,
            })
        });
    }

    displayComponent(body) {
        this.setState({content: <Order order={body}/>});
    }

    render() {
        return <div style={{textAlign: "left"}}>
            <a href={"/customers/" + this.props.match?.params.id}>Back to customer</a>
            <ul style={{width: "fit-content", textAlign: "left"}}>
                {this.state.orders?.map(x => <li>Order: <button onClick={() => this.displayComponent(x)}>{x.order.id}</button></li>)}
            </ul>
            {this.state.content}
        </div>;
    }
}

export default withRouter(Orders)
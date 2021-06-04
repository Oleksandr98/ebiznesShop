import {Component, React} from "react";
import {getCoupons} from "../../../PathResolver";
import {withRouter} from "react-router";


class Coupons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coupons: [],
        };
    }

    componentDidMount() {
        getCoupons().then(y => {
            let res = y.data.filter(z => z.customerId && z.customerId.toString() === this.props.match.params.id);
            this.setState({
                coupons: res,
            })
        }).catch(error => console.log(error.response?.data.message));
    }

    render() {
        return <div style={{textAlign: "left"}}>
            <a href={"/customers/" + this.props.match.params.id}>Back to customer</a>
            <ul style={{width: "fit-content", textAlign: "left"}}>
                {this.state.coupons.map(x => <li>Coupon: <a href={"/coupons/" + x.id}>{x.number}</a></li>)}
            </ul>
            <a href="/coupons/form">Add</a>
        </div>;
    }

}

export default withRouter(Coupons)

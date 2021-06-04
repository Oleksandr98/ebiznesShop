import {Component, React} from "react";
import {withRouter} from "react-router";
import {getCoupon} from "../../../PathResolver";

class Coupon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coupon: null,
        }
    }

    componentDidMount() {
        getCoupon(this.props.match.params.id).then(x => {
            this.setState({coupon: x.data})
        }).catch(error => console.log(error?.response?.data?.message));
    }

    render() {
        return (
            <div style={{textAlign: "left"}}>
                <a href="/customers">Back to customers</a>

                <p>Number: {this.state.coupon?.number}</p>
                <p>Status: {this.state.coupon?.status}</p>
                <p>Discount: {this.state.coupon?.discountVal}</p>
                <p>Create date: {
                    new Date(this.state.coupon?.createDate).toLocaleString()
                }</p>
            </div>);
    }
}

export default withRouter(Coupon)
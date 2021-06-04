import {Component, React} from "react";
import {withRouter} from "react-router";

class Order extends Component {

    constructor(props) {
        super(props);
        this.state = {
            order: null,
        }
    }

    displayOrderData() {
        return this.props.order?.orderProducts.map((x, i) => <div key={i}>
            <ul>
                <li>
                    <p>name: {x.product?.name}</p>
                    <p>quantity: {x.itemInfo?.quantity}</p>
                    {x.itemInfo && <p>price: {x.itemInfo?.quantity * x.product?.value}</p>}
                </li>
            </ul>
            <p>discount: {this.props.order?.order.discount} %</p>
        </div>);
    }

    displayTotalPrice() {
        let price = 0;
        this.props.order?.orderProducts.map(x => price += x.itemInfo?.quantity * x.product?.value);
        if (Number.isNaN(price)) {
            price = 0;
        }
        return price - price*this.props.order?.order.discount/100;
    }

    render() {
        return (
            <div style={{textAlign: "left"}}>
                <p>Id: {this.props.order?.order.id}</p>
                <p>Create date: {
                    new Date(this.props.order?.order.createDate).toLocaleString()
                }</p>
                Products: <br/>
                {this.displayOrderData()}
                Total price: {this.displayTotalPrice()}
            </div>);
    }
}

export default withRouter(Order)
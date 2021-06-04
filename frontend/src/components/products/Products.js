import {Component, React} from "react";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";


class Products extends Component {
    render() {
        return <div style={{textAlign: "left"}}>
            <a href="/">Home</a>

            <ul style={{width: "fit-content", textAlign: "left"}}>
                {this.props.productStore.products?.map(x => <li>Product: <a href={"products/" + x.id}>{x.name}</a></li>)}
            </ul>
            <a href="/products/form">Add</a>
        </div>;
    }

}

export default inject('productStore')(withRouter(observer(Products)))

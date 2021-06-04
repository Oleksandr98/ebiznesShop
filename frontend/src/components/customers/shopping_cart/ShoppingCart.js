import {Component, React} from "react";
import {createCart, getCards, getCart, getCarts, getCoupons, placeOrder, removeFromCart} from "../../../PathResolver";
import {withRouter} from "react-router";

const initialState = {
    cart: null,
    products: [],
    totalPrice: 0,
    quantity: 1,
    card: null,
    cards: [],
    coupon: null,
    coupons: [],
    schId: null,
    prdId: null,
    content: null,
}

class ShoppingCart extends Component {

    constructor(props) {
        super(props);
        this.state = {...initialState}
    }

    goShopping(id, cId) {
        window.location.href = "/shopping-cart/products/select/" + id + "/" + cId;
    }

    initCartProducts() {
        if (this.state.cart?.products && this.state.cart?.products.length > 0 && Object.keys(this.state.cart?.products[0]).length !== 0) {
            this.setState({products: this.state.cart?.products})
        }
    }

    order(id, cId) {
        placeOrder(id, cId, {discountValue: this.state.coupon, cardId: this.state.card}).then(response => this.setState({...initialState})).catch(error => console.log(error.response?.data.message));
    }

    cardSetup(e, name) {
        e.preventDefault();
        this.setState({[name]: e.target.value});
    }

    remove(id, pId) {
        removeFromCart(id, pId).catch(error => console.log(error.response?.data.message)).then(
            this.refreshProductsState(pId)
        )
    }

    refreshProductsState(pId) {
        getCart(this.state.cart?.cart.id).then(x => {
                this.setState({cart: x.data[0]});
            }
        ).then(() => {
            let temp = [...this.state.products]
            temp.splice(temp.findIndex(item => item.product.id === pId), 1)
            this.setState({products: temp})
        })

    }

    display() {
        if (this.state.products.length > 0) {
            return this.state.products.map((y, i) => <div key={i}><p>product: {y.product.name}
                <br/>price: {y.itemInfo.value}
                <br/>quantity: {y.itemInfo.quantity} <br/></p>
                <button onClick={() => this.remove(this.state.cart?.cart.id, y.product.id)}>Remove from cart</button>
            </div>)
        }
    }

    filterCards() {
        getCards().then(x => {
            let res = x.data.filter(z => z.customerId && z.customerId.toString() === this.props.match.params.id);
            this.setState({cards: res});
        })
    }

    filterCoupons() {
        getCoupons().then(x => {
            let res = x.data.filter(z => z.customerId && z.customerId.toString() === this.props.match.params.id);
            this.setState({coupons: res});
        })
    }

    componentDidMount() {
        getCarts().then(x => {
            let carts = x.data.filter(y => y.customer.id.toString() === this.props.match.params.id);
            if (carts.length === 0) {
                return createCart({customerId: this.props.match.params.id}).then(o => {
                    getCart(o.data.message).then(p => {
                        this.setState({cart: p.data[0]})
                    });
                });
            } else {
                this.setState({cart: carts[0]});
            }
        }).then(() => this.filterCards()).then(() => this.filterCoupons())
            .then(() => this.initCartProducts()).catch(error => console.log(error.response?.data.message))
            .catch(error => console.log(error?.response?.data?.message));
    }

    render() {
        return (
            <div style={{textAlign: "left"}}>
                <a href={"/customers/" + this.props.match.params.id}>Back to customer</a>
                <p>Total price: {this.state.cart?.cart.value || 0}</p>
                <button onClick={() => this.goShopping(this.state.cart?.cart.id, this.state.cart?.customer.id)}>Continue
                    shopping
                </button>
                <p> Select your bonus card:
                    <select defaultValue={this.state.card} onChange={(e) => this.cardSetup(e, "card")}>
                        <option value={this.state.card}>no card</option>
                        {this.state.cards?.map(x => <option value={x.id}>{x.number}</option>)}
                    </select>
                </p>
                <p> Select discount coupon:
                    <select defaultValue={this.state.coupon} onChange={(e) => this.cardSetup(e, "coupon")}>
                        <option value={this.state.coupon}>no coupon</option>
                        {this.state.coupons?.map(x => <option value={x.discountVal}>{x.number}</option>)}
                    </select>
                </p>
                <p>Products in cart:</p>
                {this.display()}
                <button onClick={() => this.order(this.state.cart.cart.id, this.state.cart.customer.id)}>Place order
                </button>
            </div>);
    }
}

export default withRouter(ShoppingCart)
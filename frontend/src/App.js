import {Route, Switch} from "react-router-dom";
import Products from "./components/products/Products";
import Product from "./components/products/Product";
import Home from "./components/Home";
import Offers from "./components/offers/Offers";
import AddModifyProduct from "./components/products/AddModifyProduct";
import Offer from "./components/offers/Offer";
import AddModifyOffer from "./components/offers/AddModifyOffer";
import Customers from "./components/customers/Customers";
import Customer from "./components/customers/Customer";
import AddModifyCustomer from "./components/customers/AddModifyCustomer";
import Card from "./components/customers/cards/Card";
import Cards from "./components/customers/cards/Cards";
import Transactions from "./components/customers/transactions/Transactions";
import Coupons from "./components/customers/coupons/Coupons";
import Coupon from "./components/customers/coupons/Coupon";
import ShoppingCart from "./components/customers/shopping_cart/ShoppingCart";
import CartProducts from "./components/customers/shopping_cart/CartProducts";
import Orders from "./components/customers/orders/Orders";
import Locations from "./components/locations/Locations";
import AddModifyLocation from "./components/locations/AddModifyLocation";
import Location from "./components/locations/Location";
import AddModifyCard from "./components/customers/cards/AddCard";
import SignInHandler from "./components/auth/SignInHandler";
import SignUpHandler from "./components/auth/SignUpHandler";
import SignOutForm from "./components/auth/SignOutForm";
import {Component} from "react";
import './App.css';
import {inject, observer} from "mobx-react";
import Categories from "./components/products/categories/Categories";
import AddCategory from "./components/products/categories/AddCategory";
import AddCoupon from "./components/customers/coupons/AddCoupon";

class App extends Component {
    componentDidMount() {
        this.props.productStore.cacheProducts();
    }

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/categories">
                        <Categories/>
                    </Route>
                    <Route exact path="/categories/form">
                        <AddCategory/>
                    </Route>
                    <Route exact path="/locations">
                        <Locations/>
                    </Route>
                    <Route exact path="/locations/form">
                        <AddModifyLocation/>
                    </Route>
                    <Route exact path="/locations/:id/modify">
                        <AddModifyLocation/>
                    </Route>
                    <Route exact path="/locations/:id">
                        <Location/>
                    </Route>
                    <Route exact path="/products">
                        <Products/>
                    </Route>
                    <Route exact path="/products/form">
                        <AddModifyProduct/>
                    </Route>
                    <Route exact path="/products/:id/modify">
                        <AddModifyProduct/>
                    </Route>
                    <Route exact path="/products/:id">
                        <Product/>
                    </Route>
                    <Route exact path="/offers">
                        <Offers/>
                    </Route>
                    <Route exact path="/offers/form">
                        <AddModifyOffer/>
                    </Route>
                    <Route exact path="/offers/:id/modify">
                        <AddModifyOffer/>
                    </Route>
                    <Route exact path="/offers/:id">
                        <Offer/>
                    </Route>
                    <Route exact path="/customers">
                        <Customers/>
                    </Route>
                    <Route exact path="/customers/form">
                        <AddModifyCustomer/>
                    </Route>
                    <Route exact path="/customers/:id/shopping">
                        <ShoppingCart/>
                    </Route>
                    <Route exact path="/customers/:id/cards">
                        <Cards/>
                    </Route>
                    <Route exact path="/customers/:id/orders">
                        <Orders/>
                    </Route>
                    <Route exact path="/coupons/form">
                        <AddCoupon/>
                    </Route>
                    <Route exact path="/coupons/:id">
                        <Coupon/>
                    </Route>
                    <Route exact path="/orders/:id">
                        <Coupon/>
                    </Route>
                    <Route exact path="/customers/:id/transactions">
                        <Transactions/>
                    </Route>
                    <Route exact path="/customers/:id/coupons">
                        <Coupons/>
                    </Route>
                    <Route exact path="/cards/:id/form">
                        <AddModifyCard/>
                    </Route>
                    <Route exact path="/cards/:id/modify">
                        <AddModifyCard/>
                    </Route>
                    <Route exact path="/cards/:id">
                        <Card/>
                    </Route>
                    <Route exact path="/customers/:id/modify">
                        <AddModifyCustomer/>
                    </Route>
                    <Route exact path="/customers/:id">
                        <Customer/>
                    </Route>
                    <Route exact path="/shopping-cart/products/select/:id/:cId">
                        <CartProducts/>
                    </Route>
                    <Route exact path="/user/auth">
                        <SignInHandler/>
                    </Route>
                    <Route exact path="/user/signup">
                        <SignUpHandler/>
                    </Route>
                    <Route exact path="/user/signout">
                        <SignOutForm/>
                    </Route>
                </Switch>

            </div>
        );
    }
}

export default inject('productStore')(observer(App))

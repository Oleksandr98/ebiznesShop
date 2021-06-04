import axios from "axios";

const serverPath = "http://localhost:8081";
const productsPath = serverPath + "/products";
const categoryPath = serverPath + "/categories";
const offersPath = serverPath + "/offers";
const customersPath = serverPath + "/customers";
const cardsPath = serverPath + "/cards";
const transactionPath = serverPath + "/transactions";
const couponsPath = serverPath + "/coupons";
const shoppingCartPath = serverPath + "/shopping-cart";
const ordersPath = serverPath + "/orders";
const locationsPath = serverPath + "/locations";

//products

async function getProducts() {
    return axios.get(productsPath);
}

async function addProduct(requestBody) {
    const token = getCookie("csrfToken");
    return axios.post(productsPath + "/add", requestBody, {headers: {'Csrf-Token': token}, withCredentials: true});
}

async function updateProduct(id, requestBody) {
    const token = getCookie("csrfToken");
    return axios.post(productsPath + "/" + id, requestBody, {headers: {'Csrf-Token': token}, withCredentials: true});
}

async function removeProduct(id) {
    const token = getCookie("csrfToken");
    return axios.delete(productsPath + "/" + id, {headers: {'Csrf-Token': token}, withCredentials: true});
}

async function getProduct(id) {
    return axios.get(productsPath + "/" + id);
}

async function getCategories() {
    return axios.get(categoryPath);
}

async function getCategory(id) {
    return axios.get(categoryPath + "/" + id);
}

//offers

async function getOffers() {
    return axios.get(offersPath);
}

async function getOffer(id) {
    return axios.get(offersPath + "/" + id);
}

async function removeOffer(id) {
    return axios.delete(offersPath + "/" + id);
}

async function addOffer(requestBody) {
    return axios.post(offersPath + "/add", requestBody);
}

async function updateOffer(id, requestBody) {
    return axios.put(offersPath + "/" + id, requestBody);
}

//customers

async function getCustomers() {
    return axios.get(customersPath, {withCredentials: true});
}

async function getCustomer(id) {
    return axios.get(customersPath + "/" + id, {withCredentials: true});
}

async function closeCustomer(id) {
    const token = getCookie("csrfToken");
    return axios.post(customersPath + "/" + id + "/close", {}, {headers: {'Csrf-Token': token}, withCredentials: true});
}

async function blockCustomer(id) {
    const token = getCookie("csrfToken");
    return axios.post(customersPath + "/" + id + "/block", {}, {headers: {'Csrf-Token': token}, withCredentials: true});
}

async function unblockCustomer(id) {
    const token = getCookie("csrfToken");
    return axios.post(customersPath + "/" + id + "/unblock", {}, {headers: {'Csrf-Token': token}, withCredentials: true});
}

async function addCustomer(requestBody) {
    return axios.post(customersPath + "/enroll", requestBody);
}

async function updateCustomer(id, requestBody) {
    const token = getCookie("csrfToken");
    return axios.put(customersPath + "/" + id, requestBody, {headers: {'Csrf-Token': token}, withCredentials: true});
}

//cards

async function getCards() {
    return axios.get(cardsPath);
}

async function getCard(id) {
    return axios.get(cardsPath + "/" + id);
}

async function addCard(requestBody) {
    const token = getCookie("csrfToken");
    return axios.post(cardsPath + "/add", requestBody, {headers: {'Csrf-Token': token}, withCredentials: true});
}

async function blockCard(id) {
    const token = getCookie("csrfToken");
    return axios.post(cardsPath + "/" + id + "/block", {}, {headers: {'Csrf-Token': token}, withCredentials: true});
}

async function closeCard(id) {
    const token = getCookie("csrfToken");
    return axios.post(cardsPath + "/" + id + "/close", {}, {headers: {'Csrf-Token': token}, withCredentials: true});
}

//transactions

async function getTransactions() {
    return axios.get(transactionPath, {withCredentials: true});
}

//coupons

async function getCoupons() {
    return axios.get(couponsPath);
}

async function getCoupon(id) {
    return axios.get(couponsPath + "/" + id);
}

async function addCoupon(requestBody) {
    const token = getCookie("csrfToken");
    return axios.post(couponsPath + "/add", requestBody, {headers: {'Csrf-Token': token}, withCredentials: true});
}

//carts
async function createCart(requestBody) {
    const token = getCookie("csrfToken");
    return axios.post(shoppingCartPath + "/create", requestBody, {headers: {'Csrf-Token': token}, withCredentials: true});
}

async function getCarts() {
    return axios.get(shoppingCartPath, {withCredentials: true});
}

async function getCart(id) {
    return axios.get(shoppingCartPath + "/" + id, {withCredentials: true});
}

async function addToCart(id, requestBody) {
    const token = getCookie("csrfToken");
    return axios.post(shoppingCartPath + "/add/" + id, requestBody, {headers: {'Csrf-Token': token}, withCredentials: true});
}

async function removeFromCart(id, pId) {
    const token = getCookie("csrfToken");
    return axios.post(shoppingCartPath + "/" + id + "/remove/" + pId, {}, {headers: {'Csrf-Token': token}, withCredentials: true});
}

async function placeOrder(id, cId, requestBody) {
    const token = getCookie("csrfToken");
    return axios.post(shoppingCartPath + "/" + id + "/" + cId, requestBody, {headers: {'Csrf-Token': token}, withCredentials: true});
}

//orders
async function getOrders() {
    return axios.get(ordersPath, {withCredentials: true});
}

async function getOrder(id) {
    return axios.get(ordersPath + "/" + id, {withCredentials: true});
}

//locations

async function getLocations() {
    return axios.get(locationsPath);
}

async function getLocation(id) {
    return axios.get(locationsPath + "/" + id);
}

async function removeLocation(id) {
    const token = getCookie("csrfToken");
    return axios.delete(locationsPath + "/" + id, {headers: {'Csrf-Token': token}, withCredentials: true});
}

async function addLocation(requestBody) {
    const token = getCookie("csrfToken");
    return axios.post(locationsPath + "/add", requestBody, {headers: {'Csrf-Token': token}, withCredentials: true});
}

async function updateLocation(id, requestBody) {
    const token = getCookie("csrfToken");
    return axios.put(locationsPath + "/" + id, requestBody, {headers: {'Csrf-Token': token}, withCredentials: true});
}

async function addCategory(requestBody) {
    const token = getCookie("csrfToken");
    return axios.post(categoryPath + "/add", requestBody, {headers: {'Csrf-Token': token}, withCredentials: true});
}

async function removeCategory(id) {
    const token = getCookie("csrfToken");
    return axios.delete(categoryPath + "/" + id, {headers: {'Csrf-Token': token}, withCredentials: true});
}

async function signIn(requestBody) {
    return axios.post(serverPath + "/signIn", requestBody, {withCredentials: true});
}

async function signUp(requestBody) {
    return axios.post(serverPath + "/signUp", requestBody);
}

async function signOut() {
    const token = getCookie("csrfToken");
    return axios.post(serverPath + "/signOut", {}, {headers: {'Csrf-Token': token}, withCredentials: true});
}

function getCookie(cookieName) {
    let cookiesStr = document.cookie.split(";");
    for (let cookieStr of cookiesStr) {
        let spl = cookieStr.trim().split("=");
        if (spl[0].trim() === cookieName) {
            return spl[1].trim();
        }
    }
    return "";
}


export {
    getProducts, getCategories, getProduct, getCategory, addProduct, updateProduct, removeProduct, addCategory, removeCategory,

    getOffers, getOffer, removeOffer, addOffer, updateOffer,

    getCustomers, getCustomer, closeCustomer, addCustomer, updateCustomer, blockCustomer, unblockCustomer,

    getCards, getCard, addCard, blockCard, closeCard,

    getTransactions,

    getCoupons, getCoupon, addCoupon,

    createCart, getCarts, getCart, addToCart, placeOrder, removeFromCart,

    getOrders, getOrder,

    getLocations, getLocation, addLocation, updateLocation, removeLocation,

    signIn, signUp, signOut
}

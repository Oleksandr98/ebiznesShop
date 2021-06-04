import {getCategories, getProducts} from "../../PathResolver";
import {makeObservable, observable, runInAction} from "mobx";

class ProductStore {
    constructor() {
        this.products = [];
        makeObservable(this, {
            products: observable
        })
    }

    cacheProducts = () => {
        getProducts().then(x => {
            getCategories().then(y => {
                x.data.map(z => z.category = y.data.categories.find(w => w.id === z.categoryId))
                runInAction(() => {
                    this.products = x.data;
                })
            });
        }).catch(error => console.log(error?.response?.data?.message));
    }
}

export default new ProductStore();
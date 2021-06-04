import {Component, React} from "react";
import {getCategories, removeCategory} from "../../../PathResolver";


class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
    }

    componentDidMount() {
        getCategories().then(x => {
            this.setState({
                categories: x.data.categories,
            })
        }).catch(error => console.log(error?.response?.data?.message));
    }

    moveTo (url) {
        window.location.href = url;
    }

    removeAndRedirect = (id) => {
        removeCategory(id).then(() => this.moveTo("/categories")).catch(error => console.log(error.response?.data.message));
    }

    render() {
        return <div style={{textAlign: "left"}}>
            <a href="/">Home</a>
            <ul style={{width: "fit-content", textAlign: "left"}}>
                {this.state.categories?.map(x => <li><b>Category</b>:
                    <p>CreateDate: {
                        new Date(x.createDate).toLocaleString()
                    }</p>
                    <p>Name: {x.name}</p>
                    <p>Code: {x.code}</p>
                    <a href="#" onClick={() => this.removeAndRedirect(x.id)}>Remove</a>
                    <hr/>
                </li>)}
            </ul>
            <a href="/categories/form">Add</a>
        </div>;
    }

}

export default Categories

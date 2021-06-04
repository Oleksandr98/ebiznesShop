import React from 'react';
import {addProduct, getCategories, getProduct, updateProduct} from "../../PathResolver";
import {withRouter} from "react-router";

class AddModifyProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            code: '',
            description: '',
            value: '',
            categoryId: '',
            content: null,
        };
    }

    myChangeHandler = (event, name) => {
        this.setState({[name]: event.target.value});
    }

    addOrModify = (e) => {
        e.preventDefault();
        if (this.props.match.params.id) {
            updateProduct(this.props.match.params.id, this.state).then(x =>
                window.location.href = "/products/" + this.props.match.params.id
            ).catch(error => console.log(error?.response?.data?.message));
        } else {
            addProduct(this.state).then(x => {
                    window.location.href = "/products/" + x.data.message;
                }
            ).catch(error => console.log(error?.response?.data?.message));
        }
    }

    setupData = (categories, buttonText) => {
        this.setState({
            categoryId: categories[0].id,
            content: <form style={{textAlign: "left"}} onSubmit={this.addOrModify}>
                <h3>Product {buttonText} form</h3>
                <p>Name: <input
                    type='text'
                    defaultValue={this.state.name}
                    onChange={(e) => this.myChangeHandler(e, "name")}
                /></p>
                <p>Code: <input
                    type='text'
                    defaultValue={this.state.code}
                    onChange={(e) => this.myChangeHandler(e, "code")}
                /></p>
                <p>description: <input
                    type='text'
                    defaultValue={this.state.description}
                    onChange={(e) => this.myChangeHandler(e, "description")}
                /></p>
                <p>value: <input
                    type='text'
                    defaultValue={this.state.value}
                    onChange={(e) => this.myChangeHandler(e, "value")}
                /></p>
                <p>Category: <select onChange={(e) => this.myChangeHandler(e, "categoryId")}>
                    {categories.map(x => <option value={x.id}>{x.name}</option>)}
                </select></p>
                <input type="submit" value={buttonText}/>
            </form>
        })
    }

    componentDidMount() {
        getCategories().then(y => {
            if (this.props.match.params.id) {
                getProduct(this.props.match.params.id).then(prd => {
                    this.setState({...prd.data});
                    this.setupData(y.data.categories, "Modify");
                }).catch(error => {
                    console.log(error?.response?.data?.message);
                });
            } else {
                this.setupData(y.data.categories, "Add");
            }
        }).catch(error => {
            console.log(error.response?.data.message);
        });
    }

    render() {
        return this.state.content;
    }
}

export default withRouter(AddModifyProduct)
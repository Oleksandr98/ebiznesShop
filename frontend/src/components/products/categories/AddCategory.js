import React from 'react';
import {withRouter} from "react-router";
import {addCategory} from "../../../PathResolver";

class AddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            name: '',
            content: null,
        };
    }

    myChangeHandler = (event, name) => {
        this.setState({[name]: event.target.value});
    }

    addCategory = (e) => {
        e.preventDefault();
        addCategory(this.state).then(x => {
                window.location.href = "/categories";
            }
        ).catch(error => console.log(error?.response?.data?.message));
    }

    setupData = (buttonText) => {
        this.setState({
            content: <form style={{textAlign: "left"}} onSubmit={this.addCategory}>
                <h3>Category {buttonText} form</h3>
                <p>Name: <input
                    type='text'
                    defaultValue={this.state.code}
                    onChange={(e) => this.myChangeHandler(e, "name")}
                /></p>
                <p>Code: <input
                    type='text'
                    defaultValue={this.state.description}
                    onChange={(e) => this.myChangeHandler(e, "code")}
                /></p>
                <input type="submit" value={buttonText}/>
            </form>
        })
    }

    componentDidMount() {
        this.setupData("Add");
    }

    render() {
        return this.state.content;
    }
}

export default withRouter(AddCategory)
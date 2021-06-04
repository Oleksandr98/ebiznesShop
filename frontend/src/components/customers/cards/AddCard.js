import React from 'react';
import {withRouter} from "react-router";
import {addCard} from "../../../PathResolver";

class AddCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            status: '',
            customerId: null,
            content: null,
        };
    }

    myChangeHandler = (event, name) => {
        this.setState({[name]: event.target.value});
    }

    addOrModify = (e) => {
        e.preventDefault();
        addCard(this.state).then(x => {
            window.location.href = "/cards/" + x.data.message;
        }).catch(error => console.log(error?.response?.data?.message));
    }

    setupData = () => {
        this.setState({
            customerId: this.props.match.params.id,
            content: <form style={{textAlign: "left"}} onSubmit={this.addOrModify}>
                <h3>Card Add form</h3>
                <p>Number: <input
                    type='text'
                    defaultValue={this.state.number}
                    onChange={(e) => this.myChangeHandler(e, "number")}
                /></p>
                <input type="submit" value="Add"/>
            </form>
        })
    }

    componentDidMount() {
        this.setupData();
    }

    render() {
        return this.state.content;
    }
}

export default withRouter(AddCard)
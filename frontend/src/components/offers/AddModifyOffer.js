import React from 'react';
import {addOffer, getOffer, updateOffer} from "../../PathResolver";
import {withRouter} from "react-router";

class AddModifyOffer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            code: '',
            description: '',
            startDate: '',
            endDate: '',
            content: null,
        };
    }

    myChangeHandler = (event, name) => {
        this.setState({[name]: event.target.value});
    }

    addOrModify = (e) => {
        e.preventDefault();
        if (this.props.match.params.id) {
            updateOffer(this.props.match.params.id, this.state).then(x =>
                window.location.href = "/offers/" + this.props.match.params.id
            ).catch(error => console.log(error?.response?.data?.message));
        } else {
            addOffer(this.state).then(x => {
                    window.location.href = "/offers/" + x.data.message;
                }
            ).catch(error => console.log(error?.response?.data?.message));
        }
    }

    setupData = (buttonText) => {
        this.setState({
            content: <form style={{textAlign: "left"}} onSubmit={this.addOrModify}>
                <h3>Offer {buttonText} form</h3>
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
                <p>Start date: <input
                    type='date'
                    defaultValue={new Date(this.state.startDate)}
                    onChange={(e) => this.myChangeHandler(e, "startDate")}
                /></p>
                <p>End date: <input
                    type='date'
                    defaultValue={new Date(this.state.endDate)}
                    onChange={(e) => this.myChangeHandler(e, "endDate")}
                /></p>
                <input type="submit" value={buttonText}/>
            </form>
        })
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            getOffer(this.props.match.params.id).then(obj => {
                this.setState({...obj.data});
                this.setupData("Modify");
            }).catch(error => {
                console.log(error?.response?.data?.message);
            });
        } else {
            this.setupData("Add");
        }
    }

    render() {
        return this.state.content;
    }
}

export default withRouter(AddModifyOffer)
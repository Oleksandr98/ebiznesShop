import React from 'react';
import {addLocation, getLocation, updateLocation} from "../../PathResolver";
import {withRouter} from "react-router";

class AddModifyLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            type: 'SH',
            description: '',
            content: null,
        };
    }

    myChangeHandler = (event, name) => {
        this.setState({[name]: event.target.value});
    }

    addOrModify = (e) => {
        e.preventDefault();
        if (this.props.match.params.id) {
            updateLocation(this.props.match.params.id, this.state).then(x =>
                window.location.href = "/locations/" + this.props.match.params.id
            ).catch(error => console.log(error?.response?.data?.message));
        } else {
            addLocation(this.state).then(x => {
                    window.location.href = "/locations/" + x.data.message;
                }
            ).catch(error => console.log(error?.response?.data?.message));
        }
    }

    setupData = (buttonText) => {
        this.setState({
            content: <form style={{textAlign: "left"}} onSubmit={this.addOrModify}>
                <h3>Product {buttonText} form</h3>
                <p>Code: <input
                    type='text'
                    defaultValue={this.state.code}
                    onChange={(e) => this.myChangeHandler(e, "code")}
                /></p>
                <p>Description: <input
                    type='text'
                    defaultValue={this.state.description}
                    onChange={(e) => this.myChangeHandler(e, "description")}
                /></p>
                <p>Location type: <select defaultValue={this.state.type} onChange={(e) => this.myChangeHandler(e, "type")}>
                    <option value="SH">Shop</option>)
                    <option value="ST">Storage</option>)
                </select></p>
                <input type="submit" value={buttonText}/>
            </form>
        })
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            getLocation(this.props.match.params.id).then(loc => {
                this.setState({...loc.data});
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

export default withRouter(AddModifyLocation)
import {Component, React} from "react";
import {withRouter} from "react-router";
import {getLocation, removeLocation} from "../../PathResolver";

class Location extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: null,
        }
    }

    componentDidMount() {
        getLocation(this.props.match.params.id).then(x => {
            this.setState({location: x.data})
        }).catch(error => console.log(error?.response?.data?.message));
    }

    moveTo (url) {
        window.location.href = url;
    }

    removeAndRedirect = (id) => {
        removeLocation(id).then(() => this.moveTo("/locations")).catch(error => console.log(error.response?.data.message));
    }

    render() {
        return (
            <div style={{textAlign: "left"}}>
                <a href="/locations">Back to locations</a>

                <p>Code: {this.state.location?.code}</p>
                <p>Location type: {this.state.location?.locType}</p>
                <p>Description: {this.state.location?.description}</p>
                <p>Create date: {
                    new Date(this.state.location?.createDate).toLocaleString()
                }</p>
                <a href={"/locations/" + this.state.location?.id + "/modify"}>Modify</a>  &nbsp;
                <a href="#" onClick={() => this.removeAndRedirect(this.state.location?.id)}>Remove</a>
            </div>);
    }
}

export default withRouter(Location)
import {Component, React} from "react";
import {getOffer, removeOffer} from "../../PathResolver";
import {withRouter} from "react-router";

class Offer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offer: null,
        }
    }

    componentDidMount() {
        getOffer(this.props.match.params.id).then(x => {
            this.setState({offer: x.data})
        }).catch(error => console.log(error?.response?.data?.message));
    }

    moveTo (url) {
        window.location.href = url;
    }

    removeAndRedirect = (id) => {
        removeOffer(id).then(() => this.moveTo("/offers")).catch(error => console.log(error.response?.data.message));
    }

    showNonEmptyDate = (date) => {
        if (date) {
            return new Date(date).toLocaleString();
        } else {
            return null;
        }
    }

    render() {
        return (
            <div style={{textAlign: "left"}}>
                <a href="/offers">Back to offers</a>

                <p>Name: {this.state.offer?.name}</p>
                <p>Code: {this.state.offer?.code}</p>
                <p>Description: {this.state.offer?.description}</p>
                <p>Create date: {
                    new Date(this.state.offer?.createDate).toLocaleString()
                }</p>
                <p>Start date: {
                    this.showNonEmptyDate(this.state.offer?.startDate)
                }</p>
                <p>End date: {
                    this.showNonEmptyDate(this.state.offer?.endDate)
                }</p>
                <a href={"/offers/" + this.state.offer?.id + "/modify"}>Modify</a>  &nbsp;
                <a href="#" onClick={() => this.removeAndRedirect(this.state.offer?.id)}>Remove</a>
            </div>);
    }
}

export default withRouter(Offer)
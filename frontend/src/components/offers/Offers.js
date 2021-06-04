import {Component, React} from "react";
import {getOffers} from "../../PathResolver";


class Offers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offers: [],
        };
    }

    componentDidMount() {
        getOffers().then(x => {
           this.setState({
               offers: x.data,
           })
        }).catch(error => console.log(error?.response?.data?.message));
    }

    render() {
        return <div style={{textAlign: "left"}}>
            <a href="/">Home</a>

            <ul style={{width: "fit-content", textAlign: "left"}}>
                {this.state.offers.map(x => <li>Offer: <a href={"offers/" + x.id}>{x.name}</a></li>)}
            </ul>
            <a href="/offers/form">Add</a>
        </div>;
    }

}

export default Offers

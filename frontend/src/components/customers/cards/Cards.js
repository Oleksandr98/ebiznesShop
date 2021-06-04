import {Component, React} from "react";
import {getCards} from "../../../PathResolver";
import {withRouter} from "react-router";


class Cards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: [],
        };
    }

    componentDidMount() {
        getCards().then(y => {
            let res = y.data.filter(z => z.customerId.toString() === this.props.match.params.id);
            this.setState({
                cards: res,
            })
        }).catch(error => console.log(error?.response?.data?.message));
    }

    render() {
        return <div style={{textAlign: "left"}}>
            <a href={"/customers/" + this.props.match.params.id}>Back to customer</a>
            <ul style={{width: "fit-content", textAlign: "left"}}>
                {this.state.cards.map(x => <li>Card: <a href={"/cards/" + x.id}>{x.number}</a></li>)}
            </ul>
            <a href={"/cards/" + this.props.match.params.id + "/form"}>Add card</a>
        </div>;
    }

}

export default withRouter(Cards)

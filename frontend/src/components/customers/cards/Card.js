import {Component, React} from "react";
import {withRouter} from "react-router";
import {blockCard, closeCard, getCard} from "../../../PathResolver";

class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {
            card: null,
        }
    }

    componentDidMount() {
        getCard(this.props.match.params.id).then(x => {
            this.setState({card: x.data})
        }).catch(error => console.log(error?.response?.data?.message));
    }

    blockOrCloseCard(id, block) {
        if (block) {
            blockCard(id).catch(error => console.log(error.response?.data.message));
        } else {
            closeCard(id).catch(error => console.log(error.response?.data.message));
        }
    }

    render() {
        return (
            <div style={{textAlign: "left"}}>
                <a href="/customers">Back to customers</a>

                <p>Number: {this.state.card?.number}</p>
                <p>Status: {this.state.card?.status}</p>
                <p>Create date: {
                    new Date(this.state.card?.createDate).toLocaleString()
                }</p>
                <button onClick={() => this.blockOrCloseCard(this.state.card?.id, true)}>Block</button>
                <button onClick={() => this.blockOrCloseCard(this.state.card?.id, false)}>Close</button>
            </div>);
    }
}

export default withRouter(Card)
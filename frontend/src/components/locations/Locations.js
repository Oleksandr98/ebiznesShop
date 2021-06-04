import {Component, React} from "react";
import {getLocations} from "../../PathResolver";


class Locations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locations: [],
        };
    }

    componentDidMount() {
        getLocations().then(y => {
            this.setState({locations: y.data.locations})
        }).catch(error => console.log(error?.response?.data?.message));
    }

    render() {
        return <div style={{textAlign: "left"}}>
            <a href="/">Home</a>
            <ul style={{width: "fit-content", textAlign: "left"}}>
                {this.state.locations.map(x => <li>Location: <a href={"/locations/" + x.id}>{x.code}</a></li>)}
            </ul>
            <a href="/locations/form">Add location</a>
        </div>;
    }

}

export default Locations

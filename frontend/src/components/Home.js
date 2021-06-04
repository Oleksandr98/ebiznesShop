import {Link} from "react-router-dom";


function Home() {
    return (
        <ul style={{listStyleType: "none", width: "fit-content"}}>
            <li>
                <Link to="/products">Products</Link>
            </li>
            <li>
                <Link to="/categories">Categories</Link>
            </li>
            <li>
                <Link to="/offers">Offers</Link>
            </li>
            <li>
                <Link to="/customers">Customers</Link>
            </li>
            <li>
                <Link to="/locations">Locations</Link>
            </li>
            <li>
                <Link to="/user/auth">Auth</Link>
            </li>
            <li>
                <Link to="/user/signup">Sign up</Link>
            </li>
            <li>
                <Link to="/user/signout" >Sign out</Link>
            </li>
        </ul>
    )
}

export default Home;
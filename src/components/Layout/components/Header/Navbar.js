import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
    const logout = () => {
        window.open('http://localhost:5000/auth/logout', '_self');
    };
    return (
        <div className="navbar">
            {user ? (
                <ul className="list">
                    <span className="listItem" onClick={logout}>
                        Logout
                    </span>
                    <div className="listItem">
                        <img src={user.photos[0].value} alt="" className="avatar" width="20" height="20" />
                    </div>
                    <span className="listItem">{user.displayName}</span>
                </ul>
            ) : (
                <Link className="link" to="login">
                    Login
                </Link>
            )}
        </div>
    );
};

export default Navbar;

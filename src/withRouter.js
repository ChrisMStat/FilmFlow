/* Used to reroute signup page to login page automatically */

import { useNavigate } from 'react-router-dom';

export const withRouter = (Component) => {
    const Wrapper = (props) => {
        const navigate = useNavigate();

        return (
            <Component
                navigate={navigate}
                {...props}
            />
        );
    };

    return Wrapper;
};
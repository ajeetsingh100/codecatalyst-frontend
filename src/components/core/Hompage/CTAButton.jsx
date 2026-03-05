import { Link } from "react-router-dom";

function CTAButton(props){
    const {link_to,active,children}=props
    return(
        <div>
            <Link to={link_to}>
                <div className={`btn btn-${active?'warning':'dark'}`}>
                    {children}
                </div>
            </Link>
        </div>
    )
}
export default CTAButton
import { NavLink, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

import './template.styles.css'

const Template = () => {
    let { id:idParam } = useParams();
    
    return(
        <div className="main-cover">
            <section className="side-bar">
                <div className="logo">
                    <NavLink
                        to='/'
                    >
                        <img src='https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_c772abfcd526766ca1ce98966d103bbd/function-point.png'/>
                    </NavLink>
                </div>
                <div className="side-bar__nav">
                    <NavLink
                        // className={({isActive}) => isActive ? 'isActive side-bar__nav-item' : 'side-bar__nav-item'}                        
                        to='/'
                        className={({isActive}) => isActive ? 'isActive side-bar__nav-item' : 'side-bar__nav-item'}
                    >
                        <span>Product List</span>
                    </NavLink>
                    <NavLink
                        // className={({isActive}) => isActive ? 'isActive side-bar__nav-item' : 'side-bar__nav-item'}
                        to='productDetail/new'
                        className={() => idParam ? 'isActive side-bar__nav-item' : 'side-bar__nav-item'}
                    >
                        <span>Product Detail</span>
                    </NavLink>
                </div>
            </section>
            <section className="container">
                <Outlet />
            </section>
        </div>
    )
}

export default Template;
import React from 'react';
import { Link, NavLink } from 'react-router-dom'

import logo from '../images/onetouch_logo.png'

const NavBar = (props) => {
	return (
		<nav className="nav-wrapper white text-black">
			<div className="container">
				<a className="brand-logo"><img src={logo} width="70" alt="logo"/></a>
					<ul>
						<li><Link to="/"><span className="black-text">Trang Chủ</span></Link></li>
						<li><NavLink to="/browse"><span className="black-text">Danh sách xe</span></NavLink></li>
						<li><NavLink to="/my-cars"><span className="black-text">Xe của tôi</span></NavLink></li>
					</ul>
			</div>
		</nav>
	)
}

export default NavBar

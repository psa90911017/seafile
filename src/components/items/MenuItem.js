import { Link } from 'react-router-dom';
import {menuItem} from './MenuItem.module.css';


function MenuItem({ menu }) {

	return (
		<Link to={`/menu/${menu.id}`}>
			<div className='menuItem'>
				<img src={menu.detail.image} alt={menu.menuName}/>
			</div>
				<div>
					<h3>{menu.menuName}</h3>
			</div>
		</Link>
	);
}

export default MenuItem;
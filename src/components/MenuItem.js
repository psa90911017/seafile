import itemStyle from './MenuItem.module.css';
import { Link } from 'react-router-dom';

function MenuItem({ menu }) {
    return (
        <Link to={`/menu/${menu.menuCode}`} className={itemStyle.linkStyle}>
            <div className={itemStyle.menuItem}>
                <img src={menu.image} alt={menu.menuName} className={itemStyle.menuImage}/>
            </div>
                <div className={itemStyle.menuText}>
                    <h3>이름: {menu.menuName}</h3>
                </div>
        </Link>
    );
}

export default MenuItem;
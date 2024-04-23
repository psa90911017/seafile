import { useEffect, useState } from 'react';
import { getMenuList } from '../api/MenuAPI';
import MenuItem from '../components/MenuItem';
import boxStyle from './Menu.module.css';
import { useNavigate } from 'react-router-dom';   // 쿼리스트링으로 작성한 url 요청을 도와줄 hooks

function Menu() {

	const [menus, setMenus] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const navigate = useNavigate();

	/* Menu 컴포넌트가 마운트되는 시점에서 데이터를 가져와서(GET) state에 담는다 */
	useEffect(
		() => {
			// console.log(getMenuList());
			// console.table(getMenuList());
			// const menus = getMenuList();
			// setMenus(menus);

			setMenus(getMenuList());
		},
		[]
	);

	/* 검색 버튼을 누르면 쿼리스트링 형태로 검색어를 전달한다. */
	const onClickHandler = () => {
		/*
		useNavigate 훅을 사용해 프로그래밍 방식(JS)으로 라우팅할 수 있다.
		검색 버튼 클릭 시, 입력된 검색어를 쿼리스트링에 포함하여 'menu/search'경로로 라우팅(이동)시킨다.
		이를 통해 동적인 '페이지 전환'과 '데이터 전달'을 동시에 할 수 있다.
		*/
		navigate(`/menu/search?menuName=${searchValue}`);
	};

	return (
		<>
			<h3>분류보기</h3>
			<hr/>
			<div>
				<input
					type="search"
					name="menuName"
					placeholder={'메뉴 이름을 입력해주세요'}
					onChange={e => setSearchValue(e.target.value)}>
				</input>
				<button onClick={onClickHandler}>검색</button>
			</div>
			<div className={boxStyle.MenuBox}>
				{menus.map(menu => <MenuItem key={menu.menuCode} menu={menu} />)}
			</div>
		</>
	);
}

export default Menu;
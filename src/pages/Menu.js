import { useEffect, useState } from 'react';
import { getMenuList } from '../api/MenuAPI';
import MenuItem from '../components/MenuItem';
import boxStyle from './Menu.module.css';
import { useNavigate } from 'react-router-dom';   // 쿼리스트링으로 작성한 url 요청을 도와줄 hooks

function Menu() {

	const [menus, setMenus] = useState([]);
	const [filteredMenus, setFilteredMenus] = useState([]); // 필터링된 메뉴 데이터
	const [searchValue, setSearchValue] = useState('');
	const [checkedItems, setCheckedItems] = useState({
		dessertMenuAll : true,
		bread : false,
		cake : false,
		sandwich : false
	});

	const navigate = useNavigate();

	/* Menu 컴포넌트가 마운트되는 시점에서 데이터를 가져와서(GET) state에 담는다 */
	useEffect(() => {
        getMenuList().then(data => {
            setMenus(data);
            setFilteredMenus(data);  // 초기에는 모든 메뉴를 보여줍니다.
        });
    }, []);

	useEffect(() => {
        // 체크박스 상태가 바뀔 때마다 필터링 로직을 수행합니다.
        const updatedFilteredMenus = menus.filter(menu => 
            checkedItems.dessertMenuAll || // '전체메뉴' 선택 시 모든 메뉴 표시
			Object.values(checkedItems).every(v => !v) || // 모든 체크박스가 false일 경우 모든 메뉴를 보여준다.
            checkedItems.bread && menu.categoryName === "브레드" ||
            checkedItems.cake && menu.categoryName === "케이크" ||
            checkedItems.sandwich && menu.categoryName === "샌드위치"
        );
        setFilteredMenus(updatedFilteredMenus);
    }, [checkedItems, menus]);

	/* 검색 버튼을 누르면 쿼리스트링 형태로 검색어를 전달한다. */
	const onClickHandler = () => {
		/*
		useNavigate 훅을 사용해 프로그래밍 방식(JS)으로 라우팅할 수 있다.
		검색 버튼 클릭 시, 입력된 검색어를 쿼리스트링에 포함하여 'menu/search'경로로 라우팅(이동)시킨다.
		이를 통해 동적인 '페이지 전환'과 '데이터 전달'을 동시에 할 수 있다.
		*/
		navigate(`/menu/search?menuName=${searchValue}`);
	};

	function getCheckboxValue(e) {
		const {name, checked} = e.target;
		// console.log('checkbox : ', name, 'is', checked ? 'checked' : 'unchecked');
		setCheckedItems(prevItems => ({
			...prevItems,
			[name] : checked
		}));
	}

	return (
		<>
			<div className = {boxStyle.container}>
				<h3 className= {boxStyle.title}>분류보기</h3>
				<div className={boxStyle.titleDivider}></div> {/* 구분선 추가 */}
				<div className={boxStyle.controls}>
					<div className={boxStyle.checkboxes}>
						<input type='checkbox' name='dessertMenuAll' value='전체메뉴' checked={checkedItems.dessertMenuAll} onClick={getCheckboxValue} className={boxStyle.inputSpacing}/> 전체메뉴
						<input type='checkbox' name='bread' value='브레드' checked={checkedItems.bread} onClick={getCheckboxValue} className={boxStyle.inputSpacing}/> BREAD
						<input type='checkbox' name='cake' value='케이크' checked={checkedItems.cake} onClick={getCheckboxValue} className={boxStyle.inputSpacing}/> CAKE
						<input type='checkbox' name='sandwich' value='샌드위치' checked={checkedItems.sandwich} onClick={getCheckboxValue} className={boxStyle.inputSpacing}/> SANDWICH
					</div>
					<div className={boxStyle.searchSection}>
						<input
							type="search"
							name="menuName"
							placeholder={'메뉴 이름을 입력해주세요'}
							onChange={e => setSearchValue(e.target.value)} className={boxStyle.searchInput}>
						</input>
						<button onClick={onClickHandler}>검색</button>
					</div>
				</div>
			</div>
			<div className={boxStyle.MenuBox}>
				{filteredMenus.map(menu => <MenuItem key={menu.menuCode} menu={menu} />)}
			</div>
		</>
	);
}

export default Menu;
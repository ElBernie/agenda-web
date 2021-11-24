/** @format */
import './styles.css';
import { FaPrint, FaCalendarAlt, FaCalendarPlus } from 'react-icons/fa';

interface propsType {
	printHandle?: () => void;
}
const Navbar = (props: propsType) => {
	return (
		<div className='navbar'>
			<h1>
				<FaCalendarAlt />
			</h1>
			<div>
				<ul>
					<li>
						<FaPrint onClick={props.printHandle} />
					</li>
					<li>
						<FaCalendarPlus />
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;

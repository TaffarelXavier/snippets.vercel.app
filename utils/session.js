
import Cookies from 'js-cookie';
const Session = {
	isLogged() {
		if (Cookies.get('session')) {
			return true;
		}
		return false;
	},
	setSession(data) {
		Cookies.set('session', JSON.stringify(data));
	},
};
export default Session;
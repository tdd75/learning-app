import './App.css';
import 'antd/dist/antd.css'; 

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";  
import Login from './components/Login/Login';
import VocabLessonDetail from './components/Vocab/VocabLessonDetail/VocabLessonDetail';
import AddVocab from './components/Vocab/AddVocab/AddVocab';
import EditVocab from './components/Vocab/EditVocab/EditVocab'; 
import ManageUser from './components/ManageUser';

function App() {
	return (
		<Router>
			<Switch>
				{/* <Route exact path="/manage-vocab">
					<Vocab />
				</Route> */}
				<Route exact path="/">
					<ManageUser />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route exact path="/manage-vocab/show">
					<VocabLessonDetail />
				</Route>
				<Route path="/manage-vocab/add-vocab">
					<AddVocab />
				</Route>
				<Route path="/manage-vocab/edit-vocab">
					<EditVocab />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;

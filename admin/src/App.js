import './App.css';
import 'antd/dist/antd.css'; 

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom"; 
import Vocab from './components/Vocab'; 
import Login from './components/Login/Login';
import VocabLessonDetail from './components/Vocab/VocabLessonDetail/VocabLessonDetail';
import AddVocab from './components/Vocab/AddVocab/AddVocab';
import EditVocab from './components/Vocab/EditVocab/EditVocab'; 

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/manage-vocab">
					<Vocab />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route exact path="/manage-vocab/:id">
					<VocabLessonDetail />
				</Route>
				<Route path="/manage-vocab/:id/add-vocab">
					<AddVocab />
				</Route>
				<Route path="/manage-vocab/:id/edit-vocab">
					<EditVocab />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;

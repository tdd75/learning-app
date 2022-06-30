


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
import AdminAccount from './components/AdminAccount';
import Grammar from './components/ManageGrammar';
import GrammarLessonDetail from './components/ManageGrammar/Lesson/LessonDetail';
import AddGrammar from './components/ManageGrammar/Lesson/AddLesson';
import EditGrammarLesson from './components/ManageGrammar/Lesson/EditLesson';
import AddGrammarTest from './components/ManageGrammar/Task/AddTask';
import EditGrammarTest from './components/ManageGrammar/Task/EditTask';
import TestDetail from './components/ManageGrammar/Task/TaskDetails';

function App() {
	return (
		<Router>
			<Switch>
				{/* <Route exact path="/manage-vocab">
					<Vocab />
				</Route> */}
				<Route exact path="/users">
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
				<Route path="/admin-account">
					<AdminAccount />
				</Route>
				<Route exact path="/manage-grammar">
					<Grammar />
				</Route>
				<Route exact path="/manage-grammar/lesson/:id">
					<GrammarLessonDetail />
				</Route>
				<Route path="/manage-grammar/lesson/:id/add-lesson">
					<AddGrammar />
				</Route>
				<Route path="/manage-grammar/lesson/:id/edit-lesson">
					<EditGrammarLesson />
				</Route>
				<Route exact path="/manage-grammar/test/:id">
					<TestDetail />
				</Route>
				<Route exact path="/manage-grammar/test/:id/add-sentence">
					<AddGrammarTest />
				</Route>
				<Route exact path="/manage-grammar/test/:id/edit-sentence">
					<EditGrammarTest />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;

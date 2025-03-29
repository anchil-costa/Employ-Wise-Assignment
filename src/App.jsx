import Auth from './screens/Auth'
import UsersList from './screens/UsersList'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'


function App() {

  return (
    <>
    <Toaster position='bottom-left'/>
    <Router>
      <Routes>
       <Route path='/' element={<Auth/>} />
       <Route path='/userslist' element={<UsersList/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App

import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Menu from './pages/Menu'
import Category from './pages/Category'
import Line from './pages/Line'
import Shape from './pages/Shape'
import Alphabet from './pages/Alphabet'
import LevelDifficulty from './pages/LevelDifficulty'
import Error from './pages/Error'
import Ingame from './pages/Ingame'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import Tutorial from './pages/Tutorial'
import Achievement from './pages/Achievement'
import Try from './pages/Try'
import ModalSettings from './components/ModalSettings'
import A from './components/abcEasy/A'
import B from './components/abcEasy/B'
import C from './components/abcEasy/C'
import Exercises from './pages/Exercises'

const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route index element={<Menu />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/category" element={<Category />} />
                <Route path="/line" element={<Line />} />
                <Route path="/shape" element={<Shape />} />
                <Route path="/alphabet" element={<Alphabet />} />
                <Route path="/leveldifficulty" element={<LevelDifficulty />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/achievement" element={<Achievement />} />
                <Route path="/tutorial" element={<Tutorial />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/ingame" element={<Ingame />} />

                <Route path="/Exercises/:categoryId" element={<Exercises/>} /> 

                <Route path="/a" element={<A />} />
                <Route path="/b" element={<B />} />
                <Route path="/c" element={<C />} />

                <Route path="/try" element={<Try />} />

                <Route path="*" element={<Error />} />
            </Routes>
        </HashRouter>
    )
}

export default App

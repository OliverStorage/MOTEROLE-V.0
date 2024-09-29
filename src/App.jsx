import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Menu from './pages/Menu'
import Category from './pages/Category'
import Line from './pages/Line'
import Shape from './pages/Shape'
import Alphabet from './pages/Alphabet'
import LevelDificulty from './pages/LevelDificulty'
import Error from './pages/Error'
import Ingame from './pages/Ingame'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import Tutorial from './pages/Tutorial'
import Achievement from './pages/Achievement'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<SignUp />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/category" element={<Category />} />
                <Route path="/line" element={<Line />} />
                <Route path="/shape" element={<Shape />} />
                <Route path="/alphabet" element={<Alphabet />} />
                <Route path="/leveldifficulty" element={<LevelDificulty />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/achievement" element={<Achievement />} />
                <Route path="/tutorial" element={<Tutorial />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/ingame" element={<Ingame />} />

                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App

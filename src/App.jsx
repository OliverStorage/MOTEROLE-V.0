import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { MusicProvider } from './contexts/MusicContext'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Menu from './pages/Menu'
import Category from './pages/Category'
import Ingame from './pages/Ingame'
import Settings from './pages/Settings'
import Exercises from './pages/Exercises'
import GameExercise from './pages/GameExercise'
import Achievement from './pages/Achievement'
import Register from './pages/Register'
import Login from './pages/Login'
import Try from './pages/Try'
import Error from './pages/Error'

const App = () => {
    return (
        <MusicProvider>
            <HashRouter>
                <Routes>
                    <Route index element={<Menu />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/achievement" element={<Achievement />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/Ingame/:gamesessionId" element={<Ingame />} />
                    <Route
                        path="/GameExercise/:exercisesId"
                        element={<GameExercise />}
                    />
                    <Route
                        path="/Exercises/:categoryId"
                        element={<Exercises />}
                    />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/try" element={<Try />} />

                    <Route path="*" element={<Error />} />
                </Routes>
            </HashRouter>
        </MusicProvider>
    )
}

export default App

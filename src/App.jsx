import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MusicProvider } from './contexts/MusicContext'
import ProtectedRoute from './components/ProtectedRoute'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Menu from './pages/Menu'
import Category from './pages/Category'
import Ingame from './pages/Ingame'
import Settings from './pages/Settings'
import Exercises from './pages/Exercises'
import GameExercise from './pages/GameExercise'
import Try from './pages/Try'
import Error from './pages/Error'
// import ErrorModal from './components/ErrorModal'

const App = () => {
    return (
        <MusicProvider>
            <BrowserRouter>
                <Routes>
                    <Route index element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    {/* <Route
                        path="/menu"
                        element={
                            <ProtectedRoute>
                                <Menu />
                            </ProtectedRoute>
                        }
                    /> */}
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/category" element={<Category />} />
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
                    <Route path="/try" element={<Try />} />
                    {/* <Route path="/errormodal" element={<ErrorModal />} /> */}

                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </MusicProvider>
    )
}

export default App

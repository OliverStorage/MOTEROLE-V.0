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

const App = () => {
    return (
        <MusicProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route index element={<SignIn />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />

                    {/* Protected Routes (Requires User to be Logged In) */}
                    <Route
                        path="/menu"
                        element={
                            <ProtectedRoute>
                                <Menu />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/category"
                        element={
                            <ProtectedRoute>
                                <Category />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <ProtectedRoute>
                                <Settings />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/Ingame/:gamesessionId"
                        element={
                            <ProtectedRoute>
                                <Ingame />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/GameExercise/:exercisesId"
                        element={
                            <ProtectedRoute>
                                <GameExercise />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/Exercises/:categoryId"
                        element={
                            <ProtectedRoute>
                                <Exercises />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/try" element={<Try />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </MusicProvider>
    )
}

export default App

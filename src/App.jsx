import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { MusicProvider } from './components/MusicContext'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Menu from './pages/Menu'
import Category from './pages/Category'
import Ingame from './pages/Ingame'
import Settings from './pages/Settings'
import Exercises from './pages/Exercises'
import GameExercise from './pages/GameExercise'
import Try from './pages/Try'
import Try2 from './pages/Try2'
import Error from './pages/Error'

const App = () => {
    return (
        <MusicProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route
                        path="/signin"
                        element={
                            <PublicRoute>
                                <SignIn />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <PublicRoute>
                                <SignUp />
                            </PublicRoute>
                        }
                    />
                    <Route index element={<Navigate to="/signin" replace />} />
                    {/* Protected Routes */}
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
                    <Route path="/try2" element={<Try2 />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </MusicProvider>
    )
}

export default App

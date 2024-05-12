import { Layout } from '@/layout'
import { Posts } from '@/pages/Posts'
import { Home } from '@/pages/home'
import { Post } from '@/pages/post'
import { NewPost } from '@/pages/post/new'
import { Settings } from '@/pages/settings'
import { SignIn } from '@/pages/signIn'
import { SignUp } from '@/pages/signUp'
import { useUserStore } from '@/stores/user'
import { type ReactElement } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'

function PrivateRoute(): ReactElement {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}

function AdminRoute(): ReactElement {
  const { isAuthenticated, user } = useUserStore()
  return isAuthenticated && user?.role !== 'public' ? <Outlet /> : <Navigate to="/" />
}

export function AppRoutes(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/post" element={<Post />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/forex" element={<Posts />} />
          <Route path="/stocks" element={<Posts />} />
          <Route path="/cryptocurrency" element={<Posts />} />
          <Route element={<PrivateRoute />}>
            <Route element={<AdminRoute />}>
              <Route path="/post/create" element={<NewPost />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

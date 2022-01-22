import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  let test = window.localStorage.getItem('loggedIn')

  return test ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoutes

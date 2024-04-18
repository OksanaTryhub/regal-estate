import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser && Object.keys(currentUser).length > 0) {
    return <Outlet />;
  } else {
    return <Navigate to='/sign-in' />;
  }
};

export default PrivateRoute;

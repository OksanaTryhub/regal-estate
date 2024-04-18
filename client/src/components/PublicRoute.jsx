import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PublicRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser && Object.keys(currentUser).length > 0) {
    return <Navigate to='/profile' />;
  } else {
    return <Outlet />;
  }
};

export default PublicRoute;

import { Outlet, Navigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

export function LoginPrivateRoute() {
  const location = useLocation();
  let decode;
  let token = sessionStorage.getItem("ghasjdsbdnewiqyew");
  token ? (decode = jwt_decode(token)) : (token = null);
  return token ? (
    decode.role === "user" || "admin" ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    )
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export function AdminPrivateRoute() {
  const location = useLocation();
  let decode;
  let token = sessionStorage.getItem("ghasjdsbdnewiqyew");
  token ? (decode = jwt_decode(token)) : (token = null);
  return token ? (
    decode.role === "admin" ? (
      <Outlet />
    ) : (
      <Navigate to="/AdminLogin" state={{ from: location }} replace />
    )
  ) : (
    <Navigate to="/AdminLogin" state={{ from: location }} replace />
  );
}

export function LoginCheck() {
  const location = useLocation();
  let decode;
  let token = sessionStorage.getItem("ghasjdsbdnewiqyew");
  token ? (decode = jwt_decode(token)) : (token = null);
  return token ? (
    decode.role === "user" ? (
      <Navigate to="/profile" state={{ from: location }} replace />
    ) : (
      <Outlet />
    )
  ) : (
    <Outlet />
  );
}

export function AdminLoginCheck() {
  const location = useLocation();
  let decode;
  let token = sessionStorage.getItem("ghasjdsbdnewiqyew");
  token ? (decode = jwt_decode(token)) : (token = null);
  return token ? (
    decode.role === "admin" ? (
      <Navigate to="/adminpage" state={{ from: location }} replace />
    ) : (
      <Outlet />
    )
  ) : (
    <Outlet />
  );
}

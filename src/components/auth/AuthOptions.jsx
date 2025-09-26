import { NavLink } from "react-router-dom"
import { LogOut, UserRoundPlus } from "lucide-react"
export const AuthOptions = ({ handleLogout, profileUser }) => {
  return (
    <ul className="flex gap-2 font-semibold items-center">
      {profileUser ? (
        <>
          <li className="flex items-center">
            {profileUser?.display_name || profileUser?.email}
          </li>
          <li>
            <button
              type="button"
              aria-label="Log out"
              className="cursor-pointer p-1 hover:bg-red-800 rounded-2xl"
              onClick={handleLogout}
            >
              <LogOut />
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink
              to="/login"
              aria-label="Log in"
              className="w-10 p-1 flex items-center justify-center"
            >
              <UserRoundPlus />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              aria-label="Subscribe"
              className="bg-white p-1 cursor-pointer text-primary rounded-sm hover:bg-primary hover:text-white"
            >
              Subscribe
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};
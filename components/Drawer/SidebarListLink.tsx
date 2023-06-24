import { NavLink } from "react-router-dom";
import { ReipeObject } from "../../lib/reipeObject.ts";

export interface SidebarListLinkProps {
  recipe: ReipeObject;
  onClose: () => void;
}

function SidebarListLink({ recipe, onClose }: SidebarListLinkProps) {
  return (
    <NavLink
      to={`recipe/${recipe.id}`}
      className={({ isActive, isPending }) =>
        isActive ? "navLink active" : isPending ? "navLink pending" : "navLink"
      }
      onClick={onClose}
    >
      {recipe.name ? (
        <>
          {recipe.name} <small>{recipe.id}</small>
        </>
      ) : (
        <i>Unnamed</i>
      )}{" "}
      {recipe.favorite && <span>★</span>}
    </NavLink>
  );
}

export default SidebarListLink;

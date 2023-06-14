import React from "react";
import { NavLink } from "react-router-dom";
import { ReceiptObject } from "../../lib/receiptObject.ts";

export interface SidebarListLinkProps {
  receipt: ReceiptObject;
  onClose: () => void;
  // onClose: string;
}

function SidebarListLink({ receipt, onClose }: SidebarListLinkProps) {
  return (
    <NavLink
      to={`receipt/${receipt.id}`}
      className={({ isActive, isPending }) =>
        isActive ? "navLink active" : isPending ? "navLink pending" : "navLink"
      }
      onClick={onClose}
    >
      {receipt.name ? <>{receipt.name}</> : <i>Unnamed</i>}{" "}
      {receipt.favorite && <span>★</span>}
    </NavLink>
  );
}

export default SidebarListLink;

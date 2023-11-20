"use client";

import { createPortal } from "react-dom";
import { type FC, type ReactNode, useEffect, useRef } from "react";

interface PortalModalsProps {
	isOpen: boolean;
	children: ReactNode;
}

const PortalModals: FC<PortalModalsProps> = ({ isOpen, children }) => {
	const portalDiv = useRef<Element | null>(null);

	useEffect(() => {
		portalDiv.current = document.getElementById("modals");
	}, []);

	return portalDiv.current ? createPortal(isOpen ? children : null, portalDiv.current) : null;
};

export default PortalModals;

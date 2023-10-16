"use client";

import { createPortal } from "react-dom";
import { FC, PropsWithChildren, useEffect, useRef } from "react";

const PortalModals: FC<PropsWithChildren> = ({ children }) => {
	const portalDiv = useRef<Element | null>(null);

	useEffect(() => {
		portalDiv.current = document.getElementById("modals");
	}, []);

	return portalDiv.current ? createPortal(children, portalDiv.current) : null;
};

export default PortalModals;

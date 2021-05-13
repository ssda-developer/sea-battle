import { FC, ReactNode, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

interface IPortalProps {
    children: ReactNode;
}

const portal = document.getElementById('modal');

const Portal: FC<IPortalProps> = ({ children }: IPortalProps) => {
    const portalContainer = useMemo(() => document.createElement('div'), []);

    useEffect(() => {
        portal?.appendChild(portalContainer);

        return () => {
            portal?.removeChild(portalContainer);
        };
    }, []);

    return createPortal(children, portalContainer);
};

export default Portal;

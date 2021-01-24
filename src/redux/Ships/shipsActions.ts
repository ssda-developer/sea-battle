import { Dispatch } from 'redux';

import { RENDER_SHIPS, ShipsDispatchTypes } from './shipsTypes';

const renderShips = () => (dispatch: Dispatch<ShipsDispatchTypes>): void => {
    dispatch({
        type: RENDER_SHIPS,
    });
};

export default renderShips;

import * as AreaActionCreators from './area/actions';
import * as GameActionCreators from './game/actions';
import * as ShipsActionCreators from './ships/actions';

export default {
    ...AreaActionCreators,
    ...GameActionCreators,
    ...ShipsActionCreators,
};

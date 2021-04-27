import * as AreaActionCreators from './area/actions';
import * as GameActionCreators from './game/actions';

export default {
    ...AreaActionCreators,
    ...GameActionCreators,
};

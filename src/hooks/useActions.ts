import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../store/actionCreators';

const useActions = (): typeof ActionCreators => {
    const dispatch = useDispatch();
    return bindActionCreators(ActionCreators, dispatch);
};

export default useActions;

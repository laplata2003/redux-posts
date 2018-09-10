
import _ from 'lodash';

import { FETCH_POST, FETCH_POSTS } from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_POST:
            console.log('FETCH_POST', JSON.stringify(action, null, 2));
            return { ...state, [action.payload.data.id]: action.payload.data };
            
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');
            
        default:
            return  state; 
    }
}
import { GET_PREFERENCES_SUCCESS, PREFERENCES_UPDATE_SUCCESS } from './actions';

export default (state = {}, action) => {
	const preferences = action.payload;
	let mappedPreferences = [];
  	switch (action.type) {
	    case GET_PREFERENCES_SUCCESS:
	    	Object.keys(preferences).map(function(key, index) {
	    		mappedPreferences[preferences[index].key] = preferences[index];
	    	});
	      	return { ...mappedPreferences };
	    case PREFERENCES_UPDATE_SUCCESS:
	    	Object.keys(preferences).map(function(key, index) {
	    		mappedPreferences[preferences[index].key] = preferences[index];
	    	});
	      	return { ...mappedPreferences };
	    default:
	      	return state;
  }
};

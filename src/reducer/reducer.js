import {combineReducers} from 'redux';
import {reducer as data} from './data/data';
import {reducer as site} from './site/site';
import {reducer as user} from './user/user';
import NameSpace from './name-space';

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.SITE]: site,
  [NameSpace.USER]: user,
});

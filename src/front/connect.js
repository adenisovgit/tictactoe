import { connect } from 'react-redux';
import { actions as actionCreators } from './reducers';
// import { handleIssuesSearch } from './features/issues/issuesSlice';

export default (mapStateToProps) => (Component) => connect(mapStateToProps,
  { ...actionCreators/* , handleIssuesSearch */ })(Component);

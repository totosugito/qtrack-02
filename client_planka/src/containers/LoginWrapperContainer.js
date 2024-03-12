//
//
import { connect } from 'react-redux';

import selectors from '../redux/selectors';
import LoginWrapper from '../components/LoginWrapper';

const mapStateToProps = (state) => {
  const isInitializing = selectors.selectIsInitializing(state)

  return {
    isInitializing,
  }
}

export default connect(mapStateToProps)(LoginWrapper)

//
//
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import selectors from '../redux/selectors';
import entryActions from '../redux/entry-actions'
import Projects from '../components/Projects'

const mapStateToProps = (state) => {
    const { isAdmin } = selectors.selectCurrentUser(state)
    const projects = selectors.selectProjectsForCurrentUser(state)

    return {
        items: projects,
        canAdd: isAdmin,
    }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            onAdd: entryActions.openProjectAddModal,
        },
        dispatch,
    )

export default connect(mapStateToProps, mapDispatchToProps)(Projects)

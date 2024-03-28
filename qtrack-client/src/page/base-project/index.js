import React, {useRef} from "react";
import {useEffect} from "react";
import {connect} from "react-redux";
import BaseAuth from "../base-auth";
import {useTranslation} from "react-i18next";
import selectors from "../../redux/selectors";
import Background from "../../view/Background";
import PropTypes from "prop-types";

const BaseProject = React.memo(
    ({
         currentProject,
         currentBoard,
         children
     }) => {
        const defaultTitle = useRef(document.title)
        useEffect(() => {
            let title;
            if (currentProject) {
                title = currentProject.name;

                if (currentBoard) {
                    title += ` | ${currentBoard.name}`;
                }
            } else {
                title = defaultTitle.current;
            }

            document.title = title;
        }, [currentProject, currentBoard]);

        const [t] = useTranslation();

        const hasBg = () => {
            return (currentProject && currentProject.background)
        }
        return (
            <>
                <BaseAuth hasBg={hasBg()} background={
                    hasBg() && (
                        <Background
                            type={currentProject.background.type}
                            name={currentProject.background.name}
                            imageUrl={currentProject.backgroundImage && currentProject.backgroundImage.url}
                        />
                    )
                }>
                    {/*<div style={{height: `calc( 100% - 56px )`}}>*/}
                  <div>
                    {children}
                    </div>
                </BaseAuth>
            </>
        )
    })
BaseProject.propTypes = {
    children: PropTypes.object
}

BaseProject.defaultProps = {
    children: undefined
};

const mapStateToProps = (state) => {
    const currentProject = selectors.selectCurrentProject(state);
    const currentBoard = selectors.selectCurrentBoard(state);
    return {
        currentProject,
        currentBoard,
    }
}
export default connect(mapStateToProps)(BaseProject)

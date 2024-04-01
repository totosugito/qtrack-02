import React from "react";
import {useEffect} from "react";
import {connect} from "react-redux";
import BaseAuth from "../base-auth";
import Projects from "./Projects";
import {useTranslation} from "react-i18next";

function UiProjectList() {
    useEffect(() => {
        document.title = "Project List";
    }, []);

    const [t] = useTranslation();
    return (
        <>
            <BaseAuth>
                <Projects/>
            </BaseAuth>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
    }
}
export default connect(mapStateToProps)(UiProjectList)

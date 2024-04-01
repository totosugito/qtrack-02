import React, {useRef, useState} from "react";
import {
  Edit,
  ExcelExport,
  Filter,
  GanttComponent,
  Inject,
  PdfExport,
  Resize,
  Selection,
  Sort,
  Toolbar,
} from "@syncfusion/ej2-react-gantt";

import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-layouts/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import '@syncfusion/ej2-grids/styles/material.css';
import '@syncfusion/ej2-treegrid/styles/material.css';
import '@syncfusion/ej2-react-gantt/styles/material.css';
import {registerLicense} from "@syncfusion/ej2-base";
import {read, utils} from "xlsx";
import styles from "./index.module.scss";
import stylesView from "../../../view/index.module.scss";
import classNames from "classnames";
import {Icon} from "semantic-ui-react";
import {useTranslation} from "react-i18next";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import selectors from "../../../redux/selectors";
import {Link} from "react-router-dom";
import Paths from "../../../constants/Paths";
import {LTT} from "../../../lib/external";

registerLicense("Ngo9BigBOggjHTQxAR8/V1NHaF1cWGhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEZiWH1ZcHdQRWJZWE12Xg==");
const GanttViewer = React.memo(({boardId, gantt}) => {
  const [t] = useTranslation();
  let ganttChart;
  const [gantt1, setGantt1] = useState(gantt)
  const ganttRef = useRef(null);

  const toolbarClick = (args) => {
    if (args.item.id === 'pdf_export') {
      let exportProperties = {
        includeHiddenColumn: true,
        pageOrientation: 'Landscape',
        pageSize: 'A1',
        fitToWidthSettings: {
          isFitToWidth: false,
        }
      };
      ganttChart.pdfExport(exportProperties);
    } else if (args.item.id === 'excel_export') {
      ganttChart.excelExport();
    }
  }

  const handleImport = ($event) => {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          let ltt = new LTT(rows, {
            key_id: 'TaskId',
            key_parent: 'ParentId',
          });
          let tree = ltt.GetTree();
          setGantt1(tree);
        }
      }
      reader.readAsArrayBuffer(file);
    }
  }

  const timelineSettings = {
    timelineUnitSize: 100,
    timelineViewMode: 'Month'
  };
  return (
    <div>
      <div className={stylesView.toolbarBoardContainer}>
        <div className={stylesView.toolbarItemContainer}>

          <div className={stylesView.toolbarItemSmall}>
            <div className={classNames(stylesView.toolbarButton)}>
              <Link className={classNames(stylesView.toolbarLink)} to={Paths.BOARDS.replace(':id', boardId)}>
                <Icon name='arrow left'/>
                <span className={classNames(stylesView.toolbarButtonTitle)}>
                      {t('common.backToBoard')}
                    </span>
              </Link>
            </div>
          </div>

          <div className={stylesView.toolbarItemSmall}>
            <div className={classNames(stylesView.toolbarButton)}>
              <input id="files" type="file" name="file" className="custom-file-input"
                     required onChange={handleImport}
                     accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
            </div>
          </div>

          <div className={stylesView.toolbarItemSmall}>
            <div className={classNames(stylesView.toolbarButton)}
                 onClick={() => toolbarClick({item: {id: 'pdf_export'}})}>
              <Icon name='file pdf outline'/>
              <span className={classNames(stylesView.toolbarButtonTitle)}>
                      {t('common.pdfExport')}
                    </span>
            </div>
          </div>

          <div className={stylesView.toolbarItemSmall} onClick={() => toolbarClick({item: {id: 'excel_export'}})}>
            <div className={classNames(stylesView.toolbarButton)}>
              <Icon name='file excel outline'/>
              <span className={classNames(stylesView.toolbarButtonTitle)}>
                      {t('common.excelExport')}
                    </span>
            </div>
          </div>
        </div>
      </div>

      <div className={classNames(styles.gantt)}>
        {gantt !== undefined &&
          <GanttComponent ref={ganttRef => ganttChart = ganttRef} dataSource={gantt1} timelineSettings={timelineSettings}
            // treeColumnIndex={1}
                          allowResizing={true}
                          allowSelection={true}
                          allowPdfExport={true}
                          allowExcelExport={true}
            // toolbarClick={toolbarClick.bind(this)}
            // toolbar={['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Indent', 'Outdent']}
                          taskFields={{
                            id: 'TaskId',
                            name: 'TaskName',
                            startDate: 'StartDate',
                            endDate: 'DueDate',
                            duration: 'Duration',
                            progress: 'Progress',
                            dependency: 'Predecessor',
                            child: 'child'
                          }}
            // editSettings={{
            //   allowAdding: false,
            //   allowEditing: false,
            //   allowDeleting: false,
            //   allowTaskbarEditing: false,
            //   showDeleteConfirmDialog: false
            // }}
                          queryTaskbarInfo={(args) => {
                            args.taskbarBgColor = '#DCDCDC'
                            if (args.data["Progress"] <= 25)
                              args.progressBarBgColor = "red"
                            else if (args.data["Progress"] <= 50)
                              args.progressBarBgColor = "yellow"
                            else if (args.data["Progress"] <= 75)
                              args.progressBarBgColor = "lightgreen"
                            else
                              args.progressBarBgColor = "green"

                          }}
          >
            <Inject services={[Edit, Selection, Toolbar, Filter, Sort, Resize, PdfExport, ExcelExport]}/>
          </GanttComponent>
        }
      </div>
    </div>
  )
})

GanttViewer.propTypes = {
  gantt: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  const listIds = selectors.selectListIdsForCurrentBoard(state);
  const selectListById = selectors.makeSelectListById();
  const selectCardForGanttByListId = selectors.makeSelectCardForGanttByListId();

  let taskId = 1
  const gantt = []

  // -----------------------------
  // loop list over board
  // -----------------------------
  listIds.forEach((id) => {
    const objList = selectListById(state, id)
    id = objList.id

    // -----------------------------
    // loop card over list
    // -----------------------------
    const cards = selectCardForGanttByListId(state, id)
    for (let i = 0; i < cards.length; i++) {
      let card = cards[i]
      if (!card.gantt.isEnable)
        continue

      gantt.push({
        TaskId: taskId,
        TaskName: card.name,
        StartDate: card.startDate,
        DueDate: card.dueDate,
        Progress: card.gantt.progress
      })

      taskId = taskId + 1
    }
  })
  return ({
    gantt
  })
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GanttViewer);


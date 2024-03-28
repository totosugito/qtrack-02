import React from "react";
import {useTranslation} from "react-i18next";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {PDFViewer, Page, Document} from '@react-pdf/renderer'
import {styles} from './styles'
import selectors from "../../../redux/selectors";
import ProjectInfo from "./ProjectInfo";
import BoardInfo from "./BoardInfo";
import CardList from "./CardList";

const ReportViewer = ({project, board, cards}) => {
  const [t] = useTranslation();

  return (
    <>
      {/*<img src={cards[0].attachments_[0].coverUrl} alt={''}/>*/}
      <PDFViewer style={{width: '100%', height: 'calc(100vh - 54px)'}}>
        <Document>
          <Page size='A4' style={styles.page}>
            <ProjectInfo project={project}/>
            <BoardInfo board={board} cards={cards}/>
            {(cards.length > 0) &&
              <CardList cards={cards}/>
            }
          </Page>
        </Document>
      </PDFViewer>
    </>)

}

const mapStateToProps = (state) => {
  const board = selectors.selectCurrentBoard(state);
  const listIds = selectors.selectListIdsForCurrentBoard(state);
  const selectListById = selectors.makeSelectListById();
  const selectCardByListId = selectors.makeSelectCardByListId()
  const selectTasksForCurrentCard = selectors.makeSelectTasksForCurrentCard()
  const selectAttachmentsForCurrentCard = selectors.makeSelectAttachmentsForCurrentCard()

  const cards = []
  // -----------------------------
  // loop list over board
  // -----------------------------
  listIds.forEach((id) => {
    const objList = selectListById(state, id)
    id = objList.id

    // -----------------------------
    // loop card over list
    // -----------------------------
    const cards_ = selectCardByListId(state, id)
    for(let i=0; i<cards_.length; i++) {
      let card = cards_[i]
      id = card.id
      let currentUserId = '65d6b39f9f6aeb8d9838f22c'
      card['tasks_'] = selectTasksForCurrentCard(state, id)
      card['attachments_'] = selectAttachmentsForCurrentCard(state, id)
      cards.push(card)
    }
  })

  return (
    {
      project: board.project,
      board: board,
      cards: cards
    }
  )
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ReportViewer);

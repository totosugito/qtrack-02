import {View} from "@react-pdf/renderer";
import {GroupLabel, styles, TextWithValue} from "./styles";
import React from "react";
import {useTranslation} from "react-i18next";

const BoardInfo = ({board, cards}) => {
  const [t] = useTranslation();

  return(
    <>
      <View style={styles.groupContainer}>
        <GroupLabel label={"Board"}/>
        <TextWithValue label={"Name"} value={board.name}/>
        <TextWithValue label={"Created"}
                       value={t(`format:fullDateTime`, {
                         value: board.createdAt,
                         postProcess: 'formatDate',
                       })}
        />
        <TextWithValue label={"Last Updated"}
                       value={t(`format:fullDateTime`, {
                         value: board.updatedAt,
                         postProcess: 'formatDate',
                       })}
        />

        <TextWithValue label={"Card Count"}
                       value={cards.length}
        />
      </View>
    </>
  )
}

export default BoardInfo

import {View} from "@react-pdf/renderer";
import {GroupLabel, TextWithValue} from "./styles";
import React from "react";
import {useTranslation} from "react-i18next";

const ProjectInfo = ({project}) => {
  const [t] = useTranslation();

  return (
    <View>
      <GroupLabel label={"Project"}/>
      <TextWithValue label={"Name"} value={project.name}/>
      <TextWithValue label={"Created"}
                     value={t(`format:fullDateTime`, {
                       value: project.createdAt,
                       postProcess: 'formatDate',
                     })}
      />
      <TextWithValue label={"Last Updated"}
                     value={t(`format:fullDateTime`, {
                       value: project.updatedAt,
                       postProcess: 'formatDate',
                     })}
      />
    </View>
  )
}
export default ProjectInfo

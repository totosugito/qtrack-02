import {Text, View} from "@react-pdf/renderer";
import React from "react";
import {styles} from "./styles";
const TaskItem = ({index, task}) => {
  return(
    <>
      <View style={styles.taskContainer}>
        <Text>{index+1}. {task.name}</Text>
      </View>
    </>
  )
}
export default TaskItem

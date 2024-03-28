import {Text, View} from "@react-pdf/renderer";
import React from "react";
import {styles} from "./styles";
const ActionItem = ({index, item}) => {
  return(
    <>
      <View style={styles.taskContainer}>
        <Text>{index+1}. {item.user.email}</Text>
        <Text>{item.data.text}</Text>
      </View>
    </>
  )
}
export default ActionItem

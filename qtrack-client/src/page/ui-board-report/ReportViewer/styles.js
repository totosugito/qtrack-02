import {StyleSheet, Text, View} from '@react-pdf/renderer';
import React from "react";

const styles = StyleSheet.create({
  // ----------- page ----------
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    paddingTop: 50,
    paddingLeft:60,
    paddingRight:60,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  groupContainer: {
    marginTop: 10
  },

  // ----------- group label ----------
  groupLabel : {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    // marginTop: 10
  },

  // ----------- card ----------
  cardContainer: {
    marginBottom: 5,
    marginLeft: 5
  },
  cardContent: {
    marginLeft: 12
  },
  cardTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
  },

  // ----------- task ----------
  taskContainer: {
    marginLeft: 10,
    marginBottom: 5
  },

  // ----------- text with value ----------
  textWithValue: {
    flexDirection: 'row',
  },
  textWithValueLeft : {
    width: 120
  },
  textWithValueRight : {
    marginLeft: 5,
    // fontFamily: 'Helvetica-Bold',
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  textLabelTitle: {
    fontFamily: 'Helvetica-Bold',
  },
  textLabelValue: {
    fontFamily: 'Times-Roman',
    marginBottom: 5
  }
})

const GroupLabel = ({label}) => {
  return(
    <View>
      <Text style={styles.groupLabel}>{label}</Text>
    </View>
  )
}

const TextWithValue = ({label, value}) => {
  return(
    <View style={styles.textWithValue}>
      <Text style={styles.textWithValueLeft}>{label}</Text>
      <Text>:</Text>
      <Text style={styles.textWithValueRight}>{value}</Text>
    </View>
  )
}
export {styles,  GroupLabel, TextWithValue}

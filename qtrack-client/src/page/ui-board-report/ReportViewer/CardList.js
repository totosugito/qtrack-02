import {View, Text, Image} from "@react-pdf/renderer";
import {GroupLabel, styles} from "./styles";
import React from "react";
import {useTranslation} from "react-i18next";
import TaskItem from "./TaskItem";
import ActionItem from "./ActionItem";

const CardList = ({cards}) => {
  const [t] = useTranslation()

  const getCardDescription = (description) => {
    let tempElement = document.createElement('div'); // Create a temporary element
    tempElement.innerHTML = description; // Set the innerHTML of the temporary element with your string
    let textContent = tempElement.textContent || tempElement.innerText; // Get the text content of the temporary element
    return(textContent)
  }
  const CardItem = ({index, card}) => {
    return (
      <>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>{index + 1}. {(card.name).toUpperCase()}</Text>
          <View style={styles.cardContent}>
            {/* name */}
            <Text style={styles.textLabelTitle}>Name :</Text>
            <Text style={styles.textLabelValue}>{card.name}</Text>
            <Text style={styles.textLabelTitle}>Creator :</Text>
            <Text style={styles.textLabelValue}>{card.creatorUser['name']} ({card.creatorUser['email']})</Text>
            <Text style={styles.textLabelTitle}>Created :</Text>
            <Text style={styles.textLabelValue}>{t(`format:fullDateTime`, {
              value: card.createdAt,
              postProcess: 'formatDate',
            })}</Text>
            {
              (card.startDate && card.dueDate) && (
                <>
                  <Text style={styles.textLabelTitle}>Start/Due Date :</Text>
                  <Text style={styles.textLabelValue}>{t(`format:fullDateTime`, {
                    value: card.startDate,
                    postProcess: 'formatDate',
                  })}&nbsp;-&nbsp;
                    {t(`format:fullDateTime`, {
                      value: card.dueDate,
                      postProcess: 'formatDate',
                    })}
                  </Text>
                </>
              )
            }

            {/* description */}
            {card.description &&
              <>
                <Text style={styles.textLabelTitle}>Description :</Text>
                <Text style={styles.textLabelValue}>{getCardDescription(card.description)}</Text>
              </>
            }

            {/* tasks */}
            {(card.tasks_.length > 0) && (
              <>
                <Text style={styles.textLabelTitle}>Tasks :</Text>
                {card.tasks_.map((task_, index) => (
                  <TaskItem key={index} index={index} task={task_}/>
                ))}
              </>
            )
            }

            {/*{(card.attachments_.length > 0) && (*/}
            {/*  <>*/}
            {/*    <Text style={styles.textLabelTitle}>Attachments :</Text>*/}
            {/*    {card.attachments_.map((attach_, index) => (*/}
            {/*      <View key={index}>*/}
            {/*        <Text>{attach_.coverUrl}</Text>*/}
            {/*      <Image src={{uri: attach_.coverUrl, method: "GET", headers: { "Cache-Control": "no-cache" }, body: ""}}/>*/}
            {/*      </View>*/}
            {/*    ))}*/}
            {/*  </>*/}
            {/*)*/}
            {/*}*/}

             {/*actions */}
            {/*{(card.actions_.length > 0) && (*/}
            {/*  <>*/}
            {/*    <Text style={styles.textLabelTitle}>Actions :</Text>*/}
            {/*    {card.actions_.map((action_, index) => (*/}
            {/*      <ActionItem key={index} index={index} item={action_}/>*/}
            {/*    ))}*/}
            {/*  </>*/}
            {/*)*/}
            {/*}*/}
          </View>
        </View>
      </>
    )
  }

  return (
    <>
      <View style={styles.groupContainer}>
        <GroupLabel label={"Cards"}/>
        {
          cards.map((card, index) => (
            <CardItem key={index} index={index} card={card}/>
          ))
        }
      </View>
    </>
  )
}
export default CardList

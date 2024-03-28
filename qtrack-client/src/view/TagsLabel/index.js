import React from "react";
import styles from './index.module.scss'
const TagsLabel = React.memo(({ tags }) => {
  return(
    <div className={styles.container}>
      {tags.map((tag) => (
        <span key={tag} className={styles.tag}>
          #{tag}
        </span>
      ))}
    </div>
  )
})
export default TagsLabel
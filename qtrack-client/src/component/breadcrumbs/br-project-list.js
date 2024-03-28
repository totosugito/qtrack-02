import {Link} from "@mui/material";
import {useTranslation} from "react-i18next";
import {Icon} from "semantic-ui-react";

const BrProjectList = ({hasClick = true}) => {
  const [t] = useTranslation();

  return (
    <Link underline="hover" color="inherit" sx={{display: 'flex', alignItems: 'center'}}
          href={hasClick ? "#" : "#"}>
      <Icon name="folder outline"/>
      {t('common.project')}
    </Link>
  )
}
export default BrProjectList

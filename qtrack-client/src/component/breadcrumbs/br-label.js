import {Link} from "@mui/material";

const BrLabel = ({label}) => {
    return (
        <Link underline="hover" color="inherit" sx={{display: 'flex', alignItems: 'center'}}
              href={"#"}>
            {label}
        </Link>
    )
}
export default BrLabel
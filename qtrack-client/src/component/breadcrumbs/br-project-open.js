import {Link} from "@mui/material";

const BrProjectOpen = ({hasClick=true, label}) => {
    return (
        <Link underline="hover" color="inherit" sx={{display: 'flex', alignItems: 'center'}}
              href={hasClick ? "#" : "#"}>
            {label}
        </Link>
    )
}
export default BrProjectOpen

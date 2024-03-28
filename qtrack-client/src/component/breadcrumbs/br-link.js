import {Link} from "@mui/material";

const BrLink = ({label, href}) => {
    return (
        <Link underline="hover" color="inherit" sx={{display: 'flex', alignItems: 'center'}}
              href={href}>
            {label}
        </Link>
    )
}
export default BrLink

import {Link} from "@mui/material";

const BrProjectCreate = ({hasClick=true}) => {
    return (
        <Link underline="hover" color="inherit" sx={{display: 'flex', alignItems: 'center'}}
              href={hasClick ? "#" : "#"}>
            Create
        </Link>
    )
}
export default BrProjectCreate

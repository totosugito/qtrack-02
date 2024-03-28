import {Avatar, Stack} from "@mui/material";

const UserAvatar = ({user}) => {
    return (
        <>
            <Stack direction="row">
                <Avatar sx={{ width: 32, height: 32 }} src={user.avatar}/>
            </Stack>
        </>
    )
}
export default UserAvatar
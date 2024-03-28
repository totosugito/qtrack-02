import {Box, Link, Stack, Typography, useTheme} from "@mui/material";

const AuthFooter = (props) => {
    const theme = useTheme()
    const styles = {
        label: {
            color: theme.palette.text.secondary
        },
        link: {
            color: theme.palette.text.secondary,
            mr: 1,
            ml: 1
        }
    }

    return (
        <>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                <Typography sx={styles.label}>© trackAI By <Link href={"#"} to={"#"} underline={'none'}>waviv.com</Link></Typography>
                <Box>
                    <Link sx={styles.link} href={"#"} to={"#"} underline={'none'} display={'inline'}>Privacy Policy</Link>
                    <Link sx={styles.link} href={"#"} to={"#"} underline={'none'} display={'inline'}>Support</Link>
                </Box>
            </Stack>
        </>
    )
}
export default AuthFooter

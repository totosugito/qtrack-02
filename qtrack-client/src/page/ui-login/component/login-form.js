import {Alert, Box, Button, Card, Grid, Link, Stack, TextField, Typography} from "@mui/material";
import React, {useState} from "react";

const LoginForm = (props) => {
    const styles = {
        authCard: {
            maxWidth: {xs: 400, lg: 475},
            margin: {xs: 2.5, md: 3},
            '& > *': {
                flexGrow: 1,
                flexBasis: '50%'
            }
        }
    }

    const [authParam, setAuthParam] = useState({
        emailOrUsername: "demo@demo.demo",
        password: "demo"
    })
    const {emailOrUsername, password} = authParam

    const onChange = (e) => {
        setAuthParam((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let bodyFormData = new FormData();
        bodyFormData.append('emailOrUsername', authParam["emailOrUsername"].trim());
        bodyFormData.append('password', authParam["password"].trim());
        // props.onSubmit(bodyFormData)
        props.onSubmit(authParam)
    }

    return (
        <>
            <Grid item>
                <div sx={styles.authCard}>
                    <Box sx={{p: {xs: 2, sm: 3, md: 4, xl: 5}}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack direction="row" justifyContent="space-between"
                                       alignItems="baseline"
                                       sx={{mb: {xs: -0.5, sm: 0.5}}}>
                                    <Typography variant="h4">Login</Typography>
                                    <Typography component={Link} to="/register" variant="body1"
                                                sx={{textDecoration: 'none'}} color="primary">
                                        Don't have an account?
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                {props.msg &&
                                    <Alert
                                        color={'error'}
                                        sx={{mb: 4}}>
                                        {props.msg["message"]}
                                    </Alert>
                                }

                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        fullWidth
                                        required
                                        type="text"
                                        name='emailOrUsername'
                                        label='Email Address'
                                        value={emailOrUsername}
                                        onChange={onChange}
                                    />
                                    <TextField
                                        sx={{mt: 2, mb: 4}}
                                        fullWidth
                                        required
                                        type="text"
                                        name='password'
                                        label='Password'
                                        value={password}
                                        onChange={onChange}
                                    />

                                    <Button
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        color="primary">
                                        Login
                                    </Button>
                                </form>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </Grid>
        </>
    )
}
export default LoginForm

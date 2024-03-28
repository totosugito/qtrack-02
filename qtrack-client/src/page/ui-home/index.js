import {Avatar, AvatarGroup, Box, Button, Card, Grid, Stack, Typography, useTheme} from "@mui/material";
import BaseAuth from "../base-auth";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import AnalyticCard from "./component/analytic-card";
import IncomeAreaChart from "./component/IncomeAreaChart";
import MonthlyBarChart from "./component/MonthlyBarChart";
import avatar1 from '../../assets/users/avatar-1.png';
import avatar2 from '../../assets/users/avatar-2.png';
import avatar3 from '../../assets/users/avatar-3.png';
import avatar4 from '../../assets/users/avatar-4.png';

const UiHome = () => {
    const theme = useTheme()
    const styles = {
        title: {
            mt: 2,
            mb: 1,
            fontSize: '120%',
            fontWeight: 'bold',
            color: theme.palette.secondary.main
        },
        container: {
            p: 1,
            mt: 1,
        },
        card: {
            p: 0,
            boxShadow: 0,
        }
    }

    // const dataStore = useSelector((state) => state.skk)
    // const [project, setProject] = useState(dataStore["project"])
    const navigate = useNavigate()
    const [value, setValue] = useState('today');
    const [slot, setSlot] = useState('week');

    return (
        <>
            <BaseAuth>
                <Box maxWidth="xl" sx={styles.container}>
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AnalyticCard title="Total Page Views" count="442" percentage={59.3} extra="35,000" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AnalyticCard title="Total Users" count="250" percentage={70.5} extra="100" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <AnalyticCard title="Total Visitor" count="8,800" percentage={27.4} isLoss color="warning" extra="1,943" />
                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="h5">Unique Visitor</Typography>
                                </Grid>
                                <Grid item>
                                    <Stack direction="row" alignItems="center" spacing={0}>
                                        <Button
                                            size="small"
                                            onClick={() => setSlot('month')}
                                            color={slot === 'month' ? 'primary' : 'secondary'}
                                            variant={slot === 'month' ? 'outlined' : 'text'}
                                        >
                                            Month
                                        </Button>
                                        <Button
                                            size="small"
                                            onClick={() => setSlot('week')}
                                            color={slot === 'week' ? 'primary' : 'secondary'}
                                            variant={slot === 'week' ? 'outlined' : 'text'}
                                        >
                                            Week
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Card sx={{ mt: 1.5 }}>
                                <Box sx={{ pt: 1, pr: 2 }}>
                                    <IncomeAreaChart slot={slot} />
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="h5">Weekly Data</Typography>
                                </Grid>
                            </Grid>
                            <Card sx={{ mt: 1.5 }}>
                                <Box sx={{ pt: 1, pr: 2 }}>
                                    <MonthlyBarChart slot={slot} />
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={5} lg={4}>
                        <Card sx={{p:2, mt: 2 }}>
                            <Stack spacing={3}>
                                <Grid container justifyContent="space-between" alignItems="center">
                                    <Grid item>
                                        <Stack>
                                            <Typography variant="h5" noWrap>
                                                Help & Support Chat
                                            </Typography>
                                            <Typography variant="caption" color="secondary" noWrap>
                                                Typical replay within 5 min
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item>
                                        <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                                            <Avatar alt="Remy Sharp" src={avatar1} />
                                            <Avatar alt="Travis Howard" src={avatar2} />
                                            <Avatar alt="Cindy Baker" src={avatar3} />
                                            <Avatar alt="Agnes Walker" src={avatar4} />
                                        </AvatarGroup>
                                    </Grid>
                                </Grid>
                                <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
                                    Need Help?
                                </Button>
                            </Stack>
                        </Card>
                    </Grid>
                </Box>
            </BaseAuth>
        </>
    )
}
export default UiHome

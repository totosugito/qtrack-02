import PropTypes from 'prop-types';

// material-ui
import {Box, Card, Chip, Grid, Stack, Typography} from '@mui/material';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticCard = ({ color, title, count, percentage, isLoss, extra }) => (
    <Card sx={{ p: 2 }}>
        <Stack spacing={0.5}>
            <Typography variant="h6" color="textSecondary">
                {title}
            </Typography>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography variant="h4" color="inherit">
                        {count}
                    </Typography>
                </Grid>
                {percentage && (
                    <Grid item>
                        <Chip
                            variant="combined"
                            color={color}
                            icon={
                                <>
                                    {/*{!isLoss && <ApiOutlinedIcon style={{ fontSize: '0.75rem', color: 'inherit' }} />}*/}
                                    {/*{isLoss && <WebhookOutlinedIcon style={{ fontSize: '0.75rem', color: 'inherit' }} />}*/}
                                </>
                            }
                            label={`${percentage}%`}
                            sx={{ ml: 1.25, pl: 1 }}
                            size="small"
                        />
                    </Grid>
                )}
            </Grid>
        </Stack>
        <Box sx={{ pt: 2.25 }}>
            <Typography variant="caption" color="textSecondary">
                You made an extra{' '}
                <Typography component="span" variant="caption" sx={{ color: `${color || 'primary'}.main` }}>
                    {extra}
                </Typography>{' '}
                this year
            </Typography>
        </Box>
    </Card>
);

AnalyticCard.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.string,
    percentage: PropTypes.number,
    isLoss: PropTypes.bool,
    extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

AnalyticCard.defaultProps = {
    color: 'primary'
};

export default AnalyticCard;

import {alpha, styled} from '@mui/material/styles';
import {Box, Card, Typography} from '@mui/material';
// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({theme}) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
}));

export default function AppWidgetSummary({title, total, icon, color = 'primary', sx, onClick, ...other}) {
    return (
        <Card
            sx={{
                borderRadius: 5,
                py: 2,
                boxShadow: 0,
                textAlign: 'center',
                color: (theme) => theme.palette[color].dark,
                backgroundImage: (theme) => `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.3)} 0%, ${alpha(
                    theme.palette[color].dark,
                    0.24
                )} 100%)`,
                ...sx,
            }}
            {...other}
        >
            <StyledIcon onClick={onClick}
                sx={{
                    color: (theme) => theme.palette[color].dark,
                    backgroundImage: (theme) =>
                        `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0.7)} 0%, ${alpha(
                            theme.palette[color].dark,
                            0.24
                        )} 100%)`,
                }}
            >
                <Box sx={{color: (theme) => theme.palette[color].contrastText}}>{icon}</Box>
            </StyledIcon>

            <Typography variant="h3">{total}</Typography>

            <Typography variant="subtitle2" sx={{opacity: 0.72}}>
                {title}
            </Typography>
        </Card>
    );
}
import PropTypes from 'prop-types';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export const OverviewTotalProfit = (props) => {
  const { value, sx , name} = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              {name}
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
          
          
            {name === "Balance" ? (
                 <Avatar
                 sx={{
                   backgroundColor: 'blue',
                   height: 56,
                   width: 56
                 }}
               >
  
    <AttachMoneyIcon fontSize = 'large'   /></Avatar>
  
) : name === "Income" ? (
    <Avatar
    sx={{
      backgroundColor: 'green',
      height: 56,
      width: 56
    }}
  >
    <ArrowUpwardIcon  fontSize='large'/>
    </Avatar>
) : 
<Avatar
    sx={{
      backgroundColor: 'red',
      height: 56,
      width: 56
    }}
  >
<ArrowDownwardIcon  fontSize='large' /></Avatar>
}

          
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTotalProfit.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object
};

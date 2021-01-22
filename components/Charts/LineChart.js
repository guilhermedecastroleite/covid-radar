import PropTypes from 'prop-types';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Box, Text } from '@chakra-ui/react';

const CustomTooltip = ({ ...props }) => {
  const { active, payload } = props;

  const tooltipExists = active && payload;
  const date = tooltipExists ? payload[0]?.payload.date : null;
  const value = tooltipExists ? payload[0]?.payload.value : null;

  return tooltipExists
    ? (
      <Box
        p={3}
        bg='white'
        borderRadius='md'
        border='1px solid gray.800'
        boxShadow='lg'
        zIndex={1000}
      >
        <Text color='gray.600'>{date}</Text>
        <Text color='gray.600'>{(value || '').toLocaleString()}</Text>
      </Box>
    )
    : null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
};

CustomTooltip.defaultProps = {
  active: '',
  payload: [],
};

const LineChartComponent = ({
  data, width, height, range, tooltipProps, lineChartProps,
}) => {
  const { min, max } = range;

  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
        {...lineChartProps}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dy={10}
          dataKey='date'
          tick={{
            fill: '#2D3748',
            fontSize: 14,
          }}
          tickLine={false}
        />
        <YAxis
          dx={-10}
          domain={[min, max]}
          tick={{
            fill: '#2D3748',
            fontSize: 14,
          }}
          tickLine={false}
        />
        <Tooltip
          content={(props) => <CustomTooltip {...props} />}
          {...tooltipProps}
        />
        <Line
          type='monotone'
          dataKey='value'
          stroke='#38B2AC'
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

LineChartComponent.propTypes = {
  data: PropTypes.array,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  range: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
  }),
  tooltipProps: PropTypes.object,
  lineChartProps: PropTypes.object,
};

LineChartComponent.defaultProps = {
  data: [],
  width: '100%',
  height: 300,
  range: {
    min: 0,
    max: 100,
  },
  tooltipProps: {},
  lineChartProps: {},
};

export default LineChartComponent;

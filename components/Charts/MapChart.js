import { memo } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup,
} from 'react-simple-maps';
import { Skeleton } from '@chakra-ui/react';

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const MapChart = ({
  countryData, marker, minColor, maxColor, setTooltipContent,
}) => {
  const sortedCountries = countryData.sort((a, b) => b[marker] - a[marker]);
  const max = (sortedCountries[0] || {})[marker];

  const colorScale = scaleLinear()
    .domain([0, max / 2.5])
    .range([minColor, maxColor]);

  return (
    <>
      {!countryData && (
        <Skeleton h='300px' />
      )}

      {countryData && (
        <ComposableMap
          data-tip=''
          projectionConfig={{
            rotate: [-10, 0, 0],
            scale: 147,
          }}
          width={800}
          height={400}
        >
          <ZoomableGroup>
            <Sphere stroke='#CBD5E0' strokeWidth={0.5} />
            <Graticule stroke='#CBD5E0' strokeWidth={0.5} />
            {countryData.length > 0 && (
              <Geographies geography={geoUrl}>
                {({ geographies }) => geographies.map((geo) => {
                  const d = countryData.find((s) => s.ISO3 === geo.properties.ISO_A3);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={d ? colorScale(d[marker]) : minColor}
                      stroke='#EDF2F7'
                      onMouseEnter={() => setTooltipContent(d ? `${d.name} - ${d[marker].toLocaleString()}` : '')}
                      onMouseLeave={() => setTooltipContent('')}
                    />
                  );
                })}
              </Geographies>
            )}
          </ZoomableGroup>
        </ComposableMap>
      )}
    </>
  );
};

MapChart.propTypes = {
  countryData: PropTypes.array.isRequired,
  marker: PropTypes.string.isRequired,
  minColor: PropTypes.string.isRequired,
  maxColor: PropTypes.string.isRequired,
  setTooltipContent: PropTypes.func.isRequired,
};

export default memo(MapChart);

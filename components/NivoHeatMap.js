import { ResponsiveHeatMap } from '@nivo/heatmap'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export default function NivoHeatMap({ heatMapData }) {

    //var datastring = JSON.stringify(heatMapData.DataPoints);
    //console.log(datastring);

    return (
        <ResponsiveHeatMap
          data={heatMapData.DataPoints}
          keys={heatMapData.keys}
          indexBy="target_id"
          margin={{ top: 50, right: 60, bottom: 100, left: 60}}
          forceSquare={true}
          sizeVariation={0.3}
          colors="YlOrRd"
          axisTop={null}
          axisRight={null}
          axisBottom={{ orient: 'top', tickSize: 5, tickPadding: 5, tickRotation: 45, legend: heatMapData.legend, legendOffset: 300}}
          axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legendPosition: 'middle',
              legendOffset: -100
          }}
          cellShape="circle"
          cellOpacity={1}
          cellBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.4 ] ] }}
          labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.8 ] ] }}
          defs={[
              {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: 'rgba(0, 0, 0, 0.1)',
                  rotation: -45,
                  lineWidth: 4,
                  spacing: 7
              }
          ]}
          fill={[ { id: 'lines' } ]}
          animate={true}
          motionStiffness={80}
          motionDamping={9}
          hoverTarget="cell"
          cellHoverOthersOpacity={0.25}
        />
)

}
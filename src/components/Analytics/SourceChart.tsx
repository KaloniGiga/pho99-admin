import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Pie } from "@ant-design/plots";
import { AuthContext, createAuthContextProps } from "../../context/AuthContext";
import { myDeviceType } from "./DeviceChart";
const SourceChart = () => {
  const authContextData =
    useContext<createAuthContextProps | null>(AuthContext);
  const [mySource, setMySource] = useState<myDeviceType[]>([]);
  console.log("source chart", authContextData?.trafficSource);

  const [customColors] = useState(['#982176', '#3E001F', '#FFE5AD', '#FFE5AD', '#F31559'])
  const config = {
    appendPadding: 10,
    data: mySource,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
      style: {
        fill: '#fff',
        fillOpacity: 0.5,
      }
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };

  useEffect(() => {
    if (authContextData?.trafficSource && authContextData?.trafficSource?.length > 0) {
      const newArr = authContextData?.trafficSource.map((pg) => {
        return {
          type: pg.dimensionValues[0].value,
          value: parseInt(pg.metricValues[0].value),
        };
      })
      setMySource([...newArr])
    }
  }, [authContextData?.trafficSource, authContextData?.trafficSource?.length]);
  return (
    <div className="custom-pie-chart">
      {mySource && mySource.length > 0 ? <Pie color={customColors} {...config} /> : null}
    </div>
  );
};

export default SourceChart;

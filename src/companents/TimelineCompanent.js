import React, { useEffect, useState } from 'react';
import { Timeline, Badge, Tooltip } from 'antd';
import { fetchBudgetData } from './api';
import moment from 'moment';
import '.././styles/styles.css';
import 'antd/dist/reset.css';

function TimelineComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchBudgetData();
        const sortedData = rawData.sort((a, b) => new Date(a.date) - new Date(b.date));
        let netBalance = 0;
        const formattedData = sortedData.map(item => {
          if (item.type === 'Gelir') {
            netBalance += Number(item.price);
          } else {
            netBalance -= Number(item.price);
          }

          return {
            date: moment(item.date).format('YYYY-MM-DD'),
            netBalance: netBalance,
            type: item.type,
            price: item.price,
            names: item.names,
            description: `${item.type === 'Gelir' ? 'Gelir' : 'Gider'}:${item.price} TL, ${item.names} , Net Bakiye: ${netBalance} TL`,
          };
        });

        setData(formattedData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    fetchData();
  }, []);

  const items = data.map(item => ({
    label: item.date,
    children: item.description,
  }));

  return (
    <div className="container">
      <h2 className="timeline-title">Gelir ve Gider Zaman Çizelgesi</h2>
      <div className="timeline-container">
        <Timeline
          className="custom-timeline"
          mode="left"
          items={items}
          style={{ marginTop: '10px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}
        />
      </div>

      
    </div>
  );
}

export default TimelineComponent;

import { useEffect, useState } from 'react';

import Api from '@/api';
import { Status } from '@/api/dto/reservation';
import { ResponsivePie } from '@nivo/pie';
import { isBefore, parse } from 'date-fns';

export default function AdminNoShowChartModal() {
  const [data, setData] = useState([
    { id: '인증', label: '인증', value: 0, color: '#6366F1' },
    { id: '미인증', label: '미인증', value: 0, color: '#F87171' },
  ]);

  useEffect(() => {
    (async () => {
      const { userReservations } = await Api.Domain.ReservationAdmin.getUserReservationsList();

      const reservations = userReservations
        .filter((reservation) => reservation.status === Status.APPROVED)
        .filter(
          (reservation) =>
            !isBefore(
              new Date(),
              parse(
                reservation.endTime,
                'HH:mm',
                parse(reservation.date, 'yyyy-MM-dd', new Date()),
              ),
            ),
        );

      setData([
        {
          id: '인증',
          label: '인증',
          value: reservations.filter((r) => r.ocrVerified).length,
          color: '#6366F1',
        },
        {
          id: '미인증',
          label: '미인증',
          value: reservations.filter((r) => !r.ocrVerified).length,
          color: '#F87171',
        },
      ]);
    })();
  }, []);

  return (
    <div className="font-pretendard flex w-[350px] flex-col items-center rounded-2xl bg-white p-6">
      <h2 className="text-primary-gray-600 text-xl font-bold">노쇼 비율</h2>
      <div className="h-[300px] w-full">
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          innerRadius={0.5}
          padAngle={2}
          cornerRadius={8}
          activeOuterRadiusOffset={10}
          colors={(d) => d.data.color}
          borderWidth={2}
          borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#444"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor="#fff"
          theme={{
            labels: { text: { fontFamily: 'Pretendard', fontWeight: 600, fontSize: 14 } },
          }}
          tooltip={({ datum }) => (
            <div className="border-primary-gray-400 text-primary-gray-600 flex w-max justify-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-semibold">
              <span>{datum.label}</span>
              <span>{datum.value}회</span>
            </div>
          )}
        />
      </div>
    </div>
  );
}

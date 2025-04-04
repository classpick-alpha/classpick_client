import SideBarFilterItem from '@/components/side-bar/filter/item/index';

import { useRoomFilterStore } from '@/store/room-filter.store';

const MOCK_DATA = [
  {
    room_id: 1,
    place_name: '미래관',
    unit_number: 424,
    capacity: 40,
    room_name: null,
  },
  {
    room_id: 2,
    place_name: '미래관',
    unit_number: 445,
    capacity: 40,
    room_name: null,
  },
  {
    room_id: 3,
    place_name: '미래관',
    unit_number: 446,
    capacity: 40,
    room_name: null,
  },
  {
    room_id: 4,
    place_name: '미래관',
    unit_number: 447,
    capacity: 40,
    room_name: null,
  },
  {
    room_id: 5,
    place_name: '미래관',
    unit_number: 449,
    capacity: 40,
    room_name: '자율주행스튜디오',
  },
];

export default function SideBarFilterRoomItem() {
  const { room, setRoom } = useRoomFilterStore();

  return (
    <SideBarFilterItem
      name="room"
      title="강의실 목록"
      value={room}
      labelFormatter={(room_id) => {
        const room = MOCK_DATA.find((x) => x.room_id === room_id);

        if (!room) return '';

        return `${room.place_name} ${room.unit_number}`;
      }}
      placeholder="예약할 강의실을 선택해주세요"
    >
      <div className="flex max-h-[140px] flex-col overflow-y-auto pl-3">
        {MOCK_DATA.map((room) => (
          <p
            key={room.room_id}
            className="cursor-pointer py-2 text-sm text-zinc-600 hover:text-zinc-900"
            onClick={() => setRoom(room.room_id)}
          >
            {room.place_name} {room.unit_number}
          </p>
        ))}
      </div>
    </SideBarFilterItem>
  );
}

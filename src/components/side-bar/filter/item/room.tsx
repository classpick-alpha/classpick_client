import { useEffect, useMemo } from 'react';

import SideBarFilterItem from '@/components/side-bar/filter/item/index';

import { useRoomFilterStore } from '@/store/room-filter.store';

export interface RoomData {
  room_id: number;
  place_name: string;
  unit_number: number;
  capacity: number;
  room_name: string | null;
}

const MOCK_DATA: RoomData[] = [
  {
    room_id: 1,
    place_name: '미래관',
    unit_number: 424,
    capacity: 5,
    room_name: null,
  },
  {
    room_id: 2,
    place_name: '미래관',
    unit_number: 445,
    capacity: 6,
    room_name: null,
  },
  {
    room_id: 3,
    place_name: '미래관',
    unit_number: 446,
    capacity: 7,
    room_name: null,
  },
  {
    room_id: 4,
    place_name: '미래관',
    unit_number: 447,
    capacity: 8,
    room_name: null,
  },
  {
    room_id: 5,
    place_name: '미래관',
    unit_number: 449,
    capacity: 9,
    room_name: '자율주행스튜디오',
  },
];

export default function SideBarFilterRoomItem() {
  const { building, people, room, setRoom } = useRoomFilterStore();

  const availableRooms = useMemo(
    () => MOCK_DATA.filter((room) => room.capacity >= people! && room.place_name === building),
    [building, people],
  );

  useEffect(() => {
    if (availableRooms.length === 0) {
      setRoom(undefined);
      return;
    }

    if (room && !availableRooms.find((r) => r.room_id === room.room_id)) {
      setRoom(availableRooms[0]);
    }

    if (room) return;

    setRoom(availableRooms[0]);
  }, [room, availableRooms]);

  return (
    <SideBarFilterItem
      name="room"
      title="강의실 목록"
      value={room}
      labelFormatter={(room) => `${room.place_name} ${room.unit_number}`}
      placeholder="예약할 강의실을 선택해주세요"
    >
      <div className="scrollbar-thumb-sidebar-filter-description flex max-h-[140px] flex-col overflow-y-auto pl-3">
        {availableRooms.map((room) => (
          <p
            key={room.room_id}
            className="cursor-pointer py-2 text-sm text-zinc-600 hover:text-zinc-900"
            onClick={() => setRoom(room)}
          >
            {room.place_name} {room.unit_number}
          </p>
        ))}
      </div>
    </SideBarFilterItem>
  );
}

import { LectureController } from '@/api/controller/lecture';
import { ReservationAdminController, ReservationController } from '@/api/controller/reservation';
import { RoomAdminController, RoomController, RoomExcelController } from '@/api/controller/room';
import { UserController } from '@/api/controller/user';
import ApiRequest from '@/api/request';

export default class Api {
  private static instance: Api | null = null;

  private readonly request = new ApiRequest();

  private readonly domain = {
    User: new UserController(this.request),
    Room: new RoomController(this.request),
    RoomAdmin: new RoomAdminController(this.request),
    Reservation: new ReservationController(this.request),
    ReservationAdmin: new ReservationAdminController(this.request),
    RoomExcelController: new RoomExcelController(this.request),
    Lecture: new LectureController(this.request),
  };

  private constructor() {
    Api.instance = this;
  }

  public static get Domain() {
    return Api.Instance.domain;
  }

  public static get Request(): ApiRequest {
    return Api.Instance.request;
  }

  private static get Instance(): Api {
    if (Api.instance === null) {
      Api.instance = new Api();
    }

    return Api.instance!;
  }
}

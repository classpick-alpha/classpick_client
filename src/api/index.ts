import Reservation from '@/api/controller/reservation';
import Room from '@/api/controller/room';
import User from '@/api/controller/user';
import ApiRequest from '@/api/request';

export default class Api {
  private static instance: Api | null = null;

  private readonly request = new ApiRequest();

  private readonly domain = {
    User: new User(this.request),
    Room: new Room(this.request),
    Reservation: new Reservation(this.request),
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

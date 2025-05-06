import ApiResponse from '@/api/dto/common';
import { UserResponse } from '@/api/dto/user';
import { useUserStore } from '@/store/user.store';
import { format } from 'date-fns';

export default class ApiRequest {
  private readonly baseUrl?: string;

  private token?: string;

  public constructor() {
    this.baseUrl =
      typeof window === 'undefined' ? process.env.NEXT_PUBLIC_API_URL : window.origin + '/api';
  }

  public async setToken(token: string) {
    this.token = token;

    localStorage.setItem('token', token);

    const response = await this.get<UserResponse>('/v0.0/users/me');

    if (!response) {
      this.removeToken();
    } else {
      useUserStore.getState().setUser(response);
    }
  }

  public removeToken() {
    this.token = undefined;

    localStorage.removeItem('token');

    useUserStore.getState().setUser(undefined);
  }

  // ================================================================================

  public async get<T>(url: string, options?: Record<string, unknown>): Promise<T> {
    return this.request(url, {
      method: 'GET',
      headers: this.generateHeader(),
      ...options,
    });
  }

  public async post<T>(url: string, body?: object | FormData): Promise<T> {
    return this.request(url, {
      method: 'POST',
      body: this.generateBody(body),
      headers: this.generateHeader(body),
    });
  }

  public async put<T>(url: string, body?: object | FormData): Promise<T> {
    return this.request(url, {
      method: 'PUT',
      body: this.generateBody(body),
      headers: this.generateHeader(body),
    });
  }

  public async patch<T>(url: string, body?: object | FormData): Promise<T> {
    return this.request(url, {
      method: 'PATCH',
      body: this.generateBody(body),
      headers: this.generateHeader(body),
    });
  }

  public async delete<T>(url: string, body?: object | FormData): Promise<T> {
    return this.request(url, {
      method: 'DELETE',
      body: this.generateBody(body),
      headers: this.generateHeader(body),
    });
  }

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const response: ApiResponse<T> = await (await fetch(this.baseUrl + url, options)).json();

    if (response.status !== 200) {
      throw new Error(response.message);
    }

    return response.data;
  }

  // ================================================================================

  private generateBody(body?: object | FormData): undefined | string | FormData {
    if (!body) {
      return undefined;
    }

    if (body instanceof FormData) {
      return body;
    }

    return JSON.stringify({
      timestamp: format(new Date(), 'yyyy-MM-dd HH:mm'),
      data: body,
    });
  }

  private generateHeader(body?: object | FormData): Headers {
    const headers = new Headers();

    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');

    if (this.token) {
      headers.set('Authorization', `Bearer ${this.token}`);
    }

    if (body && body instanceof FormData) {
      headers.delete('Content-Type');
    }

    return headers;
  }
}

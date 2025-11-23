/**
 * API Client untuk komunikasi dengan backend
 *
 * Usage:
 * import { api } from '@/lib/api';
 *
 * // GET request
 * const data = await api.get('/api/health');
 *
 * // POST request
 * const result = await api.post('/api/auth/login', { email, password });
 *
 * // With authentication
 * const profile = await api.get('/api/auth/profile', { token: 'jwt-token' });
 */

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface ApiError {
  status: string;
  message: string;
  statusCode?: number;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Add auth token if provided
    const token = localStorage.getItem("auth_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        const error: ApiError = {
          status: data.status || "error",
          message: data.message || "Request failed",
          statusCode: response.status,
        };
        throw error;
      }

      return data;
    } catch (error) {
      if (error instanceof TypeError) {
        // Network error
        throw {
          status: "error",
          message: "Network error. Please check your connection.",
          statusCode: 0,
        } as ApiError;
      }
      throw error;
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "GET",
    });
  }

  async post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "DELETE",
    });
  }

  // Helper untuk auth
  setToken(token: string) {
    localStorage.setItem("auth_token", token);
  }

  removeToken() {
    localStorage.removeItem("auth_token");
  }

  getToken(): string | null {
    return localStorage.getItem("auth_token");
  }
}

export const api = new ApiClient(API_URL);

// Auth API helpers
export const authApi = {
  async register(data: { name: string; email: string; password: string }) {
    const response = await api.post<{
      status: string;
      message: string;
      data: {
        user: { id: string; name: string; email: string; role?: string };
        token: string;
      };
    }>("/api/auth/register", data);

    if (response.data.token) {
      api.setToken(response.data.token);
    }

    return response;
  },

  async login(data: { email: string; password: string }) {
    const response = await api.post<{
      status: string;
      message: string;
      data: {
        user: { id: string; name: string; email: string; role?: string };
        token: string;
      };
    }>("/api/auth/login", data);

    if (response.data.token) {
      api.setToken(response.data.token);
    }

    return response;
  },

  async getProfile() {
    return api.get<{
      status: string;
      data: {
        user: {
          id: string;
          name: string;
          email: string;
          role?: string;
          createdAt: string;
        };
      };
    }>("/api/auth/profile");
  },

  logout() {
    api.removeToken();
  },
};

// Dashboard API helpers
export const dashboardApi = {
  async getCategories() {
    return api.get<{
      status: string;
      data: Array<{
        id: string;
        category_id: string;
        name: string;
        icon: string;
        color: string;
        bg_color: string;
      }>;
    }>("/api/dashboard/categories");
  },

  async getCategoryData(categoryId: string) {
    return api.get<{
      status: string;
      data: {
        category: {
          id: string;
          category_id: string;
          name: string;
          icon: string;
          color: string;
          bg_color: string;
        };
        items: Array<{
          id: string;
          label: string;
          value: string;
          trend: string | null;
          source_url: string | null;
          last_updated: string;
        }>;
      };
    }>(`/api/dashboard/categories/${categoryId}`);
  },
};

// Reports API helpers
export const reportsApi = {
  async createReport(data: { content: string; image_url?: string; category?: string }) {
    return api.post<{
      status: string;
      message: string;
      data: {
        id: string;
        user_id: string;
        content: string;
        image_url: string | null;
        status: string;
        category: string | null;
        created_at: string;
      };
    }>("/api/reports", data);
  },

  async getUserReports() {
    return api.get<{
      status: string;
      data: Array<{
        id: string;
        content: string;
        image_url: string | null;
        status: string;
        category: string | null;
        created_at: string;
        updated_at: string;
        verified_at: string | null;
      }>;
    }>("/api/reports");
  },

  async getReport(id: string) {
    return api.get<{
      status: string;
      data: {
        id: string;
        content: string;
        image_url: string | null;
        status: string;
        category: string | null;
        created_at: string;
        updated_at: string;
      };
    }>(`/api/reports/${id}`);
  },
};

// Education API helpers
export const educationApi = {
  async getModules() {
    return api.get<{
      status: string;
      data: Array<{
        id: string;
        title: string;
        description: string;
        difficulty: string;
        duration_minutes: number;
        lessons_count: number;
        badge_name: string;
        badge_icon: string;
        order_index: number;
      }>;
    }>("/api/education/modules");
  },

  async getModule(id: string) {
    return api.get<{
      status: string;
      data: {
        id: string;
        title: string;
        description: string;
        difficulty: string;
        duration_minutes: number;
        lessons_count: number;
        badge_name: string;
      };
    }>(`/api/education/modules/${id}`);
  },

  async getUserProgress() {
    return api.get<{
      status: string;
      data: Array<{
        id: string;
        progress_percentage: number;
        completed: boolean;
        completed_at: string | null;
        started_at: string;
        education_modules: {
          id: string;
          title: string;
          badge_name: string;
        };
      }>;
    }>("/api/education/progress");
  },

  async updateProgress(moduleId: string, data: { progress_percentage: number; completed?: boolean }) {
    return api.put<{
      status: string;
      message: string;
      data: {
        id: string;
        progress_percentage: number;
        completed: boolean;
      };
    }>(`/api/education/modules/${moduleId}/progress`, data);
  },

  async getUserAchievements() {
    return api.get<{
      status: string;
      data: Array<{
        id: string;
        earned_at: string;
        achievements: {
          id: string;
          name: string;
          icon: string;
        };
      }>;
    }>("/api/education/achievements");
  },
};

// Admin API helpers
export const adminApi = {
  async getAllReports(params?: { status?: string; page?: number; limit?: number }) {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append("status", params.status);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const query = queryParams.toString();
    return api.get<{
      status: string;
      data: Array<{
        id: string;
        content: string;
        status: string;
        category: string | null;
        created_at: string;
        users: {
          name: string;
          email: string;
        };
      }>;
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>(`/api/admin/reports${query ? `?${query}` : ""}`);
  },

  async updateReportStatus(id: string, data: { status: string; verification_notes?: string; category?: string }) {
    return api.put<{
      status: string;
      message: string;
      data: {
        id: string;
        status: string;
        verification_notes: string | null;
        verified_at: string;
      };
    }>(`/api/admin/reports/${id}/status`, data);
  },

  async getReportStats() {
    return api.get<{
      status: string;
      data: {
        total: number;
        pending: number;
        fact: number;
        hoax: number;
        unverified: number;
      };
    }>("/api/admin/reports/stats");
  },
};

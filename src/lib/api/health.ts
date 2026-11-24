import { apiFetch } from './client';

export interface HealthStatus {
  status: 'ok' | 'degraded' | 'down';
  environment: string;
  database: 'connected' | 'disconnected';
  postgis: string | null;
  timestamp: string;
  uptime: number;
}

export async function fetchHealth(): Promise<HealthStatus> {
  return apiFetch<HealthStatus>('/health');
}

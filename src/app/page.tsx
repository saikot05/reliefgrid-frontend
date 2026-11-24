'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchHealth, type HealthStatus } from '@/lib/api/health';

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: HealthStatus['status'] | undefined }) {
  if (!status) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DCE1E5] px-3 py-1 text-xs font-medium text-[#64748B]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#64748B]" />
        Checking…
      </span>
    );
  }

  const map = {
    ok: { bg: '#E8F5EE', text: '#398263', dot: '#398263', label: 'Operational' },
    degraded: { bg: '#FEF3DC', text: '#D49A37', dot: '#D49A37', label: 'Degraded' },
    down: { bg: '#FAEAE9', text: '#B9473E', dot: '#B9473E', label: 'Down' },
  } as const;

  const s = map[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
      style={{ background: s.bg, color: s.text }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: s.dot }}
      />
      {s.label}
    </span>
  );
}

// ── Metric row ────────────────────────────────────────────────────────────────
function MetricRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[#DCE1E5] last:border-0">
      <span className="text-sm text-[#64748B]">{label}</span>
      <span
        className={`text-sm font-medium text-[#263746] ${mono ? 'font-mono' : ''}`}
      >
        {value}
      </span>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
    refetchInterval: 30_000,
  });

  return (
    <main className="min-h-screen bg-[#F5F6F4]">
      {/* ── Top bar ── */}
      <header className="glass sticky top-0 z-10 border-b border-[#DCE1E5]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            {/* Grid icon */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#263746"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
            <span className="text-[15px] font-semibold tracking-tight text-[#263746]">
              ReliefGrid
            </span>
          </div>
          <span className="text-xs text-[#64748B]">Phase 1 — Foundation</span>
        </div>
      </header>

      {/* ── Content ── */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#263746]">
            System Status
          </h1>
          <p className="mt-1 text-sm text-[#64748B]">
            Live backend health and infrastructure verification.
          </p>
        </div>

        {/* Status card */}
        <div className="rounded-lg border border-[#DCE1E5] bg-white shadow-sm">
          {/* Card header */}
          <div className="flex items-center justify-between border-b border-[#DCE1E5] px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-[#263746]">
                API Health
              </span>
              <StatusBadge status={data?.status} />
            </div>
            <button
              onClick={() => void refetch()}
              className="rounded-md border border-[#DCE1E5] bg-white px-3 py-1.5 text-xs font-medium text-[#64748B] transition-colors hover:bg-[#F5F6F4] hover:text-[#263746]"
            >
              Refresh
            </button>
          </div>

          {/* Card body */}
          <div className="px-5 py-1">
            {isLoading && (
              <p className="py-6 text-center text-sm text-[#64748B]">
                Connecting to backend…
              </p>
            )}

            {isError && (
              <div className="my-4 rounded-md border border-[#FAEAE9] bg-[#FAEAE9] px-4 py-3">
                <p className="text-sm font-medium text-[#B9473E]">
                  Could not reach backend
                </p>
                <p className="mt-0.5 text-xs text-[#B9473E]">
                  {error instanceof Error ? error.message : 'Unknown error'}
                </p>
              </div>
            )}

            {data && (
              <>
                <MetricRow label="Environment" value={data.environment} />
                <MetricRow
                  label="Database"
                  value={
                    <span
                      style={{
                        color:
                          data.database === 'connected' ? '#398263' : '#B9473E',
                      }}
                    >
                      {data.database}
                    </span>
                  }
                />
                <MetricRow
                  label="PostGIS"
                  value={data.postgis ?? '—'}
                  mono={!!data.postgis}
                />
                <MetricRow
                  label="Uptime"
                  value={`${data.uptime}s`}
                  mono
                />
                <MetricRow
                  label="Checked at"
                  value={new Date(data.timestamp).toLocaleTimeString()}
                />
              </>
            )}
          </div>
        </div>

        {/* Infrastructure grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              label: 'Next.js',
              value: '16',
              sub: 'App Router + Turbopack',
            },
            {
              label: 'NestJS',
              value: '12',
              sub: 'TypeScript 6 · CJS',
            },
            {
              label: 'Database',
              value: 'PostgreSQL 18',
              sub: 'PostGIS extension',
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-[#DCE1E5] bg-white px-4 py-4"
            >
              <p className="text-xs text-[#64748B]">{item.label}</p>
              <p className="mt-1 text-lg font-semibold text-[#263746]">
                {item.value}
              </p>
              <p className="mt-0.5 text-xs text-[#64748B]">{item.sub}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-[#64748B]">
          ReliefGrid — Disaster Response Coordination Platform · Phase 1
        </p>
      </div>
    </main>
  );
}

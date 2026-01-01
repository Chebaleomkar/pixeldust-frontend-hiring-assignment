'use client';

import React, { useEffect, useCallback, useMemo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { RefreshCw, Sun, Moon, AlertCircle, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useShiftStore } from '@/stores/shiftStore';
import { TabType } from '@/types/shift';
import { TAB_LABELS } from '@/utils/constants';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const MyShiftsView = dynamic(
  () => import('@/components/views/MyShiftsView').then(mod => ({ default: mod.MyShiftsView })),
  {
    loading: () => <ViewSkeleton />,
    ssr: true
  }
);

const AvailableShiftsView = dynamic(
  () => import('@/components/views/AvailableShiftsView').then(mod => ({ default: mod.AvailableShiftsView })),
  {
    loading: () => <ViewSkeleton />,
    ssr: true
  }
);

function ViewSkeleton() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-10 w-full rounded-xl" />
      <Skeleton className="h-16 w-full rounded-xl" />
      <Skeleton className="h-16 w-full rounded-xl" />
    </div>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" aria-hidden="true" />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  );
}

export default function HomePage() {
  const {
    shifts,
    activeTab,
    selectedArea,
    isLoading,
    error,
    shiftLoadingStates,
    fetchShifts,
    refreshShifts,
    bookShift,
    cancelShift,
    setActiveTab,
    setSelectedArea,
    clearError
  } = useShiftStore();

  useEffect(() => {
    fetchShifts();
  }, [fetchShifts]);

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value as TabType);
  }, [setActiveTab]);

  const handleBook = useCallback(async (shiftId: string) => {
    await bookShift(shiftId);
  }, [bookShift]);

  const handleCancel = useCallback(async (shiftId: string) => {
    await cancelShift(shiftId);
  }, [cancelShift]);

  const bookedShiftsCount = useMemo(() => shifts.filter(s => s.booked).length, [shifts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect width="16" height="16" rx="2" fill="currentColor" className="text-white/20" />
                  <path d="M4 4h4v4H4z" fill="white" />
                  <path d="M8 8h4v4H8z" fill="white/80" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Shift Booking App
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                  by Pixeldust
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                aria-label="Refresh shifts"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                onClick={refreshShifts}
                disabled={isLoading}
              >
                <RefreshCw className={cn("w-5 h-5", isLoading && "animate-spin")} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {error && (
        <div className="bg-rose-50 dark:bg-rose-950/50 border-b border-rose-200 dark:border-rose-800" role="alert">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium">{error}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={clearError}
                aria-label="Dismiss error"
                className="h-7 w-7 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900/30 rounded-md flex-shrink-0"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-slate-100 dark:bg-slate-800 rounded-full p-1" aria-label="Shift views">
              <TabsTrigger
                value="my-shifts"
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-semibold transition-all",
                  "data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm",
                  "data-[state=active]:text-slate-900 dark:data-[state=active]:text-white",
                  "data-[state=inactive]:text-slate-500 dark:data-[state=inactive]:text-slate-400",
                  "data-[state=inactive]:hover:text-slate-700 dark:data-[state=inactive]:hover:text-slate-300"
                )}
              >
                <span className="flex items-center gap-2">
                  {TAB_LABELS['my-shifts']}
                  {bookedShiftsCount > 0 && (
                    <span
                      className={cn(
                        "min-w-[20px] h-5 flex items-center justify-center px-1.5 rounded-full text-xs font-bold",
                        activeTab === 'my-shifts'
                          ? "bg-emerald-500 text-white"
                          : "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300"
                      )}
                    >
                      {bookedShiftsCount}
                    </span>
                  )}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="available-shifts"
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-semibold transition-all",
                  "data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm",
                  "data-[state=active]:text-slate-900 dark:data-[state=active]:text-white",
                  "data-[state=inactive]:text-slate-500 dark:data-[state=inactive]:text-slate-400",
                  "data-[state=inactive]:hover:text-slate-700 dark:data-[state=inactive]:hover:text-slate-300"
                )}
              >
                {TAB_LABELS['available-shifts']}
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <TabsContent value="my-shifts" className="mt-0">
              <MyShiftsView
                shifts={shifts}
                loadingStates={shiftLoadingStates}
                onCancel={handleCancel}
                isLoading={isLoading}
              />
            </TabsContent>

            <TabsContent value="available-shifts" className="mt-0">
              <AvailableShiftsView
                shifts={shifts}
                selectedCity={selectedArea}
                onCityChange={setSelectedArea}
                loadingStates={shiftLoadingStates}
                onBook={handleBook}
                onCancel={handleCancel}
                isLoading={isLoading}
              />
            </TabsContent>
          </div>
        </Tabs>
      </main>

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        <p className="text-sm text-slate-400 dark:text-slate-500">
          <a
            href="https://www.google.com/search?q=Omkar+Chebale"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            Made with ❤️ by <span className="text-blue-500">Omkar Chebale</span> for Pixeldust
          </a>
        </p>
      </footer>
    </div>
  );
}

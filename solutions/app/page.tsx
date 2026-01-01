/**
 * Shift Booking App - Modern Wide Layout
 */

'use client';

import React, { useEffect, useCallback } from 'react';
import { Calendar, RefreshCw, Sun, Moon, AlertCircle, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useShiftStore } from '@/stores/shiftStore';
import { TabType } from '@/types/shift';
import { TAB_LABELS } from '@/utils/constants';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MyShiftsView } from '@/components/views/MyShiftsView';
import { AvailableShiftsView } from '@/components/views/AvailableShiftsView';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const { shifts, activeTab, selectedArea, isLoading, error, shiftLoadingStates, fetchShifts, refreshShifts, bookShift, cancelShift, setActiveTab, setSelectedArea, clearError } = useShiftStore();

  useEffect(() => {
    setMounted(true);
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

  const bookedShiftsCount = shifts.filter(s => s.booked).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header - Full Width */}
      <header className="bg-gradient-to-r from-emerald-500 to-teal-500 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">Shifts</h1>
                <p className="text-xs text-white/70 hidden sm:block">Manage your schedule</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg"
                onClick={() => refreshShifts()}
                disabled={isLoading}
              >
                <RefreshCw className={cn("w-5 h-5", isLoading && "animate-spin")} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Error Banner */}
      {error && (
        <div className="bg-rose-50 dark:bg-rose-950/50 border-b border-rose-200 dark:border-rose-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">{error}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={clearError}
                className="h-7 w-7 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900/30 rounded-md"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          {/* Tab Navigation */}
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-700">
              <TabsTrigger
                value="my-shifts"
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  "data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-sm",
                  "data-[state=inactive]:text-slate-600 dark:data-[state=inactive]:text-slate-400",
                  "data-[state=inactive]:hover:text-slate-900 dark:data-[state=inactive]:hover:text-slate-200"
                )}
              >
                <span className="flex items-center gap-2">
                  {TAB_LABELS['my-shifts']}
                  {bookedShiftsCount > 0 && (
                    <Badge className={cn(
                      "text-xs px-1.5 py-0 rounded-md",
                      activeTab === 'my-shifts'
                        ? "bg-white/20 text-white"
                        : "bg-emerald-500 text-white"
                    )}>
                      {bookedShiftsCount}
                    </Badge>
                  )}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="available-shifts"
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  "data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-sm",
                  "data-[state=inactive]:text-slate-600 dark:data-[state=inactive]:text-slate-400",
                  "data-[state=inactive]:hover:text-slate-900 dark:data-[state=inactive]:hover:text-slate-200"
                )}
              >
                {TAB_LABELS['available-shifts']}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Content */}
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
    </div>
  );
}

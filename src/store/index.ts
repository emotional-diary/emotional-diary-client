'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useUserStore = create(
  persist<{
    user: User;
    setUser: (user: User) => void;
  }>(
    set => ({
      user: {} as User,
      setUser: (user: User) => set({ user }),
    }),
    {
      name: 'user-profile',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useCalendarStore = create<{
  calendar: Calendar;
  setCalendar: (calendar: Calendar) => void;
}>(set => ({
  calendar: { selectedDate: new Date() } as Calendar,
  setCalendar: (calendar: Calendar) => set({ calendar }),
}));

export const useDiaryStore = create<{
  diary: Diary;
  setDiary: (diary: Diary) => void;
  resetDiary: () => void;
}>(set => ({
  diary: {} as Diary,
  setDiary: (diary: Diary) => set({ diary }),
  resetDiary: () => set({ diary: {} as Diary }),
}));

export const useDiaryListStore = (userID: number) =>
  create(
    persist<{
      diaryList: Diary[];
      setDiaryList: (diaryList: Diary[]) => void;
      updateDiaryList: (updater: (prev: Diary[]) => Diary[]) => void;
    }>(
      set => ({
        diaryList: [] as Diary[],
        setDiaryList: (diaryList: Diary[]) => set({ diaryList }),
        updateDiaryList: updater =>
          set(state => ({ diaryList: updater(state.diaryList) })),
      }),
      {
        name: `diary-list-${userID}`,
        storage: userID ? createJSONStorage(() => localStorage) : undefined,
      }
    )
  );

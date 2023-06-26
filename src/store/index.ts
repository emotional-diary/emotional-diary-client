import { create } from 'zustand';

// type State = {
//   count: number;
//   inc: () => void;
//   dec: () => void;
// };

export const useUserStore = create<{
  user: User;
  setUser: (user: User) => void;
}>(set => ({
  user: {} as User,
  setUser: (user: User) => set({ user }),
}));

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
  diaryList: Diary[];
  setDiaryList: (diaryList: Diary[]) => void;
}>(set => ({
  diary: {} as Diary,
  setDiary: (diary: Diary) => set({ diary }),
  diaryList: [] as Diary[],
  setDiaryList: (diaryList: Diary[]) => set({ diaryList }),
}));

// const useStore = create<State>(set => ({
//   count: 0,
//   inc: () => set(state => ({ count: state.count + 1 })),
//   dec: () => set(state => ({ count: state.count - 1 })),
// }));

// export const useCount = () => useStore(state => state.count);
// export const useInc = () => useStore(state => state.inc);
// export const useDec = () => useStore(state => state.dec);

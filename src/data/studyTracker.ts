import {
  BookmarkRecord,
  ExamHistoryRecord,
  ProfessionalExamId,
  RecentlyViewedRecord,
  StudyState,
  WrongAnswerRecord
} from '../types';

const STUDY_STORAGE_KEY = 'cmc_study_state_v1';

export const EMPTY_STUDY_STATE: StudyState = {
  bookmarks: [],
  recentlyViewed: [],
  wrongAnswers: [],
  examHistory: [],
  practicedIds: {}
};

export function loadLocalStudyState(): StudyState {
  try {
    const raw = localStorage.getItem(STUDY_STORAGE_KEY);
    if (!raw) return EMPTY_STUDY_STATE;
    const parsed = JSON.parse(raw);
    return {
      bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
      recentlyViewed: Array.isArray(parsed.recentlyViewed) ? parsed.recentlyViewed : [],
      wrongAnswers: Array.isArray(parsed.wrongAnswers) ? parsed.wrongAnswers : [],
      examHistory: Array.isArray(parsed.examHistory) ? parsed.examHistory : [],
      practicedIds:
        parsed.practicedIds && typeof parsed.practicedIds === 'object' ? parsed.practicedIds : {}
    };
  } catch {
    return EMPTY_STUDY_STATE;
  }
}

export function saveLocalStudyState(state: StudyState): void {
  try {
    localStorage.setItem(STUDY_STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export function mergeStudyStates(local: StudyState, remote?: Partial<StudyState> | null): StudyState {
  if (!remote) return local;

  const mergeByKey = <T extends { id: string }>(a: T[], b: T[], limit: number): T[] => {
    const map = new Map<string, T>();
    [...b, ...a].forEach(item => {
      if (item && item.id) map.set(item.id, item);
    });
    return Array.from(map.values()).slice(0, limit);
  };

  return {
    bookmarks: mergeByKey(
      local.bookmarks,
      Array.isArray(remote.bookmarks) ? remote.bookmarks : [],
      150
    ),
    recentlyViewed: mergeByKey(
      local.recentlyViewed,
      Array.isArray(remote.recentlyViewed) ? remote.recentlyViewed : [],
      80
    ),
    wrongAnswers: mergeByKey(
      local.wrongAnswers,
      Array.isArray(remote.wrongAnswers) ? remote.wrongAnswers : [],
      200
    ),
    examHistory: mergeByKey(
      local.examHistory,
      Array.isArray(remote.examHistory) ? remote.examHistory : [],
      100
    ),
    practicedIds: {
      ...(remote.practicedIds || {}),
      ...local.practicedIds
    }
  };
}

export function toggleBookmarkInState(
  prev: StudyState,
  item: Omit<BookmarkRecord, 'savedAt'>
): StudyState {
  const exists = prev.bookmarks.some(b => b.id === item.id && b.itemType === item.itemType);
  const nextBookmarks = exists
    ? prev.bookmarks.filter(b => !(b.id === item.id && b.itemType === item.itemType))
    : [{ ...item, savedAt: new Date().toISOString() }, ...prev.bookmarks].slice(0, 150);
  return { ...prev, bookmarks: nextBookmarks };
}

export function recordRecentlyViewedInState(
  prev: StudyState,
  item: Omit<RecentlyViewedRecord, 'viewedAt'>
): StudyState {
  const filtered = prev.recentlyViewed.filter(
    r => !(r.id === item.id && r.itemType === item.itemType)
  );
  const nextRecent = [{ ...item, viewedAt: new Date().toISOString() }, ...filtered].slice(0, 80);
  return { ...prev, recentlyViewed: nextRecent };
}

export function recordPracticeOutcomeInState(
  prev: StudyState,
  payload: {
    id: string;
    professionalExam: ProfessionalExamId;
    subject: string;
    paper: string;
    chapter: string;
    type: 'SBA' | 'TF';
    stem: string;
    explanation?: string;
    isCorrect: boolean;
  }
): StudyState {
  const nextPracticed = {
    ...prev.practicedIds,
    [payload.id]: {
      professionalExam: payload.professionalExam,
      subject: payload.subject,
      correct: payload.isCorrect
    }
  };

  let nextWrong = [...prev.wrongAnswers];
  const existingIdx = nextWrong.findIndex(w => w.id === payload.id);

  if (payload.isCorrect) {
    if (existingIdx >= 0) {
      nextWrong.splice(existingIdx, 1);
    }
  } else {
    const updated: WrongAnswerRecord = {
      id: payload.id,
      professionalExam: payload.professionalExam,
      subject: payload.subject,
      paper: payload.paper,
      chapter: payload.chapter,
      type: payload.type,
      stem: payload.stem,
      explanation: payload.explanation,
      attempts: existingIdx >= 0 ? nextWrong[existingIdx].attempts + 1 : 1,
      lastWrongAt: new Date().toISOString()
    };
    if (existingIdx >= 0) nextWrong.splice(existingIdx, 1);
    nextWrong = [updated, ...nextWrong].slice(0, 200);
  }

  return {
    ...prev,
    practicedIds: nextPracticed,
    wrongAnswers: nextWrong
  };
}

export function recordExamResultInState(
  prev: StudyState,
  exam: Omit<ExamHistoryRecord, 'id' | 'completedAt'>
): StudyState {
  const rec: ExamHistoryRecord = {
    ...exam,
    id: `exam_${Date.now()}`,
    completedAt: new Date().toISOString()
  };
  return {
    ...prev,
    examHistory: [rec, ...prev.examHistory].slice(0, 100)
  };
}

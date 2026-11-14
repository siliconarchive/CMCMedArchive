import React from 'react';
import { Megaphone, FileUp, Eye, Check } from 'lucide-react';
import { AnnouncementRecord, PageRoute } from '../types';

interface NoticesPageProps {
  announcement: AnnouncementRecord;
  allNotices: AnnouncementRecord[];
  onReopenPopup: () => void;
  onNavigate: (page: PageRoute) => void;
}

export const NoticesPage: React.FC<NoticesPageProps> = ({
  announcement,
  allNotices,
  onReopenPopup,
  onNavigate
}) => {
  const noticesList = allNotices.length > 0 ? allNotices : [announcement];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-[#0D9488]">
            Campus &amp; Archive Updates
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)] m-0">
            Notices &amp; Announcements
          </h1>
          <p className="text-sm text-[var(--mut)] m-0">
            Active academic campaigns, question collection drives, and platform notices.
          </p>
        </div>

        <button
          type="button"
          onClick={onReopenPopup}
          className="btn alt shrink-0 min-h-[44px] w-full sm:w-auto"
        >
          <Eye size={16} />
          <span>View Campaign Popup</span>
        </button>
      </div>

      {/* Notices Feed */}
      <div className="space-y-5">
        {noticesList.map(notice => {
          const targetPage = (notice.ctaTarget as PageRoute) || 'submit';
          return (
            <article
              key={notice.id}
              className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-5 sm:p-7 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 font-extrabold text-[#0D9488] uppercase tracking-wide">
                  <Megaphone size={14} />
                  <span>{notice.badgeText}</span>
                </span>
                <span className="text-[var(--mut)]">
                  Updated {new Date(notice.updatedAt).toLocaleDateString()}
                </span>
              </div>

              <div className="space-y-1">
                <h2 className="text-lg sm:text-2xl font-extrabold text-[var(--ink)] m-0 leading-snug">
                  {notice.title}
                </h2>
                {notice.subtitle && (
                  <p className="text-sm sm:text-base font-bold text-[#0F2942] dark:text-teal-300 m-0">
                    {notice.subtitle}
                  </p>
                )}
              </div>

              <div className="space-y-2.5 text-sm text-[var(--ink-secondary)] leading-relaxed">
                {notice.bodyParagraphs.map((p, idx) => (
                  <p key={idx} className="m-0">
                    {p}
                  </p>
                ))}
                {notice.bulletItems && notice.bulletItems.length > 0 && (
                  <ul className="space-y-1.5 pl-0 list-none m-0 pt-1">
                    {notice.bulletItems.map((b, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm font-medium text-[var(--ink)]">
                        <Check size={14} className="text-[#0D9488] shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {notice.highlightText && (
                <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--line)] text-xs sm:text-sm font-extrabold text-[var(--ink)]">
                  {notice.highlightText}
                </div>
              )}

              <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => onNavigate(targetPage)}
                  className="btn min-h-[44px] w-full sm:w-auto"
                >
                  <FileUp size={15} />
                  <span>{notice.ctaText}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('contributors')}
                  className="btn alt min-h-[44px] w-full sm:w-auto"
                >
                  <span>View Contributors</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

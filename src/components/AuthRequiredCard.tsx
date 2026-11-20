import React from 'react';
import { Lock, LogIn, UserPlus } from 'lucide-react';

interface AuthRequiredCardProps {
  title?: string;
  description?: string;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

export const AuthRequiredCard: React.FC<AuthRequiredCardProps> = ({
  title = 'Account Required to View Uploaded Content',
  description = 'Please sign in or create a free student account to view uploaded Question Papers, Study Notes, and Viva questions.',
  onOpenAuth
}) => {
  return (
    <div className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-6 sm:p-8 text-center max-w-xl mx-auto space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-[#0D9488]/10 border border-[#0D9488]/25 text-[#0D9488] flex items-center justify-center mx-auto">
        <Lock size={22} />
      </div>
      <div className="space-y-1.5">
        <h2 className="text-lg sm:text-xl font-extrabold text-[var(--ink)] m-0">{title}</h2>
        <p className="text-xs sm:text-sm text-[var(--mut)] m-0 leading-relaxed">{description}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
        <button
          type="button"
          onClick={() => onOpenAuth('signin')}
          className="btn min-h-[44px] !px-5"
        >
          <LogIn size={15} />
          <span>Sign In</span>
        </button>
        <button
          type="button"
          onClick={() => onOpenAuth('signup')}
          className="btn alt min-h-[44px] !px-5"
        >
          <UserPlus size={15} />
          <span>Sign Up / Create Account</span>
        </button>
      </div>
    </div>
  );
};

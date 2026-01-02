import type { ReactNode } from 'react';

export const Card = ({ children, className = '' }: { children: ReactNode, className?: string }) => (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 ${className}`}>
        {children}
    </div>
);

export const CardHeader = ({ title, subtitle, icon: Icon, action }: { title: string, subtitle?: string, icon?: any, action?: ReactNode }) => (
    <div className="px-6 py-5 border-b border-slate-50 flex justify-between items-center">
        <div className="flex items-center gap-3">
            {Icon && (
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Icon size={20} />
                </div>
            )}
            <div>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">{title}</h3>
                {subtitle && <p className="text-[10px] font-semibold text-slate-400 uppercase">{subtitle}</p>}
            </div>
        </div>
        {action && <div>{action}</div>}
    </div>
);

export const CardContent = ({ children, className = '' }: { children: ReactNode, className?: string }) => (
    <div className={`p-6 ${className}`}>
        {children}
    </div>
);

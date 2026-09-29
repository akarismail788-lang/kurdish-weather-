/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCw, Trash2, ChevronDown, CheckCircle2 } from 'lucide-react';
import { secureClearAll } from '../services/secureStorage';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    showDetails: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
      showDetails: false,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[Zero-Crash Error Boundary Caught]', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleSoftRetry = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleHardReset = (): void => {
    try {
      secureClearAll();
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-kurdish antialiased dir-rtl select-none">
          <div className="w-full max-w-md bg-slate-900/90 border border-cyan-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl text-center space-y-4 relative overflow-hidden">
            {/* Ambient Background Aura */}
            <div className="absolute -top-20 inset-x-0 h-40 bg-gradient-to-b from-cyan-500/20 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-44 h-44 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Emblem */}
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/20 mb-2">
                <ShieldAlert size={32} className="text-cyan-400 animate-pulse" />
              </div>

              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 mb-2">
                سیستەمی پاراستنی جێگیری (Zero-Crash Guard)
              </span>

              <h2 className="text-lg font-bold text-white leading-tight">
                ئەپڵیکەیشن بە سەرکەوتوویی لە لەکارکەوتن پارێزرا
              </h2>

              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                هەڵەیەکی نەبینراو ڕوویدا، بەڵام بەهۆی تەلارسازی پارێزراوی ئەپەکەوە زانیارییەکانت سەلامەتن. تکایە یەکێک لە ڕێگاکانی خوارەوە هەڵبژێرە:
              </p>

              {/* Action Buttons */}
              <div className="w-full space-y-2 mt-4">
                <button
                  onClick={this.handleSoftRetry}
                  className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 transition-all cursor-pointer active:scale-95"
                >
                  <RefreshCw size={15} />
                  <span>دووبارە دەستپێکردنەوە بەبێ سڕینەوەی داتا</span>
                </button>

                <button
                  onClick={this.handleHardReset}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-rose-500/20 text-slate-300 hover:text-rose-200 border border-white/15 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                >
                  <Trash2 size={14} />
                  <span>پاککردنەوەی هەڵگری ئەنکریپتکراو و بوژاندنەوە</span>
                </button>
              </div>

              {/* Collapsible Error Log */}
              <div className="w-full mt-3 pt-3 border-t border-white/10 text-right">
                <button
                  onClick={() => this.setState({ showDetails: !this.state.showDetails })}
                  className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center justify-between w-full cursor-pointer py-1"
                >
                  <span>وردەکاری تەکنیکی هەڵەکە (Technical Diagnostics)</span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform ${this.state.showDetails ? 'rotate-180' : ''}`}
                  />
                </button>

                {this.state.showDetails && (
                  <div className="mt-2 p-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-left font-mono text-[10px] text-rose-300 max-h-36 overflow-y-auto no-scrollbar dir-ltr">
                    <p className="font-bold">{this.state.error?.name}: {this.state.error?.message}</p>
                    {this.state.error?.stack && (
                      <pre className="text-slate-400 mt-1 whitespace-pre-wrap text-[9px]">
                        {this.state.error.stack.slice(0, 500)}
                      </pre>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="mt-4 text-[11px] text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-[#C0C0C0]" />
                <span>كەشوهەوای کوردی · پەرەپێدراو لەلایەن <strong className="bg-gradient-to-r from-[#E2E8F0] via-[#FFFFFF] to-[#94A3B8] bg-clip-text text-transparent font-black tracking-wide drop-shadow-[0_1px_3px_rgba(192,192,192,0.4)]">ئاکار ئیسماعیل (Akar Ismail)</strong></span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

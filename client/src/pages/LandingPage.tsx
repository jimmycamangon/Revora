import { useEffect, useState } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────
interface DashBikeCardProps { name: string; sub: string; odo: string; kml: string }
interface StatCardProps { label: string; value: string; valueColor: string; sub?: string }
interface Bar { h: string; bg: string }
interface ChartBarsProps { bars: Bar[]; labels: string[] }
interface ActivityRowProps { icon: string; iconBg: string; iconColor: string; name: string; sub: string; time: string }

// ── Sub-components ─────────────────────────────────────────────────────────
function DashBikeCard({ name, sub, odo, kml }: DashBikeCardProps) {
    return (
        <div className="relative bg-zinc-900 border border-white/10 rounded-2xl p-4 mb-3 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-orange-500 to-orange-400" />
            <div className="text-[9px] font-bold tracking-widest text-orange-500 mb-1.5 font-sans">ACTIVE RIDE</div>
            <div className="text-lg font-bold text-white mb-0.5">{name}</div>
            <div className="text-[11px] text-zinc-500">{sub}</div>
            <div className="mt-2.5">
                <div className="text-[9px] uppercase tracking-wider text-zinc-600 mb-0.5">Odometer</div>
                <div className="text-2xl font-extrabold text-white">{odo}</div>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3.5 py-2.5 text-center">
                <div className="text-xl font-extrabold text-emerald-400">{kml}</div>
                <div className="text-[9px] text-emerald-500/60 mt-0.5">km/L avg</div>
            </div>
        </div>
    )
}

function StatCard({ label, value, valueColor, sub }: StatCardProps) {
    return (
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-3">
            <div className="text-[9px] uppercase tracking-wider text-zinc-600 mb-1">{label}</div>
            <div className={`text-base font-extrabold ${valueColor}`}>{value}</div>
            {sub && <div className="text-[9px] text-zinc-600 mt-0.5">{sub}</div>}
        </div>
    )
}

function ChartBars({ bars, labels }: ChartBarsProps) {
    return (
        <>
            <div className="flex items-end gap-1.5 h-14">
                {bars.map((b, i) => (
                    <div key={i} className="flex-1 rounded-t-sm" style={{ height: b.h, background: b.bg }} />
                ))}
            </div>
            <div className="flex gap-1.5 mt-1.5">
                {labels.map((l) => (
                    <div key={l} className="flex-1 text-[8px] text-zinc-600 text-center">{l}</div>
                ))}
            </div>
        </>
    )
}

function ActivityRow({ icon, iconBg, iconColor, name, sub, time }: ActivityRowProps) {
    return (
        <div className="flex items-center gap-2.5 py-1.5 border-b border-white/5 last:border-0 last:pb-0">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0"
                style={{ background: iconBg, color: iconColor }}>{icon}</div>
            <div className="flex-1">
                <div className="text-[11px] font-medium text-white">{name}</div>
                <div className="text-[9px] text-zinc-600">{sub}</div>
            </div>
            <div className="text-[9px] text-zinc-600">{time}</div>
        </div>
    )
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function LandingPage() {
    const [dark, setDark] = useState<boolean>(() => {
        const saved = localStorage.getItem('revora-theme')
        if (saved !== null) return saved === 'dark'
        return true
    })

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark)
        localStorage.setItem('revora-theme', dark ? 'dark' : 'light')
    }, [dark])

    // Scroll reveal
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('lp-visible') }),
            { threshold: 0.12 }
        )
        document.querySelectorAll('.lp-reveal').forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    // Nav scroll effect
    useEffect(() => {
        const nav = document.getElementById('lp-nav')
        const onScroll = () => {
            if (nav) nav.style.borderBottomColor = window.scrollY > 40 ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)'
        }
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <div className="bg-white dark:bg-[#0c0c0e] text-zinc-900 dark:text-white font-sans antialiased overflow-x-hidden transition-colors duration-300">

            {/* Noise overlay */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-40"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")` }} />

            {/* ── NAV ─────────────────────────────────────────────────────────── */}
            <nav id="lp-nav"
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between
                      px-6 md:px-16 py-5
                      backdrop-blur-xl border-b border-white/5
                      bg-white/80 dark:bg-[rgba(12,12,14,0.8)]
                      transition-colors duration-300">
                <a href="/" className="flex items-center gap-3 no-underline">
                    {/* Replace src with your actual logo image path */}
                    <img
                        src="/Logo.png"
                        alt="Revora logo"
                        className="h-10 w-auto"
                    />
                    <div className="flex flex-col leading-none">
                        <span className="text-xl font-extrabold tracking-widest text-zinc-900 dark:text-white">
                            REVORA
                        </span>
                        <span className="text-[10px] font-semibold tracking-[.18em] text-orange-500 mt-0.5">
                            RIDE SMARTER
                        </span>
                    </div>
                </a>

                <div className="hidden md:flex items-center gap-9">
                    {['Features', 'Dashboard', 'Mobile'].map((l, i) => (
                        <a key={l} href={`#${['features', 'showcase', 'mobile'][i]}`}
                            className="text-sm text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors no-underline">
                            {l}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    {/* Theme toggle */}
                    <button onClick={() => setDark(!dark)}
                        className="w-9 h-9 rounded-lg border border-zinc-200 dark:border-white/10
                             bg-zinc-100 dark:bg-white/5
                             flex items-center justify-center text-base
                             hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors cursor-pointer">
                        {dark ? '☀️' : '🌙'}
                    </button>
                    <a href="/login"
                        className="px-5 py-2 rounded-lg border border-zinc-200 dark:border-white/10
                        bg-transparent text-zinc-900 dark:text-white text-sm font-medium
                        hover:bg-zinc-100 dark:hover:bg-white/5 transition-all no-underline">
                        Sign in
                    </a>
                    <a href="/register"
                        className="px-5 py-2 rounded-lg bg-orange-500 text-black text-sm font-semibold
                        hover:bg-orange-400 hover:-translate-y-px transition-all no-underline
                        shadow-[0_0_20px_rgba(255,107,33,0.35)]">
                        Get Started
                    </a>
                </div>
            </nav>

            {/* ── HERO ────────────────────────────────────────────────────────── */}
            <section className="relative min-h-screen flex items-center pt-28 overflow-hidden">
                {/* Glow */}
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-225 h-150
                        bg-[radial-gradient(ellipse_at_center,rgba(255,107,33,0.12),transparent_70%)] pointer-events-none" />

                <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                        {/* Left */}
                        <div className="pb-10 lp-reveal" style={{ transition: 'opacity .6s ease, transform .6s ease' }}>
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                              border border-orange-500/30 bg-orange-500/8 mb-8
                              text-xs font-medium text-orange-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                                Now available for all Filipino riders
                            </div>

                            <h1 className="font-extrabold tracking-tighter leading-[1.05] text-5xl md:text-7xl
                             text-zinc-900 dark:text-white mb-6">
                                Your Digital<br />
                                <span className="bg-linear-to-br from-orange-500 to-orange-400 bg-clip-text text-transparent">
                                    Garage.
                                </span>
                            </h1>

                            <p className="text-lg font-light text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md mb-10">
                                Track <span className="text-zinc-700 dark:text-zinc-200">maintenance</span>,{' '}
                                <span className="text-zinc-700 dark:text-zinc-200">fuel economy</span>,{' '}
                                <span className="text-zinc-700 dark:text-zinc-200">expenses</span>, and service
                                history — all in one modern rider dashboard.
                            </p>

                            <div className="flex items-center gap-4 mb-12">
                                <a href="/register"
                                    className="px-8 py-3.5 rounded-xl bg-orange-500 text-black font-bold text-[15px]
                              hover:bg-orange-400 hover:-translate-y-0.5 transition-all no-underline
                              shadow-[0_0_40px_rgba(255,107,33,0.3)]">
                                    Get Started — Free
                                </a>
                                <a href="#showcase"
                                    className="px-7 py-3.5 rounded-xl border border-zinc-200 dark:border-white/10
                              text-zinc-900 dark:text-white font-medium text-[15px]
                              hover:bg-zinc-100 dark:hover:bg-white/5 transition-all no-underline">
                                    View Dashboard
                                </a>
                            </div>

                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs text-zinc-400 mr-1">Built for</span>
                                {['NMAX 155', 'Honda ADV', 'Aerox', 'Click 160', 'Mio i 125'].map((b) => (
                                    <span key={b}
                                        className="px-3 py-1 rounded-full border border-zinc-200 dark:border-white/10
                                   bg-white dark:bg-zinc-800/50
                                   text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                        {b}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Right — dashboard preview */}
                        <div className="relative hidden lg:block lp-reveal" style={{ transitionDelay: '.15s', transition: 'opacity .6s ease, transform .6s ease' }}>
                            <div className="relative bg-zinc-100 dark:bg-[#1c1c21] border border-zinc-200 dark:border-white/10
                              rounded-2xl p-5 overflow-hidden
                              shadow-[0_40px_100px_rgba(0,0,0,0.25)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
                                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500/60 to-transparent" />

                                {/* Window chrome */}
                                <div className="flex items-center justify-between mb-4 pb-3.5 border-b border-zinc-200 dark:border-white/10">
                                    <div className="flex gap-1.5">
                                        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
                                            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                                        ))}
                                    </div>
                                    <div className="text-[11px] font-bold text-zinc-400 dark:text-zinc-600 tracking-widest">REVORA DASHBOARD</div>
                                    <div className="w-12" />
                                </div>

                                <DashBikeCard name="Yamaha NMAX 155" sub="2023 · ABC 1234" odo="12,480 km" kml="42.6" />

                                <div className="grid grid-cols-3 gap-2.5 mb-3.5">
                                    <StatCard label="This Month" value="₱2,840" valueColor="text-orange-500" sub="total spent" />
                                    <StatCard label="Fuel Cost" value="₱68.4" valueColor="text-amber-400" sub="per liter" />
                                    <StatCard label="Next PMS" value="340km" valueColor="text-red-400" sub="remaining" />
                                </div>

                                <div className="bg-zinc-900 border border-white/10 rounded-xl p-3.5 mb-3.5">
                                    <div className="text-[11px] font-medium text-zinc-500 mb-3">Fuel economy — last 6 fill-ups</div>
                                    <ChartBars
                                        bars={[
                                            { h: '55%', bg: '#3f3f46' }, { h: '68%', bg: '#52525b' },
                                            { h: '75%', bg: '#2ecc8a' }, { h: '62%', bg: '#52525b' },
                                            { h: '82%', bg: '#2ecc8a' }, { h: '78%', bg: '#ff6b21' },
                                        ]}
                                        labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
                                    />
                                </div>

                                <div className="bg-zinc-900 border border-white/10 rounded-xl p-3.5">
                                    <div className="text-[11px] font-medium text-zinc-500 mb-2.5">Recent activity</div>
                                    <ActivityRow icon="F" iconBg="rgba(255,188,59,0.15)" iconColor="#ffbc3b" name="Fuel fill-up" sub="12,480 km · 4.2 L · ₱280" time="Today" />
                                    <ActivityRow icon="M" iconBg="rgba(46,204,138,0.12)" iconColor="#2ecc8a" name="Oil change" sub="Moto World QC · ₱380" time="3d ago" />
                                    <ActivityRow icon="R" iconBg="rgba(255,79,79,0.12)" iconColor="#ff4f4f" name="PMS reminder" sub="Due in 340 km" time="Auto" />
                                </div>
                            </div>

                            {/* Floating cards */}
                            <div className="absolute -bottom-5 -left-10 bg-white dark:bg-[#1c1c21]
                              border border-zinc-200 dark:border-white/10
                              rounded-xl px-4 py-3 shadow-2xl
                              animate-[float_4s_ease-in-out_infinite_0.5s]">
                                <div className="text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600 mb-1">Monthly savings</div>
                                <div className="text-lg font-extrabold text-emerald-400">+₱620</div>
                                <div className="text-[9px] text-zinc-400 dark:text-zinc-600 mt-0.5">vs last month</div>
                            </div>
                            <div className="absolute top-16 -right-10 bg-white dark:bg-[#1c1c21]
                              border border-zinc-200 dark:border-white/10
                              rounded-xl px-4 py-3 shadow-2xl
                              animate-[float_4s_ease-in-out_infinite_1.5s]">
                                <div className="text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600 mb-1">Next oil change</div>
                                <div className="text-lg font-extrabold text-orange-500">340km</div>
                                <div className="text-[9px] text-zinc-400 dark:text-zinc-600 mt-0.5">PMS reminder</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── TRUST STRIP ─────────────────────────────────────────────────── */}
            <div className="border-t border-b border-zinc-100 dark:border-white/5
                      bg-zinc-50 dark:bg-[#111114] py-12">
                <div className="max-w-6xl mx-auto px-6 md:px-16">
                    <div className="flex items-center justify-center gap-10 flex-wrap">
                        {['Built for Filipino riders', 'Track every kilometer', 'Never miss maintenance again', 'Free to get started', 'Mobile-first experience'].map((t) => (
                            <div key={t} className="flex items-center gap-2.5 text-sm text-zinc-400 dark:text-zinc-500">
                                <span className="w-1 h-1 rounded-full bg-orange-500 shrink-0" />
                                {t}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── PROBLEM ─────────────────────────────────────────────────────── */}
            <section id="problem" className="py-32">
                <div className="max-w-6xl mx-auto px-6 md:px-16">
                    <div className="lp-reveal" style={{ transition: 'opacity .6s ease, transform .6s ease' }}>
                        <p className="text-[11px] font-bold tracking-[.12em] uppercase text-orange-500 mb-4">The Problem</p>
                        <h2 className="font-extrabold tracking-tighter text-4xl md:text-5xl text-zinc-900 dark:text-white mb-4">
                            Motorcycle ownership<br />gets messy.
                        </h2>
                        <p className="text-lg font-light text-zinc-500 dark:text-zinc-400 max-w-lg leading-relaxed mb-16">
                            Most riders rely on memory, receipts, and group chats to manage their bikes. There's a better way.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 border border-zinc-100 dark:border-white/5 rounded-2xl overflow-hidden lp-reveal"
                        style={{ transitionDelay: '.1s', transition: 'opacity .6s ease, transform .6s ease' }}>
                        {[
                            { icon: '🔧', title: 'Forgotten PMS', desc: 'Missed oil changes and maintenance schedules slowly damage your engine without you even noticing.' },
                            { icon: '💸', title: 'No expense visibility', desc: 'No idea how much your motorcycle actually costs you per month — fuel, parts, and repairs add up fast.' },
                            { icon: '📄', title: 'Scattered records', desc: 'Maintenance history buried in receipts and chats. No clean record when it\'s time to sell your bike.' },
                            { icon: '⛽', title: 'Invisible fuel trends', desc: 'Fuel economy changes go unnoticed. A slow drop in km/L can signal engine issues before they get serious.' },
                        ].map((p) => (
                            <div key={p.title}
                                className="p-9 bg-zinc-50 dark:bg-[#111114] hover:bg-zinc-100 dark:hover:bg-[#17171b] transition-colors">
                                <div className="w-11 h-11 rounded-xl border border-zinc-200 dark:border-white/10
                                bg-white dark:bg-zinc-800 flex items-center justify-center text-xl mb-5">
                                    {p.icon}
                                </div>
                                <div className="font-bold text-lg text-zinc-900 dark:text-white mb-2">{p.title}</div>
                                <div className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{p.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURES ────────────────────────────────────────────────────── */}
            <section id="features" className="py-32 bg-zinc-50 dark:bg-[#111114]">
                <div className="max-w-6xl mx-auto px-6 md:px-16">
                    <div className="lp-reveal" style={{ transition: 'opacity .6s ease, transform .6s ease' }}>
                        <p className="text-[11px] font-bold tracking-[.12em] uppercase text-orange-500 mb-4">Features</p>
                        <h2 className="font-extrabold tracking-tighter text-4xl md:text-5xl text-zinc-900 dark:text-white mb-4">
                            Everything organized<br />in one place.
                        </h2>
                        <p className="text-lg font-light text-zinc-500 dark:text-zinc-400 max-w-lg leading-relaxed mb-16">
                            Revora brings your entire motorcycle ownership experience into a single intelligent dashboard.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lp-reveal"
                        style={{ transitionDelay: '.1s', transition: 'opacity .6s ease, transform .6s ease' }}>
                        {[
                            { num: '01', icon: '🔩', title: 'Maintenance Tracking', desc: 'Log and track every service — oil changes, CVT cleaning, brake replacements, tire swaps, and more. Your full service history, always accessible.', tags: ['Oil change', 'CVT cleaning', 'Brakes', 'Tires'] },
                            { num: '02', icon: '⛽', title: 'Fuel Analytics', desc: 'Log every fill-up and watch your km/L trend over time. Spot fuel economy drops early. Know exactly how much you\'re spending on fuel per month.', tags: ['km/L tracking', 'Monthly reports', 'Trend charts'] },
                            { num: '03', icon: '🔔', title: 'Smart Reminders', desc: 'Set reminders by date or by odometer. Get notified before your PMS, LTO registration, and insurance lapse — so you never get caught off guard again.', tags: ['Date-based', 'km-based', 'LTO renewal'] },
                            { num: '04', icon: '📊', title: 'Ownership Insights', desc: 'Understand your real total cost of ownership. Monthly expense breakdowns, service history timelines, and resale-ready records all in one place.', tags: ['Expense breakdown', 'History export', 'Resale docs'] },
                        ].map((f) => (
                            <div key={f.num}
                                className="group relative bg-white dark:bg-[#1c1c21]
                              border border-zinc-100 dark:border-white/5
                              rounded-2xl p-9 overflow-hidden
                              hover:border-orange-500/30 hover:-translate-y-1 transition-all duration-200">
                                <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative">
                                    <div className="text-[11px] font-bold tracking-widest text-orange-500 mb-5">{f.num}</div>
                                    <div className="text-3xl mb-4">{f.icon}</div>
                                    <div className="font-bold text-xl text-zinc-900 dark:text-white mb-2.5">{f.title}</div>
                                    <div className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">{f.desc}</div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {f.tags.map((t) => (
                                            <span key={t}
                                                className="px-2.5 py-1 rounded-full border border-zinc-200 dark:border-white/10
                                       bg-zinc-100 dark:bg-zinc-800/50
                                       text-[11px] text-zinc-400 dark:text-zinc-500">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SHOWCASE ────────────────────────────────────────────────────── */}
            <section id="showcase" className="py-36 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-200 h-100 pointer-events-none
                        bg-[radial-gradient(ellipse,rgba(255,107,33,0.07),transparent_70%)]" />
                <div className="max-w-6xl mx-auto px-6 md:px-16 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                        <div className="lp-reveal" style={{ transition: 'opacity .6s ease, transform .6s ease' }}>
                            <p className="text-[11px] font-bold tracking-[.12em] uppercase text-orange-500 mb-4">Dashboard</p>
                            <h2 className="font-extrabold tracking-tighter text-4xl md:text-5xl text-zinc-900 dark:text-white mb-4">
                                The dashboard<br />is the product.
                            </h2>
                            <p className="text-base font-light text-zinc-500 dark:text-zinc-400 leading-relaxed mb-9">
                                A premium analytics experience designed specifically for motorcycle riders — not a generic tracker. Real intelligence, clean design.
                            </p>
                            <div className="flex flex-col gap-3.5">
                                {['Real-time odometer and km/L tracking', 'Monthly fuel and expense breakdowns', 'Upcoming maintenance at a glance', 'Full activity timeline for every bike', 'Multi-bike garage support'].map((item) => (
                                    <div key={item} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                                        <div className="w-5 h-5 rounded-full bg-orange-500/10 border border-orange-500/30
                                    flex items-center justify-center shrink-0 text-[10px] text-orange-500">
                                            ✓
                                        </div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative bg-white dark:bg-[#1c1c21]
                            border border-zinc-200 dark:border-white/10
                            rounded-3xl p-6 lp-reveal
                            shadow-[0_40px_100px_rgba(0,0,0,0.1)] dark:shadow-[0_60px_120px_rgba(0,0,0,0.5)]"
                            style={{ transitionDelay: '.15s', transition: 'opacity .6s ease, transform .6s ease' }}>
                            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-orange-500/50 to-transparent" />
                            <DashBikeCard name="Honda ADV 160" sub="2022 · XYZ 5678" odo="8,220 km" kml="38.4" />
                            <div className="grid grid-cols-3 gap-2.5 mb-3">
                                <StatCard label="Spent (Jun)" value="₱3,120" valueColor="text-orange-500" />
                                <StatCard label="Avg km/L" value="38.4" valueColor="text-emerald-400" />
                                <StatCard label="Next PMS" value="780km" valueColor="text-red-400" />
                            </div>
                            <div className="bg-zinc-900 border border-white/10 rounded-xl p-3.5 mb-3">
                                <div className="text-[11px] font-medium text-zinc-500 mb-3">6-month expense breakdown</div>
                                <ChartBars
                                    bars={[
                                        { h: '40%', bg: '#3f3f46' }, { h: '60%', bg: '#52525b' }, { h: '55%', bg: '#52525b' },
                                        { h: '80%', bg: '#ff6b21' }, { h: '50%', bg: '#52525b' }, { h: '70%', bg: '#ff8a4c' },
                                    ]}
                                    labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
                                />
                            </div>
                            <div className="bg-zinc-900 border border-white/10 rounded-xl p-3.5">
                                <div className="text-[11px] font-medium text-zinc-500 mb-2.5">Maintenance timeline</div>
                                <ActivityRow icon="M" iconBg="rgba(46,204,138,0.12)" iconColor="#2ecc8a" name="CVT cleaning" sub="8,000 km · Shop Moto Cubao" time="2w ago" />
                                <ActivityRow icon="F" iconBg="rgba(255,188,59,0.15)" iconColor="#ffbc3b" name="Fuel fill-up" sub="8,220 km · 3.8 L · ₱260" time="5d ago" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MOBILE ──────────────────────────────────────────────────────── */}
            <section id="mobile" className="py-32 bg-zinc-50 dark:bg-[#111114]">
                <div className="max-w-6xl mx-auto px-6 md:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                        {/* Phone mockup */}
                        <div className="flex justify-center lp-reveal"
                            style={{ transition: 'opacity .6s ease, transform .6s ease' }}>
                            <div className="w-55 bg-white dark:bg-[#1c1c21]
                              border border-zinc-200 dark:border-white/10
                              rounded-[36px] p-4 relative
                              shadow-[0_40px_80px_rgba(0,0,0,0.12)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-zinc-900 dark:bg-[#0c0c0e] rounded-full" />
                                <div className="mt-5 rounded-3xl overflow-hidden bg-zinc-900 dark:bg-[#0c0c0e] p-3">
                                    <div className="text-[11px] font-extrabold text-zinc-500 mb-2 tracking-wider">REVORA</div>
                                    <div className="flex items-center gap-2 p-2 bg-zinc-800 rounded-xl mb-1.5">
                                        <div className="w-7 h-7 rounded-lg bg-orange-500/15 flex items-center justify-center text-[10px] font-bold text-orange-500 shrink-0">N</div>
                                        <div>
                                            <div className="text-[9px] font-semibold text-white">NMAX 155</div>
                                            <div className="text-[8px] text-zinc-600">12,480 km · ABC 1234</div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1.5 mb-1.5">
                                        <div className="bg-zinc-800 rounded-xl p-2.5">
                                            <div className="text-[8px] text-zinc-600 mb-1">This Month</div>
                                            <div className="text-[13px] font-extrabold text-orange-500">₱2,840</div>
                                        </div>
                                        <div className="bg-zinc-800 rounded-xl p-2.5">
                                            <div className="text-[8px] text-zinc-600 mb-1">Avg km/L</div>
                                            <div className="text-[13px] font-extrabold text-emerald-400">42.6</div>
                                        </div>
                                    </div>
                                    <div className="bg-zinc-800 rounded-xl p-2.5 mb-1.5">
                                        <div className="text-[8px] text-zinc-600 mb-1.5">Fuel trend</div>
                                        <div className="flex items-end gap-1 h-8">
                                            {[{ h: '50%', bg: '#3f3f46' }, { h: '65%', bg: '#52525b' }, { h: '80%', bg: '#2ecc8a' }, { h: '60%', bg: '#52525b' }, { h: '90%', bg: '#2ecc8a' }, { h: '75%', bg: '#ff6b21' }].map((b, i) => (
                                                <div key={i} className="flex-1 rounded-sm" style={{ height: b.h, background: b.bg }} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 p-2 rounded-xl border"
                                        style={{ background: 'rgba(255,107,33,0.1)', borderColor: 'rgba(255,107,33,0.2)' }}>
                                        <div className="w-7 h-7 rounded-lg bg-red-500/15 flex items-center justify-center text-[10px] font-bold text-red-400 shrink-0">!</div>
                                        <div>
                                            <div className="text-[9px] font-semibold text-orange-400">PMS due in 340km</div>
                                            <div className="text-[8px] text-zinc-600">Oil change reminder</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lp-reveal" style={{ transitionDelay: '.15s', transition: 'opacity .6s ease, transform .6s ease' }}>
                            <p className="text-[11px] font-bold tracking-[.12em] uppercase text-orange-500 mb-4">Mobile First</p>
                            <h2 className="font-extrabold tracking-tighter text-4xl md:text-5xl text-zinc-900 dark:text-white mb-4">
                                Built for riders<br />on the go.
                            </h2>
                            <p className="text-base font-light text-zinc-500 dark:text-zinc-400 leading-relaxed mb-9">
                                Log a fill-up in under a minute. Check your next PMS at a stoplight. Revora is designed for how riders actually use their phones.
                            </p>
                            <div className="flex flex-col gap-5">
                                {[
                                    { icon: '⚡', title: '1-minute logging', desc: 'Log fuel and maintenance fast. No friction, no long forms.' },
                                    { icon: '📱', title: 'Responsive dashboard', desc: 'Full analytics on any screen — phone, tablet, or desktop.' },
                                    { icon: '🔔', title: 'Smart notifications', desc: 'PMS and registration alerts before they\'re overdue.' },
                                ].map((f) => (
                                    <div key={f.title}
                                        className="flex gap-4 items-start p-5
                                  bg-white dark:bg-[#1c1c21]
                                  border border-zinc-100 dark:border-white/5
                                  rounded-2xl hover:border-orange-500/25 transition-colors">
                                        <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20
                                    flex items-center justify-center text-base shrink-0">
                                            {f.icon}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm text-zinc-900 dark:text-white mb-1">{f.title}</div>
                                            <div className="text-sm text-zinc-500 dark:text-zinc-400">{f.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── EMOTIONAL ───────────────────────────────────────────────────── */}
            <section className="py-40 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-150 h-100 pointer-events-none
                        bg-[radial-gradient(ellipse,rgba(255,107,33,0.08),transparent_70%)]" />
                <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16">
                    <div className="lp-reveal" style={{ transition: 'opacity .6s ease, transform .6s ease' }}>
                        <p className="text-[11px] font-bold tracking-[.12em] uppercase text-orange-500 mb-6">More than tracking</p>
                        <h2 className="font-extrabold tracking-tighter text-5xl md:text-6xl text-zinc-900 dark:text-white max-w-2xl mx-auto leading-[1.05] mb-0">
                            More than<br />maintenance tracking.
                        </h2>
                        <div className="w-14 h-0.5 bg-orange-500 mx-auto my-10 rounded-full" />
                        <p className="text-lg font-light text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed">
                            Revora helps riders stay organized, informed, and in control of motorcycle ownership — so you can spend less time worrying and more time riding.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA ───────────────────────────────────────────────────── */}
            <section className="py-32 bg-zinc-50 dark:bg-[#111114] border-t border-zinc-100 dark:border-white/5">
                <div className="max-w-2xl mx-auto px-6 md:px-16 text-center">
                    <div className="lp-reveal" style={{ transition: 'opacity .6s ease, transform .6s ease' }}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                            border border-orange-500/20 bg-orange-500/8
                            text-xs text-orange-400 mb-7">
                            🏍️ &nbsp; Free for all riders
                        </div>
                        <h2 className="font-extrabold tracking-tighter text-4xl md:text-5xl text-zinc-900 dark:text-white mb-4">
                            Start building your<br />digital garage.
                        </h2>
                        <p className="text-base font-light text-zinc-500 dark:text-zinc-400 leading-relaxed mb-10">
                            Join riders who are already tracking smarter. No credit card required — get started in seconds.
                        </p>
                        <a href="/register"
                            className="inline-block px-10 py-4 rounded-xl bg-orange-500 text-black font-bold text-base
                          hover:bg-orange-400 hover:-translate-y-1 transition-all no-underline
                          shadow-[0_0_60px_rgba(255,107,33,0.3)]">
                            Create Free Account
                        </a>
                        <div className="text-sm text-zinc-400 dark:text-zinc-600 mt-4">
                            Already have an account?{' '}
                            <a href="/login" className="text-orange-500 no-underline hover:text-orange-400">Sign in →</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ──────────────────────────────────────────────────────── */}
            <footer className="py-12 border-t border-zinc-100 dark:border-white/5">
                <div className="max-w-6xl mx-auto px-6 md:px-16">
                    <div className="flex items-center justify-between flex-wrap gap-6">
                        <div className="font-extrabold text-base tracking-tight text-zinc-900 dark:text-white">REVORA</div>
                        <div className="flex gap-7 flex-wrap">
                            {[['Features', '#features'], ['Dashboard', '#showcase'], ['About', '/about'], ['Privacy', '/privacy'], ['Contact', '/contact'], ['GitHub', 'https://github.com']].map(([l, h]) => (
                                <a key={l} href={h} className="text-sm text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white transition-colors no-underline">{l}</a>
                            ))}
                        </div>
                        <div className="text-xs text-zinc-400 dark:text-zinc-600">© 2025 Revora. Built for Filipino riders.</div>
                    </div>
                </div>
            </footer>

            {/* Scroll reveal + float animation styles (minimal — only what Tailwind can't do) */}
            <style>{`
        .lp-reveal { opacity: 0; transform: translateY(24px); }
        .lp-reveal.lp-visible { opacity: 1; transform: translateY(0); }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      `}</style>
        </div>
    )
}
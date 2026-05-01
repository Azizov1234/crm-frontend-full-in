import { useState, useRef } from 'react';
import {
  Plus, Search, Trash2, Pencil, Eye, Phone, Star,
  ChevronLeft, ChevronRight, Users, GraduationCap, TrendingUp, Award,
  Mail, Calendar, Upload, Lock, EyeOff
} from 'lucide-react';
import RightPanel from '../components/layout/RightPanel';

const SUBJECTS = ['React.js', 'Python', 'Node.js', 'Flutter', 'IELTS', 'SAT', 'Math', 'English'];

const INIT_TEACHERS = [
  { id: 1,  name: 'Jasur Karimov',    phone: '+998 90 123 4567', subject: 'React.js', groups: 4, students: 48, rating: 4.9, coin: 1250, joined: '12 Jan 2024', status: 'active'   },
  { id: 2,  name: 'Malika Yusupova',  phone: '+998 91 234 5678', subject: 'IELTS',    groups: 3, students: 36, rating: 4.8, coin: 980,  joined: '03 Feb 2024', status: 'active'   },
  { id: 3,  name: 'Bobur Toshmatov',  phone: '+998 93 345 6789', subject: 'Python',   groups: 5, students: 60, rating: 4.7, coin: 1540, joined: '20 Mar 2023', status: 'active'   },
  { id: 4,  name: 'Dilnoza Azimova',  phone: '+998 94 456 7890', subject: 'Flutter',  groups: 2, students: 24, rating: 4.6, coin: 720,  joined: '08 Apr 2024', status: 'active'   },
  { id: 5,  name: 'Nodir Rahimov',    phone: '+998 99 567 8901', subject: 'SAT',      groups: 3, students: 30, rating: 4.5, coin: 860,  joined: '15 May 2023', status: 'inactive' },
  { id: 6,  name: 'Sarvar Ergashev',  phone: '+998 97 678 9012', subject: 'Math',     groups: 4, students: 44, rating: 4.8, coin: 1100, joined: '22 Jun 2023', status: 'active'   },
  { id: 7,  name: 'Zulfiya Nazarova', phone: '+998 98 789 0123', subject: 'English',  groups: 3, students: 32, rating: 4.9, coin: 1380, joined: '30 Jul 2023', status: 'active'   },
  { id: 8,  name: 'Akbar Mirzayev',   phone: '+998 90 890 1234', subject: 'Node.js',  groups: 2, students: 20, rating: 4.4, coin: 540,  joined: '05 Aug 2023', status: 'inactive' },
];

const EMPTY = { name: '', phone: '', email: '', birthday: '', gender: 'erkak', subject: 'React.js', status: 'active', password: '', showPassword: false };

const inputCls = 'h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-[13px] outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100';

function Avatar({ name, size = 'md' }) {
  const colors = ['from-blue-500 to-cyan-500','from-violet-500 to-purple-500','from-emerald-500 to-teal-500','from-orange-500 to-amber-500','from-pink-500 to-rose-500'];
  const c = colors[name.charCodeAt(0) % colors.length];
  const sz = size === 'lg' ? 'h-12 w-12 text-base' : 'h-9 w-9 text-sm';
  return (
    <div className={`${sz} flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br ${c} font-bold text-white shadow-sm`}>
      {name.charAt(0)}
    </div>
  );
}

export default function OqituvchilarPage() {
  const [teachers, setTeachers] = useState(INIT_TEACHERS);
  const [search, setSearch]     = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [editItem, setEditItem]   = useState(null);
  const [form, setForm]           = useState(EMPTY);
  const [page, setPage]           = useState(1);
  const [viewItem, setViewItem]   = useState(null);
  const PER_PAGE = 6;

  const filtered = teachers.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.subject.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const [photoPreview, setPhotoPreview] = useState(null);
  const fileRef = useRef(null);
  const [showPwd, setShowPwd] = useState(false);
  const [showPwdField, setShowPwdField] = useState(false);

  function openAdd() { setEditItem(null); setForm(EMPTY); setPhotoPreview(null); setShowPwd(false); setShowPwdField(false); setViewItem(null); setPanelOpen(true); }
  function openEdit(t) { setEditItem(t); setForm({ name: t.name, phone: t.phone, email: t.email || '', birthday: t.birthday || '', gender: t.gender || 'erkak', subject: t.subject, status: t.status, password: '' }); setPhotoPreview(t.photo || null); setShowPwd(false); setShowPwdField(false); setViewItem(null); setPanelOpen(true); }
  function openView(t) { setViewItem(t); setEditItem(null); setPanelOpen(true); }
  function handleDelete(id) { setTeachers(p => p.filter(t => t.id !== id)); }

  function handleSubmit(e) {
    e.preventDefault();
    const newData = { ...form, photo: photoPreview };
    if (editItem) {
      setTeachers(p => p.map(t => t.id === editItem.id ? { ...t, ...newData } : t));
    } else {
      setTeachers(p => [...p, { id: Date.now(), ...newData, groups: 0, students: 0, rating: 5.0, coin: 0, joined: new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }) }]);
    }
    setPanelOpen(false);
  }

  function handlePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setPhotoPreview(ev.target.result);
    reader.readAsDataURL(file);
  }

  const f = k => ({ value: form[k], onChange: e => setForm(p => ({ ...p, [k]: e.target.value })) });

  // Stats
  const active = teachers.filter(t => t.status === 'active').length;
  const totalStudents = teachers.reduce((s, t) => s + t.students, 0);
  const avgRating = (teachers.reduce((s, t) => s + t.rating, 0) / teachers.length).toFixed(1);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* ── Top stats ── */}
      <div className="grid grid-cols-2 gap-3 p-6 pb-0 lg:grid-cols-4">
        {[
          { label: "Jami o'qituvchilar", value: teachers.length, icon: Users,         color: 'from-blue-500 to-blue-600'    },
          { label: 'Faol o\'qituvchilar', value: active,          icon: TrendingUp,    color: 'from-emerald-500 to-teal-500' },
          { label: 'Jami talabalar',      value: totalStudents,   icon: GraduationCap, color: 'from-violet-500 to-purple-500'},
          { label: "O'rtacha reyting",    value: avgRating,       icon: Award,         color: 'from-amber-500 to-orange-500' },
        ].map(s => (
          <div key={s.label} className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} shadow-md`}>
              <s.icon size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xl font-black text-gray-800 leading-none">{s.value}</p>
              <p className="mt-0.5 text-[11px] text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between gap-3 px-6 py-4">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Ism yoki fan bo'yicha qidirish..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="h-9 w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-3 text-[13px] outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-200 hover:bg-blue-700 active:scale-95 transition cursor-pointer">
          <Plus size={16} /> O'qituvchi qo'shish
        </button>
      </div>

      {/* ── Table ── */}
      <div className="flex-1 overflow-auto px-6 pb-6">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                {["O'qituvchi", 'Fan', 'Telefon', 'Guruhlar', 'Talabalar', 'Reyting', 'Coin', 'Status', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((t, i) => (
                <tr key={t.id} className={`border-b border-gray-50 transition hover:bg-blue-50/40 ${i === paged.length - 1 ? 'border-0' : ''}`}>
                  {/* Name */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={t.name} />
                      <div>
                        <p className="text-[13px] font-semibold text-gray-800 leading-tight">{t.name}</p>
                        <p className="text-[11px] text-gray-400">{t.joined}</p>
                      </div>
                    </div>
                  </td>
                  {/* Subject */}
                  <td className="px-4 py-3">
                    <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[12px] font-medium text-blue-700">{t.subject}</span>
                  </td>
                  {/* Phone */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-[12px] text-gray-600">
                      <Phone size={11} className="text-gray-400" />{t.phone}
                    </div>
                  </td>
                  {/* Groups */}
                  <td className="px-4 py-3 text-[13px] font-semibold text-gray-700">{t.groups}</td>
                  {/* Students */}
                  <td className="px-4 py-3 text-[13px] font-semibold text-gray-700">{t.students}</td>
                  {/* Rating */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="text-[13px] font-semibold text-gray-800">{t.rating}</span>
                    </div>
                  </td>
                  {/* Coin */}
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-[12px] font-semibold text-amber-600">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />{t.coin}
                    </span>
                  </td>
                  {/* Status */}
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${t.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {t.status === 'active' ? 'Faol' : 'Nofaol'}
                    </span>
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openView(t)} className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-500 transition cursor-pointer"><Eye size={13} /></button>
                      <button onClick={() => openEdit(t)} className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-500 transition cursor-pointer"><Pencil size={13} /></button>
                      <button onClick={() => handleDelete(t.id)} className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition cursor-pointer"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr><td colSpan={9} className="py-16 text-center text-sm text-gray-400">Natija topilmadi</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-[12px] text-gray-500">
              Jami <span className="font-semibold text-blue-600">{filtered.length}</span> ta o'qituvchi
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-500 disabled:opacity-40 transition cursor-pointer"><ChevronLeft size={14} /></button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => setPage(n)} className={`flex h-8 w-8 items-center justify-center rounded-lg text-[13px] font-medium transition cursor-pointer ${n === page ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'border border-gray-200 text-gray-600 hover:border-blue-300'}`}>{n}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-500 disabled:opacity-40 transition cursor-pointer"><ChevronRight size={14} /></button>
            </div>
          </div>
        )}
      </div>

      {/* ── Right Panel: View ── */}
      <RightPanel title="O'qituvchi ma'lumotlari" isOpen={panelOpen && !!viewItem} onClose={() => setPanelOpen(false)}>
        {viewItem && (
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
              <Avatar name={viewItem.name} size="lg" />
              <div className="text-center">
                <h3 className="font-bold text-gray-800">{viewItem.name}</h3>
                <span className="mt-1 inline-block rounded-lg bg-blue-100 px-2.5 py-0.5 text-[12px] font-medium text-blue-700">{viewItem.subject}</span>
              </div>
            </div>
            {[
              { label: 'Telefon',     value: viewItem.phone },
              { label: 'Guruhlar',    value: viewItem.groups },
              { label: 'Talabalar',   value: viewItem.students },
              { label: 'Reyting',     value: `⭐ ${viewItem.rating}` },
              { label: 'Coin',        value: `🟡 ${viewItem.coin}` },
              { label: "Qo'shilgan",  value: viewItem.joined },
              { label: 'Status',      value: viewItem.status === 'active' ? '🟢 Faol' : '⚪ Nofaol' },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-2.5">
                <span className="text-[12px] text-gray-500">{row.label}</span>
                <span className="text-[13px] font-semibold text-gray-800">{row.value}</span>
              </div>
            ))}
            <button onClick={() => { openEdit(viewItem); }} className="mt-2 w-full rounded-xl bg-blue-600 py-2.5 text-[13px] font-semibold text-white hover:bg-blue-700 transition cursor-pointer">Tahrirlash</button>
          </div>
        )}
      </RightPanel>

      <RightPanel title={editItem ? "O'qituvchini tahrirlash" : "O'qituvchi qo'shish"} isOpen={panelOpen && !viewItem} onClose={() => setPanelOpen(false)}>
        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Telefon */}
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">Telefon raqam <span className="text-red-500">*</span></label>
            <div className="relative">
              <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="tel" placeholder="+998 90 000 0000" className={`${inputCls} pl-9`} required {...f('phone')} />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">Mail</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" placeholder="elektron.pochta@gmail.com" className={`${inputCls} pl-9`} {...f('email')} />
            </div>
          </div>

          {/* FIO */}
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">O'qituvchi FIO <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Ma'lumotni kiriting" className={inputCls} required {...f('name')} />
          </div>

          {/* Tug'ilgan sana */}
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">Tug'ilgan sanasi</label>
            <div className="relative">
              <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="date" className={`${inputCls} pl-9`} {...f('birthday')} />
            </div>
          </div>

          {/* Fan */}
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">Fan</label>
            <select className={`${inputCls} cursor-pointer`} {...f('subject')}>
              {SUBJECTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Jinsi */}
          <div>
            <label className="mb-2 block text-[13px] font-semibold text-gray-700">Jinsi</label>
            <div className="flex gap-4">
              {['erkak', 'ayol'].map(g => (
                <label key={g} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={form.gender === g}
                    onChange={() => setForm(p => ({ ...p, gender: g }))}
                    className="accent-blue-600"
                  />
                  <span className="text-[13px] font-medium text-gray-700 capitalize">
                    {g === 'erkak' ? 'Erkak' : 'Ayol'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">Status</label>
            <select className={`${inputCls} cursor-pointer`} {...f('status')}>
              <option value="active">Faol</option>
              <option value="inactive">Nofaol</option>
            </select>
          </div>

          {/* Surati */}
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">Surati</label>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
            {photoPreview ? (
              <div className="relative">
                <img src={photoPreview} alt="preview" className="h-28 w-full rounded-xl object-cover border border-gray-200" />
                <button type="button" onClick={() => { setPhotoPreview(null); fileRef.current.value=''; }}
                  className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow hover:text-red-500 cursor-pointer text-xs">✕</button>
              </div>
            ) : (
              <button type="button" onClick={() => fileRef.current.click()}
                className="flex w-full flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 py-6 text-gray-400 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-500 transition cursor-pointer">
                <Upload size={20} />
                <span className="text-[12px]">Click to upload or drag and drop</span>
                <span className="text-[11px] text-gray-300">JPG or PNG (max 800x800px)</span>
              </button>
            )}
          </div>

          {/* Parol (ixtiyoriy) */}
          {!showPwdField ? (
            <button type="button" onClick={() => setShowPwdField(true)}
              className="flex items-center gap-1.5 text-[13px] font-semibold text-blue-600 hover:underline cursor-pointer">
              <Lock size={13} /> + Parol qo'shish
            </button>
          ) : (
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">Parol</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Parolni kiriting"
                  className={`${inputCls} pl-9 pr-9`}
                  {...f('password')}
                />
                <button type="button" onClick={() => setShowPwd(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                  {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 border-t border-gray-100 pt-4">
            <button type="button" onClick={() => setPanelOpen(false)} className="flex-1 rounded-xl border border-gray-200 py-2.5 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition cursor-pointer">Bekor qilish</button>
            <button type="submit" className="flex-1 rounded-xl bg-blue-600 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-blue-200 hover:bg-blue-700 active:scale-95 transition cursor-pointer">{editItem ? 'Saqlash' : "Qo'shish"}</button>
          </div>
        </form>
      </RightPanel>
    </div>
  );
}

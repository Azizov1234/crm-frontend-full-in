import { useState } from 'react';
import { toast } from 'sonner';
import { Plus, RefreshCw, Trash2, Pencil, Clock, Calendar, Wallet, BookOpen } from 'lucide-react';
import RightPanel from '../layout/RightPanel';

const LEVEL_COLORS = {
  "Boshlang'ich": { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  "O'rta":        { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  'Yuqori':       { bg: 'bg-blue-100',  text: 'text-blue-700',  dot: 'bg-blue-500'  },
};

const INIT_COURSES = [
  { id: 1, name: 'React.js',  desc: 'Frontend dasturlash uchun zamonaviy JavaScript kutubxonasi.',  duration: '3 oy', lessons: 36, price: '1 200 000', level: 'Yuqori'        },
  { id: 2, name: 'Node.js',   desc: 'Server tomoni dasturlash uchun JavaScript platformasi.',         duration: '2 oy', lessons: 24, price: '900 000',  level: "O'rta"          },
  { id: 3, name: 'Python',    desc: 'Umumiy maqsadli dasturlash tili. Boshlangichlar uchun ideal.',   duration: '4 oy', lessons: 48, price: '1 000 000', level: "Boshlang'ich"    },
  { id: 4, name: 'Flutter',   desc: 'Google tomonidan yaratilgan cross-platform framework.',           duration: '3 oy', lessons: 30, price: '1 100 000', level: "O'rta"          },
  { id: 5, name: 'IELTS',     desc: 'Xalqaro ingliz tili imtihoniga tayyorgarlik kursi.',              duration: '6 oy', lessons: 72, price: '1 500 000', level: 'Yuqori'         },
  { id: 6, name: 'SAT Math',  desc: 'SAT imtihonining matematika bolimi boyicha tayyorlov.',           duration: '4 oy', lessons: 40, price: '1 300 000', level: 'Yuqori'         },
];

const EMPTY_FORM = { name: '', desc: '', duration: '', lessons: '', price: '', level: 'Yuqori' };

export default function KurslarPage() {
  const [courses,     setCourses]     = useState(INIT_COURSES);
  const [panelOpen,   setPanelOpen]   = useState(false);
  const [editCourse,  setEditCourse]  = useState(null);
  const [form,        setForm]        = useState(EMPTY_FORM);

  function openAdd() {
    setEditCourse(null);
    setForm(EMPTY_FORM);
    setPanelOpen(true);
  }

  function openEdit(course) {
    setEditCourse(course);
    setForm({
      name:     course.name,
      desc:     course.desc,
      duration: course.duration,
      lessons:  String(course.lessons),
      price:    course.price,
      level:    course.level,
    });
    setPanelOpen(true);
  }

  function handleDelete(id) {
    const kurs = courses.find(c => c.id === id);
    setCourses((prev) => prev.filter((c) => c.id !== id));
    toast.error("Kurs o'chirildi", { description: kurs?.name });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editCourse) {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === editCourse.id
            ? { ...c, ...form, lessons: Number(form.lessons) }
            : c
        )
      );
      toast.success('Kurs yangilandi!', { description: form.name });
    } else {
      setCourses((prev) => [
        ...prev,
        { id: Date.now(), ...form, lessons: Number(form.lessons) },
      ]);
      toast.success("Kurs qo'shildi!", { description: form.name });
    }
    setPanelOpen(false);
  }

  function field(key) {
    return {
      value:    form[key],
      onChange: (e) => setForm((prev) => ({ ...prev, [key]: e.target.value })),
    };
  }

  const inputCls =
    'h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-[13px] text-gray-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100';

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* ── Header ── */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Kurslar</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Jami <span className="font-semibold text-blue-600">{courses.length}</span> ta kurs
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-blue-300 hover:text-blue-500 cursor-pointer">
            <RefreshCw size={15} />
          </button>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700 active:scale-95 cursor-pointer"
          >
            <Plus size={16} />
            Kurs qo'shish
          </button>
        </div>
      </div>

      {/* ── Course cards ── */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => {
          const lv = LEVEL_COLORS[course.level] ?? LEVEL_COLORS["Boshlang'ich"];
          return (
            <div
              key={course.id}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:border-blue-200 hover:shadow-md overflow-hidden"
            >
              {/* Card top accent */}
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-cyan-400" />

              <div className="flex flex-1 flex-col p-5">
                {/* Title row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100">
                      <BookOpen size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm leading-tight">{course.name}</h3>
                      <span className={`mt-0.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${lv.bg} ${lv.text}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${lv.dot}`} />
                        {course.level}
                      </span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-red-400 transition hover:bg-red-50 hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 size={13} />
                    </button>
                    <button
                      onClick={() => openEdit(course)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-blue-400 transition hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                    >
                      <Pencil size={13} />
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3 text-[12px] text-gray-500 leading-relaxed line-clamp-2 flex-1">
                  {course.desc}
                </p>

                {/* Stats row */}
                <div className="mt-4 flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2.5">
                  <div className="flex items-center gap-1 text-[12px] text-gray-600">
                    <Calendar size={12} className="text-blue-500" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="h-3 w-px bg-gray-200" />
                  <div className="flex items-center gap-1 text-[12px] text-gray-600">
                    <Clock size={12} className="text-blue-500" />
                    <span>{course.lessons} dars</span>
                  </div>
                  <div className="h-3 w-px bg-gray-200" />
                  <div className="flex items-center gap-1 text-[12px] font-semibold text-blue-600 ml-auto">
                    <Wallet size={12} />
                    <span>{course.price} so'm</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Right Panel ── */}
      <RightPanel
        title={editCourse ? 'Kursni tahrirlash' : "Kurs qo'shish"}
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
              Kurs nomi <span className="text-red-500">*</span>
            </label>
            <input type="text" placeholder="Masalan: React.js" className={inputCls} required {...field('name')} />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">Tavsif</label>
            <textarea
              placeholder="Kurs haqida qisqacha ma'lumot..."
              rows={3}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-[13px] text-gray-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 resize-none"
              {...field('desc')}
            />
          </div>

          {/* Duration + Lessons */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
                Davomiyligi <span className="text-red-500">*</span>
              </label>
              <input type="text" placeholder="3 oy" className={inputCls} required {...field('duration')} />
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
                Darslar soni <span className="text-red-500">*</span>
              </label>
              <input type="number" placeholder="36" className={inputCls} required {...field('lessons')} />
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
              Narxi (so'm) <span className="text-red-500">*</span>
            </label>
            <input type="text" placeholder="1 200 000" className={inputCls} required {...field('price')} />
          </div>

          {/* Level */}
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">Daraja</label>
            <select className={`${inputCls} cursor-pointer`} {...field('level')}>
              <option value="Boshlang'ich">Boshlang&apos;ich</option>
              <option value="O'rta">O&apos;rta</option>
              <option value="Yuqori">Yuqori</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              className="flex-1 rounded-xl border border-gray-200 py-2.5 text-[13px] font-semibold text-gray-600 transition hover:bg-gray-50 cursor-pointer"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-blue-600 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700 active:scale-95 cursor-pointer"
            >
              {editCourse ? 'Saqlash' : "Qo'shish"}
            </button>
          </div>
        </form>
      </RightPanel>
    </div>
  );
}

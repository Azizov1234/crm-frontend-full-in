import { Phone, Star } from 'lucide-react';

export default function HodimlarPage() {
  const staff = [
    { id: 1, name: "Alisher Karimov", role: "O'qituvchi", phone: '+998 90 123 4567', rating: 4.9, status: 'active' },
    { id: 2, name: 'Malika Yusupova', role: 'Admin', phone: '+998 91 234 5678', rating: 4.7, status: 'active' },
    { id: 3, name: 'Bobur Toshmatov', role: "O'qituvchi", phone: '+998 93 345 6789', rating: 4.5, status: 'active' },
    { id: 4, name: 'Dilnoza Azimova', role: 'Kassir', phone: '+998 94 456 7890', rating: 4.8, status: 'active' },
    { id: 5, name: 'Nodir Raximov', role: "O'qituvchi", phone: '+998 99 567 8901', rating: 4.6, status: 'inactive' },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Hodimlar</h2>
        <p className="text-sm text-gray-500 mt-0.5">Barcha hodimlar ro'yxati</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-5 py-3 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-500">Hodim</th>
              <th className="px-5 py-3 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-500">Lavozim</th>
              <th className="px-5 py-3 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-500">Telefon</th>
              <th className="px-5 py-3 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-500">Reyting</th>
              <th className="px-5 py-3 text-left text-[12px] font-semibold uppercase tracking-wide text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s, idx) => (
              <tr
                key={s.id}
                className={`border-b border-gray-50 transition hover:bg-blue-50/50 ${idx === staff.length - 1 ? 'border-0' : ''}`}
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-bold text-white">
                      {s.name.charAt(0)}
                    </div>
                    <span className="text-[13px] font-semibold text-gray-800">{s.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className="rounded-lg bg-blue-50 px-2 py-1 text-[12px] font-medium text-blue-700">{s.role}</span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1.5 text-[13px] text-gray-600">
                    <Phone size={12} />
                    {s.phone}
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1">
                    <Star size={13} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-[13px] font-semibold text-gray-800">{s.rating}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    s.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {s.status === 'active' ? 'Faol' : 'Nofaol'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { toast } from 'sonner';
import { RefreshCw, Plus, Trash2, Pencil } from 'lucide-react';
import RightPanel from '../layout/RightPanel';

const MOCK_ROOMS = [
  { id: 1, name: 'genious room',      capacity: 15 },
  { id: 2, name: 'Impact room',       capacity: 12 },
  { id: 3, name: '1A',                capacity: 25 },
  { id: 4, name: '205-xona',          capacity: 32 },
  { id: 5, name: '16-xona',           capacity: 18 },
  { id: 6, name: '5 xona',            capacity: 30 },
  { id: 8, name: 'Beginner',          capacity: 18 },
  { id: 9, name: '99',                capacity: 25 },
];

export default function XonalarPage() {
  const [rooms, setRooms]           = useState(MOCK_ROOMS);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editRoom, setEditRoom]     = useState(null);
  const [formData, setFormData]     = useState({ name: '', capacity: '' });

  function openAddPanel() {
    setEditRoom(null);
    setFormData({ name: '', capacity: '' });
    setIsPanelOpen(true);
  }

  function openEditPanel(room) {
    setEditRoom(room);
    setFormData({ name: room.name, capacity: String(room.capacity) });
    setIsPanelOpen(true);
  }

  function handleDelete(id) {
    const xona = rooms.find(r => r.id === id);
    setRooms((prev) => prev.filter((r) => r.id !== id));
    toast.error("Xona o'chirildi", { description: xona?.name });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editRoom) {
      setRooms((prev) =>
        prev.map((r) =>
          r.id === editRoom.id
            ? { ...r, name: formData.name, capacity: Number(formData.capacity) }
            : r
        )
      );
      toast.success('Xona yangilandi!', { description: formData.name });
    } else {
      setRooms((prev) => [
        ...prev,
        { id: Date.now(), name: formData.name, capacity: Number(formData.capacity) },
      ]);
      toast.success("Xona qo'shildi!", { description: formData.name });
    }
    setIsPanelOpen(false);
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Xonalar</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Jami <span className="font-semibold text-blue-600">{rooms.length}</span> ta xona
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-blue-300 hover:text-blue-500 cursor-pointer">
            <RefreshCw size={15} />
          </button>
          <button
            onClick={openAddPanel}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700 active:scale-95 cursor-pointer"
          >
            <Plus size={16} />
            Xona qo'shish
          </button>
        </div>
      </div>

      {/* Rooms grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="group relative rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">{room.name}</h3>
                <p className="text-[12px] text-gray-500 mt-0.5">
                  Sig'imi: <span className="font-semibold text-blue-600">{room.capacity}</span>
                </p>
              </div>
              <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => handleDelete(room.id)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-red-400 transition hover:bg-red-50 hover:text-red-600 cursor-pointer"
                >
                  <Trash2 size={13} />
                </button>
                <button
                  onClick={() => openEditPanel(room)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-blue-400 transition hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                >
                  <Pencil size={13} />
                </button>
              </div>
            </div>
            {/* Capacity bar */}
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all"
                style={{ width: `${Math.min((room.capacity / 35) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Right Panel */}
      <RightPanel
        title={editRoom ? 'Xonani tahrirlash' : "Xona qo'shish"}
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
              Nomi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Xona nomi"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-[13px] text-gray-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
              Sig'imi <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Masalan: 20"
              value={formData.capacity}
              onChange={(e) => setFormData((prev) => ({ ...prev, capacity: e.target.value }))}
              className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-[13px] text-gray-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsPanelOpen(false)}
              className="flex-1 rounded-xl border border-gray-200 py-2.5 text-[13px] font-semibold text-gray-600 transition hover:bg-gray-50 cursor-pointer"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-blue-600 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700 active:scale-95 cursor-pointer"
            >
              {editRoom ? 'Saqlash' : "Qo'shish"}
            </button>
          </div>
        </form>
      </RightPanel>
    </div>
  );
}

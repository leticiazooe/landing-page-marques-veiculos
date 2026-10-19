import { useEffect, useState, type FormEvent } from 'react';
import { ArrowLeft, ImagePlus, Save, X } from 'lucide-react';
import type { VehicleRow } from '../lib/catalog';
import { formatPrice, type VehicleCategory } from '../data/site';

export const emptyVehicle = (): VehicleRow => ({
  id: '',
  make: '',
  model: '',
  trim: '',
  category: 'sedan',
  year: '',
  km: '',
  transmission: 'Automático',
  transmission_detail: '',
  fuel: '',
  engine: '',
  doors: '4 portas',
  color: '',
  drive: '',
  price: 0,
  image: '',
  gallery: [],
  description: '',
  equipment: [],
  payment_methods: [],
  is_conceptual: false,
  status: 'draft',
  featured: false,
});

const categories: { label: string; value: VehicleCategory }[] = [
  { label: 'Sedã', value: 'sedan' },
  { label: 'SUV', value: 'suv' },
  { label: 'Hatch', value: 'hatch' },
  { label: 'Picape', value: 'picape' },
  { label: 'Esportivo', value: 'esportivo' },
  { label: 'Outro', value: 'outro' },
];
const payments = ['PIX ou transferência', 'Financiamento', 'Veículo na troca'];
const fields = [
  { label: 'Marca', key: 'make', placeholder: 'Ex.: Volvo', required: true },
  { label: 'Modelo', key: 'model', placeholder: 'Ex.: XC60', required: true },
  { label: 'Versão', key: 'trim', placeholder: 'Ex.: T5 Momentum 2.0' },
  { label: 'Ano / modelo', key: 'year', placeholder: 'Ex.: 2021/2022' },
  { label: 'Quilometragem', key: 'km', placeholder: 'Ex.: 42.000 km' },
  { label: 'Transmissão', key: 'transmission', placeholder: 'Automático ou manual' },
  { label: 'Tipo de câmbio', key: 'transmission_detail', placeholder: 'Ex.: CVT, 8 marchas' },
  { label: 'Combustível', key: 'fuel', placeholder: 'Ex.: Flex' },
  { label: 'Motorização', key: 'engine', placeholder: 'Ex.: 2.0 Turbo' },
  { label: 'Número de portas', key: 'doors', placeholder: 'Ex.: 4 portas' },
  { label: 'Cor', key: 'color', placeholder: 'Ex.: Preto' },
  { label: 'Tração', key: 'drive', placeholder: 'Ex.: Dianteira / integral' },
] as const;
type StringField = (typeof fields)[number]['key'];
const control = 'min-h-12 w-full border border-[#d8d1c4] bg-white px-4 py-3 text-[16px] text-ink outline-none transition focus:border-gold-dark focus:ring-2 focus:ring-gold/25';
const label = 'mb-2 block text-[14px] font-semibold text-ink/80';

type Props = {
  vehicle: VehicleRow | null;
  saving: boolean;
  onSave: (vehicle: VehicleRow, files: File[]) => Promise<void>;
  onClose: () => void;
};

export function AdminVehicleForm({ vehicle, saving, onSave, onClose }: Props) {
  const [form, setForm] = useState<VehicleRow>(vehicle ?? emptyVehicle());
  const [files, setFiles] = useState<File[]>([]);
  const [equipmentText, setEquipmentText] = useState((vehicle?.equipment ?? []).join('\n'));
  const [galleryText, setGalleryText] = useState((vehicle?.gallery ?? []).join('\n'));
  const [error, setError] = useState('');

  useEffect(() => {
    setForm(vehicle ?? emptyVehicle());
    setFiles([]);
    setEquipmentText((vehicle?.equipment ?? []).join('\n'));
    setGalleryText((vehicle?.gallery ?? []).join('\n'));
    setError('');
  }, [vehicle]);

  const field = (key: StringField, value: string) => setForm(current => ({ ...current, [key]: value }));
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const payload = {
      ...form,
      make: form.make.trim(),
      model: form.model.trim(),
      equipment: equipmentText.split(/\r?\n/).map(item => item.trim()).filter(Boolean),
      gallery: galleryText.split(/\r?\n/).map(item => item.trim()).filter(Boolean),
    };
    if (!payload.make || !payload.model) { setError('Informe a marca e o modelo.'); return; }
    if (payload.price < 0 || !Number.isFinite(payload.price)) { setError('Informe um preço válido.'); return; }
    if (payload.status === 'published' && (!payload.price || (!payload.image && files.length === 0 && payload.gallery.length === 0))) {
      setError('Para publicar, informe um preço e pelo menos uma foto.');
      return;
    }
    if (payload.status === 'published' && payload.is_conceptual) {
      setError('Veículos conceituais não podem ser publicados como estoque real.');
      return;
    }
    try { await onSave(payload, files); }
    catch (err) { setError(err instanceof Error ? err.message : 'Não foi possível salvar o veículo.'); }
  };

  return (
    <form onSubmit={submit} className="space-y-8" aria-label="Cadastro de veículo">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button type="button" onClick={onClose} className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-ink/70 hover:text-ink"><ArrowLeft size={18} /> Voltar à lista</button>
        <span className="text-[13px] text-ink/60">{vehicle?.id ? 'Editando veículo' : 'Novo cadastro'}</span>
      </div>
      <div className="flex flex-col justify-between gap-4 border-b border-ink/10 pb-6 sm:flex-row sm:items-end">
        <div><h2 className="font-sans text-[clamp(28px,4vw,42px)] font-semibold tracking-tight">{vehicle?.id ? 'Editar veículo' : 'Cadastrar veículo'}</h2><p className="mt-2 text-[15px] text-ink/65">Preencha a ficha e escolha quando ela aparecerá na vitrine.</p></div>
        <div className="w-full sm:w-52"><label htmlFor="vehicle-status" className={label}>Situação do anúncio</label><select id="vehicle-status" className={control} value={form.status} onChange={e => setForm(current => ({ ...current, status: e.target.value as VehicleRow['status'] }))}><option value="draft">Rascunho</option><option value="published">Publicado</option><option value="sold">Vendido</option></select></div>
      </div>

      <section aria-labelledby="adm-basic" className="space-y-5">
        <h3 id="adm-basic" className="border-b border-ink/10 pb-3 text-[19px] font-semibold">Informações principais</h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {fields.map(item => (
            <div key={item.key}><label htmlFor={item.key} className={label}>{item.label}</label><input id={item.key} className={control} value={form[item.key]} onChange={e => field(item.key, e.target.value)} placeholder={item.placeholder} required={'required' in item && item.required === true} /></div>
          ))}
          <div><label htmlFor="vehicle-category" className={label}>Categoria</label><select id="vehicle-category" className={control} value={form.category} onChange={e => setForm(current => ({ ...current, category: e.target.value as VehicleCategory }))}>{categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}</select></div>
          <div><label htmlFor="vehicle-price" className={label}>Preço (R$)</label><input id="vehicle-price" className={control} inputMode="decimal" type="number" min="0" step=".01" value={form.price || ''} onChange={e => setForm(current => ({ ...current, price: Number(e.target.value) }))} placeholder="Ex.: 189900" /><span className="mt-1 block text-[13px] text-ink/55">{formatPrice(form.price || 0)}</span></div>
        </div>
      </section>

      <section aria-labelledby="adm-media" className="space-y-5">
        <h3 id="adm-media" className="border-b border-ink/10 pb-3 text-[19px] font-semibold">Fotos do veículo</h3>
        <div className="grid gap-6 lg:grid-cols-2">
          <div><label htmlFor="vehicle-image" className={label}>URL da foto principal (opcional se enviar arquivos)</label><input id="vehicle-image" type="url" className={control} value={form.image} onChange={e => setForm(current => ({ ...current, image: e.target.value }))} placeholder="https://..." /><p className="mt-2 text-[13px] leading-relaxed text-ink/60">A primeira imagem enviada será usada como capa quando não houver URL principal.</p></div>
          <div><label htmlFor="vehicle-photos" className={label}><ImagePlus size={18} className="mr-2 inline" /> Adicionar fotografias (JPG, PNG ou WebP)</label><input id="vehicle-photos" type="file" accept="image/jpeg,image/png,image/webp" multiple className={control} onChange={e => setFiles(Array.from(e.target.files ?? []))} /><p className="mt-2 text-[13px] text-ink/60">Até 12 imagens por envio, 8 MB por foto.</p></div>
        </div>
        {(form.image || files.length > 0) && <div className="flex flex-wrap items-center gap-4">{form.image && <img src={form.image} alt="Capa atual do veículo" className="h-28 w-40 object-cover" />}{files.map((f,i) => <span key={i} className="max-w-52 truncate bg-[#eee9df] px-3 py-2 text-[13px] text-ink">{f.name}</span>)}</div>}
        <div><label htmlFor="vehicle-gallery" className={label}>URLs adicionais da galeria (uma por linha)</label><textarea id="vehicle-gallery" rows={3} className={control} value={galleryText} onChange={e => setGalleryText(e.target.value)} placeholder="https://..." /></div>
      </section>

      <section aria-labelledby="adm-details" className="space-y-5">
        <h3 id="adm-details" className="border-b border-ink/10 pb-3 text-[19px] font-semibold">Descrição e equipamentos</h3>
        <div><label htmlFor="vehicle-description" className={label}>Descrição do veículo</label><textarea id="vehicle-description" rows={4} className={control} value={form.description} onChange={e => setForm(current => ({ ...current, description: e.target.value }))} placeholder="Conte os principais diferenciais desta unidade." /></div>
        <div><label htmlFor="vehicle-equipment" className={label}>Itens e equipamentos (um por linha)</label><textarea id="vehicle-equipment" rows={6} className={control} value={equipmentText} onChange={e => setEquipmentText(e.target.value)} placeholder={'Bancos em couro\nCentral multimídia\nPiloto automático'} /></div>
      </section>

      <section aria-labelledby="adm-payment" className="space-y-4">
        <h3 id="adm-payment" className="border-b border-ink/10 pb-3 text-[19px] font-semibold">Pagamento e apresentação</h3>
        <p className="text-[15px] text-ink/65">Marque apenas as formas de pagamento confirmadas pela garagem para este veículo.</p>
        <div className="grid gap-3 sm:grid-cols-2">{payments.map(method => <label key={method} className="flex cursor-pointer items-center gap-3 border border-ink/15 bg-white p-4 text-[15px] font-medium"><input type="checkbox" checked={form.payment_methods.includes(method)} onChange={e => setForm(current => ({ ...current, payment_methods: e.target.checked ? [...current.payment_methods, method] : current.payment_methods.filter(m => m !== method) }))} className="h-5 w-5 accent-[#8d7348]" />{method}</label>)}</div>
        <label className="flex items-center gap-3 text-[15px]"><input type="checkbox" checked={form.featured} onChange={e => setForm(current => ({ ...current, featured: e.target.checked }))} className="h-5 w-5 accent-[#8d7348]" />Destacar este veículo na vitrine</label>
        <label className="flex items-center gap-3 text-[15px]"><input type="checkbox" checked={form.is_conceptual} onChange={e => setForm(current => ({ ...current, is_conceptual: e.target.checked }))} className="h-5 w-5 accent-[#8d7348]" />Modelo demonstrativo ou conceitual (não publicável)</label>
      </section>

      {error && <p role="alert" className="border border-red-300 bg-red-50 px-5 py-4 text-[15px] text-red-800">{error}</p>}
      <div className="flex flex-wrap items-center justify-end gap-4 border-t border-ink/15 pt-7">
        <button type="button" onClick={onClose} disabled={saving} className="inline-flex min-h-12 items-center gap-2 px-5 text-[15px] font-medium text-ink/70 hover:text-ink"><X size={17} /> Cancelar</button>
        <button type="submit" disabled={saving} className="inline-flex min-h-13 items-center gap-3 bg-ink px-8 text-[15px] font-semibold text-gold-light transition hover:bg-[#343631] disabled:opacity-50"><Save size={18} />{saving ? 'Salvando...' : form.status === 'published' ? 'Salvar e publicar' : 'Salvar cadastro'}</button>
      </div>
    </form>
  );
}

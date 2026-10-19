import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowUpRight, CarFront, CirclePlus, Clock3, LogOut, Pencil, ShieldCheck, Trash2 } from 'lucide-react';
import { AdminVehicleForm } from './AdminVehicleForm';
import { formatPrice } from '../data/site';
import { catalogConfigured, supabase } from '../lib/supabase';
import type { VehicleRow } from '../lib/catalog';

type Access = 'checking' | 'guest' | 'admin' | 'denied';
const inputClass = 'min-h-12 w-full border border-ink/20 bg-white px-4 text-[16px] text-ink focus:border-gold-dark focus:outline-none focus:ring-2 focus:ring-gold/25';
const statusLabel = { draft: 'Rascunho', published: 'Publicado', sold: 'Vendido' } as const;

function AdminShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-cream font-sans text-ink">
    <header className="border-b border-gold/20 bg-night text-ivory">
      <div className="mx-auto flex min-h-21 w-[min(1440px,calc(100%-36px))] flex-wrap items-center justify-between gap-4 py-3 sm:w-[min(1440px,calc(100%-80px))]">
        <a href="/" aria-label="Voltar ao site da Marques Veículos" className="flex items-center gap-4"><img src="/images/logo-marques.png" className="h-14 w-32 object-contain" width={128} height={56} alt="Marques Veículos" /><span className="hidden border-l border-white/20 pl-4 text-[13px] font-semibold uppercase tracking-wider text-gold-light sm:block">Administração</span></a>
        <a className="inline-flex min-h-11 items-center gap-2 text-[14px] text-ivory/80 hover:text-gold-light" href="/">Voltar ao site <ArrowUpRight size={17} /></a>
      </div>
    </header>
    {children}
  </div>;
}

export function AdminPanel() {
  const [access, setAccess] = useState<Access>('checking');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signing, setSigning] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [items, setItems] = useState<VehicleRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<VehicleRow | null | undefined>(undefined);

  useEffect(() => {
    if (!supabase) { setAccess('guest'); return; }
    let active = true;
    const verify = async () => {
      const { data: userData, error: userError } = await supabase!.auth.getUser();
      if (!active) return;
      if (userError || !userData.user) { setAccess('guest'); return; }
      const { data, error: roleError } = await supabase!
        .from('marques_admin_users')
        .select('user_id')
        .eq('user_id', userData.user.id)
        .maybeSingle();
      if (!active) return;
      setAccess(!roleError && data ? 'admin' : 'denied');
    };
    void verify();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      // Auth callbacks must not synchronously await other Supabase requests.
      queueMicrotask(() => { if (active) void verify(); });
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);

  const load = useCallback(async () => {
    if (!supabase) return;
    setLoading(true); setError('');
    const { data, error: listError } = await supabase
      .from('marques_vehicles')
      .select('*')
      .order('created_at', { ascending: false });
    if (listError) setError('Não foi possível carregar o estoque. Confira se a migração do banco foi executada.');
    else setItems((data ?? []) as VehicleRow[]);
    setLoading(false);
  }, []);

  useEffect(() => { if (access === 'admin') void load(); }, [access, load]);

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    setSigning(true); setLoginError('');
    const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (authError) setLoginError('Não foi possível entrar. Verifique o e-mail e a senha.');
    else { setAccess('checking'); setPassword(''); }
    setSigning(false);
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setAccess('guest');
    setItems([]); setEditing(undefined);
  };

  const save = async (draft: VehicleRow, files: File[]) => {
    if (!supabase || access !== 'admin') throw new Error('Sua sessão não tem acesso administrativo.');
    if (files.length > 12) throw new Error('Selecione até 12 fotos por vez.');
    setSaving(true); setError(''); setNotice('');
    const uploadedPaths: string[] = [];
    try {
      const urls: string[] = [];
      for (const file of files) {
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Use apenas fotos JPG, PNG ou WebP.');
        if (file.size > 8 * 1024 * 1024) throw new Error('Cada foto pode ter até 8 MB.');
        const extension = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
        const path = `${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await supabase.storage.from('marques-vehicles')
          .upload(path, file, { cacheControl: '3600', contentType: file.type, upsert: false });
        if (uploadError) throw new Error('Falha ao enviar uma foto: ' + uploadError.message);
        uploadedPaths.push(path);
        urls.push(supabase.storage.from('marques-vehicles').getPublicUrl(path).data.publicUrl);
      }

      const { id, created_at, updated_at, ...values } = draft;
      void created_at; void updated_at;
      const payload = {
        ...values,
        image: values.image || urls[0] || values.gallery[0] || '',
        gallery: [...values.gallery, ...urls.filter(url => url !== (values.image || urls[0]))],
      };
      if (payload.status === 'published' && (!payload.image || payload.price <= 0)) {
        throw new Error('Para publicar, adicione uma foto e informe o preço.');
      }
      const query = id
        ? supabase.from('marques_vehicles').update(payload).eq('id', id)
        : supabase.from('marques_vehicles').insert(payload);
      const { error: saveError } = await query;
      if (saveError) throw new Error('Não foi possível salvar o veículo: ' + saveError.message);
      setEditing(undefined);
      setNotice(id ? 'Veículo atualizado com sucesso.' : 'Veículo cadastrado com sucesso.');
      await load();
    } catch (err) {
      if (uploadedPaths.length) await supabase.storage.from('marques-vehicles').remove(uploadedPaths);
      throw err;
    } finally { setSaving(false); }
  };

  const publish = async (row: VehicleRow) => {
    if (!supabase || access !== 'admin' || saving) return;
    if (row.is_conceptual || !row.image || Number(row.price) <= 0) {
      setError('Para publicar, é necessário um veículo real, com foto e preço válido. Abra Editar e complete os dados.');
      return;
    }
    if (!window.confirm(`Publicar ${row.make} ${row.model} por ${formatPrice(Number(row.price))} na vitrine pública? Confira a marca, categoria e os demais dados antes de confirmar.`)) return;
    setSaving(true);
    setError('');
    setNotice('');
    try {
      const { data, error: publishError } = await supabase.from('marques_vehicles')
        .update({ status: 'published' })
        .eq('id', row.id)
        .eq('status', 'draft')
        .select('id');
      if (publishError || !data?.length) throw new Error('Não foi possível publicar. Confira seus dados e tente novamente.');
      setNotice('Veículo publicado na vitrine com sucesso.');
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Falha ao publicar o veículo.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (row: VehicleRow) => {
    if (!supabase || access !== 'admin') return;
    if (!window.confirm(`Excluir ${row.make} ${row.model}? Essa ação não pode ser desfeita.`)) return;
    setError(''); setNotice('');
    const { error: deleteError } = await supabase.from('marques_vehicles').delete().eq('id', row.id);
    if (deleteError) { setError('Não foi possível excluir o veículo.'); return; }
    setNotice('Cadastro excluído.');
    await load();
  };

  if (!catalogConfigured) return <AdminShell><main className="mx-auto max-w-2xl px-6 py-22"><ShieldCheck size={42} className="text-gold-dark" /><h1 className="mt-5 text-4xl font-semibold">Painel em configuração</h1><p className="mt-5 text-[17px] leading-relaxed text-ink/70">O painel foi desenvolvido, mas a conexão com o Supabase ainda não está configurada. O cadastro e a autenticação permanecem desabilitados até a instalação do banco e a definição do administrador.</p><p className="mt-5 text-[15px] text-ink/60">Consulte o arquivo ADMIN.md do repositório para concluir a instalação.</p></main></AdminShell>;

  if (access === 'checking') return <AdminShell><main className="mx-auto max-w-lg px-6 py-24 text-[18px]" role="status">Verificando acesso ao painel...</main></AdminShell>;

  if (access === 'guest') return <AdminShell>
    <main className="mx-auto max-w-lg px-6 py-18 sm:py-28">
      <p className="text-[13px] font-semibold uppercase tracking-[.18em] text-gold-dark">Área restrita</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Acesse o painel</h1>
      <p className="mt-4 text-[16px] leading-relaxed text-ink/65">Entre com uma conta administrativa autorizada para gerenciar os veículos.</p>
      <form onSubmit={signIn} className="mt-9 space-y-5 bg-white p-6 shadow-[0_15px_50px_rgba(20,17,10,.06)] sm:p-9">
        <div><label htmlFor="admin-email" className="mb-2 block text-[15px] font-semibold">E-mail</label><input id="admin-email" className={inputClass} autoComplete="username" type="email" required value={email} onChange={e => setEmail(e.target.value)} /></div>
        <div><label htmlFor="admin-password" className="mb-2 block text-[15px] font-semibold">Senha</label><input id="admin-password" className={inputClass} autoComplete="current-password" type="password" required value={password} onChange={e => setPassword(e.target.value)} /></div>
        {loginError && <p role="alert" className="text-[14px] text-red-800">{loginError}</p>}
        <button disabled={signing} type="submit" className="min-h-13 w-full bg-night px-6 text-[16px] font-semibold text-gold-light disabled:opacity-60">{signing ? 'Entrando...' : 'Entrar com segurança'}</button>
      </form>
    </main>
  </AdminShell>;

  if (access === 'denied') return <AdminShell><main className="mx-auto max-w-xl px-6 py-22"><ShieldCheck size={40} className="text-gold-dark" /><h1 className="mt-5 text-4xl font-semibold">Acesso não autorizado</h1><p className="mt-5 text-[17px] leading-relaxed text-ink/70">Sua conta existe, mas ainda não está autorizada para administrar a Marques Veículos. Solicite a liberação ao responsável pelo banco.</p><button onClick={() => void signOut()} className="mt-8 min-h-12 bg-night px-7 text-gold-light">Sair da conta</button></main></AdminShell>;

  const published = items.filter(v => v.status === 'published').length;
  const drafts = items.filter(v => v.status === 'draft').length;
  return <AdminShell>
    <main className="mx-auto w-[min(1440px,calc(100%-36px))] pb-24 pt-10 sm:w-[min(1440px,calc(100%-80px))] sm:pt-14">
      <div className="mb-9 flex flex-wrap items-center justify-between gap-5">
        <div><p className="mb-2 text-[13px] font-semibold uppercase tracking-[.18em] text-gold-dark">Painel administrativo</p><h1 className="font-sans text-[clamp(32px,4vw,52px)] font-semibold tracking-tight">Gestão de veículos</h1><p className="mt-2 text-[16px] text-ink/65">Cadastre, atualize e publique veículos na garagem.</p></div>
        <button type="button" onClick={() => void signOut()} className="inline-flex min-h-12 items-center gap-2 border border-ink/20 px-5 text-[15px] font-medium text-ink/70 hover:border-ink/60"><LogOut size={18} /> Sair</button>
      </div>

      {notice && <p role="status" className="mb-6 border border-gold/50 bg-[#eee9dc] px-5 py-4 text-[15px] text-ink">{notice}</p>}
      {error && <p role="alert" className="mb-6 border border-red-300 bg-red-50 px-5 py-4 text-[15px] text-red-800">{error}</p>}
      {editing !== undefined ? <div className="bg-white p-5 shadow-[0_15px_50px_rgba(20,17,10,.05)] sm:p-9"><AdminVehicleForm vehicle={editing} saving={saving} onSave={save} onClose={() => setEditing(undefined)} /></div> : <>
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[{ label: 'Total cadastrado', value: items.length, icon: CarFront }, { label: 'Publicados', value: published, icon: ShieldCheck }, { label: 'Rascunhos', value: drafts, icon: Clock3 }].map(({label,value,icon:Icon}) => <div key={label} className="border border-ink/10 bg-white p-6"><Icon className="mb-5 text-gold-dark" size={23} /><span className="block text-[35px] font-semibold leading-none">{value}</span><span className="mt-3 block text-[15px] text-ink/60">{label}</span></div>)}
        </div>
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-[24px] font-semibold">Veículos cadastrados</h2>
          <button onClick={() => { setNotice(''); setEditing(null); }} className="inline-flex min-h-13 items-center gap-3 bg-night px-6 text-[15px] font-semibold text-gold-light hover:bg-[#333631]"><CirclePlus size={18} /> Cadastrar veículo</button>
        </div>
        {loading ? <p role="status" className="py-14 text-[17px] text-ink/65">Carregando veículos...</p> : items.length === 0 ? <div className="border border-dashed border-ink/20 bg-white px-6 py-16 text-center"><CarFront className="mx-auto text-gold-dark" size={36} /><h3 className="mt-5 text-2xl font-semibold">Nenhum veículo cadastrado</h3><p className="mt-3 text-[16px] text-ink/65">Cadastre o primeiro veículo. Ele ficará como rascunho até você publicar.</p></div> :
        <div className="overflow-hidden border border-ink/10 bg-white">
          <ul className="divide-y divide-ink/10">
            {items.map(vehicle => <li key={vehicle.id} className="flex flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-7">
              {vehicle.image ? <img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} className="h-28 w-full shrink-0 object-cover sm:h-23 sm:w-36" loading="lazy" /> : <div className="flex h-23 w-36 shrink-0 items-center justify-center bg-cream text-ink/35"><CarFront size={28}/></div>}
              <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-3"><h3 className="text-[20px] font-semibold">{vehicle.make} {vehicle.model}</h3><span className={`px-2.5 py-1 text-[12px] font-bold ${vehicle.status === 'published' ? 'bg-[#e8efe8] text-[#335b35]' : vehicle.status === 'sold' ? 'bg-[#eee9df] text-ink/65' : 'bg-[#fff0cf] text-[#7b5b22]'}`}>{statusLabel[vehicle.status]}</span></div><p className="mt-1 text-[15px] text-ink/65">{vehicle.trim} · {vehicle.year || 'Ano não informado'} · {vehicle.km || 'KM não informado'}</p><p className="mt-2 text-[18px] font-semibold">{formatPrice(vehicle.price)}</p></div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                {vehicle.status === 'draft' && <button type="button" disabled={saving} onClick={() => void publish(vehicle)} className="inline-flex min-h-11 items-center gap-2 bg-gold px-4 text-[14px] font-semibold text-night transition-colors hover:bg-gold-light disabled:opacity-50"><ShieldCheck size={16} /> Publicar</button>}
                {vehicle.status === 'published' && <a href={`/?veiculo=${encodeURIComponent(vehicle.id)}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 border border-ink/15 px-3 text-[14px] font-semibold hover:border-gold-dark">Visualizar <ArrowUpRight size={16}/></a>}
                <button onClick={() => { setNotice(''); setEditing(vehicle); }} className="inline-flex min-h-11 items-center gap-2 border border-ink/15 px-3 text-[14px] font-semibold hover:border-gold-dark"><Pencil size={16}/> Editar</button>
                <button onClick={() => void remove(vehicle)} className="inline-flex min-h-11 items-center gap-2 border border-red-200 px-3 text-[14px] font-semibold text-red-700 hover:bg-red-50"><Trash2 size={16}/> Excluir</button>
              </div>
            </li>)}
          </ul>
        </div>}
        <div className="mt-8 flex items-center gap-2 text-[13px] text-ink/55"><ArrowLeft size={15} /><span>Somente veículos publicados aparecem no site. Rascunhos e vendidos ficam restritos ao painel.</span></div>
      </>}
    </main>
  </AdminShell>;
}

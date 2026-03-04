import { useState, useEffect } from "react";
import { supabase, Resource } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { topics } from "@/data/topics";
import { Trash2, Upload, LogIn, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";

const Admin = () => {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<Resource[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  // Upload form state
  const [title, setTitle] = useState("");
  const [year, setYear] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) fetchResources();
  }, [session]);

  const fetchResources = async () => {
    const { data } = await supabase.from("resources").select("*").order("created_at", { ascending: false });
    setResources((data as Resource[]) || []);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) toast({ title: "Erro de autenticação", description: error.message, variant: "destructive" });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !year || !topic || !type) {
      toast({ title: "Preenche todos os campos", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = `${year}/${topic}/${fileName}`;

      const { error: uploadError } = await supabase.storage.from("pdfs").upload(filePath, file, { contentType: "application/pdf" });
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from("pdfs").getPublicUrl(filePath);

      const { error: insertError } = await supabase.from("resources").insert({
        title,
        year: Number(year),
        topic,
        type,
        file_url: publicUrl,
        file_name: file.name,
      });
      if (insertError) throw insertError;

      toast({ title: "Recurso adicionado com sucesso!" });
      setTitle(""); setYear(""); setTopic(""); setType(""); setFile(null);
      fetchResources();
    } catch (err: any) {
      toast({ title: "Erro ao carregar", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (resource: Resource) => {
    if (!confirm(`Eliminar "${resource.title}"?`)) return;
    try {
      // Extract file path from URL
      const url = new URL(resource.file_url);
      const pathParts = url.pathname.split("/storage/v1/object/public/pdfs/");
      if (pathParts[1]) {
        await supabase.storage.from("pdfs").remove([decodeURIComponent(pathParts[1])]);
      }
      await supabase.from("resources").delete().eq("id", resource.id);
      toast({ title: "Recurso eliminado" });
      fetchResources();
    } catch (err: any) {
      toast({ title: "Erro ao eliminar", description: err.message, variant: "destructive" });
    }
  };

  const filteredTopics = year ? topics.filter(t => t.year === Number(year)) : [];

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p>A carregar...</p></div>;

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 bg-card p-8 rounded-xl border shadow-card">
            <h1 className="text-xl font-bold text-center text-primary">Painel Administrativo</h1>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full gap-2">
              <LogIn className="h-4 w-4" /> Entrar
            </Button>
          </form>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 section-spacing">
        <div className="container-narrow">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-primary">Gestão de Recursos</h1>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" /> Sair
            </Button>
          </div>

          {/* Upload Form */}
          <form onSubmit={handleUpload} className="bg-card p-6 rounded-xl border shadow-card mb-8 space-y-4">
            <h2 className="font-semibold text-lg">Adicionar Recurso</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Ficha de Trigonometria #1" />
              </div>
              <div>
                <Label>Ano</Label>
                <Select value={year} onValueChange={v => { setYear(v); setTopic(""); }}>
                  <SelectTrigger><SelectValue placeholder="Selecionar ano" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10º Ano</SelectItem>
                    <SelectItem value="11">11º Ano</SelectItem>
                    <SelectItem value="12">12º Ano</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Tema</Label>
                <Select value={topic} onValueChange={setTopic} disabled={!year}>
                  <SelectTrigger><SelectValue placeholder="Selecionar tema" /></SelectTrigger>
                  <SelectContent>
                    {filteredTopics.map(t => (
                      <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Tipo</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger><SelectValue placeholder="Selecionar tipo" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ficha">Ficha de Exercícios</SelectItem>
                    <SelectItem value="guia">Guia de Teoria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="file">Ficheiro PDF</Label>
              <Input id="file" type="file" accept=".pdf" onChange={e => setFile(e.target.files?.[0] || null)} />
            </div>
            <Button type="submit" disabled={uploading} className="gap-2">
              <Upload className="h-4 w-4" /> {uploading ? "A carregar..." : "Carregar PDF"}
            </Button>
          </form>

          {/* Resources List */}
          <div className="space-y-2">
            <h2 className="font-semibold text-lg mb-4">Recursos Carregados ({resources.length})</h2>
            {resources.length === 0 ? (
              <p className="text-muted-foreground text-sm">Nenhum recurso carregado ainda.</p>
            ) : (
              resources.map(r => (
                <div key={r.id} className="flex items-center gap-4 bg-card border rounded-lg p-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{r.title}</p>
                    <p className="text-xs text-muted-foreground">{r.year}º Ano · {r.type === "ficha" ? "Ficha" : "Guia"} · {r.topic}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(r)} className="shrink-0 text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;

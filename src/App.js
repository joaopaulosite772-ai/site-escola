import React, { useState, useEffect } from 'react';
import { Calendar, Bell, Video, ChevronRight, Users, X, Play, Menu, Star, BookOpen, Megaphone } from 'lucide-react';
import './App.css';

const cronogramaManha = [
  { data: '25/05', dia: 'Segunda', atividades: [{ nome: 'Dinâmicas sobre Empatia', turmas: '1ºA ao 1ºE' }] },
  { data: '26/05', dia: 'Terça', atividades: [{ nome: 'Palestra com Psicóloga', turmas: '1ºA ao 1ºE' }, { nome: 'Preparação Teatro / Júri Simulado (ensaio)', turmas: '3º anos' }] },
  { data: '27/05', dia: 'Quarta', atividades: [{ nome: 'Oficinas de Comunicação Não Violenta', turmas: '1ºA ao 1ºE' }, { nome: 'Dinâmicas sobre Empatia', turmas: '3º ADM / 3º DS / 3ºA ao 3ºD' }, { nome: 'Ensaio final teatro', turmas: '3º anos' }] },
  { data: '28/05', dia: 'Quinta', atividades: [{ nome: 'Teatro – Júri Simulado', turmas: '3º ADM / 3º DS / 3ºA ao 3ºD' }, { nome: 'Dinâmicas sobre Empatia', turmas: '2ºA ao 2ºE' }] },
  { data: '29/05', dia: 'Sexta', atividades: [{ nome: 'Compromisso da Paz + Mural Interativo + Encerramento', turmas: 'Todas as turmas' }] },
];

const cronogramaTarde = [
  { data: '25/05', dia: 'Segunda', atividades: [{ nome: 'Dinâmicas sobre Empatia', turmas: '6º anos' }] },
  { data: '26/05', dia: 'Terça', atividades: [{ nome: 'Palestra com Psicóloga', turmas: '9º anos' }, { nome: 'Dinâmicas sobre Empatia', turmas: '7º anos' }] },
  { data: '27/05', dia: 'Quarta', atividades: [{ nome: 'Dinâmicas sobre Empatia', turmas: '8º anos' }] },
  { data: '28/05', dia: 'Quinta', atividades: [{ nome: 'Dinâmicas sobre Empatia', turmas: '9º anos' }] },
  { data: '29/05', dia: 'Sexta', atividades: [{ nome: 'Produção de mensagens para o Mural + Compromisso da Paz', turmas: 'Todas as turmas' }] },
];

const avisos = [
  { id: 1, titulo: 'Semana da Não Violência – 25 a 29 de Maio', corpo: 'Nossa escola promoverá uma semana inteira dedicada à cultura de paz, empatia e comunicação não violenta. Todos os alunos participarão de atividades especiais conforme cronograma.', tag: 'Importante', cor: '#e8c547', data: '22/05/2025' },
  { id: 2, titulo: 'Palestra com Psicóloga – Terça-feira 26/05', corpo: 'Profissional especializada em saúde mental adolescente conduzirá palestra interativa sobre empatia, convivência e gestão emocional para as turmas do 1º ano (manhã) e 9º anos (tarde).', tag: 'Palestra', cor: '#7eb8f7', data: '22/05/2025' },
  { id: 3, titulo: 'Teatro e Júri Simulado – Quinta-feira 28/05', corpo: 'Os alunos do 3º ano apresentarão peça teatral e júri simulado abordando temas de violência e resolução pacífica de conflitos. Confirme presença com sua turma.', tag: 'Evento', cor: '#f7a07e', data: '22/05/2025' },
  { id: 4, titulo: 'Encerramento e Mural da Paz – Sexta 29/05', corpo: 'Todas as turmas participarão do encerramento da semana com o "Compromisso da Paz", mural interativo e cerimônia de encerramento. Atividade obrigatória para todos.', tag: 'Encerramento', cor: '#87d4a0', data: '22/05/2025' },
];

const videos = [
  { id: 1, titulo: 'Abertura – Semana da Não Violência 2024', desc: 'Vídeo oficial de abertura com mensagem da direção e apresentação do projeto.', url: '', duracao: '3:42' },
  { id: 2, titulo: 'Dinâmicas de Empatia em sala', desc: 'Registro das atividades de empatia realizadas com os alunos do 1º ano.', url: '', duracao: '5:18' },
  { id: 3, titulo: 'Depoimentos – Alunos falam sobre paz', desc: 'Alunos compartilham o que aprenderam durante a semana especial.', url: '', duracao: '4:05' },
  { id: 4, titulo: 'Teatro – Júri Simulado (completo)', desc: 'Apresentação completa do teatro e júri simulado pelos alunos do 3º ano.', url: '', duracao: '18:30' },
];

function Tag({ label, cor }) {
  return <span className="tag" style={{ background: cor + '22', color: cor, borderColor: cor + '55' }}>{label}</span>;
}

function AvisoCard({ aviso, onClick }) {
  return (
    <div className="aviso-card" onClick={() => onClick(aviso)}>
      <div className="aviso-accent" style={{ background: aviso.cor }} />
      <div className="aviso-body">
        <div className="aviso-top">
          <Tag label={aviso.tag} cor={aviso.cor} />
          <span className="aviso-data">{aviso.data}</span>
        </div>
        <h3 className="aviso-titulo">{aviso.titulo}</h3>
        <p className="aviso-corpo">{aviso.corpo.slice(0, 90)}…</p>
        <button className="aviso-btn">Ler mais <ChevronRight size={14} /></button>
      </div>
    </div>
  );
}

function Modal({ aviso, onClose }) {
  useEffect(() => {
    const h = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
        <Tag label={aviso.tag} cor={aviso.cor} />
        <h2 className="modal-titulo">{aviso.titulo}</h2>
        <p className="modal-data">{aviso.data}</p>
        <p className="modal-corpo">{aviso.corpo}</p>
      </div>
    </div>
  );
}

function CronogramaSection() {
  const [periodo, setPeriodo] = useState('manha');
  const dados = periodo === 'manha' ? cronogramaManha : cronogramaTarde;
  const hoje = new Date();
  return (
    <section className="section" id="cronograma">
      <div className="section-header">
        <div className="section-label"><Calendar size={16} /> Mural de Eventos</div>
        <h2 className="section-title">Cronograma — Semana da Não Violência</h2>
      </div>
      <div className="periodo-toggle">
        <button className={`toggle-btn ${periodo === 'manha' ? 'active' : ''}`} onClick={() => setPeriodo('manha')}>☀️ Manhã</button>
        <button className={`toggle-btn ${periodo === 'tarde' ? 'active' : ''}`} onClick={() => setPeriodo('tarde')}>🌤️ Tarde</button>
      </div>
      <div className="cronograma-grid">
        {dados.map((dia) => {
          const [d, m] = dia.data.split('/').map(Number);
          const isToday = d === hoje.getDate() && m === hoje.getMonth() + 1;
          return (
            <div key={dia.data} className={`dia-card ${isToday ? 'today' : ''}`}>
              <div className="dia-header">
                <div><span className="dia-num">{dia.data}</span><span className="dia-nome">{dia.dia}</span></div>
                {isToday && <span className="hoje-badge">Hoje</span>}
              </div>
              <div className="dia-atividades">
                {dia.atividades.map((at, i) => (
                  <div key={i} className="atividade-item">
                    <div className="at-dot" />
                    <div>
                      <div className="at-nome">{at.nome}</div>
                      <div className="at-turmas"><Users size={11} /> {at.turmas}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function VideosSection() {
  const [active, setActive] = useState(null);
  return (
    <section className="section" id="videos">
      <div className="section-header">
        <div className="section-label"><Video size={16} /> Vídeos da Escola</div>
        <h2 className="section-title">Galeria de Vídeos</h2>
        <p className="section-sub">Registros das atividades e momentos especiais da nossa escola.</p>
      </div>
      <div className="videos-grid">
        {videos.map((v) => (
          <div key={v.id} className="video-card" onClick={() => setActive(v)}>
            <div className="video-thumb">
              <div className="video-play-btn"><Play size={28} fill="white" /></div>
              <div className="video-duracao">{v.duracao}</div>
              <div className="video-num">#{v.id.toString().padStart(2, '0')}</div>
            </div>
            <div className="video-info">
              <h4 className="video-titulo">{v.titulo}</h4>
              <p className="video-desc">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
      {active && (
        <div className="modal-overlay" onClick={() => setActive(null)}>
          <div className="modal-box video-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActive(null)}><X size={20} /></button>
            <div className="video-embed-area">
              {active.url ? (
                <iframe src={active.url} title={active.titulo} frameBorder="0" allowFullScreen style={{ width: '100%', height: '100%' }} />
              ) : (
                <div className="video-placeholder">
                  <Play size={48} />
                  <p>Adicione a URL do vídeo no <code>App.js</code></p>
                </div>
              )}
            </div>
            <h3 style={{ marginTop: 16, color: '#f0f0f0' }}>{active.titulo}</h3>
            <p style={{ color: '#8a8fa8', marginTop: 4 }}>{active.desc}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default function App() {
  const [modalAviso, setModalAviso] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="app">
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-brand"><BookOpen size={22} className="nav-icon" /><span>Escola <em>Viva</em></span></div>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <button onClick={() => scrollTo('avisos')}>Avisos</button>
          <button onClick={() => scrollTo('cronograma')}>Cronograma</button>
          <button onClick={() => scrollTo('videos')}>Vídeos</button>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}><Menu size={22} /></button>
      </nav>

      <header className="hero">
        <div className="hero-bg">
          <div className="hero-circle c1" /><div className="hero-circle c2" /><div className="hero-circle c3" />
          <div className="hero-lines" />
        </div>
        <div className="hero-content">
          <div className="hero-label"><Star size={12} fill="currentColor" /> 25 a 29 de Maio · 2025</div>
          <h1 className="hero-titulo">Semana da<br /><em>Não Violência</em></h1>
          <p className="hero-sub">Uma semana dedicada à cultura de paz, empatia e comunicação não violenta. Juntos construímos um ambiente melhor para todos.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo('cronograma')}>Ver Cronograma <ChevronRight size={16} /></button>
            <button className="btn-ghost" onClick={() => scrollTo('avisos')}>Avisos <Bell size={15} /></button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat"><span className="stat-num">5</span><span className="stat-label">Dias</span></div>
          <div className="stat-div" />
          <div className="stat"><span className="stat-num">12+</span><span className="stat-label">Atividades</span></div>
          <div className="stat-div" />
          <div className="stat"><span className="stat-num">Todas</span><span className="stat-label">as turmas</span></div>
        </div>
      </header>

      <main className="main">
        <section className="section" id="avisos">
          <div className="section-header">
            <div className="section-label"><Megaphone size={16} /> Comunicados</div>
            <h2 className="section-title">Avisos & Notícias</h2>
            <p className="section-sub">Fique por dentro de tudo que acontece na escola.</p>
          </div>
          <div className="avisos-grid">
            {avisos.map(a => <AvisoCard key={a.id} aviso={a} onClick={setModalAviso} />)}
          </div>
        </section>
        <CronogramaSection />
        <VideosSection />
      </main>

      <footer className="footer">
        <BookOpen size={18} />
        <span>Escola Viva · {new Date().getFullYear()} · Semana da Não Violência</span>
      </footer>

      {modalAviso && <Modal aviso={modalAviso} onClose={() => setModalAviso(null)} />}
    </div>
  );
}

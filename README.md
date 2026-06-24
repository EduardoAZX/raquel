# Dra. Raquel Almeida — Landing Page

Landing page de captação de leads para a **Dra. Raquel Almeida**, especialista em **Otomodelação** e responsável pelo método autoral **Otoslim** (correção de orelhas de abano sem cirurgia).

---

## 📁 Estrutura de pastas

```
Dra Raquel/
├── index.html         # Estrutura semântica das 5 dobras
├── style.css          # Design system + componentes + responsividade
├── app.js             # Reveals, máscara de WhatsApp, submit do form
├── pixel.php          # (a implementar) endpoint server-side p/ Meta CAPI
├── README.md          # Este arquivo
└── img/
    ├── img.png        # Hero — desktop (foto Dra. Raquel postura de autoridade)
    ├── imgmb.png      # Hero — mobile (crop vertical)
    ├── dra-raquel-editorial.jpg  # Foto editorial para a seção "Sobre"
    ├── antes-01..04.jpg          # Antes/depois — lado A
    └── depois-01..04.jpg         # Antes/depois — lado B
```

> Enquanto as imagens não estão na pasta `img/`, a página mostra **placeholders monoespaçados** indicando exatamente o nome esperado do arquivo.

---

## 🎨 Design system

| Token            | Valor       | Uso                                        |
|------------------|-------------|--------------------------------------------|
| `--c-primary`    | `#F7CBA1`   | Botões, badges, destaques, gradiente quente|
| `--c-secondary`  | `#E0DFD5`   | Fundos sutis, placeholders                 |
| `--c-accent`     | `#090B0B`   | Texto principal, CTA escuro, rodapé        |
| `--c-bg`         | `#FFFFFF`   | Fundo padrão                               |
| `--c-text`       | `#090B0B`   | Texto                                      |

- **Fonte:** Open Sans (300/400/500/600/700/800) — via Google Fonts.
- **Mono:** JetBrains Mono — apenas para tags de placeholders.
- **Efeitos:** glassmorphism (`backdrop-filter: blur`), sombras suaves em camadas (`--shadow-sm/md/lg/glow`), gradiente quente nas CTAs e fundos radiais.
- **Favicon:** SVG inline com iniciais **DR** sobre o tom primário.

---

## 🧩 Seções da LP

### 🟠 Dobra 1 — Hero
- **Arquivos:** `index.html` (linhas ~50-115), `styles.css` (`.hero*`)
- **Imagens:** `img/img.png` (desktop), `img/imgmb.png` (mobile)
- **Funcionalidade:** headline impactante, subheadline com o método Otoslim, CTA primário (`#agendar`) e CTA fantasma (`#resultados`). Foto à direita com badge "+1.200 vidas transformadas" em glass e chip "Procedimento em consultório".
- **Notas:** se `img/img.png` não existir, a área da foto cai em placeholder estriado automaticamente (via `onerror`).

### 🟠 Dobra 2 — Prova Social
- **Arquivos:** `index.html` (linhas ~130-220), `styles.css` (`.proof`, `.ba-grid`, `.ba-card`, `.seal`)
- **Imagens:** `img/antes-0[1-4].jpg` e `img/depois-0[1-4].jpg` — formato vertical 4:5, foco na orelha.
- **Funcionalidade:** grid 2×2 de pares antes/depois com legenda; selo de autoridade "+1.200 vidas transformadas" com CTA escuro.

### 🟠 Dobra 3 — Formulário (captação)
- **Arquivos:** `index.html` (linhas ~225-300), `styles.css` (`.form-section`, `.lead-form`), `script.js` (submit + máscara WhatsApp)
- **Campos:** Nome, WhatsApp (com máscara `(00) 00000-0000`), Quem realizará o procedimento (select com 3 opções).
- **Funcionalidade:** validação client-side; ao enviar mostra mensagem de sucesso. Hooks comentados para `fbq('track','Lead')` e POST para `pixel.php`.

### 🟠 Dobra 4 — Sobre a Mentora
- **Arquivos:** `index.html` (linhas ~305-360), `styles.css` (`.about*`)
- **Imagens:** `img/dra-raquel-editorial.jpg` (estilo editorial, close ou atendimento).
- **Funcionalidade:** copy de autoridade + 3 stats (pacientes, anos de atuação, método Otoslim) + CTA escuro. Card de "assinatura clínica" sobreposto.

### 🟠 Dobra 5 — Rodapé
- **Arquivos:** `index.html` (linhas ~365-400), `styles.css` (`.footer*`)
- **Conteúdo:** marca, endereço (placeholder), links (Instagram, WhatsApp, Política de Privacidade) e copyright dinâmico (ano via `script.js`).

---

## 🔌 Integrações

### Meta Pixel
1. Substituir `YOUR_PIXEL_ID` em `index.html` (`<script>` no `<head>`).
2. Descomentar as linhas `fbq('init', ...)` e `fbq('track', 'PageView')`.
3. No envio do formulário (`script.js`), descomentar `fbq('track', 'Lead')`.

### Meta Conversions API (server-side)
- Criar `pixel.php` (sugestão de stack):
  - `filter_var($_POST['nome'], FILTER_SANITIZE_FULL_SPECIAL_CHARS)`
  - Hash SHA-256 do telefone antes de enviar
  - `cURL` para `https://graph.facebook.com/v18.0/{PIXEL_ID}/events`
  - Token de acesso em variável de ambiente
- Atualizar `script.js`: `fetch('pixel.php', { method:'POST', body: new FormData(form) })`.

### Google Analytics
- Adicionar tag `gtag.js` no `<head>` (placeholder a ser substituído).

---

## 📱 Responsividade

| Faixa                | Comportamento                                          |
|----------------------|--------------------------------------------------------|
| **≥ 1024px**         | Layouts em 2 colunas (hero, form, about); grid 2×2 nas provas |
| **768–1023px**       | Mesmas grids mantidas, com `clamp()` reduzindo gaps    |
| **≤ 880px**          | Hero, form e about colapsam para 1 coluna              |
| **≤ 760px**          | Grid de provas vira 1 coluna; selo vira vertical       |
| **≤ 520px**          | Stats da seção sobre viram 1 coluna                    |

Testado em: Chrome DevTools (375 / 414 / 768 / 1024 / 1440), Firefox e Safari.

---

## 🔒 Segurança

- Inputs **sanitize** em `pixel.php` (a implementar) com `filter_var()` + `htmlspecialchars()` na saída.
- Validação client-side (em `script.js`) e server-side obrigatória.
- Proteção contra **XSS**: nenhum `innerHTML` dinâmico no front; toda renderização via `textContent`.
- Proteção contra **CSRF**: gerar token no `pixel.php` (`bin2hex(random_bytes(32))`) e validar no submit.
- Links externos (fontes Google) via HTTPS com `crossorigin`.

---

## ✅ Checklist de validação

- [ ] HTML validado no W3C Validator.
- [ ] CSS validado no Jigsaw.
- [ ] Sem erros de console no Chrome / Firefox.
- [ ] Meta Pixel testado no **Meta Pixel Helper**.
- [ ] Imagens otimizadas em `.webp` (qualidade 80–85).
- [ ] Lighthouse: Performance ≥ 90 / Acessibilidade ≥ 95.

---

## 🤝 Como contribuir

- **Adicionar uma nova seção:** crie o markup dentro de `index.html` entre duas dobras existentes, atribua um `data-screen-label="NN Nome"` e adicione as classes ao final de `styles.css` seguindo o padrão `.nome-secao__elemento`.
- **Mudar a paleta:** edite as custom properties no topo de `styles.css` (`:root`).
- **Mudar copy:** todas as strings estão diretamente em `index.html` — sem CMS / template engine.

---

© 2026 Dra. Raquel — Todos os direitos reservados.

# Dra. Raquel Almeida · Landing Page

Landing page estática (HTML + CSS, sem framework) para captação de leads da
**Dra. Raquel Almeida · Otomodelação · Método Otoslim**.

---

## 📁 Estrutura de arquivos

```
Raquel/
├── index.html              → página principal (hero, antes/depois, formulário, sobre, FAQ)
├── obrigado.html           → página de agradecimento (pós-envio do formulário)
├── styles.css              → todos os estilos (tokens de tema, layout, responsivo)
├── .htaccess               → regras de URL (remove .html, serve em subpasta)
├── assets/                 → imagens herdadas (NÃO usadas — substituídas por placeholders)
└── meta-capi/              → Pixel + CAPI em PHP puro
    ├── capi.php
    └── capi.js
```

---

## 🖼️ Imagens (placeholders)

Todas as imagens do site (3 cards de antes/depois, foto da doutora e fundo do hero)
usam **placeholders em gradiente** com o rótulo "Foto em breve".

- Os `.png` herdados continuam na pasta `assets/`, mas **não são referenciados**
  por nenhum HTML/CSS (podem ser removidos quando as fotos definitivas chegarem).
- Quando as fotos da Dra. Raquel chegarem, basta inserir as novas imagens e
  reconectar os trechos (cards em `index.html` e o `.hero-bg-img` em `styles.css`).

---

## 🚀 Como o site é publicado (IMPORTANTE)

O site **não fica na raiz do domínio**. Ele é enviado para uma **subpasta** dentro
de `public_html`, ao lado de um **WordPress que ocupa a raiz** (mesmo modelo dos
outros projetos).

```
public_html/
├── (WordPress: wp-admin, wp-content, wp-includes, ...)  ← raiz do domínio
└── subpasta/        ← AQUI vão os arquivos desta landing
    ├── index.html
    ├── obrigado.html
    ├── styles.css
    ├── .htaccess
    ├── assets/
    └── meta-capi/
```

Portanto a landing abre em `dominio.com.br/subpasta/` e a página de obrigado em
`dominio.com.br/subpasta/obrigado`. **Testar `/obrigado` na raiz dá 404** — lá é o
WordPress, não esta landing.

> Ao subir arquivos, envie **todos** (incl. `.htaccess`, que é oculto — ligue
> "mostrar arquivos ocultos" no Gerenciador de Arquivos/FTP).

---

## 🔗 .htaccess · URLs limpas

O `.htaccess` faz, com caminhos **relativos** (funciona em qualquer subpasta e nunca
redireciona pra raiz / WordPress):

1. Remove a extensão: `/subpasta/obrigado.html` → `/subpasta/obrigado`
2. Serve internamente o arquivo: `/subpasta/obrigado` entrega `obrigado.html`

---

## 📨 Formulário → Make → Planilha

O formulário (`#contactForm` no `index.html`) envia por `fetch` (POST JSON) para um
**webhook do Make**. A URL ainda é um placeholder — substituir antes do deploy:

```
YOUR_MAKE_WEBHOOK_URL
```

Campos enviados no payload:

| Campo          | Origem                             |
|----------------|------------------------------------|
| `nome`         | input `#form-name`                 |
| `telefone`     | input `#form-whatsapp`             |
| `email`        | input `#form-email`                |
| `procedimento` | select `#form-procedure`           |
| `origem`       | URL da página                      |
| `data`         | data do envio (ex: `12 jun. 2026`) |
| `hora`         | hora do envio (ex: `09h30`)        |

Opções do select: **Eu mesmo(a) · Meu filho(a) · Outra pessoa** (quem realizará o
procedimento).

O mapeamento desses campos para as colunas da planilha (Google Sheets) é feito
**dentro do cenário do Make**, não no código.

Após o envio bem-sucedido, o usuário é redirecionado para **`obrigado`** (URL limpa).

---

## 🙏 Página de obrigado

`obrigado.html` mostra a confirmação e um botão **"Falar pelo WhatsApp agora"**
(`wa.me/...`) com mensagem pré-preenchida, além de um botão "Voltar para o site".
O número está como placeholder `55XXXXXXXXXXX` — trocar pelo WhatsApp real da Dra. Raquel.

---

## 🎨 Tema e identidade visual

- Tema **claro por padrão** (`<html data-theme="light">`).
- A preferência do usuário é salva em `localStorage` na chave `raquel-theme`.
- Botão de alternância (sol/lua) no menu — o tema escuro continua disponível.
- **Paleta pêssego/cobre** em degradê (token `--gold-grad`):
  - Pêssego `#EDBC8E` · médio `#E09E65` · cobre `#9B5A22`, sobre fundo creme `#FDFAF5`.
- Fontes: **Playfair Display** (títulos, serifada) + **Montserrat** (texto).

---

## 📊 Rastreamento

Todas as chaves de rastreamento estão como **placeholders** — substituir pelos IDs
reais da Dra. Raquel antes do deploy:

- **Google Tag Manager:** container `GTM-XXXXXXX` no `<head>`.
- **Meta Pixel + Conversions API:** Pixel ID `YOUR_PIXEL_ID`.
  - Dispara **PageView** e **Lead** (após o envio bem-sucedido do formulário) com
    **deduplicação por `event_id`** (navegador + CAPI), faz **hash SHA-256** do
    e-mail/telefone no navegador e tem **rate limiting** por IP.
  - O **token da CAPI fica só no servidor** (`meta-capi/capi.php`, constante
    `GEO_CAPI_TOKEN` = `YOUR_CAPI_TOKEN`), nunca no navegador.

A integração usa `meta-capi/` (PHP puro), já chamada pelo `index.html` via `capi.js`.

---

## ✅ Pendências / a confirmar

- [ ] **WhatsApp da Dra. Raquel** — `obrigado.html` está com `55XXXXXXXXXXX`. Trocar pelo número real.
- [ ] **Webhook do Make** — criar o cenário e substituir `YOUR_MAKE_WEBHOOK_URL` no `index.html`.
- [ ] **GTM** — criar/colar o container real no lugar de `GTM-XXXXXXX` (`index.html` e `obrigado.html`).
- [ ] **Meta Pixel** — substituir `YOUR_PIXEL_ID` (`index.html`, `obrigado.html` e `meta-capi/capi.php`).
- [ ] **Token da CAPI** — gerar no Gerenciador de Eventos e substituir `YOUR_CAPI_TOKEN` no `meta-capi/capi.php`.
- [ ] **Fotos da Dra. Raquel** — hoje o site usa placeholders. Inserir as imagens reais (antes/depois, foto da doutora, fundo do hero) e remover os `.png` herdados de `assets/`.
- [ ] **Conteúdo a confirmar com a Dra.** — textos de FAQ, credenciais (+1.200 pacientes, +8 anos) e endereço/registro profissional.
- [ ] **Domínio + subpasta de produção** — confirmar a URL de publicação.
- [ ] **SSL** — confirmar certificado ativo antes de forçar HTTPS.

---

## 🛠️ Rodar localmente

Sirva a pasta com um servidor estático (ex.: `python -m http.server`).
Obs.: o servidor estático local **ignora o `.htaccess`**, então as URLs limpas
(`/obrigado` sem `.html`) só funcionam no servidor de produção (Apache). O endpoint
PHP (`meta-capi/capi.php`) também só roda num servidor com PHP.

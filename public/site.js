/* Tiny progressive enhancements. No analytics, cookies, API calls, or UI framework. */
(() => {
  const ja = document.documentElement.lang === 'ja';
  const themeButton = document.querySelector('.theme-toggle');
  function syncTheme() {
    const dark = document.documentElement.dataset.theme === 'dark';
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    themeButton?.setAttribute('aria-pressed', String(dark));
    themeButton?.setAttribute('aria-label', ja ? (dark ? 'ライトモードにする' : 'ダークモードにする') : (dark ? 'Switch to light mode' : 'Switch to dark mode'));
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#171f1d' : '#fafaf8');
  }
  syncTheme();
  themeButton?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    try { localStorage.setItem('kanta-theme', next); } catch { /* storage may be disabled */ }
    syncTheme();
  });
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  systemTheme.addEventListener('change', ev => {
    let saved; try { saved = localStorage.getItem('kanta-theme'); } catch {}
    if (saved) return;
    document.documentElement.dataset.theme = ev.matches ? 'dark' : 'light'; syncTheme();
  });

  const filters = [...document.querySelectorAll('[data-filter]')];
  const rows = [...document.querySelectorAll('.post-list .post-row')];
  const query = new URLSearchParams(location.search);
  const tag = query.get('tag');
  function filterPosts(kind) {
    let count = 0;
    rows.forEach(row => {
      const match = (kind === 'all' || row.dataset.kind === kind) && (!tag || JSON.parse(row.dataset.tags || '[]').includes(tag));
      row.hidden = !match; if (match) count++;
    });
    filters.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === kind)));
    const status = document.querySelector('.filter-status');
    if (status) status.textContent = ja ? `${count}件の記事` : `${count} notes`;
    const empty = document.querySelector('.no-posts'); if (empty) empty.hidden = count !== 0;
  }
  if (filters.length) {
    filterPosts('all');
    filters.forEach(b => b.addEventListener('click', () => filterPosts(b.dataset.filter)));
  }

  document.querySelectorAll('.prose pre').forEach(pre => {
    const wrapper = document.createElement('div'); wrapper.className = 'code-wrap';
    pre.before(wrapper); wrapper.append(pre);
    const toolbar = document.createElement('div'); toolbar.className = 'code-toolbar';
    const language = document.createElement('span');
    const found = pre.querySelector('code')?.className.match(/language-([^ ]+)/);
    language.textContent = pre.dataset.language || found?.[1] || 'Code';
    const button = document.createElement('button'); button.type = 'button'; button.textContent = ja ? 'コピー' : 'Copy';
    button.setAttribute('aria-label', ja ? 'コードをコピー' : 'Copy code');
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pre.querySelector('code')?.textContent || pre.textContent || '');
        button.textContent = ja ? 'コピー済み' : 'Copied';
      } catch { button.textContent = ja ? '選択してコピーしてください' : 'Select text to copy'; }
      setTimeout(() => { button.textContent = ja ? 'コピー' : 'Copy'; }, 2000);
    });
    toolbar.append(language, button); wrapper.prepend(toolbar);
  });
  document.querySelectorAll('.prose table').forEach(table => {
    if (table.parentElement?.classList.contains('table-scroll')) return;
    const wrapper = document.createElement('div'); wrapper.className = 'table-scroll';
    wrapper.tabIndex = 0; wrapper.setAttribute('role','region'); wrapper.setAttribute('aria-label', ja ? '横にスクロールできる表' : 'Scrollable data table');
    table.before(wrapper); wrapper.append(table);
  });

  const viewer = document.querySelector('#image-viewer'); let previousFocus;
  document.querySelectorAll('.prose img').forEach(img => {
    if (img.closest('a')) return;
    const button = document.createElement('button'); button.className = 'zoom-image'; button.type = 'button';
    button.setAttribute('aria-label', (ja ? '画像を拡大: ' : 'Enlarge image: ') + (img.alt || 'Figure'));
    img.before(button); button.append(img);
    button.addEventListener('click', () => {
      if (!viewer) return;
      previousFocus = button;
      const target = viewer.querySelector('img'); target.src = img.currentSrc || img.src; target.alt = img.alt;
      viewer.showModal();
    });
  });
  viewer?.querySelector('.close-viewer')?.addEventListener('click', () => viewer.close());
  viewer?.addEventListener('click', ev => { if (ev.target === viewer) { const r=viewer.getBoundingClientRect(); if(ev.clientX<r.left||ev.clientX>r.right||ev.clientY<r.top||ev.clientY>r.bottom) viewer.close(); } });
  viewer?.addEventListener('close', () => previousFocus?.focus());

  document.querySelectorAll('[data-mixture-explorer]').forEach(root => {
    const web=root.querySelector('[data-web]'), code=root.querySelector('[data-code]');
    function update() {
      const w=Number(web.value); code.max=String(100-w); if(Number(code.value)>100-w) code.value=String(100-w);
      const c=Number(code.value), b=100-w-c;
      root.querySelector('[data-web-output]').textContent=`${w}%`;
      root.querySelector('[data-code-output]').textContent=`${c}%`;
      root.querySelector('[data-web-bar]').style.width=`${w}%`;
      root.querySelector('[data-books-bar]').style.width=`${b}%`;
      root.querySelector('[data-code-bar]').style.width=`${c}%`;
      root.querySelector('.mixture-summary').textContent=`Web ${w}% · Books ${b}% · Code ${c}%`;
    }
    web.addEventListener('input',update); code.addEventListener('input',update);
    root.querySelector('[data-mixture-reset]').addEventListener('click',()=>{web.value='50'; code.max='50';code.value='20';update();});
    update();
  });

  const tocLinks=[...document.querySelectorAll('.toc a')];
  if ('IntersectionObserver' in window && tocLinks.length) {
    const map=new Map(tocLinks.map(a=>[decodeURIComponent(a.hash.slice(1)),a]));
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries) if(entry.isIntersecting){tocLinks.forEach(a=>a.removeAttribute('aria-current'));map.get(entry.target.id)?.setAttribute('aria-current','true');}
    },{rootMargin:'-5% 0px -75% 0px'});
    document.querySelectorAll('.prose h2[id], .prose h3[id]').forEach(h=>observer.observe(h));
  }

  const input=document.querySelector('#search-input');
  document.addEventListener('keydown',ev=>{
    const typing=/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||'')||document.activeElement?.isContentEditable;
    if((ev.key==='k'&&(ev.metaKey||ev.ctrlKey))||(ev.key==='/'&&!typing)){
      ev.preventDefault(); if(input)input.focus();else location.href=ja?'/ja/search/':'/search/';
    }
    if(ev.key==='Escape')document.querySelectorAll('.mobile-nav[open]').forEach(d=>d.removeAttribute('open'));
  });
  if(input) {
    const form=input.closest('form'), list=document.querySelector('#search-results'), status=document.querySelector('#search-status');
    form.addEventListener('submit',ev=>{ev.preventDefault();search();});
    let indexPromise, pagefindPromise, serial=0, timer;
    const index=()=>indexPromise??=fetch('/search-index.json').then(r=>{if(!r.ok)throw Error('Search unavailable');return r.json();});
    // Production prefers Pagefind. The local preview has a deterministic JSON fallback.
    const engine=()=>pagefindPromise??=fetch('/pagefind/pagefind.js',{method:'HEAD'}).then(async r=>r.ok?import('/pagefind/pagefind.js'):null).catch(()=>null);
    function show(items){
      list.replaceChildren();
      for(const r of items){
        const article=document.createElement('article');article.className='search-hit';
        const label=document.createElement('span');label.textContent=(r.sample?(ja?'テスト記事 · ':'Test post · '):'')+(r.lang==='ja'?'日本語':'English');
        const h=document.createElement('h2'),a=document.createElement('a');a.href=r.url;a.textContent=r.title;h.append(a);
        const p=document.createElement('p');p.textContent=r.description;article.append(label,h,p);list.append(article);
      }
      status.textContent=ja?`${items.length}件の記事が見つかりました。`:`${items.length} ${items.length===1?'note':'notes'} found.`;
    }
    async function search(){
      const ticket=++serial, q=input.value.trim();const params=new URLSearchParams(location.search);q?params.set('q',q):params.delete('q');try { history.replaceState(null,'',location.pathname+(params.size?'?'+params:'')); } catch { /* sandboxed previews may not permit URL updates */ }
      if(!q){list.replaceChildren();status.textContent=ja?'検索語を入力してください。':'Start typing to search.';return;}
      status.textContent=ja?'検索中…':'Searching…';
      try{
        const entries=await index(), pf=await engine();let results;
        if(pf){const answer=await pf.search(q);const hits=await Promise.all(answer.results.slice(0,20).map(r=>r.data()));results=hits.map(h=>entries.find(e=>e.url===h.url||e.url===new URL(h.url,location.origin).pathname)).filter(Boolean);}
        else {const terms=q.toLocaleLowerCase().split(/\s+/);results=entries.filter(e=>{const all=[e.title,e.description,e.body,...e.tags].join(' ').toLocaleLowerCase();return terms.every(t=>all.includes(t));}).slice(0,30);}
        if(ticket===serial)show(results);
      }catch{if(ticket===serial)status.textContent=ja?'検索を読み込めません。記事一覧からご覧ください。':'Search could not load. You can still browse all writing.';}
    }
    input.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(search,160);});
    input.value=query.get('q')||'';if(input.value)search();
  }
})();

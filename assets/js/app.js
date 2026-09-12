/* ============================================================
   Malakhanim · Curl Master — demo site
   Plain JS, no build step, no backend.
   ============================================================ */
(() => {
'use strict';

/* ─────────────────────────── CONTENT ─────────────────────────── */

const SERVICES = [
  { id:'cut',    price:'80 ₼',  dur:90,  az:{n:'Buruq kəsim',        d:'Quru saçda, buruq-buruq kəsim. Saçınızın öz forması və sıxlığına görə qatlar qurulur.'},
                                          en:{n:'Curly cut',          d:'Cut dry, curl by curl. Layers built around your own curl pattern and density.'}, tags:['2c–4a'] },
  { id:'first',  price:'100 ₼', dur:120, az:{n:'İlk seans + məsləhət', d:'Buruq tipinin təyini, kəsim və evdə qulluq planı. İlk dəfə gələnlər üçün.'},
                                          en:{n:'First visit + consult',d:'Curl-type diagnosis, cut, and a home-care routine. For first-time clients.'}, tags:['yeni · new'] },
  { id:'color',  price:'150 ₼', dur:180, az:{n:'Buruq boyama',        d:'Balayaj, tonlama və ya kök boyası — buruğun strukturunu qorumaqla.'},
                                          en:{n:'Curly colour',        d:'Balayage, toning or root colour — applied to protect the curl structure.'}, tags:['balayaj'] },
  { id:'care',   price:'60 ₼',  dur:60,  az:{n:'Dərin qulluq',        d:'Nəmləndirici / protein maskası, buxar və diffuzorla qurutma.'},
                                          en:{n:'Deep treatment',      d:'Moisture or protein mask, steam, and a diffuser finish.'}, tags:['maska'] },
  { id:'style',  price:'45 ₼',  dur:45,  az:{n:'Yığım və styling',    d:'Tədbir üçün buruq yığımı və ya təbii formanın canlandırılması.'},
                                          en:{n:'Styling & updo',      d:'An event updo, or a refresh of your natural shape.'}, tags:['tədbir'] },
  { id:'lesson', price:'70 ₼',  dur:60,  az:{n:'Evdə qulluq dərsi',   d:'Yuma, məhsul miqdarı, plopping və diffuzor — özünüz edə biləsiniz deyə.'},
                                          en:{n:'Home-care lesson',    d:'Washing, product amounts, plopping and diffusing — so you can do it yourself.'}, tags:['1:1'] },
];

const WORK = [
  { pair:'p7', curl:'3c',    tags:['3c'],       az:'Qatlı kəsim', en:'Layered cut' },
  { pair:'p1', curl:'3b',    tags:['3b'],       az:'Qatlı kəsim', en:'Layered cut' },
  { pair:'p6', curl:'3b',    tags:['3b'],       az:'Qatlı kəsim', en:'Layered cut' },
  { pair:'p3', curl:'3a',    tags:['3a'],       az:'Qatlı kəsim', en:'Layered cut' },
  { pair:'p4', curl:'2c-3a', tags:['2c','3a'],  az:'Qatlı kəsim', en:'Layered cut' },
  { pair:'p2', curl:'2c',    tags:['2c'],       az:'Qatlı kəsim', en:'Layered cut' },
  { pair:'p5', curl:'2c',    tags:['2c'],       az:'Qatlı kəsim', en:'Layered cut' },
];

const FAQ_CATS = [
  { id:'all',   icon:'✦', az:'Hamısı',      en:'All' },
  { id:'first', icon:'🌀', az:'İlk dəfə',    en:'First visit' },
  { id:'price', icon:'💸', az:'Qiymətlər',   en:'Prices' },
  { id:'care',  icon:'💧', az:'Qulluq',      en:'Care' },
  { id:'color', icon:'🎨', az:'Boyama',      en:'Colour' },
  { id:'where', icon:'📍', az:'Yer və vaxt', en:'Place & time' },
];

const FAQ = [
  { cat:'first',
    az:{q:'Saçımı yuyub gəlim, yoxsa yox?',
        a:'Saçınızı seansdan 1–2 gün əvvəl yuyun və təbii formasında qurudun. Gələndə saç quru və açıq (yığılmamış) olmalıdır. Kəsimi quru saçda, hər buruğu ayrıca görərək edirəm — yaş saçda buruğun əsl uzunluğu və forması görünmür.'},
    en:{q:'Should I come with clean hair?',
        a:'Wash your hair 1–2 days before the session and let it dry in its natural shape. Come with it dry and loose, not tied up. I cut dry, curl by curl — wet hair hides the real length and shape of each curl.'} },
  { cat:'first',
    az:{q:'Buruq tipimi bilmirəm, problem olar?',
        a:'Xeyr. İlk seansda buruq tipini, məsaməliliyi və sıxlığı birlikdə təyin edirik. 2c, 3a, 3b, 3c — hərəsi fərqli kəsim və fərqli məhsul istəyir.'},
    en:{q:'I don’t know my curl type — is that a problem?',
        a:'Not at all. In the first session we determine curl type, porosity and density together. 2c, 3a, 3b, 3c — each one needs a different cut and different products.'} },
  { cat:'first',
    az:{q:'Saçım düzləşdirilib / keratin var. Gələ bilərəm?',
        a:'Bəli, amma əvvəlcə WhatsApp-dan quru saçınızın şəklini göndərin. Kimyəvi düzləşdirmədən sonra buruğun bərpası vaxt aparır — birlikdə plan qururuq.'},
    en:{q:'My hair is straightened / has keratin. Can I come?',
        a:'Yes, but send me a photo of your dry hair on WhatsApp first. Recovering curls after chemical straightening takes time — we build a plan together.'} },
  { cat:'price',
    az:{q:'Qiymət nədən asılıdır?',
        a:'Uzunluq, sıxlıq və işin müddətindən. Saytdakı qiymətlər başlanğıc qiymətlərdir; dəqiq məbləği seansın əvvəlində, saçı görəndən sonra deyirəm — sonradan dəyişmir.'},
    en:{q:'What does the price depend on?',
        a:'Length, density and how long the work takes. The prices here are starting prices; I give you the exact amount at the start of the session, after seeing your hair — it does not change afterwards.'} },
  { cat:'price',
    az:{q:'Ödəniş necə olur?',
        a:'Nağd və kartla. Randevu üçün öncədən ödəniş tələb olunmur.'},
    en:{q:'How can I pay?',
        a:'Cash or card. No deposit is required to book.'} },
  { cat:'care',
    az:{q:'Kəsimdən sonra buruq neçə vaxt qalır?',
        a:'Forma 2–3 ay saxlayır. Amma evdə düzgün yuma və qurutma olmasa, kəsim özü kifayət etmir — buna görə hər seansın sonunda qısa qulluq izahı verirəm.'},
    en:{q:'How long does the shape last?',
        a:'The shape holds for 2–3 months. But a cut alone is not enough without the right washing and drying at home — that’s why every session ends with a short care walkthrough.'} },
  { cat:'care',
    az:{q:'Hansı məhsulları istifadə edim?',
        a:'Sulfatsız şampun, silikonsuz kondisioner və jel/krem kombinasiyası. Konkret markanı saçınızın məsaməliliyinə görə seansda yazıb verirəm.'},
    en:{q:'Which products should I use?',
        a:'A sulphate-free shampoo, silicone-free conditioner, and a gel/cream combination. I write down the specific brands for your porosity during the session.'} },
  { cat:'care',
    az:{q:'Saçım çox pırtlaşır (frizz). Nə etməli?',
        a:'Frizz çox vaxt quruluqdan və dəsmalla sürtməkdən yaranır. Pambıq dəsmalı mikrofibra/köynək parçası ilə əvəz edin, məhsulu yaş saça vurun və barmaqla darağı unudun.'},
    en:{q:'My hair frizzes a lot. What should I do?',
        a:'Frizz usually comes from dryness and rubbing with a towel. Swap the cotton towel for microfibre or a cotton t-shirt, apply product to soaking-wet hair, and stop brushing it dry.'} },
  { cat:'color',
    az:{q:'Boyama buruğu korlayır?',
        a:'Düzgün aparılsa — yox. Buruq saç quru olduğu üçün ağardıcı ilə işləyəndə buxar, bond-qoruyucu və uzun fasilələr istifadə edirəm. Bir seansda 2 tondan çox açmıram.'},
    en:{q:'Does colouring ruin curls?',
        a:'Done correctly — no. Because curly hair is drier, I work with steam, a bond protector, and longer intervals when lightening. I don’t lift more than 2 levels in one session.'} },
  { cat:'color',
    az:{q:'Boyama ilə kəsimi eyni gün etmək olar?',
        a:'Bəli, amma vaxt 3–4 saata qədər uzanır. Randevu alanda qeyd hissəsində yazın ki, o gün üçün uzun slot ayırım.'},
    en:{q:'Can I do colour and a cut on the same day?',
        a:'Yes, but it stretches to 3–4 hours. Mention it in the notes when you book so I can reserve a long slot for that day.'} },
  { cat:'where',
    az:{q:'Salon haradadır?',
        a:'Bakı, Nəsimi rayonu — metro yaxınlığında. Dəqiq ünvanı və yerin şəklini randevu təsdiqi ilə birlikdə WhatsApp-dan göndərirəm.'},
    en:{q:'Where is the salon?',
        a:'Baku, Nasimi district — near the metro. I send the exact address and a photo of the entrance together with your booking confirmation on WhatsApp.'} },
  { cat:'where',
    az:{q:'Randevunu ləğv etsəm nə olur?',
        a:'Ən azı 4 saat əvvəl xəbər versəniz, heç bir problem yoxdur. Xəbərsiz gəlməmək təkrarlanarsa, növbəti randevu üçün öncədən ödəniş istəyirəm.'},
    en:{q:'What if I cancel?',
        a:'No problem at all if you tell me at least 4 hours ahead. If no-shows repeat, I ask for a deposit for the next booking.'} },
  { cat:'where',
    az:{q:'Uşaq saçı kəsirsiniz?',
        a:'Bəli, 5 yaşdan yuxarı buruq saçlı uşaqlar üçün. Seans daha qısa olur və qiymət 50 ₼-dən başlayır.'},
    en:{q:'Do you cut children’s hair?',
        a:'Yes, for curly-haired children aged 5 and up. The session is shorter and prices start from 50 ₼.'} },
];

const REVIEWS = [
  { az:{t:'Savadlı, gözəl, hər tərəfli dostum mənim ❤️', w:'@drnarmina · Instagram'},
    en:{t:'Skilled, lovely, an all-round friend of mine ❤️', w:'@drnarmina · Instagram'} },
  { az:{t:'İlk dəfə saçımın buruq olduğunu qəbul etdim. Kəsimdən sonra heç nə etməyə ehtiyac qalmadı.', w:'Aysel M. · 3a'},
    en:{t:'For the first time I accepted that my hair is curly. After the cut I didn’t need to do anything to it.', w:'Aysel M. · 3a'} },
  { az:{t:'İki il fenlə düzləşdirirdim. İndi səhərlər yalnız su və jel — vəssalam.', w:'Günel R. · 2c'},
    en:{t:'I blow-dried it straight for two years. Now it’s just water and gel in the morning — that’s it.', w:'Günel R. · 2c'} },
];

const HOURS = [
  { az:'B.e – C', en:'Mon – Fri', val:'10:00 – 19:00' },
  { az:'Şənbə',   en:'Saturday',  val:'10:00 – 16:00' },
  { az:'Bazar',   en:'Sunday',    val:{az:'Bağlı', en:'Closed'}, off:true },
];

/* EN overrides for the static markup (AZ lives in index.html) */
const EN = {
  'demo.note':'This is a demo version of the site — details and prices are placeholders.',
  'nav.services':'Services','nav.work':'My work','nav.availability':'Availability','nav.faq':'FAQ',
  'nav.contact':'Contact','nav.book':'Book',
  'hero.eyebrow':'Baku, Azerbaijan · Curly hair specialist',
  'hero.t1':'Your curls are','hero.t2':'beautiful as they are.',
  'hero.lede':'Dry cutting, shape matched to your curl type, colour and care. Every curl — 2c, 3a, 3b, 3c — wants its own cut. I find it.',
  'hero.book':'Book a slot','hero.see':'See my work',
  'hero.f1':'years experience','hero.f2':'curl types','hero.f3':'average session',
  'srv.eyebrow':'Services','srv.title':'Everything for curly hair',
  'srv.lede':'Prices vary with length and density. The ones below are starting prices.',
  'work.eyebrow':'My work','work.title':'Before → After',
  'work.lede':'How does the same layered cut look on different curl types? Drag across the photo.',
  'work.all':'All','work.note':'All photos are taken from the Instagram account.',
  'av.eyebrow':'Availability','av.title':'When I’m free',
  'av.lede':'Pick a day, then tap a free time — it drops into the booking form. Closed on Sundays.',
  'av.free':'free','av.busy':'booked','av.off':'closed',
  'bk.eyebrow':'Booking','bk.title':'Reserve your spot',
  'bk.lede':'Fill in the form — I’ll confirm on WhatsApp. If it’s your first visit, send a photo of your hair when dry.',
  'bk.wash':'Wash 1–2 days before the appointment',
  'bk.l1':'Wash your hair 1–2 days before; come with it dry and loose.','bk.l2':'The cut is done dry, curl by curl.',
  'bk.l3':'Please cancel at least 4 hours ahead.',
  'bk.name':'Full name','bk.namePh':'Narmin Aliyeva','bk.phone':'Phone','bk.phonePh':'+994 50 123 45 67',
  'bk.service':'Service','bk.curl':'Your curl type','bk.curlUnknown':'Not sure — you tell me',
  'bk.slot':'Chosen time','bk.slotEmpty':'No time chosen yet','bk.slotPick':'Pick from the calendar →',
  'bk.note':'Note','bk.optional':'(optional)','bk.notePh':'My hair is shoulder length, I’ve had keratin before…',
  'bk.submit':'Send booking request','bk.fine':'Demo: nothing is submitted anywhere, the confirmation is shown on screen.',
  'bk.doneTitle':'Request received','bk.doneLede':'I’ll message you on WhatsApp to confirm.',
  'bk.wa':'Send via WhatsApp','bk.again':'Fill in again',
  'faq.eyebrow':'Q & A','faq.title':'Most asked questions','faq.lede':'The questions from the Instagram highlights — all in one place.',
  'rev.eyebrow':'Reviews','rev.title':'What clients say',
  'ct.eyebrow':'Contact','ct.title':'Where to find me',
  'ct.directions':'Open in maps →','ct.addr':'Address','ct.addrNote':'Demo address — to be replaced with the real one.',
  'ct.hours':'Opening hours','ct.reach':'Get in touch','ct.reachNote':'Demo numbers.',
  'foot.made':'Demo site · Baku','fab':'Book now',
  // runtime strings
  'rt.slotsFor':'Free times on','rt.noSlots':'Closed on this day.','rt.pickDay':'Pick a day above to see free times.',
  'rt.before':'before','rt.after':'after','rt.curlType':'curl type','rt.pick':'Choose →',
  'rt.min':'min','rt.errName':'Please write your name.','rt.errPhone':'Please write a valid phone number.',
  'rt.errSlot':'Please choose a date and time from the calendar.',
  'rt.sName':'Name','rt.sPhone':'Phone','rt.sService':'Service','rt.sWhen':'Date & time','rt.sCurl':'Curl type',
  'rt.waMsg':'Hello! I would like to book an appointment.',
  'rt.today':'today','rt.full':'fully booked',
};

const AZ_RT = {
  'rt.slotsFor':'Boş vaxtlar —','rt.noSlots':'Bu gün bağlıdır.','rt.pickDay':'Boş vaxtları görmək üçün yuxarıdan gün seçin.',
  'rt.before':'əvvəl','rt.after':'sonra','rt.curlType':'buruq tipi','rt.pick':'Seç →',
  'rt.min':'dəq','rt.errName':'Zəhmət olmasa adınızı yazın.','rt.errPhone':'Zəhmət olmasa düzgün telefon nömrəsi yazın.',
  'rt.errSlot':'Zəhmət olmasa təqvimdən gün və saat seçin.',
  'rt.sName':'Ad','rt.sPhone':'Telefon','rt.sService':'Xidmət','rt.sWhen':'Tarix və saat','rt.sCurl':'Buruq tipi',
  'rt.waMsg':'Salam! Randevu almaq istəyirəm.',
  'rt.today':'bu gün','rt.full':'bu gün üçün yer qalmayıb',
};

const MONTHS = {
  az:['Yanvar','Fevral','Mart','Aprel','May','İyun','İyul','Avqust','Sentyabr','Oktyabr','Noyabr','Dekabr'],
  en:['January','February','March','April','May','June','July','August','September','October','November','December'],
};
const DOW_SHORT = { az:['B','B.e','Ç.a','Ç','C.a','C','Ş'], en:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'] };
const DOW_LONG  = {
  az:['Bazar','Bazar ertəsi','Çərşənbə axşamı','Çərşənbə','Cümə axşamı','Cümə','Şənbə'],
  en:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
};

/* ─────────────────────────── STATE ─────────────────────────── */

let lang = localStorage.getItem('cm-lang') || 'az';
let weekOffset = 0;
let selDate = null;          // 'YYYY-MM-DD'
let selTime = null;          // 'HH:MM'
let faqCat = 'all';
let workFilter = 'all';

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const t  = k => (lang === 'en' ? EN[k] : AZ_RT[k]) ?? EN[k] ?? k;
const L  = o => o[lang] ?? o.az;

/* ─────────────────────────── i18n ─────────────────────────── */

function cacheAz(){
  $$('[data-i18n]').forEach(el => el.dataset.az = el.innerHTML);
  $$('[data-i18n-ph]').forEach(el => el.dataset.azPh = el.placeholder);
}
function applyLang(){
  document.documentElement.lang = lang;
  $$('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n;
    el.innerHTML = lang === 'en' ? (EN[k] ?? el.dataset.az) : el.dataset.az;
  });
  $$('[data-i18n-ph]').forEach(el => {
    const k = el.dataset.i18nPh;
    el.placeholder = lang === 'en' ? (EN[k] ?? el.dataset.azPh) : el.dataset.azPh;
  });
  $$('.lang__btn').forEach(b => b.classList.toggle('is-active', b.dataset.lang === lang));
  renderAll();
}

/* ─────────────────────────── RENDER ─────────────────────────── */

function renderServices(){
  $('#srvGrid').innerHTML = SERVICES.map(s => `
    <article class="srv">
      <div class="srv__top">
        <h3 class="srv__name">${L(s).n}</h3>
        <span class="srv__price">${s.price}</span>
      </div>
      <p class="srv__desc">${L(s).d}</p>
      <div class="srv__meta">
        <span class="tag">${s.dur} ${t('rt.min')}</span>
        ${s.tags.map(x => `<span class="tag">${x}</span>`).join('')}
        <button class="srv__pick" type="button" data-srv="${s.id}">${t('rt.pick')}</button>
      </div>
    </article>`).join('');

  $$('#srvGrid .srv__pick').forEach(b => b.addEventListener('click', () => {
    $('#bkService').value = b.dataset.srv;
    scrollToEl($('#bookForm'));
    if (window.matchMedia('(min-width:761px)').matches)
      setTimeout(() => $('#bkName').focus({ preventScroll:true }), 500);
  }));

  $('#bkService').innerHTML = SERVICES
    .map(s => `<option value="${s.id}">${L(s).n} · ${s.price}</option>`).join('');
}

function renderWork(){
  $('#workGrid').innerHTML = WORK.map((w, i) => `
    <article class="wk" data-tags="${w.tags.join(' ')}">
      <div class="cmp" style="--pos:50%">
        <img class="cmp__after"  src="assets/work/${w.pair}-after.jpg"  alt="${w.curl} — ${t('rt.after')}"  loading="lazy" width="946" height="932">
        <img class="cmp__before" src="assets/work/${w.pair}-before.jpg" alt="${w.curl} — ${t('rt.before')}" loading="lazy" width="946" height="932">
        <span class="cmp__lbl cmp__lbl--a">${t('rt.before')}</span>
        <span class="cmp__lbl cmp__lbl--b">${t('rt.after')}</span>
        <span class="cmp__bar"><span class="cmp__knob">‹›</span></span>
        <input class="cmp__range" type="range" min="0" max="100" value="50" step="0.5"
               aria-label="${t('rt.before')} / ${t('rt.after')} — ${w.curl}">
      </div>
      <div class="wk__foot">
        <span class="wk__type">${w.curl}<span>${t('rt.curlType')}</span></span>
        <span class="wk__cut">${L(w)}</span>
      </div>
    </article>`).join('');

  $$('#workGrid .cmp').forEach(setupCompare);
  applyWorkFilter();
}

/* Before/after handle.
   The range input is kept for keyboard use only — on iOS Safari a range drags
   only when the finger lands on the thumb, so touch is driven by pointer events
   on the frame instead. `touch-action:pan-y` lets a vertical swipe scroll the
   page; we claim the gesture only once it's clearly horizontal. */
function setupCompare(cmp){
  const range = $('.cmp__range', cmp);
  const apply = v => {
    const pos = Math.max(0, Math.min(100, v));
    cmp.style.setProperty('--pos', pos + '%');
    if (range) range.value = pos;
  };
  const posFromX = x => {
    const r = cmp.getBoundingClientRect();
    return r.width ? ((x - r.left) / r.width) * 100 : 50;
  };

  let active = false, claimed = false, startX = 0, startY = 0;
  const SLOP = 6;

  cmp.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    active = true;
    startX = e.clientX; startY = e.clientY;
    claimed = e.pointerType === 'mouse';
    if (claimed){
      try { cmp.setPointerCapture(e.pointerId); } catch (_) {}
      apply(posFromX(e.clientX));
    }
  });

  cmp.addEventListener('pointermove', e => {
    if (!active) return;
    if (!claimed){
      const dx = Math.abs(e.clientX - startX), dy = Math.abs(e.clientY - startY);
      if (dx < SLOP && dy < SLOP) return;
      if (dy > dx){ active = false; return; }   // vertical swipe — let the page scroll
      claimed = true;
      cmp.classList.add('is-dragging');
      try { cmp.setPointerCapture(e.pointerId); } catch (_) {}
    }
    e.preventDefault();
    apply(posFromX(e.clientX));
  });

  const end = e => {
    if (!active) return;
    if (!claimed) apply(posFromX(e.clientX));   // a plain tap jumps the divider
    active = false; claimed = false;
    cmp.classList.remove('is-dragging');
    try { cmp.releasePointerCapture(e.pointerId); } catch (_) {}
  };
  cmp.addEventListener('pointerup', end);
  cmp.addEventListener('pointercancel', () => {
    active = false; claimed = false; cmp.classList.remove('is-dragging');
  });

  if (range) range.addEventListener('input', () => apply(+range.value));
  apply(50);
}

function applyWorkFilter(){
  $$('#workGrid .wk').forEach(el => {
    el.hidden = workFilter !== 'all' && !el.dataset.tags.split(' ').includes(workFilter);
  });
}

function renderFaq(){
  $('#hlRow').innerHTML = FAQ_CATS.map(c => `
    <button class="hl__item ${c.id === faqCat ? 'is-active' : ''}" type="button" data-cat="${c.id}">
      <span class="hl__ring"><span class="hl__inner">${c.icon}</span></span>
      <span class="hl__label">${L(c)}</span>
    </button>`).join('');

  $('#faqList').innerHTML = FAQ.map((f, i) => `
    <div class="faq__item" data-cat="${f.cat}">
      <button class="faq__q" type="button" aria-expanded="false" aria-controls="fa${i}">
        ${L(f).q}<span class="faq__ico" aria-hidden="true"></span>
      </button>
      <div class="faq__a" id="fa${i}"><p>${L(f).a}</p></div>
    </div>`).join('');

  $$('#hlRow .hl__item').forEach(b => b.addEventListener('click', () => {
    faqCat = b.dataset.cat;
    $$('#hlRow .hl__item').forEach(x => x.classList.toggle('is-active', x === b));
    filterFaq();
  }));

  $$('#faqList .faq__q').forEach(q => q.addEventListener('click', () => {
    const item = q.closest('.faq__item');
    const panel = $('.faq__a', item);
    const open = item.classList.toggle('is-open');
    q.setAttribute('aria-expanded', String(open));
    panel.style.height = open ? panel.scrollHeight + 'px' : '0px';
  }));

  filterFaq();
}

function filterFaq(){
  $$('#faqList .faq__item').forEach(el => {
    el.hidden = faqCat !== 'all' && el.dataset.cat !== faqCat;
  });
}

function renderReviews(){
  $('#revGrid').innerHTML = REVIEWS.map(r => `
    <article class="rev">
      <div class="rev__stars" aria-label="5/5">★★★★★</div>
      <p class="rev__text">“${L(r).t}”</p>
      <div class="rev__who">${L(r).w}</div>
    </article>`).join('');
}

function renderHours(){
  $('#hoursList').innerHTML = HOURS.map(h => `
    <dt>${L(h)}</dt>
    <dd class="${h.off ? 'is-off' : ''}">${typeof h.val === 'string' ? h.val : L(h.val)}</dd>`).join('');
}

/* ─────────────────────────── CALENDAR ─────────────────────────── */

const SLOTS_WEEK = ['10:00','11:30','13:00','14:30','16:00','17:30'];
const SLOTS_SAT  = ['10:00','11:30','13:00','14:30'];

const iso = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const today = () => { const d = new Date(); d.setHours(0,0,0,0); return d; };

function mondayOf(date){
  const d = new Date(date);
  const shift = (d.getDay() + 6) % 7;        // Mon = 0
  d.setDate(d.getDate() - shift);
  d.setHours(0,0,0,0);
  return d;
}
function weekStart(){
  const m = mondayOf(today());
  m.setDate(m.getDate() + weekOffset * 7);
  return m;
}
function slotsFor(date){
  const dow = date.getDay();
  if (dow === 0) return [];
  return dow === 6 ? SLOTS_SAT : SLOTS_WEEK;
}
/* deterministic "already booked" so the demo stays stable across reloads */
function isBooked(dateIso, time){
  let h = 0;
  const s = dateIso + time;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % 10 < 4;
}
function isPast(date){ return date < today(); }
/* a slot needs at least an hour of lead time */
function isPastSlot(dateIso, time){
  const now = new Date();
  if (dateIso !== iso(now)) return false;
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m <= now.getHours() * 60 + now.getMinutes() + 60;
}
const isTaken = (dateIso, time) => isBooked(dateIso, time) || isPastSlot(dateIso, time);

function renderCalendar(){
  const start = weekStart();
  const end = new Date(start); end.setDate(end.getDate() + 6);
  const M = MONTHS[lang];
  $('#calRange').textContent = start.getMonth() === end.getMonth()
    ? `${start.getDate()}–${end.getDate()} ${M[start.getMonth()]}`
    : `${start.getDate()} ${M[start.getMonth()]} – ${end.getDate()} ${M[end.getMonth()]}`;

  $('#calPrev').disabled = weekOffset <= 0;
  $('#calNext').disabled = weekOffset >= 5;

  $('#calDays').innerHTML = Array.from({ length:7 }, (_, i) => {
    const d = new Date(start); d.setDate(start.getDate() + i);
    const key = iso(d);
    const list = slotsFor(d);
    const past = isPast(d);
    const free = past ? 0 : list.filter(s => !isTaken(key, s)).length;
    const closed = list.length === 0;
    const dots = closed || past
      ? '<i class="dot dot--off"></i>'
      : Array.from({ length:Math.min(3, Math.max(1, Math.ceil(free / 2))) },
          () => `<i class="dot ${free ? 'dot--free' : 'dot--busy'}"></i>`).join('');
    return `
      <button class="day ${key === selDate ? 'is-sel' : ''}" type="button"
              data-date="${key}" ${(past || closed) ? 'disabled' : ''}>
        <span class="day__dow">${DOW_SHORT[lang][d.getDay()]}</span>
        <span class="day__num">${d.getDate()}</span>
        <span class="day__dots">${dots}</span>
      </button>`;
  }).join('');

  $$('#calDays .day').forEach(b => b.addEventListener('click', () => {
    selDate = b.dataset.date; selTime = null;
    renderCalendar(); renderSlots(); syncSlotPick();
  }));

  renderSlots();
}

function renderSlots(){
  const box = $('#calSlots');
  if (!selDate){ box.innerHTML = `<p class="slots__empty">${t('rt.pickDay')}</p>`; return; }

  const [y,m,dd] = selDate.split('-').map(Number);
  const d = new Date(y, m-1, dd);
  const list = slotsFor(d);
  if (!list.length){ box.innerHTML = `<p class="slots__empty">${t('rt.noSlots')}</p>`; return; }

  const label = `${DOW_LONG[lang][d.getDay()]}, ${d.getDate()} ${MONTHS[lang][d.getMonth()]}`;
  const anyFree = list.some(s => !isTaken(selDate, s));
  box.innerHTML = `
    <p class="slots__title">${t('rt.slotsFor')} ${label}${anyFree ? '' : ' — ' + t('rt.full')}</p>
    <div class="slots__row">
      ${list.map(s => `
        <button class="slot ${s === selTime ? 'is-sel' : ''}" type="button"
                data-time="${s}" ${isTaken(selDate, s) ? 'disabled' : ''}>${s}</button>`).join('')}
    </div>`;

  $$('#calSlots .slot').forEach(b => b.addEventListener('click', () => {
    selTime = b.dataset.time;
    $$('#calSlots .slot').forEach(x => x.classList.toggle('is-sel', x === b));
    syncSlotPick();
    scrollToEl($('#bookForm'));
  }));
}

function prettyWhen(){
  if (!selDate || !selTime) return '';
  const [y,m,dd] = selDate.split('-').map(Number);
  const d = new Date(y, m-1, dd);
  return `${DOW_LONG[lang][d.getDay()]}, ${d.getDate()} ${MONTHS[lang][d.getMonth()]} · ${selTime}`;
}

function syncSlotPick(){
  const box = $('#slotPick'), txt = $('#slotPickText');
  const set = Boolean(selDate && selTime);
  box.classList.toggle('is-set', set);
  txt.textContent = set ? prettyWhen() : t('bk.slotEmpty');
  if (set) $('#slotErr').textContent = '';
}

/* scroll an element just under the sticky nav — scrollIntoView is unreliable
   against a sticky header, and block:'center' is unpredictable on a tall form */
function scrollToEl(el, gap = 16){
  if (!el) return;
  const navH = $('#nav')?.getBoundingClientRect().height ?? 0;
  const top = window.scrollY + el.getBoundingClientRect().top - navH - gap;
  window.scrollTo({ top: Math.max(0, top), behavior:'smooth' });
}

/* ─────────────────────────── BOOKING FORM ─────────────────────────── */

function setupForm(){
  const form = $('#bookForm');

  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;

    const name = $('#bkName'), phone = $('#bkPhone');
    const fail = (input, msg) => {
      input.closest('.field').classList.add('has-err');
      $('[data-err]', input.closest('.field')).textContent = msg;
      ok = false;
    };
    $$('.field').forEach(f => { f.classList.remove('has-err'); const e2 = $('[data-err]', f); if (e2) e2.textContent = ''; });

    if (name.value.trim().length < 2) fail(name, t('rt.errName'));
    if (phone.value.replace(/\D/g,'').length < 9) fail(phone, t('rt.errPhone'));
    if (!selDate || !selTime){ $('#slotErr').textContent = t('rt.errSlot'); ok = false; }

    if (!ok){ $('.has-err input, .has-err select', form)?.focus(); return; }

    const srv = SERVICES.find(s => s.id === $('#bkService').value);
    const curl = $('#bkCurl').value;
    const rows = [
      [t('rt.sName'),    name.value.trim()],
      [t('rt.sPhone'),   phone.value.trim()],
      [t('rt.sService'), `${L(srv).n} · ${srv.price}`],
      [t('rt.sWhen'),    prettyWhen()],
    ];
    if (curl) rows.push([t('rt.sCurl'), curl]);

    $('#bookSummary').innerHTML = rows.map(([k,v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');

    const note = $('#bkNote').value.trim();
    const msg = [
      t('rt.waMsg'), '',
      `${t('rt.sName')}: ${name.value.trim()}`,
      `${t('rt.sService')}: ${L(srv).n}`,
      `${t('rt.sWhen')}: ${prettyWhen()}`,
      curl ? `${t('rt.sCurl')}: ${curl}` : '',
      note ? `— ${note}` : '',
    ].filter(Boolean).join('\n');
    $('#waLink').href = 'https://wa.me/994000000000?text=' + encodeURIComponent(msg);

    form.hidden = true;
    $('#bookDone').hidden = false;
    scrollToEl($('#bookDone'));
  });

  $('#bookAgain').addEventListener('click', () => {
    $('#bookDone').hidden = true;
    form.hidden = false;
    form.reset();
    selTime = null; syncSlotPick(); renderSlots();
    scrollToEl(form);
  });
}

/* ─────────────────────────── CHROME ─────────────────────────── */

function setupNav(){
  const nav = $('#nav'), links = $('#navLinks'), burger = $('#navBurger');

  burger.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', e => {
    if (e.target.tagName === 'A'){ links.classList.remove('is-open'); burger.setAttribute('aria-expanded','false'); }
  });

  const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive:true });

  const sections = $$('main section[id]');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      $$('#navLinks a').forEach(a =>
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin:'-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  $$('.lang__btn').forEach(b => b.addEventListener('click', () => {
    lang = b.dataset.lang;
    localStorage.setItem('cm-lang', lang);
    applyLang();
  }));

  $('#demoRibbonX').addEventListener('click', () => { $('#demoRibbon').hidden = true; });

  $('#calPrev').addEventListener('click', () => { if (weekOffset > 0){ weekOffset--; renderCalendar(); } });
  $('#calNext').addEventListener('click', () => { if (weekOffset < 5){ weekOffset++; renderCalendar(); } });

  $$('#workFilter .chip').forEach(c => c.addEventListener('click', () => {
    workFilter = c.dataset.filter;
    $$('#workFilter .chip').forEach(x => x.classList.toggle('is-active', x === c));
    applyWorkFilter();
  }));

  const fab = $('.fab'), bookSec = $('#booking');
  if (fab && bookSec && 'IntersectionObserver' in window){
    new IntersectionObserver(
      ([e]) => fab.classList.toggle('is-away', e.isIntersecting),
      { threshold:0.14 }
    ).observe(bookSec);
  }

  $('#year').textContent = new Date().getFullYear();
}

function renderAll(){
  renderServices();
  renderWork();
  renderFaq();
  renderReviews();
  renderHours();
  renderCalendar();
  syncSlotPick();
}

/* ─────────────────────────── BOOT ─────────────────────────── */

cacheAz();
setupNav();
setupForm();
applyLang();

})();

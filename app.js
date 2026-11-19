const table = document.getElementById('table');
const info = document.getElementById('info');
const infoBody = document.getElementById('info-body');
const infoHead = document.getElementById('info-head');
const stage = document.getElementById('atom-stage');
const toast = document.getElementById('toast');
const appEl = document.querySelector('.app');
const themeToggle = document.getElementById('theme-toggle');
const resetButton = document.getElementById('reset');
const mobileQuery = window.matchMedia('(max-width: 700px)');

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Chuyển chế độ sáng' : 'Chuyển chế độ tối');
}
let storedTheme = null;
try { storedTheme = localStorage.getItem('pt-theme'); } catch {}
setTheme(storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : 'light');
themeToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(next);
  try { localStorage.setItem('pt-theme', next); } catch {}
});

function setDetailOpen(open) {
  appEl.classList.toggle('detail-open', open);
  resetButton.textContent = open ? '\u2190' : '\u00d7';
  resetButton.setAttribute('aria-label', open ? 'Quay lại bảng tuần hoàn' : 'Quay lại nguyên tố đầu tiên');
}

// Bảng màu theo sách: xanh kim loại, vàng chuyển tiếp, đỏ phi kim, xanh lá khí hiếm.
const THEME = {
  alkali: { ink: '#08345A', darkInk: '#8FC4EE', bg: '#5B9BD5' },
  alkaline: { ink: '#08345A', darkInk: '#8FC4EE', bg: '#5B9BD5' },
  post: { ink: '#08345A', darkInk: '#8FC4EE', bg: '#5B9BD5' },
  transition: { ink: '#5A4100', darkInk: '#F0D27A', bg: '#F9D65C' },
  lanthanide: { ink: '#5A4100', darkInk: '#F0D27A', bg: '#F9D65C' },
  actinide: { ink: '#5A4100', darkInk: '#F0D27A', bg: '#F9D65C' },
  metalloid: { ink: '#6E1B12', darkInk: '#F0A99E', bg: '#E86F62' },
  nonmetal: { ink: '#6E1B12', darkInk: '#F0A99E', bg: '#E86F62' },
  halogen: { ink: '#6E1B12', darkInk: '#F0A99E', bg: '#E86F62' },
  noble: { ink: '#2E4A08', darkInk: '#BFE39A', bg: '#A9C94B' },
  hydrogen: { ink: '#202124', darkInk: '#e8eaed', bg: '#ffffff' },
};
// Sách tô riêng bốn ô này khác với nhóm của chúng.
const COLOR_OVERRIDE = { 1: 'hydrogen', 32: 'post', 51: 'post', 117: 'post' };

const PHASES = { solid: 'Rắn', liquid: 'Lỏng', gas: 'Khí' };
const elements = ELEMENTS.map(([z, symbol, name, mass, category, group, period]) => ({ z, symbol, name, mass, category, group, period }));
const tiles = new Map();
let current = 1;
const SUP = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
const sup = n => String(n).split('').map(d => SUP[+d]).join('');
const VALENCE_EXTRA = {
  24: '(n−1)d⁵ns¹', 29: '(n−1)d¹⁰ns¹', 41: '(n−1)d⁴ns¹', 42: '(n−1)d⁵ns¹',
  44: '(n−1)d⁷ns¹', 45: '(n−1)d⁸ns¹', 46: '(n−1)d¹⁰ns⁰', 47: '(n−1)d¹⁰ns¹',
  78: '(n−1)d⁹ns¹', 79: '(n−1)d¹⁰ns¹',
};
function valence(z, group) {
  if (z === 2) return '1s²';
  if (z >= 57 && z <= 71 || z >= 89 && z <= 103) return '';
  if (VALENCE_EXTRA[z]) return VALENCE_EXTRA[z];
  if (group <= 2) return `ns${sup(group)}`;
  if (group <= 12) return `(n−1)d${sup(group - 2)}ns²`;
  return `ns²np${sup(group - 12)}`;
}
const GROUPS = ['IA', 'IIA', 'IIIB', 'IVB', 'VB', 'VIB', 'VIIB', 'VIIIB', 'VIIIB', 'VIIIB', 'IB', 'IIB', 'IIIA', 'IVA', 'VA', 'VIA', 'VIIA', 'VIIIA'];
document.getElementById('col-head').innerHTML = GROUPS.map((g, i) => `<span>${i + 1}<small>${g}</small></span>`).join('');
document.getElementById('row-head').innerHTML = [1, 2, 3, 4, 5, 6, 7].map(n => `<span>${n}</span>`).join('') + '<span class="spacer"></span><span></span><span></span>';

function positionOf(el) {
  if (el.z >= 57 && el.z <= 71) return { x: 3 + el.z - 57, y: 9 };
  if (el.z >= 89 && el.z <= 103) return { x: 3 + el.z - 89, y: 10 };
  return { x: el.group, y: el.period };
}

for (const el of elements) {
  const { x, y } = positionOf(el);
  const theme = THEME[COLOR_OVERRIDE[el.z] || el.category];
  const tile = document.createElement('button');
  tile.type = 'button';
  tile.className = 'tile';
  tile.style.gridColumn = x;
  tile.style.gridRow = y;
  tile.style.setProperty('--ink', theme.ink);
  tile.style.setProperty('--bg', theme.bg);
  tile.style.setProperty('--dark-ink', theme.darkInk);
  tile.title = `${el.z}. ${DETAILS[el.z - 1][0]} — ${el.name}`;
  tile.setAttribute('aria-label', `${el.z}. ${el.name}`);
  const showCfg = el.period <= 2 || (el.period === 4 && el.group >= 3 && el.group <= 12);
  tile.dataset.cfg = showCfg ? valence(el.z, el.group) : '';
  tile.innerHTML = `<span class="num">${el.z}</span><span class="sym">${el.symbol}</span><span class="vi">${DETAILS[el.z - 1][0]}</span><span class="mass">${el.mass}</span>`;
  tile.addEventListener('click', () => select(el.z));
  table.appendChild(tile);
  tiles.set(el.z, tile);
}
for (const [row, mark] of [[6, '*'], [7, '**']]) {
  const cell = document.createElement('div');
  cell.className = 'tile placeholder';
  cell.style.gridColumn = 3;
  cell.style.gridRow = row;
  cell.textContent = mark;
  cell.setAttribute('aria-hidden', 'true');
  table.appendChild(cell);
}
for (const [row, text] of [[9, '* lanthanides'], [10, '** actinides']]) {
  const label = document.createElement('div');
  label.className = 'f-label';
  label.style.gridColumn = '1 / 3';
  label.style.gridRow = row;
  label.textContent = text;
  table.appendChild(label);
}
for (const button of document.querySelectorAll('.special-tiles button')) {
  button.addEventListener('click', () => select(+button.dataset.z));
}

function fact(label, value, sub = '') {
  return `<div class="fact"><dt>${label}</dt><dd>${value}${sub ? `<small>${sub}</small>` : ''}</dd></div>`;
}
const search = document.getElementById('search');
const resultCount = document.getElementById('result-count');
const filterBar = document.getElementById('filter-bar');
let activeGroup = null;
const FILTER_GROUPS = {
  metal: { label: 'Kim loại', categories: ['alkali', 'alkaline', 'post'], ink: '#08345A', bg: '#5B9BD5' },
  transition: { label: 'Kim loại chuyển tiếp', categories: ['transition', 'lanthanide', 'actinide'], ink: '#5A4100', bg: '#F9D65C' },
  nonmetal: { label: 'Phi kim', categories: ['metalloid', 'nonmetal', 'halogen'], ink: '#6E1B12', bg: '#E86F62' },
  noble: { label: 'Khí hiếm', categories: ['noble'], ink: '#2E4A08', bg: '#A9C94B' },
};

function makeFilterButton(key, group) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'filter-chip';
  button.dataset.key = key;
  button.style.setProperty('--chip-ink', group.ink);
  button.style.setProperty('--chip-bg', group.bg);
  button.setAttribute('aria-pressed', 'false');
  button.innerHTML = `<span class="swatch"></span>${group.label}`;
  button.addEventListener('click', () => {
    activeGroup = activeGroup === key ? null : key;
    for (const other of filterBar.children) other.setAttribute('aria-pressed', String(other.dataset.key === activeGroup));
    applyFilter();
  });
  filterBar.appendChild(button);
}
for (const [key, group] of Object.entries(FILTER_GROUPS)) makeFilterButton(key, group);

function matches(el, query) {
  const vietnameseName = DETAILS[el.z - 1][0];
  return !query ||
    el.name.toLowerCase().includes(query) ||
    el.symbol.toLowerCase() === query ||
    vietnameseName.toLowerCase().includes(query) ||
    String(el.z) === query;
}

function applyFilter() {
  const query = search.value.trim().toLowerCase();
  let shown = 0;
  for (const el of elements) {
    const match = matches(el, query) && (!activeGroup || FILTER_GROUPS[activeGroup].categories.includes(el.category));
    tiles.get(el.z).classList.toggle('dim', !match);
    if (match) shown++;
  }
  resultCount.textContent = (query || activeGroup) ? `${shown} / ${elements.length} nguyên tố` : '';
}

search.addEventListener('input', applyFilter);
search.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    search.value = '';
    applyFilter();
    search.blur();
  }
  if (event.key === 'Enter') {
    const query = search.value.trim().toLowerCase();
    const first = elements.find(el => matches(el, query) && (!activeGroup || FILTER_GROUPS[activeGroup].categories.includes(el.category)));
    if (first) select(first.z);
  }
});

let renderer;
let scene;
let camera;
let atomGroup;
let shellGroups = [];
let dragging = false;
let lastX = 0;
let lastY = 0;

function initThree() {
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  } catch (error) {
    stage.textContent = 'Trình duyệt này không hỗ trợ WebGL để xem mô hình 3D.';
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(stage.clientWidth, stage.clientHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  stage.prepend(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(42, stage.clientWidth / stage.clientHeight, 0.1, 100);
  camera.position.set(0, 0.3, 7.6);

  scene.add(new THREE.AmbientLight(0xffffff, 0.65));
  const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
  keyLight.position.set(3, 4, 5);
  scene.add(keyLight);

  atomGroup = new THREE.Group();
  scene.add(atomGroup);

  stage.addEventListener('pointerdown', (event) => {
    dragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
    stage.setPointerCapture(event.pointerId);
  });
  stage.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    atomGroup.rotation.y += (event.clientX - lastX) * 0.008;
    atomGroup.rotation.x = Math.max(-1.2, Math.min(1.2, atomGroup.rotation.x + (event.clientY - lastY) * 0.008));
    lastX = event.clientX;
    lastY = event.clientY;
  });
  const stop = () => { dragging = false; };
  stage.addEventListener('pointerup', stop);
  stage.addEventListener('pointercancel', stop);

  new ResizeObserver(() => {
    if (!renderer) return;
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }).observe(stage);

  animate();
}

function clearAtom() {
  for (const child of [...atomGroup.children]) {
    atomGroup.remove(child);
    child.traverse((object) => {
      if (object.geometry) object.geometry.dispose();
      if (object.material) {
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        for (const material of materials) {
          if (material.map) material.map.dispose();
          material.dispose();
        }
      }
    });
  }
  shellGroups = [];
}

function makeSymbolSprite(symbol) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const context = canvas.getContext('2d');
  context.fillStyle = 'rgba(255,255,255,0.95)';
  context.font = 'bold 74px Roboto, Arial, sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(symbol, 64, 68);
  const texture = new THREE.CanvasTexture(canvas);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false }));
  sprite.scale.set(0.82, 0.82, 1);
  return sprite;
}

function renderAtom(shells, core, symbol) {
  if (!atomGroup) return;
  clearAtom();

  const coreColor = new THREE.Color(core);
  const nucleus = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.5, 3),
    new THREE.MeshStandardMaterial({
      color: coreColor,
      emissive: coreColor.clone().multiplyScalar(0.32),
      roughness: 0.35,
      metalness: 0.12,
      flatShading: true,
    }),
  );
  atomGroup.add(nucleus);

  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(0.76, 24, 24),
    new THREE.MeshBasicMaterial({ color: coreColor, transparent: true, opacity: 0.1, depthWrite: false }),
  );
  atomGroup.add(glow);
  atomGroup.add(makeSymbolSprite(symbol));
  atomGroup.add(new THREE.PointLight(coreColor, 1.5, 7));

  const tilts = [66, 25, 78, 38, 58, 20, 82];
  const electronGeometry = new THREE.SphereGeometry(0.072, 16, 16);
  const electronMaterial = new THREE.MeshStandardMaterial({
    color: 0xbcd8ff,
    emissive: 0x0b57d0,
    emissiveIntensity: 1.8,
    roughness: 0.2,
    metalness: 0,
  });

  shells.forEach((count, index) => {
    const radius = 0.95 + index * 0.28;
    const group = new THREE.Group();
    group.rotation.set(tilts[index % tilts.length] * Math.PI / 180, (index * 43) * Math.PI / 180, 0);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.009, 8, 128),
      new THREE.MeshBasicMaterial({ color: coreColor, transparent: true, opacity: 0.32 }),
    );
    group.add(ring);

    for (let k = 0; k < count; k++) {
      const angle = (Math.PI * 2 * k) / count;
      const electron = new THREE.Mesh(electronGeometry, electronMaterial);
      electron.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
      group.add(electron);
    }

    atomGroup.add(group);
    shellGroups.push({ group, speed: (index % 2 ? -1 : 1) * (0.0022 + index * 0.0006) });
  });
}

function animate() {
  requestAnimationFrame(animate);
  if (!renderer || !stage.clientWidth) return;
  for (const shell of shellGroups) shell.group.rotation.z += shell.speed;
  atomGroup.rotation.y += 0.0012;
  renderer.render(scene, camera);
}

const callout = document.getElementById('callout');

function showCallout(z, el, theme, show) {
  if (!show || mobileQuery.matches) { callout.hidden = true; return; }
  const tile = tiles.get(z);
  if (!tile) return;
  const values = {
    '.cfg': valence(z, el.group), '.num': z, '.sym': el.symbol,
    '.vi': DETAILS[z - 1][0], '.mass': el.mass,
  };
  for (const [selector, value] of Object.entries(values)) callout.querySelector(selector).textContent = value;
  const hasCfg = !!values['.cfg'];
  callout.querySelector('.cc .cfg').hidden = !hasCfg;
  callout.querySelector('.r-cfg').hidden = !hasCfg;
  callout.style.setProperty('--bg', theme.bg);
  callout.style.setProperty('--ink', theme.ink);
  callout.hidden = false;
}

function select(z, showDetail = true) {
  const el = elements[z - 1];
  if (!el) return;
  current = z;
  for (const [number, tile] of tiles) tile.classList.toggle('selected', number === z);

  const [vietnameseName, massNumber, uses] = DETAILS[z - 1];
  const [properties, icon] = ENRICH[z - 1];
  const [shells, density, melting, boiling, discoverers, year] = PHYSICS[z - 1];
  const [electronegativity, atomicRadius] = PHYSICAL_EXTRA[z - 1];
  const category = CATEGORIES[el.category];
  const theme = THEME[COLOR_OVERRIDE[z] || el.category];
  const isotopeKind = RADIOACTIVE.has(z) ? 'đồng vị bền nhất' : 'đồng vị phổ biến nhất';
  const caption = uses.split(/[,;]/)[0].trim();
  const temp = (value, unit) => value === null ? '—' : `${value} ${unit}`;

  info.style.setProperty('--core', theme.ink);
  stage.setAttribute('aria-label', `Mô hình nguyên tử 3D của ${el.name} với ${el.z} electron`);
  infoHead.innerHTML = `
    <h2 id="element-name">${el.name} (${el.symbol})<sup>${z}</sup></h2>
    <div class="category-line"><span class="dot"></span>${category.label} · ${vietnameseName}</div>
  `;
  infoBody.innerHTML = `
    <p class="desc">${properties} ${uses}</p>

    <div class="app-visual">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[icon]}</svg>
      <div><span>Minh họa ứng dụng</span><strong>${caption}</strong></div>
    </div>

    <dl class="facts">
      ${fact('Biểu tượng', el.symbol)}
      ${fact('Số nguyên tử', z)}
      ${fact('Khối lượng nguyên tử', `${el.mass} u`)}
      ${fact('Khối lượng riêng', temp(density, 'g/cm³'))}
      ${fact('Điểm nóng chảy', temp(melting, '°C'))}
      ${fact('Điểm sôi', temp(boiling, '°C'))}
      ${fact('Độ âm điện (Pauling)', electronegativity === null ? '—' : electronegativity)}
      ${fact('Bán kính nguyên tử', atomicRadius === null ? '—' : `${atomicRadius} pm`)}
      ${fact('Người phát hiện ra', discoverers || '—', 'người/cộng đồng ghi nhận lần đầu')}
      ${fact('Năm phát hiện', year || '—')}
      ${fact('Số proton', z)}
      ${fact('Số neutron', z === 1 ? 0 : massNumber - z, `${el.symbol}-${massNumber}, ${isotopeKind}`)}
      ${fact('Số electron', z, 'nguyên tử trung hòa')}
      ${fact('Nhóm', el.group)}
      ${fact('Chu kỳ', el.period)}
      ${fact('Phân loại', category.label)}
      ${fact('Trạng thái ở 25°C', PHASES[el.phase] || 'Chưa rõ')}
      ${fact('Lớp electron', `<div class="shells">${shells.map(n => `<span class="shell">${n}</span>`).join('')}</div>`)}
    </dl>

    ${HISTORY[z] ? `<div class="history-note"><h3>Lịch sử phát hiện</h3><ul>${HISTORY[z].map(item => `<li>${item}</li>`).join('')}</ul></div>` : ''}
    <p class="source">Nguồn dữ liệu: IUPAC, mendeleev và NUBASE2020. Khối lượng riêng của nguyên tố siêu nặng là giá trị dự đoán, không phải số đo. Mô hình 3D là mô phỏng Bohr đơn giản hóa.</p>
  `;

  renderAtom(shells, theme.ink, el.symbol);
  showCallout(z, el, theme, showDetail);
  if (mobileQuery.matches && showDetail) setDetailOpen(true);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 1800);
}

async function share() {
  try {
    await navigator.clipboard.writeText(location.href);
    showToast('Đã sao chép liên kết trang');
  } catch {
    showToast('Không thể sao chép liên kết trong trình duyệt này');
  }
}

resetButton.addEventListener('click', () => {
  if (mobileQuery.matches && appEl.classList.contains('detail-open')) {
    setDetailOpen(false);
    return;
  }
  select(1);
  document.querySelector('.table-scroll').scrollTo({ top: 0, left: 0, behavior: 'smooth' });
});
document.getElementById('collapse').addEventListener('click', () => document.querySelector('.app').classList.add('collapsed'));
document.getElementById('expand').addEventListener('click', () => document.querySelector('.app').classList.remove('collapsed'));
document.getElementById('share-bottom').addEventListener('click', share);

document.addEventListener('keydown', (event) => {
  if (event.target === search) return;
  if (event.key === 'ArrowRight') select(Math.min(118, current + 1));
  if (event.key === 'ArrowLeft') select(Math.max(1, current - 1));
  if (event.key === 'Escape' && appEl.classList.contains('detail-open')) setDetailOpen(false);
});

initThree();
select(1, false);
mobileQuery.addEventListener('change', (event) => { if (!event.matches) setDetailOpen(false); });

// KCMP Stock Screening Application JavaScript
// -------------------------------------------------------------
// Use strict to avoid silent errors
'use strict';

/**************************************************
 * 1. Data & Defaults
 **************************************************/
// Sample data for 10 NSE stocks – loaded exactly as provided
const sampleStocks = [
  {
    symbol: "RELIANCE",
    company: "Reliance Industries Ltd",
    sector: "Oil & Gas",
    isBFSI: false,
    marketCap: 1580000,
    price: 2456.75,
    peRatio: 23.5,
    deRatio: 0.35,
    roce: 18.2,
    salesGrowthYoY: 15.3,
    profitGrowthYoY: 12.8,
    promoterHolding: 50.4,
    priceData: [2380, 2395, 2410, 2425, 2440, 2435, 2450, 2465, 2470, 2460, 2455, 2450, 2445, 2450, 2456.75],
    volumeData: [12500000, 13200000, 11800000, 14500000, 13800000, 12200000, 16500000, 15200000, 13500000, 14800000, 13200000, 12800000, 15500000, 16200000, 18500000]
  },
  {
    symbol: "TCS",
    company: "Tata Consultancy Services",
    sector: "IT",
    isBFSI: false,
    marketCap: 1420000,
    price: 3890.50,
    peRatio: 28.2,
    deRatio: 0.12,
    roce: 45.6,
    salesGrowthYoY: 16.8,
    profitGrowthYoY: 14.2,
    promoterHolding: 72.3,
    priceData: [3720, 3745, 3780, 3795, 3825, 3840, 3865, 3875, 3880, 3860, 3870, 3885, 3890, 3885, 3890.50],
    volumeData: [2850000, 3120000, 2980000, 3350000, 3180000, 2920000, 4250000, 3980000, 3450000, 3680000, 3320000, 3180000, 3950000, 4120000, 4580000]
  },
  {
    symbol: "HDFCBANK",
    company: "HDFC Bank Ltd",
    sector: "Banking",
    isBFSI: true,
    marketCap: 1120000,
    price: 1456.25,
    peRatio: 17.8,
    deRatio: null,
    roce: null,
    salesGrowthYoY: null,
    profitGrowthYoY: null,
    promoterHolding: 0,
    priceData: [1380, 1395, 1410, 1425, 1440, 1435, 1450, 1465, 1470, 1460, 1455, 1450, 1445, 1450, 1456.25],
    volumeData: [8500000, 9200000, 8800000, 10500000, 9800000, 8200000, 12500000, 11200000, 9500000, 10800000, 9200000, 8800000, 11500000, 12200000, 14500000]
  },
  {
    symbol: "ICICIBANK",
    company: "ICICI Bank Ltd",
    sector: "Banking",
    isBFSI: true,
    marketCap: 890000,
    price: 1267.80,
    peRatio: 15.2,
    deRatio: null,
    roce: null,
    salesGrowthYoY: null,
    profitGrowthYoY: null,
    promoterHolding: 0,
    priceData: [1180, 1195, 1210, 1225, 1240, 1235, 1250, 1265, 1270, 1260, 1255, 1250, 1245, 1250, 1267.80],
    volumeData: [15500000, 16200000, 14800000, 18500000, 17800000, 15200000, 21500000, 19200000, 16500000, 18800000, 16200000, 15800000, 19500000, 20200000, 23500000]
  },
  {
    symbol: "INFY",
    company: "Infosys Ltd",
    sector: "IT",
    isBFSI: false,
    marketCap: 720000,
    price: 1789.65,
    peRatio: 26.8,
    deRatio: 0.08,
    roce: 38.9,
    salesGrowthYoY: 13.7,
    profitGrowthYoY: 11.5,
    promoterHolding: 13.2,
    priceData: [1680, 1695, 1720, 1735, 1755, 1750, 1765, 1775, 1780, 1770, 1775, 1785, 1790, 1785, 1789.65],
    volumeData: [4850000, 5120000, 4980000, 5350000, 5180000, 4920000, 6250000, 5980000, 5450000, 5680000, 5320000, 5180000, 5950000, 6120000, 6580000]
  },
  {
    symbol: "MARUTI",
    company: "Maruti Suzuki India Ltd",
    sector: "Auto",
    isBFSI: false,
    marketCap: 450000,
    price: 11567.25,
    peRatio: 24.5,
    deRatio: 0.18,
    roce: 22.3,
    salesGrowthYoY: 8.9,
    profitGrowthYoY: 6.2,
    promoterHolding: 56.2,
    priceData: [10980, 11095, 11220, 11335, 11455, 11450, 11465, 11475, 11480, 11460, 11455, 11485, 11520, 11545, 11567.25],
    volumeData: [850000, 920000, 880000, 1050000, 980000, 820000, 1250000, 1120000, 950000, 1080000, 920000, 880000, 1150000, 1220000, 1450000]
  },
  {
    symbol: "HINDUNILVR",
    company: "Hindustan Unilever Ltd",
    sector: "FMCG",
    isBFSI: false,
    marketCap: 620000,
    price: 2634.70,
    peRatio: 32.1,
    deRatio: 0.02,
    roce: 67.8,
    salesGrowthYoY: 9.8,
    profitGrowthYoY: 7.3,
    promoterHolding: 67.2,
    priceData: [2480, 2495, 2520, 2535, 2555, 2550, 2565, 2575, 2580, 2570, 2575, 2595, 2620, 2625, 2634.70],
    volumeData: [1850000, 1920000, 1880000, 2050000, 1980000, 1820000, 2250000, 2120000, 1950000, 2080000, 1920000, 1880000, 2150000, 2220000, 2450000]
  },
  {
    symbol: "ASIANPAINT",
    company: "Asian Paints Ltd",
    sector: "Paints",
    isBFSI: false,
    marketCap: 280000,
    price: 2987.35,
    peRatio: 45.6,
    deRatio: 0.15,
    roce: 28.9,
    salesGrowthYoY: 11.2,
    profitGrowthYoY: 8.7,
    promoterHolding: 52.9,
    priceData: [2780, 2795, 2820, 2835, 2855, 2850, 2865, 2875, 2880, 2870, 2875, 2895, 2920, 2925, 2987.35],
    volumeData: [1250000, 1320000, 1280000, 1450000, 1380000, 1220000, 1650000, 1520000, 1350000, 1480000, 1320000, 1280000, 1550000, 1620000, 1850000]
  },
  {
    symbol: "BAJFINANCE",
    company: "Bajaj Finance Ltd",
    sector: "NBFC",
    isBFSI: true,
    marketCap: 380000,
    price: 6234.80,
    peRatio: 21.7,
    deRatio: null,
    roce: null,
    salesGrowthYoY: null,
    profitGrowthYoY: null,
    promoterHolding: 57.8,
    priceData: [5880, 5995, 6120, 6235, 6355, 6350, 6165, 6175, 6180, 6170, 6175, 6195, 6220, 6225, 6234.80],
    volumeData: [1850000, 1920000, 1880000, 2050000, 1980000, 1820000, 2250000, 2120000, 1950000, 2080000, 1920000, 1880000, 2150000, 2220000, 2450000]
  },
  {
    symbol: "POWERGRID",
    company: "Power Grid Corporation",
    sector: "Power",
    isBFSI: false,
    marketCap: 220000,
    price: 245.60,
    peRatio: 12.8,
    deRatio: 0.82,
    roce: 8.9,
    salesGrowthYoY: 5.2,
    profitGrowthYoY: 3.8,
    promoterHolding: 51.3,
    priceData: [232, 235, 238, 241, 244, 243, 246, 247, 248, 246, 245, 244, 243, 244, 245.60],
    volumeData: [8500000, 9200000, 8800000, 10500000, 9800000, 8200000, 12500000, 11200000, 9500000, 10800000, 9200000, 8800000, 11500000, 12200000, 14500000]
  }
];

// Default fundamental criteria (configurable via UI)
const defaultCriteria = {
  marketCapMin: 1000,
  roceMin: 15,
  salesGrowthMin: 12,
  profitGrowthMin: 10,
  peMax: 30,
  deMax: 0.5,
  promoterHoldingMin: 50,
  priceMin: 50
};

// Nifty data for ADX calculation (15 data points)
const niftyData = {
  priceData: [24800, 24850, 24900, 24950, 25000, 24980, 25020, 25080, 25120, 25100, 25080, 25060, 25040, 25060, 25100],
  highData:  [24820, 24870, 24920, 24970, 25020, 25000, 25040, 25100, 25140, 25120, 25100, 25080, 25060, 25080, 25120],
  lowData:   [24780, 24830, 24880, 24930, 24980, 24960, 25000, 25060, 25100, 25080, 25060, 25040, 25020, 25040, 25080]
};

// Momentum thresholds – depend on regime; kept here for clarity
const momentumThresholds = {
  trending: { volumeSpike: 1.5, priceChange: 5 },
  sideways: { volumeSpike: 1.1, priceChange: 0 }
};

// Market regime object (calculated at runtime)
let marketRegime = { adx: 0, regime: 'SIDEWAYS' };

// In-memory screening results
let currentResults = { stage1: [], stage2: [], final: [] };

/**************************************************
 * 2. Initialization – DOMContentLoaded entrypoint
 **************************************************/

document.addEventListener('DOMContentLoaded', () => {
  console.log('[KCMP] Initialising application…');
  try {
    setDefaultInputs();
    computeMarketRegime();
    attachEventListeners();
    updateUniverseStats();
  } catch (err) {
    console.error('[KCMP] Fatal init error:', err);
    alert('Failed to initialise KCMP. Check console for details.');
  }
});

/**************************************************
 * 3. UI helper functions
 **************************************************/
function setDefaultInputs() {
  // Populate fundamental filter inputs with defaults
  document.getElementById('marketCap').value   = defaultCriteria.marketCapMin;
  document.getElementById('roce').value        = defaultCriteria.roceMin;
  document.getElementById('salesGrowth').value = defaultCriteria.salesGrowthMin;
  document.getElementById('profitGrowth').value= defaultCriteria.profitGrowthMin;
  document.getElementById('peMax').value       = defaultCriteria.peMax;
  document.getElementById('deMax').value       = defaultCriteria.deMax;
  document.getElementById('promoterMin').value = defaultCriteria.promoterHoldingMin;
  document.getElementById('priceMin').value    = defaultCriteria.priceMin;
  document.getElementById('bfsiHandling').checked = true;
  resetProgressIndicators();
}

function attachEventListeners() {
  document.getElementById('runScreening').addEventListener('click', runFullScreening);
  document.getElementById('resetFilters').addEventListener('click', () => {
    setDefaultInputs();
    hideAllResultBlocks();
    currentResults = { stage1: [], stage2: [], final: [] };
    updateUniverseStats();
  });

  // Export & analyze buttons are dynamically attached once elements exist
}

function computeMarketRegime() {
  // Calculate ADX using high, low, close arrays
  const adx = calculateADX(niftyData.highData, niftyData.lowData, niftyData.priceData, 14);
  marketRegime.adx = adx;
  marketRegime.regime = adx >= 20 ? 'TRENDING' : 'SIDEWAYS';
  updateRegimeUI();
}

function updateRegimeUI() {
  const regimeLbl = document.getElementById('marketRegime');
  const regimeCardTitle = document.getElementById('regimeTitle');
  const volSpan = document.getElementById('volumeThreshold');
  const priceSpan = document.getElementById('priceThreshold');
  const trending = marketRegime.regime === 'TRENDING';

  regimeLbl.textContent = `Market: ${marketRegime.regime} (ADX: ${marketRegime.adx.toFixed(1)})`;
  regimeCardTitle.textContent = trending ? 'TRENDING Market (ADX ≥ 20)' : 'SIDEWAYS Market (ADX < 20)';
  volSpan.textContent   = `≥ ${trending ? momentumThresholds.trending.volumeSpike : momentumThresholds.sideways.volumeSpike}x`;
  priceSpan.textContent = `≥ ${trending ? momentumThresholds.trending.priceChange : momentumThresholds.sideways.priceChange}%`;
}

function resetProgressIndicators() {
  updateStepStatus(1, '', 'Ready');
  updateStepStatus(2, '', 'Waiting');
  updateStepStatus(3, '', 'Waiting');
}

function updateUniverseStats() {
  document.getElementById('totalStocks').textContent = sampleStocks.length;
  document.getElementById('fundamentalPass').textContent = currentResults.stage1.filter(s => s.fundamental_pass).length;
  document.getElementById('momentumPass').textContent    = currentResults.stage2.filter(s => s.momentum_pass).length;
  document.getElementById('finalPicksStat').textContent  = currentResults.final.length;
}

function hideAllResultBlocks() {
  ['resultsSection','stage1Results','stage2Results','finalPicks','chartSection'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
}

function showBlock(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = 'block';
    el.classList.add('fade-in');
  }
}

/**************************************************
 * 4. Screening pipeline
 **************************************************/
async function runFullScreening() {
  console.group('[KCMP] Full screening pipeline start');
  const runBtn = document.getElementById('runScreening');
  const originalLabel = runBtn.textContent;

  try {
    runBtn.disabled = true;
    hideAllResultBlocks();
    resetProgressIndicators();

    // Stage-1 --------------------------------------------------------------------------------
    updateStepStatus(1, 'active', 'Running…');
    runBtn.textContent = '⏳ Stage 1…';

    await delay(100); // small delay to allow UI repaint
    currentResults.stage1 = fundamentalScreen();
    const passCount = currentResults.stage1.filter(s => s.fundamental_pass).length;
    updateStepStatus(1, 'completed', `${passCount} passed`);
    console.table(currentResults.stage1.map(s => ({symbol:s.symbol, pass:s.fundamental_pass})));
    renderStage1Table();
    updateUniverseStats();
    showBlock('resultsSection');
    showBlock('stage1Results');

    if (passCount === 0) {
      updateStepStatus(2, '', 'No candidates');
      updateStepStatus(3, '', '—');
      console.warn('[KCMP] No stocks passed Stage-1. Screening ends.');
      return;
    }

    // Stage-2 --------------------------------------------------------------------------------
    updateStepStatus(2, 'active', 'Running…');
    runBtn.textContent = '⏳ Stage 2…';

    await delay(100);
    currentResults.stage2 = momentumScreen();
    currentResults.final = currentResults.stage2.filter(s => s.momentum_pass);
    updateStepStatus(2, 'completed', `${currentResults.stage2.length} tested`);
    updateStepStatus(3, 'completed', `${currentResults.final.length} picks`);

    console.table(currentResults.stage2.map(s=>({symbol:s.symbol, pass:s.momentum_pass})));
    renderStage2Table();
    renderFinalPicks();
    renderFunnelChart();
    updateUniverseStats();

  } catch (err) {
    console.error('[KCMP] Pipeline error:', err);
    alert(`Screening aborted: ${err.message}`);
    updateStepStatus(1,'','Error');
  } finally {
    runBtn.disabled = false;
    runBtn.textContent = originalLabel;
    console.groupEnd();
  }
}

/**************** Stage-1 : Fundamental Filtering ****************/
function fundamentalScreen() {
  const c = currentCriteria();
  const bfsiToggle = document.getElementById('bfsiHandling').checked;

  return sampleStocks.map(stock => {
    const stockCopy = {...stock};
    stockCopy.fundamental_pass = testFundamentals(stockCopy, c, bfsiToggle);
    stockCopy.fundamental_reasons = stockCopy.fundamental_pass ? [] : fundamentalFailReasons(stockCopy, c, bfsiToggle);
    return stockCopy;
  });
}

function currentCriteria() {
  return {
    marketCapMin:  parseFloat(document.getElementById('marketCap').value),
    roceMin:       parseFloat(document.getElementById('roce').value),
    salesGrowthMin:parseFloat(document.getElementById('salesGrowth').value),
    profitGrowthMin:parseFloat(document.getElementById('profitGrowth').value),
    peMax:         parseFloat(document.getElementById('peMax').value),
    deMax:         parseFloat(document.getElementById('deMax').value),
    promoterHoldingMin: parseFloat(document.getElementById('promoterMin').value),
    priceMin:      parseFloat(document.getElementById('priceMin').value)
  };
}

function valOrZero(val) { return val === null || val === undefined ? 0 : val; }

function testFundamentals(s, c, bfsi) {
  // Universal checks
  if (s.marketCap < c.marketCapMin) return false;
  if (s.peRatio > c.peMax) return false;
  if (s.promoterHolding < c.promoterHoldingMin) return false;
  if (s.price < c.priceMin) return false;

  // BFSI special handling
  if (bfsi && s.isBFSI) return true;

  // Non-BFSI extra checks
  if (valOrZero(s.roce) < c.roceMin) return false;
  if (valOrZero(s.salesGrowthYoY) < c.salesGrowthMin) return false;
  if (valOrZero(s.profitGrowthYoY) < c.profitGrowthMin) return false;
  if (valOrZero(s.deRatio) > c.deMax) return false;
  return true;
}

function fundamentalFailReasons(s, c, bfsi) {
  const reasons = [];
  if (s.marketCap < c.marketCapMin) reasons.push(`MarketCap < ₹${c.marketCapMin} Cr`);
  if (s.peRatio > c.peMax) reasons.push(`P/E > ${c.peMax}`);
  if (s.promoterHolding < c.promoterHoldingMin) reasons.push(`Promoter % < ${c.promoterHoldingMin}`);
  if (s.price < c.priceMin) reasons.push(`Price < ₹${c.priceMin}`);
  if (!(bfsi && s.isBFSI)) {
    if (valOrZero(s.roce) < c.roceMin) reasons.push(`ROCE < ${c.roceMin}%`);
    if (valOrZero(s.salesGrowthYoY) < c.salesGrowthMin) reasons.push(`SalesGrowth < ${c.salesGrowthMin}%`);
    if (valOrZero(s.profitGrowthYoY) < c.profitGrowthMin) reasons.push(`ProfitGrowth < ${c.profitGrowthMin}%`);
    if (valOrZero(s.deRatio) > c.deMax) reasons.push(`D/E > ${c.deMax}`);
  }
  return reasons;
}

/**************** Stage-2 : Momentum Filtering ****************/
function momentumScreen() {
  const trending = marketRegime.regime === 'TRENDING';
  const volTh   = trending ? momentumThresholds.trending.volumeSpike : momentumThresholds.sideways.volumeSpike;
  const priceTh = trending ? momentumThresholds.trending.priceChange : momentumThresholds.sideways.priceChange;

  return currentResults.stage1.filter(s => s.fundamental_pass).map(stock => {
    const s = { ...stock };
    const metrics = momentumMetrics(s);
    s.price_change_7d = metrics.priceChange;
    s.volume_spike    = metrics.volumeSpike;
    s.obv_trend       = metrics.obvTrend;

    s.momentum_pass = metrics.obvTrend === 'Up' &&
                      metrics.volumeSpike >= volTh &&
                      metrics.priceChange >= priceTh;

    if (!s.momentum_pass) {
      s.momentum_reasons = momentumFailReasons(metrics, volTh, priceTh);
    }
    return s;
  });
}

function momentumMetrics(s) {
  const prices = s.priceData;
  const vols   = s.volumeData;
  // Guard minimal length
  if (prices.length < 8 || vols.length < 2) {
    console.warn(`[KCMP] Not enough data for momentum on ${s.symbol}`);
    return { priceChange: 0, volumeSpike: 0, obvTrend: 'Down' };
  }
  const priceChange = ((prices[prices.length-1] - prices[prices.length-8]) / prices[prices.length-8]) * 100;
  const currentVol  = vols[vols.length-1];
  const avgVol      = average(vols.slice(0,-1));
  const volumeSpike = currentVol / avgVol;
  const obvTrend    = calculateOBVTrend(prices, vols);
  return { priceChange, volumeSpike, obvTrend };
}

function momentumFailReasons(m, volTh, priceTh) {
  const r = [];
  if (m.obvTrend !== 'Up') r.push('OBV not rising');
  if (m.volumeSpike < volTh) r.push(`VolSpike < ${volTh.toFixed(1)}x`);
  if (m.priceChange < priceTh) r.push(`PriceΔ < ${priceTh}%`);
  return r;
}

/**************************************************
 * 5. Rendering helpers
 **************************************************/
function renderStage1Table() {
  const body = document.getElementById('stage1TableBody');
  body.innerHTML = '';
  const sortStocks = [...currentResults.stage1].sort((a,b)=> (a.fundamental_pass===b.fundamental_pass)?0 : a.fundamental_pass? -1 : 1);
  sortStocks.forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><div class="stock-name">${s.company}</div><div class="stock-symbol">${s.symbol}</div></td>
      <td>${s.sector}</td>
      <td>₹${numFormat(s.marketCap)}</td>
      <td>${s.roce !== null ? s.roce : '—'}%</td>
      <td>${s.peRatio}</td>
      <td>${s.promoterHolding}%</td>
      <td><span class="${s.fundamental_pass?'status-pass':'status-fail'}">${s.fundamental_pass ? '✓ PASS' : '✗ FAIL' }</span></td>`;
    body.appendChild(tr);
  });
}

function renderStage2Table() {
  const body = document.getElementById('stage2TableBody');
  body.innerHTML='';
  currentResults.stage2.forEach(s => {
    const tr=document.createElement('tr');
    tr.innerHTML=`
     <td><div class="stock-name">${s.company}</div><div class="stock-symbol">${s.symbol}</div></td>
     <td>₹${s.price}</td>
     <td>${s.price_change_7d>=0?'+':''}${s.price_change_7d.toFixed(1)}%</td>
     <td>${s.volume_spike.toFixed(2)}x</td>
     <td>${s.obv_trend}</td>
     <td><span class="${s.momentum_pass?'status-pass':'status-fail'}">${s.momentum_pass?'✓ PASS':'✗ FAIL'}</span></td>`;
    body.appendChild(tr);
  });
  showBlock('stage2Results');
}

function renderFinalPicks() {
  const container = document.getElementById('picksContainer');
  container.innerHTML='';
  if (currentResults.final.length === 0) {
    container.innerHTML = '<div style="grid-column:1/-1;padding:40px;text-align:center;color:var(--color-text-secondary);">No stock qualified both stages.</div>';
  } else {
    currentResults.final.forEach(s => {
      const card=document.createElement('div');
      card.className='pick-card';
      card.innerHTML=`
        <div class="pick-header"><div class="pick-name">${s.company}</div><div class="pick-price">₹${s.price}</div></div>
        <div class="pick-details">
          <div class="pick-detail"><span>Sector:</span><span>${s.sector}</span></div>
          <div class="pick-detail"><span>MCap:</span><span>₹${numFormat(s.marketCap)}</span></div>
          <div class="pick-detail"><span>7d Δ:</span><span>${s.price_change_7d.toFixed(1)}%</span></div>
          <div class="pick-detail"><span>VolSpike:</span><span>${s.volume_spike.toFixed(2)}x</span></div>
          <div class="pick-detail"><span>P/E:</span><span>${s.peRatio}</span></div>
          <div class="pick-detail"><span>ROCE:</span><span>${s.roce !== null? s.roce+'%' : '—'}</span></div>
        </div>`;
      container.appendChild(card);
    });
  }
  // Attach export/analyze after DOM present
  setTimeout(()=>{
    document.getElementById('exportCSV').onclick = exportCSV;
    document.getElementById('analyzePortfolio').onclick = analyzePortfolio;
  },50);

  showBlock('finalPicks');
}

function renderFunnelChart() {
  const ctx = document.getElementById('performanceChart');
  if (!ctx) return;
  const prev = Chart.getChart(ctx);
  if (prev) prev.destroy();
  const total = sampleStocks.length;
  const stage1 = currentResults.stage1.filter(s=>s.fundamental_pass).length;
  const stage2 = currentResults.final.length;

  new Chart(ctx, {
    type:'bar',
    data:{
      labels:['Universe','Stage 1','Stage 2'],
      datasets:[{
        label:'Stocks',
        data:[total, stage1, stage2],
        backgroundColor:['#1FB8CD','#FFC185','#B4413C'],
        borderColor:['#1FB8CD','#FFC185','#B4413C'],
        borderWidth:1
      }]
    },
    options:{
      responsive:true,
      maintainAspectRatio:false,
      plugins:{
        legend:{display:false},
        title:{display:true,text:'KCMP Screening Funnel'}
      },
      scales:{y:{beginAtZero:true}}
    }
  });
  showBlock('chartSection');
}

function updateStepStatus(step, statusClass, text) {
  const stepEl = document.getElementById(`step${step}`);
  const statusEl = document.getElementById(`step${step}Status`);
  stepEl.className = `progress-step ${statusClass}`.trim();
  statusEl.textContent = text;
}

/**************************************************
 * 6. Export / Analyze handlers
 **************************************************/
function exportCSV() {
  if (currentResults.final.length===0) return alert('No picks to export');
  const header=['Symbol','Company','Sector','Price','MCap','PE','ROCE','7dChange','VolSpike'];
  const rows=currentResults.final.map(s=>[
    s.symbol,s.company,s.sector,s.price,s.marketCap,s.peRatio,s.roce,s.price_change_7d.toFixed(1),s.volume_spike.toFixed(2)]);
  const csv=[header.join(','),...rows.map(r=>r.join(','))].join('\n');
  const blob=new Blob([csv],{type:'text/csv'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download='KCMP_Picks.csv';a.click();URL.revokeObjectURL(url);
}

function analyzePortfolio(){
  if(currentResults.final.length===0) return alert('Run screening first');
  const summary=currentResults.final.reduce((acc,s)=>{
    acc.totalMCap+=s.marketCap;acc.avgPE+=s.peRatio;acc.sectors[s.sector]=(acc.sectors[s.sector]||0)+1;return acc;},
    {totalMCap:0,avgPE:0,sectors:{}});
  summary.avgPE/=currentResults.final.length;
  const sectorList=Object.entries(summary.sectors).map(([sec,c])=>`${sec}: ${c}`).join('\n');
  alert(`Picks: ${currentResults.final.length}\nTotal MCap: ₹${numFormat(summary.totalMCap)}\nAvg PE: ${summary.avgPE.toFixed(1)}\n\nSector Split:\n${sectorList}`);
}

/**************************************************
 * 7. Technical utilities (math helpers)
 **************************************************/
function average(arr){return arr.reduce((a,b)=>a+b,0)/arr.length;}

// Wilder's smoothing ADX implementation (period default 14)
function calculateADX(highs,lows,closes,period=14){
  if(highs.length!==lows.length||lows.length!==closes.length) throw new Error('ADX arrays mismatch');
  const len=highs.length;
  if(len<=period) return 0;
  let trs=[],plusDM=[],minusDM=[];
  for(let i=1;i<len;i++){
    const upMove=highs[i]-highs[i-1];
    const downMove=lows[i-1]-lows[i];
    plusDM.push((upMove>downMove&&upMove>0)?upMove:0);
    minusDM.push((downMove>upMove&&downMove>0)?downMove:0);
    trs.push(Math.max(highs[i]-lows[i],Math.abs(highs[i]-closes[i-1]),Math.abs(lows[i]-closes[i-1])));
  }
  // Wilder smoothing
  const smoothed=(arr)=>{
    let result=[arr.slice(0,period).reduce((a,b)=>a+b,0)];
    for(let i=period;i<arr.length;i++) result.push(result[result.length-1]-result[result.length-1]/period+arr[i]);
    return result;
  };
  const tr14=smoothed(trs);
  const pDM14=smoothed(plusDM);
  const mDM14=smoothed(minusDM);
  const dx=[];
  for(let i=0;i<tr14.length;i++){
    const pDI=100*(pDM14[i]/tr14[i]);
    const mDI=100*(mDM14[i]/tr14[i]);
    const diff=Math.abs(pDI-mDI);
    const sum=pDI+mDI;
    dx.push(sum===0?0:(100*diff/sum));
  }
  // ADX
  const adx=dx.slice(0,period).reduce((a,b)=>a+b,0)/period; // simple average of first period dx
  return adx;
}

function calculateOBVTrend(prices,vols){
  let obv=0;
  const obvSeries=[0];
  for(let i=1;i<prices.length;i++){
    if(prices[i]>prices[i-1]) obv+=vols[i];
    else if(prices[i]<prices[i-1]) obv-=vols[i];
    obvSeries.push(obv);
  }
  const window=7;
  if(obvSeries.length<=window) return 'Down';
  const slope = obvSeries[obvSeries.length-1]-obvSeries[obvSeries.length-window];
  return slope>0?'Up':'Down';
}

function delay(ms){return new Promise(res=>setTimeout(res,ms));}

function numFormat(n){
  if(n>=1e7) return (n/1e7).toFixed(1)+'Cr';
  if(n>=1e5) return (n/1e5).toFixed(1)+'L';
  if(n>=1e3) return (n/1e3).toFixed(1)+'K';
  return n.toString();
}

/**************************************************
 * 8. Debug Exposure
 **************************************************/
window.KCMP = { sampleStocks, runFullScreening, marketRegime, currentResults };

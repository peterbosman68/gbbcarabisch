const menuButton = document.querySelector('[data-menu-button]');
const nav = document.querySelector('[data-nav]');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && reveals.length) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  reveals.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 90, 360)}ms`;
    observer.observe(item);
  });
} else {
  reveals.forEach((item) => item.classList.add('visible'));
}

const dashboardRoot = document.querySelector('[data-dashboard-root]');

if (dashboardRoot) {
  const dashboardFilter = document.querySelector('[data-hotel-filter]');
  const dashboardMetrics = document.querySelector('[data-dashboard-metrics]');
  const dashboardTableBody = document.querySelector('[data-dashboard-table-body]');
  const dashboardTimestamp = document.querySelector('[data-dashboard-timestamp]');
  const occupancyChart = document.querySelector('[data-occupancy-chart]');
  const financeTrend = document.querySelector('[data-finance-trend]');
  const signalSummary = document.querySelector('[data-signal-summary]');

  const months = ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei'];

  const hotels = [
    {
      name: 'GBBC Hotel Arena',
      region: 'Amsterdam',
      occupancy: 84,
      occupancyTrend: [76, 78, 80, 82, 84],
      revenue: 182400,
      costs: 121800,
      absenceRate: 4.2,
      fte: 31.4,
      sickEmployees: 3,
      guestSentiment: 8.6,
      managerMood: 7.8,
      source: 'PMS / Finance / HR'
    },
    {
      name: 'GBBC Hotel Centrum',
      region: 'Rotterdam',
      occupancy: 79,
      occupancyTrend: [72, 73, 75, 77, 79],
      revenue: 164900,
      costs: 118200,
      absenceRate: 5.1,
      fte: 28.2,
      sickEmployees: 4,
      guestSentiment: 8.1,
      managerMood: 7.2,
      source: 'PMS / Finance / HR'
    },
    {
      name: 'GBBC Hotel Kade',
      region: 'Den Haag',
      occupancy: 76,
      occupancyTrend: [69, 70, 72, 74, 76],
      revenue: 151200,
      costs: 109700,
      absenceRate: 3.8,
      fte: 26.1,
      sickEmployees: 2,
      guestSentiment: 8.4,
      managerMood: 8.0,
      source: 'PMS / Finance / HR'
    },
    {
      name: 'GBBC Suites Park',
      region: 'Utrecht',
      occupancy: 82,
      occupancyTrend: [75, 77, 78, 80, 82],
      revenue: 170600,
      costs: 114100,
      absenceRate: 4.9,
      fte: 27.8,
      sickEmployees: 3,
      guestSentiment: 8.9,
      managerMood: 8.5,
      source: 'PMS / Finance / HR'
    },
    {
      name: 'GBBC Hotel Rivier',
      region: 'Arnhem',
      occupancy: 73,
      occupancyTrend: [70, 71, 70, 72, 73],
      revenue: 142300,
      costs: 101900,
      absenceRate: 6.2,
      fte: 24.3,
      sickEmployees: 5,
      guestSentiment: 7.8,
      managerMood: 6.9,
      source: 'PMS / Finance / HR'
    },
    {
      name: 'GBBC Hotel Strand',
      region: 'Scheveningen',
      occupancy: 88,
      occupancyTrend: [81, 82, 84, 86, 88],
      revenue: 196700,
      costs: 133500,
      absenceRate: 3.4,
      fte: 33.7,
      sickEmployees: 2,
      guestSentiment: 9.1,
      managerMood: 8.8,
      source: 'PMS / Finance / HR'
    },
    {
      name: 'GBBC Boutique Noorder',
      region: 'Groningen',
      occupancy: 69,
      occupancyTrend: [66, 67, 67, 68, 69],
      revenue: 129800,
      costs: 96800,
      absenceRate: 4.6,
      fte: 21.9,
      sickEmployees: 2,
      guestSentiment: 8.0,
      managerMood: 7.4,
      source: 'PMS / Finance / HR'
    },
    {
      name: 'GBBC Hotel Maaszicht',
      region: 'Maastricht',
      occupancy: 81,
      occupancyTrend: [74, 76, 77, 79, 81],
      revenue: 173900,
      costs: 119600,
      absenceRate: 5.4,
      fte: 29.5,
      sickEmployees: 4,
      guestSentiment: 8.7,
      managerMood: 7.9,
      source: 'PMS / Finance / HR'
    },
    {
      name: 'GBBC Hotel Veluwe',
      region: 'Apeldoorn',
      occupancy: 74,
      occupancyTrend: [69, 70, 72, 73, 74],
      revenue: 146500,
      costs: 104300,
      absenceRate: 4.1,
      fte: 23.6,
      sickEmployees: 2,
      guestSentiment: 8.3,
      managerMood: 7.6,
      source: 'PMS / Finance / HR'
    },
    {
      name: 'GBBC Hotel Havenkwartier',
      region: 'Vlissingen',
      occupancy: 71,
      occupancyTrend: [67, 67, 68, 69, 71],
      revenue: 137400,
      costs: 99800,
      absenceRate: 6.0,
      fte: 22.8,
      sickEmployees: 4,
      guestSentiment: 7.9,
      managerMood: 6.8,
      source: 'PMS / Finance / HR'
    },
    {
      name: 'GBBC Hotel Poort',
      region: 'Eindhoven',
      occupancy: 86,
      occupancyTrend: [79, 80, 82, 84, 86],
      revenue: 188100,
      costs: 126700,
      absenceRate: 3.7,
      fte: 30.2,
      sickEmployees: 2,
      guestSentiment: 8.8,
      managerMood: 8.2,
      source: 'PMS / Finance / HR'
    }
  ];

  const formatCurrency = (value) =>
    new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);

  const formatDecimal = (value) =>
    new Intl.NumberFormat('nl-NL', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value);

  const getFilteredHotels = () => {
    const selectedRegion = dashboardFilter ? dashboardFilter.value : 'all';
    if (selectedRegion === 'all') {
      return hotels;
    }

    return hotels.filter((hotel) => hotel.region === selectedRegion);
  };

  const average = (items, key) => items.reduce((sum, item) => sum + item[key], 0) / items.length;
  const sum = (items, key) => items.reduce((total, item) => total + item[key], 0);

  const getSignal = (hotel) => {
    const margin = hotel.revenue === 0 ? 0 : ((hotel.revenue - hotel.costs) / hotel.revenue) * 100;
    let score = 0;

    score += hotel.occupancy >= 80 ? 2 : hotel.occupancy >= 74 ? 1 : 0;
    score += margin >= 28 ? 2 : margin >= 22 ? 1 : 0;
    score += hotel.absenceRate <= 4.2 ? 2 : hotel.absenceRate <= 5.3 ? 1 : 0;
    score += hotel.guestSentiment >= 8.5 ? 2 : hotel.guestSentiment >= 7.8 ? 1 : 0;
    score += hotel.managerMood >= 8 ? 2 : hotel.managerMood >= 7 ? 1 : 0;

    if (score >= 8) {
      return { key: 'green', label: 'Groen' };
    }

    if (score >= 6) {
      return { key: 'amber', label: 'Oranje' };
    }

    return { key: 'red', label: 'Rood' };
  };

  const createSparkline = (values, signal) => {
    const width = 88;
    const height = 24;
    const minValue = Math.min(...values) - 2;
    const maxValue = Math.max(...values) + 2;
    const range = maxValue - minValue || 1;
    const stepX = width / (values.length - 1);
    const points = values
      .map((value, index) => {
        const x = Math.round(index * stepX * 100) / 100;
        const y = Math.round((height - ((value - minValue) / range) * height) * 100) / 100;
        return `${x},${y}`;
      })
      .join(' ');

    const tone = signal.key === 'green' ? 'good' : signal.key === 'amber' ? 'warn' : 'bad';

    return `
      <svg class="sparkline ${tone}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Trend bezetting laatste maanden">
        <polyline class="sparkline-path" points="${points}"></polyline>
      </svg>
    `;
  };

  const renderOccupancyChart = (items) => {
    if (!occupancyChart) {
      return;
    }

    occupancyChart.innerHTML = items
      .map((hotel) => {
        const width = Math.max(8, Math.min(hotel.occupancy, 100));

        return `
          <div class="bar-row">
            <span>${hotel.name.replace('GBBC ', '')}</span>
            <div class="bar-track" aria-hidden="true">
              <div class="bar-fill" style="width:${width}%;"></div>
            </div>
            <span class="bar-value">${hotel.occupancy}%</span>
          </div>
        `;
      })
      .join('');
  };

  const renderFinanceTrend = (items) => {
    if (!financeTrend) {
      return;
    }

    const factors = [0.9, 0.93, 0.95, 0.97, 1];
    const trendValues = factors.map((factor) =>
      items.reduce((total, hotel) => total + (hotel.revenue * factor - hotel.costs * factor), 0)
    );

    const width = 360;
    const height = 170;
    const paddingX = 28;
    const paddingY = 24;
    const innerWidth = width - paddingX * 2;
    const innerHeight = height - paddingY * 2;
    const minValue = Math.min(...trendValues) * 0.96;
    const maxValue = Math.max(...trendValues) * 1.04;
    const valueRange = maxValue - minValue || 1;

    const points = trendValues.map((value, index) => {
      const x = paddingX + (index / (trendValues.length - 1)) * innerWidth;
      const y = paddingY + (1 - (value - minValue) / valueRange) * innerHeight;
      return { x, y, value, month: months[index] };
    });

    const path = points.map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(' ');

    financeTrend.innerHTML = `
      <svg class="line-chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Resultaattrend laatste 5 maanden">
        <line class="line-chart-grid" x1="${paddingX}" y1="${height - paddingY}" x2="${width - paddingX}" y2="${height - paddingY}"></line>
        <line class="line-chart-grid" x1="${paddingX}" y1="${paddingY}" x2="${paddingX}" y2="${height - paddingY}"></line>
        <polyline class="line-chart-path" points="${path}"></polyline>
        ${points
          .map(
            (point) => `
              <circle class="line-chart-point" cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="4"></circle>
              <text class="line-chart-label" x="${point.x.toFixed(2)}" y="${height - 6}" text-anchor="middle">${point.month}</text>
            `
          )
          .join('')}
      </svg>
    `;
  };

  const renderSignalSummary = (items) => {
    if (!signalSummary) {
      return;
    }

    const summary = { green: 0, amber: 0, red: 0 };

    items.forEach((hotel) => {
      const signal = getSignal(hotel);
      summary[signal.key] += 1;
    });

    signalSummary.innerHTML = `
      <div class="signal-item">
        <strong>Groen (stabiel)</strong>
        <span class="signal-count">${summary.green}</span>
      </div>
      <div class="signal-item">
        <strong>Oranje (aandacht)</strong>
        <span class="signal-count">${summary.amber}</span>
      </div>
      <div class="signal-item">
        <strong>Rood (ingrijpen)</strong>
        <span class="signal-count">${summary.red}</span>
      </div>
    `;
  };

  const renderMetrics = (items) => {
    const avgOccupancy = average(items, 'occupancy');
    const totalRevenue = sum(items, 'revenue');
    const totalCosts = sum(items, 'costs');
    const avgMood = average(items, 'managerMood');
    const margin = totalRevenue === 0 ? 0 : ((totalRevenue - totalCosts) / totalRevenue) * 100;

    dashboardMetrics.innerHTML = `
      <article class="kpi-card reveal visible">
        <span>Gem. bezettingsgraad</span>
        <strong>${Math.round(avgOccupancy)}%</strong>
        <p>${items.length} hotels in selectie</p>
      </article>
      <article class="kpi-card reveal visible">
        <span>Omzet per selectie</span>
        <strong>${formatCurrency(totalRevenue)}</strong>
        <p>Marge ${formatDecimal(margin)}%</p>
      </article>
      <article class="kpi-card reveal visible">
        <span>Operationele kosten</span>
        <strong>${formatCurrency(totalCosts)}</strong>
        <p>Direct uit finance-bronnen</p>
      </article>
      <article class="kpi-card reveal visible">
        <span>Manager sentiment</span>
        <strong>${formatDecimal(avgMood)}/10</strong>
        <p>Handmatige input per hotelmanager</p>
      </article>
    `;
  };

  const renderTable = (items) => {
    dashboardTableBody.innerHTML = items
      .map((hotel) => {
        const signal = getSignal(hotel);
        const sparkline = createSparkline(hotel.occupancyTrend, signal);

        return `
          <tr>
            <td>
              <strong>${hotel.name}</strong><br />
              ${hotel.region}
            </td>
            <td>${hotel.occupancy}%</td>
            <td>${sparkline}</td>
            <td>${formatCurrency(hotel.revenue)}</td>
            <td>${formatCurrency(hotel.costs)}</td>
            <td>${formatDecimal(hotel.absenceRate)}%</td>
            <td>${formatDecimal(hotel.fte)}</td>
            <td>${hotel.sickEmployees}</td>
            <td><span class="score-badge">${formatDecimal(hotel.guestSentiment)}</span></td>
            <td><span class="score-badge">${formatDecimal(hotel.managerMood)}</span></td>
            <td><span class="signal-pill ${signal.key}">${signal.label}</span></td>
          </tr>
        `;
      })
      .join('');
  };

  const renderTimestamp = () => {
    if (!dashboardTimestamp) {
      return;
    }

    dashboardTimestamp.textContent = new Intl.DateTimeFormat('nl-NL', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date());
  };

  const renderDashboard = () => {
    const filteredHotels = getFilteredHotels();
    renderMetrics(filteredHotels);
    renderOccupancyChart(filteredHotels);
    renderFinanceTrend(filteredHotels);
    renderSignalSummary(filteredHotels);
    renderTable(filteredHotels);
    renderTimestamp();
  };

  if (dashboardFilter) {
    dashboardFilter.addEventListener('change', renderDashboard);
  }

  renderDashboard();
}

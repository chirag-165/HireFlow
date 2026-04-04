const computeStats = (apps) =>{
    const stats = {
      total: 0,
      interviews: 0,
      offers: 0,
      rejected: 0,
      applied: 0,
      conversionRate: 0,
      weeklyApplications: 0,
      weeklyInterviews: 0,
      topCompanies: {},
      recent: [],
    };

    const statusMap = {
      interview: "interviews",
      offer: "offers",
      rejected: "rejected",
      applied: "applied",
    };

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    // 🔥 SINGLE LOOP (optimized)
    for (const app of apps) {
      stats.total++;

      const statusKey = statusMap[app.status?.toLowerCase()];
      if (statusKey) stats[statusKey]++;

      // 🔥 Weekly stats
      const createdAt = new Date(app.createdAt);
      if (createdAt >= last7Days) {
        stats.weeklyApplications++;

        if (app.status?.toLowerCase() === "interview") {
          stats.weeklyInterviews++;
        }
      }

      // 🔥 Top companies
      if (app.company) {
        stats.topCompanies[app.company] =
          (stats.topCompanies[app.company] || 0) + 1;
      }
    }

    // 🔥 Conversion rate
    stats.conversionRate =
      stats.total > 0
        ? ((stats.offers / stats.total) * 100).toFixed(1)
        : 0;

    // 🔥 Convert top companies to sorted array
    const topCompanies = Object.entries(stats.topCompanies)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([company, count]) => ({ company, count }));

    // 🔥 Recent applications
    const recent = [...apps]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    return ({
      total: stats.total,
      interviews: stats.interviews,
      offers: stats.offers,
      rejected: stats.rejected,
      applied: stats.applied,
      conversionRate: stats.conversionRate,

      weekly: {
        applications: stats.weeklyApplications,
        interviews: stats.weeklyInterviews,
      },

      topCompanies,
      recent,
    });
}

export default computeStats;

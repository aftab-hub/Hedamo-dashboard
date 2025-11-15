import Product from "../models/Product.js";


export const getStats = async (req, res) => {
  try {
    const products = await Product.find();

    const totalProducts = products.length;
    const avgScore =
      totalProducts > 0
        ? Math.round(products.reduce((s, p) => s + (p.score || 0), 0) / totalProducts)
        : 0;
    const flaggedProducts = products.filter((p) => (p.flags?.length || 0) > 0).length;
    const suggestionsCount = products.reduce((s, p) => s + (p.suggestions?.length || 0), 0);

    // monthly trend (average score per month)
    const monthly = {};
    products.forEach((p) => {
      const month = p.createdAt ? new Date(p.createdAt).toLocaleString("default", { month: "short", year: "numeric" }) : "Unknown";
      if (!monthly[month]) monthly[month] = { month, total: 0, count: 0 };
      monthly[month].total += p.score || 0;
      monthly[month].count += 1;
    });
    const trend = Object.values(monthly)
      .map((m) => ({ month: m.month, avgScore: Math.round(m.total / m.count) }))
      .sort((a, b) => new Date(a.month) - new Date(b.month)); // best-effort chronology

    res.json({ totalProducts, avgScore, flaggedProducts, suggestionsCount, trend });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to compute stats" });
  }
}
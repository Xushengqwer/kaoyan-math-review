// 高数第 4 章第⑥站「压到坐标面上」的投影示意图（6 张）。生成：
//   node tools/surface-fig.cjs drafts/calculus-vec-projections-v1.cjs assets/images/surfaces
// 例子与方程由第 4 章重写会话核过（2026-10-17）；风格同第⑤站（drafts/calculus-vec-surfaces-v1.cjs）。
// 图里标签只写名字，方程放图注（图注一行不超过画布宽，生成时超了会警告）。
module.exports = ({ M }) => {
  const { sin, cos, sqrt, acos, PI } = M;
  const T = 2 * PI;
  const circ = (r, z, cx = 0, cy = 0) => (u) => [cx + r * cos(u), cy + r * sin(u), z];
  const seg = (p, q) => (t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t, p[2] + (q[2] - p[2]) * t];
  const angles = (n, from = 0) => Array.from({ length: n }, (_, k) => from + (T * k) / n);
  // 竖直往 xOy 面压的虚线箭头
  const drops = (pts, c = "k4") => pts.map((p) => ({ f: seg(p, [p[0], p[1], 0]), t: [0, 1], n: 40, c, w: 1.3, dash: true, arrow: "end" }));
  const disk = (r, extra) => ({ f: (u, q) => [q * cos(u), q * sin(u), 0], u: [0, T], v: [0.001, r], fill: [48, 4], region: true, occlude: false, ...extra });
  const figs = [];

  // 1. 两曲面相交成空间曲线：球面 x²+y²+z²=2 与旋转抛物面 z=x²+y² 交于 z=1 上的圆
  {
    const R = sqrt(2), rp = 1.28;
    figs.push({
      name: "proj-intersection-curve", title: "两曲面相交 → 空间曲线", alt: "球面 x²+y²+z²=2 与旋转抛物面 z=x²+y² 交于 z=1 上的圆 x²+y²=1",
      view: { az: 30, el: 22 },
      axes: { x: [0, 2.2], y: [0, 2.2], z: [0, 2.3] },
      surfaces: [
        { f: (u, v) => [R * sin(v) * cos(u), R * sin(v) * sin(u), R * cos(v)], u: [0, T], v: [0.001, PI - 0.001], fill: [36, 18], occ: [96, 48], alpha: 0.32, ramp: "o" },
        { f: (u, r) => [r * cos(u), r * sin(u), r * r], u: [0, T], v: [0.001, rp], fill: [36, 10], occ: [96, 28], alpha: 0.5, ramp: "i" },
      ],
      curves: [{ f: circ(1, 1), t: [0, T], c: "k1", w: 3.2 }],
      labels: [
        { at: [R * sin(2.2) * cos(-0.9), R * sin(2.2) * sin(-0.9), R * cos(2.2)], text: "球面", dx: -30, dy: 34, anchor: "end", c: "k4", lead: true },
        { at: [rp * cos(1.0), rp * sin(1.0), rp * rp], text: "旋转抛物面", dx: 12, dy: -6, c: "k4" },
        { at: [cos(-0.5), sin(-0.5), 1], text: "交线", dx: 54, dy: 30, c: "k1", lead: true },
      ],
      caption: ["$x^2+y^2+z^2=2$ 与 $z=x^2+y^2$ 联立", "$z+z^2=2$，$z=1$：交线是圆 $x^2+y^2=1$"],
    });
  }

  // 2. 投影柱面与投影曲线：同一条曲线，竖直往下
  {
    const H = 1.35;
    figs.push({
      name: "proj-cylinder-and-curve", title: "投影柱面与投影曲线", alt: "曲线 C 竖直往下：母线围成投影柱面 x²+y²=1，落到 xOy 面上是投影曲线 x²+y²=1，z=0",
      view: { az: 30, el: 24 },
      axes: { x: [0, 2.0], y: [0, 2.1], z: [0, 2.1] },
      planes: [{ o: [-1.6, -1.6, 0], e1: [3.2, 0, 0], e2: [0, 3.2, 0], n: 12 }],
      surfaces: [{ f: (u, z) => [cos(u), sin(u), z], u: [0, T], v: [0, H], fill: [48, 3], alpha: 0.32, ramp: "o", mesh: { u: angles(12, 0.26) } }],
      curves: [
        { f: circ(1, 1), t: [0, T], c: "k1", w: 3.2 },
        { f: circ(1, 0), t: [0, T], c: "k2", w: 3.2 },
        ...drops([-0.75, 0.75, 2.4].map((u) => [cos(u), sin(u), 1])),
      ],
      labels: [
        { at: [cos(1.2), sin(1.2), 1], text: "空间曲线 $C$", dx: 40, dy: -40, c: "k1", lead: true },
        { at: [cos(-1.4), sin(-1.4), H], text: "投影柱面", dx: -16, dy: -26, anchor: "end", c: "k4", lead: true },
        { at: [cos(-0.1), sin(-0.1), 0], text: "投影曲线", dx: 40, dy: 34, c: "k2", lead: true },
      ],
      caption: ["投影柱面：$x^2+y^2=1$（空间里的一张面）", "投影曲线：$x^2+y^2=1$，$z=0$（一条线）"],
    });
  }

  // 3. 消元会多出一段：x²+y²+z²=1 与 x=z² 的交线，投影只是 x≥0 的那段弧
  {
    const zm = sqrt((sqrt(5) - 1) / 2);
    const cY = (g) => (t) => [t * t, g * sqrt(Math.max(0, 1 - t * t - t ** 4)), t];
    const rc = sqrt(5) / 2, cx = -0.5, ph = acos(0.5 / rc);
    figs.push({
      name: "proj-elimination-extra", title: "消元会多出一段", alt: "x²+y²+z²=1 与 x=z² 的交线；消去 z 得 (x+1/2)²+y²=5/4，但 x=z²≥0，投影只是 x≥0 的那段弧",
      view: { az: 40, el: 30 },
      axes: { x: [0, 1.9], y: [0, 1.9], z: [0, 1.7] },
      surfaces: [{ f: (u, v) => [sin(v) * cos(u), sin(v) * sin(u), cos(v)], u: [0, T], v: [0.001, PI - 0.001], fill: [36, 18], occ: [96, 48], alpha: 0.16, ramp: "o" }],
      curves: [
        { f: cY(1), t: [-zm, zm], c: "k1", w: 3 },
        { f: cY(-1), t: [-zm, zm], c: "k1", w: 3 },
        { f: circ(rc, 0, cx, 0), t: [0, T], n: 300, c: "k4", w: 1.6, dash: true },
        { f: circ(rc, 0, cx, 0), t: [-ph, ph], c: "k2", w: 3.2, hidden: "show" },
        ...drops([cY(1)(0.6), cY(-1)(0.6), cY(1)(-zm * 0.98)]),
      ],
      labels: [
        { at: cY(1)(0.5), text: "$C$", dx: 26, dy: -22, c: "k1", lead: true },
        { at: circ(rc, 0, cx, 0)(-0.6), text: "$x\\ge 0$ 的弧：投影", dx: -20, dy: 56, anchor: "middle", c: "k2", lead: true },
        { at: circ(rc, 0, cx, 0)(PI), text: "整圆（多出来的）", dx: 14, dy: -16, c: "k4", lead: true },
      ],
      caption: ["$C$：$x^2+y^2+z^2=1$ 与 $x=z^2$ 的交线", "消 $z$ 得 $(x+\\frac12)^2+y^2=\\frac54$，但 $x=z^2\\ge 0$"],
    });
  }

  // 4. 上下两张曲面围成的立体：锥面 z=√(x²+y²) 与上半球面 z=√(2−x²−y²)
  {
    const R = sqrt(2);
    figs.push({
      name: "proj-cone-hemisphere", title: "上下两张面围成的立体", alt: "锥面 z=√(x²+y²) 与上半球面 z=√(2−x²−y²) 交于 z=1、x²+y²=1，投影区域 D_xy: x²+y²≤1",
      view: { az: 30, el: 24 },
      axes: { x: [0, 2.0], y: [0, 2.0], z: [0, 2.2] },
      surfaces: [
        disk(1),
        { f: (u, r) => [r * cos(u), r * sin(u), r], u: [0, T], v: [0.01, 1], fill: [48, 10], ramp: "o", mesh: { u: angles(12, 0.26) } },
        { f: (u, v) => [R * sin(v) * cos(u), R * sin(v) * sin(u), R * cos(v)], u: [0, T], v: [0.001, PI / 4], fill: [48, 8], ramp: "i", boundary: false },
      ],
      curves: [
        { f: circ(1, 1), t: [0, T], c: "k1", w: 3 },
        { f: circ(1, 0), t: [0, T], c: "k2", w: 2.8 },
        ...drops([-0.4, 0.9, 2.6].map((u) => [cos(u), sin(u), 1])),
      ],
      labels: [
        { at: [0.5 * cos(1.2), 0.5 * sin(1.2), sqrt(2 - 0.25)], text: "上半球面", dx: 40, dy: -30, c: "k4", lead: true },
        { at: [0.6 * cos(-1.3), 0.6 * sin(-1.3), 0.6], text: "锥面", dx: -50, dy: 6, anchor: "end", c: "k4", lead: true },
        { at: [cos(0.3), sin(0.3), 1], text: "交线", dx: 40, dy: -4, c: "k1", lead: true },
        { at: [0.7 * cos(-0.4), 0.7 * sin(-0.4), 0], text: "$D_{xy}$", dx: 36, dy: 36, c: "k2", lead: true },
      ],
      caption: ["锥面 $z=\\sqrt{x^2+y^2}$，上半球面 $z=\\sqrt{2-x^2-y^2}$", "交于 $z=1$，$x^2+y^2=1$ → $D_{xy}$：$x^2+y^2\\le 1$"],
    });
  }

  // 5. 侧面是竖直柱面的立体：x²+y²≤1，0≤z≤x²+y²+1
  {
    figs.push({
      name: "proj-cylinder-solid", title: "侧面是柱面的立体", alt: "圆柱 x²+y²≤1、下底 z=0、上顶 z=x²+y²+1；柱面的准线就是 D_xy 的边界 x²+y²=1",
      view: { az: 30, el: 26 },
      axes: { x: [0, 2.0], y: [0, 2.0], z: [0, 2.8] },
      surfaces: [
        disk(1),
        { f: (u, z) => [cos(u), sin(u), z], u: [0, T], v: [0, 2], fill: [48, 3], ramp: "o", mesh: { u: angles(12, 0.26) }, boundary: false },
        { f: (u, r) => [r * cos(u), r * sin(u), r * r + 1], u: [0, T], v: [0.001, 1], fill: [48, 10], ramp: "i", boundary: false },
      ],
      curves: [
        { f: circ(1, 2), t: [0, T], c: "k4", w: 1.6 },
        { f: circ(1, 0), t: [0, T], c: "k2", w: 3 },
      ],
      labels: [
        { at: [0.6 * cos(1.6), 0.6 * sin(1.6), 1.36], text: "上顶", dx: 60, dy: -50, c: "k4", lead: true },
        { at: [cos(-1.3), sin(-1.3), 1.0], text: "侧面", dx: -40, dy: 0, anchor: "end", c: "k4", lead: true },
        { at: [cos(-0.3), sin(-0.3), 0], text: "$D_{xy}$ 的边界", dx: 30, dy: 36, c: "k2", lead: true },
      ],
      caption: ["上顶 $z=x^2+y^2+1$，侧面 $x^2+y^2=1$，下底 $z=0$", "侧面竖直：柱面的准线就是 $D_{xy}$ 的边界"],
    });
  }

  // 6. 轮廓线 vs 交线：球体 x²+y²+z²≤4 且 z≤1
  {
    const R = 2, r1 = sqrt(3), v0 = acos(1 / 2);
    figs.push({
      name: "proj-ball-contour", title: "轮廓线才是边界", alt: "球体 x²+y²+z²≤4 且 z≤1：交线投影 x²+y²=3 不是边界，赤道 x²+y²=4 才是，投影区域 x²+y²≤4",
      view: { az: 30, el: 26 },
      axes: { x: [0, 3.2], y: [0, 3.2], z: [0, 2.6] },
      surfaces: [
        disk(R, { alpha: 0.14 }),
        { f: (u, v) => [R * sin(v) * cos(u), R * sin(v) * sin(u), R * cos(v)], u: [0, T], v: [v0, PI - 0.001], fill: [36, 14], occ: [96, 40], alpha: 0.3, ramp: "o", boundary: false },
        { f: (u, r) => [r * cos(u), r * sin(u), 1], u: [0, T], v: [0.001, r1], fill: [36, 4], alpha: 0.35, ramp: "i", boundary: false, contour: false },
      ],
      curves: [
        { f: circ(r1, 1), t: [0, T], c: "k1", w: 3 },
        { f: circ(r1, 0), t: [0, T], c: "k1", w: 1.8, dash: true },
        { f: circ(R, 0), t: [0, T], c: "k2", w: 3.2 },
        ...drops([-0.5, 1.0, 2.5].map((u) => [r1 * cos(u), r1 * sin(u), 1]), "k1"),
      ],
      labels: [
        { at: [r1 * cos(1.3), r1 * sin(1.3), 1], text: "交线（$z=1$）", dx: 30, dy: -30, c: "k1", lead: true },
        { at: [r1 * cos(-1.2), r1 * sin(-1.2), 0], text: "交线投影", dx: -60, dy: 40, anchor: "end", c: "k1", lead: true },
        { at: [R * cos(-0.25), R * sin(-0.25), 0], text: "赤道（轮廓线）", dx: 20, dy: 40, c: "k2", lead: true },
      ],
      caption: ["交线投影 $x^2+y^2=3$：不是边界", "赤道 $x^2+y^2=4$ 才是：$D_{xy}$：$x^2+y^2\\le 4$"],
    });
  }

  return figs;
};

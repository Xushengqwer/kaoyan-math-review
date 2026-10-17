// 高数第 4 章第⑤站「曲面长什么样」的示意图（21 张）。生成：
//   node tools/surface-fig.cjs drafts/calculus-vec-surfaces-v1.cjs assets/images/surfaces
// 预览：加 --sheet <总览.png>（浅色一行三张）或 --png <目录>（每张：浅色、深色、手机宽）。
// 方程、截痕都和卡片 calc-vec-coordinates 第⑤站（h9xu 柱面、b0jw 旋转曲面、n3yr 二次曲面）的写法一致。
module.exports = ({ M }) => {
  const { sin, cos, sqrt, sinh, cosh, PI } = M;
  const T = 2 * PI;
  const rotZ = (u, p) => [p[0] * cos(u) - p[1] * sin(u), p[0] * sin(u) + p[1] * cos(u), p[2]];
  const ellZ = (a, b, z) => (u) => [a * cos(u), b * sin(u), z];
  const seg = (p, q) => (t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t, p[2] + (q[2] - p[2]) * t];
  const angles = (n, from = 0) => Array.from({ length: n }, (_, k) => from + (T * k) / n);
  const figs = [];

  // ==================== 柱面（卡 h9xu） ====================

  // 通用：准线 C 在 xOy 面上，母线平行于 z 轴
  {
    const cx = (t) => 1.0 + 0.85 * sin(1.6 * PI * t + 0.2), cy = (t) => 0.35 + 2.2 * t, H = 1.7;
    figs.push({
      name: "cylinder-generic", title: "柱面", eq: "F(x,y)=0", alt: "准线 C 在 xOy 面上，母线平行于 z 轴",
      view: { az: 26, el: 30 },
      axes: { x: [0, 2.1], y: [0, 3.0], z: [0, 2.3] },
      surfaces: [{ f: (t, z) => [cx(t), cy(t), z], u: [0, 1], v: [0, H], fill: [44, 10],
        mesh: { u: [0.08, 0.2, 0.32, 0.44, 0.56, 0.68, 0.8, 0.92] } }],
      curves: [
        { f: (t) => [cx(t), cy(t), 0], t: [0, 1], c: "k1", w: 3 },
        { f: (z) => [cx(0.62), cy(0.62), z], t: [-0.25, H + 0.35], c: "k2", w: 2.6 },
      ],
      labels: [
        { at: [cx(0.3), cy(0.3), 0], text: "准线 $C$", dx: 18, dy: 34, c: "k1", lead: true },
        { at: [cx(0.62), cy(0.62), H + 0.35], text: "母线 $L$", dx: 8, dy: -4, c: "k2" },
        { at: [0, 0, 1.55], text: "母线平行于 $z$ 轴", dx: -10, dy: 0, anchor: "end" },
      ],
    });
  }

  // 圆柱面 x² + y² = R²
  {
    const R = 1, H = 1.8, ug = 1.0, ur = -0.35;
    figs.push({
      name: "cylinder-circular", title: "圆柱面", eq: "x^2+y^2=R^2", alt: "准线是 xOy 面上的圆，母线平行于 z 轴",
      view: { az: 30, el: 22 },
      axes: { x: [0, 2.2], y: [0, 2.1], z: [0, 2.6] },
      surfaces: [{ f: (u, z) => [R * cos(u), R * sin(u), z], u: [0, T], v: [0, H], fill: [48, 3], mesh: { u: angles(12, 0.26) } }],
      curves: [
        { f: ellZ(R, R, 0), t: [0, T], c: "k1", w: 2.8 },
        { f: (z) => [R * cos(ug), R * sin(ug), z], t: [-0.2, H + 0.35], c: "k2", w: 2.6 },
        { f: seg([0, 0, H], [R * cos(ur), R * sin(ur), H]), t: [0, 1], n: 40, c: "k4", w: 1.8 },
      ],
      labels: [
        { at: [R * cos(-0.1), R * sin(-0.1), 0], text: "准线：$xOy$ 面上的圆", dx: 24, dy: 44, c: "k1", lead: true },
        { at: [R * cos(ug), R * sin(ug), H + 0.35], text: "母线", dx: 8, dy: -2, c: "k2" },
        { at: [R * cos(ur) / 2, R * sin(ur) / 2, H], text: "$R$", dx: -4, dy: -8, c: "k4" },
      ],
    });
  }

  // 椭圆柱面 x²/a² + y²/b² = 1
  {
    const a = 0.85, b = 1.5, H = 1.6;
    figs.push({
      name: "cylinder-elliptic", title: "椭圆柱面", eq: "\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1", alt: "准线是 xOy 面上的椭圆，母线平行于 z 轴",
      view: { az: 30, el: 24 },
      axes: { x: [0, 2.0], y: [0, 2.5], z: [0, 2.4] },
      surfaces: [{ f: (u, z) => [a * cos(u), b * sin(u), z], u: [0, T], v: [0, H], fill: [56, 3], mesh: { u: angles(14, 0.2) } }],
      curves: [
        { f: ellZ(a, b, 0), t: [0, T], c: "k1", w: 2.8 },
        { f: seg([0, 0, H], [a, 0, H]), t: [0, 1], n: 40, c: "k4", w: 1.8 },
        { f: seg([0, 0, H], [0, b, H]), t: [0, 1], n: 40, c: "k4", w: 1.8 },
      ],
      labels: [
        { at: [a * cos(-0.7), b * sin(-0.7), 0], text: "准线：椭圆", dx: 4, dy: 40, anchor: "middle", c: "k1", lead: true },
        { at: [a / 2, 0, H], text: "$a$", dx: -14, dy: 2, c: "k4" },
        { at: [0, b / 2, H], text: "$b$", dx: -2, dy: -8, c: "k4" },
      ],
    });
  }

  // 双曲柱面 x²/a² − y²/b² = 1：两片
  {
    const a = 0.7, b = 0.8, tm = 1.35, H = 1.0;
    const br = (g) => (t, z) => [g * a * cosh(t), b * sinh(t), z];
    const asy = (g) => seg([-1.5, -g * 1.5 * b / a, 0], [1.5, g * 1.5 * b / a, 0]);
    figs.push({
      name: "cylinder-hyperbolic", title: "双曲柱面", eq: "\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1", alt: "准线是 xOy 面上的双曲线，两片，母线平行于 z 轴",
      view: { az: 72, el: 52 },
      axes: { x: [0, 2.4], y: [0, 2.2], z: [0, 2.2] },
      surfaces: [1, -1].map((g) => ({ f: br(g), u: [-tm, tm], v: [0, H], fill: [36, 3], out: g, mesh: { u: [-1, -0.5, 0, 0.5, 1] } })),
      curves: [
        { ...{ f: asy(1) }, t: [0, 1], n: 60, c: "k4", w: 1.2, dash: true },
        { ...{ f: asy(-1) }, t: [0, 1], n: 60, c: "k4", w: 1.2, dash: true },
        { f: (t) => br(1)(t, 0), t: [-tm, tm], c: "k1", w: 2.8 },
        { f: (t) => br(-1)(t, 0), t: [-tm, tm], c: "k1", w: 2.8 },
      ],
      labels: [
        { at: br(1)(-0.9, 0), text: "准线：双曲线（两支）", dx: -10, dy: 40, anchor: "end", c: "k1", lead: true },
        { at: [-1.5, 1.5 * b / a, 0], text: "渐近线", dx: 6, dy: 4, c: "k4", size: 18 },
      ],
      caption: "两支准线各拉出一片：双曲柱面有两片",
    });
  }

  // 抛物柱面 x² = 2py
  {
    const p = 0.55, xm = 1.3, H = 1.5;
    const par = (x, z) => [x, (x * x) / (2 * p), z];
    figs.push({
      name: "cylinder-parabolic", title: "抛物柱面", eq: "x^2=2py", alt: "准线是 xOy 面上的抛物线，母线平行于 z 轴，像一条槽",
      view: { az: 10, el: 46 },
      axes: { x: [0, 2.2], y: [0, 2.4], z: [0, 2.2] },
      surfaces: [{ f: par, u: [-xm, xm], v: [0, H], fill: [40, 3], mesh: { u: [-1.0, -0.6, -0.25, 0.25, 0.6, 1.0] } }],
      curves: [{ f: (x) => par(x, 0), t: [-xm, xm], c: "k1", w: 2.8 }],
      labels: [{ at: par(0.85, 0), text: "准线：抛物线（$p>0$ 时开口朝 $y$ 正向）", dx: 26, dy: 40, c: "k1", lead: true }],
    });
  }

  // 偏心圆柱面 x² + y² = 2Rx（第 6、7 章常见，放在卡 n3yr）
  {
    const R = 0.85, H = 1.8;
    figs.push({
      name: "cylinder-offset", title: "偏心圆柱面", eq: "x^2+y^2=2Rx", alt: "配方得 (x−R)²+y²=R²，轴是 x=R、y=0，z 轴是它的一条母线",
      view: { az: 58, el: 22 },
      axes: { x: [0, 2.7], y: [0, 1.9], z: [0, 2.6] },
      surfaces: [{ f: (u, z) => [R + R * cos(u), R * sin(u), z], u: [0, T], v: [0, H], fill: [48, 3], mesh: { u: angles(12, 0.13) } }],
      curves: [
        { f: (u) => [R + R * cos(u), R * sin(u), 0], t: [0, T], c: "k1", w: 2.8 },
        { f: (z) => [0, 0, z], t: [0, H], n: 80, c: "k2", w: 2.8 },
      ],
      points: [{ p: [R, 0, 0], c: "k4" }],
      labels: [
        { at: [R, 0, 0], text: "圆心 $(R,0,0)$", dx: -100, dy: -20, anchor: "end", c: "k4", lead: true },
        { at: [R + R * cos(1.0), R * sin(1.0), 0], text: "准线 $(x-R)^2+y^2=R^2$", dx: -10, dy: 52, anchor: "middle", c: "k1", lead: true },
        { at: [0, 0, H * 0.75], text: "$z$ 轴就是一条母线", dx: 12, dy: 0, c: "k2" },
      ],
    });
  }

  // ==================== 旋转曲面（卡 b0jw） ====================

  // 通用：yOz 面上的曲线绕 z 轴；转掉一块，看得见原曲线和里面
  {
    const g = (z) => 0.9 + 0.35 * sin(2.2 * z + 0.6), Z = 2.1, z1 = 1.25, u0 = PI / 2, gap = (70 * PI) / 180;
    const y1 = g(z1);
    figs.push({
      name: "revolution-generic", title: "旋转曲面", eq: "f(\\pm\\sqrt{x^2+y^2}, z)=0",
      alt: "yOz 面上的曲线绕 z 轴旋转：每个点高度不变、到轴距离不变",
      view: { az: 30, el: 20 },
      axes: { x: [0, 1.8], y: [0, 2.0] },
      surfaces: [{ f: (u, z) => [g(z) * cos(u), g(z) * sin(u), z], u: [u0, u0 + T - gap], v: [0, Z], fill: [48, 24],
        mesh: { u: [u0 + 1.2, u0 + 2.4, u0 + 3.6, u0 + 4.8] } }],
      curves: [
        { f: (z) => [0, 0, z], t: [-0.25, Z + 0.6], n: 160, c: "k3", w: 2, arrow: "end" },
        { f: (z) => [0, g(z), z], t: [0, Z], c: "k2", w: 3 },
        { f: (u) => [y1 * cos(u), y1 * sin(u), z1], t: [u0, u0 + T - 0.35], c: "k1", w: 2.2, arrow: "end" },
        { f: seg([0, 0, z1], [0, y1, z1]), t: [0, 1], n: 40, c: "k4", w: 2 },
      ],
      points: [{ p: [0, y1, z1], c: "k2", r: 4 }],
      labels: [
        { at: [0, 0, Z + 0.6], text: "$z$（旋转轴）", dx: 10, dy: 4, c: "k3" },
        { at: [0, g(0.3), 0.3], text: "母线", dx: 30, dy: 18, c: "k2", lead: true },
        { at: [0, y1, z1], text: "$M_1$", dx: 12, dy: -6, c: "k2" },
      ],
      caption: ["母线：$yOz$ 面上的曲线 $f(y,z)=0$", "$M_1$ 转一圈：高度 $z_1$ 不变，到轴距离 $|y_1|$ 不变"],
    });
  }

  // 圆环面：同一高度上有两个圆
  {
    const b = 1.25, a = 0.5, h = 0.28, w = sqrt(a * a - h * h);
    const tor = (u, v) => [(b + a * cos(v)) * cos(u), (b + a * cos(v)) * sin(u), a * sin(v)];
    figs.push({
      name: "torus", title: "圆环面", eq: "(\\sqrt{x^2+y^2}-b)^2+z^2=a^2", alt: "yOz 面上的圆绕 z 轴旋转；同一高度 z=h 截出两个圆",
      view: { az: 30, el: 30 },
      axes: { x: [0, 2.6], y: [0, 2.6], z: [0, 1.5] },
      surfaces: [{ f: tor, u: [0, T], v: [0, T], fill: [48, 20], boundary: false }],
      planes: [{ o: [-2.1, -2.1, h], e1: [4.2, 0, 0], e2: [0, 4.2, 0], n: 12 }],
      curves: [
        { f: (v) => tor(PI / 2, v), t: [0, T], c: "k2", w: 2.6 },
        { f: ellZ(b + w, b + w, h), t: [0, T], c: "k1", w: 2.6 },
        { f: ellZ(b - w, b - w, h), t: [0, T], c: "k1", w: 2.6 },
      ],
      labels: [
        { at: [(b + w) * cos(-1.05), (b + w) * sin(-1.05), h], text: "同一高度 $z=h$：两个圆", dx: -40, dy: 76, anchor: "middle", c: "k1", lead: true },
        { at: tor(PI / 2, 0.6), text: "母线：圆", dx: 18, dy: -18, c: "k2", lead: true },
      ],
      caption: "$yOz$ 面上的圆 $(y-b)^2+z^2=a^2$（$b>a$）绕 $z$ 轴",
    });
  }

  // 空间直线绕 z 轴的三种结果
  {
    const a = 0.9, H = 1.8;
    figs.push({
      name: "line-parallel-cylinder", title: "圆柱面", eq: "x^2+y^2=a^2", alt: "直线与 z 轴平行，绕 z 轴转一周得圆柱面",
      view: { az: 30, el: 22 }, maxHeight: 360,
      axes: { x: [0, 1.9], y: [0, 1.9] },
      surfaces: [{ f: (u, t) => rotZ(u, [0, a, t]), u: [0, T], v: [0, H], fill: [48, 3], mesh: { u: angles(12).slice(1) } }],
      curves: [
        { f: (z) => [0, 0, z], t: [-0.25, H + 0.6], n: 160, c: "k3", w: 2, arrow: "end" },
        { f: (t) => [0, a, t], t: [-0.25, H + 0.3], c: "k2", w: 3 },
      ],
      labels: [
        { at: [0, 0, H + 0.6], text: "旋转轴", dx: 10, dy: 4, c: "k3" },
        { at: [0, a, H + 0.3], text: "直线 $L$", dx: 8, dy: -2, c: "k2" },
      ],
      caption: "直线与轴平行 → 圆柱面",
    });
    const k = 1.2, tm = 1.2;
    const cone = (u, t) => rotZ(u, [0, t, k * t]);
    figs.push({
      name: "line-intersect-cone", title: "圆锥面", eq: "z^2=k^2(x^2+y^2)", alt: "直线 z=ky 与 z 轴交于原点，绕 z 轴转一周得圆锥面",
      view: { az: 30, el: 18 }, maxHeight: 360,
      axes: { x: [0, 1.9], y: [0, 2.0] },
      surfaces: [[0.02, tm], [-tm, -0.02]].map((v) => ({ f: cone, u: [0, T], v, fill: [48, 10], mesh: { u: angles(12).slice(1) } })),
      curves: [
        { f: (z) => [0, 0, z], t: [-k * tm - 0.2, k * tm + 0.55], n: 200, c: "k3", w: 2, arrow: "end" },
        { f: (t) => [0, t, k * t], t: [-tm - 0.15, tm + 0.15], c: "k2", w: 3 },
      ],
      labels: [
        { at: [0, 0, k * tm + 0.55], text: "旋转轴", dx: 10, dy: 4, c: "k3" },
        { at: [0, tm + 0.15, k * (tm + 0.15)], text: "直线 $z=ky$", dx: 8, dy: 4, c: "k2" },
      ],
      caption: "直线与轴相交 → 圆锥面（交点是顶点）",
    });
    const tm2 = 1.35;
    const hyp = (u, t) => rotZ(u, [1, t, t]);
    figs.push({
      name: "line-skew-hyperboloid", title: "单叶双曲面", eq: "x^2+y^2=1+z^2", alt: "直线 x=1，y=t，z=t 与 z 轴异面，绕 z 轴转一周得单叶双曲面",
      view: { az: 30, el: 18 }, maxHeight: 380,
      axes: { x: [0, 2.6], y: [0, 2.4] },
      surfaces: [{ f: hyp, u: [0, T], v: [-tm2, tm2], fill: [48, 16], mesh: { u: angles(18).slice(1) } }],
      curves: [
        { f: (z) => [0, 0, z], t: [-tm2 - 0.2, tm2 + 0.6], n: 200, c: "k3", w: 2, arrow: "end" },
        { f: (t) => [1, t, t], t: [-tm2 - 0.15, tm2 + 0.15], c: "k2", w: 3 },
        { f: ellZ(1, 1, 0), t: [0, T], c: "k1", w: 2.2 },
      ],
      points: [{ p: [1, 0, 0], c: "k1" }],
      labels: [
        { at: [0, 0, tm2 + 0.6], text: "旋转轴", dx: 10, dy: 4, c: "k3" },
        { at: [1, tm2 + 0.15, tm2 + 0.15], text: "直线 $x=1$，$y=t$，$z=t$", dx: 8, dy: 4, c: "k2" },
        { at: [1, 0, 0], text: "最近点", dx: -44, dy: 34, anchor: "end", c: "k1", lead: true },
      ],
      caption: ["直线与轴异面 → 单叶双曲面（整张由直线拼成）", "直线上离轴最近的点，转出最小的圆（腰）"],
    });
  }

  // ==================== 二次曲面（卡 n3yr） ====================

  // 球面（球心不在原点）
  {
    const C = [0.5, 1.3, 1.15], R = 0.95, ur = -0.5, vr = 0.9;
    const sph = (u, v) => [C[0] + R * sin(v) * cos(u), C[1] + R * sin(v) * sin(u), C[2] + R * cos(v)];
    figs.push({
      name: "sphere", title: "球面", eq: "(x-x_0)^2+(y-y_0)^2+(z-z_0)^2=R^2", alt: "球心 M0(x0,y0,z0)、半径 R 的球面",
      view: { az: 30, el: 20 },
      axes: { x: [0, 1.6], y: [0, 2.6], z: [0, 2.4] },
      surfaces: [{ f: sph, u: [0, T], v: [0.001, PI - 0.001], fill: [48, 24], mesh: { v: [PI / 2] } }],
      curves: [
        { f: (u) => sph(u, PI / 2), t: [0, T], c: "k4", w: 1.4 },
        { f: seg(C, sph(ur, vr)), t: [0, 1], n: 40, c: "k1", w: 2, hidden: "show" },
      ],
      points: [{ p: C, c: "k1" }],
      labels: [
        { at: C, text: "球心 $M_0(x_0,y_0,z_0)$", dx: -76, dy: 62, anchor: "end", c: "k1", lead: true },
        { at: seg(C, sph(ur, vr))(0.55), text: "$R$", dx: 4, dy: -6, c: "k1" },
      ],
      caption: "到定点 $M_0$ 的距离等于 $R$ 的点",
    });
  }

  // 椭球面：三个坐标面上的截痕都是椭圆
  {
    const a = 1.25, b = 1.8, c = 1.05;
    const ell = (u, v) => [a * sin(v) * cos(u), b * sin(v) * sin(u), c * cos(v)];
    figs.push({
      name: "ellipsoid", title: "椭球面", eq: "\\frac{x^2}{a^2}+\\frac{y^2}{b^2}+\\frac{z^2}{c^2}=1", alt: "三个坐标面上的截痕都是椭圆，半轴 a、b、c",
      view: { az: 30, el: 20 },
      axes: { x: [0, 2.3], y: [0, 2.7], z: [0, 1.9] },
      surfaces: [{ f: ell, u: [0, T], v: [0.001, PI - 0.001], fill: [48, 24] }],
      curves: [
        { f: ellZ(a, b, 0), t: [0, T], c: "k1", w: 2.4 },
        { f: (t) => [0, b * cos(t), c * sin(t)], t: [0, T], c: "k2", w: 2.4 },
        { f: (t) => [a * cos(t), 0, c * sin(t)], t: [0, T], c: "k3", w: 2.4 },
      ],
      points: [{ p: [a, 0, 0], c: "k4" }, { p: [0, b, 0], c: "k4" }, { p: [0, 0, c], c: "k4" }],
      labels: [
        { at: [a, 0, 0], text: "$a$", dx: 6, dy: 18, c: "k4" },
        { at: [0, b, 0], text: "$b$", dx: 6, dy: 18, c: "k4" },
        { at: [0, 0, c], text: "$c$", dx: 8, dy: -6, c: "k4" },
      ],
      caption: "三个坐标面上的截痕都是椭圆",
    });
  }

  // 椭圆锥面
  {
    const a = 0.9, b = 1.25, Z = 1.25, h = 1.0;
    const cone = (u, z) => [a * z * cos(u), b * z * sin(u), z];
    figs.push({
      name: "elliptic-cone", title: "椭圆锥面", eq: "\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=z^2", alt: "z=h 截出椭圆，h=0 时缩成顶点（原点）",
      view: { az: 30, el: 18 },
      axes: { x: [0, 2.0], y: [0, 2.3], z: [0, 1.9] },
      surfaces: [[0.02, Z], [-Z, -0.02]].map((v) => ({ f: cone, u: [0, T], v, fill: [48, 10], mesh: { u: angles(12, 0.2) } })),
      curves: [
        { f: ellZ(a * h, b * h, h), t: [0, T], c: "k1", w: 2.6 },
        { f: ellZ(a * h, b * h, -h), t: [0, T], c: "k1", w: 2.6 },
      ],
      labels: [
        { at: [a * h * cos(-0.9), b * h * sin(-0.9), h], text: "$z=h$：椭圆", dx: -34, dy: -20, anchor: "end", c: "k1", lead: true },
        { at: [0, 0, 0], text: "顶点", dx: 30, dy: 4, c: "k4", lead: true },
      ],
      caption: "$z=h$ 截出椭圆，$h=0$ 时缩成一点（顶点）",
    });
  }

  // 单叶双曲面
  {
    const a1 = 1.25, b1 = 0.95, c1 = 0.85, Z1 = 1.45, h1 = 1.0;
    const r1 = (z) => sqrt(1 + (z * z) / (c1 * c1));
    figs.push({
      name: "hyperboloid-one-sheet", title: "单叶双曲面", eq: "\\frac{x^2}{a^2}+\\frac{y^2}{b^2}-\\frac{z^2}{c^2}=1",
      alt: "用 z=h 截，任意 h 都截出椭圆，连成一片",
      view: { az: 30, el: 20 },
      axes: { x: [0, 3.0], y: [0, 2.7], z: [0, 2.4] },
      surfaces: [{ f: (u, z) => [a1 * r1(z) * cos(u), b1 * r1(z) * sin(u), z], u: [0, T], v: [-Z1, Z1], fill: [44, 20], out: 1 }],
      planes: [{ o: [-2.6, -2.3, h1], e1: [5.2, 0, 0], e2: [0, 4.6, 0], n: 10 }],
      curves: [
        { f: (u) => [a1 * cos(u), b1 * sin(u), 0], t: [0, T], c: "k1", w: 2.4 },
        { f: (u) => [a1 * r1(h1) * cos(u), b1 * r1(h1) * sin(u), h1], t: [0, T], c: "k1", w: 2.8 },
        { f: (u) => [a1 * r1(-1.0) * cos(u), b1 * r1(-1.0) * sin(u), -1.0], t: [0, T], c: "k1", w: 2.4 },
      ],
      labels: [
        { at: [-2.6, 2.3, h1], text: "平面 $z=h$", dx: -4, dy: -10, anchor: "end", c: "k5" },
        { at: [a1 * r1(h1) * cos(-0.92), b1 * r1(h1) * sin(-0.92), h1], text: "截痕：椭圆", dx: -34, dy: -30, anchor: "end", c: "k1", lead: true },
        { at: [a1 * cos(2.22), b1 * sin(2.22), 0], text: "$z=0$：最小", dx: 30, dy: 26, c: "k1", lead: true },
      ],
      caption: "任意 $h$ 都截出椭圆 → 连成一片",
    });
  }

  // 双叶双曲面：|h| < c 截不到
  {
    const a = 0.85, b = 1.05, c = 0.6, V = 1.3, v1 = 1.0;
    const sheet = (g) => (u, v) => [a * sinh(v) * cos(u), b * sinh(v) * sin(u), g * c * cosh(v)];
    const tr = (u) => sheet(1)(u, v1);
    figs.push({
      name: "hyperboloid-two-sheets", title: "双叶双曲面", eq: "\\frac{x^2}{a^2}+\\frac{y^2}{b^2}-\\frac{z^2}{c^2}=-1",
      alt: "只有 |h| ≥ c 时 z=h 才截得到，分成上下两叶",
      view: { az: 30, el: 18 },
      axes: { x: [0, 2.3], y: [0, 2.6], z: [0, 1.9] },
      surfaces: [1, -1].map((g) => ({ f: sheet(g), u: [0, T], v: [0.001, V], fill: [44, 14], out: g, mesh: { u: angles(12, 0.2) } })),
      planes: [{ o: [-2.0, -2.3, 0], e1: [4.0, 0, 0], e2: [0, 4.6, 0], n: 10 }],
      curves: [{ f: tr, t: [0, T], c: "k1", w: 2.6 }],
      points: [{ p: [0, 0, c], c: "k1" }, { p: [0, 0, -c], c: "k1" }],
      labels: [
        { at: [-2.0, 2.3, 0], text: "$|h|<c$：截不到", dx: -2, dy: -10, anchor: "end", c: "k5" },
        { at: tr(-0.9), text: "$|h|>c$：椭圆", dx: -30, dy: -22, anchor: "end", c: "k1", lead: true },
        { at: [0, 0, c], text: "$c$", dx: -12, dy: -2, anchor: "end", c: "k1" },
        { at: [0, 0, -c], text: "$-c$", dx: -12, dy: 14, anchor: "end", c: "k1" },
      ],
      caption: "只有 $|h|\\ge c$ 才截得到 → 分成上下两叶",
    });
  }

  // 椭圆抛物面
  {
    const a = 1.0, b = 1.3, rm = 1.15, h = 0.8;
    const par = (u, r) => [a * r * cos(u), b * r * sin(u), r * r];
    figs.push({
      name: "elliptic-paraboloid", title: "椭圆抛物面", eq: "\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=z", alt: "开口向上的碗；z=h>0 截出椭圆，x=0、y=0 截出开口向上的抛物线",
      view: { az: 30, el: 22 },
      axes: { x: [0, 2.1], y: [0, 2.3], z: [0, 2.0] },
      surfaces: [{ f: par, u: [0, T], v: [0.001, rm], fill: [48, 16], mesh: { u: angles(12, 0.2) } }],
      curves: [
        { f: ellZ(a * sqrt(h), b * sqrt(h), h), t: [0, T], c: "k1", w: 2.6 },
        { f: (y) => [0, y, (y * y) / (b * b)], t: [-b * rm, b * rm], c: "k2", w: 2.4 },
        { f: (x) => [x, 0, (x * x) / (a * a)], t: [-a * rm, a * rm], c: "k3", w: 2.4 },
      ],
      labels: [
        { at: [a * sqrt(h) * cos(-0.9), b * sqrt(h) * sin(-0.9), h], text: "$z=h$：椭圆", dx: -40, dy: 56, anchor: "end", c: "k1", lead: true },
        { at: [0, b * rm, rm * rm], text: "$x=0$：抛物线", dx: 8, dy: 4, c: "k2" },
        { at: [a * rm, 0, rm * rm], text: "$y=0$：抛物线", dx: -12, dy: -4, anchor: "end", c: "k3" },
      ],
      caption: "两个平方项同号：开口向上的碗",
    });
  }

  // 马鞍面（双曲抛物面）
  {
    const s = 1.25, A = 1.15, B = 1.15;
    const zf = (x, y) => (x * x) / (A * A) - (y * y) / (B * B);
    // z = h 的截痕：h > 0 两支沿 x 方向，h < 0 两支沿 y 方向（只画方形区域里的部分）
    const lvl = (h, sign) => h > 0
      ? { f: (y) => [sign * A * sqrt(h + (y * y) / (B * B)), y, h], t: [-B * sqrt((s * s) / (A * A) - h), B * sqrt((s * s) / (A * A) - h)] }
      : { f: (x) => [x, sign * B * sqrt(-h + (x * x) / (A * A)), h], t: [-A * sqrt((s * s) / (B * B) + h), A * sqrt((s * s) / (B * B) + h)] };
    const hs = 0.5;
    figs.push({
      name: "saddle", title: "马鞍面", eq: "\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=z",
      alt: "y=0 截出开口向上的抛物线，x=0 截出开口向下的抛物线，z=h 截出双曲线",
      view: { az: 60, el: 26 },
      axes: { x: [0, 2.4], y: [0, 2.2], z: [0, 1.9] },
      surfaces: [{ f: (x, y) => [x, y, zf(x, y)], u: [-s, s], v: [-s, s], fill: [30, 30],
        mesh: { u: [-0.9, -0.45, 0.45, 0.9], v: [-0.9, -0.45, 0.45, 0.9] } }],
      curves: [
        { f: (x) => [x, 0, zf(x, 0)], t: [-s, s], c: "k3", w: 2.8 },
        { f: (y) => [0, y, zf(0, y)], t: [-s, s], c: "k2", w: 2.8 },
        ...[hs, -hs].flatMap((h) => [1, -1].map((g) => ({ ...lvl(h, g), c: "k1", w: 2.2 }))),
      ],
      labels: [
        { at: [-s, 0, zf(s, 0)], text: "$y=0$：开口向上", dx: 10, dy: -4, c: "k3" },
        { at: [0, s, zf(0, s)], text: "$x=0$：开口向下", dx: 12, dy: 4, c: "k2" },
        { at: lvl(hs, 1).f(-0.5), text: "$z=h$：双曲线", dx: -30, dy: -34, anchor: "end", c: "k1", lead: true },
      ],
    });
  }

  // ==================== 第 6、7 章最常见（卡 n3yr） ====================

  // 上半球面
  {
    const R = 1.2, ur = -0.5;
    const hs = (u, v) => [R * sin(v) * cos(u), R * sin(v) * sin(u), R * cos(v)];
    figs.push({
      name: "upper-hemisphere", title: "上半球面", eq: "z=\\sqrt{R^2-x^2-y^2}", alt: "开根号只取 z ≥ 0 的一半，底边是 xOy 面上的圆 x²+y²=R²",
      view: { az: 30, el: 22 },
      axes: { x: [0, 2.2], y: [0, 2.2], z: [0, 1.9] },
      surfaces: [{ f: hs, u: [0, T], v: [0.001, PI / 2], fill: [48, 14], mesh: { u: angles(12, 0.2), v: [PI / 6, PI / 3] } }],
      curves: [
        { f: ellZ(R, R, 0), t: [0, T], c: "k1", w: 2.4 },
        { f: seg([0, 0, 0], [R * cos(ur), R * sin(ur), 0]), t: [0, 1], n: 40, c: "k4", w: 1.8 },
      ],
      labels: [
        { at: [R * cos(ur) * 0.55, R * sin(ur) * 0.55, 0], text: "$R$", dx: 2, dy: 18, c: "k4" },
        { at: [R * cos(-0.15), R * sin(-0.15), 0], text: "底边 $x^2+y^2=R^2$", dx: 16, dy: 40, c: "k1", lead: true },
      ],
      caption: "开根号默认 $z\\ge 0$：只是上半个球",
    });
  }

  // 上半圆锥面 z = √(x² + y²)
  {
    const rm = 1.25, ra = 0.55;
    figs.push({
      name: "upper-cone", title: "上半圆锥面", eq: "z=\\sqrt{x^2+y^2}", alt: "顶点在原点，开口向上，母线与 z 轴成 45°",
      view: { az: 30, el: 18 },
      axes: { x: [0, 2.0], y: [0, 2.0], z: [0, 2.0] },
      surfaces: [{ f: (u, r) => [r * cos(u), r * sin(u), r], u: [0, T], v: [0.01, rm], fill: [48, 10], mesh: { u: angles(12, 0.2) } }],
      curves: [
        { f: (t) => [0, t, t], t: [0, rm], c: "k2", w: 2.8 },
        { f: (s) => [0, ra * sin(s), ra * cos(s)], t: [0, PI / 4], n: 40, c: "k5", w: 1.8, hidden: "show" },
      ],
      labels: [
        { at: [0, ra * sin(PI / 8), ra * cos(PI / 8)], text: "$45°$", dx: 6, dy: -6, c: "k5", size: 18 },
        { at: [0, rm, rm], text: "$yOz$ 面上 $z=y$", dx: 8, dy: 4, c: "k2" },
      ],
      caption: "顶点在原点，只有 $z\\ge 0$ 的一半",
    });
  }

  // 旋转抛物面 z = x² + y²
  {
    const rm = 1.15, h = 0.8;
    figs.push({
      name: "paraboloid-of-revolution", title: "旋转抛物面", eq: "z=x^2+y^2", alt: "yOz 面上的抛物线 z=y² 绕 z 轴；z=h 截出圆 x²+y²=h",
      view: { az: 30, el: 22 },
      axes: { x: [0, 2.0], y: [0, 2.0], z: [0, 2.0] },
      surfaces: [{ f: (u, r) => [r * cos(u), r * sin(u), r * r], u: [0, T], v: [0.001, rm], fill: [48, 16], mesh: { u: angles(12, 0.2) } }],
      curves: [
        { f: ellZ(sqrt(h), sqrt(h), h), t: [0, T], c: "k1", w: 2.6 },
        { f: (y) => [0, y, y * y], t: [-rm, rm], c: "k2", w: 2.6 },
      ],
      labels: [
        { at: [sqrt(h) * cos(-0.9), sqrt(h) * sin(-0.9), h], text: "$z=h$：圆", dx: -30, dy: -18, anchor: "end", c: "k1", lead: true },
        { at: [0, rm, rm * rm], text: "$z=y^2$", dx: 8, dy: 4, c: "k2" },
      ],
      caption: ["$yOz$ 面上的 $z=y^2$ 绕 $z$ 轴转出来的碗", "$z=h$ 截出圆 $x^2+y^2=h$"],
    });
  }

  return figs;
};

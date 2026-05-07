"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Testimonial } from "@/types";

function resolveCssColorToRGB(color: string): [number, number, number] {
  if (typeof document === "undefined") return [128, 128, 128];
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) return [128, 128, 128];
  const el = document.createElement("div");
  el.style.color = color;
  document.body.appendChild(el);
  const computed = getComputedStyle(el).color;
  document.body.removeChild(el);
  ctx.fillStyle = computed;
  ctx.fillRect(0, 0, 1, 1);
  const data = ctx.getImageData(0, 0, 1, 1).data;
  return [data[0], data[1], data[2]];
}

const vertexShaderSource = `
  attribute vec2 a_position;
  void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

const fragmentShaderSource = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec3 u_colors[5];

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  vec3 blendNormal(vec3 base, vec3 blend, float opacity) {
    return blend * opacity + base * (1.0 - opacity);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    float time = u_time * 0.15;
    vec2 nCoord = vec2(uv.x * aspect, uv.y) * 0.4;
    vec3 color = u_colors[0];
    float n1 = snoise(vec3(nCoord.x * 1.3 + time * 0.5, nCoord.y * 1.6, time * 0.3 + 3.0));
    n1 = smoothstep(0.15, 0.7, n1 * 0.5 + 0.5);
    color = blendNormal(color, u_colors[1], pow(n1, 3.5));
    float n2 = snoise(vec3(nCoord.x * 1.5 + time * 0.4, nCoord.y * 1.8, time * 0.35 + 12.0));
    n2 = smoothstep(0.18, 0.75, n2 * 0.5 + 0.5);
    color = blendNormal(color, u_colors[2], pow(n2, 3.5));
    float n3 = snoise(vec3(nCoord.x * 1.1 - time * 0.35, nCoord.y * 1.4, time * 0.25 + 24.0));
    n3 = smoothstep(0.20, 0.80, n3 * 0.5 + 0.5);
    color = blendNormal(color, u_colors[3], pow(n3, 4.0));
    float n4 = snoise(vec3(nCoord.x * 0.9 + time * 0.2, nCoord.y * 1.2, time * 0.15 + 36.0));
    n4 = smoothstep(0.25, 0.85, n4 * 0.5 + 0.5);
    color = blendNormal(color, u_colors[4], pow(n4, 4.0));
    float vignette = smoothstep(1.2, 0.4, length(uv - vec2(0.5)));
    color *= vignette * 0.85 + 0.15;
    gl_FragColor = vec4(color, 1.0);
  }
`;

const defaultColors = [
  "#0a0014",
  "#3D5EFF",
  "#B31853",
  "#1A337F",
  "#DF396F",
];

function ShaderBackground({ colors = defaultColors }: { colors?: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  const createShader = useCallback((gl: WebGLRenderingContext, type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }, []);

  const parseColors = useCallback(() => {
    const resolved = [...colors];
    while (resolved.length < 5) resolved.push(resolved[resolved.length - 1] ?? "#7c3aed");
    return resolved.slice(0, 5).map((c) => {
      const [r, g, b] = resolveCssColorToRGB(c);
      return [r / 255, g / 255, b / 255] as [number, number, number];
    }).flat();
  }, [colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false });
    if (!gl) return;
    const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vs || !fs) return;
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);
    const vertices = new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    const uTime = gl.getUniformLocation(program, "u_time");
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uColors = gl.getUniformLocation(program, "u_colors");
    gl.uniform3fv(uColors, new Float32Array(parseColors()));
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);
    const startTime = performance.now();
    const render = () => {
      gl.uniform1f(uTime, (performance.now() - startTime) / 1000);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, [createShader, parseColors]);

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" style={{ display: "block" }} />
      <svg className="pointer-events-none absolute inset-0 z-[5] h-full w-full opacity-[0.25]">
        <filter id="contactShaderNoise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#contactShaderNoise)" />
      </svg>
    </>
  );
}

function RotatingTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const items = testimonials.slice(0, 4);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  const current = items[currentIndex];

  return (
    <div className="relative flex h-full w-full max-w-md items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full"
        >
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md md:p-8">
            <svg className="mb-4 h-8 w-8 text-white/60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-lg leading-relaxed font-medium text-white md:text-xl">
              &ldquo;{current.body}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full gradient-icon flex items-center justify-center text-white font-bold">
                {current.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-white">{current.name}</p>
                {current.location && <p className="text-sm text-white/70">{current.location}</p>}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-6 bg-white" : "bg-white/40 hover:bg-white/60"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ContactSectionView({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <section className="w-full">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 md:px-8 lg:grid-cols-2 lg:py-20">
        {/* Left - Shader with Testimonials */}
        <div className="relative order-last h-[500px] overflow-hidden rounded-3xl md:order-first lg:h-auto">
          <ShaderBackground />
          <div className="absolute inset-0 z-10 flex items-center justify-center p-8">
            <RotatingTestimonials testimonials={testimonials} />
          </div>
        </div>

        {/* Right - Contact Form */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-lg px-4 py-8 md:px-10">
            <h2 className="font-montserrat text-2xl leading-9 font-bold tracking-tight text-white">
              Skontaktuj się z nami
            </h2>
            <p className="mt-4 max-w-sm text-sm text-white/60">
              Napisz do nas — odpowiemy najszybciej jak to możliwe. Bezpłatna wycena i doradztwo.
            </p>

            <div className="py-10">
              <form action="https://formsubmit.co/ajax/biuro@pbac.pl" method="POST" className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-sm leading-6 font-medium text-white/60">Imię i nazwisko</label>
                  <div className="mt-2">
                    <input id="contact-name" name="name" type="text" required placeholder="Jan Kowalski" className="block w-full rounded-xl border-0 bg-white/10 px-4 py-3 text-white ring-1 ring-white/10 placeholder:text-white/30 focus:ring-2 focus:ring-white/30 focus:outline-none text-sm" />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm leading-6 font-medium text-white/60">Email</label>
                  <div className="mt-2">
                    <input id="contact-email" name="email" type="email" required placeholder="jan@example.com" className="block w-full rounded-xl border-0 bg-white/10 px-4 py-3 text-white ring-1 ring-white/10 placeholder:text-white/30 focus:ring-2 focus:ring-white/30 focus:outline-none text-sm" />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-sm leading-6 font-medium text-white/60">Telefon</label>
                  <div className="mt-2">
                    <input id="contact-phone" name="phone" type="tel" placeholder="+48 500 000 000" className="block w-full rounded-xl border-0 bg-white/10 px-4 py-3 text-white ring-1 ring-white/10 placeholder:text-white/30 focus:ring-2 focus:ring-white/30 focus:outline-none text-sm" />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm leading-6 font-medium text-white/60">Wiadomość</label>
                  <div className="mt-2">
                    <textarea rows={4} id="contact-message" name="message" placeholder="Opisz swoje potrzeby..." className="block w-full rounded-xl border-0 bg-white/10 px-4 py-3 text-white ring-1 ring-white/10 placeholder:text-white/30 focus:ring-2 focus:ring-white/30 focus:outline-none text-sm resize-none" />
                  </div>
                </div>

                <input type="hidden" name="_subject" value="Kontakt ze strony pbac.pl" />

                <div className="mt-8">
                  <button type="submit" className="flex w-full items-center justify-center rounded-full bg-white px-4 py-4 text-sm font-bold text-black transition duration-200 hover:bg-white/90">
                    Wyślij wiadomość
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

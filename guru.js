/* English Reading — halaman guru / pengawas (10 Okt 2026). Tampilan, menu, dan fasilitas meniru halaman guru
   Matematika Dasar (Matematika_Dasar/guru.html); yang berbeda hanya editor Tahapan Khusus (checklist tahap → level →
   sub level dengan aturannya, dipertahankan dari English Reading) dan model materinya (bacaan.js/soal.js/pola.js).
   Server: fungsi er_* di project Tryout (database_tryout/kontrak/english_reading.sql). Fungsi bersama dari
   assets/umum.js (rpc, $, esc, toast, ssGet/ssSet, lamaTeks, tglTeks, sejakTeks), assets/excel.js, assets/simpan.js. */
"use strict";
const KUNCI_PIN = "er_pin";
const TUNTAS = 80;
let PIN = "", PERAN = "", G = null, REKAP = [], DETAIL = null, DAFTAR = [], daftarT = null, ATURAN_SISWA = null;

/* ----------------------------------------------------------- model materi (selaras app.js) */
const SUB = [["Kenali", "👀"], ["Dengar", "👂"], ["Situasi", "💬"], ["Lengkapi & susun", "🧩"], ["Ucapkan", "🎤"]];
const SUB_POLA = [["Pilih bentuk", "☝️"], ["Benar atau salah", "⚖️"], ["Lengkapi", "✏️"], ["Susun kalimat", "🧩"], ["Terjemahkan & ucapkan", "🎤"]];
const SUB_BACAAN = [["Kosakata bacaan", "📚"], ["Dengar & pahami", "👂"], ["Urutkan", "🔢"], ["Pemahaman", "📝"]];
const SUB_UJIAN = [["Rincian & rujukan", "🔎"], ["Makna kata", "📖"], ["Inferensi & sikap penulis", "🧠"]];
const soalDari = (b) => (window.SOAL && window.SOAL[b.id]) || null;
const punyaPola = (b) => !!(b && b.pola && window.POLA_GEN && window.POLA_GEN[b.id]);
const punyaBacaan = (b) => !!(b && !b.kosakata && !b.pola && window.KATA_BACAAN && window.KATA_BACAAN[b.id] && soalDari(b));
const punyaSub = (b) => !!(b && ((b.kosakata && b.situasi) || punyaPola(b) || punyaBacaan(b)));
function daftarSub(b) {
  if (b.pola) return SUB_POLA;
  if (b.kosakata) return SUB;
  const dasar = [...SUB_BACAAN, b.tahap <= 2 ? ["Baca kalimat", "🎤"] : ["Rumpang teks", "✏️"]];
  if (b.tahap < 2) return dasar;
  return [...dasar, b.tahap <= 3 ? ["Ide pokok & struktur teks", "💡"] : ["Ide pokok & organisasi", "💡"], ...SUB_UJIAN,
    b.tahap >= 5 ? ["Simulasi UTBK/SNBT", "⏱️"] : b.tahap === 4 ? ["Simulasi TKA", "⏱️"] : ["Uji siap naik tahap", "🚀"]];
}
const jenisLevel = (b) => (b.kosakata ? { kunci: "kosakata", nama: "Kosakata" } : b.pola ? { kunci: "pola", nama: "Pola kalimat" } : { kunci: "bacaan", nama: "Bacaan" });
const levelDari = (id) => window.BACAAN.find((b) => b.id === id);
const nomorLevel = (b) => window.BACAAN.filter((x) => x.tahap === b.tahap).indexOf(b) + 1;
const labelLevel = (b) => (b ? `T${b.tahap} · L${nomorLevel(b)} ${b.judul}` : "");
const namaSub = (b, n) => { const s = b && daftarSub(b)[n - 1]; return s ? `${s[1]} ${s[0]}` : `Sub level ${n}`; };
const tahapNama = (no) => (window.TAHAP.find((t) => t.no === no) || {}).nama || "Tahap " + no;

// Tahapan: m = { tahap: [dimatikan], level: [id], sub: { id: [n] } }; null = semua dipakai.
const tahapOn = (m, t) => !m || !(m.tahap || []).includes(t);
const levelOnDasar = (m, b) => tahapOn(m, b.tahap) && !(m && (m.level || []).includes(b.id));
const subOn = (m, b, n) => levelOnDasar(m, b) && !(m && ((m.sub || {})[b.id] || []).includes(n));
const subDipakaiM = (m, b) => daftarSub(b).map((_, i) => i + 1).filter((n) => subOn(m, b, n));
const levelOn = (m, b) => levelOnDasar(m, b) && (!punyaSub(b) || subDipakaiM(m, b).length > 0);
// Tahapan umum = semua materi tanpa yang ditutup admin (Pengaturan Umum.mati).
const matiUmum = () => (G && G.umum && G.umum.mati) || null;
const matiProfil = (id) => { const p = PROFIL.find((x) => x.id === id); return p ? p.mati : matiUmum(); };

/* Ringkasan kemajuan satu siswa dari blob kemajuan (aturan tuntas sama dengan app.js). */
function ringkasKemajuan(k, m) {
  k = k || {};
  const skor = k.skor || {}, paham = k.paham || {}, sub = k.sub || {};
  const lulus = (b, n) => { const d = sub[b.id]; return !!d && (!!d.lama || (d.s || [])[n - 1] >= TUNTAS); };
  const r = { level: 0, levelTuntas: 0, subTotal: 0, subLulus: 0, tahap: {}, posisi: null, mulai: false };
  window.BACAAN.forEach((b) => {
    if (!levelOn(m, b)) return;
    r.level++;
    const t = r.tahap[b.tahap] || (r.tahap[b.tahap] = { level: 0, tuntas: 0, sub: 0, subLulus: 0 });
    t.level++;
    let ok;
    if (punyaSub(b)) {
      const d = subDipakaiM(m, b), nl = d.filter((n) => lulus(b, n)).length;
      r.subTotal += d.length; r.subLulus += nl; t.sub += d.length; t.subLulus += nl; ok = nl === d.length;
      if (nl || (sub[b.id] && (sub[b.id].s || []).some((x) => x != null))) r.mulai = true;
    } else {
      ok = soalDari(b) ? (skor[b.id] >= TUNTAS || b.tahap > 2) && paham[b.id] >= TUNTAS : skor[b.id] >= TUNTAS;
    }
    if (skor[b.id] != null) r.mulai = true;
    if (ok) { r.levelTuntas++; t.tuntas++; } else if (!r.posisi) r.posisi = b;
  });
  r.selesai = r.mulai && !r.posisi && r.level > 0;
  return r;
}

/* ----------------------------------------------------------- masuk */
async function masuk(pin, diam) {
  try {
    G = await rpc("er_guru_masuk", { p_pin: pin });
    PIN = pin; PERAN = G.peran; ssSet(KUNCI_PIN, pin);
    $("hd-sub").textContent = PERAN === "admin" ? "Masuk sebagai admin" : `${G.nama} · ${G.rombel.map((r) => r.kelas).join(", ") || "belum ada rombel"}`;
    $("tab-admin").classList.toggle("hidden", PERAN !== "admin"); $("tab").classList.toggle("tujuh", PERAN === "admin");
    $("pin-sementara").classList.toggle("hidden", !G.sementara);
    $("pin-sementara").innerHTML = G.sementara ? `Anda masuk dengan <b>ID guru</b> (PIN sementara). Minta PIN pribadi kepada admin agar akun Anda tidak bisa dipakai orang lain; PIN yang sama berlaku di Asesmen Merdeka dan Matematika Dasar.` : "";
    $("v-pin").classList.add("hidden"); $("v-utama").classList.remove("hidden"); $("btn-keluar").classList.remove("hidden");
    isiPilihanRombel();
    gambarSinkron(); bukaTab("daftar"); muatKelas(); gambarTingkat(); muatProfil(true); muatSemua();
  } catch (e) {
    if (diam) { ssSet(KUNCI_PIN, null); return; }
    $("pin-pesan").textContent = e.message; $("pin-pesan").classList.remove("hidden");
  }
}
function isiPilihanRombel() {
  const opsi = G.rombel.map((r) => `<option value="${esc(r.kelas)}">${esc(r.kelas)}</option>`).join("");
  const semua = G.rombel.length > 1 ? `<option value="">${PERAN === "admin" ? "Semua rombel" : "Semua rombel saya"}</option>` : "";
  const k1 = $("pil-kelas").value || ssGet("er_kelas", null), k2 = $("dl-kelompok").value;
  $("pil-kelas").innerHTML = opsi;
  if (k1 && G.rombel.some((r) => r.kelas === k1)) $("pil-kelas").value = k1;
  $("dl-kelompok").innerHTML = opsi + semua;
  $("dl-kelompok").value = k2 && [...$("dl-kelompok").options].some((o) => o.value === k2) ? k2 : $("pil-kelas").value;
}
function gambarSinkron() {
  const el = $("info-sinkron");
  el.innerHTML = G.rombel.length ? "" : '<div class="sinkron-tegas" role="note"><span class="ik" aria-hidden="true">!</span><div><b>Belum ada rombel.</b> ' +
    (PERAN === "admin" ? "Tarik guru Bahasa Inggris dari Data Induk di menu <b>Admin</b>." : "Minta admin English Reading menarik guru dari Data Induk.") + "</div></div>";
}
$("btn-pin").onclick = () => masuk($("pin").value.trim());
$("pin").addEventListener("keydown", (e) => { if (e.key === "Enter") $("btn-pin").click(); });
$("btn-keluar").onclick = () => { ssSet(KUNCI_PIN, null); location.reload(); };

$("tab").querySelectorAll("button").forEach((b) => b.onclick = () => bukaTab(b.dataset.v));
function bukaTab(v) {
  $("tab").querySelectorAll("button").forEach((x) => x.classList.toggle("on", x.dataset.v === v));
  ["kelas", "daftar", "siswa", "tingkat", "jalur", "atur", "admin"].forEach((x) => $("p-" + x).classList.toggle("hidden", x !== v));
  clearInterval(daftarT);
  if (v === "jalur") { muatProfil(); muatSemua(); }
  if (v === "atur") muatAtur();
  if (v === "admin") muatAdmin();
  if (v === "tingkat") gambarTingkat();
  if (v === "kelas" && SUB_TAB === "kelompok") muatPerKelompok();
  if (v === "daftar") { muatDaftar(); muatSesi(); daftarT = setInterval(() => { if (!document.hidden) { muatDaftar(true); muatSesi(); } }, 30000); }
}

/* Kotak angka ringkasan: [[nilai, label, ikon, warna]] → HTML (ikon & warna sesuai makna). */
const IKON_UBIN = {
  siswa: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 20a6.5 6.5 0 0 0-3-5.5"/>',
  mulai: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5 15.5 12 10 15.5z"/>',
  aktif: '<path d="M3 12h4l3-7 4 14 3-7h4"/>',
  level: '<path d="M3 20h4v-4h4v-4h4V8h4V4"/>',
  macet: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>',
  diam: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  kunci: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  keluar: '<path d="M14 4h5v16h-5M10 8l-4 4 4 4M6 12h10"/>',
  akurasi: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8"/>',
  waktu: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/>',
  ulang: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>',
  baca: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5zM4 5.5v16"/>',
};
const ubinHtml = (a) => a.map(([n, l, ik, cls]) => `<div class="${cls || ""}"><span class="ik" aria-hidden="true"><svg viewBox="0 0 24 24">${IKON_UBIN[ik] || ""}</svg></span><div class="n">${n}</div><div class="l">${l}</div></div>`).join("");

/* ----------------------------------------------------------- perkembangan (Per Siswa) */
const hariSejak = (iso) => iso ? (Date.now() - new Date(iso)) / 86400000 : Infinity;
const aktif7 = (r) => hariSejak(r.terakhir) <= 7;
// Tahapan yang berlaku bagi siswa: tahapan siswa → tahapan rombel → umum.
const profilRombel = (kelas) => ((G.rombel.find((x) => x.kelas === kelas) || {}).profil) || null;
const profilSiswa = (r) => r.profil || profilRombel(r.kelas);
const lengkapi = (r) => { if (!r._r) { const p = profilSiswa(r); r._r = ringkasKemajuan(r.kemajuan, p ? matiProfil(p.id) : matiUmum()); } return r._r; };
const pernahMulai = (r) => lengkapi(r).mulai || r.n_hasil > 0;
function status(r) {
  const s = [], k = lengkapi(r), ss = r.sesi || {};
  if (!pernahMulai(r)) return [{ t: "Belum mulai", c: "", bobot: 2 }];
  if (ss.terkunci) s.push({ t: "Terkunci", c: "buruk", bobot: 5 });
  if (r.profil) s.push({ t: "Tahapan: " + r.profil.nama, c: "emas", bobot: 0 });
  if (k.selesai) s.push({ t: "Tamat", c: "baik", bobot: 0 });
  if (r.macet) s.push({ t: "Macet", c: "buruk", bobot: 4 });
  if (!aktif7(r)) s.push({ t: "Tidak aktif", c: "emas", bobot: 3 });
  if (r.n_sub >= 10 && r.rata < 70) s.push({ t: "Nilai rendah", c: "emas", bobot: 1 });
  return s;
}
const bobot = (r) => status(r).reduce((a, x) => a + x.bobot, 0);
const posisiHtml = (r) => { const k = lengkapi(r);
  return k.selesai ? '<span class="pos-nm">Semua level tuntas</span>' : pernahMulai(r) && k.posisi
    ? `<span class="pos-nm">Tahap ${k.posisi.tahap} · ${esc(tahapNama(k.posisi.tahap))}</span><span class="pos-lv">Level ${nomorLevel(k.posisi)}: ${esc(k.posisi.judul)}</span>`
    : '<span class="redup">–</span>'; };
const posisiTeks = (r) => { const k = lengkapi(r); return k.selesai ? "Semua level tuntas" : pernahMulai(r) && k.posisi ? `Tahap ${k.posisi.tahap} · Level ${nomorLevel(k.posisi)}: ${k.posisi.judul}` : "Belum mulai"; };

async function rekapBanyak(kelas) {
  const L = kelas ? [kelas] : G.rombel.map((r) => r.kelas);
  return (await Promise.all(L.map((k) => rpc("er_rekap", { p_pin: PIN, p_kelas: k })))).flat();
}
async function muatKelas() {
  const k = $("pil-kelas").value;
  ssSet("er_kelas", k);
  if (!k) { $("t-kelas").innerHTML = '<tr><td class="kosong-data">Belum ada rombel.</td></tr>'; return; }
  $("t-kelas").innerHTML = '<tr><td class="kosong-data">Memuat…</td></tr>';
  try { REKAP = await rpc("er_rekap", { p_pin: PIN, p_kelas: k }); }
  catch (e) { $("t-kelas").innerHTML = `<tr><td class="kosong-data">${esc(e.message)}</td></tr>`; return; }
  $("pil-siswa").innerHTML = '<option value="">— pilih siswa —</option>' + REKAP.map((r) => `<option value="${esc(r.nisn)}">${esc(r.nama)} (${esc(r.kelas)})</option>`).join("");
  gambarKelas();
}
$("pil-kelas").onchange = muatKelas;
$("pil-urut").onchange = () => gambarKelas();
$("btn-muat").onclick = muatKelas;

function gambarKelas() {
  const R = REKAP.slice(), mulai = R.filter(pernahMulai);
  const rata = mulai.length ? mulai.reduce((a, r) => a + lengkapi(r).levelTuntas, 0) / mulai.length : 0;
  const macet = R.filter((r) => r.macet).length, diam = mulai.filter((r) => !aktif7(r)).length, a7 = R.filter(aktif7).length;
  $("k-ubin").innerHTML = ubinHtml([
    [R.length, "siswa", "siswa"], [mulai.length, "sudah mulai", "mulai", "baik"], [a7, "berlatih 7 hari terakhir", "aktif", "baik"],
    [rata.toLocaleString("id-ID", { maximumFractionDigits: 1 }), "rata-rata level tuntas", "level", "emas"],
    [macet, "macet", "macet", macet ? "buruk" : "redup-ubin"], [diam, "tidak berlatih 7 hari terakhir", "diam", diam ? "emas" : "redup-ubin"],
  ]);
  const baris = window.TAHAP.map((t) => ({ label: `Tahap ${t.no} · ${t.nama}`, n: R.filter((r) => { const k = lengkapi(r); return pernahMulai(r) && !k.selesai && k.posisi && k.posisi.tahap === t.no; }).length }));
  const tamat = R.filter((r) => lengkapi(r).selesai).length, belum = R.length - mulai.length;
  if (tamat) baris.push({ label: "Tamat semua tahap", n: tamat });
  batangMendatar($("g-sebaran"), baris, "siswa", belum ? `${belum} siswa belum mulai.` : "");

  const u = $("pil-urut").value;
  R.sort((a, b) => u === "nama" ? a.nama.localeCompare(b.nama)
    : u === "maju" ? lengkapi(b).levelTuntas - lengkapi(a).levelTuntas || a.nama.localeCompare(b.nama)
    : u === "aktif" ? hariSejak(a.terakhir) - hariSejak(b.terakhir)
    : bobot(b) - bobot(a) || lengkapi(a).levelTuntas - lengkapi(b).levelTuntas || a.nama.localeCompare(b.nama));
  $("t-kelas").innerHTML = `<thead><tr><th>No</th><th>Nama</th><th>Posisi sekarang</th><th>Kemajuan</th>
    <th class="angka" title="Sub level yang lulus (≥ 80%) dalam 7 hari terakhir">Lulus 7 hari</th><th class="angka">Rata-rata nilai</th><th class="angka">Waktu latihan</th><th>Terakhir</th><th>Catatan</th></tr></thead><tbody>` +
    (R.length ? R.map((r, i) => {
      const k = lengkapi(r);
      return `<tr class="klik" data-n="${esc(r.nisn)}"><td>${i + 1}</td><td><b>${esc(r.nama)}</b></td>
        <td class="posisi">${posisiHtml(r)}</td>
        <td><div class="maju"><div class="batang"><i style="width:${100 * k.levelTuntas / Math.max(1, k.level)}%"></i></div><span>${k.levelTuntas}/${k.level}</span></div></td>
        <td class="angka">${r.lulus7 || '<span class="redup">0</span>'}</td><td class="angka">${r.rata != null ? r.rata + "%" : "–"}</td><td class="angka">${r.detik ? lamaTeks(r.detik) : "–"}</td>
        <td>${sejakTeks(r.terakhir)}</td><td><span class="lencana-daftar">${status(r).map((s) => `<span class="lencana ringkas ${s.c}" title="${esc(s.t)}">${esc(s.t)}</span>`).join("")}</span></td></tr>`;
    }).join("") : '<tr><td colspan="9" class="kosong-data">Tidak ada siswa.</td></tr>') + "</tbody>";
  $("t-kelas").querySelectorAll("tr[data-n]").forEach((tr) => tr.onclick = () => bukaSiswa(tr.dataset.n));
}

const labelPilihan = (id) => { const s = $(id); return s.options[s.selectedIndex] ? s.options[s.selectedIndex].text : ""; };
const urutRombel = (a, b) => String(a.kelas).localeCompare(String(b.kelas), "id", { numeric: true }) || a.nama.localeCompare(b.nama);

// Unduh rekap (.xlsx): Rekap Kemajuan + Sebaran per Tahap.
$("btn-unduh-rekap").onclick = (ev) => jalankanUnduh(ev.currentTarget, async () => {
  if (!REKAP.length) throw new Error("Belum ada data. Muat ulang dulu.");
  const pilih = labelPilihan("pil-kelas"), R = REKAP.slice().sort(urutRombel), mulai = R.filter(pernahMulai);
  const rata = mulai.length ? mulai.reduce((a, r) => a + lengkapi(r).levelTuntas, 0) / mulai.length : 0;
  const nama = `Rekap_English_Reading_${potongNama(pilih) || "semua"}_${tglBerkas()}.xlsx`;
  await unduhBukuXLSX({ namaBerkas: nama, judulBuku: "Rekap Kemajuan", lembar: [
    { nama: "Rekap Kemajuan", judul: "Rekap Kemajuan Latihan", sub: `Rombel: ${pilih}`,
      info: [["Rombel", pilih], ["Jumlah siswa", `${R.length} siswa`]],
      ubin: [["Siswa", R.length], ["Sudah mulai", mulai.length], ["Rata-rata level tuntas", Math.round(rata * 10) / 10],
        ["Macet", R.filter((r) => r.macet).length], ["Tidak aktif 7 hari", mulai.filter((r) => !aktif7(r)).length]],
      kolom: [{ t: "No", w: 5, rata: "center" }, { t: "Nama", w: 30, tebal: true }, { t: "NISN", w: 13, rata: "center" }, { t: "Rombel", w: 9, rata: "center" },
        { t: "Posisi sekarang", w: 34 }, { t: "Level tuntas", w: 10, rata: "center" }, { t: "Jumlah level", w: 10, rata: "center" }, { t: "Kemajuan", w: 10, rata: "center", fmt: '0"%"' },
        { t: "Sub level lulus", w: 10, rata: "center" }, { t: "Rata-rata nilai", w: 10, rata: "center", fmt: '0"%"', cf: CF_PERSEN },
        { t: "Menit latihan", w: 9, rata: "center" }, { t: "Hari berlatih", w: 9, rata: "center" }, { t: "Lulus 7 hari", w: 9, rata: "center" },
        { t: "Tahapan", w: 18 }, { t: "Terakhir aktif", w: 16, rata: "center", fmt: "dd/mm/yyyy hh:mm", size: 9 }, { t: "Catatan", w: 24, bungkus: true, size: 9 }],
      baris: R.map((r, i) => { const k = lengkapi(r), p = profilSiswa(r);
        return [i + 1, r.nama, r.nisn, r.kelas, posisiTeks(r), k.levelTuntas, k.level, Math.round(100 * k.levelTuntas / Math.max(1, k.level)), k.subLulus,
          r.rata != null ? r.rata : "", Math.round((r.detik || 0) / 60), r.hari || 0, r.lulus7 || 0, p ? p.nama : "Umum", waktuXL(r.terakhir), status(r).map((s) => s.t).join(", ")]; }),
      warnaSel: (b, j) => j === 15 && /Macet|Terkunci/.test(b[15]) ? { warna: XL.merah, tebal: true } : j === 15 && /Tidak aktif|rendah/.test(b[15]) ? { warna: XL.emasTeks } : null,
      catatan: ["Level tuntas dihitung dari tahapan yang berlaku bagi siswa (tahapan khusus siswa, tahapan rombel, atau tahapan umum). Macet: satu sub level dicoba 3 kali atau lebih dalam 30 hari tanpa mencapai 80%. Tidak aktif: tidak berlatih 7 hari terakhir. Rata-rata nilai: hijau ≥ 80%, kuning 60–79%, merah < 60%."] },
    { nama: "Sebaran Tahap", judul: "Sebaran Posisi Siswa per Tahap", sub: `Rombel: ${pilih}`, beku: 0, melintang: false,
      kolom: [{ t: "Tahap", w: 8, rata: "center" }, { t: "Nama tahap", w: 34, tebal: true }, { t: "Jumlah level", w: 12, rata: "center" }, { t: "Siswa di tahap ini", w: 16, rata: "center" }],
      baris: window.TAHAP.map((t) => [t.no, t.nama, window.BACAAN.filter((b) => b.tahap === t.no && levelOn(matiUmum(), b)).length,
        R.filter((r) => { const k = lengkapi(r); return pernahMulai(r) && !k.selesai && k.posisi && k.posisi.tahap === t.no; }).length])
        .concat([["", "Tamat semua tahap", "", R.filter((r) => lengkapi(r).selesai).length], ["", "Belum mulai", "", R.length - mulai.length]]) },
  ] });
  return nama;
});

/* ----------------------------------------------------------- Sesi Kegiatan: daftar siswa */
async function muatDaftar(diam) {
  if (!diam) $("t-daftar").innerHTML = '<tr><td class="kosong-data">Memuat…</td></tr>';
  if (!G.rombel.length) { $("t-daftar").innerHTML = '<tr><td class="kosong-data">Belum ada rombel.</td></tr>'; return; }
  try { DAFTAR = await rekapBanyak($("dl-kelompok").value || null); }
  catch (e) { if (!diam) $("t-daftar").innerHTML = `<tr><td class="kosong-data">${esc(e.message)}</td></tr>`; return; }
  gambarDaftar();
}
$("dl-kelompok").onchange = () => { muatDaftar(); gambarSesi(); };
$("dl-muat").onclick = () => { muatDaftar(); muatSesi(); };
$("dl-status").onchange = () => gambarDaftar();
$("dl-tingkat").onchange = () => gambarDaftar();
$("dl-cari").oninput = () => gambarDaftar();
const PILIH = new Set();

const statusDaftar = (r) => { const ss = r.sesi || {}, k = lengkapi(r);
  return ss.terkunci ? '<span class="lencana buruk">Terkunci</span>'
    : ss.online ? `<span class="lencana baik"><span class="titik-on"></span>Sedang berlatih${ss.mode === "kelas" ? " (sesi)" : " (mandiri)"}</span>`
    : r.profil ? `<span class="lencana ringkas emas" title="Tahapan khusus dipilih untuk siswa ini">Tahapan: ${esc(r.profil.nama)}</span>`
    : !r.masuk_terakhir && !pernahMulai(r) ? '<span class="lencana">Belum pernah masuk</span>'
    : k.selesai ? '<span class="lencana baik">Tamat</span>'
    : `<span class="redup kecil">Aktif ${esc(sejakTeks(r.terakhir || r.masuk_terakhir))}</span>`; };
const ROMAWI = { X: "10", XI: "11", XII: "12" };
function tingkatSiswa(r) { const m = String(r.kelas || "").toUpperCase().match(/^(XII|XI|X|10|11|12)\b/); return m ? ROMAWI[m[1]] || m[1] : ""; }
const pernahMasuk = (r) => !!r.masuk_terakhir || pernahMulai(r);
function saringDaftar() {
  const q = $("dl-cari").value.trim().toLowerCase(), st = $("dl-status").value, tk = $("dl-tingkat").value;
  return DAFTAR.filter((r) => { const ss = r.sesi || {}, k = lengkapi(r);
    return (!tk || tingkatSiswa(r) === tk) && (!q || [r.nama, r.nisn, r.nis].some((v) => String(v || "").toLowerCase().includes(q)))
      && (!st || (st === "online" ? ss.online : st === "kunci" ? ss.terkunci : st === "belum" ? !pernahMasuk(r) : st === "selesai" ? k.selesai : pernahMasuk(r))); });
}
function gambarDaftar() {
  const D = DAFTAR, semua = !$("dl-kelompok").value;
  const n = (f) => D.filter(f).length, kunci = n((r) => (r.sesi || {}).terkunci), keluar7 = D.reduce((a, r) => a + (r.keluar7 || 0), 0), tamat = n((r) => lengkapi(r).selesai);
  $("dl-ubin").innerHTML = ubinHtml([
    [D.length, "siswa di daftar", "siswa"], [n((r) => (r.sesi || {}).online), "sedang berlatih sekarang", "aktif", "baik"],
    [n((r) => !pernahMasuk(r)), "belum pernah masuk", "diam", "emas"], [tamat, "tamat semua level", "level", tamat ? "baik" : "redup-ubin"],
    [kunci, "terkunci (keluar halaman)", "kunci", kunci ? "buruk" : "redup-ubin"], [keluar7, "keluar halaman, 7 hari terakhir", "keluar", keluar7 ? "emas" : "redup-ubin"],
  ]);
  const R = saringDaftar(), ada = new Set(DAFTAR.map((r) => r.nisn));
  [...PILIH].forEach((x) => { if (!ada.has(x)) PILIH.delete(x); });
  const semuaDipilih = R.length > 0 && R.every((r) => PILIH.has(r.nisn));
  $("t-daftar").innerHTML = `<thead><tr><th class="pilih ubah"><input type="checkbox" id="dl-semua" ${semuaDipilih ? "checked" : ""} title="Pilih semua yang tampil" aria-label="Pilih semua siswa yang tampil"></th><th>No</th><th>Nama</th><th>NISN</th><th>NIS</th>${semua ? "<th>Rombel</th>" : ""}
    <th>Status</th><th>Posisi</th><th class="angka" title="Keluar halaman yang dihitung saat sesi kelas, 7 hari terakhir">Keluar hlm.</th><th></th></tr></thead><tbody>` +
    (R.length ? R.map((r, i) => `<tr class="klik ${PILIH.has(r.nisn) ? "dipilih" : ""}" data-n="${esc(r.nisn)}"><td class="pilih ubah"><input type="checkbox" data-pilih="${esc(r.nisn)}" ${PILIH.has(r.nisn) ? "checked" : ""} aria-label="Pilih ${esc(r.nama)}"></td><td>${i + 1}</td><td><b>${esc(r.nama)}</b></td>
      <td class="nisn">${esc(r.nisn)}</td><td class="nisn">${esc(r.nis || "–")}</td>${semua ? `<td>${esc(r.kelas)}</td>` : ""}
      <td>${statusDaftar(r)}</td><td class="posisi">${posisiHtml(r)}</td>
      <td class="angka">${r.keluar7 || '<span class="redup">0</span>'}</td>
      <td>${(r.sesi || {}).terkunci ? `<button class="kecil" data-buka="${esc(r.nisn)}">Buka kunci</button>` : ""}</td></tr>`).join("")
      : `<tr><td colspan="10" class="kosong-data">${D.length ? "Tidak ada siswa yang cocok dengan pencarian." : "Tidak ada siswa."}</td></tr>`) + "</tbody>";
  $("t-daftar").querySelectorAll("tr[data-n]").forEach((tr) => tr.onclick = (e) => {
    if (e.target.closest("td.pilih")) { if (!e.target.matches("input")) { const c = tr.querySelector("[data-pilih]"); c.checked = !c.checked; c.onchange(); } return; }
    if (!e.target.closest("button")) bukaSiswa(tr.dataset.n);
  });
  $("t-daftar").querySelectorAll("[data-pilih]").forEach((c) => c.onchange = () => {
    if (c.checked) PILIH.add(c.dataset.pilih); else PILIH.delete(c.dataset.pilih);
    c.closest("tr").classList.toggle("dipilih", c.checked); perbaruiMassal();
  });
  if ($("dl-semua")) $("dl-semua").onchange = (e) => { R.forEach((r) => e.target.checked ? PILIH.add(r.nisn) : PILIH.delete(r.nisn)); gambarDaftar(); };
  perbaruiMassal();
  gambarInfoKelompok();
  $("t-daftar").querySelectorAll("[data-buka]").forEach((b) => b.onclick = async () => {
    const r = DAFTAR.find((x) => x.nisn === b.dataset.buka);
    if (!confirm(`Buka kunci latihan ${r ? r.nama : b.dataset.buka}? Siswa lalu mengetuk "Periksa lagi" di layarnya.`)) return;
    b.disabled = true;
    try { await rpc("er_buka_kunci_guru", { p_pin: PIN, p_nisn: b.dataset.buka }); toast("Kunci dibuka"); muatDaftar(true); }
    catch (e) { toast(e.message); b.disabled = false; }
  });
}

/* ---- Aksi massal: tahapan / hapus data latihan siswa terpilih */
let PANEL_MASSAL = false, AWAL_T = "";
function perbaruiMassal() {
  const n = PILIH.size;
  $("dl-massal").classList.toggle("on", n > 0);
  $("dl-n-pilih").textContent = n;
  const semua = $("dl-semua"), tampil = saringDaftar();
  if (semua) semua.indeterminate = n > 0 && !tampil.every((r) => PILIH.has(r.nisn)) && tampil.some((r) => PILIH.has(r.nisn));
  if (!n) bukaPanelMassal(false);
}
function bukaPanelMassal(buka) {
  PANEL_MASSAL = buka;
  $("dl-panel").classList.toggle("hidden", !buka);
  $("dl-atur-buka").textContent = buka ? "Tutup pengaturan" : "Atur tahapan";
  $("dl-atur-buka").setAttribute("aria-expanded", String(buka));
  $("dl-terapkan").classList.toggle("hidden", !buka);
  if (buka) isiDefaultMassal();
}
$("dl-atur-buka").onclick = () => bukaPanelMassal(!PANEL_MASSAL);
function isiDefaultMassal() {
  const L = terpilih(), s = $("dl-profil");
  if (!L.length) return;
  const kel = [...new Set(L.map((r) => r.kelas))], p1 = kel.length === 1 ? profilRombel(kel[0]) : null;
  s.innerHTML = `<option value="">Ikut rombel (${kel.length === 1 ? (p1 ? `"${esc(p1.nama)}"` : "tahapan umum") : "masing-masing rombel"})</option>` +
    (PROFIL.length ? `<optgroup label="Tahapan khusus">${PROFIL.map((p) => `<option value="${esc(p.id)}">${esc(p.nama)}</option>`).join("")}</optgroup>` : "");
  const nilai = [...new Set(L.map((r) => (r.profil ? r.profil.id : "")))];
  if (nilai.length > 1) { s.insertAdjacentHTML("afterbegin", '<option value="~">Beragam, pilih untuk mengubah</option>'); s.value = "~"; }
  else s.value = [...s.options].some((o) => o.value === nilai[0]) ? nilai[0] : "";
  AWAL_T = s.value;
}
const terpilih = () => DAFTAR.filter((r) => PILIH.has(r.nisn));
const namaTerpilih = () => { const nm = terpilih().map((r) => r.nama); return nm.slice(0, 5).join(", ") + (nm.length > 5 ? `, dan ${nm.length - 5} lainnya` : ""); };
$("dl-batal").onclick = () => { PILIH.clear(); gambarDaftar(); };
$("dl-terapkan").onclick = async () => {
  const L = terpilih(), v = $("dl-profil").value;
  if (v === "~" || v === AWAL_T) return toast("Belum ada tahapan yang diubah.");
  const p = PROFIL.find((x) => x.id === v);
  const pesan = p ? `TAHAPAN: pasang "${p.nama}" (${teksRingkas(ringkasTahapan(p.mati))}). Pilihan ini tetap berlaku walau tahapan rombelnya diganti.`
    : "TAHAPAN: kembali ke tahapan rombelnya masing-masing.";
  if (!confirm(`Terapkan untuk ${L.length} siswa?\n\n${namaTerpilih()}\n\n${pesan}\n\nKemajuan siswa tidak berubah.`)) return;
  try { const r = await rpc("er_pasang_siswa", { p_pin: PIN, p_nisn: L.map((x) => x.nisn), p_profil: p ? p.id : null });
    toast(p ? `Tahapan "${p.nama}" untuk ${r.jumlah} siswa` : `${r.jumlah} siswa ikut tahapan rombel`); }
  catch (e) { toast(e.message); }
  PILIH.clear(); muatDaftar(true); muatKelas(); muatProfil(true); muatSemua();
};
$("dl-hapus").onclick = async () => {
  const L = terpilih();
  if (!confirm(`Hapus SEMUA data latihan ${L.length} siswa?\n\n${namaTerpilih()}\n\nKemajuan, riwayat nilai, dan sesi dihapus; siswa mulai lagi dari awal. Data siswa tidak terhapus. Tindakan ini tidak bisa dibatalkan.`)) return;
  let n = 0;
  try { for (const r of L) { await rpc("er_hapus_latihan", { p_pin: PIN, p_nisn: r.nisn }); n++; } toast(`Data latihan ${n} siswa dihapus`); }
  catch (e) { toast(`${n} siswa terhapus; berhenti: ${e.message}`); }
  PILIH.clear(); muatDaftar(true); muatKelas();
};

$("dl-unduh").onclick = (ev) => jalankanUnduh(ev.currentTarget, async () => {
  const R = saringDaftar().sort(urutRombel);
  if (!R.length) throw new Error("Tidak ada siswa di daftar.");
  const pilih = labelPilihan("dl-kelompok");
  const saring = [$("dl-status").value && labelPilihan("dl-status"), $("dl-cari").value.trim() && `cari "${$("dl-cari").value.trim()}"`].filter(Boolean).join(", ");
  const st = (r) => { const ss = r.sesi || {}, k = lengkapi(r); return ss.terkunci ? "Terkunci" : ss.online ? "Sedang berlatih" : !pernahMasuk(r) ? "Belum pernah masuk" : k.selesai ? "Tamat" : "Pernah masuk"; };
  const kolom = [{ t: "No", w: 5, rata: "center" }, { t: "Nama", w: 32, tebal: true }, { t: "NISN", w: 13, rata: "center" }, { t: "NIS", w: 9, rata: "center" },
    { t: "Rombel", w: 9, rata: "center" }, { t: "Status", w: 18 }, { t: "Posisi sekarang", w: 34 }, { t: "Tahapan", w: 18 },
    { t: "Terakhir aktif", w: 16, rata: "center", fmt: "dd/mm/yyyy hh:mm", size: 9 }, { t: "Keluar halaman (7 hari)", w: 13, rata: "center" }];
  const baris = (L) => L.map((r, i) => { const p = profilSiswa(r); return [i + 1, r.nama, r.nisn, r.nis, r.kelas, st(r), posisiTeks(r), p ? p.nama : "Umum", waktuXL(r.terakhir || r.masuk_terakhir), r.keluar7 || 0]; });
  const warnaSel = (b, j) => j === 5 && b[5] === "Terkunci" ? { warna: XL.merah, tebal: true } : j === 5 && b[5] === "Sedang berlatih" ? { warna: XL.hijau, tebal: true }
    : j === 9 && b[9] >= 3 ? { warna: XL.merah, tebal: true } : null;
  const lembar = (nama, L, judul) => ({ nama, judul: "Daftar Siswa", sub: `Rombel: ${judul}`, kolom, baris: baris(L), warnaSel,
    info: [["Rombel", judul], ["Jumlah siswa", `${L.length} siswa`]].concat(saring ? [["Saringan", saring]] : []),
    ubin: [["Siswa", L.length], ["Sedang berlatih", L.filter((r) => (r.sesi || {}).online).length], ["Belum pernah masuk", L.filter((r) => !pernahMasuk(r)).length],
      ["Terkunci", L.filter((r) => (r.sesi || {}).terkunci).length]] });
  const semua = [lembar("Semua", R, pilih)];
  if (!$("dl-kelompok").value) {
    const kel = [...new Set(R.map((r) => r.kelas))];
    if (kel.length > 1) kel.forEach((k) => semua.push(lembar(k, R.filter((r) => r.kelas === k), k)));
  }
  const nama = `Daftar_Siswa_English_Reading_${potongNama(pilih) || "semua"}_${tglBerkas()}.xlsx`;
  await unduhBukuXLSX({ namaBerkas: nama, judulBuku: "Daftar Siswa", lembar: semua });
  return nama;
});

/* ----------------------------------------------------------- sesi latihan per rombel */
let SELISIH = 0;
const LAMA_SESI = [30, 45, 60, 90, 120];
const MENIT_PILIH = {}, MENIT_TAMBAH = {};
async function muatSesi() {
  try { const L = await rpc("er_buka_daftar", { p_pin: PIN }); G.rombel = L;
    const s = L.find((x) => x.sesi); if (s) SELISIH = Date.now() - new Date(s.sesi.sekarang).getTime(); }
  catch (e) { $("sesi-kartu").classList.remove("hidden"); $("sesi-isi").innerHTML = `<p class="butir redup">${esc(e.message)}</p>`; return; }
  gambarSesi();
}
const sisaSesi = (k) => k.sesi ? Math.max(0, Math.ceil((new Date(k.sesi.sampai).getTime() - (Date.now() - SELISIH)) / 60000)) : 0;
const jamTeks = (iso) => new Date(iso).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
function pilihMenit(kel) {
  const pilih = MENIT_PILIH[kel] || 90;
  return `<select data-menit="${esc(kel)}" aria-label="Lama sesi ${esc(kel)}">${LAMA_SESI.map((m) => `<option value="${m}" ${m === pilih ? "selected" : ""}>${m} menit</option>`).join("")}</select>`;
}
const IKON_QR = '<svg class="ikon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z"/></svg>';
const IKON_TERATAS = '<svg class="ikon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 21V9h6v12M3 21v-7h6M15 21v-9h6v9M2 21h20"/></svg>';
function gambarSesi() {
  if (!G) return;
  if (document.activeElement && document.activeElement.matches("#sesi-isi [data-tambah-menit]")) return;
  const pilih = $("dl-kelompok").value, terbuka = (k) => !!k.sesi && sisaSesi(k) > 0;
  const L = G.rombel.filter((k) => !pilih || k.kelas === pilih).sort((a, b) => terbuka(b) - terbuka(a) || a.kelas.localeCompare(b.kelas, "id", { numeric: true }));
  $("sesi-kartu").classList.toggle("hidden", !L.length);
  if (L.some((k) => k.sesi && sisaSesi(k) === 0)) setTimeout(muatSesi, 1500);
  const LB = L.filter(terbuka);
  $("sesi-isi").innerHTML = (L.length > 1 ? `<p class="sesi-ringkas">${LB.length
      ? `<b>${LB.length} sesi sedang berlangsung:</b> ${LB.map((k) => `${esc(k.kelas)} (${esc(k.sesi.oleh || "guru")}, sampai ${jamTeks(k.sesi.sampai)}, ${k.aktif} berlatih)`).join(" · ")}`
      : "Tidak ada sesi yang sedang berlangsung."}</p>` : "") +
    L.map((k) => {
      const buka = terbuka(k);
      return `<div class="sesi-baris ${buka ? "buka" : ""}">
        <div class="sesi-nama"><b>${esc(k.kelas)}</b><small>${k.siswa} siswa${k.terkunci ? ` · <span style="color:var(--absen-tua)">${k.terkunci} terkunci</span>` : ""}</small></div>
        <div class="sesi-status">${buka ? `<span class="lencana baik"><span class="titik-on"></span>Dibuka · sisa ${sisaSesi(k)} menit</span><small>dibuka ${esc(k.sesi.oleh || "guru")} · sampai pukul ${jamTeks(k.sesi.sampai)} · ${k.aktif} sedang berlatih</small>`
          : `<span class="lencana">Ditutup</span><small>${(G.umum || {}).mandiri === false ? "siswa tidak bisa masuk" : "siswa hanya bisa latihan mandiri"}${k.aktif ? ` · ${k.aktif} berlatih mandiri` : ""}</small>`}</div>
        <div class="sesi-kode">${buka ? `<small>Kode akses</small><b>${esc(k.sesi.kode)}</b>` : ""}</div>
        <div class="sesi-aksi">${buka
          ? `<button class="garis kecil sesi-layar" data-layar="${esc(k.kelas)}">${IKON_QR}QR &amp; kode masuk</button><button class="garis kecil sesi-layar" data-teratas="${esc(k.kelas)}">${IKON_TERATAS}Tampilkan teratas</button><span class="sesi-tambah"><button class="garis kecil" data-tambah="${esc(k.kelas)}" title="Memperpanjang sesi yang sedang berjalan; kode akses tetap">+ Tambah</button><input type="number" data-tambah-menit="${esc(k.kelas)}" min="1" max="300" step="1" inputmode="numeric" value="${MENIT_TAMBAH[k.kelas] || 15}" aria-label="Menit tambahan ${esc(k.kelas)}"><span class="satuan">menit</span></span><button class="kecil bahaya" data-tutup="${esc(k.kelas)}">Tutup sekarang</button>`
          : `${pilihMenit(k.kelas)}<button class="kecil" data-buka="${esc(k.kelas)}">Buka sesi</button>`}</div></div>`;
    }).join("");
  const cari = (kel) => G.rombel.find((x) => x.kelas === kel);
  $("sesi-isi").querySelectorAll("[data-menit]").forEach((s) => s.onchange = () => { MENIT_PILIH[s.dataset.menit] = +s.value; });
  $("sesi-isi").querySelectorAll("[data-buka]").forEach((b) => b.onclick = async () => {
    const k = b.dataset.buka, m = +$("sesi-isi").querySelector(`[data-menit="${CSS.escape(k)}"]`).value, sampai = new Date(Date.now() + m * 60000);
    if (!confirm(`Buka sesi latihan untuk ${k} selama ${m} menit?\n\nSiswa ${k} memasukkan NISN dan kode akses yang muncul setelah ini; keluar halaman diawasi. Sesi tertutup sendiri pukul ${jamTeks(sampai)}.`)) return;
    try { G.rombel = await rpc("er_buka_kelas", { p_pin: PIN, p_kelas: [k], p_menit: m }); await muatSesi(); tampilKode(k); toast(`Sesi ${k} dibuka, kode ${cari(k).sesi.kode}`); }
    catch (e) { toast(e.message); }
  });
  $("sesi-isi").querySelectorAll("[data-tambah-menit]").forEach((i) => {
    i.oninput = () => { MENIT_TAMBAH[i.dataset.tambahMenit] = i.value; };
    i.onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); i.parentNode.querySelector("[data-tambah]").click(); } };
  });
  $("sesi-isi").querySelectorAll("[data-tambah]").forEach((b) => b.onclick = async () => {
    const k = b.dataset.tambah, i = b.parentNode.querySelector("[data-tambah-menit]"), m = +i.value;
    if (!Number.isInteger(m) || m < 1 || m > 300) { toast("Isi menit tambahan 1–300"); i.focus(); return; }
    try { G.rombel = await rpc("er_buka_kelas", { p_pin: PIN, p_kelas: [k], p_menit: m }); MENIT_TAMBAH[k] = m; toast(`Sesi ${k} diperpanjang ${m} menit, kode tetap`); muatSesi(); }
    catch (e) { toast(e.message); }
  });
  $("sesi-isi").querySelectorAll("[data-tutup]").forEach((b) => b.onclick = async () => {
    const k = cari(b.dataset.tutup);
    if (!confirm(`Tutup sesi ${k.kelas} sekarang?\n\n${k.aktif ? `${k.aktif} siswa yang sedang berlatih dalam sesi akan dikeluarkan. ` : ""}Kemajuan siswa tetap tersimpan. Kode ${k.sesi.kode} tidak berlaku lagi.`)) return;
    try { G.rombel = await rpc("er_tutup_kelas", { p_pin: PIN, p_kelas: [k.kelas] }); toast(`Sesi ${k.kelas} ditutup`); muatSesi(); muatDaftar(true); }
    catch (e) { toast(e.message); }
  });
  $("sesi-isi").querySelectorAll("[data-layar]").forEach((b) => b.onclick = () => tampilKode(b.dataset.layar));
  $("sesi-isi").querySelectorAll("[data-teratas]").forEach((b) => b.onclick = () => tampilTeratas(b.dataset.teratas));
}
setInterval(() => { if (G && !document.hidden && !$("p-daftar").classList.contains("hidden")) gambarSesi(); }, 20000);

/* Kode besar + QR untuk diproyeksikan: QR membuka halaman siswa dengan kode akses terisi (index.html#kode=…). */
let _qrPustaka;
const muatQR = () => _qrPustaka || (_qrPustaka = new Promise((ok, gagal) => {
  if (window.QRCode) return ok();
  const sc = document.createElement("script");
  sc.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
  sc.onload = () => ok(); sc.onerror = () => { _qrPustaka = null; gagal(); };
  document.head.appendChild(sc);
}));
async function tampilKode(kel) {
  const k = G.rombel.find((x) => x.kelas === kel);
  if (!k || !k.sesi) return;
  const dasar = new URL("./", location.href).href;
  $("kl-kel").textContent = "English Reading · " + k.kelas; $("kl-kode").textContent = k.sesi.kode; $("kl-sampai").textContent = `Berlaku sampai pukul ${jamTeks(k.sesi.sampai)}`;
  $("kl-url").textContent = dasar.replace(/\/$/, "");
  const qr = $("kl-qr"); qr.innerHTML = ""; qr.classList.add("hidden"); $("kode-layar").classList.remove("qr-saja"); $("kl-petunjuk").textContent = "";
  $("kode-layar").classList.remove("hidden"); $("kl-tutup").focus();
  if (document.documentElement.requestFullscreen && !document.fullscreenElement) $("kode-layar").requestFullscreen().catch(() => {});
  try {
    await muatQR();
    new QRCode(qr, { text: `${dasar}#kode=${encodeURIComponent(k.sesi.kode)}`, width: 1024, height: 1024, correctLevel: QRCode.CorrectLevel.L });
    $("kl-petunjuk").textContent = "Ketuk QR untuk memperbesar";
    qr.removeAttribute("title");
    qr.classList.remove("hidden");
  } catch (e) { /* tanpa QR: kode saja */ }
}
const tutupKode = () => { $("kode-layar").classList.add("hidden"); if (document.fullscreenElement === $("kode-layar")) document.exitFullscreen().catch(() => {}); };
$("kl-tutup").onclick = tutupKode;
$("kl-qr").onclick = () => $("kode-layar").classList.toggle("qr-saja");
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { tutupKode(); tutupTeratas(); } });
document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) return;
  if (!$("kode-layar").classList.contains("hidden")) $("kode-layar").classList.add("hidden");
  if (TR) tutupTeratas();
});

/* ---- Papan 10 teratas: sejak sesi dibuka, urut sub level lulus → rata-rata nilai → banyak kegiatan. */
const TR_JEDA_PILIH = [8, 15, 30, 60];
const trJedaSimpan = () => { try { const v = +localStorage.getItem("er_teratas_jeda"); return TR_JEDA_PILIH.includes(v) ? v : 30; } catch (e) { return 30; } };
let TR_JEDA = trJedaSimpan(), TR = null;
const namaPapan = (n) => { const k = String(n || "").toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase()).trim().split(/\s+/); return k.length <= 2 ? k.join(" ") : `${k[0]} ${k[1]} ${k[2][0]}.`; };
const inisialPapan = (n) => String(n || "").trim().split(/\s+/).slice(0, 2).map((w) => w[0] || "").join("").toUpperCase();
async function tampilTeratas(kel, sim = false) {
  tutupTeratas();
  const jeda = sim ? SIM_JEDA : TR_JEDA;
  TR = { kel, sisa: jeda, jeda, lalu: new Map(), sim };
  if (sim) mulaiSimulasi();
  $("tr-jeda").closest("label").hidden = sim;
  $("tr-jeda").value = String(TR_JEDA);
  $("tr-kel").textContent = kel; $("tr-galat").textContent = "";
  $("tr-info").innerHTML = ""; $("tr-angka").innerHTML = "";
  $("tr-isi").innerHTML = '<p class="tr-muat">Memuat peringkat…</p>';
  $("teratas-layar").classList.remove("hidden"); $("tr-tutup").focus();
  if (document.documentElement.requestFullscreen && !document.fullscreenElement) $("teratas-layar").requestFullscreen().catch(() => {});
  gambarDetak();
  await muatTeratas();
  if (!TR) return;
  TR.waktu = setInterval(() => { if (!TR) return; TR.sisa -= 1; if (TR.sisa <= 0) { TR.sisa = TR.jeda; muatTeratas(); } gambarDetak(); }, 1000);
}
async function muatTeratas() {
  if (!TR) return;
  if (TR.sim) { gambarTeratas(langkahSimulasi()); return; }
  const kel = TR.kel;
  try {
    const d = await rpc("er_teratas", { p_pin: PIN, p_kelas: kel });
    if (!TR || TR.kel !== kel) return;
    d.selisih = Date.now() - new Date(d.sekarang).getTime();
    $("tr-galat").textContent = "";
    gambarTeratas(d);
  } catch (e) { if (TR) $("tr-galat").textContent = "Gagal memuat: " + e.message; }
}
function gambarDetak() {
  if (!TR) return;
  $("tr-detak-teks").textContent = `Diperbarui dalam ${TR.sisa} detik`;
  $("tr-detak").style.width = `${((TR.jeda - TR.sisa) / TR.jeda) * 100}%`;
}
function gambarTeratas(d) {
  const sisa = d.sampai ? Math.max(0, Math.ceil((new Date(d.sampai).getTime() - (Date.now() - d.selisih)) / 60000)) : 0;
  $("tr-info").innerHTML = (d.buka ? `<span class="tr-pil langsung"><span class="tr-titik"></span>Langsung · sisa ${sisa} menit</span>` : '<span class="tr-pil tutup">Sesi ditutup · hasil sesi terakhir</span>') +
    (d.simulasi ? '<span class="tr-pil tutup">Simulasi · data contoh, tidak tersimpan</span>' : "") +
    (d.kode ? `<span class="tr-pil">Kode masuk <b>${esc(d.kode)}</b></span>` : "") + `<span class="tr-pil">Sejak pukul ${jamTeks(d.dari)}</span>`;
  $("tr-angka").innerHTML = [
    [`${d.n_berlatih}<small> / ${d.n_siswa}</small>`, "siswa sudah berlatih"], [d.total_lulus, "sub level lulus"],
    [d.total_kegiatan, "kegiatan selesai"], [`${d.rata || 0}<small>%</small>`, "rata-rata nilai rombel"],
  ].map(([b, s]) => `<div class="tr-kartu"><b>${b}</b><span>${s}</span></div>`).join("");
  const T = d.teratas || [];
  const naik = (r) => TR.lalu.size && (!TR.lalu.has(r.nisn) || TR.lalu.get(r.nisn) > r.peringkat);
  const selisihNaik = (r) => TR.lalu.has(r.nisn) ? TR.lalu.get(r.nisn) - r.peringkat : 0;
  if (!T.length) {
    $("tr-isi").innerHTML = `<div class="tr-kosong-daftar" style="grid-column:1/-1"><div><b>Siapa yang pertama?</b>
      Belum ada kegiatan yang selesai dalam sesi ini. Peringkat muncul begitu siswa menuntaskan kegiatan pertamanya.</div></div>`;
  } else {
    const posisi = (r) => { const b = levelDari(r.level); return b ? `${labelLevel(b)}${r.sub ? " · sub " + r.sub : ""}` : ""; };
    const tiang = (r, j) => r
      ? `<div class="tr-tiang j${j}${naik(r) ? " naik" : ""}"><span class="tr-mahkota">${j === 1 ? "★" : ""}</span>
          <span class="tr-ava">${esc(inisialPapan(r.nama))}</span><span class="tr-nama-p" title="${esc(r.nama)}">${esc(namaPapan(r.nama))}</span>
          <span class="tr-meta-p"><b>${r.lulus}</b> sub lulus · rata <b>${r.rata ?? 0}%</b></span><div class="tr-alas">${j}</div></div>`
      : `<div class="tr-tiang j${j} kosong"><span class="tr-mahkota"></span><span class="tr-ava">–</span><span class="tr-nama-p">&nbsp;</span><span class="tr-meta-p">&nbsp;</span><div class="tr-alas">${j}</div></div>`;
    const maks = Math.max(1, ...T.map((r) => r.lulus));
    $("tr-isi").innerHTML = `<div class="tr-podium">${tiang(T[1], 2)}${tiang(T[0], 1)}${tiang(T[2], 3)}</div>
      <div class="tr-daftar" style="grid-template-rows: repeat(7, minmax(0, 1fr))">${T.slice(3).map((r) => `
        <div class="tr-baris${naik(r) ? " naik" : ""}"><span class="tr-no">${r.peringkat}</span>
          <span class="tr-siswa"><b title="${esc(r.nama)}">${esc(namaPapan(r.nama))}${selisihNaik(r) > 0 ? `<span class="tr-naik">▲${selisihNaik(r)}</span>` : ""}</b><small>${esc(posisi(r))}</small></span>
          <span class="tr-batang"><span class="tr-jalur"><i style="width:${(100 * r.lulus) / maks}%"></i></span><b>${r.lulus}<small> lulus</small></b></span>
          <span class="tr-lvl">rata ${r.rata ?? 0}%</span></div>`).join("") || '<div class="tr-kosong-daftar"><div>Peringkat 4–10 menunggu penantang berikutnya.</div></div>'}</div>`;
  }
  TR.lalu = new Map(T.map((r) => [r.nisn, r.peringkat]));
}
function tutupTeratas() {
  if (!TR) return;
  clearInterval(TR.waktu); TR = null;
  $("teratas-layar").classList.add("hidden");
  if (document.fullscreenElement === $("teratas-layar")) document.exitFullscreen().catch(() => {});
}
$("tr-tutup").onclick = tutupTeratas;
$("tr-jeda").value = String(TR_JEDA);
$("tr-jeda").onchange = () => {
  TR_JEDA = +$("tr-jeda").value;
  try { localStorage.setItem("er_teratas_jeda", String(TR_JEDA)); } catch (e) { /* tanpa penyimpanan */ }
  if (TR && !TR.sim) { TR.jeda = TR_JEDA; TR.sisa = Math.min(TR.sisa, TR_JEDA); gambarDetak(); }
};
/* guru.html?simulasi=teratas: papan dengan siswa contoh yang berlomba, tanpa PIN dan tanpa server. */
const SIM_JEDA = 3;
let SIM = null;
function mulaiSimulasi() {
  const nama = ["Aditya Pratama", "Bunga Lestari", "Citra Maharani", "Dimas Saputra", "Eka Rahmawati", "Fajar Nugraha", "Gita Permata", "Hana Salsabila",
    "Ilham Ramadhan", "Jihan Aulia", "Kevin Pradana", "Laila Nurhasanah", "Muhammad Rizky", "Nadia Putri", "Oki Firmansyah", "Putri Ayu", "Rangga Wijaya",
    "Salsa Nabila", "Taufik Hidayat", "Ulfa Maulida", "Vina Oktaviani", "Wahyu Setiawan", "Yogi Prasetyo", "Zahra Amelia", "Annisa Fitri", "Bagas Kurniawan",
    "Dewi Sartika", "Farhan Maulana", "Intan Permatasari", "Rizal Fauzi", "Siti Nurjanah", "Raka Aditya", "Nayla Zahira", "Galih Saputra"];
  const L = window.BACAAN.filter((b) => b.tahap === 2);
  SIM = { mulai: Date.now(), langkah: 0, siswa: nama.map((n, i) => ({ nisn: "SIM" + i, nama: n, mampu: 0.55 + Math.random() * 0.4, masuk: Math.floor(Math.random() * 5),
    lulus: 0, kegiatan: 0, total: 0, level: L[Math.floor(Math.random() * 3)].id, sub: 1 })) };
}
function langkahSimulasi() {
  SIM.langkah += 1;
  for (const s of SIM.siswa) {
    if (SIM.langkah < s.masuk || Math.random() < 0.4) continue;
    const nilai = Math.round(Math.min(100, Math.max(30, (s.mampu + (Math.random() - 0.5) * 0.4) * 100)));
    s.kegiatan += 1; s.total += nilai;
    if (nilai >= 80) { s.lulus += 1; s.sub = s.sub >= 10 ? 1 : s.sub + 1; }
  }
  const aktif = SIM.siswa.filter((s) => s.kegiatan > 0).map((s) => ({ ...s, rata: Math.round(s.total / s.kegiatan) }));
  aktif.sort((a, b) => b.lulus - a.lulus || b.rata - a.rata || b.kegiatan - a.kegiatan || a.nama.localeCompare(b.nama, "id"));
  return { simulasi: true, buka: true, kode: null, sekarang: new Date().toISOString(), selisih: 0,
    dari: new Date(SIM.mulai).toISOString(), sampai: new Date(SIM.mulai + 30 * 60000).toISOString(),
    n_siswa: SIM.siswa.length, n_berlatih: aktif.length, total_lulus: aktif.reduce((t, s) => t + s.lulus, 0), total_kegiatan: aktif.reduce((t, s) => t + s.kegiatan, 0),
    rata: aktif.length ? Math.round(aktif.reduce((t, s) => t + s.rata, 0) / aktif.length) : 0,
    teratas: aktif.slice(0, 10).map((s, i) => ({ peringkat: i + 1, nisn: s.nisn, nama: s.nama, lulus: s.lulus, kegiatan: s.kegiatan, rata: s.rata, level: s.level, sub: s.sub })) };
}
if (new URLSearchParams(location.search).get("simulasi") === "teratas") tampilTeratas("Simulasi", true);

/* ----------------------------------------------------------- aturan (isian tahapan khusus & Pengaturan Umum) */
// Aturan yang boleh dibuat khusus di tahapan khusus, dikelompokkan seperti Pengaturan Umum.
const ATUR_KHUSUS = [
  { g: "Halaman latihan", f: [
    { k: "tampilJawaban", l: "Jawaban benar saat salah", t: "ya", on: "Ditampilkan", off: "Disembunyikan" },
    { k: "bilaSalah", l: "Bila jawaban salah", t: "pilih", opsi: [["akhir", "Diulang di akhir sesi"], ["ulang", "Diulang di nomor itu sampai benar"], ["lanjut", "Maju terus"]] } ] },
  { g: "Naik sub level", f: [
    { k: "jumlahSoal", l: "Jumlah soal per sub level", t: "angka", sat: "soal", min: 5, maks: 50 },
    { k: "batasSalah", l: "Batas salah per sub level", t: "angka", sat: "kali", min: 0, maks: 50 },
    { k: "harusDengar", l: "Dengar teks dulu", t: "ya", on: "Harus Dengar", off: "Tanpa Dengar" },
    { k: "harusBaca", l: "Baca teks dulu", t: "ya", on: "Harus Baca", off: "Tanpa Baca" },
    { k: "syaratBaca", l: "Akurasi membaca minimal", t: "angka", sat: "%", min: 50, maks: 100 } ] },
  { g: "Pengawasan keluar halaman", f: [
    { k: "maks_keluar", l: "Batas keluar halaman", t: "angka", sat: "kali", min: 0, maks: 20 },
    { k: "toleransi_keluar", l: "Abaikan keluar di bawah", t: "angka", sat: "detik", min: 0, maks: 120 } ] },
];
const SEMUA_KHUSUS = ATUR_KHUSUS.flatMap((g) => g.f);
const BAWAAN = { jumlahSoal: 10, harusDengar: true, harusBaca: true, syaratBaca: 75, tampilJawaban: true, bilaSalah: "akhir", batasSalah: 0,
  mandiri: true, mandiri_jam: 3, maks_keluar: 0, toleransi_keluar: 10, kode_buka: "" };
const umumNilai = (k) => (G.umum && G.umum[k] != null ? G.umum[k] : BAWAAN[k]);
const nilaiAturTeks = (x, v) => x.t === "ya" ? (v ? x.on : x.off) : x.t === "pilih" ? ((x.opsi.find((o) => o[0] === v) || [])[1] || v)
  : (x.k === "batasSalah" || x.k === "maks_keluar") ? (v ? `${v} ${x.sat}` : "tanpa batas") : x.sat === "%" ? `${v}%` : `${v} ${x.sat}`;
const aturanProfil = (p) => SEMUA_KHUSUS.filter((x) => p.setelan && p.setelan[x.k] != null);
const ringkasAturan = (p) => aturanProfil(p).map((x) => `${x.l} ${nilaiAturTeks(x, p.setelan[x.k])}`).join(", ");

// Ringkasan materi sebuah tahapan (null = tahapan umum tanpa yang ditutup admin).
function ringkasTahapan(m) {
  let tahap = 0, level = 0, sub = 0;
  window.TAHAP.forEach((t) => {
    let ada = false;
    window.BACAAN.filter((b) => b.tahap === t.no).forEach((b) => { if (!levelOn(m, b)) return; level++; ada = true; if (punyaSub(b)) sub += subDipakaiM(m, b).length; });
    if (ada) tahap++;
  });
  return { tahap, level, sub };
}
const teksRingkas = (r) => `${r.tahap} tahap · ${r.level} level · ${r.sub} sub level`;

/* ---- Kotak "Aturan dan tahapan yang berlaku" di Sesi Kegiatan */
function gambarInfoKelompok() {
  if (!G) return;
  const pilih = $("dl-kelompok").value, kel = pilih ? [pilih] : G.rombel.map((r) => r.kelas);
  $("info-kel").classList.toggle("hidden", !kel.length);
  if (!kel.length) return;
  const chip = (x, v, kls) => `<span class="ik-chip ${kls || ""}"><small>${x.l}</small><b>${esc(nilaiAturTeks(x, v))}</b></span>`;
  const isianUmum = ["jumlahSoal", "bilaSalah", "maks_keluar"].map((k) => SEMUA_KHUSUS.find((x) => x.k === k));
  const hitung = (L) => { const m = new Map(); L.forEach((v) => m.set(v, (m.get(v) || 0) + 1)); return [...m].map(([v, c]) => `${esc(v)} (${c})`).join(", "); };
  const baris = kel.map((k) => {
    const pr = profilRombel(k), p = pr && PROFIL.find((x) => x.id === pr.id), A = DAFTAR.filter((r) => r.kelas === k), n = A.length, sT = A.filter((r) => r.profil);
    const jml = (c) => c === n && n > 0 ? `Semua siswa (${c})` : `${c} siswa`;
    const lainT = sT.length ? `<span class="ik-ket"><b>${jml(sT.length)}</b> memakai tahapan sendiri: ${hitung(sT.map((r) => r.profil.nama))}</span>` : "";
    return `<div class="ik-baris">
      <div class="ik-kel"><b>${esc(k)}</b><small>${n || (G.rombel.find((x) => x.kelas === k) || {}).siswa || 0} siswa</small></div>
      <div class="ik-sel"><span class="ik-judul">Aturan rombel</span>${p && aturanProfil(p).length
        ? `<b>Dari tahapan "${esc(p.nama)}"</b><span class="ik-chips">${aturanProfil(p).map((x) => chip(x, p.setelan[x.k], "khusus")).join("")}</span><small>Isian lain mengikuti Pengaturan Umum.</small>`
        : `<b>Pengaturan Umum</b><span class="ik-chips">${isianUmum.map((x) => chip(x, umumNilai(x.k))).join("")}</span>`}</div>
      <div class="ik-sel"><span class="ik-judul">Tahapan rombel</span>${pr
        ? `<b>Tahapan "${esc(pr.nama)}"</b><small>${p ? esc(teksRingkas(ringkasTahapan(p.mati))) : ""}</small>`
        : `<b>Tahapan Level</b><small>Urutan bawaan, ${esc(teksRingkas(ringkasTahapan(matiUmum())))}.</small>`}
        ${lainT ? `<div class="ik-lain"><span class="ik-judul">Diatur per siswa</span>${lainT}</div>` : ""}</div>
    </div>`;
  });
  $("info-kel-isi").innerHTML = kel.length > 3 ? `<details class="ik-lipat"><summary>Tampilkan aturan dan tahapan ${kel.length} rombel</summary>${baris.join("")}</details>` : baris.join("");
}

/* ----------------------------------------------------------- tahapan khusus (aturan + materi) */
let PROFIL = [], SEMUA = [];
const dipakaiTeks = (p) => [p.kelas.length ? `rombel ${p.kelas.join(", ")} (${p.kelas.reduce((a, k) => a + ((G.rombel.find((r) => r.kelas === k) || {}).siswa || 0), 0)} siswa)` : "",
  p.siswa ? `${p.siswa} siswa dipilih langsung` : ""].filter(Boolean).join(" · ");
async function muatProfil(diam) {
  try { PROFIL = await rpc("er_profil_daftar", { p_pin: PIN }); } catch (e) { if (!diam) toast(e.message); return; }
  gambarProfil(); gambarKelompokAturan(); gambarInfoKelompok();
}
async function muatSemua() {
  try { SEMUA = await rpc("er_siswa_daftar", { p_pin: PIN }); } catch (e) { return; }
  $("ck-daftar").innerHTML = SEMUA.map((r) => `<option value="${esc(r.nama)} · ${esc(r.nisn)}">${esc(r.kelas)}</option>`).join("");
  gambarKelompokAturan();
}
function matiKecuali(tahapDipakai, subMati) {
  const m = { tahap: window.TAHAP.map((t) => t.no).filter((n) => !tahapDipakai.includes(n)), level: [], sub: {} };
  if (subMati) window.BACAAN.filter((b) => tahapDipakai.includes(b.tahap) && punyaSub(b) && daftarSub(b).length >= 10).forEach((b) => { m.sub[b.id] = subMati.slice(); });
  return m;
}
const CONTOH = [
  { kode: "tka", ikon: "🎓", nama: "Persiapan TKA", ket: "Level TKA saja, sub level 6–10 sesuai kisi-kisi ujian, 20 soal per sub level.", buat: () => ({ setelan: { jumlahSoal: 20 }, mati: matiKecuali([4], [1, 2, 3, 4, 5]) }) },
  { kode: "utbk", ikon: "🏛️", nama: "Persiapan UTBK/SNBT", ket: "Level UTBK/SNBT saja, sub level 6–10, 20 soal per sub level.", buat: () => ({ setelan: { jumlahSoal: 20 }, mati: matiKecuali([5], [1, 2, 3, 4, 5]) }) },
  { kode: "fondasi", ikon: "🌱", nama: "Fondasi", ket: "Kosakata dasar dan kalimat sederhana (Tahap 0–1).", buat: () => ({ setelan: {}, mati: matiKecuali([0, 1]) }) },
  { kode: "genre", ikon: "📚", nama: "Teks Fungsional & Genre", ket: "Tahap 2–3: teks pendek dan genre teks.", buat: () => ({ setelan: {}, mati: matiKecuali([2, 3]) }) },
];
function gambarProfil() {
  $("jl-contoh").innerHTML = `<button class="jl-contoh-kartu baru" data-buat="baru"><span aria-hidden="true">＋</span><b>Buat dari awal</b><small>Semua materi dicentang, lalu pilih sendiri.</small></button>` +
    CONTOH.map((c) => `<button class="jl-contoh-kartu" data-buat="${c.kode}"><span aria-hidden="true">${c.ikon}</span><b>${c.nama}</b><small>${c.ket}</small></button>`).join("");
  $("jl-contoh").querySelectorAll("[data-buat]").forEach((b) => b.onclick = () => bukaEditorJalur(null, b.dataset.buat));
  $("jl-daftar").innerHTML = PROFIL.length ? PROFIL.map((p) => {
    const pakai = dipakaiTeks(p), r = ringkasTahapan(p.mati);
    return `<div class="butir"><div class="jl-kepala"><div><h2>${esc(p.nama)}</h2>${p.catatan ? `<span class="redup kecil">${esc(p.catatan)}</span><br>` : ""}<span class="redup kecil">dibuat ${esc(p.pemilik_nama || "admin")} · diubah ${esc(tglTeks(p.diubah, true))}</span></div>
      <span class="jl-aksi">${p.milik !== false ? `<button class="garis kecil" data-ubah="${esc(p.id)}">Ubah</button>` : ""}<button class="garis kecil" data-salin="${esc(p.id)}">Salin</button>${p.milik !== false ? `<button class="kecil bahaya" data-hapus="${esc(p.id)}">Hapus</button>` : ""}</span></div>
      <div class="pr-chip"><span class="pakai"><small>Materi</small><b>${esc(teksRingkas(r))}</b></span>${aturanProfil(p).map((x) => `<span><small>${x.l}</small><b>${esc(nilaiAturTeks(x, p.setelan[x.k]))}</b></span>`).join("") || '<span><small>Aturan</small><b>ikut Pengaturan Umum</b></span>'}</div>
      <div class="pr-pakai ${pakai ? "" : "redup"}">${pakai ? "<b>Dipakai oleh:</b> " + esc(pakai) : "Belum dipakai rombel atau siswa"}</div></div>`;
  }).join("") : '<p class="butir kosong-data">Belum ada tahapan khusus. Semua siswa memakai Pengaturan Umum dan urutan Tahapan Level.</p>';
  const cari = (id) => PROFIL.find((p) => p.id === id);
  $("jl-daftar").querySelectorAll("[data-ubah]").forEach((b) => b.onclick = () => bukaEditorJalur(cari(b.dataset.ubah)));
  $("jl-daftar").querySelectorAll("[data-salin]").forEach((b) => b.onclick = () => { const p = cari(b.dataset.salin); bukaEditorJalur({ ...p, id: null, nama: p.nama + " (salinan)" }); });
  $("jl-daftar").querySelectorAll("[data-hapus]").forEach((b) => b.onclick = async () => {
    const p = cari(b.dataset.hapus), pakai = dipakaiTeks(p);
    if (!confirm(`Hapus tahapan "${p.nama}"?\n\n` + (pakai ? `Dipakai oleh: ${pakai}.\nMereka kembali ke tahapan di bawahnya (tahapan rombel atau tahapan umum). Kemajuan siswa tidak berubah.` : "Tahapan ini belum dipakai."))) return;
    try { await rpc("er_profil_hapus", { p_pin: PIN, p_id: p.id }); toast("Tahapan dihapus"); await muatSesi(); muatProfil(); muatKelas(); } catch (e) { toast(e.message); }
  });
}
function gambarKelompokAturan() {
  if (!$("pr-kelompok") || !G) return;
  if (!G.rombel.length) { $("pr-kelompok").innerHTML = '<p class="butir redup">Belum ada rombel. Admin perlu menarik guru Bahasa Inggris dari Data Induk.</p>'; return; }
  const anggota = (k) => SEMUA.filter((r) => r.kelas === k);
  $("pr-kelompok").innerHTML = `<div class="gulir seksi-tabel"><table class="tabel kel-tabel"><thead><tr><th>Rombel</th><th class="angka">Anggota</th><th>Tahapan</th><th>Yang berbeda dari umum</th></tr></thead><tbody>${G.rombel.map((r) => {
    const p = r.profil && PROFIL.find((x) => x.id === r.profil.id), sendiri = anggota(r.kelas).filter((s) => s.profil).length;
    return `<tr><td><b>${esc(r.kelas)}</b></td><td class="angka">${SEMUA.length ? anggota(r.kelas).length : r.siswa}</td>
      <td><select data-kel="${esc(r.kelas)}" aria-label="Tahapan ${esc(r.kelas)}"><option value="">— Pengaturan Umum &amp; Tahapan Level —</option>${PROFIL.map((x) => `<option value="${esc(x.id)}" ${r.profil && r.profil.id === x.id ? "selected" : ""}>${esc(x.nama)}</option>`).join("")}</select></td>
      <td class="kecil redup">${[p ? `Materi: <b>${esc(teksRingkas(ringkasTahapan(p.mati)))}</b>` : "", p ? aturanProfil(p).map((x) => `${x.l}: <b>${esc(nilaiAturTeks(x, p.setelan[x.k]))}</b>`).join(" · ") : "",
        sendiri ? `${sendiri} siswa bertahapan sendiri` : ""].filter(Boolean).join(" · ") || "—"}</td></tr>`;
  }).join("")}</tbody></table></div>`;
  $("pr-kelompok").querySelectorAll("[data-kel]").forEach((sel) => sel.onchange = async () => {
    const k = sel.dataset.kel, p = PROFIL.find((x) => x.id === sel.value), A = anggota(k), sendiri = A.filter((r) => r.profil).length;
    const pesan = p ? `Pasang tahapan "${p.nama}" untuk rombel ${k} (${A.length || ""} siswa)?\n\nMateri: ${teksRingkas(ringkasTahapan(p.mati))}.` +
        (aturanProfil(p).length ? `\nAturan: ${ringkasAturan(p)}. Isian lain dari Pengaturan Umum.` : "\nAturan ikut Pengaturan Umum.") +
        (sendiri ? `\n\n${sendiri} siswa punya tahapan sendiri dan tidak ikut.` : "") + "\n\nKemajuan siswa tidak berubah."
      : `Rombel ${k} kembali ke Pengaturan Umum dan urutan Tahapan Level?`;
    if (!confirm(pesan)) return gambarKelompokAturan();
    try { G.rombel = await rpc("er_pasang_kelas", { p_pin: PIN, p_kelas: k, p_profil: p ? p.id : null });
      toast(p ? `Tahapan ${k}: "${p.nama}"` : `${k} kembali ke tahapan umum`); muatProfil(true); muatKelas(); }
    catch (e) { toast(e.message); gambarKelompokAturan(); }
  });
}

/* Editor tahapan khusus: identitas, aturan (ikut umum atau diisi), dan checklist materi tahap → level → sub level.
   Disimpan sebagai daftar yang dimatikan (mati), jadi bacaan baru otomatis ikut dipakai. */
let draf = null;
function bukaEditorJalur(p, kode) {
  const contoh = CONTOH.find((c) => c.kode === kode), ed = $("jl-editor");
  const dasar = p ? JSON.parse(JSON.stringify(p)) : { nama: contoh ? contoh.nama : "", catatan: contoh ? contoh.ket : "", ...(contoh ? contoh.buat() : { setelan: {}, mati: {} }) };
  draf = { id: p ? p.id : null, setelan: dasar.setelan || {}, mati: Object.assign({ tahap: [], level: [], sub: {} }, dasar.mati),
    buka: new Set(contoh ? window.TAHAP.map((t) => t.no).filter((n) => tahapOn(dasar.mati, n)) : []), bukaLevel: new Set() };
  const kendali = (x) => {
    const v = draf.setelan[x.k], u = umumNilai(x.k);
    if (x.t === "ya") return `<select data-pk="${x.k}"><option value="">— ikut umum (${u ? x.on : x.off}) —</option><option value="true" ${v === true ? "selected" : ""}>${x.on}</option><option value="false" ${v === false ? "selected" : ""}>${x.off}</option></select>`;
    if (x.t === "pilih") return `<select data-pk="${x.k}"><option value="">— ikut umum (${esc(nilaiAturTeks(x, u))}) —</option>${x.opsi.map((o) => `<option value="${o[0]}" ${v === o[0] ? "selected" : ""}>${o[1]}</option>`).join("")}</select>`;
    return `<span class="grup"><input type="number" data-pk="${x.k}" min="${x.min}" max="${x.maks}" inputmode="numeric" placeholder="${u}" value="${v == null ? "" : v}"><span class="satuan">${x.sat}</span></span>`;
  };
  ed.innerHTML = `<h2>${draf.id ? "Ubah tahapan khusus" : "Tahapan khusus baru"}</h2>
    <div class="pr-identitas"><label>Nama tahapan<input type="text" id="jl-nama" maxlength="60" placeholder="mis. Remedial X-2" value="${esc(dasar.nama)}"></label>
      <label>Catatan (opsional)<input type="text" id="jl-catatan" maxlength="200" placeholder="mis. Bu Rina — persiapan TKA kelas 12" value="${esc(dasar.catatan || "")}"></label></div>
    <p class="redup kecil">Nama ini dilihat siswa di halaman depannya. Aturan: isi hanya yang ingin dibedakan; kotak kosong mengikuti Pengaturan Umum (angka samar).</p>
    ${ATUR_KHUSUS.map((g) => `<div class="pr-grup"><div class="ds-sub-judul">${g.g}</div><div class="pr-isian">${g.f.map((x) => `<label><span>${x.l}</span>${kendali(x)}</label>`).join("")}</div></div>`).join("")}
    <div class="pr-grup"><div class="ds-sub-judul">Materi yang dipakai</div>
      <p class="redup kecil" style="margin-top:0">Centang materi yang dipakai. Mematikan <b>tahap</b> ikut mematikan levelnya; mematikan <b>level</b> ikut mematikan sub levelnya. Tombol angka mengatur satu sub level di semua level tahap itu sekaligus.</p>
      <div class="at-alat"><button class="garis kecil" data-alat="semua-on">✓ Pakai semua</button><button class="garis kecil" data-alat="semua-off">Matikan semua</button>
        <button class="garis kecil" data-alat="buka-semua">Buka semua tahap</button><button class="garis kecil" data-alat="tutup-semua">Tutup semua</button></div>
      <div class="at-legenda"><span><i class="lg-on"></i>dipakai</span><span><i class="lg-sebagian"></i>sebagian</span><span><i class="lg-off"></i>tidak dipakai</span></div>
      <div class="at-pohon" id="ed-pohon"></div></div>
    <p class="pesan buruk hidden jl-galat" id="jl-galat" role="alert"></p>
    <div class="jl-simpan"><span class="kecil redup" id="ed-ringkas"></span><span class="baris"><button class="garis" id="jl-batal">Batal</button><button id="jl-simpan">Simpan tahapan</button></span></div>`;
  gambarPohon();
  ed.querySelector(".at-alat").onclick = (e) => {
    const a = e.target.closest("[data-alat]"); if (!a) return;
    if (a.dataset.alat === "semua-on") draf.mati = { tahap: [], level: [], sub: {} };
    if (a.dataset.alat === "semua-off") draf.mati = { tahap: window.TAHAP.map((t) => t.no), level: [], sub: {} };
    if (a.dataset.alat === "buka-semua") window.TAHAP.forEach((t) => draf.buka.add(t.no));
    if (a.dataset.alat === "tutup-semua") { draf.buka.clear(); draf.bukaLevel.clear(); }
    gambarPohon();
  };
  const tog = (arr, v, nyala) => { const i = arr.indexOf(v); if (nyala && i >= 0) arr.splice(i, 1); else if (!nyala && i < 0) arr.push(v); };
  const pohon = $("ed-pohon");
  pohon.onchange = (e) => {
    const x = e.target, mt = draf.mati;
    if (x.dataset.tahap != null) { const t = +x.dataset.tahap; tog(mt.tahap, t, x.checked); if (x.checked) draf.buka.add(t); }
    else if (x.dataset.level) tog(mt.level, x.dataset.level, x.checked);
    else if (x.dataset.sub) { const arr = mt.sub[x.dataset.sub] || (mt.sub[x.dataset.sub] = []); tog(arr, +x.dataset.n, x.checked); if (!arr.length) delete mt.sub[x.dataset.sub]; }
    gambarPohon();
  };
  pohon.onclick = (e) => {
    const a = e.target.closest("[data-aksi]"); if (!a) return;
    const mt = draf.mati;
    if (a.dataset.aksi === "buka-tahap") { const t = +a.dataset.t; draf.buka.has(t) ? draf.buka.delete(t) : draf.buka.add(t); }
    else if (a.dataset.aksi === "buka-level") { const l = a.dataset.l; draf.bukaLevel.has(l) ? draf.bukaLevel.delete(l) : draf.bukaLevel.add(l); }
    else if (a.dataset.aksi === "massal") {
      const t = +a.dataset.t, n = +a.dataset.n;
      const L = window.BACAAN.filter((b) => b.tahap === t && punyaSub(b) && daftarSub(b).length >= n && levelOnDasar(mt, b));
      const nyalakan = statusMassal(mt, L, n) !== "on";
      L.forEach((b) => { const arr = mt.sub[b.id] || (mt.sub[b.id] = []); tog(arr, n, nyalakan); if (!arr.length) delete mt.sub[b.id]; });
    } else return;
    gambarPohon();
  };
  $("jl-batal").onclick = () => { ed.classList.add("hidden"); draf = null; };
  $("jl-simpan").onclick = async () => {
    const nama = $("jl-nama").value.trim(), galat = $("jl-galat");
    const g = (t) => { galat.textContent = t; galat.classList.remove("hidden"); galat.scrollIntoView({ block: "center", behavior: "smooth" }); };
    galat.classList.add("hidden");
    if (!nama) { g("Isi nama tahapan dulu."); $("jl-nama").focus(); return; }
    if (!ringkasTahapan(draf.mati).level) { g("Pilih minimal satu level di bagian Materi yang dipakai."); return; }
    const setelan = {};
    for (const x of SEMUA_KHUSUS) {
      const v = ed.querySelector(`[data-pk="${x.k}"]`).value.trim();
      if (v === "") continue;
      if (x.t === "ya") setelan[x.k] = v === "true";
      else if (x.t === "pilih") setelan[x.k] = v;
      else { const n = Number(v); if (!Number.isInteger(n) || n < x.min || n > x.maks) { g(`${x.l}: isi ${x.min}–${x.maks} atau kosongkan.`); return; } setelan[x.k] = n; }
    }
    const lama = draf.id && PROFIL.find((x) => x.id === draf.id), pakai = lama ? dipakaiTeks(lama) : "";
    if (pakai && !confirm(`Simpan perubahan tahapan "${nama}"?\n\nPerubahan langsung berlaku untuk: ${pakai}. Kemajuan siswa tidak berubah.`)) return;
    try { await rpc("er_profil_simpan", { p_pin: PIN, p_p: { id: draf.id, nama, catatan: $("jl-catatan").value.trim(), setelan, mati: draf.mati } });
      toast("Tahapan disimpan"); ed.classList.add("hidden"); draf = null; muatProfil(); }
    catch (e) { g(e.message); }
  };
  ed.classList.remove("hidden"); ed.scrollIntoView({ behavior: "smooth", block: "start" }); $("jl-nama").focus();
}
$("jl-baru").onclick = () => bukaEditorJalur(null, "baru");
function statusMassal(m, L, n) {
  const ada = L.filter((b) => punyaSub(b) && daftarSub(b).length >= n && levelOnDasar(m, b));
  if (!ada.length) return "kosong";
  const on = ada.filter((b) => subOn(m, b, n)).length;
  return on === ada.length ? "on" : on ? "sebagian" : "off";
}
function barisLevel(m, b, nomor, tahapNyala) {
  const centang = !(m.level || []).includes(b.id), on = tahapNyala && centang;
  const subs = punyaSub(b) ? daftarSub(b) : [], nSub = subs.length && on ? subDipakaiM(m, b).length : 0;
  const buka = on && draf.bukaLevel.has(b.id), jenis = jenisLevel(b), sebagian = on && subs.length && nSub < subs.length;
  return `<div class="at-level${on ? (sebagian ? " sebagian" : "") : " mati"}">
    <div class="at-level-kepala"><label class="at-cek kecil"><input type="checkbox" data-level="${esc(b.id)}" aria-label="${esc(b.judul)}"${centang ? " checked" : ""}${tahapNyala ? "" : " disabled"}${sebagian ? ' data-sebagian="1"' : ""}><span></span></label>
      <span class="at-level-judul"><b>${nomor}. ${esc(b.judul)}</b><small><span class="jenis jenis-${jenis.kunci}">${jenis.nama}</span>${subs.length ? ` ${nSub}/${subs.length} sub level` : ""}</small></span>
      ${subs.length ? `<button class="at-level-buka" data-aksi="buka-level" data-l="${esc(b.id)}" aria-expanded="${buka}"${on ? "" : " disabled"}>Sub level <span class="at-panah" aria-hidden="true">▾</span></button>` : ""}</div>
    ${buka ? `<div class="at-subs">${subs.map(([nama, ikon], k) => { const n = k + 1, nyala = !(((m.sub || {})[b.id]) || []).includes(n);
      return `<label class="at-sub${nyala ? " on" : ""}"><input type="checkbox" data-sub="${esc(b.id)}" data-n="${n}"${nyala ? " checked" : ""}><span class="at-sub-no">${n}</span><span class="at-sub-nama">${ikon} ${esc(nama)}</span></label>`; }).join("")}</div>` : ""}
  </div>`;
}
function gambarPohon() {
  const m = draf.mati;
  $("ed-pohon").innerHTML = window.TAHAP.map((t) => {
    const L = window.BACAAN.filter((b) => b.tahap === t.no), on = tahapOn(m, t.no), buka = draf.buka.has(t.no);
    const nOn = on ? L.filter((b) => levelOn(m, b)).length : 0;
    const sebagian = on && (nOn < L.length || L.some((b) => levelOn(m, b) && punyaSub(b) && subDipakaiM(m, b).length < daftarSub(b).length));
    const maxSub = Math.max(0, ...L.filter(punyaSub).map((b) => daftarSub(b).length));
    return `<div class="at-tahap${on ? (sebagian ? " sebagian" : "") : " mati"}">
      <div class="at-tahap-kepala"><label class="at-cek"><input type="checkbox" data-tahap="${t.no}" aria-label="Tahap ${t.no}"${on ? " checked" : ""}${sebagian ? ' data-sebagian="1"' : ""}><span></span></label>
        <button class="at-tahap-judul" data-aksi="buka-tahap" data-t="${t.no}" aria-expanded="${buka}"><span class="tahap-no">${t.no}</span>
          <span class="at-tahap-teks"><b>${esc(t.nama)}</b><small>${on ? `${nOn}/${L.length} level dipakai` : "Tidak dipakai"} · ${esc(t.setara)}</small></span><span class="at-panah" aria-hidden="true">▾</span></button></div>
      ${buka ? `<div class="at-tahap-isi">${maxSub && on ? `<div class="at-massal"><span>Sub level di semua level tahap ini</span><div>${Array.from({ length: maxSub }, (_, i) => i + 1).map((n) =>
        `<button class="at-massal-sub ${statusMassal(m, L, n)}" data-aksi="massal" data-t="${t.no}" data-n="${n}" aria-label="Sub level ${n} untuk semua level">${n}</button>`).join("")}</div></div>` : ""}
        ${L.map((b, i) => barisLevel(m, b, i + 1, on)).join("")}</div>` : ""}</div>`;
  }).join("");
  $("ed-pohon").querySelectorAll("input[data-sebagian]").forEach((x) => { x.indeterminate = true; });
  const r = ringkasTahapan(m);
  $("ed-ringkas").innerHTML = `Dipakai <b>${r.tahap}</b> tahap · <b>${r.level}</b> level · <b>${r.sub}</b> sub level`;
}
$("ke-umum").onclick = (e) => { e.preventDefault(); bukaTab("atur"); };

/* ---- Cara sistem memilih (bisa disembunyikan; diingat di perangkat ini) */
const LAPIS_KUNCI = "er_lapis_tutup";
function aturLapis(tutup) {
  $("lapis-kartu").classList.toggle("hidden", tutup); $("lapis-buka-p").classList.toggle("hidden", !tutup);
  try { localStorage.setItem(LAPIS_KUNCI, tutup ? "1" : ""); } catch (e) { /* abaikan */ }
}
$("lapis-tutup").onclick = () => aturLapis(true);
$("lapis-buka").onclick = () => aturLapis(false);
try { if (localStorage.getItem(LAPIS_KUNCI)) aturLapis(true); } catch (e) { /* abaikan */ }

/* ---- Aturan & tahapan yang berlaku bagi satu siswa (Cek aturan siswa dan Analisis siswa) */
function aturanBerlakuHtml(A) {
  const p = A.profil, jenisP = !p ? "umum" : p.asal === "siswa" ? "siswa" : "kelompok", label = { siswa: "siswa", kelompok: "rombel", umum: "umum" };
  const sel = (judul, isi, jenis, ket) => `<div class="ab-ring"><small>${judul}</small><b>${esc(isi)}</b><span class="ab-asal a-${jenis}">${esc(ket)}</span></div>`;
  const materi = p ? `"${p.nama}" · ${teksRingkas(ringkasTahapan(p.mati))}` : `Tahapan Level · ${teksRingkas(ringkasTahapan((A.umum || {}).mati || null))}`;
  return `<div class="ab-ringkas">
      ${sel("Materi yang dipakai", materi, jenisP, label[jenisP])}
      ${sel("Tahapan siswa", p && p.asal === "siswa" ? p.nama : "Tidak ada", p && p.asal === "siswa" ? "siswa" : "umum", p && p.asal === "siswa" ? "siswa" : "—")}
      ${sel("Tahapan rombel", p && p.asal === "kelas" ? p.nama : "Tidak ada", p && p.asal === "kelas" ? "kelompok" : "umum", p && p.asal === "kelas" ? "rombel" : "—")}
    </div>
    <div class="ab-grup" style="grid-template-columns:repeat(3,minmax(0,1fr))">${ATUR_KHUSUS.map((g) => `<div><div class="ab-judul">${g.g}</div>${g.f.map((x) => {
      const khusus = p && p.setelan && p.setelan[x.k] != null, v = khusus ? p.setelan[x.k] : ((A.umum || {})[x.k] != null ? A.umum[x.k] : BAWAAN[x.k]), j = khusus ? jenisP : "umum";
      return `<div class="ab-isi ${khusus ? "khusus" : ""}"><span><small>${x.l}</small><b>${esc(nilaiAturTeks(x, v))}</b></span><span class="ab-asal a-${j}" title="${esc(khusus ? `tahapan "${p.nama}"` : "Pengaturan Umum")}">${label[j]}</span></div>`; }).join("")}</div>`).join("")}</div>`;
}
async function cekSiswa() {
  const q = $("ck-cari").value.trim(), m = q.match(/·\s*(\S+)\s*$/), nisn = m ? m[1] : q;
  const r = SEMUA.find((x) => x.nisn === nisn);
  if (!r) { $("ck-hasil").innerHTML = q && /^\d{6,}$/.test(q) ? '<p class="redup kecil">NISN tidak ditemukan di rombel Anda.</p>' : ""; return; }
  $("ck-hasil").innerHTML = '<p class="redup kecil">Memuat…</p>';
  try {
    const A = await rpc("er_aturan_siswa", { p_pin: PIN, p_nisn: r.nisn }), n = A.profil ? aturanProfil(A.profil).length : 0;
    $("ck-hasil").innerHTML = `<div class="ck-kepala"><div><b>${esc(r.nama)}</b><span class="redup kecil">${esc(r.kelas)} · NISN ${esc(r.nisn)}</span></div>
      <span class="lencana ${A.profil ? "emas" : ""}">${A.profil ? `Tahapan "${esc(A.profil.nama)}"${n ? ` · ${n} aturan khusus` : ""}` : "Semua dari Pengaturan Umum"}</span></div>${aturanBerlakuHtml(A)}
      <p class="redup kecil" style="margin:var(--j3) 0 0">Label menunjukkan asal aturan: <span class="ab-asal a-siswa">siswa</span> <span class="ab-asal a-kelompok">rombel</span> <span class="ab-asal a-umum">umum</span>. Arahkan penunjuk ke label untuk melihat nama tahapannya.</p>`;
  } catch (e) { $("ck-hasil").innerHTML = `<p class="redup kecil">${esc(e.message)}</p>`; }
}
$("ck-cari").oninput = cekSiswa;

/* ----------------------------------------------------------- grafik (SVG, satu seri) */
const WARNA = "#2F5D7C";
function tipPasang(wadah) {
  let t = wadah.querySelector(".tip");
  if (!t) { t = document.createElement("div"); t.className = "tip"; wadah.appendChild(t); }
  return {
    show(html, x, y) { t.innerHTML = html; t.classList.add("show"); const w = wadah.clientWidth, tw = t.offsetWidth;
      t.style.left = Math.min(Math.max(0, x - tw / 2), w - tw) + "px"; t.style.top = (y - t.offsetHeight - 10) + "px"; },
    hide() { t.classList.remove("show"); },
  };
}
function batangMendatar(wadah, data, satuan, catatan) {
  const W = Math.max(300, wadah.clientWidth || 720), hp = W < 560, labelW = hp ? Math.round(W * 0.46) : Math.min(320, Math.round(W * 0.34)), fs = hp ? 11.5 : 13;
  const muat = Math.floor((labelW - 14) / (fs * 0.52)), pendek = (t) => t.length > muat ? t.slice(0, muat - 1).trimEnd() + "…" : t;
  const tinggi = 26, jarak = 8, maks = Math.max(1, ...data.map((d) => d.n));
  const H = data.length * (tinggi + jarak) + 4, lebar = W - labelW - 50;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Sebaran siswa per tahap"><defs><linearGradient id="gb" x1="0" x2="1"><stop offset="0" stop-color="#2F5D7C"/><stop offset="1" stop-color="#3E7FA6"/></linearGradient></defs>`;
  data.forEach((d, i) => {
    const y = i * (tinggi + jarak), w = d.n ? Math.max(4, lebar * d.n / maks) : 0;
    s += `<g class="bt" data-i="${i}"><rect x="0" y="${y - 2}" width="${W}" height="${tinggi + 4}" fill="transparent"/>
      <text x="${labelW - 10}" y="${y + tinggi / 2 + 5}" text-anchor="end" font-size="${fs}" fill="#5E5548"><title>${esc(d.label)}</title>${esc(pendek(d.label))}</text>
      <rect x="${labelW}" y="${y + 3}" width="${lebar}" height="${tinggi - 6}" rx="4" fill="#F6F2E8"/>
      ${w ? `<path d="M${labelW},${y + 3} h${w - 4} a4,4 0 0 1 4,4 v${tinggi - 14} a4,4 0 0 1 -4,4 h${-(w - 4)} z" fill="url(#gb)"/>` : ""}
      <text x="${labelW + w + 8}" y="${y + tinggi / 2 + 5}" font-size="${fs}" font-weight="700" fill="#221E17">${d.n || ""}</text></g>`;
  });
  s += "</svg>";
  wadah.innerHTML = s + (catatan ? `<p class="redup kecil">${esc(catatan)}</p>` : "");
  const tip = tipPasang(wadah);
  wadah.querySelectorAll(".bt").forEach((g) => {
    g.onmousemove = (e) => { const d = data[g.dataset.i], r = wadah.getBoundingClientRect(); tip.show(`${esc(d.label)}<br><b>${d.n} ${satuan}</b>`, e.clientX - r.left, e.clientY - r.top); };
    g.onmouseleave = () => tip.hide();
  });
}
/* Garis kumulatif sub level lulus per tanggal berlatih. */
function garisKemajuan(wadah, titik) {
  if (!titik.length) { wadah.innerHTML = '<p class="redup kecil">Belum ada latihan dalam 2 bulan terakhir.</p>'; return; }
  const W = Math.max(300, wadah.clientWidth || 720), H = 220, kiri = 36, kanan = 16, atas = 14, bawah = 30;
  const maks = Math.max(1, ...titik.map((t) => t.kum)), n = titik.length;
  const sx = (i) => kiri + (n === 1 ? (W - kiri - kanan) / 2 : i * (W - kiri - kanan) / (n - 1));
  const sy = (v) => atas + (H - atas - bawah) * (1 - v / maks);
  const langkah = Math.max(1, Math.ceil(maks / 4));
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Kemajuan sub level lulus">`;
  for (let v = 0; v <= maks; v += langkah)
    s += `<line x1="${kiri}" x2="${W - kanan}" y1="${sy(v)}" y2="${sy(v)}" stroke="#E7E0D1" stroke-width="1"/><text x="${kiri - 6}" y="${sy(v) + 4}" text-anchor="end" font-size="11" fill="#8B8173">${v}</text>`;
  const tiap = Math.max(1, Math.ceil(n / 6));
  titik.forEach((t, i) => { if (i % tiap === 0 || i === n - 1)
    s += `<text x="${sx(i)}" y="${H - 8}" text-anchor="middle" font-size="11" fill="#8B8173">${new Date(t.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}</text>`; });
  s += `<polyline fill="none" stroke="${WARNA}" stroke-width="2" stroke-linejoin="round" points="${titik.map((t, i) => sx(i) + "," + sy(t.kum)).join(" ")}"/>`;
  titik.forEach((t, i) => s += `<circle cx="${sx(i)}" cy="${sy(t.kum)}" r="4" fill="${WARNA}" stroke="#fff" stroke-width="2"/>`);
  s += `<line class="silang" x1="0" x2="0" y1="${atas}" y2="${H - bawah}" stroke="#8B8173" stroke-width="1" stroke-dasharray="3 3" visibility="hidden"/>`;
  s += `<rect class="hit" x="${kiri}" y="0" width="${W - kiri - kanan}" height="${H}" fill="transparent"/></svg>`;
  wadah.innerHTML = s;
  const svg = wadah.querySelector("svg"), sil = svg.querySelector(".silang"), tip = tipPasang(wadah);
  svg.querySelector(".hit").onmousemove = (e) => {
    const r = svg.getBoundingClientRect(), x = (e.clientX - r.left) * W / r.width;
    let i = n === 1 ? 0 : Math.round((x - kiri) / ((W - kiri - kanan) / (n - 1)));
    i = Math.max(0, Math.min(n - 1, i));
    const t = titik[i];
    sil.setAttribute("x1", sx(i)); sil.setAttribute("x2", sx(i)); sil.setAttribute("visibility", "visible");
    tip.show(`${tglTeks(t.tanggal)}<br><b>${t.kum} sub level lulus</b> (+${t.baru})<br>${t.n} kegiatan, rata ${t.rata}%`, sx(i) * r.width / W, sy(t.kum) * r.height / H);
  };
  svg.querySelector(".hit").onmouseleave = () => { tip.hide(); sil.setAttribute("visibility", "hidden"); };
}

/* ----------------------------------------------------------- analisis siswa */
$("pil-siswa").onchange = () => { if ($("pil-siswa").value) bukaSiswa($("pil-siswa").value); };
async function bukaSiswa(nisn) {
  bukaTab("siswa");
  if (![...$("pil-siswa").options].some((o) => o.value === nisn)) {
    const r = DAFTAR.find((x) => x.nisn === nisn) || REKAP.find((x) => x.nisn === nisn) || SEMUA.find((x) => x.nisn === nisn);
    $("pil-siswa").insertAdjacentHTML("beforeend", `<option value="${esc(nisn)}">${esc(r ? `${r.nama} (${r.kelas})` : nisn)}</option>`);
  }
  $("pil-siswa").value = nisn;
  $("d-isi").innerHTML = '<div class="kartu kosong-data">Memuat…</div>';
  try { DETAIL = await rpc("er_detail", { p_pin: PIN, p_nisn: nisn }); }
  catch (e) { $("d-isi").innerHTML = `<div class="kartu kosong-data">${esc(e.message)}</div>`; return; }
  gambarSiswa();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
const tglLokal = (iso) => new Date(iso).toLocaleDateString("sv-SE", { timeZone: "Asia/Jakarta" });
function olahHasil(H) {
  const urut = H.slice().sort((a, b) => new Date(a.waktu) - new Date(b.waktu)), sub = urut.filter((h) => h.jenis === "sub");
  // Sub level lulus pertama kali: percobaan sampai lulus
  const lulus = new Map(), coba = new Map();
  sub.forEach((h) => { const k = h.level + "|" + h.sub; coba.set(k, (coba.get(k) || 0) + 1);
    if (h.nilai >= TUNTAS && !lulus.has(k)) lulus.set(k, { ...h, percobaan: coba.get(k) }); });
  const macet = [...coba].filter(([k, n]) => n >= 3 && !lulus.has(k)).map(([k, n]) => { const [lv, s] = k.split("|"); return { b: levelDari(lv), n: +s, coba: n,
    terbaik: Math.max(...sub.filter((h) => h.level === lv && h.sub === +s).map((h) => h.nilai)) }; }).filter((x) => x.b);
  // Per jenis sub level (nama), per tahap
  const perJenis = new Map(), perTahap = new Map();
  sub.forEach((h) => { const b = levelDari(h.level); if (!b) return; const nm = namaSub(b, h.sub);
    const j = perJenis.get(nm) || { n: 0, t: 0 }; j.n++; j.t += h.nilai; perJenis.set(nm, j);
    const t = perTahap.get(b.tahap) || { n: 0, t: 0 }; t.n++; t.t += h.nilai; perTahap.set(b.tahap, t); });
  // Kumulatif per hari (60 hari)
  const batas = Date.now() - 60 * 864e5, hari = new Map();
  urut.forEach((h) => { const d = tglLokal(h.waktu); const x = hari.get(d) || { tanggal: d, n: 0, t: 0, baru: 0 }; x.n++; x.t += h.nilai || 0; hari.set(d, x); });
  lulus.forEach((h) => { const x = hari.get(tglLokal(h.waktu)); if (x) x.baru++; });
  const L = [...hari.values()].sort((a, b) => a.tanggal.localeCompare(b.tanggal));
  const dlm = L.filter((x) => new Date(x.tanggal).getTime() >= batas);
  let kum = lulus.size - dlm.reduce((a, x) => a + x.baru, 0);
  const titik = dlm.map((x) => ({ ...x, rata: Math.round(x.t / x.n), kum: (kum += x.baru) }));
  return { lulus, macet, perJenis, perTahap, titik, hari: L, sub };
}
function catatanOtomatis(D, k, O) {
  const c = [], H = D.hasil || [];
  if (!H.length && !k.mulai) return ["Siswa ini belum pernah berlatih English Reading."];
  if (k.selesai) c.push("Sudah menuntaskan semua level pada tahapan yang berlaku.");
  else if (k.posisi) c.push(`Sedang di <b>Tahap ${k.posisi.tahap} · Level ${nomorLevel(k.posisi)}: ${esc(k.posisi.judul)}</b>. Sudah ${k.levelTuntas} dari ${k.level} level dan ${k.subLulus} dari ${k.subTotal} sub level tuntas.`);
  if (O.macet.length) c.push(`Macet di ${O.macet.length} sub level (3 kali atau lebih dicoba tanpa mencapai 80%): ` + O.macet.slice(0, 3).map((x) => `${esc(labelLevel(x.b))} · ${esc(namaSub(x.b, x.n))} (${x.coba}×, terbaik ${x.terbaik}%)`).join("; ") + ".");
  const lemah = [...O.perJenis].filter(([, v]) => v.n >= 3).map(([nm, v]) => ({ nm, r: v.t / v.n, n: v.n })).sort((a, b) => a.r - b.r)[0];
  if (lemah && lemah.r < TUNTAS) c.push(`Kegiatan paling lemah: <b>${esc(lemah.nm)}</b>, rata-rata ${Math.round(lemah.r)}% dari ${lemah.n} kali.`);
  const baca = H.filter((h) => h.jenis === "baca").slice(0, 10);
  if (baca.length) c.push(`Akurasi membaca (Baca & Koreksi) rata-rata ${Math.round(baca.reduce((a, h) => a + h.nilai, 0) / baca.length)}% dari ${baca.length} bacaan terakhir.`);
  const akhir = O.hari.length ? O.hari[O.hari.length - 1].tanggal : null, aktif14 = O.hari.filter((x) => (Date.now() - new Date(x.tanggal)) / 864e5 <= 14).length;
  c.push(!akhir ? "Belum berlatih dalam 2 bulan terakhir." : `Berlatih ${aktif14} hari dalam 2 minggu terakhir; terakhir ${tglTeks(akhir)}.`);
  if (O.sub.length) c.push(`Seluruhnya ${O.sub.length} kali mengerjakan sub level, ${Math.round(100 * O.sub.filter((h) => h.nilai >= TUNTAS).length / O.sub.length)}% lulus.`);
  return c;
}
function gambarSiswa() {
  const D = DETAIL, p = D.atur && D.atur.profil, k = ringkasKemajuan(D.kemajuan, p ? p.mati : (D.atur && D.atur.umum && D.atur.umum.mati) || null);
  const O = olahHasil(D.hasil || []), H = D.hasil || [];
  const rataSub = O.sub.length ? Math.round(O.sub.reduce((a, h) => a + h.nilai, 0) / O.sub.length) : null;
  const baca = H.filter((h) => h.jenis === "baca").slice(0, 10), rataBaca = baca.length ? Math.round(baca.reduce((a, h) => a + h.nilai, 0) / baca.length) : null;
  const terkunci = (D.sesi || []).some((s) => s.terkunci && new Date(s.berakhir) > new Date());
  const maksJ = Math.max(1, ...[...O.perJenis.values()].map((v) => v.n));
  $("d-isi").innerHTML = `
    <div class="kartu">
      <div class="baris"><span class="avatar" aria-hidden="true">${esc(D.siswa.nama.split(/\s+/).slice(0, 2).map((x) => x[0]).join("").toUpperCase())}</span><div class="tumbuh"><h1 style="margin:0">${esc(D.siswa.nama)}</h1><div class="redup">Rombel ${esc(D.siswa.kelas)} · NISN ${esc(D.siswa.nisn)}</div></div>
      ${terkunci ? '<span class="lencana buruk">Terkunci</span>' : ""}${p ? `<span class="lencana emas" title="Tahapan khusus ${p.asal === "siswa" ? "siswa" : "rombel"}">Tahapan: ${esc(p.nama)}</span>` : ""}
      ${k.selesai ? '<span class="lencana baik">Tamat</span>' : k.mulai && k.posisi ? `<span class="lencana biru">Tahap ${k.posisi.tahap} · Level ${nomorLevel(k.posisi)}</span>` : '<span class="lencana">Belum mulai</span>'}</div>
      <div class="maju" style="margin-top:var(--j3)"><div class="batang"><i style="width:${100 * k.levelTuntas / Math.max(1, k.level)}%"></i></div><span>${k.levelTuntas} dari ${k.level} level</span></div>
    </div>
    <div class="ubin">${ubinHtml([
      [k.levelTuntas, "level tuntas", "level", "baik"], [`${k.subLulus}/${k.subTotal}`, "sub level lulus", "mulai"],
      [rataSub == null ? "–" : rataSub + "%", `rata-rata nilai (${O.sub.length} sub level)`, "akurasi", rataSub == null ? "" : rataSub >= 80 ? "baik" : rataSub >= 60 ? "emas" : "buruk"],
      [rataBaca == null ? "–" : rataBaca + "%", "akurasi membaca (10 terakhir)", "baca"],
      [O.hari.filter((x) => (Date.now() - new Date(x.tanggal)) / 864e5 <= 60).length, "hari berlatih (2 bulan terakhir)", "aktif"],
      [O.macet.length, "sub level macet", "ulang", O.macet.length ? "buruk" : ""],
    ])}</div>
    ${terkunci ? `<div class="kartu"><div class="baris"><span class="tumbuh"><b>Latihan siswa ini sedang dikunci</b> karena terlalu sering keluar halaman saat sesi kelas.</span><button id="an-kunci">Buka kunci</button></div></div>` : ""}
    ${D.atur ? `<details class="kartu atur-siswa" ${p ? "open" : ""}><summary><h2 style="display:inline">Aturan dan tahapan yang berlaku</h2>
      <span class="lencana ${p ? "emas" : ""}">${p ? `Tahapan "${esc(p.nama)}"` : "Pengaturan Umum"}</span></summary>${aturanBerlakuHtml(D.atur)}</details>` : ""}
    <div class="kartu"><h2>Catatan otomatis</h2><ul class="catatan">${catatanOtomatis(D, k, O).map((x) => `<li>${x}</li>`).join("")}</ul></div>
    <div class="kartu"><h2>Kemajuan sub level lulus</h2><p class="redup kecil" style="margin-top:0">Jumlah sub level yang sudah lulus (kumulatif) pada tiap tanggal berlatih, 2 bulan terakhir.</p><div class="grafik" id="g-maju"></div></div>
    <div class="dua">
      <div class="kartu"><h2>Kegiatan per jenis</h2>
        ${O.perJenis.size ? `<table class="tabel">${[...O.perJenis].map(([nm, v]) => ({ nm, v, r: Math.round(v.t / v.n) })).sort((a, b) => a.r - b.r).map((x) => `<tr><td>${esc(x.nm)}</td>
          <td style="width:40%"><div class="batang"><i style="width:${x.r}%;background:${x.r >= 80 ? "var(--hadir)" : x.r >= 60 ? "var(--emas)" : "var(--absen)"}"></i></div></td><td class="angka"><b>${x.r}%</b> <span class="redup kecil">${x.v.n}×</span></td></tr>`).join("")}</table>
          <p class="redup kecil">Rata-rata nilai tiap jenis sub level, dari yang paling lemah.</p>` : '<p class="redup">Belum ada sub level yang dikerjakan.</p>'}
      </div>
      <div class="kartu"><h2>Per tahap</h2>
        <div class="gulir"><table class="tabel" data-beku="1"><thead><tr><th>Tahap</th><th class="angka">Level</th><th class="angka">Sub level</th><th class="angka">Rata-rata</th></tr></thead><tbody>
          ${window.TAHAP.filter((t) => k.tahap[t.no]).map((t) => { const x = k.tahap[t.no], h = O.perTahap.get(t.no);
            return `<tr><td>Tahap ${t.no} · ${esc(t.nama)}</td><td class="angka">${x.tuntas}/${x.level}</td><td class="angka">${x.subLulus}/${x.sub}</td><td class="angka">${h ? Math.round(h.t / h.n) + "%" : "–"}</td></tr>`; }).join("")}</tbody></table></div>
      </div>
    </div>
    <div class="kartu"><h2>Hasil di bawah ${TUNTAS}% terakhir</h2>
      ${H.filter((h) => h.nilai < TUNTAS).length ? `<div class="gulir"><table class="tabel" data-beku="1"><thead><tr><th>Waktu</th><th>Level</th><th>Kegiatan</th><th class="angka">Nilai</th><th>Rincian</th></tr></thead><tbody>
        ${H.filter((h) => h.nilai < TUNTAS).slice(0, 25).map((h) => { const b = levelDari(h.level), ri = h.rincian || {};
          return `<tr><td class="kecil">${tglTeks(h.waktu, true)}</td><td class="kecil">${esc(b ? labelLevel(b) : h.level)}</td><td>${esc(kegiatanTeks(b, h))}</td>
          <td class="angka"><b style="color:${h.nilai >= 60 ? "var(--emas-teks)" : "var(--absen-tua)"}">${h.nilai}%</b></td>
          <td class="kecil redup">${ri.soal ? `${ri.benar}/${ri.soal} benar${ri.salah ? ` · ${ri.salah} salah` : ""}` : ri.dibaca ? `${ri.tepat}/${ri.dibaca} kata tepat` : ""}</td></tr>`; }).join("")}</tbody></table></div>` : '<p class="redup">Belum ada hasil di bawah batas tuntas.</p>'}
    </div>
    <div class="kartu"><h2>Riwayat sub level lulus</h2>
      ${O.lulus.size ? `<div class="gulir"><table class="tabel" data-beku="1"><thead><tr><th>Tanggal</th><th>Level</th><th>Sub level</th><th class="angka">Percobaan</th><th class="angka">Nilai</th></tr></thead><tbody>
        ${[...O.lulus.values()].reverse().slice(0, 60).map((h) => { const b = levelDari(h.level);
          return `<tr><td class="kecil">${tglTeks(h.waktu, true)}</td><td>${esc(b ? labelLevel(b) : h.level)}</td><td>${esc(namaSub(b, h.sub))}</td><td class="angka">${h.percobaan}</td><td class="angka">${h.nilai}%</td></tr>`; }).join("")}</tbody></table></div>`
        : '<p class="redup">Belum ada sub level yang lulus (dicatat sejak login siswa dipakai).</p>'}
    </div>
    <div class="kartu ubah"><h2>Tahapan khusus siswa ini</h2>
      <p class="redup kecil" style="margin-top:0">Untuk siswa yang perlu remedial atau pengayaan sendiri. Mengalahkan tahapan rombel; pilih <b>Ikut rombel</b> untuk kembali. Kemajuan siswa tidak berubah.</p>
      <div class="baris"><select id="an-profil" class="tumbuh"><option value="">Ikut rombel</option>${PROFIL.map((x) => `<option value="${esc(x.id)}" ${p && p.asal === "siswa" && p.id === x.id ? "selected" : ""}>${esc(x.nama)}</option>`).join("")}</select>
        <button id="an-pasang">Simpan</button></div></div>
    <div class="kartu ubah bahaya-kartu"><h2>Hapus data latihan</h2>
      <p class="redup kecil" style="margin-top:0">Menghapus kemajuan, riwayat nilai, dan sesi siswa ini, misalnya setelah uji coba. Data siswa tidak terhapus. Tidak bisa dibatalkan.</p>
      <button class="bahaya" id="hl-hapus">Hapus data latihan siswa ini</button></div>`;
  garisKemajuan($("g-maju"), O.titik);
  if ($("an-kunci")) $("an-kunci").onclick = async () => {
    try { await rpc("er_buka_kunci_guru", { p_pin: PIN, p_nisn: D.siswa.nisn }); toast("Kunci dibuka"); bukaSiswa(D.siswa.nisn); } catch (e) { toast(e.message); }
  };
  $("an-pasang").onclick = async () => {
    const v = $("an-profil").value, x = PROFIL.find((y) => y.id === v);
    if (!confirm(x ? `Pasang tahapan "${x.nama}" untuk ${D.siswa.nama}?` : `${D.siswa.nama} kembali ikut tahapan rombel?`)) return;
    try { await rpc("er_pasang_siswa", { p_pin: PIN, p_nisn: [D.siswa.nisn], p_profil: v || null }); toast("Tahapan siswa disimpan"); bukaSiswa(D.siswa.nisn); muatKelas(); muatProfil(true); }
    catch (e) { toast(e.message); }
  };
  $("hl-hapus").onclick = async () => {
    if (!confirm(`Hapus SEMUA data latihan ${D.siswa.nama}?\n\nKemajuan, riwayat nilai, dan sesi dihapus. Tindakan ini tidak bisa dibatalkan.`)) return;
    try { await rpc("er_hapus_latihan", { p_pin: PIN, p_nisn: D.siswa.nisn }); toast(`Data latihan ${D.siswa.nama} dihapus`); bukaSiswa(D.siswa.nisn); muatKelas(); }
    catch (e) { toast(e.message); }
  };
}
const kegiatanTeks = (b, h) => h.jenis === "sub" ? namaSub(b, h.sub) : h.jenis === "baca" ? "🎤 Baca & Koreksi" : h.jenis === "dengar" ? "🎧 Dengar sampai selesai" : "📝 Soal pemahaman";

/* ----------------------------------------------------------- Tahapan Level */
// Tahap/level/sub level yang ditutup admin disimpan di Pengaturan Umum.mati dan hanya berlaku untuk tahapan umum.
const salinMati = () => { const m = matiUmum() || {}; return { tahap: [...(m.tahap || [])], level: [...(m.level || [])], sub: JSON.parse(JSON.stringify(m.sub || {})) }; };
async function simpanMati(m, pesan) {
  try { G.umum = await rpc("er_set_umum", { p_pin: PIN, p_v: { mati: m } }); gambarTingkat(); toast(pesan); DAFTAR.forEach((r) => { r._r = null; }); REKAP.forEach((r) => { r._r = null; }); }
  catch (e) { toast(e.message); }
}
function gambarTingkat() {
  if (!G) return;
  const admin = PERAN === "admin", m = matiUmum();
  const terbuka = new Set([...$("t-tingkat").querySelectorAll("details[open][data-kode]")].map((d) => d.dataset.kode));
  $("t-tingkat").innerHTML = window.TAHAP.map((t) => {
    const L = window.BACAAN.filter((b) => b.tahap === t.no), tOn = tahapOn(m, t.no);
    const nSub = L.reduce((a, b) => a + (punyaSub(b) ? daftarSub(b).length : 0), 0), nTutup = L.filter((b) => !levelOn(m, b)).length;
    return `<div class="kartu modul-kartu modul-${t.no}"><div class="modul-kepala"><span class="md">T${t.no}</span>
        <div><h2>Tahap ${t.no} · ${esc(t.nama)}</h2><p>${esc(t.setara)} · ${L.length} level · ${nSub} sub level${!tOn ? " · <b>ditutup</b>" : nTutup ? ` · ${nTutup} level ditutup` : ""}</p></div></div>
      ${admin ? `<p class="ubah tk-alat" style="padding:var(--j3) var(--j5) 0"><button class="garis kecil" data-tahap-aktif="${t.no}">${tOn ? "Tutup tahap ini" : "Buka tahap ini"}</button> <span class="redup kecil">${esc(t.fokus)}</span></p>` : `<p class="redup kecil" style="padding:var(--j3) var(--j5) 0;margin:0">${esc(t.fokus)}</p>`}
      ${L.map((b, i) => {
        const lOn = levelOnDasar(m, b), subs = punyaSub(b) ? daftarSub(b) : [], tutupSub = subs.filter((_, k) => !subOn(m, b, k + 1)).length, jenis = jenisLevel(b);
        return `<details class="tk-baris" data-kode="${esc(b.id)}"${terbuka.has(b.id) ? " open" : ""}><summary><span class="tk-no">${i + 1}</span><span class="tk-nama"><b>${esc(b.judul)}<span class="jenis jenis-${jenis.kunci}">${jenis.nama}</span></b>
            <span>${subs.length ? `${subs.length} sub level${tutupSub && lOn ? ` · ${tutupSub} ditutup` : ""}` : "Baca & Koreksi dan soal pemahaman"}${b.kosakata ? ` · ${b.kosakata.length} kata` : b.teks ? ` · ${(b.teks.match(/\S+/g) || []).length} kata` : ""}</span></span>
            ${!tOn || !lOn ? '<span class="lencana buruk">ditutup</span>' : ""}<span class="tk-panah" aria-hidden="true"></span></summary><div class="tk-isi">
          <div class="lv-alat"><button class="garis kecil" data-contoh="${esc(b.id)}">Contoh</button><button class="kecil" data-coba="${esc(b.id)}" title="Kerjakan level ini seperti siswa">Coba</button>
            <span class="tumbuh"></span>${admin ? `<button class="garis kecil ubah" data-level-aktif="${esc(b.id)}" ${tOn ? "" : "disabled"}>${lOn ? "Tutup level ini" : "Buka level ini"}</button>` : ""}</div>
          <div class="contoh hidden" id="c-${esc(b.id)}"></div>
          ${subs.map(([nama, ikon], k) => { const n = k + 1, sOn = subOn(m, b, n);
            return `<div class="lv-baris${sOn ? "" : " tutup"}"><span class="no">Sub ${n}</span><span class="ik-sub" aria-hidden="true">${ikon}</span><span class="kt">${esc(nama)}</span>
              ${!sOn && lOn && tOn ? '<span class="lencana buruk" title="Dilewati siswa yang memakai tahapan umum; Tahapan Khusus tidak terpengaruh">ditutup</span>' : ""}
              ${admin ? `<button class="garis kecil" data-sub-aktif="${esc(b.id)}|${n}" ${lOn && tOn ? "" : "disabled"}>${sOn ? "Tutup" : "Buka"}</button>` : ""}</div>`; }).join("")}
        </div></details>`;
      }).join("")}</div>`;
  }).join("");
  const tog = (arr, v) => { const i = arr.indexOf(v); if (i >= 0) arr.splice(i, 1); else arr.push(v); return i < 0; };
  $("t-tingkat").querySelectorAll("[data-tahap-aktif]").forEach((b) => b.onclick = () => {
    const mm = salinMati(), no = +b.dataset.tahapAktif, tutup = tog(mm.tahap, no);
    if (tutup && !confirm(`Tutup Tahap ${no} untuk tahapan umum?\n\nSiswa yang memakai tahapan umum tidak lagi melihat level di tahap ini. Tahapan Khusus tidak terpengaruh. Kemajuan siswa tetap tersimpan.`)) return;
    simpanMati(mm, tutup ? `Tahap ${no} ditutup untuk tahapan umum` : `Tahap ${no} dibuka`);
  });
  $("t-tingkat").querySelectorAll("[data-level-aktif]").forEach((b) => b.onclick = () => {
    const mm = salinMati(), id = b.dataset.levelAktif, tutup = tog(mm.level, id);
    simpanMati(mm, tutup ? `Level "${levelDari(id).judul}" ditutup — dilewati siswa bertahapan umum` : `Level "${levelDari(id).judul}" dibuka`);
  });
  $("t-tingkat").querySelectorAll("[data-sub-aktif]").forEach((b) => b.onclick = () => {
    const mm = salinMati(), [id, n] = b.dataset.subAktif.split("|"), arr = mm.sub[id] || (mm.sub[id] = []), tutup = tog(arr, +n);
    if (!arr.length) delete mm.sub[id];
    const bb = levelDari(id);
    if (tutup && subDipakaiM(mm, bb).length === 0 && !confirm("Semua sub level di level ini akan tertutup, sehingga levelnya ikut tidak dipakai di tahapan umum. Lanjutkan?")) return;
    simpanMati(mm, `${namaSub(bb, +n)} ${tutup ? "ditutup" : "dibuka"} untuk tahapan umum`);
  });
  $("t-tingkat").querySelectorAll("[data-coba]").forEach((b) => b.onclick = () => {
    const w = window.open(`index.html#coba=${encodeURIComponent(b.dataset.coba)}`, "_blank");
    if (!w) toast("Peramban memblokir tab baru. Izinkan pop-up untuk halaman ini.");
  });
  $("t-tingkat").querySelectorAll("[data-contoh]").forEach((b) => {
    b.onclick = () => muatContoh(b);
    const box = $(`c-${b.dataset.contoh}`);
    box.onchange = (e) => {
      if (e.target.matches("[data-ct-jawab]")) box.classList.toggle("tanpa-jawab", !e.target.checked);
      if (e.target.matches("[data-ct-layar]")) e.target.checked ? bukaLayarContoh(box) : tutupLayarContoh();
    };
  });
}

/* Contoh isi level: kosakata (arti disembunyikan sampai "Tampilkan Jawaban"), pola kalimat (kalimat rumpang dari
   pola.js), atau bacaan beserta soalnya (soal.js). "Contoh lain" mengambil soal/kalimat acak yang lain. */
const acak = (a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const HURUF = "ABCDE";
function contohIsi(b) {
  const jwb = (isi) => `<span class="ct-jwb">${isi}</span>`;
  if (b.kosakata) return `<div class="ct-kata">${acak(b.kosakata).slice(0, 12).map(([kata, arti, cth, cthArti]) =>
    `<div class="ct-item"><b>${esc(kata)}</b>${jwb(`<span class="k">${esc(arti)}</span>`)}${cth ? `<i>${esc(cth)}</i>${jwb(`<span class="redup kecil">${esc(cthArti || "")}</span>`)}` : ""}</div>`).join("")}</div>`;
  if (b.pola) {
    const gen = window.POLA_GEN && window.POLA_GEN[b.id], soal = gen ? Array.from({ length: 10 }, () => gen()) : [];
    return `<div class="ct-teks"><b>${esc(b.pola)}</b>${b.catatan ? `\n${esc(b.catatan)}` : ""}</div>
      <div class="ct-label">Contoh kalimat</div><div class="ct-soal-daftar">${soal.map((s) => `<div class="ct-item"><span>${esc(s.pre)} <b>____</b> ${esc(s.post)}</span>
        <span class="ct-opsi">${acak([s.kunci, ...(s.salah || [])]).map((o) => `<span class="${o === s.kunci ? "k" : ""}">• ${esc(o)}</span>`).join("")}</span>
        <span class="ct-bahas">${esc(s.id || "")}${s.alasan ? " — " + esc(s.alasan) : ""}</span></div>`).join("")}</div>`;
  }
  const pg = [...(soalDari(b) || []), ...((window.SOAL_UJIAN || {})[b.id] || []), ...((window.SOAL_UJIAN_2 || {})[b.id] || [])].filter((s) => s && s.t && s.p);
  const bs = (window.SOAL_BS || {})[b.id] || [];
  return `<div class="ct-teks">${esc(b.teks || "")}</div>
    ${pg.length ? `<div class="ct-label">Soal pilihan ganda (${Math.min(6, pg.length)} dari ${pg.length})</div><div class="ct-soal-daftar">${acak(pg).slice(0, 6).map((s) => `<div class="ct-item"><b>${esc(s.t)}</b>
      <span class="ct-opsi">${s.p.map((o, i) => `<span class="${i === s.j ? "k" : ""}">${HURUF[i]}. ${esc(o)}</span>`).join("")}</span>${s.b ? `<span class="ct-bahas">${esc(s.b)}</span>` : ""}</div>`).join("")}</div>` : ""}
    ${bs.length ? `<div class="ct-label">Benar atau salah</div><div class="ct-soal-daftar">${acak(bs).slice(0, 4).map(([p, benar, alasan]) => `<div class="ct-item"><span>${esc(p)}</span>
      <span class="ct-opsi"><span class="${benar ? "k" : ""}">• Benar</span><span class="${benar ? "" : "k"}">• Salah</span></span>${alasan ? `<span class="ct-bahas">${esc(alasan)}</span>` : ""}</div>`).join("")}</div>` : ""}`;
}
function muatContoh(b) {
  const lv = levelDari(b.dataset.contoh), box = $(`c-${lv.id}`);
  const jawab = !!box.querySelector("[data-ct-jawab]:checked"), layar = !!box.querySelector("[data-ct-layar]:checked");
  box.innerHTML = `<div class="ct-alat"><label class="cek"><input type="checkbox" data-ct-jawab${jawab ? " checked" : ""}> Tampilkan Jawaban</label>
    <label class="cek"><input type="checkbox" data-ct-layar${layar ? " checked" : ""}> Mode Layar Penuh</label>
    <button class="garis kecil" data-ct-tutup title="Lipat contoh">Tutup contoh ▲</button></div><div class="contoh-isi">${contohIsi(lv)}</div>`;
  box.classList.toggle("tanpa-jawab", !jawab);
  box.classList.remove("hidden"); b.textContent = "Contoh lain";
  box.querySelector("[data-ct-tutup]").onclick = () => { if (CT.box === box) tutupLayarContoh(); box.classList.add("hidden"); box.innerHTML = ""; b.textContent = "Contoh"; };
  if (CT.box === box) isiLayarContoh();
}
const CT = { box: null };
function bukaLayarContoh(box) {
  const b = levelDari(box.id.slice(2));
  CT.box = box;
  $("ctl-judul").textContent = b ? b.judul : "Contoh";
  $("ctl-ket").textContent = b ? `Tahap ${b.tahap} · Level ${nomorLevel(b)} · ${jenisLevel(b).nama}` : "";
  $("ct-layar").classList.remove("hidden"); document.body.classList.add("ct-terkunci");
  isiLayarContoh();
  history.pushState({ ctLayar: true }, "");
  if ($("ct-layar").requestFullscreen) $("ct-layar").requestFullscreen().catch(() => {});
  $("ctl-tutup").focus();
}
function isiLayarContoh() {
  const jawab = !!CT.box.querySelector("[data-ct-jawab]:checked");
  $("ctl-jawab").checked = jawab;
  $("ctl-isi").className = "ctl-isi ct-baca" + (jawab ? "" : " tanpa-jawab");
  $("ctl-isi").innerHTML = CT.box.querySelector(".contoh-isi").innerHTML;
}
function tutupLayarContoh() {
  if (!CT.box) return;
  const box = CT.box; CT.box = null;
  $("ct-layar").classList.add("hidden"); document.body.classList.remove("ct-terkunci");
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  if (history.state && history.state.ctLayar) history.back();
  const c = box.querySelector("[data-ct-layar]"); if (c) { c.checked = false; box.scrollIntoView({ block: "center" }); c.focus(); }
}
$("ctl-tutup").onclick = $("ctl-kembali").onclick = tutupLayarContoh;
$("ctl-lain").onclick = () => CT.box && muatContoh(document.querySelector(`[data-contoh="${CSS.escape(CT.box.id.slice(2))}"]`));
$("ctl-jawab").onchange = (e) => {
  const c = CT.box && CT.box.querySelector("[data-ct-jawab]");
  if (c) { c.checked = e.target.checked; CT.box.classList.toggle("tanpa-jawab", !c.checked); }
  $("ctl-isi").classList.toggle("tanpa-jawab", !e.target.checked);
};
addEventListener("popstate", tutupLayarContoh);
document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement && CT.box) tutupLayarContoh(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && CT.box) tutupLayarContoh(); });

/* ----------------------------------------------------------- Pengaturan Umum (hanya admin yang mengubah) */
const IKON = {
  layar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
  perisai: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.1 7.5 9.5 4.3-1.4 7.5-4.9 7.5-9.5V6z"/><path d="m9 12 2 2 4-4"/></svg>',
  tangga: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4v-4h4v-4h4V8h4"/><path d="M16 4h4v4"/></svg>',
  sampah: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg>',
  jam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/></svg>',
};
const SEKSI = [
  { ikon: "layar", judul: "Halaman Latihan", ket: "Siapa yang boleh masuk dan apa yang dilihat siswa.", baris: [
    { k: "mandiri", jenis: "ya", l: "Latihan mandiri di luar sesi kelas", s: "Bila dimatikan, siswa hanya bisa masuk saat guru membuka sesi rombelnya (dengan kode akses).", on: "Boleh", off: "Hanya saat sesi" },
    { k: "tampilJawaban", jenis: "ya", l: "Tampilkan jawaban benar saat siswa salah", s: "Beserta penjelasannya. Bila dimatikan, siswa hanya diberi tahu jawabannya belum tepat.", on: "Ditampilkan", off: "Disembunyikan" },
    { k: "bilaSalah", jenis: "pilih", l: "Bila jawaban salah", s: "Berlaku untuk setiap nomor di sub level yang sedang dikerjakan.",
      pilih: [["akhir", "Diulang di akhir sesi", "Soal yang salah muncul lagi (dengan soal lain) setelah nomor terakhir"], ["ulang", "Diulang di nomor itu sampai benar", "Soal pengganti di nomor yang sama; nomor maju hanya bila benar"], ["lanjut", "Maju terus", "Setiap nomor dijawab sekali, tidak diulang"]] },
  ] },
  { ikon: "perisai", judul: "Pengawasan keluar halaman", ket: "Seperti Matematika Dasar dan Tryout: saat sesi kelas, setiap kali siswa meninggalkan halaman latihan, alarm berbunyi (dan HP bergetar), muncul peringatan, dan kejadiannya dicatat.", baris: [
    { k: "maks_keluar", jenis: "angka", satuan: "kali", maks: 20, l: "Batas keluar halaman", s: "Saat batas tercapai, latihan dikunci sampai dibuka guru. 0 = tanpa batas (tetap dicatat)." },
    { k: "toleransi_keluar", jenis: "angka", satuan: "detik", maks: 120, l: "Abaikan keluar yang lebih singkat dari", s: "Mis. notifikasi diketuk atau telepon ditolak: hanya dicatat, tidak dihitung." },
    { k: "kode_buka", jenis: "kode", l: "Kode buka kunci", s: "Diketik guru di perangkat siswa yang terkunci. Kosong = kode akses sesi atau PIN guru/admin." },
  ], catatan: "Hanya berlaku saat sesi kelas; latihan mandiri tidak diawasi. Kunci tetap berlaku walau siswa keluar lalu masuk lagi, sampai dibuka atau sesinya habis. Guru bisa membedakan batas ini per rombel lewat <b>Pengaturan &amp; Tahapan Khusus</b>, dan membuka kunci dari <b>Sesi Kegiatan</b>." },
  { ikon: "tangga", judul: "Aturan naik sub level", ket: "Kapan siswa tuntas satu sub level dan apa syarat sebelum mulai.", baris: [
    { k: "jumlahSoal", jenis: "angka", satuan: "soal", min: 5, maks: 50, l: "Jumlah soal per sub level", s: "Bawaan 10. Sub level lulus bila nilainya paling sedikit 80%." },
    { k: "batasSalah", jenis: "angka", satuan: "kali", maks: 50, l: "Batas salah per sub level", s: "Lebih dari batas ini, sub level diulang dari nomor 1 dengan soal lain. 0 = tanpa batas." },
    { k: "harusDengar", jenis: "ya", l: "Dengarkan teks dulu sebelum sub level 1", s: "Teks level dibacakan sampai selesai lebih dulu.", on: "Harus Dengar", off: "Tanpa Dengar" },
    { k: "harusBaca", jenis: "ya", l: "Baca teks dulu sebelum sub level 1", s: "Siswa membaca keras teks level (Baca & Koreksi) sampai akurasi minimal.", on: "Harus Baca", off: "Tanpa Baca" },
    { k: "syaratBaca", jenis: "angka", satuan: "%", min: 50, maks: 100, l: "Akurasi membaca minimal", s: "Dipakai bila Harus Baca." },
  ] },
  { ikon: "jam", judul: "Sesi latihan mandiri", ket: "Lama satu kali masuk di luar sesi kelas.", baris: [
    { k: "mandiri_jam", jenis: "angka", satuan: "jam", min: 1, maks: 12, l: "Lama satu sesi mandiri", s: "Setelah waktu habis siswa diminta masuk lagi dengan NISN; kemajuannya tetap tersimpan." },
  ], catatan: "Lama sesi kelas dipilih guru saat membuka sesi di <b>Sesi Kegiatan</b>." },
];
const SEMUA_ATUR = SEKSI.flatMap((s) => s.baris);
function ringkasAtur(a) {
  const c = (kls, l, v) => `<span class="chip ${kls}"><i></i>${l}: <b>${esc(v)}</b></span>`;
  $("atur-ringkas").innerHTML = [
    c(a.mandiri ? "on" : "off", "Latihan mandiri", a.mandiri ? "boleh" : "hanya saat sesi"),
    c(a.maks_keluar > 0 ? "on" : "", "Batas keluar", a.maks_keluar > 0 ? `${a.maks_keluar}×` : "tanpa batas"),
    c("info", "Soal per sub level", `${a.jumlahSoal} soal`),
    c("info", "Bila salah", ({ akhir: "diulang di akhir", ulang: "diulang sampai benar", lanjut: "maju terus" })[a.bilaSalah] || a.bilaSalah),
    c("info", "Sesi mandiri", `${a.mandiri_jam} jam`),
  ].join("");
}
function kendaliAtur(x, a, boleh) {
  const dis = boleh ? "" : "disabled";
  if (x.jenis === "ya") return `<label class="saklar"><span class="teks" data-teks="${x.k}">${a[x.k] ? x.on : x.off}</span>
    <input type="checkbox" role="switch" data-k="${x.k}" ${a[x.k] ? "checked" : ""} ${dis} aria-label="${esc(x.l)}"><span class="jalur"></span></label>`;
  if (x.jenis === "angka") return `<div class="grup"><input type="number" inputmode="numeric" min="${x.min || 0}" max="${x.maks}" step="1" data-k="${x.k}" value="${a[x.k]}" ${dis} aria-label="${esc(x.l)}"><span class="satuan">${x.satuan}</span></div>`;
  if (x.jenis === "kode") return `<div class="grup kode"><input type="text" maxlength="20" autocomplete="off" spellcheck="false" data-kode="${x.k}" value="${esc(a[x.k] || "")}" placeholder="Tidak dipakai" ${dis} aria-label="${esc(x.l)}"><button class="gelap kecil" data-simpan="${x.k}" ${dis}>Simpan</button></div>`;
  return `<div class="pilihan" role="radiogroup" aria-label="${esc(x.l)}">${x.pilih.map(([v, t, k]) =>
    `<label><input type="radio" name="r-${x.k}" value="${v}" data-k="${x.k}" ${a[x.k] === v ? "checked" : ""} ${dis}><span><b>${esc(t)}</b><span>${esc(k)}</span></span></label>`).join("")}</div>`;
}
async function muatAtur() {
  try { G.umum = (await rpc("er_guru_masuk", { p_pin: PIN })).umum; } catch (e) { /* pakai yang ada */ }
  gambarAtur();
}
function gambarAtur() {
  const a = Object.assign({}, BAWAAN, G.umum || {}), boleh = PERAN === "admin";
  $("atur-ket").innerHTML = boleh
    ? `Berlaku untuk <b>semua rombel</b>, kecuali yang diatur guru di <a href="#" id="ke-khusus">Pengaturan &amp; Tahapan Khusus</a> (untuk seluruh rombelnya atau siswa tertentu). Setiap perubahan langsung tersimpan.`
    : `Diatur admin untuk <b>semua rombel</b>; di sini Anda hanya dapat melihatnya. Untuk aturan atau tahapan rombel Anda, termasuk batas keluar halaman, gunakan <a href="#" id="ke-khusus">Pengaturan &amp; Tahapan Khusus</a>.`;
  $("ke-khusus").onclick = (e) => { e.preventDefault(); bukaTab("jalur"); };
  ringkasAtur(a);
  $("f-atur").innerHTML = SEKSI.map((sx) => `<section class="kartu seksi">
      <div class="seksi-kepala"><span class="seksi-ikon" aria-hidden="true">${IKON[sx.ikon]}</span><div><h2>${sx.judul}</h2><p>${sx.ket}</p></div></div>
      ${sx.baris.map((x) => `<div class="atur-baris ${x.jenis === "pilih" ? "susun" : ""}">
        <div class="l"><b>${x.l}</b><span>${x.s}</span></div>
        <div class="kendali"><span class="ok-simpan" data-ok="${x.k}">✓ Tersimpan</span>${kendaliAtur(x, a, boleh)}</div></div>`).join("")}
      ${sx.catatan ? `<p class="catatan-seksi"><span>${sx.catatan}</span></p>` : ""}
    </section>`).join("");
  const tandai = (k) => { const ok = $("f-atur").querySelector(`[data-ok="${k}"]`); if (!ok) return; ok.classList.add("show"); clearTimeout(ok._t); ok._t = setTimeout(() => ok.classList.remove("show"), 2200); };
  const simpan = async (k, v) => {
    const x = SEMUA_ATUR.find((y) => y.k === k);
    try {
      G.umum = await rpc("er_set_umum", { p_pin: PIN, p_v: { [k]: v } });
      const b = Object.assign({}, BAWAAN, G.umum);
      ringkasAtur(b);
      const t = $("f-atur").querySelector(`[data-teks="${k}"]`); if (t) t.textContent = b[k] ? x.on : x.off;
      if (x.jenis === "kode") $("f-atur").querySelector(`[data-kode="${k}"]`).value = b[k] || "";
      tandai(k);
      toast(x.jenis === "kode" ? (b[k] ? `${x.l}: ${b[k]}` : `${x.l} tidak dipakai`) : "Tersimpan: " + x.l);
    } catch (e) { toast(e.message); gambarAtur(); }
  };
  $("f-atur").querySelectorAll("[data-k]").forEach((el) => el.onchange = () => {
    const x = SEMUA_ATUR.find((y) => y.k === el.dataset.k);
    if (x.jenis === "angka") {
      const n = Number(el.value);
      if (el.value === "" || !Number.isInteger(n) || n < (x.min || 0) || n > x.maks) { toast(`${x.l}: isi ${x.min || 0}–${x.maks}`); el.value = a[x.k]; return; }
      return simpan(x.k, n);
    }
    simpan(x.k, x.jenis === "ya" ? el.checked : el.value);
  });
  $("f-atur").querySelectorAll("[data-simpan]").forEach((b) => {
    const inp = $("f-atur").querySelector(`[data-kode="${b.dataset.simpan}"]`);
    b.onclick = () => simpan(b.dataset.simpan, inp.value.trim().toUpperCase());
    inp.addEventListener("keydown", (e) => { if (e.key === "Enter") b.click(); });
  });
}

/* ----------------------------------------------------------- Perkembangan Siswa: Per Siswa / Per Rombel */
let SUB_TAB = "siswa";
document.querySelectorAll(".subtab [data-sub]").forEach((b) => b.onclick = () => bukaSub(b.dataset.sub));
function bukaSub(v) {
  SUB_TAB = v;
  document.querySelectorAll(".subtab [data-sub]").forEach((b) => { b.classList.toggle("on", b.dataset.sub === v); b.setAttribute("aria-selected", String(b.dataset.sub === v)); });
  $("pk-siswa").classList.toggle("hidden", v !== "siswa"); $("pk-kelompok").classList.toggle("hidden", v !== "kelompok");
  $("pil-urut").classList.toggle("hidden", v !== "siswa");
  if (v === "kelompok") { if (REKAP.length) gambarKelas(); muatPerKelompok(); }
}
const selPosisi = (r, L) => !r ? '<td class="posisi"><span class="redup">–</span></td>'
  : `<td class="posisi" title="${esc(L.map((x) => x.nama).join(", "))}"><span class="pos-nm">${esc(lengkapi(r).selesai ? "Tamat" : `Tahap ${lengkapi(r).posisi.tahap}`)}</span>`
    + `<span class="pos-lv">${lengkapi(r).selesai ? "" : `Level ${nomorLevel(lengkapi(r).posisi)} · `}${L.length} siswa</span></td>`;
async function muatPerKelompok() {
  $("t-perkelompok").innerHTML = '<tr><td class="kosong-data">Memuat…</td></tr>';
  let R;
  try { R = await rekapBanyak(null); } catch (e) { $("t-perkelompok").innerHTML = `<tr><td class="kosong-data">${esc(e.message)}</td></tr>`; return; }
  const m = new Map();
  R.forEach((r) => { if (!m.has(r.kelas)) m.set(r.kelas, []); m.get(r.kelas).push(r); });
  const baris = [...m].sort((x, y) => x[0].localeCompare(y[0], "id", { numeric: true })).map(([k, L]) => {
    const mulai = L.filter(pernahMulai), macet = L.filter((r) => r.macet).length, diam = mulai.filter((r) => !aktif7(r)).length, a7 = L.filter(aktif7).length;
    const rata = mulai.length ? mulai.reduce((t, r) => t + lengkapi(r).levelTuntas, 0) / mulai.length : 0;
    const nilai = L.filter((r) => r.rata != null), rn = nilai.length ? Math.round(nilai.reduce((t, r) => t + r.rata, 0) / nilai.length) : null;
    const urut = mulai.filter((r) => lengkapi(r).posisi || lengkapi(r).selesai).sort((a, b) => lengkapi(a).levelTuntas - lengkapi(b).levelTuntas), rendah = urut[0], tinggi = urut[urut.length - 1];
    const sama = (x) => urut.filter((r) => lengkapi(r).levelTuntas === lengkapi(x).levelTuntas);
    const s = G.rombel.find((x) => x.kelas === k), buka = s && s.sesi && sisaSesi(s) > 0;
    return `<tr class="klik" data-kel="${esc(k)}"><td><b>${esc(k)}</b></td><td class="angka">${L.length}</td><td class="angka">${mulai.length}</td><td class="angka">${a7}</td>
      <td class="angka">${rata.toLocaleString("id-ID", { maximumFractionDigits: 1 })}</td>${selPosisi(rendah, rendah ? sama(rendah) : [])}${selPosisi(tinggi, tinggi ? sama(tinggi) : [])}
      <td class="angka">${rn == null ? "–" : rn + "%"}</td>
      <td class="angka">${macet ? `<span class="lencana buruk">${macet}</span>` : '<span class="redup">0</span>'}</td>
      <td class="angka">${diam ? `<span class="lencana emas">${diam}</span>` : '<span class="redup">0</span>'}</td>
      <td>${buka ? `<span class="lencana baik"><span class="titik-on"></span>Dibuka · ${sisaSesi(s)} mnt</span>` : '<span class="redup kecil">Ditutup</span>'}</td></tr>`;
  });
  $("t-perkelompok").innerHTML = `<thead><tr><th>Rombel</th><th class="angka">Siswa</th><th class="angka">Sudah<br>mulai</th><th class="angka">Berlatih<br>7 hari</th>
    <th class="angka">Rata-rata<br>level tuntas</th><th title="Siswa yang paling belakang (sudah mulai)">Posisi<br>terendah</th><th title="Siswa yang paling depan">Posisi<br>tertinggi</th><th class="angka">Rata-rata<br>nilai</th><th class="angka">Macet</th><th class="angka">Tidak<br>aktif</th><th>Sesi<br>latihan</th></tr></thead>
    <tbody>${baris.join("") || '<tr><td colspan="11" class="kosong-data">Tidak ada siswa.</td></tr>'}</tbody>`;
  $("t-perkelompok").querySelectorAll("[data-kel]").forEach((tr) => tr.onclick = () => {
    if ([...$("pil-kelas").options].some((o) => o.value === tr.dataset.kel)) $("pil-kelas").value = tr.dataset.kel;
    muatKelas();
  });
}

/* ----------------------------------------------------------- Admin: guru & PIN, PIN admin, kosongkan data */
let ADM = null;
const ADM_PILIH = new Set();
/* Kartu PIN (PNG), sama dengan Matematika Dasar dan admin Asesmen Merdeka: kanvas 1080 px berisi kop, nama & ID guru, PIN besar,
   aplikasi tempat PIN berlaku beserta alamatnya, cara masuk, dan peringatan rahasia. Tidak ada yang dikirim ke server. */
const alamatTanpaSkema = (u) => String(u).replace(/^https?:\/\//, "");
function bungkusTeks(x, teks, lebar) { const baris = []; let b = "";
  String(teks).split(/\s+/).forEach((k) => { const c = b ? b + " " + k : k; if (x.measureText(c).width > lebar && b) { baris.push(b); b = k; } else b = c; });
  if (b) baris.push(b); return baris; }
const aplikasiKartu = (g) => [
  ["English Reading", "Rombel " + (g.kelas || []).join(", ") + ".", new URL("guru.html", location.href).href],
  ["Asesmen Merdeka (Tryout)", "Unggah soal, buka sesi ujian untuk kelas Anda, lihat hasil.", new URL("../Tryout_Guru/index.html?guru", location.href).href],
].concat((g.kelompok || []).length ? [["Matematika Dasar", "Kelompok " + g.kelompok.join(", ") + ".", new URL("../matematika_dasar/guru.html", location.href).href]] : []);
function kanvasKartu(g, denganLogo = true) {
  const W = 1080, H = 1350, c = document.createElement("canvas"); c.width = W; c.height = 1900; const x = c.getContext("2d");
  const SANS = 'system-ui,"Segoe UI",Roboto,Arial,sans-serif', SERIF = 'Georgia,"Times New Roman",serif', MONO = 'ui-monospace,Consolas,"Courier New",monospace';
  const kotak = (X, Y, w, t, r, warna) => { x.fillStyle = warna; x.beginPath(); if (x.roundRect) x.roundRect(X, Y, w, t, r); else x.rect(X, Y, w, t); x.fill(); };
  x.fillStyle = "#FAF7F0"; x.fillRect(0, 0, W, c.height);
  x.fillStyle = "#1D2A3A"; x.fillRect(0, 0, W, 250); x.fillStyle = "#C29433"; x.fillRect(0, 250, W, 10);
  const logo = document.querySelector("header img");
  if (denganLogo && logo && logo.naturalWidth) { const t = 160, l = t * logo.naturalWidth / logo.naturalHeight; x.drawImage(logo, 64, 45, l, t); }
  x.fillStyle = "#FFFFFF"; x.font = `700 48px ${SANS}`; x.fillText("SMA Plus Merdeka Soreang", 230, 118);
  x.fillStyle = "#C29433"; x.font = `600 36px ${SANS}`; x.fillText("PIN Pribadi Guru", 230, 174);
  let y = 345; x.fillStyle = "#8F6B1A"; x.font = `700 26px ${SANS}`; x.fillText("UNTUK", 80, y);
  x.fillStyle = "#1D2A3A"; x.font = `700 60px ${SERIF}`; y += 72; bungkusTeks(x, g.nama, 920).slice(0, 3).forEach((b) => { x.fillText(b, 80, y); y += 70; });
  x.fillStyle = "#5E5548"; x.font = `400 30px ${SANS}`; x.fillText("ID guru " + g.id, 80, y); y += 50;
  kotak(80, y, 920, 240, 30, "#1D2A3A"); x.fillStyle = "#C29433"; x.font = `700 28px ${SANS}`; x.fillText("PIN", 124, y + 62);
  x.fillStyle = "#FFFFFF"; x.font = `800 128px ${MONO}`; x.textAlign = "center"; x.fillText(g.pin.slice(0, 4) + " " + g.pin.slice(4), W / 2, y + 190); x.textAlign = "left"; y += 300;
  x.fillStyle = "#8F6B1A"; x.font = `700 28px ${SANS}`; x.fillText("BERLAKU UNTUK", 80, y); y += 52;
  aplikasiKartu(g).forEach(([judul, ket, url]) => { x.fillStyle = "#C29433"; x.beginPath(); x.arc(92, y - 11, 8, 0, 7); x.fill();
    x.fillStyle = "#221E17"; x.font = `700 34px ${SANS}`; x.fillText(judul, 116, y);
    x.fillStyle = "#5E5548"; x.font = `400 28px ${SANS}`; y += 42; bungkusTeks(x, ket, 880).forEach((b) => { x.fillText(b, 116, y); y += 38; });
    const al = alamatTanpaSkema(url); let fs = 26; do { x.font = `600 ${fs}px ${MONO}`; } while (x.measureText(al).width > 900 && --fs > 14);
    x.fillStyle = "#1D2A3A"; x.fillText(al, 116, y); y += 62; });
  x.fillStyle = "#221E17"; x.font = `400 28px ${SANS}`;
  bungkusTeks(x, "Cara masuk: buka alamat di atas → ketuk «Masuk guru» → ketik PIN ini.", 920).forEach((b) => { x.fillText(b, 80, y); y += 38; });
  const T = Math.max(H, y + 40 + 150); kotak(0, T - 150, W, 150, 0, "#F7E4DF"); x.fillStyle = "#A8432E"; x.fillRect(0, T - 150, W, 6);
  x.fillStyle = "#A8432E"; x.font = `700 30px ${SANS}`; x.fillText("RAHASIA — jangan dibagikan ke siswa atau grup.", 80, T - 92);
  x.fillStyle = "#5E5548"; x.font = `400 24px ${SANS}`;
  x.fillText("Lupa PIN? Hubungi admin/operator. Dibuat " + new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) + ".", 80, T - 48);
  const o = document.createElement("canvas"); o.width = W; o.height = T; o.getContext("2d").drawImage(c, 0, 0, W, T, 0, 0, W, T);
  return o;
}
const namaBerkasKartu = (g) => `PIN_${g.id}_${String(g.nama).split(",")[0].trim().replace(/[^\w]+/g, "_")}.png`;
const bisaBagiBerkas = () => { try { return !!(navigator.canShare && navigator.canShare({ files: [new File([""], "kartu.png", { type: "image/png" })] })); } catch (e) { return false; } };
const bisaSalinGambar = () => !!(window.ClipboardItem && navigator.clipboard && navigator.clipboard.write);
const batasWaktu = (janji, langkah) => Promise.race([janji, new Promise((_, gagal) => setTimeout(() => gagal(new Error(langkah + " tidak selesai dalam 15 detik")), 15000))]);
const keBlob = (kanvas) => batasWaktu(new Promise((ok, gagal) => { try { kanvas.toBlob((b) => b && b.size > 3000 ? ok(b) : gagal(new Error("peramban mengembalikan PNG kosong (pembuatan gambar mungkin diblokir perlindungan privasi/ekstensi)")), "image/png"); } catch (e) { gagal(e); } }), "pembuatan PNG");
async function gambarKartu(g) { try { return await keBlob(kanvasKartu(g, true)); } catch (e) { if (e && e.name === "SecurityError") return keBlob(kanvasKartu(g, false)); throw e; } }
const fileKartu = (g, blob) => new File([blob], namaBerkasKartu(g), { type: "image/png" });
const pngKartu = (g) => { const u = kanvasKartu(g).toDataURL("image/png"); if (u.length < 5000) throw new Error("peramban mengembalikan PNG kosong"); return u; };
const teksBagi = (g) => `PIN pribadi ${g.nama} untuk English Reading, Asesmen Merdeka${(g.kelompok || []).length ? ", dan Matematika Dasar" : ""}. Rahasia, mohon tidak diteruskan.`;
function kartuHtml(g) {
  const logo = (document.querySelector("header img") || {}).src || "";
  return `<div class="kh"><div class="kh-kop">${logo ? `<img src="${logo}" alt="">` : ""}<div><b>SMA Plus Merdeka Soreang</b><span>PIN Pribadi Guru</span></div></div>
    <div class="kh-isi"><span class="kh-lbl">UNTUK</span><div class="kh-nama">${esc(g.nama)}</div><div class="kh-id">ID guru ${esc(g.id)}</div>
    <div class="kh-pin"><small>PIN</small><b>${esc(g.pin.slice(0, 4) + " " + g.pin.slice(4))}</b></div><span class="kh-lbl">BERLAKU UNTUK</span>
    ${aplikasiKartu(g).map(([j, ket, url]) => `<div class="kh-app"><b>• ${esc(j)}</b>${esc(ket)}<br><code>${esc(alamatTanpaSkema(url))}</code></div>`).join("")}
    <div class="kh-app">Cara masuk: buka alamat di atas → «Masuk guru» → ketik PIN ini.</div></div>
    <div class="kh-rahasia">RAHASIA — jangan dibagikan ke siswa atau grup.</div></div>`;
}
function lihatKartu(g, pesan) {
  const isi = $("kl-isi"); isi.innerHTML = "";
  try { isi.appendChild(kanvasKartu(g)); } catch (e) { isi.innerHTML = kartuHtml(g); pesan = (pesan ? pesan + " " : "") + "(Kanvas gagal digambar: " + e.message + ")"; }
  $("kl-nama").textContent = g.nama; $("kl-pesan").textContent = pesan || ""; $("kl-pesan").classList.toggle("hidden", !pesan);
  $("kl-aksi").innerHTML = (bisaBagiBerkas() ? '<button class="kecil" data-kl="bagi">Bagikan</button>' : "") + (bisaSalinGambar() ? '<button class="garis kecil" data-kl="salin">Salin gambar</button>' : "") + '<button class="garis kecil" data-kl="unduh">Unduh PNG</button>';
  $("kl-aksi").querySelectorAll("[data-kl]").forEach((b) => b.onclick = async () => { const t = b.textContent; b.disabled = true; b.textContent = "Menyiapkan…";
    try { await aksiKartu(b.dataset.kl, g, true); } catch (e) { toast("Gagal: " + e.message); } finally { b.disabled = false; b.textContent = t; } });
  $("adm-lihat").classList.remove("hidden");
}
async function aksiKartu(a, g, dariJendela) {
  if (a === "lihat") { lihatKartu(g); return; }
  if (a === "salin") {
    try { window.focus(); await batasWaktu(navigator.clipboard.write([new ClipboardItem({ "image/png": gambarKartu(g) })]), "menyalin ke clipboard"); toast(`Kartu ${g.nama} disalin — tempel (Ctrl+V) di chat WhatsApp-nya`); }
    catch (e) { if (dariJendela) toast("Gagal menyalin: " + e.message + " — klik kanan gambar → Salin gambar"); else lihatKartu(g, "Gagal menyalin otomatis (" + e.message + "). Klik kanan gambar di bawah → Salin gambar."); }
    return;
  }
  let blob; try { blob = a === "unduh" ? pngKartu(g) : await gambarKartu(g); } catch (e) { lihatKartu(g, "Gagal membuat PNG: " + e.message + ". Klik kanan gambar di bawah → Simpan/Salin gambar, atau foto layar (Win+Shift+S)."); return; }
  if (a === "unduh") { const st = await simpanBerkas(blob, namaBerkasKartu(g)); if (st !== "batal") toast(pesanSimpan(st, namaBerkasKartu(g))); }
  else if (a === "bagi") { const file = fileKartu(g, blob);
    if (!bisaBagiBerkas()) { const st = await simpanBerkas(blob, file.name); if (st !== "batal") toast("Peramban ini belum bisa membagikan gambar langsung — " + pesanSimpan(st, file.name) + ". Lampirkan di WhatsApp."); return; }
    try { await navigator.share({ files: [file], title: "PIN pribadi " + g.nama, text: teksBagi(g) }); }
    catch (e) { if (e.name !== "AbortError") { if (dariJendela) toast("Gagal membagikan: " + e.message); else lihatKartu(g, "Gagal membagikan langsung (" + e.message + "). Coba dari sini, atau unduh."); } } }
}
async function bagiKartuBanyak(daftar) { if (!daftar.length) return;
  try { const files = []; for (const g of daftar) files.push(fileKartu(g, await gambarKartu(g))); await navigator.share({ files, title: "PIN pribadi guru" }); }
  catch (e) { if (e.name !== "AbortError") toast("Gagal membagikan: " + e.message + " — bagikan satu per satu dari barisnya"); } }
async function unduhKartuBanyak(daftar) { if (!daftar.length) return;
  try { const isi = []; for (const g of daftar) isi.push({ isi: pngKartu(g), nama: namaBerkasKartu(g) }); const st = await simpanBanyak(isi);
    if (st !== "batal") toast(st === "disimpan" ? `${daftar.length} kartu tersimpan di folder pilihan` : `${daftar.length} kartu diunduh${daftar.length > 1 ? ' — bila peramban bertanya "unduh beberapa berkas", pilih Izinkan' : ""}`); }
  catch (e) { toast("Gagal membuat PNG: " + e.message); } }
async function muatAdmin() {
  try { ADM = await rpc("er_admin_guru", { p_pin: PIN }); }
  catch (e) { $("f-admin").innerHTML = `<p class="pesan buruk">${esc(e.message)}</p>`; return; }
  gambarAdmin();
}
const statusPin = (g) => g.status === "acak" ? `<span class="lencana baik">PIN pribadi</span><b class="pin-teks">${esc(g.pin)}</b>`
  : `<span class="lencana emas">Sementara: ID guru</span><b class="pin-teks">${esc(g.id)}</b>`;
function gambarAdmin() {
  const L = ADM.guru, belum = L.filter((g) => g.aktif && g.status !== "acak").length;
  $("f-admin").innerHTML = `
  <section class="kartu seksi">
    <div class="seksi-kepala"><span class="seksi-ikon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 20a6.5 6.5 0 0 0-3-5.5"/></svg></span>
      <div><h2>Guru dan PIN masuk</h2><p>Guru yang mengajar Bahasa Inggris (termasuk Bahasa Inggris TL) beserta rombelnya, dari jadwal KBM Data Induk. PIN pribadi yang sama dipakai di Asesmen Merdeka dan Matematika Dasar. ${ADM.disinkron ? "Terakhir ditarik " + esc(tglTeks(ADM.disinkron, true)) + "." : "Belum pernah ditarik."}</p></div>
      <span class="seksi-aksi admin-aksi"><button class="garis kecil" id="adm-tarik">Tarik guru dari Data Induk</button>${belum ? `<button class="kecil" id="adm-acak-semua">Buat PIN untuk ${belum} guru</button>` : ""}</span></div>
    ${(ADM.rombel_tanpa_guru || []).length ? `<p class="sesi-peringatan"><b>${ADM.rombel_tanpa_guru.length} rombel</b> belum punya guru Bahasa Inggris tercatat (${esc(ADM.rombel_tanpa_guru.join(", "))}); rombel ini hanya bisa dikelola admin. Lengkapi jadwal KBM di Data Induk lalu tarik ulang.</p>` : ""}
    ${L.length ? `<div class="adm-pilih"><label><input type="checkbox" id="adm-pilih-semua"> pilih semua guru ber-PIN pribadi</label><span class="kecil redup" id="adm-n-pilih"></span>
        <span class="aksi"><button class="kecil" id="adm-bagi">Bagikan kartu terpilih</button><button class="garis kecil" id="adm-png">Unduh kartu PNG terpilih</button><button class="btn-unduh garis kecil" data-fmt="xlsx" id="adm-unduh" title="Daftar PIN guru yang dicentang; bila tidak ada yang dicentang, semua guru aktif">Unduh XLSX</button></span></div>
      <p class="kecil redup">Kartu PIN per guru ada di kolom <b>Kartu PIN</b>: <b>Bagikan</b> (HP) → WhatsApp → chat pribadi guru · <b>Unduh</b> PNG lalu lampirkan di WhatsApp Web · <b>Kartu</b> untuk melihat kartunya (di sana juga ada <i>Salin gambar</i>). Kirim ke chat pribadi, jangan ke grup.</p>
      <div class="gulir seksi-tabel"><table class="tabel adm-tabel" data-beku="2"><thead><tr><th></th><th>Guru</th><th>Rombel Bahasa Inggris</th><th>PIN masuk</th><th>Kartu PIN (PNG)</th><th></th></tr></thead><tbody>${L.map((g) => `<tr class="${g.aktif ? "" : "nonaktif"}">
        <td>${g.aktif && g.status === "acak" ? `<input type="checkbox" data-pilih="${esc(g.id)}" ${ADM_PILIH.has(g.id) ? "checked" : ""} aria-label="Pilih ${esc(g.nama)}">` : ""}</td>
        <td><b>${esc(g.nama)}</b><span class="kecil redup">${esc(g.id)}${g.aktif ? "" : " · tidak aktif di Data Induk"}</span></td>
        <td>${esc(g.kelas.join(", ") || "–")}</td>
        <td><span class="pin-sel">${statusPin(g)}</span>${g.n_ganti_90 ? `<span class="g-ganti">diganti/dihapus ${g.n_ganti_90}× dalam 90 hari</span>` : ""}</td>
        <td class="gk-aksi">${g.aktif && g.status === "acak" ? `<span class="gk-baris"><button class="garis kecil" data-k="lihat" data-id="${esc(g.id)}">Kartu</button>${bisaBagiBerkas() ? `<button class="kecil" data-k="bagi" data-id="${esc(g.id)}">Bagikan</button>` : ""}<button class="garis kecil" data-k="unduh" data-id="${esc(g.id)}">Unduh</button></span>` : `<span class="kecil redup">${g.aktif ? "buat PIN dulu" : ""}</span>`}</td>
        <td class="kanan">${g.status === "acak" ? `<button class="garis kecil" data-ubah="${esc(g.id)}" title="Buat PIN baru atau hapus PIN (dengan alasan dan konfirmasi)">Ubah PIN…</button>` : g.aktif ? `<button class="garis kecil" data-acak="${esc(g.id)}">Buat PIN</button>` : ""}</td></tr>`).join("")}</tbody></table></div>
      <div id="adm-lihat" class="hidden" role="dialog" aria-label="Kartu PIN"><div class="kl-in"><div class="aksi" style="justify-content:space-between"><b id="kl-nama"></b><button class="garis kecil" id="kl-tutup-kartu">Tutup</button></div>
        <p id="kl-pesan" class="kecil hidden" style="margin:0;color:var(--emas-teks)"></p><div id="kl-isi"></div><div class="aksi" id="kl-aksi"></div>
        <p class="kecil redup" style="margin:0">Bila tombol tidak bekerja: klik kanan gambar → <i>Salin gambar</i> / <i>Simpan gambar</i> (laptop), atau tekan lama gambar (HP).</p></div></div>
      <div id="adm-ubah" class="hidden" role="dialog" aria-label="Ubah PIN guru"><div class="kl-in">
        <div class="aksi" style="justify-content:space-between"><b id="up-judul">Ubah PIN</b><button class="garis kecil" id="up-tutup">Batal</button></div>
        <div id="up-riwayat" class="up-kotak"></div>
        <div class="up-saran" id="up-saran"><span><b>Guru lupa PIN?</b> Tidak perlu diganti — kirim ulang kartunya.</span><button class="kecil" id="up-kartu">Kirim ulang kartu</button></div>
        <fieldset class="up-langkah"><legend>1. Yang dilakukan</legend>
          <label><input type="radio" name="up-aksi" value="ulang"> <span><b>Buat PIN baru</b> — PIN lama langsung tidak berlaku (juga di Asesmen Merdeka dan Matdas)</span></label>
          <label><input type="radio" name="up-aksi" value="hapus"> <span><b>Hapus PIN</b> — guru masuk English Reading dengan ID gurunya dan tidak bisa masuk Asesmen Merdeka</span></label></fieldset>
        <label class="up-langkah"><span>2. Alasan</span><select id="up-alasan"><option value="">— pilih alasan —</option><option>PIN diketahui orang lain (siswa/rekan)</option><option>Guru meminta PIN baru</option><option>Guru tidak mengajar lagi / pindah</option><option value="lain">Lainnya…</option></select>
          <input type="text" id="up-alasan-lain" class="hidden" maxlength="200" placeholder="Tuliskan alasannya (paling sedikit 5 huruf)"></label>
        <label class="up-langkah"><span>3. Ketik ID guru <b id="up-id-contoh"></b> untuk memastikan gurunya benar</span><input type="text" id="up-id" autocomplete="off" spellcheck="false"></label>
        <label class="up-langkah"><span>4. Masukkan lagi PIN admin Anda</span><input type="password" id="up-pin" autocomplete="off"></label>
        <p id="up-pesan" class="kecil hidden" style="margin:0;color:var(--absen-tua);font-weight:600"></p>
        <p class="kecil redup" style="margin:0">Setiap penggantian dan penghapusan dicatat beserta alasannya dan siapa yang melakukannya.</p>
        <div class="aksi" style="justify-content:flex-end"><button class="bahaya" id="up-ok" disabled>Ubah PIN</button></div></div></div>`
      : '<p class="butir redup">Belum ada guru. Tekan <b>Tarik guru dari Data Induk</b>.</p>'}
    <p class="catatan-seksi"><span>PIN guru: PIN pribadi 8 angka, berlaku di English Reading, Asesmen Merdeka, dan Matematika Dasar. Sebelum dibuat, guru bisa masuk English Reading dengan ID gurunya di Data Induk (mis. G161), tetapi tidak bisa masuk Asesmen Merdeka. Halaman ini hanya terbuka untuk guru yang mengajar Bahasa Inggris. Bagikan PIN pribadi langsung ke guru yang bersangkutan.</span></p>
  </section>
  <section class="kartu seksi">
    <div class="seksi-kepala"><span class="seksi-ikon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg></span>
      <div><h2>PIN admin English Reading</h2><p>Dipakai untuk masuk sebagai admin. PIN admin Matematika Dasar dan PIN operator Asesmen Merdeka juga diterima.</p></div></div>
    <div class="atur-baris"><div class="l"><b>PIN admin baru</b><span>Paling sedikit 8 karakter. Setelah diganti, gunakan PIN baru untuk masuk berikutnya.</span></div>
      <div class="kendali"><div class="kosongkan dua"><input type="password" id="adm-pin-baru" autocomplete="new-password" placeholder="PIN baru" aria-label="PIN admin baru">
        <input type="password" id="adm-pin-ulang" autocomplete="new-password" placeholder="Ulangi PIN baru" aria-label="Ulangi PIN admin baru">
        <button class="gelap" id="adm-pin-simpan">Ganti PIN</button></div></div></div>
  </section>
  <section class="kartu seksi bahaya">
    <div class="seksi-kepala"><span class="seksi-ikon" aria-hidden="true">${IKON.sampah}</span><div><h2>Kosongkan data latihan</h2><p>Untuk memulai dari nol, misalnya setelah uji coba atau di awal tahun ajaran.</p></div></div>
    <div class="atur-baris susun"><div class="l"><b>Kosongkan semua data latihan</b><span>Menghapus kemajuan, riwayat nilai, dan sesi <strong>semua siswa</strong> English Reading. Data siswa, pengaturan, dan tahapan khusus tetap. Hanya dengan <strong>PIN kepala sekolah</strong>. Tidak bisa dibatalkan.</span></div>
      <div class="kendali"><div class="kosongkan"><input type="password" id="ks-pin" autocomplete="off" placeholder="PIN kepala sekolah" aria-label="PIN kepala sekolah">
        <input type="text" id="ks-ketik" autocomplete="off" spellcheck="false" placeholder="Ketik KOSONGKAN untuk memastikan" aria-label="Ketik KOSONGKAN">
        <button class="bahaya" id="ks-tombol" disabled>Kosongkan semua</button></div></div></div>
    <p class="catatan-seksi"><span>Hanya beberapa siswa? Hapus satu siswa di <b>Analisis Siswa</b>; beberapa siswa atau satu rombel di <b>Sesi Kegiatan</b> → centang → <b>Hapus data latihan</b>.</span></p>
  </section>`;

  if ($("adm-unduh")) $("adm-unduh").onclick = (ev) => jalankanUnduh(ev.currentTarget, async () => {
    const pilih = L.filter((g) => ADM_PILIH.has(g.id) && g.aktif && g.status === "acak"), A = pilih.length ? pilih : L.filter((g) => g.aktif);
    const nama = `Daftar_PIN_Guru_English_Reading_${tglBerkas()}.xlsx`;
    await unduhBukuXLSX({ namaBerkas: nama, judulBuku: "Daftar PIN Guru", lembar: [{
      nama: "PIN guru", judul: "Daftar PIN Guru English Reading", sub: "RAHASIA: jangan dibagikan ke siswa atau grup umum",
      kolom: [{ t: "No", w: 5, rata: "center" }, { t: "Nama guru", w: 36, tebal: true }, { t: "ID guru", w: 10, rata: "center" }, { t: "Rombel Bahasa Inggris", w: 30 },
        { t: "Jenis PIN", w: 18 }, { t: "PIN masuk", w: 14, rata: "center", tebal: true }],
      baris: A.map((g, i) => [i + 1, g.nama, g.id, g.kelas.join(", "), g.status === "acak" ? "PIN pribadi" : "Sementara (ID guru)", g.status === "acak" ? g.pin : g.id]),
      info: [["Isi", pilih.length ? `${A.length} guru terpilih` : `semua guru aktif (${A.length})`], ["Belum punya PIN pribadi", `${A.filter((g) => g.status !== "acak").length} guru`]],
      ubin: [["Guru", A.length], ["PIN pribadi", A.filter((g) => g.status === "acak").length], ["Sementara", A.filter((g) => g.status !== "acak").length]] }] });
    return nama;
  });
  $("adm-tarik").onclick = async (ev) => {
    const b = ev.currentTarget, t = b.textContent; b.disabled = true; b.textContent = "Menarik…";
    try {
      const I = await rpc("er_induk_ambil", { p_pin: PIN });
      if (!I.url || !I.key || !I.pin) throw new Error("Alamat Data Induk belum tersimpan. Simpan dulu lewat admin Aplikasi Tryout (Data siswa → Tarik dari data induk, centang simpan di server).");
      const r = await fetch(`${I.url}/rest/v1/rpc/guru_ekspor`, { method: "POST", headers: { "Content-Type": "application/json", apikey: I.key, Authorization: "Bearer " + I.key }, body: JSON.stringify({ p_pin: I.pin }) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.message || "Data Induk menolak permintaan");
      const nG = j.filter((g) => (g.er_kelas || []).length).length, nR = new Set(j.flatMap((g) => g.er_kelas || [])).size;
      if (!confirm(`Tertarik ${nG} guru Bahasa Inggris yang mengajar ${nR} rombel.\n\nSimpan? Daftar rombel tiap guru diganti sesuai jadwal KBM. PIN pribadi yang sudah dibuat tetap berlaku.`)) return;
      const h = await rpc("er_sinkron_guru", { p_pin: PIN, p_rows: j });
      toast(`${h.guru} guru Bahasa Inggris, ${h.rombel} rombel${h.guru_baru ? ` (${h.guru_baru} guru baru)` : ""}`);
      G.rombel = await rpc("er_buka_daftar", { p_pin: PIN }); isiPilihanRombel(); gambarSinkron(); muatAdmin();
    } catch (e) { toast(e.message); } finally { b.disabled = false; b.textContent = t; }
  };
  const acakPin = async (ids, pesan) => {
    if (!confirm(pesan)) return;
    try { const r = await rpc("er_admin_acak", { p_pin: PIN, p_guru: ids }); ADM_PILIH.clear(); r.guru.forEach((g) => ADM_PILIH.add(g.id));
      toast(`PIN pribadi dibuat untuk ${r.guru.length} guru dan sudah dicentang — bagikan kartunya`); muatAdmin(); }
    catch (e) { toast(e.message); }
  };
  if ($("adm-acak-semua")) $("adm-acak-semua").onclick = () => acakPin(null, `Buat PIN pribadi untuk ${belum} guru yang belum punya?\n\nSetelah itu ID guru tidak bisa dipakai lagi untuk masuk oleh guru-guru tersebut. PIN yang sama berlaku di Asesmen Merdeka dan Matematika Dasar. Bagikan PIN masing-masing kepada gurunya.`);
  $("f-admin").querySelectorAll("[data-acak]").forEach((b) => b.onclick = () => { const g = L.find((x) => x.id === b.dataset.acak); acakPin([g.id], `Buat PIN pribadi untuk ${g.nama}?`); });
  // Ubah PIN pribadi — berlapis seperti Matdas: tawarkan kirim ulang kartu, tampilkan riwayat, wajib alasan + ketik ID guru + PIN admin lagi.
  let upG = null;
  const tglUp = (s) => new Date(s).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  const hariLalu = (s) => Math.floor((Date.now() - new Date(s)) / 864e5);
  const riwayatPin = (g) => { const n = g.n_ganti_90 || 0, t = g.ganti_terakhir, baru = g.pin_sejak && hariLalu(g.pin_sejak) < 7;
    return `<div>PIN sekarang ${g.pin_sejak ? `dipakai sejak <b>${esc(tglUp(g.pin_sejak))}</b> (${hariLalu(g.pin_sejak)} hari)` : "dibuat sebelum riwayat PIN dicatat"}.</div>`
      + `<div>Diganti/dihapus <b>${n}×</b> dalam 90 hari terakhir${t ? ` · terakhir ${esc(tglUp(t.waktu))}, ${t.aksi === "hapus" ? "dihapus" : "diganti"} oleh ${esc(t.oleh || "?")}: “${esc(t.alasan || "")}”` : ""}.</div>`
      + (n >= 2 || baru ? `<div class="up-awas">${n >= 2 ? "PIN guru ini sudah sering diganti. " : ""}${baru ? "PIN ini baru dibuat; mungkin gurunya belum membaca kartunya. " : ""}Ganti hanya bila benar-benar perlu.</div>` : ""); };
  const aksiUp = () => ($("adm-ubah").querySelector("[name=up-aksi]:checked") || {}).value;
  const alasanUp = () => $("up-alasan").value === "lain" ? $("up-alasan-lain").value.trim() : $("up-alasan").value;
  const cekUbahPin = () => { const a = aksiUp(), b = $("up-ok"); $("up-alasan-lain").classList.toggle("hidden", $("up-alasan").value !== "lain");
    b.textContent = a === "hapus" ? "Hapus PIN" : a === "ulang" ? "Buat PIN baru" : "Ubah PIN";
    b.disabled = !(upG && a && alasanUp().length >= 5 && $("up-id").value.trim().toUpperCase() === upG.id.toUpperCase() && $("up-pin").value.trim()); };
  const tutupUbah = () => { $("adm-ubah").classList.add("hidden"); upG = null; };
  $("f-admin").querySelectorAll("[data-ubah]").forEach((b) => b.onclick = () => {
    const g = L.find((x) => x.id === b.dataset.ubah); if (!g) return; upG = g;
    $("up-judul").textContent = "Ubah PIN · " + g.nama; $("up-id-contoh").textContent = g.id; $("up-riwayat").innerHTML = riwayatPin(g);
    $("adm-ubah").querySelectorAll("[name=up-aksi]").forEach((r) => r.checked = false);
    $("up-alasan").value = ""; $("up-alasan-lain").value = ""; $("up-id").value = ""; $("up-pin").value = "";
    $("up-pesan").classList.add("hidden"); $("up-saran").classList.toggle("hidden", !g.aktif);
    cekUbahPin(); $("adm-ubah").classList.remove("hidden");
  });
  if ($("adm-ubah")) {
    $("up-tutup").onclick = tutupUbah;
    $("adm-ubah").querySelectorAll("input,select").forEach((i) => i.oninput = i.onchange = cekUbahPin);
    $("up-kartu").onclick = () => { const g = upG; tutupUbah(); if (g) lihatKartu(g, `PIN tidak diganti. Kirim ulang kartu ini ke chat pribadi ${g.nama}.`); };
    $("up-ok").onclick = async () => {
      const g = upG, a = aksiUp(), b = $("up-ok"), t = b.textContent; if (!g || !a) return;
      b.disabled = true; b.textContent = "Memproses…"; $("up-pesan").classList.add("hidden");
      try {
        const r = await rpc("er_admin_ubah_pin", { p_pin: PIN, p_guru: g.id, p_aksi: a, p_alasan: alasanUp(), p_id_ketik: $("up-id").value.trim(), p_pin_ulang: $("up-pin").value.trim() });
        tutupUbah();
        if (a === "ulang") { ADM_PILIH.clear(); ADM_PILIH.add(g.id); }
        await muatAdmin(); const baru = ADM && ADM.guru.find((x) => x.id === g.id);
        if (a === "ulang" && baru && baru.pin) lihatKartu(baru, `PIN baru ${r.pin} sudah berlaku; PIN lama tidak bisa dipakai lagi. Kirim kartu ini ke chat pribadi ${g.nama}.`);
        else toast(`PIN pribadi ${g.nama} dihapus — sementara masuk English Reading dengan ID ${g.id}`);
      } catch (e) { $("up-pesan").textContent = e.message; $("up-pesan").classList.remove("hidden"); b.textContent = t; cekUbahPin(); }
    };
  }
  const berPin = L.filter((g) => g.aktif && g.status === "acak");
  [...ADM_PILIH].forEach((id) => { if (!berPin.some((g) => g.id === id)) ADM_PILIH.delete(id); });
  const tombolPilihan = () => { if (!$("adm-n-pilih")) return; const nP = berPin.filter((g) => ADM_PILIH.has(g.id)).length;
    $("adm-n-pilih").textContent = nP ? `${nP} guru terpilih` : "belum ada yang dicentang";
    $("adm-bagi").disabled = !nP; $("adm-png").disabled = !nP; $("adm-bagi").classList.toggle("hidden", !bisaBagiBerkas());
    $("adm-unduh").textContent = nP ? `Unduh XLSX (${nP} guru)` : "Unduh XLSX (semua guru)";
    $("adm-pilih-semua").checked = berPin.length > 0 && berPin.every((g) => ADM_PILIH.has(g.id)); };
  $("f-admin").querySelectorAll("[data-pilih]").forEach((c) => c.onchange = () => { c.checked ? ADM_PILIH.add(c.dataset.pilih) : ADM_PILIH.delete(c.dataset.pilih); tombolPilihan(); });
  $("f-admin").querySelectorAll("[data-k][data-id]").forEach((b) => b.onclick = async () => { const g = L.find((x) => x.id === b.dataset.id); if (!g) return;
    const t = b.textContent; b.disabled = true; b.textContent = "Menyiapkan…";
    try { await aksiKartu(b.dataset.k, g); } catch (e) { toast("Gagal: " + e.message); } finally { b.disabled = false; b.textContent = t; } });
  if ($("adm-pilih-semua")) {
    $("adm-pilih-semua").onchange = (e) => { berPin.forEach((g) => e.target.checked ? ADM_PILIH.add(g.id) : ADM_PILIH.delete(g.id));
      $("f-admin").querySelectorAll("[data-pilih]").forEach((c) => c.checked = ADM_PILIH.has(c.dataset.pilih)); tombolPilihan(); };
    const dipilih = () => berPin.filter((g) => ADM_PILIH.has(g.id));
    $("adm-bagi").onclick = () => bagiKartuBanyak(dipilih());
    $("adm-png").onclick = () => unduhKartuBanyak(dipilih());
    $("kl-tutup-kartu").onclick = () => $("adm-lihat").classList.add("hidden");
    $("adm-lihat").onclick = (e) => { if (e.target.id === "adm-lihat") e.target.classList.add("hidden"); };
    tombolPilihan();
  }
  $("adm-pin-simpan").onclick = async () => {
    const p1 = $("adm-pin-baru").value.trim(), p2 = $("adm-pin-ulang").value.trim();
    if (p1.length < 8) return toast("PIN admin paling sedikit 8 karakter.");
    if (p1 !== p2) return toast("Kedua isian PIN baru belum sama.");
    try { await rpc("er_admin_ganti_pin", { p_pin: PIN, p_baru: p1 }); PIN = p1; ssSet(KUNCI_PIN, p1); $("adm-pin-baru").value = $("adm-pin-ulang").value = ""; toast("PIN admin English Reading diganti"); }
    catch (e) { toast(e.message); }
  };
  const siapKosong = () => { $("ks-tombol").disabled = !($("ks-pin").value.trim() && $("ks-ketik").value.trim().toUpperCase() === "KOSONGKAN"); };
  $("ks-pin").oninput = siapKosong; $("ks-ketik").oninput = siapKosong;
  $("ks-tombol").onclick = async () => {
    if (!confirm("Kosongkan SEMUA data latihan English Reading untuk seluruh siswa? Tindakan ini tidak bisa dibatalkan.")) return;
    $("ks-tombol").disabled = true;
    try {
      const r = await rpc("er_kosongkan_semua", { p_pin_kepsek: $("ks-pin").value.trim() });
      toast(`Data latihan dikosongkan: ${r.siswa} siswa, ${r.hasil} hasil`);
      $("ks-pin").value = ""; $("ks-ketik").value = ""; muatKelas(); if (DAFTAR.length) muatDaftar(true);
    } catch (e) { toast(e.message); siapKosong(); }
  };
}

/* Grafik digambar selebar wadahnya; gambar ulang bila lebar layar berubah (HP diputar). */
let ukurLalu = innerWidth, ukurT = null;
window.addEventListener("resize", () => { clearTimeout(ukurT); ukurT = setTimeout(() => {
  if (Math.abs(innerWidth - ukurLalu) < 40 || !G) return; ukurLalu = innerWidth;
  if (REKAP.length) gambarKelas();
  if (DETAIL && !$("p-siswa").classList.contains("hidden")) gambarSiswa();
}, 250); });

/* ----------------------------------------------------------- mulai */
(() => { const p = ssGet(KUNCI_PIN, null); if (p) masuk(p, true); })();

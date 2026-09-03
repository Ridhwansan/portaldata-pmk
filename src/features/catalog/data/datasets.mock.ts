import { DatasetItem, KedeputianInfo } from '../types/catalog.types';

export const KEDEPUTIAN_LIST: KedeputianInfo[] = [
  {
    id: 'all',
    name: 'Semua',
    fullName: 'Seluruh Kedeputian Kemenko PMK',
    iconName: 'LayoutGrid',
    count: 2450,
  },
  {
    id: 'deputi-1',
    name: 'Kedeputian 1',
    fullName: 'Peningkatan Kesejahteraan Sosial',
    iconName: 'ShieldCheck',
    count: 512,
  },
  {
    id: 'deputi-2',
    name: 'Kedeputian 2',
    fullName: 'Pemberdayaan Masyarakat dan Penanggulangan Kemiskinan',
    iconName: 'HeartHandshake',
    count: 480,
  },
  {
    id: 'deputi-3',
    name: 'Kedeputian 3',
    fullName: 'Peningkatan Kualitas Pendidikan dan Moderasi Beragama',
    iconName: 'GraduationCap',
    count: 624,
  },
  {
    id: 'deputi-4',
    name: 'Kedeputian 4',
    fullName: 'Peningkatan Kualitas Kesehatan dan Pembangunan Kependudukan',
    iconName: 'Activity',
    count: 538,
  },
  {
    id: 'deputi-5',
    name: 'Kedeputian 5',
    fullName: 'Revolusi Mental, Pemajuan Kebudayaan, dan Prestasi Olahraga',
    iconName: 'Flame',
    count: 296,
  },
];

export const TOPIC_LIST = [
  { id: 'all', name: 'Semua', icon: 'LayoutGrid' },
  { id: 'keluarga', name: 'Keluarga', icon: 'Users' },
  { id: 'perempuan-anak', name: 'Perempuan & Anak', icon: 'Smile' },
  { id: 'kesehatan', name: 'Kesehatan', icon: 'Heart' },
  { id: 'pendidikan', name: 'Pendidikan', icon: 'GraduationCap' },
  { id: 'pemuda-olahraga', name: 'Pemuda & Olahraga', icon: 'Trophy' },
  { id: 'kebencanaan', name: 'Kebencanaan', icon: 'AlertTriangle' },
];

export const MOCK_DATASETS: DatasetItem[] = [
  {
    id: 'ds-001',
    slug: 'data-tingkat-penerimaan-kerja-siswa-smk-2026',
    title: 'Data tingkat penerimaan kerja siswa SMK di indonesia tahun 2026',
    description: 'Dataset ini menyajikan angka seberapa banyak siswa yang sudah bekerja setelah lulus dari SMK di seluruh provinsi.',
    fullDescription: 'Dataset mencatat tingkat keterserapan lulusan Sekolah Menengah Kejuruan (SMK) di dunia usaha dan dunia industri (DUDI), wirausaha, serta melanjutkan pendidikan tinggi berbasis survei tracer study nasional.',
    category: 'Pendidikan',
    kedeputianId: 'deputi-3',
    kedeputianName: 'Kedeputian 3 (Pendidikan)',
    publisher: 'Kementerian Pendidikan Dasar dan Menengah',
    publisherCode: 'Kemendikdasmen',
    publishDate: '2026-11-05',
    updateDate: '2026-11-05',
    updateFrequency: 'Tahunan',
    license: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
    formats: ['CSV', 'XLS'],
    downloadCount: 18450,
    viewCount: 42100,
    rating: 4.9,
    tags: ['SMK', 'Vokasi', 'Pekerjaan', 'Kemendikdasmen', 'Pendidikan'],
    coverageArea: 'Nasional (38 Provinsi)',
    timePeriod: '2026',
    columns: [
      { name: 'kode_provinsi', type: 'string', description: 'Kode unik BPS provinsi', sample: '32' },
      { name: 'nama_provinsi', type: 'string', description: 'Nama provinsi', sample: 'Jawa Barat' },
      { name: 'total_lulusan', type: 'integer', description: 'Jumlah alumni lulus tahun 2026', sample: 184500 },
      { name: 'terserap_dudi', type: 'integer', description: 'Bekerja di industri / perusahaan', sample: 138200 },
      { name: 'wirausaha', type: 'integer', description: 'Membuka usaha mandiri', sample: 22100 },
      { name: 'persentase_keterserapan', type: 'float', description: 'Tingkat serapan (%)', sample: 86.88 }
    ],
    previewRows: [
      { kode_provinsi: '31', nama_provinsi: 'DKI Jakarta', total_lulusan: 68400, terserap_dudi: 58200, wirausaha: 4800, persentase_keterserapan: 92.1 },
      { kode_provinsi: '32', nama_provinsi: 'Jawa Barat', total_lulusan: 184500, terserap_dudi: 138200, wirausaha: 22100, persentase_keterserapan: 86.88 },
      { kode_provinsi: '33', nama_provinsi: 'Jawa Tengah', total_lulusan: 156000, terserap_dudi: 124800, wirausaha: 16900, persentase_keterserapan: 90.83 },
      { kode_provinsi: '35', nama_provinsi: 'Jawa Timur', total_lulusan: 172000, terserap_dudi: 141040, wirausaha: 18200, persentase_keterserapan: 92.58 }
    ],
    jsonData: {
      vocational_tracer_study: {
        reporting_year: 2026,
        national_serapan_rate: '88.4%',
        highest_industry: 'Teknologi Informasi & Manufaktur Otomotif'
      }
    }
  },
  {
    id: 'ds-002',
    slug: 'tingkat-partisipasi-sekolah-tk-sma',
    title: 'Tingkat partisipasi sekolah mulai dari TK hingga SMA',
    description: 'Dataset ini menyajikan angka seberapa banyak orang yang masuk TK sampai SMA di seluruh provinsi Indonesia.',
    fullDescription: 'Dataset Angka Partisipasi Murni (APM) dan Kasar (APK) seluruh jenjang pendidikan dari TK, SD, SMP, hingga SMA/SMK di Indonesia.',
    category: 'Pendidikan',
    kedeputianId: 'deputi-3',
    kedeputianName: 'Kedeputian 3 (Pendidikan)',
    publisher: 'Kementerian Pendidikan Dasar dan Menengah',
    publisherCode: 'Kemendikdasmen',
    publishDate: '2026-11-05',
    updateDate: '2026-11-05',
    updateFrequency: 'Tahunan',
    license: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
    formats: ['CSV', 'JSON'],
    downloadCount: 14230,
    viewCount: 38400,
    rating: 4.9,
    tags: ['Pendidikan', 'APK', 'APM', 'Kemendikdasmen', 'Sekolah'],
    coverageArea: 'Nasional (38 Provinsi)',
    timePeriod: '2022 - 2026',
    columns: [
      { name: 'kode_provinsi', type: 'string', description: 'Kode wilayah provinsi', sample: '31' },
      { name: 'nama_provinsi', type: 'string', description: 'Nama provinsi', sample: 'DKI Jakarta' },
      { name: 'jenjang', type: 'string', description: 'Tingkat sekolah', sample: 'SMA' },
      { name: 'apm_persen', type: 'float', description: 'Angka Partisipasi Murni (%)', sample: 92.6 },
      { name: 'apk_persen', type: 'float', description: 'Angka Partisipasi Kasar (%)', sample: 104.2 }
    ],
    previewRows: [
      { kode_provinsi: '31', nama_provinsi: 'DKI Jakarta', jenjang: 'SMA', apm_persen: 92.6, apk_persen: 104.2 },
      { kode_provinsi: '32', nama_provinsi: 'Jawa Barat', jenjang: 'SMA', apm_persen: 81.3, apk_persen: 89.7 },
      { kode_provinsi: '33', nama_provinsi: 'Jawa Tengah', jenjang: 'SMA', apm_persen: 85.9, apk_persen: 93.4 },
      { kode_provinsi: '34', nama_provinsi: 'DI Yogyakarta', jenjang: 'SMA', apm_persen: 94.8, apk_persen: 106.1 }
    ],
    jsonData: {
      summary: { national_apm_average: 86.8, national_apk_average: 94.5 }
    }
  },
  {
    id: 'ds-003',
    slug: 'data-masyarakat-terdampak-tuberculosis-berhasil-ditangani',
    title: 'Data masyarakat terdampak tuberculosis yang berhasil ditangani',
    description: 'Dataset ini menyediakan serangkaian data sampai ke tingkat kecamatan terkait masyarakat yang tertangani TBC.',
    fullDescription: 'Laporan komprehensif keberhasilan pengobatan Tuberculosis (Treatment Success Rate) di fasilitas pelayanan kesehatan seluruh Indonesia.',
    category: 'Kesehatan',
    kedeputianId: 'deputi-4',
    kedeputianName: 'Kedeputian 4 (Kesehatan)',
    publisher: 'Kementerian Kesehatan',
    publisherCode: 'Kemenkes',
    publishDate: '2025-11-05',
    updateDate: '2026-08-20',
    updateFrequency: 'Bulanan',
    license: 'Open Data Commons Public Domain (PDDL)',
    formats: ['CSV', 'XLS'],
    downloadCount: 19820,
    viewCount: 45100,
    rating: 4.8,
    tags: ['Kesehatan', 'TBC', 'Tuberkulosis', 'Kemenkes'],
    coverageArea: 'Seluruh Faskes Indonesia',
    timePeriod: '2025 - 2026',
    columns: [
      { name: 'kode_faskes', type: 'string', description: 'Kode faskes Kemenkes', sample: 'P31710101' },
      { name: 'nama_puskesmas', type: 'string', description: 'Nama Puskesmas', sample: 'Puskesmas Menteng' },
      { name: 'kasus_terdeteksi', type: 'integer', description: 'Kasus terkonfirmasi', sample: 142 },
      { name: 'kasus_sembuh', type: 'integer', description: 'Pasien sembuh', sample: 129 },
      { name: 'success_rate', type: 'float', description: 'Tingkat Keberhasilan (%)', sample: 93.47 }
    ],
    previewRows: [
      { kode_faskes: 'P31710101', nama_puskesmas: 'Puskesmas Menteng', kasus_terdeteksi: 142, kasus_sembuh: 129, success_rate: 93.47 },
      { kode_faskes: 'P31710201', nama_puskesmas: 'Puskesmas Tanah Abang', kasus_terdeteksi: 210, kasus_sembuh: 191, success_rate: 93.17 }
    ],
    jsonData: { success_rate: '91.8%', total_cured: 698200 }
  },
  {
    id: 'ds-004',
    slug: 'data-proyeksi-terjadinya-bencana-di-seluruh-indonesia-2026',
    title: 'Data proyeksi terjadinya bencana di seluruh indonesia tahun 2026',
    description: 'Data ini menyediakan dampak sampai ke kecamatan terhadap bencana yang sedang terjadi dan mitigasi risiko.',
    fullDescription: 'Dataset mitigasi bencana multi-hazard BNPB menampilkan probabilitas kejadian bencana banjir, longsor, gempa, dan cuaca ekstrem.',
    category: 'Kebencanaan',
    kedeputianId: 'deputi-1',
    kedeputianName: 'Kedeputian 1 (Kesejahteraan Sosial)',
    publisher: 'Badan Nasional Penanggulangan Bencana',
    publisherCode: 'BNPB',
    publishDate: '2026-11-05',
    updateDate: '2026-11-05',
    updateFrequency: 'Triwulanan',
    license: 'CC BY 4.0',
    formats: ['CSV', 'JSON'],
    downloadCount: 22400,
    viewCount: 52100,
    rating: 4.9,
    tags: ['Kebencanaan', 'BNPB', 'Banjir', 'Longsor', 'Mitigasi'],
    coverageArea: 'Seluruh Kecamatan Indonesia',
    timePeriod: '2026',
    columns: [
      { name: 'id_kecamatan', type: 'string', description: 'Kode Kecamatan', sample: '3204050' },
      { name: 'nama_kecamatan', type: 'string', description: 'Kecamatan', sample: 'Baleendah' },
      { name: 'bencana_dominan', type: 'string', description: 'Potensi Bencana', sample: 'Banjir Luapan' },
      { name: 'skor_indeks', type: 'float', description: 'Skor IRBI', sample: 188.4 }
    ],
    previewRows: [
      { id_kecamatan: '3204050', nama_kecamatan: 'Baleendah', bencana_dominan: 'Banjir Luapan', skor_indeks: 188.4 },
      { id_kecamatan: '3301010', nama_kecamatan: 'Majenang', bencana_dominan: 'Tanah Longsor', skor_indeks: 165.7 }
    ],
    jsonData: { high_risk_districts: 1420, active_sensors: 840 }
  },
  {
    id: 'ds-005',
    slug: 'data-terpadu-kesejahteraan-sosial-pkh-sembako',
    title: 'Data Terpadu Kesejahteraan Sosial Penerima Bansos PKH dan Sembako',
    description: 'Data sebaran keluarga penerima manfaat Program Keluarga Harapan (PKH) dan bantuan sembako pangan nasional.',
    fullDescription: 'Dataset agregat penerima bantuan sosial reguler pemerintah melalui Kemensos, mencakup desil kemiskinan dan realisasi penyaluran.',
    category: 'Keluarga',
    kedeputianId: 'deputi-2',
    kedeputianName: 'Kedeputian 2 (Penanggulangan Kemiskinan)',
    publisher: 'Kementerian Sosial',
    publisherCode: 'Kemensos',
    publishDate: '2026-10-18',
    updateDate: '2026-11-01',
    updateFrequency: 'Bulanan',
    license: 'CC BY 4.0',
    formats: ['CSV', 'JSON', 'XLS'],
    downloadCount: 31050,
    viewCount: 68900,
    rating: 4.9,
    tags: ['Bansos', 'PKH', 'Keluarga', 'Kemensos', 'Kemiskinan'],
    coverageArea: '514 Kabupaten/Kota',
    timePeriod: '2025 - 2026',
    columns: [
      { name: 'kode_wilayah', type: 'string', description: 'Kode Kabupaten', sample: '3301' },
      { name: 'nama_kabupaten', type: 'string', description: 'Kabupaten/Kota', sample: 'Cilacap' },
      { name: 'penerima_pkh', type: 'integer', description: 'KPM PKH', sample: 82400 },
      { name: 'realisasi', type: 'float', description: 'Realisasi (%)', sample: 98.6 }
    ],
    previewRows: [
      { kode_wilayah: '3301', nama_kabupaten: 'Cilacap', penerima_pkh: 82400, realisasi: 98.6 },
      { kode_wilayah: '3201', nama_kabupaten: 'Bogor', penerima_pkh: 142000, realisasi: 97.8 }
    ],
    jsonData: { total_pkh: 10000000, total_sembako: 18800000 }
  },
  {
    id: 'ds-006',
    slug: 'prevalensi-stunting-dan-kesehatan-ibu-anak',
    title: 'Prevalensi Penurunan Stunting Balita dan Kesehatan Ibu Anak',
    description: 'Data capaian target penurunan stunting balita, posyandu aktif, dan imunisasi dasar lengkap anak.',
    fullDescription: 'Dataset target prioritas nasional pencegahan stunting terintegrasi oleh Tim Percepatan Penurunan Stunting (TPPS) dan BKKBN.',
    category: 'Perempuan & Anak',
    kedeputianId: 'deputi-4',
    kedeputianName: 'Kedeputian 4 (Kesehatan & Kependudukan)',
    publisher: 'BKKBN & Kemenkes RI',
    publisherCode: 'BKKBN',
    publishDate: '2026-09-12',
    updateDate: '2026-10-30',
    updateFrequency: 'Semesteran',
    license: 'CC BY 4.0',
    formats: ['CSV', 'JSON'],
    downloadCount: 28900,
    viewCount: 61400,
    rating: 4.9,
    tags: ['Stunting', 'Anak', 'Ibu', 'BKKBN', 'Posyandu'],
    coverageArea: '514 Daerah',
    timePeriod: '2021 - 2026',
    columns: [
      { name: 'kode_daerah', type: 'string', description: 'Kode Wilayah', sample: '5301' },
      { name: 'nama_daerah', type: 'string', description: 'Nama Wilayah', sample: 'Kab. Kupang' },
      { name: 'prevalensi_stunting', type: 'float', description: 'Tingkat stunting (%)', sample: 13.5 }
    ],
    previewRows: [
      { kode_daerah: '5301', nama_daerah: 'Kab. Kupang', prevalensi_stunting: 13.5 },
      { kode_daerah: '3171', nama_daerah: 'Jakarta Pusat', prevalensi_stunting: 7.2 }
    ],
    jsonData: { current_rate: '13.4%', target_achieved: true }
  },
  {
    id: 'ds-007',
    slug: 'indeks-pembangunan-pemuda-dan-kebugaran-olahraga',
    title: 'Indeks Pembangunan Pemuda (IPP) dan Partisipasi Olahraga Masyarakat',
    description: 'Data capaian domain Indeks Pembangunan Pemuda dan angka partisipasi olahraga rekreasi/prestasi.',
    fullDescription: 'Statistik 5 domain evaluasi IPP (Pendidikan, Kesehatan, Ketenagakerjaan, Kepemimpinan, Gender) bersama angka kebugaran fisik masyarakat.',
    category: 'Pemuda & Olahraga',
    kedeputianId: 'deputi-5',
    kedeputianName: 'Kedeputian 5 (Pemuda & Olahraga)',
    publisher: 'Kementerian Pemuda dan Olahraga',
    publisherCode: 'Kemenpora',
    publishDate: '2026-08-14',
    updateDate: '2026-10-10',
    updateFrequency: 'Tahunan',
    license: 'CC BY 4.0',
    formats: ['CSV', 'JSON', 'XLS'],
    downloadCount: 8940,
    viewCount: 21200,
    rating: 4.7,
    tags: ['Pemuda', 'IPP', 'Olahraga', 'Kemenpora', 'Kebugaran'],
    coverageArea: '38 Provinsi',
    timePeriod: '2023 - 2026',
    columns: [
      { name: 'provinsi', type: 'string', description: 'Provinsi', sample: 'Jawa Timur' },
      { name: 'skor_ipp', type: 'float', description: 'Skor IPP', sample: 61.2 },
      { name: 'kebugaran_persen', type: 'float', description: 'Aktif Olahraga (%)', sample: 42.6 }
    ],
    previewRows: [
      { provinsi: 'DKI Jakarta', skor_ipp: 68.5, kebugaran_persen: 51.4 },
      { provinsi: 'DI Yogyakarta', skor_ipp: 70.1, kebugaran_persen: 48.9 }
    ],
    jsonData: { average_ipp: 59.8 }
  },
  {
    id: 'ds-008',
    slug: 'sebaran-cagar-budaya-dan-warisan-takbenda',
    title: 'Sebaran Objek Pemajuan Kebudayaan dan Cagar Budaya Terdaftar',
    description: 'Data inventarisasi warisan budaya takbenda (WBTb) dan cagar budaya nasional di seluruh kepulauan.',
    fullDescription: 'Dataset registrasi warisan budaya kebendaan dan takbenda binaan Gerakan Nasional Revolusi Mental dan Pemajuan Kebudayaan.',
    category: 'Pemuda & Olahraga',
    kedeputianId: 'deputi-5',
    kedeputianName: 'Kedeputian 5 (Kebudayaan)',
    publisher: 'Kementerian Kebudayaan',
    publisherCode: 'Kemenbud',
    publishDate: '2026-07-22',
    updateDate: '2026-09-15',
    updateFrequency: 'Tahunan',
    license: 'CC BY 4.0',
    formats: ['CSV', 'JSON'],
    downloadCount: 7420,
    viewCount: 18700,
    rating: 4.8,
    tags: ['Cagar Budaya', 'WBTb', 'Kebudayaan', 'Warisan Budaya'],
    coverageArea: 'Seluruh Indonesia',
    timePeriod: '2026',
    columns: [
      { name: 'nama_objek', type: 'string', description: 'Nama Warisan', sample: 'Candi Borobudur' },
      { name: 'provinsi', type: 'string', description: 'Provinsi', sample: 'Jawa Tengah' }
    ],
    previewRows: [
      { nama_objek: 'Candi Borobudur', provinsi: 'Jawa Tengah' },
      { nama_objek: 'Tari Saman', provinsi: 'Aceh' }
    ],
    jsonData: { total_unesco: 14 }
  },
  {
    id: 'ds-009',
    slug: 'fasilitas-pelayanan-kesehatan-tingkat-pertama-fktp',
    title: 'Ketersediaan dan Akreditasi Fasilitas Kesehatan Tingkat Pertama (FKTP)',
    description: 'Data akreditasi Puskesmas dan Klinik Pratama penopang jaminan kesehatan nasional BPJS.',
    fullDescription: 'Statistik faskes tingkat pertama mencakup rasio dokter per penduduk, ketersediaan obat esensial, dan status akreditasi Paripurna.',
    category: 'Kesehatan',
    kedeputianId: 'deputi-4',
    kedeputianName: 'Kedeputian 4 (Kesehatan)',
    publisher: 'Kementerian Kesehatan',
    publisherCode: 'Kemenkes',
    publishDate: '2026-06-30',
    updateDate: '2026-10-05',
    updateFrequency: 'Semesteran',
    license: 'CC BY 4.0',
    formats: ['CSV', 'XLS'],
    downloadCount: 16800,
    viewCount: 39100,
    rating: 4.8,
    tags: ['FKTP', 'Puskesmas', 'Kesehatan', 'Akreditasi'],
    coverageArea: 'Seluruh Indonesia',
    timePeriod: '2025 - 2026',
    columns: [
      { name: 'provinsi', type: 'string', description: 'Provinsi', sample: 'DKI Jakarta' },
      { name: 'total_puskesmas', type: 'integer', description: 'Total Puskesmas', sample: 340 }
    ],
    previewRows: [
      { provinsi: 'DKI Jakarta', total_puskesmas: 340 },
      { provinsi: 'Jawa Barat', total_puskesmas: 1085 }
    ],
    jsonData: { total_fktp: 10420 }
  },
  {
    id: 'ds-010',
    slug: 'data-layanan-perlindungan-perempuan-anak-sahabat',
    title: 'Data Layanan Pengaduan Perlindungan Perempuan dan Anak Sahabat SAPA 129',
    description: 'Statistik penanganan kasus kekerasan dan layanan pendampingan hukum dan psikologis bagi perempuan dan anak.',
    fullDescription: 'Dataset mencatat agregat pelaporan kasus melalui Sahabat Perempuan dan Anak (SAPA 129) Kementerian PPPA dan Kemenko PMK.',
    category: 'Perempuan & Anak',
    kedeputianId: 'deputi-2',
    kedeputianName: 'Kedeputian 2 (Kesejahteraan & Perlindungan)',
    publisher: 'Kementerian PPPA & Kemenko PMK',
    publisherCode: 'KemenPPPA',
    publishDate: '2026-06-15',
    updateDate: '2026-09-20',
    updateFrequency: 'Bulanan',
    license: 'CC BY 4.0',
    formats: ['CSV', 'JSON'],
    downloadCount: 12100,
    viewCount: 29400,
    rating: 4.9,
    tags: ['Perempuan', 'Anak', 'SAPA129', 'Perlindungan'],
    coverageArea: 'Nasional',
    timePeriod: '2025 - 2026',
    columns: [
      { name: 'bulan', type: 'string', description: 'Bulan', sample: 'Agustus 2026' },
      { name: 'kasus_tertangani', type: 'integer', description: 'Kasus Selesai', sample: 1240 }
    ],
    previewRows: [
      { bulan: 'Juli 2026', kasus_tertangani: 1180 },
      { bulan: 'Agustus 2026', kasus_tertangani: 1240 }
    ],
    jsonData: { total_served: 14200 }
  },
  {
    id: 'ds-011',
    slug: 'data-bantuan-modal-usaha-keluarga-pnpm',
    title: 'Data Pendampingan Ekonomi Keluarga Rentan dan Bantuan Modal Usaha',
    description: 'Data sebaran kelompok usaha bersama (KUBE) dan bantuan inkubasi wirausaha keluarga prasejahtera.',
    fullDescription: 'Dataset pembinaan usaha ekonomi produktif keluarga prasejahtera dan perempuan kepala keluarga (PEKKA).',
    category: 'Keluarga',
    kedeputianId: 'deputi-2',
    kedeputianName: 'Kedeputian 2 (Pemberdayaan Masyarakat)',
    publisher: 'Kementerian Sosial',
    publisherCode: 'Kemensos',
    publishDate: '2026-05-10',
    updateDate: '2026-08-11',
    updateFrequency: 'Semesteran',
    license: 'CC BY 4.0',
    formats: ['CSV', 'XLS'],
    downloadCount: 15400,
    viewCount: 33200,
    rating: 4.7,
    tags: ['Keluarga', 'KUBE', 'Wirausaha', 'Kemensos'],
    coverageArea: 'Nasional',
    timePeriod: '2025 - 2026',
    columns: [
      { name: 'provinsi', type: 'string', description: 'Provinsi', sample: 'Sumatera Utara' },
      { name: 'kelompok_kube', type: 'integer', description: 'Kelompok KUBE', sample: 4200 }
    ],
    previewRows: [
      { provinsi: 'Sumatera Utara', kelompok_kube: 4200 },
      { provinsi: 'Jawa Tengah', kelompok_kube: 7800 }
    ],
    jsonData: { total_kube: 64200 }
  },
  {
    id: 'ds-012',
    slug: 'pemetaan-wilayah-rawan-bencana-gempa-tsunami',
    title: 'Peta Sebaran Desa Tangguh Bencana (Destana) dan Jalur Evakuasi Tsunami',
    description: 'Data kesiapsiagaan desa pesisir, rambu evakuasi, dan shelter penampungan darurat bencana tsunami.',
    fullDescription: 'Dataset pembentukan Desa Tangguh Bencana (Destana) di pesisir selatan Jawa, barat Sumatera, dan timur Indonesia.',
    category: 'Kebencanaan',
    kedeputianId: 'deputi-1',
    kedeputianName: 'Kedeputian 1 (Kebencanaan)',
    publisher: 'Badan Nasional Penanggulangan Bencana',
    publisherCode: 'BNPB',
    publishDate: '2026-04-20',
    updateDate: '2026-07-15',
    updateFrequency: 'Tahunan',
    license: 'CC BY 4.0',
    formats: ['CSV', 'JSON', 'XLS'],
    downloadCount: 20100,
    viewCount: 46800,
    rating: 4.8,
    tags: ['Kebencanaan', 'Destana', 'Tsunami', 'BNPB', 'Evakuasi'],
    coverageArea: 'Zona Pesisir Indonesia',
    timePeriod: '2026',
    columns: [
      { name: 'desa', type: 'string', description: 'Nama Desa', sample: 'Pangandaran' },
      { name: 'status_destana', type: 'string', description: 'Status', sample: 'Destana Utama' }
    ],
    previewRows: [
      { desa: 'Pangandaran', status_destana: 'Destana Utama' },
      { desa: 'Pacitan', status_destana: 'Destana Madya' }
    ],
    jsonData: { total_destana: 1280 }
  }
];

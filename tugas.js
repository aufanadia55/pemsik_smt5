const mataKuliahList = {
	mataKuliah: [
		{ kode: "PSK001", nama: "Pemograman Sisi Klien", sks: 3 },
	],
};

const mahasiswaList = {
	mahasiswa: [
		{
			nim: "A11.2024.15838",
			nama: "Nadia Aufa",
			status: true,
			matkul: [
				{ matkulId: "PSK001", tugas: 90, uts: 95, uas: 95 },
			],
		},
		{
			nim: "A11.2024.15912",
			nama: "Faiha Amelia",
			status: false,
			matkul: [
				{ matkulId: "PSK001", tugas: 80, uts: 75, uas: 85 },
			],
		},
	],
};

const cariMataKuliah = (kode) =>
	mataKuliahList.mataKuliah.find((mataKuliah) => mataKuliah.kode === kode);

const show = () => {
	const tabelMahasiswa = [];

	mahasiswaList.mahasiswa.forEach((mhs) => {
		if (mhs.matkul.length === 0) {
			tabelMahasiswa.push({
				NIM: mhs.nim,
				Nama: mhs.nama,
				Status: mhs.status ? "Aktif" : "Tidak Aktif",
				MataKuliah: "Belum ada mata kuliah",
				SKS: "-",
				Tugas: "-",
				UTS: "-",
				UAS: "-",
			});
		}

		mhs.matkul.forEach((mk) => {
			const mataKuliah = cariMataKuliah(mk.matkulId);
			tabelMahasiswa.push({
				NIM: mhs.nim,
				Nama: mhs.nama,
				Status: mhs.status ? "Aktif" : "Tidak Aktif",
				MataKuliah: mataKuliah ? mataKuliah.nama : "Mata kuliah tidak ditemukan",
				SKS: mataKuliah ? mataKuliah.sks : "-",
				Tugas: mk.tugas,
				UTS: mk.uts,
				UAS: mk.uas,
			});
		});
	});

	console.table(tabelMahasiswa);
	return tabelMahasiswa;
};

const add = (mahasiswaBaru) => {
	if (mahasiswaList.mahasiswa.some((mhs) => mhs.nim === mahasiswaBaru.nim)) {
		return "NIM sudah terdaftar";
	}
	mahasiswaList.mahasiswa.push(mahasiswaBaru);
	return mahasiswaBaru;
};

const update = (nim, dataBaru) => {
	mahasiswaList.mahasiswa = mahasiswaList.mahasiswa.map((mhs) =>
		mhs.nim === nim ? { ...mhs, ...dataBaru } : mhs
	);
};

const deleteById = (nim) => {
	mahasiswaList.mahasiswa = mahasiswaList.mahasiswa.filter((mhs) => mhs.nim !== nim);
};

const totalNilai = (nim) => {
	const mhs = mahasiswaList.mahasiswa.find((mahasiswa) => mahasiswa.nim === nim);
	if (!mhs) return "Mahasiswa tidak ditemukan";

	return mhs.matkul.map((mk) => ({
		matkulId: mk.matkulId,
		total: mk.tugas + mk.uts + mk.uas,
	}));
};

const kategoriNilai = (nilai) => {
	if (nilai >= 85) return "A";
	if (nilai >= 75) return "B";
	if (nilai >= 65) return "C";
	if (nilai >= 50) return "D";
	return "E";
};

const IPS = (nim) => {
	const mhs = mahasiswaList.mahasiswa.find((mahasiswa) => mahasiswa.nim === nim);
	if (!mhs) return "Mahasiswa tidak ditemukan";
	if (mhs.matkul.length === 0) return "Belum ada mata kuliah";

	let totalSks = 0;
	let totalNilaiBerbobot = 0;

	mhs.matkul.forEach((mk) => {
		const mataKuliah = cariMataKuliah(mk.matkulId);
		if (!mataKuliah) return;

		const nilaiAkhir = mk.tugas * 0.3 + mk.uts * 0.3 + mk.uas * 0.4;
		totalSks += mataKuliah.sks;
		totalNilaiBerbobot += nilaiAkhir * mataKuliah.sks;
	});

	if (totalSks === 0) return "Data SKS mata kuliah tidak ditemukan";
	return (totalNilaiBerbobot / totalSks).toFixed(2);
};

const jumlahMahasiswa = () => mahasiswaList.mahasiswa.length;

const sortByNIM = () =>
	mahasiswaList.mahasiswa.sort((a, b) => a.nim.localeCompare(b.nim));

const sortByStatus = () =>
	mahasiswaList.mahasiswa.sort((a, b) => Number(b.status) - Number(a.status));

const jumlahAktifTidak = () => ({
	aktif: mahasiswaList.mahasiswa.filter((mhs) => mhs.status).length,
	tidakAktif: mahasiswaList.mahasiswa.filter((mhs) => !mhs.status).length,
});

const clear = () => {
	mahasiswaList.mahasiswa.length = 0;
};

const clearArray = () => {
	mahasiswaList.mahasiswa.length = 0;
};

console.log("\n========== 1. SHOW: SEMUA DATA MAHASISWA ==========");
show();

console.log("\n========== 2. ADD: TAMBAH MAHASISWA ==========");
const hasilTambah = add({
	nim: "A11.2024.16003",
	nama: "Agus Ikhsan",
	status: true,
	matkul: [{ matkulId: "PSK001", tugas: 88, uts: 85, uas: 90 }],
});
console.log(typeof hasilTambah === "string" ? hasilTambah : "Mahasiswa berhasil ditambahkan.");
show();

console.log("\n========== 3. UPDATE: UBAH STATUS MAHASISWA ==========");
update("A11.2024.15838", { status: false });
show();

console.log("\n========== 4. DELETEBYID: HAPUS MAHASISWA ==========");
deleteById("A11.2024.15912");
show();

console.log("\n========== 5. TOTALNILAI: TOTAL NILAI NADIA AUFA ==========");
const totalNilaiNadiaAufa = totalNilai("A11.2024.15838");
console.table(totalNilaiNadiaAufa.map((hasil) => {
	const mataKuliah = cariMataKuliah(hasil.matkulId);
	return {
		MataKuliah: mataKuliah ? mataKuliah.nama : hasil.matkulId,
		TotalNilai: hasil.total,
	};
}));
console.log("Total keseluruhan:", totalNilaiNadiaAufa.reduce((total, hasil) => total + hasil.total, 0));

console.log("\n========== 6. KATEGORINILAI: KATEGORI NILAI ==========");
console.table([
	{ Nilai: 88, Kategori: kategoriNilai(88) },
	{ Nilai: 72, Kategori: kategoriNilai(72) },
]);

console.log("\n========== 7. IPS: INDEKS PRESTASI SEMESTER ==========");
console.table([{
	NIM: "A11.2024.15838",
	Nama: "Nadia Aufa",
	IPS: IPS("A11.2024.15838"),
}]);

console.log("\n========== 8. CLEAR: HAPUS SEMUA DATA MAHASISWA ==========");
clear();
console.log("Jumlah setelah clear:", jumlahMahasiswa());

add({
	nim: "A11.2024.15838",
	nama: "Nadia Aufa",
	status: true,
	matkul: [{ matkulId: "PSK001", tugas: 90, uts: 95, uas: 95 }],
});
add({
	nim: "A11.2024.15912",
	nama: "Faiha Amelia",
	status: false,
	matkul: [{ matkulId: "PSK001", tugas: 80, uts: 75, uas: 85 }],
});
add({
	nim: "A11.2024.16003",
	nama: "Agus Ikhsan",
	status: true,
	matkul: [{ matkulId: "PSK001", tugas: 88, uts: 85, uas: 90 }],
});

console.log("\n========== 9. JUMLAHMAHASISWA: JUMLAH MAHASISWA ==========");
console.log("Jumlah mahasiswa:", jumlahMahasiswa());

console.log("\n========== 10. SORTBYNIM: URUT BERDASARKAN NIM ==========");
console.table(sortByNIM().map((mhs) => ({ NIM: mhs.nim, Nama: mhs.nama })));

console.log("\n========== 11. SORTBYSTATUS: URUT BERDASARKAN STATUS ==========");
console.table(sortByStatus().map((mhs) => ({
	NIM: mhs.nim,
	Nama: mhs.nama,
	Status: mhs.status ? "Aktif" : "Tidak Aktif",
})));

console.log("\n========== 12. JUMLAHAKTIFTIDAK: STATUS MAHASISWA ==========");
console.table([jumlahAktifTidak()]);

console.log("\n========== 13. CLEARARRAY: HAPUS SEMUA DATA DALAM ARRAY ==========");
clearArray();
console.log("Jumlah setelah clearArray:", jumlahMahasiswa());
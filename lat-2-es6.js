//array
const nilai = [100, 70, 80];

//destructuring array
const nilai2 = nilai[1];
console.log(`Nilai ke 2 dari array: ${nilai2}`);

//spread array
const nilai_new = [99];
const array_nilai_tambah = [...nilai_new, nilai]; //ini mau menambahkan tambah_dibelakang
const tambah_dibelakang = [nilai, ...nilai_new];

console.log(`tambah belakang ${tambah_dibelakang}`);
console.log(`kumpulan array nilai baru: ${array_nilai_tambah}`);

//object
const mhs = {
    namaku: "Nadia",
    umurku: 19,
    nilaiku: [100, 90, 90]
};

//destructuring object
const nama_kuuuuu = mhs.nama;
const { namaku, umurku, nilaiku } = mhs;

console.log(`Nama: ${namaku}, umur boss: ${umurku}`);

//spread object
const nimku = { nimku: "A11.2024.12345" };

const new_mhs = {
    ...nimku,
    ...mhs
};

//array of object
const list_mhs = [
    {
        nama : "Nadia",
        umur : 19
    },
    {
        nama : "Amel",
        umur : 20
    }
];

//destructuring array of object
const nama_mhs_kedua = list_mhs[1].nama;
console.log (nama_mhs_kedua);

//spread tambah object ke array of object
const mhs_anyar = {
    nama: "kak ros",
    umur: 25
};
const list_mhs_anyar = [...list_mhs, mhs_anyar];
console.log(list_mhs_anyar); 
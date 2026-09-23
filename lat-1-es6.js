console.log("Saya Cinta UDINUS");

const nama = "Nadia Aufa";
const nim = "A11.2024.15838";
const umur = 19;
const nilai = [90, 100, 95];

console.log("Nama; " + nama + ", umur: " + umur + ", NIM: " + nim);

//konsep es6 pertama
console.log(`Nama: ${nama}, umur: ${umur}, NIM: ${nim}`);

//konsep es6 kedua
const data_diri = (nama, nim) => `Nama: ${nama}, umur: ${umur}, NIM: ${nim}`;
console.log(data_diri(nama, nim));

//cara lama function
function penjumlahan1(bil1, bil2) {
    return bil1 + bil2;
}

//cara es6
const penjumlahan2 = (bil1, bil2) => bil1 + bil2;
console.log(penjumlahan1(20, 3));
console.log(penjumlahan2(20, 3));


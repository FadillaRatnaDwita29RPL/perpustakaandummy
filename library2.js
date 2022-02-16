const express = require("express"); //inisialisasi aplikasi menggunakan express js

const app = express()
const port = 8000 

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//data dummy
let nextId = 4;
const books = [
    {id : 1, title: "The First", year: 2019},
    {id : 2, title: "The Second", year: 2020},
    {id : 3, title: "The Third", year: 2021},
];

 // endpoint '/'
app.get('/', (req, res) => {      
    res.send({
        message: "Berhasil melakukan pemanggilan get",
        data: {
            description:
            "Endpoint ini untuk menampilkan data",
        }
    }) 
})

app.get('/books', (req, res) => {      
    res.send({
        message: "Berhasil menampilkan data buku",
        data: {books}
    }) 
})

app.post('/books', (req, res) => {      
    const book = {
        id: nextId++,
        title: req.body.title,
        year: req.body.year
    }
    books.push(book);
    res.send({
        message: "Berhasil melakukan penambahan data buku",
        data: { 
            newbook: book,
            totalBooks: books.length
         }
    }) 
})

app.get('/book/:id', (req, res) =>{
    const bookIndex = books.findIndex((item) => item.id == req.params.id);
    res.send({
        message: "Berhasil menampilkan perubahan data buku",
        data: { book: books[bookIndex]}
    })
})

//PUT
app.put("/books/:id", (req, res) => {
    const bookIndex = books.findIndex((item) => item.id == req.params.id);
    books[bookIndex].title = req.body.title;
    books[bookIndex].year = req.body.year;

    res.send({
        message: "Berhasil mengubah buku",
        data:{book: books[bookIndex]}
    })
})

//delete data
app.delete("/books/:id", (req, res) => {
    const id = req.params.id;
    const book = books.find(book => book.id == id);
    if (!book) {
        res.status(404).send({
            message: "Buku tidak ditemukan"
        })
    } else {
        const index = books.indexOf(book);
        books.splice(index, 1);
        res.send({
            message: "Berhasil menghapus buku",
            data: {
                book,
                totalBooks: books.length,
            }
        })
    }
})
// let namaSiswa = req.body.namaSiswa
//     let angkatan = req.body.angkatan
//     let jurusan = req.body.jurusan
//     let kelas = req.body.kelas
//     let absen = req.body.absen
//     let alamat = req.body.alamat
//     let umur = req.body.umur
//     let namaBuku = req.body.nama
//     let penerbit = req.body.penerbit
//     let jumHalaman = req.body.jumHalaman
//     let tahunTerbit = req.body.tahunTerbit
//     let jenis = req.body.jenis
//     let harga = req.body.harga

const peminjamann = [
    {idpinjam : 1, namaSiswa: "Fadilla Ratna Dwita", jurusan: "RPL", kelas: "XI RPL 6", angkatan: 29, absen: 23, jumlahPinjam: 1, idBuku: 1, title: "The First", year: 2019 },
];

let idNext = 2;
app.get('/peminjamann', (req, res) => {
    // const bookIndex = books.findIndex((item) => item.id == idBuku);
    // const buku = books[bookIndex]   
    res.send({
        message: "Berhasil menampilkan data peminjaman buku",
        data: {
            // idBuku : idBuku,
            peminjaman : peminjamann,
            // dataBuku: buku
        }
    }) 
})

app.post('/peminjamann', (req, res) => {   
    const bookIndex = books.findIndex((item) => item.id == req.body.idBuku);
    const peminjaman = {
        idpinjam: idNext++,
        namaSiswa: req.body.namaSiswa,
        jurusan: req.body.jurusan,
        kelas: req.body.kelas,
        angkatan: req.body.angkatan,
        absen: req.body.absen,
        jumlahPinjam: req.body.jumlahPinjam,
        idBuku: req.body.idBuku,
        title: books[bookIndex].title,
        year: books[bookIndex].year
    }
    peminjamann.push(peminjaman);
    res.send({
        message: "Berhasil melakukan penambahan data buku",
        data: { 
            peminjamanbaru: peminjaman,
            totalDataPeminjaman: peminjamann.length
         }
    }) 
})

//put
app.put("/peminjamann/:id", (req, res) => {
    const peminjaman = peminjamann.find(peminjaman => peminjaman.idpinjam == req.params.id);
    if(!peminjaman){
        res.status(404).send({
            message: "Data peminjaman tidak ditemukan"
        }) 
    }else{
        peminjaman.namaSiswa = req.body.namaSiswa;
        peminjaman.jurusan = req.body.jurusan;
        peminjaman.kelas= req.body.kelas;
        peminjaman.angkatan= req.body.angkatan;
        peminjaman.absen = req.body.absen;
        peminjaman.jumlahPinjam = req.body.jumlahPinjam;
        peminjaman.idBuku = req.body.idBuku;
        const bookIndex = books.findIndex((item) => item.id == req.body.idBuku);
        peminjaman.title = books[bookIndex].title;
        peminjaman.year = books[bookIndex].year;
    }
   
   
    res.send({
        message: "Berhasil mengubah data peminjaman buku",
        peminjaman
    })
})

app.get('/peminjamann/:id', (req, res) =>{
    const peminjaman = peminjamann.find(peminjaman => peminjaman.idpinjam == req.params.id);
    if(!peminjaman){
        res.status(404).send({
            message: "Data Peminjaman tidak ditemukan"
        })
    }else{
        res.send({
            message: "Berhasil menampilkan perubahan data buku",
            data: { dataPeminjaman: peminjaman}
        })
    }
    
})


//delete data
app.delete("/peminjamann/:id", (req, res) => {
    const peminjaman = peminjamann.find((item) => item.idpinjam == req.params.id);
    // const peminjamanIndex = peminjamann.findIndex((item) => item.idpinjam == req.params.id);
    if (!peminjaman) {
        res.status(404).send({
            message: "Data Peminjaman tidak ditemukan"
        })
    } else {
        const index = peminjamann.indexOf(peminjaman);
        books.splice(index, 1);
        res.send({
            message: "Berhasil menghapus data peminjaman",
            data: {
                peminjaman,
                totalDataPeminjaman: peminjamann.length,
            }
        })
    }
})

app.listen(port, () => {            
    console.log(`Server di port ${port}`)
})

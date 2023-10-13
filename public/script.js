// script.js

document.addEventListener("DOMContentLoaded", function () {
    // Ambil referensi elemen formulir
    const form = document.querySelector('form');

    // Tambahkan event listener untuk mengirimkan data formulir ke server saat formulir disubmit
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Mencegah pengiriman standar formulir

        const nama = form.querySelector('#nama').value;
        const harga = form.querySelector('#harga').value;
        const tanggal = form.querySelector('#tanggal').value;

        // Kirim data ke server
        const response = await fetch('/tambah', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nama, harga, tanggal }),
        });

        if (response.ok) {
            // Refresh halaman setelah data ditambahkan
            window.location.reload();
        } else {
            console.error('Terjadi kesalahan dalam menambahkan data.');
        }
    });
});

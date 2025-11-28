// Data Siswa (Anda bisa mengubah ini sesuai daftar siswa Anda)
const students = [
    { id: 1, name: "Ahmad Budi" },
    { id: 2, name: "Citra Dewi" },
    { id: 3, name: "Eko Fajar" },
    { id: 4, name: "Gita Harum" },
    { id: 5, name: "Indra Jaya" }
];

// Fungsi untuk memuat daftar siswa ke tabel
function loadStudents() {
    const list = document.getElementById('attendanceList');
    list.innerHTML = ''; // Kosongkan daftar yang sudah ada

    students.forEach((student, index) => {
        const row = list.insertRow();
        
        // Kolom No.
        row.insertCell().textContent = index + 1; 
        
        // Kolom Nama
        row.insertCell().textContent = student.name;

        // Kolom Kehadiran (Select/Dropdown)
        const statusCell = row.insertCell();
        const statusSelect = document.createElement('select');
        statusSelect.className = 'status-select';
        statusSelect.id = `status-${student.id}`;
        
        // Opsi Absensi
        ['Hadir', 'Izin', 'Sakit', 'Alpha'].forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status;
            statusSelect.appendChild(option);
        });
        statusCell.appendChild(statusSelect);
        
        // Kolom Keterangan (Text Input)
        const noteCell = row.insertCell();
        const noteInput = document.createElement('input');
        noteInput.type = 'text';
        noteInput.id = `note-${student.id}`;
        noteInput.placeholder = 'Keterangan (jika Izin/Sakit)';
        noteCell.appendChild(noteInput);
    });
}

// Fungsi untuk menyimpan data absensi
function saveAttendance() {
    const date = document.getElementById('dateInput').value;
    const activity = document.getElementById('activitySelect').value;
    const messageArea = document.getElementById('message');

    if (!date) {
        messageArea.textContent = "Mohon pilih tanggal absensi.";
        messageArea.style.display = 'block';
        return;
    }

    const attendanceData = [];
    
    students.forEach(student => {
        const status = document.getElementById(`status-${student.id}`).value;
        const note = document.getElementById(`note-${student.id}`).value;

        attendanceData.push({
            id: student.id,
            name: student.name,
            status: status,
            note: note
        });
    });

    // Data yang siap disimpan
    const finalRecord = {
        date: date,
        activity: activity,
        records: attendanceData
    };
    
    // --- SIMULASI PENYIMPANAN DATA ---
    // Di proyek nyata, Anda akan mengirimkan (fetch) `finalRecord` 
    // ini ke server atau database (Backend) menggunakan PHP, Node.js, atau lainnya.

    // Saat ini, kita simpan sementara di Local Storage browser
    const savedAbsences = JSON.parse(localStorage.getItem('extracurricularAbsence')) || [];
    savedAbsences.push(finalRecord);
    localStorage.setItem('extracurricularAbsence', JSON.stringify(savedAbsences));

    console.log("Data Absensi Tersimpan:", finalRecord);
    
    messageArea.textContent = `Absensi kegiatan ${activity} pada ${date} berhasil disimpan! (Total ${attendanceData.length} siswa).`;
    messageArea.style.display = 'block';

    // Opsional: Muat ulang data untuk menyegarkan tampilan
    // loadStudents(); 
}

// Set tanggal hari ini secara default
document.getElementById('dateInput').valueAsDate = new Date();

// Panggil fungsi saat halaman dimuat
loadStudents();

import { DetailDosen, Dosen } from "../models/DosenModel";
import User from "../models/UserModel";
import bcrypt from 'bcrypt';
import { validateEmail, validateNumberPhone } from "../config/hooks";
import { Op } from "sequelize";

export const add = async (req, res) => {
    // User - data login
    const email = req.body.email;
    const noHp = req.body.noHp;
    const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    // dosen
    const fullname = req.body.fullname;
    const nip = req.body.nip;
    const nidn = req.body.nidn;
    const jenisKelamin = req.body.jenisKelamin;
    const tempatLahir = req.body.tempatLahir;
    const tglLahir = req.body.tglLahir;
    const karpeg = req.body.karpeg;
    const cpsn = req.body.cpsn;
    const pns = req.body.pns;
    const jurusan = req.body.jurusan;
    const prodi = req.body.prodi;

    console.log(prodi)

    // detail dosen
    const pendidikanTerakhir = req.body.pendidikanTerakhir;
    const tahun = req.body.tahun;
    const gol = req.body.gol;
    const tmtGolongan = req.body.tmtGolongan;
    const tmtJabatan = req.body.tmtJabatan;
    const jabatan = req.body.jabatan;
    const agama = req.body.agama;

    if(email === ''){
        res.status(500).json({ message: 'Email tidak boleh kosong', success: false })
    }else if(noHp === ''){
        res.status(500).json({ message: 'Nomor HP tidak boleh kosong', success: false })
    }else if(password === ''){
        res.status(500).json({ message: 'Password tidak boleh kosong', success: false })
    }else if(fullname === ''){
        res.status(500).json({ message: 'Nama Lengkap tidak boleh kosong', success: false })
    }else if(nip === ''){
        res.status(500).json({ message: 'NIP tidak boleh kosong', success: false })
    }else if(nidn === ''){
        res.status(500).json({ message: 'NIDN tidak boleh kosong', success: false })
    }else if(jenisKelamin === ''){
        res.status(500).json({ message: 'Jenis Kelamin tidak boleh kosong', success: false })
    }else if(tempatLahir === ''){
        res.status(500).json({ message: 'Tempat Lahir tidak boleh kosong', success: false })
    }else if(tglLahir === ''){
        res.status(500).json({ message: 'Tanggal Lahir tidak boleh kosong', success: false })
    }else if(karpeg === ''){
        res.status(500).json({ message: 'Karpeg tidak boleh kosong', success: false })
    }else if(cpsn === ''){
        res.status(500).json({ message: 'CPNS tidak boleh kosong', success: false })
    }else if(pns === ''){
        res.status(500).json({ message: 'PNS tidak boleh kosong', success: false })
    }else if(jurusan === ''){
        res.status(500).json({ message: 'Jurusan tidak boleh kosong', success: false })
    }else if(prodi === ''){
        res.status(500).json({ message: 'Prodi tidak boleh kosong', success: false })
    }else if(pendidikanTerakhir === ''){
        res.status(500).json({ message: 'Pendidikan Terakhir tidak boleh kosong', success: false })
    }else if(tahun === ''){
        res.status(500).json({ message: 'Tahun tidak boleh kosong', success: false })
    }else if(gol === ''){
        res.status(500).json({ message: 'Golongan Pangkat tidak boleh kosong', success: false })
    }else if(tmtGolongan === ''){
        res.status(500).json({ message: 'TMT Golongan tidak boleh kosong', success: false })
    }else if(tmtJabatan === ''){
        res.status(500).json({ message: 'TMT Jabatan tidak boleh kosong', success: false })
    }else if(jabatan === ''){
        res.status(500).json({ message: 'Jabatan tidak boleh kosong', success: false })
    }else if(agama === ''){
        res.status(500).json({ message: 'Agama tidak boleh kosong', success: false })
    }else{
        if(validateEmail(email)){ // jika email valid
            if(validateNumberPhone(noHp)){ // jika nomor telefon valid

                const user = await User.create({
                    fullname: fullname,
                    username: nip,
                    email: email,
                    noHp: noHp,
                    password: password,
                    role: 'dosen',
                    prodiAdmin: 'Not Prodi', // karena dosen
                })

                const dosen = await Dosen.create({
                    fullname: fullname,
                    nip: nip,
                    nidn: nidn,
                    userId: user.dataValues.id,
                    jenisKelamin: jenisKelamin,
                    tempatLahir: tempatLahir,
                    tglLahir: tglLahir,
                    karpeg: karpeg,
                    cpsn: cpsn,
                    pns: pns,
                    jurusan: jurusan,
                    prodi: prodi,
                })
    
                await DetailDosen.create({
                    dosenId: dosen.dataValues.id,
                    pendidikanTerakhir: pendidikanTerakhir,
                    tahun: tahun,
                    gol: gol,
                    tmtGolongan: tmtGolongan,
                    tmtJabatan: tmtJabatan,
                    jabatan: jabatan,
                    agama: agama
                })

                return res.status(200).json({ message: 'Dosen berhasil ditambahkan', success: true })
            }else{
                return res.status(500).json({message: 'No HP tidak valid', success: false})
            }
        }else{
            return res.status(500).json({message: 'Email tidak valid', success: false})
        }
    }
}

export const edit = async (req, res) => {
    const userId = req.params.userId;
    const email = req.body.email;
    const noHp = req.body.noHp;

    // dosen
    const fullname = req.body.fullname;
    const nip = req.body.nip;
    const nidn = req.body.nidn;
    const jenisKelamin = req.body.jenisKelamin;
    const tempatLahir = req.body.tempatLahir;
    const tglLahir = req.body.tglLahir;
    const karpeg = req.body.karpeg;
    const cpsn = req.body.cpsn;
    const pns = req.body.pns;
    const jurusan = req.body.jurusan;
    const prodi = req.body.prodi;

    // detail dosen
    const pendidikanTerakhir = req.body.pendidikanTerakhir;
    const tahun = req.body.tahun;
    const gol = req.body.gol;
    const tmtGolongan = req.body.tmtGolongan;
    const tmtJabatan = req.body.tmtJabatan;
    const jabatan = req.body.jabatan;
    const agama = req.body.agama;

    if(email === ''){
        res.status(500).json({ message: 'Email tidak boleh kosong', success: false })
    }else if(noHp === ''){
        res.status(500).json({ message: 'Nomor HP tidak boleh kosong', success: false })
    }else if(fullname === ''){
        res.status(500).json({ message: 'Nama Lengkap tidak boleh kosong', success: false })
    }else if(nip === ''){
        res.status(500).json({ message: 'NIP tidak boleh kosong', success: false })
    }else if(nidn === ''){
        res.status(500).json({ message: 'NIDN tidak boleh kosong', success: false })
    }else if(jenisKelamin === ''){
        res.status(500).json({ message: 'Jenis Kelamin tidak boleh kosong', success: false })
    }else if(tempatLahir === ''){
        res.status(500).json({ message: 'Tempat Lahir tidak boleh kosong', success: false })
    }else if(tglLahir === ''){
        res.status(500).json({ message: 'Tanggal Lahir tidak boleh kosong', success: false })
    }else if(karpeg === ''){
        res.status(500).json({ message: 'Karpeg tidak boleh kosong', success: false })
    }else if(cpsn === ''){
        res.status(500).json({ message: 'CPNS tidak boleh kosong', success: false })
    }else if(pns === ''){
        res.status(500).json({ message: 'PNS tidak boleh kosong', success: false })
    }else if(jurusan === ''){
        res.status(500).json({ message: 'Jurusan tidak boleh kosong', success: false })
    }else if(prodi === ''){
        res.status(500).json({ message: 'Prodi tidak boleh kosong', success: false })
    }else if(pendidikanTerakhir === ''){
        res.status(500).json({ message: 'Pendidikan Terakhir tidak boleh kosong', success: false })
    }else if(tahun === ''){
        res.status(500).json({ message: 'Tahun tidak boleh kosong', success: false })
    }else if(gol === ''){
        res.status(500).json({ message: 'Golongan Pangkat tidak boleh kosong', success: false })
    }else if(tmtGolongan === ''){
        res.status(500).json({ message: 'TMT Golongan tidak boleh kosong', success: false })
    }else if(tmtJabatan === ''){
        res.status(500).json({ message: 'TMT Jabatan tidak boleh kosong', success: false })
    }else if(jabatan === ''){
        res.status(500).json({ message: 'Jabatan tidak boleh kosong', success: false })
    }else if(agama === ''){
        res.status(500).json({ message: 'Agama tidak boleh kosong', success: false })
    }else{
        if(validateEmail(email)){ // jika email valid
            if(validateNumberPhone(noHp)){ // jika nomor telefon valid

                const dosenId = await Dosen.findOne({
                    attributes: ['id'],
                    where: {
                        userId: userId
                    }
                })

                await User.update({
                    fullname: fullname,
                    email: email,
                    noHp: noHp,
                    prodiAdmin: prodi
                }, {
                    where: {
                        id: userId
                    }
                })

                await Dosen.update({
                    fullname: fullname,
                    nip: nip,
                    nidn: nidn,
                    jenisKelamin: jenisKelamin,
                    tempatLahir: tempatLahir,
                    tglLahir: tglLahir,
                    karpeg: karpeg,
                    cpsn: cpsn,
                    pns: pns,
                    jurusan: jurusan,
                    prodi: prodi,
                }, {
                    where: {
                        userId: userId
                    }
                })
    
                await DetailDosen.update({
                    pendidikanTerakhir: pendidikanTerakhir,
                    tahun: tahun,
                    gol: gol,
                    tmtGolongan: tmtGolongan,
                    tmtJabatan: tmtJabatan,
                    jabatan: jabatan,
                    agama: agama
                }, {
                    where: {
                        dosenId: dosenId.id
                    }
                })

                return res.status(200).json({ message: 'Dosen berhasil di edit', success: true })
            }else{
                return res.status(500).json({message: 'No HP tidak valid', success: false})
            }
        }else{
            return res.status(500).json({message: 'Email tidak valid', success: false})
        }
    }
}

export const list = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search;
    const offset = limit * page;
    const adminProdi = req.query.adminProdi;

    const totalDosen = await Dosen.count({
        where: {
            prodi: adminProdi,
            [Op.or]: [
                { fullname: { [Op.substring]: `${search}` } },
                { nip: { [Op.substring]: `${search}` } },
            ]
        }
    })
    const totalRows = totalDosen;
    const totalPage = Math.ceil(totalRows/limit);

    try{
        const dataDosen = await Dosen.findAll({
            where: {
                prodi: adminProdi,
                [Op.or]: [
                    { fullname: { [Op.substring]: `${search}` } },
                    { nip: { [Op.substring]: `${search}` } },
                ]
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'fullname', 'username', 'email', 'noHp']
                },
                {
                    model: DetailDosen,
                },
            ],
            order: [ ['id', 'desc'] ],
            offset: offset,
            limit: limit,
        })

        return res.status(200).json({
            result: dataDosen,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage
        })
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}

export const getById = async (req, res) => {
    const id = req.params.id;
    
    try{
        const dataDosen = await Dosen.findOne({
            where: { userId: id },
            include: [
                {
                    model: User,
                    attributes: ['fullname', 'username', 'email', 'noHp']
                },
                {
                    model: DetailDosen
                },
            ]
        })

        return res.status(200).json({
            result: dataDosen,
        })
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}

export const updatePassword = async (req, res) => {
    const id = req.params.id;
    const tglLahir = req.body.tglLahir; // mengambil tgl lahir pada mahasiswa
    const tglLahirReplace = tglLahir.replace(/-/g, '');
    const password = bcrypt.hashSync(tglLahirReplace, bcrypt.genSaltSync(10));

    try{
        await User.update({
            password: password,
        }, {
            where: { id: id }
        })

        return res.status(200).json({ message: 'Password berhasil diubah. Password sesuai tanggal lahir Dosen ', success: true })
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}

export const remove = async (req, res) => {
    const id = req.params.id;

    try{
        await User.destroy({ where: { id: id } })

        return res.status(200).json({ message: 'Data berhasil dihapus', success: true })
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}
const PptxGenJS = require('pptxgenjs');

async function createPresentation() {
    let pres = new PptxGenJS();
    
    pres.author = 'Rafa Izza';
    pres.company = 'Digital Creative Developer';
    pres.title = 'Portfolio Web - Rafa Izza';
    pres.layout = 'LAYOUT_16x9';

    // Slide 1: Title
    let slide1 = pres.addSlide();
    slide1.background = { color: 'F0F4FF' };
    
    slide1.addText('Rafa Izza', {
        x: '10%', y: '35%', w: '80%', h: 1.5,
        fontSize: 48, bold: true, color: '0F0F1A', align: 'center', fontFace: 'Plus Jakarta Sans'
    });
    
    slide1.addText('Digital Creative Developer', {
        x: '10%', y: '50%', w: '80%', h: 1,
        fontSize: 24, color: '4F46E5', align: 'center', fontFace: 'Plus Jakarta Sans', bold: true
    });
    
    slide1.addText('Web Development | UI/UX Design | AI Content', {
        x: '10%', y: '60%', w: '80%', h: 1,
        fontSize: 16, color: '6B7280', align: 'center', fontFace: 'Plus Jakarta Sans'
    });

    // Slide 2: About Me
    let slide2 = pres.addSlide();
    slide2.background = { color: 'FFFFFF' };
    
    slide2.addText('TENTANG SAYA', {
        x: '5%', y: '10%', w: '90%', h: 1,
        fontSize: 14, color: '7C3AED', bold: true, fontFace: 'Plus Jakarta Sans'
    });
    
    slide2.addText('Creative Technologist', {
        x: '5%', y: '20%', w: '90%', h: 1,
        fontSize: 32, bold: true, color: '0F0F1A', fontFace: 'Plus Jakarta Sans'
    });
    
    slide2.addText(
        'Saya adalah Creative Technologist yang menggabungkan kemampuan teknis dalam pengembangan web dengan sensibilitas desain modern. Saat ini saya merupakan siswa SMKN 2 Buduran Sidoarjo jurusan Rekayasa Perangkat Lunak.\n\nFokus utama saya adalah membangun aplikasi web yang berkinerja tinggi, dapat diakses dengan baik, dan memberikan pengalaman digital (digital experience) terbaik bagi para pengguna akhir.',
        {
            x: '5%', y: '35%', w: '55%', h: 4,
            fontSize: 16, color: '6B7280', fontFace: 'Plus Jakarta Sans', align: 'left', valign: 'top', lineSpacing: 28
        }
    );

    // Stats
    slide2.addText('1+', { x: '65%', y: '40%', w: '10%', fontSize: 24, bold: true, color: '4F46E5' });
    slide2.addText('Tahun Pengalaman', { x: '65%', y: '48%', w: '15%', fontSize: 12, color: '6B7280' });
    
    slide2.addText('10+', { x: '80%', y: '40%', w: '10%', fontSize: 24, bold: true, color: '4F46E5' });
    slide2.addText('Proyek Selesai', { x: '80%', y: '48%', w: '15%', fontSize: 12, color: '6B7280' });

    // Slide 3: Skills
    let slide3 = pres.addSlide();
    slide3.background = { color: 'F0F4FF' };
    
    slide3.addText('TECHNICAL EXPERTISE', { x: '5%', y: '10%', w: '90%', fontSize: 14, color: '7C3AED', bold: true });
    slide3.addText('Keahlian Utama', { x: '5%', y: '18%', w: '90%', fontSize: 32, bold: true, color: '0F0F1A' });
    
    let skillsList = [
        { name: 'HTML5', prof: '95%' },
        { name: 'CSS3', prof: '85%' },
        { name: 'Tailwind CSS', prof: '92%' },
        { name: 'JavaScript', prof: '88%' },
        { name: 'React', prof: '90%' },
        { name: 'Laravel', prof: '85%' }
    ];

    let startY = 35;
    skillsList.forEach((skill, index) => {
        let col = index % 2;
        let row = Math.floor(index / 2);
        
        let xPos = col === 0 ? 5 : 55;
        let yPos = startY + (row * 15);
        
        // Skill name
        slide3.addText(skill.name, { x: `${xPos}%`, y: `${yPos}%`, w: '20%', fontSize: 18, bold: true, color: '0F0F1A' });
        // Percentage
        slide3.addText(skill.prof, { x: `${xPos + 35}%`, y: `${yPos}%`, w: '10%', fontSize: 18, bold: true, color: '4F46E5', align: 'right' });
        // Progress Bar Background
        slide3.addShape(pres.ShapeType.rect, { x: `${xPos}%`, y: `${yPos + 8}%`, w: '40%', h: 0.1, fill: { color: 'D1D5DB' } });
        // Progress Bar Fill
        slide3.addShape(pres.ShapeType.rect, { x: `${xPos}%`, y: `${yPos + 8}%`, w: `${parseInt(skill.prof) * 0.4}%`, h: 0.1, fill: { color: '4F46E5' } });
    });

    // Slide 4: Experience
    let slide4 = pres.addSlide();
    slide4.background = { color: 'FFFFFF' };
    
    slide4.addText('CAREER JOURNEY', { x: '5%', y: '10%', w: '90%', fontSize: 14, color: '7C3AED', bold: true });
    slide4.addText('Pengalaman', { x: '5%', y: '18%', w: '90%', fontSize: 32, bold: true, color: '0F0F1A' });
    
    // Timeline Card
    slide4.addShape(pres.ShapeType.rect, { x: '5%', y: '35%', w: '90%', h: '45%', fill: { color: 'F9FAFB' }, line: { color: 'E5E7EB', width: 1 } });
    slide4.addText('2025', { x: '8%', y: '40%', w: '20%', fontSize: 16, color: '4F46E5', bold: true });
    slide4.addText('Web Developer Intern', { x: '8%', y: '48%', w: '80%', fontSize: 24, bold: true, color: '0F0F1A' });
    slide4.addText('Tech Solutions', { x: '8%', y: '58%', w: '80%', fontSize: 16, color: '6B7280', bold: true });
    slide4.addText('Membangun aplikasi web modern menggunakan React dan Laravel.', { x: '8%', y: '68%', w: '80%', fontSize: 14, color: '4B5563' });

    // Slide 5: Projects
    let slide5 = pres.addSlide();
    slide5.background = { color: 'F0F4FF' };
    
    slide5.addText('PORTFOLIO', { x: '5%', y: '5%', w: '90%', fontSize: 14, color: '7C3AED', bold: true, align: 'center' });
    slide5.addText('Proyek Unggulan', { x: '5%', y: '12%', w: '90%', fontSize: 32, bold: true, color: '0F0F1A', align: 'center' });
    
    // Project 1
    slide5.addShape(pres.ShapeType.rect, { x: '5%', y: '25%', w: '28%', h: '60%', fill: { color: 'FFFFFF' }, line: { color: 'E5E7EB' } });
    slide5.addText('Web Portofolio', { x: '7%', y: '30%', w: '24%', fontSize: 18, bold: true, color: '0F0F1A' });
    slide5.addText('Website portofolio interaktif yang dibangun dengan React dan Laravel.', { x: '7%', y: '40%', w: '24%', fontSize: 12, color: '6B7280', valign: 'top', h: 1.5 });

    // Project 2
    slide5.addShape(pres.ShapeType.rect, { x: '36%', y: '25%', w: '28%', h: '60%', fill: { color: 'FFFFFF' }, line: { color: 'E5E7EB' } });
    slide5.addText('E-Commerce Platform', { x: '38%', y: '30%', w: '24%', fontSize: 18, bold: true, color: '0F0F1A' });
    slide5.addText('Aplikasi toko online modern dengan manajemen keranjang dan produk.', { x: '38%', y: '40%', w: '24%', fontSize: 12, color: '6B7280', valign: 'top', h: 1.5 });

    // Project 3
    slide5.addShape(pres.ShapeType.rect, { x: '67%', y: '25%', w: '28%', h: '60%', fill: { color: 'FFFFFF' }, line: { color: 'E5E7EB' } });
    slide5.addText('Dashboard Admin UI', { x: '69%', y: '30%', w: '24%', fontSize: 18, bold: true, color: '0F0F1A' });
    slide5.addText('Dashboard responsif untuk visualisasi data dan manajemen sistem.', { x: '69%', y: '40%', w: '24%', fontSize: 12, color: '6B7280', valign: 'top', h: 1.5 });

    // Slide 6: Contact
    let slide6 = pres.addSlide();
    slide6.background = { color: '0F0F1A' }; // Dark theme for contact
    
    slide6.addText('Mari Bekerja Sama!', { x: '10%', y: '30%', w: '80%', fontSize: 44, bold: true, color: 'FFFFFF', align: 'center' });
    
    slide6.addText('rafaizza@example.com', { x: '10%', y: '55%', w: '80%', fontSize: 20, color: '818CF8', align: 'center', bold: true });
    slide6.addText('Sidoarjo, Indonesia', { x: '10%', y: '65%', w: '80%', fontSize: 16, color: '9CA3B8', align: 'center' });
    
    slide6.addText('github.com/rafaizza', { x: '10%', y: '80%', w: '80%', fontSize: 14, color: 'FFFFFF', align: 'center' });

    // Save the presentation
    const fileName = 'Portfolio_Rafa_Izza.pptx';
    await pres.writeFile({ fileName: fileName });
    console.log(`Berhasil membuat file presentasi: ${fileName}`);
}

createPresentation().catch(err => {
    console.error('Error creating presentation:', err);
});

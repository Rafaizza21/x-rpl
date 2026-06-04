<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Project::create([
            'title' => 'Web Portofolio',
            'slug' => 'web-portofolio',
            'description' => 'Website portofolio yang dibangun dengan React dan Laravel, menampilkan proyek, keahlian, dan pengalaman secara interaktif.',
            'image' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
            'demo_url' => 'http://localhost:5173',
            'github_url' => 'https://github.com/rafaizza',
        ]);

        \App\Models\Project::create([
            'title' => 'E-Commerce Platform',
            'slug' => 'e-commerce-platform',
            'description' => 'Aplikasi toko online modern dengan fitur keranjang belanja, pembayaran, dan manajemen produk menggunakan Laravel & React.',
            'image' => 'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=800&auto=format&fit=crop',
            'demo_url' => '#',
            'github_url' => 'https://github.com/rafaizza',
        ]);

        \App\Models\Project::create([
            'title' => 'Dashboard Admin UI',
            'slug' => 'dashboard-admin-ui',
            'description' => 'Dashboard administrasi yang responsif dan interaktif dengan visualisasi data real-time, manajemen user, dan laporan analitik.',
            'image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
            'demo_url' => '#',
            'github_url' => 'https://github.com/rafaizza',
        ]);


        \App\Models\Skill::create([
            'name' => 'React',
            'icon' => 'FaReact',
            'proficiency' => 90,
        ]);

        \App\Models\Skill::create([
            'name' => 'HTML5',
            'icon' => 'FaHtml5',
            'proficiency' => 95,
        ]);

        \App\Models\Skill::create([
            'name' => 'CSS3',
            'icon' => 'FaCss3Alt',
            'proficiency' => 85,
        ]);

        \App\Models\Skill::create([
            'name' => 'JavaScript',
            'icon' => 'FaJs',
            'proficiency' => 88,
        ]);

        \App\Models\Skill::create([
            'name' => 'Tailwind CSS',
            'icon' => 'SiTailwindcss',
            'proficiency' => 92,
        ]);

        \App\Models\Skill::create([
            'name' => 'Laravel',
            'icon' => 'FaLaravel',
            'proficiency' => 85,
        ]);

        \App\Models\Experience::create([
            'title' => 'Web Developer Intern',
            'company' => 'Tech Solutions',
            'start_date' => '2025-01-01',
            'end_date' => '2025-06-01',
            'description' => 'Membangun aplikasi web modern menggunakan React dan Laravel.',
        ]);
    }
}

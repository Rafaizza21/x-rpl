<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('menus', function (Blueprint $table) {
            $table->id('idmenu');
            $table->unsignedBigInteger('idkategori');
            $table->string('menu');
            $table->string('gambar');
            $table->text('deskripsi')->nullable();
            $table->integer('harga');
            $table->timestamps();

            $table->foreign('idkategori')
                ->references('idkategori')
                ->on('kategoris')
                ->onDelete('cascade');
        });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menus');
    }
};

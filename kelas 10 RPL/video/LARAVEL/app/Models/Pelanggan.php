<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pelanggan extends Model
{
    use HasFactory;

    protected $table = 'pelanggans';
    protected $primaryKey = 'idpelanggan';
    public $incrementing = true; // auto increment
    protected $keyType = 'int';   // integer
    protected $fillable = [
        'pelanggan',
        'email',
        'password',
        'alamat',
        'telp',
        'jeniskelamin'
    ];
}


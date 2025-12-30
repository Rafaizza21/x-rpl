<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;

    protected $fillable = [
        'idorder',
        'idpelanggan',
        'tglorder',
        'total',
        'bayar',
        'kembali'
    ];

    public function pelanggan()
    {
        return $this->belongsTo(Pelanggan::class, 'idpelanggan');
    }

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class, 'idorder', 'idorder');
    }
}

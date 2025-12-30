<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::join('pelanggans', 'orders.idpelanggan', '=', 'pelanggans.idpelanggan')->select([
            'orders.*',
            'pelanggans.*'
        ])
            ->orderBy('status', 'asc')
            ->paginate(2);
        $kategoris = Kategori::all();
        return view('Backend.order.select', ['orders' => $orders, 'kategoris' => $kategoris]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order = Order::where('idorder', $order->idorder)->first();
        if ($order->status == 0) {
            // Unpaid, show payment form
            return view('Backend.order.update', ['order' => $order]);
        } else {
            // Paid, show details
            $order = Order::with(['pelanggan', 'orderDetails.menu'])->where('idorder', $order->idorder)->first();
            return view('Backend.order.detail', ['order' => $order]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        $order = Order::where('idorder', $order->idorder)->first();
        return view('Backend.order.update', ['order' => $order]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(\Illuminate\Http\Request $request, Order $order)
    {
        $data = $request->validate([
            'bayar' => 'required'
        ]);
        $kembalis = Order::where('idorder', $order->idorder)->first();
        $kembali = $data['bayar'] - $kembalis->total;
        Order::where('idorder', $order->idorder)->update([
            'bayar' => $data['bayar'],
            'kembali' => $kembali,
            'status' => 1
        ]);
        return redirect('admin/order');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}

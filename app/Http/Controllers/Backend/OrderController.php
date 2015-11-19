<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Models\Order as OrderModel;
use App\Entities\Api\Order;

class OrderController extends Controller
{
    protected $order;

    public function __construct(OrderModel $order)
    {
        $this->order = $order;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // $business = app('business');

        $results = $this->order->get();

        $orders = collect();

        $results->each(function($r) use($orders) {
            $order = new Order($r);
            $orders->push($order->toArray());
        });

        return response()->json([
            'orders' => $orders
            ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $business = app('business');

        $order = $this->order->newInstance();

        $order->fill([
            'date' => $request->input('order.date'), 
            'total' => $request->input('order.total'), 
            'experience_id' => $request->input('order.experience_id'), 
            'status' => $request->input('order.status')
        ]);

        if (!$order->validate())
        {
            return response()->json([
                'errors' => $order->getErrors()
                ], 422);
        }

        $order->save();

        $order = new Order($order);

        return response()->json([
            'order' => $order->toArray()
            ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // $business = app('business');

        try
        {
            $order = $this->order
                // ->where('sender_id', $business->id)
                ->findOrFail($id);
        }
        catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e)
        {
            return response()->json([], 404);
        }

        $order = new Order($order);

        return response()->json([
            'order' => $order->toArray()
            ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // $business = app('business');

        try
        {
            $order = $this->order
                // ->where('sender_id', $business->id)
                ->findOrFail($id);
        }
        catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e)
        {
            return response()->json([], 404);
        }

        $order->fill([
            'date' => $request->input('order.date'), 
            'total' => $request->input('order.total'), 
            'experience_id' => $request->input('order.experience_id'), 
            'status' => $request->input('order.status')
        ]);

        if (!$order->validate())
        {
            return response()->json([
                'errors' => $order->getErrors()
                ], 422);
        }

        $order->save();

        $order = new Order($order);

        return response()->json([
            'order' => $order->toArray()
            ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // $business = app('business');

        try 
        {
            $order = $this->order
                ->findOrFail($id, ['id']);
        }
        catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e)
        {
            return response('', 404);
        }

        $order->delete();

        return response('', 200);

    }
}

<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Models\Customer as CustomerModel;
use App\Entities\Api\Customer;

class CustomerController extends Controller
{
    protected $customer;

    public function __construct(CustomerModel $customer)
    {
        $this->customer = $customer;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // $business = app('business');

        $results = $this->customer->get();

        $customers = collect();

        $results->each(function($r) use($customers) {
            $customer = new Customer($r);
            $customers->push($customer->toArray());
        });

        return response()->json([
            'customers' => $customers
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

        $customer = $this->customer->newInstance();

        $customer->fill([
            'first_name' => $request->input('customer.first_name'), 
            'last_name' => $request->input('customer.last_name'), 
            'email' => $request->input('customer.email'), 
            'phone' => $request->input('customer.phone')
        ]);

        if (!$customer->validate())
        {
            return response()->json([
                'errors' => $customer->getErrors()
                ], 422);
        }

        $customer->save();

        $customer = new Customer($customer);

        return response()->json([
            'customer' => $customer->toArray()
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
            $customer = $this->customer
                // ->where('sender_id', $business->id)
                ->findOrFail($id);
        }
        catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e)
        {
            return response()->json([], 404);
        }

        $customer = new Customer($customer);

        return response()->json([
            'customer' => $customer->toArray()
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
            $customer = $this->customer
                // ->where('sender_id', $business->id)
                ->findOrFail($id);
        }
        catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e)
        {
            return response()->json([], 404);
        }

        $customer->fill([
            'first_name' => $request->input('customer.first_name'), 
            'last_name' => $request->input('customer.last_name'), 
            'email' => $request->input('customer.email'), 
            'phone' => $request->input('customer.phone')
        ]);

        if (!$customer->validate())
        {
            return response()->json([
                'errors' => $customer->getErrors()
                ], 422);
        }

        $customer->save();

        $customer = new Customer($customer);

        return response()->json([
            'customer' => $customer->toArray()
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
            $customer = $this->customer
                ->findOrFail($id, ['id']);
        }
        catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e)
        {
            return response('', 404);
        }

        $customer->delete();

        return response('', 200);

    }
}

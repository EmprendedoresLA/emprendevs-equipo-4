<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Models\Company as CompanyModel;
use App\Entities\Api\Company;

class CompanyController extends Controller
{
    protected $company;

    public function __construct(CompanyModel $company)
    {
        $this->company = $company;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // $business = app('business');

        $result = $this->company->first();

        $company = new Company($result);

        return response()->json([
            'company' => $company->toArray(), 
            ], 200);

    }

    /**polotecno
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $business = app('business');

        $company = $this->company->newInstance();
        $logo = '';
        $background_image = '';
        if($request->hasFile('logo')){
          $logo = 'logo.'.$request->file('logo')->getClientOriginalExtension();
        }

        if($request->hasFile('background_image')){
          $background_image = 'background_image.'.$request->file('background_image')->getClientOriginalExtension();
        }

        $company->fill([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'location' => $request->input('location'),
            'website' => $request->input('website'),
            'logo' => $logo,
            'background_image' => $background_image,
            'start_at_hh' => $request->input('start_at_hh'),
            'end_at_hh' => $request->input('end_at_hh'),
            'days' => $request->input('days'),
            'capacity_max' => $request->input('capacity_max'),
            'extends_tables' => $request->input('extends_tables')
        ]);

        if (!$company->validate())
        {
            return response()->json([
                'errors' => $company->getErrors()
                ], 422);
        }

        $company->save();

        if($request->file('logo')){
          $request->file('logo')->move(
              base_path() . '/public/images/'.$company->id, $logo
          );
        }

        if($request->file('background_image')){
          $request->file('background_image')->move(
              base_path() . '/public/images/'.$company->id, $background_image
          );
        }

        //$company = new Company($company);

        return response()->json([
            'company' => $company
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
            $company = $this->company
                // ->where('sender_id', $business->id)
                ->findOrFail($id);
        }
        catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e)
        {
            return response()->json([], 404);
        }

        //$company = new Company($company);

        return response()->json([
            'company' => $company
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
            $company = $this->company
                // ->where('sender_id', $business->id)
                ->findOrFail($id);
        }
        catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e)
        {
            return response()->json([], 404);
        }

        $logo = '';
        $background_image = '';
        if($request->hasFile('logo'))
        {
          $logo = 'logo.'.$request->file('logo')->getClientOriginalExtension();
          $request->file('logo')->move(
              base_path() . '/public/images/'.$company->id, $logo
          );
        }

        if($request->hasFile('background_image'))
        {
          $background_image = 'bg.'.$request->file('background_image')->getClientOriginalExtension();
          $request->file('background_image')->move(
              base_path() . '/public/images/'.$company->id, $background_image
          );
        }

        $company->fill([
          'name' => $request->input('company.name'),
          'description' => $request->input('company.description'),
          'email' => $request->input('company.email'),
          'phone' => $request->input('company.phone'),
          'location' => $request->input('company.location'),
          'website' => $request->input('company.website'),
          'logo' => $logo,
          'background_image' => $background_image,
          'start_at_hh' => $request->input('company.start_at_hh'),
          'end_at_hh' => $request->input('company.end_at_hh'),
          'days' => $request->input('company.days'),
          'capacity_max' => $request->input('company.capacity_max'),
          'extends_tables' => $request->input('company.extends_tables')
        ]);

        if (!$company->validate())
        {
            return response()->json([
                'errors' => $company->getErrors()
                ], 422);
        }

        $company->save();

        //$company = new Company($company);

        return response()->json([
            'company' => $company
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
            $company = $this->company
                ->findOrFail($id, ['id']);
        }
        catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e)
        {
            return response('', 404);
        }

        $company->delete();

        return response('', 200);

    }
}

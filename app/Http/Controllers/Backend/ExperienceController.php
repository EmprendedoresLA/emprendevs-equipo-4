<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Models\Experience as ExperienceModel;
use App\Entities\Api\Experience;

class ExperienceController extends Controller
{
    protected $experience;

    public function __construct(ExperienceModel $experience)
    {
        $this->experience = $experience;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // $business = app('business');

        $results = $this->experience->get();

        $experiences = collect();

        $results->each(function($r) use($experiences) {
            $experience = new Experience($r);
            $experiences->push($experience->toArray());
        });

        return response()->json([
            'experiences' => $experiences
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

        $experience = $this->experience->newInstance();

        $experience->fill([
            'name' => $request->input('experience.name'), 
            'description' => $request->input('experience.description'), 
            'price' => $request->input('experience.price'), 
            'status' => $request->input('experience.status')
        ]);

        if (!$experience->validate())
        {
            return response()->json([
                'errors' => $experience->getErrors()
                ], 422);
        }

        $experience->save();

        $experience = new Experience($experience);

        return response()->json([
            'experience' => $experience->toArray()
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
            $experience = $this->experience
                // ->where('sender_id', $business->id)
                ->findOrFail($id);
        }
        catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e)
        {
            return response()->json([], 404);
        }

        $experience = new Experience($experience);

        return response()->json([
            'experience' => $experience->toArray()
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
            $experience = $this->experience
                // ->where('sender_id', $business->id)
                ->findOrFail($id);
        }
        catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e)
        {
            return response()->json([], 404);
        }

        $experience->fill([
            'name' => $request->input('experience.name'), 
            'description' => $request->input('experience.description'), 
            'price' => $request->input('experience.price'), 
            'status' => $request->input('experience.status')
        ]);

        if (!$experience->validate())
        {
            return response()->json([
                'errors' => $experience->getErrors()
                ], 422);
        }

        $experience->save();

        $experience = new Experience($experience);

        return response()->json([
            'experience' => $experience->toArray()
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
            $experience = $this->experience
                ->findOrFail($id, ['id']);
        }
        catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e)
        {
            return response('', 404);
        }

        $experience->delete();

        return response('', 200);

    }
}

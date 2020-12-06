<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\Libro;
use App\Http\Resources\Libro as LibroResource;

class LibroController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table('libros')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required',
            'autor' => 'required',
            'editorial' => 'max:255|nullable',
            'edicion' => 'max:255|nullable',
            'condicion' => 'required',
            'precio_original' => 'required',
        ]);

        $nuevoLibro = Libro::create($request->all());

        return (new LibroResource($nuevoLibro))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($idLibro)
    {
        return DB::table('libros')->where('idLibro', '=', $idLibro)->get();
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $idLibro)
    {
        $request->validate([
            'titulo' => 'required',
            'autor' => 'required',
            'editorial' => 'max:255|nullable',
            'edicion' => 'max:255|nullable',
            'condicion' => 'required',
            'precio_original' => 'required',
        ]);

        $query = DB::table('libros')->where('idLibro', $idLibro)->update(['titulo'=> $request->get('titulo') , 'autor' => $request->get('autor') , 'editorial' => $request->get('editorial') , 'edicion' => $request->get('edicion'), 'condicion' => $request->get('condicion'), 'precio_original' => $request->get('precio_original')]);
        return $query;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($idLibro)
    {
        Libro::destroy($idLibro);
    }
}

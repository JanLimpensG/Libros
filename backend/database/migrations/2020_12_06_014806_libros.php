<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Libros extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('libros', function (Blueprint $table) {
            $table->increments('idLibro');
            $table->string('titulo');
            $table->string('autor');
            $table->string('editorial')->nullable();
            $table->string('edicion')->nullable();
            $table->enum('condicion', ['Buena', 'Mala']);
            $table->decimal('precio_original');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('libros');
    }
}

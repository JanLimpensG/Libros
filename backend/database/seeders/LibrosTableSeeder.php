<?php

namespace Database\Seeders;

use App\Models\Libro;
use Illuminate\Database\Seeder;

class LibrosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
        for($i = 0; $i < 30; $i++)
        {
            Libro::create([
                'titulo' => $faker->lastName,
                'autor' => $faker->name,
                'editorial' => $faker->company,
                'edicion' => $faker->numberBetween($min = 1, $max = 3),
                'condicion' => $faker->randomElement($array = array('Buena', 'Mala')),
                'precio_original' => $faker->numberBetween($min = 49, $max = 130)
            ]);
        }
    }
}

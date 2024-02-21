<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function () {
    Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
        return rtFormat($request->user());
    });

    Route::get('/test', function () {
        return response()->json(rtFormat('Hello World!'), 200);
    });

    Route::get('/check-auth', function () {
        $user = Auth::user();

        $data = [
            'isAuthenticated' => Auth::check(),
            'userData' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ] : null,
        ];

        return response()->json(rtFormat($data), 200);
    });
});

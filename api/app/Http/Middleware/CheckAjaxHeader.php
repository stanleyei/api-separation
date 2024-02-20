<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckAjaxHeader
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->header('X-Requested-With') !== 'XMLHttpRequest') {
            // 如果請求不是 AJAX，返回一個錯誤響應
            return response('Unauthorized', 401);
        }

        return $next($request);
    }
}

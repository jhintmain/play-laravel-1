<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductFormRequest;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    const IMAGE_FOLDER = 'images/products';

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $products = Product::all();
        $products->map(function ($product) {
            if ($product->featured_image) {
                $product->featured_image = Storage::url($product->featured_image);
            }
            return $product;
        });

        return Inertia::render('products/index', [
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('products/product-form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductFormRequest $request): ?RedirectResponse
    {
        try {
            $path = null;
            $imageName = null;
            if ($request->hasFile('featured_image')) {
                $image = $request->file('featured_image');
                $imageName = $image->getClientOriginalName();
                $path = self::IMAGE_FOLDER . "/" . $imageName;
                Storage::put($path, file_get_contents($image));
            }

            $product = Product::create([
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'featured_image' => $path,
                'featured_image_origin_name' => $imageName,
            ]);

            if ($product) {
                return redirect()->route('products.index')->with('success', 'Product created successfully.');
            }

        } catch (\Exception $e) {
            Log::error($e->getMessage());
        }

        return redirect()->back()->with('error', 'Something went wrong.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product): Response
    {
        if ($product->featured_image) {
            $product->featured_image = Storage::url($product->featured_image);
        }
        return Inertia::render('products/product-form', [
            'product' => $product,
            'isView' => true
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product): Response
    {
        if ($product->featured_image) {
            $product->featured_image = Storage::url($product->featured_image);
        }
        return Inertia::render('products/product-form', [
            'product' => $product,
            'isEdit' => true
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        if ($product) {
            $product->name = $request->name;
            $product->description = $request->description;
            $product->price = $request->price;

            if ($request->file('featured_image')) {
                $featuredImage = $request->file('featured_image');
                $imageName = $featuredImage->getClientOriginalName();
                $path = self::IMAGE_FOLDER . "/" . $imageName;
                $product->featured_image = $path;
                $product->featured_image_origin_name = $imageName;

                Storage::delete($product->featured_image);
                Storage::put($path, file_get_contents($featuredImage));
            }

            $product->save();

            return redirect()->route('products.index')->with('success', 'Product updated successfully.');
        }

        return redirect()->back()->with('error', 'Product updated empty.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product): RedirectResponse
    {

        try {
            if ($product) {
                if ($product->featured_image) {
                    Storage::delete($product->featured_image);
                }
                $product->delete();
                return redirect()->route('products.index')
                    ->with('success', 'Product deleted successfully.');
            }

        } catch (\Exception $e) {
            Log::error($e->getMessage());
        }

        return redirect()->back()->with('error', 'Product delete empty.');
    }
}

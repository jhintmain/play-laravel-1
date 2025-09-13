<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ProductFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Please enter Product name is required',
            'name.string' => 'Product name must be a string',
            'name.max' => 'Product name may not be greater than 255 characters',
            'description.string' => 'Description must be a string',
            'price.required' => 'Please enter Price is required',
            'price.numeric' => 'Price must be a number',
            'price.min' => 'Price must be at least 0',
            'featured_image.image' => 'File must be an image',
            'featured_image.mimes' => 'Image must be a file of type: jpeg, png, jpg, gif, svg',
            'featured_image.max' => 'Image may not be greater than 2048 KB',
        ];
    }
}

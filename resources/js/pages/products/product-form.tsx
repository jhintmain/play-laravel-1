import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CustomTextarea } from '@/components/ui/custom-textarea';
import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Product',
        href: route('products.create')
    }
];

export default function ProductForm() {
    const {data, setData, post, processing, errors, reset} = useForm(
        {
            name: '',
            description: '',
            price: '',
            image: null as File |null
        }
    );
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'), {
            onSuccess: () => reset(),
        });
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('image', e.target.files[0]);
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products Manage" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">

                {/* Back to Products Button */}
                <div className="ml-auto">
                    <Link as="button" href={route('products.index')}
                          className="w-fit rounded-lg text-center text-md cursor-pointer bg-indigo-800 px-4 py-2 text-white hover:opacity-90">
                        Back to Products
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Create Product</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="flex flex-col gap-4" autoComplete="off">
                            <div className="grid gap-6">

                                {/* Product Name*/}
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Product Name</Label>
                                    <Input
                                        onChange={(e) => setData('name', e.target.value)}
                                        value={data.name}
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Product Name"
                                        autoFocus
                                        tabIndex={1} />

                                    <InputError message={errors.name}/>
                                </div>

                                {/* Product Description */}
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <CustomTextarea
                                        onChange={(e) => setData('description', e.target.value)}
                                        value={data.description}
                                        id="description"
                                        name="description"
                                        placeholder="Product Description"
                                        rows={4}
                                        tabIndex={2}
                                    />
                                    <InputError message={errors.description}/>
                                </div>

                                {/* Product Price */}
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Price</Label>
                                    <Input
                                        onChange={(e) => setData('price', e.target.value)}
                                        value={data.price}
                                        id="price"
                                        name="price"
                                        type="text"
                                        placeholder="Price"
                                        autoFocus
                                        tabIndex={3}
                                    />
                                    <InputError message={errors.price}/>
                                </div>

                                {/* Product Image */}
                                <div className="grid gap-2">
                                    <Label htmlFor="image">Image</Label>
                                    <Input
                                        onChange={handleFileUpload}
                                        id="image"
                                        name="image"
                                        type="file"
                                        autoFocus
                                        tabIndex={4}
                                    />
                                    <InputError message={errors.image}/>
                                </div>

                                {/* Submit Button */}
                                <Button type="submit" className="mt-4 w-fit cursor-pointer" tabIndex={5}>
                                    {/*{processing && <LoaderCircle className="h-4 w-4 animate-spin" />}*/}
                                    Save Product
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CustomTextarea } from '@/components/ui/custom-textarea';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import React from 'react';
import { BackpackIcon, LoaderCircle } from 'lucide-react';


export default function ProductForm({ ...props }: {}) {
    const { product, isView, isEdit } = props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: (isView ? 'Show' : isEdit ? 'Update' : 'Create') + ' Product',
            href: route('products.create')
        }
    ];
    const { data, setData, post, put, processing, errors, reset } = useForm(
        {
            name: product?.name || '',
            description: product?.description || '',
            price: product?.price || '',
            image: product?.featured_image || null as File | null
        }
    );
    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if(isEdit) {
            put(route('products.update',product.id), {
                onSuccess: () => reset()
            });
        }else{
            post(route('products.store'), {
                onSuccess: () => reset()
            });
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('image', e.target.files[0]);
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products Manage" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">

                {/* Back to Products Button */}
                <div className="ml-auto">
                    <Link as="button" href={route('products.index')}
                          className="flex  items-center w-fit rounded-lg text-center text-md cursor-pointer bg-indigo-800 px-4 py-2 text-white hover:opacity-90">
                        Back to Products
                        <BackpackIcon size={20} />
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{breadcrumbs[0].title}</CardTitle>
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
                                        disabled={isView || processing}
                                        tabIndex={1} />

                                    <InputError message={errors.name} />
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
                                        disabled={isView || processing}
                                        tabIndex={2}
                                    />
                                    <InputError message={errors.description} />
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
                                        disabled={isView || processing}
                                        tabIndex={3}
                                    />
                                    <InputError message={errors.price} />
                                </div>

                                {/* Product Image */}
                                {!isView && (
                                    <div className="grid gap-2">
                                        <Label htmlFor="image">Image</Label>
                                        <Input
                                            onChange={handleFileUpload}
                                            id="image"
                                            name="image"
                                            type="file"
                                            autoFocus
                                            disabled={isView || processing}
                                            tabIndex={4}
                                        />
                                        <InputError message={errors.image} />
                                    </div>
                                )}

                                {isView || isEdit && (
                                    <div className="grid gap-2">
                                        <Label htmlFor="image">Current Image</Label>
                                        <img src={`/${product.featured_image}`} alt="Featured Image"
                                             className="w-50 h-40" />
                                    </div>
                                )}

                                {/* Submit Button */}
                                {!isView && (
                                    <Button type="submit" className="mt-4 w-fit cursor-pointer" tabIndex={5}>
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}

                                        {processing ? (isEdit ? 'Updating...' : 'Creating...') : isEdit ? 'Update' : 'Create'} Product
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEffect, useState } from 'react';
import { CirclePlusIcon, Eye, Pencil, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products'
    }
];

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    featured_image: string;
    created_at: string;
}

export default function Index({ ...props }: { products: Product[] }) {
    const { products } = props;
    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
    const flashMessage = flash?.success || flash?.error;
    const [showAlert, setShowAlert] = useState(!!flashMessage);

    useEffect(() => {
        if (flashMessage) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [flashMessage]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products Manage" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">

                {showAlert && flashMessage && (
                    <Alert
                        variant={'default'}
                        className={`${flash?.success ? 'bg-green-600' : 'bg-red-600'} text-white mb-4 ml-auto max-w-md`}
                    >
                        <AlertDescription className="text-white">
                            {flash.success ? 'Success!' : 'Error'}
                            {flashMessage}
                        </AlertDescription>
                    </Alert>
                )}
                <div className="ml-auto">
                    <Link as="button"
                          href={route('products.create')}
                          className="flex items-center hover:opacity-90 rounded-lg text-center text-md cursor-pointer bg-indigo-800 px-4 py-2 text-white">
                        <CirclePlusIcon size={20} className="margin"/>
                        Add Product</Link>

                </div>
                <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                    <table className="w-full table-auto">
                        <thead>
                        <tr className="bg-gray-700 text-white">
                            <th className="p-4 border">#</th>
                            <th className="p-4 border">Name</th>
                            <th className="p-4 border">Description</th>
                            <th className="p-4 border">Price</th>
                            <th className="p-4 border">Featured Image</th>
                            <th className="p-4 border">Create Date</th>
                            <th className="p-4 border">Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2 text-center">{index + 1}</td>
                                <td className="border px-4 py-2 text-center">{product.name}</td>
                                <td className="border px-4 py-2 text-center">{product.description}</td>
                                <td className="border px-4 py-2 text-center">{product.price}</td>
                                <td className="border px-4 py-2 text-center">
                                    <img src={`/${product.featured_image}`} alt={product.name} className="h-16" />
                                </td>
                                <td className="border px-4 py-2 text-center">{product.created_at}</td>
                                <td className="border px-4 py-2 text-center">
                                    <Link as="button"
                                          href={route('products.show', product.id)}
                                          className="bg-sky-600 p-1 rounded-lg text-white ms-2 cursor-pointer">
                                        <Eye size={20} />
                                    </Link>
                                    <Link as="button"
                                          href={route('products.edit', product.id)}
                                          className="bg-blue-600 p-1 rounded-
                                          lg text-white ms-2 cursor-pointer">
                                        <Pencil size={20} />
                                    </Link>
                                    <Link as="button"
                                            href={route('products.destroy', product.id)}
                                          className="bg-red-600 p-1 rounded-lg text-white ms-2 cursor-pointer">
                                        <Trash2 size={20} />
                                    </Link>
                                </td>

                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}

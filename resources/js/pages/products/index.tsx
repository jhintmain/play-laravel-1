import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products'
    }
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products Manage" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">

                <div className="ml-auto">
                    <Link as="button" href={route('products.create')}
                          className="rounded-lg text-center text-md cursor-pointer bg-indigo-800 px-4 py-2 text-white hover:opacity-90">
                        Add Product
                    </Link>
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
                        <tr>
                            <td className="border px-4 py-2 text-center">1</td>
                            <td className="border px-4 py-2 text-center">Product 1</td>
                            <td className="border px-4 py-2 text-center">This is product 1</td>
                            <td className="border px-4 py-2 text-center">$10.00</td>
                            <td className="border px-4 py-2 text-center"></td>
                            <td className="border px-4 py-2 text-center">2024-01-01</td>
                            <td className="border px-4 py-2 text-center">Edit | Delete</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}

import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@headlessui/react';
import { CirclePlusIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts'
    }
];

interface Post{
    id: number;
    title: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export default function Index({...props}: {posts: Post[]}) {
    console.log(props);
    const {posts} = props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {/* Create Posts */}
                <div className="ml-auto">
                    <Link as="button"
                          href={route('posts.create')}
                          className="flex items-center hover:opacity-90 rounded-lg text-center text-md cursor-pointer bg-indigo-800 px-4 py-2 text-white">
                        <CirclePlusIcon size={20}></CirclePlusIcon>
                        Create Post
                    </Link>
                </div>


                {/* Posts List */}
                <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                    <table className="w-full text-center table-auto">
                        <thead>
                        <tr className="bg-amber-200">
                            <td className="p-4 border">ID</td>
                            <td className="p-4 border">Title</td>
                            <td className="p-4 border">Author</td>
                            <td className="p-4 border">Create Date</td>
                            <td className="p-4 border">Update Date</td>
                        </tr>
                        </thead>

                        <tbody>
                        <tr >
                            <td className="border px-4 py-2 text-center">1</td>
                            <td className="border px-4 py-2 text-center">1</td>
                            <td className="border px-4 py-2 text-center">1</td>
                            <td className="border px-4 py-2 text-center">1</td>
                            <td className="border px-4 py-2 text-center">1</td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </AppLayout>
    );
}
